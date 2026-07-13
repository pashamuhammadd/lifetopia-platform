"use client";

import {
  getDocumentCategory,
  getDocuments,
  getFeaturedDocuments,
  type DocumentStatus,
} from "@repo/docs-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDocsLanguage } from "./DocsLanguageProvider";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  context: string;
  status: DocumentStatus;
};

const searchLabels = {
  en: {
    placeholder: "Search documentation...",
    mobilePlaceholder: "Search documents and content...",
    featured: "Recommended documents",
    results: "Search results",
    empty: "No documentation found.",
    hint: "Search titles, sections, paragraphs, and bullets.",
  },
  id: {
    placeholder: "Cari dokumentasi...",
    mobilePlaceholder: "Cari dokumen dan isi...",
    featured: "Dokumen yang direkomendasikan",
    results: "Hasil pencarian",
    empty: "Dokumentasi tidak ditemukan.",
    hint: "Cari judul, section, paragraf, dan bullet.",
  },
};

export function DocsSearch() {
  const { locale } = useDocsLanguage();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const mobileInputRef =
    useRef<HTMLInputElement>(null);

  const labels = searchLabels[locale];

  const results = useMemo<SearchResult[]>(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    if (!normalizedQuery) {
      return getFeaturedDocuments(locale)
        .slice(0, 6)
        .map((document) => {
          const category = getDocumentCategory(
            document.category,
            locale,
          );

          return {
            id: document.slug,
            title: document.title,
            description: document.description,
            href: `/${document.slug}`,
            context:
              category?.label ?? "Documentation",
            status: document.status,
          };
        });
    }

    const documents = getDocuments(locale);
    const matches: SearchResult[] = [];

    for (const document of documents) {
      const category = getDocumentCategory(
        document.category,
        locale,
      );

      const documentText = [
        document.title,
        document.description,
        document.eyebrow,
      ]
        .join(" ")
        .toLowerCase();

      if (documentText.includes(normalizedQuery)) {
        matches.push({
          id: document.slug,
          title: document.title,
          description: document.description,
          href: `/${document.slug}`,
          context:
            category?.label ?? "Documentation",
          status: document.status,
        });
      }

      for (const section of document.sections) {
        const sectionText = [
          section.title,
          ...(section.paragraphs ?? []),
          ...(section.bullets ?? []),
        ]
          .join(" ")
          .toLowerCase();

        if (!sectionText.includes(normalizedQuery)) {
          continue;
        }

        const description =
          section.paragraphs?.[0] ??
          section.bullets?.[0] ??
          document.description;

        matches.push({
          id: `${document.slug}-${section.id}`,
          title: section.title,
          description,
          href: `/${document.slug}#${section.id}`,
          context: document.title,
          status: document.status,
        });
      }
    }

    const uniqueResults = new Map<
      string,
      SearchResult
    >();

    for (const result of matches) {
      if (!uniqueResults.has(result.id)) {
        uniqueResults.set(result.id, result);
      }
    }

    return Array.from(uniqueResults.values()).slice(
      0,
      8,
    );
  }, [locale, query]);

  useEffect(() => {
    function handlePointerDown(
      event: MouseEvent,
    ) {
      const container = containerRef.current;

      if (
        container &&
        !container.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handlePointerDown,
    );

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown,
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function openMobileSearch() {
    setIsOpen(true);

    window.setTimeout(() => {
      mobileInputRef.current?.focus();
    }, 0);
  }

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 md:flex md:flex-1 md:justify-center"
    >
      <div className="relative hidden w-full max-w-[30rem] md:block">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--docs-muted)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-[1rem]"
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
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
          }}
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          className="h-[2.55rem] w-full rounded-[0.72rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.76)] pl-9 pr-3 text-[0.78rem] font-semibold text-[var(--docs-ink)] shadow-[0_0.4rem_1.4rem_rgba(74,56,37,0.04)] outline-none transition placeholder:text-[var(--docs-subtle)] focus:border-[rgba(108,159,189,0.48)] focus:bg-[var(--docs-paper)]"
        />
      </div>

      <button
        type="button"
        onClick={openMobileSearch}
        aria-label={labels.placeholder}
        aria-expanded={isOpen}
        className="flex size-[2.45rem] items-center justify-center rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.78)] text-[var(--docs-brown-dark)] transition hover:bg-[var(--docs-paper)] md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[1rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close search"
            onClick={() => {
              setIsOpen(false);
            }}
            className="fixed inset-0 top-16 z-[80] bg-[#36291e]/20 backdrop-blur-[2px] md:hidden"
          />

          <div className="fixed left-3 right-3 top-[4.45rem] z-[90] overflow-hidden rounded-[1rem] border border-[var(--docs-line-strong)] bg-[rgba(255,253,248,0.98)] shadow-[var(--docs-shadow-floating)] md:absolute md:left-1/2 md:right-auto md:top-[calc(100%+0.65rem)] md:w-[36rem] md:max-w-[calc(100vw-2rem)] md:-translate-x-1/2">
            <div className="border-b border-[var(--docs-line)] p-3 md:hidden">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--docs-muted)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[1rem]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>

                <input
                  ref={mobileInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  placeholder={
                    labels.mobilePlaceholder
                  }
                  aria-label={
                    labels.mobilePlaceholder
                  }
                  className="h-11 w-full rounded-[0.72rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] pl-9 pr-3 text-[0.82rem] font-semibold outline-none focus:border-[rgba(108,159,189,0.5)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-[var(--docs-line)] px-3 py-2.5">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-brown)]">
                {query.trim()
                  ? labels.results
                  : labels.featured}
              </p>

              <p className="text-[0.62rem] font-semibold text-[var(--docs-subtle)]">
                {results.length} result
                {results.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="max-h-[min(29rem,65svh)] overflow-y-auto p-2">
              {results.length > 0 ? (
                <div className="grid gap-1.5">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="group flex items-start gap-3 rounded-[0.78rem] border border-transparent px-3 py-2.5 transition hover:border-[var(--docs-line)] hover:bg-[var(--docs-background-soft)]"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[0.6rem] bg-[var(--docs-gold-soft)] text-[var(--docs-gold-dark)]">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-[0.95rem]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 3h11l3 3v15H5z" />
                          <path d="M16 3v4h4" />
                          <path d="M8 12h8M8 16h6" />
                        </svg>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[0.78rem] font-extrabold text-[var(--docs-ink)] group-hover:text-[var(--docs-brown)]">
                            {result.title}
                          </span>

                          <DocumentStatusBadge
                            status={result.status}
                            compact
                          />
                        </span>

                        <span className="mt-1 block text-[0.62rem] font-extrabold uppercase tracking-[0.06em] text-[var(--docs-sky-dark)]">
                          {result.context}
                        </span>

                        <span className="mt-1 line-clamp-2 block text-[0.7rem] font-medium leading-[1.45] text-[var(--docs-muted)]">
                          {result.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-[0.82rem] font-extrabold text-[var(--docs-ink)]">
                    {labels.empty}
                  </p>

                  <p className="mt-2 text-[0.72rem] font-medium text-[var(--docs-muted)]">
                    {labels.hint}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}