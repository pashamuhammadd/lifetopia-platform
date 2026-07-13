"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { PlayWarningModal } from "@/components/PlayWarningModal";
import { TechnologyIcon } from "@/components/TechnologyIcon";

type ProductAccent = "green" | "purple" | "orange";

type ProductItem = {
  title: string;
  domain: string;
  description: string;
  status: string;
  href: string;
  image: string;
  imagePosition: string;
  icon: string;
  accent: ProductAccent;
  opensWarning?: boolean;
};

const products: ProductItem[] = [
  {
    title: "Main Website",
    domain: "lifetopiaworld.io",
    description:
      "The official home for project information, ecosystem updates, and player access.",
    status: "Live",
    href: "https://lifetopiaworld.io",
    image: "/previews/main-website.jpg",
    imagePosition: "object-center",
    icon: "mdi:web",
    accent: "green",
  },
  {
    title: "Community Platform",
    domain: "community.lifetopiaworld.io",
    description:
      "A working social platform for player profiles, posts, comments, likes, and interaction.",
    status: "Live Beta",
    href: "https://community.lifetopiaworld.io",
    image: "/previews/community-platform.png",
    imagePosition: "object-top",
    icon: "mdi:account-group-outline",
    accent: "purple",
  },
  {
    title: "Playable Game",
    domain: "play.lifetopiaworld.io",
    description:
      "A publicly accessible Alpha build demonstrating the early gameplay foundation.",
    status: "Alpha Build",
    href: "https://play.lifetopiaworld.io",
    image: "/previews/playable-game.jpg",
    imagePosition: "object-center",
    icon: "mdi:gamepad-variant-outline",
    accent: "orange",
    opensWarning: true,
  },
];

function getAccentClasses(accent: ProductAccent) {
  if (accent === "purple") {
    return {
      card: "border-[#9982d7]/30 bg-[#faf8ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      badge: "border-[#d9cff1] bg-[#f2edff] text-[#674aab]",
      button: "bg-[#7454c8] text-white hover:bg-[#6444b8]",
      line: "bg-[#8c72d6]",
      glow: "bg-[#9b7de5]/16",
    };
  }

  if (accent === "orange") {
    return {
      card: "border-[#dfa052]/35 bg-[#fffaf3]",
      icon: "border-[#df9847]/20 bg-[#fff0df] text-[#b96b18]",
      badge: "border-[#edd0a9] bg-[#fff2df] text-[#ae6518]",
      button: "bg-[#d97813] text-white hover:bg-[#c96808]",
      line: "bg-[#e28a27]",
      glow: "bg-[#ffc968]/20",
    };
  }

  return {
    card: "border-[#76aa60]/30 bg-[#f8fcf5]",
    icon: "border-[#6da954]/20 bg-[#e7f4dd] text-[#4e8039]",
    badge: "border-[#d0e3c5] bg-[#edf7e7] text-[#477a34]",
    button: "bg-[#33783c] text-white hover:bg-[#286532]",
    line: "bg-[#67aa4b]",
    glow: "bg-[#9fd969]/20",
  };
}

function ProductCard({
  product,
}: {
  product: ProductItem;
}) {
  const accent = getAccentClasses(product.accent);

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.05rem] border shadow-[0_0.8rem_2.6rem_rgba(61,47,27,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.2rem_3.5rem_rgba(61,47,27,0.12)] ${accent.card}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-14 -top-14 size-40 rounded-full blur-3xl ${accent.glow}`}
      />

      <div className="relative aspect-[16/8.2] overflow-hidden border-b border-[#5a4b35]/10 bg-[#e9e3d7]">
        <Image
          src={product.image}
          alt={`${product.title} preview`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className={`object-cover transition duration-500 group-hover:scale-[1.025] ${product.imagePosition}`}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,37,23,0.32),transparent_58%)]" />

        <div className="absolute inset-x-0 top-0 flex h-6 items-center gap-1.5 bg-white/90 px-3 backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#ef7770]" />
          <span className="size-1.5 rounded-full bg-[#e9bd56]" />
          <span className="size-1.5 rounded-full bg-[#75bd62]" />

          <span className="ml-auto h-1.5 w-[28%] rounded-full bg-[#4c5a4b]/12" />
        </div>

        <span
          className={`absolute bottom-2.5 left-2.5 rounded-full border px-2.5 py-1 text-[clamp(0.66rem,0.74vw,0.8rem)] font-black shadow-sm backdrop-blur ${accent.badge}`}
        >
          {product.status}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-[clamp(0.85rem,1.35vw,1.1rem)]">
        <div className="flex items-start gap-3">
          <span
            className={`flex size-[clamp(2.45rem,3.6vw,3rem)] shrink-0 items-center justify-center rounded-[0.72rem] border ${accent.icon}`}
          >
            <TechnologyIcon
              icon={product.icon}
              label={product.title}
            />
          </span>

          <div className="min-w-0">
            <h3 className="text-[clamp(1rem,1.15vw,1.18rem)] font-black leading-[1.2] text-[#252c23]">
              {product.title}
            </h3>

            <p className="mt-1 break-all text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#887c68]">
              {product.domain}
            </p>
          </div>
        </div>

        <div className={`mt-3 h-[0.16rem] w-9 rounded-full ${accent.line}`} />

        <p className="mt-3 text-[clamp(0.78rem,0.88vw,0.94rem)] leading-[1.55] text-[#6b6253]">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <span
            className={`inline-flex min-h-[2.7rem] w-full items-center justify-center gap-2 rounded-[0.72rem] px-4 text-[clamp(0.74rem,0.84vw,0.9rem)] font-black shadow-[0_0.55rem_1.5rem_rgba(55,42,24,0.09)] transition duration-200 ${accent.button}`}
          >
            {product.opensWarning
              ? "Review Playable Alpha"
              : "Open Live Product"}

            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export function ProjectSnapshot() {
  const [isPlayWarningOpen, setIsPlayWarningOpen] =
    useState(false);

  return (
    <>
      <section
        id="products"
        className="relative flex overflow-hidden bg-[#f6efe1] py-[clamp(3rem,5vw,4.5rem)] lg:min-h-[calc(100svh-3.75rem)] lg:items-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8rem] top-[2rem] size-[20rem] rounded-full bg-[#e3f2d8]/60 blur-[7rem]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[1rem] right-[-9rem] size-[22rem] rounded-full bg-[#dceefa]/55 blur-[7rem]"
        />

        <div className="grants-container relative">
          <header className="max-w-[48rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Live Product Evidence
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[45rem] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Products reviewers can inspect today.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[43rem] text-[clamp(0.86rem,1vw,1.02rem)] leading-[1.6] text-[#706452]">
              Lifetopia already has a live website, working community
              platform, and publicly accessible playable Alpha build.
            </p>
          </header>

          <div className="mt-[clamp(1.25rem,2.4vw,2rem)] grid gap-[clamp(0.75rem,1.25vw,1rem)] md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              if (product.opensWarning) {
                return (
                  <button
                    key={product.title}
                    type="button"
                    onClick={() => {
                      setIsPlayWarningOpen(true);
                    }}
                    aria-label="Review the publicly playable Lifetopia Alpha build"
                    className="h-full w-full text-left"
                  >
                    <ProductCard product={product} />
                  </button>
                );
              }

              return (
                <Link
                  key={product.title}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${product.title}`}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <PlayWarningModal
        isOpen={isPlayWarningOpen}
        onClose={() => {
          setIsPlayWarningOpen(false);
        }}
      />
    </>
  );
}