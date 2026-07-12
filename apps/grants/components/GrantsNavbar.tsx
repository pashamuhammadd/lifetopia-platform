"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  {
    label: "Overview",
    href: "#overview",
  },
  {
    label: "Products",
    href: "#products",
  },
  {
    label: "Development",
    href: "#current-development",
  },
  {
    label: "Roadmap",
    href: "#roadmap",
  },
  {
    label: "Documents",
    href: "#documents",
  },
];

export function GrantsNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="relative z-50 border-b border-[#5a4b35]/10 bg-[#fffdf7]/95 shadow-[0_0.35rem_1.5rem_rgba(55,42,24,0.045)] backdrop-blur-xl">
      <nav className="grants-container flex min-h-[clamp(4rem,6vw,4.8rem)] items-center justify-between gap-[clamp(0.7rem,1.5vw,1.2rem)]">
        <div className="flex min-w-0 items-center gap-[clamp(0.55rem,1.2vw,0.95rem)]">
          <Link
            href="#overview"
            onClick={closeMenu}
            aria-label="Lifetopia World Grant Portal"
            className="shrink-0"
          >
            <Image
              src="/brand/lifetopia-logo.png"
              alt="Lifetopia World"
              width={180}
              height={120}
              priority
              className="h-auto w-[clamp(4.7rem,8vw,6.8rem)] transition duration-200 hover:scale-[1.02]"
            />
          </Link>

          <div className="hidden min-w-0 border-l border-[#5a4b35]/15 pl-[clamp(0.55rem,1.2vw,0.9rem)] sm:block">
            <p className="truncate text-[clamp(0.68rem,0.76vw,0.78rem)] font-black uppercase tracking-[0.09em] text-[#315f31]">
              Funding Review Portal
            </p>

            <p className="mt-1 truncate text-[clamp(0.68rem,0.74vw,0.76rem)] font-semibold text-[#867a66]">
              Lifetopia World
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-[clamp(0.8rem,1.7vw,1.5rem)] lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-3 text-[clamp(0.76rem,0.86vw,0.88rem)] font-black text-[#413a2f] transition duration-200 hover:text-[#35763a]"
            >
              {item.label}

              <span className="absolute inset-x-0 bottom-[0.45rem] h-[0.12rem] origin-center scale-x-0 rounded-full bg-[#4e8c42] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-[clamp(0.45rem,0.9vw,0.7rem)]">
          <span className="hidden items-center gap-2 rounded-full border border-[#4b8a3f]/15 bg-[#e8f4dc] px-3 py-2 text-[clamp(0.7rem,0.78vw,0.82rem)] font-black text-[#407633] md:flex">
            <span className="size-2 rounded-full bg-[#69bd47] shadow-[0_0_0.65rem_rgba(105,189,71,0.45)]" />
            Beta Development
          </span>

          <Link
            href="#budget"
            className="hidden min-h-[2.75rem] items-center justify-center rounded-[0.8rem] bg-[#174d29] px-[clamp(0.9rem,1.4vw,1.15rem)] text-[clamp(0.74rem,0.82vw,0.86rem)] font-black text-white shadow-[0_0.7rem_1.6rem_rgba(23,77,41,0.17)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#246035] xl:flex"
          >
            Review Funding
          </Link>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="grant-mobile-navigation"
            onClick={() => {
              setIsMenuOpen((current) => !current);
            }}
            className="flex size-[clamp(2.5rem,4vw,2.9rem)] items-center justify-center rounded-[clamp(0.65rem,1vw,0.8rem)] border border-[#5a4b35]/14 bg-white shadow-[0_0.45rem_1.3rem_rgba(55,42,24,0.07)] transition duration-200 hover:border-[#4f873d]/25 hover:bg-[#f8fbf3] lg:hidden"
          >
            <span className="relative block h-[1rem] w-[1.2rem]">
              <span
                className={[
                  "absolute left-0 top-0 h-[0.12rem] w-full rounded-full bg-[#243023] transition duration-200",
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute left-0 top-1/2 h-[0.12rem] w-full -translate-y-1/2 rounded-full bg-[#243023] transition duration-200",
                  isMenuOpen
                    ? "scale-x-0 opacity-0"
                    : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute bottom-0 left-0 h-[0.12rem] w-full rounded-full bg-[#243023] transition duration-200",
                  isMenuOpen
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div
          id="grant-mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-[#5a4b35]/10 bg-[#fffdf7]/98 shadow-[0_1rem_2.5rem_rgba(55,42,24,0.11)] backdrop-blur-xl lg:hidden"
        >
          <div className="grants-container py-[clamp(0.85rem,2vw,1.2rem)]">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-[3rem] items-center justify-center rounded-[0.75rem] border border-[#66583f]/10 bg-[#f7f1e6] px-3 py-2.5 text-center text-[clamp(0.78rem,1.8vw,0.9rem)] font-black text-[#3f4737] transition hover:border-[#568b42]/25 hover:bg-[#edf5e5] hover:text-[#39723a]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="#budget"
                onClick={closeMenu}
                className="flex min-h-[3rem] items-center justify-center rounded-[0.75rem] bg-[#174d29] px-3 py-2.5 text-center text-[clamp(0.78rem,1.8vw,0.9rem)] font-black text-white transition hover:bg-[#246035] sm:hidden"
              >
                Review Funding
              </Link>
            </div>

            <div className="mt-3 flex flex-col gap-3 rounded-[0.8rem] border border-[#4b823d]/12 bg-[#eaf4df] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[clamp(0.78rem,1.8vw,0.9rem)] font-black text-[#335f32]">
                  Lifetopia World Beta
                </p>

                <p className="mt-1 text-[clamp(0.72rem,1.6vw,0.82rem)] font-medium text-[#718269]">
                  The project is actively being developed in public.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-[#70a95a]/15 bg-[#dcefd0] px-3 py-1.5 text-[clamp(0.7rem,1.5vw,0.8rem)] font-black text-[#427536]">
                  <span className="size-2 rounded-full bg-[#67b947]" />
                  Active
                </span>

                <Link
                  href="#budget"
                  onClick={closeMenu}
                  className="hidden min-h-[2.5rem] items-center justify-center rounded-[0.7rem] bg-[#174d29] px-4 text-[0.78rem] font-black text-white sm:flex"
                >
                  Review Funding
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}