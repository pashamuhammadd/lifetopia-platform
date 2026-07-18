import {
  createHmac,
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const TURNSTILE_TOKEN_MAX_LENGTH =
  2048;

type LoginAttemptOutcome =
  | "success"
  | "invalid_credentials"
  | "email_verification_required"
  | "mfa_required"
  | "restricted"
  | "account_unavailable"
  | "system_error";

type LoginAttemptReservationRow = {
  attempt_id: string | null;
  allowed: boolean;
  captcha_required: boolean;
  retry_after_seconds: number;
  risk_level: string;
};

type TurnstileVerificationResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type LoginRiskContext = {
  identifierHash: string;
  ipHash: string;
  pairHash: string;
  clientIp: string;
};

export type LoginAttemptReservation = {
  attemptId: string | null;
  allowed: boolean;
  captchaRequired: boolean;
  retryAfterSeconds: number;
  riskLevel: string;
};

export type TurnstileValidationResult =
  | {
      status: "passed";
    }
  | {
      status: "failed";
      errorCodes: string[];
    }
  | {
      status: "unavailable";
    };

function getAbuseHashSecret(): string {
  const secret =
    process.env
      .AUTH_ABUSE_HASH_SECRET
      ?.trim();

  if (
    !secret ||
    secret.length < 32
  ) {
    throw new Error(
      "AUTH_ABUSE_HASH_SECRET must contain at least 32 characters.",
    );
  }

  return secret;
}

function createPrivacyHash(
  label: string,
  value: string,
): string {
  return createHmac(
    "sha256",
    getAbuseHashSecret(),
  )
    .update(`${label}:${value}`)
    .digest("hex");
}

function getFirstForwardedAddress(
  value: string | null,
): string | null {
  if (!value) {
    return null;
  }

  const first =
    value
      .split(",")[0]
      ?.trim();

  return first || null;
}

export function getClientIp(
  request: Request,
): string {
  const candidates = [
    request.headers.get(
      "x-vercel-forwarded-for",
    ),
    request.headers.get(
      "cf-connecting-ip",
    ),
    request.headers.get(
      "x-forwarded-for",
    ),
    request.headers.get(
      "x-real-ip",
    ),
  ];

  for (const candidate of candidates) {
    const address =
      getFirstForwardedAddress(
        candidate,
      );

    if (address) {
      return address.slice(0, 128);
    }
  }

  return "local-or-unknown";
}

export function createLoginRiskContext(
  request: Request,
  normalizedIdentifier: string,
): LoginRiskContext {
  const clientIp =
    getClientIp(request);

  const identifierHash =
    createPrivacyHash(
      "identifier",
      normalizedIdentifier,
    );

  const ipHash =
    createPrivacyHash(
      "ip",
      clientIp,
    );

  const pairHash =
    createPrivacyHash(
      "pair",
      `${ipHash}:${identifierHash}`,
    );

  return {
    identifierHash,
    ipHash,
    pairHash,
    clientIp,
  };
}

function getReservationRow(
  data: unknown,
): LoginAttemptReservationRow | null {
  if (!Array.isArray(data)) {
    return null;
  }

  const first = data[0];

  if (
    typeof first !== "object" ||
    first === null
  ) {
    return null;
  }

  return (
    first as
      LoginAttemptReservationRow
  );
}

export async function reserveLoginAttempt({
  riskContext,
  captchaSupplied,
  captchaPassed,
}: {
  riskContext: LoginRiskContext;
  captchaSupplied: boolean;
  captchaPassed: boolean;
}): Promise<
  LoginAttemptReservation | null
> {
  const admin =
    createAdminClient();

  const { data, error } =
    await admin.rpc(
      "reserve_lifetopia_login_attempt",
      {
        p_identifier_hash:
          riskContext.identifierHash,
        p_ip_hash:
          riskContext.ipHash,
        p_pair_hash:
          riskContext.pairHash,
        p_captcha_supplied:
          captchaSupplied,
        p_captcha_passed:
          captchaPassed,
      },
    );

  if (error) {
    return null;
  }

  const row =
    getReservationRow(data);

  if (!row) {
    return null;
  }

  return {
    attemptId: row.attempt_id,
    allowed: row.allowed,
    captchaRequired:
      row.captcha_required,
    retryAfterSeconds:
      Math.max(
        0,
        row.retry_after_seconds,
      ),
    riskLevel:
      row.risk_level,
  };
}

export async function completeLoginAttempt({
  attemptId,
  outcome,
  userId,
}: {
  attemptId: string;
  outcome: LoginAttemptOutcome;
  userId?: string | null;
}): Promise<boolean> {
  const admin =
    createAdminClient();

  const { error } =
    await admin.rpc(
      "complete_lifetopia_login_attempt",
      {
        p_attempt_id: attemptId,
        p_outcome: outcome,
        p_user_id:
          userId ?? null,
      },
    );

  return !error;
}

export async function validateTurnstileToken({
  token,
  clientIp,
  requestId,
}: {
  token: string;
  clientIp: string;
  requestId: string;
}): Promise<TurnstileValidationResult> {
  const secret =
    process.env
      .TURNSTILE_SECRET_KEY
      ?.trim();

  if (
    !secret ||
    token.length === 0 ||
    token.length >
      TURNSTILE_TOKEN_MAX_LENGTH
  ) {
    return {
      status: "unavailable",
    };
  }

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => controller.abort(),
      8_000,
    );

  try {
    const response = await fetch(
      TURNSTILE_VERIFY_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          secret,
          response: token,
          ...(clientIp !==
          "local-or-unknown"
            ? {
                remoteip:
                  clientIp,
              }
            : {}),
          idempotency_key:
            requestId ||
            randomUUID(),
        }),
        cache: "no-store",
        signal:
          controller.signal,
      },
    );

    if (!response.ok) {
      return {
        status: "unavailable",
      };
    }

    const result =
      (await response.json()) as
        TurnstileVerificationResponse;

    const actionIsValid =
      process.env.NODE_ENV !==
        "production" ||
      !result.action ||
      result.action === "login";

    if (
      result.success &&
      actionIsValid
    ) {
      return {
        status: "passed",
      };
    }

    return {
      status: "failed",
      errorCodes:
        result["error-codes"] ??
        [],
    };
  } catch {
    return {
      status: "unavailable",
    };
  } finally {
    clearTimeout(timeout);
  }
}
