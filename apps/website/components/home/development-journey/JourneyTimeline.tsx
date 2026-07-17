import type {
  JourneyMilestone,
} from "@repo/data/journey";

type JourneyTimelineProps = {
  milestones: JourneyMilestone[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function JourneyTimeline({
  milestones,
  activeIndex,
  onSelect,
}: JourneyTimelineProps) {
  return (
    <div className="relative mt-[clamp(1.25rem,2vw,1.8rem)]">
      <div
        aria-hidden="true"
        className="absolute left-[8%] right-[8%] top-[clamp(1.15rem,2.2vw,1.7rem)] border-t-2 border-dashed border-[#d6c6a5]"
      />

      <div className="relative grid grid-cols-5 gap-1 sm:gap-2">
        {milestones.map(
          (milestone, index) => {
            const isActive =
              index === activeIndex;

            const isCompleted =
              milestone.state === "completed";

            return (
              <button
                key={milestone.id}
                type="button"
                onClick={() =>
                  onSelect(index)
                }
                aria-current={
                  isActive
                    ? "step"
                    : undefined
                }
                aria-label={`Show ${milestone.label} milestone: ${milestone.status}`}
                className="group relative z-10 min-w-0 text-center"
              >
                <span
                  className={[
                    "mx-auto flex size-[clamp(2.3rem,4.4vw,3.6rem)] items-center justify-center rounded-full border-[clamp(2px,0.25vw,3px)] text-[clamp(1rem,2vw,1.6rem)] transition duration-300",
                    isActive
                      ? "scale-110 border-[#6fa83a] bg-white shadow-[0_0.7rem_1.8rem_rgba(79,129,36,0.22)]"
                      : isCompleted
                        ? "border-[#9fc286] bg-[#f0f8e9] group-hover:scale-105 group-hover:border-[#6fa83a]"
                        : "border-[#e1b95a] bg-[#fff5d9] group-hover:scale-105",
                  ].join(" ")}
                >
                  {milestone.icon}
                </span>

                <span className="mt-2 block truncate text-[clamp(0.7rem,0.88vw,0.9rem)] font-black text-[#33251b]">
                  {milestone.label}
                </span>

                <span
                  className={[
                    "mt-0.5 block truncate text-[clamp(0.66rem,0.74vw,0.78rem)] font-bold",
                    milestone.state ===
                    "current"
                      ? "text-[#a16f13]"
                      : "text-[#5d8248]",
                  ].join(" ")}
                >
                  {milestone.status}
                </span>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}