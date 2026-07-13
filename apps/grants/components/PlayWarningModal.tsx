"use client";

import Link from "next/link";
import {
  type MouseEvent,
  useEffect,
  useRef,
} from "react";

type PlayWarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const playableGameUrl =
  "https://play.lifetopiaworld.io";

const focusableElementSelector = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function PlayWarningModal({
  isOpen,
  onClose,
}: PlayWarningModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef =
    useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousBodyOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      titleRef.current?.focus();
    }, 0);

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          focusableElementSelector,
        ),
      );

      if (!focusableElements.length) {
        event.preventDefault();
        titleRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          document.activeElement === titleRef.current)
      ) {
        event.preventDefault();
        lastElement?.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );

      document.body.style.overflow =
        previousBodyOverflow;

      previousFocusRef.current?.focus({
        preventScroll: true,
      });
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleBackdropClick(
    event: MouseEvent<HTMLDivElement>,
  ) {
    if (event.target === event.currentTarget) {
      onCloseRef.current();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07150d]/76 p-2 backdrop-blur-sm sm:p-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="play-warning-title"
        aria-describedby="play-warning-description"
        className="w-full max-w-[34rem] overflow-hidden rounded-[1.15rem] border border-white/15 bg-[#fffaf0] shadow-[0_2rem_6rem_rgba(0,0,0,0.38)]"
      >
        <div className="relative overflow-hidden bg-[#173b21] px-[clamp(1rem,2vw,1.4rem)] py-[clamp(0.9rem,1.6vw,1.2rem)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-[#8ee46a]/15 blur-3xl"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black uppercase tracking-[0.09em] text-[#afe994]">
                <span className="size-2 rounded-full bg-[#8ee46a]" />
                Public Alpha Notice
              </span>

              <h2
                ref={titleRef}
                id="play-warning-title"
                tabIndex={-1}
                className="mt-3 max-w-[26rem] text-[clamp(1.25rem,2.3vw,1.8rem)] font-black leading-[1.1] tracking-[-0.03em] text-white outline-none"
              >
                This is the previous playable Alpha
                build.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                onCloseRef.current();
              }}
              aria-label="Close playable Alpha notice"
              className="flex size-[2.45rem] shrink-0 items-center justify-center rounded-[0.68rem] border border-white/12 bg-white/[0.07] text-[1.15rem] text-white/70 transition hover:bg-white/[0.12] hover:text-white"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <p
            id="play-warning-description"
            className="relative mt-3 max-w-[29rem] text-[clamp(0.78rem,0.88vw,0.94rem)] leading-[1.55] text-white/66"
          >
            Lifetopia World is now in Beta development.
            This public build demonstrates the earlier
            gameplay foundation and does not represent
            the final connected Beta experience.
          </p>
        </div>

        <div className="p-[clamp(0.9rem,1.8vw,1.3rem)]">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Some systems may be incomplete or temporarily unavailable.",
              "The build is provided as execution evidence for reviewers.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-[0.72rem] border border-[#e3d7c0] bg-[#f8f1e4] px-3 py-2.5"
              >
                <span className="mt-[0.38rem] size-2 shrink-0 rounded-full bg-[#68ad4a]" />

                <p className="text-[clamp(0.74rem,0.84vw,0.9rem)] font-semibold leading-[1.5] text-[#665b4b]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href={playableGameUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onCloseRef.current();
              }}
              className="inline-flex min-h-[2.8rem] flex-1 items-center justify-center gap-2 rounded-[0.72rem] bg-[#173b21] px-4 text-[clamp(0.76rem,0.86vw,0.92rem)] font-black text-white transition hover:-translate-y-0.5 hover:bg-[#24532e]"
            >
              Open Playable Alpha
              <span aria-hidden="true">↗</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                onCloseRef.current();
              }}
              className="inline-flex min-h-[2.8rem] flex-1 items-center justify-center rounded-[0.72rem] border border-[#d7c9ae] bg-white px-4 text-[clamp(0.76rem,0.86vw,0.92rem)] font-black text-[#4f4436] transition hover:-translate-y-0.5 hover:bg-[#fffdf8]"
            >
              Return to Portal
            </button>
          </div>

          <p className="mt-3 text-center text-[clamp(0.66rem,0.74vw,0.8rem)] text-[#8a7c66]">
            Opens in a new tab. Press Escape to close.
          </p>
        </div>
      </div>
    </div>
  );
}