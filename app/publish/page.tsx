import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish a package",
  description: "Turn a useful OpenMausBot setup into one readable, installable package.",
};

const steps = [
  ["01", "Package the outcome", "Use one .mauspack.json file for the listing, bots, Chief of Staff, rooms, paused routines, connector requirements, playbooks, and example output."],
  ["02", "Validate it", "Run the repository validator. It checks references, limits, schedules, and the safety boundary before a package can enter the directory."],
  ["03", "Open a pull request", "The community can review every instruction in plain text. Once merged, the package appears on BotMRR and becomes installable in OpenMausBot."],
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
          <a className="button button-secondary" href="https://github.com/milind-soni/openmausbot-teams/tree/main/packages" target="_blank" rel="noreferrer">Browse package files</a>
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
          <p>BotMRR packages are intentionally boring JSON. They are easy to review, diff, fork, generate, and install.</p>
        </div>
        <pre><code>{`openmaus.package
├── listing + outcomes
├── requirements
├── agents
├── chiefOfStaff
├── rooms
├── routines (paused)
├── playbooks
└── examples`}</code></pre>
      </section>
      <section className="never-package">
        <span className="section-kicker">NEVER PACKAGED</span>
        <h2>The dangerous and personal parts stay local.</h2>
        <div><span>Credentials</span><span>OAuth tokens</span><span>Approvals</span><span>Conversations</span><span>Memory</span><span>Local paths</span><span>Provider sessions</span></div>
      </section>
    </main>
  );
}
