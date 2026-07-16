import { HeroBackground } from "@/components/home/hero/HeroBackground";
import { HeroContent } from "@/components/home/hero/HeroContent";

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#fff7e8] pt-[clamp(5.4rem,7vw,6.5rem)]"
    >
      <HeroBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <span className="lt-animate-float absolute left-[5%] top-[25%] size-2 rounded-full bg-white/70 shadow-[0_0_1.5rem_rgba(255,255,255,0.85)]" />

        <span
          className="lt-animate-float absolute left-[42%] top-[18%] size-1.5 rounded-full bg-[#d9f8b8]/80 shadow-[0_0_1.3rem_rgba(217,248,184,0.8)]"
          style={{
            animationDelay: "800ms",
          }}
        />

        <span
          className="lt-animate-float absolute bottom-[28%] left-[35%] size-2.5 rounded-full bg-[#fff2b7]/75 shadow-[0_0_1.8rem_rgba(255,242,183,0.75)]"
          style={{
            animationDelay: "1600ms",
          }}
        />
      </div>

      <div className="lt-container relative z-10 flex w-full items-center py-[clamp(2rem,5vw,4.5rem)]">
        <HeroContent />
      </div>
    </section>
  );
}