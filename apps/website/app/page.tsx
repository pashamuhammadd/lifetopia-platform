import { AccountSection } from "@/components/home/AccountSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { ExploreSection } from "@/components/home/ExploreSection";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ExploreSection />
      <AccountSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}