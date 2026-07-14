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
    en: "A complete introduction to Lifetopia World, its connected products, current development phase, Solana direction, funding request, and intended Beta outcome.",
    id: "Pengenalan lengkap mengenai Lifetopia World, produk yang terhubung, fase pengembangan, arah Solana, permintaan pendanaan, dan hasil Beta yang ditargetkan.",
  },

  status: "Public Draft",
  updatedAt: "2026-07-13",
  owner: "Pasha Muhammad",
  readingTime: 10,
  version: "0.2",

  featured: true,
  recentlyUpdated: true,

  keyTakeaways: [
    {
      en: "Lifetopia already has working public products, including its website, community platform, playable Alpha, and public development repository.",
      id: "Lifetopia sudah memiliki produk publik yang berjalan, termasuk website, platform komunitas, playable Alpha, dan repository pengembangan publik.",
    },
    {
      en: "The project is currently in Beta development, while the publicly accessible game remains the previous Alpha build.",
      id: "Proyek saat ini berada dalam pengembangan Beta, sementara game yang dapat diakses publik masih merupakan build Alpha sebelumnya.",
    },
    {
      en: "The requested funding supports integration, expansion, testing, and public readiness rather than validating an unbuilt concept.",
      id: "Pendanaan yang diajukan digunakan untuk integrasi, ekspansi, pengujian, dan kesiapan publik, bukan untuk memvalidasi konsep yang belum dibangun.",
    },
    {
      en: "Solana is introduced through useful player experiences such as identity, wallet connectivity, ownership, and marketplace participation.",
      id: "Solana diperkenalkan melalui pengalaman pemain yang berguna seperti identitas, konektivitas wallet, kepemilikan, dan partisipasi marketplace.",
    },
  ],

  sections: [
    {
      id: "project-summary",
      title: {
        en: "Project Summary",
        id: "Ringkasan Proyek",
      },
      paragraphs: [
        {
          en: "Lifetopia World is a cozy life-simulation and social sandbox ecosystem that combines a playable game, community platform, shared player identity, and future marketplace.",
          id: "Lifetopia World adalah ekosistem life-simulation dan social sandbox bernuansa cozy yang menggabungkan game, platform komunitas, identitas pemain bersama, dan marketplace masa depan.",
        },
        {
          en: "The project is designed as a connected world rather than a collection of isolated applications. Players should be able to create an identity, participate in the community, enter the game, and eventually interact with ownership and marketplace systems through one ecosystem.",
          id: "Proyek ini dirancang sebagai dunia yang terhubung, bukan kumpulan aplikasi terpisah. Pemain nantinya dapat membuat identitas, berpartisipasi di komunitas, masuk ke game, serta berinteraksi dengan sistem kepemilikan dan marketplace melalui satu ekosistem.",
        },
      ],
    },
    {
      id: "onboarding-problem",
      title: {
        en: "The Onboarding Problem",
        id: "Masalah Onboarding",
      },
      paragraphs: [
        {
          en: "Many Web3 products introduce technical infrastructure before users understand the value of the experience. New users are often asked to learn wallets, networks, transaction fees, and unfamiliar terminology before they have a reason to participate.",
          id: "Banyak produk Web3 memperkenalkan infrastruktur teknis sebelum pengguna memahami nilai dari pengalamannya. Pengguna baru sering diminta mempelajari wallet, network, biaya transaksi, dan istilah asing sebelum memiliki alasan untuk berpartisipasi.",
        },
      ],
      bullets: [
        {
          en: "Technical onboarding creates friction before users experience meaningful value.",
          id: "Onboarding teknis menciptakan hambatan sebelum pengguna merasakan nilai yang berarti.",
        },
        {
          en: "Games, communities, wallets, and marketplaces often exist as disconnected products.",
          id: "Game, komunitas, wallet, dan marketplace sering tersedia sebagai produk yang tidak terhubung.",
        },
        {
          en: "Fear of making mistakes prevents many first-time users from participating.",
          id: "Kekhawatiran melakukan kesalahan membuat banyak pengguna baru enggan berpartisipasi.",
        },
      ],
    },
    {
      id: "lifetopia-solution",
      title: {
        en: "The Lifetopia Approach",
        id: "Pendekatan Lifetopia",
      },
      paragraphs: [
        {
          en: "Lifetopia begins with familiar activities such as exploration, farming, social interaction, progression, and community participation. Blockchain features are introduced gradually when they provide clear player utility.",
          id: "Lifetopia dimulai dengan aktivitas yang familiar seperti eksplorasi, farming, interaksi sosial, progression, dan partisipasi komunitas. Fitur blockchain diperkenalkan secara bertahap ketika memberikan kegunaan yang jelas bagi pemain.",
        },
      ],
      bullets: [
        {
          en: "Experience first: players begin with gameplay and community value.",
          id: "Pengalaman lebih dahulu: pemain memulai dari gameplay dan nilai komunitas.",
        },
        {
          en: "Shared identity: one account connects the website, community, game, and future marketplace.",
          id: "Identitas bersama: satu akun menghubungkan website, komunitas, game, dan marketplace mendatang.",
        },
        {
          en: "Utility-driven Web3: wallets and ownership appear when they become useful.",
          id: "Web3 berbasis kegunaan: wallet dan kepemilikan diperkenalkan ketika benar-benar berguna.",
        },
      ],
    },
    {
      id: "product-ecosystem",
      title: {
        en: "Connected Product Ecosystem",
        id: "Ekosistem Produk Terhubung",
      },
      paragraphs: [
        {
          en: "The Lifetopia ecosystem is being developed around four connected foundations. Some are already publicly available, while others are currently being integrated for the Beta.",
          id: "Ekosistem Lifetopia dikembangkan melalui empat fondasi yang saling terhubung. Sebagiannya sudah tersedia untuk publik, sedangkan bagian lainnya sedang diintegrasikan untuk Beta.",
        },
      ],
    },
    {
      id: "current-development-phase",
      title: {
        en: "Current Development Phase",
        id: "Fase Pengembangan Saat Ini",
      },
      paragraphs: [
        {
          en: "Lifetopia World is currently in active Beta development. The MVP and Alpha phases have already been completed, and the current focus is building a stronger connected foundation for public Beta participation.",
          id: "Lifetopia World saat ini berada dalam pengembangan Beta aktif. Fase MVP dan Alpha telah selesai, dan fokus sekarang adalah membangun fondasi terhubung yang lebih kuat untuk partisipasi Beta publik.",
        },
        {
          en: "The game available at play.lifetopiaworld.io remains the previous Alpha build. It demonstrates the existing gameplay foundation but does not represent the final connected Beta experience.",
          id: "Game yang tersedia di play.lifetopiaworld.io masih merupakan build Alpha sebelumnya. Build tersebut menunjukkan fondasi gameplay yang sudah ada, tetapi belum mewakili pengalaman Beta terhubung yang final.",
        },
      ],
      bullets: [
        {
          en: "Expand and stabilize gameplay systems.",
          id: "Memperluas dan menstabilkan sistem gameplay.",
        },
        {
          en: "Complete shared player identity across products.",
          id: "Menyelesaikan identitas pemain bersama di seluruh produk.",
        },
        {
          en: "Improve community systems and public moderation readiness.",
          id: "Meningkatkan sistem komunitas dan kesiapan moderasi publik.",
        },
        {
          en: "Introduce Solana connectivity and marketplace foundations.",
          id: "Memperkenalkan konektivitas Solana dan fondasi marketplace.",
        },
      ],
    },
    {
      id: "solana-role",
      title: {
        en: "The Role of Solana",
        id: "Peran Solana",
      },
      paragraphs: [
        {
          en: "Solana provides the blockchain foundation for wallet connectivity, digital ownership, player-linked assets, devnet interaction, and the future marketplace.",
          id: "Solana menyediakan fondasi blockchain untuk konektivitas wallet, kepemilikan digital, aset yang terhubung dengan pemain, interaksi devnet, dan marketplace masa depan.",
        },
        {
          en: "The integration is intended to remain optional and utility-driven. Players should first understand the value of the ecosystem before being asked to interact with blockchain infrastructure.",
          id: "Integrasi ini dirancang tetap opsional dan berbasis kegunaan. Pemain seharusnya memahami nilai ekosistem terlebih dahulu sebelum diminta berinteraksi dengan infrastruktur blockchain.",
        },
      ],
      bullets: [
        {
          en: "Phantom and Solflare wallet connectivity.",
          id: "Konektivitas wallet Phantom dan Solflare.",
        },
        {
          en: "Wallet-linked player identity.",
          id: "Identitas pemain yang terhubung dengan wallet.",
        },
        {
          en: "Devnet interactions during Beta testing.",
          id: "Interaksi devnet selama pengujian Beta.",
        },
        {
          en: "Future marketplace and digital ownership systems.",
          id: "Marketplace dan sistem kepemilikan digital mendatang.",
        },
      ],
    },
    {
      id: "funding-direction",
      title: {
        en: "Funding Direction",
        id: "Arah Pendanaan",
      },
      paragraphs: [
        {
          en: "Lifetopia is requesting $10,000 to complete an 8–12 week Beta delivery period. The funding is divided into three milestone-based stages and four operational allocation categories.",
          id: "Lifetopia mengajukan pendanaan sebesar $10.000 untuk menyelesaikan periode pengiriman Beta selama 8–12 minggu. Pendanaan dibagi menjadi tiga tahap berbasis milestone dan empat kategori alokasi operasional.",
        },
      ],
      bullets: [
        {
          en: "$3,500 for Community Platform Completion.",
          id: "$3.500 untuk Penyelesaian Platform Komunitas.",
        },
        {
          en: "$4,000 for Playable Beta Expansion.",
          id: "$4.000 untuk Ekspansi Playable Beta.",
        },
        {
          en: "$2,500 for the Connected Solana Ecosystem.",
          id: "$2.500 untuk Ekosistem Solana Terhubung.",
        },
        {
          en: "Operational allocation covers product development, infrastructure, quality assurance, and community onboarding.",
          id: "Alokasi operasional mencakup pengembangan produk, infrastruktur, quality assurance, dan onboarding komunitas.",
        },
      ],
    },
    {
      id: "intended-beta-outcome",
      title: {
        en: "Intended Beta Outcome",
        id: "Hasil Beta yang Ditargetkan",
      },
      paragraphs: [
        {
          en: "The intended outcome is a publicly reviewable Lifetopia Beta connecting the game, community platform, shared player identity, and Solana foundation.",
          id: "Hasil yang ditargetkan adalah Beta Lifetopia yang dapat ditinjau publik dan menghubungkan game, platform komunitas, identitas pemain bersama, serta fondasi Solana.",
        },
        {
          en: "The funded period is also expected to produce stronger technical evidence, public testing activity, user feedback, and measurable interaction with the ecosystem.",
          id: "Periode pendanaan juga diharapkan menghasilkan bukti teknis yang lebih kuat, aktivitas pengujian publik, feedback pengguna, dan interaksi ekosistem yang terukur.",
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
    en: "Milestone Delivery Plan",
    id: "Rencana Pengiriman Milestone",
  },

  description: {
    en: "A milestone-based delivery plan for connecting Lifetopia's existing website, community platform, playable game, shared identity, and Solana foundations into a publicly reviewable Beta.",
    id: "Rencana pengiriman berbasis milestone untuk menghubungkan website, platform komunitas, game, identitas bersama, dan fondasi Solana Lifetopia menjadi Beta yang dapat ditinjau publik.",
  },

  status: "Public Draft",
  updatedAt: "2026-07-14",
  owner: "Pasha Muhammad",
  readingTime: 12,
  version: "0.2",

  featured: true,
  recentlyUpdated: true,

  keyTakeaways: [
    {
      en: "The $10,000 request is divided into three delivery milestones with clear budgets, timelines, and inspectable outcomes.",
      id: "Permintaan $10.000 dibagi menjadi tiga milestone dengan anggaran, timeline, dan hasil yang dapat diperiksa.",
    },
    {
      en: "The roadmap focuses on completing and connecting foundations that already exist rather than starting the product from zero.",
      id: "Roadmap berfokus menyelesaikan dan menghubungkan fondasi yang sudah tersedia, bukan memulai produk dari nol.",
    },
    {
      en: "Each milestone produces public product evidence, repository activity, and reviewer-verifiable acceptance criteria.",
      id: "Setiap milestone menghasilkan bukti produk publik, aktivitas repository, dan kriteria penerimaan yang dapat diverifikasi reviewer.",
    },
    {
      en: "The intended final outcome is a connected Beta delivered within an estimated 8–12 week period.",
      id: "Hasil akhir yang ditargetkan adalah Beta terhubung dalam estimasi periode 8–12 minggu.",
    },
  ],

  sections: [
    {
      id: "roadmap-purpose",
      title: {
        en: "Roadmap Purpose",
        id: "Tujuan Roadmap",
      },
      paragraphs: [
        {
          en: "The Beta roadmap defines how Lifetopia will move from its current collection of working products into one connected public ecosystem.",
          id: "Roadmap Beta menjelaskan bagaimana Lifetopia bergerak dari kumpulan produk yang sudah berjalan menuju satu ekosistem publik yang terhubung.",
        },
        {
          en: "The plan is structured around milestone delivery rather than a broad list of features. Each stage has a defined objective, funding allocation, estimated duration, acceptance criteria, and evidence that reviewers can inspect.",
          id: "Rencana disusun berdasarkan pengiriman milestone, bukan sekadar daftar fitur. Setiap tahap memiliki objective, alokasi pendanaan, estimasi durasi, kriteria penerimaan, dan bukti yang dapat diperiksa reviewer.",
        },
      ],
    },
    {
      id: "delivery-path",
      title: {
        en: "Three-Milestone Delivery Path",
        id: "Jalur Pengiriman Tiga Milestone",
      },
      paragraphs: [
        {
          en: "The milestones follow a practical dependency order: complete the community and identity foundation, expand the playable Beta, then connect the broader Solana ecosystem.",
          id: "Milestone mengikuti urutan dependency yang praktis: menyelesaikan fondasi komunitas dan identitas, memperluas playable Beta, lalu menghubungkan ekosistem Solana.",
        },
      ],
    },
    {
      id: "milestone-community",
      title: {
        en: "Milestone 01 — Community Platform Completion",
        id: "Milestone 01 — Penyelesaian Platform Komunitas",
      },
      paragraphs: [
        {
          en: "The first milestone strengthens the community platform and shared player identity that will connect users across Lifetopia products.",
          id: "Milestone pertama memperkuat platform komunitas dan identitas pemain bersama yang akan menghubungkan pengguna di seluruh produk Lifetopia.",
        },
      ],
      bullets: [
        {
          en: "Funding allocation: $3,500.",
          id: "Alokasi pendanaan: $3.500.",
        },
        {
          en: "Estimated duration: 3–4 weeks.",
          id: "Estimasi durasi: 3–4 minggu.",
        },
        {
          en: "Complete shared profile and player identity foundations.",
          id: "Menyelesaikan fondasi profil dan identitas pemain bersama.",
        },
        {
          en: "Improve profiles, feeds, posting, comments, likes, and bookmarks.",
          id: "Meningkatkan profil, feed, posting, komentar, like, dan bookmark.",
        },
        {
          en: "Strengthen authentication and cross-subdomain account continuity.",
          id: "Memperkuat autentikasi dan kesinambungan akun lintas subdomain.",
        },
        {
          en: "Improve moderation readiness and community safety foundations.",
          id: "Meningkatkan kesiapan moderasi dan fondasi keamanan komunitas.",
        },
      ],
    },
    {
      id: "milestone-community-acceptance",
      title: {
        en: "Milestone 01 Acceptance Criteria",
        id: "Kriteria Penerimaan Milestone 01",
      },
      bullets: [
        {
          en: "Players can register, sign in, and access their shared profile reliably.",
          id: "Pemain dapat mendaftar, login, dan mengakses profil bersama secara stabil.",
        },
        {
          en: "Core community interactions work in the production environment.",
          id: "Interaksi utama komunitas berjalan di environment produksi.",
        },
        {
          en: "Protected pages correctly reject unauthenticated access.",
          id: "Halaman terproteksi menolak akses pengguna yang belum login dengan benar.",
        },
        {
          en: "Reviewer-accessible deployment and related repository activity are available.",
          id: "Deployment yang dapat diakses reviewer dan aktivitas repository terkait tersedia.",
        },
      ],
    },
    {
      id: "milestone-game",
      title: {
        en: "Milestone 02 — Playable Beta Expansion",
        id: "Milestone 02 — Ekspansi Playable Beta",
      },
      paragraphs: [
        {
          en: "The second milestone expands the playable experience and prepares the game for structured public Beta testing.",
          id: "Milestone kedua memperluas pengalaman bermain dan mempersiapkan game untuk pengujian Beta publik yang terstruktur.",
        },
      ],
      bullets: [
        {
          en: "Funding allocation: $4,000.",
          id: "Alokasi pendanaan: $4.000.",
        },
        {
          en: "Estimated duration: 3–4 weeks.",
          id: "Estimasi durasi: 3–4 minggu.",
        },
        {
          en: "Expand and stabilize core gameplay systems.",
          id: "Memperluas dan menstabilkan sistem gameplay utama.",
        },
        {
          en: "Improve player progression, inventory, economy, and persistence.",
          id: "Meningkatkan progression, inventory, ekonomi, dan penyimpanan data pemain.",
        },
        {
          en: "Resolve priority bugs affecting public testing.",
          id: "Menyelesaikan bug prioritas yang memengaruhi pengujian publik.",
        },
        {
          en: "Prepare onboarding and feedback flows for Beta participants.",
          id: "Mempersiapkan alur onboarding dan feedback untuk peserta Beta.",
        },
      ],
    },
    {
      id: "milestone-game-acceptance",
      title: {
        en: "Milestone 02 Acceptance Criteria",
        id: "Kriteria Penerimaan Milestone 02",
      },
      bullets: [
        {
          en: "The Beta build is accessible to the intended testing group.",
          id: "Build Beta dapat diakses oleh kelompok pengujian yang ditargetkan.",
        },
        {
          en: "Core gameplay progression can be completed without critical blockers.",
          id: "Progression gameplay utama dapat diselesaikan tanpa blocker kritis.",
        },
        {
          en: "Player progress and important account data persist correctly.",
          id: "Progress pemain dan data akun penting tersimpan dengan benar.",
        },
        {
          en: "Testing feedback and issue reports can be recorded and reviewed.",
          id: "Feedback pengujian dan laporan masalah dapat dicatat serta ditinjau.",
        },
      ],
    },
    {
      id: "milestone-solana",
      title: {
        en: "Milestone 03 — Connected Solana Ecosystem",
        id: "Milestone 03 — Ekosistem Solana Terhubung",
      },
      paragraphs: [
        {
          en: "The final milestone introduces the blockchain and marketplace foundations needed to connect player identity, ownership, and ecosystem participation.",
          id: "Milestone terakhir memperkenalkan fondasi blockchain dan marketplace yang diperlukan untuk menghubungkan identitas pemain, kepemilikan, dan partisipasi ekosistem.",
        },
      ],
      bullets: [
        {
          en: "Funding allocation: $2,500.",
          id: "Alokasi pendanaan: $2.500.",
        },
        {
          en: "Estimated duration: 2–4 weeks.",
          id: "Estimasi durasi: 2–4 minggu.",
        },
        {
          en: "Add Phantom and Solflare wallet connectivity.",
          id: "Menambahkan konektivitas wallet Phantom dan Solflare.",
        },
        {
          en: "Connect wallet information with the player's Lifetopia identity.",
          id: "Menghubungkan informasi wallet dengan identitas pemain Lifetopia.",
        },
        {
          en: "Introduce verifiable Solana devnet interactions.",
          id: "Memperkenalkan interaksi Solana devnet yang dapat diverifikasi.",
        },
        {
          en: "Build the initial marketplace and ownership foundation.",
          id: "Membangun fondasi awal marketplace dan kepemilikan.",
        },
      ],
    },
    {
      id: "milestone-solana-acceptance",
      title: {
        en: "Milestone 03 Acceptance Criteria",
        id: "Kriteria Penerimaan Milestone 03",
      },
      bullets: [
        {
          en: "Supported wallets can connect and disconnect through the public interface.",
          id: "Wallet yang didukung dapat connect dan disconnect melalui interface publik.",
        },
        {
          en: "Wallet-linked activity does not prevent users from accessing non-blockchain features.",
          id: "Aktivitas yang terhubung wallet tidak menghalangi pengguna mengakses fitur non-blockchain.",
        },
        {
          en: "Selected devnet interactions can be independently verified.",
          id: "Interaksi devnet terpilih dapat diverifikasi secara independen.",
        },
        {
          en: "Marketplace foundations are documented and connected to the broader product architecture.",
          id: "Fondasi marketplace terdokumentasi dan terhubung ke arsitektur produk yang lebih luas.",
        },
      ],
    },
    {
      id: "delivery-evidence",
      title: {
        en: "Delivery Evidence",
        id: "Bukti Pengiriman",
      },
      paragraphs: [
        {
          en: "Each milestone is expected to produce evidence that can be inspected without relying only on written progress reports.",
          id: "Setiap milestone diharapkan menghasilkan bukti yang dapat diperiksa tanpa hanya bergantung pada laporan perkembangan tertulis.",
        },
      ],
      bullets: [
        {
          en: "Public or reviewer-accessible product deployments.",
          id: "Deployment produk yang dapat diakses publik atau reviewer.",
        },
        {
          en: "GitHub commits and repository changes related to the milestone.",
          id: "Commit GitHub dan perubahan repository terkait milestone.",
        },
        {
          en: "Updated documentation describing delivered systems.",
          id: "Dokumentasi terbaru yang menjelaskan sistem yang telah dikirim.",
        },
        {
          en: "Testing records, feedback summaries, and resolved issues where applicable.",
          id: "Catatan pengujian, ringkasan feedback, dan masalah yang diselesaikan jika relevan.",
        },
        {
          en: "Solana explorer evidence for selected blockchain interactions.",
          id: "Bukti Solana Explorer untuk interaksi blockchain terpilih.",
        },
      ],
    },
    {
      id: "dependencies-and-risks",
      title: {
        en: "Dependencies and Delivery Risks",
        id: "Dependency dan Risiko Pengiriman",
      },
      paragraphs: [
        {
          en: "The roadmap is designed to remain achievable within the proposed period, but delivery may be affected by integration complexity, testing discoveries, infrastructure issues, or dependencies between applications.",
          id: "Roadmap dirancang agar tetap dapat dicapai dalam periode yang diajukan, tetapi pengiriman dapat dipengaruhi kompleksitas integrasi, temuan pengujian, masalah infrastruktur, atau dependency antar-aplikasi.",
        },
      ],
      bullets: [
        {
          en: "Shared authentication changes must remain compatible across applications.",
          id: "Perubahan autentikasi bersama harus tetap kompatibel di seluruh aplikasi.",
        },
        {
          en: "Gameplay stabilization may reveal additional priority bugs.",
          id: "Stabilisasi gameplay dapat menemukan bug prioritas tambahan.",
        },
        {
          en: "Blockchain integration must not reduce access for non-wallet users.",
          id: "Integrasi blockchain tidak boleh mengurangi akses pengguna tanpa wallet.",
        },
        {
          en: "Scope adjustments should preserve milestone outcomes and public evidence.",
          id: "Penyesuaian scope harus tetap mempertahankan hasil milestone dan bukti publik.",
        },
      ],
    },
    {
      id: "final-outcome",
      title: {
        en: "Final Beta Outcome",
        id: "Hasil Akhir Beta",
      },
      paragraphs: [
        {
          en: "The final intended outcome is a connected, stable, and publicly reviewable Lifetopia Beta delivered over an estimated 8–12 week period.",
          id: "Hasil akhir yang ditargetkan adalah Beta Lifetopia yang terhubung, stabil, dan dapat ditinjau publik dalam estimasi periode 8–12 minggu.",
        },
        {
          en: "The completed Beta should connect the community platform, player identity, playable world, Solana wallet foundation, and early marketplace direction into one coherent ecosystem.",
          id: "Beta yang selesai harus menghubungkan platform komunitas, identitas pemain, playable world, fondasi wallet Solana, dan arah awal marketplace menjadi satu ekosistem yang utuh.",
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

keyTakeaways:
  resolveTextList(
    document.keyTakeaways,
    locale,
  ) ?? [],

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