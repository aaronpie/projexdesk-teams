"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  CalendarClock,
  Clock3,
  MessageSquare,
  Search,
} from "lucide-react";

import ConnectorIcon from "@/components/ConnectorIcon";
import type { BotPackage } from "@/lib/packages";

function Roster({ entry }: { entry: BotPackage }) {
  return (
    <div className="mini-roster" aria-label={`${entry.agents.length} included bots`}>
      {entry.agents.slice(0, 6).map((agent, index) => (
        <span
          key={agent.key}
          className="mini-maus"
          data-color={agent.appearance.color}
          title={`${agent.name} — ${agent.title}`}
          style={{ zIndex: entry.agents.length - index }}
        />
      ))}
    </div>
  );
}

export default function Directory({
  packages,
  stats,
}: {
  packages: BotPackage[];
  stats: { packages: number; agents: number; playbooks: number; routines: number };
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(packages.map((entry) => entry.category))];
  const normalized = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      packages.filter((entry) => {
        if (category !== "All" && entry.category !== category) return false;
        if (!normalized) return true;
        return [
          entry.name,
          entry.tagline,
          entry.summary,
          entry.category,
          ...(entry.tags ?? []),
          ...entry.outcomes,
          ...entry.agents.flatMap((agent) => [agent.name, agent.title]),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      }),
    [category, normalized, packages],
  );

  const chooseCategory = (next: string) => {
    setCategory(next);
    document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <main>
        <section className="hero-shell">
          <div className="eyebrow"><span /> OPEN-SOURCE BOT MARKETPLACE</div>
          <h1>Bots that do the work.</h1>
          <p className="hero-copy">
            Pick an outcome. Install the complete team. Connect your apps. Turn it on.
          </p>
          <label className="hero-search">
            <Search aria-hidden="true" size={21} strokeWidth={1.8} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What should a bot do for you?"
              aria-label="Search BotMRR packages"
            />
            <kbd>/</kbd>
          </label>
          <nav className="category-chips" aria-label="Browse by outcome">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "active" : undefined}
                onClick={() => chooseCategory(item)}
              >
                {item === "All" ? "All bots" : item}
              </button>
            ))}
          </nav>
          <div className="hero-proof">
            <div><strong>{stats.packages}</strong><span>installable packages</span></div>
            <div><strong>{stats.agents}</strong><span>specialist bots</span></div>
            <div><strong>{stats.playbooks}</strong><span>embedded playbooks</span></div>
            <div><strong>0</strong><span>secrets shared</span></div>
          </div>
        </section>

        <section className="how-strip" aria-label="How BotMRR works">
          <div><span>01</span><p><strong>Pick an outcome</strong>Browse work, not model jargon.</p></div>
          <div><span>02</span><p><strong>Install the package</strong>Bots, rooms, routines, and playbooks.</p></div>
          <div><span>03</span><p><strong>Connect and run</strong>Your permissions stay in your hands.</p></div>
        </section>

        <section className="directory-section" id="directory">
          <div className="directory-head">
            <div>
              <span className="section-kicker">THE DIRECTORY</span>
              <h2>Ready-to-run outcomes</h2>
            </div>
            <p>{visible.length} {visible.length === 1 ? "package" : "packages"}</p>
          </div>

          <div className="package-grid">
            {visible.map((entry, index) => (
              <Link href={`/bots/${entry.id}`} className="package-card" key={entry.id}>
                <div className="card-topline">
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="category-label">{entry.category}</span>
                  {entry.featured && <span className="featured-label">Featured</span>}
                </div>
                <div className="card-title-row">
                  <Roster entry={entry} />
                  <span className="card-arrow"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
                </div>
                <h3>{entry.name}</h3>
                <p className="card-tagline">{entry.tagline}</p>
                <ul className="outcome-list">
                  {entry.outcomes.slice(0, 1).map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ul>
                <div className="card-connectors">
                  <span className="card-connectors-label">Connects</span>
                  <div>
                    {entry.requirements.apps.length === 0 ? (
                      <span className="connector-none">No apps required</span>
                    ) : entry.requirements.apps.slice(0, 4).map((app) => (
                      <span className="connector-chip" key={app.slug}>
                        <ConnectorIcon slug={app.slug} label={app.label} size="small" />
                        <span>{app.label}</span>
                        {app.optional && <em>Optional</em>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-meta">
                  <span title="Bots"><Bot size={13} />{entry.agents.length}</span>
                  <span title="Shared rooms"><MessageSquare size={13} />{entry.rooms?.length ?? 0}</span>
                  <span title="Playbooks"><BookOpen size={13} />{entry.playbooks?.length ?? 0}</span>
                  <span title="Suggested schedules"><CalendarClock size={13} />{entry.routines?.length ?? 0}</span>
                  <span title="Estimated setup time"><Clock3 size={13} />~{entry.setupMinutes} min</span>
                </div>
              </Link>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="empty-directory">
              <div className="empty-mark">?</div>
              <h3>No package matches that yet.</h3>
              <p>BotMRR is community-built. The missing outcome might be the next useful package.</p>
              <Link href="/publish">Publish it <ArrowUpRight size={14} /></Link>
            </div>
          )}
        </section>

        <section className="creator-callout">
          <div>
            <span className="section-kicker">BUILD THE SUPPLY</span>
            <h2>Made something useful?</h2>
            <p>Package the bots already working for you. One readable file, one pull request, one install button for everyone else.</p>
          </div>
          <Link href="/publish" className="button button-light">Publish a package <ArrowUpRight size={15} /></Link>
        </section>
      </main>
    </>
  );
}
