"use client";

import type { DocumentSection } from "@repo/docs-data";
import {
  useEffect,
  useState,
} from "react";

import { useDocsLanguage } from "./DocsLanguageProvider";

type DocumentTableOfContentsProps = {
  sections: DocumentSection[];
};

const tableOfContentsLabels = {
  en: {
    title: "On this page",
    sections: "sections",
    top: "Back to top",
  },
  id: {
    title: "Di halaman ini",
    sections: "bagian",
    top: "Kembali ke atas",
  },
};

export function DocumentTableOfContents({
  sections,
}: DocumentTableOfContentsProps) {
  const { locale } = useDocsLanguage();

  const [activeSectionId, setActiveSectionId] =
    useState(sections[0]?.id ?? "");

  const labels =
    tableOfContentsLabels[locale];

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const sectionElements = sections
      .map((section) =>
        document.getElementById(section.id),
      )
      .filter(
        (
          element,
        ): element is HTMLElement =>
          element instanceof HTMLElement,
      );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top,
          );

        const firstVisible =
          visibleEntries[0];

        if (firstVisible?.target.id) {
          setActiveSectionId(
            firstVisible.target.id,
          );
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 0.1, 0.5],
      },
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <aside className="sticky top-[5rem] rounded-[1rem] border border-[var(--docs-line)] bg-[rgba(255,253,248,0.78)] p-3.5 shadow-[var(--docs-shadow-soft)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-brown)]">
          {labels.title}
        </p>

        <span className="rounded-full border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-2 py-1 text-[0.56rem] font-extrabold text-[var(--docs-muted)]">
          {sections.length} {labels.sections}
        </span>
      </div>

      <nav
        aria-label={labels.title}
        className="relative mt-3"
      >
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[0.28rem] top-2 w-px bg-[var(--docs-line)]"
        />

        <div className="grid gap-1">
          {sections.map((section) => {
            const isActive =
              section.id === activeSectionId;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => {
                  setActiveSectionId(
                    section.id,
                  );
                }}
                aria-current={
                  isActive
                    ? "location"
                    : undefined
                }
                className={[
                  "group relative flex min-w-0 items-start gap-2.5 rounded-[0.62rem] px-2 py-2 transition",
                  isActive
                    ? "bg-[var(--docs-sky-soft)]"
                    : "hover:bg-[var(--docs-background-soft)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "relative z-10 mt-[0.3rem] size-2 shrink-0 rounded-full border-2",
                    isActive
                      ? "border-[var(--docs-sky-dark)] bg-[var(--docs-paper)]"
                      : "border-[var(--docs-brown-soft)] bg-[var(--docs-paper)] group-hover:border-[var(--docs-gold)]",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-[0.68rem] font-bold leading-[1.35]",
                    isActive
                      ? "text-[var(--docs-sky-dark)]"
                      : "text-[var(--docs-muted)] group-hover:text-[var(--docs-brown-dark)]",
                  ].join(" ")}
                >
                  {section.title}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        onClick={scrollToTop}
        className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-[0.68rem] border border-[var(--docs-line)] bg-[var(--docs-background-soft)] px-3 text-[0.66rem] font-extrabold text-[var(--docs-brown-dark)] transition hover:border-[var(--docs-line-strong)] hover:bg-[var(--docs-paper)]"
      >
        <span aria-hidden="true">↑</span>
        {labels.top}
      </button>
    </aside>
  );
}