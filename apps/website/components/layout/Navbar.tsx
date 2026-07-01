"use client";

import Image from "next/image";
import { useState } from "react";
import { mainNavigation } from "@/data/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
        <a href="#home" className="relative z-50 shrink-0">
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia World"
            width={120}
            height={56}
            priority
            className="h-auto w-28 md:w-36"
          />
        </a>

        <nav className="mx-auto hidden items-center gap-1 rounded-full border border-white/70 bg-white/60 px-2 py-2 shadow-[0_16px_45px_rgba(88,60,28,0.16)] backdrop-blur-xl lg:flex">
          {mainNavigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative overflow-hidden rounded-full px-5 py-3 text-sm font-black text-[#3a2a1d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#4f8124]"
            >
              <span className="absolute inset-0 scale-75 rounded-full bg-[#edf7df] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              <span className="absolute bottom-1 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-[#6fa83a] transition-all duration-300 group-hover:w-6" />
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="group relative overflow-hidden rounded-full border border-white/70 bg-white/75 px-5 py-3 text-sm font-black text-[#3a2a1d] shadow-[0_12px_30px_rgba(88,60,28,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#4f8124]"
          >
            <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
            <span className="relative z-10">Login</span>
          </a>

          <a href="/register" className="lt-button-primary px-5 py-3 text-sm">
            Register
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/85 text-2xl font-black text-[#3a2a1d] shadow-[0_12px_30px_rgba(88,60,28,0.16)] backdrop-blur-xl md:hidden"
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
                className="rounded-2xl px-4 py-4 text-lg font-black text-[#3a2a1d] transition hover:bg-[#edf7df] hover:text-[#4f8124]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-4 text-lg font-black text-[#3a2a1d] transition hover:bg-[#edf7df] hover:text-[#4f8124]"
            >
              Login
            </a>

            <a
              href="/register"
              onClick={() => setIsOpen(false)}
              className="lt-button-primary mt-2 w-full px-6 py-4 text-center text-base"
            >
              Register
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}