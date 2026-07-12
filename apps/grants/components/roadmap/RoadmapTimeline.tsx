import {
  RoadmapMilestone,
  type RoadmapMilestoneData,
} from "./RoadmapMilestone";

const milestones: RoadmapMilestoneData[] = [
  {
    number: "01",
    title: "Community Platform Completion",
    status: "Current",
    funding: "$3,500",
    duration: "2–3 Weeks",
    description:
      "Complete the community platform as the primary social layer for Lifetopia World players, including account systems, player profiles, public discussions, and Android distribution readiness.",
    deliverables: [
      "Authentication and player profile stability",
      "Community feed and discussion experience",
      "Notifications and player interaction",
      "Android application distribution preparation",
      "Shared account synchronization foundation",
    ],
  },
  {
    number: "02",
    title: "Playable Beta Expansion",
    status: "Upcoming",
    funding: "$4,000",
    duration: "3–4 Weeks",
    description:
      "Expand the playable Beta with deeper life-simulation systems, more explorable locations, social gameplay, and a stronger foundation for repeated player activity.",
    deliverables: [
      "Farming and fishing gameplay systems",
      "Town, park, and suburban locations",
      "Quest and progression systems",
      "Multiplayer and social gathering experience",
      "Gameplay balancing and usability improvements",
    ],
  },
  {
    number: "03",
    title: "Connected Solana Ecosystem",
    status: "Planned",
    funding: "$2,500",
    duration: "2–3 Weeks",
    description:
      "Connect the game, community platform, and Solana infrastructure into one cohesive ecosystem, followed by testing, optimization, and public Beta onboarding.",
    deliverables: [
      "Community-to-game account synchronization",
      "Solana wallet integration foundation",
      "Devnet transaction testing",
      "Marketplace and player economy foundation",
      "Performance testing and public Beta release",
    ],
  },
];

export function RoadmapTimeline() {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => (
        <RoadmapMilestone
          key={milestone.number}
          milestone={milestone}
          isLast={index === milestones.length - 1}
        />
      ))}
    </div>
  );
}