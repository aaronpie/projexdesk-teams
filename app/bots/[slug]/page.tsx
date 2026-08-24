import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ConnectorIcon from "@/components/ConnectorIcon";
import InstallButton from "@/components/InstallButton";
import { getPackage, getPackages, packageInstallUrl, packageRawUrl } from "@/lib/packages";

type Props = { params: Promise<{ slug: string }> };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    openGraph: { title: entry.name, description: entry.tagline, images: [] },
    twitter: { card: "summary", title: entry.name, description: entry.tagline, images: [] },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const entry = getPackage(slug);
  if (!entry) notFound();
  const chief = entry.agents.find((agent) => agent.key === entry.chiefOfStaff);

  return (
    <main className="detail-page">
      <div className="detail-wrap">
        <div className="breadcrumbs"><Link href="/">Directory</Link><span>/</span><span>{entry.category}</span></div>
        <section className="detail-hero">
          <div className="detail-main">
            <div className="eyebrow"><span /> {entry.category.toUpperCase()}</div>
            <h1>{entry.name}</h1>
            <p>{entry.tagline}</p>
            <div className="detail-actions">
              <InstallButton installUrl={packageInstallUrl(entry.id)} />
              <a className="button button-secondary" href={packageRawUrl(entry.id)} download>
                Download package
              </a>
            </div>
            <div className="detail-trust"><span>Open source</span><span>MIT licensed</span><span>No credentials included</span></div>
          </div>
          <aside className="install-summary">
            <div className="summary-label">INSTALLS</div>
            <div className="summary-stat"><strong>{entry.agents.length}</strong><span>specialist bots</span></div>
            <div className="summary-stat"><strong>{entry.rooms?.length ?? 0}</strong><span>shared room</span></div>
            <div className="summary-stat"><strong>{entry.playbooks?.length ?? 0}</strong><span>playbooks</span></div>
            <div className="summary-stat"><strong>{entry.routines?.length ?? 0}</strong><span>paused routines</span></div>
            <div className="summary-foot">About {entry.setupMinutes} minutes to review and connect.</div>
          </aside>
        </section>

        <div className="detail-layout">
          <div className="detail-content">
            <section className="content-section">
              <span className="section-kicker">WHAT IT DOES</span>
              <h2>A complete operating setup, not a prompt.</h2>
              <p className="long-copy">{entry.summary}</p>
              <div className="outcome-panels">
                {entry.outcomes.map((outcome, index) => (
                  <div key={outcome}><span>{String(index + 1).padStart(2, "0")}</span><p>{outcome}</p></div>
                ))}
              </div>
            </section>

            <section className="content-section">
              <span className="section-kicker">THE TEAM</span>
              <h2>{entry.agents.length} bots with clear ownership.</h2>
              <div className="agent-list">
                {entry.agents.map((agent) => (
                  <article key={agent.key} className="agent-row">
                    <span className="agent-maus" data-color={agent.appearance.color} />
                    <div>
                      <h3>{agent.name}{agent.key === entry.chiefOfStaff && <span>Chief of Staff</span>}</h3>
                      <p className="agent-title">{agent.title}</p>
                      <p>{agent.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {(entry.rooms?.length ?? 0) > 0 && (
              <section className="content-section">
                <span className="section-kicker">SHARED ROOMS</span>
                <h2>They arrive knowing how to work together.</h2>
                {entry.rooms?.map((room) => (
                  <article className="room-card" key={room.key}>
                    <div className="room-card-head"><h3>{room.name}</h3><span>Lead: {chief?.name ?? "Mentions"}</span></div>
                    <p>{room.bulletin}</p>
                    <div className="room-members">
                      {room.members.map((key) => <span key={key}>@{entry.agents.find((agent) => agent.key === key)?.name}</span>)}
                    </div>
                  </article>
                ))}
              </section>
            )}

            {(entry.playbooks?.length ?? 0) > 0 && (
              <section className="content-section">
                <span className="section-kicker">PLAYBOOKS</span>
                <h2>Useful process appears when the work calls for it.</h2>
                <div className="playbook-grid">
                  {entry.playbooks?.map((playbook) => (
                    <article key={playbook.key}>
                      <span>PLAYBOOK</span>
                      <h3>{playbook.name}</h3>
                      <p>{playbook.summary}</p>
                      <div>{playbook.triggers.slice(0, 4).map((trigger) => <em key={trigger}>{trigger}</em>)}</div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {(entry.examples?.length ?? 0) > 0 && (
              <section className="content-section">
                <span className="section-kicker">TRY IT</span>
                <h2>Start with a real job.</h2>
                {entry.examples?.map((example) => (
                  <div className="example-card" key={example.title}>
                    <div><span>YOU</span><p>{example.input}</p></div>
                    <div><span>PACKAGE</span><p>{example.output}</p></div>
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside className="detail-aside">
            <section>
              <h2>Connections</h2>
              {entry.requirements.apps.length === 0 ? <p>No connected apps required.</p> : entry.requirements.apps.map((app) => (
                <div className="requirement" key={app.slug}>
                  <ConnectorIcon slug={app.slug} label={app.label} />
                  <div><strong>{app.label}</strong><p>{app.reason}</p><em>{app.optional ? "Optional" : "Required"}</em></div>
                </div>
              ))}
            </section>
            {(entry.routines?.length ?? 0) > 0 && (
              <section>
                <h2>Suggested routines</h2>
                {entry.routines?.map((routine) => (
                  <div className="routine" key={routine.key}>
                    <strong>{routine.name}</strong>
                    <p>{routine.schedule.type === "daily"
                      ? `${routine.schedule.weekdays.map((day) => WEEKDAYS[day]).join(", ")} · ${routine.schedule.time}`
                      : "One time"}</p>
                    <span>Installed paused</span>
                  </div>
                ))}
              </section>
            )}
            <section>
              <h2>Package details</h2>
              <dl className="package-details">
                <div><dt>Version</dt><dd>{entry.release}</dd></div>
                <div><dt>Author</dt><dd>{entry.author.name}</dd></div>
                <div><dt>License</dt><dd>{entry.license}</dd></div>
                <div><dt>Format</dt><dd>openmaus.package v1</dd></div>
              </dl>
            </section>
            <section className="safety-note">
              <span aria-hidden="true">✓</span>
              <div><h2>Your access stays yours.</h2><p>Packages never include credentials, approval grants, conversations, memory, or private folders. You review every connection before a bot can use it.</p></div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
