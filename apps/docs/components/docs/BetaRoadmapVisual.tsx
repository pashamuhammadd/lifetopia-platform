import type { DocsLocale } from "@repo/docs-data";

type BetaRoadmapVisualProps = {
  locale: DocsLocale;
};

type Milestone = {
  number: string;
  title: string;
  budget: string;
  duration: string;
  description: string;
  deliverables: string[];
  surface: string;
  accent: string;
  dot: string;
};

const content = {
  en: {
    eyebrow: "Beta Delivery Path",
    title: "Three milestones toward a connected public Beta",
    request: "Total Request",
    timeline: "Timeline",
    requestValue: "$10,000",
    timelineValue: "8–12 weeks",
    funding: "Funding",
    duration: "Duration",
    deliverables: "Core Deliverables",
    milestoneOne: "Community Platform",
    milestoneOneDescription:
      "Complete shared identity, community features, and public readiness.",
    milestoneOneDeliverables: [
      "Shared player identity",
      "Community improvements",
      "Moderation readiness",
    ],
    milestoneTwo: "Playable Beta",
    milestoneTwoDescription:
      "Expand gameplay, progression, stability, and structured public testing.",
    milestoneTwoDeliverables: [
      "Gameplay expansion",
      "Progress persistence",
      "Beta testing readiness",
    ],
    milestoneThree: "Solana Ecosystem",
    milestoneThreeDescription:
      "Connect wallets, devnet activity, ownership, and marketplace foundations.",
    milestoneThreeDeliverables: [
      "Wallet connectivity",
      "Devnet interactions",
      "Marketplace foundation",
    ],
    footer:
      "Milestone completion is evaluated through product access, repository activity, documentation, and verifiable delivery evidence.",
  },
  id: {
    eyebrow: "Jalur Pengiriman Beta",
    title: "Tiga milestone menuju Beta publik yang terhubung",
    request: "Total Permintaan",
    timeline: "Timeline",
    requestValue: "$10.000",
    timelineValue: "8–12 minggu",
    funding: "Pendanaan",
    duration: "Durasi",
    deliverables: "Pengiriman Utama",
    milestoneOne: "Platform Komunitas",
    milestoneOneDescription:
      "Menyelesaikan identitas bersama, fitur komunitas, dan kesiapan publik.",
    milestoneOneDeliverables: [
      "Identitas pemain bersama",
      "Peningkatan komunitas",
      "Kesiapan moderasi",
    ],
    milestoneTwo: "Playable Beta",
    milestoneTwoDescription:
      "Memperluas gameplay, progression, stabilitas, dan pengujian publik.",
    milestoneTwoDeliverables: [
      "Ekspansi gameplay",
      "Penyimpanan progression",
      "Kesiapan pengujian Beta",
    ],
    milestoneThree: "Ekosistem Solana",
    milestoneThreeDescription:
      "Menghubungkan wallet, aktivitas devnet, ownership, dan fondasi marketplace.",
    milestoneThreeDeliverables: [
      "Konektivitas wallet",
      "Interaksi devnet",
      "Fondasi marketplace",
    ],
    footer:
      "Penyelesaian milestone dinilai melalui akses produk, aktivitas repository, dokumentasi, dan bukti pengiriman yang dapat diverifikasi.",
  },
};

export function BetaRoadmapVisual({
  locale,
}: BetaRoadmapVisualProps) {
  const text = content[locale];

  const milestones: Milestone[] = [
    {
      number: "01",
      title: text.milestoneOne,
      budget: "$3,500",
      duration:
        locale === "id"
          ? "3–4 minggu"
          : "3–4 weeks",
      description:
        text.milestoneOneDescription,
      deliverables:
        text.milestoneOneDeliverables,
      surface:
        "border-[#cbdabf] bg-[linear-gradient(145deg,#fffef9,#eef5e8)]",
      accent: "text-[#647653]",
      dot: "bg-[#8da27a]",
    },
    {
      number: "02",
      title: text.milestoneTwo,
      budget: "$4,000",
      duration:
        locale === "id"
          ? "3–4 minggu"
          : "3–4 weeks",
      description:
        text.milestoneTwoDescription,
      deliverables:
        text.milestoneTwoDeliverables,
      surface:
        "border-[#c6dae5] bg-[linear-gradient(145deg,#fffef9,#eaf4f8)]",
      accent: "text-[#477893]",
      dot: "bg-[#6c9fbd]",
    },
    {
      number: "03",
      title: text.milestoneThree,
      budget: "$2,500",
      duration:
        locale === "id"
          ? "2–4 minggu"
          : "2–4 weeks",
      description:
        text.milestoneThreeDescription,
      deliverables:
        text.milestoneThreeDeliverables,
      surface:
        "border-[#d6cadc] bg-[linear-gradient(145deg,#fffef9,#f2ebf4)]",
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

          <h3 className="mt-1 text-[clamp(0.95rem,1.3vw,1.22rem)] font-extrabold text-[var(--docs-ink)]">
            {text.title}
          </h3>
        </div>

        <div className="grid w-full grid-cols-2 overflow-hidden rounded-[0.72rem] border border-[var(--docs-line)] bg-white/60 sm:w-auto">
          <article className="min-w-[7rem] px-3 py-2 text-center">
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
              {text.request}
            </p>

            <p className="mt-1 text-[0.82rem] font-extrabold text-[var(--docs-brown-dark)]">
              {text.requestValue}
            </p>
          </article>

          <article className="min-w-[7rem] border-l border-[var(--docs-line)] px-3 py-2 text-center">
            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
              {text.timeline}
            </p>

            <p className="mt-1 text-[0.82rem] font-extrabold text-[var(--docs-brown-dark)]">
              {text.timelineValue}
            </p>
          </article>
        </div>
      </header>

      <div className="relative mt-4">
        <span
          aria-hidden="true"
          className="absolute bottom-[2.5rem] left-1/2 top-[2.5rem] w-[0.14rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8da27a] via-[#6c9fbd] to-[#88728f] opacity-35 lg:bottom-auto lg:left-[8%] lg:right-[8%] lg:top-1/2 lg:h-[0.14rem] lg:w-auto lg:-translate-y-1/2 lg:translate-x-0 lg:bg-gradient-to-r"
        />

        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-3">
          {milestones.map(
            (milestone, index) => (
              <article
                key={milestone.number}
                className={`group relative z-10 min-w-0 rounded-[0.9rem] border p-3.5 shadow-[0_0.65rem_2rem_rgba(74,56,37,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--docs-shadow-card)] ${milestone.surface}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`font-mono text-[1rem] font-black ${milestone.accent}`}
                  >
                    {milestone.number}
                  </span>

                  <span
                    className={`size-2.5 rounded-full border-2 border-white shadow-sm ${milestone.dot}`}
                  />
                </div>

                <h4 className="mt-3 text-[0.88rem] font-extrabold leading-[1.2] text-[var(--docs-ink)]">
                  {milestone.title}
                </h4>

                <p className="mt-1.5 text-[0.68rem] font-medium leading-[1.45] text-[var(--docs-muted)]">
                  {milestone.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-[0.62rem] border border-[var(--docs-line)] bg-white/55 px-2.5 py-2">
                    <p className="text-[0.54rem] font-extrabold uppercase tracking-[0.06em] text-[var(--docs-subtle)]">
                      {text.funding}
                    </p>

                    <p className="mt-1 text-[0.72rem] font-extrabold text-[var(--docs-brown-dark)]">
                      {milestone.budget}
                    </p>
                  </div>

                  <div className="rounded-[0.62rem] border border-[var(--docs-line)] bg-white/55 px-2.5 py-2">
                    <p className="text-[0.54rem] font-extrabold uppercase tracking-[0.06em] text-[var(--docs-subtle)]">
                      {text.duration}
                    </p>

                    <p className="mt-1 text-[0.72rem] font-extrabold text-[var(--docs-brown-dark)]">
                      {milestone.duration}
                    </p>
                  </div>
                </div>

                <div className="mt-3 border-t border-[var(--docs-line)] pt-3">
                  <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                    {text.deliverables}
                  </p>

                  <div className="mt-2 grid gap-1.5">
                    {milestone.deliverables.map(
                      (deliverable) => (
                        <div
                          key={deliverable}
                          className="flex items-start gap-2"
                        >
                          <span
                            className={`mt-[0.4rem] size-1.5 shrink-0 rounded-full ${milestone.dot}`}
                          />

                          <p className="text-[0.64rem] font-semibold leading-[1.4] text-[var(--docs-ink-soft)]">
                            {deliverable}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {index <
                milestones.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[1.55rem] left-1/2 z-20 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[var(--docs-paper)] bg-[var(--docs-brown-dark)] text-[0.62rem] font-black text-white lg:-right-[1.05rem] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                  >
                    →
                  </span>
                ) : null}
              </article>
            ),
          )}
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