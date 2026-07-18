import {
  createAdminClient,
} from "@repo/lib/supabase/admin";

export type LifetopiaMfaEventType =
  | "enrollment_started"
  | "enrollment_verified"
  | "enrollment_cancelled"
  | "challenge_succeeded"
  | "challenge_failed"
  | "factor_removed";

export async function recordMfaEvent({
  userId,
  factorId,
  eventType,
  success,
  errorCode,
}: {
  userId: string;
  factorId:
    string | null;
  eventType:
    LifetopiaMfaEventType;
  success: boolean;
  errorCode?:
    string | null;
}): Promise<boolean> {
  const admin =
    createAdminClient();

  const { error } =
    await admin.rpc(
      "record_lifetopia_mfa_event",
      {
        p_user_id: userId,
        p_factor_id:
          factorId,
        p_event_type:
          eventType,
        p_success:
          success,
        p_error_code:
          errorCode ?? null,
      },
    );

  return !error;
}

export function getMfaErrorCode(
  error: unknown,
): string {
  if (
    typeof error === "object" &&
    error !== null
  ) {
    if (
      "code" in error &&
      typeof error.code ===
        "string"
    ) {
      return error.code.slice(
        0,
        120,
      );
    }

    if (
      "status" in error &&
      (
        typeof error.status ===
          "number" ||
        typeof error.status ===
          "string"
      )
    ) {
      return `status_${String(
        error.status,
      )}`.slice(0, 120);
    }
  }

  return "unknown";
}
