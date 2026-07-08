import { communityStats } from "@/data/my-world-layout";

export function MyWorldCommunityStats() {
  return (
    <section className="rounded-[26px] border border-[#ead9b8] bg-white/85 p-5 shadow-[0_16px_38px_rgba(88,60,28,0.08)]">
      <h3 className="text-xl font-black text-[#2f2418]">
        Community Statistics
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {communityStats.map((stat) => (
          <div key={stat.id} className="rounded-[20px] bg-[#fffaf0] p-4">
            <p className="text-xs font-bold text-[#7a5635]">{stat.label}</p>
            <p className="mt-1 text-2xl font-black text-[#2f2418]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}