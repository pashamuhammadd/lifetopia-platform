"use client";

import { getDocuments } from "@repo/docs-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { DocsSearch } from "./DocsSearch";
import { useDocsLanguage } from "./DocsLanguageProvider";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

const navbarLabels = {
  en: {
    official: "Official Documentation",
    publicDocs: "Public Documentation",
    menu: "Documentation Menu",
    close: "Close Documentation Menu",
    documents: "Documents",
  },
  id: {
    official: "Dokumentasi Resmi",
    publicDocs: "Dokumentasi Publik",
    menu: "Menu Dokumentasi",
    close: "Tutup Menu Dokumentasi",
    documents: "Dokumen",
  },
};

export function DocsNavbar() {
  const { locale, setLocale } =
    useDocsLanguage();

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const labels = navbarLabels[locale];

  const documents = useMemo(
    () => getDocuments(locale),
    [locale],
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-[70] border-b border-[var(--docs-line)] bg-[rgba(255,253,248,0.9)] shadow-[0_0.35rem_1.6rem_rgba(74,56,37,0.05)] backdrop-blur-xl">
      <nav className="docs-container flex min-h-16 items-center gap-2.5">
        <Link
          href="/"
          aria-label="Lifetopia Docs home"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[0.72rem] border border-[rgba(201,155,67,0.28)] bg-[var(--docs-gold-soft)] text-[var(--docs-gold-dark)] shadow-[0_0.4rem_1.2rem_rgba(120,88,62,0.06)]">
            <svg
              viewBox="0 0 24 24"
              className="size-[1.1rem]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22z" />
              <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22z" />
            </svg>
          </span>

          <span className="min-w-0">
            <span className="block truncate text-[clamp(0.82rem,1vw,0.98rem)] font-extrabold leading-none text-[var(--docs-brown-dark)]">
              Lifetopia Docs
            </span>

            <span className="mt-1 hidden truncate text-[0.58rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-subtle)] sm:block">
              {labels.official}
            </span>
          </span>
        </Link>

        <div className="mx-auto hidden h-7 w-px bg-[var(--docs-line)] md:block" />

        <DocsSearch />

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-[var(--docs-line)] bg-[var(--docs-sage-soft)] px-3 py-1.5 text-[0.64rem] font-extrabold text-[var(--docs-sage-dark)] xl:flex">
            <span className="size-2 rounded-full bg-[var(--docs-sage)]" />
            {labels.publicDocs}
          </span>

          <div
            role="group"
            aria-label="Documentation language"
            className="flex overflow-hidden rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.8)]"
          >
            {(["en", "id"] as const).map(
              (language) => {
                const isActive =
                  locale === language;

                return (
                  <button
                    key={language}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setLocale(language);
                    }}
                    className={[
                      "flex min-h-[2.35rem] min-w-[2.15rem] items-center justify-center px-2 text-[0.62rem] font-extrabold uppercase transition",
                      isActive
                        ? "bg-[var(--docs-brown-dark)] text-white"
                        : "text-[var(--docs-muted)] hover:bg-[var(--docs-background-soft)] hover:text-[var(--docs-brown-dark)]",
                    ].join(" ")}
                  >
                    {language}
                  </button>
                );
              },
            )}
          </div>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? labels.close
                : labels.menu
            }
            aria-expanded={isMenuOpen}
            aria-controls="docs-mobile-menu"
            onClick={() => {
              setIsMenuOpen(
                (current) => !current,
              );
            }}
            className="flex size-[2.45rem] items-center justify-center rounded-[0.68rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.78)] text-[var(--docs-brown-dark)] transition hover:bg-[var(--docs-paper)] md:hidden"
          >
            {isMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="size-[1.05rem]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="size-[1.05rem]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div
          id="docs-mobile-menu"
          className="absolute inset-x-0 top-full border-b border-[var(--docs-line)] bg-[rgba(255,253,248,0.98)] shadow-[var(--docs-shadow-floating)] backdrop-blur-xl md:hidden"
        >
          <div className="docs-container max-h-[calc(100svh-5rem)] overflow-y-auto py-3">
            <div className="flex items-center justify-between gap-3 px-1 pb-2">
              <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.08em] text-[var(--docs-brown)]">
                {labels.documents}
              </p>

              <span className="text-[0.62rem] font-semibold text-[var(--docs-subtle)]">
                {documents.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {documents.map((document) => {
                const isActive =
                  pathname ===
                  `/${document.slug}`;

                return (
                  <Link
                    key={document.slug}
                    href={`/${document.slug}`}
                    className={[
                      "min-w-0 rounded-[0.78rem] border p-2.5 transition",
                      isActive
                        ? "border-[rgba(108,159,189,0.4)] bg-[var(--docs-sky-soft)]"
                        : "border-[var(--docs-line)] bg-[var(--docs-background-soft)] hover:bg-[var(--docs-paper)]",
                    ].join(" ")}
                  >
                    <p className="line-clamp-2 text-[0.72rem] font-extrabold leading-[1.25] text-[var(--docs-ink)]">
                      {document.title}
                    </p>

                    <div className="mt-2">
                      <DocumentStatusBadge
                        status={document.status}
                        compact
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}