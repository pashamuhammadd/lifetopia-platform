"use client";

import {
  getDocuments,
  getDocumentCategory,
} from "@repo/docs-data";
import Link from "next/link";
import { useMemo } from "react";

import { useDocsLanguage } from "./DocsLanguageProvider";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

const homeLabels = {
  en: {
    eyebrow: "Official Documentation",
    title: "Lifetopia World documentation.",
    description:
      "Explore Lifetopia's project, products, development, architecture, funding, economy, and community.",
    open: "Open document",
  },
  id: {
    eyebrow: "Dokumentasi Resmi",
    title: "Dokumentasi Lifetopia World.",
    description:
      "Jelajahi proyek, produk, pengembangan, arsitektur, pendanaan, ekonomi, dan komunitas Lifetopia.",
    open: "Buka dokumen",
  },
};

export function DocsHomeContent() {
  const { locale } = useDocsLanguage();

  const labels = homeLabels[locale];

  const documents = useMemo(
    () => getDocuments(locale),
    [locale],
  );

  return (
    <main className="min-h-[calc(100svh-4rem)]">
      <header className="border-b border-[var(--docs-line)] bg-[rgba(255,253,248,0.62)]">
        <div className="docs-container py-[clamp(2rem,4vw,3.25rem)]">
          <span className="docs-eyebrow">
            {labels.eyebrow}
          </span>

          <h1 className="docs-heading mt-4 max-w-[42rem]">
            {labels.title}
          </h1>

          <p className="docs-description mt-3 max-w-[42rem]">
            {labels.description}
          </p>
        </div>
      </header>

      <section className="docs-container grid grid-cols-2 gap-3 py-[clamp(1.75rem,3vw,2.5rem)] lg:grid-cols-3">
        {documents.map((document) => {
          const category = getDocumentCategory(
            document.category,
            locale,
          );

          return (
            <Link
              key={document.slug}
              href={`/${document.slug}`}
              className="docs-card group flex min-w-0 flex-col p-[clamp(0.75rem,1.4vw,1.1rem)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-[clamp(0.82rem,1.05vw,1.02rem)] font-extrabold leading-[1.2] text-[var(--docs-ink)] transition group-hover:text-[var(--docs-brown)]">
                  {document.title}
                </h2>

                <DocumentStatusBadge
                  status={document.status}
                  compact
                />
              </div>

              <p className="mt-2 text-[0.6rem] font-extrabold uppercase tracking-[0.07em] text-[var(--docs-sky-dark)]">
                {category?.label ??
                  "Documentation"}
              </p>

              <p className="mt-2 line-clamp-3 text-[clamp(0.68rem,0.8vw,0.82rem)] font-medium leading-[1.5] text-[var(--docs-muted)]">
                {document.description}
              </p>

              <div className="mt-auto pt-4">
                <p className="text-[0.66rem] font-extrabold text-[var(--docs-brown)]">
                  {labels.open} →
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}