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

        <a
        href="https://youtu.be/i9tl4hjukVo?si=VhGO9fihftxXIDDO"
        target="_blank"
        rel="noopener noreferrer"
        className="lt-button-secondary px-[2vw] py-[0.9vw] text-[clamp(0.36rem,1.15vw,1.15rem)]"
        >
        Watch Tutorial 📖
        </a>
      </div>

      <PlayWarningModal
        isOpen={isPlayWarningOpen}
        onClose={() => setIsPlayWarningOpen(false)}
      />
    </>
  );
}