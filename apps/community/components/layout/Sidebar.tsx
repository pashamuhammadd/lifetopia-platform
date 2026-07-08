import { Progress } from "@/components/ui/Progress";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { navigationGroups } from "@/data/navigation";

export function Sidebar() {
  return (
    <aside className="hidden rounded-[28px] border border-[#ead9b8] bg-white/80 p-5 shadow-[0_18px_45px_rgba(88,60,28,0.12)] backdrop-blur md:block">
      <div className="flex items-center justify-center px-3 pb-4 pt-1">
  <Image
    src="/images/logo/logo-lifetopia-world.png"
    alt="Lifetopia World"
    width={132}
    height={88}
    priority
    className="h-auto w-[132px] object-contain drop-shadow-[0_8px_16px_rgba(47,36,24,0.16)]"
  />
</div>

      <div className="mt-5 rounded-[26px] border border-[#ead9b8] bg-[#fffaf0] p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4f8124] text-lg font-black text-white">
            P
          </div>

          <div className="min-w-0">
            <p className="truncate text-lg font-black text-[#2f2418]">Pasha</p>
            <p className="text-xs font-bold text-[#7a5635]">Founder</p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] bg-white/70 p-3">
          <div className="flex items-center justify-between text-xs font-black text-[#7a5635]">
            <span>Harmony Lv. 1</span>
            <span>240 / 500 XP</span>
          </div>

         <div className="mt-2">
  <Progress value={48} />
</div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#dfeec9] bg-[#edf7df] px-3 py-1 text-[11px] font-black text-[#4f8124]">
            Alpha Tester
          </span>
          <span className="rounded-full border border-[#ead9b8] bg-white/80 px-3 py-1 text-[11px] font-black text-[#9b6635]">
            Lifetopian
          </span>
        </div>
      </div>

      <nav className="mt-5 space-y-5">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9b6635]/70">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    className={`group flex w-full items-center justify-between rounded-[18px] px-3 py-3 text-left text-sm font-black transition ${
                      item.isActive
                        ? "bg-[#edf7df] text-[#4f8124] shadow-[0_10px_24px_rgba(111,168,58,0.16)]"
                        : "text-[#7a5635] hover:bg-[#fff7e8]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={2.5} />
                      <span>{item.label}</span>
                    </span>

                    {item.isActive ? (
                      <ChevronRight size={16} strokeWidth={2.7} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-5 rounded-[24px] border border-[#ead9b8] bg-gradient-to-br from-[#fff7e8] to-[#fff1d2] p-4">
        <p className="text-sm font-black text-[#2f2418]">Guild Spotlight</p>
        <p className="mt-1 text-xs font-bold leading-5 text-[#7a5635]">
          Join cozy guilds, complete quests, and grow together.
        </p>
        <button className="mt-3 rounded-full bg-[#4f8124] px-4 py-2 text-xs font-black text-white">
          Explore Guilds
        </button>
      </div>
    </aside>
  );
}