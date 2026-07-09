"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

type GuestAuthModalProps = {
  open: boolean;
};

const mainAppUrl =
  process.env.NEXT_PUBLIC_MAIN_APP_URL ?? "https://lifetopiaworld.io";

export function GuestAuthModal({ open }: GuestAuthModalProps) {
  const [visible, setVisible] = useState(false);

  const nextUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return encodeURIComponent(window.location.href);
  }, []);

  useEffect(() => {
    if (!open) return;

    const dismissed = localStorage.getItem("lifetopia_guest_auth_dismissed");

    if (!dismissed) {
      setVisible(true);
    }
  }, [open]);

  function continueAsGuest() {
    localStorage.setItem("lifetopia_guest_auth_dismissed", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-black/35 p-4">
      <div className="w-full max-w-md rounded-[30px] border border-[#ead9b8] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        <button
          type="button"
          onClick={continueAsGuest}
          className="ml-auto grid size-9 place-items-center rounded-full bg-[#fffaf0] text-[#7a5635]"
        >
          <X size={18} />
        </button>

        <h2 className="mt-3 text-3xl font-black text-[#2f2418]">
          Join Lifetopia Community
        </h2>

        <p className="mt-2 font-bold leading-7 text-[#7a5635]">
          Login or create your Lifetopia account to post, like, comment, save,
          and access My World.
        </p>

        <div className="mt-6 grid gap-3">
          <Link
            href={`${mainAppUrl}/login?next=${nextUrl}`}
            className="rounded-full bg-[#4f8124] px-5 py-3 text-center font-black text-white"
          >
            Login
          </Link>

          <Link
            href={`${mainAppUrl}/register?next=${nextUrl}`}
            className="rounded-full bg-[#edf7df] px-5 py-3 text-center font-black text-[#4f8124]"
          >
            Create Account
          </Link>

          <button
            type="button"
            onClick={continueAsGuest}
            className="text-sm font-black text-[#7a5635] hover:text-[#2f2418]"
          >
            Just browsing for now
          </button>
        </div>
      </div>
    </div>
  );
}