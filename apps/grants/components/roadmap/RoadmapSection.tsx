import { RoadmapTimeline } from "./RoadmapTimeline";

const roadmapSummary = [
  {
    label: "Grant Request",
    value: "$10,000",
  },
  {
    label: "Delivery Window",
    value: "8–12 Weeks",
  },
  {
    label: "Milestones",
    value: "3",
  },
];

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-7rem] top-[5rem] size-[20rem] rounded-full bg-[#e3f2d8]/60 blur-[6rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[3rem] right-[-8rem] size-[22rem] rounded-full bg-[#e4f1fb]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Beta Roadmap
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              A focused delivery plan from community platform to connected Beta.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[46rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              The requested grant is divided into three measurable milestones,
              each with a clear delivery target, budget allocation, and expected
              product output.
            </p>
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-[clamp(0.9rem,1.4vw,1.1rem)] border border-[#dccdad] bg-white shadow-[0_1rem_3rem_rgba(62,47,27,0.07)]">
            {roadmapSummary.map((item, index) => (
              <article
                key={item.label}
                className={[
                  "min-w-0 px-[clamp(0.55rem,1vw,0.8rem)] py-[clamp(0.7rem,1.2vw,0.95rem)] text-center",
                  index !== 0 ? "border-l border-[#eadfc8]" : "",
                ].join(" ")}
              >
                <p className="truncate text-[clamp(0.66rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#8a7b64]">
                  {item.label}
                </p>

                <p className="mt-2 truncate text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#4d7e39]">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)]">
          <RoadmapTimeline />
        </div>

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9c9a8] bg-[#f8f1e4] p-[clamp(1rem,1.8vw,1.5rem)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[48rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#688255]">
                Delivery Principle
              </p>

              <h3 className="mt-2 text-[clamp(1.15rem,1.6vw,1.45rem)] font-black text-[#30251c]">
                Each milestone will be publicly documented through development
                logs and measurable delivery updates.
              </h3>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              {[
                "Public progress",
                "Measurable outputs",
                "Transparent reporting",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#cdddbf] bg-[#edf6e7] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-[#557f43]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}