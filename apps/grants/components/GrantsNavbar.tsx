"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Overview", href: "#overview" },
  { label: "Products", href: "#products" },
  { label: "Development", href: "#development" },
  { label: "Grant", href: "#grant-request" },
  { label: "Documents", href: "#documents" },
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

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="relative z-50 border-b border-[#5a4b35]/10 bg-[#fffdf7]/94 shadow-[0_0.3rem_1.4rem_rgba(55,42,24,0.04)] backdrop-blur-xl">
      <nav className="flex min-h-[clamp(3.8rem,5.7vw,4.7rem)] w-full items-center justify-between gap-[clamp(0.65rem,1.5vw,1.2rem)] px-[clamp(1rem,4vw,4.5rem)]">
        <div className="flex min-w-0 items-center gap-[clamp(0.5rem,1.1vw,0.85rem)]">
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
              className="h-auto w-[clamp(4.1rem,7vw,6.2rem)] transition-transform duration-200 hover:scale-[1.02]"
            />
          </Link>

          <div className="hidden min-w-0 border-l border-[#5a4b35]/15 pl-[clamp(0.5rem,1vw,0.8rem)] sm:block">
            <p className="truncate text-[clamp(0.52rem,0.68vw,0.64rem)] font-extrabold uppercase tracking-[0.1em] text-[#315f31]">
              Project Review Hub
            </p>

            <p className="mt-[clamp(0.05rem,0.14vw,0.1rem)] truncate text-[clamp(0.42rem,0.54vw,0.52rem)] font-semibold text-[#867a66]">
              Lifetopia World
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-[clamp(0.9rem,2vw,1.75rem)] lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-[clamp(0.6rem,0.9vw,0.8rem)] text-[clamp(0.65rem,0.8vw,0.78rem)] font-bold text-[#413a2f] transition-colors duration-200 hover:text-[#35763a]"
            >
              {item.label}

              <span className="absolute inset-x-0 bottom-[0.3rem] h-[0.11rem] origin-center scale-x-0 rounded-full bg-[#4e8c42] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-[clamp(0.4rem,0.8vw,0.65rem)]">
          <span className="hidden items-center gap-[clamp(0.25rem,0.5vw,0.4rem)] rounded-full border border-[#4b8a3f]/12 bg-[#e8f4dc] px-[clamp(0.55rem,1vw,0.8rem)] py-[clamp(0.26rem,0.5vw,0.38rem)] text-[clamp(0.47rem,0.64vw,0.6rem)] font-extrabold text-[#407633] md:flex">
            <span className="size-[clamp(0.32rem,0.52vw,0.42rem)] rounded-full bg-[#69bd47] shadow-[0_0_0.6rem_rgba(105,189,71,0.42)]" />
            Beta Phase
          </span>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex size-[clamp(2.3rem,3.7vw,2.75rem)] items-center justify-center rounded-[clamp(0.58rem,0.9vw,0.75rem)] border border-[#5a4b35]/14 bg-white shadow-[0_0.4rem_1.2rem_rgba(55,42,24,0.065)] transition duration-200 hover:border-[#4f873d]/25 hover:bg-[#f8fbf3] lg:hidden"
          >
            <span className="relative block h-[clamp(0.8rem,1.3vw,1rem)] w-[clamp(0.95rem,1.5vw,1.18rem)]">
              <span
                className={[
                  "absolute left-0 top-0 h-[0.11rem] w-full rounded-full bg-[#243023] transition duration-200",
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute left-0 top-1/2 h-[0.11rem] w-full -translate-y-1/2 rounded-full bg-[#243023] transition duration-200",
                  isMenuOpen
                    ? "scale-x-0 opacity-0"
                    : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute bottom-0 left-0 h-[0.11rem] w-full rounded-full bg-[#243023] transition duration-200",
                  isMenuOpen
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={[
          "absolute inset-x-0 top-full overflow-hidden border-b border-[#5a4b35]/10 bg-[#fffdf7]/98 shadow-[0_1rem_2.5rem_rgba(55,42,24,0.1)] backdrop-blur-xl transition-all duration-300 lg:hidden",
          isMenuOpen
            ? "max-h-[28rem] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="px-[clamp(1rem,4vw,4.5rem)] py-[clamp(0.7rem,1.8vw,1.1rem)]">
          <div className="grid grid-cols-5 gap-[clamp(0.25rem,0.75vw,0.55rem)]">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="min-w-0 rounded-[clamp(0.4rem,0.85vw,0.65rem)] border border-[#66583f]/10 bg-[#f7f1e6] px-[clamp(0.25rem,0.65vw,0.5rem)] py-[clamp(0.38rem,0.85vw,0.65rem)] text-center text-[clamp(0.34rem,0.7vw,0.58rem)] font-extrabold text-[#3f4737] transition hover:border-[#568b42]/25 hover:bg-[#edf5e5] hover:text-[#39723a]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-[clamp(0.5rem,1vw,0.8rem)] flex items-center justify-between rounded-[clamp(0.5rem,1vw,0.8rem)] border border-[#4b823d]/12 bg-[#eaf4df] px-[clamp(0.55rem,1.1vw,0.85rem)] py-[clamp(0.4rem,0.9vw,0.65rem)]">
            <div>
              <p className="text-[clamp(0.4rem,0.7vw,0.6rem)] font-extrabold text-[#335f32]">
                Lifetopia World Beta
              </p>

              <p className="mt-[clamp(0.06rem,0.18vw,0.13rem)] text-[clamp(0.3rem,0.54vw,0.47rem)] font-medium text-[#718269]">
                Actively developing in public
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-[clamp(0.2rem,0.45vw,0.35rem)] rounded-full bg-[#dcefd0] px-[clamp(0.4rem,0.8vw,0.6rem)] py-[clamp(0.18rem,0.4vw,0.3rem)] text-[clamp(0.3rem,0.55vw,0.47rem)] font-extrabold text-[#427536]">
              <span className="size-[clamp(0.25rem,0.4vw,0.32rem)] rounded-full bg-[#67b947]" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}