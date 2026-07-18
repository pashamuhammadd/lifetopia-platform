"use client";

import {
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import {
  PasswordField,
} from "@/components/auth/PasswordField";
import {
  assessPassword,
} from "@repo/services/auth-validation";

type ResetPasswordFormProps = {
  token: string;
  linkValid: boolean;
  nextUrl: string;
};

type CompleteResponse = {
  success?: boolean;
  error?: string;
  next?: string;
};

function Requirement({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) {
  return (
    <li
      className={`text-xs font-bold ${
        met
          ? "text-[#4f8124]"
          : "text-[#8f7458]"
      }`}
    >
      {met ? "✓" : "○"} {label}
    </li>
  );
}

export function ResetPasswordForm({
  token,
  linkValid,
  nextUrl,
}: ResetPasswordFormProps) {
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [completed, setCompleted] =
    useState(false);

  const assessment =
    useMemo(
      () => assessPassword(password),
      [password],
    );

  const loginHref =
    nextUrl === "/"
      ? "/login"
      : `/login?next=${encodeURIComponent(
          nextUrl,
        )}`;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      password !== confirmPassword
    ) {
      setError(
        "Password confirmation does not match.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/password-reset/complete",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            token,
            password,
            confirmPassword,
          }),
        },
      );

      const payload =
        (await response.json()) as
          CompleteResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to reset the password.",
        );
        return;
      }

      setPassword("");
      setConfirmPassword("");
      setCompleted(true);
      setMessage(
        "Your Lifetopia password has been updated.",
      );
    } catch {
      setError(
        "Unable to reach the password reset service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!linkValid) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <div className="rounded-[18px] border border-red-300 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
          This password reset link is
          invalid, expired, already used,
          or replaced by a newer request.
        </div>

        <Link
          href={`/forgot-password?next=${encodeURIComponent(
            nextUrl,
          )}`}
          className="lt-button-primary w-full justify-center"
        >
          Request a New Link
        </Link>

        <Link
          href={loginHref}
          className="lt-button-secondary w-full justify-center"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-[#bcd89c] bg-[#edf7e4] text-[#4f8124]">
          <CheckCircle2 size={30} />
        </span>

        <h2 className="text-2xl font-black text-[#2f1b12]">
          Password updated.
        </h2>

        <p className="text-sm font-semibold leading-7 text-[#76583a]">
          Login again using your new
          password.
        </p>

        <Link
          href={loginHref}
          className="lt-button-primary w-full justify-center"
        >
          Continue to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex items-start gap-3 rounded-[18px] border border-[#cfe2bd] bg-[#f1f8e9] p-4 text-sm font-semibold leading-6 text-[#53683a]">
        <ShieldCheck
          size={19}
          className="mt-0.5 shrink-0"
        />

        Create a new password that is
        different from your username and
        account email.
      </div>

      <PasswordField
        id="reset-password"
        label="New Password"
        value={password}
        placeholder="Create a strong password"
        autoComplete="new-password"
        disabled={isLoading}
        onChange={(value) => {
          setPassword(value);
          setError("");
        }}
      />

      {password ? (
        <ul className="grid gap-2 rounded-[18px] border border-[#e0d1b7] bg-[#fffaf1] p-4 sm:grid-cols-2">
          <Requirement
            met={
              assessment.requirements
                .hasMinimumLength
            }
            label="8–72 characters"
          />
          <Requirement
            met={
              assessment.requirements
                .hasUppercase
            }
            label="Uppercase letter"
          />
          <Requirement
            met={
              assessment.requirements
                .hasLowercase
            }
            label="Lowercase letter"
          />
          <Requirement
            met={
              assessment.requirements
                .hasNumber
            }
            label="Number"
          />
          <Requirement
            met={
              assessment.requirements
                .hasSymbol
            }
            label="Symbol"
          />
        </ul>
      ) : null}

      <PasswordField
        id="reset-confirm-password"
        label="Confirm New Password"
        value={confirmPassword}
        placeholder="Repeat your new password"
        autoComplete="new-password"
        disabled={isLoading}
        onChange={(value) => {
          setConfirmPassword(value);
          setError("");
        }}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="lt-button-primary w-full justify-center disabled:opacity-60"
      >
        {isLoading
          ? "Updating..."
          : "Update Password"}
      </button>

      {message ? (
        <p className="rounded-[16px] border border-[#bcd89c] bg-[#edf7e4] px-4 py-3 text-sm font-bold text-[#4f8124]">
          {message}
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-[16px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700"
        >
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />
          {error}
        </p>
      ) : null}
    </form>
  );
}
