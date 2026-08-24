import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish a playbook",
  description: "Turn a useful AI team into one portable Markdown playbook.",
};

const steps = [
  ["01", "Write the outcome", "Use one normal .md file for the mission, specialist roles, Chief of Staff, shared rooms, paused routines, connections, playbooks, and example output."],
  ["02", "Give it to a Chief", "The body must stand on its own in Grok, Claude, ChatGPT, OpenMausBot, or any product that can coordinate agents."],
  ["03", "Open a pull request", "The community reviews the whole operating playbook in plain text. Once merged, it appears on BotMRR for everyone."],
];

export default function PublishPage() {
  return (
    <main className="publish-page">
      <section className="publish-hero">
        <div className="eyebrow"><span /> FOR CREATORS</div>
        <h1>Publish the bot that already works for you.</h1>
        <p>One outcome. One readable file. One install button. No private data attached.</p>
        <div className="detail-actions">
          <a className="button button-primary" href="https://github.com/milind-soni/openmausbot-teams/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">Contribution guide ↗</a>
          <a className="button button-secondary" href="https://github.com/milind-soni/openmausbot-teams/tree/main/packages" target="_blank" rel="noreferrer">Browse Markdown files</a>
        </div>
      </section>
      <section className="publish-steps">
        {steps.map(([number, title, body]) => (
          <article key={number}><span>{number}</span><h2>{title}</h2><p>{body}</p></article>
        ))}
      </section>
      <section className="package-anatomy">
        <div>
          <span className="section-kicker">THE FORMAT</span>
          <h2>Everything needed to understand and run it.</h2>
          <p>The entire product is one Markdown file: readable by people, pasteable into any agent product, and structured enough for one-click import where supported.</p>
        </div>
        <pre><code>{`team.md
├── activation
├── mission + outcomes
├── connections
├── specialist roles
├── Chief of Staff
├── shared rooms
├── routines (paused)
├── playbooks
└── completion rule`}</code></pre>
      </section>
      <section className="never-package">
        <span className="section-kicker">NEVER PACKAGED</span>
        <h2>The dangerous and personal parts stay local.</h2>
        <div><span>Credentials</span><span>OAuth tokens</span><span>Approvals</span><span>Conversations</span><span>Memory</span><span>Local paths</span><span>Provider sessions</span></div>
      </section>
    </main>
  );
}
