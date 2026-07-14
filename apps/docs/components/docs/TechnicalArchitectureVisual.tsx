import type { DocsLocale } from "@repo/docs-data";

type TechnicalArchitectureVisualProps = {
  locale: DocsLocale;
};

type ArchitectureVisualProps = {
  locale: DocsLocale;
};

const content = {
  en: {
    systemEyebrow: "System Landscape",
    systemTitle: "Connected products with shared foundations",
    website: "Main Website",
    websiteDetail: "Project access and authentication",
    community: "Community",
    communityDetail: "Profiles and social interaction",
    grants: "Funding Hub",
    grantsDetail: "Reviewer-facing proposal",
    docs: "Documentation",
    docsDetail: "Public project knowledge",
    game: "Playable Game",
    gameDetail: "Gameplay and progression",
    sharedPackages: "Shared Packages",
    sharedPackagesDetail:
      "Types, utilities, services, and docs data",
    supabase: "Supabase",
    supabaseDetail:
      "Authentication, database, RLS, and profiles",
    solana: "Solana",
    solanaDetail:
      "Optional wallet and ownership layer",
    systemFooter:
      "Applications remain independently deployable while sharing approved identity, data, and service contracts.",

    authEyebrow: "Shared Authentication",
    authTitle: "One account across Lifetopia products",
    authSteps: [
      "Player opens a Lifetopia product",
      "Unauthenticated access redirects to the website login",
      "Supabase verifies the account",
      "A shared session and profile are resolved",
      "The player returns to the originating product",
    ],
    authFooter:
      "Return destinations must remain internal and validated before redirecting the user.",

    solanaEyebrow: "Solana Integration",
    solanaTitle: "Blockchain utility remains optional",
    playerAccount: "Lifetopia Account",
    playerAccountDetail: "Normal product access",
    walletConnection: "Wallet Connection",
    walletConnectionDetail: "Phantom or Solflare",
    devnet: "Solana Devnet",
    devnetDetail: "Beta verification",
    ownership: "Ownership & Marketplace",
    ownershipDetail: "Selected on-chain records",
    offchain: "Off-chain Product Data",
    offchainDetail:
      "Progression, social, moderation, and high-frequency state",
    solanaFooter:
      "Wallet connectivity must enhance the experience without blocking non-wallet players.",
  },

  id: {
    systemEyebrow: "Lanskap Sistem",
    systemTitle: "Produk terhubung dengan fondasi bersama",
    website: "Website Utama",
    websiteDetail: "Akses proyek dan autentikasi",
    community: "Komunitas",
    communityDetail: "Profil dan interaksi sosial",
    grants: "Funding Hub",
    grantsDetail: "Proposal untuk reviewer",
    docs: "Dokumentasi",
    docsDetail: "Pengetahuan proyek publik",
    game: "Playable Game",
    gameDetail: "Gameplay dan progression",
    sharedPackages: "Package Bersama",
    sharedPackagesDetail:
      "Type, utility, service, dan data docs",
    supabase: "Supabase",
    supabaseDetail:
      "Autentikasi, database, RLS, dan profil",
    solana: "Solana",
    solanaDetail:
      "Lapisan wallet dan kepemilikan opsional",
    systemFooter:
      "Aplikasi tetap dapat di-deploy secara independen sambil berbagi kontrak identitas, data, dan layanan yang disetujui.",

    authEyebrow: "Autentikasi Bersama",
    authTitle: "Satu akun di seluruh produk Lifetopia",
    authSteps: [
      "Pemain membuka produk Lifetopia",
      "Akses tanpa login diarahkan ke website login",
      "Supabase memverifikasi akun",
      "Sesi bersama dan profil diselesaikan",
      "Pemain kembali ke produk asal",
    ],
    authFooter:
      "Tujuan kembali harus tetap internal dan divalidasi sebelum pengguna diarahkan.",

    solanaEyebrow: "Integrasi Solana",
    solanaTitle: "Utilitas blockchain tetap opsional",
    playerAccount: "Akun Lifetopia",
    playerAccountDetail: "Akses produk normal",
    walletConnection: "Koneksi Wallet",
    walletConnectionDetail: "Phantom atau Solflare",
    devnet: "Solana Devnet",
    devnetDetail: "Verifikasi Beta",
    ownership: "Ownership & Marketplace",
    ownershipDetail: "Data on-chain terpilih",
    offchain: "Data Produk Off-chain",
    offchainDetail:
      "Progression, sosial, moderasi, dan state berfrekuensi tinggi",
    solanaFooter:
      "Konektivitas wallet harus meningkatkan pengalaman tanpa menghalangi pemain tanpa wallet.",
  },
};

function NodeIcon({
  kind,
}: {
  kind:
    | "web"
    | "community"
    | "document"
    | "game"
    | "package"
    | "database"
    | "wallet";
}) {
  if (kind === "community") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 19a4 4 0 0 1 7 0" />
      </svg>
    );
  }

  if (kind === "document") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h4M9 12h6M9 16h6" />
      </svg>
    );
  }

  if (kind === "game") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M8 8h8a5 5 0 0 1 4.7 6.7l-1.1 3.1a2 2 0 0 1-3.3.8L14.7 17H9.3l-1.6 1.6a2 2 0 0 1-3.3-.8l-1.1-3.1A5 5 0 0 1 8 8Z" />
        <path d="M8 12v3M6.5 13.5h3M16.5 12.5h.01M18 14h.01" />
      </svg>
    );
  }

  if (kind === "package") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </svg>
    );
  }

  if (kind === "database") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </svg>
    );
  }

  if (kind === "wallet") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-[1.05rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5Z" />
        <path d="M4 7h14M15 11h5v5h-5a2.5 2.5 0 0 1 0-5Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16" />
    </svg>
  );
}

function ArchitectureNode({
  title,
  description,
  kind,
  className,
}: {
  title: string;
  description: string;
  kind:
    | "web"
    | "community"
    | "document"
    | "game"
    | "package"
    | "database"
    | "wallet";
  className: string;
}) {
  return (
    <article
      className={`group relative z-10 min-w-0 rounded-[0.78rem] border p-3 shadow-[0_0.55rem_1.6rem_rgba(74,56,37,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--docs-shadow-card)] ${className}`}
    >
      <span className="flex size-9 items-center justify-center rounded-[0.62rem] border border-[var(--docs-line)] bg-white/60 text-[var(--docs-brown-dark)] transition group-hover:scale-105">
        <NodeIcon kind={kind} />
      </span>

      <h4 className="mt-2.5 text-[0.74rem] font-extrabold text-[var(--docs-ink)]">
        {title}
      </h4>

      <p className="mt-1 text-[0.62rem] font-medium leading-[1.4] text-[var(--docs-muted)]">
        {description}
      </p>
    </article>
  );
}

export function TechnicalArchitectureVisual({
  locale,
}: TechnicalArchitectureVisualProps) {
  const text = content[locale];

  return (
    <div className="mt-5 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] p-[clamp(0.8rem,1.8vw,1.25rem)] shadow-[var(--docs-shadow-soft)]">
      <header className="border-b border-[var(--docs-line)] pb-3">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-sky-dark)]">
          {text.systemEyebrow}
        </p>

        <h3 className="mt-1 text-[clamp(0.95rem,1.3vw,1.22rem)] font-extrabold text-[var(--docs-ink)]">
          {text.systemTitle}
        </h3>
      </header>

      <div className="relative mt-4">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[12%] hidden h-[76%] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,var(--docs-line-strong),transparent)] lg:block"
        />

        <span
          aria-hidden="true"
          className="absolute left-[8%] right-[8%] top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent,var(--docs-line-strong),transparent)] lg:block"
        />

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <ArchitectureNode
            title={text.website}
            description={text.websiteDetail}
            kind="web"
            className="border-[#e2cfa2] bg-[#fff6db]"
          />

          <ArchitectureNode
            title={text.community}
            description={text.communityDetail}
            kind="community"
            className="border-[#c7dce6] bg-[#eaf5fa]"
          />

          <ArchitectureNode
            title={text.grants}
            description={text.grantsDetail}
            kind="document"
            className="border-[#cedbc2] bg-[#eef4e9]"
          />

          <ArchitectureNode
            title={text.docs}
            description={text.docsDetail}
            kind="document"
            className="border-[#d5c9dc] bg-[#f3edf5]"
          />
        </div>

        <div className="relative z-20 mx-auto my-4 grid max-w-[38rem] gap-2.5 sm:grid-cols-2">
          <ArchitectureNode
            title={text.sharedPackages}
            description={text.sharedPackagesDetail}
            kind="package"
            className="border-[#d9cbb7] bg-[#f8f1e6]"
          />

          <ArchitectureNode
            title={text.supabase}
            description={text.supabaseDetail}
            kind="database"
            className="border-[#bad8c4] bg-[#e8f5eb]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:mx-auto lg:max-w-[38rem]">
          <ArchitectureNode
            title={text.game}
            description={text.gameDetail}
            kind="game"
            className="border-[#d5c3ad] bg-[#f8eadf]"
          />

          <ArchitectureNode
            title={text.solana}
            description={text.solanaDetail}
            kind="wallet"
            className="border-[#cbc6e7] bg-[#efedfa]"
          />
        </div>
      </div>

      <footer className="mt-4 flex items-start gap-3 rounded-[0.75rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3.5 py-3">
        <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[var(--docs-sage)]" />

        <p className="text-[0.7rem] font-semibold leading-[1.5] text-[var(--docs-muted)]">
          {text.systemFooter}
        </p>
      </footer>
    </div>
  );
}

export function AuthenticationFlowVisual({
  locale,
}: ArchitectureVisualProps) {
  const text = content[locale];

  return (
    <div className="mt-5 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] p-[clamp(0.8rem,1.8vw,1.25rem)] shadow-[var(--docs-shadow-soft)]">
      <header className="border-b border-[var(--docs-line)] pb-3">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-sky-dark)]">
          {text.authEyebrow}
        </p>

        <h3 className="mt-1 text-[clamp(0.95rem,1.3vw,1.22rem)] font-extrabold text-[var(--docs-ink)]">
          {text.authTitle}
        </h3>
      </header>

      <div className="relative mt-4 grid gap-7 lg:grid-cols-5 lg:gap-3">
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-1/2 top-4 w-[0.14rem] -translate-x-1/2 bg-[linear-gradient(to_bottom,#c99b43,#6c9fbd,#8da27a)] opacity-35 lg:bottom-auto lg:left-[5%] lg:right-[5%] lg:top-1/2 lg:h-[0.14rem] lg:w-auto lg:-translate-y-1/2 lg:translate-x-0 lg:bg-gradient-to-r"
        />

        {text.authSteps.map((step, index) => (
          <article
            key={step}
            className="relative z-10 rounded-[0.78rem] border border-[var(--docs-line)] bg-[var(--docs-paper)] px-3 py-3 text-center shadow-[var(--docs-shadow-soft)]"
          >
            <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-[var(--docs-gold-soft)] font-mono text-[0.6rem] font-black text-[var(--docs-gold-dark)]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="mt-2 text-[0.66rem] font-extrabold leading-[1.4] text-[var(--docs-ink-soft)]">
              {step}
            </p>

            {index < text.authSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-[1.15rem] left-1/2 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--docs-brown-dark)] text-[0.58rem] font-black text-white lg:-right-[1.05rem] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
              >
                →
              </span>
            ) : null}
          </article>
        ))}
      </div>

      <footer className="mt-4 flex items-start gap-3 rounded-[0.75rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3.5 py-3">
        <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[var(--docs-gold)]" />

        <p className="text-[0.7rem] font-semibold leading-[1.5] text-[var(--docs-muted)]">
          {text.authFooter}
        </p>
      </footer>
    </div>
  );
}

export function SolanaIntegrationVisual({
  locale,
}: ArchitectureVisualProps) {
  const text = content[locale];

  const nodes = [
    {
      title: text.playerAccount,
      description: text.playerAccountDetail,
      kind: "web" as const,
      classes:
        "border-[#e2cfa2] bg-[#fff6db]",
    },
    {
      title: text.walletConnection,
      description: text.walletConnectionDetail,
      kind: "wallet" as const,
      classes:
        "border-[#d5c9dc] bg-[#f3edf5]",
    },
    {
      title: text.devnet,
      description: text.devnetDetail,
      kind: "wallet" as const,
      classes:
        "border-[#cbc6e7] bg-[#efedfa]",
    },
    {
      title: text.ownership,
      description: text.ownershipDetail,
      kind: "package" as const,
      classes:
        "border-[#e2cfa2] bg-[#fff4d7]",
    },
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] p-[clamp(0.8rem,1.8vw,1.25rem)] shadow-[var(--docs-shadow-soft)]">
      <header className="border-b border-[var(--docs-line)] pb-3">
        <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-plum-dark)]">
          {text.solanaEyebrow}
        </p>

        <h3 className="mt-1 text-[clamp(0.95rem,1.3vw,1.22rem)] font-extrabold text-[var(--docs-ink)]">
          {text.solanaTitle}
        </h3>
      </header>

      <div className="relative mt-4 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-1/2 top-4 hidden w-px -translate-x-1/2 bg-[var(--docs-line-strong)] sm:block lg:bottom-auto lg:left-[7%] lg:right-[7%] lg:top-1/2 lg:h-px lg:w-auto lg:-translate-y-1/2 lg:translate-x-0"
        />

        {nodes.map((node, index) => (
          <div key={node.title} className="relative">
            <ArchitectureNode
              title={node.title}
              description={node.description}
              kind={node.kind}
              className={node.classes}
            />

            {index < nodes.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-[1.15rem] left-1/2 z-20 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--docs-brown-dark)] text-[0.58rem] font-black text-white lg:-right-[1.05rem] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
              >
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <article className="mt-4 rounded-[0.78rem] border border-[#c5d7c0] bg-[#edf4e9] px-3.5 py-3">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[0.62rem] border border-[#bfd2b8] bg-white/55 text-[var(--docs-sage-dark)]">
            <NodeIcon kind="database" />
          </span>

          <div>
            <h4 className="text-[0.72rem] font-extrabold text-[var(--docs-ink)]">
              {text.offchain}
            </h4>

            <p className="mt-1 text-[0.66rem] font-medium leading-[1.45] text-[var(--docs-muted)]">
              {text.offchainDetail}
            </p>
          </div>
        </div>
      </article>

      <footer className="mt-4 flex items-start gap-3 rounded-[0.75rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3.5 py-3">
        <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[var(--docs-plum)]" />

        <p className="text-[0.7rem] font-semibold leading-[1.5] text-[var(--docs-muted)]">
          {text.solanaFooter}
        </p>
      </footer>
    </div>
  );
}