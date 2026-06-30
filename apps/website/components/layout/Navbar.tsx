"use client";

import Image from "next/image";
import { useState } from "react";
import { mainNavigation } from "@/data/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#home" className="relative z-50 shrink-0">
          <Image
            src="/images/logo/logo.png"
            alt="Lifetopia World"
            width={190}
            height={90}
            priority
            className="h-auto w-32 md:w-44"
          />
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/60 bg-white/65 px-3 py-2 shadow-[0_16px_45px_rgba(88,60,28,0.16)] backdrop-blur-xl lg:flex">
          {mainNavigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-5 py-3 text-sm font-black text-[#3a2a1d] transition hover:bg-white/80 hover:text-[#4f8124]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#play" className="lt-button-primary px-5 py-3 text-sm">
            ▶ Play Now
          </a>

          <button className="rounded-full border border-white/60 bg-white/75 px-5 py-3 text-sm font-black text-[#3a2a1d] shadow-[0_12px_30px_rgba(88,60,28,0.14)] backdrop-blur-xl transition hover:bg-white">
            Connect Wallet 🍃
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="relative z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/85 text-3xl font-black text-[#3a2a1d] shadow-[0_12px_30px_rgba(88,60,28,0.16)] backdrop-blur-xl md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="mx-auto mt-4 max-w-7xl rounded-[28px] border border-white/70 bg-[#fffaf0]/95 p-4 shadow-[0_18px_45px_rgba(88,60,28,0.18)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {mainNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-black text-[#3a2a1d] hover:bg-[#edf7df]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#play"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-4 text-lg font-black text-[#3a2a1d] hover:bg-[#edf7df]"
            >
              Play
            </a>

            <button className="lt-button-primary mt-2 w-full px-6 py-4 text-base">
              Connect Wallet 🍃
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}