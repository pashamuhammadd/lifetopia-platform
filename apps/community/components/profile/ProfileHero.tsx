import { MapPin, UserPlus } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { publicProfile } from "@/data/profile";
import { roleStyles, titleStyles } from "@/data/identity";

export function ProfileHero() {
  const roleStyle = roleStyles[publicProfile.role as keyof typeof roleStyles];
  const RoleIcon = roleStyle.icon;

  const titleStyle = titleStyles[publicProfile.title as keyof typeof titleStyles];
  const TitleIcon = titleStyle.icon;

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#ead9b8] bg-white/85 shadow-[0_18px_45px_rgba(88,60,28,0.10)]">
      <div className="relative h-44 bg-gradient-to-br from-[#7dd3fc] via-[#dff7ff] to-[#8bc34a] md:h-56">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.85),transparent_32rem)]" />
      </div>

      <div className="relative px-5 pb-6 md:px-6">
        <div className="-mt-16 flex flex-col gap-5 md:-mt-20 md:flex-row md:items-end">
          <Avatar
            initials={publicProfile.displayName.charAt(0)}
            src={publicProfile.avatarSrc}
            alt={publicProfile.displayName}
            size={132}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#2f2418]">
                {publicProfile.displayName}
              </h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${roleStyle.className}`}
              >
                <RoleIcon size={13} />
                {publicProfile.role}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${titleStyle.className}`}
              >
                <TitleIcon size={13} />
                {publicProfile.title}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-bold text-[#7a5635]">
              <span>@{publicProfile.username}</span>

              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                Sunflower Village
              </span>
            </div>

            <p className="mt-4 max-w-2xl font-bold leading-7 text-[#7a5635]">
              {publicProfile.bio}
            </p>
          </div>

          <Button className="rounded-full">
            <UserPlus size={16} className="mr-2" />
            Follow
          </Button>
        </div>
      </div>
    </section>
  );
}