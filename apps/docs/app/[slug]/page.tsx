import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getDocumentBySlug,
  lifetopiaDocuments,
} from "../../data/documents";

type DocumentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return lifetopiaDocuments.map((document) => ({
    slug: document.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocumentBySlug(slug);

  if (!document) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: `${document.title} | Lifetopia World Docs`,
    description: document.description,
  };
}

function getStatusClasses(status: string) {
  if (status === "Live") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "Preparing") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-violet-200 bg-violet-50 text-violet-700";
}

export default async function DocumentPage({
  params,
}: DocumentPageProps) {
  const { slug } = await params;
  const document = getDocumentBySlug(slug);

  if (!document) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f2e7] text-[#30251c]">
      <nav className="sticky top-0 z-50 border-b border-[#d9cdb7] bg-[#fffaf2]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-5">
          <Link
            href="/"
            className="font-black text-[#315d32]"
          >
            Lifetopia World Docs
          </Link>

          <Link
            href="https://grants.lifetopiaworld.io"
            className="text-sm font-black text-[#557f43] hover:underline"
          >
            Funding Hub ↗
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <header className="border-b border-[#ded2ba] pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-[#557f43]">
              {document.eyebrow}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-black ${getStatusClasses(
                document.status,
              )}`}
            >
              {document.status}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            {document.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#706452]">
            {document.description}
          </p>

          <p className="mt-4 text-sm font-semibold text-[#8a7d68]">
            Last updated: {document.updatedAt}
          </p>
        </header>

        <div className="mt-8 space-y-5">
          {document.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-[#ded2ba] bg-white/70 p-5 shadow-[0_0.7rem_2rem_rgba(61,47,27,0.05)] sm:p-6"
            >
              <h2 className="text-xl font-black text-[#315d32]">
                {section.title}
              </h2>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 leading-7 text-[#675d4e]"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className="mt-4 grid gap-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 rounded-xl border border-[#e6dcc9] bg-[#faf6ed] px-4 py-3 text-[#675d4e]"
                    >
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-[#68ad4a]" />
                      <span className="leading-6">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="mt-8 flex flex-col gap-3 rounded-2xl bg-[#173b21] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-black">
              Lifetopia World
            </p>

            <p className="mt-1 text-sm text-white/55">
              Public reviewer documentation
            </p>
          </div>

          <Link
            href="mailto:contact@lifetopiaworld.io"
            className="text-sm font-black text-[#afe994] hover:underline"
          >
            contact@lifetopiaworld.io
          </Link>
        </footer>
      </article>
    </main>
  );
}