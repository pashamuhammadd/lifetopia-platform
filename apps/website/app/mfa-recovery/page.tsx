import type {
  Metadata,
} from "next";
import {
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import {
  AuthCard,
} from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "MFA Recovery",
  description:
    "Recovery guidance for Lifetopia World two-factor authentication.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MfaRecoveryPage() {
  return (
    <AuthCard
      badge="MFA Recovery"
      title="Recover authenticator access."
      description="Use a backup factor first. Support recovery is used only when every authenticator is unavailable."
    >
      <div className="flex flex-col gap-4">
        <section className="flex items-start gap-3 rounded-[18px] border border-[#cfe2bd] bg-[#f1f8e9] p-4 text-sm font-semibold leading-6 text-[#53683a]">
          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-black">
              Try a backup authenticator
            </p>

            <p className="mt-1">
              Return to the MFA screen
              and choose another verified
              authenticator from the
              selector.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-[18px] border border-[#c9d9ef] bg-[#f4f7ff] p-4 text-sm font-semibold leading-6 text-[#42649d]">
          <KeyRound
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-black">
              Password reset does not
              remove MFA
            </p>

            <p className="mt-1">
              Changing the account
              password protects the first
              factor, but an enrolled
              authenticator is still
              required afterward.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-[18px] border border-amber-300 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
          <Mail
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-black">
              Every factor lost
            </p>

            <p className="mt-1">
              Contact Lifetopia from the
              email registered to the
              account. Support will not
              remove MFA based only on a
              username, wallet address,
              or social message.
            </p>

            <a
              href="mailto:contact@lifetopiaworld.io?subject=Lifetopia%20MFA%20Recovery"
              className="mt-3 inline-block font-black text-[#4f8124] underline underline-offset-4"
            >
              contact@lifetopiaworld.io
            </a>
          </div>
        </section>

        <Link
          href="/mfa-challenge"
          className="lt-button-primary w-full justify-center"
        >
          Return to MFA Verification
        </Link>

        <Link
          href="/login"
          className="lt-button-secondary w-full justify-center"
        >
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}
