import { AccountSection } from "@/components/home/account/AccountSection";
import { CommunitySection } from "@/components/home/community/CommunitySection";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/home/footer/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GameplayCards } from "@/components/home/GameplayCards";
import { DevelopmentJourneySection } from "@/components/home/development-journey/DevelopmentJourneySection";
import { RoadmapSection } from "@/components/home/RoadmapSection";

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
      <Footer />
    </main>
  );
}