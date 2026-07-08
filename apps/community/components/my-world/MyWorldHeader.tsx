import Image from "next/image";
import { Bell } from "lucide-react";

import { MyWorldStatCard } from "./MyWorldStatCard";
import { topStats } from "@/data/my-world-layout";

export function MyWorldHeader() {
  return (
    <header className="mb-4">
      <div className="mb-4 flex items-center justify-between md:hidden">
        <Image
          src="/images/logo/logo-lifetopia-world.png"
          alt="Lifetopia World"
          width={92}
          height={61}
          priority
          className="h-auto w-[92px] object-contain"
        />

        <button className="relative grid size-10 place-items-center rounded-full bg-white/80 text-[#7a5635]">
          <Bell size={20} />
          <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-[#e85d4a] text-[10px] font-black text-white">
            3
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[clamp(1.65rem,3vw,2.25rem)] font-black text-[#2f2418]">
            My World
          </h1>
          <p className="text-sm font-bold text-[#7a5635]">
            Your Lifetopia identity and progress.
          </p>
        </div>

        <div className="hidden grid-cols-2 gap-3 md:grid md:w-[420px]">
          {topStats.map((stat) => (
            <MyWorldStatCard key={stat.id} {...stat} compact />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
        {topStats.map((stat) => (
          <MyWorldStatCard key={stat.id} {...stat} compact />
        ))}
      </div>
    </header>
  );
}