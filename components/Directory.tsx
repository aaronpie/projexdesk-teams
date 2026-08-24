"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { BotPackage } from "@/lib/packages";
import { proofHeadline, proofValue } from "@/lib/proof";

function Roster({ entry }: { entry: BotPackage }) {
  return (
    <div className="mini-roster" aria-label={`${entry.agents.length} included bots`}>
      {entry.agents.slice(0, 4).map((agent, index) => (
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

function claimedTotal(packages: BotPackage[]): string {
  const total = packages.reduce((sum, entry) => sum + proofValue(entry), 0);
  if (total >= 1_000_000) return `$${(total / 1_000_000).toFixed(1)}M`;
  if (total >= 1_000) return `$${Math.round(total / 1_000)}K`;
  return `$${Math.round(total)}`;
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
          entry.proof?.source.author ?? "",
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
          <h1>Bots that make money.</h1>
          <p className="hero-copy">
            Real playbooks behind public revenue claims. Pick one, hand the Markdown to your Chief of Staff, run it in any agent product.
          </p>
          <label className="hero-search">
            <Search aria-hidden="true" size={21} strokeWidth={1.8} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What should a bot earn for you?"
              aria-label="Search BotMRR playbooks"
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
            <div><strong>{claimedTotal(packages)}</strong><span>claimed by creators</span></div>
            <div><strong>{stats.packages}</strong><span>portable playbooks</span></div>
            <div><strong>{stats.agents}</strong><span>specialist bots</span></div>
            <div><strong>0</strong><span>secrets shared</span></div>
          </div>
        </section>

        <section className="directory-section" id="directory">
          <div className="directory-head">
            <div>
              <span className="section-kicker">THE BOARD</span>
              <h2>Playbooks, ranked by what their creators say they made.</h2>
            </div>
            <p>{visible.length} {visible.length === 1 ? "playbook" : "playbooks"}</p>
          </div>

          <div className="board" role="table" aria-label="BotMRR playbook board">
            <div className="board-head" role="row">
              <span className="board-rank">#</span>
              <span className="board-main">Playbook</span>
              <span className="board-cat">Category</span>
              <span className="board-bots">Bots</span>
              <span className="board-money">Money made</span>
            </div>
            {visible.map((entry, index) => (
              <Link href={`/bots/${entry.id}`} className="board-row" key={entry.id} role="row">
                <span className="board-rank">{index + 1}</span>
                <span className="board-main">
                  <Roster entry={entry} />
                  <span className="board-name">
                    <strong>{entry.name}</strong>
                    <em>{entry.tagline}</em>
                  </span>
                </span>
                <span className="board-cat">{entry.category}</span>
                <span className="board-bots">{entry.agents.length}</span>
                <span className="board-money">
                  {entry.proof ? (
                    <>
                      <strong>{proofHeadline(entry.proof)}</strong>
                      <em>
                        {entry.proof.credibility === "receipts" ? "receipts · " : "claimed · "}
                        {entry.proof.source.author}
                      </em>
                    </>
                  ) : (
                    <span className="board-money-none">—</span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          <p className="board-note">
            Figures are each creator&apos;s own public claim, linked from the playbook page. BotMRR verifies the
            post exists — never the revenue.
          </p>

          {visible.length === 0 && (
            <div className="empty-directory">
              <div className="empty-mark">?</div>
              <h3>No playbook matches that yet.</h3>
              <p>BotMRR is community-built. The missing outcome might be the next useful playbook.</p>
              <Link href="/publish">Publish it</Link>
            </div>
          )}
        </section>

        <section className="creator-callout">
          <div>
            <span className="section-kicker">BUILD THE SUPPLY</span>
            <h2>Made money with a bot?</h2>
            <p>Write down the team that already earns for you. One Markdown file, one pull request, a linked receipt, usable in every agent product.</p>
          </div>
          <Link href="/publish" className="button button-light">Publish a playbook</Link>
        </section>
      </main>
    </>
  );
}
