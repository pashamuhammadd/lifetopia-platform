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
      { label: "Home", icon: Home, isActive: true },
      { label: "Explore", icon: Compass },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Create Post", icon: PenLine },
      { label: "Messages", icon: MessageCircle },
      { label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Player",
    items: [
      { label: "My World", icon: UserRound },
      { label: "Quest", icon: Sparkles },
      { label: "Guild", icon: Shield },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", icon: Settings }],
  },
];