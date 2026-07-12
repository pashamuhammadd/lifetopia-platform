import type {
  Metadata,
  Viewport,
} from "next";

import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";

import "./globals.css";

const portalUrl =
  "https://grants.lifetopiaworld.io";

const portalTitle =
  "Lifetopia World Funding Review Portal";

const portalDescription =
  "Review Lifetopia World's live products, public development evidence, Beta roadmap, funding allocation, expected impact, technical foundation, and delivery team.";

export const metadata: Metadata = {
  metadataBase: new URL(portalUrl),

  applicationName:
    "Lifetopia World Funding Review Portal",

  title: {
    default: portalTitle,
    template: "%s | Lifetopia World",
  },

  description: portalDescription,

  keywords: [
    "Lifetopia World",
    "Lifetopia Grant",
    "Solana Game",
    "Solana Ecosystem",
    "Web3 Gaming",
    "Cozy Life Simulation",
    "Grant Proposal",
    "Game Development",
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

  category: "technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Lifetopia World",
    title: portalTitle,
    description: portalDescription,
    images: [
      {
        url: "/brand/lifetopia-icon.png",
        alt: "Lifetopia World official game icon",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: portalTitle,
    description: portalDescription,
    images: [
      "/brand/lifetopia-icon.png",
    ],
  },

  icons: {
    icon: [
      {
        url: "/brand/lifetopia-icon.png",
        type: "image/png",
      },
    ],
    shortcut:
      "/brand/lifetopia-icon.png",
    apple:
      "/brand/lifetopia-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#173b21",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-['Baloo_2']">
        {children}
      </body>
    </html>
  );
}