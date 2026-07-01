export type JourneyMedia = {
  src: string;
  alt: string;
  type: "image" | "gif";
};

export type JourneyMilestone = {
  id: string;
  icon: string;
  label: string;
  title: string;
  date: string;
  status: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  media?: JourneyMedia[];
  checklist?: string[];
  cta?: {
    label: string;
    href: string;
  };
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "idea",
    icon: "💡",
    label: "Idea",
    title: "The Beginning",
    date: "January 2026",
    status: "The Beginning",
    description:
      "Lifetopia World began with a simple question: what if a cozy life simulation game could combine relaxing gameplay, meaningful community interactions, and optional Web3 ownership without sacrificing fun?",
    stats: [
      { label: "Vision", value: "Created" },
      { label: "Genre", value: "Cozy GameFi" },
      { label: "Goal", value: "Social Sandbox" },
    ],
  },
  {
    id: "mvp",
    icon: "🌱",
    label: "MVP",
    title: "Playable MVP",
    date: "10 Feb – 24 Feb 2026",
    status: "Completed",
    description:
      "The first playable prototype was completed in just two weeks to validate the core gameplay experience and prove that Lifetopia World could become a real product.",
    stats: [
      { label: "Development", value: "14 Days" },
      { label: "Gameplay GIFs", value: "5" },
      { label: "Status", value: "Playable" },
    ],
    media: [
      { src: "/images/journey/mvp/mvp-01.gif", alt: "Start", type: "gif" },
      { src: "/images/journey/mvp/mvp-02.gif", alt: "Farming", type: "gif" },
      { src: "/images/journey/mvp/mvp-03.gif", alt: "Tools", type: "gif" },
      { src: "/images/journey/mvp/mvp-04.gif", alt: "Trading", type: "gif" },
      { src: "/images/journey/mvp/mvp-05.gif", alt: "Web3 Features", type: "gif" },
    ],
    cta: {
      label: "Playable MVP Demo",
      href: "https://lifetopiaworld.my.id",
    },
  },
  {
    id: "grant",
    icon: "🚀",
    label: "Grant",
    title: "Superteam Indonesia Grant Approved",
    date: "3 March 2026",
    status: "Major Milestone",
    description:
      "Lifetopia World received development funding from Superteam Indonesia, enabling the project to move beyond the prototype stage and begin building the Public Alpha.",
    stats: [
      { label: "Grant", value: "Approved" },
      { label: "Support", value: "Superteam Indonesia" },
      { label: "Next Goal", value: "Public Alpha" },
    ],
  },
  {
    id: "alpha",
    icon: "🌿",
    label: "Alpha",
    title: "Public Alpha Completed",
    date: "6 March – Mid April 2026",
    status: "Completed",
    description:
      "During the Public Alpha phase, Lifetopia World evolved into a more complete experience with expanded gameplay systems, multiplayer foundations, quests, inventory, shops, and a larger world.",
    stats: [
      { label: "Development", value: "≈6 Weeks" },
      { label: "Screenshots", value: "9" },
      { label: "Status", value: "Completed" },
    ],
    media: [
      { src: "/images/journey/alpha/alpha-01.png", alt: "Alpha screenshot 1", type: "image" },
      { src: "/images/journey/alpha/alpha-02.png", alt: "Alpha screenshot 2", type: "image" },
      { src: "/images/journey/alpha/alpha-03.png", alt: "Alpha screenshot 3", type: "image" },
      { src: "/images/journey/alpha/alpha-04.png", alt: "Alpha screenshot 4", type: "image" },
      { src: "/images/journey/alpha/alpha-05.png", alt: "Alpha screenshot 5", type: "image" },
      { src: "/images/journey/alpha/alpha-06.png", alt: "Alpha screenshot 6", type: "image" },
      { src: "/images/journey/alpha/alpha-07.png", alt: "Alpha screenshot 7", type: "image" },
      { src: "/images/journey/alpha/alpha-08.png", alt: "Alpha screenshot 8", type: "image" },
      { src: "/images/journey/alpha/alpha-09.png", alt: "Alpha screenshot 9", type: "image" },
    ],
    cta: {
      label: "Play Current Alpha",
      href: "https://play.lifetopiaworld.io",
    },
  },
  {
    id: "generation-2",
    icon: "🏗️",
    label: "Gen 2",
    title: "Generation 2 Foundation",
    date: "Mid 2026",
    status: "In Progress",
    description:
      "Rather than rushing into Beta, we made the decision to redesign our technical foundation, rebuild the repository, improve documentation, and prepare a scalable community platform for the future of Lifetopia World.",
    stats: [
      { label: "Repository", value: "New" },
      { label: "Architecture", value: "Rebuilt" },
      { label: "Docs", value: "Improved" },
    ],
    checklist: [
      "Product Requirements Document",
      "System Design Document",
      "Database Blueprint",
      "New Platform Repository",
      "Community Platform Foundation",
    ],
  },
  {
    id: "beta",
    icon: "🚧",
    label: "Beta",
    title: "Beta Preparation",
    date: "Next Milestone",
    status: "Preparing",
    description:
      "We are currently refining every aspect of Lifetopia World before entering the Beta phase, including visuals, gameplay systems, community features, and long-term scalability.",
    stats: [
      { label: "Focus", value: "Polish" },
      { label: "Goal", value: "Beta Grant" },
      { label: "Stage", value: "Preparing" },
    ],
    checklist: [
      "Better visual style",
      "Improved UI/UX",
      "Community missions",
      "Account system",
      "Wallet integration",
      "Performance optimization",
    ],
  },
];