import {
  KeyRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import {
  logout,
} from "@/app/actions/auth";
import {
  SectionCard,
} from "@/components/ui/SectionCard";

export function LogoutSection() {
  const development =
    process.env.NODE_ENV !==
    "production";

  const websiteOrigin =
    development
      ? "http://localhost:3000"
      : "https://lifetopiaworld.io";

  const communitySettingsUrl =
    development
      ? "http://localhost:3001/settings"
      : "https://community.lifetopiaworld.io/settings";

  const sessionManagementUrl =
    `${websiteOrigin}/account/sessions?next=${encodeURIComponent(
      communitySettingsUrl,
    )}`;

  const mfaManagementUrl =
    `${websiteOrigin}/account/security/mfa?next=${encodeURIComponent(
      communitySettingsUrl,
    )}`;

  return (
    <SectionCard
      title="Account"
      description="Manage active devices or sign out this device."
      icon={LogOut}
    >
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={sessionManagementUrl}
          className="inline-flex items-center gap-2 rounded-full border border-[#cfe2bd] bg-[#f1f8e9] px-5 py-2.5 text-sm font-black text-[#4f8124] transition hover:bg-[#e7f4dc]"
        >
          <ShieldCheck size={17} />
          Manage Active Sessions
        </a>

        <a
          href={mfaManagementUrl}
          className="inline-flex items-center gap-2 rounded-full border border-[#c9d9ef] bg-[#f4f7ff] px-5 py-2.5 text-sm font-black text-[#42649d] transition hover:bg-[#eaf0ff]"
        >
          <KeyRound size={17} />
          Two-Factor Authentication
        </a>

        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[#fff0f0] px-5 py-2.5 text-sm font-black text-[#c24141] transition hover:bg-[#ffe3e3]"
          >
            <LogOut size={17} />
            Logout This Device
          </button>
        </form>
      </div>
    </SectionCard>
  );
}
