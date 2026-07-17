"use client";

import { Compass, House, Plus, Sparkles, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { AuthenticatedLink } from "@/components/auth/AuthenticatedLink";

const items = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "Create",
    href: "/#create-post",
    icon: Plus,
    primary: true,
    requiresAuth: true,
  },
  {
    label: "Quest",
    href: "/quest",
    icon: Sparkles,
    requiresAuth: true,
  },
  {
    label: "My World",
    href: "/my-world",
    icon: UserRound,
    requiresAuth: true,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 md:hidden"
      aria-label="Mobile community navigation"
    >
      <div className="mx-auto flex max-w-md items-center justify-between rounded-[26px] border border-[#ead9b8] bg-white/92 px-2 py-2 shadow-[0_18px_45px_rgba(88,60,28,0.18)] backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href.startsWith("/#")
                ? false
                : pathname.startsWith(item.href);

          if (item.primary) {
            return (
              <AuthenticatedLink
                key={item.label}
                href={item.href}
                requiresAuth={item.requiresAuth}
                aria-label="Create a community post"
                className="-mt-8 flex size-14 items-center justify-center rounded-full border-4 border-[#fff7e8] bg-gradient-to-br from-[#6fa83a] to-[#4f8124] text-white shadow-[0_12px_28px_rgba(79,129,36,0.32)] transition hover:scale-105"
              >
                <Icon size={24} strokeWidth={2.7} />
              </AuthenticatedLink>
            );
          }

          return (
            <AuthenticatedLink
              key={item.label}
              href={item.href}
              requiresAuth={item.requiresAuth}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-[54px] flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
                isActive
                  ? "text-[#4f8124]"
                  : "text-[#8b6c49] hover:text-[#4f8124]"
              }`}
            >
              <Icon size={21} strokeWidth={isActive ? 2.7 : 2.3} />
              <span className="text-[10px] font-black">{item.label}</span>
            </AuthenticatedLink>
          );
        })}
      </div>
    </nav>
  );
}
