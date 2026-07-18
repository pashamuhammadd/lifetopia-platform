"use client";

import {
  AlertCircle,
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";

import {
  normalizeEmail,
  validateEmail,
} from "@repo/services/auth-validation";

type GuardianConsentPanelProps = {
  nextUrl: string;
};

type GuardianRequestResponse = {
  success?: boolean;
  error?: string;
  expiresAt?: string;
  retryAfterSeconds?: number;
};

export function GuardianConsentPanel({
  nextUrl,
}: GuardianConsentPanelProps) {
  const [guardianEmail, setGuardianEmail] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [emailSent, setEmailSent] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const validation =
      validateEmail(guardianEmail);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setGuardianEmail(
      normalizeEmail(validation.value),
    );
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/guardian/request",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            guardianEmail:
              validation.value,
            next: nextUrl,
          }),
        },
      );

      const payload =
        (await response.json()) as
          GuardianRequestResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to request guardian approval.",
        );
        return;
      }

      setEmailSent(true);
      setMessage(
        "Guardian approval email sent. The link is valid for seven days.",
      );
    } catch {
      setError(
        "Unable to reach the guardian approval service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 rounded-[20px] border border-[#cfe2bd] bg-[#f1f8e9] p-4 text-sm font-semibold leading-6 text-[#53683a]">
        <Mail
          size={19}
          className="mt-0.5 shrink-0"
        />

        A parent or legal guardian must
        review the current Terms and
        Privacy Policy before interactive,
        reward, and wallet features become
        available.
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-black text-[#2f1b12]">
            Parent or Guardian Email
          </span>

          <input
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={guardianEmail}
            disabled={isLoading}
            onChange={(event) => {
              setGuardianEmail(
                event.target.value,
              );
              setError("");
            }}
            placeholder="guardian@email.com"
            className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-sm font-semibold text-[#2f1b12] outline-none transition focus:border-[#4f8124] disabled:opacity-60"
          />

          <span className="text-xs font-semibold leading-5 text-[#8f7458]">
            This must be different from
            the Lifetopia account email.
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="lt-button-primary w-full justify-center disabled:pointer-events-none disabled:opacity-60"
        >
          {isLoading
            ? "Sending..."
            : emailSent
              ? "Send Again"
              : "Send Guardian Request"}
        </button>
      </form>

      {message ? (
        <div className="flex items-start gap-2 rounded-[16px] border border-[#bcd89c] bg-[#edf7e4] px-4 py-3 text-sm font-bold leading-6 text-[#4f8124]">
          <CheckCircle2
            size={17}
            className="mt-0.5 shrink-0"
          />
          {message}
        </div>
      ) : null}

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

      <a
        href={nextUrl}
        className="lt-button-secondary w-full justify-center"
      >
        Continue in Read-Only Mode
      </a>

      <p className="text-center text-xs font-semibold leading-5 text-[#8f7458]">
        Guardian contact details are
        private and used only for approval,
        safety, legal compliance, and
        related support.
      </p>
    </div>
  );
}
