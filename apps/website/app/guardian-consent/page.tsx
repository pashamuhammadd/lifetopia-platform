import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthCard } from "@/components/auth/AuthCard";
import { GuardianConsentPanel } from "@/components/auth/GuardianConsentPanel";
import { createClient } from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type GuardianConsentPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Guardian Approval",
  description:
    "Request parent or guardian approval for a Lifetopia World account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function GuardianConsentPage({
  searchParams,
}: GuardianConsentPageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const rawNext =
    Array.isArray(params.next)
      ? params.next[0]
      : params.next;

  const next =
    sanitizeAuthRedirectValue(
      rawNext,
      "/",
    );

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?next=${encodeURIComponent(
        `/guardian-consent?next=${encodeURIComponent(
          next,
        )}`,
      )}`,
    );
  }

  const { data } = await supabase.rpc(
    "get_my_required_account_actions",
  );

  const accountAction =
    Array.isArray(data)
      ? data[0]
      : data;

  if (
    accountAction &&
    !accountAction
      .requires_guardian_consent
  ) {
    redirect(next);
  }

  return (
    <AuthCard
      badge="Guardian Consent"
      title="Parent or guardian approval."
      description="Users aged 13–17 need verified approval before Lifetopia interactive benefits become available."
    >
      <GuardianConsentPanel
        nextUrl={next}
      />
    </AuthCard>
  );
}
