"use client";

import Link from "next/link";
import {
  type KeyboardEvent as ReactKeyboardEvent,
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
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
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

    function handleKeyboardNavigation(
      event: KeyboardEvent,
    ) {
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
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !==
            "true",
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        titleRef.current?.focus();
        return;
      }

      const firstFocusableElement =
        focusableElements[0];

      const lastFocusableElement =
        focusableElements[
          focusableElements.length - 1
        ];

      const activeElement =
        document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstFocusableElement ||
          activeElement === titleRef.current)
      ) {
        event.preventDefault();
        lastFocusableElement?.focus();
        return;
      }

      if (
        !event.shiftKey &&
        activeElement === lastFocusableElement
      ) {
        event.preventDefault();
        firstFocusableElement?.focus();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboardNavigation,
    );

    return () => {
      window.clearTimeout(focusTimer);

      window.removeEventListener(
        "keydown",
        handleKeyboardNavigation,
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

  function handleDialogKeyDown(
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    event.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#07150d]/75 p-[clamp(0.8rem,3vw,1.5rem)] backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="play-warning-title"
        aria-describedby="play-warning-description"
        onKeyDown={handleDialogKeyDown}
        className="relative my-auto w-full max-w-[38rem] overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] border border-white/15 bg-[#fffaf0] shadow-[0_2rem_6rem_rgba(0,0,0,0.38)]"
      >
        <div className="relative overflow-hidden bg-[#173b21] px-[clamp(1rem,2.5vw,1.7rem)] pb-[clamp(1.2rem,2.5vw,1.8rem)] pt-[clamp(1rem,2.5vw,1.5rem)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#8ee46a]/15 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 size-64 rounded-full bg-[#63bde9]/12 blur-3xl"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.1em] text-[#afe994]">
                <span className="size-2 rounded-full bg-[#8ee46a]" />
                Public Alpha Notice
              </span>

              <h2
                ref={titleRef}
                id="play-warning-title"
                tabIndex={-1}
                className="mt-4 max-w-[28rem] text-[clamp(1.5rem,3vw,2.25rem)] font-black leading-[1.1] tracking-[-0.035em] text-white outline-none"
              >
                You are about to open the previous
                playable Alpha build.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                onCloseRef.current();
              }}
              aria-label="Close playable Alpha notice"
              className="flex size-[clamp(2.5rem,4vw,2.9rem)] shrink-0 items-center justify-center rounded-[0.75rem] border border-white/12 bg-white/[0.07] text-[1.25rem] font-medium text-white/70 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#afe994]"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <p
            id="play-warning-description"
            className="relative mt-4 max-w-[31rem] text-[clamp(0.88rem,1vw,1.04rem)] leading-[1.7] text-white/67"
          >
            Lifetopia World is currently undergoing
            active Beta development. The publicly
            accessible game remains an earlier Alpha
            build and does not yet represent the
            quality, integration, or stability planned
            for the connected Beta ecosystem.
          </p>
        </div>

        <div className="p-[clamp(1rem,2.5vw,1.7rem)]">
          <div className="rounded-[clamp(0.8rem,1.3vw,1rem)] border border-[#e2d5ba] bg-[#f8f1e4] p-[clamp(0.9rem,1.5vw,1.15rem)]">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] text-[#668255]">
              What reviewers should expect
            </p>

            <div className="mt-3 grid gap-2">
              {[
                "An early demonstration of the playable world and gameplay foundation.",
                "Some systems may be incomplete, disabled, or under maintenance.",
                "The build is provided as execution evidence rather than the final Beta product.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[0.7rem] border border-[#e4d8c1] bg-white/65 px-3 py-2.5"
                >
                  <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[#68ad4a]" />

                  <p className="text-[clamp(0.8rem,0.9vw,0.96rem)] font-semibold leading-[1.6] text-[#665b4b]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[clamp(1rem,1.8vw,1.4rem)] flex flex-col gap-3 sm:flex-row">
            <Link
              href={playableGameUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onCloseRef.current();
              }}
              className="inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-[0.8rem] bg-[#173b21] px-5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-black text-white shadow-[0_0.8rem_2rem_rgba(23,59,33,0.18)] transition hover:-translate-y-0.5 hover:bg-[#24532e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f9d49] focus-visible:ring-offset-2"
            >
              Open Playable Alpha
              <span aria-hidden="true">↗</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                onCloseRef.current();
              }}
              className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-[0.8rem] border border-[#d7c9ae] bg-white px-5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-black text-[#4f4436] transition hover:-translate-y-0.5 hover:bg-[#fffdf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9c68] focus-visible:ring-offset-2"
            >
              Return to Review Portal
            </button>
          </div>

          <p className="mt-4 text-center text-[clamp(0.7rem,0.8vw,0.86rem)] leading-[1.55] text-[#8a7c66]">
            The playable build opens in a new browser
            tab. Press Escape to close this notice.
          </p>
        </div>
      </div>
    </div>
  );
}