import Link from "next/link";

import { lifetopiaDocuments } from "../data/documents";

function getStatusClasses(status: string) {
  if (status === "Live") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "Preparing") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-violet-200 bg-violet-50 text-violet-700";
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#f8f2e7] text-[#30251c]">
      <header className="border-b border-[#ded2ba] bg-[#fffaf2]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
          <span className="text-xs font-black uppercase tracking-[0.12em] text-[#557f43]">
            Lifetopia World
          </span>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Public project documentation.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#706452]">
            Review Lifetopia’s product, development,
            architecture, roadmap, and ecosystem plans.
          </p>

          <Link
            href="https://grants.lifetopiaworld.io"
            className="mt-6 inline-flex rounded-xl bg-[#173b21] px-5 py-3 text-sm font-black text-white transition hover:bg-[#24502d]"
          >
            Open Funding Hub ↗
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-4 px-5 py-10 sm:grid-cols-2">
        {lifetopiaDocuments.map((document) => (
          <Link
            key={document.slug}
            href={`/${document.slug}`}
            className="group rounded-2xl border border-[#ded2ba] bg-white/70 p-5 shadow-[0_0.7rem_2rem_rgba(61,47,27,0.05)] transition hover:-translate-y-1 hover:border-[#9fbe8d] hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-black group-hover:text-[#477a34]">
                {document.title}
              </h2>

              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-black ${getStatusClasses(
                  document.status,
                )}`}
              >
                {document.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#706452]">
              {document.description}
            </p>

            <p className="mt-5 text-sm font-black text-[#557f43]">
              Open document →
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}