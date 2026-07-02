import Image from "next/image";
import type { AccountPreviewUser } from "@/types/account";
import { formatPercent } from "@/lib/format";

type AccountPreviewCardProps = {
  user: AccountPreviewUser;
};

export function AccountPreviewCard({ user }: AccountPreviewCardProps) {
  const progress = formatPercent(user.progress);

  return (
    <div className="relative overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-white/80 bg-gradient-to-br from-[#f5fbdf] via-white to-[#fff3df] p-[clamp(12px,2vw,32px)] shadow-[0_18px_48px_rgba(88,60,28,0.14)]">
      <div className="absolute right-0 top-0 h-[clamp(80px,12vw,180px)] w-[clamp(80px,12vw,180px)] rounded-bl-full bg-[#8cc84b]/18 blur-2xl" />

      <div className="relative z-10 flex items-center gap-[clamp(10px,1.4vw,22px)]">
        <Image
          src={user.avatar}
          alt={user.displayName}
          width={120}
          height={120}
          className="h-[clamp(52px,7vw,120px)] w-[clamp(52px,7vw,120px)] rounded-full border border-white/80 bg-white object-contain p-[clamp(6px,0.8vw,12px)] shadow-[0_12px_28px_rgba(88,60,28,0.14)]"
        />

        <div>
          <div className="text-[clamp(0.48rem,0.85vw,0.95rem)] font-black text-[#6fa83a]">
            Welcome Back
          </div>

          <h3 className="mt-[clamp(2px,0.4vw,6px)] text-[clamp(1rem,2.4vw,2.6rem)] font-black leading-tight text-[#2f1b12]">
            Good Day, {user.displayName}!
          </h3>

          <p className="mt-[clamp(3px,0.5vw,8px)] text-[clamp(0.5rem,0.9vw,1rem)] font-bold text-[#7a5635]">
            Level {user.level} {user.role}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-[clamp(14px,2vw,32px)]">
        <div className="flex items-center justify-between">
          <span className="text-[clamp(0.42rem,0.8vw,0.9rem)] font-black text-[#7a5635]">
            Harmony Progress
          </span>
          <span className="text-[clamp(0.42rem,0.8vw,0.9rem)] font-black text-[#4f8124]">
            {progress}%
          </span>
        </div>

        <div className="mt-[clamp(5px,0.8vw,12px)] h-[clamp(8px,1vw,14px)] overflow-hidden rounded-full bg-[#eadfbd]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7db53d] to-[#b6e56a]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 mt-[clamp(14px,2vw,30px)] grid grid-cols-4 gap-[clamp(6px,1vw,14px)]">
        {user.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[clamp(12px,1.3vw,20px)] border border-white/80 bg-white/65 p-[clamp(7px,1vw,16px)] text-center shadow-sm"
          >
            <div className="text-[clamp(0.56rem,1.3vw,1.5rem)] font-black text-[#4f8124]">
              {stat.value}
            </div>
            <div className="mt-[clamp(1px,0.25vw,4px)] text-[clamp(0.32rem,0.65vw,0.75rem)] font-black text-[#7a5635]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}