import Directory, { type DirectoryEntry } from "@/components/Directory";
import { getPackages } from "@/lib/packages";

export default function Home() {
  const entries: DirectoryEntry[] = getPackages().map((entry) => ({
    id: entry.id,
    name: entry.name,
    tagline: entry.tagline,
    summary: entry.summary,
    category: entry.category,
    author: entry.author,
    featured: Boolean(entry.featured),
    setupMinutes: entry.setupMinutes,
    apps: entry.requirements.apps.map((app) => ({ slug: app.slug, label: app.label })),
    agents: entry.agents.map((agent) => ({
      name: agent.name,
      color: agent.appearance.color,
      expression: agent.appearance.mascotExpression ?? "happy",
    })),
    rooms: entry.rooms?.length ?? 0,
    playbooks: entry.playbooks?.length ?? 0,
    routines: entry.routines?.length ?? 0,
    proof: entry.proof ? { amount: entry.proof.amount, credibility: entry.proof.credibility ?? "claimed" } : null,
  }));

  return <Directory entries={entries} />;
}
