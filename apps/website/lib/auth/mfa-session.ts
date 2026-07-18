import {
  createClient,
} from "@repo/lib/supabase/server";

import {
  getVerifiedTotpFactors,
  mapTotpFactors,
  type LifetopiaMfaFactor,
} from "./mfa-factors";

type KnownAssuranceLevel =
  | "aal1"
  | "aal2"
  | null;

function normalizeAssuranceLevel(
  value: unknown,
): KnownAssuranceLevel {
  if (
    value === "aal1" ||
    value === "aal2"
  ) {
    return value;
  }

  return null;
}

export type LifetopiaMfaSessionState = {
  currentLevel:
    | "aal1"
    | "aal2"
    | null;
  nextLevel:
    | "aal1"
    | "aal2"
    | null;
  factors:
    LifetopiaMfaFactor[];
  verifiedFactors:
    LifetopiaMfaFactor[];
  requiresChallenge: boolean;
};

export async function getCurrentMfaSessionState():
  Promise<
    LifetopiaMfaSessionState | null
  > {
  const supabase =
    await createClient();

  const [
    factorsResult,
    assuranceResult,
  ] = await Promise.all([
    supabase.auth.mfa.listFactors(),
    supabase.auth.mfa
      .getAuthenticatorAssuranceLevel(),
  ]);

  if (
    factorsResult.error ||
    assuranceResult.error ||
    !assuranceResult.data
  ) {
    return null;
  }

  const factors =
    mapTotpFactors(
      factorsResult.data,
    );

  const verifiedFactors =
    getVerifiedTotpFactors(
      factorsResult.data,
    );

    const currentLevel =
    normalizeAssuranceLevel(
      assuranceResult.data
        .currentLevel,
    );

  const nextLevel =
    normalizeAssuranceLevel(
      assuranceResult.data
        .nextLevel,
    );

  return {
    currentLevel,
    nextLevel,
    factors,
    verifiedFactors,
    requiresChallenge:
      verifiedFactors.length > 0 &&
      currentLevel !== "aal2" &&
      nextLevel === "aal2",
  };
}
