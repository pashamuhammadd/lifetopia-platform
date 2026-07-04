import type { PlayerAvatar } from "@/types/auth";

export const playerAvatars: PlayerAvatar[] = [
  {
    id: "avatar-01",
    name: "Aren",
    image: "/images/avatars/avatar-01.jpg",
  },
  {
    id: "avatar-02",
    name: "Lior",
    image: "/images/avatars/avatar-02.jpg",
  },
  {
    id: "avatar-03",
    name: "Naya",
    image: "/images/avatars/avatar-03.jpg",
  },
  {
    id: "avatar-04",
    name: "Elin",
    image: "/images/avatars/avatar-04.jpg",
  },
];

export const countries = [
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
] as const;