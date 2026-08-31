import Link from "next/link";

const sponsorRequestUrl =
  "https://github.com/milind-soni/openmausbot-teams/issues/new?title=Sponsor%20BotMRR&body=Tell%20us%20about%20the%20product%20you%20want%20to%20feature%20and%20the%20sidebar%20slot%20you%20prefer.";

export default function SponsorPage() {
  return (
    <main className="simple-page sponsor-page">
      <section className="simple-page-hero">
        <p className="overline">BOTMRR SPONSORS</p>
        <h1>Put your product beside teams people can run.</h1>
        <p>
          BotMRR has ten permanent sponsor positions around the directory. Each placement includes your name,
          logo, one useful sentence, and a direct link. Founding spots are open while self-serve checkout is being built.
        </p>
        <div className="detail-actions">
          <a className="button button-primary" href={sponsorRequestUrl} target="_blank" rel="noreferrer">
            Request a sponsor spot <span aria-hidden="true">↗</span>
          </a>
          <Link className="button button-secondary" href="/">Back to the directory</Link>
        </div>
      </section>

      <section className="sponsor-details" aria-label="Sponsorship details">
        <article><span>01</span><h2>Visible</h2><p>Your placement sits beside the main directory on every desktop visit.</p></article>
        <article><span>02</span><h2>Simple</h2><p>One logo, one sentence, and one tracked destination. No noisy ad units.</p></article>
        <article><span>03</span><h2>Relevant</h2><p>Best for tools used by founders, operators, developers, and agent builders.</p></article>
      </section>
    </main>
  );
}
