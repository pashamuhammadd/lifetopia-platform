import type { DocsLocale } from "@repo/docs-data";

type ProjectOverviewVisualProps = {
  locale: DocsLocale;
};

type EcosystemNode = {
  title: string;
  description: string;
  status: string;
  position: string;
  surface: string;
  iconSurface: string;
  icon: React.ReactNode;
};

const labels = {
  en: {
    eyebrow: "Connected Ecosystem",
    title: "One player journey across four foundations",
    center: "Lifetopia World",
    centerDetail: "Shared player experience",
    gameTitle: "Playable World",
    gameDescription:
      "The life-simulation and social sandbox gameplay foundation.",
    gameStatus: "Public Alpha",
    communityTitle: "Community Platform",
    communityDescription:
      "Profiles, posts, comments, likes, and player interaction.",
    communityStatus: "Live Beta",
    identityTitle: "Shared Identity",
    identityDescription:
      "One player account designed to connect every Lifetopia product.",
    identityStatus: "Integrating",
    economyTitle: "Solana Economy",
    economyDescription:
      "Wallet connectivity, ownership, and marketplace foundations.",
    economyStatus: "Next Foundation",
    footer:
      "The Beta connects products that currently exist at different stages of development.",
  },
  id: {
    eyebrow: "Ekosistem Terhubung",
    title: "Satu perjalanan pemain melalui empat fondasi",
    center: "Lifetopia World",
    centerDetail: "Pengalaman pemain bersama",
    gameTitle: "Playable World",
    gameDescription:
      "Fondasi gameplay life-simulation dan social sandbox.",
    gameStatus: "Alpha Publik",
    communityTitle: "Platform Komunitas",
    communityDescription:
      "Profil, post, komentar, like, dan interaksi pemain.",
    communityStatus: "Beta Live",
    identityTitle: "Identitas Bersama",
    identityDescription:
      "Satu akun pemain yang dirancang untuk menghubungkan seluruh produk Lifetopia.",
    identityStatus: "Sedang Diintegrasikan",
    economyTitle: "Ekonomi Solana",
    economyDescription:
      "Konektivitas wallet, kepemilikan, dan fondasi marketplace.",
    economyStatus: "Fondasi Berikutnya",
    footer:
      "Beta menghubungkan produk-produk yang saat ini berada pada tahap pengembangan berbeda.",
  },
};

function GameIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.15rem]"
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

function CommunityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.15rem]"
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

function IdentityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8 17a4 4 0 0 1 8 0" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.15rem]"
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

export function ProjectOverviewVisual({
  locale,
}: ProjectOverviewVisualProps) {
  const text = labels[locale];

  const nodes: EcosystemNode[] = [
    {
      title: text.gameTitle,
      description: text.gameDescription,
      status: text.gameStatus,
      position: "lg:left-0 lg:top-0",
      surface:
        "border-[#cadbbd] bg-[linear-gradient(145deg,#fffef9,#eef5e8)]",
      iconSurface:
        "border-[#c3d8b5] bg-[#e5f0dc] text-[#647653]",
      icon: <GameIcon />,
    },
    {
      title: text.communityTitle,
      description: text.communityDescription,
      status: text.communityStatus,
      position: "lg:right-0 lg:top-0",
      surface:
        "border-[#c4dae5] bg-[linear-gradient(145deg,#fffef9,#eaf4f8)]",
      iconSurface:
        "border-[#bed7e3] bg-[#e0eff6] text-[#477893]",
      icon: <CommunityIcon />,
    },
    {
      title: text.identityTitle,
      description: text.identityDescription,
      status: text.identityStatus,
      position: "lg:bottom-0 lg:left-0",
      surface:
        "border-[#d5c9dc] bg-[linear-gradient(145deg,#fffef9,#f2ebf4)]",
      iconSurface:
        "border-[#d0c1d8] bg-[#ece2f0] text-[#68556f]",
      icon: <IdentityIcon />,
    },
    {
      title: text.economyTitle,
      description: text.economyDescription,
      status: text.economyStatus,
      position: "lg:bottom-0 lg:right-0",
      surface:
        "border-[#e3d0a4] bg-[linear-gradient(145deg,#fffef9,#fff2ce)]",
      iconSurface:
        "border-[#ddc68f] bg-[#ffebba] text-[#946c25]",
      icon: <WalletIcon />,
    },
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.7)] p-[clamp(0.8rem,1.8vw,1.25rem)] shadow-[var(--docs-shadow-soft)]">
      <header className="flex flex-col gap-2 border-b border-[var(--docs-line)] pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-gold-dark)]">
            {text.eyebrow}
          </p>

          <h3 className="mt-1 text-[clamp(0.95rem,1.25vw,1.2rem)] font-extrabold text-[var(--docs-ink)]">
            {text.title}
          </h3>
        </div>

        <span className="w-fit rounded-full border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3 py-1.5 text-[0.62rem] font-extrabold text-[var(--docs-muted)]">
          4 foundations
        </span>
      </header>

      <div className="relative mt-4 grid gap-2.5 sm:grid-cols-2 lg:block lg:min-h-[25rem]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden h-[72%] w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent,var(--docs-line-strong),transparent)] lg:block"
        />

        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden h-px w-[72%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_right,transparent,var(--docs-line-strong),transparent)] lg:block"
        />

        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(201,155,67,0.3)] lg:block"
        />

        {nodes.map((node) => (
          <article
            key={node.title}
            className={`group relative z-10 min-w-0 rounded-[0.9rem] border p-3.5 shadow-[0_0.6rem_1.8rem_rgba(74,56,37,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--docs-shadow-card)] lg:absolute lg:w-[39%] ${node.surface} ${node.position}`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-[0.68rem] border transition duration-300 group-hover:scale-105 ${node.iconSurface}`}
              >
                {node.icon}
              </span>

              <div className="min-w-0">
                <h4 className="text-[0.82rem] font-extrabold text-[var(--docs-ink)]">
                  {node.title}
                </h4>

                <p className="mt-1 text-[0.68rem] font-medium leading-[1.45] text-[var(--docs-muted)]">
                  {node.description}
                </p>
              </div>
            </div>

            <span className="mt-3 inline-flex rounded-full border border-[var(--docs-line)] bg-white/55 px-2.5 py-1 text-[0.58rem] font-extrabold text-[var(--docs-brown-dark)]">
              {node.status}
            </span>
          </article>
        ))}

        <div className="relative z-20 col-span-full mx-auto mt-1 flex size-[8rem] items-center justify-center rounded-full border-[0.3rem] border-white bg-[var(--docs-brown-dark)] text-center text-white shadow-[0_0_0_0.55rem_rgba(201,155,67,0.12),0_1rem_3rem_rgba(74,56,37,0.22)] lg:absolute lg:left-1/2 lg:top-1/2 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <span
            aria-hidden="true"
            className="absolute inset-[-0.7rem] animate-pulse rounded-full border border-[rgba(201,155,67,0.28)]"
          />

          <div className="relative px-3">
            <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.08em] text-[#ffe5a5]">
              {text.center}
            </p>

            <p className="mt-1.5 text-[0.68rem] font-semibold leading-[1.35] text-white/58">
              {text.centerDetail}
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-4 flex items-start gap-3 rounded-[0.75rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3.5 py-3">
        <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[var(--docs-sage)]" />

        <p className="text-[0.7rem] font-semibold leading-[1.5] text-[var(--docs-muted)]">
          {text.footer}
        </p>
      </footer>
    </div>
  );
}