import Image from "next/image";

export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src="/images/hero/LT-011-hero-village.png"
          alt="Lifetopia World Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay on left for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-black/10 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fff7e8] via-[#fff7e8]/35 to-transparent" />
    </>
  );
}