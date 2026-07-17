import {
  ArrowLeft,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalSectionLink = {
  id: string;
  label: string;
};

type LegalDocumentLayoutProps = {
  badge: string;
  title: string;
  description: string;
  version: string;
  effectiveDate: string;
  sections: readonly LegalSectionLink[];
  contactEmail: string;
  children: ReactNode;
};

export function LegalDocumentLayout({
  badge,
  title,
  description,
  version,
  effectiveDate,
  sections,
  contactEmail,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <main className="min-h-screen bg-[#fff7e8] text-[#2f1b12]">
      <header className="border-b border-[#e8d8b8] bg-white/70 px-[clamp(1rem,4vw,5rem)] py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#e6d4b1] bg-[#fffaf0] px-4 text-sm font-black text-[#6d4d2d] transition hover:border-[#aacd7d] hover:bg-[#f1f8e8] hover:text-[#4f8124]"
          >
            <ArrowLeft size={17} />
            Back to Lifetopia
          </Link>

          <Link
            href="/"
            className="text-right text-base font-black tracking-[-0.02em] text-[#2f1b12]"
          >
            Lifetopia World
          </Link>
        </div>
      </header>

      <section className="border-b border-[#e8d8b8] bg-[radial-gradient(circle_at_top_left,rgba(182,220,132,0.32),transparent_38%),linear-gradient(180deg,#fffdf6,#fff7e8)] px-[clamp(1rem,4vw,5rem)] py-[clamp(3rem,8vw,6.5rem)]">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#cfe2bd] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#4f8124]">
            <ShieldCheck size={15} />
            {badge}
          </span>

          <h1 className="mt-5 text-[clamp(2.3rem,7vw,5.8rem)] font-black leading-[0.98] tracking-[-0.055em]">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-[clamp(0.95rem,1.6vw,1.15rem)] font-semibold leading-8 text-[#76583a]">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-[#e4d2ae] bg-white/70 px-4 py-2 text-xs font-black text-[#76583a]">
              Version {version}
            </span>

            <span className="rounded-full border border-[#e4d2ae] bg-white/70 px-4 py-2 text-xs font-black text-[#76583a]">
              Effective {effectiveDate}
            </span>
          </div>
        </div>
      </section>

      <section className="px-[clamp(1rem,4vw,5rem)] py-[clamp(2rem,6vw,5rem)]">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-[24px] border border-[#e7d8bb] bg-white/75 p-4 shadow-[0_16px_48px_rgba(74,49,22,0.08)] lg:sticky lg:top-6">
            <div className="flex items-center gap-2 px-2">
              <FileText
                size={17}
                className="text-[#4f8124]"
              />
              <p className="text-sm font-black">
                On this page
              </p>
            </div>

            <nav
              aria-label={`${title} sections`}
              className="mt-3 grid gap-1"
            >
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-[14px] px-3 py-2 text-sm font-bold leading-5 text-[#76583a] transition hover:bg-[#eef7e4] hover:text-[#4f8124]"
                >
                  {index + 1}. {section.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="rounded-[30px] border border-[#e7d8bb] bg-white/80 p-[clamp(1.1rem,3vw,2.5rem)] shadow-[0_22px_65px_rgba(74,49,22,0.1)]">
            <div className="legal-document space-y-9">
              {children}
            </div>

            <div className="mt-10 rounded-[22px] border border-[#cfe2bd] bg-[#f2f8e9] p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#4f8124] shadow-sm">
                  <Mail size={18} />
                </span>

                <div>
                  <h2 className="text-base font-black">
                    Questions about this document?
                  </h2>

                  <p className="mt-1 text-sm font-semibold leading-6 text-[#6c5a45]">
                    Contact the Lifetopia World team at{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-black text-[#4f8124] underline decoration-[#9fcf72] underline-offset-4"
                    >
                      {contactEmail}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

type LegalSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({
  id,
  title,
  children,
}: LegalSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-6"
    >
      <h2 className="text-[clamp(1.35rem,3vw,2rem)] font-black tracking-[-0.025em] text-[#2f1b12]">
        {title}
      </h2>

      <div className="mt-3 space-y-3 text-[0.95rem] font-semibold leading-7 text-[#66513b]">
        {children}
      </div>
    </section>
  );
}
