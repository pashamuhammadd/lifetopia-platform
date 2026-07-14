import type { DocsLocale } from "@repo/docs-data";

type WhitepaperEconomyVisualProps = {
  locale: DocsLocale;
};

type EconomyNode = {
  number: string;
  title: string;
  description: string;
  label: string;
  surface: string;
  accent: string;
  dot: string;
};

const content = {
  en: {
    eyebrow: "Layered Economy",
    title: "Gameplay value first, blockchain utility when useful",
    gameplay: "Gameplay Activities",
    gameplayDescription:
      "Farming, fishing, crafting, quests, exploration, and social participation.",
    gameplayLabel: "Player activity",
    coin: "COIN Economy",
    coinDescription:
      "Frequent off-chain rewards, spending, production, and normal progression.",
    coinLabel: "Off-chain currency",
    gold: "GOLD Utility",
    goldDescription:
      "Selected premium, ecosystem, marketplace, and ownership utility.",
    goldLabel: "Controlled utility",
    marketplace: "Marketplace & Ownership",
    marketplaceDescription:
      "Verified listings, settlement, asset ownership, and selected transfers.",
    marketplaceLabel: "Optional blockchain layer",
    offchain: "Off-chain Foundation",
    offchainDescription:
      "Progression, inventory, social activity, moderation, and high-frequency game state.",
    onchain: "Solana Foundation",
    onchainDescription:
      "Wallets, verifiable transactions, selected ownership, and marketplace settlement.",
    principle:
      "Not every action or item needs to become an on-chain transaction.",
    draft:
      "Economy design remains subject to Beta testing and future Tokenomics review.",
  },

  id: {
    eyebrow: "Ekonomi Berlapis",
    title:
      "Nilai gameplay lebih dahulu, utilitas blockchain ketika berguna",
    gameplay: "Aktivitas Gameplay",
    gameplayDescription:
      "Farming, fishing, crafting, quest, eksplorasi, dan partisipasi sosial.",
    gameplayLabel: "Aktivitas pemain",
    coin: "Ekonomi COIN",
    coinDescription:
      "Reward, spending, produksi, dan progression normal yang sering digunakan secara off-chain.",
    coinLabel: "Mata uang off-chain",
    gold: "Utilitas GOLD",
    goldDescription:
      "Utilitas premium, ekosistem, marketplace, dan ownership tertentu.",
    goldLabel: "Utilitas terkontrol",
    marketplace: "Marketplace & Ownership",
    marketplaceDescription:
      "Listing terverifikasi, settlement, kepemilikan asset, dan transfer tertentu.",
    marketplaceLabel: "Lapisan blockchain opsional",
    offchain: "Fondasi Off-chain",
    offchainDescription:
      "Progression, inventory, aktivitas sosial, moderasi, dan state game berfrekuensi tinggi.",
    onchain: "Fondasi Solana",
    onchainDescription:
      "Wallet, transaksi terverifikasi, ownership tertentu, dan settlement marketplace.",
    principle:
      "Tidak setiap tindakan atau item harus menjadi transaksi on-chain.",
    draft:
      "Desain ekonomi masih harus melalui pengujian Beta dan review Tokenomics mendatang.",
  },
};

export function WhitepaperEconomyVisual({
  locale,
}: WhitepaperEconomyVisualProps) {
  const text = content[locale];

  const nodes: EconomyNode[] = [
    {
      number: "01",
      title: text.gameplay,
      description: text.gameplayDescription,
      label: text.gameplayLabel,
      surface:
        "border-[#c9dabf] bg-[linear-gradient(145deg,#fffef9,#edf5e8)]",
      accent: "text-[#647653]",
      dot: "bg-[#8da27a]",
    },
    {
      number: "02",
      title: text.coin,
      description: text.coinDescription,
      label: text.coinLabel,
      surface:
        "border-[#c5dbe5] bg-[linear-gradient(145deg,#fffef9,#eaf4f8)]",
      accent: "text-[#477893]",
      dot: "bg-[#6c9fbd]",
    },
    {
      number: "03",
      title: text.gold,
      description: text.goldDescription,
      label: text.goldLabel,
      surface:
        "border-[#e2cf9d] bg-[linear-gradient(145deg,#fffef9,#fff2d2)]",
      accent: "text-[#946c25]",
      dot: "bg-[#c99b43]",
    },
    {
      number: "04",
      title: text.marketplace,
      description: text.marketplaceDescription,
      label: text.marketplaceLabel,
      surface:
        "border-[#d5cadc] bg-[linear-gradient(145deg,#fffef9,#f2ebf4)]",
      accent: "text-[#68556f]",
      dot: "bg-[#88728f]",
    },
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] p-[clamp(0.85rem,1.8vw,1.3rem)] shadow-[var(--docs-shadow-soft)]">
      <header className="flex flex-col gap-3 border-b border-[var(--docs-line)] pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-gold-dark)]">
            {text.eyebrow}
          </p>

          <h3 className="mt-1 max-w-[40rem] text-[clamp(0.95rem,1.3vw,1.22rem)] font-extrabold text-[var(--docs-ink)]">
            {text.title}
          </h3>
        </div>

        <span className="w-fit rounded-full border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3 py-1.5 text-[0.6rem] font-extrabold text-[var(--docs-muted)]">
          COIN + GOLD
        </span>
      </header>

      <div className="relative mt-4">
        <span
          aria-hidden="true"
          className="absolute bottom-[2rem] left-1/2 top-[2rem] w-[0.14rem] -translate-x-1/2 bg-gradient-to-b from-[#8da27a] via-[#6c9fbd] via-55% to-[#88728f] opacity-35 lg:bottom-auto lg:left-[6%] lg:right-[6%] lg:top-1/2 lg:h-[0.14rem] lg:w-auto lg:-translate-y-1/2 lg:translate-x-0 lg:bg-gradient-to-r"
        />

        <div className="relative grid gap-7 lg:grid-cols-4 lg:gap-3">
          {nodes.map((node, index) => (
            <article
              key={node.number}
              className={`group relative z-10 min-w-0 rounded-[0.86rem] border p-3.5 shadow-[0_0.6rem_1.8rem_rgba(74,56,37,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--docs-shadow-card)] ${node.surface}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`font-mono text-[0.9rem] font-black ${node.accent}`}
                >
                  {node.number}
                </span>

                <span
                  className={`mt-1 size-2.5 rounded-full border-2 border-white shadow-sm ${node.dot}`}
                />
              </div>

              <h4 className="mt-3 text-[0.8rem] font-extrabold leading-[1.2] text-[var(--docs-ink)]">
                {node.title}
              </h4>

              <p className="mt-1.5 text-[0.64rem] font-medium leading-[1.45] text-[var(--docs-muted)]">
                {node.description}
              </p>

              <span className="mt-3 inline-flex rounded-full border border-[var(--docs-line)] bg-white/55 px-2.5 py-1 text-[0.56rem] font-extrabold text-[var(--docs-brown-dark)]">
                {node.label}
              </span>

              {index < nodes.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[1.15rem] left-1/2 z-20 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--docs-brown-dark)] text-[0.56rem] font-black text-white lg:-right-[1.05rem] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                >
                  →
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <article className="rounded-[0.78rem] border border-[#c7d9c1] bg-[#edf4e9] px-3.5 py-3">
          <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-sage-dark)]">
            {text.offchain}
          </p>

          <p className="mt-1.5 text-[0.68rem] font-semibold leading-[1.45] text-[var(--docs-muted)]">
            {text.offchainDescription}
          </p>
        </article>

        <article className="rounded-[0.78rem] border border-[#d1cae5] bg-[#f0edfa] px-3.5 py-3">
          <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-plum-dark)]">
            {text.onchain}
          </p>

          <p className="mt-1.5 text-[0.68rem] font-semibold leading-[1.45] text-[var(--docs-muted)]">
            {text.onchainDescription}
          </p>
        </article>
      </div>

      <footer className="mt-4 overflow-hidden rounded-[0.78rem] border border-[var(--docs-line)]">
        <div className="flex items-start gap-3 bg-[var(--docs-background-soft)] px-3.5 py-3">
          <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[var(--docs-sage)]" />

          <p className="text-[0.7rem] font-semibold leading-[1.5] text-[var(--docs-muted)]">
            {text.principle}
          </p>
        </div>

        <div className="border-t border-[var(--docs-line)] bg-[#fff2d2] px-3.5 py-2.5">
          <p className="text-[0.64rem] font-extrabold leading-[1.45] text-[#946c25]">
            {text.draft}
          </p>
        </div>
      </footer>
    </div>
  );
}