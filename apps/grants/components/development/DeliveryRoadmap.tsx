import { TechnologyIcon } from "@/components/TechnologyIcon";
import { betaRoadmap } from "./development-data";
import {
  getProgressLabel,
  getRoadmapAccent,
  getStatusStyle,
} from "./development-utils";

function getMilestoneIcon(icon: "community" | "game" | "ecosystem") {
  if (icon === "game") return "mdi:gamepad-variant-outline";
  if (icon === "ecosystem") return "mdi:connection";
  return "mdi:account-group";
}

export function DeliveryRoadmap() {
  return (
    <section className="overflow-hidden rounded-[clamp(0.85rem,1.5vw,1.15rem)] border border-white/10 bg-[#f7f7f2] text-[#162017] shadow-[0_1.5rem_4rem_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#182219]/8 px-[clamp(0.75rem,1.4vw,1.05rem)] py-[clamp(0.7rem,1.2vw,0.95rem)]">
        <div>
          <p className="font-mono text-[clamp(0.32rem,0.54vw,0.46rem)] font-black uppercase tracking-[0.1em] text-[#5f8b4c]">
            Beta Delivery Roadmap
          </p>
          <h3 className="mt-1 text-[clamp(0.76rem,1.1vw,1rem)] font-extrabold">
            Product delivery across three milestones
          </h3>
        </div>

        <span className="rounded-full bg-[#e5f3db] px-3 py-1 text-[clamp(0.3rem,0.5vw,0.42rem)] font-black text-[#547b42]">
          8–12 Weeks
        </span>
      </div>

      <div className="relative p-[clamp(0.75rem,1.4vw,1.05rem)]">
        <div className="absolute bottom-[1.2rem] left-[clamp(1.7rem,2.8vw,2.2rem)] top-[1.2rem] w-px bg-[#cfd6c9]" />

        <div className="relative flex flex-col gap-[clamp(0.65rem,1.1vw,0.85rem)]">
          {betaRoadmap.map((milestone, index) => {
            const accent = getRoadmapAccent(milestone.accent);
            const status = getStatusStyle(milestone.status);

            return (
              <article
                key={milestone.id}
                className={`relative grid grid-cols-[auto_minmax(0,1fr)] gap-[clamp(0.6rem,1vw,0.8rem)] rounded-[clamp(0.7rem,1.15vw,0.9rem)] border bg-white p-[clamp(0.65rem,1.2vw,0.9rem)] shadow-[0_0.6rem_1.8rem_rgba(35,52,35,0.06)] ${accent.border}`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`flex size-[clamp(2rem,3.2vw,2.5rem)] items-center justify-center rounded-[clamp(0.55rem,0.9vw,0.7rem)] ${accent.soft}`}>
                    <TechnologyIcon
                      icon={getMilestoneIcon(milestone.icon)}
                      label={milestone.title}
                    />
                  </div>
                  <span className="mt-1 font-mono text-[clamp(0.28rem,0.48vw,0.4rem)] font-black text-[#7d8977]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-[clamp(0.72rem,1.05vw,0.92rem)] font-black text-[#1b261c]">
                        {milestone.title}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[clamp(0.28rem,0.48vw,0.4rem)] font-black ${status.badge}`}>
                          {status.label}
                        </span>
                        <span className="text-[clamp(0.3rem,0.5vw,0.42rem)] font-bold text-[#556254]">
                          {milestone.funding}
                        </span>
                        <span className="text-[clamp(0.3rem,0.5vw,0.42rem)] text-[#7b8679]">
                          {milestone.duration}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className={`text-[clamp(0.78rem,1.2vw,1rem)] font-black ${accent.text}`}>
                        {milestone.progress}%
                      </p>
                      <p className="mt-0.5 text-[clamp(0.26rem,0.45vw,0.38rem)] font-semibold text-[#6f786d]">
                        {getProgressLabel(milestone.progress)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-[clamp(0.28rem,0.46vw,0.36rem)] overflow-hidden rounded-full bg-[#dfe4db]">
                    <div
                      className={`h-full rounded-full ${accent.progress}`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {milestone.deliverables.map((deliverable) => (
                      <span
                        key={deliverable}
                        className={`rounded-full px-2.5 py-1 text-[clamp(0.28rem,0.48vw,0.4rem)] font-bold ${accent.chip} ${accent.text}`}
                      >
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
