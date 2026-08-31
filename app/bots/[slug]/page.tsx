import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ConnectorIcon from "@/components/ConnectorIcon";
import CopyMarkdown from "@/components/CopyMarkdown";
import InstallButton from "@/components/InstallButton";
import MausAvatar from "@/components/MausAvatar";
import { getPackage, getPackageMarkdown, getPackages, packageInstallUrl, packageRawUrl } from "@/lib/packages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPackages().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPackage(slug);
  if (!entry) return {};
  return {
    title: entry.name,
    description: entry.tagline,
    openGraph: { title: entry.name, description: entry.tagline },
    twitter: { card: "summary", title: entry.name, description: entry.tagline },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const entry = getPackage(slug);
  const markdown = getPackageMarkdown(slug);
  if (!entry || !markdown) notFound();

  const related = getPackages()
    .filter((candidate) => candidate.id !== entry.id)
    .sort((a, b) => Number(b.category === entry.category) - Number(a.category === entry.category))
    .slice(0, 3);

  return (
    <main className="detail-page">
      <article className="detail-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">All teams</Link><span>/</span><span>{entry.category}</span>
        </nav>

        <section className="detail-hero">
          <div className="detail-heading-row">
            <div>
              <div className="detail-title">
                <MausAvatar
                  color={entry.agents[0]?.appearance.color ?? "green"}
                  expression={entry.agents[0]?.appearance.mascotExpression ?? "happy"}
                  size={64}
                  animated
                />
                <h1>{entry.name}</h1>
              </div>
              <p className="detail-author">Contributed by <strong>{entry.author.name}</strong></p>
            </div>
            <div className="detail-install">
              <InstallButton installUrl={packageInstallUrl(entry.id)} />
              <span>{entry.agents.length} bots · about {entry.setupMinutes} min setup</span>
            </div>
          </div>

          <div className="detail-summary">
            <p>{entry.summary || entry.tagline}</p>
          </div>

          <p className="detail-universal">
            Don&apos;t use OpenMausBot? <CopyMarkdown markdown={markdown} label="Copy for another Chief of Staff" />
          </p>

          <section className="detail-section" aria-labelledby="works-with-heading">
            <h2 id="works-with-heading">Works with</h2>
            <div className="detail-connectors">
              {entry.requirements.apps.map((app) => (
                <span className="connector-chip" key={app.slug}>
                  <ConnectorIcon slug={app.slug} label={app.label} size="small" />
                  <span>{app.label}</span>
                  {app.optional && <small>optional</small>}
                </span>
              ))}
              {entry.requirements.apps.length === 0 && <span className="connector-none">No connector required</span>}
            </div>
          </section>

          <section className="detail-section" aria-labelledby="team-heading">
            <h2 id="team-heading">Meet the team</h2>
            <div className="member-grid">
              {entry.agents.map((agent) => (
                <div className="member-card" key={agent.key}>
                  <MausAvatar
                    color={agent.appearance.color}
                    expression={agent.appearance.mascotExpression ?? "happy"}
                    size={42}
                  />
                  <div><strong>{agent.name}</strong><span>{agent.title}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-facts" aria-label="Package contents">
            <div><strong>{entry.rooms?.length ?? 0}</strong><span>channels</span></div>
            <div><strong>{entry.playbooks?.length ?? 0}</strong><span>playbooks</span></div>
            <div><strong>{entry.routines?.length ?? 0}</strong><span>paused routines</span></div>
          </section>

          {entry.proof && (
            <aside className="detail-proof">
              <span>Public outcome claim</span>
              <strong>{entry.proof.amount}</strong>
              <p>
                Reported by {entry.proof.source.author}. This is source context, not independently verified revenue.
                {" "}<a href={entry.proof.source.url} target="_blank" rel="noreferrer">View source ↗</a>
              </p>
            </aside>
          )}

          <details className="template-source">
            <summary>View the complete Markdown playbook</summary>
            <div className="template-source-head">
              <span>{entry.id}.md</span>
              <div><CopyMarkdown markdown={markdown} label="Copy" /><a href={packageRawUrl(entry.id)} target="_blank" rel="noreferrer">Raw file ↗</a></div>
            </div>
            <pre>{markdown}</pre>
          </details>
        </section>
      </article>

      <section className="related-section" aria-labelledby="related-heading">
        <h2 id="related-heading">Related teams</h2>
        <div className="related-grid">
          {related.map((candidate) => (
            <article className="related-card" key={candidate.id}>
              <Link href={`/bots/${candidate.id}`}>
                <div>
                  <h3>{candidate.name}</h3>
                  <MausAvatar
                    color={candidate.agents[0]?.appearance.color ?? "green"}
                    expression={candidate.agents[0]?.appearance.mascotExpression ?? "happy"}
                    size={42}
                  />
                </div>
                <p>{candidate.tagline}</p>
                <span>{candidate.agents.length} bots</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
