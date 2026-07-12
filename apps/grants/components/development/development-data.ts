export type RoadmapStatus = "Delivered" | "Building" | "Planned";

export type RoadmapMilestone = {
  id: number;
  title: string;
  status: RoadmapStatus;
  progress: number;
  funding: string;
  duration: string;
  icon: "community" | "game" | "ecosystem";
  accent: "green" | "blue" | "gold";
  deliverables: string[];
};

export const betaRoadmap: RoadmapMilestone[] = [
  {
    id: 1,
    title: "Community Platform",
    status: "Building",
    progress: 82,
    funding: "$3,500",
    duration: "2–3 Weeks",
    icon: "community",
    accent: "green",
    deliverables: [
      "Authentication",
      "Player Profiles",
      "Community Feed",
      "Android Application",
      "Game Synchronization",
    ],
  },

  {
    id: 2,
    title: "Playable Beta",
    status: "Building",
    progress: 35,
    funding: "$4,000",
    duration: "3–4 Weeks",
    icon: "game",
    accent: "blue",
    deliverables: [
      "Farming System",
      "Fishing System",
      "Town & Park",
      "Suburban Area",
      "Quest System",
      "Solana Wallet",
    ],
  },

  {
    id: 3,
    title: "Connected Ecosystem",
    status: "Planned",
    progress: 5,
    funding: "$2,500",
    duration: "2–3 Weeks",
    icon: "ecosystem",
    accent: "gold",
    deliverables: [
      "Community ↔ Game",
      "Marketplace Foundation",
      "Devnet Transactions",
      "Performance & QA",
      "Public Beta Release",
    ],
  },
];

export const fundingSummary = [
  {
    label: "Funding",
    value: "$10,000",
  },
  {
    label: "Timeline",
    value: "8–12 Weeks",
  },
  {
    label: "Previous Grant",
    value: "$5,000",
  },
  {
    label: "Overall Progress",
    value: "41%",
  },
];