import {
  Bell,
  MessageCircle,
  Smartphone,
  Sparkles,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { communityFeatures } from "@repo/data/community";
import type {
  CommunityFeatureIcon,
} from "@repo/types/community";

const communityUrl =
  "https://community.lifetopiaworld.io";

const registerHref = `/register?next=${encodeURIComponent(
  communityUrl,
)}`;

const featureIcons: Record<
  CommunityFeatureIcon,
  LucideIcon
> = {
  discussion: MessageCircle,
  profile: UserRound,
  updates: Bell,
  social: UsersRound,
};

export function CommunitySection() {
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#eef9ff_0%,#f4faeb_52%,#fff7e8_100%)] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[-7rem] size-[22rem] rounded-full bg-[#86d8f4]/25 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-[-6rem] size-[24rem] rounded-full bg-[#99d66f]/22 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(79,129,36,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(79,129,36,0.16)_1px,transparent_1px)] [background-size:3rem_3rem]"
      />

      <div className="lt-container relative">
        <div className="grid gap-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-center">
          <div className="min-w-0">
            <span className="lt-badge border-[#b9d9ae] bg-white/80 text-[#4f7e3a]">
              <span className="size-1.5 rounded-full bg-[#6fac4f]" />
              Lifetopian Community
            </span>

            <h2
              id="community-title"
              className="lt-section-title mt-3 max-w-[17ch]"
            >
              A shared place for every Lifetopian.
            </h2>

            <p className="lt-section-copy mt-3 max-w-[40rem]">
              The Lifetopia Community connects players beyond the
              game through discussions, public profiles, development
              updates, and a shared identity that grows with the world.
            </p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {communityFeatures.map((feature, index) => {
                const Icon = featureIcons[feature.icon];

                return (
                  <article
                    key={feature.title}
                    className="lt-animate-fade-up group rounded-[clamp(0.85rem,1.3vw,1.1rem)] border border-[#cbdcc1] bg-white/72 p-[clamp(0.85rem,1.25vw,1rem)] shadow-[0_0.7rem_2rem_rgba(64,94,50,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#9fc38d] hover:bg-white"
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#c8dfbc] bg-[#edf7e7] text-[#4f8124] transition group-hover:scale-105">
                        <Icon className="size-5" />
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-[clamp(0.88rem,1vw,1rem)] font-black leading-[1.3] text-[#33261b]">
                          {feature.title}
                        </h3>

                        <p className="mt-1.5 text-[clamp(0.76rem,0.86vw,0.88rem)] leading-[1.55] text-[#716453]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={communityUrl}
                className="lt-button-primary min-h-11 px-[clamp(1.2rem,2vw,1.6rem)] text-[clamp(0.78rem,0.88vw,0.9rem)]"
              >
                Explore Community
              </Link>

              <Link
                href={registerHref}
                className="lt-button-secondary min-h-11 px-[clamp(1.2rem,2vw,1.6rem)] text-[clamp(0.78rem,0.88vw,0.9rem)]"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(135deg,rgba(125,211,252,0.24),rgba(143,205,91,0.2))] blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[clamp(1rem,1.8vw,1.45rem)] border border-white/80 bg-white/78 p-[clamp(0.75rem,1.3vw,1rem)] shadow-[0_1.4rem_4rem_rgba(66,91,53,0.14)] backdrop-blur-xl">
              <header className="flex items-center justify-between gap-4 px-1 pb-3">
                <div>
                  <p className="text-[clamp(0.68rem,0.76vw,0.8rem)] font-black uppercase tracking-[0.1em] text-[#5f8050]">
                    Community Platform
                  </p>

                  <p className="mt-1 text-[clamp(0.82rem,0.94vw,0.98rem)] font-black text-[#35291f]">
                    A living social space for players
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c7dcb9] bg-[#edf7e7] px-3 py-1.5 text-[clamp(0.62rem,0.7vw,0.74rem)] font-black text-[#537b43]">
                  <span className="size-1.5 rounded-full bg-[#69ad4c]" />
                  Live
                </span>
              </header>

              <div className="relative aspect-[16/9] overflow-hidden rounded-[clamp(0.8rem,1.3vw,1.05rem)] border border-[#d2dfc9] bg-[#f5faef]">
                <Image
                  src="/images/community/community-preview.png"
                  alt="Preview of the Lifetopia Community Platform"
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                <div className="rounded-xl border border-[#d5e1cd] bg-[#f8fcf5] px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-[#609144]" />

                    <p className="text-[clamp(0.72rem,0.82vw,0.86rem)] font-black text-[#3e5635]">
                      One account, one identity
                    </p>
                  </div>

                  <p className="mt-1.5 text-[clamp(0.68rem,0.76vw,0.8rem)] leading-[1.5] text-[#756956]">
                    Your Lifetopia account connects the website,
                    community, My World, and future game progress.
                  </p>
                </div>

                <div className="flex min-w-[8rem] flex-col justify-center rounded-xl border border-[#c9dfea] bg-[#eef8fd] px-3.5 py-3">
                  <div className="flex items-center gap-2 text-[#347ca6]">
                    <Smartphone className="size-4" />

                    <p className="text-[clamp(0.66rem,0.74vw,0.78rem)] font-black uppercase tracking-[0.07em]">
                      Android App
                    </p>
                  </div>

                  <p className="mt-1.5 text-[clamp(0.72rem,0.8vw,0.84rem)] font-black text-[#54768c]">
                    In Preparation
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-[#e0d4bd] bg-[#fffaf0] px-3.5 py-2.5">
                <p className="text-[clamp(0.7rem,0.8vw,0.84rem)] font-bold text-[#6d604f]">
                  Together, we are building a living world.
                </p>

                <span
                  aria-hidden="true"
                  className="ml-3 size-2 shrink-0 rounded-full bg-[#6fac4f] shadow-[0_0_1rem_rgba(111,172,79,0.55)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}