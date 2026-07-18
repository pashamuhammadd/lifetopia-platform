import type {
  Metadata,
} from "next";

import {
  AuthCard,
} from "@/components/auth/AuthCard";
import {
  RegisterForm,
} from "@/components/auth/RegisterForm";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type RegisterPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your shared Lifetopia World account.",
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
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
      badge="Player Account"
      title="Start your Lifetopia journey."
      description="Create one account for the Lifetopia website, community, dashboard, and connected game experience."
    >
      <RegisterForm
        nextUrl={nextUrl}
      />
    </AuthCard>
  );
}
