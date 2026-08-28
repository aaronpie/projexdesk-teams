import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Suggest a public source",
  description: "Suggest a public Grok Bot post, template, or outcome claim for BotMRR's research queue.",
};

const issueUrl = "https://github.com/milind-soni/openmausbot-teams/issues/new?template=evidence.yml";

const steps = [
  ["01", "Start with the original", "Bring the publisher's own public post and the submitted x.ai/bot share link when one exists. Roundups can help discovery, but they are not the primary source."],
  ["02", "Name the claim precisely", "Say gross sales, net collected, MRR, deal value, profit, savings, recovered cash, credit, or account balance. Include the currency and period when the post provides them."],
  ["03", "Declare the gaps", "Link only public supporting material, then say what is still missing or publicly challenged. Do not attach private receipts, exports, contracts, or customer data to GitHub."],
];

export default function PublishPage() {
  return (
    <main className="publish-page">
      <section className="publish-hero">
        <p className="overline">PUBLIC RESEARCH QUEUE</p>
        <h1>Suggest a Grok Bot source worth checking.</h1>
        <p>
          A submission creates a research lead—not a verified badge. BotMRR records the named publisher, the original public source, the submitted share link, and exactly what remains unproven.
        </p>
        <div className="detail-actions">
          <a className="button button-primary" href={issueUrl} target="_blank" rel="noreferrer">Suggest a public source ↗</a>
          <Link className="button button-secondary" href="/methodology">Read the standard</Link>
        </div>
      </section>

      <section className="publish-steps">
        {steps.map(([number, title, body]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="package-anatomy">
        <div>
          <span className="section-kicker">A USEFUL RESEARCH LEAD</span>
          <h2>Enough context to inspect the source fairly.</h2>
          <p>
            This repository does not have a private evidence-review channel yet. Keep the submission entirely public and omit anything confidential, personal, contractual, or account-specific.
          </p>
        </div>
        <pre><code>{`public source suggestion
├── submitted Grok Bot link
├── publisher's primary source
├── stated metric + period
├── what the bot did
├── public supporting links
├── known gaps or challenge
├── submitter relationship
└── no private attachments`}</code></pre>
      </section>

      <section className="never-package">
        <span className="section-kicker">NEVER POST PUBLICLY</span>
        <h2>Keep the proof useful without exposing people.</h2>
        <div>
          <span>Credentials</span>
          <span>Customer names</span>
          <span>Email addresses</span>
          <span>Transaction IDs</span>
          <span>Unredacted invoices</span>
          <span>Private contracts</span>
          <span>Copied bot configurations</span>
        </div>
      </section>
    </main>
  );
}
