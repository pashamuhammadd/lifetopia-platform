import {
  createHash,
} from "node:crypto";

import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/AuthCard";
import { GuardianConsentReview } from "@/components/auth/GuardianConsentReview";
import { createAdminClient } from "@repo/lib/supabase/admin";

type GuardianConsentConfirmPageProps = {
  searchParams?: Promise<{
    token?: string | string[];
  }>;
};

type PreviewRow = {
  valid: boolean;
  guardian_status: string;
  child_display_name: string | null;
  child_username: string | null;
  guardian_email: string | null;
  expires_at: string | null;
  terms_version: string | null;
  privacy_version: string | null;
};

export const metadata: Metadata = {
  title: "Guardian Consent Review",
  description:
    "Review a Lifetopia World guardian approval request.",
  robots: {
    index: false,
    follow: false,
  },
};

function maskEmail(
  email: string,
): string {
  const [localPart, domain] =
    email.split("@");

  if (!localPart || !domain) {
    return email;
  }

  return `${localPart.slice(0, 2)}${"*".repeat(
    Math.max(
      2,
      localPart.length - 2,
    ),
  )}@${domain}`;
}

export default async function GuardianConsentConfirmPage({
  searchParams,
}: GuardianConsentConfirmPageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const token =
    Array.isArray(params.token)
      ? params.token[0]
      : params.token;

  let preview: PreviewRow | null =
    null;

  if (token && token.length >= 32) {
    const tokenHash =
      createHash("sha256")
        .update(token)
        .digest("hex");

    const admin =
      createAdminClient();

    const { data } = await admin.rpc(
      "preview_lifetopia_guardian_consent",
      {
        p_token_hash: tokenHash,
      },
    );

    preview =
      Array.isArray(data)
        ? data[0] ?? null
        : data;
  }

  const valid =
    Boolean(
      token &&
      preview?.valid &&
      preview.child_display_name &&
      preview.child_username &&
      preview.guardian_email &&
      preview.expires_at &&
      preview.terms_version &&
      preview.privacy_version,
    );

  return (
    <AuthCard
      badge="Guardian Consent"
      title={
        valid
          ? "Review this request."
          : "Guardian link unavailable."
      }
      description={
        valid
          ? "Confirm whether this Lifetopia World account may use interactive features."
          : "This link may be invalid, expired, declined, approved, or replaced by a newer request."
      }
    >
      {valid &&
      token &&
      preview?.child_display_name &&
      preview.child_username &&
      preview.guardian_email &&
      preview.expires_at &&
      preview.terms_version &&
      preview.privacy_version ? (
        <GuardianConsentReview
          token={token}
          childDisplayName={
            preview.child_display_name
          }
          childUsername={
            preview.child_username
          }
          guardianEmailMasked={
            maskEmail(
              preview.guardian_email,
            )
          }
          expiresAt={
            preview.expires_at
          }
          termsVersion={
            preview.terms_version
          }
          privacyVersion={
            preview.privacy_version
          }
        />
      ) : (
        <p className="rounded-[18px] border border-red-300 bg-red-50 p-4 text-center text-sm font-bold leading-6 text-red-700">
          Ask the account holder to send
          a new guardian approval email.
        </p>
      )}
    </AuthCard>
  );
}
