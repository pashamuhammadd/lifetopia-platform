import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { communityLinks, communityStats } from "@/data/community";

export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative overflow-hidden bg-[#fff7e8] px-[clamp(14px,6vw,96px)] py-[clamp(24px,4.2vw,58px)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[0.92fr_1.08fr] items-center gap-[clamp(12px,2.2vw,34px)]">
          <div>
            <span className="lt-badge px-[clamp(9px,1vw,16px)] py-[clamp(4px,0.45vw,7px)] text-[clamp(0.5rem,0.72vw,0.8rem)]">
              Community 🍃
            </span>

            <h2 className="lt-title mt-[clamp(8px,1vw,14px)] text-[clamp(1.25rem,3.35vw,3.7rem)] leading-tight">
              Join the Lifetopian Community
            </h2>

            <p className="mt-[clamp(6px,0.8vw,12px)] max-w-2xl text-[clamp(0.52rem,0.9vw,0.98rem)] font-semibold leading-[1.45] text-[#7a5635]">
              Be part of a growing cozy world where players, builders, creators,
              and early supporters shape the future of Lifetopia together.
            </p>

            <div className="mt-[clamp(10px,1.5vw,22px)] grid grid-cols-2 gap-[clamp(6px,0.8vw,12px)]">
              {communityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[clamp(12px,1.4vw,22px)] border border-white/80 bg-white/75 p-[clamp(7px,1vw,16px)] shadow-[0_10px_24px_rgba(88,60,28,0.09)]"
                >
                  <div className="text-[clamp(0.8rem,1.7vw,1.9rem)]">
                    {stat.icon}
                  </div>

                  <div className="mt-[clamp(2px,0.45vw,6px)] text-[clamp(0.72rem,1.8vw,1.95rem)] font-black text-[#4f8124]">
                    {stat.value}
                  </div>

                  <div className="text-[clamp(0.38rem,0.78vw,0.9rem)] font-black text-[#2f1b12]">
                    {stat.label}
                  </div>

                  <p className="mt-[clamp(2px,0.35vw,5px)] text-[clamp(0.3rem,0.62vw,0.72rem)] font-semibold leading-[1.35] text-[#6b5b4a]">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-white/80 bg-gradient-to-br from-[#f4fbdf] via-white to-[#fff3df] p-[clamp(9px,1.5vw,22px)] shadow-[0_18px_46px_rgba(88,60,28,0.13)]">
              <div className="absolute right-0 top-0 h-[clamp(70px,10vw,160px)] w-[clamp(70px,10vw,160px)] rounded-bl-full bg-[#8cc84b]/20 blur-2xl" />

              <div className="relative aspect-[16/9] overflow-hidden rounded-[clamp(12px,1.4vw,22px)] border border-[#d9c99f] bg-[#fffaf0]">
                <Image
                  src="/images/community/community-preview.png"
                  alt="Lifetopian community"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 mt-[clamp(8px,1vw,16px)] rounded-[clamp(12px,1.3vw,20px)] border border-[#d9c99f] bg-white/75 p-[clamp(8px,1vw,16px)]">
                <p className="text-[clamp(0.48rem,0.82vw,0.92rem)] font-black leading-[1.35] text-[#3a1f12]">
                  Together, we are not just playing a game.
                </p>
                <p className="mt-[clamp(2px,0.35vw,6px)] text-[clamp(0.56rem,1.05vw,1.15rem)] font-black leading-tight text-[#4f8124]">
                  We are building a living world.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(12px,1.7vw,26px)] grid grid-cols-4 gap-[clamp(6px,0.9vw,14px)]">
          {communityLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`group overflow-hidden rounded-[clamp(14px,1.5vw,24px)] shadow-[0_12px_28px_rgba(88,60,28,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.hover}`}
              >
                <div
                  className={`bg-gradient-to-r ${item.bg} p-[clamp(8px,1.1vw,16px)] text-white`}
                >
                  <div className="flex items-center gap-[clamp(6px,0.8vw,12px)]">
                    <div className="flex h-[clamp(26px,3vw,46px)] w-[clamp(26px,3vw,46px)] items-center justify-center rounded-full bg-white/15 backdrop-blur">
                      <Icon className="h-[clamp(14px,1.5vw,24px)] w-[clamp(14px,1.5vw,24px)]" />
                    </div>

                    <div>
                      <div className="text-[clamp(0.42rem,0.82vw,0.95rem)] font-black">
                        {item.label}
                      </div>

                      <div className="mt-[clamp(1px,0.2vw,3px)] text-[clamp(0.28rem,0.58vw,0.7rem)] font-semibold text-white/80">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white px-[clamp(8px,1vw,14px)] py-[clamp(5px,0.7vw,10px)]">
                  <span className="text-[clamp(0.28rem,0.58vw,0.7rem)] font-black text-[#5c4634]">
                    {item.footer}
                  </span>

                  <ArrowRight className="h-[clamp(10px,0.9vw,15px)] w-[clamp(10px,0.9vw,15px)] text-[#4f8124] transition group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}