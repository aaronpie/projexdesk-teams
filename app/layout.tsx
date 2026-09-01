import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("botmrr-theme")==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://botmrr.io"),
  title: {
    default: "BotMRR — Bot templates that make money",
    template: "%s · BotMRR",
  },
  description:
    "Discover portable AI teams for sales, marketing, research, operations, coding, and everyday work.",
  openGraph: {
    title: "BotMRR — Bot templates that make money",
    description: "Pick a team, connect your apps, and turn it on.",
    type: "website",
    siteName: "BotMRR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BotMRR — Bot templates that make money" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BotMRR — Bot templates that make money",
    description: "Pick a team, connect your apps, and turn it on.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
