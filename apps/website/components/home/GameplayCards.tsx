"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { gameplayIcons } from "@/data/homepage";

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

export function GameplayCards() {
  const desktopSlides = useMemo(() => chunkArray(gameplayIcons, 5), []);
  const mobileSlides = useMemo(() => chunkArray(gameplayIcons, 3), []);

  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDesktopIndex((current) => (current + 1) % desktopSlides.length);
      setMobileIndex((current) => (current + 1) % mobileSlides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [desktopSlides.length, mobileSlides.length]);

  const nextDesktop = () =>
    setDesktopIndex((current) => (current + 1) % desktopSlides.length);

  const prevDesktop = () =>
    setDesktopIndex(
      (current) => (current - 1 + desktopSlides.length) % desktopSlides.length,
    );

  const nextMobile = () =>
    setMobileIndex((current) => (current + 1) % mobileSlides.length);

  const prevMobile = () =>
    setMobileIndex(
      (current) => (current - 1 + mobileSlides.length) % mobileSlides.length,
    );

  return (
    <div className="absolute inset-x-0 bottom-[3.2vw] z-20 mx-auto w-[86vw] max-w-6xl px-4">
      <div className="overflow-hidden rounded-[28px] border border-white/80 bg-[#fffaf0]/86 shadow-[0_14px_38px_rgba(88,60,28,0.14)] backdrop-blur-xl">
        <div
          key={`desktop-${desktopIndex}`}
          className="hidden animate-[lifetopiaSlideIn_450ms_ease_both] grid-cols-5 md:grid"
        >
          {(desktopSlides[desktopIndex] ?? []).map((item) => (
            <GameplayCard key={item.title} item={item} />
          ))}
        </div>

        <div
          key={`mobile-${mobileIndex}`}
          className="grid animate-[lifetopiaSlideIn_450ms_ease_both] grid-cols-3 md:hidden"
        >
          {(mobileSlides[mobileIndex] ?? []).map((item) => (
            <GameplayCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prevDesktop}
          className="hidden h-7 w-7 rounded-full border border-white/70 bg-white/90 text-lg font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105 md:block"
          aria-label="Previous gameplay slide"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={prevMobile}
          className="h-7 w-7 rounded-full border border-white/70 bg-white/90 text-lg font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105 md:hidden"
          aria-label="Previous gameplay slide"
        >
          ‹
        </button>

        <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-2 shadow-[0_8px_22px_rgba(88,60,28,0.12)] backdrop-blur-md md:flex">
          {desktopSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setDesktopIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                desktopIndex === index
                  ? "w-7 bg-[#6fa83a]"
                  : "w-2 bg-[#d8c59f] hover:bg-[#b8a77d]"
              }`}
              aria-label={`Go to gameplay slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-2 shadow-[0_8px_22px_rgba(88,60,28,0.12)] backdrop-blur-md md:hidden">
          {mobileSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setMobileIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                mobileIndex === index
                  ? "w-7 bg-[#6fa83a]"
                  : "w-2 bg-[#d8c59f] hover:bg-[#b8a77d]"
              }`}
              aria-label={`Go to gameplay slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextDesktop}
          className="hidden h-7 w-7 rounded-full border border-white/70 bg-white/90 text-lg font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105 md:block"
          aria-label="Next gameplay slide"
        >
          ›
        </button>

        <button
          type="button"
          onClick={nextMobile}
          className="h-7 w-7 rounded-full border border-white/70 bg-white/90 text-lg font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105 md:hidden"
          aria-label="Next gameplay slide"
        >
          ›
        </button>
      </div>
    </div>
  );
}

type GameplayCardProps = {
  item: {
    title: string;
    desc: string;
    image: string;
  };
};

function GameplayCard({ item }: GameplayCardProps) {
  return (
    <div className="group flex min-w-0 items-center justify-center gap-[0.55vw] border-r border-[#d8c59f]/55 px-[0.7vw] py-[0.65vw] text-center last:border-r-0 transition duration-300 hover:bg-white/55">
      <Image
        src={item.image}
        alt={item.title}
        width={72}
        height={72}
        className="h-[clamp(22px,2.8vw,50px)] w-[clamp(22px,2.8vw,50px)] shrink-0 object-contain transition duration-300 group-hover:scale-105"
      />

      <div className="hidden min-w-0 text-left sm:block">
        <h3 className="truncate text-[clamp(0.52rem,0.78vw,0.86rem)] font-black leading-tight">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[clamp(0.44rem,0.58vw,0.68rem)] leading-tight text-[#6b5b4a]">
          {item.desc}
        </p>
      </div>
    </div>
  );
}