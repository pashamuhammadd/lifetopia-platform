"use client";

import {
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  useState,
} from "react";

type GuardianConsentReviewProps = {
  token: string;
  childDisplayName: string;
  childUsername: string;
  guardianEmailMasked: string;
  expiresAt: string;
  termsVersion: string;
  privacyVersion: string;
};

type ResponsePayload = {
  success?: boolean;
  status?: string;
  error?: string;
};

export function GuardianConsentReview({
  token,
  childDisplayName,
  childUsername,
  guardianEmailMasked,
  expiresAt,
  termsVersion,
  privacyVersion,
}: GuardianConsentReviewProps) {
  const [termsAccepted, setTermsAccepted] =
    useState(false);
  const [
    privacyAccepted,
    setPrivacyAccepted,
  ] = useState(false);
  const [isLoading, setIsLoading] =
    useState(false);
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");
  const [completedStatus, setCompletedStatus] =
    useState("");

  async function respond(
    decision:
      | "approved"
      | "rejected",
  ) {
    setMessage("");
    setError("");

    if (
      decision === "approved" &&
      (
        !termsAccepted ||
        !privacyAccepted
      )
    ) {
      setError(
        "Review and accept both legal documents before approving.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/guardian/respond",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            token,
            decision,
            termsAccepted,
            privacyAccepted,
          }),
        },
      );

      const payload =
        (await response.json()) as
          ResponsePayload;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to process this guardian response.",
        );
        return;
      }

      setCompletedStatus(
        payload.status ?? decision,
      );

      setMessage(
        decision === "approved"
          ? "Guardian approval completed. The Lifetopia account can continue after any remaining account requirements are completed."
          : "The guardian request was declined.",
      );
    } catch {
      setError(
        "Unable to reach the guardian approval service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (completedStatus) {
    const approved =
      completedStatus === "approved";

    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span
          className={`grid size-16 place-items-center rounded-full border ${
            approved
              ? "border-[#bcd89c] bg-[#edf7e4] text-[#4f8124]"
              : "border-red-300 bg-red-50 text-red-600"
          }`}
        >
          {approved ? (
            <CheckCircle2 size={30} />
          ) : (
            <XCircle size={30} />
          )}
        </span>

        <h2 className="text-2xl font-black text-[#2f1b12]">
          {approved
            ? "Approval completed."
            : "Request declined."}
        </h2>

        <p className="text-sm font-semibold leading-7 text-[#76583a]">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[20px] border border-[#d9c99f] bg-[#fff8e8] p-5">
        <p className="text-xs font-black uppercase tracking-[0.1em] text-[#8f7458]">
          Account requesting approval
        </p>

        <p className="mt-2 text-lg font-black text-[#2f1b12]">
          {childDisplayName}
        </p>

        <p className="font-bold text-[#4f8124]">
          @{childUsername}
        </p>

        <p className="mt-3 text-xs font-semibold text-[#76583a]">
          Guardian email:
          {" "}
          {guardianEmailMasked}
        </p>

        <p className="mt-1 text-xs font-semibold text-[#76583a]">
          Link expires:
          {" "}
          {new Date(
            expiresAt,
          ).toUTCString()}
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-[18px] border border-[#cfe2bd] bg-[#f1f8e9] p-4 text-sm font-semibold leading-6 text-[#53683a]">
        <ShieldCheck
          size={18}
          className="mt-0.5 shrink-0"
        />

        Approval allows the account to use
        social, reward, and future wallet
        features after other required
        account steps are completed.
      </div>

      <label className="flex items-start gap-3 rounded-[18px] border border-[#e0d1b7] bg-white/70 p-4 text-sm font-semibold leading-6 text-[#76583a]">
        <input
          type="checkbox"
          checked={termsAccepted}
          disabled={isLoading}
          onChange={(event) =>
            setTermsAccepted(
              event.target.checked,
            )
          }
          className="mt-1 size-4 accent-[#4f8124]"
        />

        <span>
          I reviewed and approve the
          account&apos;s use of the
          {" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noreferrer"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            Terms of Service
          </Link>
          {" "}
          version {termsVersion}.
        </span>
      </label>

      <label className="flex items-start gap-3 rounded-[18px] border border-[#e0d1b7] bg-white/70 p-4 text-sm font-semibold leading-6 text-[#76583a]">
        <input
          type="checkbox"
          checked={privacyAccepted}
          disabled={isLoading}
          onChange={(event) =>
            setPrivacyAccepted(
              event.target.checked,
            )
          }
          className="mt-1 size-4 accent-[#4f8124]"
        />

        <span>
          I reviewed the
          {" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          {" "}
          version {privacyVersion},
          including how guardian contact
          data is used.
        </span>
      </label>

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[16px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700"
        >
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />
          {error}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={() =>
            respond("rejected")
          }
          className="lt-button-secondary justify-center disabled:opacity-60"
        >
          Decline
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() =>
            respond("approved")
          }
          className="lt-button-primary justify-center disabled:opacity-60"
        >
          {isLoading
            ? "Processing..."
            : "Approve Account"}
        </button>
      </div>
    </div>
  );
}
