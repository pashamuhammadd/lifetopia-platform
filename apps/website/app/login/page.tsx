import type {
  Metadata,
} from "next";

import {
  AuthCard,
} from "@/components/auth/AuthCard";
import {
  LoginForm,
} from "@/components/auth/LoginForm";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to your Lifetopia World account.",
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
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
      badge="Player Login"
      title="Welcome back, Lifetopian."
      description="Login with your username or email to continue across the Lifetopia World ecosystem."
    >
      <LoginForm
        nextUrl={nextUrl}
      />
    </AuthCard>
  );
}
