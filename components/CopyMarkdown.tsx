"use client";

import { useState } from "react";

export default function CopyMarkdown({ markdown, label = "Copy the playbook" }: { markdown: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="button button-light"
      onClick={() => {
        void navigator.clipboard.writeText(markdown).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
    >
      {copied ? "Copied — paste it to your agent" : label}
    </button>
  );
}
