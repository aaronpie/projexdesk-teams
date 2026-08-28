export type FieldNoteKind = "Official" | "Shareable bot" | "Case study" | "Guide";

export type ClaimReviewState = "source-only" | "creator-ledger" | "publicly-challenged";
export type EvidenceCheckState = "missing" | "limited" | "challenged";

export interface EvidenceCheck {
  label: string;
  state: EvidenceCheckState;
}

export interface FieldNote {
  id: string;
  title: string;
  summary: string;
  kind: FieldNoteKind;
  topic: string;
  publishedAt: string;
  source: {
    author: string;
    handle: string;
    url: string;
  };
  template?: {
    name: string;
    url: string;
  };
  relatedPlaybookId?: string;
}

export interface ClaimReview {
  id: string;
  title: string;
  creator: string;
  handle: string;
  claim: {
    headline: string;
    type:
      | "Gross sales"
      | "Net collected"
      | "Payout earnings"
      | "MRR"
      | "Deal value"
      | "Savings"
      | "Recovered revenue"
      | "Trading performance"
      | "Profit"
      | "Account balance";
  };
  state: ClaimReviewState;
  checks: {
    money: EvidenceCheck;
    botControl: EvidenceCheck;
    attribution: EvidenceCheck;
  };
  observed: string;
  missing: string;
  reviewedAt: string;
  sources: Array<{ label: string; url: string }>;
  template?: { name: string; url: string };
  relatedPlaybookId?: string;
}

/**
 * A deliberately small, source-first snapshot of the Grok Bot launch week.
 * These are research signals, not endorsements and not proof of earnings.
 * Every X URL below was opened and reviewed on 2026-08-29.
 */
export const fieldNotes: FieldNote[] = [
  {
    id: "official-template-sharing",
    title: "Grok Bot makes template sharing official",
    summary: "The official account announced public Bot links that let another user add a copy in the desktop app. This confirms sharing—not an official directory or outcome marketplace.",
    kind: "Official",
    topic: "Templates",
    publishedAt: "2026-08-28T16:33:51.014Z",
    source: {
      author: "Grok Bot",
      handle: "@bot",
      url: "https://x.com/bot/status/2093376523919323618",
    },
  },
  {
    id: "builder-watchlist",
    title: "A public builder roster becomes a product watchlist",
    summary: "Ben Lang published seven engineers and designers working on Grok Bot. Following the people shipping the product is a stronger launch signal than recycling generic AI news.",
    kind: "Guide",
    topic: "People to follow",
    publishedAt: "2026-08-27T15:19:24.695Z",
    source: {
      author: "Ben Lang",
      handle: "@benln",
      url: "https://x.com/benln/status/2092995402953884072",
    },
  },
  {
    id: "projects-manager-template",
    title: "A project manager Bot coordinates four specialists",
    summary: "Eric Zakariasson shared a project operating model with separate coding, design, research, and writing Bots, while Notion holds the source of truth and task handoffs.",
    kind: "Shareable bot",
    topic: "Operations",
    publishedAt: "2026-08-28T16:54:22.475Z",
    source: {
      author: "Eric Zakariasson",
      handle: "@ericzakariasson",
      url: "https://x.com/ericzakariasson/status/2093381689041109349",
    },
    template: {
      name: "Projects Manager",
      url: "https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD",
    },
  },
  {
    id: "photos-to-3d-print",
    title: "Reference photos become simulations and printed parts",
    summary: "MIT researcher Markus Buehler describes a three-Bot overnight pipeline that extracted design principles, ran 47 simulation experiments, produced a report, and prepared two parts for 3D printing.",
    kind: "Case study",
    topic: "Research",
    publishedAt: "2026-08-22T10:20:26.601Z",
    source: {
      author: "Markus J. Buehler",
      handle: "@ProfBuehlerMIT",
      url: "https://x.com/ProfBuehlerMIT/status/2091108225806454802",
    },
  },
  {
    id: "marketing-os",
    title: "An open-source marketing system becomes a Bot skill",
    summary: "Vlad Dubchak published a reusable marketing operating system covering audits, positioning, hooks, copy, ads, email, social, launches, and search visibility.",
    kind: "Guide",
    topic: "Open source",
    publishedAt: "2026-08-21T12:00:01.919Z",
    source: {
      author: "Vlad Dubchak",
      handle: "@vladdubchak_x",
      url: "https://x.com/vladdubchak_x/status/2090770900241297844",
    },
  },
  {
    id: "one-prompt-agent-team",
    title: "One prompt bootstraps a four-Bot operating team",
    summary: "nyk's setup starts with a chief-of-staff Bot that interviews the owner, writes its operating manual, and proposes four specialist teammates with human approval before external actions.",
    kind: "Guide",
    topic: "Multi-agent teams",
    publishedAt: "2026-08-22T07:44:16.853Z",
    source: {
      author: "nyk",
      handle: "@nykdotdev",
      url: "https://x.com/nykdotdev/status/2091068926235144607",
    },
  },
  {
    id: "seven-bot-content-team",
    title: "Seven Bots turn a content calendar into an org chart",
    summary: "Ridark describes separate discovery, research, writing, visual, distribution, analytics, and chief-of-staff roles. The reported week-one output—14 of 25 drafts shipped—remains self-reported.",
    kind: "Case study",
    topic: "Content operations",
    publishedAt: "2026-08-25T16:46:20.541Z",
    source: {
      author: "Ridark",
      handle: "@ridark_eth",
      url: "https://x.com/ridark_eth/status/2092292504066429381",
    },
    relatedPlaybookId: "grok-ridark-eth",
  },
  {
    id: "newsletter-detox",
    title: "A newsletter detox keeps the human approval gate",
    summary: "Shimecki's workflow audits subscriptions, generates a review page with keep/unsubscribe reasoning, waits for a decision, and only then executes. The reported 76 unsubscribes are not independently tested.",
    kind: "Case study",
    topic: "Inbox",
    publishedAt: "2026-08-26T12:35:17.166Z",
    source: {
      author: "Shimecki",
      handle: "@scheemunai",
      url: "https://x.com/scheemunai/status/2092591711557947796",
    },
  },
  {
    id: "solo-newsletter-business",
    title: "A solo operator staffs a newsletter with Bots",
    summary: "Greg Isenberg profiles a non-technical founder using separate Bots for research, drafting, editing, scheduling, and growth. It is a useful operating pattern, but a second-hand story with no revenue evidence.",
    kind: "Guide",
    topic: "One-person company",
    publishedAt: "2026-08-21T20:40:26.068Z",
    source: {
      author: "Greg Isenberg",
      handle: "@gregisenberg",
      url: "https://x.com/gregisenberg/status/2090901863814017300",
    },
  },
  {
    id: "calendar-crm",
    title: "Ten years of calendar history becomes a relationship CRM",
    summary: "Gaurav Munjal reports giving Grok Bot a decade of calendar history and asking it to enrich a Notion database. The first three years reportedly yielded about 1,000 contacts in 2.5 hours.",
    kind: "Case study",
    topic: "CRM",
    publishedAt: "2026-08-28T15:52:24.070Z",
    source: {
      author: "Gaurav Munjal",
      handle: "@gauravmunjal",
      url: "https://x.com/gauravmunjal/status/2093366092920144201",
    },
  },
  {
    id: "pitch-deck-analyzer",
    title: "A shareable deck screener encodes investor criteria",
    summary: "Brian Evans describes a Bot trained on the qualities he looks for in a pitch, then used to score incoming decks before he reviews them. It is an early template example, not a quality benchmark.",
    kind: "Shareable bot",
    topic: "Investing workflow",
    publishedAt: "2026-08-28T17:13:33.305Z",
    source: {
      author: "Brian D. Evans",
      handle: "@BrianDEvans",
      url: "https://x.com/BrianDEvans/status/2093386515972030780",
    },
    template: {
      name: "DeckLens",
      url: "https://x.ai/bot/KlcxAG1I8cMQoqS_8Hrdn",
    },
  },
  {
    id: "email-prompt-injection",
    title: "Email-reading Bots need explicit injection boundaries",
    summary: "Peter's defensive prompt treats subjects, bodies, senders, attachments, links, and hidden text as untrusted data—not instructions—and requires confirmation before consequential actions.",
    kind: "Guide",
    topic: "Safety",
    publishedAt: "2026-08-25T18:52:09.820Z",
    source: {
      author: "Peter",
      handle: "@aye_pete",
      url: "https://x.com/aye_pete/status/2092324168037707992",
    },
  },
  {
    id: "vision-md-triage",
    title: "VISION.md moves open-source triage toward strategy",
    summary: "Kun Chen describes using a written project vision as the decision layer for Bot-assisted issue and pull-request triage, so aligned work rises and off-strategy work is filtered earlier.",
    kind: "Case study",
    topic: "Open source",
    publishedAt: "2026-08-23T21:28:53.049Z",
    source: {
      author: "Kun Chen",
      handle: "@kunchenguid",
      url: "https://x.com/kunchenguid/status/2091638832307536357",
    },
  },
  {
    id: "sponsorship-proof-request",
    title: "A $10,000 sponsorship claim stops at the quoted rate",
    summary: "Alex Finn says his inbox Bot negotiated a sponsorship. The screenshot supports an outbound $10,000 quote, but not acceptance, a signed contract, invoice, settlement, or collected revenue.",
    kind: "Case study",
    topic: "Proof requested",
    publishedAt: "2026-08-21T23:08:50.369Z",
    source: {
      author: "Alex Finn",
      handle: "@AlexFinn",
      url: "https://x.com/AlexFinn/status/2090939211159650633",
    },
    relatedPlaybookId: "grok-alexfinn",
  },
  {
    id: "recovered-value-proof-request",
    title: "Recovered cash and savings are economic value—not revenue",
    summary: "Royce claims Grok Bot found $300 in unclaimed funds, a $150 flight credit, and $50 per month in subscriptions to cancel. No receipts are attached, and the categories must stay separate.",
    kind: "Case study",
    topic: "Proof requested",
    publishedAt: "2026-08-21T01:48:33.941Z",
    source: {
      author: "Royce",
      handle: "@royce_james",
      url: "https://x.com/royce_james/status/2090617019708408140",
    },
  },
];

/**
 * Public claim reviews are a research queue, not verified outcome receipts.
 * The three checks stay separate so a source link or creator-run ledger can
 * never imply bot control or economic attribution.
 */
export const claimReviews: ClaimReview[] = [
  {
    id: "public-trading-ledger",
    title: "Tradey's public trading experiment",
    creator: "Farzad",
    handle: "@farzyness",
    claim: { headline: "+3.58% vs S&P 500", type: "Trading performance" },
    state: "creator-ledger",
    checks: {
      money: { label: "Creator-run public ledger", state: "limited" },
      botControl: { label: "Control not checked", state: "missing" },
      attribution: { label: "Owner-operated experiment", state: "limited" },
    },
    observed: "The source post is live and links a public dashboard with holdings, decisions, trades, closed results, and an improvement log.",
    missing: "The brokerage account and deposits are not connected to BotMRR, so the dashboard remains creator-operated evidence.",
    reviewedAt: "2026-08-29",
    sources: [
      { label: "Source post", url: "https://x.com/farzyness/status/2090545251681284426" },
      { label: "Public ledger", url: "https://farzad.money" },
    ],
    relatedPlaybookId: "grok-farzyness",
  },
  {
    id: "sponsorship-desk",
    title: "Sponsorship inbox negotiation",
    creator: "Alex Finn",
    handle: "@AlexFinn",
    claim: { headline: "$10,000", type: "Deal value" },
    state: "source-only",
    checks: {
      money: { label: "No settlement or provider record", state: "missing" },
      botControl: { label: "Control not checked", state: "missing" },
      attribution: { label: "Owner-reported", state: "limited" },
    },
    observed: "The creator's post is live and describes Grok Bot replying to business email and negotiating a sponsorship.",
    missing: "No connected payment, signed contract, settlement date, or net revenue figure has been supplied to BotMRR.",
    reviewedAt: "2026-08-29",
    sources: [{ label: "Creator's post", url: "https://x.com/AlexFinn/status/2090939211159650633" }],
    relatedPlaybookId: "grok-alexfinn",
  },
  {
    id: "recovered-value",
    title: "First-day recovered value",
    creator: "Royce",
    handle: "@royce_james",
    claim: { headline: "$300 + $150 + $50/mo", type: "Savings" },
    state: "source-only",
    checks: {
      money: { label: "No receipt or redemption record", state: "missing" },
      botControl: { label: "Control not checked", state: "missing" },
      attribution: { label: "Owner-reported", state: "limited" },
    },
    observed: "The creator's post is live and separately describes unclaimed funds, a flight credit, and subscriptions identified for cancellation.",
    missing: "No receipt, deposited amount, redeemed credit, cancellation confirmation, or ongoing savings baseline is supplied. None of these figures is revenue.",
    reviewedAt: "2026-08-29",
    sources: [{ label: "Creator's post", url: "https://x.com/royce_james/status/2090617019708408140" }],
  },
  {
    id: "plumbing-back-office",
    title: "Construction back-office bot",
    creator: "Jon ONeill",
    handle: "@HouseHackerJon",
    claim: { headline: "$2,000/mo", type: "Savings" },
    state: "source-only",
    checks: {
      money: { label: "No baseline or provider record", state: "missing" },
      botControl: { label: "Share link located; control not checked", state: "limited" },
      attribution: { label: "Owner-reported", state: "limited" },
    },
    observed: "The creator's source post is live, and he later shared a public Grok Bot template for the general-manager workflow.",
    missing: "The post combines saved software cost and customer generation; neither baseline costs nor incremental revenue are independently connected.",
    reviewedAt: "2026-08-29",
    sources: [
      { label: "Original claim", url: "https://x.com/HouseHackerJon/status/2088305236003926468" },
      { label: "Template post", url: "https://x.com/HouseHackerJon/status/2093457687925362851" },
    ],
    template: { name: "Grant General Manager", url: "https://x.ai/bot/fkM4b8n4RqZTbrq5fw5L_" },
    relatedPlaybookId: "grok-househackerjon",
  },
  {
    id: "churn-winback",
    title: "Churn win-back workflow",
    creator: "Liam",
    handle: "@liam_fallen",
    claim: { headline: "Covered its cost", type: "Recovered revenue" },
    state: "source-only",
    checks: {
      money: { label: "No amount or billing record", state: "missing" },
      botControl: { label: "Control not checked", state: "missing" },
      attribution: { label: "Owner-reported", state: "limited" },
    },
    observed: "The post is live and describes identifying churned customers, contacting them, winning several back, and analyzing their feedback.",
    missing: "No amount, billing window, recovered-customer list, or connected revenue record is available.",
    reviewedAt: "2026-08-29",
    sources: [{ label: "Creator's post", url: "https://x.com/liam_fallen/status/2090355235751379002" }],
    relatedPlaybookId: "grok-liam-fallen",
  },
  {
    id: "crypto-desk-claim",
    title: "Eight-agent crypto desk",
    creator: "Ridark",
    handle: "@ridark_eth",
    claim: { headline: "$13,100/wk", type: "Profit" },
    state: "source-only",
    checks: {
      money: { label: "No exchange or wallet record", state: "missing" },
      botControl: { label: "Control not checked", state: "missing" },
      attribution: { label: "Owner-reported", state: "limited" },
    },
    observed: "The source post is live and gives a detailed account of the claimed desk roles, scans, trades, and result after fees.",
    missing: "No exchange or wallet connection, deposit history, transaction ledger, or independent attribution to the Grok Bot setup is available.",
    reviewedAt: "2026-08-29",
    sources: [{ label: "Creator's post", url: "https://x.com/ridark_eth/status/2091588150103589286" }],
    relatedPlaybookId: "grok-ridark-eth",
  },
  {
    id: "polymarket-disputed",
    title: "Polymarket survival-budget story",
    creator: "Argona",
    handle: "@Argona0x",
    claim: { headline: "$50 → $5,273", type: "Account balance" },
    state: "publicly-challenged",
    checks: {
      money: { label: "Public evidence challenge", state: "challenged" },
      botControl: { label: "Control not checked", state: "missing" },
      attribution: { label: "Timeline publicly challenged", state: "challenged" },
    },
    observed: "The source post is live, and the claimed balance is visible in the story presented by the author.",
    missing: "X Community Notes says the dashboard and linked account history do not support the stated timeline. Treat this as publicly challenged, not a result to copy.",
    reviewedAt: "2026-08-29",
    sources: [{ label: "Claim and Community Note", url: "https://x.com/Argona0x/status/2091946932037906774" }],
    relatedPlaybookId: "grok-argona0x",
  },
];

export const researchStats = {
  fieldNotes: fieldNotes.length,
  publicTemplates: fieldNotes.filter((entry) => entry.template).length,
  claimReviews: claimReviews.length,
  connectedClaims: 0,
  challengedClaims: claimReviews.filter((entry) => entry.state === "publicly-challenged").length,
  reviewedAt: "2026-08-29",
};

export function claimReviewStateLabel(state: ClaimReviewState): string {
  if (state === "creator-ledger") return "Creator-run ledger";
  if (state === "publicly-challenged") return "Publicly challenged";
  return "Source only";
}
