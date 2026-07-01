import type { JourneyMilestone } from "@/data/journey";

type JourneyProgressProps = {
  milestone: JourneyMilestone;
};

export function JourneyProgress({ milestone }: JourneyProgressProps) {
  const checklist = milestone.checklist ?? [];

  return (
    <div>
      <h4 className="text-2xl font-black text-[#244b14]">
        🚧 Current Progress
      </h4>

      <div className="mt-6 rounded-[26px] border border-[#d9c99f] bg-[#fffdf2] p-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-black text-[#7a5635]">
              {milestone.label}
            </div>
            <div className="mt-1 text-4xl font-black text-[#4f8124]">
              In Progress
            </div>
          </div>

          <div className="text-5xl">{milestone.icon}</div>
        </div>

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#eadfbd]">
          <div className="h-full w-[72%] rounded-full bg-[#6fa83a]" />
        </div>

        <div className="mt-6 grid gap-3">
          {checklist.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-[#d9c99f] bg-white/70 px-5 py-4 text-base font-black text-[#4f8124]"
            >
              {index < 3 ? "✓" : "🚧"} {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}