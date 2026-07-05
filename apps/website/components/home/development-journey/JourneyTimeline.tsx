import type { JourneyMilestone } from "@repo/data/journey";

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
    <div className="relative mt-[clamp(14px,2vw,32px)]">
      <div className="absolute left-[clamp(20px,4vw,56px)] right-[clamp(20px,4vw,56px)] top-[clamp(16px,2.5vw,32px)] border-t-[clamp(2px,0.3vw,4px)] border-dashed border-[#d6c6a5]" />

      <div className="grid grid-cols-6 gap-[clamp(2px,1vw,16px)]">
        {milestones.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              className="relative z-10 text-center"
            >
              <div
                className={`mx-auto flex h-[clamp(30px,5vw,64px)] w-[clamp(30px,5vw,64px)] items-center justify-center rounded-full border-[clamp(2px,0.35vw,4px)] text-[clamp(1rem,2.4vw,1.9rem)] transition-all duration-300 ${
                  isActive
                    ? "scale-110 border-[#6fa83a] bg-white shadow-lg"
                    : "border-[#d6c6a5] bg-[#fff8e8] hover:scale-105"
                }`}
              >
                {item.icon}
              </div>

              <div className="mt-[clamp(4px,0.8vw,12px)] text-[clamp(0.42rem,1.25vw,1.125rem)] font-black text-[#2f1b12]">
                {item.label}
              </div>

              <div
                className={`text-[clamp(0.32rem,0.9vw,0.875rem)] font-bold ${
                  isActive ? "text-[#4f8124]" : "text-[#7a5635]"
                }`}
              >
                {item.status}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
