"use client";

import { Icon } from "@iconify/react";

type TechnologyIconProps = {
  icon: string;
  label: string;
};

export function TechnologyIcon({
  icon,
  label,
}: TechnologyIconProps) {
  return (
    <Icon
      icon={icon}
      role="img"
      aria-label={`${label} logo`}
      className="h-[clamp(1rem,1.8vw,1.45rem)] w-[clamp(1rem,1.8vw,1.45rem)]"
    />
  );
}