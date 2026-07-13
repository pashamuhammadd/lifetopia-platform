import {
  getDocuments,
  type DocumentStatus,
} from "@repo/docs-data";
import Link from "next/link";

const documents = getDocuments("en");

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

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-[var(--docs-line)] bg-[rgba(255,253,248,0.72)]">
        <div className="docs-container py-[clamp(2.25rem,5vw,4rem)]">
          <span className="docs-eyebrow">
            Official Documentation
          </span>

          <h1 className="docs-heading mt-4 max-w-[42rem]">
            Lifetopia World documentation.
          </h1>

          <p className="docs-description mt-3 max-w-[42rem]">
            Explore Lifetopia&apos;s project,
            products, development, architecture,
            funding, economy, and community.
          </p>

          <Link
            href="https://grants.lifetopiaworld.io"
            className="docs-button-primary mt-5"
          >
            Open Funding Hub
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <section className="docs-container grid grid-cols-2 gap-3 py-[clamp(2rem,4vw,3rem)] lg:grid-cols-3">
        {documents.map((document) => (
          <Link
            key={document.slug}
            href={`/${document.slug}`}
            className="docs-card group flex min-w-0 flex-col p-[clamp(0.8rem,1.5vw,1.2rem)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-[clamp(0.86rem,1.15vw,1.1rem)] font-extrabold leading-[1.2] text-[var(--docs-ink)] transition group-hover:text-[var(--docs-brown)]">
                {document.title}
              </h2>

              <span
                className={`w-fit shrink-0 rounded-full border px-2 py-1 text-[0.58rem] font-extrabold ${getStatusClasses(
                  document.status,
                )}`}
              >
                {document.status}
              </span>
            </div>

            <p className="mt-3 line-clamp-3 text-[clamp(0.7rem,0.84vw,0.86rem)] font-medium leading-[1.55] text-[var(--docs-muted)]">
              {document.description}
            </p>

            <div className="mt-auto pt-4">
              <p className="text-[0.68rem] font-extrabold text-[var(--docs-brown)]">
                Open document →
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}