const features = [
  {
    icon: "🌾",
    title: "Farming Expansion",
    desc: "More crops, tools, and cozy farming loops.",
  },
  {
    icon: "🎒",
    title: "Inventory System",
    desc: "Items from gameplay will appear in your dashboard.",
  },
  {
    icon: "🪙",
    title: "Blockchain Integration",
    desc: "Wallet, NFTs, and future on-chain assets.",
  },
  {
    icon: "💬",
    title: "Community Hub",
    desc: "Forum quests, social activity, and player growth.",
  },
];

export function ComingSoonFeatures() {
  return (
    <section className="relative overflow-hidden rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-gradient-to-r from-[#6fa83a]/80 via-[#f5fbdf] to-[#fff8e8] p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="absolute -right-10 bottom-0 text-[clamp(6rem,12vw,12rem)] opacity-10">
        🍃
      </div>

      <div className="relative z-10">
        <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-white drop-shadow-sm">
          ✨ Coming Soon
        </h2>

        <p className="mt-1 text-[clamp(0.6rem,0.85vw,0.85rem)] font-semibold text-white/90">
          Features currently being prepared for the Lifetopia ecosystem.
        </p>

        <div className="mt-5 grid grid-cols-4 gap-[clamp(8px,1.2vw,16px)] max-lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[clamp(14px,1.6vw,22px)] border border-white/60 bg-white/60 p-[clamp(10px,1.4vw,16px)] backdrop-blur-sm"
            >
              <div className="text-[clamp(1.5rem,2.8vw,2.6rem)]">
                {feature.icon}
              </div>

              <p className="mt-2 text-[clamp(0.62rem,0.85vw,0.9rem)] font-black text-[#2f1b12]">
                {feature.title}
              </p>

              <p className="mt-1 text-[clamp(0.52rem,0.72vw,0.76rem)] font-semibold leading-[1.45] text-[#7a5635]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}