import type { JourneyMilestone } from "@/data/journey";
import { JourneyGrant } from "@/components/home/development-journey/JourneyGrant";
import { JourneyMedia } from "@/components/home/development-journey/JourneyMedia";
import { JourneyProgress } from "@/components/home/development-journey/JourneyProgress";
import { JourneyVision } from "@/components/home/development-journey/JourneyVision";

type JourneyContentProps = {
  milestone: JourneyMilestone;
};

export function JourneyContent({ milestone }: JourneyContentProps) {
  const shouldShowMedia = milestone.media && milestone.media.length > 0;

  return (
    <div
      key={milestone.id}
      className="mt-[clamp(16px,2vw,32px)] overflow-hidden rounded-[clamp(16px,2.2vw,34px)] border border-[#d9c99f] bg-white/70 shadow-[0_22px_70px_rgba(88,60,28,0.14)] backdrop-blur-xl animate-[lifetopiaSlideIn_450ms_ease_both]"
    >
      <div className="grid grid-cols-[0.85fr_1.35fr]">
        <div className="relative border-r border-[#d9c99f] bg-gradient-to-br from-[#fffdf2] to-[#eff8df] p-[clamp(8px,2vw,32px)]">
          <div className="inline-flex rounded-full border border-[#b8dd87] bg-[#eff8df] px-[clamp(8px,1vw,16px)] py-[clamp(4px,0.55vw,8px)] text-[clamp(0.42rem,0.78vw,0.875rem)] font-black text-[#4f8124]">
            {milestone.date}
          </div>

          <h3 className="mt-[clamp(10px,1.7vw,28px)] text-[clamp(1rem,3vw,3rem)] font-black leading-tight text-[#3a1f12]">
            {milestone.title}
          </h3>

          <p className="mt-[clamp(8px,1.2vw,20px)] text-[clamp(0.48rem,1vw,1.125rem)] font-semibold leading-[1.55] text-[#6b3c24]">
            {milestone.description}
          </p>

          <div className="mt-[clamp(10px,1.8vw,28px)] grid grid-cols-3 gap-[clamp(4px,0.8vw,12px)]">
            {milestone.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[clamp(10px,1.2vw,18px)] border border-[#d9c99f] bg-white/70 p-[clamp(5px,1vw,16px)] text-center shadow-sm"
              >
                <div className="text-[clamp(0.34rem,0.65vw,0.75rem)] font-black text-[#7a5635]">
                  {stat.label}
                </div>
                <div className="mt-[clamp(2px,0.45vw,8px)] text-[clamp(0.5rem,1.25vw,1.25rem)] font-black text-[#4f8124]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {milestone.cta && (
            <a
              href={milestone.cta.href}
              target="_blank"
              rel="noreferrer"
              className="lt-button-primary mt-[clamp(10px,1.8vw,28px)] w-full px-[clamp(10px,1.7vw,28px)] py-[clamp(7px,1vw,16px)] text-[clamp(0.5rem,1vw,1.125rem)]"
            >
              ↗ {milestone.cta.label}
            </a>
          )}
        </div>

        <div className="p-[clamp(8px,2vw,32px)]">
          {shouldShowMedia ? (
            <JourneyMedia milestone={milestone} />
          ) : milestone.id === "grant" ? (
            <JourneyGrant />
          ) : milestone.id === "idea" ? (
            <JourneyVision />
          ) : (
            <JourneyProgress milestone={milestone} />
          )}
        </div>
      </div>
    </div>
  );
}