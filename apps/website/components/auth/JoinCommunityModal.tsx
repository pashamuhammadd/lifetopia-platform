"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";

const communityUrl =
  "https://community.lifetopiaworld.io";

const loginHref = `/login?next=${encodeURIComponent(
  communityUrl,
)}`;

const registerHref = `/register?next=${encodeURIComponent(
  communityUrl,
)}`;

type JoinCommunityModalProps = {
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

export function JoinCommunityModal({
  isOpen,
  onClose,
}: JoinCommunityModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  const dialogRef =
    useRef<HTMLElement | null>(null);

  const previousFocusedElementRef =
    useRef<HTMLElement | null>(null);

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

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#19331f]/65 p-4 backdrop-blur-md"
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
        className="lt-animate-fade-up relative w-full max-w-[31rem] overflow-hidden rounded-[clamp(1.1rem,3vw,1.6rem)] border border-white/80 bg-[#fffaf0] shadow-[0_2rem_6rem_rgba(34,56,31,0.32)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-16 size-44 rounded-full bg-[#8fd46d]/24 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-14 size-48 rounded-full bg-[#87d9f7]/24 blur-3xl"
        />

        <header className="relative flex items-start justify-between gap-4 border-b border-[#e7d7b8] px-[clamp(1rem,4vw,1.5rem)] py-[clamp(1rem,3vw,1.3rem)]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7ddb9] bg-[#edf7e6] px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-[0.1em] text-[#4f7e3a]">
              <span className="size-1.5 rounded-full bg-[#6fac4f]" />
              Lifetopia Community
            </span>

            <h2
              id={titleId}
              className="mt-3 text-[clamp(1.45rem,5vw,2rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#2f2118]"
            >
              Join the world beyond the game.
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close community login dialog"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#ddceb1] bg-white text-xl font-black leading-none text-[#665643] transition hover:-translate-y-0.5 hover:border-[#bba987] hover:bg-[#fff8e8]"
          >
            ×
          </button>
        </header>

        <div className="relative px-[clamp(1rem,4vw,1.5rem)] py-[clamp(1rem,3.5vw,1.4rem)]">
          <p
            id={descriptionId}
            className="text-[clamp(0.88rem,2.6vw,1rem)] leading-[1.65] text-[#6d604e]"
          >
            Log in with your Lifetopia account to
            continue into the Community Platform,
            connect with other Lifetopians, and
            access your shared player identity.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href={loginHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4f8124] px-5 text-[0.88rem] font-black text-white shadow-[0_0.75rem_1.8rem_rgba(79,129,36,0.24)] transition hover:-translate-y-0.5 hover:bg-[#416e1d]"
            >
              Log In
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href={registerHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#cdbd9e] bg-white px-5 text-[0.88rem] font-black text-[#4f6f35] shadow-[0_0.65rem_1.6rem_rgba(88,60,28,0.09)] transition hover:-translate-y-0.5 hover:border-[#9ebd89] hover:bg-[#f3faee]"
            >
              Create Account
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="mt-5 rounded-xl border border-[#d8c9aa] bg-white/65 px-4 py-3">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#e9f5e1] text-lg"
              >
                🌿
              </span>

              <p className="text-[clamp(0.76rem,2.2vw,0.86rem)] leading-[1.55] text-[#746754]">
                One Lifetopia account connects the
                website, Community Platform, player
                profile, and future game progress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}