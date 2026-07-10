import { documents } from "@/data/grants";

export function DocumentsHub() {
  return (
    <section className="px-[clamp(1rem,5vw,5rem)] py-[clamp(2.8rem,6vw,4.8rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-[clamp(1.2rem,2.8vw,2.2rem)]">
        <div>
          <span className="lt-grants-badge">Documents Hub</span>
          <h2 className="mt-4 text-[clamp(1.8rem,4.5vw,3.7rem)] font-black leading-[1] tracking-[-0.045em] text-[#2f1b12]">
            Everything reviewers need in one place.
          </h2>
          <p className="mt-4 max-w-3xl text-[clamp(0.9rem,1.2vw,1.08rem)] leading-[1.8] text-[#7a5635]">
            This portal will connect grant reviewers and ecosystem partners to
            Lifetopia&apos;s proposal, technical docs, roadmap, budget, media
            assets, and public reports.
          </p>
        </div>

        <div className="grid gap-[clamp(0.8rem,1.6vw,1.1rem)] sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <article
              key={document.title}
              className="lt-grants-card rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1rem,2vw,1.4rem)]"
            >
              <h3 className="text-[clamp(1rem,1.5vw,1.25rem)] font-black text-[#2f1b12]">
                {document.title}
              </h3>
              <p className="mt-2 rounded-full bg-[#edf7df] px-3 py-1 text-sm font-black text-[#4f8124]">
                {document.status}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}