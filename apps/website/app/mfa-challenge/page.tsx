import type {
  Metadata,
} from "next";
import {
  redirect,
} from "next/navigation";

import {
  AuthCard,
} from "@/components/auth/AuthCard";
import {
  MfaChallengeForm,
} from "@/components/auth/MfaChallengeForm";
import {
  getCurrentMfaSessionState,
} from "@/lib/auth/mfa-session";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type MfaChallengePageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Two-Factor Verification",
  description:
    "Complete Lifetopia World two-factor authentication.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MfaChallengePage({
  searchParams,
}: MfaChallengePageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const rawNext =
    Array.isArray(params.next)
      ? params.next[0]
      : params.next;

  const nextUrl =
    sanitizeAuthRedirectValue(
      rawNext,
      "/",
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
        nextUrl,
      )}`,
    );
  }

  const mfaState =
    await getCurrentMfaSessionState();

  if (!mfaState) {
    throw new Error(
      "Unable to load Lifetopia MFA status.",
    );
  }

  if (
    !mfaState.requiresChallenge
  ) {
    redirect(nextUrl);
  }

  return (
    <AuthCard
      badge="Two-Factor Authentication"
      title="Verify it’s really you."
      description="Your password was accepted. Complete the authenticator challenge to continue."
    >
      <MfaChallengeForm
        factors={
          mfaState.verifiedFactors
        }
        nextUrl={nextUrl}
      />
    </AuthCard>
  );
}
