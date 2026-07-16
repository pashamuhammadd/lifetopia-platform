import { HeroButtons } from "@/components/home/hero/HeroButtons";
import { HeroPartner } from "@/components/home/hero/HeroPartner";

export function HeroContent() {
  return (
    <div className="w-full max-w-[41rem]">
      <div
        className="lt-badge lt-animate-fade-up border-white/25 bg-white/90 text-[#426f2e]"
        style={{
          animationDelay: "80ms",
        }}
      >
        <span className="size-1.5 rounded-full bg-[#6fa83a]" />
        One Connected Digital Society
      </div>

      <h1
        id="hero-title"
        className="lt-animate-fade-up mt-4 max-w-[13ch] text-balance text-[clamp(2.35rem,5vw,4.9rem)] font-black leading-[0.98] tracking-[-0.045em] text-white drop-shadow-[0_4px_22px_rgba(14,31,17,0.34)]"
        style={{
          animationDelay: "150ms",
        }}
      >
        More than a game.

        <span className="mt-2 block">
          A world we{" "}
          <span className="text-[#b9ee7f]">
            build together.
          </span>
        </span>
      </h1>

      <p
        className="lt-animate-fade-up mt-[clamp(1rem,2vw,1.4rem)] max-w-[38rem] text-[clamp(0.95rem,1.2vw,1.12rem)] font-semibold leading-[1.65] text-white/82 drop-shadow-[0_2px_12px_rgba(19,32,18,0.28)]"
        style={{
          animationDelay: "220ms",
        }}
      >
        Lifetopia World brings gameplay, friendship, identity,
        ownership, and a player-driven economy into one evolving
        cozy society shaped by its players.
      </p>

      <HeroPartner />

      <HeroButtons />
    </div>
  );
}