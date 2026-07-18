import type { Metadata } from "next";
import {
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

import { AuthCard } from "@/components/auth/AuthCard";
import { EmailVerifiedCleanup } from "@/components/auth/EmailVerifiedCleanup";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type EmailVerifiedPageProps = {
  searchParams?: Promise<{
    status?: string | string[];
    next?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Email Verification",
  description:
    "Lifetopia World email verification result.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EmailVerifiedPage({
  searchParams,
}: EmailVerifiedPageProps) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const rawStatus =
    Array.isArray(params.status)
      ? params.status[0]
      : params.status;

  const rawNext =
    Array.isArray(params.next)
      ? params.next[0]
      : params.next;

  const next =
    sanitizeAuthRedirectValue(
      rawNext,
      "/",
    );

  const success =
    rawStatus === "success";

  return (
    <AuthCard
      badge="Email Verification"
      title={
        success
          ? "Your email is verified."
          : "Verification link unavailable."
      }
      description={
        success
          ? "Your Lifetopia account email has been confirmed."
          : "The verification link may be invalid, expired, or already used."
      }
    >
      <EmailVerifiedCleanup />

      <div className="flex flex-col items-center gap-5 text-center">
        <span
          className={`grid size-16 place-items-center rounded-full border ${
            success
              ? "border-[#bcd89c] bg-[#edf7e4] text-[#4f8124]"
              : "border-red-300 bg-red-50 text-red-600"
          }`}
        >
          {success ? (
            <CheckCircle2 size={30} />
          ) : (
            <AlertCircle size={30} />
          )}
        </span>

        <p className="max-w-md text-sm font-semibold leading-7 text-[#76583a]">
          {success
            ? "You can now continue to Lifetopia. Other account requirements, such as legal re-consent, username selection, or guardian approval, may still apply."
            : "Request a new verification message, then use the latest link in your inbox."}
        </p>

        {success ? (
          <a
            href={next}
            className="lt-button-primary w-full justify-center"
          >
            Continue to Lifetopia
          </a>
        ) : (
          <Link
            href="/check-email"
            className="lt-button-primary w-full justify-center"
          >
            Request a New Link
          </Link>
        )}

        <Link
          href="/login"
          className="lt-button-secondary w-full justify-center"
        >
          Go to Login
        </Link>
      </div>
    </AuthCard>
  );
}
