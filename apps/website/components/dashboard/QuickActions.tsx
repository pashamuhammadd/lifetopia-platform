import Link from "next/link";
import type { QuickAction } from "@repo/types/dashboard";

type QuickActionsProps = {
  actions: QuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section>
      <div className="mb-[clamp(8px,1vw,14px)]">
        <h2 className="text-[clamp(1rem,1.8vw,2rem)] font-black text-[#2f1b12]">
          Quick Actions
        </h2>
        <p className="text-[clamp(0.62rem,0.85vw,0.9rem)] font-semibold text-[#7a5635]">
          Core platform features that will grow with the game.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-[clamp(8px,1.2vw,16px)] max-sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group relative overflow-hidden rounded-[clamp(16px,2vw,28px)] border border-white/80 bg-white/75 p-[clamp(11px,1.6vw,22px)] shadow-[0_14px_34px_rgba(88,60,28,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9ed36d] hover:bg-white hover:shadow-[0_20px_44px_rgba(88,60,28,0.15)]"
          >
            <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-[#8cc84b]/12 blur-xl" />

            <div className="relative z-10">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex h-[clamp(34px,4vw,46px)] w-[clamp(34px,4vw,46px)] items-center justify-center rounded-2xl bg-[#fff8e8] text-[clamp(1rem,1.5vw,1.4rem)] shadow-sm">
                  ✦
                </div>

                <span className="rounded-full border border-[#d9c99f] bg-[#fff7e8] px-2.5 py-1 text-[clamp(0.48rem,0.65vw,0.68rem)] font-black text-[#7a5635]">
                  Soon
                </span>
              </div>

              <p className="text-[clamp(0.78rem,1vw,1.05rem)] font-black text-[#2f1b12] transition group-hover:text-[#4f8124]">
                {action.title}
              </p>

              <p className="mt-1 text-[clamp(0.54rem,0.75vw,0.78rem)] font-semibold leading-[1.5] text-[#7a5635]">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}