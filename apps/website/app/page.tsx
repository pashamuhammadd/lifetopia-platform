import type { Metadata } from "next";

import { CommunitySection } from "@/components/home/community/CommunitySection";
import { DevelopmentJourneySection } from "@/components/home/development-journey/DevelopmentJourneySection";
import { LiveDevelopmentLogSection } from "@/components/home/development-log/LiveDevelopmentLogSection";
import { Footer } from "@/components/home/footer/Footer";
import { GameplayCards } from "@/components/home/gameplay/GameplayCards";
import { HeroSection } from "@/components/home/hero/HeroSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "A Cozy Connected Digital Society",
  description:
    "Enter Lifetopia World, a cozy connected digital society where gameplay, friendship, identity, ownership, and a player-driven economy grow together.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lifetopia World — A Cozy Connected Digital Society",
    description:
      "More than a game. Discover a cozy connected world shaped by gameplay, friendship, identity, ownership, and community.",
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
    title: "Lifetopia World — A Cozy Connected Digital Society",
    description:
      "More than a game. Discover a cozy connected world shaped by gameplay, friendship, identity, ownership, and community.",
    images: ["/images/og/lifetopia-og.png"],
    creator: "@LifetopiaWorld",
  },
};

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="overflow-x-clip"
      >
        <HeroSection />
        <GameplayCards />
        <CommunitySection />
        <DevelopmentJourneySection />
        <RoadmapSection />
        <LiveDevelopmentLogSection />
      </main>

      <Footer />
    </>
  );
}