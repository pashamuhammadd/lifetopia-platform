import {
  RoadmapMilestone,
  type RoadmapMilestoneData,
} from "./RoadmapMilestone";

const milestones: RoadmapMilestoneData[] = [
  {
    number: "01",
    title: "Community Platform Completion",
    status: "Current",
    statusDetail:
      "Active delivery focused on platform stability, player interaction, account synchronization, and distribution readiness.",
    funding: "$3,500",
    duration: "3–4 Weeks",
    description:
      "Complete the community platform as the primary social layer for Lifetopia World players, including stable account systems, player profiles, discussions, notifications, and Android distribution preparation.",
    deliverables: [
      "Authentication and player profile stability",
      "Community feed and discussion improvements",
      "Notifications and player interaction",
      "Android distribution preparation",
      "Shared account synchronization foundation",
    ],
  },
  {
    number: "02",
    title: "Playable Beta Expansion",
    status: "Upcoming",
    statusDetail:
      "Begins after the community milestone reaches its acceptance criteria and integration foundation is stable.",
    funding: "$4,000",
    duration: "3–4 Weeks",
    description:
      "Expand the playable Beta with deeper life-simulation systems, additional locations, progression, quests, social gameplay, and stronger foundations for repeated player activity.",
    deliverables: [
      "Expanded farming and fishing systems",
      "Additional explorable locations",
      "Quest and progression improvements",
      "Social gathering and multiplayer foundations",
      "Gameplay balancing and usability testing",
    ],
  },
  {
    number: "03",
    title: "Connected Solana Ecosystem",
    status: "Planned",
    statusDetail:
      "Starts after the playable Beta systems are stable enough for ecosystem integration and public testing.",
    funding: "$2,500",
    duration: "2–4 Weeks",
    description:
      "Connect the game, community platform, marketplace foundation, and Solana infrastructure into one cohesive ecosystem, followed by testing, optimization, and public Beta onboarding.",
    deliverables: [
      "Community-to-game account synchronization",
      "Solana wallet integration foundation",
      "Devnet transaction testing",
      "Marketplace and player economy foundation",
      "Performance testing and public onboarding",
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