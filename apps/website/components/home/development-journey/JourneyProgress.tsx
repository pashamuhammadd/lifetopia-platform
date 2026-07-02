import type { JourneyMilestone } from "@/data/journey";

type JourneyProgressProps = {
  milestone: JourneyMilestone;
};

export function JourneyProgress({ milestone }: JourneyProgressProps) {
  const checklist = milestone.checklist ?? [];

  return (
    <div>
      <h4 className="text-[clamp(0.7rem,1.8vw,1.5rem)] font-black text-[#244b14]">
        🚧 Current Progress
      </h4>

      <div className="mt-[clamp(8px,1.6vw,24px)] rounded-[clamp(14px,1.8vw,26px)] border border-[#d9c99f] bg-[#fffdf2] p-[clamp(10px,1.8vw,24px)]">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[clamp(0.4rem,0.8vw,0.875rem)] font-black text-[#7a5635]">
              {milestone.label}
            </div>
            <div className="mt-[clamp(2px,0.4vw,4px)] text-[clamp(1rem,3vw,2.25rem)] font-black text-[#4f8124]">
              In Progress
            </div>
          </div>

          <div className="text-[clamp(1.5rem,3.5vw,3rem)]">
            {milestone.icon}
          </div>
        </div>

        <div className="mt-[clamp(10px,1.5vw,24px)] h-[clamp(7px,1vw,16px)] overflow-hidden rounded-full bg-[#eadfbd]">
          <div className="h-full w-[72%] rounded-full bg-[#6fa83a]" />
        </div>

        <div className="mt-[clamp(10px,1.5vw,24px)] grid gap-[clamp(5px,0.8vw,12px)]">
          {checklist.map((item, index) => (
            <div
              key={item}
              className="rounded-[clamp(10px,1.2vw,18px)] border border-[#d9c99f] bg-white/70 px-[clamp(8px,1.3vw,20px)] py-[clamp(6px,1vw,16px)] text-[clamp(0.42rem,0.95vw,1rem)] font-black text-[#4f8124]"
            >
              {index < 3 ? "✓" : "🚧"} {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}