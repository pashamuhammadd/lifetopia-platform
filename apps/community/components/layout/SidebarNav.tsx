"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { AuthenticatedLink } from "@/components/auth/AuthenticatedLink";
import { navigationGroups } from "@/data/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-5 space-y-5" aria-label="Community navigation">
      {navigationGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9b6635]/70">
            {group.label}
          </p>

          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href.startsWith("/#")
                    ? false
                    : pathname.startsWith(item.href);

              return (
                <AuthenticatedLink
                  key={item.label}
                  href={item.href}
                  requiresAuth={item.requiresAuth}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex min-h-11 w-full items-center justify-between rounded-[18px] px-3 py-2.5 text-left text-sm font-black transition ${
                    isActive
                      ? "bg-[#edf7df] text-[#4f8124] shadow-[0_10px_24px_rgba(111,168,58,0.16)]"
                      : "text-[#7a5635] hover:bg-[#fff7e8]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon size={18} strokeWidth={2.5} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>

                  {item.status === "in-preparation" ? (
                    <span className="ml-2 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-[#9b6635]">
                      Soon
                    </span>
                  ) : isActive ? (
                    <ChevronRight size={16} strokeWidth={2.7} />
                  ) : null}
                </AuthenticatedLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
