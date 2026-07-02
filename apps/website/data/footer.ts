import type { FooterLinkGroup, FooterSocialLink } from "@/types/footer";

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#home" },
      { label: "Account", href: "#account" },
      { label: "Gameplay", href: "#journey" },
      { label: "Development", href: "#development" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile", href: "/profile" },
      { label: "Inventory", href: "/inventory" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News", href: "#news" },
      { label: "Documentation", href: "/docs" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "mailto:hello@lifetopiaworld.com" },
    ],
  },
];

export const footerSocialLinks: FooterSocialLink[] = [
  { label: "Discord", href: "https://discord.gg/WeKtqJMcfb" },
  { label: "X", href: "https://x.com/LifetopiaWorld" },
  { label: "Telegram", href: "https://t.me/LifetopiaWorldCommunity" },
  {
    label: "GitHub",
    href: "https://github.com/pashamuhammadd/lifetopia-platform",
  },
];