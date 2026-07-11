"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type PlayWarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PlayWarningModal({
  isOpen,
  onClose,
}: PlayWarningModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#162218]/70 px-[clamp(1rem,4vw,2rem)] py-[clamp(1rem,3vw,2rem)] backdrop-blur-md"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="play-warning-title"
        className="relative max-h-[92vh] w-full max-w-[clamp(20rem,42vw,31rem)] overflow-y-auto rounded-[clamp(1rem,2.4vw,1.7rem)] border border-[#e4bd5c]/45 bg-[#fffaf0] p-[clamp(1rem,2.5vw,1.6rem)] text-center shadow-[0_2rem_7rem_rgba(22,34,24,0.42)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[clamp(0.7rem,1.5vw,1rem)] top-[clamp(0.7rem,1.5vw,1rem)] flex size-[clamp(2rem,3.5vw,2.5rem)] items-center justify-center rounded-full border border-[#866d40]/15 bg-white text-[clamp(1rem,1.6vw,1.3rem)] font-bold text-[#594a34] transition hover:border-[#c48a27]/35 hover:bg-[#fff5dc]"
          aria-label="Close warning"
        >
          ×
        </button>

        <div className="mx-auto flex size-[clamp(3.5rem,7vw,5rem)] items-center justify-center rounded-full border border-[#e4bd5c]/55 bg-[#fff0bd] shadow-[0_0.8rem_2.3rem_rgba(181,119,22,0.16)]">
          <span className="text-[clamp(1.5rem,3vw,2.2rem)]">⚠</span>
        </div>

        <p className="mx-auto mt-[clamp(0.7rem,1.5vw,1rem)] inline-flex w-fit rounded-full border border-[#e5bd58]/35 bg-[#fff2c9] px-[clamp(0.65rem,1.2vw,0.9rem)] py-[clamp(0.25rem,0.5vw,0.38rem)] text-[clamp(0.52rem,0.72vw,0.66rem)] font-extrabold uppercase tracking-[0.1em] text-[#9a6914]">
          Alpha Development Notice
        </p>

        <h2
          id="play-warning-title"
          className="mt-[clamp(0.7rem,1.5vw,1rem)] text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#172016]"
        >
          Lifetopia World is under
          <span className="block text-[#b77917]">active development.</span>
        </h2>

        <p className="mt-[clamp(0.65rem,1.3vw,0.9rem)] text-[clamp(0.72rem,1vw,0.9rem)] font-medium leading-[1.7] text-[#6b5b45]">
          The current Alpha build is publicly playable, but several systems are
          still being rebuilt and improved.
        </p>

        <div className="mt-[clamp(0.8rem,1.7vw,1.2rem)] rounded-[clamp(0.7rem,1.4vw,1rem)] border border-[#e4bd5c]/35 bg-[#fff5d9] p-[clamp(0.75rem,1.5vw,1rem)] text-left">
          <p className="text-[clamp(0.68rem,0.95vw,0.84rem)] font-extrabold text-[#8c6019]">
            Before continuing
          </p>

          <ul className="mt-[clamp(0.35rem,0.8vw,0.6rem)] space-y-[clamp(0.25rem,0.55vw,0.4rem)] text-[clamp(0.64rem,0.9vw,0.8rem)] font-medium leading-[1.55] text-[#7a6340]">
            <li className="flex gap-2">
              <span className="text-[#b77917]">•</span>
              Some gameplay systems may be limited or unavailable.
            </li>
            <li className="flex gap-2">
              <span className="text-[#b77917]">•</span>
              Bugs and visual issues may appear during development.
            </li>
            <li className="flex gap-2">
              <span className="text-[#b77917]">•</span>
              This build does not represent the final product quality.
            </li>
          </ul>
        </div>

        <div className="mt-[clamp(0.9rem,1.8vw,1.3rem)] flex flex-col justify-center gap-[clamp(0.45rem,0.9vw,0.7rem)] sm:flex-row">
          <Link
            href="https://play.lifetopiaworld.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[clamp(2.7rem,4vw,3.2rem)] flex-1 items-center justify-center gap-2 rounded-[clamp(0.6rem,1vw,0.8rem)] bg-[#1f6a39] px-[clamp(0.8rem,1.5vw,1.1rem)] text-[clamp(0.68rem,0.95vw,0.84rem)] font-extrabold text-white shadow-[0_0.8rem_2rem_rgba(31,106,57,0.2)] transition hover:-translate-y-0.5 hover:bg-[#2a7b44]"
          >
            Continue to Alpha
            <span aria-hidden="true">↗</span>
          </Link>

          <Link
            href="https://community.lifetopiaworld.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[clamp(2.7rem,4vw,3.2rem)] flex-1 items-center justify-center rounded-[clamp(0.6rem,1vw,0.8rem)] border border-[#66583f]/14 bg-white px-[clamp(0.8rem,1.5vw,1.1rem)] text-[clamp(0.68rem,0.95vw,0.84rem)] font-extrabold text-[#4c4234] transition hover:-translate-y-0.5 hover:border-[#4f873d]/25 hover:bg-[#f6faef]"
          >
            Visit Community
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}