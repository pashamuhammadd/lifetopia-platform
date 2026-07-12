import Link from "next/link";

export type TeamMemberCardData = {
  name: string;
  role: string;
  description: string;
  responsibilities: string[];
  initials: string;
  profileUrl?: string;
  accent: "green" | "blue" | "gold" | "purple";
};

type TeamMemberCardProps = {
  member: TeamMemberCardData;
};

function getAccentClasses(accent: TeamMemberCardData["accent"]) {
  if (accent === "blue") {
    return {
      card: "border-[#73afd1]/25 bg-[#f2f9fd]",
      avatar: "border-[#5da5cf]/20 bg-[#e4f4fc] text-[#347ba5]",
      role: "text-[#347ba5]",
      dot: "bg-[#4f9fc9]",
      chip: "border-[#cce4f2] bg-[#edf7fd] text-[#477c99]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/30 bg-[#fffaf0]",
      avatar: "border-[#d7aa48]/20 bg-[#fff0ca] text-[#9c731c]",
      role: "text-[#946b1b]",
      dot: "bg-[#dda438]",
      chip: "border-[#ead7a8] bg-[#fff6df] text-[#8f6d25]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/25 bg-[#f8f5ff]",
      avatar: "border-[#9178d5]/20 bg-[#eee9ff] text-[#6c4fb2]",
      role: "text-[#674aab]",
      dot: "bg-[#8c72d6]",
      chip: "border-[#dbd2f2] bg-[#f3efff] text-[#6d5a9c]",
    };
  }

  return {
    card: "border-[#79ad62]/25 bg-[#f4faf0]",
    avatar: "border-[#6da954]/20 bg-[#e7f4dd] text-[#4e8039]",
    role: "text-[#477a34]",
    dot: "bg-[#67aa4b]",
    chip: "border-[#d4e5ca] bg-[#edf7e6] text-[#557b45]",
  };
}

function TeamMemberContent({
  member,
}: {
  member: TeamMemberCardData;
}) {
  const accent = getAccentClasses(member.accent);

  return (
    <article
      className={`group relative min-w-0 overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border p-[clamp(1rem,1.7vw,1.35rem)] shadow-[0_0.9rem_2.8rem_rgba(63,47,27,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.3rem_3.5rem_rgba(63,47,27,0.1)] ${accent.card}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-white/45 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`flex size-[clamp(3.2rem,5vw,4.2rem)] shrink-0 items-center justify-center rounded-[clamp(0.8rem,1.3vw,1rem)] border text-[clamp(1rem,1.5vw,1.3rem)] font-black ${accent.avatar}`}
          >
            {member.initials}
          </span>

          <span
            className={`mt-2 size-[clamp(0.6rem,0.9vw,0.75rem)] shrink-0 rounded-full ${accent.dot}`}
          />
        </div>

        <div className="mt-[clamp(0.8rem,1.3vw,1rem)]">
          <h3 className="text-[clamp(1.15rem,1.5vw,1.45rem)] font-black leading-[1.2] tracking-[-0.025em] text-[#2f2118]">
            {member.name}
          </h3>

          <p
            className={`mt-2 text-[clamp(0.78rem,0.9vw,0.96rem)] font-black uppercase tracking-[0.08em] ${accent.role}`}
          >
            {member.role}
          </p>

          <p className="mt-3 text-[clamp(0.86rem,0.98vw,1.04rem)] leading-[1.65] text-[#6f6554]">
            {member.description}
          </p>
        </div>

        <div className="mt-[clamp(0.9rem,1.4vw,1.1rem)]">
          <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.09em] text-[#7d6f5b]">
            Key Responsibilities
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {member.responsibilities.map((responsibility) => (
              <span
                key={responsibility}
                className={`rounded-full border px-3 py-1.5 text-[clamp(0.7rem,0.8vw,0.86rem)] font-bold ${accent.chip}`}
              >
                {responsibility}
              </span>
            ))}
          </div>
        </div>

        {member.profileUrl ? (
          <div className="mt-[clamp(1rem,1.5vw,1.2rem)] border-t border-[#695a40]/10 pt-[clamp(0.75rem,1.2vw,0.95rem)]">
            <span className="inline-flex items-center gap-2 text-[clamp(0.78rem,0.9vw,0.96rem)] font-black text-[#4e7d3a] transition group-hover:translate-x-1">
              View Profile
              <span aria-hidden="true">↗</span>
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function TeamMemberCard({
  member,
}: TeamMemberCardProps) {
  if (!member.profileUrl) {
    return <TeamMemberContent member={member} />;
  }

  return (
    <Link
      href={member.profileUrl}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <TeamMemberContent member={member} />
    </Link>
  );
}