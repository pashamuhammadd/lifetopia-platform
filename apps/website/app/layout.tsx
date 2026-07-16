import type { Metadata } from "next";
import localFont from "next/font/local";

import { JsonLd } from "@/components/seo/JsonLd";

import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lifetopiaworld.io"),
  title: {
    default: "Lifetopia World",
    template: "%s | Lifetopia World",
  },
  description:
    "Lifetopia World is a cozy connected digital society built around gameplay, friendship, identity, ownership, and community.",
  keywords: [
    "Lifetopia World",
    "cozy game",
    "life simulation game",
    "social sandbox",
    "fantasy game",
    "farming game",
    "multiplayer game",
    "Web3 game",
    "Solana game",
    "Nimia Games",
  ],
  authors: [
    {
      name: "Pasha Muhammad",
      url: "https://pashamuhammad.me",
    },
  ],
  creator: "Pasha Muhammad",
  publisher: "Nimia Games",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistMono.variable}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}