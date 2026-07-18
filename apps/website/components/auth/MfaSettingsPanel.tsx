"use client";

import Image from "next/image";
import {
  AlertCircle,
  CheckCircle2,
  Clipboard,
  KeyRound,
  LockKeyhole,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShieldOff,
  Smartphone,
  Trash2,
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
import type {
  LifetopiaMfaFactor,
} from "@/lib/auth/mfa-factors";

type MfaSettingsPanelProps = {
  initialFactors:
    LifetopiaMfaFactor[];
  currentLevel:
    | "aal1"
    | "aal2"
    | null;
  backUrl: string;
};

type EnrollmentState = {
  factorId: string;
  friendlyName: string;
  qrCode: string;
  secret: string;
};

type ApiResponse = {
  success?: boolean;
  error?: string;
  factor?: {
    id: string;
    friendlyName: string;
    qrCode: string;
    secret: string;
  };
};

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return "Unknown";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

export function MfaSettingsPanel({
  initialFactors,
  currentLevel,
  backUrl,
}: MfaSettingsPanelProps) {
  const [factors, setFactors] =
    useState(initialFactors);

  const [
    friendlyName,
    setFriendlyName,
  ] = useState(
    initialFactors.length === 0
      ? "Primary Authenticator"
      : "Backup Authenticator",
  );

  const [
    enrollment,
    setEnrollment,
  ] =
    useState<EnrollmentState | null>(
      null,
    );

  const [enrollmentCode, setEnrollmentCode] =
    useState("");

  const [selectedRemovalId, setSelectedRemovalId] =
    useState<string | null>(
      null,
    );

  const [
    verificationFactorId,
    setVerificationFactorId,
  ] = useState(
    initialFactors.find(
      (factor) =>
        factor.status ===
        "verified",
    )?.id ?? "",
  );

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [removalCode, setRemovalCode] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

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


  async function startEnrollment(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/mfa/enroll",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            friendlyName,
          }),
        },
      );

      const payload =
        (await response
          .json()
          .catch(() => ({}))) as
          ApiResponse;

      if (
        !response.ok ||
        !payload.success ||
        !payload.factor
      ) {
        setError(
          payload.error ??
            "Authenticator enrollment could not be started.",
        );
        return;
      }

      const nextEnrollment:
        EnrollmentState = {
          factorId:
            payload.factor.id,
          friendlyName:
            payload.factor
              .friendlyName,
          qrCode:
            payload.factor.qrCode,
          secret:
            payload.factor.secret,
        };

      setEnrollment(
        nextEnrollment,
      );

      setFactors((current) => [
        ...current.filter(
          (factor) =>
            factor.id !==
            nextEnrollment.factorId,
        ),
        {
          id:
            nextEnrollment.factorId,
          friendlyName:
            nextEnrollment
              .friendlyName,
          status: "unverified",
          createdAt:
            new Date().toISOString(),
          updatedAt:
            new Date().toISOString(),
        },
      ]);
    } catch {
      setError(
        "Unable to reach the MFA enrollment service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function verifyEnrollment(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !enrollment ||
      !/^\d{6}$/.test(
        enrollmentCode,
      )
    ) {
      setError(
        "Enter the six-digit code from your authenticator app.",
      );
      return;
    }

    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/mfa/enroll/verify",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            factorId:
              enrollment.factorId,
            code:
              enrollmentCode,
          }),
        },
      );

      const payload =
        (await response
          .json()
          .catch(() => ({}))) as
          ApiResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setEnrollmentCode("");
        setError(
          payload.error ??
            "Authenticator verification failed.",
        );
        return;
      }

      setMessage(
        "Two-factor authentication is enabled. Other active sessions were signed out for security.",
      );

      window.location.reload();
    } catch {
      setEnrollmentCode("");
      setError(
        "Unable to reach the MFA verification service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function cancelEnrollment(
    factorId: string,
  ) {
    if (
      !window.confirm(
        "Remove this incomplete authenticator setup?",
      )
    ) {
      return;
    }

    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/mfa/enroll/cancel",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            factorId,
          }),
        },
      );

      const payload =
        (await response
          .json()
          .catch(() => ({}))) as
          ApiResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setError(
          payload.error ??
            "Incomplete setup could not be removed.",
        );
        return;
      }

      setFactors((current) =>
        current.filter(
          (factor) =>
            factor.id !== factorId,
        ),
      );

      if (
        enrollment?.factorId ===
        factorId
      ) {
        setEnrollment(null);
        setEnrollmentCode("");
      }

      setMessage(
        "Incomplete authenticator setup removed.",
      );
    } catch {
      setError(
        "Unable to reach the MFA service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeVerifiedFactor(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !selectedRemovalId ||
      !verificationFactorId ||
      !currentPassword ||
      !/^\d{6}$/.test(
        removalCode,
      )
    ) {
      setError(
        "Current password and a six-digit authenticator code are required.",
      );
      return;
    }

    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/auth/mfa/unenroll",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            factorId:
              selectedRemovalId,
            verificationFactorId,
            password:
              currentPassword,
            code:
              removalCode,
          }),
        },
      );

      const payload =
        (await response
          .json()
          .catch(() => ({}))) as
          ApiResponse;

      if (
        !response.ok ||
        !payload.success
      ) {
        setRemovalCode("");
        setError(
          payload.error ??
            "Authenticator removal failed.",
        );
        return;
      }

      const remaining =
        factors.filter(
          (factor) =>
            factor.id !==
            selectedRemovalId,
        );

      setFactors(remaining);
      setSelectedRemovalId(null);
      setCurrentPassword("");
      setRemovalCode("");

      setVerificationFactorId(
        remaining.find(
          (factor) =>
            factor.status ===
            "verified",
        )?.id ?? "",
      );

      setMessage(
        "Authenticator removed.",
      );
    } catch {
      setRemovalCode("");
      setError(
        "Unable to reach the MFA service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copySecret() {
    if (!enrollment?.secret) {
      return;
    }

    await navigator.clipboard.writeText(
      enrollment.secret,
    );

    setMessage(
      "Authenticator secret copied.",
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[24px] border border-[#d9c99f] bg-[#fff8e8] p-[clamp(1rem,2.5vw,1.5rem)]">
        <div className="flex items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#b9d99a] bg-[#eef7e5] text-[#4f8124]">
            <ShieldCheck size={24} />
          </span>

          <div>
            <h2 className="text-lg font-black text-[#2f1b12]">
              Two-factor authentication
            </h2>

            <p className="mt-1 text-sm font-semibold leading-6 text-[#76583a]">
              Current session level:{" "}
              <strong className="uppercase text-[#4f8124]">
                {currentLevel ??
                  "unknown"}
              </strong>
              . Verified authenticators:
              {" "}
              {verifiedFactors.length}.
            </p>
          </div>
        </div>

        {verifiedFactors.length === 0 ? (
          <div className="mt-4 rounded-[18px] border border-amber-300 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
            MFA is optional, but enabling
            it protects the account when
            a password is exposed.
          </div>
        ) : verifiedFactors.length === 1 ? (
          <div className="mt-4 rounded-[18px] border border-[#c9d9ef] bg-[#f4f7ff] p-4 text-sm font-semibold leading-6 text-[#42649d]">
            Add a second authenticator as
            a backup. Supabase does not
            provide recovery codes.
          </div>
        ) : (
          <div className="mt-4 rounded-[18px] border border-[#bcd89c] bg-[#edf7e4] p-4 text-sm font-semibold leading-6 text-[#4f8124]">
            Backup coverage is active
            because more than one verified
            authenticator is available.
          </div>
        )}
      </section>

      {message ? (
        <div
          aria-live="polite"
          className="flex items-start gap-2 rounded-[18px] border border-[#bcd89c] bg-[#edf7e4] px-4 py-3 text-sm font-bold leading-6 text-[#4f8124]"
        >
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />
          {message}
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[18px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-700"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />
          {error}
        </div>
      ) : null}

      <section className="grid gap-3">
        {factors.map((factor) => (
          <article
            key={factor.id}
            className="rounded-[22px] border border-[#dfd0b5] bg-white/80 p-[clamp(0.9rem,2vw,1.25rem)]"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#e2d4bc] bg-[#fff8e8] text-[#76583a]">
                <Smartphone size={21} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-[#2f1b12]">
                    {factor.friendlyName}
                  </h3>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] ${
                      factor.status ===
                      "verified"
                        ? "border-[#a9cc83] bg-[#f2f9e9] text-[#4f8124]"
                        : "border-amber-300 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {factor.status}
                  </span>
                </div>

                <p className="mt-2 text-xs font-semibold leading-5 text-[#8f7458]">
                  Added{" "}
                  {formatDate(
                    factor.createdAt,
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {factor.status ===
              "unverified" ? (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    cancelEnrollment(
                      factor.id,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#fff0f0] px-4 py-2.5 text-sm font-black text-[#c24141] transition hover:bg-[#ffe3e3] disabled:opacity-60"
                >
                  <Trash2 size={16} />
                  Remove Incomplete Setup
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setSelectedRemovalId(
                      factor.id,
                    );
                    setVerificationFactorId(
                      verifiedFactors[0]
                        ?.id ??
                        factor.id,
                    );
                    setError("");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#fff0f0] px-4 py-2.5 text-sm font-black text-[#c24141] transition hover:bg-[#ffe3e3] disabled:opacity-60"
                >
                  <ShieldOff size={16} />
                  Remove
                </button>
              )}
            </div>
          </article>
        ))}

        {factors.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-[#d9c99f] bg-white/60 p-6 text-center text-sm font-semibold leading-6 text-[#76583a]">
            No authenticator has been
            enrolled.
          </div>
        ) : null}
      </section>

      {selectedRemovalId ? (
        <form
          onSubmit={
            removeVerifiedFactor
          }
          className="rounded-[24px] border border-red-300 bg-red-50/70 p-[clamp(1rem,2.5vw,1.5rem)]"
        >
          <div className="flex items-start gap-3">
            <LockKeyhole
              size={22}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <h3 className="font-black text-red-800">
                Re-authenticate to remove
                this factor
              </h3>

              <p className="mt-1 text-sm font-semibold leading-6 text-red-700">
                Enter your current
                password and a code from
                any verified authenticator.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            <PasswordField
              id="mfa-current-password"
              label="Current Password"
              value={currentPassword}
              placeholder="Enter your current password"
              autoComplete="current-password"
              disabled={isLoading}
              onChange={(value) => {
                setCurrentPassword(
                  value,
                );
                setError("");
              }}
            />

            <label className="flex flex-col gap-2">
              <span className="text-sm font-black text-[#2f1b12]">
                Verification
                Authenticator
              </span>

              <select
                value={
                  verificationFactorId
                }
                disabled={isLoading}
                onChange={(event) => {
                  setVerificationFactorId(
                    event.target.value,
                  );
                  setRemovalCode("");
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
                      {
                        factor.friendlyName
                      }
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-black text-[#2f1b12]">
                Six-Digit Code
              </span>

              <input
                type="text"
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={removalCode}
                disabled={isLoading}
                onChange={(event) => {
                  setRemovalCode(
                    event.target.value
                      .replace(
                        /\D/g,
                        "",
                      )
                      .slice(0, 6),
                  );
                  setError("");
                }}
                placeholder="000000"
                className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-center text-lg font-black tracking-[0.32em] text-[#2f1b12] outline-none transition focus:border-[#4f8124]"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setSelectedRemovalId(
                  null,
                );
                setCurrentPassword("");
                setRemovalCode("");
                setError("");
              }}
              className="lt-button-secondary justify-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c24141] px-5 py-3 text-sm font-black text-white transition hover:bg-[#a93535] disabled:opacity-60"
            >
              {isLoading ? (
                <RefreshCw
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={17} />
              )}
              Remove Authenticator
            </button>
          </div>
        </form>
      ) : null}

      {!enrollment ? (
        <form
          onSubmit={startEnrollment}
          className="rounded-[24px] border border-[#d9c99f] bg-white/80 p-[clamp(1rem,2.5vw,1.5rem)]"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#b9d99a] bg-[#eef7e5] text-[#4f8124]">
              <Plus size={21} />
            </span>

            <div>
              <h3 className="font-black text-[#2f1b12]">
                Add authenticator
              </h3>

              <p className="mt-1 text-sm font-semibold leading-6 text-[#76583a]">
                Use Google Authenticator,
                Microsoft Authenticator,
                Authy, 1Password, or
                another TOTP-compatible
                app.
              </p>
            </div>
          </div>

          <label className="mt-4 flex flex-col gap-2">
            <span className="text-sm font-black text-[#2f1b12]">
              Authenticator Name
            </span>

            <input
              type="text"
              required
              minLength={2}
              maxLength={32}
              value={friendlyName}
              disabled={
                isLoading ||
                factors.length >= 10
              }
              onChange={(event) => {
                setFriendlyName(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="Primary Authenticator"
              className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-sm font-semibold text-[#2f1b12] outline-none transition focus:border-[#4f8124] disabled:opacity-60"
            />
          </label>

          <button
            type="submit"
            disabled={
              isLoading ||
              factors.length >= 10
            }
            className="lt-button-primary mt-4 w-full justify-center disabled:opacity-60"
          >
            {isLoading ? (
              <RefreshCw
                size={17}
                className="animate-spin"
              />
            ) : (
              <KeyRound size={17} />
            )}
            Start Authenticator Setup
          </button>
        </form>
      ) : (
        <form
          onSubmit={verifyEnrollment}
          className="rounded-[24px] border border-[#a9cc83] bg-[#f2f9e9] p-[clamp(1rem,2.5vw,1.5rem)]"
        >
          <h3 className="text-center text-lg font-black text-[#2f1b12]">
            Scan the QR code
          </h3>

          <p className="mt-2 text-center text-sm font-semibold leading-6 text-[#76583a]">
            Add{" "}
            <strong>
              {enrollment.friendlyName}
            </strong>{" "}
            to your authenticator app,
            then enter its current code.
          </p>

          <div className="mx-auto mt-5 w-fit rounded-[22px] border border-[#d9c99f] bg-white p-4 shadow-sm">
            <Image
              src={enrollment.qrCode}
              alt="Lifetopia TOTP QR code"
              width={220}
              height={220}
              unoptimized
            />
          </div>

          <div className="mt-4 rounded-[18px] border border-[#d9c99f] bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.1em] text-[#76583a]">
              Manual setup key
            </p>

            <div className="mt-2 flex items-center gap-2">
              <code className="min-w-0 flex-1 break-all rounded-[12px] bg-[#fff8e8] px-3 py-2 text-xs font-black text-[#2f1b12]">
                {enrollment.secret}
              </code>

              <button
                type="button"
                onClick={copySecret}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#d9c99f] bg-white text-[#4f8124]"
                aria-label="Copy authenticator secret"
              >
                <Clipboard
                  size={17}
                />
              </button>
            </div>
          </div>

          <label className="mt-4 flex flex-col gap-2">
            <span className="text-sm font-black text-[#2f1b12]">
              Six-Digit Code
            </span>

            <input
              type="text"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={enrollmentCode}
              disabled={isLoading}
              onChange={(event) => {
                setEnrollmentCode(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6),
                );
                setError("");
              }}
              placeholder="000000"
              className="w-full rounded-[18px] border border-[#d9c99f] bg-white px-4 py-3 text-center text-lg font-black tracking-[0.32em] text-[#2f1b12] outline-none transition focus:border-[#4f8124]"
            />
          </label>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                cancelEnrollment(
                  enrollment.factorId,
                )
              }
              className="lt-button-secondary justify-center"
            >
              Cancel Setup
            </button>

            <button
              type="submit"
              disabled={
                isLoading ||
                enrollmentCode.length !==
                  6
              }
              className="lt-button-primary justify-center disabled:opacity-60"
            >
              {isLoading ? (
                <RefreshCw
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <ShieldCheck
                  size={17}
                />
              )}
              Enable MFA
            </button>
          </div>
        </form>
      )}

      <section className="rounded-[20px] border border-[#c9d9ef] bg-[#f4f7ff] p-4 text-sm font-semibold leading-6 text-[#42649d]">
        <p className="font-black">
          Recovery plan
        </p>

        <p className="mt-1">
          Keep a second verified
          authenticator whenever possible.
          If every authenticator is lost,
          use the recovery guidance and
          contact Lifetopia support from
          the account email.
        </p>

        <Link
          href="/mfa-recovery"
          className="mt-3 inline-block font-black underline underline-offset-4"
        >
          Open MFA recovery guidance
        </Link>
      </section>

      <a
        href={backUrl}
        className="lt-button-secondary justify-center"
      >
        Back
      </a>
    </div>
  );
}
