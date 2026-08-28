import Link from "next/link";

import type { BotPackage } from "@/lib/packages";
import {
  claimReviews,
  claimReviewStateLabel,
  fieldNotes,
  researchStats,
  type ClaimReviewState,
  type EvidenceCheckState,
} from "@/lib/research";

const reviewedDate = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${researchStats.reviewedAt}T00:00:00Z`));

function formatPublishedAt(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
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

export default function Directory({ packages }: { packages: BotPackage[] }) {
  const packageIds = new Set(packages.map((entry) => entry.id));

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

      <section className="ledger-hero page-shell">
        <div className="hero-intro">
          <p className="overline">INDEPENDENT EVIDENCE LEDGER</p>
          <h1>
            Receipts for the
            <span> bot economy.</span>
          </h1>
          <p className="hero-lede">
            Grok&apos;s shared templates show what a bot is meant to do. BotMRR records what people say happened after
            they ran one &mdash; with money, ownership, and attribution kept as separate questions.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#evidence">
              Browse the evidence
            </a>
            <Link className="button button-secondary" href="/publish">
              Suggest a source
            </Link>
          </div>
          <p className="independence-note">
            Independent and open source. Not affiliated with xAI. No financial claims are connected yet.
          </p>
        </div>

        <aside className="proof-register" aria-label="BotMRR verification snapshot">
          <div className="register-head">
            <div>
              <span className="register-mark" aria-hidden="true">B</span>
              <div>
                <strong>Verification snapshot</strong>
                <span>Reviewed {reviewedDate}</span>
              </div>
            </div>
            <span className="register-id">#0001</span>
          </div>
          <div className="register-total">
            <span>Connected money claims</span>
            <strong>{researchStats.connectedClaims}</strong>
            <p>We will not paint a self-reported post green.</p>
          </div>
          <dl className="register-lines">
            <div>
              <dt>Public sources reviewed</dt>
              <dd>{researchStats.fieldNotes}</dd>
            </div>
            <div>
              <dt>Creator-linked templates</dt>
              <dd>{researchStats.publicTemplates}</dd>
            </div>
            <div>
              <dt>Claim sources reviewed</dt>
              <dd>{researchStats.claimReviews}</dd>
            </div>
            <div>
              <dt>Public challenges flagged</dt>
              <dd>{researchStats.challengedClaims}</dd>
            </div>
          </dl>
          <div className="register-stamp">SOURCE-FIRST · NO FALSE TOTALS</div>
        </aside>
      </section>

      <section className="metric-strip page-shell" aria-label="Research totals">
        <div><strong>{researchStats.fieldNotes}</strong><span>field notes</span></div>
        <div><strong>{researchStats.publicTemplates}</strong><span>live share links</span></div>
        <div><strong>{researchStats.claimReviews}</strong><span>claim sources reviewed</span></div>
        <div><strong>{researchStats.connectedClaims}</strong><span>money connected</span></div>
      </section>

      <section className="evidence-section page-shell" id="evidence">
        <header className="section-heading">
          <div>
            <p className="overline">PUBLIC CLAIM REVIEW</p>
            <h2>Claims, with the gaps left in.</h2>
          </div>
          <p>
            These are research records, not verified outcomes or a leaderboard. Deal value is not cash, savings are
            not revenue, and an account balance is not profit.
          </p>
        </header>

        <div className="case-grid">
          {claimReviews.map((entry, index) => (
            <article className={`case-card ${entry.state === "publicly-challenged" ? "case-card-disputed" : ""}`} key={entry.id}>
              <div className="case-topline">
                <span className="case-index">{String(index + 1).padStart(2, "0")}</span>
                <span className={`status-badge ${statusClass(entry.state)}`}>
                  <i aria-hidden="true" />
                  {claimReviewStateLabel(entry.state)}
                </span>
              </div>
              <div className="case-claim">
                <strong>{entry.claim.headline}</strong>
                <span>{entry.claim.type}</span>
              </div>
              <div className="case-title">
                <h3>{entry.title}</h3>
                <p>{entry.creator} <span>{entry.handle}</span></p>
              </div>
              <dl className="case-checks" aria-label="Independent evidence checks">
                <div>
                  <dt>Money</dt>
                  <dd className={checkClass(entry.checks.money.state)}><i aria-hidden="true" />{entry.checks.money.label}</dd>
                </div>
                <div>
                  <dt>Bot control</dt>
                  <dd className={checkClass(entry.checks.botControl.state)}><i aria-hidden="true" />{entry.checks.botControl.label}</dd>
                </div>
                <div>
                  <dt>Attribution</dt>
                  <dd className={checkClass(entry.checks.attribution.state)}><i aria-hidden="true" />{entry.checks.attribution.label}</dd>
                </div>
              </dl>
              <dl className="case-audit">
                <div>
                  <dt>What we observed</dt>
                  <dd>{entry.observed}</dd>
                </div>
                <div>
                  <dt>Still missing</dt>
                  <dd>{entry.missing}</dd>
                </div>
              </dl>
              <div className="case-links">
                {entry.sources.map((source) => (
                  <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                    {source.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
                {entry.template && (
                  <a href={entry.template.url} target="_blank" rel="noreferrer">
                    Open template <span aria-hidden="true">↗</span>
                  </a>
                )}
                {entry.relatedPlaybookId && packageIds.has(entry.relatedPlaybookId) && (
                  <Link href={`/bots/${entry.relatedPlaybookId}`}>Independent workflow →</Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="ledger-footnote">
          “Source only” means the linked public post was available on {reviewedDate}; it does not verify the amount.
          A creator-run ledger remains creator-operated. “Publicly challenged” records a visible evidence challenge,
          not a final adjudication by BotMRR.
        </p>
      </section>

      <section className="method-section" id="method">
        <div className="page-shell method-shell">
          <header className="method-heading">
            <p className="overline">THE BOTMRR STANDARD</p>
            <h2>A green check should never mean more than it says.</h2>
            <p>The proposed standard keeps three questions independent and dates every answer.</p>
          </header>
          <div className="method-grid">
            <article>
              <span>01</span>
              <h3>Did the money exist?</h3>
              <p>A future receipt needs a real evidence method plus the exact metric, period, refunds, fees, and currency. None is connected today.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Who controls the bot?</h3>
              <p>A future nonce challenge could show control of one shared configuration—not original authorship. That flow is not implemented yet.</p>
            </article>
            <article>
              <span>03</span>
              <h3>What did the bot influence?</h3>
              <p>Owner reports are labeled as reports. Stronger attribution needs a tracked link, coupon, CRM event, or experiment.</p>
            </article>
            <article>
              <span>04</span>
              <h3>How fresh is the receipt?</h3>
              <p>A connected result should carry a data-through date. No provider connection will receive a badge until stale-data handling exists.</p>
            </article>
          </div>
          <div className="method-bottom">
            <p>
              A payment connection proves a payment. It does <em>not</em> prove a bot caused it.
            </p>
            <Link href="/methodology">Read the full methodology →</Link>
          </div>
        </div>
      </section>

      <section className="notes-section page-shell" id="field-notes">
        <header className="section-heading notes-heading">
          <div>
            <p className="overline">GROK BOT FIELD NOTES</p>
            <h2>What people are actually building.</h2>
          </div>
          <p>
            Fifteen source-backed signals from launch week. Useful for discovery; never silently promoted into the evidence ledger.
          </p>
        </header>

        <div className="notes-list">
          {fieldNotes.map((entry, index) => (
            <article className="note-row" key={entry.id}>
              <span className="note-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="note-body">
                <div className="note-labels">
                  <span>{entry.kind}</span>
                  <span>{entry.topic}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <div className="note-meta">
                  <span>{entry.source.author} · {entry.source.handle}</span>
                  <time dateTime={entry.publishedAt}>{formatPublishedAt(entry.publishedAt)}</time>
                </div>
              </div>
              <div className="note-actions">
                <a href={entry.source.url} target="_blank" rel="noreferrer">
                  View source <span aria-hidden="true">↗</span>
                </a>
                {entry.template && (
                  <a href={entry.template.url} target="_blank" rel="noreferrer" className="note-template-link">
                    {entry.template.name} <span aria-hidden="true">↗</span>
                  </a>
                )}
                {entry.relatedPlaybookId && packageIds.has(entry.relatedPlaybookId) && (
                  <Link href={`/bots/${entry.relatedPlaybookId}`}>Independent workflow →</Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="position-section page-shell">
        <div className="position-copy">
          <p className="overline">WHERE BOTMRR FITS</p>
          <h2>Discovery is crowded. Proof is still empty.</h2>
          <p>
            xAI hosts the shared template, and independent directories already catalog what people are building. BotMRR should not clone either layer.
            Its durable job is to make outcome claims comparable, challengeable, and current.
          </p>
        </div>
        <div className="position-map" aria-label="Bot ecosystem layers">
          <div><span>01</span><strong>Grok Bot</strong><p>Create and share the template.</p></div>
          <div><span>02</span><strong>Directories</strong><p>Help people discover what exists.</p></div>
          <div className="position-active"><span>03</span><strong>BotMRR</strong><p>Show what the evidence supports.</p></div>
        </div>
      </section>

      <section className="closing-callout page-shell">
        <div>
          <p className="overline">BUILD THE FIRST REAL RECEIPT</p>
          <h2>Made money with a Grok Bot?</h2>
          <p>Start with the public post and share link. BotMRR will record it as a source lead and keep every caveat visible.</p>
        </div>
        <Link href="/publish" className="button button-light">Suggest a public source</Link>
      </section>
    </main>
  );
}
