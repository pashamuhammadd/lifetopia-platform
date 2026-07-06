import Image from "next/image";
import type { AccountPreviewUser } from "@repo/types/account";
import { formatPercent } from "@repo/lib/format";

type AccountPreviewCardProps = {
  user: AccountPreviewUser;
};

export function AccountPreviewCard({ user }: AccountPreviewCardProps) {
  const progress = formatPercent(user.progress);

  return (
    <div className="relative overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-white/80 bg-gradient-to-br from-[#f5fbdf] via-white to-[#fff3df] p-[clamp(10px,1.5vw,22px)] shadow-[0_18px_48px_rgba(88,60,28,0.14)]">
      <div className="absolute right-0 top-0 h-[clamp(70px,10vw,150px)] w-[clamp(70px,10vw,150px)] rounded-bl-full bg-[#8cc84b]/18 blur-2xl" />

      <div className="relative z-10 flex items-center gap-[clamp(10px,1.3vw,18px)]">
        <Image
          src={user.avatar}
          alt={user.displayName}
          width={96}
          height={96}
          className="h-[clamp(46px,6vw,90px)] w-[clamp(46px,6vw,90px)] rounded-full border border-white/80 bg-white object-contain p-[clamp(5px,0.7vw,10px)] shadow-[0_12px_28px_rgba(88,60,28,0.14)]"
        />

        <div>
          <div className="text-[clamp(0.45rem,0.75vw,0.85rem)] font-black text-[#6fa83a]">
            Welcome Back
          </div>

          <h3 className="mt-[clamp(2px,0.35vw,5px)] text-[clamp(0.9rem,2vw,2rem)] font-black leading-tight text-[#2f1b12]">
            Good Day, {user.displayName}!
          </h3>

          <p className="mt-[clamp(2px,0.45vw,6px)] text-[clamp(0.48rem,0.82vw,0.9rem)] font-bold text-[#7a5635]">
            Level {user.level} {user.role}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-[clamp(10px,1.5vw,18px)]">
        <div className="flex items-center justify-between">
          <span className="text-[clamp(0.4rem,0.72vw,0.82rem)] font-black text-[#7a5635]">
            Harmony Progress
          </span>

          <span className="text-[clamp(0.4rem,0.72vw,0.82rem)] font-black text-[#4f8124]">
            {progress}%
          </span>
        </div>

        <div className="mt-[clamp(4px,0.7vw,9px)] h-[clamp(7px,0.8vw,11px)] overflow-hidden rounded-full bg-[#eadfbd]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7db53d] to-[#b6e56a]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 mt-[clamp(10px,1.5vw,18px)] grid grid-cols-4 gap-[clamp(5px,0.8vw,11px)]">
        {user.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[clamp(10px,1.1vw,16px)] border border-white/80 bg-white/65 p-[clamp(6px,0.8vw,12px)] text-center shadow-sm"
          >
            <div className="text-[clamp(0.52rem,1.05vw,1.15rem)] font-black text-[#4f8124]">
              {stat.value}
            </div>

            <div className="mt-[clamp(1px,0.2vw,3px)] text-[clamp(0.3rem,0.55vw,0.65rem)] font-black text-[#7a5635]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}