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
    en: "A technical overview of Lifetopia's web applications, game foundation, shared identity, Supabase backend, deployment model, security boundaries, and planned Solana integration.",
    id: "Gambaran teknis aplikasi web Lifetopia, fondasi game, identitas bersama, backend Supabase, model deployment, batasan keamanan, dan rencana integrasi Solana.",
  },

  status: "Public Draft",
  updatedAt: "2026-07-14",
  owner: "Lifetopia Development Team",
  readingTime: 16,
  version: "0.2",

  featured: true,
  recentlyUpdated: true,

  keyTakeaways: [
    {
      en: "Lifetopia uses a monorepo for its public web products while the playable game remains a separate game application connected through shared product services.",
      id: "Lifetopia menggunakan monorepo untuk produk web publik, sedangkan playable game tetap menjadi aplikasi game terpisah yang terhubung melalui layanan produk bersama.",
    },
    {
      en: "One Supabase authentication and profile foundation is designed to support identity across the website, community platform, game, and future marketplace.",
      id: "Satu fondasi autentikasi dan profil Supabase dirancang untuk mendukung identitas di website, platform komunitas, game, dan marketplace mendatang.",
    },
    {
      en: "Row Level Security, protected server operations, and cross-subdomain session rules form the current backend security foundation.",
      id: "Row Level Security, operasi server terproteksi, dan aturan sesi lintas subdomain menjadi fondasi keamanan backend saat ini.",
    },
    {
      en: "Solana integration is planned as an optional utility layer and must not block players from accessing non-blockchain product features.",
      id: "Integrasi Solana direncanakan sebagai lapisan utilitas opsional dan tidak boleh menghalangi pemain mengakses fitur produk non-blockchain.",
    },
  ],

  sections: [
    {
      id: "architecture-principles",
      title: {
        en: "Architecture Principles",
        id: "Prinsip Arsitektur",
      },
      paragraphs: [
        {
          en: "Lifetopia is being developed as a connected product ecosystem rather than one large application. Each product has a focused responsibility while sharing identity, data contracts, design foundations, and public development evidence.",
          id: "Lifetopia dikembangkan sebagai ekosistem produk terhubung, bukan satu aplikasi besar. Setiap produk memiliki tanggung jawab khusus sambil berbagi identitas, kontrak data, fondasi desain, dan bukti pengembangan publik.",
        },
        {
          en: "The architecture prioritizes incremental delivery. Existing products can remain independently accessible while deeper connections are introduced during Beta development.",
          id: "Arsitektur memprioritaskan pengiriman bertahap. Produk yang sudah tersedia dapat tetap diakses secara independen sementara koneksi yang lebih dalam diperkenalkan selama pengembangan Beta.",
        },
      ],
      bullets: [
        {
          en: "Separate applications with clearly defined product responsibilities.",
          id: "Aplikasi terpisah dengan tanggung jawab produk yang jelas.",
        },
        {
          en: "Shared authentication, profile, types, services, and document metadata.",
          id: "Autentikasi, profil, type, service, dan metadata dokumentasi bersama.",
        },
        {
          en: "Public products remain usable during gradual integration.",
          id: "Produk publik tetap dapat digunakan selama proses integrasi bertahap.",
        },
        {
          en: "Blockchain functionality is introduced as an optional utility layer.",
          id: "Fungsi blockchain diperkenalkan sebagai lapisan utilitas opsional.",
        },
      ],
    },
    {
      id: "system-landscape",
      title: {
        en: "System Landscape",
        id: "Lanskap Sistem",
      },
      paragraphs: [
        {
          en: "The current architecture consists of multiple public web applications, a playable game, shared workspace packages, Supabase services, and future Solana-connected systems.",
          id: "Arsitektur saat ini terdiri dari beberapa aplikasi web publik, playable game, package workspace bersama, layanan Supabase, dan sistem terhubung Solana di masa mendatang.",
        },
      ],
    },
    {
      id: "web-platform-monorepo",
      title: {
        en: "Web Platform Monorepo",
        id: "Monorepo Platform Web",
      },
      paragraphs: [
        {
          en: "The public web platform uses Next.js App Router, TypeScript, Tailwind CSS, Turborepo, and pnpm workspaces. Applications are separated under the apps directory while reusable foundations are stored under packages.",
          id: "Platform web publik menggunakan Next.js App Router, TypeScript, Tailwind CSS, Turborepo, dan pnpm workspace. Aplikasi dipisahkan di direktori apps, sedangkan fondasi reusable disimpan di packages.",
        },
      ],
      bullets: [
        {
          en: "apps/website — the main project website and authentication entry point.",
          id: "apps/website — website utama proyek dan entry point autentikasi.",
        },
        {
          en: "apps/community — player community, profiles, posts, comments, likes, and bookmarks.",
          id: "apps/community — komunitas pemain, profil, post, komentar, like, dan bookmark.",
        },
        {
          en: "apps/grants — funding review portal and delivery proposal.",
          id: "apps/grants — portal review pendanaan dan proposal pengiriman.",
        },
        {
          en: "apps/docs — official public project documentation.",
          id: "apps/docs — dokumentasi resmi proyek publik.",
        },
        {
          en: "packages/lib — shared Supabase and application utilities.",
          id: "packages/lib — utility Supabase dan aplikasi bersama.",
        },
        {
          en: "packages/types — shared TypeScript contracts.",
          id: "packages/types — kontrak TypeScript bersama.",
        },
        {
          en: "packages/docs-data — shared bilingual documentation metadata and content.",
          id: "packages/docs-data — metadata dan konten dokumentasi bilingual bersama.",
        },
        {
          en: "packages/devtools — internal project status and documentation tooling.",
          id: "packages/devtools — tooling internal untuk status proyek dan dokumentasi.",
        },
      ],
    },
    {
      id: "game-application",
      title: {
        en: "Playable Game Application",
        id: "Aplikasi Playable Game",
      },
      paragraphs: [
        {
          en: "The playable game is treated as a separate product application because its runtime, asset pipeline, performance requirements, and release process differ from the Next.js web platform.",
          id: "Playable game diperlakukan sebagai aplikasi produk terpisah karena runtime, pipeline asset, kebutuhan performa, dan proses rilisnya berbeda dari platform web Next.js.",
        },
        {
          en: "The publicly accessible build remains the previous Alpha version while the connected Beta foundation is being completed. Game integration should rely on defined identity and backend contracts rather than directly coupling the game to individual web application internals.",
          id: "Build yang dapat diakses publik masih merupakan versi Alpha sebelumnya sementara fondasi Beta terhubung sedang diselesaikan. Integrasi game harus menggunakan kontrak identitas dan backend yang jelas, bukan terhubung langsung ke internal aplikasi web tertentu.",
        },
      ],
      bullets: [
        {
          en: "Separate game runtime and asset delivery.",
          id: "Runtime game dan pengiriman asset yang terpisah.",
        },
        {
          en: "Shared player identity through backend contracts.",
          id: "Identitas pemain bersama melalui kontrak backend.",
        },
        {
          en: "Progress, inventory, and economy data synchronized through approved services.",
          id: "Data progression, inventory, dan ekonomi disinkronkan melalui layanan yang disetujui.",
        },
        {
          en: "Public Alpha and future Beta builds remain clearly identified.",
          id: "Build Alpha publik dan Beta mendatang tetap diberi identitas yang jelas.",
        },
      ],
    },
    {
      id: "authentication-flow",
      title: {
        en: "Shared Authentication Flow",
        id: "Alur Autentikasi Bersama",
      },
      paragraphs: [
        {
          en: "Lifetopia is designed around one account that can be used across its public products. Supabase Auth manages the underlying user identity, while the profiles table stores player-facing information.",
          id: "Lifetopia dirancang menggunakan satu akun yang dapat digunakan di seluruh produk publik. Supabase Auth mengelola identitas pengguna utama, sedangkan tabel profiles menyimpan informasi yang ditampilkan kepada pemain.",
        },
        {
          en: "When authentication begins from another Lifetopia application, the website receives a validated return destination. After successful sign-in, the user is returned to the originating product.",
          id: "Ketika autentikasi dimulai dari aplikasi Lifetopia lain, website menerima tujuan kembali yang telah divalidasi. Setelah login berhasil, pengguna dikembalikan ke produk asal.",
        },
      ],
      bullets: [
        {
          en: "Registration and password authentication are handled through Supabase Auth.",
          id: "Registrasi dan autentikasi password ditangani melalui Supabase Auth.",
        },
        {
          en: "profiles.id corresponds directly to the authenticated user ID.",
          id: "profiles.id berhubungan langsung dengan ID pengguna yang terautentikasi.",
        },
        {
          en: "Cross-subdomain sessions use a shared cookie domain for lifetopiaworld.io.",
          id: "Sesi lintas subdomain menggunakan shared cookie domain untuk lifetopiaworld.io.",
        },
        {
          en: "Protected pages verify authentication before returning private content.",
          id: "Halaman terproteksi memverifikasi autentikasi sebelum mengembalikan konten privat.",
        },
        {
          en: "Return URLs must be validated to prevent unsafe external redirects.",
          id: "Return URL harus divalidasi untuk mencegah redirect eksternal yang tidak aman.",
        },
      ],
    },
    {
      id: "profile-and-identity",
      title: {
        en: "Player Profile and Identity",
        id: "Profil dan Identitas Pemain",
      },
      paragraphs: [
        {
          en: "The public player identity is stored separately from authentication credentials. This separation allows applications to display usernames, display names, avatars, countries, roles, and other approved profile information without exposing sensitive authentication data.",
          id: "Identitas publik pemain disimpan terpisah dari kredensial autentikasi. Pemisahan ini memungkinkan aplikasi menampilkan username, display name, avatar, negara, role, dan informasi profil yang disetujui tanpa mengekspos data autentikasi sensitif.",
        },
      ],
      bullets: [
        {
          en: "Authentication credentials remain managed by Supabase Auth.",
          id: "Kredensial autentikasi tetap dikelola Supabase Auth.",
        },
        {
          en: "Public profile fields are stored in the profiles table.",
          id: "Field profil publik disimpan di tabel profiles.",
        },
        {
          en: "Profile access is constrained through database policies.",
          id: "Akses profil dibatasi melalui kebijakan database.",
        },
        {
          en: "Game and marketplace systems should reference the same canonical player identity.",
          id: "Sistem game dan marketplace harus menggunakan identitas pemain canonical yang sama.",
        },
      ],
    },
    {
      id: "database-foundation",
      title: {
        en: "Database Foundation",
        id: "Fondasi Database",
      },
      paragraphs: [
        {
          en: "Supabase PostgreSQL provides the current database foundation. Tables are organized around authenticated profiles, community interaction, public development evidence, and future connected product systems.",
          id: "Supabase PostgreSQL menyediakan fondasi database saat ini. Tabel disusun berdasarkan profil terautentikasi, interaksi komunitas, bukti pengembangan publik, dan sistem produk terhubung di masa mendatang.",
        },
      ],
      bullets: [
        {
          en: "profiles — canonical public player profile records.",
          id: "profiles — data profil publik pemain canonical.",
        },
        {
          en: "community_posts — community posts created by authenticated users.",
          id: "community_posts — post komunitas yang dibuat pengguna terautentikasi.",
        },
        {
          en: "community_comments — comments connected to community posts.",
          id: "community_comments — komentar yang terhubung dengan post komunitas.",
        },
        {
          en: "community_likes — per-user post reaction records.",
          id: "community_likes — data reaksi post per pengguna.",
        },
        {
          en: "community_bookmarks — private saved-post relationships.",
          id: "community_bookmarks — relasi post tersimpan yang bersifat privat.",
        },
        {
          en: "development_logs — public repository and development activity records.",
          id: "development_logs — data repository dan aktivitas pengembangan publik.",
        },
      ],
    },
    {
      id: "database-security",
      title: {
        en: "Database Security and RLS",
        id: "Keamanan Database dan RLS",
      },
      paragraphs: [
        {
          en: "Row Level Security is used to restrict direct database operations. Public content can be readable where appropriate, while user-owned records require authenticated ownership checks.",
          id: "Row Level Security digunakan untuk membatasi operasi database langsung. Konten publik dapat dibaca jika sesuai, sedangkan data milik pengguna memerlukan pemeriksaan kepemilikan terautentikasi.",
        },
      ],
      bullets: [
        {
          en: "Users can only modify profile and community records permitted by policy.",
          id: "Pengguna hanya dapat mengubah data profil dan komunitas yang diizinkan kebijakan.",
        },
        {
          en: "Private relationships such as bookmarks remain scoped to their owner.",
          id: "Relasi privat seperti bookmark tetap dibatasi kepada pemiliknya.",
        },
        {
          en: "Administrative operations should be performed through protected server environments.",
          id: "Operasi administratif harus dilakukan melalui environment server terproteksi.",
        },
        {
          en: "Service-role credentials must never be exposed to browser applications.",
          id: "Kredensial service role tidak boleh pernah diekspos ke aplikasi browser.",
        },
      ],
    },
    {
      id: "deployment-architecture",
      title: {
        en: "Deployment Architecture",
        id: "Arsitektur Deployment",
      },
      paragraphs: [
        {
          en: "Each public web application is deployed independently so it can have its own domain, environment variables, release lifecycle, and rollback path.",
          id: "Setiap aplikasi web publik di-deploy secara independen agar memiliki domain, environment variable, lifecycle rilis, dan jalur rollback masing-masing.",
        },
      ],
      bullets: [
        {
          en: "lifetopiaworld.io — main website and authentication entry point.",
          id: "lifetopiaworld.io — website utama dan entry point autentikasi.",
        },
        {
          en: "community.lifetopiaworld.io — community platform.",
          id: "community.lifetopiaworld.io — platform komunitas.",
        },
        {
          en: "grants.lifetopiaworld.io — funding review portal.",
          id: "grants.lifetopiaworld.io — portal review pendanaan.",
        },
        {
          en: "docs.lifetopiaworld.io — public documentation portal.",
          id: "docs.lifetopiaworld.io — portal dokumentasi publik.",
        },
        {
          en: "play.lifetopiaworld.io — public playable game build.",
          id: "play.lifetopiaworld.io — build game publik.",
        },
        {
          en: "Shared production configuration is coordinated through environment variables and documented domain rules.",
          id: "Konfigurasi produksi bersama dikoordinasikan melalui environment variable dan aturan domain yang terdokumentasi.",
        },
      ],
    },
    {
      id: "solana-integration",
      title: {
        en: "Solana Integration Direction",
        id: "Arah Integrasi Solana",
      },
      paragraphs: [
        {
          en: "Solana integration is planned as a gradual product layer. The system should first establish a normal Lifetopia account, then allow the player to connect a supported wallet when blockchain utility becomes relevant.",
          id: "Integrasi Solana direncanakan sebagai lapisan produk bertahap. Sistem terlebih dahulu membentuk akun Lifetopia biasa, kemudian memungkinkan pemain menghubungkan wallet yang didukung ketika utilitas blockchain menjadi relevan.",
        },
        {
          en: "Blockchain state should not replace all application data. Game progression, social interaction, moderation, and other high-frequency product data can remain off-chain while selected ownership and transaction records use Solana.",
          id: "State blockchain tidak harus menggantikan seluruh data aplikasi. Progression game, interaksi sosial, moderasi, dan data produk berfrekuensi tinggi lainnya dapat tetap off-chain, sedangkan data kepemilikan dan transaksi terpilih menggunakan Solana.",
        },
      ],
      bullets: [
        {
          en: "Phantom and Solflare are the planned wallet entry points.",
          id: "Phantom dan Solflare menjadi entry point wallet yang direncanakan.",
        },
        {
          en: "Wallet connection remains optional for normal non-blockchain access.",
          id: "Koneksi wallet tetap opsional untuk akses non-blockchain normal.",
        },
        {
          en: "Initial Beta verification uses Solana devnet interactions.",
          id: "Verifikasi awal Beta menggunakan interaksi Solana devnet.",
        },
        {
          en: "Ownership and marketplace functions should use explicit server and transaction validation.",
          id: "Fungsi kepemilikan dan marketplace harus menggunakan validasi server dan transaksi yang eksplisit.",
        },
      ],
    },
    {
      id: "security-boundaries",
      title: {
        en: "Public Security Boundaries",
        id: "Batasan Keamanan Publik",
      },
      paragraphs: [
        {
          en: "This documentation describes the product architecture at a level useful for reviewers and contributors without publishing secrets or operational details that could weaken system security.",
          id: "Dokumentasi ini menjelaskan arsitektur produk pada tingkat yang berguna bagi reviewer dan kontributor tanpa mempublikasikan secret atau detail operasional yang dapat melemahkan keamanan sistem.",
        },
      ],
      bullets: [
        {
          en: "No private keys, service-role secrets, or privileged environment values are published.",
          id: "Tidak ada private key, service-role secret, atau environment value istimewa yang dipublikasikan.",
        },
        {
          en: "Detailed policy definitions may be summarized rather than copied in full.",
          id: "Definisi policy detail dapat diringkas daripada disalin sepenuhnya.",
        },
        {
          en: "Internal administrative routes and security response procedures remain private.",
          id: "Route administratif internal dan prosedur respons keamanan tetap privat.",
        },
        {
          en: "Public contract or mint addresses should only be published after their intended network and status are verified.",
          id: "Alamat contract atau mint publik hanya boleh dipublikasikan setelah network dan statusnya diverifikasi.",
        },
      ],
    },
    {
      id: "architecture-next-steps",
      title: {
        en: "Architecture Next Steps",
        id: "Langkah Arsitektur Berikutnya",
      },
      bullets: [
        {
          en: "Complete shared identity integration across public products.",
          id: "Menyelesaikan integrasi identitas bersama di seluruh produk publik.",
        },
        {
          en: "Formalize game-to-platform service contracts.",
          id: "Memformalkan kontrak layanan game ke platform.",
        },
        {
          en: "Document database relationships and data ownership boundaries.",
          id: "Mendokumentasikan relasi database dan batasan kepemilikan data.",
        },
        {
          en: "Implement and test optional wallet connection flows.",
          id: "Mengimplementasikan dan menguji alur koneksi wallet opsional.",
        },
        {
          en: "Add architecture verification records as Beta systems are delivered.",
          id: "Menambahkan data verifikasi arsitektur saat sistem Beta dikirim.",
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