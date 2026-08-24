import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://botmrr.io"),
  title: {
    default: "BotMRR — Bots that do the work",
    template: "%s · BotMRR",
  },
  description:
    "Discover portable AI team playbooks. Give one Markdown file to your Chief of Staff, connect your apps, and run it anywhere.",
  openGraph: {
    title: "BotMRR — Bots that do the work",
    description: "Pick an outcome. Give the Markdown to your Chief of Staff. Run it anywhere.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — Bots that do the work." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — Bots that do the work",
    description: "Pick an outcome. Give the Markdown to your Chief of Staff. Run it anywhere.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
