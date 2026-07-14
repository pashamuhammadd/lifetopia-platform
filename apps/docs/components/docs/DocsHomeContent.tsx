"use client";

import {
  getDocumentCategories,
  getDocuments,
  getFeaturedDocuments,
  getRecentlyUpdatedDocuments,
  type DocumentCategoryId,
  type LifetopiaDocument,
} from "@repo/docs-data";
import Link from "next/link";
import { useMemo } from "react";

import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { useDocsLanguage } from "./DocsLanguageProvider";

const homeLabels = {
  en: {
    eyebrow: "Official Lifetopia Documentation",
    title: "A living library for the world of Lifetopia.",
    description:
      "Explore the project, products, development, architecture, funding, economy, community, and long-term direction of Lifetopia World.",
    libraryNote:
      "Use the search field above to find documents, sections, paragraphs, and technical details.",
    documents: "Documents",
    published: "Published",
    categories: "Categories",
    startHere: "Start Here",
    startDescription:
      "Recommended documents for understanding the project, current delivery plan, and technical foundation.",
    recentlyUpdated: "Recently Updated",
    updatedDescription:
      "Documents receiving the latest public revisions.",
    browse: "Browse by Chapter",
    browseDescription:
      "Documentation is organized as a growing collection of connected chapters.",
    open: "Read document",
    updated: "Updated",
    reading: "min read",
    documentsLabel: "documents",
    documentLabel: "document",
    plannedCollection: "Planned collection",
    noDocument:
      "This chapter is prepared for future documentation.",
    footerDescription:
      "Official public documentation for Lifetopia World.",
    website: "Main Website",
    community: "Community",
    github: "GitHub",
    funding: "Funding Hub",
    contact: "Contact",
  },
  id: {
    eyebrow: "Dokumentasi Resmi Lifetopia",
    title: "Perpustakaan hidup untuk dunia Lifetopia.",
    description:
      "Jelajahi proyek, produk, pengembangan, arsitektur, pendanaan, ekonomi, komunitas, dan arah jangka panjang Lifetopia World.",
    libraryNote:
      "Gunakan kolom pencarian di atas untuk menemukan dokumen, bagian, paragraf, dan detail teknis.",
    documents: "Dokumen",
    published: "Dipublikasikan",
    categories: "Kategori",
    startHere: "Mulai di Sini",
    startDescription:
      "Dokumen yang direkomendasikan untuk memahami proyek, rencana pengiriman, dan fondasi teknis.",
    recentlyUpdated: "Baru Diperbarui",
    updatedDescription:
      "Dokumen yang menerima revisi publik terbaru.",
    browse: "Jelajahi per Bab",
    browseDescription:
      "Dokumentasi disusun sebagai kumpulan bab yang saling terhubung dan terus berkembang.",
    open: "Baca dokumen",
    updated: "Diperbarui",
    reading: "menit baca",
    documentsLabel: "dokumen",
    documentLabel: "dokumen",
    plannedCollection: "Koleksi direncanakan",
    noDocument:
      "Bab ini dipersiapkan untuk dokumentasi mendatang.",
    footerDescription:
      "Dokumentasi publik resmi Lifetopia World.",
    website: "Website Utama",
    community: "Komunitas",
    github: "GitHub",
    funding: "Funding Hub",
    contact: "Kontak",
  },
};

const categoryVisuals: Record<
  DocumentCategoryId,
  {
    number: string;
    accent: string;
    surface: string;
    line: string;
  }
> = {
  "start-here": {
    number: "01",
    accent: "text-[#946c25]",
    surface:
      "border-[#e4cc91] bg-[linear-gradient(145deg,#fffdf7,#fff4d8)]",
    line: "bg-[#c99b43]",
  },
  project: {
    number: "02",
    accent: "text-[#68556f]",
    surface:
      "border-[#d8cce0] bg-[linear-gradient(145deg,#fffdf9,#f5edf7)]",
    line: "bg-[#88728f]",
  },
  product: {
    number: "03",
    accent: "text-[#477893]",
    surface:
      "border-[#c8dce6] bg-[linear-gradient(145deg,#fffdf9,#eaf5fa)]",
    line: "bg-[#6c9fbd]",
  },
  development: {
    number: "04",
    accent: "text-[#647653]",
    surface:
      "border-[#ced9c2] bg-[linear-gradient(145deg,#fffdf9,#eef3e7)]",
    line: "bg-[#8da27a]",
  },
  technical: {
    number: "05",
    accent: "text-[#5d6688]",
    surface:
      "border-[#ccd1e3] bg-[linear-gradient(145deg,#fffdf9,#eef0f8)]",
    line: "bg-[#7c86ad]",
  },
  funding: {
    number: "06",
    accent: "text-[#9a673e]",
    surface:
      "border-[#e2cdbb] bg-[linear-gradient(145deg,#fffdf9,#faeee3)]",
    line: "bg-[#bd8256]",
  },
  economy: {
    number: "07",
    accent: "text-[#9a7429]",
    surface:
      "border-[#e5d2a4] bg-[linear-gradient(145deg,#fffdf9,#fff2ce)]",
    line: "bg-[#d0a343]",
  },
  community: {
    number: "08",
    accent: "text-[#667d7a]",
    surface:
      "border-[#cadad6] bg-[linear-gradient(145deg,#fffdf9,#edf6f3)]",
    line: "bg-[#7f9e98]",
  },
  "legal-security": {
    number: "09",
    accent: "text-[#7e6757]",
    surface:
      "border-[#dbd0c7] bg-[linear-gradient(145deg,#fffdf9,#f4eee9)]",
    line: "bg-[#9b8170]",
  },
};

function formatUpdatedDate(
  value: string,
  locale: "en" | "id",
) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    locale === "id" ? "id-ID" : "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

function StartDocumentCard({
  item,
  index,
  openLabel,
  readingLabel,
}: {
  item: LifetopiaDocument;
  index: number;
  openLabel: string;
  readingLabel: string;
}) {
  return (
    <Link
      href={`/${item.slug}`}
      className="docs-card group relative flex min-w-0 flex-col overflow-hidden p-[clamp(0.8rem,1.4vw,1.15rem)]"
    >
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 size-32 rounded-full bg-[rgba(201,155,67,0.12)] blur-3xl transition duration-500 group-hover:scale-125"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="font-mono text-[clamp(0.85rem,1.1vw,1.05rem)] font-black text-[var(--docs-gold-dark)]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <DocumentStatusBadge
          status={item.status}
          compact
        />
      </div>

      <div className="relative mt-4 h-[0.15rem] w-9 rounded-full bg-[var(--docs-gold)] transition-all duration-300 group-hover:w-14" />

      <h3 className="relative mt-3 text-[clamp(0.86rem,1.1vw,1.08rem)] font-extrabold leading-[1.2] text-[var(--docs-ink)] transition group-hover:text-[var(--docs-brown)]">
        {item.title}
      </h3>

      <p className="relative mt-2 line-clamp-3 text-[clamp(0.68rem,0.8vw,0.84rem)] font-medium leading-[1.55] text-[var(--docs-muted)]">
        {item.description}
      </p>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="text-[0.62rem] font-bold text-[var(--docs-subtle)]">
          {item.readingTime} {readingLabel}
        </span>

        <span className="text-[0.66rem] font-extrabold text-[var(--docs-brown)]">
          {openLabel} →
        </span>
      </div>
    </Link>
  );
}

export function DocsHomeContent() {
  const { locale } = useDocsLanguage();
  const labels = homeLabels[locale];

  const documents = useMemo(
    () => getDocuments(locale),
    [locale],
  );

  const featuredDocuments = useMemo(
    () => getFeaturedDocuments(locale).slice(0, 3),
    [locale],
  );

  const recentlyUpdatedDocuments = useMemo(
    () =>
      getRecentlyUpdatedDocuments(locale).slice(
        0,
        3,
      ),
    [locale],
  );

  const categories = useMemo(
    () => getDocumentCategories(locale),
    [locale],
  );

  const publishedCount = documents.filter(
    (item) =>
      item.status === "Live" ||
      item.status === "Public Draft",
  ).length;

  return (
<main
  id="main-content"
  tabIndex={-1}
  className="min-h-[calc(100svh-4rem)] outline-none"
>
        <section className="relative overflow-hidden border-b border-[var(--docs-line)] bg-[rgba(255,253,248,0.62)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[rgba(255,225,154,0.32)] blur-[6rem]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-[rgba(190,224,240,0.32)] blur-[6rem]"
        />

        <div className="docs-container relative grid gap-5 py-[clamp(2rem,4vw,3.25rem)] lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-[48rem]">
            <span className="docs-eyebrow">
              {labels.eyebrow}
            </span>

            <h1 className="docs-heading mt-4 max-w-[19ch]">
              {labels.title}
            </h1>

            <p className="docs-description mt-3 max-w-[44rem]">
              {labels.description}
            </p>

            <div className="mt-4 flex items-start gap-3 rounded-[0.82rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.68)] px-3.5 py-3">
              <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[var(--docs-sky)]" />

              <p className="text-[clamp(0.7rem,0.82vw,0.86rem)] font-semibold leading-[1.5] text-[var(--docs-muted)]">
                {labels.libraryNote}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.82)] shadow-[var(--docs-shadow-soft)] backdrop-blur">
            {[
              {
                label: labels.documents,
                value: documents.length,
              },
              {
                label: labels.published,
                value: publishedCount,
              },
              {
                label: labels.categories,
                value: categories.length,
              },
            ].map((stat, index) => (
              <article
                key={stat.label}
                className={[
                  "px-2 py-3 text-center",
                  index > 0
                    ? "border-l border-[var(--docs-line)]"
                    : "",
                ].join(" ")}
              >
                <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                  {stat.label}
                </p>

                <p className="mt-1.5 text-[clamp(1rem,1.4vw,1.3rem)] font-extrabold text-[var(--docs-brown-dark)]">
                  {stat.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="docs-container py-[clamp(2rem,3.5vw,3rem)]">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.1em] text-[var(--docs-gold-dark)]">
              01 · {labels.startHere}
            </span>

            <h2 className="mt-1.5 text-[clamp(1.25rem,2vw,1.85rem)] font-extrabold tracking-[-0.03em] text-[var(--docs-ink)]">
              {labels.startHere}
            </h2>

            <p className="mt-1 max-w-[42rem] text-[clamp(0.76rem,0.88vw,0.92rem)] font-medium leading-[1.55] text-[var(--docs-muted)]">
              {labels.startDescription}
            </p>
          </div>
        </header>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {featuredDocuments.map((item, index) => (
            <StartDocumentCard
              key={item.slug}
              item={item}
              index={index}
              openLabel={labels.open}
              readingLabel={labels.reading}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--docs-line)] bg-[rgba(255,253,248,0.48)]">
        <div className="docs-container py-[clamp(1.8rem,3vw,2.5rem)]">
          <header>
            <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.1em] text-[var(--docs-sky-dark)]">
              02 · {labels.recentlyUpdated}
            </span>

            <h2 className="mt-1.5 text-[clamp(1.2rem,1.8vw,1.7rem)] font-extrabold tracking-[-0.025em] text-[var(--docs-ink)]">
              {labels.recentlyUpdated}
            </h2>

            <p className="mt-1 max-w-[42rem] text-[clamp(0.74rem,0.86vw,0.9rem)] font-medium text-[var(--docs-muted)]">
              {labels.updatedDescription}
            </p>
          </header>

          <div className="mt-4 overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.78)] shadow-[var(--docs-shadow-soft)]">
            {recentlyUpdatedDocuments.map(
              (item, index) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={[
                    "group grid gap-3 px-4 py-3 transition hover:bg-[var(--docs-background-soft)] sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-center",
                    index > 0
                      ? "border-t border-[var(--docs-line)]"
                      : "",
                  ].join(" ")}
                >
                  <span className="hidden font-mono text-[0.72rem] font-black text-[var(--docs-gold-dark)] sm:block">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[clamp(0.78rem,0.9vw,0.94rem)] font-extrabold text-[var(--docs-ink)] group-hover:text-[var(--docs-brown)]">
                        {item.title}
                      </span>

                      <DocumentStatusBadge
                        status={item.status}
                        compact
                      />
                    </span>

                    <span className="mt-1 line-clamp-1 block text-[0.68rem] font-medium text-[var(--docs-muted)]">
                      {item.description}
                    </span>
                  </span>

                  <span className="flex items-center justify-between gap-3 sm:block sm:text-right">
                    <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                      {labels.updated}
                    </span>

                    <span className="mt-1 block text-[0.68rem] font-bold text-[var(--docs-brown-dark)]">
                      {formatUpdatedDate(
                        item.updatedAt,
                        locale,
                      )}
                    </span>
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="docs-container py-[clamp(2rem,3.5vw,3rem)]">
        <header>
          <span className="text-[0.64rem] font-extrabold uppercase tracking-[0.1em] text-[var(--docs-plum-dark)]">
            03 · {labels.browse}
          </span>

          <h2 className="mt-1.5 text-[clamp(1.25rem,2vw,1.85rem)] font-extrabold tracking-[-0.03em] text-[var(--docs-ink)]">
            {labels.browse}
          </h2>

          <p className="mt-1 max-w-[44rem] text-[clamp(0.76rem,0.88vw,0.92rem)] font-medium leading-[1.55] text-[var(--docs-muted)]">
            {labels.browseDescription}
          </p>
        </header>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryDocuments =
              documents.filter(
                (item) =>
                  item.category === category.id,
              );

            const visual =
              categoryVisuals[category.id];

            const firstDocument =
              categoryDocuments[0];

            const content = (
              <>
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`font-mono text-[clamp(0.78rem,1vw,0.96rem)] font-black ${visual.accent}`}
                  >
                    {visual.number}
                  </span>

                  <span className="rounded-full border border-[var(--docs-line)] bg-white/55 px-2 py-1 text-[0.56rem] font-extrabold text-[var(--docs-muted)]">
                    {categoryDocuments.length}{" "}
                    {categoryDocuments.length === 1
                      ? labels.documentLabel
                      : labels.documentsLabel}
                  </span>
                </div>

                <div
                  className={`relative mt-3 h-[0.14rem] w-8 rounded-full ${visual.line}`}
                />

                <h3 className="relative mt-3 text-[clamp(0.82rem,1vw,1rem)] font-extrabold text-[var(--docs-ink)]">
                  {category.label}
                </h3>

                <p className="relative mt-1.5 line-clamp-3 text-[clamp(0.66rem,0.76vw,0.8rem)] font-medium leading-[1.5] text-[var(--docs-muted)]">
                  {category.description}
                </p>

                {categoryDocuments.length > 0 ? (
                  <div className="relative mt-3 grid gap-1.5">
                    {categoryDocuments
                      .slice(0, 3)
                      .map((item) => (
                        <div
                          key={item.slug}
                          className="flex items-center gap-2 text-[0.64rem] font-bold text-[var(--docs-ink-soft)]"
                        >
                          <span
                            className={`size-1.5 shrink-0 rounded-full ${visual.line}`}
                          />

                          <span className="truncate">
                            {item.title}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="relative mt-3 text-[0.64rem] font-extrabold text-[var(--docs-subtle)]">
                    {labels.plannedCollection}
                  </p>
                )}
              </>
            );

            if (firstDocument) {
              return (
                <Link
                  key={category.id}
                  href={`/${firstDocument.slug}`}
                  className={`group relative min-w-0 overflow-hidden rounded-[0.95rem] border p-[clamp(0.75rem,1.25vw,1rem)] shadow-[var(--docs-shadow-soft)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--docs-shadow-card)] ${visual.surface}`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <article
                key={category.id}
                className={`relative min-w-0 overflow-hidden rounded-[0.95rem] border p-[clamp(0.75rem,1.25vw,1rem)] opacity-80 shadow-[var(--docs-shadow-soft)] ${visual.surface}`}
              >
                {content}

                <p className="relative mt-2 hidden text-[0.62rem] font-medium text-[var(--docs-subtle)] sm:block">
                  {labels.noDocument}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-[var(--docs-line)] bg-[rgba(82,59,43,0.96)] text-white">
        <div className="docs-container grid gap-5 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="text-[0.92rem] font-extrabold">
              Official Lifetopia Documentation
            </p>

            <p className="mt-1 text-[0.72rem] font-medium text-white/55">
              {labels.footerDescription}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[0.68rem] font-extrabold text-[#ffe5a5]">
              <Link href="https://lifetopiaworld.io">
                {labels.website}
              </Link>

              <Link href="https://community.lifetopiaworld.io">
                {labels.community}
              </Link>

              <Link href="https://github.com/pashamuhammadd/lifetopia-platform">
                {labels.github}
              </Link>

              <Link href="https://grants.lifetopiaworld.io">
                {labels.funding}
              </Link>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-white/38">
              {labels.contact}
            </p>

            <Link
              href="mailto:contact@lifetopiaworld.io"
              className="mt-1 block text-[0.76rem] font-extrabold text-[#ffe5a5]"
            >
              contact@lifetopiaworld.io
            </Link>

            <Link
              href="mailto:mochnuribrahimpasha@gmail.com"
              className="mt-1 block text-[0.68rem] font-semibold text-white/55"
            >
              mochnuribrahimpasha@gmail.com
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}