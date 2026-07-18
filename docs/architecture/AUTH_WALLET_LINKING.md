# Auth 17 — Secure Solana Wallet Linking

## Objective

Auth 17 links one verified Solana public key to one existing Lifetopia World account. It does not create a blockchain transaction, request token approval, access funds, or collect a seed phrase/private key.

Auth 18 may later use the verified identity for wallet login. Auth 17 itself does not create a Supabase session from a wallet signature.

## Identity rules

- Chain: `solana` only.
- One Solana wallet per Lifetopia account.
- One Lifetopia account per Solana address.
- Solana addresses remain case-sensitive and are never lowercased.
- The browser must sign the exact server-generated message.
- A challenge expires after five minutes and may be consumed once.
- An account with verified MFA must have an AAL2 session before linking or unlinking.
- The account must be active, email-verified, legally current, and have a permanent username.
- Authenticated clients can read only their own linked wallet and audit events.
- Only the website service role can create challenges, finalize links, or unlink wallets.

## Request sequence

1. The authenticated browser explicitly chooses Phantom or Solflare. The application resolves only the selected provider namespace and never falls back to a generic `window.solana` provider.
2. `POST /api/auth/wallet/challenge` validates the public key, account security level, origin, uniqueness, and rate limit.
3. The server stores a short-lived challenge and returns the exact human-readable message.
4. The wallet signs the message with Ed25519.
5. `POST /api/auth/wallet/verify` loads the original private challenge and verifies the signature against the public key.
6. `finalize_solana_wallet_link` locks and consumes the challenge, repeats account/uniqueness checks, creates the identity, and appends an immutable audit event in one transaction.

## Database objects

- `public.account_wallets`: verified wallet identity.
- `public.wallet_link_challenges`: private short-lived proof requests.
- `public.wallet_security_events`: append-only successful link/unlink audit.
- `public.finalize_solana_wallet_link`: service-role-only atomic finalization.
- `public.unlink_solana_wallet`: service-role-only removal owned by the requesting user.
- `public.cleanup_wallet_link_challenges`: removes consumed/expired challenges after one day.

## Website files

- `/account/wallet`: authenticated wallet settings page.
- `/api/auth/wallet/challenge`: creates signing proof.
- `/api/auth/wallet/verify`: verifies Ed25519 proof and links.
- `/api/auth/wallet/unlink`: removes the authenticated user's wallet after explicit confirmation.
- `WalletLinkingPanel`: explicit Phantom/Solflare chooser; unrelated injected providers such as Trust Wallet are never selected automatically.

## Required existing environment

The website already needs the Supabase public URL, anon key, and service-role key used by `@repo/lib/supabase/admin`. Do not expose the service-role key through a `NEXT_PUBLIC_` variable or commit it.

`NEXT_PUBLIC_SITE_URL=https://lifetopiaworld.io` is recommended. The API also validates the request's same origin.

## Dependencies

Install into the website workspace:

```powershell
pnpm --filter website add tweetnacl bs58
```

- `tweetnacl` verifies the detached Ed25519 signature.
- `bs58` validates and decodes Solana public keys.

## Required execution order

1. Run `supabase/auth/auth-17-preflight.sql`; require 12/12 `true`.
2. Run `supabase/auth/auth-17-wallet-linking.sql` exactly once.
3. Run `supabase/auth/auth-17-verify.sql`; require 21/21 `true`.
4. Install dependencies and build the website.
5. Deploy the website.
6. Sign in as `pashamuhammad` and open `/account/wallet`.
7. Complete AAL2 if requested, connect the intended Solana wallet, and approve only the displayed message signature.
8. Reload the page and confirm the same shortened address remains `Verified`.
9. Run `supabase/auth/auth-17-live-wallet-verify.sql`; require 10/10 `true`.

## Manual negative checks

- Reject a malformed/non-Solana address.
- Reject a modified signature or message.
- Reject challenge replay after a successful link.
- Reject an expired challenge.
- Reject linking a second wallet to the same account.
- Reject linking the same address to another account.
- Redirect an MFA-protected AAL1 session to `/mfa-challenge`.
- Ensure direct authenticated inserts/updates/deletes on `account_wallets` fail.

## Operational warning

Never paste a seed phrase, private key, service-role key, SMTP password, or wallet signing secret into SQL, source control, browser logs, or support messages. A legitimate Auth 17 request is a plain-text signature only.
