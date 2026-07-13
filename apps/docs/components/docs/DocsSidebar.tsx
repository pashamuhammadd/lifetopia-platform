"use client";

import {
  getDocumentCategories,
  getDocuments,
} from "@repo/docs-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useMemo,
  useState,
} from "react";

import { useDocsLanguage } from "./DocsLanguageProvider";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

const sidebarLabels = {
  en: {
    navigation: "Documentation",
    search: "Filter documents...",
    noResult: "No matching documents.",
    resources: "Project Resources",
    fundingHub: "Funding Hub",
    github: "GitHub Repository",
  },
  id: {
    navigation: "Dokumentasi",
    search: "Filter dokumen...",
    noResult: "Dokumen tidak ditemukan.",
    resources: "Sumber Proyek",
    fundingHub: "Funding Hub",
    github: "Repository GitHub",
  },
};

export function DocsSidebar() {
  const { locale } = useDocsLanguage();
  const pathname = usePathname();

  const [query, setQuery] = useState("");

  const labels = sidebarLabels[locale];

  const documents = useMemo(
    () => getDocuments(locale),
    [locale],
  );

  const categories = useMemo(
    () => getDocumentCategories(locale),
    [locale],
  );

  const filteredDocuments = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    if (!normalizedQuery) {
      return documents;
    }

    return documents.filter((document) =>
      [
        document.title,
        document.description,
        document.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [documents, query]);

  const visibleCategoryCount =
    categories.filter((category) =>
      filteredDocuments.some(
        (document) =>
          document.category === category.id,
      ),
    ).length;

  return (
    <aside className="sticky top-[5rem] max-h-[calc(100svh-6rem)] overflow-hidden rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.82)] shadow-[var(--docs-shadow-soft)] backdrop-blur-xl">
      <header className="border-b border-[var(--docs-line)] px-3.5 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-brown)]">
            {labels.navigation}
          </p>

          <span className="rounded-full border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-2 py-1 text-[0.58rem] font-extrabold text-[var(--docs-muted)]">
            {documents.length}
          </span>
        </div>

        <div className="relative mt-3">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--docs-subtle)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[0.9rem]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>

          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder={labels.search}
            aria-label={labels.search}
            className="h-10 w-full rounded-[0.68rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] pl-8 pr-3 text-[0.72rem] font-semibold text-[var(--docs-ink)] outline-none transition placeholder:text-[var(--docs-subtle)] focus:border-[rgba(108,159,189,0.5)] focus:bg-[var(--docs-paper)]"
          />
        </div>
      </header>

      <div className="max-h-[calc(100svh-17rem)] overflow-y-auto px-2 py-2.5">
        {visibleCategoryCount > 0 ? (
          <div className="space-y-3">
            {categories.map((category) => {
              const categoryDocuments =
                filteredDocuments.filter(
                  (document) =>
                    document.category ===
                    category.id,
                );

              if (categoryDocuments.length === 0) {
                return null;
              }

              return (
                <section key={category.id}>
                  <div className="flex items-center justify-between gap-2 px-2 pb-1.5">
                    <p className="truncate text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-sky-dark)]">
                      {category.label}
                    </p>

                    <span className="text-[0.56rem] font-bold text-[var(--docs-subtle)]">
                      {categoryDocuments.length}
                    </span>
                  </div>

                  <div className="grid gap-1">
                    {categoryDocuments.map(
                      (document) => {
                        const href =
                          `/${document.slug}`;

                        const isActive =
                          pathname === href;

                        return (
                          <Link
                            key={document.slug}
                            href={href}
                            aria-current={
                              isActive
                                ? "page"
                                : undefined
                            }
                            className={[
                              "group min-w-0 rounded-[0.72rem] border px-2.5 py-2.5 transition",
                              isActive
                                ? "border-[rgba(108,159,189,0.4)] bg-[var(--docs-sky-soft)] shadow-[0_0.45rem_1.3rem_rgba(71,120,147,0.08)]"
                                : "border-transparent hover:border-[var(--docs-line)] hover:bg-[var(--docs-background-soft)]",
                            ].join(" ")}
                          >
                            <div className="flex items-start gap-2">
                              <span
                                className={[
                                  "mt-[0.35rem] size-1.5 shrink-0 rounded-full",
                                  isActive
                                    ? "bg-[var(--docs-sky-dark)]"
                                    : "bg-[var(--docs-gold)]",
                                ].join(" ")}
                              />

                              <div className="min-w-0 flex-1">
                                <p
                                  className={[
                                    "line-clamp-2 text-[0.7rem] font-extrabold leading-[1.25]",
                                    isActive
                                      ? "text-[var(--docs-sky-dark)]"
                                      : "text-[var(--docs-ink-soft)] group-hover:text-[var(--docs-brown-dark)]",
                                  ].join(" ")}
                                >
                                  {document.title}
                                </p>

                                <div className="mt-1.5">
                                  <DocumentStatusBadge
                                    status={
                                      document.status
                                    }
                                    compact
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      },
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="px-3 py-8 text-center">
            <p className="text-[0.74rem] font-extrabold text-[var(--docs-ink)]">
              {labels.noResult}
            </p>
          </div>
        )}
      </div>

      <footer className="border-t border-[var(--docs-line)] bg-[var(--docs-background-soft)] p-2.5">
        <p className="px-1 text-[0.58rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-subtle)]">
          {labels.resources}
        </p>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <Link
            href="https://grants.lifetopiaworld.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-[0.62rem] border border-[var(--docs-line)] bg-[var(--docs-paper)] px-2 text-center text-[0.64rem] font-extrabold text-[var(--docs-brown-dark)] transition hover:border-[var(--docs-line-strong)] hover:bg-white"
          >
            {labels.fundingHub}
            <span aria-hidden="true">↗</span>
          </Link>

          <Link
            href="https://github.com/pashamuhammadd/lifetopia-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-10 items-center justify-center gap-1.5 rounded-[0.62rem] border border-[var(--docs-line)] bg-[var(--docs-paper)] px-2 text-center text-[0.64rem] font-extrabold text-[var(--docs-brown-dark)] transition hover:border-[var(--docs-line-strong)] hover:bg-white"
          >
            {labels.github}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </footer>
    </aside>
  );
}