import Image from "next/image";

export function HeroPartner() {
  return (
    <div className="mt-[1.2vw] inline-flex items-center gap-[0.5vw] rounded-full border border-white/70 bg-white/86 px-[1vw] py-[0.45vw] shadow-[0_10px_24px_rgba(88,60,28,0.12)] backdrop-blur-xl">
      <span className="text-[clamp(0.32rem,0.78vw,0.85rem)] font-black text-[#6b5b4a]">
        Supported by
      </span>

      <span className="flex items-center gap-[0.5vw] rounded-full bg-[#fff1f4] px-[0.8vw] py-[0.35vw]">
        <Image
          src="/images/logo/logo-superteam-id.jpg"
          alt="Superteam Indonesia"
          width={24}
          height={24}
          className="h-[clamp(10px,1.7vw,24px)] w-[clamp(10px,1.7vw,24px)] rounded-full border border-white/60 bg-white object-cover p-0.5 shadow-sm"
        />

        <span className="text-[clamp(0.32rem,0.78vw,0.85rem)] font-black text-[#e83b5f]">
          Superteam Indonesia
        </span>
      </span>
    </div>
  );
}