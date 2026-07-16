"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type PlayWarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function PlayWarningModal({
  isOpen,
  onClose,
}: PlayWarningModalProps) {
  const [mounted, setMounted] =
    useState(false);

  const titleId = useId();
  const descriptionId = useId();

  const dialogRef =
    useRef<HTMLElement | null>(null);

  const previousFocusedElementRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const animationFrame =
      window.requestAnimationFrame(() => {
        const firstFocusable =
          dialogRef.current?.querySelector<HTMLElement>(
            focusableSelector,
          );

        firstFocusable?.focus();
      });

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        event.key !== "Tab" ||
        !dialogRef.current
      ) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          focusableSelector,
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.tabIndex !== -1 &&
          element.offsetParent !== null,
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (!firstElement || !lastElement) {
        return;
      }

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;

      window.requestAnimationFrame(() => {
        previousFocusedElementRef.current?.focus();
      });
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#1d281d]/70 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
className="lt-animate-fade-up relative max-h-[90svh] w-full max-w-[34rem] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[clamp(1rem,3vw,1.5rem)] border border-[#decaa5] bg-[#fff8e8] shadow-[0_2rem_6rem_rgba(31,43,28,0.38)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-16 size-44 rounded-full bg-[#f4c75c]/24 blur-3xl"
        />

        <header className="relative flex items-start justify-between gap-4 border-b border-[#e5d4b3] px-[clamp(1rem,4vw,1.5rem)] py-[clamp(1rem,3vw,1.3rem)]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e2c97d] bg-[#fff0bc] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.1em] text-[#88621a]">
              <span className="size-1.5 rounded-full bg-[#dfa52f]" />
              Game Build Notice
            </span>

            <h2
              id={titleId}
              className="mt-3 max-w-[24rem] text-[clamp(1.4rem,4vw,2rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#352419]"
            >
              The current build is still evolving.
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close game development notice"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#dcc99f] bg-white text-xl font-black leading-none text-[#6b5538] transition hover:-translate-y-0.5 hover:bg-[#fff4dc]"
          >
            ×
          </button>
        </header>

        <div className="relative px-[clamp(1rem,4vw,1.5rem)] py-[clamp(1rem,3.5vw,1.4rem)]">
          <p
            id={descriptionId}
            className="text-[clamp(0.86rem,2.5vw,0.96rem)] leading-[1.65] text-[#705d48]"
          >
            Lifetopia World is undergoing a major
            development phase focused on stability,
            performance, gameplay systems, and the
            overall player experience.
          </p>

          <div className="mt-4 rounded-xl border border-[#e4ce91] bg-[#fff3ca] px-4 py-3.5">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.09em] text-[#8c681f]">
              Before entering
            </p>

            <ul className="mt-2.5 space-y-2 text-[clamp(0.78rem,2.2vw,0.88rem)] leading-[1.55] text-[#78613c]">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#d9a32e]" />
                Some gameplay systems remain limited or
                temporarily disabled.
              </li>

              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#d9a32e]" />
                Bugs and visual issues may still appear
                during development.
              </li>

              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#d9a32e]" />
                The current build does not represent the
                final quality target.
              </li>
            </ul>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="https://play.lifetopiaworld.io"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#5f902f] px-5 text-[0.86rem] font-black text-white shadow-[0_0.75rem_1.8rem_rgba(63,111,34,0.22)] transition hover:-translate-y-0.5 hover:bg-[#4f7e27]"
            >
              Continue to Game
            </Link>

            <Link
              href="https://community.lifetopiaworld.io"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#d6c39e] bg-white px-5 text-[0.86rem] font-black text-[#536d3c] shadow-[0_0.6rem_1.5rem_rgba(88,60,28,0.08)] transition hover:-translate-y-0.5 hover:bg-[#f3faee]"
            >
              Visit Community
            </Link>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}