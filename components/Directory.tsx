"use client";

import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  claimReviews,
  claimReviewStateLabel,
  fieldNotes,
  researchStats,
  type ClaimReviewState,
  type EvidenceCheck,
  type EvidenceCheckState,
} from "@/lib/research";

const reviewedDate = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${researchStats.reviewedAt}T00:00:00Z`));

const claimTypes = Array.from(new Set(claimReviews.map((entry) => entry.claim.type)));
const noteKinds = Array.from(new Set(fieldNotes.map((entry) => entry.kind)));

function formatPublishedAt(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatReviewedAt(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function statusClass(state: ClaimReviewState): string {
  if (state === "creator-ledger") return "status-ledger";
  if (state === "publicly-challenged") return "status-disputed";
  return "status-source";
}

function checkClass(state: EvidenceCheckState): string {
  if (state === "limited") return "check-limited";
  if (state === "challenged") return "check-challenged";
  return "check-missing";
}

function initials(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TrustIndicator({ shortLabel, label, check }: { shortLabel: string; label: string; check: EvidenceCheck }) {
  return (
    <span
      className={`trust-dot ${checkClass(check.state)}`}
      aria-label={`${label}: ${check.label}`}
      title={`${label}: ${check.label}`}
    >
      <span aria-hidden="true">{shortLabel}</span>
    </span>
  );
}

export default function Directory({ packageIds }: { packageIds: string[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [claimFilter, setClaimFilter] = useState("All");
  const [noteFilter, setNoteFilter] = useState("All");
  const packageIdSet = useMemo(() => new Set(packageIds), [packageIds]);
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();

  const filteredClaims = useMemo(() => {
    return claimReviews.filter((entry) => {
      if (claimFilter !== "All" && entry.claim.type !== claimFilter) return false;

      const haystack = [
        entry.title,
        entry.creator,
        entry.handle,
        entry.claim.headline,
        entry.claim.type,
        claimReviewStateLabel(entry.state),
        entry.checks.money.label,
        entry.checks.botControl.label,
        entry.checks.attribution.label,
        entry.observed,
        entry.missing,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return !normalizedSearch || haystack.includes(normalizedSearch);
    });
  }, [claimFilter, normalizedSearch]);

  const filteredNotes = useMemo(() => {
    return fieldNotes.filter((entry) => {
      if (noteFilter !== "All" && entry.kind !== noteFilter) return false;

      const haystack = [
        entry.title,
        entry.summary,
        entry.kind,
        entry.topic,
        entry.source.author,
        entry.source.handle,
        entry.template?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return !normalizedSearch || haystack.includes(normalizedSearch);
    });
  }, [noteFilter, normalizedSearch]);

  return (
    <main>
      <section className="launch-note" aria-label="Grok Bot launch update">
        <span className="launch-dot" aria-hidden="true" />
        <strong>Launch watch</strong>
        <span>Grok Bot templates became publicly shareable on 28 Aug 2026.</span>
        <a href="https://x.com/bot/status/2093376523919323618" target="_blank" rel="noreferrer">
          Official post <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="directory-hero page-shell">
        <div className="directory-hero-grid">
          <div className="directory-intro">
            <p className="overline">SOURCE-CHECKED GROK BOT DIRECTORY</p>
            <h1>
              Find the bots.
              <span> Follow the money.</span>
            </h1>
            <p className="hero-lede">
              A searchable catalog of public Grok Bot workflows and money claims, with the original source and every
              evidence gap kept visible.
            </p>

            <div className="directory-search" role="search">
              <label htmlFor="directory-search">Search bots, creators, outcomes, or topics</label>
              <div className="directory-search-field">
                <Search aria-hidden="true" size={19} strokeWidth={1.8} />
                <input
                  id="directory-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search bots, creators, outcomes, or topics…"
                  autoComplete="off"
                  aria-describedby="directory-search-help"
                />
              </div>
              <p id="directory-search-help">
                One search filters both the money claims and the field directory below.
              </p>
            </div>

            <nav className="directory-jumps" aria-label="Directory sections">
              <a href="#evidence">
                <strong>{researchStats.claimReviews}</strong>
                <span>money claims</span>
              </a>
              <a href="#field-notes">
                <strong>{researchStats.fieldNotes}</strong>
                <span>field notes</span>
              </a>
              <a href="#field-notes">
                <strong>{researchStats.publicTemplates}</strong>
                <span>public templates</span>
              </a>
            </nav>
          </div>

          <aside className="directory-stats" aria-label="Verification snapshot">
            <div className="directory-stat directory-stat-primary">
              <span>Money sources connected</span>
              <strong>{researchStats.connectedClaims}</strong>
              <p>Public posts are leads, not payment proof.</p>
            </div>
            <div className="directory-stat">
              <span>Claim sources reviewed</span>
              <strong>{researchStats.claimReviews}</strong>
            </div>
            <div className="directory-stat">
              <span>Public challenges flagged</span>
              <strong>{researchStats.challengedClaims}</strong>
            </div>
            <p className="directory-reviewed">Snapshot reviewed {reviewedDate}</p>
          </aside>
        </div>
      </section>

      <section className="evidence-section page-shell" id="evidence">
        <header className="section-heading directory-section-heading">
          <div>
            <p className="overline">MONEY CLAIM DIRECTORY</p>
            <h2>What people say their bots earned or saved.</h2>
          </div>
          <p>
            These are source reviews, not verified outcomes. Amounts use different metrics and periods, so entries are
            not ranked or added together.
          </p>
        </header>

        <div className="directory-toolbar">
          <div className="filter-chips" aria-label="Filter money claims by metric">
            {["All", ...claimTypes].map((filter) => (
              <button
                className={`filter-chip ${claimFilter === filter ? "filter-chip-active" : ""}`}
                type="button"
                aria-pressed={claimFilter === filter}
                onClick={() => setClaimFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="directory-count" aria-live="polite">
            Showing <strong>{filteredClaims.length}</strong> of {researchStats.claimReviews} claims
          </p>
        </div>

        {filteredClaims.length > 0 ? (
          <div className="claim-board">
            <div className="claim-board-head" aria-hidden="true">
              <span>#</span>
              <span>Bot / outcome</span>
              <span>Publisher</span>
              <span>Money</span>
              <span>Evidence</span>
              <span />
            </div>

            {filteredClaims.map((entry) => {
              const sourceIndex = claimReviews.findIndex((claim) => claim.id === entry.id) + 1;

              return (
                <details
                  className={`claim-row ${entry.state === "publicly-challenged" ? "claim-row-disputed" : ""}`}
                  key={entry.id}
                >
                  <summary className="claim-summary">
                    <span className="claim-number">{String(sourceIndex).padStart(2, "0")}</span>
                    <div className="claim-identity">
                      <span className="claim-avatar" aria-hidden="true">{initials(entry.title)}</span>
                      <div>
                        <h3>{entry.title}</h3>
                        <p>{entry.observed}</p>
                      </div>
                    </div>
                    <div className="claim-publisher">
                      <strong>{entry.creator}</strong>
                      <span>{entry.handle}</span>
                    </div>
                    <div className="claim-money">
                      <strong>{entry.claim.headline}</strong>
                      <span>{entry.claim.type}</span>
                    </div>
                    <div className="claim-evidence">
                      <span className={`status-badge ${statusClass(entry.state)}`}>
                        <i aria-hidden="true" />
                        {claimReviewStateLabel(entry.state)}
                      </span>
                      <span className="trust-dots" aria-label="Evidence checks">
                        <TrustIndicator shortLabel="M" label="Money" check={entry.checks.money} />
                        <TrustIndicator shortLabel="B" label="Bot control" check={entry.checks.botControl} />
                        <TrustIndicator shortLabel="A" label="Attribution" check={entry.checks.attribution} />
                      </span>
                    </div>
                    <ChevronDown className="claim-chevron" aria-hidden="true" size={18} />
                  </summary>

                  <div className="claim-expanded">
                    <dl className="claim-expanded-grid" aria-label="Independent evidence checks">
                      <div>
                        <dt>Money</dt>
                        <dd className={checkClass(entry.checks.money.state)}>
                          <i aria-hidden="true" />
                          {entry.checks.money.label}
                        </dd>
                      </div>
                      <div>
                        <dt>Bot control</dt>
                        <dd className={checkClass(entry.checks.botControl.state)}>
                          <i aria-hidden="true" />
                          {entry.checks.botControl.label}
                        </dd>
                      </div>
                      <div>
                        <dt>Attribution</dt>
                        <dd className={checkClass(entry.checks.attribution.state)}>
                          <i aria-hidden="true" />
                          {entry.checks.attribution.label}
                        </dd>
                      </div>
                    </dl>

                    <dl className="claim-audit">
                      <div>
                        <dt>What we observed</dt>
                        <dd>{entry.observed}</dd>
                      </div>
                      <div>
                        <dt>Still missing</dt>
                        <dd>{entry.missing}</dd>
                      </div>
                    </dl>

                    <div className="claim-expanded-footer">
                      <div className="claim-links">
                        {entry.sources.map((source) => (
                          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                            {source.label} <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                        {entry.template && (
                          <a href={entry.template.url} target="_blank" rel="noreferrer">
                            {entry.template.name} <span aria-hidden="true">↗</span>
                          </a>
                        )}
                        {entry.relatedPlaybookId && packageIdSet.has(entry.relatedPlaybookId) && (
                          <Link href={`/bots/${entry.relatedPlaybookId}`}>Independent workflow →</Link>
                        )}
                      </div>
                      <span>Reviewed {formatReviewedAt(entry.reviewedAt)}</span>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <strong>No money claims match this view.</strong>
            <p>Try another metric or clear the search field.</p>
          </div>
        )}

        <p className="ledger-footnote">
          Entry numbers are references, not ranks. “Source only” means the public post was available when reviewed; it
          does not verify the amount. A creator-run ledger is still creator-operated.
        </p>
      </section>

      <section className="method-strip" id="method">
        <div className="page-shell method-strip-inner">
          <header>
            <p className="overline">THE BOTMRR STANDARD</p>
            <h2>One claim. Three independent checks.</h2>
          </header>
          <div className="method-checks">
            <div className="method-check">
              <span>M</span>
              <div><strong>Money</strong><p>Did a payment, payout, or balance exist?</p></div>
            </div>
            <div className="method-check">
              <span>B</span>
              <div><strong>Bot control</strong><p>Can the publisher show control of the shared bot?</p></div>
            </div>
            <div className="method-check">
              <span>A</span>
              <div><strong>Attribution</strong><p>What evidence connects the outcome to the bot?</p></div>
            </div>
          </div>
          <Link href="/methodology">Read the full methodology →</Link>
        </div>
      </section>

      <section className="notes-section page-shell" id="field-notes">
        <header className="section-heading directory-section-heading">
          <div>
            <p className="overline">GROK BOT FIELD DIRECTORY</p>
            <h2>Templates, workflows, and useful launch signals.</h2>
          </div>
          <p>
            Source-backed discovery records from launch week. These are useful ideas, not endorsements or proof that a
            bot produces an outcome.
          </p>
        </header>

        <div className="directory-toolbar">
          <div className="filter-chips" aria-label="Filter field notes by kind">
            {["All", ...noteKinds].map((filter) => (
              <button
                className={`filter-chip ${noteFilter === filter ? "filter-chip-active" : ""}`}
                type="button"
                aria-pressed={noteFilter === filter}
                onClick={() => setNoteFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="directory-count" aria-live="polite">
            Showing <strong>{filteredNotes.length}</strong> of {researchStats.fieldNotes} records
          </p>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="notes-board">
            <div className="notes-board-head" aria-hidden="true">
              <span>#</span>
              <span>Bot / workflow</span>
              <span>Publisher</span>
              <span>Category</span>
              <span>Access</span>
            </div>

            {filteredNotes.map((entry) => {
              const sourceIndex = fieldNotes.findIndex((note) => note.id === entry.id) + 1;

              return (
                <article className="note-row" key={entry.id}>
                  <span className="note-number">{String(sourceIndex).padStart(2, "0")}</span>
                  <div className="note-summary">
                    <h3>{entry.title}</h3>
                    <p>{entry.summary}</p>
                  </div>
                  <div className="note-publisher">
                    <strong>{entry.source.author}</strong>
                    <span>{entry.source.handle}</span>
                    <time dateTime={entry.publishedAt}>{formatPublishedAt(entry.publishedAt)}</time>
                  </div>
                  <div className="note-category">
                    <span>{entry.kind}</span>
                    <small>{entry.topic}</small>
                  </div>
                  <div className="note-access">
                    <a href={entry.source.url} target="_blank" rel="noreferrer">
                      Original source <span aria-hidden="true">↗</span>
                    </a>
                    {entry.template && (
                      <a href={entry.template.url} target="_blank" rel="noreferrer">
                        {entry.template.name} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {entry.relatedPlaybookId && packageIdSet.has(entry.relatedPlaybookId) && (
                      <Link href={`/bots/${entry.relatedPlaybookId}`}>Independent workflow →</Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <strong>No directory records match this view.</strong>
            <p>Try another category or clear the search field.</p>
          </div>
        )}
      </section>

      <section className="directory-cta page-shell">
        <div>
          <p className="overline">ADD A PUBLIC RECEIPT</p>
          <h2>Made or saved money with a Grok Bot?</h2>
          <p>Share the post and bot link. BotMRR will record the source without upgrading it into proof.</p>
        </div>
        <Link href="/publish" className="button button-light">Suggest a public source</Link>
      </section>
    </main>
  );
}
