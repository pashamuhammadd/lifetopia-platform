import { randomUUID } from "node:crypto";

import { createAdminClient } from "@repo/lib/supabase/admin";
import {
  sendLifetopiaVerificationEmail,
} from "@/lib/auth/verification-email";
import {
  sanitizeAuthRedirectValue,
  type RegistrationInput,
  validateRegistrationInput,
} from "@repo/services/auth-validation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 20_000;

const GENERIC_CONFLICT_MESSAGE =
  "Unable to create this account. Try another username or email.";

type UnknownRecord = Record<string, unknown>;

type RegistrationRequestBody =
  RegistrationInput & {
    termsVersion: string;
    privacyVersion: string;
    next?: string;
  };

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readString(
  value: unknown,
): string {
  return typeof value === "string"
    ? value
    : "";
}

function createJsonResponse(
  requestId: string,
  body: UnknownRecord,
  status: number,
) {
  return NextResponse.json(
    {
      ...body,
      requestId,
    },
    {
      status,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
        "X-Content-Type-Options":
          "nosniff",
      },
    },
  );
}

function isRequestOriginAllowed(
  request: Request,
): boolean {
  const origin =
    request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    return (
      new URL(origin).origin ===
      new URL(request.url).origin
    );
  } catch {
    return false;
  }
}

function parseRegistrationBody(
  body: UnknownRecord,
): RegistrationRequestBody {
  return {
    username: readString(body.username),
    displayName:
      readString(body.displayName),
    email: readString(body.email),
    password: readString(body.password),
    confirmPassword:
      readString(body.confirmPassword),
    avatarId: readString(body.avatarId),
    dateOfBirth:
      readString(body.dateOfBirth),
    countryCode:
      readString(body.countryCode),
    countryName:
      readString(body.countryName),
    gender: readString(body.gender),
    termsAccepted:
      body.termsAccepted === true,
    privacyAccepted:
      body.privacyAccepted === true,
    termsVersion:
      readString(body.termsVersion),
    privacyVersion:
      readString(body.privacyVersion),
    next: readString(body.next),
  };
}

function isLikelyAccountConflict(
  message: string,
): boolean {
  return /already|duplicate|unique|exists|registered/i.test(
    message,
  );
}

async function removeIncompleteUser(
  userId: string,
  requestId: string,
) {
  const admin = createAdminClient();

  const { error } =
    await admin.auth.admin.deleteUser(
      userId,
      false,
    );

  if (error) {
    console.error(
      "[auth-register] cleanup failed",
      {
        requestId,
        stage: "delete_user",
        code:
          "code" in error
            ? error.code
            : undefined,
        status: error.status,
      },
    );
  }
}

export async function POST(
  request: Request,
) {
  const requestId = randomUUID();

  if (!isRequestOriginAllowed(request)) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "origin_not_allowed",
        error: "Request origin is not allowed.",
      },
      403,
    );
  }

  const contentType =
    request.headers.get("content-type");

  if (
    !contentType
      ?.toLowerCase()
      .includes("application/json")
  ) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "invalid_content_type",
        error:
          "Content-Type must be application/json.",
      },
      415,
    );
  }

  const contentLength =
    Number(
      request.headers.get(
        "content-length",
      ) ?? 0,
    );

  if (
    Number.isFinite(contentLength) &&
    contentLength >
      MAX_REQUEST_BYTES
  ) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "request_too_large",
        error: "Request body is too large.",
      },
      413,
    );
  }

  let unknownBody: unknown;

  try {
    unknownBody =
      await request.json();
  } catch {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "invalid_json",
        error: "Invalid request body.",
      },
      400,
    );
  }

  if (!isRecord(unknownBody)) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "invalid_body",
        error: "Invalid request body.",
      },
      400,
    );
  }

  const body =
    parseRegistrationBody(
      unknownBody,
    );

  const validation =
    validateRegistrationInput(body);

  if (!validation.valid) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "validation_failed",
        error:
          "Some registration fields are invalid.",
        fieldErrors:
          validation.errors,
      },
      422,
    );
  }

  if (
    !body.termsVersion ||
    !body.privacyVersion
  ) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code:
          "legal_version_required",
        error:
          "Current legal-document versions are required.",
      },
      422,
    );
  }

  const normalized =
    validation.value;

  const next =
    sanitizeAuthRedirectValue(
      body.next,
      "/",
    );

  const admin = createAdminClient();

  const {
    data: activeDocuments,
    error: legalDocumentsError,
  } = await admin
    .from("legal_document_versions")
    .select(
      "document_type, version",
    )
    .eq("is_active", true)
    .in(
      "document_type",
      ["terms", "privacy"],
    );

  if (
    legalDocumentsError ||
    !activeDocuments
  ) {
    console.error(
      "[auth-register] legal lookup failed",
      {
        requestId,
        stage: "legal_lookup",
        code:
          legalDocumentsError?.code,
      },
    );

    return createJsonResponse(
      requestId,
      {
        success: false,
        code:
          "registration_unavailable",
        error:
          "Registration is temporarily unavailable.",
      },
      503,
    );
  }

  const activeTerms =
    activeDocuments.find(
      (document) =>
        document.document_type ===
        "terms",
    );

  const activePrivacy =
    activeDocuments.find(
      (document) =>
        document.document_type ===
        "privacy",
    );

  if (
    !activeTerms ||
    !activePrivacy
  ) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code:
          "legal_configuration_invalid",
        error:
          "Registration is temporarily unavailable.",
      },
      503,
    );
  }

  if (
    body.termsVersion !==
      activeTerms.version ||
    body.privacyVersion !==
      activePrivacy.version
  ) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "legal_version_outdated",
        error:
          "The legal documents changed. Review and accept the latest versions.",
        activeLegalVersions: {
          terms: activeTerms.version,
          privacy:
            activePrivacy.version,
        },
      },
      409,
    );
  }

  const {
    data: existingUsername,
    error: usernameLookupError,
  } = await admin
    .from("profiles")
    .select("id")
    .eq(
      "username",
      normalized.username,
    )
    .maybeSingle();

  if (usernameLookupError) {
    console.error(
      "[auth-register] username lookup failed",
      {
        requestId,
        stage: "username_lookup",
        code:
          usernameLookupError.code,
      },
    );

    return createJsonResponse(
      requestId,
      {
        success: false,
        code:
          "registration_unavailable",
        error:
          "Registration is temporarily unavailable.",
      },
      503,
    );
  }

  if (existingUsername) {
    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "registration_conflict",
        error:
          GENERIC_CONFLICT_MESSAGE,
      },
      409,
    );
  }

  const {
    data: createdUserData,
    error: createUserError,
  } =
    await admin.auth.admin.createUser({
      email: normalized.email,
      password: normalized.password,
      email_confirm: false,
      user_metadata: {
        username:
          normalized.username,
        display_name:
          normalized.displayName,
        avatar_id:
          normalized.avatarId,
        date_of_birth:
          normalized.dateOfBirth,
        country_code:
          normalized.countryCode,
        country_name:
          normalized.countryName,
        gender: normalized.gender,
      },
      app_metadata: {
        registration_source:
          "website",
      },
    });

  if (
    createUserError ||
    !createdUserData.user
  ) {
    const conflict =
      createUserError
        ? isLikelyAccountConflict(
            createUserError.message,
          )
        : false;

    console.error(
      "[auth-register] user creation failed",
      {
        requestId,
        stage: "create_user",
        status:
          createUserError?.status,
        conflict,
      },
    );

    return createJsonResponse(
      requestId,
      {
        success: false,
        code: conflict
          ? "registration_conflict"
          : "registration_failed",
        error: conflict
          ? GENERIC_CONFLICT_MESSAGE
          : "Unable to create the account right now.",
      },
      conflict ? 409 : 500,
    );
  }

  const createdUserId =
    createdUserData.user.id;

  const {
    error: finalizationError,
  } = await admin.rpc(
    "complete_lifetopia_registration",
    {
      p_user_id:
        createdUserId,
      p_terms_version:
        activeTerms.version,
      p_privacy_version:
        activePrivacy.version,
      p_source_app:
        "website",
    },
  );

  if (finalizationError) {
    console.error(
      "[auth-register] finalization failed",
      {
        requestId,
        stage:
          "registration_finalization",
        code:
          finalizationError.code,
      },
    );

    await removeIncompleteUser(
      createdUserId,
      requestId,
    );

    return createJsonResponse(
      requestId,
      {
        success: false,
        code: "registration_failed",
        error:
          "Unable to complete the account registration.",
      },
      500,
    );
  }

  const verificationDelivery =
    await sendLifetopiaVerificationEmail({
      email: normalized.email,
      next,
      reason: "registration",
      requestId,
      requestUrl: request.url,
    });

  return createJsonResponse(
    requestId,
    {
      success: true,
      status:
        "account_created",
      next,
      requiresEmailVerification:
        true,
      verificationEmailSent:
        verificationDelivery.status ===
        "sent",
      retryAfterSeconds:
        verificationDelivery
          .retryAfterSeconds,
      guardianConsentRequired:
        normalized
          .guardianConsentRequired,
      legalVersions: {
        terms:
          activeTerms.version,
        privacy:
          activePrivacy.version,
      },
    },
    201,
  );
}
