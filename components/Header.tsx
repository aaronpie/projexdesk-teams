import Link from "next/link";
import MausAvatar from "@/components/MausAvatar";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <Link href="/" className="brand-lockup" aria-label="BotMRR home">
          <MausAvatar color="green" expression="happy" size={28} />
          <span>Discover BotMRR teams</span>
        </Link>
        <div className="header-links">
          <Link href="/">Showcase</Link>
          <Link href="/publish">Submit a team</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
