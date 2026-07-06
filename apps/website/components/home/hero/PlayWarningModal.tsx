"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type PlayWarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PlayWarningModal({ isOpen, onClose }: PlayWarningModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#2f1b12]/60 px-[clamp(1rem,4vw,2rem)] backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-[500px] overflow-y-auto rounded-[clamp(1.25rem,3vw,2rem)] border border-amber-300 bg-[#fff7e8]/95 p-[clamp(1rem,3vw,1.5rem)] text-center shadow-[0_24px_90px_rgba(120,53,15,0.35)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-amber-300 bg-white/80 text-amber-800 transition hover:bg-amber-50"
          aria-label="Close warning"
        >
          ×
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-amber-300 bg-amber-100 shadow-[0_12px_32px_rgba(180,83,9,0.18)]">
          <span className="text-[2rem]">⚠️</span>
        </div>

        <p className="mx-auto mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-amber-800">
          Major Development Notice
        </p>

        <h2 className="lt-title text-[clamp(1.35rem,3vw,2rem)] leading-tight">
          Lifetopia World Is Under
          <span className="block text-amber-600">Major Development</span>
        </h2>

        <p className="mt-3 text-[0.92rem] leading-6 text-[#7a5635]">
          Lifetopia World is currently undergoing a major rebuild to improve
          performance, stability, gameplay systems, and the overall player
          experience.
        </p>

        <p className="mt-2 text-[0.92rem] leading-6 text-[#7a5635]">
          During this phase, several features may be temporarily unavailable,
          limited, or under active development. You can still continue to the
          game, but the current experience may not represent the final quality
          of Lifetopia World.
        </p>

        <div className="mt-5 rounded-[clamp(0.9rem,2.5vw,1.25rem)] border border-amber-300 bg-amber-50/90 p-4 text-left shadow-[0_12px_32px_rgba(180,83,9,0.08)]">
          <p className="text-[0.9rem] font-bold text-amber-800">
            ⚠ Please Note
          </p>

          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.85rem] leading-6 text-amber-700">
            <li>Some gameplay systems are temporarily disabled.</li>
            <li>Several features may still be limited or unstable.</li>
            <li>Bugs and visual issues may appear during development.</li>
            <li>This version does not represent the final game quality.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="https://play.lifetopiaworld.io"
            className="lt-button-primary px-5 py-3 text-[0.9rem]"
          >
            Continue Anyway
          </Link>

          <Link
            href="https://community.lifetopiaworld.io"
            className="lt-button-secondary px-5 py-3 text-[0.9rem]"
          >
            Visit Community
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}