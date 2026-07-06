import type { DashboardStat } from "@repo/types/dashboard";

type StatsGridProps = {
  stats: DashboardStat[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section>
      <div className="mb-[clamp(8px,1vw,14px)] flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[clamp(1rem,1.8vw,2rem)] font-black text-[#2f1b12]">
            Player Progress
          </h2>
          <p className="text-[clamp(0.62rem,0.85vw,0.9rem)] font-semibold text-[#7a5635]">
            Early dashboard stats for your Lifetopia journey.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[clamp(8px,1.2vw,16px)] max-sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-[clamp(16px,2vw,28px)] border border-white/80 bg-white/75 p-[clamp(11px,1.6vw,22px)] shadow-[0_14px_34px_rgba(88,60,28,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9ed36d] hover:bg-white"
          >
            <p className="text-[clamp(0.54rem,0.78vw,0.82rem)] font-black text-[#7a5635]">
              {stat.label}
            </p>

            <p className="mt-1 text-[clamp(1.25rem,2.6vw,2.65rem)] font-black leading-none text-[#4f8124]">
              {stat.value}
            </p>

            <p className="mt-2 text-[clamp(0.54rem,0.75vw,0.78rem)] font-semibold leading-[1.45] text-[#7a5635]">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}