"use client";

import {
  useCallback,
  useState,
} from "react";

import { PlayWarningModal } from "./PlayWarningModal";

const tutorialUrl =
  "https://youtu.be/i9tl4hjukVo?si=VhGO9fihftxXIDDO";

export function HeroButtons() {
  const [
    isPlayWarningOpen,
    setIsPlayWarningOpen,
  ] = useState(false);

  const closePlayWarning = useCallback(() => {
    setIsPlayWarningOpen(false);
  }, []);

  return (
    <>
      <div
        className="lt-animate-fade-up mt-5 flex flex-wrap gap-3"
        style={{
          animationDelay: "360ms",
        }}
      >
        <button
          type="button"
          onClick={() =>
            setIsPlayWarningOpen(true)
          }
          aria-haspopup="dialog"
          aria-expanded={isPlayWarningOpen}
          className="lt-button-primary min-h-11 px-[clamp(1.25rem,2.2vw,1.8rem)] text-[clamp(0.8rem,0.95vw,0.94rem)]"
        >
          Play Now
        </button>

        <a
          href={tutorialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lt-button-secondary min-h-11 px-[clamp(1.25rem,2.2vw,1.8rem)] text-[clamp(0.8rem,0.95vw,0.94rem)]"
        >
          Watch Tutorial
        </a>
      </div>

      <PlayWarningModal
        isOpen={isPlayWarningOpen}
        onClose={closePlayWarning}
      />
    </>
  );
}