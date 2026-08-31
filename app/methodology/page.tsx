import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How BotMRR teams work",
  description: "A simple portable Markdown format for complete AI teams.",
};

const principles = [
  ["01", "One Markdown file", "The YAML frontmatter is the exact blueprint. The Markdown body explains the mission and process to any person or agent product."],
  ["02", "Review before install", "OpenMausBot previews the bots, Chief of Staff, channels, playbooks, apps, and routines before creating anything."],
  ["03", "No hidden access", "Connections stay off, routines arrive paused, and a package cannot contain credentials, conversations, memory, or computer permissions."],
  ["04", "Forkable forever", "Every team lives in a public GitHub repository, so anyone can inspect it, improve it, or adapt it for a new industry."],
];

export default function MethodologyPage() {
  return (
    <main className="methodology-page simple-page">
      <section className="methodology-hero simple-page-hero">
        <p className="overline">HOW BOTMRR WORKS</p>
        <h1>A complete AI team in one readable file.</h1>
        <p>Reliable enough for one-click installation, simple enough to paste into any Chief of Staff.</p>
        <div className="detail-actions"><Link href="/" className="button button-primary">Browse teams</Link><Link href="/publish" className="button button-secondary">Submit a team</Link></div>
      </section>

      <section className="methodology-grid" aria-label="Portable team principles">
        {principles.map(([number, title, body]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{body}</p></article>)}
      </section>

      <section className="package-anatomy">
        <div><span className="section-kicker">OPENMAUSBOT IMPORT</span><h2>Preview. Approve. Activate.</h2><p>The app turns package-local keys into fresh bots and channels. Existing records cannot be targeted by a shared file.</p></div>
        <pre><code>{`Add to OpenMausBot
├── fetch public .md
├── validate structure
├── show complete preview
├── create fresh bots
├── build new channels
├── mark Chief of Staff
└── keep apps + routines off`}</code></pre>
      </section>

      <section className="never-package">
        <span className="section-kicker">UNIVERSAL FALLBACK</span><h2>Give the same file to any Chief of Staff.</h2>
        <p className="boundary-note">If a product does not understand the structured metadata, the readable playbook still tells its Chief of Staff how to recreate and coordinate the team.</p>
      </section>
    </main>
  );
}
