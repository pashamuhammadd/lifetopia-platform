"use client";

import {
  AlertCircle,
  CheckCircle2,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  normalizeEmail,
  validateEmail,
} from "@repo/services/auth-validation";

type ForgotPasswordFormProps = {
  nextUrl: string;
};

type RequestResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  retryAfterSeconds?: number;
};

export function ForgotPasswordForm({
  nextUrl,
}: ForgotPasswordFormProps) {
  const [email, setEmail] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [
    retryAfterSeconds,
    setRetryAfterSeconds,
  ] = useState(0);

  useEffect(() => {
    if (
      retryAfterSeconds <= 0
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setRetryAfterSeconds(
          (current) =>
            Math.max(
              0,
              current - 1,
            ),
        );
      }, 1_000);

    return () =>
      window.clearInterval(interval);
  }, [retryAfterSeconds]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const validation =
      validateEmail(email);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    if (
      retryAfterSeconds > 0
    ) {
      return;
    }

    setEmail(
      normalizeEmail(
        validation.value,
      ),
    );
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/password-reset/request",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            email:
              validation.value,
            next:
              nextUrl,
          }),
        },
      );

      const payload =
        (await response.json()) as
          RequestResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to request a password reset.",
        );
        return;
      }

      setMessage(
        payload.message ??
          "If an account exists, a password reset message has been requested.",
      );

      setRetryAfterSeconds(
        Math.max(
          1,
          payload.retryAfterSeconds ??
            180,
        ),
      );
    } catch {
      setError(
        "Unable to reach the password reset service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const loginHref =
    nextUrl === "/"
      ? "/login"
      : `/login?next=${encodeURIComponent(
          nextUrl,
        )}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex items-start gap-3 rounded-[18px] border border-[#cfe2bd] bg-[#f1f8e9] p-4 text-sm font-semibold leading-6 text-[#53683a]">
        <Mail
          size={19}
          className="mt-0.5 shrink-0"
        />

        Enter the email connected to your
        Lifetopia account. The reset link
        is valid for 30 minutes.
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-black text-[#2f1b12]">
          Account Email
        </span>

        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          disabled={isLoading}
          onChange={(event) => {
            setEmail(
              event.target.value,
            );
            setError("");
            setMessage("");
          }}
          placeholder="player@email.com"
          className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-sm font-semibold text-[#2f1b12] outline-none transition focus:border-[#4f8124] disabled:opacity-60"
        />
      </label>

      <button
        type="submit"
        disabled={
          isLoading ||
          retryAfterSeconds > 0
        }
        className="lt-button-primary w-full justify-center disabled:pointer-events-none disabled:opacity-60"
      >
        {isLoading
          ? "Requesting..."
          : retryAfterSeconds > 0
            ? `Request again in ${retryAfterSeconds}s`
            : "Send Reset Link"}
      </button>

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

      <Link
        href={loginHref}
        className="lt-button-secondary w-full justify-center"
      >
        Back to Login
      </Link>

      <p className="text-center text-xs font-semibold leading-5 text-[#8f7458]">
        For privacy, Lifetopia shows the
        same confirmation whether or not
        an account exists.
      </p>
    </form>
  );
}
