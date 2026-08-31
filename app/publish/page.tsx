import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit a team",
  description: "Publish a portable Markdown team in the open-source BotMRR directory.",
};

const guideUrl = "https://github.com/milind-soni/openmausbot-teams/blob/main/CONTRIBUTING.md";
const newFileUrl = "https://github.com/milind-soni/openmausbot-teams/new/main/packages";

const steps = [
  ["01", "Start with an outcome", "Name the job someone wants done. A useful listing begins with “find qualified leads,” not a model or framework."],
  ["02", "Put everything in one file", "Add the YAML blueprint at the top and the complete human-readable operating playbook underneath it."],
  ["03", "Open a pull request", "The repository validates references and safety boundaries before the team appears in the directory."],
];

export default function PublishPage() {
  return (
    <main className="publish-page simple-page">
      <section className="publish-hero simple-page-hero">
        <p className="overline">PUBLISH TO BOTMRR</p>
        <h1>Share a team people can actually run.</h1>
        <p>One Markdown file is the entire package: roles, Chief of Staff, channels, connector requirements, routines, and readable instructions.</p>
        <div className="detail-actions">
          <a className="button button-primary" href={newFileUrl} target="_blank" rel="noreferrer">Create a playbook on GitHub ↗</a>
          <a className="button button-secondary" href={guideUrl} target="_blank" rel="noreferrer">Read the contribution guide</a>
        </div>
      </section>

      <section className="publish-steps">
        {steps.map(([number, title, body]) => (
          <article key={number}>
            <span>{number}</span><h2>{title}</h2><p>{body}</p>
          </article>
        ))}
      </section>

      <section className="package-anatomy">
        <div>
          <span className="section-kicker">THE WHOLE PRODUCT UNIT</span>
          <h2>Portable by default.</h2>
          <p>OpenMausBot reads the structured top section. Grok, Claude, ChatGPT, and people can follow the Markdown body.</p>
        </div>
        <pre><code>{`team.md
├── outcome + summary
├── Chief of Staff
├── specialist bots
├── channels
├── connector checklist
├── paused routines
└── complete playbook`}</code></pre>
      </section>

      <section className="never-package">
        <span className="section-kicker">NEVER INCLUDE</span>
        <h2>A public team is instructions—not access.</h2>
        <div><span>Credentials</span><span>OAuth grants</span><span>Conversations</span><span>Memories</span><span>Private paths</span><span>Computer permissions</span></div>
        <p className="boundary-note">Templates install disconnected, and every suggested routine starts paused.</p>
      </section>

      <p className="simple-page-back"><Link href="/">← Back to all teams</Link></p>
    </main>
  );
}
