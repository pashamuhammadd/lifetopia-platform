"use client";

import {
  getDocumentBySlug,
  getDocumentCategory,
  getDocuments,
} from "@repo/docs-data";
import Link from "next/link";

import { BackToTop } from "./BackToTop";
import { DocsSidebar } from "./DocsSidebar";
import { useDocsLanguage } from "./DocsLanguageProvider";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { ProjectOverviewVisual } from "./ProjectOverviewVisual";
import { DocumentTableOfContents } from "./DocumentTableOfContents";
import { BetaRoadmapVisual } from "./BetaRoadmapVisual";

type DocumentContentProps = {
  slug: string;
};

const documentLabels = {
  en: {
    keyTakeaways: "Key Takeaways",
takeawayDescription:
  "The most important points to understand before reading the complete document.",
    documentation: "Documentation",
    updated: "Updated",
    owner: "Owner",
    reading: "min read",
    version: "Version",
    previous: "Previous Document",
    next: "Next Document",
    projectDocumentation:
      "Official public project documentation",
    contact: "Project Contact",
  },
  id: {
    keyTakeaways: "Poin Utama",
takeawayDescription:
  "Hal-hal terpenting yang perlu dipahami sebelum membaca dokumen lengkap.",
    documentation: "Dokumentasi",
    updated: "Diperbarui",
    owner: "Penanggung Jawab",
    reading: "menit baca",
    version: "Versi",
    previous: "Dokumen Sebelumnya",
    next: "Dokumen Berikutnya",
    projectDocumentation:
      "Dokumentasi resmi proyek publik",
    contact: "Kontak Proyek",
  },
};

function formatUpdatedDate(
  value: string,
  locale: "en" | "id",
) {
  const date = new Date(
    `${value}T00:00:00`,
  );

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    locale === "id" ? "id-ID" : "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

export function DocumentContent({
  slug,
}: DocumentContentProps) {
  const { locale } = useDocsLanguage();

  const document = getDocumentBySlug(
    slug,
    locale,
  );

  if (!document) {
    return null;
  }

  const documents = getDocuments(locale);

  const documentIndex =
    documents.findIndex(
      (item) => item.slug === document.slug,
    );

  const previousDocument =
    documentIndex > 0
      ? documents[documentIndex - 1]
      : undefined;

  const nextDocument =
    documentIndex >= 0 &&
    documentIndex < documents.length - 1
      ? documents[documentIndex + 1]
      : undefined;

  const category = getDocumentCategory(
    document.category,
    locale,
  );

  const labels = documentLabels[locale];

  return (
    <main
      id="document-top"
      className="min-h-[calc(100svh-4rem)]"
    >
      <div className="docs-container py-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="grid min-w-0 gap-[clamp(1rem,2vw,1.5rem)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem] 2xl:grid-cols-[17rem_minmax(0,1fr)_14rem]">
          <div className="hidden min-w-0 xl:block">
            <DocsSidebar />
          </div>

          <article className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-1.5 text-[0.66rem] font-bold text-[var(--docs-muted)]"
            >
              <Link
                href="/"
                className="transition hover:text-[var(--docs-brown-dark)]"
              >
                {labels.documentation}
              </Link>

              <span
                aria-hidden="true"
                className="text-[var(--docs-subtle)]"
              >
                /
              </span>

              <span className="text-[var(--docs-sky-dark)]">
                {category?.label ??
                  labels.documentation}
              </span>

              <span
                aria-hidden="true"
                className="text-[var(--docs-subtle)]"
              >
                /
              </span>

              <span
                aria-current="page"
                className="font-extrabold text-[var(--docs-brown-dark)]"
              >
                {document.title}
              </span>
            </nav>

            <header className="docs-book-surface px-[clamp(1.25rem,3vw,2rem)] py-[clamp(1.25rem,3vw,2rem)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="docs-eyebrow">
                  {document.eyebrow}
                </span>

                <DocumentStatusBadge
                  status={document.status}
                />
              </div>

              <h1 className="docs-heading mt-4 max-w-[52rem]">
                {document.title}
              </h1>

              <p className="docs-description mt-3 max-w-[50rem]">
                {document.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <article className="rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] px-3 py-2.5">
                  <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                    {labels.updated}
                  </p>

                  <p className="mt-1 text-[0.7rem] font-extrabold text-[var(--docs-ink-soft)]">
                    {formatUpdatedDate(
                      document.updatedAt,
                      locale,
                    )}
                  </p>
                </article>

                <article className="rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] px-3 py-2.5">
                  <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                    {labels.owner}
                  </p>

                  <p className="mt-1 line-clamp-1 text-[0.7rem] font-extrabold text-[var(--docs-ink-soft)]">
                    {document.owner}
                  </p>
                </article>

                <article className="rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] px-3 py-2.5">
                  <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                    Reading
                  </p>

                  <p className="mt-1 text-[0.7rem] font-extrabold text-[var(--docs-ink-soft)]">
                    {document.readingTime}{" "}
                    {labels.reading}
                  </p>
                </article>

                <article className="rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] px-3 py-2.5">
                  <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-subtle)]">
                    {labels.version}
                  </p>

                  <p className="mt-1 text-[0.7rem] font-extrabold text-[var(--docs-ink-soft)]">
                    v{document.version}
                  </p>
                </article>
              </div>
            </header>

{document.keyTakeaways.length > 0 ? (
  <section className="mt-4 overflow-hidden rounded-[1rem] border border-[rgba(201,155,67,0.28)] bg-[linear-gradient(145deg,rgba(255,253,248,0.95),rgba(255,241,204,0.72))] shadow-[var(--docs-shadow-soft)]">
    <header className="border-b border-[rgba(201,155,67,0.2)] px-[clamp(1rem,2vw,1.4rem)] py-3">
      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-gold-dark)]">
        {labels.keyTakeaways}
      </p>

      <p className="mt-1 text-[0.7rem] font-medium text-[var(--docs-muted)]">
        {labels.takeawayDescription}
      </p>
    </header>

    <div className="grid gap-px bg-[rgba(201,155,67,0.17)] sm:grid-cols-2">
      {document.keyTakeaways.map(
        (takeaway, index) => (
          <article
            key={takeaway}
            className="flex items-start gap-3 bg-[rgba(255,253,248,0.82)] px-[clamp(0.85rem,1.5vw,1.1rem)] py-3"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--docs-gold-soft)] font-mono text-[0.6rem] font-black text-[var(--docs-gold-dark)]">
              {String(index + 1).padStart(
                2,
                "0",
              )}
            </span>

            <p className="text-[clamp(0.7rem,0.82vw,0.86rem)] font-semibold leading-[1.5] text-[var(--docs-ink-soft)]">
              {takeaway}
            </p>
          </article>
        ),
      )}
    </div>
  </section>
) : null}

<div className="docs-prose mt-4">
              {document.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="docs-book-surface mb-4 scroll-mt-24 px-[clamp(1.25rem,3vw,2rem)] py-[clamp(1rem,2.5vw,1.6rem)]"
                >
                  <h2 className="mt-0">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map(
  (paragraph) => (
    <p key={paragraph}>
      {paragraph}
    </p>
  ),
)}

{document.slug === "project-overview" &&
section.id === "product-ecosystem" ? (
  <ProjectOverviewVisual
    locale={locale}
  />
) : null}

{document.slug === "beta-roadmap" &&
section.id === "delivery-path" ? (
  <BetaRoadmapVisual locale={locale} />
) : null}

{section.bullets ? (
                    <ul className="mt-4 grid gap-2">
                      {section.bullets.map(
                        (bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 rounded-[0.7rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)] px-3 py-2.5"
                          >
                            <span className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-[var(--docs-gold)]" />

                            <span>{bullet}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <nav
              aria-label="Document navigation"
              className="mt-5 grid gap-3 sm:grid-cols-2"
            >
              {previousDocument ? (
                <Link
                  href={`/${previousDocument.slug}`}
                  className="docs-card group flex min-h-[6rem] flex-col justify-center p-4"
                >
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-subtle)]">
                    ← {labels.previous}
                  </p>

                  <p className="mt-2 text-[0.82rem] font-extrabold text-[var(--docs-ink)] transition group-hover:text-[var(--docs-brown)]">
                    {previousDocument.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextDocument ? (
                <Link
                  href={`/${nextDocument.slug}`}
                  className="docs-card group flex min-h-[6rem] flex-col justify-center p-4 text-left sm:text-right"
                >
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-subtle)]">
                    {labels.next} →
                  </p>

                  <p className="mt-2 text-[0.82rem] font-extrabold text-[var(--docs-ink)] transition group-hover:text-[var(--docs-brown)]">
                    {nextDocument.title}
                  </p>
                </Link>
              ) : null}
            </nav>

            <footer className="mt-5 flex flex-col gap-3 rounded-[1rem] bg-[var(--docs-brown-dark)] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-extrabold">
                  Official Lifetopia Documentation
                </p>

                <p className="mt-1 text-sm text-white/55">
                  {labels.projectDocumentation}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.08em] text-white/38">
                  {labels.contact}
                </p>

                <Link
                  href="mailto:contact@lifetopiaworld.io"
                  className="mt-1 block text-sm font-extrabold text-[#ffe5a5] hover:underline"
                >
                  contact@lifetopiaworld.io
                </Link>
              </div>
            </footer>
          </article>

          <div className="hidden min-w-0 xl:block">
            <DocumentTableOfContents
              sections={document.sections}
            />
          </div>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}