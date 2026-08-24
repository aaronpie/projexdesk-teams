import Link from "next/link";

const GitHubMark = () => (
  <span aria-hidden="true" className="github-mark">
    GH
  </span>
);

export default function Header() {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <Link href="/" className="brand-lockup" aria-label="BotMRR home">
          <img src="/app-icon.png" width="31" height="31" alt="" />
          <span>BotMRR</span>
          <span className="brand-by">by OpenMausBot</span>
        </Link>
        <div className="header-links">
          <Link href="/#directory">Browse</Link>
          <Link href="/publish">Publish</Link>
          <a href="https://openmausbot.com" target="_blank" rel="noreferrer">
            OpenMausBot
          </a>
          <a
            href="https://github.com/milind-soni/openmausbot-teams"
            target="_blank"
            rel="noreferrer"
            className="github-link"
            aria-label="BotMRR packages on GitHub"
          >
            <GitHubMark />
          </a>
        </div>
      </nav>
    </header>
  );
}
