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
  const slides = useMemo(() => chunkArray(gameplayIcons, 5), []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      id="journey"
      className="relative z-20 bg-[#fff7e8] px-[clamp(12px,6vw,96px)] pb-[clamp(24px,4vw,56px)] pt-[clamp(16px,3vw,36px)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[clamp(16px,2vw,28px)] border border-white/80 bg-[#fffaf0]/88 shadow-[0_14px_38px_rgba(88,60,28,0.14)] backdrop-blur-xl">
          <div
            key={activeIndex}
            className="grid animate-[lifetopiaSlideIn_450ms_ease_both] grid-cols-5"
          >
            {(slides[activeIndex] ?? []).map((item) => (
              <GameplayCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-[clamp(10px,1.4vw,18px)] flex items-center justify-center gap-[clamp(8px,1vw,14px)]">
          <button
            type="button"
            onClick={prevSlide}
            className="h-[clamp(22px,2.2vw,36px)] w-[clamp(22px,2.2vw,36px)] rounded-full border border-white/70 bg-white/90 text-[clamp(14px,1.6vw,22px)] font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
            aria-label="Previous gameplay slide"
          >
            ‹
          </button>

          <div className="flex items-center gap-[clamp(5px,0.6vw,8px)] rounded-full border border-white/70 bg-white/55 px-[clamp(10px,1vw,16px)] py-[clamp(7px,0.8vw,12px)] shadow-[0_8px_22px_rgba(88,60,28,0.12)] backdrop-blur-md">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-[clamp(5px,0.45vw,8px)] rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-[clamp(18px,2vw,32px)] bg-[#6fa83a]"
                    : "w-[clamp(5px,0.45vw,8px)] bg-[#d8c59f] hover:bg-[#b8a77d]"
                }`}
                aria-label={`Go to gameplay slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="h-[clamp(22px,2.2vw,36px)] w-[clamp(22px,2.2vw,36px)] rounded-full border border-white/70 bg-white/90 text-[clamp(14px,1.6vw,22px)] font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
            aria-label="Next gameplay slide"
          >
            ›
          </button>
        </div>
      </div>
    </section>
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
    <div className="group flex min-w-0 items-center justify-center gap-[clamp(3px,0.55vw,9px)] border-r border-[#d8c59f]/55 px-[clamp(3px,0.75vw,12px)] py-[clamp(5px,0.8vw,13px)] text-center last:border-r-0 transition duration-300 hover:bg-white/55">
      <Image
        src={item.image}
        alt={item.title}
        width={72}
        height={72}
        className="h-[clamp(16px,2.8vw,50px)] w-[clamp(16px,2.8vw,50px)] shrink-0 object-contain transition duration-300 group-hover:scale-105"
      />

      <div className="min-w-0 text-left">
        <h3 className="truncate text-[clamp(0.35rem,0.78vw,0.86rem)] font-black leading-tight text-[#2f1b12]">
          {item.title}
        </h3>

        <p className="mt-[clamp(1px,0.25vw,4px)] line-clamp-2 text-[clamp(0.28rem,0.58vw,0.68rem)] leading-tight text-[#6b5b4a]">
          {item.desc}
        </p>
      </div>
    </div>
  );
}