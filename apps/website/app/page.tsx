import { AccountSection } from "@/components/home/account/AccountSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { ExploreSection } from "@/components/home/ExploreSection";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GameplayCards } from "@/components/home/GameplayCards";
import { DevelopmentJourneySection } from "@/components/home/development-journey/DevelopmentJourneySection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AccountSection />
      <GameplayCards />
      <DevelopmentJourneySection />
      <CommunitySection />
      <Footer />
    </main>
  );
}