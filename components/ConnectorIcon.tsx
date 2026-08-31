"use client";

import { useState } from "react";

const CONNECTOR_DOMAINS: Record<string, string> = {
  beehiiv: "beehiiv.com",
  "client-portal": "openmausbot.com",
  cursor: "cursor.com",
  email: "gmail.com",
  github: "github.com",
  gmail: "gmail.com",
  googlecalendar: "calendar.google.com",
  googledocs: "docs.google.com",
  googledrive: "drive.google.com",
  googlesheets: "sheets.google.com",
  grok: "x.ai",
  "grok-bot": "x.ai",
  hubspot: "hubspot.com",
  make: "make.com",
  notion: "notion.so",
  polymarket: "polymarket.com",
  quo: "quo.com",
  reddit: "reddit.com",
  robinhood: "robinhood.com",
  servicetitan: "servicetitan.com",
  slack: "slack.com",
  telegram: "telegram.org",
  website: "openmausbot.com",
  whatsapp: "whatsapp.com",
  x: "x.com",
};

export default function ConnectorIcon({
  slug,
  label,
  size = "medium",
}: {
  slug: string;
  label: string;
  size?: "small" | "medium";
}) {
  const domain = CONNECTOR_DOMAINS[slug];
  const [failed, setFailed] = useState(!domain);

  return (
    <span className={`connector-icon connector-icon-${size}`} title={label} aria-label={label}>
      {failed ? (
        <span aria-hidden="true">{label.slice(0, 1).toUpperCase()}</span>
      ) : (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          width={size === "small" ? 18 : 24}
          height={size === "small" ? 18 : 24}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
