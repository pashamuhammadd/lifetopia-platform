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

  title: {
    default:
      "Lifetopia Docs | Official Documentation",
    template: "%s | Lifetopia Docs",
  },

  description:
    "Official public documentation for Lifetopia World, covering the project, products, Beta development, technical architecture, funding, economy, and community.",

  applicationName: "Lifetopia Docs",

  authors: [
    {
      name: "Lifetopia World",
      url: "https://lifetopiaworld.io",
    },
  ],

  creator: "Lifetopia World",
  publisher: "Lifetopia World",

  category: "Technology",

  keywords: [
    "Lifetopia World",
    "Lifetopia Docs",
    "cozy game",
    "life simulation",
    "social sandbox",
    "Solana game",
    "Web3 game",
    "game documentation",
    "Beta roadmap",
    "technical architecture",
  ],

  alternates: {
    canonical: "/",
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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Lifetopia Docs",

    title:
      "Lifetopia Docs | Official Documentation",

    description:
      "Explore Lifetopia World's project, products, Beta roadmap, technical architecture, funding, economy, and community.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Lifetopia Docs | Official Documentation",

    description:
      "Official public documentation for Lifetopia World.",
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "Lifetopia Docs",

  alternateName:
    "Lifetopia World Official Documentation",

  url: "https://docs.lifetopiaworld.io",

  description:
    "Official public documentation for Lifetopia World.",

  inLanguage: ["en", "id"],

  publisher: {
    "@type": "Organization",
    name: "Lifetopia World",
    url: "https://lifetopiaworld.io",
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
  <a
    href="#main-content"
    className="docs-skip-link"
  >
    Skip to content
  </a>

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(
        websiteStructuredData,
      ).replace(/</g, "\\u003c"),
    }}
  />

  <DocsLanguageProvider>
    <DocsNavbar />
    {children}
  </DocsLanguageProvider>
</body>
    </html>
  );
}