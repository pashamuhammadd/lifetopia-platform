import type { RoadmapItem } from "@repo/types/roadmap";

export const roadmapItems: RoadmapItem[] = [
  {
    id: "community-platform",
    phase: "Milestone 01",
    title: "Community Platform Completion",
    status: "Current",
    description:
      "Complete the shared social foundation where Lifetopians can connect, build their identity, and participate beyond the game.",
    items: [
      "Stable shared authentication and player profiles",
      "Community discussions and player interactions",
      "Notifications, discovery, and basic moderation",
      "Android application distribution preparation",
    ],
  },
  {
    id: "playable-beta",
    phase: "Milestone 02",
    title: "Playable Beta Expansion",
    status: "Planned",
    description:
      "Expand the playable world with deeper activities, progression, exploration, and stronger social gameplay.",
    items: [
      "Farming and fishing gameplay systems",
      "Town, park, and suburban locations",
      "Quest and player progression systems",
      "Multiplayer and social gathering experiences",
    ],
  },
  {
    id: "solana-ecosystem",
    phase: "Milestone 03",
    title: "Connected Solana Ecosystem",
    status: "Planned",
    description:
      "Connect player identity, wallets, digital ownership, and the early economy through approachable Solana experiences.",
    items: [
      "Community-to-game account synchronization",
      "Solana wallet integration foundation",
      "Devnet transaction and ownership testing",
      "Marketplace and player economy foundation",
    ],
  },
  {
    id: "future-expansion",
    phase: "Future Direction",
    title: "World & Society Expansion",
    status: "Future",
    description:
      "Grow Lifetopia into a broader living society through new places, social systems, events, and player-driven experiences.",
    items: [
      "Expanded world locations and activities",
      "Guilds and deeper social groups",
      "Seasonal events and community programs",
      "Android release and broader distribution",
    ],
  },
];