import type {
  Metadata,
} from "next";
import {
  redirect,
} from "next/navigation";

import {
  AccountAccessPanel,
} from "@/components/auth/AccountAccessPanel";
import {
  AuthCard,
} from "@/components/auth/AuthCard";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type AccountAccessPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

type AccountStateRow = {
  account_status: string;
  suspended_until:
    string | null;
  restriction_reason:
    string | null;
};

type RequiredActionRow = {
  next_action: string;
};

export const metadata: Metadata = {
  title: "Account Access",
  description:
    "Complete the required Lifetopia World account access steps.",
  robots: {
    index: false,
    follow: false,
  },
};

function firstRow<T>(
  value: T[] | T | null,
): T | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

function getAccountDestination(
  value: string | string[] | undefined,
): string {
  const rawValue =
    Array.isArray(value)
      ? value[0]
      : value;

  const sanitized =
    sanitizeAuthRedirectValue(
      rawValue,
      "/",
    );

  try {
    const destination = new URL(
      sanitized,
      "https://lifetopiaworld.io",
    );

    if (
      destination.pathname ===
        "/account-access" ||
      destination.pathname ===
        "/guardian-consent"
    ) {
      return "/";
    }
  } catch {
    return "/";
  }

  return sanitized;
}

export default async function AccountAccessPage({
  searchParams,
}: AccountAccessPageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const nextUrl =
    getAccountDestination(
      params.next,
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
        `/account-access?next=${encodeURIComponent(
          nextUrl,
        )}`,
      )}`,
    );
  }

  const [
    accountStateResult,
    requiredActionResult,
    profileResult,
  ] = await Promise.all([
    supabase.rpc(
      "get_my_account_state",
    ),
    supabase.rpc(
      "get_my_required_account_actions",
    ),
    supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single(),
  ]);

  if (
    accountStateResult.error ||
    requiredActionResult.error ||
    profileResult.error ||
    !profileResult.data
  ) {
    throw new Error(
      "Unable to resolve Lifetopia account access.",
    );
  }

  const accountState =
    firstRow<AccountStateRow>(
      accountStateResult.data,
    );

  const requiredAction =
    firstRow<RequiredActionRow>(
      requiredActionResult.data,
    );

  if (
    !accountState ||
    !requiredAction
  ) {
    throw new Error(
      "Lifetopia account access state is unavailable.",
    );
  }

  const nextAction =
    requiredAction.next_action;

  const title =
    nextAction === "ready"
      ? "Your account is ready."
      : nextAction ===
          "accept_legal"
        ? "Review current legal documents."
        : nextAction ===
            "choose_username"
          ? "Choose your permanent username."
          : nextAction ===
              "guardian_consent"
            ? "Guardian approval is required."
            : nextAction ===
                "verify_email"
              ? "Verify your email."
              : "Account access status.";

  return (
    <AuthCard
      badge="Account Access"
      title={title}
      description="Complete the next required step or continue with the access currently available to your account."
    >
      <AccountAccessPanel
        nextAction={
          nextAction as
            | "verify_email"
            | "accept_legal"
            | "choose_username"
            | "guardian_consent"
            | "account_suspended"
            | "account_banned"
            | "account_deleted"
            | "ready"
        }
        nextUrl={nextUrl}
        restrictionReason={
          accountState
            .restriction_reason
        }
        suspendedUntil={
          accountState
            .suspended_until
        }
        currentUsername={
          profileResult.data
            .username
        }
      />
    </AuthCard>
  );
}
