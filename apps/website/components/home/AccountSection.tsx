import Image from "next/image";

export function AccountSection() {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="lt-card p-6">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia"
            width={90}
            height={90}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-black">Good Day, Lifetopian! 🍃</h2>
            <p className="mt-1 font-bold">Level 24</p>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e7d8b8]">
          <div className="h-full w-[68%] rounded-full bg-[#5f8f2f]" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["My Account", "Inventory", "Quests", "Map"].map((item) => (
            <button
              key={item}
              className="rounded-2xl border border-[#e7d8b8] bg-white/70 px-4 py-5 font-black shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}