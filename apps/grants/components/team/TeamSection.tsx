import {
  TeamMemberCard,
  type TeamMemberCardData,
} from "./TeamMemberCard";

const teamMembers: TeamMemberCardData[] = [
  {
    name: "Pasha Muhammad",
    role: "Founder & Product Lead",
    description:
      "Accountable for product scope, grant delivery, ecosystem direction, milestone coordination, and communication with reviewers.",
    responsibilities: [
      "Product Scope",
      "Grant Reporting",
      "Milestone Coordination",
      "Ecosystem Direction",
    ],
    initials: "PM",
    profileUrl: "https://pashamuhammad.me",
    accent: "green",
  },
  {
    name: "Sonny Michael Wijaya",
    role: "Lead Developer",
    description:
      "Leads technical architecture, gameplay systems, application integration, performance, and delivery of the connected product ecosystem.",
    responsibilities: [
      "System Architecture",
      "Game Development",
      "Platform Integration",
      "Technical Stability",
    ],
    initials: "SM",
    accent: "blue",
  },
  {
    name: "Rahmi Vina Shafira",
    role: "Game Developer",
    description:
      "Supports gameplay implementation, feature verification, testing, bug resolution, and expansion of the playable Beta experience.",
    responsibilities: [
      "Gameplay Features",
      "Feature Testing",
      "Bug Resolution",
      "Beta Verification",
    ],
    initials: "RV",
    accent: "purple",
  },
  {
    name: "Hariono Suwika",
    role: "Lead Artist",
    description:
      "Responsible for art direction, character production, game assets, and visual consistency across the Lifetopia player experience.",
    responsibilities: [
      "Art Direction",
      "Game Assets",
      "Character Production",
      "Visual Quality",
    ],
    initials: "HS",
    accent: "gold",
  },
];

const teamSummary = [
  {
    label: "Contributors",
    value: String(teamMembers.length),
  },
  {
    label: "Delivery Areas",
    value: "4",
  },
  {
    label: "Roadmap",
    value: "1 Shared Plan",
  },
  {
    label: "Accountability",
    value: "Founder Led",
  },
];

const deliveryOwnership = [
  {
    number: "01",
    area: "Product & Grant Delivery",
    owner: "Pasha Muhammad",
    role: "Accountable Lead",
    contribution:
      "Product scope, milestone coordination, funding communication, acceptance review, and final reporting.",
    evidence:
      "Roadmap decisions, reviewer communication, milestone reports, and final impact documentation.",
    accent:
      "border-[#79ad62]/25 bg-[#f4faf0] text-[#477a34]",
    badge:
      "border-[#d1e4c7] bg-[#edf7e7] text-[#477a34]",
  },
  {
    number: "02",
    area: "Technical Architecture & Integration",
    owner: "Sonny Michael Wijaya",
    role: "Technical Owner",
    contribution:
      "Game systems, platform architecture, account integration, performance, and connected ecosystem delivery.",
    evidence:
      "Source code, application builds, integration records, technical testing, and deployment activity.",
    accent:
      "border-[#73afd1]/25 bg-[#f2f9fd] text-[#347ba5]",
    badge:
      "border-[#cce4f2] bg-[#edf7fd] text-[#347ba5]",
  },
  {
    number: "03",
    area: "Gameplay Implementation & QA",
    owner: "Rahmi Vina Shafira",
    role: "Delivery Contributor",
    contribution:
      "Gameplay feature implementation, testing, issue reproduction, bug resolution, and Beta readiness verification.",
    evidence:
      "Completed gameplay features, test findings, resolved issues, and verified Beta functionality.",
    accent:
      "border-[#9b84dc]/25 bg-[#f8f5ff] text-[#674aab]",
    badge:
      "border-[#dbd2f2] bg-[#f3efff] text-[#674aab]",
  },
  {
    number: "04",
    area: "Art & Visual Production",
    owner: "Hariono Suwika",
    role: "Creative Owner",
    contribution:
      "Character art, environmental assets, visual direction, interface assets, and consistent cozy fantasy presentation.",
    evidence:
      "Delivered visual assets, character production, art reviews, and implementation-ready game resources.",
    accent:
      "border-[#ddb866]/30 bg-[#fffaf0] text-[#946b1b]",
    badge:
      "border-[#ead7a8] bg-[#fff6df] text-[#946b1b]",
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[4rem] size-[22rem] rounded-full bg-[#e2f1d7]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2rem] right-[-9rem] size-[24rem] rounded-full bg-[#e1eef9]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Core Delivery Team
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Clear ownership across product, engineering, gameplay, and art.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Lifetopia World is delivered by a compact team with defined
              responsibilities. Each major area has an accountable owner and
              identifiable delivery evidence.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#203d28]/15 bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
              Accountability Model
            </p>

            <h3 className="mt-2 text-[clamp(1.25rem,1.7vw,1.6rem)] font-black leading-[1.25]">
              Responsibilities are assigned to named delivery owners.
            </h3>

            <p className="mt-3 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-white/62">
              The founder remains directly accountable for milestone
              coordination, reviewer communication, and final grant reporting.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {teamSummary.map((item) => (
                <article
                  key={item.label}
                  className="rounded-[clamp(0.6rem,0.95vw,0.78rem)] border border-white/10 bg-white/[0.06] px-3 py-3"
                >
                  <p className="text-[clamp(0.66rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-white/40">
                    {item.label}
                  </p>

                  <p className="mt-1.5 text-[clamp(0.8rem,0.92vw,0.98rem)] font-black text-[#afe794]">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)] grid gap-[clamp(0.75rem,1.4vw,1.05rem)] sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              member={member}
            />
          ))}
        </div>

        <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-white shadow-[0_1rem_3rem_rgba(62,47,27,0.07)]">
          <header className="border-b border-[#eadfc8] bg-[#faf6ed] px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(0.9rem,1.5vw,1.2rem)]">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
              Delivery Ownership
            </p>

            <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em] text-[#2f2118]">
              Who is accountable for each delivery area
            </h3>

            <p className="mt-3 max-w-[48rem] text-[clamp(0.86rem,0.96vw,1.02rem)] leading-[1.65] text-[#706452]">
              This responsibility map gives reviewers a direct connection
              between team members, milestone work, and the evidence expected
              from each area.
            </p>
          </header>

          <div className="divide-y divide-[#eadfc8]">
            {deliveryOwnership.map((item) => (
              <article
                key={item.number}
                className="grid gap-4 p-[clamp(1rem,1.8vw,1.5rem)] lg:grid-cols-[auto_minmax(13rem,0.75fr)_minmax(0,1.25fr)] lg:items-start"
              >
                <span
                  className={`flex size-[clamp(2.8rem,4vw,3.4rem)] shrink-0 items-center justify-center rounded-[clamp(0.65rem,1vw,0.82rem)] border font-mono text-[clamp(0.76rem,0.88vw,0.92rem)] font-black ${item.accent}`}
                >
                  {item.number}
                </span>

                <div className="min-w-0">
                  <p className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#8a7b64]">
                    Delivery Area
                  </p>

                  <h4 className="mt-2 text-[clamp(1.05rem,1.25vw,1.3rem)] font-black text-[#30251c]">
                    {item.area}
                  </h4>

                  <p className="mt-3 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#8a7b64]">
                    Owner
                  </p>

                  <p className="mt-1.5 text-[clamp(0.9rem,1vw,1.06rem)] font-black text-[#4f7e3a]">
                    {item.owner}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full border px-3 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black ${item.badge}`}
                  >
                    {item.role}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#e5dac3] bg-[#fcf8f0] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.75rem,1.2vw,0.95rem)]">
                    <p className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#738463]">
                      Milestone Contribution
                    </p>

                    <p className="mt-2 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.65] text-[#706452]">
                      {item.contribution}
                    </p>
                  </div>

                  <div className="rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#d5e4cc] bg-[#f3f9ef] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.75rem,1.2vw,0.95rem)]">
                    <p className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#568044]">
                      Reviewer Evidence
                    </p>

                    <p className="mt-2 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.65] text-[#63705b]">
                      {item.evidence}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-[#173b21] p-[clamp(1rem,1.8vw,1.5rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.14)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[50rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
                Reviewer Note
              </p>

              <p className="mt-2 text-[clamp(0.9rem,1.02vw,1.08rem)] font-semibold leading-[1.65] text-white/72">
                Team membership, responsibilities, and delivery ownership
                should remain accurate throughout the funding period. Any
                material team change will be reflected in milestone reporting.
              </p>
            </div>

            <span className="w-fit shrink-0 rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-4 py-2 text-[clamp(0.74rem,0.84vw,0.9rem)] font-black text-[#afe794]">
              Named accountability
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}