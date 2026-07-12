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

const deliveryPrinciples = [
  "Sequential milestones",
  "Defined deliverables",
  "Public reporting",
  "Acceptance-based progress",
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
              Beta Delivery Roadmap
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Three sequential milestones with clear delivery outcomes.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Funding is organized around measurable product delivery.
              Each milestone begins after the previous phase reaches its
              acceptance criteria, reducing integration risk and keeping
              progress reviewable.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#203d28]/15 bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
              Delivery Structure
            </p>

            <h3 className="mt-2 text-[clamp(1.25rem,1.7vw,1.6rem)] font-black leading-[1.25]">
              Funding follows verified milestone execution.
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {deliveryPrinciples.map((principle) => (
                <span
                  key={principle}
                  className="rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-white/10 bg-white/[0.06] px-3 py-2.5 text-center text-[clamp(0.7rem,0.8vw,0.86rem)] font-bold text-white/72"
                >
                  {principle}
                </span>
              ))}
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(1.2rem,2.5vw,1.9rem)] grid grid-cols-3 overflow-hidden rounded-[clamp(0.9rem,1.4vw,1.1rem)] border border-[#dccdad] bg-white shadow-[0_1rem_3rem_rgba(62,47,27,0.07)]">
          {roadmapSummary.map((item, index) => (
            <article
              key={item.label}
              className={[
                "min-w-0 px-[clamp(0.55rem,1vw,0.8rem)] py-[clamp(0.8rem,1.3vw,1rem)] text-center",
                index !== 0
                  ? "border-l border-[#eadfc8]"
                  : "",
              ].join(" ")}
            >
              <p className="text-[clamp(0.66rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#8a7b64]">
                {item.label}
              </p>

              <p className="mt-2 text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#4d7e39]">
                {item.value}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(2rem,4vw,3.2rem)]">
          <RoadmapTimeline />
        </div>

        <footer className="rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9c9a8] bg-[#173b21] p-[clamp(1rem,1.8vw,1.5rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.15)]">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-[52rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
                How to Read the Funding Plan
              </p>

              <h3 className="mt-2 text-[clamp(1.15rem,1.6vw,1.45rem)] font-black">
                Roadmap funding and budget allocation describe the same
                $10,000 from two different perspectives.
              </h3>

              <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-white/68">
                This roadmap shows funding by delivery milestone. The next
                section shows how the same funds are distributed across cost
                categories such as development, infrastructure, testing, and
                onboarding.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[0.75rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.08em] text-white/42">
                  By Milestone
                </p>

                <p className="mt-1 text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#afe794]">
                  $10,000
                </p>
              </div>

              <div className="rounded-[0.75rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.08em] text-white/42">
                  By Category
                </p>

                <p className="mt-1 text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#afe794]">
                  $10,000
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}