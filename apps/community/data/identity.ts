import {
  Crown,
  Gem,
  Hammer,
  Leaf,
  MessageCircleQuestion,
  Moon,
  Music,
  Palette,
  ScrollText,
  Shield,
  Sparkles,
  Sprout,
  Star,
  SunMoon,
  UsersRound,
  Wheat,
} from "lucide-react";

import type {
  LifetopiaRole,
  LifetopiaTitle,
  PostCategory,
} from "@/types/post";

export const roleStyles: Record<
  LifetopiaRole,
  {
    icon: typeof Crown;
    className: string;
  }
> = {
  "World Founder": {
    icon: Crown,
    className: "border-[#f1c96b] bg-[#fff4dc] text-[#9b6a12]",
  },
  "World Creator": {
    icon: Star,
    className: "border-[#e8c86b] bg-[#fff7dc] text-[#946b12]",
  },
  "World Guardian": {
    icon: Shield,
    className: "border-[#bfe7c3] bg-[#e9f8ea] text-[#2f7d3d]",
  },
  "World Builder": {
    icon: Hammer,
    className: "border-[#b9dcff] bg-[#e8f3ff] text-[#2f73c9]",
  },
  "World Artist": {
    icon: Palette,
    className: "border-[#f1c4df] bg-[#fff0f7] text-[#b23f7d]",
  },
  "Alpha Pioneer": {
    icon: Sparkles,
    className: "border-[#d9c7ff] bg-[#f3edff] text-[#6d4cc2]",
  },
  "Beta Pioneer": {
    icon: Sprout,
    className: "border-[#cdeca8] bg-[#f1fbdf] text-[#5d8f24]",
  },
  Steward: {
    icon: ScrollText,
    className: "border-[#e3c39c] bg-[#fff1dc] text-[#8a5a2b]",
  },
  Lifetopian: {
    icon: Leaf,
    className: "border-[#d8d0bf] bg-[#f8f3e8] text-[#6b5b4a]",
  },
};

export const titleStyles: Record<
  LifetopiaTitle,
  {
    icon: typeof Sparkles;
    className: string;
  }
> = {
  "Alpha Pioneer": {
    icon: Sparkles,
    className: "border-[#d9c7ff] bg-[#f3edff] text-[#6d4cc2]",
  },
  "Early Sprout": {
    icon: Sprout,
    className: "border-[#cdeca8] bg-[#f1fbdf] text-[#5d8f24]",
  },
  "The Dreamer": {
    icon: Moon,
    className: "border-[#c8d4ff] bg-[#eef2ff] text-[#4f63b6]",
  },
  "Master Farmer": {
    icon: Wheat,
    className: "border-[#ffd6a8] bg-[#fff0df] text-[#c06a1d]",
  },
  "Harmony Champion": {
    icon: Music,
    className: "border-[#ffc6dc] bg-[#fff0f6] text-[#c24174]",
  },
  "Genesis Holder": {
    icon: Gem,
    className: "border-[#aeefff] bg-[#e9fbff] text-[#16839b]",
  },
};

export const categoryStyles: Record<
  PostCategory,
  {
    icon: typeof Leaf;
    className: string;
  }
> = {
  "GM / GN": {
    icon: SunMoon,
    className: "border-[#ffe08a] bg-[#fff8d8] text-[#8f7114]",
  },
  General: {
    icon: Leaf,
    className: "border-[#d8d0bf] bg-[#f8f3e8] text-[#6b5b4a]",
  },
  Gameplay: {
    icon: Sparkles,
    className: "border-[#b9dcff] bg-[#e8f3ff] text-[#2f73c9]",
  },
  Community: {
    icon: UsersRound,
    className: "border-[#bfe7c3] bg-[#e9f8ea] text-[#2f7d3d]",
  },
  Question: {
    icon: MessageCircleQuestion,
    className: "border-[#ffd6a8] bg-[#fff0df] text-[#a65f1f]",
  },
  Guide: {
    icon: ScrollText,
    className: "border-[#e3c39c] bg-[#fff1dc] text-[#8a5a2b]",
  },
  "Looking for Friends": {
    icon: UsersRound,
    className: "border-[#ffc6dc] bg-[#fff0f6] text-[#b33d68]",
  },
  Development: {
    icon: Hammer,
    className: "border-[#c5e0ff] bg-[#e8f3ff] text-[#2f73c9]",
  },
  Events: {
    icon: Star,
    className: "border-[#d9c7ff] bg-[#f3edff] text-[#6d4cc2]",
  },
};

export function resolveLifetopiaRole(
  role: string | null | undefined,
): LifetopiaRole {
  switch (role?.trim().toLowerCase()) {
    case "founder":
      return "World Founder";
    case "admin":
      return "World Creator";
    case "moderator":
      return "World Guardian";
    case "developer":
      return "World Builder";
    case "artist":
      return "World Artist";
    case "alpha_tester":
      return "Alpha Pioneer";
    case "beta_tester":
      return "Beta Pioneer";
    case "steward":
      return "Steward";
    default:
      return "Lifetopian";
  }
}
