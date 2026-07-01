"use client";

import { useEffect, useMemo, useState } from "react";
import { journeyMilestones } from "@/data/journey";
import { JourneyContent } from "@/components/home/development-journey/JourneyContent";
import { JourneyHeader } from "@/components/home/development-journey/JourneyHeader";
import { JourneyNavigation } from "@/components/home/development-journey/JourneyNavigation";
import { JourneyTimeline } from "@/components/home/development-journey/JourneyTimeline";

const SLIDE_DURATION = 3000;

export function DevelopmentJourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeMilestone = useMemo(() => {
    return journeyMilestones[activeIndex] ?? journeyMilestones[0];
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused || journeyMilestones.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % journeyMilestones.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  if (!activeMilestone) return null;

  const goToPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + journeyMilestones.length) % journeyMilestones.length,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % journeyMilestones.length);
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen scroll-mt-28 overflow-hidden bg-[#fff8e8] pb-16 pt-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-0 top-0 h-44 w-44 rounded-br-full bg-[#8cc84b]/20 blur-2xl" />
      <div className="absolute right-0 top-0 h-44 w-44 rounded-bl-full bg-[#8cc84b]/20 blur-2xl" />

      <div className="mx-auto max-w-7xl px-5">
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
          onPrevious={goToPrevious}
          onNext={goToNext}
          onSelect={setActiveIndex}
        />

        <p className="mx-auto mt-6 max-w-5xl rounded-2xl border border-[#f0d797] bg-[#fffdf2] px-6 py-4 text-center text-base font-semibold leading-7 text-[#7a5635]">
          ✨ The GIFs and screenshots represent earlier development milestones.
          The upcoming Beta will feature improved visuals, refined gameplay,
          stronger platform integration, and a more polished player experience.
        </p>
      </div>
    </section>
  );
}