import Image from "next/image";
import Link from "next/link";
import type { DashboardProfile } from "@repo/types/dashboard";

type ProfileCardProps = {
  profile: DashboardProfile;
  email: string;
};

function maskEmail(email: string) {
  const [name, domain] = email.split("@");

  if (!name || !domain) return email;

  const visible = name.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(name.length - 2, 4))}@${domain}`;
}

function formatGender(gender?: string | null) {
  if (!gender) return "Not set";
  return gender.toLowerCase() === "male" ? "Male" : "Female";
}

export function ProfileCard({ profile, email }: ProfileCardProps) {
  const avatarSrc = profile.avatar_id
    ? `/images/avatars/${profile.avatar_id}.jpg`
    : "/images/avatars/avatar-01.jpg";

  return (
    <section className="relative overflow-hidden rounded-[clamp(22px,3vw,36px)] border border-white/80 bg-gradient-to-br from-[#f5fbdf] via-white to-[#fff3df] p-[clamp(14px,2vw,28px)] shadow-[0_24px_80px_rgba(88,60,28,0.14)]">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-[#8cc84b]/20 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-36 w-36 rounded-tr-full bg-[#ffd58a]/25 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-[clamp(12px,1.8vw,22px)]">
          <Image
            src={avatarSrc}
            alt={profile.display_name || "Lifetopian Avatar"}
            width={116}
            height={116}
            className="h-[clamp(64px,8vw,116px)] w-[clamp(64px,8vw,116px)] rounded-[clamp(18px,2vw,28px)] border border-white/90 bg-white object-cover p-[clamp(4px,0.6vw,8px)] shadow-[0_16px_34px_rgba(88,60,28,0.16)]"
          />

          <div className="min-w-0">
            <p className="text-[clamp(0.58rem,0.8vw,0.85rem)] font-black uppercase tracking-[0.16em] text-[#6fa83a]">
              Player Identity
            </p>

            <h2 className="mt-1 truncate text-[clamp(1.1rem,2.2vw,2.1rem)] font-black leading-tight text-[#2f1b12]">
              {profile.display_name || "Lifetopian"}
            </h2>

            <p className="truncate text-[clamp(0.7rem,0.95vw,0.95rem)] font-bold text-[#4f8124]">
              @{profile.username || "lifetopian"}
            </p>
          </div>
        </div>

        <div className="mt-[clamp(14px,1.8vw,24px)] grid grid-cols-2 gap-[clamp(8px,1.1vw,14px)]">
          <InfoItem label="Country" value={profile.country_name || "Not set"} />
          <InfoItem label="Gender" value={formatGender(profile.gender)} />
          <InfoItem label="Email" value={maskEmail(email)} wide />
          <InfoItem
            label="Member Since"
            value={new Date(profile.created_at).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            wide
          />
        </div>

        <Link
          href="/dashboard/profile"
          className="mt-[clamp(14px,1.8vw,22px)] inline-flex rounded-full bg-[#4f8124] px-[clamp(14px,1.5vw,22px)] py-[clamp(8px,0.85vw,12px)] text-[clamp(0.62rem,0.85vw,0.9rem)] font-black text-white shadow-[0_14px_28px_rgba(79,129,36,0.25)] transition hover:-translate-y-0.5 hover:bg-[#416c1d]"
        >
          Edit Profile Soon
        </Link>
      </div>
    </section>
  );
}

function InfoItem({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-[clamp(13px,1.5vw,22px)] border border-white/80 bg-white/65 p-[clamp(9px,1.1vw,15px)] shadow-sm ${
        wide ? "col-span-2" : ""
      }`}
    >
      <p className="text-[clamp(0.52rem,0.72vw,0.78rem)] font-black text-[#7a5635]">
        {label}
      </p>

      <p className="mt-1 truncate text-[clamp(0.66rem,0.9vw,0.95rem)] font-black text-[#2f1b12]">
        {value}
      </p>
    </div>
  );
}