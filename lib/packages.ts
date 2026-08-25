import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

import { proofValue } from "./proof";

export type MausColor =
  | "green"
  | "blue"
  | "red"
  | "orange"
  | "purple"
  | "cyan"
  | "pink"
  | "yellow"
  | "teal"
  | "coral";

export interface BotPackage {
  id: string;
  release: string;
  name: string;
  tagline: string;
  summary: string;
  category: string;
  author: { name: string; url?: string };
  license: string;
  featured?: boolean;
  tags?: string[];
  outcomes: string[];
  setupMinutes: number;
  requirements: {
    apps: Array<{ slug: string; label: string; reason: string; optional?: boolean }>;
    capabilities: string[];
    platforms?: string[];
  };
  agents: Array<{
    key: string;
    name: string;
    title: string;
    description: string;
    appearance: { color: MausColor; mascotExpression?: string };
    playbooks?: string[];
  }>;
  chiefOfStaff?: string;
  rooms?: Array<{
    key: string;
    name: string;
    members: string[];
    bulletin: string;
    defaultResponder:
      | { kind: "agent"; agent: string }
      | { kind: "everyone" }
      | { kind: "mentions" };
  }>;
  routines?: Array<{
    key: string;
    name: string;
    agent: string;
    prompt: string;
    runOn: "maus" | "cloud";
    schedule:
      | { type: "once"; at: number }
      | { type: "daily"; time: string; weekdays: number[] };
    durationMinutes: number;
    enabledAfterInstall: false;
  }>;
  playbooks?: Array<{
    key: string;
    name: string;
    summary: string;
    triggers: string[];
    instructions: string;
  }>;
  examples?: Array<{ title: string; input: string; output: string }>;
  /** A public money claim behind this playbook. Always the creator's own
   * claim, always linked to its source — BotMRR verifies the post exists,
   * never the revenue. */
  proof?: {
    amount: string;
    period: "monthly" | "weekly" | "daily" | "total";
    source: { url: string; author: string; date?: string; quote?: string };
    credibility?: "receipts" | "claimed";
  };
}

export { proofHeadline, proofValue } from "./proof";

const packageDirectory = join(process.cwd(), "packages");

function parsePackageMarkdown(name: string, markdown: string): BotPackage {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${name} is missing YAML frontmatter`);
  const metadata = parseYaml(match[1]) as Record<string, unknown>;
  if (metadata.botmrr !== 1) throw new Error(`${name} is not a supported BotMRR playbook`);
  if (!markdown.includes("## Activation") || !markdown.includes("## Team")) {
    throw new Error(`${name} is missing its readable activation instructions`);
  }
  const { botmrr: _format, ...definition } = metadata;
  return definition as unknown as BotPackage;
}

export function getPackages(): BotPackage[] {
  return readdirSync(packageDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => parsePackageMarkdown(name, readFileSync(join(packageDirectory, name), "utf8")))
    .sort(
      (a, b) =>
        // the board reads like a leaderboard: biggest public claim first,
        // then featured, then name — playbooks without receipts still list
        proofValue(b) - proofValue(a) ||
        Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
        a.name.localeCompare(b.name),
    );
}

export function getPackage(id: string): BotPackage | undefined {
  return getPackages().find((entry) => entry.id === id);
}

/** The playbook exactly as it lives on disk — what people copy and paste. */
export function getPackageMarkdown(id: string): string | undefined {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) return undefined;
  try {
    return readFileSync(join(packageDirectory, `${id}.md`), "utf8");
  } catch {
    return undefined;
  }
}

export function packageRawUrl(id: string): string {
  return `https://raw.githubusercontent.com/milind-soni/openmausbot-teams/main/packages/${id}.md`;
}

export function packageInstallUrl(id: string): string {
  return `openmausbot://install?url=${encodeURIComponent(packageRawUrl(id))}`;
}

export function packageStats(packages: BotPackage[]) {
  return {
    packages: packages.length,
    agents: packages.reduce((sum, entry) => sum + entry.agents.length, 0),
    playbooks: packages.reduce((sum, entry) => sum + (entry.playbooks?.length ?? 0), 0),
    routines: packages.reduce((sum, entry) => sum + (entry.routines?.length ?? 0), 0),
  };
}
