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
    "Discover complete OpenMausBot packages. Pick an outcome, install the bots, connect your apps, and turn the work on.",
  openGraph: {
    title: "BotMRR — Bots that do the work",
    description: "Pick an outcome. Install the team. Connect your apps. Turn it on.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — Bots that do the work." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — Bots that do the work",
    description: "Pick an outcome. Install the team. Connect your apps. Turn it on.",
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
