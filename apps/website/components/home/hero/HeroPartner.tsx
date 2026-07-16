import Image from "next/image";

export function HeroPartner() {
  return (
    <div
      className="lt-animate-fade-up mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/90 px-3 py-2 shadow-[0_0.8rem_2rem_rgba(32,48,25,0.16)] backdrop-blur-xl"
      style={{
        animationDelay: "290ms",
      }}
    >
      <span className="text-[clamp(0.7rem,0.8vw,0.8rem)] font-black text-[#6b5b4a]">
        Supported by
      </span>

      <span className="flex items-center gap-2 rounded-full bg-[#fff1f4] px-2.5 py-1.5">
        <Image
          src="/images/logo/logo-superteam-id.jpg"
          alt=""
          width={24}
          height={24}
          className="size-5 rounded-full border border-white bg-white object-cover p-0.5 shadow-sm"
        />

        <span className="text-[clamp(0.7rem,0.8vw,0.8rem)] font-black text-[#d93658]">
          Superteam Indonesia
        </span>
      </span>
    </div>
  );
}