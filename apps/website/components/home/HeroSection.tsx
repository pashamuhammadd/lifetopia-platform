import { GameplayCards } from "@/components/home/GameplayCards";
import { HeroBackground } from "@/components/home/HeroBackground";
import { HeroContent } from "@/components/home/HeroContent";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-b-[clamp(24px,3vw,36px)] bg-[#fff7e8]"
    >
      <HeroBackground />

      <div className="absolute inset-0 z-10 px-[8vw] pt-[8vw]">
  <div className="origin-top-left scale-[clamp(0.42,1vw,1)]">
    <HeroContent />
  </div>
</div>

     <div
  className="
    relative z-20
    px-[clamp(16px,5vw,96px)]
    mt-[clamp(20px,4vw,40px)]
    md:-mt-[clamp(28px,5vw,82px)]
  "
>
  <GameplayCards />
</div>
    </section>
  );
}