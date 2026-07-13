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

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="sticky top-0 z-[90] border-b border-[#4e3f2b]/10 bg-[#fffdf8]/90 shadow-[0_0.35rem_1.5rem_rgba(48,38,23,0.05)] backdrop-blur-xl">
      <nav className="grants-container flex min-h-[3.75rem] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="#overview"
            onClick={closeMenu}
            aria-label="Lifetopia World Funding Review Portal"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/brand/lifetopia-logo.png"
              alt="Lifetopia World"
              width={180}
              height={120}
              priority
              className="h-auto w-[clamp(4.7rem,6.6vw,5.8rem)] transition duration-200 hover:scale-[1.02]"
            />
          </Link>

          <div className="hidden min-w-0 border-l border-[#5a4b35]/14 pl-3 sm:block">
            <p className="truncate text-[clamp(0.66rem,0.74vw,0.76rem)] font-black uppercase tracking-[0.1em] text-[#3d7138]">
              Funding Review Portal
            </p>

            <p className="mt-0.5 truncate text-[clamp(0.66rem,0.72vw,0.74rem)] font-semibold text-[#897c67]">
              Lifetopia World
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-[clamp(0.75rem,1.5vw,1.35rem)] lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex min-h-[3.75rem] items-center text-[clamp(0.74rem,0.82vw,0.86rem)] font-black text-[#443c31] transition duration-200 hover:text-[#35763a]"
            >
              {item.label}

              <span className="absolute inset-x-0 bottom-0 h-[0.15rem] origin-center scale-x-0 rounded-full bg-[#5b9b48] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-[#5b9b48]/15 bg-[#edf6e6] px-3 py-1.5 text-[clamp(0.68rem,0.76vw,0.8rem)] font-black text-[#47793a] md:flex">
            <span className="size-2 rounded-full bg-[#68ad4a] shadow-[0_0_0.55rem_rgba(104,173,74,0.38)]" />
            Beta Development
          </span>

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
            className="flex size-[2.65rem] items-center justify-center rounded-[0.75rem] border border-[#5a4b35]/14 bg-white/75 shadow-[0_0.35rem_1rem_rgba(55,42,24,0.06)] transition hover:border-[#4f873d]/25 hover:bg-[#f7fbf3] lg:hidden"
          >
            <span className="relative block h-[0.95rem] w-[1.15rem]">
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
          className="absolute inset-x-0 top-full border-b border-[#5a4b35]/10 bg-[#fffdf8]/95 shadow-[0_1rem_2.5rem_rgba(55,42,24,0.12)] backdrop-blur-xl lg:hidden"
        >
          <div className="grants-container py-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-[2.8rem] items-center justify-center rounded-[0.7rem] border border-[#66583f]/10 bg-[#f7f1e6] px-3 py-2 text-center text-[clamp(0.76rem,1.8vw,0.88rem)] font-black text-[#3f4737] transition hover:border-[#568b42]/25 hover:bg-[#edf5e5] hover:text-[#39723a]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 rounded-[0.75rem] border border-[#4b823d]/12 bg-[#eaf4df] px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[0.78rem] font-black text-[#335f32]">
                  Lifetopia World Beta
                </p>

                <p className="mt-0.5 truncate text-[0.72rem] font-medium text-[#718269]">
                  Active public development
                </p>
              </div>

              <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#70a95a]/15 bg-[#dcefd0] px-3 py-1.5 text-[0.72rem] font-black text-[#427536]">
                <span className="size-2 rounded-full bg-[#67b947]" />
                Active
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}