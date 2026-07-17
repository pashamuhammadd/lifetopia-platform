import type {
  JourneyMilestone,
} from "@repo/data/journey";

import { JourneyMedia } from "@/components/home/development-journey/JourneyMedia";
import { JourneyProgress } from "@/components/home/development-journey/JourneyProgress";
import { JourneyVision } from "@/components/home/development-journey/JourneyVision";

type JourneyContentProps = {
  milestone: JourneyMilestone;
};

export function JourneyContent({
  milestone,
}: JourneyContentProps) {
  const shouldShowMedia =
    Boolean(milestone.media?.length);

  return (
    <article
      key={milestone.id}
      aria-label={`${milestone.label} development milestone`}
      className="mt-[clamp(1rem,1.8vw,1.45rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.4rem)] border border-[#d9c99f] bg-white/72 shadow-[0_1.2rem_3.5rem_rgba(88,60,28,0.12)] backdrop-blur-xl animate-[lifetopiaSlideIn_450ms_ease_both]"
    >
      <div className="grid md:grid-cols-[minmax(15rem,0.78fr)_minmax(0,1.22fr)]">
        <div className="relative border-b border-[#d9c99f] bg-gradient-to-br from-[#fffdf2] to-[#eff8df] p-[clamp(1rem,2vw,1.5rem)] md:border-b-0 md:border-r">
          <span className="inline-flex rounded-full border border-[#b8dd87] bg-[#eff8df] px-3 py-1.5 text-[clamp(0.68rem,0.76vw,0.8rem)] font-black text-[#4f8124]">
            {milestone.date}
          </span>

          <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,2.25rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#3a1f12]">
            {milestone.title}
          </h3>

          <p className="mt-3 text-[clamp(0.82rem,0.94vw,0.98rem)] font-semibold leading-[1.62] text-[#6b4c37]">
            {milestone.description}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {milestone.stats.map(
              (stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-xl border border-[#d9c99f] bg-white/72 px-2 py-2.5 text-center shadow-sm"
                >
                  <p className="truncate text-[clamp(0.62rem,0.7vw,0.74rem)] font-black text-[#806c55]">
                    {stat.label}
                  </p>

                  <p className="mt-1 truncate text-[clamp(0.74rem,0.9vw,0.92rem)] font-black text-[#4f8124]">
                    {stat.value}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="min-w-0 p-[clamp(1rem,2vw,1.5rem)]">
          {shouldShowMedia ? (
            <JourneyMedia
              milestone={milestone}
            />
          ) : milestone.id === "concept" ? (
            <JourneyVision />
          ) : (
            <JourneyProgress
              milestone={milestone}
            />
          )}
        </div>
      </div>
    </article>
  );
}