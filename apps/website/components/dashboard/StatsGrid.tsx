import type { DashboardStat } from "@repo/types/dashboard";

type StatsGridProps = {
  stats: DashboardStat[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-[clamp(0.5rem,1.5vw,1rem)]">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[clamp(1rem,2vw,1.5rem)] border border-white/80 bg-white/75 p-[clamp(0.8rem,2vw,1.4rem)] shadow-sm"
        >
          <p className="text-[clamp(0.62rem,0.85vw,0.8rem)] font-bold text-[#7a5635]">
            {stat.label}
          </p>
          <p className="mt-1 text-[clamp(1.4rem,3vw,2.5rem)] font-black text-[#2f1b12]">
            {stat.value}
          </p>
          <p className="text-[clamp(0.58rem,0.8vw,0.75rem)] leading-[1.5] text-[#7a5635]">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}