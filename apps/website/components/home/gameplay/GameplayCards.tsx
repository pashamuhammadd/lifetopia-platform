"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { gameplayIcons } from "@repo/data/homepage";

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

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[activeIndex] ?? [];

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      id="gameplay"
      className="relative z-20 bg-[#fff7e8] px-[clamp(14px,6vw,96px)] pb-[clamp(18px,2.5vw,36px)] pt-[clamp(28px,4vw,56px)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="lt-badge px-[clamp(10px,1.2vw,18px)] py-[clamp(5px,0.55vw,8px)] text-[clamp(0.58rem,0.78vw,0.85rem)]">
            What You Can Do 🍃
          </span>

          <h2 className="lt-title mt-[clamp(10px,1.4vw,20px)] text-[clamp(1.35rem,3vw,3.5rem)] leading-tight">
            Live Your Dream Life
          </h2>

          <p className="mx-auto mt-[clamp(6px,0.9vw,14px)] max-w-2xl text-[clamp(0.62rem,1vw,1rem)] font-semibold leading-[1.55] text-[#7a5635]">
            Enjoy meaningful activities in a world full of life, friendship,
            creativity, and magic.
          </p>
        </div>

        <div className="mt-[clamp(18px,2.4vw,34px)]">
          <div
            key={activeIndex}
            className="grid animate-[lifetopiaSlideIn_450ms_ease_both] grid-cols-5 gap-[clamp(6px,1.1vw,18px)]"
          >
            {activeSlide.map((item, index) => (
              <GameplayCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="mt-[clamp(14px,1.6vw,22px)] flex items-center justify-center gap-[clamp(8px,1vw,14px)]">
            <button
              type="button"
              onClick={prevSlide}
              className="h-[clamp(24px,2.2vw,36px)] w-[clamp(24px,2.2vw,36px)] rounded-full border border-white/70 bg-white/90 text-[clamp(14px,1.6vw,22px)] font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
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
              className="h-[clamp(24px,2.2vw,36px)] w-[clamp(24px,2.2vw,36px)] rounded-full border border-white/70 bg-white/90 text-[clamp(14px,1.6vw,22px)] font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
              aria-label="Next gameplay slide"
            >
              ›
            </button>
          </div>
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
  index: number;
};

const cardBackgrounds = [
  "from-[#f4fbdf] to-white",
  "from-[#eaf8ff] to-white",
  "from-[#fff3df] to-white",
  "from-[#eefaf1] to-white",
  "from-[#fff1f6] to-white",
];

function GameplayCard({ item, index }: GameplayCardProps) {
  return (
    <article
      className={`group flex min-h-[clamp(86px,12vw,178px)] flex-col items-center justify-center rounded-[clamp(14px,1.8vw,26px)] border border-white/80 bg-gradient-to-br ${
        cardBackgrounds[index % cardBackgrounds.length]
      } px-[clamp(5px,1vw,18px)] py-[clamp(8px,1.2vw,22px)] text-center shadow-[0_14px_34px_rgba(88,60,28,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9ed36d] hover:shadow-[0_18px_44px_rgba(88,60,28,0.18)]`}
    >
      <div className="flex h-[clamp(34px,5vw,84px)] w-[clamp(34px,5vw,84px)] items-center justify-center rounded-[clamp(12px,1.4vw,22px)] bg-white/70 shadow-inner">
        <Image
          src={item.image}
          alt={item.title}
          width={96}
          height={96}
          className="h-[clamp(28px,4.2vw,72px)] w-[clamp(28px,4.2vw,72px)] object-contain transition duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-[clamp(5px,0.9vw,14px)] text-[clamp(0.45rem,1vw,1.18rem)] font-black leading-tight text-[#2f1b12] transition group-hover:text-[#4f8124]">
        {item.title}
      </h3>

      <p className="mt-[clamp(2px,0.45vw,8px)] line-clamp-2 text-[clamp(0.34rem,0.7vw,0.78rem)] font-semibold leading-[1.35] text-[#6b5b4a]">
        {item.desc}
      </p>
    </article>
  );
}
