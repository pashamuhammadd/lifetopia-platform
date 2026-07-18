import bs58 from "bs58";

export const WALLET_CHAIN =
  "solana" as const;

export const WALLET_CHALLENGE_TTL_MS =
  5 * 60 * 1000;

export const WALLET_CHALLENGE_LIMIT =
  5;

export const WALLET_CHALLENGE_WINDOW_MS =
  10 * 60 * 1000;

export type LinkedSolanaWallet = {
  id: string;
  address: string;
  linkedAt: string;
  lastVerifiedAt: string;
};

export function normalizeSolanaAddress(
  value: unknown,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const address = value.trim();

  if (
    address.length < 32 ||
    address.length > 44
  ) {
    return null;
  }

  try {
    const decoded =
      bs58.decode(address);

    if (
      decoded.length !== 32 ||
      bs58.encode(decoded) !== address
    ) {
      return null;
    }

    return address;
  } catch {
    return null;
  }
}

export function isUuid(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

export function hasTrustedWalletOrigin(
  request: Request,
): boolean {
  const originHeader =
    request.headers.get("origin");

  if (!originHeader) {
    return false;
  }

  let origin: string;

  try {
    origin =
      new URL(originHeader).origin;
  } catch {
    return false;
  }

  const allowed = new Set<string>();

  try {
    allowed.add(
      new URL(request.url).origin,
    );
  } catch {
    return false;
  }

  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    try {
      allowed.add(
        new URL(
          configuredSiteUrl,
        ).origin,
      );
    } catch {
      // A malformed optional URL must not
      // expand the trusted-origin set.
    }
  }

  return allowed.has(origin);
}

export function buildWalletLinkMessage({
  address,
  accountId,
  nonce,
  requestId,
  origin,
  issuedAt,
  expiresAt,
}: {
  address: string;
  accountId: string;
  nonce: string;
  requestId: string;
  origin: string;
  issuedAt: string;
  expiresAt: string;
}): string {
  const hostname =
    new URL(origin).hostname;

  return [
    `${hostname} wants you to link your Solana wallet:`,
    address,
    "",
    "Link this wallet to your Lifetopia World account. This request does not create a transaction or request access to funds.",
    "",
    `URI: ${origin}/account/wallet`,
    "Version: 1",
    "Chain ID: solana:mainnet",
    `Lifetopia Account: ${accountId}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
    `Expiration Time: ${expiresAt}`,
    `Request ID: ${requestId}`,
  ].join("\n");
}
