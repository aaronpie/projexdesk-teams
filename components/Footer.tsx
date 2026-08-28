import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/app-icon.png" width="32" height="32" alt="" />
            <span>BotMRR</span>
          </div>
          <p>An independent evidence ledger for the bot economy. Claims stay claims until the money, bot, and attribution checks say otherwise.</p>
        </div>
        <div>
          <h2>Evidence</h2>
          <Link href="/#evidence">Money claims</Link>
          <Link href="/#field-notes">Grok Bot field notes</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/publish">Suggest a source</Link>
        </div>
        <div>
          <h2>Project</h2>
          <a href="https://github.com/milind-soni/openmausbot-teams" target="_blank" rel="noreferrer">
            Open source
          </a>
          <a href="https://x.ai/bot" target="_blank" rel="noreferrer">
            Grok Bot
          </a>
          <a href="https://docs.x.ai/grok-bot/bots" target="_blank" rel="noreferrer">
            Official sharing docs
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Independent · not affiliated with xAI · no financial advice</span>
        <span>© {new Date().getFullYear()} BotMRR</span>
      </div>
      <div className="footer-ghost" aria-hidden="true">BOTMRR</div>
    </footer>
  );
}
