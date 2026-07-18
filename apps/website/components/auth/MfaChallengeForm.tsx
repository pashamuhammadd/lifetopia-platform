"use client";

import {
  AlertCircle,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  useRouter,
} from "next/navigation";

import type {
  LifetopiaMfaFactor,
} from "@/lib/auth/mfa-factors";
import {
  isAbsoluteAuthRedirect,
} from "@repo/lib/auth-redirect";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type MfaChallengeFormProps = {
  factors:
    LifetopiaMfaFactor[];
  nextUrl: string;
};

type ChallengeResponse = {
  success?: boolean;
  error?: string;
  next?: string;
  nextAction?:
    string | null;
  restricted?: boolean;
  status?: string;
  restrictionReason?:
    string | null;
  suspendedUntil?:
    string | null;
};

export function MfaChallengeForm({
  factors,
  nextUrl,
}: MfaChallengeFormProps) {
  const router = useRouter();

  const verifiedFactors =
    useMemo(
      () =>
        factors.filter(
          (factor) =>
            factor.status ===
            "verified",
        ),
      [factors],
    );

  const [
    factorId,
    setFactorId,
  ] = useState(
    verifiedFactors[0]?.id ??
      "",
  );

  const [code, setCode] =
    useState("");

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  function continueToDestination(
    destination: string,
  ) {
    if (
      isAbsoluteAuthRedirect(
        destination,
      )
    ) {
      window.location.assign(
        destination,
      );
      return;
    }

    router.replace(destination);
    router.refresh();
  }

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (
      !factorId ||
      !/^\d{6}$/.test(code)
    ) {
      setError(
        "Enter the six-digit code from your authenticator app.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/mfa/challenge",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            factorId,
            code,
            next: nextUrl,
          }),
        },
      );

      const payload =
        (await response
          .json()
          .catch(() => ({}))) as
          ChallengeResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setCode("");
        setError(
          payload.error ??
            "Multi-factor verification failed.",
        );
        return;
      }

      const destination =
        sanitizeAuthRedirectValue(
          payload.next,
          nextUrl,
        );

      if (
        payload.nextAction &&
        payload.nextAction !==
          "ready"
      ) {
        router.replace(
          `/account-access?next=${encodeURIComponent(
            destination,
          )}`,
        );
        router.refresh();
        return;
      }

      continueToDestination(
        destination,
      );
    } catch {
      setCode("");
      setError(
        "Unable to reach the MFA verification service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (
    verifiedFactors.length === 0
  ) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="rounded-[18px] border border-red-300 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
          No verified authenticator is
          available for this account.
        </p>

        <Link
          href="/mfa-recovery"
          className="lt-button-primary w-full justify-center"
        >
          Open MFA Recovery
        </Link>

        <Link
          href="/login"
          className="lt-button-secondary w-full justify-center"
        >
          Back to Login
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

        Open your authenticator app and
        enter the current six-digit code.
      </div>

      {verifiedFactors.length > 1 ? (
        <label className="flex flex-col gap-2">
          <span className="text-sm font-black text-[#2f1b12]">
            Authenticator
          </span>

          <select
            value={factorId}
            disabled={isLoading}
            onChange={(event) => {
              setFactorId(
                event.target.value,
              );
              setCode("");
              setError("");
            }}
            className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-sm font-semibold text-[#2f1b12] outline-none transition focus:border-[#4f8124]"
          >
            {verifiedFactors.map(
              (factor) => (
                <option
                  key={factor.id}
                  value={factor.id}
                >
                  {factor.friendlyName}
                </option>
              ),
            )}
          </select>
        </label>
      ) : null}

      <label className="flex flex-col gap-2">
        <span className="text-sm font-black text-[#2f1b12]">
          Authentication Code
        </span>

        <div className="relative">
          <KeyRound
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8f7458]"
          />

          <input
            type="text"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            disabled={isLoading}
            onChange={(event) => {
              setCode(
                event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6),
              );
              setError("");
            }}
            placeholder="000000"
            className="w-full rounded-[18px] border border-[#d9c99f] bg-white py-3 pl-11 pr-4 text-center text-lg font-black tracking-[0.32em] text-[#2f1b12] outline-none transition focus:border-[#4f8124] disabled:opacity-60"
          />
        </div>
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

      <button
        type="submit"
        disabled={
          isLoading ||
          code.length !== 6
        }
        className="lt-button-primary w-full justify-center disabled:pointer-events-none disabled:opacity-60"
      >
        {isLoading
          ? "Verifying..."
          : "Verify and Continue"}
      </button>

      <Link
        href="/mfa-recovery"
        className="text-center text-sm font-black text-[#4f8124] underline underline-offset-4"
      >
        Lost access to your authenticator?
      </Link>
    </form>
  );
}
