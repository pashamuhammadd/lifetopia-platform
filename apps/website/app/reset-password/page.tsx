import {
  createHash,
} from "node:crypto";

import type {
  Metadata,
} from "next";

import {
  AuthCard,
} from "@/components/auth/AuthCard";
import {
  ResetPasswordForm,
} from "@/components/auth/ResetPasswordForm";
import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type ResetPasswordPageProps = {
  searchParams?: Promise<{
    token?: string | string[];
  }>;
};

type PreviewRow = {
  valid: boolean;
  return_path: string | null;
};

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Create a new password for your Lifetopia World account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const token =
    Array.isArray(params.token)
      ? params.token[0]
      : params.token;

  let linkValid = false;
  let nextUrl = "/";

  if (
    token &&
    token.length >= 32
  ) {
    const tokenHash =
      createHash("sha256")
        .update(token)
        .digest("hex");

    const admin =
      createAdminClient();

    const { data } =
      await admin.rpc(
        "preview_lifetopia_password_reset",
        {
          p_token_hash:
            tokenHash,
        },
      );

    const preview =
      Array.isArray(data)
        ? (
            data[0] as
              | PreviewRow
              | undefined
          )
        : (
            data as
              | PreviewRow
              | null
          );

    linkValid =
      Boolean(preview?.valid);

    nextUrl =
      sanitizeAuthRedirectValue(
        preview?.return_path,
        "/",
      );
  }

  return (
    <AuthCard
      badge="Account Recovery"
      title={
        linkValid
          ? "Create a new password."
          : "Reset link unavailable."
      }
      description={
        linkValid
          ? "This one-time link expires 30 minutes after it was requested."
          : "Request a new Lifetopia World password reset link."
      }
    >
      <ResetPasswordForm
        token={token ?? ""}
        linkValid={linkValid}
        nextUrl={nextUrl}
      />
    </AuthCard>
  );
}
