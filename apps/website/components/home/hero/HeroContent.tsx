import { HeroButtons } from "@/components/home/hero/HeroButtons";
import { HeroPartner } from "@/components/home/hero/HeroPartner";

export function HeroContent() {
  return (
    <div className="w-[38vw] max-w-[560px]">
      <div className="lt-badge mb-[0.9vw] px-[1.2vw] py-[0.45vw] text-[clamp(0.32rem,0.78vw,0.85rem)]">
        Welcome to Lifetopia World 🍃
      </div>

      <h1 className="lt-title text-[clamp(0.9rem,4vw,4.35rem)] leading-[1.03]">
        A Peaceful Life,
        <br />
        In <span className="text-[#7DB53D]">Your Own World</span>
      </h1>

      <p className="mt-[1.1vw] max-w-xl text-[clamp(0.36rem,1.05vw,1.05rem)] font-semibold leading-[1.45] text-[#F8F5EF]">
        Farm, fish, craft, build, and make lifelong friends. Escape the stress
        of everyday life and enjoy a peaceful cozy world.
      </p>

      <HeroPartner />

      <HeroButtons />
    </div>
  );
}
