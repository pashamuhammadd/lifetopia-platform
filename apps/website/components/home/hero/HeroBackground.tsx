import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="relative w-full bg-[#fff7e8]">
      <Image
        src="/images/hero/LT-011-hero-village.png"
        alt="Lifetopia World Hero"
        width={2560}
        height={1200}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-[clamp(56px,8vw,128px)] bg-gradient-to-t from-[#fff7e8] via-[#fff7e8]/35 to-transparent" />
    </div>
  );
}
