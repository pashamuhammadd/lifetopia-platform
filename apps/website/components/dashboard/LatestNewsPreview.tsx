const news = [
  {
    title: "Weekly Quest Is Here!",
    desc: "Complete the quest and earn extra Harmony Points.",
    date: "3 Jul 2026",
  },
  {
    title: "Farming Update v0.2.1",
    desc: "New crops, tools, and more rewards are coming.",
    date: "2 Jul 2026",
  },
  {
    title: "Community Event",
    desc: "Share your best moment in Lifetopia and win prizes.",
    date: "1 Jul 2026",
  },
];

export function LatestNewsPreview() {
  return (
    <section className="rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-white/75 p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-[#2f1b12]">
            📣 Latest News
          </h2>
          <p className="text-[clamp(0.6rem,0.85vw,0.85rem)] font-semibold text-[#7a5635]">
            Updates from the Lifetopia development journey.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[clamp(10px,1.4vw,18px)] max-lg:grid-cols-1">
        {news.map((item) => (
          <article
            key={item.title}
            className="rounded-[clamp(14px,1.6vw,22px)] border border-[#eadfbd] bg-[#fff8e8]/75 p-[clamp(12px,1.5vw,18px)]"
          >
            <p className="text-[clamp(0.72rem,1vw,1rem)] font-black text-[#2f1b12]">
              {item.title}
            </p>

            <p className="mt-2 text-[clamp(0.58rem,0.8vw,0.82rem)] font-semibold leading-[1.55] text-[#7a5635]">
              {item.desc}
            </p>

            <p className="mt-3 text-[clamp(0.5rem,0.72vw,0.75rem)] font-bold text-[#7a5635]/70">
              {item.date}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}