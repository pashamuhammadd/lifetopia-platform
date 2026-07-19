# CommunityHub Phase 4 — Quest & Harmony

## Rules implemented

- Harmony is an off-chain Lifetopia account point, not `$ROYAL` and not an on-chain balance.
- One identity is shared by website, CommunityHub, and later game synchronization.
- The Daily Community Quest bundle awards `+20 Harmony` once per UTC day.
- Tasks: visit quest board, read 3 different posts, like 5 different posts, write a comment of at least 20 characters, and create a post of at least 40 characters.
- Views are unique per user/post/day. Claim and ledger keys are idempotent.
- Clients cannot directly change balances or ledger entries.
- Reward history is private to its owner. Public accounts expose only total points for social/profile use.
- Wallet verification `+500 Harmony` and minimum Level 5 remains reserved for Phase 5 integration.

## Installation

From the repository root:

```powershell
$zip = Get-ChildItem "$HOME\Downloads\lifetopia-community-4-quest-harmony*.zip" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

Expand-Archive `
  -LiteralPath $zip.FullName `
  -DestinationPath "." `
  -Force
```

Run in Supabase SQL Editor, in order:

1. `supabase/community/community-4-preflight.sql` — 8 rows must pass.
2. `supabase/community/community-4-quest-harmony.sql` — must complete successfully.
3. `supabase/community/community-4-verify.sql` — 12 rows must pass.

## Validation

```powershell
node scripts/verify-community-phase-4.mjs
pnpm --filter community check-types
pnpm --filter community build
```

Manual production-style test:

1. Open `/quest` while logged out; confirm redirect to the main Lifetopia login and return to `/quest`.
2. Open `/quest` logged in; Visit progress becomes `1/1`.
3. Open three different `/post/{postId}` pages and remain on each at least 1.5 seconds.
4. Like five different posts, add a comment of at least 20 characters, and create a post of at least 40 characters.
5. Refresh `/quest`; all five tasks must be complete.
6. Claim once; balance and private history increase by exactly 20.
7. Claim again; balance must not increase.
8. Confirm sidebar no longer shows fabricated `240 / 500 XP`.

## GitHub push

Only after SQL verification, type check, build, and manual claim test succeed:

```powershell
pnpm docs:generate
git status --short
git add apps/community supabase/community scripts/verify-community-phase-4.mjs docs
git commit -m "feat(community): add daily quests and Harmony ledger"
git push origin main
```
