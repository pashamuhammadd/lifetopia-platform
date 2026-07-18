"use client";

import {
  AlertCircle,
  ArrowLeft,
  MailCheck,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

import {
  PENDING_EMAIL_VERIFICATION_KEY,
  type PendingEmailVerification,
} from "@/lib/auth/pending-verification";
import {
  normalizeEmail,
  validateEmail,
} from "@repo/services/auth-validation";

type ResendResponse = {
  success?: boolean;
  error?: string;
  message?: string;
  retryAfterSeconds?: number;
};

function maskEmail(
  email: string,
): string {
  const [localPart, domain] =
    email.split("@");

  if (!localPart || !domain) {
    return email;
  }

  const visible =
    localPart.slice(0, 2);

  const hiddenLength =
    Math.max(
      2,
      localPart.length -
        visible.length,
    );

  return `${visible}${"*".repeat(hiddenLength)}@${domain}`;
}

function readPendingVerification():
  PendingEmailVerification | null {
  try {
    const raw =
      window.sessionStorage.getItem(
        PENDING_EMAIL_VERIFICATION_KEY,
      );

    if (!raw) {
      return null;
    }

    const parsed =
      JSON.parse(raw) as
        PendingEmailVerification;

    if (
      !parsed.email ||
      !parsed.next
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function CheckEmailPanel() {
  const [
    pendingVerification,
    setPendingVerification,
  ] = useState<
    PendingEmailVerification | null
  >(null);

  const [manualEmail, setManualEmail] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [
    secondsRemaining,
    setSecondsRemaining,
  ] = useState(0);

  useEffect(() => {
    const stored =
      readPendingVerification();

    setPendingVerification(stored);

    if (stored) {
      setManualEmail(stored.email);
    }
  }, []);

  useEffect(() => {
    function updateCountdown() {
      const availableAt =
        pendingVerification
          ?.resendAvailableAt ?? 0;

      setSecondsRemaining(
        Math.max(
          0,
          Math.ceil(
            (
              availableAt -
              Date.now()
            ) / 1000,
          ),
        ),
      );
    }

    updateCountdown();

    const interval =
      window.setInterval(
        updateCountdown,
        1000,
      );

    return () =>
      window.clearInterval(interval);
  }, [pendingVerification]);

  const normalizedEmail =
    useMemo(
      () => normalizeEmail(manualEmail),
      [manualEmail],
    );

  const loginHref =
    pendingVerification?.next &&
    pendingVerification.next !== "/"
      ? `/login?next=${encodeURIComponent(
          pendingVerification.next,
        )}`
      : "/login";

  async function handleResend(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    const validation =
      validateEmail(normalizedEmail);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    if (secondsRemaining > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            email: validation.value,
            next:
              pendingVerification
                ?.next ?? "/",
          }),
        },
      );

      const payload =
        (await response.json()) as
          ResendResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to request a verification email.",
        );
        return;
      }

      const retryAfterSeconds =
        payload.retryAfterSeconds ??
        180;

      const nextPending:
        PendingEmailVerification = {
          email: validation.value,
          next:
            pendingVerification
              ?.next ?? "/",
          guardianConsentRequired:
            pendingVerification
              ?.guardianConsentRequired ??
            false,
          verificationEmailSent:
            true,
          createdAt:
            pendingVerification
              ?.createdAt ??
            Date.now(),
          resendAvailableAt:
            Date.now() +
            retryAfterSeconds * 1000,
        };

      window.sessionStorage.setItem(
        PENDING_EMAIL_VERIFICATION_KEY,
        JSON.stringify(nextPending),
      );

      setPendingVerification(
        nextPending,
      );
      setMessage(
        payload.message ??
          "Verification email requested.",
      );
    } catch {
      setError(
        "Unable to reach the verification service. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full border border-[#bcd89c] bg-[#edf7e4] text-[#4f8124] shadow-[0_14px_32px_rgba(79,129,36,0.15)]">
        <MailCheck size={30} />
      </span>

      <div>
        <h2 className="text-[clamp(1.35rem,3vw,2rem)] font-black text-[#2f1b12]">
          Check your email
        </h2>

        <p className="mx-auto mt-2 max-w-md text-[clamp(0.78rem,1vw,0.94rem)] font-semibold leading-7 text-[#76583a]">
          Open the verification link
          sent to{" "}
          <strong className="text-[#2f1b12]">
            {pendingVerification
              ? maskEmail(
                  pendingVerification.email,
                )
              : "your email address"}
          </strong>
          . The link confirms your email
          and returns you to Lifetopia.
        </p>
      </div>

      {pendingVerification &&
      !pendingVerification
        .verificationEmailSent ? (
        <div className="flex items-start gap-3 rounded-[18px] border border-amber-300 bg-amber-50 p-4 text-left text-sm font-semibold leading-6 text-amber-900">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />
          The account was created, but
          email delivery could not be
          confirmed. Use Resend below or
          contact
          contact@lifetopiaworld.io.
        </div>
      ) : null}

      {pendingVerification
        ?.guardianConsentRequired ? (
        <div className="rounded-[18px] border border-[#d9c99f] bg-[#fff8e8] p-4 text-left text-sm font-semibold leading-6 text-[#76583a]">
          Parent or guardian approval
          will be required after email
          verification because the
          account holder is aged 13–17.
        </div>
      ) : null}

      <form
        onSubmit={handleResend}
        className="flex flex-col gap-3"
      >
        {!pendingVerification ? (
          <label className="flex flex-col gap-2 text-left">
            <span className="text-sm font-black text-[#2f1b12]">
              Account email
            </span>

            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={manualEmail}
              onChange={(event) => {
                setManualEmail(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="player@email.com"
              className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-sm font-semibold text-[#2f1b12] outline-none transition focus:border-[#4f8124]"
            />
          </label>
        ) : null}

        <button
          type="submit"
          disabled={
            isLoading ||
            secondsRemaining > 0
          }
          className="lt-button-primary w-full justify-center disabled:pointer-events-none disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={
              isLoading
                ? "animate-spin"
                : ""
            }
          />

          {isLoading
            ? "Requesting..."
            : secondsRemaining > 0
              ? `Resend in ${secondsRemaining}s`
              : "Resend verification email"}
        </button>
      </form>

      {message ? (
        <p
          aria-live="polite"
          className="rounded-[16px] border border-[#bcd89c] bg-[#edf7e4] px-4 py-3 text-sm font-bold leading-6 text-[#4f8124]"
        >
          {message}
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="rounded-[16px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/register"
          className="lt-button-secondary justify-center"
        >
          <ArrowLeft size={17} />
          Back to Register
        </Link>

        <Link
          href={loginHref}
          className="lt-button-secondary justify-center"
        >
          Go to Login
        </Link>
      </div>

      <p className="text-xs font-semibold leading-5 text-[#8f7458]">
        Didn&apos;t receive it? Check
        Spam or Promotions, confirm the
        address is correct, then use
        Resend after the cooldown.
      </p>
    </div>
  );
}
