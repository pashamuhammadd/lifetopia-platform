import { MapPin } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { roleStyles, titleStyles } from "@/data/identity";

export function MyWorldHero() {
  const role = roleStyles["World Creator"];
  const RoleIcon = role.icon;
  const title = titleStyles["Alpha Pioneer"];
  const TitleIcon = title.icon;

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#ead9b8] bg-white/85 shadow-[0_16px_38px_rgba(88,60,28,0.10)]">
      <div className="relative min-h-[300px] bg-gradient-to-br from-[#7dd3fc] via-[#dff7ff] to-[#7dbd42] p-5 md:min-h-[320px] md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.9),transparent_28rem)]" />
        <div className="absolute -bottom-12 -right-10 h-44 w-64 rounded-full bg-[#3f6f22]/25 blur-3xl" />

        <div className="relative flex h-full flex-col justify-end">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <Avatar
              src="/images/avatars/avatar-01.jpg"
              initials="P"
              alt="Pasha"
              size={132}
            />

            <div className="min-w-0">
              <h2 className="text-[clamp(2.1rem,5vw,3.25rem)] font-black leading-none text-white drop-shadow">
                Pasha
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${role.className}`}
                >
                  <RoleIcon size={13} />
                  World Creator
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${title.className}`}
                >
                  <TitleIcon size={13} />
                  Alpha Pioneer
                </span>
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm font-black text-white">
                <MapPin size={15} />
                Sunflower Village
              </p>
            </div>
          </div>

          <div className="mt-5 max-w-[430px] rounded-[22px] bg-white/78 p-4 backdrop-blur">
            <div className="flex items-center justify-between text-xs font-black text-[#7a5635]">
              <span>Level 27</span>
              <span>8,250 / 12,000 XP</span>
            </div>
            <div className="mt-2">
              <Progress value={68} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}