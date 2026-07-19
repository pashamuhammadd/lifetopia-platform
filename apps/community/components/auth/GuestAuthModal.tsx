"use client";

import {
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";

const mainAppUrl =
  process.env.NEXT_PUBLIC_MAIN_APP_URL ?? "https://lifetopiaworld.io";

type GuestAuthModalProps = {
  open: boolean;
  returnUrl: string;
  onClose: () => void;
};

export function GuestAuthModal({
  open,
  returnUrl,
  onClose,
}: GuestAuthModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  const encodedReturnUrl = encodeURIComponent(returnUrl);

  return (
    <div
      className="fixed inset-0 z-[999] grid place-items-center bg-[#2f1b12]/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-auth-title"
        aria-describedby="guest-auth-description"
        className="w-full max-w-md rounded-[30px] border border-[#ead9b8] bg-[#fffdf7] p-6 shadow-[0_24px_80px_rgba(47,27,18,0.28)]"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close account dialog"
          className="ml-auto grid size-10 place-items-center rounded-full bg-[#fff5df] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]"
        >
          <X size={18} />
        </button>

        <span className="mt-2 inline-flex rounded-full border border-[#cfe2bd] bg-[#edf7df] px-3 py-1 text-xs font-black text-[#4f8124]">
          One account, one identity
        </span>

        <h2
          id="guest-auth-title"
          className="mt-4 text-3xl font-black leading-tight text-[#2f2418]"
        >
          Join Lifetopia Community
        </h2>

        <p
          id="guest-auth-description"
          className="mt-3 font-bold leading-7 text-[#7a5635]"
        >
          Login or create your Lifetopia account to post, like, comment,
          follow Lifetopians, complete quests, and access My World.
        </p>

        <div className="mt-6 grid gap-3">
          <a
            href={`${mainAppUrl}/login?next=${encodedReturnUrl}`}
            className="min-h-11 rounded-full bg-[#4f8124] px-5 py-3 text-center font-black text-white transition hover:bg-[#3f6f22]"
          >
            Login
          </a>

          <a
            href={`${mainAppUrl}/register?next=${encodedReturnUrl}`}
            className="min-h-11 rounded-full border border-[#cfe2bd] bg-[#edf7df] px-5 py-3 text-center font-black text-[#4f8124] transition hover:bg-[#e3f2d7]"
          >
            Create Account
          </a>

          <a
            href={`${mainAppUrl}/wallet-login?next=${encodedReturnUrl}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d8c79d] bg-[#fff8e9] px-5 py-3 text-center font-black text-[#76583a] transition hover:bg-[#f8edda] hover:text-[#4f8124]"
          >
            <WalletCards
              aria-hidden="true"
              className="size-4"
            />
            Continue with wallet
          </a>

          <button
            type="button"
            onClick={onClose}
            className="min-h-10 text-sm font-black text-[#7a5635] transition hover:text-[#2f2418]"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
