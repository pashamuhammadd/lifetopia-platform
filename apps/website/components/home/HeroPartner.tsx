import Image from "next/image";

export function HeroPartner() {
  return (
    <div className="mt-[1.2vw] inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/86 px-4 py-2 shadow-[0_10px_24px_rgba(88,60,28,0.12)] backdrop-blur-xl">
      <span className="text-[clamp(0.62rem,0.78vw,0.85rem)] font-black text-[#6b5b4a]">
        Supported by
      </span>

      <span className="flex items-center gap-2 rounded-full bg-[#fff1f4] px-3 py-1.5">
        <Image
          src="/images/logo/logo-superteam-id.jpg"
          alt="Superteam Indonesia"
          width={24}
          height={24}
          className="h-6 w-6 rounded-full border border-white/60 bg-white object-cover p-0.5 shadow-sm"
        />
        <span className="text-[clamp(0.62rem,0.78vw,0.85rem)] font-black text-[#e83b5f]">
          Superteam Indonesia
        </span>
      </span>
    </div>
  );
}