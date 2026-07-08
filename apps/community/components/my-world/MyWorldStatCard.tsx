import type { LucideIcon } from "lucide-react";

const toneStyles = {
  green: "bg-[#edf7df] text-[#4f8124]",
  gold: "bg-[#fff4dc] text-[#b87912]",
  purple: "bg-[#f3edff] text-[#6d4cc2]",
  orange: "bg-[#fff0df] text-[#c06a1d]",
  blue: "bg-[#e8f3ff] text-[#2f73c9]",
  violet: "bg-[#f3edff] text-[#6d4cc2]",
  pink: "bg-[#fff0f6] text-[#c24174]",
};

type Tone = keyof typeof toneStyles;

type MyWorldStatCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  tone: string;
  compact?: boolean;
};

export function MyWorldStatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
  compact = false,
}: MyWorldStatCardProps) {
  const color = toneStyles[(tone as Tone) ?? "green"] ?? toneStyles.green;

  return (
    <div className="rounded-[24px] border border-[#ead9b8] bg-white/85 p-4 shadow-[0_14px_34px_rgba(88,60,28,0.08)]">
      <div className="flex items-center gap-3">
        <div
          className={`grid shrink-0 place-items-center rounded-[18px] ${color} ${
            compact ? "size-11" : "size-14"
          }`}
        >
          <Icon size={compact ? 22 : 26} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
            {label}
          </p>
          <p
            className={`truncate font-black text-[#2f2418] ${
              compact ? "text-xl" : "text-2xl"
            }`}
          >
            {value}
          </p>
          <p className="truncate text-xs font-bold text-[#7a5635]">{helper}</p>
        </div>
      </div>
    </div>
  );
}