import type { AccountFeature, AccountPreviewUser } from "@/types/account";

export const mockAccountUser: AccountPreviewUser = {
  displayName: "Lifetopian",
  avatar: "/images/logo/logo-lifetopia-world.png",
  level: 24,
  role: "Adventurer",
  progress: 68,
  stats: [
    { label: "Level", value: 24 },
    { label: "Harmony Points", value: "12.5K" },
    { label: "Achievements", value: 18 },
    { label: "Friends", value: 124 },
  ],
};

export const accountFeatures: AccountFeature[] = [
  {
    icon: "👤",
    title: "Profile",
    desc: "Manage your Lifetopian identity.",
  },
  {
    icon: "🎒",
    title: "Inventory",
    desc: "View items, cosmetics, and rewards.",
  },
  {
    icon: "📜",
    title: "Quests",
    desc: "Track missions and daily activities.",
  },
  {
    icon: "🪙",
    title: "Wallet",
    desc: "Connect wallet, GOLD, and NFTs.",
  },
];