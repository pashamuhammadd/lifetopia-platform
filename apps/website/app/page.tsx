import { AccountSection } from "@/components/home/account/AccountSection";
import { CommunitySection } from "@/components/home/community/CommunitySection";
import { HeroSection } from "@/components/home/hero/HeroSection";
import { Footer } from "@/components/home/footer/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GameplayCards } from "@/components/home/gameplay/GameplayCards";
import { DevelopmentJourneySection } from "@/components/home/development-journey/DevelopmentJourneySection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { NewsSection } from "@/components/home/news/NewsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AccountSection />
      <GameplayCards />
      <DevelopmentJourneySection />
      <RoadmapSection />
      <CommunitySection />
      <NewsSection />
      <Footer />
    </main>
  );
}
