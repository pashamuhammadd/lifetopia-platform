"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlayWarningModal } from "@/components/PlayWarningModal";

type ProductAccent = "green" | "purple" | "orange";

type ProductPreview = {
  label: string;
  domain: string;
  href: string;
  description: string;
  image: string;
  imagePosition: string;
  accent: ProductAccent;
  status: string;
  cta: string;
  featured?: boolean;
  opensModal?: boolean;
};

const products: ProductPreview[] = [
  {
    label: "Main Website",
    domain: "lifetopiaworld.io",
    href: "https://lifetopiaworld.io",
    description:
      "The official home of Lifetopia World, including project information, player accounts, and ecosystem access.",
    image: "/previews/main-website.jpg",
    imagePosition: "object-center",
    accent: "green",
    status: "Live",
    cta: "Visit Website",
  },
  {
    label: "Community Platform",
    domain: "community.lifetopiaworld.io",
    href: "https://community.lifetopiaworld.io",
    description:
      "A social platform where Lifetopians can create profiles, publish posts, discuss updates, and grow together.",
    image: "/previews/community-platform.png",
    imagePosition: "object-top",
    accent: "purple",
    status: "Live Beta",
    cta: "Open Community",
  },
  {
    label: "Playable Game",
    domain: "play.lifetopiaworld.io",
    href: "https://play.lifetopiaworld.io",
    description:
      "The playable Alpha build of Lifetopia World, featuring the early foundation of its cozy life-sim experience.",
    image: "/previews/playable-game.jpg",
    imagePosition: "object-center",
    accent: "orange",
    status: "Alpha",
    cta: "Play Alpha",
    featured: true,
    opensModal: true,
  },
];

function getAccentClasses(accent: ProductAccent) {
  if (accent === "purple") {
    return {
      iconBackground: "bg-[#eee7ff]",
      iconText: "text-[#7651d6]",
      status: "border-[#8267d8]/15 bg-[#eee8ff] text-[#7156c8]",
      button:
        "border-[#7651d6]/15 bg-[#7651d6] text-white hover:bg-[#6543c0]",
      glow: "bg-[#9a7cff]/18",
      line: "bg-[#8869dc]",
    };
  }

  if (accent === "orange") {
    return {
      iconBackground: "bg-[#fff0dc]",
      iconText: "text-[#d97813]",
      status: "border-[#e49324]/18 bg-[#fff0dc] text-[#c96c0c]",
      button:
        "border-[#d97813]/15 bg-[#d97813] text-white hover:bg-[#c96808]",
      glow: "bg-[#ffc968]/24",
      line: "bg-[#e28a1c]",
    };
  }

  return {
    iconBackground: "bg-[#e8f4d8]",
    iconText: "text-[#3f843a]",
    status: "border-[#4f8e3c]/15 bg-[#e8f4d8] text-[#3f7a34]",
    button:
      "border-[#33783c]/15 bg-[#33783c] text-white hover:bg-[#286532]",
    glow: "bg-[#9fd969]/22",
    line: "bg-[#559643]",
  };
}

function ProductIcon({
  accent,
}: {
  accent: ProductAccent;
}) {
  if (accent === "purple") {
    return <span aria-hidden="true">◉</span>;
  }

  if (accent === "orange") {
    return <span aria-hidden="true">◆</span>;
  }

  return <span aria-hidden="true">◎</span>;
}

export function ProjectSnapshot() {
  const [isPlayWarningOpen, setIsPlayWarningOpen] = useState(false);

  return (
    <>
      <section
        id="products"
        className="relative z-20 px-[clamp(0.6rem,2vw,1.3rem)] pb-[clamp(2.8rem,6vw,5rem)] pt-[clamp(1.5rem,3vw,2.6rem)]"
      >
        <div className="grants-container">
          <div className="grants-panel relative overflow-hidden p-[clamp(0.85rem,2.2vw,1.8rem)]">
            <div className="pointer-events-none absolute -right-[8%] -top-[32%] size-[clamp(9rem,22vw,18rem)] rounded-full bg-[#dff2bc]/45 blur-[clamp(2rem,5vw,4rem)]" />

            <div className="relative flex items-end justify-between gap-[clamp(0.7rem,2vw,1.4rem)]">
              <div>
                <span className="grants-eyebrow">
                  <span aria-hidden="true">🌿</span>
                  Lifetopia Ecosystem
                </span>

                <h2 className="mt-[clamp(0.6rem,1.3vw,0.9rem)] text-[clamp(1.25rem,3vw,2.4rem)] font-extrabold leading-[1] tracking-[-0.04em] text-[#172016]">
                  Live Products &amp; Ecosystem
                </h2>

                <p className="mt-[clamp(0.35rem,0.8vw,0.55rem)] text-[clamp(0.62rem,0.95vw,0.84rem)] font-medium text-[#6b6253]">
                  Explore the products already shaping the Lifetopia ecosystem.
                </p>
              </div>

              <Link
                href="#development"
                className="shrink-0 text-[clamp(0.55rem,0.86vw,0.76rem)] font-extrabold text-[#315f31] transition duration-200 hover:translate-x-1"
              >
                View development →
              </Link>
            </div>

            <div className="relative mt-[clamp(0.9rem,2vw,1.5rem)] flex snap-x snap-mandatory gap-[clamp(0.7rem,1.3vw,1rem)] overflow-x-auto pb-[clamp(0.4rem,0.8vw,0.6rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
              {products.map((product) => {
                const accent = getAccentClasses(product.accent);

                const cardContent = (
                  <article
                    className={[
                      "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[clamp(0.8rem,1.5vw,1.15rem)] border bg-[#fffdf7] shadow-[0_0.45rem_1.7rem_rgba(57,44,24,0.085)] transition duration-300 hover:-translate-y-[clamp(0.12rem,0.3vw,0.24rem)] hover:shadow-[0_1rem_2.8rem_rgba(57,44,24,0.14)]",
                      product.featured
                        ? "border-[#e39828]/35 ring-1 ring-[#e39828]/12"
                        : "border-[#755f3d]/12",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-[#5a4b35]/10 bg-[#e9e3d7]">
                      <Image
                        src={product.image}
                        alt={`${product.label} preview`}
                        fill
                        sizes="(max-width: 1024px) 78vw, 33vw"
                        className={`object-cover transition duration-500 group-hover:scale-[1.025] ${product.imagePosition}`}
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,32,21,0.18),transparent_45%)]" />

                      <div className="absolute inset-x-0 top-0 flex h-[clamp(1.1rem,1.8vw,1.4rem)] items-center gap-[clamp(0.12rem,0.25vw,0.2rem)] bg-white/88 px-[clamp(0.3rem,0.6vw,0.45rem)] backdrop-blur">
                        <span className="size-[clamp(0.18rem,0.3vw,0.24rem)] rounded-full bg-[#ff7474]" />
                        <span className="size-[clamp(0.18rem,0.3vw,0.24rem)] rounded-full bg-[#f3c85c]" />
                        <span className="size-[clamp(0.18rem,0.3vw,0.24rem)] rounded-full bg-[#78bd65]" />

                        <span className="ml-auto h-[clamp(0.14rem,0.25vw,0.2rem)] w-[34%] rounded-full bg-[#4c5a4b]/13" />
                      </div>

                      <span
                        className={`absolute bottom-[clamp(0.5rem,1vw,0.75rem)] left-[clamp(0.5rem,1vw,0.75rem)] rounded-full border px-[clamp(0.45rem,0.85vw,0.65rem)] py-[clamp(0.18rem,0.38vw,0.28rem)] text-[clamp(0.46rem,0.68vw,0.6rem)] font-extrabold shadow-sm backdrop-blur ${accent.status}`}
                      >
                        {product.status}
                      </span>

                      {product.featured ? (
                        <span className="absolute bottom-[clamp(0.5rem,1vw,0.75rem)] right-[clamp(0.5rem,1vw,0.75rem)] rounded-full border border-white/25 bg-[#173b24]/88 px-[clamp(0.45rem,0.85vw,0.65rem)] py-[clamp(0.18rem,0.38vw,0.28rem)] text-[clamp(0.44rem,0.66vw,0.58rem)] font-extrabold text-white shadow-sm backdrop-blur">
                          Core Product
                        </span>
                      ) : null}
                    </div>

                    <div className="relative flex flex-1 flex-col p-[clamp(0.75rem,1.5vw,1.1rem)]">
                      <div
                        className={`pointer-events-none absolute -right-[18%] -top-[35%] size-[45%] rounded-full blur-[clamp(1.4rem,3vw,2.5rem)] ${accent.glow}`}
                      />

                      <div className="relative flex min-w-0 items-start gap-[clamp(0.45rem,0.9vw,0.7rem)]">
                        <span
                          className={`flex size-[clamp(1.7rem,2.8vw,2.2rem)] shrink-0 items-center justify-center rounded-[clamp(0.45rem,0.8vw,0.65rem)] text-[clamp(0.7rem,1vw,0.9rem)] font-black ${accent.iconBackground} ${accent.iconText}`}
                        >
                          <ProductIcon accent={product.accent} />
                        </span>

                        <div className="min-w-0">
                          <h3 className="truncate text-[clamp(0.82rem,1.2vw,1.05rem)] font-extrabold leading-tight text-[#20281f]">
                            {product.label}
                          </h3>

                          <p className="mt-[clamp(0.08rem,0.2vw,0.15rem)] truncate text-[clamp(0.5rem,0.72vw,0.64rem)] font-semibold text-[#8a7f6c]">
                            {product.domain}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`relative mt-[clamp(0.55rem,1vw,0.75rem)] h-[clamp(0.12rem,0.2vw,0.16rem)] w-[clamp(1.4rem,2.3vw,1.8rem)] rounded-full ${accent.line}`}
                      />

                      <p className="relative mt-[clamp(0.5rem,1vw,0.75rem)] line-clamp-3 text-[clamp(0.58rem,0.85vw,0.76rem)] font-medium leading-[1.6] text-[#6b6253]">
                        {product.description}
                      </p>

                      <div className="relative mt-auto pt-[clamp(0.75rem,1.4vw,1rem)]">
                        <span
                          className={`inline-flex min-h-[clamp(2.4rem,3.8vw,2.9rem)] w-full items-center justify-center gap-[clamp(0.3rem,0.6vw,0.45rem)] rounded-[clamp(0.55rem,0.9vw,0.75rem)] border px-[clamp(0.7rem,1.3vw,1rem)] text-[clamp(0.58rem,0.82vw,0.72rem)] font-extrabold shadow-[0_0.6rem_1.5rem_rgba(55,42,24,0.08)] transition duration-200 group-hover:shadow-[0_0.9rem_2rem_rgba(55,42,24,0.12)] ${accent.button}`}
                        >
                          {product.cta}
                          <span aria-hidden="true">↗</span>
                        </span>
                      </div>
                    </div>
                  </article>
                );

                if (product.opensModal) {
                  return (
                    <button
                      key={product.label}
                      type="button"
                      onClick={() => setIsPlayWarningOpen(true)}
                      className="w-[clamp(16rem,78vw,22rem)] shrink-0 snap-start text-left lg:w-auto"
                      aria-label="Open Lifetopia Alpha warning"
                    >
                      {cardContent}
                    </button>
                  );
                }

                return (
                  <Link
                    key={product.label}
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-[clamp(16rem,78vw,22rem)] shrink-0 snap-start lg:w-auto"
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>

            <div className="relative mt-[clamp(0.8rem,1.7vw,1.2rem)] flex items-center justify-between gap-[clamp(0.55rem,1.2vw,0.9rem)] rounded-[clamp(0.65rem,1.1vw,0.9rem)] border border-[#5f724d]/12 bg-[#f4efe3]/80 px-[clamp(0.65rem,1.4vw,1rem)] py-[clamp(0.5rem,1vw,0.72rem)]">
              <div className="flex min-w-0 items-center gap-[clamp(0.4rem,0.8vw,0.6rem)]">
                <span className="flex size-[clamp(1.3rem,2vw,1.6rem)] shrink-0 items-center justify-center rounded-full bg-[#367d40] text-[clamp(0.55rem,0.78vw,0.68rem)] font-black text-white">
                  ✓
                </span>

                <div className="min-w-0">
                  <p className="truncate text-[clamp(0.58rem,0.88vw,0.76rem)] font-extrabold text-[#263526]">
                    One connected Lifetopia ecosystem
                  </p>

                  <p className="truncate text-[clamp(0.44rem,0.68vw,0.58rem)] font-medium text-[#817662]">
                    Website, community, and game built around one evolving
                    player experience.
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-[#174d29] px-[clamp(0.5rem,0.9vw,0.7rem)] py-[clamp(0.2rem,0.4vw,0.3rem)] text-[clamp(0.4rem,0.62vw,0.54rem)] font-extrabold text-white">
                Actively Building
              </span>
            </div>
          </div>
        </div>
      </section>

      <PlayWarningModal
        isOpen={isPlayWarningOpen}
        onClose={() => setIsPlayWarningOpen(false)}
      />
    </>
  );
}