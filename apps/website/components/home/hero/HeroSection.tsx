import { HeroBackground } from "@/components/home/hero/HeroBackground";
import { HeroContent } from "@/components/home/hero/HeroContent";

export function HeroSection() {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-[#fff7e8]"
      >
        <HeroBackground />

        <div className="absolute inset-0 z-10 px-[8vw] pt-[8vw]">
          <HeroContent />
        </div>
      </section>
    </>
  );
}
