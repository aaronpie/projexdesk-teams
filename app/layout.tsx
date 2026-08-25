import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import Footer from "@/components/Footer";

import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://botmrr.io"),
  title: {
    default: "BotMRR — Bots that make money",
    template: "%s · BotMRR",
  },
  description:
    "Discover portable AI team playbooks. Give one Markdown file to your Chief of Staff, connect your apps, and run it anywhere.",
  openGraph: {
    title: "BotMRR — Bots that make money",
    description: "Pick an outcome. Give the Markdown to your Chief of Staff. Run it anywhere.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — Bots that make money." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — Bots that make money",
    description: "Pick an outcome. Give the Markdown to your Chief of Staff. Run it anywhere.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
