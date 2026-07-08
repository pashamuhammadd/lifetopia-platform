import {
  Backpack,
  Coins,
  Gem,
  Heart,
  MessageCircle,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";

export const topStats = [
  {
    id: "harmony",
    label: "Harmony",
    value: "24,530",
    helper: "+120 today",
    icon: Gem,
    tone: "green",
  },
  {
    id: "coin",
    label: "COIN",
    value: "12,500",
    helper: "Game currency",
    icon: Coins,
    tone: "gold",
  },
];

export const mainCards = [
  {
    id: "wallet",
    label: "Wallet",
    value: "Connected",
    helper: "Phantom",
    icon: Wallet,
    tone: "purple",
  },
  {
    id: "inventory",
    label: "Inventory",
    value: "8 / 24",
    helper: "Slots used",
    icon: Backpack,
    tone: "orange",
  },
  {
    id: "level",
    label: "Level",
    value: "27",
    helper: "8,250 / 12,000 XP",
    icon: Sparkles,
    tone: "blue",
  },
  {
    id: "achievement",
    label: "Achievement",
    value: "23 / 120",
    helper: "Unlocked",
    icon: Trophy,
    tone: "violet",
  },
  {
    id: "guild",
    label: "Guild",
    value: "Sky Farmers",
    helper: "Rank #8",
    icon: ShieldCheck,
    tone: "green",
  },
  {
    id: "quest",
    label: "Daily Quest",
    value: "0 / 1",
    helper: "+10 Harmony",
    icon: ScrollText,
    tone: "pink",
  },
];

export const activityItems = [
  {
    id: "1",
    name: "Pasha",
    action: "created a post",
    time: "2m ago",
    icon: ScrollText,
  },
  {
    id: "2",
    name: "Luna",
    action: "liked your update",
    time: "18m ago",
    icon: Heart,
  },
  {
    id: "3",
    name: "Sky Farmer",
    action: "commented on your post",
    time: "1h ago",
    icon: MessageCircle,
  },
];

export const communityStats = [
  { id: "posts", label: "Posts", value: "128" },
  { id: "comments", label: "Comments", value: "342" },
  { id: "likes", label: "Likes", value: "1,250" },
  { id: "harmony", label: "Harmony Earned", value: "8,530" },
];