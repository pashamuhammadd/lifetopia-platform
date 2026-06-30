import { GameplayCards } from "@/components/home/GameplayCards";
import { HeroBackground } from "@/components/home/HeroBackground";
import { HeroContent } from "@/components/home/HeroContent";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[680px] overflow-hidden rounded-b-[36px]"
    >
      <HeroBackground />

      <div className="relative z-10 flex h-full items-start px-[8vw] pt-[8vw]">
        <HeroContent />
      </div>

      <GameplayCards />
    </section>
  );
}