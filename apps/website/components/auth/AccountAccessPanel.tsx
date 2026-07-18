"use client";

import {
  AlertCircle,
  Ban,
  CheckCircle2,
  MailCheck,
  ShieldAlert,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import {
  useState,
  type FormEvent,
} from "react";
import {
  useRouter,
} from "next/navigation";

import {
  LEGAL_DOCUMENTS,
} from "@/data/legal-documents";
import {
  checkUsernameAvailability,
} from "@repo/services/auth";
import {
  normalizeUsername,
  validateUsername,
} from "@repo/services/auth-validation";

type AccountAccessAction =
  | "verify_email"
  | "accept_legal"
  | "choose_username"
  | "guardian_consent"
  | "account_suspended"
  | "account_banned"
  | "account_deleted"
  | "ready";

type AccountAccessPanelProps = {
  nextAction:
    AccountAccessAction;
  nextUrl: string;
  restrictionReason:
    string | null;
  suspendedUntil:
    string | null;
  currentUsername: string;
};

type ApiResponse = {
  success?: boolean;
  error?: string;
};

function formatDate(
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

export function AccountAccessPanel({
  nextAction,
  nextUrl,
  restrictionReason,
  suspendedUntil,
  currentUsername,
}: AccountAccessPanelProps) {
  const router = useRouter();

  const [
    termsAccepted,
    setTermsAccepted,
  ] = useState(false);
  const [
    privacyAccepted,
    setPrivacyAccepted,
  ] = useState(false);

  const [username, setUsername] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  async function acceptLegal(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !termsAccepted ||
      !privacyAccepted
    ) {
      setError(
        "Review and accept both legal documents.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/account-access/legal",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            termsAccepted,
            privacyAccepted,
            termsVersion:
              LEGAL_DOCUMENTS
                .terms.version,
            privacyVersion:
              LEGAL_DOCUMENTS
                .privacy.version,
          }),
        },
      );

      const payload =
        (await response.json()) as
          ApiResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to accept the legal documents.",
        );
        return;
      }

      setMessage(
        "Legal documents accepted.",
      );
      router.refresh();
    } catch {
      setError(
        "Unable to reach the account service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function selectUsername(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    const validation =
      validateUsername(username);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setIsLoading(true);

    try {
      const availability =
        await checkUsernameAvailability(
          validation.value,
        );

      if (
        availability.status !==
        "available"
      ) {
        setError(
          availability.message,
        );
        return;
      }

      const response = await fetch(
        "/api/auth/account-access/username",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            username:
              validation.value,
          }),
        },
      );

      const payload =
        (await response.json()) as
          ApiResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Unable to select the username.",
        );
        return;
      }

      setMessage(
        "Permanent username selected.",
      );
      router.refresh();
    } catch {
      setError(
        "Unable to reach the account service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (nextAction === "ready") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-[#bcd89c] bg-[#edf7e4] text-[#4f8124]">
          <CheckCircle2 size={30} />
        </span>

        <div>
          <h2 className="text-2xl font-black text-[#2f1b12]">
            Account ready.
          </h2>

          <p className="mt-2 text-sm font-semibold leading-7 text-[#76583a]">
            All required account setup
            steps are complete.
          </p>
        </div>

        <a
          href={nextUrl}
          className="lt-button-primary w-full justify-center"
        >
          Continue to Lifetopia
        </a>
      </div>
    );
  }

  if (
    nextAction ===
      "account_suspended" ||
    nextAction ===
      "account_banned"
  ) {
    const suspended =
      nextAction ===
      "account_suspended";

    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-amber-300 bg-amber-50 text-amber-700">
          {suspended ? (
            <ShieldAlert size={30} />
          ) : (
            <Ban size={30} />
          )}
        </span>

        <h2 className="text-2xl font-black text-[#2f1b12]">
          Account{" "}
          {suspended
            ? "suspended"
            : "banned"}
        </h2>

        <div className="w-full rounded-[18px] border border-amber-300 bg-amber-50 p-4 text-left text-sm font-semibold leading-6 text-amber-900">
          <p>
            <strong>Reason:</strong>{" "}
            {restrictionReason ??
              "No public reason was provided."}
          </p>

          {suspended &&
          suspendedUntil ? (
            <p className="mt-2">
              <strong>
                Scheduled end:
              </strong>{" "}
              {formatDate(
                suspendedUntil,
              )}
            </p>
          ) : null}
        </div>

        <a
          href={nextUrl}
          className="lt-button-primary w-full justify-center"
        >
          Continue in Read-Only Mode
        </a>
      </div>
    );
  }

  if (
    nextAction ===
    "account_deleted"
  ) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-red-300 bg-red-50 text-red-600">
          <Ban size={30} />
        </span>

        <h2 className="text-2xl font-black text-[#2f1b12]">
          Account unavailable.
        </h2>

        <p className="text-sm font-semibold leading-7 text-[#76583a]">
          Contact{" "}
          <a
            href="mailto:contact@lifetopiaworld.io"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            contact@lifetopiaworld.io
          </a>{" "}
          for account support.
        </p>
      </div>
    );
  }

  if (
    nextAction === "verify_email"
  ) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-[#bcd89c] bg-[#edf7e4] text-[#4f8124]">
          <MailCheck size={30} />
        </span>

        <h2 className="text-2xl font-black text-[#2f1b12]">
          Verify your email.
        </h2>

        <p className="text-sm font-semibold leading-7 text-[#76583a]">
          Public Lifetopia pages remain
          readable, but interaction,
          rewards, and wallet benefits
          require verification.
        </p>

        <Link
          href="/check-email"
          className="lt-button-primary w-full justify-center"
        >
          Open Email Verification
        </Link>

        <a
          href={nextUrl}
          className="lt-button-secondary w-full justify-center"
        >
          Continue in Read-Only Mode
        </a>
      </div>
    );
  }

  if (
    nextAction === "accept_legal"
  ) {
    return (
      <form
        onSubmit={acceptLegal}
        className="flex flex-col gap-4"
      >
        <div className="flex items-start gap-3 rounded-[18px] border border-[#cfe2bd] bg-[#f1f8e9] p-4 text-sm font-semibold leading-6 text-[#53683a]">
          <UserRoundCheck
            size={19}
            className="mt-0.5 shrink-0"
          />

          Existing Lifetopia accounts
          must accept the current legal
          versions before interactive
          access is restored.
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
            I accept the{" "}
            <Link
              href="/terms"
              target="_blank"
              rel="noreferrer"
              className="font-black text-[#4f8124] underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            version{" "}
            {
              LEGAL_DOCUMENTS
                .terms.version
            }
            .
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
            I accept the{" "}
            <Link
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="font-black text-[#4f8124] underline underline-offset-4"
            >
              Privacy Policy
            </Link>{" "}
            version{" "}
            {
              LEGAL_DOCUMENTS
                .privacy.version
            }
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="lt-button-primary w-full justify-center disabled:opacity-60"
        >
          {isLoading
            ? "Saving..."
            : "Accept and Continue"}
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

  if (
    nextAction ===
    "choose_username"
  ) {
    return (
      <form
        onSubmit={selectUsername}
        className="flex flex-col gap-4"
      >
        <div className="rounded-[18px] border border-amber-300 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
          The temporary username{" "}
          <strong>
            @{currentUsername}
          </strong>{" "}
          was assigned during account
          migration. Choose a permanent
          username now. This required
          change does not consume your
          one free username change.
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-black text-[#2f1b12]">
            Permanent Username
          </span>

          <input
            type="text"
            required
            minLength={4}
            maxLength={16}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={username}
            disabled={isLoading}
            onChange={(event) => {
              setUsername(
                event.target.value
                  .toLowerCase(),
              );
              setError("");
            }}
            onBlur={() =>
              setUsername(
                normalizeUsername(
                  username,
                ),
              )
            }
            placeholder="new_username"
            className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-sm font-semibold text-[#2f1b12] outline-none transition focus:border-[#4f8124] disabled:opacity-60"
          />

          <span className="text-xs font-semibold leading-5 text-[#8f7458]">
            4–16 lowercase letters,
            numbers, and underscores.
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="lt-button-primary w-full justify-center disabled:opacity-60"
        >
          {isLoading
            ? "Checking..."
            : "Save Permanent Username"}
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

  return (
    <div className="flex flex-col gap-5 text-center">
      <h2 className="text-2xl font-black text-[#2f1b12]">
        Guardian approval required.
      </h2>

      <p className="text-sm font-semibold leading-7 text-[#76583a]">
        A parent or legal guardian must
        approve this account before
        interactive, reward, and wallet
        features become available.
      </p>

      <Link
        href={`/guardian-consent?next=${encodeURIComponent(
          nextUrl,
        )}`}
        className="lt-button-primary w-full justify-center"
      >
        Continue to Guardian Approval
      </Link>

      <a
        href={nextUrl}
        className="lt-button-secondary w-full justify-center"
      >
        Continue in Read-Only Mode
      </a>
    </div>
  );
}
