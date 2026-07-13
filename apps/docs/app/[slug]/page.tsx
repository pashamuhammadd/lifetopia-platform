import {
  getAllDocumentSlugs,
  getDocumentBySlug,
  type DocumentStatus,
} from "@repo/docs-data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type DocumentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllDocumentSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocumentBySlug(
    slug,
    "en",
  );

  if (!document) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: document.title,
    description: document.description,
    alternates: {
      canonical: `/${document.slug}`,
    },
  };
}

function getStatusClasses(
  status: DocumentStatus,
) {
  if (status === "Live") {
    return "border-[#bdd6ae] bg-[#edf6e6] text-[#647653]";
  }

  if (status === "Public Draft") {
    return "border-[#c9dfea] bg-[#eaf5fa] text-[#477893]";
  }

  if (status === "In Preparation") {
    return "border-[#e2cf9d] bg-[#fff2d2] text-[#946c25]";
  }

  if (status === "Archived") {
    return "border-[#d7cec2] bg-[#eee8df] text-[#827462]";
  }

  return "border-[#d4c8dc] bg-[#f2ebf4] text-[#68556f]";
}

function formatUpdatedDate(value: string) {
  const date = new Date(
    `${value}T00:00:00`,
  );

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function DocumentPage({
  params,
}: DocumentPageProps) {
  const { slug } = await params;

  const document = getDocumentBySlug(
    slug,
    "en",
  );

  if (!document) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[var(--docs-line)] bg-[rgba(255,253,248,0.88)] backdrop-blur-xl">
        <div className="docs-container flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-extrabold text-[var(--docs-brown-dark)]"
          >
            Lifetopia Docs
          </Link>

          <Link
            href="https://grants.lifetopiaworld.io"
            className="text-sm font-extrabold text-[var(--docs-sky-dark)] hover:underline"
          >
            Funding Hub ↗
          </Link>
        </div>
      </nav>

      <article className="docs-reading-container py-[clamp(2rem,4vw,3.5rem)]">
        <header className="border-b border-[var(--docs-line)] pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="docs-eyebrow">
              {document.eyebrow}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-[0.66rem] font-extrabold ${getStatusClasses(
                document.status,
              )}`}
            >
              {document.status}
            </span>
          </div>

          <h1 className="docs-heading mt-4 max-w-[48rem]">
            {document.title}
          </h1>

          <p className="docs-description mt-3 max-w-[46rem]">
            {document.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] font-semibold text-[var(--docs-muted)]">
            <span>
              Updated:{" "}
              {formatUpdatedDate(
                document.updatedAt,
              )}
            </span>

            <span>
              Owner: {document.owner}
            </span>

            <span>
              {document.readingTime} min read
            </span>

            <span>
              Version {document.version}
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
              Public project documentation
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