import {
  Crown,
  Gem,
  Hammer,
  Leaf,
  Moon,
  Music,
  Shield,
  Sparkles,
  Sprout,
  ScrollText,
  Wheat,
} from "lucide-react";

import type {
  LifetopiaRole,
  LifetopiaTitle,
  PostCategory,
} from "@/types/post";


export const roleStyles: Record<LifetopiaRole, {
  icon: typeof Crown;
  className: string;
}> = {
  "World Creator": {
    icon: Crown,
    className:
      "border-[#f1c96b] bg-[#fff4dc] text-[#9b6a12]",
  },
  "World Builder": {
    icon: Hammer,
    className:
      "border-[#b9dcff] bg-[#e8f3ff] text-[#2f73c9]",
  },
  Guardian: {
    icon: Shield,
    className:
      "border-[#bfe7c3] bg-[#e9f8ea] text-[#2f7d3d]",
  },
  Steward: {
    icon: ScrollText,
    className:
      "border-[#e3c39c] bg-[#fff1dc] text-[#8a5a2b]",
  },
  Lifetopian: {
    icon: Leaf,
    className:
      "border-[#d8d0bf] bg-[#f8f3e8] text-[#6b5b4a]",
  },
};

export const titleStyles: Record<LifetopiaTitle, {
  icon: typeof Sparkles;
  className: string;
}> = {
  "Alpha Pioneer": {
    icon: Sparkles,
    className:
      "border-[#d9c7ff] bg-[#f3edff] text-[#6d4cc2]",
  },
  "Early Sprout": {
    icon: Sprout,
    className:
      "border-[#cdeca8] bg-[#f1fbdf] text-[#5d8f24]",
  },
  "The Dreamer": {
    icon: Moon,
    className:
      "border-[#c8d4ff] bg-[#eef2ff] text-[#4f63b6]",
  },
  "Master Farmer": {
    icon: Wheat,
    className:
      "border-[#ffd6a8] bg-[#fff0df] text-[#c06a1d]",
  },
  "Harmony Champion": {
    icon: Music,
    className:
      "border-[#ffc6dc] bg-[#fff0f6] text-[#c24174]",
  },
  "Genesis Holder": {
    icon: Gem,
    className:
      "border-[#aeefff] bg-[#e9fbff] text-[#16839b]",
  },
};

export const categoryStyles: Record<
  PostCategory,
  {
    className: string;
  }
> = {
  General: {
    className: "border-[#d8d0bf] bg-[#f8f3e8] text-[#6b5b4a]",
  },
  "GM/GN": {
    className: "border-[#ffe08a] bg-[#fff8d8] text-[#9b7a12]",
  },
  Announcement: {
    className: "border-[#ffd0a8] bg-[#fff1e6] text-[#c25a1d]",
  },
  "Developer Log": {
    className: "border-[#c5e0ff] bg-[#e8f3ff] text-[#2f73c9]",
  },
  Suggestion: {
    className: "border-[#c8e6a4] bg-[#edf7df] text-[#4f8124]",
  },
  Event: {
    className: "border-[#d9c7ff] bg-[#f3edff] text-[#6d4cc2]",
  },
};