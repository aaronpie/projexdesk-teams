import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span>404</span>
      <h1>That bot wandered off.</h1>
      <p>The playbook may have moved, or it is not in the directory yet.</p>
      <Link href="/" className="button button-primary">Back to BotMRR</Link>
    </main>
  );
}
