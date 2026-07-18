import type {
  Metadata,
} from "next";
import {
  redirect,
} from "next/navigation";

import {
  SessionManagementPanel,
} from "@/components/auth/SessionManagementPanel";
import {
  mapSessionRows,
} from "@/lib/auth/session-device";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type AccountSessionsPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Active Sessions",
  description:
    "Review and secure devices connected to your Lifetopia World account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountSessionsPage({
  searchParams,
}: AccountSessionsPageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const rawNext =
    Array.isArray(params.next)
      ? params.next[0]
      : params.next;

  const backUrl =
    sanitizeAuthRedirectValue(
      rawNext,
      "/dashboard",
    );

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?next=${encodeURIComponent(
        `/account/sessions?next=${encodeURIComponent(
          backUrl,
        )}`,
      )}`,
    );
  }

  const [
    sessionsResult,
    profileResult,
  ] = await Promise.all([
    supabase.rpc(
      "get_my_lifetopia_sessions",
    ),
    supabase
      .from("profiles")
      .select(
        "username, display_name",
      )
      .eq("id", user.id)
      .single(),
  ]);

  if (sessionsResult.error) {
    throw new Error(
      "Unable to load active Lifetopia sessions.",
    );
  }

  const sessions =
    mapSessionRows(
      sessionsResult.data,
    );

  const displayName =
    profileResult.data
      ?.display_name ??
    "Lifetopian";

  const username =
    profileResult.data
      ?.username ??
    "lifetopian";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7e8] px-[clamp(1rem,5vw,5rem)] py-[clamp(2rem,5vw,4.5rem)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-24 top-16 size-72 rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-32 size-80 rounded-full bg-[#ffd58a]/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col gap-[clamp(1rem,3vw,1.75rem)]">
        <header className="rounded-[28px] border border-[#d9c99f] bg-white/80 p-[clamp(1.15rem,3vw,2rem)] shadow-[0_18px_45px_rgba(95,70,37,0.08)] backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8124]">
            Account Security
          </p>

          <h1 className="mt-2 text-[clamp(1.65rem,4vw,2.8rem)] font-black leading-tight text-[#2f1b12]">
            Manage active sessions.
          </h1>

          <p className="mt-3 max-w-2xl text-[clamp(0.8rem,1.2vw,1rem)] font-semibold leading-7 text-[#76583a]">
            {displayName}{" "}
            <strong className="text-[#4f8124]">
              @{username}
            </strong>
            , review devices connected to
            your shared Lifetopia account
            and sign out anything you do
            not recognize.
          </p>
        </header>

        <SessionManagementPanel
          initialSessions={sessions}
          backUrl={backUrl}
        />
      </div>
    </main>
  );
}
