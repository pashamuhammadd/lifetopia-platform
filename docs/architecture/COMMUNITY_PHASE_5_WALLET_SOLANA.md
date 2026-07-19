# CommunityHub Phase 5 — Wallet & Solana

## Security boundary

CommunityHub reuses the verified `account_wallets` identity from Auth 17. It does not implement another signing flow, accept arbitrary addresses, expose wallet mutation, or request transactions. Link/unlink remains at `https://lifetopiaworld.io/account/wallet`, protected by the main account session and MFA rules.

## Harmony reward

- A currently linked and audited Solana wallet is required.
- Explicit user claim awards exactly `+500 Harmony` once per Lifetopia account.
- `level_floor` becomes at least 5. Level 5+ accounts keep their higher level.
- Unlinking later does not erase earned points; relinking cannot claim again.
- The immutable reward key is `solana-wallet-verification` in the private Harmony ledger.

## Install

```powershell
$zip = Get-ChildItem "$HOME\Downloads\lifetopia-community-5-wallet-solana*.zip" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1
Expand-Archive -LiteralPath $zip.FullName -DestinationPath "." -Force
```

Run in Supabase SQL Editor:

1. `community-5-preflight.sql` — 8 checks must pass.
2. `community-5-wallet-solana.sql` — must succeed once.
3. `community-5-verify.sql` — 12 checks must pass.

## Validate

```powershell
node scripts/verify-community-phase-5.mjs
pnpm --filter community check-types
pnpm --filter community build
```

Manual checks:

1. Logged-out `/wallet` redirects to main login and returns to CommunityHub.
2. An account without a wallet sees the secure main-site linking action and no claim button.
3. A verified wallet shows its shortened address and verification time.
4. Claim adds exactly 500, sets minimum Level 5, and creates one Harmony history row.
5. A second claim adds nothing.
6. On mobile, wallet cards stack and primary buttons span the available width.

## Push

```powershell
pnpm docs:generate
git status --short
git add apps/community supabase/community scripts/verify-community-phase-5.mjs docs
git commit -m "feat(community): add verified wallet Harmony rewards"
git push origin main
```
