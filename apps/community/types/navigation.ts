import type { LucideIcon } from "lucide-react";

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export type NavigationItem = {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
};