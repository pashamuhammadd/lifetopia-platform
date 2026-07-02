import type { IconType } from "react-icons";

export type CommunityStat = {
  icon: string;
  value: string;
  label: string;
  desc: string;
};

export type CommunityLink = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  bg: string;
  hover: string;
  footer: string;
};