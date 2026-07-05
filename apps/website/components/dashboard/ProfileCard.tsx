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

export function ProfileCard({ profile, email }: ProfileCardProps) {
  return (
    <div className="rounded-[clamp(1.2rem,3vw,2.2rem)] border border-white/80 bg-white/75 p-[clamp(1rem,2.5vw,2rem)] shadow-[0_24px_80px_rgba(47,27,18,0.1)]">
      <div className="flex items-center gap-[clamp(0.9rem,2vw,1.5rem)]">
        <div className="h-[clamp(4.5rem,10vw,7rem)] w-[clamp(4.5rem,10vw,7rem)] overflow-hidden rounded-[clamp(1rem,2vw,1.6rem)] border border-[#d9c99f] bg-[#fff8e8]">
          <img
            src={`/images/avatars/${profile.avatar_id}.jpg`}
            alt={profile.display_name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-[clamp(1.2rem,2.2vw,2rem)] font-black text-[#2f1b12]">
            {profile.display_name}
          </h2>
          <p className="text-[clamp(0.75rem,1vw,0.95rem)] font-bold text-[#4f8124]">
            @{profile.username}
          </p>
          <p className="mt-1 text-[clamp(0.68rem,0.9vw,0.85rem)] text-[#7a5635]">
            {profile.gender === "male" ? "Male" : "Female"} •{" "}
            {profile.country_name}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(1rem,2vw,1.5rem)] grid grid-cols-2 gap-[clamp(0.6rem,1.5vw,1rem)]">
        <div className="rounded-[clamp(0.8rem,1.8vw,1.2rem)] bg-[#fff8e8] p-[clamp(0.7rem,1.5vw,1rem)]">
          <p className="text-[clamp(0.62rem,0.85vw,0.8rem)] font-bold text-[#7a5635]">
            Email
          </p>
          <p className="mt-1 text-[clamp(0.7rem,0.95vw,0.9rem)] font-semibold text-[#2f1b12]">
            {maskEmail(email)}
          </p>
        </div>

        <div className="rounded-[clamp(0.8rem,1.8vw,1.2rem)] bg-[#fff8e8] p-[clamp(0.7rem,1.5vw,1rem)]">
          <p className="text-[clamp(0.62rem,0.85vw,0.8rem)] font-bold text-[#7a5635]">
            Member Since
          </p>
          <p className="mt-1 text-[clamp(0.7rem,0.95vw,0.9rem)] font-semibold text-[#2f1b12]">
            {new Date(profile.created_at).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}