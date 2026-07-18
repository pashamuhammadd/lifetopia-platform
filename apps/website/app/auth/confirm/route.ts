import { createClient } from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
) {
  const requestUrl =
    new URL(request.url);

  const tokenHash =
    requestUrl.searchParams.get(
      "token_hash",
    );

  const type =
    requestUrl.searchParams.get(
      "type",
    );

  const next =
    sanitizeAuthRedirectValue(
      requestUrl.searchParams.get(
        "next",
      ),
      "/",
    );

  const resultUrl = new URL(
    "/email-verified",
    requestUrl.origin,
  );

  resultUrl.searchParams.set(
    "next",
    next,
  );

  if (
    !tokenHash ||
    type !== "email"
  ) {
    resultUrl.searchParams.set(
      "status",
      "error",
    );

    return NextResponse.redirect(
      resultUrl,
    );
  }

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "email",
    });

  resultUrl.searchParams.set(
    "status",
    error ? "error" : "success",
  );

  return NextResponse.redirect(
    resultUrl,
  );
}
