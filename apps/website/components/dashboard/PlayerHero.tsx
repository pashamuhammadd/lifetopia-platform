import Image from "next/image";
import type { DashboardProfile } from "@repo/types/dashboard";

type PlayerHeroProps = {
  profile: DashboardProfile;
};

export function PlayerHero({ profile }: PlayerHeroProps) {
  const avatarSrc = profile.avatar_id
    ? `/images/avatars/${profile.avatar_id}.jpg`
    : "/images/avatars/avatar-01.jpg";

  return (
    <section className="relative overflow-hidden rounded-[clamp(22px,3vw,42px)] border border-white/80 bg-white/70 shadow-[0_24px_80px_rgba(88,60,28,0.16)]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/LT-011-hero-village.png"
          alt="Lifetopia Village"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff7e8]/95 via-[#fff7e8]/82 to-[#fff7e8]/25" />
      </div>

      <div className="relative z-10 flex items-center gap-[clamp(14px,3vw,34px)] p-[clamp(16px,3vw,42px)] max-sm:flex-col max-sm:text-center">
        <div className="relative">
          <Image
            src={avatarSrc}
            alt={profile.display_name}
            width={170}
            height={170}
            className="h-[clamp(92px,15vw,170px)] w-[clamp(92px,15vw,170px)] rounded-full border-[clamp(4px,0.6vw,8px)] border-white bg-white object-cover shadow-[0_20px_60px_rgba(88,60,28,0.22)]"
          />

          <div className="absolute -bottom-1 -right-1 flex h-[clamp(30px,4vw,46px)] w-[clamp(30px,4vw,46px)] items-center justify-center rounded-full border border-white bg-[#4f8124] text-white shadow-lg">
            ✎
          </div>
        </div>

        <div className="min-w-0">
          <h1 className="text-[clamp(1.65rem,4vw,4rem)] font-black leading-tight tracking-[-0.04em] text-[#2f1b12]">
            {profile.display_name}
          </h1>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#b6e56a] bg-[#f5fbdf]/90 px-[clamp(10px,1.3vw,16px)] py-[clamp(6px,0.75vw,9px)] text-[clamp(0.62rem,0.9vw,0.95rem)] font-black text-[#4f8124] shadow-sm">
            🍃 Harmony Verified
          </div>

          <div className="mt-[clamp(12px,1.7vw,22px)]">
            <p className="text-[clamp(0.75rem,1vw,1rem)] font-black text-[#2f1b12]">
              Harmony Lv. 12
            </p>

            <div className="mt-2 h-[clamp(8px,1vw,12px)] w-[clamp(180px,24vw,320px)] overflow-hidden rounded-full bg-[#eadfbd] max-sm:mx-auto">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#4f8124] to-[#9ed36d]" />
            </div>

            <p className="mt-2 text-[clamp(0.6rem,0.82vw,0.86rem)] font-semibold text-[#7a5635]">
              1,230 / 2,000 EXP
            </p>
          </div>

          <div className="mt-[clamp(10px,1.4vw,18px)] flex flex-wrap gap-[clamp(8px,1vw,14px)] text-[clamp(0.62rem,0.85vw,0.9rem)] font-bold text-[#7a5635] max-sm:justify-center">
            <span>📍 {profile.country_name}</span>
            <span>🌿 Joined Jul 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}