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
          <p>Useful bots, complete teams, and repeatable work in portable Markdown.</p>
        </div>
        <div>
          <h2>Marketplace</h2>
          <Link href="/#directory">Browse bots</Link>
          <Link href="/publish">Publish a playbook</Link>
          <a href="https://github.com/milind-soni/openmausbot-teams" target="_blank" rel="noreferrer">
            Playbook source
          </a>
        </div>
        <div>
          <h2>OpenMausBot</h2>
          <a href="https://openmausbot.com" target="_blank" rel="noreferrer">
            Product
          </a>
          <a href="https://github.com/milind-soni/OpenMausBot" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://github.com/milind-soni/openmausbot-releases/releases/latest" target="_blank" rel="noreferrer">
            Download
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Open Markdown. Any agent runtime. Your accounts stay yours.</span>
        <span>© {new Date().getFullYear()} OpenMausBot</span>
      </div>
      <div className="footer-ghost" aria-hidden="true">BOTMRR</div>
    </footer>
  );
}
