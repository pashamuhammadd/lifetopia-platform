import {
  TeamMemberCard,
  type TeamMemberCardData,
} from "./TeamMemberCard";

const teamMembers: TeamMemberCardData[] = [
  {
    name: "Pasha Muhammad",
    role: "Founder & Project Lead",
    description:
      "Leads the entire Lifetopia World project and remains accountable for its direction, team coordination, funding, and delivery.",
    experience:
      "Founder of Lumix Creative Studio since 2023, with experience leading multidisciplinary creative and Web3 projects.",
    responsibilities: [
      "Leadership",
      "Product Direction",
      "Grant Delivery",
    ],
    imageSrc: "/images/team/pasha-muhammad.png",
    imageAlt: "Pasha Muhammad",
    accent: "green",
    links: [
      {
        label: "Personal Website",
        href: "https://pashamuhammad.me",
      },
      {
        label: "GitHub",
        href: "https://github.com/pashamuhammadd",
      },
      {
        label: "Telegram",
        href: "https://t.me/pashamuhammadd",
      },
      {
        label: "X / Twitter",
        href: "https://x.com/pashamuhammad",
      },
    ],
    identities: [
      {
        label: "Discord",
        value: "@_pashamuhammad",
      },
    ],
  },
  {
    name: "Sonny Michael Wijaya",
    role: "Blockchain Developer",
    description:
      "Integrates Lifetopia World's products, wallet systems, and digital ownership features with the Solana ecosystem.",
    experience:
      "Blockchain developer focused on Solana integration, wallet connectivity, application systems, and on-chain implementation.",
    responsibilities: [
      "Solana Integration",
      "Blockchain Systems",
      "Wallet Connectivity",
    ],
    imageSrc: "/images/team/sonny-michael-wijaya.jpg",
    imageAlt: "Sonny Michael Wijaya",
    accent: "blue",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/isonnymichael",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/isonnymichael/",
      },
    ],
    identities: [
      {
        label: "Discord",
        value: "@isonnymichael",
      },
    ],
  },
  {
    name: "Rahmi Vina Shafira",
    role: "Game Developer",
    description:
      "Develops gameplay systems, player-facing features, technical prototypes, testing, and continued expansion of the game.",
    experience:
      "Game developer with experience across Unity, browser games, virtual reality projects, Web3 products, and public repositories.",
    responsibilities: [
      "Game Development",
      "Gameplay Systems",
      "Testing & QA",
    ],
    imageSrc: "/images/team/rahmi-vina-shafira.jpg",
    imageAlt: "Rahmi Vina Shafira",
    accent: "purple",
    links: [
      {
        label: "Lemmi Run",
        href: "https://lemmirun.cloud",
      },
      {
        label: "Alien Tag VR",
        href: "https://alientagvr.com",
      },
      {
        label: "Unity Portfolio",
        href: "https://portounitydev.crevado.com",
      },
      {
        label: "Avocado DAO",
        href: "https://avocadodao.io",
      },
      {
        label: "Etheria Repository",
        href: "https://github.com/Unam3dd/Etheria",
      },
      {
        label: "Goldium Hosting",
        href: "https://github.com/rahmivinnn/Goldium-Hosting",
      },
      {
        label: "GitHub Profile",
        href: "https://github.com/shafiradev62-bit",
      },
    ],
    identities: [
      {
        label: "Discord",
        value: "@vinaweb3",
      },
    ],
  },
  {
    name: "Hariono Suwika",
    role: "Animation & Audio Lead",
    description:
      "Leads the team responsible for animation, audio production, creative quality, and implementation-ready visual assets.",
    experience:
      "Professional freelance animator since 2015 and Lead Animator at Lumix Creative Studio.",
    responsibilities: [
      "Animation Direction",
      "Audio Production",
      "Creative Review",
    ],
    imageSrc: "/images/team/hariono-suwika.jpg",
    imageAlt: "Hariono Suwika",
    accent: "gold",
    links: [
      {
        label: "Lumix Creative Studio",
        href: "https://lumixcreativestudio.github.io",
      },
      {
        label: "Animation Portfolio",
        href: "https://t.me/LumixGigs",
      },
    ],
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(2.6rem,4.2vw,3.8rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10rem] top-[-5rem] size-[22rem] rounded-full bg-[#e4f1da]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8rem] right-[-8rem] size-[23rem] rounded-full bg-[#e1edf7]/50 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[49rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.65rem,0.74vw,0.78rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-1.5 rounded-full bg-[#68ad4a]" />
              Core Team
            </span>

            <h2 className="mt-3 max-w-[47rem] text-[clamp(1.75rem,2.9vw,2.8rem)] font-black leading-[1.07] tracking-[-0.04em] text-[#2f2118]">
              The people responsible for delivering Lifetopia World.
            </h2>

            <p className="mt-3 max-w-[46rem] text-[clamp(0.86rem,0.98vw,1rem)] leading-[1.65] text-[#706452]">
              A focused team covering project leadership, Solana integration,
              game development, animation, and audio production.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-[#d4c6a9] bg-[#fffaf0] px-4 py-3">
            <span className="text-[clamp(1.2rem,1.6vw,1.5rem)] font-black text-[#4f7e3a]">
              4
            </span>

            <span className="text-[clamp(0.66rem,0.75vw,0.78rem)] font-black uppercase leading-[1.35] tracking-[0.08em] text-[#776955]">
              Core
              <br />
              Contributors
            </span>
          </div>
        </header>

        <div className="mt-[clamp(1.35rem,2.4vw,1.9rem)] grid items-stretch gap-[clamp(0.7rem,1.2vw,0.95rem)] sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              member={member}
            />
          ))}
        </div>

        <div className="mt-[clamp(0.8rem,1.4vw,1.1rem)] flex flex-col gap-2 rounded-xl border border-[#d8c8a7] bg-[#fffaf0] px-[clamp(0.9rem,1.4vw,1.2rem)] py-[clamp(0.8rem,1.2vw,1rem)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[clamp(0.76rem,0.86vw,0.9rem)] leading-[1.55] text-[#706452]">
            Team membership and responsibility changes will be disclosed in
            public milestone updates.
          </p>

          <span className="w-fit shrink-0 rounded-full border border-[#cfe1c5] bg-[#eef7e9] px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.76rem)] font-black text-[#527d40]">
            Public accountability
          </span>
        </div>
      </div>
    </section>
  );
}