import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone?: "green" | "gold" | "blue" | "purple" | "orange" | "pink";
};

const toneStyles = {
  green: "bg-[#edf7df] text-[#4f8124]",
  gold: "bg-[#fff4dc] text-[#b87912]",
  blue: "bg-[#e8f3ff] text-[#2f73c9]",
  purple: "bg-[#f3edff] text-[#6d4cc2]",
  orange: "bg-[#fff0df] text-[#c06a1d]",
  pink: "bg-[#fff0f6] text-[#c24174]",
};

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "green",
}: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-[#ead9b8] bg-white/85 p-4 shadow-[0_14px_34px_rgba(88,60,28,0.08)]">
      <div className="flex items-center gap-3">
        <div
          className={`grid size-12 shrink-0 place-items-center rounded-[18px] ${toneStyles[tone]}`}
        >
          <Icon size={23} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
            {label}
          </p>
          <p className="truncate text-2xl font-black text-[#2f2418]">
            {value}
          </p>
          {helper ? (
            <p className="truncate text-xs font-bold text-[#7a5635]">
              {helper}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}