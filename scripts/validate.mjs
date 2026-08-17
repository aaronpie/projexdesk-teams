import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const allowedColors = new Set([
  "green",
  "blue",
  "red",
  "orange",
  "purple",
  "cyan",
  "pink",
  "yellow",
  "teal",
  "coral",
]);

function fail(message) {
  errors.push(message);
}

function json(path) {
  try {
    return JSON.parse(readFileSync(join(root, path), "utf8"));
  } catch (error) {
    fail(`${path}: ${error.message}`);
    return null;
  }
}

function safeFile(path, suffix) {
  if (typeof path !== "string" || !path.endsWith(suffix)) return false;
  const absolute = resolve(root, normalize(path));
  return absolute.startsWith(`${root}${sep}`) && existsSync(absolute);
}

function text(value, max) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
}

function validateManifest(path, expectedMembers) {
  const manifest = json(path);
  if (!manifest) return;
  if (manifest.format !== "openmaus.team" || manifest.version !== 1) {
    fail(`${path}: expected openmaus.team version 1`);
    return;
  }
  const team = manifest.team;
  if (!team || !text(team.name, 100)) fail(`${path}: team.name is required`);
  if (!Array.isArray(team?.members) || team.members.length === 0 || team.members.length > 50) {
    fail(`${path}: team.members must contain 1-50 members`);
    return;
  }
  if (team.members.length !== expectedMembers) {
    fail(`${path}: catalog says ${expectedMembers} members but manifest has ${team.members.length}`);
  }
  const keys = new Set();
  for (const [index, member] of team.members.entries()) {
    const at = `${path}: member ${index + 1}`;
    if (!text(member?.key, 64) || !/^[a-z0-9][a-z0-9_-]*$/.test(member.key)) fail(`${at} has an invalid key`);
    else if (keys.has(member.key)) fail(`${at} duplicates key ${member.key}`);
    else keys.add(member.key);
    if (!text(member?.name, 100)) fail(`${at} needs a name`);
    if (typeof member?.title !== "string" || member.title.length > 200) fail(`${at} has an invalid title`);
    if (typeof member?.description !== "string" || member.description.length > 4000) fail(`${at} has an invalid description`);
    if (!allowedColors.has(member?.appearance?.color)) fail(`${at} has an unsupported color`);
  }
  const room = team.room;
  if (!room || !text(room.name, 100) || typeof room.bulletin !== "string") fail(`${path}: room is invalid`);
  const responder = room?.defaultResponder;
  if (!responder || !["member", "everyone", "mentions"].includes(responder.kind)) {
    fail(`${path}: room.defaultResponder is invalid`);
  } else if (responder.kind === "member" && !keys.has(responder.member)) {
    fail(`${path}: room.defaultResponder references an unknown member`);
  }
}

const catalog = json("catalog.json");
if (!catalog || catalog.format !== "openmaus.catalog" || catalog.version !== 1 || !Array.isArray(catalog.teams)) {
  fail("catalog.json: expected openmaus.catalog version 1");
} else {
  const slugs = new Set();
  for (const team of catalog.teams) {
    if (!text(team.slug, 80) || !/^[a-z0-9][a-z0-9-]*$/.test(team.slug)) fail("catalog.json: invalid team slug");
    else if (slugs.has(team.slug)) fail(`catalog.json: duplicate slug ${team.slug}`);
    else slugs.add(team.slug);
    if (!text(team.name, 100) || !text(team.summary, 300)) fail(`catalog.json: ${team.slug} needs a name and summary`);
    if (!safeFile(team.manifest, ".mausteam.json")) fail(`catalog.json: missing manifest for ${team.slug}`);
    else validateManifest(team.manifest, team.members);
    if (!safeFile(team.readme, "README.md")) fail(`catalog.json: missing README for ${team.slug}`);
    if (!Array.isArray(team.skills) || team.skills.length === 0) fail(`catalog.json: ${team.slug} needs at least one skill`);
    for (const skill of team.skills ?? []) {
      if (!safeFile(skill, "SKILL.md")) fail(`catalog.json: missing skill ${String(skill)}`);
      else if (!skill.startsWith(`teams/${team.slug}/skills/`)) fail(`catalog.json: skill must stay inside ${team.slug}`);
    }
  }

  const folders = readdirSync(join(root, "teams"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  for (const folder of folders) {
    if (!slugs.has(folder)) fail(`teams/${folder}: folder is missing from catalog.json`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${catalog.teams.length} teams.`);
}
