import Image from "next/image";

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
    >
      <Image
        src="/images/hero/LT-011-hero-village.png"
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
        className="object-cover object-[62%_center] sm:object-[58%_center] lg:object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,31,19,0.8)_0%,rgba(24,31,19,0.6)_34%,rgba(24,31,19,0.18)_64%,rgba(24,31,19,0.02)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,31,21,0.24)_0%,transparent_28%,transparent_68%,rgba(255,247,232,0.88)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-[clamp(5rem,12vw,10rem)] bg-gradient-to-t from-[#fff7e8] via-[#fff7e8]/45 to-transparent" />
    </div>
  );
}