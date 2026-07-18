"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Laptop,
  LogOut,
  MapPin,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Tablet,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import type {
  LifetopiaSessionView,
  SessionDeviceType,
} from "@/lib/auth/session-device";

type SessionManagementPanelProps = {
  initialSessions:
    LifetopiaSessionView[];
  backUrl: string;
};

type SessionAction =
  | {
      type: "session";
      sessionId: string;
    }
  | {
      type:
        | "current"
        | "others"
        | "all";
    };

type ApiResponse = {
  success?: boolean;
  error?: string;
};

function formatDate(
  value: string,
): string {
  const date = new Date(value);

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

function formatRelativeTime(
  value: string,
): string {
  const timestamp =
    new Date(value).getTime();

  if (
    Number.isNaN(timestamp)
  ) {
    return "Unknown";
  }

  const differenceSeconds =
    Math.round(
      (timestamp - Date.now()) /
        1000,
    );

  const absoluteSeconds =
    Math.abs(differenceSeconds);

  const formatter =
    new Intl.RelativeTimeFormat(
      undefined,
      {
        numeric: "auto",
      },
    );

  if (absoluteSeconds < 60) {
    return formatter.format(
      differenceSeconds,
      "second",
    );
  }

  const differenceMinutes =
    Math.round(
      differenceSeconds / 60,
    );

  if (
    Math.abs(differenceMinutes) <
    60
  ) {
    return formatter.format(
      differenceMinutes,
      "minute",
    );
  }

  const differenceHours =
    Math.round(
      differenceMinutes / 60,
    );

  if (
    Math.abs(differenceHours) <
    24
  ) {
    return formatter.format(
      differenceHours,
      "hour",
    );
  }

  const differenceDays =
    Math.round(
      differenceHours / 24,
    );

  return formatter.format(
    differenceDays,
    "day",
  );
}

function DeviceIcon({
  type,
}: {
  type: SessionDeviceType;
}) {
  if (type === "mobile") {
    return <Smartphone size={23} />;
  }

  if (type === "tablet") {
    return <Tablet size={23} />;
  }

  if (type === "desktop") {
    return <Laptop size={23} />;
  }

  return (
    <MonitorSmartphone size={23} />
  );
}

function isSameAction(
  first: SessionAction | null,
  second: SessionAction,
): boolean {
  if (!first) {
    return false;
  }

  if (
    first.type === "session" &&
    second.type === "session"
  ) {
    return (
      first.sessionId ===
      second.sessionId
    );
  }

  return first.type === second.type;
}

export function SessionManagementPanel({
  initialSessions,
  backUrl,
}: SessionManagementPanelProps) {
  const [sessions, setSessions] =
    useState(initialSessions);

  const [activeAction, setActiveAction] =
    useState<SessionAction | null>(
      null,
    );

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const currentSession =
    useMemo(
      () =>
        sessions.find(
          (session) =>
            session.isCurrent,
        ) ?? null,
      [sessions],
    );

  const otherSessions =
    useMemo(
      () =>
        sessions.filter(
          (session) =>
            !session.isCurrent,
        ),
      [sessions],
    );

  async function callAction({
    action,
    url,
    body,
  }: {
    action: SessionAction;
    url: string;
    body?: unknown;
  }): Promise<
    ApiResponse | null
  > {
    setMessage("");
    setError("");
    setActiveAction(action);

    try {
      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          cache: "no-store",
          body:
            body === undefined
              ? undefined
              : JSON.stringify(body),
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
            "The session action could not be completed.",
        );

        return null;
      }

      return payload;
    } catch {
      setError(
        "Unable to reach the session service.",
      );

      return null;
    } finally {
      setActiveAction(null);
    }
  }

  async function revokeSession(
    session:
      LifetopiaSessionView,
  ) {
    if (
      !window.confirm(
        `Sign out ${session.deviceLabel}?`,
      )
    ) {
      return;
    }

    const action: SessionAction = {
      type: "session",
      sessionId:
        session.sessionId,
    };

    const result =
      await callAction({
        action,
        url:
          "/api/auth/sessions/revoke",
        body: {
          sessionId:
            session.sessionId,
        },
      });

    if (!result) {
      return;
    }

    setSessions((current) =>
      current.filter(
        (candidate) =>
          candidate.sessionId !==
          session.sessionId,
      ),
    );

    setMessage(
      `${session.deviceLabel} was signed out.`,
    );
  }

  async function logoutOthers() {
    if (
      !window.confirm(
        "Sign out every other device while keeping this device signed in?",
      )
    ) {
      return;
    }

    const action: SessionAction = {
      type: "others",
    };

    const result =
      await callAction({
        action,
        url:
          "/api/auth/sessions/logout-others",
      });

    if (!result) {
      return;
    }

    setSessions((current) =>
      current.filter(
        (session) =>
          session.isCurrent,
      ),
    );

    setMessage(
      "All other devices were signed out.",
    );
  }

  async function logoutCurrent() {
    if (
      !window.confirm(
        "Sign out this device?",
      )
    ) {
      return;
    }

    const action: SessionAction = {
      type: "current",
    };

    const result =
      await callAction({
        action,
        url:
          "/api/auth/sessions/logout-current",
      });

    if (result) {
      window.location.assign(
        "/login",
      );
    }
  }

  async function logoutAll() {
    if (
      !window.confirm(
        "Sign out every device connected to this Lifetopia account?",
      )
    ) {
      return;
    }

    const action: SessionAction = {
      type: "all",
    };

    const result =
      await callAction({
        action,
        url:
          "/api/auth/sessions/logout-all",
      });

    if (result) {
      window.location.assign(
        "/login",
      );
    }
  }

  function renderSession(
    session:
      LifetopiaSessionView,
  ) {
    const action: SessionAction =
      session.isCurrent
        ? {
            type: "current",
          }
        : {
            type: "session",
            sessionId:
              session.sessionId,
          };

    const isLoading =
      isSameAction(
        activeAction,
        action,
      );

    return (
      <article
        key={session.sessionId}
        className={`rounded-[22px] border p-[clamp(0.9rem,2vw,1.25rem)] ${
          session.isCurrent
            ? "border-[#a9cc83] bg-[#f2f9e9]"
            : "border-[#dfd0b5] bg-white/80"
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-full border ${
              session.isCurrent
                ? "border-[#b9d99a] bg-white text-[#4f8124]"
                : "border-[#e2d4bc] bg-[#fff8e8] text-[#76583a]"
            }`}
          >
            <DeviceIcon
              type={
                session.deviceType
              }
            />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[clamp(0.95rem,1.5vw,1.12rem)] font-black text-[#2f1b12]">
                {session.deviceLabel}
              </h2>

              {session.isCurrent ? (
                <span className="rounded-full border border-[#a9cc83] bg-white px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#4f8124]">
                  Current device
                </span>
              ) : null}

              {session.assuranceLevel ===
              "aal2" ? (
                <span className="rounded-full border border-[#b9c8e8] bg-[#f4f7ff] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#42649d]">
                  MFA
                </span>
              ) : null}
            </div>

            <div className="mt-3 grid gap-2 text-xs font-semibold leading-5 text-[#76583a] sm:grid-cols-2">
              <p className="flex items-start gap-2">
                <Clock3
                  size={15}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  Active{" "}
                  {formatRelativeTime(
                    session.lastActiveAt,
                  )}
                  <span className="block text-[#9a8167]">
                    Since{" "}
                    {formatDate(
                      session.createdAt,
                    )}
                  </span>
                </span>
              </p>

              <p className="flex items-start gap-2">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  Network{" "}
                  {session.ipHint ??
                    "unavailable"}
                  <span className="block text-[#9a8167]">
                    Approximate and
                    privacy-masked
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            disabled={
              activeAction !== null
            }
            onClick={() =>
              session.isCurrent
                ? logoutCurrent()
                : revokeSession(
                    session,
                  )
            }
            className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-black transition disabled:pointer-events-none disabled:opacity-60 ${
              session.isCurrent
                ? "border border-[#d9c99f] bg-white text-[#76583a] hover:border-[#c7ad83]"
                : "bg-[#fff0f0] text-[#c24141] hover:bg-[#ffe3e3]"
            }`}
          >
            {isLoading ? (
              <RefreshCw
                size={16}
                className="animate-spin"
              />
            ) : (
              <LogOut size={16} />
            )}

            {session.isCurrent
              ? "Sign Out This Device"
              : "Sign Out Device"}
          </button>
        </div>
      </article>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-[24px] border border-[#d9c99f] bg-[#fff8e8] p-[clamp(1rem,2.5vw,1.5rem)]">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#b9d99a] bg-[#eef7e5] text-[#4f8124]">
            <ShieldCheck size={22} />
          </span>

          <div>
            <h2 className="text-lg font-black text-[#2f1b12]">
              Active account sessions
            </h2>

            <p className="mt-1 text-sm font-semibold leading-6 text-[#76583a]">
              Review every browser or
              device currently able to
              refresh this Lifetopia
              account session.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={
              otherSessions.length ===
                0 ||
              activeAction !== null
            }
            onClick={logoutOthers}
            className="lt-button-secondary w-full justify-center disabled:pointer-events-none disabled:opacity-50"
          >
            {activeAction?.type ===
            "others" ? (
              <RefreshCw
                size={17}
                className="animate-spin"
              />
            ) : (
              <MonitorSmartphone
                size={17}
              />
            )}
            Sign Out Other Devices
          </button>

          <button
            type="button"
            disabled={
              sessions.length === 0 ||
              activeAction !== null
            }
            onClick={logoutAll}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c24141] px-5 py-3 text-sm font-black text-white transition hover:bg-[#a93535] disabled:pointer-events-none disabled:opacity-50"
          >
            {activeAction?.type ===
            "all" ? (
              <RefreshCw
                size={17}
                className="animate-spin"
              />
            ) : (
              <LogOut size={17} />
            )}
            Sign Out All Devices
          </button>
        </div>
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
        {currentSession
          ? renderSession(
              currentSession,
            )
          : null}

        {otherSessions.map(
          renderSession,
        )}

        {sessions.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-[#d9c99f] bg-white/60 p-6 text-center text-sm font-semibold leading-6 text-[#76583a]">
            No active session records
            are available.
          </div>
        ) : null}
      </section>

      <div className="rounded-[18px] border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-900">
        Revoking a session blocks future
        refreshes immediately. An access
        token already issued to another
        device may continue working until
        that short-lived token expires.
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={backUrl}
          className="lt-button-secondary justify-center"
        >
          Back
        </a>

        <p className="text-center text-xs font-semibold text-[#8f7458] sm:text-right">
          Account support:{" "}
          <a
            href="mailto:contact@lifetopiaworld.io"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            contact@lifetopiaworld.io
          </a>
        </p>
      </div>
    </div>
  );
}
