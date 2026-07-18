import type {
  Metadata,
} from "next";

import {
  AuthCard,
} from "@/components/auth/AuthCard";
import {
  ForgotPasswordForm,
} from "@/components/auth/ForgotPasswordForm";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type ForgotPasswordPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Request a Lifetopia World password reset link.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
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

  return (
    <AuthCard
      badge="Account Recovery"
      title="Reset your password."
      description="Request a secure one-time password reset link for your Lifetopia World account."
    >
      <ForgotPasswordForm
        nextUrl={nextUrl}
      />
    </AuthCard>
  );
}
