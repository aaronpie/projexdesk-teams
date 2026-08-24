import type { BotPackage } from "./packages";

// Pure helpers shared by the server pages and the client board — no
// filesystem access here, so client components may import freely.

const PERIOD_SUFFIX = { monthly: "/mo", weekly: "/wk", daily: "/day", total: "" } as const;

/** "$4,200" + monthly → "$4,200/mo" — the figure exactly as claimed. */
export function proofHeadline(proof: NonNullable<BotPackage["proof"]>): string {
  return `${proof.amount}${PERIOD_SUFFIX[proof.period] ?? ""}`;
}

/** Rough numeric for ordering the board. No period conversion — the board
 * ranks by the size of the claim as shown, which is honest and predictable. */
export function proofValue(entry: BotPackage): number {
  const raw = entry.proof?.amount ?? "";
  const match = raw.replace(/,/g, "").match(/([\d.]+)\s*([KkMm])?/);
  if (!match) return 0;
  const base = Number(match[1]) || 0;
  const scale = match[2]?.toLowerCase() === "m" ? 1_000_000 : match[2] ? 1_000 : 1;
  return base * scale;
}
