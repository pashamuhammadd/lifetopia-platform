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
      { label: "Home", href: "/", icon: Home,},
      { label: "Explore", href: "/explore", icon: Compass },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Create Post", href: "/", icon: PenLine },
      { label: "Messages", href: "/messages", icon: MessageCircle },
      { label: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Player",
    items: [
      { label: "My World", href: "/my-world", icon: UserRound },
      { label: "Quest", href: "/quest", icon: Sparkles },
      { label: "Guild", href: "/guild", icon: Shield },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];