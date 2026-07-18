"use client";

import {
  AlertCircle,
  Ban,
  CheckCircle2,
  ShieldAlert,
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

import {
  PasswordField,
} from "@/components/auth/PasswordField";
import {
  PENDING_EMAIL_VERIFICATION_KEY,
  type PendingEmailVerification,
} from "@/lib/auth/pending-verification";
import {
  isAbsoluteAuthRedirect,
} from "@repo/lib/auth-redirect";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

type LoginFormProps = {
  nextUrl?: string;
};

type AccountStatus =
  | "active"
  | "suspended"
  | "banned";

type LoginResponse = {
  success?: boolean;
  status?: AccountStatus;
  restricted?: boolean;
  restrictionReason?:
    string | null;
  suspendedUntil?:
    string | null;
  next?: string;
  code?: string;
  error?: string;
  email?: string;
  nextAction?: string | null;
};

type RestrictedState = {
  status:
    | "suspended"
    | "banned";
  reason:
    string | null;
  suspendedUntil:
    string | null;
  next:
    string;
};

function normalizeIdentifier(
  value: string,
): string {
  return value.trim().toLowerCase();
}

function formatRestrictionDate(
  value: string | null,
): string | null {
  if (!value) {
    return null;
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

export function LoginForm({
  nextUrl = "/",
}: LoginFormProps) {
  const router = useRouter();

  const redirectTo =
    useMemo(
      () =>
        sanitizeAuthRedirectValue(
          nextUrl,
          "/",
        ),
      [nextUrl],
    );

  const registerHref =
    redirectTo === "/"
      ? "/register"
      : `/register?next=${encodeURIComponent(
          redirectTo,
        )}`;

  const forgotPasswordHref =
    redirectTo === "/"
      ? "/forgot-password"
      : `/forgot-password?next=${encodeURIComponent(
          redirectTo,
        )}`;

  const [
    identifier,
    setIdentifier,
  ] = useState("");
  const [password, setPassword] =
    useState("");
  const [rememberMe, setRememberMe] =
    useState(false);
  const [message, setMessage] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [
    restrictedState,
    setRestrictedState,
  ] =
    useState<RestrictedState | null>(
      null,
    );

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

  async function handleLogin(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedIdentifier =
      normalizeIdentifier(
        identifier,
      );

    if (
      !normalizedIdentifier ||
      !password
    ) {
      setMessage(
        "Username/email and password are required.",
      );
      return;
    }

    setIdentifier(
      normalizedIdentifier,
    );
    setMessage("");
    setRestrictedState(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            identifier:
              normalizedIdentifier,
            password,
            rememberMe,
            next: redirectTo,
          }),
        },
      );

      const result =
        (await response
          .json()
          .catch(() => ({}))) as
          LoginResponse;

      if (
        result.code ===
          "email_verification_required" &&
        result.email
      ) {
        const pendingVerification:
          PendingEmailVerification = {
            email: result.email,
            next:
              sanitizeAuthRedirectValue(
                result.next,
                redirectTo,
              ),
            guardianConsentRequired:
              false,
            verificationEmailSent:
              false,
            createdAt: Date.now(),
            resendAvailableAt:
              Date.now(),
          };

        window.sessionStorage.setItem(
          PENDING_EMAIL_VERIFICATION_KEY,
          JSON.stringify(
            pendingVerification,
          ),
        );

        router.push("/check-email");
        router.refresh();
        return;
      }

      if (
        !response.ok ||
        !result.success
      ) {
        setMessage(
          result.error ??
            "Login failed.",
        );
        return;
      }

      const destination =
        sanitizeAuthRedirectValue(
          result.next,
          redirectTo,
        );

      if (
        result.restricted &&
        (
          result.status ===
            "suspended" ||
          result.status ===
            "banned"
        )
      ) {
        setRestrictedState({
          status: result.status,
          reason:
            result.restrictionReason ??
            null,
          suspendedUntil:
            result.suspendedUntil ??
            null,
          next: destination,
        });
        return;
      }

      if (
        result.nextAction &&
        result.nextAction !==
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
      setMessage(
        "Unable to reach the login service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (restrictedState) {
    const isSuspended =
      restrictedState.status ===
      "suspended";

    const restrictionDate =
      formatRestrictionDate(
        restrictedState
          .suspendedUntil,
      );

    return (
      <div className="flex flex-col gap-[clamp(0.85rem,2vw,1.25rem)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="grid size-16 place-items-center rounded-full border border-amber-300 bg-amber-50 text-amber-700">
            {isSuspended ? (
              <ShieldAlert size={30} />
            ) : (
              <Ban size={30} />
            )}
          </span>

          <h2 className="text-[clamp(1.15rem,2vw,1.65rem)] font-black text-[#2f1b12]">
            Account{" "}
            {isSuspended
              ? "suspended"
              : "banned"}
          </h2>

          <p className="text-sm font-semibold leading-6 text-[#76583a]">
            You are signed in and may
            continue in read-only mode,
            but interaction, rewards,
            and wallet benefits are
            unavailable.
          </p>
        </div>

        <div className="rounded-[18px] border border-amber-300 bg-amber-50/80 p-4 text-sm font-semibold leading-6 text-amber-900">
          <p>
            <strong>Reason:</strong>{" "}
            {restrictedState.reason ??
              "No public reason was provided."}
          </p>

          {isSuspended &&
          restrictionDate ? (
            <p className="mt-2">
              <strong>
                Scheduled end:
              </strong>{" "}
              {restrictionDate}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() =>
            continueToDestination(
              restrictedState.next,
            )
          }
          className="lt-button-primary w-full justify-center"
        >
          Continue in Read-Only Mode
        </button>

        <button
          type="button"
          onClick={() => {
            setRestrictedState(null);
            setPassword("");
          }}
          className="lt-button-secondary w-full justify-center"
        >
          Back to Login
        </button>

        <p className="text-center text-xs font-semibold leading-5 text-[#8f7458]">
          Account support:
          {" "}
          <a
            href="mailto:contact@lifetopiaworld.io"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            contact@lifetopiaworld.io
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]"
    >
      <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
        <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
          Username / Email
        </span>

        <input
          id="login-identifier"
          type="text"
          required
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="username"
          spellCheck={false}
          maxLength={320}
          placeholder="username or player@email.com"
          value={identifier}
          disabled={isLoading}
          onBlur={() =>
            setIdentifier(
              normalizeIdentifier(
                identifier,
              ),
            )
          }
          onChange={(event) => {
            setIdentifier(
              event.target.value,
            );
            setMessage("");
          }}
          className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>

      <PasswordField
        id="login-password"
        label="Password"
        value={password}
        placeholder="Enter your password"
        autoComplete="current-password"
        disabled={isLoading}
        onChange={(value) => {
          setPassword(value);
          setMessage("");
        }}
      />

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-start gap-2 text-[clamp(0.7rem,0.95vw,0.88rem)] font-semibold leading-5 text-[#76583a]">
          <input
            type="checkbox"
            checked={rememberMe}
            disabled={isLoading}
            onChange={(event) =>
              setRememberMe(
                event.target.checked,
              )
            }
            className="mt-0.5 size-4 accent-[#4f8124]"
          />

          <span>
            Remember Me
            <span className="block text-xs font-medium text-[#9a8167]">
              Keep me signed in for up
              to 7 days.
            </span>
          </span>
        </label>

        <Link
          href={forgotPasswordHref}
          className="shrink-0 text-right text-[clamp(0.7rem,0.95vw,0.9rem)] font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Forgot Password?
        </Link>
      </div>

      {message ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-red-300 bg-red-50 px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.6rem,1vw,0.8rem)] text-[clamp(0.7rem,0.95vw,0.9rem)] font-bold leading-6 text-red-700"
        >
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="lt-button-primary mt-[clamp(0.3rem,1vw,0.8rem)] w-full justify-center disabled:pointer-events-none disabled:opacity-60"
      >
        {isLoading
          ? "Logging in..."
          : "Login"}
      </button>

      <div className="flex items-start gap-2 rounded-[16px] border border-[#cfe2bd] bg-[#f1f8e9] px-4 py-3 text-xs font-semibold leading-5 text-[#53683a]">
        <CheckCircle2
          size={16}
          className="mt-0.5 shrink-0"
        />
        Username login is normalized to
        lowercase. Credential failures
        use one secure generic message.
      </div>

      <p className="text-center text-[clamp(0.72rem,0.95vw,0.9rem)] text-[#7a5635]">
        New to Lifetopia?{" "}
        <Link
          href={registerHref}
          className="font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Create Lifetopia Account
        </Link>
      </p>
    </form>
  );
}
