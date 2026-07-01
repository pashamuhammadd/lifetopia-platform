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
      className="mt-6 overflow-hidden rounded-[34px] border border-[#d9c99f] bg-white/70 shadow-[0_22px_70px_rgba(88,60,28,0.14)] backdrop-blur-xl animate-[lifetopiaSlideIn_450ms_ease_both]"
    >
      <div className="grid lg:grid-cols-[0.85fr_1.35fr]">
        <div className="relative border-b border-[#d9c99f] bg-gradient-to-br from-[#fffdf2] to-[#eff8df] p-8 lg:border-b-0 lg:border-r">
          <div className="inline-flex rounded-full border border-[#b8dd87] bg-[#eff8df] px-4 py-2 text-sm font-black text-[#4f8124]">
            {milestone.date}
          </div>

          <h3 className="mt-7 text-4xl font-black leading-tight text-[#3a1f12] md:text-5xl">
            {milestone.title}
          </h3>

          <p className="mt-5 text-lg font-semibold leading-8 text-[#6b3c24]">
            {milestone.description}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {milestone.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[18px] border border-[#d9c99f] bg-white/70 p-4 text-center shadow-sm"
              >
                <div className="text-xs font-black text-[#7a5635]">
                  {stat.label}
                </div>
                <div className="mt-2 text-xl font-black text-[#4f8124]">
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
              className="lt-button-primary mt-8 w-full px-7 py-4 text-lg"
            >
              ↗ {milestone.cta.label}
            </a>
          )}
        </div>

        <div className="p-8">
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