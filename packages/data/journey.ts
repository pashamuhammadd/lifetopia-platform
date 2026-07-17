export type JourneyMedia = {
  src: string;
  alt: string;
  type: "image" | "gif";
};

export type JourneyMilestoneState =
  | "completed"
  | "current";

export type JourneyChecklistStatus =
  | "completed"
  | "active"
  | "planned";

export type JourneyChecklistItem = {
  label: string;
  status: JourneyChecklistStatus;
};

export type JourneyMilestone = {
  id: string;
  icon: string;
  label: string;
  title: string;
  date: string;
  status: string;
  state: JourneyMilestoneState;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  media?: JourneyMedia[];
  checklist?: JourneyChecklistItem[];
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "concept",
    icon: "💡",
    label: "Concept",
    title: "The Original Lifetopia Vision",
    date: "January 2026",
    status: "Completed",
    state: "completed",
    description:
      "Lifetopia World began with a vision for a cozy social world where relaxing gameplay, friendship, shared identity, and optional digital ownership could grow together without creating a technical barrier for players.",
    stats: [
      {
        label: "Vision",
        value: "Defined",
      },
      {
        label: "Experience",
        value: "Cozy Social",
      },
      {
        label: "Direction",
        value: "Player-Led",
      },
    ],
  },
  {
    id: "mvp",
    icon: "🌱",
    label: "MVP",
    title: "The First Playable Build",
    date: "10–24 February 2026",
    status: "Completed",
    state: "completed",
    description:
      "The first playable prototype was completed in two weeks, proving that Lifetopia could move beyond an idea and become a real interactive product with farming, tools, trading, and early Web3 experiments.",
    stats: [
      {
        label: "Development",
        value: "14 Days",
      },
      {
        label: "Build",
        value: "Playable",
      },
      {
        label: "Status",
        value: "Completed",
      },
    ],
    media: [
      {
        src: "/images/journey/mvp/mvp-01.gif",
        alt: "Opening scene of the first Lifetopia MVP",
        type: "gif",
      },
      {
        src: "/images/journey/mvp/mvp-02.gif",
        alt: "Farming system in the Lifetopia MVP",
        type: "gif",
      },
      {
        src: "/images/journey/mvp/mvp-03.gif",
        alt: "Tool interaction in the Lifetopia MVP",
        type: "gif",
      },
      {
        src: "/images/journey/mvp/mvp-04.gif",
        alt: "Trading prototype in the Lifetopia MVP",
        type: "gif",
      },
      {
        src: "/images/journey/mvp/mvp-05.gif",
        alt: "Early Web3 feature experiment",
        type: "gif",
      },
    ],
  },
  {
    id: "public-alpha",
    icon: "🌿",
    label: "Alpha",
    title: "Public Alpha Delivered",
    date: "March–April 2026",
    status: "Completed",
    state: "completed",
    description:
      "With support from Superteam Indonesia, Lifetopia expanded from a prototype into a Public Alpha containing a larger world, inventory, quests, shops, save systems, multiplayer foundations, and broader gameplay functionality.",
    stats: [
      {
        label: "Phase",
        value: "Public Alpha",
      },
      {
        label: "Funding",
        value: "Supported",
      },
      {
        label: "Status",
        value: "Completed",
      },
    ],
    media: [
      {
        src: "/images/journey/alpha/alpha-01.png",
        alt: "Public Alpha town environment",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-02.png",
        alt: "Public Alpha farming interface",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-03.png",
        alt: "Public Alpha inventory system",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-04.png",
        alt: "Public Alpha shop interface",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-05.png",
        alt: "Public Alpha quest system",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-06.png",
        alt: "Public Alpha multiplayer scene",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-07.png",
        alt: "Public Alpha player interface",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-08.png",
        alt: "Public Alpha world exploration",
        type: "image",
      },
      {
        src: "/images/journey/alpha/alpha-09.png",
        alt: "Public Alpha gameplay environment",
        type: "image",
      },
    ],
  },
  {
    id: "beta-foundation",
    icon: "🏗️",
    label: "Foundation",
    title: "A Stronger Foundation for Beta",
    date: "May–July 2026",
    status: "Completed",
    state: "completed",
    description:
      "Before expanding the Beta, the project foundation was rebuilt around a cleaner monorepo, shared player accounts, a dedicated community platform, public documentation, and a more transparent development workflow.",
    stats: [
      {
        label: "Monorepo",
        value: "Active",
      },
      {
        label: "Shared Account",
        value: "Live",
      },
      {
        label: "Documentation",
        value: "Public",
      },
    ],
    checklist: [
      {
        label: "Modern monorepo and application structure",
        status: "completed",
      },
      {
        label: "Shared registration, login, and player identity",
        status: "completed",
      },
      {
        label: "Community Platform foundation",
        status: "completed",
      },
      {
        label: "Public documentation and development evidence",
        status: "completed",
      },
    ],
  },
  {
    id: "current-beta",
    icon: "🚧",
    label: "Beta",
    title: "Public Beta Development",
    date: "July 2026–Present",
    status: "Current Phase",
    state: "current",
    description:
      "Lifetopia World is currently in active Beta development. The focus has moved from proving the concept toward improving product quality, community participation, gameplay depth, and the connected player experience.",
    stats: [
      {
        label: "Phase",
        value: "Beta",
      },
      {
        label: "Focus",
        value: "Product Quality",
      },
      {
        label: "Development",
        value: "Active",
      },
    ],
    checklist: [
      {
        label: "Stable shared product foundation",
        status: "completed",
      },
      {
        label: "Community Platform completion",
        status: "active",
      },
      {
        label: "Playable Beta expansion",
        status: "planned",
      },
      {
        label: "Connected Solana ecosystem",
        status: "planned",
      },
    ],
  },
];