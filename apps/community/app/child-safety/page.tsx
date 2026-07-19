import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Safety Standards | CommunityHub",
  description:
    "CommunityHub standards against child sexual abuse and exploitation (CSAE) and child sexual abuse material (CSAM).",
  alternates: {
    canonical: "https://community.lifetopiaworld.io/child-safety",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const safetyEmail = "mochnuribrahimpasha@gmail.com";

export default function ChildSafetyPage() {
  return (
    <main className="min-h-dvh bg-[#fff7e8] px-4 py-10 text-[#352219] sm:px-6 sm:py-16">
      <article className="mx-auto w-full max-w-4xl overflow-hidden rounded-[28px] border border-[#e5cda2] bg-[#fffdf9] shadow-[0_24px_80px_rgba(89,57,27,0.12)]">
        <header className="border-b border-[#ead9b8] bg-[#f4f9e9] px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#4f8124]">
            CommunityHub safety
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Child Safety Standards
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-[#765739] sm:text-lg">
            CommunityHub is committed to protecting children and maintains zero
            tolerance for child sexual abuse and exploitation.
          </p>
          <p className="mt-4 text-sm font-bold text-[#765739]">
            Effective date: July 20, 2026 · Last updated: July 20, 2026
          </p>
        </header>

        <div className="space-y-10 px-6 py-10 sm:px-10 sm:py-12">
          <section aria-labelledby="commitment">
            <h2 id="commitment" className="text-2xl font-black">
              1. Zero-tolerance commitment
            </h2>
            <p className="mt-4 leading-7 text-[#674b33]">
              CommunityHub prohibits child sexual abuse and exploitation (CSAE)
              and child sexual abuse material (CSAM). For these standards, a child
              means any person under 18 years of age. These rules apply to every
              account, post, comment, message, image, link, guild, and other form
              of content or interaction on CommunityHub.
            </p>
          </section>

          <section aria-labelledby="prohibited">
            <h2 id="prohibited" className="text-2xl font-black">
              2. Prohibited conduct and content
            </h2>
            <p className="mt-4 leading-7 text-[#674b33]">
              Users must not create, upload, request, possess, share, promote, or
              distribute content that sexually exploits, abuses, or endangers a
              child. Prohibited conduct includes, but is not limited to:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#674b33] marker:text-[#4f8124]">
              <li>CSAM or links that provide access to CSAM;</li>
              <li>grooming or sexual solicitation of a child;</li>
              <li>sextortion or threats involving a child;</li>
              <li>sexual trafficking or facilitation of child exploitation;</li>
              <li>sexualized comments, imagery, or role-play involving children; and</li>
              <li>attempts to normalize, encourage, or conceal CSAE.</li>
            </ul>
          </section>

          <section aria-labelledby="reporting">
            <h2 id="reporting" className="text-2xl font-black">
              3. Reporting child-safety concerns
            </h2>
            <p className="mt-4 leading-7 text-[#674b33]">
              Users can report accounts and user-generated content through the
              report controls available in CommunityHub. Select the reason that
              most closely describes the violation and include useful context.
              Child-safety concerns may also be sent directly to our designated
              point of contact:
            </p>
            <a
              href={`mailto:${safetyEmail}?subject=CommunityHub%20child%20safety%20report`}
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-[#4f8124] px-6 font-black text-white transition hover:bg-[#3f6b1b] focus:outline-none focus:ring-4 focus:ring-[#b9d99c]"
            >
              Report a child-safety concern
            </a>
            <p className="mt-4 break-all font-bold text-[#4f8124]">
              {safetyEmail}
            </p>
            <p className="mt-4 rounded-2xl border border-[#efc76b] bg-[#fff8dc] p-5 leading-7 text-[#674b33]">
              If a child is in immediate danger, contact local emergency services
              or the appropriate child-protection authority. Do not download,
              copy, forward, or redistribute suspected CSAM when making a report.
            </p>
          </section>

          <section aria-labelledby="response">
            <h2 id="response" className="text-2xl font-black">
              4. Review and enforcement
            </h2>
            <p className="mt-4 leading-7 text-[#674b33]">
              CommunityHub prioritizes reports involving child safety. When we
              identify content or conduct that violates these standards, we may
              remove the content, restrict features, suspend or permanently
              terminate accounts, preserve relevant records, and take other
              protective action. We do not notify an alleged offender when doing
              so could increase risk to a child or interfere with an investigation.
            </p>
          </section>

          <section aria-labelledby="authorities">
            <h2 id="authorities" className="text-2xl font-black">
              5. Cooperation with authorities
            </h2>
            <p className="mt-4 leading-7 text-[#674b33]">
              CommunityHub complies with applicable child-safety laws. Where
              required, suspected CSAM or child exploitation will be reported to
              the appropriate regional or national authority, and we will
              cooperate with valid legal requests while protecting user privacy
              and the safety of affected children.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-2xl font-black">
              6. Designated point of contact
            </h2>
            <p className="mt-4 leading-7 text-[#674b33]">
              The CommunityHub child-safety point of contact is prepared to answer
              questions about these standards and our prevention and response
              practices. Contact: {safetyEmail}.
            </p>
          </section>

          <footer className="flex flex-col gap-4 border-t border-[#ead9b8] pt-8 text-sm font-semibold text-[#765739] sm:flex-row sm:items-center sm:justify-between">
            <p>CommunityHub · Lifetopia World</p>
            <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Legal links">
              <a
                className="font-black text-[#4f8124] hover:underline"
                href="https://lifetopiaworld.io/privacy"
              >
                Privacy
              </a>
              <a
                className="font-black text-[#4f8124] hover:underline"
                href="https://lifetopiaworld.io/terms"
              >
                Terms
              </a>
              <a className="font-black text-[#4f8124] hover:underline" href="/">
                CommunityHub
              </a>
            </nav>
          </footer>
        </div>
      </article>
    </main>
  );
}
