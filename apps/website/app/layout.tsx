import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lifetopiaworld.io"),
  title: {
    default: "Lifetopia World | Cozy Fantasy Life Simulation Game",
    template: "%s | Lifetopia World",
  },
  description:
    "Build your dream life in a cozy fantasy world. Farm, fish, craft, decorate, make friends, and explore relaxing adventures in Lifetopia World.",
  keywords: [
    "Lifetopia World",
    "cozy game",
    "life simulation game",
    "farming game",
    "fantasy game",
    "social sandbox game",
    "Web3 game",
    "Solana game",
    "GameFi",
    "Nimia Games",
  ],
  authors: [{ name: "Pasha Muhammad" }],
  creator: "Pasha Muhammad",
  publisher: "Nimia Games",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Lifetopia World - Cozy Fantasy Life Simulation Game",
    description:
      "Build your dream life in a cozy fantasy world. Farm, fish, craft, decorate, make friends, and explore relaxing adventures.",
    url: "https://lifetopiaworld.io",
    siteName: "Lifetopia World",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og/lifetopia-og.png",
        width: 1200,
        height: 630,
        alt: "Lifetopia World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifetopia World — Cozy Fantasy Life Simulation Game",
    description:
      "Build your dream life in a cozy fantasy world. Farm, fish, craft, decorate, make friends, and explore relaxing adventures.",
    images: ["/images/og/lifetopia-og.png"],
    creator: "@LifetopiaWorld",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
