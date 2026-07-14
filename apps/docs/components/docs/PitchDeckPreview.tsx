import type { DocsLocale } from "@repo/docs-data";

type PitchDeckPreviewProps = {
  locale: DocsLocale;
};

type SlideItem = {
  number: string;
  title: string;
  description: string;
  surface: string;
  accent: string;
};

const content = {
  en: {
    eyebrow: "Presentation Preview",
    title: "Lifetopia World Beta Funding Deck",
    subtitle:
      "A connected cozy world powered by Solana.",
    fundingLabel: "Funding Request",
    fundingValue: "$10,000",
    timelineLabel: "Delivery Period",
    timelineValue: "8–12 weeks",
    phaseLabel: "Project Phase",
    phaseValue: "Beta",
    slidesLabel: "Planned Slides",
    previewStatus: "In Preparation",
    slideMap: "Presentation Structure",
    pdfAvailable: "Open Pitch Deck PDF",
    pdfUnavailable: "PDF in Preparation",
    pdfNoteAvailable:
      "The configured presentation PDF is available for review.",
    pdfNoteUnavailable:
      "The download button will activate after the final PDF has been reviewed and published.",
    slides: [
      {
        title: "Cover & Request",
        description:
          "Project identity, funding request, and delivery period.",
      },
      {
        title: "The Problem",
        description:
          "Why conventional Web3 onboarding creates early friction.",
      },
      {
        title: "The Solution",
        description:
          "An experience-first path into wallets and ownership.",
      },
      {
        title: "Product Ecosystem",
        description:
          "Game, community, identity, and marketplace direction.",
      },
      {
        title: "Execution Evidence",
        description:
          "Existing public products and development activity.",
      },
      {
        title: "Current Phase",
        description:
          "Beta development and the publicly accessible Alpha build.",
      },
      {
        title: "Delivery Roadmap",
        description:
          "Three milestones across an 8–12 week period.",
      },
      {
        title: "Funding Allocation",
        description:
          "How the requested $10,000 supports delivery.",
      },
      {
        title: "Team",
        description:
          "Delivery ownership and current responsibilities.",
      },
      {
        title: "Impact & Request",
        description:
          "Beta targets, Solana participation, and closing request.",
      },
    ],
  },

  id: {
    eyebrow: "Preview Presentasi",
    title: "Pitch Deck Pendanaan Beta Lifetopia World",
    subtitle:
      "Dunia cozy terhubung yang ditenagai Solana.",
    fundingLabel: "Permintaan Pendanaan",
    fundingValue: "$10.000",
    timelineLabel: "Periode Pengiriman",
    timelineValue: "8–12 minggu",
    phaseLabel: "Fase Proyek",
    phaseValue: "Beta",
    slidesLabel: "Rencana Slide",
    previewStatus: "Sedang Dipersiapkan",
    slideMap: "Struktur Presentasi",
    pdfAvailable: "Buka PDF Pitch Deck",
    pdfUnavailable: "PDF Sedang Dipersiapkan",
    pdfNoteAvailable:
      "PDF presentasi yang dikonfigurasi sudah tersedia untuk ditinjau.",
    pdfNoteUnavailable:
      "Tombol download akan aktif setelah PDF final diperiksa dan dipublikasikan.",
    slides: [
      {
        title: "Cover & Permintaan",
        description:
          "Identitas proyek, permintaan pendanaan, dan periode pengiriman.",
      },
      {
        title: "Masalah",
        description:
          "Mengapa onboarding Web3 biasa menciptakan hambatan awal.",
      },
      {
        title: "Solusi",
        description:
          "Jalur berbasis pengalaman menuju wallet dan ownership.",
      },
      {
        title: "Ekosistem Produk",
        description:
          "Arah game, komunitas, identitas, dan marketplace.",
      },
      {
        title: "Bukti Eksekusi",
        description:
          "Produk publik dan aktivitas pengembangan yang tersedia.",
      },
      {
        title: "Fase Saat Ini",
        description:
          "Pengembangan Beta dan build Alpha yang dapat diakses publik.",
      },
      {
        title: "Roadmap Pengiriman",
        description:
          "Tiga milestone dalam periode 8–12 minggu.",
      },
      {
        title: "Alokasi Pendanaan",
        description:
          "Penggunaan permintaan pendanaan sebesar $10.000.",
      },
      {
        title: "Tim",
        description:
          "Tanggung jawab pengiriman dan peran saat ini.",
      },
      {
        title: "Impact & Permintaan",
        description:
          "Target Beta, partisipasi Solana, dan permintaan penutup.",
      },
    ],
  },
};

const slideStyles = [
  {
    surface:
      "border-[#e0ca91] bg-[linear-gradient(145deg,#fffef9,#fff2cd)]",
    accent: "bg-[#c99b43]",
  },
  {
    surface:
      "border-[#d9cabc] bg-[linear-gradient(145deg,#fffef9,#f7ece2)]",
    accent: "bg-[#ad7650]",
  },
  {
    surface:
      "border-[#c9dbbf] bg-[linear-gradient(145deg,#fffef9,#edf5e8)]",
    accent: "bg-[#8da27a]",
  },
  {
    surface:
      "border-[#c6dae5] bg-[linear-gradient(145deg,#fffef9,#eaf4f8)]",
    accent: "bg-[#6c9fbd]",
  },
  {
    surface:
      "border-[#d4cadc] bg-[linear-gradient(145deg,#fffef9,#f2ebf4)]",
    accent: "bg-[#88728f]",
  },
];

function PresentationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="13"
        rx="2"
      />
      <path d="M8 21h8M12 17v4M7 13l3-3 2 2 4-5" />
    </svg>
  );
}

export function PitchDeckPreview({
  locale,
}: PitchDeckPreviewProps) {
  const text = content[locale];

  const configuredPdfUrl =
    process.env.NEXT_PUBLIC_PITCH_DECK_PDF_URL?.trim();

  const pitchDeckPdfUrl =
    configuredPdfUrl || undefined;

  const slides: SlideItem[] = text.slides.map(
    (slide, index) => {
      const style =
        slideStyles[index % slideStyles.length]!;

      return {
        number: String(index + 1).padStart(2, "0"),
        title: slide.title,
        description: slide.description,
        surface: style.surface,
        accent: style.accent,
      };
    },
  );

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

        <span className="w-fit rounded-full border border-[#e2cf9d] bg-[#fff2d2] px-3 py-1.5 text-[0.62rem] font-extrabold text-[#946c25]">
          {text.previewStatus}
        </span>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)]">
        <article className="relative min-h-[23rem] overflow-hidden rounded-[1rem] border border-[#dac69b] bg-[linear-gradient(145deg,#5d422f,#38271e)] p-[clamp(1rem,2.4vw,1.8rem)] text-white shadow-[0_1.2rem_3.5rem_rgba(67,46,31,0.2)]">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full bg-[#f3c965]/20 blur-[5rem]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-16 size-60 rounded-full bg-[#80b2c9]/18 blur-[5rem]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "2rem 2rem",
            }}
          />

          <div className="relative flex h-full min-h-[20rem] flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-[0.75rem] border border-white/15 bg-white/10 text-[#ffe4a0]">
                <PresentationIcon />
              </span>

              <span className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-white/68">
                Lifetopia World
              </span>
            </div>

            <div className="my-auto py-8">
              <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.11em] text-[#ffe09a]">
                Solana Ecosystem Funding Proposal
              </p>

              <h4 className="mt-3 max-w-[14ch] text-[clamp(1.55rem,3.1vw,2.55rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">
                {text.title}
              </h4>

              <p className="mt-3 max-w-[28rem] text-[clamp(0.76rem,0.9vw,0.94rem)] font-semibold leading-[1.5] text-white/58">
                {text.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[0.78rem] border border-white/10 bg-white/10">
              {[
                {
                  label: text.fundingLabel,
                  value: text.fundingValue,
                },
                {
                  label: text.timelineLabel,
                  value: text.timelineValue,
                },
                {
                  label: text.phaseLabel,
                  value: text.phaseValue,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 bg-[#3c2a20]/90 px-2 py-2.5 text-center"
                >
                  <p className="truncate text-[0.52rem] font-extrabold uppercase tracking-[0.06em] text-white/34">
                    {item.label}
                  </p>

                  <p className="mt-1 truncate text-[clamp(0.68rem,0.82vw,0.86rem)] font-extrabold text-[#ffe09a]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <section className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-sky-dark)]">
                {text.slideMap}
              </p>

              <h4 className="mt-1 text-[clamp(0.88rem,1.1vw,1.06rem)] font-extrabold text-[var(--docs-ink)]">
                {text.slidesLabel}: {slides.length}
              </h4>
            </div>

            <span className="font-mono text-[0.66rem] font-black text-[var(--docs-subtle)]">
              16:9
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {slides.map((slide) => (
              <article
                key={slide.number}
                className={`group min-w-0 rounded-[0.78rem] border p-2.5 shadow-[0_0.45rem_1.4rem_rgba(74,56,37,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--docs-shadow-soft)] ${slide.surface}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[0.62rem] font-black text-[var(--docs-subtle)]">
                    {slide.number}
                  </span>

                  <span
                    className={`mt-1 size-2 rounded-full ${slide.accent}`}
                  />
                </div>

                <h5 className="mt-2 text-[0.7rem] font-extrabold leading-[1.2] text-[var(--docs-ink)]">
                  {slide.title}
                </h5>

                <p className="mt-1 line-clamp-2 text-[0.6rem] font-medium leading-[1.4] text-[var(--docs-muted)]">
                  {slide.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-4 flex flex-col gap-3 rounded-[0.82rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={[
              "mt-[0.4rem] size-2 shrink-0 rounded-full",
              pitchDeckPdfUrl
                ? "bg-[var(--docs-sage)]"
                : "bg-[var(--docs-gold)]",
            ].join(" ")}
          />

          <p className="text-[0.68rem] font-semibold leading-[1.45] text-[var(--docs-muted)]">
            {pitchDeckPdfUrl
              ? text.pdfNoteAvailable
              : text.pdfNoteUnavailable}
          </p>
        </div>

        {pitchDeckPdfUrl ? (
          <a
            href={pitchDeckPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="docs-button-primary shrink-0"
          >
            {text.pdfAvailable}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex min-h-[2.65rem] shrink-0 cursor-not-allowed items-center justify-center rounded-[var(--docs-radius-small)] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.62)] px-4 text-[0.72rem] font-extrabold text-[var(--docs-subtle)]"
          >
            {text.pdfUnavailable}
          </span>
        )}
      </footer>
    </div>
  );
}