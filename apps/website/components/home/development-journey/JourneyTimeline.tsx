import type { JourneyMilestone } from "@/data/journey";

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
    <div className="relative mt-8">
      <div className="absolute left-10 right-10 top-8 hidden border-t-4 border-dashed border-[#d6c6a5] md:block" />

      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
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
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 text-3xl transition-all duration-300 ${
                  isActive
                    ? "scale-110 border-[#6fa83a] bg-white shadow-lg"
                    : "border-[#d6c6a5] bg-[#fff8e8] hover:scale-105"
                }`}
              >
                {item.icon}
              </div>

              <div className="mt-3 text-lg font-black text-[#2f1b12]">
                {item.label}
              </div>

              <div
                className={`text-sm font-bold ${
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