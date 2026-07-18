export type LifetopiaMfaFactorStatus =
  | "verified"
  | "unverified";

export type LifetopiaMfaFactor = {
  id: string;
  friendlyName: string;
  status:
    LifetopiaMfaFactorStatus;
  createdAt: string | null;
  updatedAt: string | null;
};

type UnknownRecord =
  Record<string, unknown>;

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeStatus(
  value: unknown,
): LifetopiaMfaFactorStatus | null {
  if (
    value === "verified" ||
    value === "unverified"
  ) {
    return value;
  }

  return null;
}

function getTotpFactorRecords(
  data: UnknownRecord,
): unknown[] {
  const allFactors =
    Array.isArray(data.all)
      ? data.all.filter(
          (factor) =>
            isRecord(factor) &&
            factor.factor_type ===
              "totp",
        )
      : [];

  const verifiedTotpFactors =
    Array.isArray(data.totp)
      ? data.totp
      : [];

  return [
    ...allFactors,
    ...verifiedTotpFactors,
  ];
}

export function mapTotpFactors(
  data: unknown,
): LifetopiaMfaFactor[] {
  if (!isRecord(data)) {
    return [];
  }

  const factors =
    getTotpFactorRecords(data);

  const seen =
    new Set<string>();

  const mapped:
    LifetopiaMfaFactor[] = [];

  for (const factor of factors) {
    if (!isRecord(factor)) {
      continue;
    }

    const id =
      typeof factor.id ===
        "string"
        ? factor.id
        : "";

    const status =
      normalizeStatus(
        factor.status,
      );

    if (
      !id ||
      !status ||
      seen.has(id)
    ) {
      continue;
    }

    seen.add(id);

    const friendlyName =
      typeof factor.friendly_name ===
        "string" &&
      factor.friendly_name.trim()
        ? factor.friendly_name.trim()
        : "Authenticator";

    mapped.push({
      id,
      friendlyName,
      status,
      createdAt:
        typeof factor.created_at ===
          "string"
          ? factor.created_at
          : null,
      updatedAt:
        typeof factor.updated_at ===
          "string"
          ? factor.updated_at
          : null,
    });
  }

  return mapped;
}

export function getVerifiedTotpFactors(
  data: unknown,
): LifetopiaMfaFactor[] {
  return mapTotpFactors(
    data,
  ).filter(
    (factor) =>
      factor.status ===
      "verified",
  );
}

export function getFactorById(
  data: unknown,
  factorId: string,
): LifetopiaMfaFactor | null {
  return (
    mapTotpFactors(data).find(
      (factor) =>
        factor.id === factorId,
    ) ?? null
  );
}