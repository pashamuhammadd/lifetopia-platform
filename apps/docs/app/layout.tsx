import type {
  Metadata,
  Viewport,
} from "next";
import localFont from "next/font/local";

import {
  DocsLanguageProvider,
  DocsNavbar,
} from "../components/docs";

import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://docs.lifetopiaworld.io",
  ),

  applicationName:
    "Lifetopia World Documentation",

  title: {
    default:
      "Official Lifetopia World Documentation",
    template:
      "%s | Lifetopia World Documentation",
  },

  description:
    "Official documentation for Lifetopia World, including project information, products, development, technical architecture, funding, economy, community, and security.",

  keywords: [
    "Lifetopia World",
    "Lifetopia documentation",
    "Solana game",
    "Web3 game",
    "cozy life simulation",
    "Lifetopia Beta",
    "Lifetopia roadmap",
  ],

  authors: [
    {
      name: "Lifetopia World",
      url: "https://lifetopiaworld.io",
    },
  ],

  creator: "Lifetopia World",
  publisher: "Lifetopia World",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName:
      "Lifetopia World Documentation",
    title:
      "Official Lifetopia World Documentation",
    description:
      "Explore Lifetopia World's project, products, development, technical architecture, funding, economy, and community documentation.",
  },

  twitter: {
    card: "summary",
    title:
      "Official Lifetopia World Documentation",
    description:
      "Explore Lifetopia World's official project and technical documentation.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5eee2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
  <DocsLanguageProvider>
    <DocsNavbar />
    {children}
  </DocsLanguageProvider>
</body>
    </html>
  );
}