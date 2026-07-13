export type DocumentStatus =
  | "Live"
  | "Preparing"
  | "Planned";

export type DocumentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LifetopiaDocument = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  status: DocumentStatus;
  updatedAt: string;
  sections: DocumentSection[];
};

export const lifetopiaDocuments: LifetopiaDocument[] = [
  {
    slug: "project-overview",
    title: "Project Overview",
    eyebrow: "Lifetopia World",
    description:
      "An overview of Lifetopia World, its current products, development status, funding request, and intended Beta outcome.",
    status: "Live",
    updatedAt: "July 2026",
    sections: [
      {
        title: "Project Summary",
        paragraphs: [
          "Lifetopia World is a cozy life-simulation ecosystem that combines a playable game, community platform, shared player identity, and future marketplace.",
          "The project uses Solana as the foundation for wallet connectivity, digital ownership, and future player-driven economic activity.",
        ],
      },
      {
        title: "Current Products",
        bullets: [
          "Official project website at lifetopiaworld.io",
          "Community platform at community.lifetopiaworld.io",
          "Publicly accessible Alpha game at play.lifetopiaworld.io",
          "Public development repository on GitHub",
        ],
      },
      {
        title: "Current Phase",
        paragraphs: [
          "The project is in active Beta development. The publicly accessible game remains the previous Alpha build while the team completes the connected Beta experience.",
        ],
      },
      {
        title: "Funding Request",
        bullets: [
          "$10,000 total request",
          "8–12 week delivery period",
          "Three milestone-based delivery stages",
          "Product development, infrastructure, quality assurance, and onboarding",
        ],
      },
    ],
  },
  {
    slug: "beta-roadmap",
    title: "Beta Roadmap",
    eyebrow: "Delivery Plan",
    description:
      "The milestone-based plan for moving Lifetopia from its existing foundations into a connected public Beta.",
    status: "Live",
    updatedAt: "July 2026",
    sections: [
      {
        title: "Milestone 01 — Community Platform Completion",
        bullets: [
          "$3,500 allocation",
          "3–4 week delivery period",
          "Shared player identity",
          "Community feature improvements",
          "Moderation and public readiness",
        ],
      },
      {
        title: "Milestone 02 — Playable Beta Expansion",
        bullets: [
          "$4,000 allocation",
          "3–4 week delivery period",
          "Expanded gameplay systems",
          "Progression and economy improvements",
          "Testing and Beta preparation",
        ],
      },
      {
        title: "Milestone 03 — Connected Solana Ecosystem",
        bullets: [
          "$2,500 allocation",
          "2–4 week delivery period",
          "Solana wallet integration",
          "Marketplace foundation",
          "Connected ecosystem verification",
        ],
      },
      {
        title: "Final Outcome",
        paragraphs: [
          "The intended outcome is a more complete and publicly reviewable Lifetopia Beta connecting the game, community, player identity, and Solana foundation.",
        ],
      },
    ],
  },
  {
    slug: "technical-architecture",
    title: "Technical Architecture",
    eyebrow: "Product Infrastructure",
    description:
      "An overview of the applications, shared services, authentication, backend, and planned blockchain integration.",
    status: "Live",
    updatedAt: "July 2026",
    sections: [
      {
        title: "Application Architecture",
        bullets: [
          "Next.js monorepo managed with Turborepo and pnpm",
          "Main website application",
          "Community platform application",
          "Funding review portal",
          "Documentation portal",
          "Playable game application",
        ],
      },
      {
        title: "Shared Identity",
        paragraphs: [
          "Lifetopia is being developed around one player account that can be used across the website, community platform, game, and future marketplace.",
        ],
        bullets: [
          "Supabase authentication",
          "Shared profile records",
          "Cross-subdomain session support",
          "Player avatar and public identity",
        ],
      },
      {
        title: "Backend Foundation",
        bullets: [
          "Supabase database and authentication",
          "Row Level Security policies",
          "Community posts, comments, likes, and bookmarks",
          "Public development activity records",
        ],
      },
      {
        title: "Solana Direction",
        bullets: [
          "Phantom and Solflare wallet connectivity",
          "Wallet-linked player identity",
          "Devnet interaction during Beta testing",
          "Future marketplace and ownership systems",
        ],
      },
    ],
  },
  {
    slug: "pitch-deck",
    title: "Pitch Deck",
    eyebrow: "Funding Presentation",
    description:
      "A visual presentation covering the problem, product, execution evidence, funding plan, team, and expected impact.",
    status: "Preparing",
    updatedAt: "July 2026",
    sections: [
      {
        title: "Deck Structure",
        bullets: [
          "Project vision",
          "Web3 onboarding problem",
          "Lifetopia solution",
          "Existing live products",
          "Current development status",
          "Roadmap and funding allocation",
          "Expected Beta impact",
          "Team and delivery ownership",
        ],
      },
      {
        title: "Current Status",
        paragraphs: [
          "The presentation is being prepared as a concise reviewer-facing document. The live funding portal currently contains the primary information that will be included.",
        ],
      },
    ],
  },
  {
    slug: "whitepaper",
    title: "Whitepaper",
    eyebrow: "Long-Term Ecosystem",
    description:
      "The planned long-form document for Lifetopia’s product design, player economy, ownership systems, and long-term ecosystem.",
    status: "Planned",
    updatedAt: "July 2026",
    sections: [
      {
        title: "Planned Coverage",
        bullets: [
          "Game and social ecosystem design",
          "Player identity and progression",
          "COIN and GOLD economy structure",
          "Digital ownership and marketplace",
          "Solana integration principles",
          "Community governance direction",
          "Long-term development phases",
        ],
      },
      {
        title: "Publication Status",
        paragraphs: [
          "The whitepaper will be expanded as the connected Beta economy and blockchain systems are finalized. Draft information should not be interpreted as a final token or economic commitment.",
        ],
      },
    ],
  },
];

export function getDocumentBySlug(slug: string) {
  return lifetopiaDocuments.find(
    (document) => document.slug === slug,
  );
}