"use client";

import {
  getDocumentBySlug,
} from "@repo/docs-data";
import Link from "next/link";

import { useDocsLanguage } from "./DocsLanguageProvider";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

type DocumentContentProps = {
  slug: string;
};

const documentLabels = {
  en: {
    updated: "Updated",
    owner: "Owner",
    reading: "min read",
    version: "Version",
    publicDocumentation:
      "Public project documentation",
  },
  id: {
    updated: "Diperbarui",
    owner: "Penanggung Jawab",
    reading: "menit baca",
    version: "Versi",
    publicDocumentation:
      "Dokumentasi proyek publik",
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

  const labels = documentLabels[locale];

  return (
    <main className="min-h-[calc(100svh-4rem)]">
      <article className="docs-reading-container py-[clamp(2rem,4vw,3.25rem)]">
        <header className="border-b border-[var(--docs-line)] pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="docs-eyebrow">
              {document.eyebrow}
            </span>

            <DocumentStatusBadge
              status={document.status}
            />
          </div>

          <h1 className="docs-heading mt-4 max-w-[48rem]">
            {document.title}
          </h1>

          <p className="docs-description mt-3 max-w-[46rem]">
            {document.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] font-semibold text-[var(--docs-muted)]">
            <span>
              {labels.updated}:{" "}
              {formatUpdatedDate(
                document.updatedAt,
                locale,
              )}
            </span>

            <span>
              {labels.owner}: {document.owner}
            </span>

            <span>
              {document.readingTime}{" "}
              {labels.reading}
            </span>

            <span>
              {labels.version} {document.version}
            </span>
          </div>
        </header>

        <div className="docs-prose mt-6">
          {document.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="docs-book-surface mb-4 px-[clamp(1.25rem,3vw,2rem)] py-[clamp(1rem,2.5vw,1.6rem)]"
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

        <footer className="mt-6 flex flex-col gap-3 rounded-[1rem] bg-[var(--docs-brown-dark)] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-extrabold">
              Official Lifetopia Documentation
            </p>

            <p className="mt-1 text-sm text-white/55">
              {labels.publicDocumentation}
            </p>
          </div>

          <Link
            href="mailto:contact@lifetopiaworld.io"
            className="text-sm font-extrabold text-[#ffe5a5] hover:underline"
          >
            contact@lifetopiaworld.io
          </Link>
        </footer>
      </article>
    </main>
  );
}