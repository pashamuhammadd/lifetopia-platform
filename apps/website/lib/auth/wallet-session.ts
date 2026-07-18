import {
  createClient,
} from "@repo/lib/supabase/server";

export async function
getWalletSecuritySession() {
  const supabase =
    await createClient();

  const [
    userResult,
    assuranceResult,
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.mfa
      .getAuthenticatorAssuranceLevel(),
  ]);

  const user =
    userResult.data.user;

  if (!user) {
    return {
      ok: false as const,
      status: 401,
      code:
        "authentication_required",
      error:
        "Login is required.",
    };
  }

  if (
    assuranceResult.error ||
    !assuranceResult.data
  ) {
    return {
      ok: false as const,
      status: 503,
      code:
        "security_session_unavailable",
      error:
        "Account security status could not be verified.",
    };
  }

  const currentLevel =
    assuranceResult.data
      .currentLevel;

  const nextLevel =
    assuranceResult.data
      .nextLevel;

  if (
    nextLevel === "aal2" &&
    currentLevel !== "aal2"
  ) {
    return {
      ok: false as const,
      status: 403,
      code: "mfa_required",
      error:
        "Two-factor verification is required before changing a linked wallet.",
    };
  }

  return {
    ok: true as const,
    status: 200,
    user,
    supabase,
  };
}
