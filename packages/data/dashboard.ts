import type { DashboardStat, QuickAction } from "@repo/types/dashboard";

export const dashboardStats: DashboardStat[] = [
  {
    label: "Level",
    value: "1",
    description: "Your player level",
  },
  {
    label: "COIN",
    value: "0",
    description: "Earned in-game currency",
  },
  {
    label: "GOLD",
    value: "0",
    description: "Premium Lifetopia currency",
  },
  {
    label: "Harmony",
    value: "0",
    description: "Community contribution points",
  },
];

export const quickActions: QuickAction[] = [
  {
    title: "Play Game",
    description: "Enter Lifetopia World.",
    href: "/play",
  },
  {
    title: "Inventory",
    description: "View your collected items.",
    href: "/dashboard/inventory",
  },
  {
    title: "Wallet",
    description: "Connect Phantom or Solflare.",
    href: "/dashboard/wallet",
  },
  {
    title: "Forum",
    description: "Join the Lifetopian community.",
    href: "/forum",
  },
];