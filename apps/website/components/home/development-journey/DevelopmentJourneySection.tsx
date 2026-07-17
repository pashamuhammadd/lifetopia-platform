"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { journeyMilestones } from "@repo/data/journey";

import { JourneyContent } from "@/components/home/development-journey/JourneyContent";
import { JourneyHeader } from "@/components/home/development-journey/JourneyHeader";
import { JourneyNavigation } from "@/components/home/development-journey/JourneyNavigation";
import { JourneyTimeline } from "@/components/home/development-journey/JourneyTimeline";

const SLIDE_DURATION = 7000;

export function DevelopmentJourneySection() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isUserPaused, setIsUserPaused] =
    useState(false);

  const [
    isInteractionPaused,
    setIsInteractionPaused,
  ] = useState(false);

  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] = useState(false);

  const [
    isDocumentVisible,
    setIsDocumentVisible,
  ] = useState(true);

  const activeMilestone = useMemo(
    () =>
      journeyMilestones[activeIndex] ??
      journeyMilestones[0],
    [activeIndex],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function updateMotionPreference() {
      setPrefersReducedMotion(
        mediaQuery.matches,
      );
    }

    updateMotionPreference();

    mediaQuery.addEventListener(
      "change",
      updateMotionPreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference,
      );
    };
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsDocumentVisible(
        document.visibilityState === "visible",
      );
    }

    handleVisibilityChange();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  const isAutoPlayPaused =
    isUserPaused ||
    isInteractionPaused ||
    prefersReducedMotion ||
    !isDocumentVisible;

  useEffect(() => {
    if (
      isAutoPlayPaused ||
      journeyMilestones.length <= 1
    ) {
      return;
    }

    const interval = window.setInterval(
      () => {
        setActiveIndex(
          (current) =>
            (current + 1) %
            journeyMilestones.length,
        );
      },
      SLIDE_DURATION,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [isAutoPlayPaused]);

  if (!activeMilestone) {
    return null;
  }

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-[#fff8e8] py-[clamp(2.25rem,3vw,3rem)]"
      onMouseEnter={() =>
        setIsInteractionPaused(true)
      }
      onMouseLeave={() =>
        setIsInteractionPaused(false)
      }
      onFocusCapture={() =>
        setIsInteractionPaused(true)
      }
      onBlurCapture={(event) => {
        const nextFocusedElement =
          event.relatedTarget;

        if (
          nextFocusedElement instanceof Node &&
          event.currentTarget.contains(
            nextFocusedElement,
          )
        ) {
          return;
        }

        setIsInteractionPaused(false);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 size-[21rem] rounded-full bg-[#dcefc9]/45 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-[-7rem] size-[22rem] rounded-full bg-[#f4dfaa]/40 blur-[7rem]"
      />

      <div className="lt-container relative">
        <JourneyHeader />

        <JourneyTimeline
          milestones={journeyMilestones}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <JourneyContent
          milestone={activeMilestone}
        />

        <JourneyNavigation
          total={journeyMilestones.length}
          activeIndex={activeIndex}
          isPaused={isUserPaused}
          isAutoPlayDisabled={
            prefersReducedMotion
          }
          onPrevious={() =>
            setActiveIndex(
              (current) =>
                (current -
                  1 +
                  journeyMilestones.length) %
                journeyMilestones.length,
            )
          }
          onNext={() =>
            setActiveIndex(
              (current) =>
                (current + 1) %
                journeyMilestones.length,
            )
          }
          onSelect={setActiveIndex}
          onTogglePause={() =>
            setIsUserPaused(
              (current) => !current,
            )
          }
        />

        <p className="mx-auto mt-3 max-w-[48rem] text-center text-[clamp(0.72rem,0.8vw,0.84rem)] font-semibold leading-[1.5] text-[#806f59]">
          Historical images and GIFs reflect
          the visual quality of each development
          milestone at the time it was delivered.
        </p>
      </div>
    </section>
  );
}