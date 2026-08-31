import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://botmrr.io"),
  title: {
    default: "BotMRR — Ready-to-run AI teams",
    template: "%s · BotMRR",
  },
  description:
    "Discover portable AI teams for sales, marketing, research, operations, coding, and everyday work.",
  openGraph: {
    title: "BotMRR — Ready-to-run AI teams",
    description: "Pick a team, connect your apps, and turn it on.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — Ready-to-run AI teams." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — Ready-to-run AI teams",
    description: "Pick a team, connect your apps, and turn it on.",
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
