"use client";

import { useEffect, useMemo, useState } from "react";
import { journeyMilestones } from "@repo/data/journey";
import { JourneyContent } from "@/components/home/development-journey/JourneyContent";
import { JourneyHeader } from "@/components/home/development-journey/JourneyHeader";
import { JourneyNavigation } from "@/components/home/development-journey/JourneyNavigation";
import { JourneyTimeline } from "@/components/home/development-journey/JourneyTimeline";

const SLIDE_DURATION = 3000;

export function DevelopmentJourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeMilestone = useMemo(
    () => journeyMilestones[activeIndex] ?? journeyMilestones[0],
    [activeIndex],
  );

  useEffect(() => {
    if (isPaused || journeyMilestones.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % journeyMilestones.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  if (!activeMilestone) return null;

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#fff8e8] px-[clamp(12px,5vw,80px)] pb-[clamp(34px,6vw,88px)] pt-[clamp(18px,3vw,44px)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <JourneyHeader />

        <JourneyTimeline
          milestones={journeyMilestones}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <JourneyContent milestone={activeMilestone} />

        <JourneyNavigation
          total={journeyMilestones.length}
          activeIndex={activeIndex}
          onPrevious={() =>
            setActiveIndex(
              (current) =>
                (current - 1 + journeyMilestones.length) %
                journeyMilestones.length,
            )
          }
          onNext={() =>
            setActiveIndex((current) => (current + 1) % journeyMilestones.length)
          }
          onSelect={setActiveIndex}
        />

        <p className="mx-auto mt-[clamp(12px,1.6vw,24px)] max-w-5xl rounded-[clamp(12px,1.3vw,20px)] border border-[#f0d797] bg-[#fffdf2] px-[clamp(12px,2vw,28px)] py-[clamp(8px,1vw,16px)] text-center text-[clamp(0.48rem,0.95vw,1rem)] font-semibold leading-[1.5] text-[#7a5635]">
          ✨ The GIFs and screenshots represent earlier development milestones.
          The upcoming Beta will feature improved visuals, refined gameplay,
          stronger platform integration, and a more polished player experience.
        </p>
      </div>
    </section>
  );
}
