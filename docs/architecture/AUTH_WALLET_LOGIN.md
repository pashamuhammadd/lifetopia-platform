# Auth 18 — Secure Solana Wallet Login

## Objective

Auth 18 lets an existing Lifetopia World account start a Supabase session by proving control of the Solana wallet verified during Auth 17. It does not create accounts, link wallets, create blockchain transactions, request token approvals, or bypass account access/MFA rules.

## Authentication sequence

1. A signed-out user opens `/wallet-login` and explicitly chooses Phantom or Solflare.
2. The browser obtains the selected public key and requests a server challenge.
3. The server validates the public-key shape, applies per-address and hashed-request-fingerprint rate limits, and stores a five-minute single-use challenge. It deliberately returns the same challenge shape whether or not the address is linked, preventing address-linkage enumeration before ownership proof.
4. The wallet signs the exact human-readable login message with Ed25519.
5. The server reloads the private challenge and verifies the detached signature against the submitted Solana public key.
6. Only after valid ownership proof, `finalize_solana_wallet_login` resolves the linked wallet, locks and consumes the challenge, verifies the wallet/account relationship, rechecks account access state, and records `proof_verified`.
7. The service role loads the associated Supabase Auth user and internally generates a one-time magic-link hash. No email is sent and no action link/token is returned to the browser.
8. The cookie-aware server client immediately verifies that one-time hash and writes the normal Supabase session cookies.
9. `record_solana_wallet_login_result` appends `session_issued` or `session_failed`. A successful result updates `last_login_at` and `wallet_login_count`.
10. If the account has verified MFA, the new session remains AAL1 and redirects to `/mfa-challenge` before the requested destination.

## Security boundaries

- Only wallets linked by Auth 17 can authenticate.
- Solana public keys stay case-sensitive.
- Challenges expire after five minutes and are consumed once.
- Unlinked and linked addresses receive indistinguishable challenge responses before signature verification.
- Challenge creation is constrained per address and per hashed network/browser fingerprint to limit database abuse without storing raw IP addresses.
- Challenge and finalization tables are inaccessible to `anon` and `authenticated` database roles.
- Finalization and session-result functions are executable only by `service_role`.
- Browser origin is checked for both challenge and verification requests.
- Redirect destinations pass existing Lifetopia redirect sanitization.
- Suspended/inactive, unverified, legally stale, or temporary-username accounts are rejected before session exchange.
- Phantom and Solflare are resolved by their provider-specific namespaces/flags. A generic `window.solana` fallback is never used.
- Wallet proof establishes only the first factor. It cannot satisfy TOTP MFA.
- Audit rows are immutable.

## Database objects

- `public.wallet_login_challenges`
- `public.wallet_login_events`
- `public.finalize_solana_wallet_login`
- `public.record_solana_wallet_login_result`
- `public.cleanup_wallet_login_challenges`
- `account_wallets.last_login_at`
- `account_wallets.wallet_login_count`

## Website objects

- `/wallet-login`
- `/api/auth/wallet-login/challenge`
- `/api/auth/wallet-login/verify`
- `WalletLoginPanel`
- `WalletLoginEntryLink` reusable entry button for the existing login screen
- `wallet-login.ts`

Auth 18 uses the `tweetnacl` and `bs58` dependencies installed during Auth 17. No additional package is required.

## Required environment

The website server must retain its existing Supabase URL, anon key, and service-role key. The service-role key must never use a `NEXT_PUBLIC_` name or be returned/logged in browser responses.

Recommended public origin:

```text
NEXT_PUBLIC_SITE_URL=https://lifetopiaworld.io
```

## Required execution order

1. Run `auth-18-preflight.sql`; require 14/14 `true`.
2. Run `auth-18-wallet-login.sql` exactly once.
3. Run `auth-18-verify.sql`; require 22/22 `true`.
4. Build the website and full monorepo.
5. Start the website locally.
6. Sign out of `pashamuhammad` completely.
7. Open `/wallet-login?next=/dashboard`.
8. Select the provider containing the already-linked wallet.
9. Approve only the human-readable signature request.
10. Confirm redirection to the MFA challenge.
11. Complete TOTP and confirm the dashboard opens as `pashamuhammad`.
12. Run `auth-18-live-wallet-login-verify.sql`; require 11/11 `true`.

## Manual negative checks

- An unlinked address receives only a generic unavailable response.
- A modified signature is rejected.
- Replaying a consumed challenge is rejected.
- An expired challenge is rejected.
- A signed-in user cannot start a different wallet login without signing out.
- A malformed or external `next` value cannot create an open redirect.
- Trust Wallet does not open when Phantom or Solflare is selected.
- Founder wallet proof redirects to MFA rather than directly entering the dashboard.

## Operational warning

Never paste a seed phrase, private key, service-role key, generated action link, magic-link hash, SMTP password, or wallet signature into logs, SQL, source control, or support messages. The user should see only a wallet message-signature prompt.
