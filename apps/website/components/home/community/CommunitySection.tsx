import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { communityLinks, communityStats } from "@/data/community";

export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative overflow-hidden bg-[#fff7e8] px-[clamp(14px,6vw,96px)] py-[clamp(34px,6vw,88px)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(16px,3vw,48px)]">
          <div>
            <span className="lt-badge px-[clamp(10px,1.2vw,18px)] py-[clamp(5px,0.55vw,8px)] text-[clamp(0.58rem,0.78vw,0.85rem)]">
              Community 🍃
            </span>

            <h2 className="lt-title mt-[clamp(10px,1.4vw,20px)] text-[clamp(1.45rem,4vw,4.5rem)] leading-tight">
              Join the Lifetopian Community
            </h2>

            <p className="mt-[clamp(8px,1.1vw,18px)] max-w-2xl text-[clamp(0.62rem,1.05vw,1.1rem)] font-semibold leading-[1.55] text-[#7a5635]">
              Be part of a growing cozy world where players, builders, creators,
              and early supporters shape the future of Lifetopia together.
            </p>

            <div className="mt-[clamp(16px,2vw,30px)] grid grid-cols-2 gap-[clamp(8px,1vw,16px)]">
              {communityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[clamp(16px,1.8vw,26px)] border border-white/80 bg-white/75 p-[clamp(10px,1.4vw,22px)] shadow-[0_14px_34px_rgba(88,60,28,0.1)]"
                >
                  <div className="text-[clamp(1rem,2.2vw,2.4rem)]">
                    {stat.icon}
                  </div>

                  <div className="mt-[clamp(4px,0.7vw,10px)] text-[clamp(0.9rem,2.3vw,2.4rem)] font-black text-[#4f8124]">
                    {stat.value}
                  </div>

                  <div className="text-[clamp(0.46rem,0.9vw,1rem)] font-black text-[#2f1b12]">
                    {stat.label}
                  </div>

                  <p className="mt-[clamp(3px,0.5vw,8px)] text-[clamp(0.36rem,0.75vw,0.82rem)] font-semibold leading-[1.4] text-[#6b5b4a]">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[clamp(22px,2.4vw,38px)] border border-white/80 bg-gradient-to-br from-[#f4fbdf] via-white to-[#fff3df] p-[clamp(12px,2vw,32px)] shadow-[0_22px_60px_rgba(88,60,28,0.14)]">
              <div className="absolute right-0 top-0 h-[clamp(90px,14vw,220px)] w-[clamp(90px,14vw,220px)] rounded-bl-full bg-[#8cc84b]/20 blur-2xl" />

              <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(16px,1.8vw,28px)] border border-[#d9c99f] bg-[#fffaf0]">
                <Image
                  src="/images/community/community-preview.png"
                  alt="Lifetopian community"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 mt-[clamp(12px,1.5vw,24px)] rounded-[clamp(16px,1.6vw,24px)] border border-[#d9c99f] bg-white/75 p-[clamp(10px,1.4vw,20px)]">
                <p className="text-[clamp(0.6rem,1vw,1.05rem)] font-black leading-[1.45] text-[#3a1f12]">
                  Together, we are not just playing a game.
                </p>
                <p className="mt-[clamp(3px,0.5vw,8px)] text-[clamp(0.7rem,1.35vw,1.4rem)] font-black leading-tight text-[#4f8124]">
                  We are building a living world.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(18px,2.4vw,36px)] grid grid-cols-4 gap-[clamp(8px,1.2vw,18px)]">
          {communityLinks.map((item) => {
            const Icon = item.icon;
           

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`group overflow-hidden rounded-[clamp(18px,2vw,28px)] shadow-[0_16px_38px_rgba(88,60,28,0.13)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${item.hover}`}
              >
                <div
                  className={`bg-gradient-to-r ${item.bg} p-[clamp(10px,1.5vw,22px)] text-white`}
                >
                  <div className="flex items-center gap-[clamp(8px,1vw,16px)]">
                    <div className="flex h-[clamp(34px,3.8vw,58px)] w-[clamp(34px,3.8vw,58px)] items-center justify-center rounded-full bg-white/15 backdrop-blur">
                      <Icon
  className="h-[clamp(18px,2vw,30px)] w-[clamp(18px,2vw,30px)]"
/>
                    </div>

                    <div>
                      <div className="text-[clamp(0.55rem,1vw,1.1rem)] font-black">
                        {item.label}
                      </div>

                      <div className="mt-[clamp(1px,0.3vw,4px)] text-[clamp(0.34rem,0.72vw,0.82rem)] font-semibold text-white/80">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white px-[clamp(10px,1.2vw,18px)] py-[clamp(7px,0.9vw,14px)]">
                  <span className="text-[clamp(0.34rem,0.72vw,0.82rem)] font-black text-[#5c4634]">
                    {item.footer}
                  </span>

                  <ArrowRight className="h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)] text-[#4f8124] transition group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}