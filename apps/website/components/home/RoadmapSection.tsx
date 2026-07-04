import { roadmapItems } from "@/data/roadmap";

const statusStyles = {
  Completed: "bg-[#edf7df] text-[#4f8124] border-[#b8dd87]",
  "In Progress": "bg-[#fff8db] text-[#9a6b10] border-[#f0c85f]",
  Next: "bg-[#eef8ff] text-[#256184] border-[#b9ddf2]",
  Future: "bg-[#fff1f6] text-[#b33d68] border-[#f1b7cc]",
};

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative bg-[#fff8e8] px-[clamp(14px,6vw,96px)] py-[clamp(34px,6vw,88px)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="lt-badge px-[clamp(10px,1.2vw,18px)] py-[clamp(5px,0.55vw,8px)] text-[clamp(0.58rem,0.78vw,0.85rem)]">
            Roadmap 🗺️
          </span>

          <h2 className="lt-title mt-[clamp(10px,1.4vw,20px)] text-[clamp(1.35rem,3vw,3.5rem)] leading-tight">
            The Path Toward Beta
          </h2>

          <p className="mx-auto mt-[clamp(6px,0.9vw,14px)] max-w-2xl text-[clamp(0.62rem,1vw,1rem)] font-semibold leading-[1.55] text-[#7a5635]">
            Lifetopia World is being built step by step, with a clear focus on
            platform foundation, community growth, and a better Beta experience.
          </p>
        </div>

        <div className="mt-[clamp(18px,2.5vw,36px)] grid grid-cols-4 gap-[clamp(8px,1.2vw,18px)]">
          {roadmapItems.map((item) => (
            <article
              key={item.phase}
              className="group rounded-[clamp(16px,1.8vw,28px)] border border-white/80 bg-white/75 p-[clamp(10px,1.5vw,24px)] shadow-[0_14px_34px_rgba(88,60,28,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9ed36d] hover:shadow-[0_18px_44px_rgba(88,60,28,0.16)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[clamp(0.4rem,0.75vw,0.8rem)] font-black text-[#7a5635]">
                  {item.phase}
                </span>

                <span
                  className={`rounded-full border px-[clamp(5px,0.7vw,10px)] py-[clamp(2px,0.35vw,5px)] text-[clamp(0.32rem,0.62vw,0.7rem)] font-black ${
                    statusStyles[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="mt-[clamp(8px,1vw,16px)] text-[clamp(0.65rem,1.35vw,1.45rem)] font-black leading-tight text-[#2f1b12] group-hover:text-[#4f8124]">
                {item.title}
              </h3>

              <p className="mt-[clamp(5px,0.8vw,12px)] text-[clamp(0.38rem,0.78vw,0.86rem)] font-semibold leading-[1.45] text-[#6b5b4a]">
                {item.description}
              </p>

              <div className="mt-[clamp(10px,1.3vw,20px)] grid gap-[clamp(4px,0.6vw,8px)]">
                {item.items.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-full border border-[#e4d1aa] bg-[#fffaf0]/80 px-[clamp(7px,1vw,14px)] py-[clamp(4px,0.6vw,8px)] text-[clamp(0.34rem,0.7vw,0.78rem)] font-black text-[#6b5b4a]"
                  >
                    ✓ {feature}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
