"use client";

import { useState } from "react";
import { PlayWarningModal } from "./PlayWarningModal";

export function HeroButtons() {
  const [isPlayWarningOpen, setIsPlayWarningOpen] = useState(false);

  return (
    <>
      <div className="mt-[1.7vw] flex flex-wrap gap-[1vw]">
        <button
          type="button"
          onClick={() => setIsPlayWarningOpen(true)}
          className="lt-button-primary px-[2vw] py-[0.9vw] text-[clamp(0.36rem,1.15vw,1.15rem)]"
        >
          Play Game 🍃
        </button>

        <button
          type="button"
          className="lt-button-secondary px-[2vw] py-[0.9vw] text-[clamp(0.36rem,1.15vw,1.15rem)]"
        >
          Watch Trailer ▶
        </button>
      </div>

      <PlayWarningModal
        isOpen={isPlayWarningOpen}
        onClose={() => setIsPlayWarningOpen(false)}
      />
    </>
  );
}