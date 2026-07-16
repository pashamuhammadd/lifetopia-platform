"use client";

import { createClient } from "@repo/lib/supabase/client";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { JoinCommunityModal } from "@/components/auth/JoinCommunityModal";

const communityUrl =
  "https://community.lifetopiaworld.io";

const navigationItems = [
  {
    label: "Gameplay",
    href: "#gameplay",
  },
  {
    label: "Community",
    href: "#community",
  },
  {
    label: "Journey",
    href: "#journey",
  },
  {
    label: "Roadmap",
    href: "#roadmap",
  },
  {
    label: "Development",
    href: "#development-log",
  },
];

export function Navbar() {
  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [
    isCommunityModalOpen,
    setIsCommunityModalOpen,
  ] = useState(false);

  const [
    isCheckingSession,
    setIsCheckingSession,
  ] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  const closeCommunityModal =
    useCallback(() => {
      setIsCommunityModalOpen(false);
    }, []);

  async function handleJoinCommunity() {
    if (isCheckingSession) {
      return;
    }

    setIsCheckingSession(true);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        window.location.assign(communityUrl);
        return;
      }

      setIsCommunityModalOpen(true);
    } catch {
      setIsCommunityModalOpen(true);
    } finally {
      setIsCheckingSession(false);
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-[clamp(0.65rem,2vw,1.5rem)] py-[clamp(0.6rem,1.2vw,0.9rem)]">
        <div
          className={[
            "lt-container grid min-h-[clamp(3.7rem,5.5vw,4.4rem)] grid-cols-[auto_1fr_auto] items-center gap-[clamp(0.55rem,1.5vw,1.2rem)] rounded-[clamp(1rem,1.8vw,1.4rem)] border px-[clamp(0.7rem,1.4vw,1rem)] transition duration-300",
            isScrolled
              ? "border-white/80 bg-[#fffaf0]/92 shadow-[0_1rem_3rem_rgba(74,52,25,0.16)] backdrop-blur-xl"
              : "border-white/65 bg-[#fffaf0]/68 shadow-[0_0.7rem_2rem_rgba(74,52,25,0.1)] backdrop-blur-lg",
          ].join(" ")}
        >
          <a
            href="#home"
            aria-label="Lifetopia World home"
            className="relative z-10 shrink-0 transition hover:-translate-y-0.5"
          >
            <Image
              src="/images/logo/logo-lifetopia-world.png"
              alt="Lifetopia World"
              width={160}
              height={76}
              priority
              className="h-auto w-[clamp(5.4rem,9vw,8.2rem)]"
            />
          </a>

          <nav
            aria-label="Homepage sections"
            className="mx-auto hidden items-center gap-1 rounded-full border border-[#d8c9aa]/65 bg-white/58 p-1.5 shadow-[0_0.45rem_1.5rem_rgba(88,60,28,0.07)] lg:flex"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-full px-[clamp(0.75rem,1.3vw,1.15rem)] py-2 text-[clamp(0.72rem,0.82vw,0.84rem)] font-black text-[#473728] transition hover:-translate-y-0.5 hover:text-[#4f8124]"
              >
                <span className="absolute inset-0 scale-75 rounded-full bg-[#edf7df] opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100" />

                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[#6fa83a] transition-all duration-300 group-hover:w-5" />

                <span className="relative">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleJoinCommunity}
            disabled={isCheckingSession}
            aria-haspopup="dialog"
            aria-expanded={
              isCommunityModalOpen
            }
            aria-busy={isCheckingSession}
            className="group relative ml-auto inline-flex min-h-[2.65rem] shrink-0 items-center justify-center gap-0 overflow-hidden rounded-full border border-[#4f8124]/20 bg-[linear-gradient(180deg,#7eb746_0%,#5f922f_100%)] px-[clamp(0.85rem,1.7vw,1.3rem)] text-[clamp(0.72rem,0.84vw,0.88rem)] font-black text-white shadow-[0_0.55rem_1.4rem_rgba(63,111,34,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_0.8rem_1.8rem_rgba(63,111,34,0.3)] disabled:pointer-events-none disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/24 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

            <span className="relative hidden sm:inline">
              {isCheckingSession
                ? "Checking..."
                : "Join Community"}
            </span>

            <span className="relative sm:hidden">
              {isCheckingSession
                ? "Checking..."
                : "Community"}
            </span>
          </button>
        </div>
      </header>

      <JoinCommunityModal
        isOpen={isCommunityModalOpen}
        onClose={closeCommunityModal}
      />
    </>
  );
}