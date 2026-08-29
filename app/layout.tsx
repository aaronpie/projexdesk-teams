import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://botmrr.io"),
  title: {
    default: "BotMRR — The public bot money directory",
    template: "%s · BotMRR",
  },
  description:
    "Browse Grok Bot money claims, public workflows, original sources, and the evidence still missing — without false revenue totals.",
  openGraph: {
    title: "BotMRR — The public bot money directory",
    description: "Browse the claim, original source, and what the available evidence does not prove.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — The public bot money directory." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — The public bot money directory",
    description: "A source-checked directory of bot outcomes.",
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
