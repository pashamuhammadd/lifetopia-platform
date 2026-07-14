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
    en: "A reviewer-facing presentation covering Lifetopia's opportunity, connected products, execution evidence, Beta roadmap, funding allocation, team, and intended ecosystem impact.",
    id: "Presentasi untuk reviewer yang membahas peluang Lifetopia, produk terhubung, bukti eksekusi, roadmap Beta, alokasi pendanaan, tim, dan dampak ekosistem yang ditargetkan.",
  },

  status: "In Preparation",
  updatedAt: "2026-07-14",
  owner: "Pasha Muhammad",
  readingTime: 7,
  version: "0.2",

  featured: true,
  recentlyUpdated: true,

  keyTakeaways: [
    {
      en: "The pitch deck is being prepared as a concise visual summary of the evidence already available across the Funding Hub, documentation portal, live products, and public repository.",
      id: "Pitch deck sedang dipersiapkan sebagai ringkasan visual dari bukti yang sudah tersedia di Funding Hub, portal dokumentasi, produk live, dan repository publik.",
    },
    {
      en: "The presentation will clearly distinguish the current Beta project phase from the publicly accessible previous Alpha game build.",
      id: "Presentasi akan membedakan secara jelas fase proyek Beta saat ini dengan build game Alpha sebelumnya yang masih dapat diakses publik.",
    },
    {
      en: "The funding narrative focuses on connecting and expanding working foundations rather than financing an unbuilt concept.",
      id: "Narasi pendanaan berfokus menghubungkan dan memperluas fondasi yang sudah berjalan, bukan membiayai konsep yang belum dibangun.",
    },
    {
      en: "A downloadable PDF will be published only after its claims, numbers, links, and visual evidence have been reviewed.",
      id: "PDF yang dapat diunduh hanya akan dipublikasikan setelah klaim, angka, tautan, dan bukti visualnya diperiksa.",
    },
  ],

  sections: [
    {
      id: "presentation-purpose",
      title: {
        en: "Presentation Purpose",
        id: "Tujuan Presentasi",
      },
      paragraphs: [
        {
          en: "The Lifetopia World Pitch Deck is designed as a concise entry point for grant reviewers, ecosystem partners, and potential supporters who need to understand the project quickly.",
          id: "Pitch Deck Lifetopia World dirancang sebagai entry point ringkas bagi reviewer grant, partner ekosistem, dan calon pendukung yang perlu memahami proyek dengan cepat.",
        },
        {
          en: "The deck does not replace the detailed documentation portal. It summarizes the strongest project information and directs reviewers toward live products, technical documents, public development evidence, and milestone details.",
          id: "Pitch deck tidak menggantikan portal dokumentasi lengkap. Dokumen ini merangkum informasi terkuat dan mengarahkan reviewer menuju produk live, dokumen teknis, bukti pengembangan publik, dan detail milestone.",
        },
      ],
    },
    {
      id: "deck-preview",
      title: {
        en: "Pitch Deck Preview",
        id: "Preview Pitch Deck",
      },
      paragraphs: [
        {
          en: "The preview below represents the planned presentation structure. Slide wording, screenshots, and visual evidence may continue to change before the PDF is published.",
          id: "Preview di bawah menunjukkan struktur presentasi yang direncanakan. Teks slide, screenshot, dan bukti visual dapat terus berubah sebelum PDF dipublikasikan.",
        },
      ],
    },
    {
      id: "planned-slide-structure",
      title: {
        en: "Planned Slide Structure",
        id: "Struktur Slide yang Direncanakan",
      },
      bullets: [
        {
          en: "01 — Cover and funding request.",
          id: "01 — Cover dan permintaan pendanaan.",
        },
        {
          en: "02 — The Web3 onboarding problem.",
          id: "02 — Masalah onboarding Web3.",
        },
        {
          en: "03 — Lifetopia's experience-first solution.",
          id: "03 — Solusi Lifetopia yang berfokus pada pengalaman.",
        },
        {
          en: "04 — Connected product ecosystem.",
          id: "04 — Ekosistem produk terhubung.",
        },
        {
          en: "05 — Existing products and execution evidence.",
          id: "05 — Produk yang sudah tersedia dan bukti eksekusi.",
        },
        {
          en: "06 — Current Beta development phase.",
          id: "06 — Fase pengembangan Beta saat ini.",
        },
        {
          en: "07 — Three-milestone delivery roadmap.",
          id: "07 — Roadmap pengiriman tiga milestone.",
        },
        {
          en: "08 — Funding allocation and operational use.",
          id: "08 — Alokasi pendanaan dan penggunaan operasional.",
        },
        {
          en: "09 — Team and delivery ownership.",
          id: "09 — Tim dan tanggung jawab pengiriman.",
        },
        {
          en: "10 — Expected Beta impact and closing request.",
          id: "10 — Dampak Beta yang ditargetkan dan permintaan penutup.",
        },
      ],
    },
    {
      id: "evidence-included",
      title: {
        en: "Evidence Included in the Deck",
        id: "Bukti yang Dimasukkan ke Pitch Deck",
      },
      paragraphs: [
        {
          en: "The presentation will prioritize evidence that reviewers can verify independently rather than relying only on descriptive claims.",
          id: "Presentasi akan memprioritaskan bukti yang dapat diverifikasi reviewer secara independen, bukan hanya mengandalkan klaim deskriptif.",
        },
      ],
      bullets: [
        {
          en: "Main website, community platform, and playable Alpha links.",
          id: "Tautan website utama, platform komunitas, dan playable Alpha.",
        },
        {
          en: "Selected product screenshots from current public builds.",
          id: "Screenshot produk terpilih dari build publik saat ini.",
        },
        {
          en: "Public GitHub repository and recent development activity.",
          id: "Repository GitHub publik dan aktivitas pengembangan terbaru.",
        },
        {
          en: "Previous $5,000 grant delivery reference.",
          id: "Referensi pengiriman grant sebelumnya sebesar $5.000.",
        },
        {
          en: "Three milestone budgets and acceptance outcomes.",
          id: "Anggaran tiga milestone dan hasil penerimaannya.",
        },
        {
          en: "Links to the Project Overview, Beta Roadmap, and Technical Architecture documents.",
          id: "Tautan menuju Project Overview, Beta Roadmap, dan Technical Architecture.",
        },
      ],
    },
    {
      id: "funding-narrative",
      title: {
        en: "Funding Narrative",
        id: "Narasi Pendanaan",
      },
      paragraphs: [
        {
          en: "The core funding message is that Lifetopia has already moved beyond its earliest validation stages. The project has working public foundations but still requires integration, stabilization, testing, and ecosystem connectivity.",
          id: "Pesan utama pendanaan adalah Lifetopia sudah melewati tahap validasi awal. Proyek memiliki fondasi publik yang berjalan, tetapi masih memerlukan integrasi, stabilisasi, pengujian, dan konektivitas ekosistem.",
        },
        {
          en: "The requested $10,000 is intended to fund an estimated 8–12 week Beta delivery period divided into three milestones.",
          id: "Pendanaan sebesar $10.000 ditujukan untuk periode pengiriman Beta sekitar 8–12 minggu yang dibagi menjadi tiga milestone.",
        },
      ],
      bullets: [
        {
          en: "$3,500 — Community Platform Completion.",
          id: "$3.500 — Penyelesaian Platform Komunitas.",
        },
        {
          en: "$4,000 — Playable Beta Expansion.",
          id: "$4.000 — Ekspansi Playable Beta.",
        },
        {
          en: "$2,500 — Connected Solana Ecosystem.",
          id: "$2.500 — Ekosistem Solana Terhubung.",
        },
      ],
    },
    {
      id: "reviewer-journey",
      title: {
        en: "Reviewer Journey",
        id: "Perjalanan Reviewer",
      },
      paragraphs: [
        {
          en: "The pitch deck is intended to lead reviewers through a clear verification journey rather than ending at the final slide.",
          id: "Pitch deck dirancang untuk membawa reviewer melalui perjalanan verifikasi yang jelas, bukan berhenti di slide terakhir.",
        },
      ],
      bullets: [
        {
          en: "Understand the opportunity and proposed solution.",
          id: "Memahami peluang dan solusi yang diajukan.",
        },
        {
          en: "Review existing public products.",
          id: "Meninjau produk publik yang sudah tersedia.",
        },
        {
          en: "Inspect public development evidence.",
          id: "Memeriksa bukti pengembangan publik.",
        },
        {
          en: "Read detailed roadmap and technical documents.",
          id: "Membaca roadmap dan dokumen teknis secara lengkap.",
        },
        {
          en: "Evaluate the funding request against milestone outcomes.",
          id: "Mengevaluasi permintaan pendanaan berdasarkan hasil milestone.",
        },
      ],
    },
    {
      id: "publication-plan",
      title: {
        en: "Publication Plan",
        id: "Rencana Publikasi",
      },
      paragraphs: [
        {
          en: "The deck is currently in preparation. A final PDF download will be enabled after the visual presentation and all reviewer-facing claims have been checked.",
          id: "Pitch deck saat ini masih dipersiapkan. Download PDF final akan diaktifkan setelah presentasi visual dan seluruh klaim untuk reviewer selesai diperiksa.",
        },
      ],
      bullets: [
        {
          en: "Complete slide copy and visual hierarchy.",
          id: "Menyelesaikan teks slide dan hierarki visual.",
        },
        {
          en: "Capture current product screenshots.",
          id: "Mengambil screenshot produk terbaru.",
        },
        {
          en: "Verify funding, roadmap, team, and impact data.",
          id: "Memverifikasi data pendanaan, roadmap, tim, dan impact.",
        },
        {
          en: "Export and test the final presentation PDF.",
          id: "Mengekspor dan menguji PDF presentasi final.",
        },
        {
          en: "Publish the PDF and activate the download button.",
          id: "Mempublikasikan PDF dan mengaktifkan tombol download.",
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
          en: "This page describes a presentation that is still being prepared. The preview should not be interpreted as a completed or final funding deck.",
          id: "Halaman ini menjelaskan presentasi yang masih dipersiapkan. Preview tidak boleh dianggap sebagai pitch deck pendanaan yang sudah selesai atau final.",
        },
        {
          en: "The final deck may adjust wording, ordering, screenshots, and supporting evidence while preserving the documented funding request and milestone direction unless an official update is published.",
          id: "Pitch deck final dapat menyesuaikan teks, urutan, screenshot, dan bukti pendukung sambil mempertahankan permintaan pendanaan serta arah milestone yang terdokumentasi, kecuali pembaruan resmi dipublikasikan.",
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
    en: "Ecosystem Design Draft",
    id: "Draft Desain Ekosistem",
  },

  description: {
    en: "A public draft describing Lifetopia's connected game and community ecosystem, player identity, progression, COIN and GOLD economy, marketplace direction, digital ownership, Solana integration, and long-term governance principles.",
    id: "Draft publik yang menjelaskan ekosistem game dan komunitas Lifetopia, identitas pemain, progression, ekonomi COIN dan GOLD, arah marketplace, kepemilikan digital, integrasi Solana, dan prinsip governance jangka panjang.",
  },

  status: "Public Draft",
  updatedAt: "2026-07-14",
  owner: "Pasha Muhammad",
  readingTime: 18,
  version: "0.2",

  featured: true,
  recentlyUpdated: true,

  keyTakeaways: [
    {
      en: "Lifetopia is designed as a connected game and community ecosystem rather than a blockchain product with gameplay added afterward.",
      id: "Lifetopia dirancang sebagai ekosistem game dan komunitas yang terhubung, bukan produk blockchain yang kemudian ditambahkan gameplay.",
    },
    {
      en: "Most high-frequency gameplay and social data can remain off-chain, while Solana is used selectively for wallets, ownership, marketplace activity, and verifiable transactions.",
      id: "Sebagian besar data gameplay dan sosial berfrekuensi tinggi dapat tetap off-chain, sedangkan Solana digunakan secara selektif untuk wallet, ownership, marketplace, dan transaksi yang dapat diverifikasi.",
    },
    {
      en: "COIN supports the normal gameplay loop, while GOLD is intended for selected premium and ecosystem utility without replacing the complete player economy.",
      id: "COIN mendukung gameplay loop normal, sedangkan GOLD ditujukan untuk utilitas premium dan ekosistem tertentu tanpa menggantikan seluruh ekonomi pemain.",
    },
    {
      en: "Tokenomics, marketplace rules, ownership rights, and governance mechanisms remain subject to testing and must not be interpreted as final commitments.",
      id: "Tokenomics, aturan marketplace, hak kepemilikan, dan mekanisme governance masih harus diuji dan tidak boleh dianggap sebagai komitmen final.",
    },
  ],

  sections: [
    {
      id: "whitepaper-purpose",
      title: {
        en: "Purpose of This Whitepaper",
        id: "Tujuan Whitepaper",
      },
      paragraphs: [
        {
          en: "This Whitepaper describes the current direction of Lifetopia World as a connected cozy life-simulation, social sandbox, community platform, and future player economy.",
          id: "Whitepaper ini menjelaskan arah Lifetopia World sebagai life-simulation cozy, social sandbox, platform komunitas, dan ekonomi pemain masa depan yang saling terhubung.",
        },
        {
          en: "It is published as a working document so reviewers, contributors, and community members can understand the intended product model while development continues.",
          id: "Dokumen ini dipublikasikan sebagai working document agar reviewer, kontributor, dan anggota komunitas dapat memahami model produk yang ditargetkan selama pengembangan berlangsung.",
        },
        {
          en: "Sections describing economy, GOLD, ownership, marketplace systems, and governance represent design direction rather than final legal, financial, or technical commitments.",
          id: "Bagian mengenai ekonomi, GOLD, ownership, marketplace, dan governance merupakan arah desain, bukan komitmen legal, finansial, atau teknis yang final.",
        },
      ],
    },
    {
      id: "ecosystem-vision",
      title: {
        en: "Ecosystem Vision",
        id: "Visi Ekosistem",
      },
      paragraphs: [
        {
          en: "Lifetopia aims to become a welcoming digital world where players can explore, build routines, participate in a community, develop an identity, and gradually access digital ownership features.",
          id: "Lifetopia bertujuan menjadi dunia digital yang ramah, tempat pemain dapat menjelajah, membangun rutinitas, berpartisipasi dalam komunitas, mengembangkan identitas, dan secara bertahap mengakses fitur kepemilikan digital.",
        },
        {
          en: "The project combines a playable world, community platform, shared account system, future marketplace, and Solana utility layer into one coherent player journey.",
          id: "Proyek menggabungkan playable world, platform komunitas, sistem akun bersama, marketplace mendatang, dan lapisan utilitas Solana menjadi satu perjalanan pemain yang utuh.",
        },
      ],
      bullets: [
        {
          en: "A cozy and accessible experience for players with or without prior Web3 knowledge.",
          id: "Pengalaman cozy dan mudah diakses oleh pemain dengan atau tanpa pengetahuan Web3.",
        },
        {
          en: "One player identity across the game, community, and future marketplace.",
          id: "Satu identitas pemain di game, komunitas, dan marketplace mendatang.",
        },
        {
          en: "Optional blockchain participation introduced through practical utility.",
          id: "Partisipasi blockchain opsional yang diperkenalkan melalui utilitas praktis.",
        },
        {
          en: "A public development process with reviewable products and documentation.",
          id: "Proses pengembangan publik dengan produk dan dokumentasi yang dapat ditinjau.",
        },
      ],
    },
    {
      id: "core-game-experience",
      title: {
        en: "Core Game Experience",
        id: "Pengalaman Utama Game",
      },
      paragraphs: [
        {
          en: "The playable world is structured around relaxing life-simulation activities, social interaction, collection, progression, and player-driven routines.",
          id: "Playable world disusun berdasarkan aktivitas life-simulation yang santai, interaksi sosial, koleksi, progression, dan rutinitas yang dibentuk pemain.",
        },
      ],
      bullets: [
        {
          en: "Farming and resource production.",
          id: "Farming dan produksi sumber daya.",
        },
        {
          en: "Fishing, gathering, mining, and exploration.",
          id: "Fishing, gathering, mining, dan eksplorasi.",
        },
        {
          en: "Cooking, crafting, and item collection.",
          id: "Cooking, crafting, dan koleksi item.",
        },
        {
          en: "Animal care and world activities.",
          id: "Perawatan hewan dan aktivitas dunia.",
        },
        {
          en: "Trading, marketplace participation, and social interaction.",
          id: "Trading, partisipasi marketplace, dan interaksi sosial.",
        },
        {
          en: "Daily quests, achievements, events, and long-term progression.",
          id: "Daily quest, achievement, event, dan progression jangka panjang.",
        },
      ],
    },
    {
      id: "social-and-community-layer",
      title: {
        en: "Social and Community Layer",
        id: "Lapisan Sosial dan Komunitas",
      },
      paragraphs: [
        {
          en: "The community platform extends the player experience beyond the game. It provides a place for identity, discussion, development updates, feedback, and future ecosystem participation.",
          id: "Platform komunitas memperluas pengalaman pemain di luar game. Platform menyediakan tempat untuk identitas, diskusi, update pengembangan, feedback, dan partisipasi ekosistem mendatang.",
        },
      ],
      bullets: [
        {
          en: "Public player profiles and Lifetopia-themed roles.",
          id: "Profil pemain publik dan role bertema Lifetopia.",
        },
        {
          en: "Posts, comments, likes, bookmarks, and community feeds.",
          id: "Post, komentar, like, bookmark, dan feed komunitas.",
        },
        {
          en: "Tester communication and structured feedback.",
          id: "Komunikasi tester dan feedback terstruktur.",
        },
        {
          en: "Development updates and public project evidence.",
          id: "Update pengembangan dan bukti proyek publik.",
        },
        {
          en: "Future guild, event, and governance participation.",
          id: "Partisipasi guild, event, dan governance di masa mendatang.",
        },
      ],
    },
    {
      id: "player-identity",
      title: {
        en: "Player Identity",
        id: "Identitas Pemain",
      },
      paragraphs: [
        {
          en: "A Lifetopia account represents the canonical player identity across connected products. Authentication credentials remain separate from public profile and gameplay information.",
          id: "Akun Lifetopia mewakili identitas canonical pemain di seluruh produk terhubung. Kredensial autentikasi tetap terpisah dari informasi profil publik dan gameplay.",
        },
        {
          en: "Wallet connectivity may later be attached to the player identity, but a wallet is not required to create an account or access normal non-blockchain features.",
          id: "Konektivitas wallet nantinya dapat dihubungkan ke identitas pemain, tetapi wallet tidak diwajibkan untuk membuat akun atau mengakses fitur non-blockchain normal.",
        },
      ],
      bullets: [
        {
          en: "Username, display name, avatar, country, and player role.",
          id: "Username, display name, avatar, negara, dan role pemain.",
        },
        {
          en: "Community activity and social reputation.",
          id: "Aktivitas komunitas dan reputasi sosial.",
        },
        {
          en: "Gameplay progression and achievement records.",
          id: "Data progression gameplay dan achievement.",
        },
        {
          en: "Optional connected wallet information.",
          id: "Informasi wallet terhubung yang bersifat opsional.",
        },
        {
          en: "Future marketplace and ownership history.",
          id: "Riwayat marketplace dan ownership mendatang.",
        },
      ],
    },
    {
      id: "progression-model",
      title: {
        en: "Player Progression Model",
        id: "Model Progression Pemain",
      },
      paragraphs: [
        {
          en: "Progression should reward continued participation without making financial spending the primary path to advancement.",
          id: "Progression harus menghargai partisipasi berkelanjutan tanpa menjadikan pengeluaran finansial sebagai jalur utama untuk berkembang.",
        },
      ],
      bullets: [
        {
          en: "Activity progression through farming, fishing, cooking, exploration, and other systems.",
          id: "Progression aktivitas melalui farming, fishing, cooking, eksplorasi, dan sistem lainnya.",
        },
        {
          en: "Account progression through quests, achievements, and participation.",
          id: "Progression akun melalui quest, achievement, dan partisipasi.",
        },
        {
          en: "Collection progression through items, cosmetics, resources, and optional ownership.",
          id: "Progression koleksi melalui item, cosmetic, sumber daya, dan ownership opsional.",
        },
        {
          en: "Community progression through contribution, testing, events, and roles.",
          id: "Progression komunitas melalui kontribusi, testing, event, dan role.",
        },
      ],
    },
    {
      id: "economy-design",
      title: {
        en: "Economy Design",
        id: "Desain Ekonomi",
      },
      paragraphs: [
        {
          en: "The Lifetopia economy is designed as a layered system. Normal gameplay activity should not require every action to become a blockchain transaction.",
          id: "Ekonomi Lifetopia dirancang sebagai sistem berlapis. Aktivitas gameplay normal tidak mengharuskan setiap tindakan menjadi transaksi blockchain.",
        },
        {
          en: "High-frequency actions can remain off-chain for usability and performance, while selected premium utility, ownership, marketplace, and verification functions may use Solana.",
          id: "Tindakan berfrekuensi tinggi dapat tetap off-chain untuk usability dan performa, sedangkan utilitas premium, ownership, marketplace, dan fungsi verifikasi tertentu dapat menggunakan Solana.",
        },
      ],
    },
    {
      id: "coin-economy",
      title: {
        en: "COIN — Core Gameplay Currency",
        id: "COIN — Mata Uang Utama Gameplay",
      },
      paragraphs: [
        {
          en: "COIN is intended as the normal off-chain gameplay currency used throughout the everyday player loop.",
          id: "COIN ditujukan sebagai mata uang gameplay off-chain normal yang digunakan dalam aktivitas sehari-hari pemain.",
        },
      ],
      bullets: [
        {
          en: "Earned through gameplay activities, quests, production, and trading.",
          id: "Diperoleh melalui aktivitas gameplay, quest, produksi, dan trading.",
        },
        {
          en: "Used for common items, resources, upgrades, and routine services.",
          id: "Digunakan untuk item umum, sumber daya, upgrade, dan layanan rutin.",
        },
        {
          en: "Designed for frequent use without transaction fees.",
          id: "Dirancang untuk penggunaan berfrekuensi tinggi tanpa biaya transaksi.",
        },
        {
          en: "Balanced through gameplay sinks, rewards, and production systems.",
          id: "Diseimbangkan melalui gameplay sink, reward, dan sistem produksi.",
        },
        {
          en: "Not intended to function as a transferable blockchain token.",
          id: "Tidak ditujukan sebagai token blockchain yang dapat ditransfer.",
        },
      ],
    },
    {
      id: "gold-economy",
      title: {
        en: "GOLD — Premium Ecosystem Utility",
        id: "GOLD — Utilitas Premium Ekosistem",
      },
      paragraphs: [
        {
          en: "GOLD is intended as a selected premium and ecosystem utility layer. Its role should remain narrower than the complete gameplay economy.",
          id: "GOLD ditujukan sebagai lapisan utilitas premium dan ekosistem tertentu. Perannya harus tetap lebih terbatas daripada keseluruhan ekonomi gameplay.",
        },
        {
          en: "The final GOLD utility, supply distribution, liquidity model, marketplace rules, and regulatory treatment are not finalized in this Whitepaper draft.",
          id: "Utilitas GOLD final, distribusi supply, model liquidity, aturan marketplace, dan perlakuan regulasinya belum difinalisasi dalam draft Whitepaper ini.",
        },
      ],
      bullets: [
        {
          en: "Selected premium cosmetics or services.",
          id: "Cosmetic atau layanan premium tertentu.",
        },
        {
          en: "Marketplace settlement where blockchain utility is appropriate.",
          id: "Penyelesaian marketplace ketika utilitas blockchain relevan.",
        },
        {
          en: "Event, creator, or ecosystem participation mechanisms.",
          id: "Mekanisme partisipasi event, creator, atau ekosistem.",
        },
        {
          en: "Potential ownership and asset-related utility.",
          id: "Potensi utilitas terkait ownership dan asset.",
        },
        {
          en: "Utility must be reviewed through testing before becoming final.",
          id: "Utilitas harus ditinjau melalui pengujian sebelum difinalisasi.",
        },
      ],
    },
    {
      id: "marketplace-direction",
      title: {
        en: "Marketplace Direction",
        id: "Arah Marketplace",
      },
      paragraphs: [
        {
          en: "The future marketplace is intended to connect player discovery, listing, trading, ownership verification, and ecosystem utility through a controlled interface.",
          id: "Marketplace mendatang ditujukan untuk menghubungkan discovery, listing, trading, verifikasi ownership, dan utilitas ekosistem melalui interface yang terkontrol.",
        },
      ],
      bullets: [
        {
          en: "Clear distinction between normal off-chain items and blockchain-linked assets.",
          id: "Pembedaan jelas antara item off-chain normal dan asset terhubung blockchain.",
        },
        {
          en: "Server-side verification before sensitive marketplace operations.",
          id: "Verifikasi server sebelum operasi marketplace sensitif.",
        },
        {
          en: "Transparent fees, ownership state, and transaction confirmation.",
          id: "Fee, status ownership, dan konfirmasi transaksi yang transparan.",
        },
        {
          en: "Protection against duplicate listings and invalid ownership claims.",
          id: "Perlindungan terhadap listing duplikat dan klaim ownership yang tidak valid.",
        },
        {
          en: "Gradual rollout beginning with controlled Beta testing.",
          id: "Peluncuran bertahap yang dimulai melalui pengujian Beta terkontrol.",
        },
      ],
    },
    {
      id: "digital-ownership",
      title: {
        en: "Digital Ownership Principles",
        id: "Prinsip Kepemilikan Digital",
      },
      paragraphs: [
        {
          en: "Digital ownership should provide understandable utility rather than requiring every game item to become an on-chain asset.",
          id: "Kepemilikan digital harus memberikan utilitas yang mudah dipahami tanpa mengharuskan seluruh item game menjadi asset on-chain.",
        },
      ],
      bullets: [
        {
          en: "Ownership should be optional and clearly communicated.",
          id: "Ownership harus opsional dan dikomunikasikan secara jelas.",
        },
        {
          en: "Asset utility should be documented before sale or distribution.",
          id: "Utilitas asset harus didokumentasikan sebelum penjualan atau distribusi.",
        },
        {
          en: "On-chain ownership does not automatically grant intellectual property rights.",
          id: "Ownership on-chain tidak otomatis memberikan hak kekayaan intelektual.",
        },
        {
          en: "Game balance and access must not depend entirely on ownership spending.",
          id: "Keseimbangan game dan akses tidak boleh sepenuhnya bergantung pada pengeluaran ownership.",
        },
        {
          en: "Transferability may differ between asset classes and tester rewards.",
          id: "Transferability dapat berbeda antara kelas asset dan reward tester.",
        },
      ],
    },
    {
      id: "solana-integration-principles",
      title: {
        en: "Solana Integration Principles",
        id: "Prinsip Integrasi Solana",
      },
      paragraphs: [
        {
          en: "Solana is used where public verification, wallet ownership, settlement, or asset transfer provides meaningful product value.",
          id: "Solana digunakan ketika verifikasi publik, ownership wallet, settlement, atau transfer asset memberikan nilai produk yang berarti.",
        },
      ],
      bullets: [
        {
          en: "Wallet connection remains optional for normal product access.",
          id: "Koneksi wallet tetap opsional untuk akses produk normal.",
        },
        {
          en: "Phantom and Solflare are the planned initial wallet integrations.",
          id: "Phantom dan Solflare menjadi integrasi wallet awal yang direncanakan.",
        },
        {
          en: "Beta validation begins through selected devnet interactions.",
          id: "Validasi Beta dimulai melalui interaksi devnet terpilih.",
        },
        {
          en: "Transactions must display clear intent before signature.",
          id: "Transaksi harus menampilkan maksud yang jelas sebelum signature.",
        },
        {
          en: "The application must verify transaction results instead of trusting browser state alone.",
          id: "Aplikasi harus memverifikasi hasil transaksi dan tidak hanya mempercayai state browser.",
        },
      ],
    },
    {
      id: "community-governance",
      title: {
        en: "Community and Governance Direction",
        id: "Arah Komunitas dan Governance",
      },
      paragraphs: [
        {
          en: "Lifetopia may gradually introduce community participation in product feedback, event selection, ecosystem proposals, and selected governance decisions.",
          id: "Lifetopia dapat secara bertahap memperkenalkan partisipasi komunitas dalam feedback produk, pemilihan event, proposal ekosistem, dan keputusan governance tertentu.",
        },
        {
          en: "Governance should not be activated only because a token exists. Responsibilities, safety boundaries, voter eligibility, and decision scope must first be defined.",
          id: "Governance tidak boleh diaktifkan hanya karena token tersedia. Tanggung jawab, batasan keamanan, kelayakan voter, dan scope keputusan harus didefinisikan terlebih dahulu.",
        },
      ],
      bullets: [
        {
          en: "Structured feedback and community voting experiments.",
          id: "Eksperimen feedback terstruktur dan voting komunitas.",
        },
        {
          en: "Transparent proposal scope and decision authority.",
          id: "Scope proposal dan otoritas keputusan yang transparan.",
        },
        {
          en: "Protection against low-participation or manipulated outcomes.",
          id: "Perlindungan terhadap hasil dengan partisipasi rendah atau manipulatif.",
        },
        {
          en: "Administrative and security decisions remain with the responsible team where required.",
          id: "Keputusan administratif dan keamanan tetap berada pada tim yang bertanggung jawab jika diperlukan.",
        },
      ],
    },
    {
      id: "sustainability-principles",
      title: {
        en: "Economic Sustainability Principles",
        id: "Prinsip Keberlanjutan Ekonomi",
      },
      bullets: [
        {
          en: "Gameplay value should not depend entirely on token price.",
          id: "Nilai gameplay tidak boleh sepenuhnya bergantung pada harga token.",
        },
        {
          en: "Rewards must be balanced with meaningful sinks and utility.",
          id: "Reward harus diseimbangkan dengan sink dan utilitas yang berarti.",
        },
        {
          en: "Premium systems should not remove the value of normal progression.",
          id: "Sistem premium tidak boleh menghilangkan nilai progression normal.",
        },
        {
          en: "Marketplace growth must follow actual player demand and product readiness.",
          id: "Pertumbuhan marketplace harus mengikuti demand pemain dan kesiapan produk.",
        },
        {
          en: "Economic rules should be tested before becoming permanent.",
          id: "Aturan ekonomi harus diuji sebelum menjadi permanen.",
        },
      ],
    },
    {
      id: "risks-and-limitations",
      title: {
        en: "Risks and Limitations",
        id: "Risiko dan Keterbatasan",
      },
      paragraphs: [
        {
          en: "Game economies and blockchain systems introduce technical, economic, security, regulatory, and user-experience risks.",
          id: "Ekonomi game dan sistem blockchain memperkenalkan risiko teknis, ekonomi, keamanan, regulasi, dan user experience.",
        },
      ],
      bullets: [
        {
          en: "Economic imbalance, inflation, or insufficient item demand.",
          id: "Ketidakseimbangan ekonomi, inflasi, atau demand item yang tidak mencukupi.",
        },
        {
          en: "Wallet security mistakes and transaction misunderstanding.",
          id: "Kesalahan keamanan wallet dan kesalahpahaman transaksi.",
        },
        {
          en: "Marketplace abuse, fraud, invalid listings, or manipulated activity.",
          id: "Penyalahgunaan marketplace, fraud, listing tidak valid, atau aktivitas manipulatif.",
        },
        {
          en: "Smart contract, integration, infrastructure, or availability failures.",
          id: "Kegagalan smart contract, integrasi, infrastruktur, atau availability.",
        },
        {
          en: "Changes in legal, regulatory, platform, or ecosystem requirements.",
          id: "Perubahan persyaratan legal, regulasi, platform, atau ekosistem.",
        },
      ],
    },
    {
      id: "draft-status",
      title: {
        en: "Draft Status and Future Updates",
        id: "Status Draft dan Pembaruan Mendatang",
      },
      paragraphs: [
        {
          en: "This Whitepaper remains a Public Draft. Product development, testing, community feedback, security review, and ecosystem requirements may change its contents.",
          id: "Whitepaper ini tetap berstatus Public Draft. Pengembangan produk, pengujian, feedback komunitas, review keamanan, dan kebutuhan ekosistem dapat mengubah isinya.",
        },
        {
          en: "A separate Tokenomics document will be published only when GOLD supply use, distribution, vesting, liquidity, marketplace utility, and related commitments are ready for formal review.",
          id: "Dokumen Tokenomics terpisah hanya akan dipublikasikan ketika penggunaan supply GOLD, distribusi, vesting, liquidity, utilitas marketplace, dan komitmen terkait siap untuk ditinjau secara formal.",
        },
      ],
      bullets: [
        {
          en: "Complete the connected Beta economy foundation.",
          id: "Menyelesaikan fondasi ekonomi Beta terhubung.",
        },
        {
          en: "Test COIN sources, sinks, progression, and pricing.",
          id: "Menguji source, sink, progression, dan pricing COIN.",
        },
        {
          en: "Define controlled GOLD utility and marketplace boundaries.",
          id: "Mendefinisikan utilitas GOLD dan batasan marketplace secara terkontrol.",
        },
        {
          en: "Perform security, economic, and compliance review.",
          id: "Melakukan review keamanan, ekonomi, dan compliance.",
        },
        {
          en: "Publish versioned updates as systems become final.",
          id: "Mempublikasikan update berversi ketika sistem mulai final.",
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