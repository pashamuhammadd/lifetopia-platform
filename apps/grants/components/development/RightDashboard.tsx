import { TechnologyIcon } from "@/components/TechnologyIcon";

import { betaRoadmap } from "./development-data";
import {
  getProgressLabel,
  getRoadmapAccent,
  getStatusStyle,
} from "./development-utils";

const fundingAllocation = [
  {
    label: "Development",
    description: "Core features and gameplay systems",
    percent: 60,
    amount: "$6,000",
    color: "#8eea45",
  },
  {
    label: "Infrastructure",
    description: "Server, database, CI/CD, and monitoring",
    percent: 20,
    amount: "$2,000",
    color: "#3fa8ff",
  },
  {
    label: "Operations",
    description: "Tools, licenses, and productivity",
    percent: 10,
    amount: "$1,000",
    color: "#f3aa2e",
  },
  {
    label: "Community & Testing",
    description: "Testing, feedback, and community programs",
    percent: 10,
    amount: "$1,000",
    color: "#9268ef",
  },
];

function getMilestoneIcon(
  icon: "community" | "game" | "ecosystem",
) {
  if (icon === "game") {
    return "mdi:gamepad-variant-outline";
  }

  if (icon === "ecosystem") {
    return "mdi:connection";
  }

  return "mdi:account-group";
}

export function RightDashboard() {
  return (
    <div className="min-w-0 space-y-[clamp(0.75rem,1.3vw,1rem)]">
      <section className="overflow-hidden rounded-[clamp(0.85rem,1.4vw,1.1rem)] border border-white/10 bg-[#0a140d]/95 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.28)] backdrop-blur">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-[clamp(0.75rem,1.3vw,1rem)] py-[clamp(0.65rem,1.1vw,0.85rem)]">
          <div className="min-w-0">
            <p className="font-mono text-[clamp(0.32rem,0.54vw,0.46rem)] font-black uppercase tracking-[0.1em] text-[#91ec65]">
              Delivery Roadmap
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-[#8eea45]/15 bg-[#8eea45]/10 px-3 py-1 font-mono text-[clamp(0.26rem,0.44vw,0.37rem)] font-black text-[#93ef6d]">
            8–12 Weeks
          </span>
        </div>

        <div className="flex flex-col gap-[clamp(0.55rem,1vw,0.8rem)] p-[clamp(0.7rem,1.2vw,0.95rem)]">
          {betaRoadmap.map((milestone, index) => {
            const accent = getRoadmapAccent(milestone.accent);
            const status = getStatusStyle(milestone.status);

            return (
              <article
                key={milestone.id}
                className="rounded-[clamp(0.65rem,1vw,0.82rem)] border border-white/[0.08] bg-[#0d1810] p-[clamp(0.65rem,1.1vw,0.88rem)]"
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-[clamp(0.55rem,0.9vw,0.72rem)]">
                  <div
                    className={`flex size-[clamp(2.2rem,3.4vw,2.8rem)] items-center justify-center rounded-[clamp(0.5rem,0.85vw,0.68rem)] border border-white/[0.06] ${accent.soft}`}
                  >
                    <span className={accent.text}>
                      <TechnologyIcon
                        icon={getMilestoneIcon(milestone.icon)}
                        label={milestone.title}
                      />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-[clamp(0.3rem,0.55vw,0.44rem)]">
                      <span
                        className={`flex size-[clamp(1.65rem,2.5vw,2rem)] items-center justify-center rounded-[clamp(0.4rem,0.7vw,0.55rem)] font-mono text-[clamp(0.46rem,0.76vw,0.64rem)] font-black ${accent.soft} ${accent.text}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-[clamp(0.58rem,0.9vw,0.76rem)] font-extrabold text-white">
                        {milestone.title}
                      </h3>

                      <span
                        className={`rounded-full px-[clamp(0.35rem,0.6vw,0.48rem)] py-[clamp(0.08rem,0.18vw,0.14rem)] text-[clamp(0.26rem,0.44vw,0.37rem)] font-black ${status.badge}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="mt-[clamp(0.22rem,0.42vw,0.32rem)] flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[clamp(0.27rem,0.46vw,0.39rem)] font-bold text-white/45">
                        {milestone.funding}
                      </span>

                      <span className="size-1 rounded-full bg-white/20" />

                      <span className="font-mono text-[clamp(0.27rem,0.46vw,0.39rem)] text-white/38">
                        {milestone.duration}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-[clamp(0.72rem,1.1vw,0.94rem)] font-black ${accent.text}`}
                    >
                      {milestone.progress}%
                    </p>

                    <p className="mt-0.5 whitespace-nowrap text-[clamp(0.24rem,0.42vw,0.35rem)] font-medium text-white/42">
                      {getProgressLabel(milestone.progress)}
                    </p>
                  </div>
                </div>

                <div className="mt-[clamp(0.5rem,0.9vw,0.7rem)] h-[clamp(0.24rem,0.42vw,0.34rem)] overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={`h-full rounded-full ${accent.progress}`}
                    style={{
                      width: `${milestone.progress}%`,
                    }}
                  />
                </div>

                <div className="mt-[clamp(0.48rem,0.85vw,0.66rem)] flex flex-wrap gap-[clamp(0.28rem,0.5vw,0.4rem)]">
                  {milestone.deliverables.map((deliverable) => (
                    <span
                      key={deliverable}
                      className={`rounded-[clamp(0.32rem,0.55vw,0.44rem)] border border-white/[0.04] px-[clamp(0.38rem,0.65vw,0.5rem)] py-[clamp(0.12rem,0.23vw,0.18rem)] text-[clamp(0.25rem,0.43vw,0.36rem)] font-bold ${accent.chip} ${accent.text}`}
                    >
                      {deliverable}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-[clamp(0.85rem,1.4vw,1.1rem)] border border-white/10 bg-[#0a140d]/95 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.28)] backdrop-blur">
        <div className="border-b border-white/[0.08] px-[clamp(0.75rem,1.3vw,1rem)] py-[clamp(0.65rem,1.1vw,0.85rem)]">
          <p className="font-mono text-[clamp(0.32rem,0.54vw,0.46rem)] font-black uppercase tracking-[0.1em] text-[#91ec65]">
            Funding Allocation
          </p>
        </div>

        <div className="grid gap-[clamp(0.8rem,1.4vw,1.1rem)] p-[clamp(0.7rem,1.2vw,0.95rem)] md:grid-cols-[minmax(9rem,0.72fr)_minmax(0,1.28fr)] md:items-center">
          <div className="flex justify-center">
            <div
              className="relative flex size-[clamp(8rem,14vw,10.5rem)] items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#8eea45 0deg 216deg, #3fa8ff 216deg 288deg, #f3aa2e 288deg 324deg, #9268ef 324deg 360deg)",
              }}
            >
              <div className="flex size-[72%] flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[#0a140d] text-center shadow-[inset_0_0_1.5rem_rgba(255,255,255,0.02)]">
                <p className="text-[clamp(0.78rem,1.3vw,1.08rem)] font-black text-white">
                  $10,000
                </p>

                <p className="mt-1 font-mono text-[clamp(0.26rem,0.44vw,0.37rem)] uppercase tracking-[0.07em] text-white/42">
                  Total Request
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[clamp(0.6rem,0.95vw,0.76rem)] border border-white/[0.08] bg-[#0d1810]">
            {fundingAllocation.map((item, index) => (
              <div
                key={item.label}
                className={[
                  "grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-[clamp(0.45rem,0.8vw,0.62rem)] px-[clamp(0.6rem,1vw,0.8rem)] py-[clamp(0.5rem,0.85vw,0.68rem)]",
                  index !== fundingAllocation.length - 1
                    ? "border-b border-white/[0.07]"
                    : "",
                ].join(" ")}
              >
                <span
                  className="size-[clamp(0.55rem,0.8vw,0.68rem)] rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <div className="min-w-0">
                  <p className="truncate text-[clamp(0.38rem,0.64vw,0.54rem)] font-extrabold text-white">
                    {item.label}
                  </p>

                  <p className="mt-0.5 truncate text-[clamp(0.25rem,0.43vw,0.36rem)] text-white/36">
                    {item.description}
                  </p>
                </div>

                <span className="font-mono text-[clamp(0.28rem,0.48vw,0.4rem)] font-bold text-white/60">
                  {item.percent}%
                </span>

                <span className="font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] font-black text-white">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}