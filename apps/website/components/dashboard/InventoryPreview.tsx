const items = [
  { icon: "🌾", name: "Wheat", amount: 125 },
  { icon: "🪵", name: "Wood", amount: 64 },
  { icon: "🪨", name: "Stone", amount: 32 },
  { icon: "🧪", name: "Potion", amount: 12 },
  { icon: "💎", name: "Crystal", amount: 5 },
];

export function InventoryPreview() {
  return (
    <section className="rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-white/75 p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-[#2f1b12]">
            🎒 Inventory Preview
          </h2>
          <p className="text-[clamp(0.6rem,0.85vw,0.85rem)] font-semibold text-[#7a5635]">
            Items collected from your Lifetopia journey.
          </p>
        </div>

        <span className="rounded-full border border-[#d9c99f] bg-[#fff8e8] px-3 py-1 text-[clamp(0.52rem,0.72vw,0.75rem)] font-black text-[#7a5635]">
          Soon
        </span>
      </div>

      <div className="grid grid-cols-5 gap-[clamp(8px,1vw,14px)] max-sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-[clamp(14px,1.6vw,22px)] border border-[#eadfbd] bg-[#fff8e8]/75 p-[clamp(10px,1.4vw,16px)] text-center shadow-sm"
          >
            <div className="text-[clamp(1.4rem,2.6vw,2.5rem)]">
              {item.icon}
            </div>

            <p className="mt-2 text-[clamp(0.58rem,0.82vw,0.86rem)] font-black text-[#2f1b12]">
              {item.name}
            </p>

            <p className="mt-1 text-[clamp(0.52rem,0.72vw,0.75rem)] font-bold text-[#4f8124]">
              x{item.amount}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[clamp(0.58rem,0.8vw,0.82rem)] font-semibold text-[#7a5635]">
        Full inventory sync will be available after game integration.
      </p>
    </section>
  );
}