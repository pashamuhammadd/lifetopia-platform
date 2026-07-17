import {
  Bell,
  Compass,
  Home,
  MessageCircle,
  PenLine,
  Settings,
  Shield,
  Sparkles,
  UserRound,
} from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Home",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Explore", href: "/explore", icon: Compass },
    ],
  },
  {
    label: "Community",
    items: [
      {
        label: "Create Post",
        href: "/#create-post",
        icon: PenLine,
        requiresAuth: true,
      },
      {
        label: "Messages",
        href: "/messages",
        icon: MessageCircle,
        status: "in-preparation",
      },
      {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        requiresAuth: true,
      },
    ],
  },
  {
    label: "Player",
    items: [
      {
        label: "My World",
        href: "/my-world",
        icon: UserRound,
        requiresAuth: true,
      },
      {
        label: "Quest",
        href: "/quest",
        icon: Sparkles,
        requiresAuth: true,
      },
      { label: "Guild", href: "/guild", icon: Shield },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        requiresAuth: true,
      },
    ],
  },
];
