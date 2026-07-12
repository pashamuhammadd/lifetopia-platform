"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { PlayWarningModal } from "@/components/PlayWarningModal";

type ProductAccent = "green" | "purple" | "orange";

type ProductItem = {
  title: string;
  domain: string;
  description: string;
  status: string;
  statusDetail: string;
  href: string;
  image: string;
  imagePosition: string;
  accent: ProductAccent;
  opensWarning?: boolean;
};

const products: ProductItem[] = [
  {
    title: "Main Website",
    domain: "lifetopiaworld.io",
    description:
      "The official public home for project information, player access, ecosystem updates, and Lifetopia World announcements.",
    status: "Live",
    statusDetail: "Publicly accessible",
    href: "https://lifetopiaworld.io",
    image: "/previews/main-website.jpg",
    imagePosition: "object-center",
    accent: "green",
  },
  {
    title: "Community Platform",
    domain: "community.lifetopiaworld.io",
    description:
      "A working social platform where players can create profiles, publish posts, comment, react, and follow the project.",
    status: "Live Beta",
    statusDetail: "Core social features active",
    href: "https://community.lifetopiaworld.io",
    image: "/previews/community-platform.png",
    imagePosition: "object-top",
    accent: "purple",
  },
  {
    title: "Playable Game",
    domain: "play.lifetopiaworld.io",
    description:
      "The publicly accessible Alpha build demonstrating the early gameplay, world, and life-simulation foundation.",
    status: "Alpha Build",
    statusDetail: "Publicly playable",
    href: "https://play.lifetopiaworld.io",
    image: "/previews/playable-game.jpg",
    imagePosition: "object-center",
    accent: "orange",
    opensWarning: true,
  },
];

function getAccentClasses(accent: ProductAccent) {
  if (accent === "purple") {
    return {
      border: "border-[#9278d7]/25",
      icon: "border-[#9178d5]/20 bg-[#eee9ff] text-[#6c4fb2]",
      status: "border-[#d9cff1] bg-[#f2edff] text-[#674aab]",
      button: "bg-[#7651d6] text-white hover:bg-[#6543c0]",
      line: "bg-[#8c72d6]",
      glow: "bg-[#9a7cff]/18",
    };
  }

  if (accent === "orange") {
    return {
      border: "border-[#df9d4d]/30",
      icon: "border-[#dc9b49]/20 bg-[#fff0df] text-[#b86b18]",
      status: "border-[#edd0a9] bg-[#fff2df] text-[#ae6518]",
      button: "bg-[#d97813] text-white hover:bg-[#c96808]",
      line: "bg-[#e28a27]",
      glow: "bg-[#ffc968]/22",
    };
  }

  return {
    border: "border-[#75aa5d]/25",
    icon: "border-[#6da954]/20 bg-[#e7f4dd] text-[#4e8039]",
    status: "border-[#d0e3c5] bg-[#edf7e7] text-[#477a34]",
    button: "bg-[#33783c] text-white hover:bg-[#286532]",
    line: "bg-[#67aa4b]",
    glow: "bg-[#9fd969]/22",
  };
}

function ProductSymbol({
  accent,
}: {
  accent: ProductAccent;
}) {
  if (accent === "purple") {
    return <span aria-hidden="true">●</span>;
  }

  if (accent === "orange") {
    return <span aria-hidden="true">◆</span>;
  }

  return <span aria-hidden="true">◎</span>;
}

function ProductCardContent({
  product,
}: {
  product: ProductItem;
}) {
  const accent = getAccentClasses(product.accent);

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border bg-white shadow-[0_0.9rem_3rem_rgba(61,47,27,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.3rem_3.8rem_rgba(61,47,27,0.12)] ${accent.border}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[#5a4b35]/10 bg-[#e9e3d7]">
        <Image
          src={product.image}
          alt={`${product.title} product preview`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className={`object-cover transition duration-500 group-hover:scale-[1.025] ${product.imagePosition}`}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,37,23,0.3),transparent_55%)]" />

        <div className="absolute inset-x-0 top-0 flex h-7 items-center gap-1.5 bg-white/90 px-3 backdrop-blur">
          <span className="size-2 rounded-full bg-[#ef7770]" />
          <span className="size-2 rounded-full bg-[#e9bd56]" />
          <span className="size-2 rounded-full bg-[#75bd62]" />

          <span className="ml-auto h-1.5 w-[32%] rounded-full bg-[#4c5a4b]/12" />
        </div>

        <span
          className={`absolute bottom-3 left-3 rounded-full border px-3 py-1.5 text-[clamp(0.7rem,0.8vw,0.84rem)] font-black shadow-sm backdrop-blur ${accent.status}`}
        >
          {product.status}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-[clamp(1rem,1.7vw,1.35rem)]">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-12 -top-12 size-36 rounded-full blur-3xl ${accent.glow}`}
        />

        <div className="relative flex items-start gap-3">
          <span
            className={`flex size-[clamp(2.7rem,4vw,3.3rem)] shrink-0 items-center justify-center rounded-[clamp(0.65rem,1vw,0.85rem)] border text-[clamp(0.95rem,1.3vw,1.15rem)] font-black ${accent.icon}`}
          >
            <ProductSymbol accent={product.accent} />
          </span>

          <div className="min-w-0">
            <h3 className="text-[clamp(1.05rem,1.3vw,1.3rem)] font-black leading-[1.25] text-[#252c23]">
              {product.title}
            </h3>

            <p className="mt-1 break-all text-[clamp(0.72rem,0.82vw,0.88rem)] font-bold text-[#887c68]">
              {product.domain}
            </p>
          </div>
        </div>

        <div
          className={`relative mt-4 h-[0.18rem] w-10 rounded-full ${accent.line}`}
        />

        <p className="relative mt-4 text-[clamp(0.86rem,0.96vw,1.02rem)] leading-[1.65] text-[#6b6253]">
          {product.description}
        </p>

        <div className="relative mt-4 flex items-center gap-2 rounded-[0.75rem] border border-[#dfd5c0] bg-[#faf7f0] px-3 py-2.5">
          <span className="size-2 shrink-0 rounded-full bg-[#68ad4a]" />

          <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-bold text-[#64715c]">
            {product.statusDetail}
          </p>
        </div>

        <div className="relative mt-auto pt-5">
          <span
            className={`inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-[0.8rem] px-4 text-[clamp(0.78rem,0.88vw,0.94rem)] font-black shadow-[0_0.7rem_1.8rem_rgba(55,42,24,0.1)] transition duration-200 ${accent.button}`}
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
        className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8rem] top-[2rem] size-[22rem] rounded-full bg-[#e3f2d8]/60 blur-[7rem]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[1rem] right-[-9rem] size-[24rem] rounded-full bg-[#dceefa]/55 blur-[7rem]"
        />

        <div className="grants-container relative">
          <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
                <span className="size-2 rounded-full bg-[#68ad4a]" />
                Live Product Evidence
              </span>

              <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
                Lifetopia already has products reviewers can inspect.
              </h2>

              <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
                The project is supported by a live website, a working community
                platform, and a publicly accessible playable Alpha build.
              </p>
            </div>

            <Link
              href="#public-development"
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] border border-[#d4c6a8] bg-white px-5 text-[clamp(0.78rem,0.88vw,0.94rem)] font-black text-[#477a38] shadow-[0_0.7rem_2rem_rgba(62,47,27,0.07)] transition hover:-translate-y-0.5 hover:border-[#86ad71]"
            >
              View Development Evidence
              <span aria-hidden="true">↓</span>
            </Link>
          </header>

          <div className="mt-[clamp(2rem,4vw,3.2rem)] grid gap-[clamp(0.85rem,1.6vw,1.2rem)] md:grid-cols-2 xl:grid-cols-3">
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
                    className="h-full text-left"
                  >
                    <ProductCardContent product={product} />
                  </button>
                );
              }

              return (
                <Link
                  key={product.title}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-full"
                  aria-label={`Open ${product.title}`}
                >
                  <ProductCardContent product={product} />
                </Link>
              );
            })}
          </div>

          <footer className="mt-[clamp(1rem,2vw,1.5rem)] flex flex-col gap-4 rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d7c8a8] bg-[#173b21] p-[clamp(1rem,1.8vw,1.5rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.15)] sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[48rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
                Existing Product Foundation
              </p>

              <p className="mt-2 text-[clamp(0.9rem,1vw,1.06rem)] font-semibold leading-[1.65] text-white/72">
                Grant funding will expand and connect existing products rather
                than finance an untested concept from zero.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2">
              <div className="rounded-[0.75rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-[clamp(1.15rem,1.5vw,1.4rem)] font-black text-[#afe794]">
                  3
                </p>

                <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-white/45">
                  Public Products
                </p>
              </div>

              <div className="rounded-[0.75rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-[clamp(1.15rem,1.5vw,1.4rem)] font-black text-[#afe794]">
                  Active
                </p>

                <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-white/45">
                  Development
                </p>
              </div>
            </div>
          </footer>
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