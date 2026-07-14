import {
  getFeaturedDocuments,
} from "@repo/docs-data";
import Link from "next/link";

export default function NotFound() {
  const recommendedDocuments =
    getFeaturedDocuments("en").slice(0, 3);

  return (
<main
  id="main-content"
  tabIndex={-1}
  className="relative min-h-[calc(100svh-4rem)] overflow-hidden outline-none"
>
    <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-0 size-80 rounded-full bg-[rgba(255,225,154,0.28)] blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[rgba(190,224,240,0.3)] blur-[7rem]"
      />

      <div className="docs-container relative flex min-h-[calc(100svh-4rem)] items-center py-10">
        <div className="mx-auto w-full max-w-[52rem]">
          <section className="docs-book-surface overflow-hidden">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="relative flex min-h-[15rem] items-center justify-center overflow-hidden border-b border-[var(--docs-line)] bg-[linear-gradient(145deg,#5d422f,#38271e)] p-8 text-white lg:border-b-0 lg:border-r">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 size-56 rounded-full bg-[#f3c965]/20 blur-[4rem]"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -left-20 size-60 rounded-full bg-[#80b2c9]/18 blur-[4rem]"
                />

                <div className="relative text-center">
                  <p className="font-mono text-[clamp(3.5rem,9vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-[#ffe09a]">
                    404
                  </p>

                  <p className="mt-3 text-[0.64rem] font-extrabold uppercase tracking-[0.11em] text-white/48">
                    Lifetopia Docs
                  </p>
                </div>
              </div>

              <div className="p-[clamp(1.25rem,3vw,2rem)]">
                <span className="docs-eyebrow">
                  Document Not Found
                </span>

                <h1 className="mt-4 text-[clamp(1.45rem,2.8vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--docs-ink)]">
                  This chapter is not part of the library.
                </h1>

                <p className="mt-3 max-w-[35rem] text-[clamp(0.76rem,0.9vw,0.94rem)] font-medium leading-[1.6] text-[var(--docs-muted)]">
                  The requested document may have moved,
                  been renamed, or never existed. Return to
                  the documentation library or continue with
                  one of the recommended chapters.
                </p>

                <p className="mt-2 text-[0.72rem] font-semibold leading-[1.5] text-[var(--docs-subtle)]">
                  Dokumen yang diminta tidak ditemukan atau
                  sudah dipindahkan.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/"
                    className="docs-button-primary"
                  >
                    Return to Library
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="https://lifetopiaworld.io"
                    className="docs-button-secondary"
                  >
                    Main Website
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.09em] text-[var(--docs-brown)]">
                Recommended Documents
              </p>

              <span className="text-[0.62rem] font-semibold text-[var(--docs-subtle)]">
                {recommendedDocuments.length} chapters
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {recommendedDocuments.map(
                (document) => (
                  <Link
                    key={document.slug}
                    href={`/${document.slug}`}
                    className="docs-card group min-w-0 p-[clamp(0.75rem,1.4vw,1rem)]"
                  >
                    <p className="line-clamp-2 text-[clamp(0.76rem,0.9vw,0.94rem)] font-extrabold leading-[1.25] text-[var(--docs-ink)] transition group-hover:text-[var(--docs-brown)]">
                      {document.title}
                    </p>

                    <p className="mt-2 line-clamp-2 text-[0.66rem] font-medium leading-[1.45] text-[var(--docs-muted)]">
                      {document.description}
                    </p>

                    <p className="mt-3 text-[0.64rem] font-extrabold text-[var(--docs-brown)]">
                      Read document →
                    </p>
                  </Link>
                ),
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}