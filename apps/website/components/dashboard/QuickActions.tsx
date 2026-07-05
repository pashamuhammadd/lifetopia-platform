import Link from "next/link";
import type { QuickAction } from "@repo/types/dashboard";

type QuickActionsProps = {
  actions: QuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-4 gap-[clamp(0.5rem,1.5vw,1rem)]">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="rounded-[clamp(1rem,2vw,1.5rem)] border border-white/80 bg-white/75 p-[clamp(0.8rem,2vw,1.4rem)] shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
        >
          <p className="text-[clamp(0.85rem,1.2vw,1.1rem)] font-black text-[#2f1b12]">
            {action.title}
          </p>
          <p className="mt-1 text-[clamp(0.62rem,0.85vw,0.8rem)] leading-[1.5] text-[#7a5635]">
            {action.description}
          </p>
        </Link>
      ))}
    </div>
  );
}