"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationGroups } from "@/data/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-5 space-y-5">
      {navigationGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9b6635]/70">
            {group.label}
          </p>

          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex w-full items-center justify-between rounded-[18px] px-3 py-3 text-left text-sm font-black transition ${
                    isActive
                      ? "bg-[#edf7df] text-[#4f8124] shadow-[0_10px_24px_rgba(111,168,58,0.16)]"
                      : "text-[#7a5635] hover:bg-[#fff7e8]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={2.5} />
                    <span>{item.label}</span>
                  </span>

                  {isActive ? <ChevronRight size={16} strokeWidth={2.7} /> : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}