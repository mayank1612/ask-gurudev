import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ask Gurudev - Spiritual AI Guide",
  description:
    "Get spiritual guidance and wisdom from Gurudev Sri Sri Ravi Shankar through AI.",
  keywords: [
    "art of living chatbot",
    "ask gurudev",
    "ask sri sri",
    "spiritual bot",
  ],
  openGraph: {
    title: "Ask Gurudev - Spiritual AI Guide",
    description: `Get spiritual guidance and wisdom from Gurudev Sri Sri Ravi Shankar through AI.`,
    url: "https://askgurudev.in",
    type: "website",
    images: [
      {
        url: "/gurudev.png", // Points to public/logo.png
        width: 1200,
        height: 630,
        alt: "AskGurudev Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
