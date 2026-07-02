import type { RoadmapItem } from "@/types/roadmap";

export const roadmapItems: RoadmapItem[] = [
  {
    phase: "Phase 01",
    title: "Website Foundation",
    status: "Completed",
    description: "Build the official Lifetopia World landing page foundation.",
    items: ["Hero", "Account Preview", "Gameplay Cards", "Development Journey"],
  },
  {
    phase: "Phase 02",
    title: "Platform Foundation",
    status: "In Progress",
    description: "Prepare account, dashboard, profile, and community systems.",
    items: ["Login", "Register", "Dashboard", "Profile"],
  },
  {
    phase: "Phase 03",
    title: "Community Engine",
    status: "Next",
    description: "Create missions, points, rewards, and community activities.",
    items: ["Missions", "Harmony Points", "Leaderboard", "Badges"],
  },
  {
    phase: "Phase 04",
    title: "Beta Preparation",
    status: "Future",
    description: "Improve visuals, gameplay systems, performance, and polish.",
    items: ["Better UI", "Better Art", "Bug Fixes", "Beta Grant"],
  },
];