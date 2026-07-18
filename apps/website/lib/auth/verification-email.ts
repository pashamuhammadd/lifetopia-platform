import { createAdminClient } from "@repo/lib/supabase/admin";

export type VerificationEmailReason =
  | "registration"
  | "resend"
  | "legacy_reverify";

export type VerificationEmailDeliveryStatus =
  | "sent"
  | "cooldown"
  | "already_verified"
  | "not_found"
  | "unavailable";

export type VerificationEmailDeliveryResult = {
  status: VerificationEmailDeliveryStatus;
  retryAfterSeconds: number;
};

type ReservationRow = {
  resolved_user_id: string | null;
  email_verified: boolean;
  allowed: boolean;
  retry_after_seconds: number;
};

type SendVerificationEmailInput = {
  email: string;
  next: string;
  reason: VerificationEmailReason;
  requestId: string;
  requestUrl: string;
};

function getWebsiteOrigin(
  requestUrl: string,
): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    try {
      const normalized =
        configuredUrl.startsWith("http")
          ? configuredUrl
          : `https://${configuredUrl}`;

      return new URL(normalized).origin;
    } catch {
      // Fall back to the current request origin.
    }
  }

  return new URL(requestUrl).origin;
}

function buildEmailRedirectTo(
  requestUrl: string,
  next: string,
): string {
  const callbackUrl = new URL(
    "/auth/confirm",
    getWebsiteOrigin(requestUrl),
  );

  callbackUrl.searchParams.set(
    "next",
    next,
  );

  return callbackUrl.toString();
}

function getReservationRow(
  data: unknown,
): ReservationRow | null {
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

  return first as ReservationRow;
}

export async function sendLifetopiaVerificationEmail({
  email,
  next,
  reason,
  requestId,
  requestUrl,
}: SendVerificationEmailInput):
  Promise<VerificationEmailDeliveryResult> {
  const admin = createAdminClient();

  const {
    data: reservationData,
    error: reservationError,
  } = await admin.rpc(
    "reserve_lifetopia_verification_email",
    {
      p_email: email,
      p_reason: reason,
    },
  );

  if (reservationError) {
    console.error(
      "[auth-verification] reservation failed",
      {
        requestId,
        reason,
        code: reservationError.code,
      },
    );

    return {
      status: "unavailable",
      retryAfterSeconds: 180,
    };
  }

  const reservation =
    getReservationRow(reservationData);

  if (!reservation) {
    return {
      status: "unavailable",
      retryAfterSeconds: 180,
    };
  }

  if (reservation.email_verified) {
    return {
      status: "already_verified",
      retryAfterSeconds: 0,
    };
  }

  if (
    !reservation.resolved_user_id
  ) {
    return {
      status: "not_found",
      retryAfterSeconds: 180,
    };
  }

  if (!reservation.allowed) {
    return {
      status: "cooldown",
      retryAfterSeconds:
        Math.max(
          1,
          reservation
            .retry_after_seconds,
        ),
    };
  }

  const { error: sendError } =
    await admin.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo:
          buildEmailRedirectTo(
            requestUrl,
            next,
          ),
      },
    });

  const errorCode =
    sendError
      ? (
          "code" in sendError &&
          typeof sendError.code ===
            "string"
            ? sendError.code
            : `status_${sendError.status ?? "unknown"}`
        )
      : null;

  const { error: completionError } =
    await admin.rpc(
      "complete_lifetopia_verification_delivery",
      {
        p_user_id:
          reservation.resolved_user_id,
        p_success: !sendError,
        p_error_code: errorCode,
      },
    );

  if (completionError) {
    console.error(
      "[auth-verification] delivery audit failed",
      {
        requestId,
        reason,
        code: completionError.code,
      },
    );
  }

  if (sendError) {
    console.error(
      "[auth-verification] email send failed",
      {
        requestId,
        reason,
        status: sendError.status,
        code: errorCode,
      },
    );

    return {
      status: "unavailable",
      retryAfterSeconds:
        Math.max(
          1,
          reservation
            .retry_after_seconds,
        ),
    };
  }

  return {
    status: "sent",
    retryAfterSeconds:
      Math.max(
        1,
        reservation
          .retry_after_seconds,
      ),
  };
}
