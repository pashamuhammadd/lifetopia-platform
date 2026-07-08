import {
  Compass,
  House,
  Plus,
  Sparkles,
  UserRound,
} from "lucide-react";

const items = [
  {
    label: "Home",
    icon: House,
    active: true,
  },
  {
    label: "Explore",
    icon: Compass,
  },
  {
    label: "Post",
    icon: Plus,
    primary: true,
  },
  {
    label: "Quest",
    icon: Sparkles,
  },
  {
    label: "Profile",
    icon: UserRound,
  },
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <div className="flex items-center justify-between rounded-[26px] border border-[#ead9b8] bg-white/90 px-2 py-2 shadow-[0_18px_45px_rgba(88,60,28,0.18)] backdrop-blur">
        {items.map((item) => {
          const Icon = item.icon;

          if (item.primary) {
            return (
              <button
                key={item.label}
                className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#6fa83a] to-[#4f8124] text-white shadow-[0_12px_28px_rgba(79,129,36,0.32)] transition hover:scale-105"
              >
                <Icon size={24} strokeWidth={2.7} />
              </button>
            );
          }

          return (
            <button
              key={item.label}
              className={`flex min-w-[56px] flex-col items-center gap-1 rounded-2xl px-3 py-2 transition ${
                item.active
                  ? "text-[#4f8124]"
                  : "text-[#8b6c49] hover:text-[#4f8124]"
              }`}
            >
              <Icon
                size={21}
                strokeWidth={item.active ? 2.7 : 2.3}
              />

              <span className="text-[10px] font-black">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}