const activities = [
  { name: "Sonny", text: "posted in General Discussion", time: "2m ago" },
  { name: "Hariono", text: "reached Harmony Lv. 20", time: "15m ago" },
  { name: "Ahmad", text: "earned the Alpha Contributor badge", time: "1h ago" },
  { name: "Lifetopia Official", text: "New weekly quest is now live", time: "3h ago" },
];

export function CommunityActivity() {
  return (
    <section className="rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-white/75 p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-[#2f1b12]">
          💬 Community Activity
        </h2>

        <span className="rounded-full border border-[#d9c99f] bg-[#fff8e8] px-3 py-1 text-[clamp(0.52rem,0.72vw,0.75rem)] font-black text-[#7a5635]">
          Soon
        </span>
      </div>

      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-[#f5fbdf] text-lg shadow-sm">
              🍃
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[clamp(0.7rem,0.95vw,0.95rem)] font-black text-[#2f1b12]">
                {item.name}
              </p>
              <p className="truncate text-[clamp(0.58rem,0.8vw,0.82rem)] font-semibold text-[#7a5635]">
                {item.text}
              </p>
            </div>

            <p className="text-[clamp(0.52rem,0.72vw,0.75rem)] font-bold text-[#7a5635]/70">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}