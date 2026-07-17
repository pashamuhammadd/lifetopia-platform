import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
  status?: "in-preparation";
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};
