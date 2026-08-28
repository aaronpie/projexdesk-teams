import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://botmrr.io"),
  title: {
    default: "BotMRR — Receipts for the bot economy",
    template: "%s · BotMRR",
  },
  description:
    "An independent evidence ledger for Grok Bot outcomes. See the public claim, original source, missing proof, and review state without false revenue totals.",
  openGraph: {
    title: "BotMRR — Receipts for the bot economy",
    description: "See the public claim, the original source, and what the available evidence does not prove.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — Receipts for the bot economy." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — Receipts for the bot economy",
    description: "An independent evidence ledger for bot outcomes.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
