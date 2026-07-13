import type {
  DocsLocale,
  DocumentSection,
  DocumentSectionSource,
  LifetopiaDocument,
  LifetopiaDocumentSource,
  LocalizedText,
} from "./types";

export const lifetopiaDocumentSources: LifetopiaDocumentSource[] = [
  {
    slug: "project-overview",
    category: "start-here",
    order: 1,

    title: {
      en: "Project Overview",
      id: "Gambaran Umum Proyek",
    },

    eyebrow: {
      en: "Lifetopia World",
      id: "Lifetopia World",
    },

    description: {
      en: "An overview of Lifetopia World, its products, current development phase, funding direction, and intended Beta outcome.",
      id: "Gambaran Lifetopia World, produk yang dikembangkan, fase saat ini, arah pendanaan, dan hasil Beta yang ditargetkan.",
    },

    status: "Public Draft",
    updatedAt: "2026-07-13",
    owner: "Pasha Muhammad",
    readingTime: 6,
    version: "0.1",

    featured: true,
    recentlyUpdated: true,

    sections: [
      {
        id: "project-summary",
        title: {
          en: "Project Summary",
          id: "Ringkasan Proyek",
        },
        paragraphs: [
          {
            en: "Lifetopia World is a cozy life-simulation and social sandbox ecosystem combining a playable game, community platform, shared player identity, and future marketplace.",
            id: "Lifetopia World adalah ekosistem life-simulation dan social sandbox bernuansa cozy yang menggabungkan game, platform komunitas, identitas pemain bersama, dan marketplace masa depan.",
          },
          {
            en: "Solana provides the foundation for wallet connectivity, digital ownership, and future player-driven economic activity.",
            id: "Solana menjadi fondasi untuk konektivitas wallet, kepemilikan digital, dan aktivitas ekonomi yang digerakkan pemain.",
          },
        ],
      },
      {
        id: "current-products",
        title: {
          en: "Current Products",
          id: "Produk Saat Ini",
        },
        bullets: [
          {
            en: "Official project website at lifetopiaworld.io",
            id: "Website resmi proyek di lifetopiaworld.io",
          },
          {
            en: "Community platform at community.lifetopiaworld.io",
            id: "Platform komunitas di community.lifetopiaworld.io",
          },
          {
            en: "Publicly accessible Alpha game at play.lifetopiaworld.io",
            id: "Game Alpha publik di play.lifetopiaworld.io",
          },
          {
            en: "Public development repository on GitHub",
            id: "Repository pengembangan publik di GitHub",
          },
        ],
      },
      {
        id: "current-phase",
        title: {
          en: "Current Phase",
          id: "Fase Saat Ini",
        },
        paragraphs: [
          {
            en: "The project is in active Beta development. The publicly accessible game remains the previous Alpha build while the connected Beta is completed.",
            id: "Proyek saat ini berada dalam pengembangan Beta. Game yang dapat diakses publik masih merupakan build Alpha sebelumnya sementara Beta yang terhubung sedang diselesaikan.",
          },
        ],
      },
      {
        id: "funding-request",
        title: {
          en: "Funding Request",
          id: "Permintaan Pendanaan",
        },
        bullets: [
          {
            en: "$10,000 total funding request",
            id: "Total permintaan pendanaan sebesar $10.000",
          },
          {
            en: "Estimated 8–12 week delivery period",
            id: "Estimasi periode pengiriman 8–12 minggu",
          },
          {
            en: "Three milestone-based delivery stages",
            id: "Tiga tahap pengiriman berbasis milestone",
          },
          {
            en: "Focused on product development, infrastructure, testing, and onboarding",
            id: "Berfokus pada pengembangan produk, infrastruktur, pengujian, dan onboarding",
          },
        ],
      },
    ],
  },

  {
    slug: "beta-roadmap",
    category: "development",
    order: 2,

    title: {
      en: "Beta Roadmap",
      id: "Roadmap Beta",
    },

    eyebrow: {
      en: "Delivery Plan",
      id: "Rencana Pengiriman",
    },

    description: {
      en: "The milestone-based delivery plan for moving Lifetopia from its existing foundations into a connected public Beta.",
      id: "Rencana pengiriman berbasis milestone untuk membawa fondasi Lifetopia menuju Beta publik yang terhubung.",
    },

    status: "Public Draft",
    updatedAt: "2026-07-13",
    owner: "Pasha Muhammad",
    readingTime: 5,
    version: "0.1",

    featured: true,
    recentlyUpdated: true,

    sections: [
      {
        id: "milestone-community",
        title: {
          en: "Milestone 01 — Community Platform Completion",
          id: "Milestone 01 — Penyelesaian Platform Komunitas",
        },
        bullets: [
          {
            en: "$3,500 funding allocation",
            id: "Alokasi pendanaan $3.500",
          },
          {
            en: "3–4 week delivery period",
            id: "Periode pengiriman 3–4 minggu",
          },
          {
            en: "Shared player identity",
            id: "Identitas pemain bersama",
          },
          {
            en: "Community feature improvements",
            id: "Peningkatan fitur komunitas",
          },
          {
            en: "Moderation and public readiness",
            id: "Moderasi dan kesiapan publik",
          },
        ],
      },
      {
        id: "milestone-game",
        title: {
          en: "Milestone 02 — Playable Beta Expansion",
          id: "Milestone 02 — Ekspansi Playable Beta",
        },
        bullets: [
          {
            en: "$4,000 funding allocation",
            id: "Alokasi pendanaan $4.000",
          },
          {
            en: "3–4 week delivery period",
            id: "Periode pengiriman 3–4 minggu",
          },
          {
            en: "Expanded gameplay systems",
            id: "Ekspansi sistem gameplay",
          },
          {
            en: "Progression and economy improvements",
            id: "Peningkatan progression dan ekonomi",
          },
          {
            en: "Testing and public Beta preparation",
            id: "Pengujian dan persiapan Beta publik",
          },
        ],
      },
      {
        id: "milestone-solana",
        title: {
          en: "Milestone 03 — Connected Solana Ecosystem",
          id: "Milestone 03 — Ekosistem Solana Terhubung",
        },
        bullets: [
          {
            en: "$2,500 funding allocation",
            id: "Alokasi pendanaan $2.500",
          },
          {
            en: "2–4 week delivery period",
            id: "Periode pengiriman 2–4 minggu",
          },
          {
            en: "Solana wallet integration",
            id: "Integrasi wallet Solana",
          },
          {
            en: "Marketplace foundation",
            id: "Fondasi marketplace",
          },
          {
            en: "Connected ecosystem verification",
            id: "Verifikasi ekosistem terhubung",
          },
        ],
      },
      {
        id: "final-outcome",
        title: {
          en: "Final Outcome",
          id: "Hasil Akhir",
        },
        paragraphs: [
          {
            en: "The intended outcome is a more complete and publicly reviewable Lifetopia Beta connecting the game, community, player identity, and Solana foundation.",
            id: "Hasil yang ditargetkan adalah Beta Lifetopia yang lebih lengkap dan dapat ditinjau publik, menghubungkan game, komunitas, identitas pemain, dan fondasi Solana.",
          },
        ],
      },
    ],
  },

  {
    slug: "technical-architecture",
    category: "technical",
    order: 3,

    title: {
      en: "Technical Architecture",
      id: "Arsitektur Teknis",
    },

    eyebrow: {
      en: "Product Infrastructure",
      id: "Infrastruktur Produk",
    },

    description: {
      en: "An overview of Lifetopia applications, shared services, authentication, backend infrastructure, and planned blockchain integration.",
      id: "Gambaran aplikasi Lifetopia, layanan bersama, autentikasi, infrastruktur backend, dan rencana integrasi blockchain.",
    },

    status: "Public Draft",
    updatedAt: "2026-07-13",
    owner: "Lifetopia Development Team",
    readingTime: 8,
    version: "0.1",

    featured: true,
    recentlyUpdated: true,

    sections: [
      {
        id: "application-architecture",
        title: {
          en: "Application Architecture",
          id: "Arsitektur Aplikasi",
        },
        bullets: [
          {
            en: "Next.js monorepo managed with Turborepo and pnpm",
            id: "Monorepo Next.js yang dikelola dengan Turborepo dan pnpm",
          },
          {
            en: "Main website application",
            id: "Aplikasi website utama",
          },
          {
            en: "Community platform application",
            id: "Aplikasi platform komunitas",
          },
          {
            en: "Funding review portal",
            id: "Portal review pendanaan",
          },
          {
            en: "Documentation portal",
            id: "Portal dokumentasi",
          },
          {
            en: "Playable game application",
            id: "Aplikasi game yang dapat dimainkan",
          },
        ],
      },
      {
        id: "shared-identity",
        title: {
          en: "Shared Identity",
          id: "Identitas Bersama",
        },
        paragraphs: [
          {
            en: "Lifetopia is being developed around one player account that can be used across the website, community platform, game, and future marketplace.",
            id: "Lifetopia dikembangkan menggunakan satu akun pemain yang dapat digunakan di website, platform komunitas, game, dan marketplace mendatang.",
          },
        ],
        bullets: [
          {
            en: "Supabase authentication",
            id: "Autentikasi Supabase",
          },
          {
            en: "Shared player profile records",
            id: "Data profil pemain bersama",
          },
          {
            en: "Cross-subdomain session support",
            id: "Dukungan sesi lintas subdomain",
          },
          {
            en: "Player avatar and public identity",
            id: "Avatar dan identitas publik pemain",
          },
        ],
      },
      {
        id: "backend-foundation",
        title: {
          en: "Backend Foundation",
          id: "Fondasi Backend",
        },
        bullets: [
          {
            en: "Supabase database and authentication",
            id: "Database dan autentikasi Supabase",
          },
          {
            en: "Row Level Security policies",
            id: "Kebijakan Row Level Security",
          },
          {
            en: "Community posts, comments, likes, and bookmarks",
            id: "Post komunitas, komentar, like, dan bookmark",
          },
          {
            en: "Public development activity records",
            id: "Catatan aktivitas pengembangan publik",
          },
        ],
      },
      {
        id: "solana-direction",
        title: {
          en: "Solana Direction",
          id: "Arah Integrasi Solana",
        },
        bullets: [
          {
            en: "Phantom and Solflare wallet connectivity",
            id: "Konektivitas wallet Phantom dan Solflare",
          },
          {
            en: "Wallet-linked player identity",
            id: "Identitas pemain yang terhubung ke wallet",
          },
          {
            en: "Devnet interaction during Beta testing",
            id: "Interaksi devnet selama pengujian Beta",
          },
          {
            en: "Future marketplace and ownership systems",
            id: "Marketplace dan sistem kepemilikan mendatang",
          },
        ],
      },
    ],
  },

  {
    slug: "pitch-deck",
    category: "funding",
    order: 4,

    title: {
      en: "Pitch Deck",
      id: "Pitch Deck",
    },

    eyebrow: {
      en: "Funding Presentation",
      id: "Presentasi Pendanaan",
    },

    description: {
      en: "A visual presentation covering Lifetopia's opportunity, products, execution evidence, funding plan, team, and expected Beta impact.",
      id: "Presentasi visual mengenai peluang Lifetopia, produk, bukti eksekusi, rencana pendanaan, tim, dan dampak Beta yang ditargetkan.",
    },

    status: "In Preparation",
    updatedAt: "2026-07-13",
    owner: "Pasha Muhammad",
    readingTime: 2,
    version: "0.1",

    featured: true,
    recentlyUpdated: false,

    sections: [
      {
        id: "deck-structure",
        title: {
          en: "Planned Deck Structure",
          id: "Struktur Pitch Deck",
        },
        bullets: [
          {
            en: "Project vision",
            id: "Visi proyek",
          },
          {
            en: "Web3 onboarding problem",
            id: "Masalah onboarding Web3",
          },
          {
            en: "Lifetopia solution",
            id: "Solusi Lifetopia",
          },
          {
            en: "Existing live products",
            id: "Produk live yang sudah tersedia",
          },
          {
            en: "Current development status",
            id: "Status pengembangan saat ini",
          },
          {
            en: "Roadmap and funding allocation",
            id: "Roadmap dan alokasi pendanaan",
          },
          {
            en: "Expected Beta impact",
            id: "Dampak Beta yang ditargetkan",
          },
          {
            en: "Team and delivery ownership",
            id: "Tim dan tanggung jawab pengiriman",
          },
        ],
      },
      {
        id: "current-status",
        title: {
          en: "Current Status",
          id: "Status Saat Ini",
        },
        paragraphs: [
          {
            en: "The presentation is currently being prepared. This page will provide a preview and PDF download when the deck is ready.",
            id: "Presentasi saat ini sedang dipersiapkan. Halaman ini akan menyediakan preview dan download PDF ketika pitch deck sudah selesai.",
          },
        ],
      },
    ],
  },

  {
    slug: "whitepaper",
    category: "economy",
    order: 5,

    title: {
      en: "Whitepaper",
      id: "Whitepaper",
    },

    eyebrow: {
      en: "Long-Term Ecosystem",
      id: "Ekosistem Jangka Panjang",
    },

    description: {
      en: "The long-form document for Lifetopia's game systems, player economy, GOLD, marketplace, ownership, Solana integration, and long-term direction.",
      id: "Dokumen lengkap mengenai sistem game Lifetopia, ekonomi pemain, GOLD, marketplace, kepemilikan, integrasi Solana, dan arah jangka panjang.",
    },

    status: "Public Draft",
    updatedAt: "2026-07-13",
    owner: "Pasha Muhammad",
    readingTime: 10,
    version: "0.1",

    featured: true,
    recentlyUpdated: false,

    sections: [
      {
        id: "planned-coverage",
        title: {
          en: "Document Coverage",
          id: "Cakupan Dokumen",
        },
        bullets: [
          {
            en: "Game and social ecosystem design",
            id: "Desain ekosistem game dan sosial",
          },
          {
            en: "Player identity and progression",
            id: "Identitas dan progression pemain",
          },
          {
            en: "COIN and GOLD economy",
            id: "Ekonomi COIN dan GOLD",
          },
          {
            en: "Digital ownership and marketplace",
            id: "Kepemilikan digital dan marketplace",
          },
          {
            en: "Solana integration principles",
            id: "Prinsip integrasi Solana",
          },
          {
            en: "Community governance direction",
            id: "Arah governance komunitas",
          },
          {
            en: "Long-term development phases",
            id: "Fase pengembangan jangka panjang",
          },
        ],
      },
      {
        id: "draft-disclaimer",
        title: {
          en: "Draft Disclaimer",
          id: "Disclaimer Draft",
        },
        paragraphs: [
          {
            en: "The Whitepaper may continue to change until the connected Beta economy and blockchain systems are finalized.",
            id: "Whitepaper dapat terus berubah sampai ekonomi Beta dan sistem blockchain yang terhubung telah difinalisasi.",
          },
        ],
      },
    ],
  },
];

function resolveText(
  text: LocalizedText,
  locale: DocsLocale,
) {
  return text[locale];
}

function resolveTextList(
  items: LocalizedText[] | undefined,
  locale: DocsLocale,
) {
  return items?.map((item) =>
    resolveText(item, locale),
  );
}

function resolveSection(
  section: DocumentSectionSource,
  locale: DocsLocale,
): DocumentSection {
  return {
    id: section.id,
    title: resolveText(section.title, locale),
    paragraphs: resolveTextList(
      section.paragraphs,
      locale,
    ),
    bullets: resolveTextList(
      section.bullets,
      locale,
    ),
  };
}

function resolveDocument(
  document: LifetopiaDocumentSource,
  locale: DocsLocale,
): LifetopiaDocument {
  return {
    slug: document.slug,
    category: document.category,
    order: document.order,

    title: resolveText(document.title, locale),
    eyebrow: resolveText(
      document.eyebrow,
      locale,
    ),
    description: resolveText(
      document.description,
      locale,
    ),

    status: document.status,
    updatedAt: document.updatedAt,
    owner: document.owner,
    readingTime: document.readingTime,
    version: document.version,

    featured: document.featured ?? false,
    recentlyUpdated:
      document.recentlyUpdated ?? false,

    sections: document.sections.map(
    (section: DocumentSectionSource) =>
    resolveSection(section, locale),
    ),
  };
}

export function getDocuments(
  locale: DocsLocale = "en",
): LifetopiaDocument[] {
  return lifetopiaDocumentSources
    .map((document) =>
      resolveDocument(document, locale),
    )
    .sort((a, b) => a.order - b.order);
}

export function getDocumentBySlug(
  slug: string,
  locale: DocsLocale = "en",
) {
  const document =
    lifetopiaDocumentSources.find(
      (item) => item.slug === slug,
    );

  if (!document) {
    return undefined;
  }

  return resolveDocument(document, locale);
}

export function getDocumentsByCategory(
  category: LifetopiaDocumentSource["category"],
  locale: DocsLocale = "en",
) {
  return getDocuments(locale).filter(
    (document) =>
      document.category === category,
  );
}

export function getFeaturedDocuments(
  locale: DocsLocale = "en",
) {
  return getDocuments(locale).filter(
    (document) => document.featured,
  );
}

export function getRecentlyUpdatedDocuments(
  locale: DocsLocale = "en",
) {
  return getDocuments(locale).filter(
    (document) => document.recentlyUpdated,
  );
}

export function getAllDocumentSlugs() {
  return lifetopiaDocumentSources.map(
    (document) => document.slug,
  );
}