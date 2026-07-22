import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PwaClient } from "@/components/pwa/PwaClient";
import "./globals.css";
const COMMUNITY_URL = "https://community.lifetopiaworld.io";
const DEFAULT_TITLE = "Lifetopia Community";
const DEFAULT_DESCRIPTION =
  "The official social platform for Lifetopians to share updates, complete community quests, join guilds, and grow their connected player identity.";
const DEFAULT_OG_IMAGE = "/images/community/community-preview.png";
export const metadata: Metadata = {
  metadataBase: new URL(COMMUNITY_URL),
  applicationName: DEFAULT_TITLE,
  title: { default: DEFAULT_TITLE, template: "%s | Lifetopia Community" },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Lifetopia World",
    "Lifetopia Community",
    "cozy game community",
    "community quests",
    "Harmony Points",
    "Solana gaming",
  ],
  authors: [{ name: "Lifetopia World", url: "https://lifetopiaworld.io" }],
  creator: "Lifetopia World",
  publisher: "Nimia Games",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/pwa-icon/192" },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "CommunityHub" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: DEFAULT_TITLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1586,
        height: 992,
        alt: "Lifetopia Community social platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff7e8" }],
  colorScheme: "light",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaClient />
      </body>
    </html>
  );
}
