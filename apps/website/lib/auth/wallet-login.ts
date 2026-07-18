export const WALLET_LOGIN_TTL_MS =
  5 * 60 * 1000;

export const WALLET_LOGIN_LIMIT =
  5;

export const WALLET_LOGIN_FINGERPRINT_LIMIT =
  20;

export const WALLET_LOGIN_WINDOW_MS =
  10 * 60 * 1000;

export function buildWalletLoginMessage({
  address,
  nonce,
  requestId,
  origin,
  issuedAt,
  expiresAt,
}: {
  address: string;
  nonce: string;
  requestId: string;
  origin: string;
  issuedAt: string;
  expiresAt: string;
}): string {
  const hostname =
    new URL(origin).hostname;

  return [
    `${hostname} wants you to sign in with your Solana wallet:`,
    address,
    "",
    "Sign in to your existing Lifetopia World account. This request does not create a transaction or request access to funds.",
    "",
    `URI: ${origin}/wallet-login`,
    "Version: 1",
    "Chain ID: solana:mainnet",
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
    `Expiration Time: ${expiresAt}`,
    `Request ID: ${requestId}`,
  ].join("\n");
}
