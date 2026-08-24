import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

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
}

interface PackageDocument {
  format: "openmaus.package";
  version: 1;
  package: BotPackage;
}

const packageDirectory = join(process.cwd(), "packages");

export function getPackages(): BotPackage[] {
  return readdirSync(packageDirectory)
    .filter((name) => name.endsWith(".mauspack.json"))
    .map((name) => {
      const document = JSON.parse(readFileSync(join(packageDirectory, name), "utf8")) as PackageDocument;
      if (document.format !== "openmaus.package" || document.version !== 1) {
        throw new Error(`${name} is not a supported OpenMausBot package`);
      }
      return document.package;
    })
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
}

export function getPackage(id: string): BotPackage | undefined {
  return getPackages().find((entry) => entry.id === id);
}

export function packageRawUrl(id: string): string {
  return `https://raw.githubusercontent.com/milind-soni/openmausbot-teams/main/packages/${id}.mauspack.json`;
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
