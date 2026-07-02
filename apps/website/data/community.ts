import {
  FaDiscord,
  FaGithub,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

import type { CommunityLink, CommunityStat } from "@/types/community";

export const communityStats: CommunityStat[] = [
  {
    icon: "👥",
    value: "12,482",
    label: "Registered Players",
    desc: "Lifetopians who have joined our world.",
  },
  {
    icon: "⭐",
    value: "100",
    label: "Alpha Testers",
    desc: "Early believers shaping Lifetopia's future.",
  },
  {
    icon: "🏆",
    value: "4,125",
    label: "Daily Quests Completed",
    desc: "Missions completed by the community.",
  },
  {
    icon: "🍃",
    value: "98,451",
    label: "Resources Gathered",
    desc: "Shared progress toward a living world.",
  },
];

export const communityLinks: CommunityLink[] = [
  {
    label: "Join Discord",
    value: "Community Server",
    href: "https://discord.gg/WeKtqJMcfb",
    icon: FaDiscord,
    bg: "from-[#5865F2] to-[#4752C4]",
    hover: "hover:shadow-[#5865F2]/40",
    footer: "Community Chat",
  },
  {
    label: "Follow on X",
    value: "@LifetopiaWorld",
    href: "https://x.com/LifetopiaWorld",
    icon: FaXTwitter,
    bg: "from-[#222222] to-[#000000]",
    hover: "hover:shadow-black/30",
    footer: "Latest Updates",
  },
  {
    label: "Join Telegram",
    value: "Lifetopia Community",
    href: "https://t.me/LifetopiaWorldCommunity",
    icon: FaTelegram,
    bg: "from-[#2AABEE] to-[#229ED9]",
    hover: "hover:shadow-[#2AABEE]/40",
    footer: "Community News",
  },
  {
    label: "View GitHub",
    value: "Development Logs",
    href: "https://github.com/pashamuhammadd/lifetopia-platform",
    icon: FaGithub,
    bg: "from-[#2d2d2d] to-[#000000]",
    hover: "hover:shadow-black/30",
    footer: "Source Code",
  },
];