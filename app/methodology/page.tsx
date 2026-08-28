import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proposed verification methodology",
  description: "The standard BotMRR proposes for checking money, Bot control, attribution, and freshness without turning every claim into one vague verified badge.",
};

const checks = [
  {
    number: "01",
    title: "Money",
    body: "A future connected receipt must name the exact metric, amount, currency, period, refunds, fees, taxes, and the evidence method. None of today's source reviews meets that bar.",
  },
  {
    number: "02",
    title: "Bot control",
    body: "A future temporary nonce challenge could show that a publisher controls one shared configuration. It would not prove original authorship, because shared Bots can be copied.",
  },
  {
    number: "03",
    title: "Attribution",
    body: "Money evidence never proves a Bot caused the outcome. Attribution must remain a separate label: owner-reported, execution-evidenced, tracked, or experiment-backed.",
  },
  {
    number: "04",
    title: "Freshness",
    body: "A connected receipt should carry verified-at and data-through dates. Until a provider adapter and stale-data policy are implemented, BotMRR will show no connected badge.",
  },
];

const evidenceLadders = [
  ["Money · 0", "Source only", "A public post contains a claim. This proves only that the claim was published."],
  ["Money · 1", "Artifact reviewed", "A dated, redacted settlement or provider artifact supports the amount, with limitations disclosed."],
  ["Money · 2", "Provider connected", "A real, least-privilege adapter supplies the exact metric and period. This label is unavailable today."],
  ["Bot · 0", "Share link located", "A submitted x.ai/bot link exists. It does not establish who first authored the Bot."],
  ["Bot · 1", "Publisher control checked", "A time-limited challenge shows control of one shared configuration. This flow is not implemented yet."],
  ["Attribution · 0", "Owner-reported", "The operator describes how the Bot contributed; there is no independent causal link."],
  ["Attribution · 1", "Execution evidenced", "Logs or artifacts show the Bot did the stated work, but do not prove that work produced the money."],
  ["Attribution · 2", "Tracked", "A Bot-specific link, coupon, CRM event, or experiment follows the workflow into the outcome. This is unavailable today."],
];

export default function MethodologyPage() {
  return (
    <main className="methodology-page">
      <section className="methodology-hero">
        <p className="overline">PROPOSED BOTMRR STANDARD · V0.1</p>
        <h1>Verify the money, the bot, and the link between them.</h1>
        <p>
          “Verified” is too vague for an agent that can touch inboxes, storefronts, CRMs, and payment systems. This is the standard BotMRR intends to build toward. Today&apos;s site contains public-source reviews only and zero connected outcome receipts.
        </p>
        <div className="detail-actions">
          <Link href="/publish" className="button button-primary">Suggest a source</Link>
          <Link href="/#evidence" className="button button-secondary">Browse current claims</Link>
        </div>
      </section>

      <section className="methodology-grid" aria-label="Independent verification checks">
        {checks.map((check) => (
          <article key={check.number}>
            <span>{check.number}</span>
            <h2>{check.title}</h2>
            <p>{check.body}</p>
          </article>
        ))}
      </section>

      <section className="methodology-table">
        <p className="overline">INDEPENDENT LADDERS</p>
        <h2>Advance one check without inflating the others.</h2>
        <div className="methodology-levels">
          {evidenceLadders.map(([level, title, body]) => (
            <div key={level}>
              <span>{level}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="package-anatomy">
        <div>
          <span className="section-kicker">THE CURRENT RELEASE</span>
          <h2>Source review now. Connected receipts later.</h2>
          <p>
            BotMRR currently records public claims, the available source, and what remains missing. The first verification milestone should cover gross sales, net collected, payout earnings, and MRR only. Savings, deals, and trading need separate standards before they can earn stronger labels.
          </p>
        </div>
        <pre><code>{`public source review
├── original source URL
├── publisher + publish date
├── claim category
├── submitted share link
├── what we observed
├── what remains missing
├── review date
└── visible public challenge`}</code></pre>
      </section>

      <section className="never-package">
        <span className="section-kicker">CURRENT PRIVACY BOUNDARY</span>
        <h2>Ask for public sources—not private financial data.</h2>
        <div>
          <span>No secret keys in forms</span>
          <span>No customer PII requested</span>
          <span>No private evidence in GitHub</span>
          <span>No provider badge before an adapter exists</span>
          <span>No copied Grok configuration</span>
          <span>No financial advice</span>
        </div>
        <p className="boundary-note">If someone accidentally posts private or personal data in a public issue, maintainers should remove it promptly; the form cannot guarantee prevention.</p>
      </section>
    </main>
  );
}
