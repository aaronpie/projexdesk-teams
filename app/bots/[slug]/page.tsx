import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CopyMarkdown from "@/components/CopyMarkdown";
import InstallButton from "@/components/InstallButton";
import { getPackage, getPackageMarkdown, getPackages, packageInstallUrl, packageRawUrl } from "@/lib/packages";
import { proofHeadline } from "@/lib/proof";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPackages().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPackage(slug);
  if (!entry) return {};
  return {
    title: entry.name,
    description: entry.tagline,
    openGraph: { title: entry.name, description: entry.tagline, images: [] },
    twitter: { card: "summary", title: entry.name, description: entry.tagline, images: [] },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const entry = getPackage(slug);
  const markdown = getPackageMarkdown(slug);
  if (!entry || !markdown) notFound();

  return (
    <main className="detail-page">
      <div className="detail-wrap detail-simple">
        <div className="breadcrumbs"><Link href="/">Evidence ledger</Link><span>/</span><span>{entry.category}</span></div>

        <section className="simple-hero">
          <h1>{entry.name}</h1>
          <p>{entry.tagline}</p>

          {entry.proof && (
            <div className="proof-banner">
              <div className="proof-figure">
                <strong>{proofHeadline(entry.proof)}</strong>
                <span>{entry.proof.credibility === "receipts" ? "creator-published evidence" : "public claim"}</span>
              </div>
              <div className="proof-body">
                {entry.proof.source.quote && <blockquote>&ldquo;{entry.proof.source.quote}&rdquo;</blockquote>}
                <p>
                  <a href={entry.proof.source.url} target="_blank" rel="noreferrer">
                    {entry.proof.source.author} on X
                  </a>
                  {entry.proof.source.date && <span> &middot; {entry.proof.source.date}</span>}
                </p>
                <em>
                  This source documents what the creator reported. BotMRR has not connected to the underlying
                  payment, account, or business records.
                </em>
              </div>
            </div>
          )}

          <div className="detail-actions">
            <CopyMarkdown markdown={markdown} />
            <InstallButton installUrl={packageInstallUrl(entry.id)} />
            <a className="button button-secondary" href={packageRawUrl(entry.id)} target="_blank" rel="noreferrer">
              Open raw file
            </a>
          </div>
          <p className="simple-how">
            This is an independent, safety-reviewed reconstruction inspired by the public workflow &mdash; not the
            creator&apos;s exact bot, private prompts, or results. Copy it to a Chief of Staff in OpenMausBot, Grok,
            Claude, or ChatGPT and ask it to activate the team.
          </p>
        </section>

        <section className="markdown-block">
          <div className="markdown-block-head">
            <span>{entry.id}.md</span>
            <CopyMarkdown markdown={markdown} label="Copy" />
          </div>
          <pre>{markdown}</pre>
        </section>
      </div>
    </main>
  );
}
