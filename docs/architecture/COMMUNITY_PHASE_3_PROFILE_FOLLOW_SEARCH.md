# CommunityHub Phase 3 — Profile, Follow & Search

## Outcome

- Public profile pages show live post, follower, and following counts.
- Guests can read profiles, connection lists, and Explore results.
- Follow/unfollow requires an authenticated shared Lifetopia session.
- Self-follow and duplicate follow edges are rejected by the database.
- Explore searches real public profiles and posts with bounded pagination.

## Install

From the `lifetopia-platform` root in PowerShell:

```powershell
$zip = Get-ChildItem "$HOME\Downloads\lifetopia-community-3-profile-follow-search*.zip" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

Expand-Archive `
  -LiteralPath $zip.FullName `
  -DestinationPath "." `
  -Force
```

## Supabase SQL Editor

Run and inspect each result before continuing:

1. `supabase/community/community-3-preflight.sql` — all rows must be `true`.
2. `supabase/community/community-3-profile-follow-search.sql` — should finish successfully.
3. `supabase/community/community-3-verify.sql` — all 12 rows must be `true`.

If Phase 3 was partially installed before, preflight check 5 may be false. Do not re-run blindly; inspect the existing table first.

## Validation

```powershell
node scripts/verify-community-phase-3.mjs
pnpm --filter community check-types
pnpm --filter community build
```

Manual checks:

1. As guest, open `/explore`, search posts and Lifetopians, and open a public profile.
2. As guest, press Follow and confirm the existing authentication modal opens.
3. Sign in, follow another account, refresh, and confirm counts plus Following state persist.
4. Open `/user/{username}/followers` and `/user/{username}/following`.
5. Unfollow and confirm both connection lists/counts update.

## Before GitHub push

```powershell
pnpm docs:generate
git status --short
git add apps/community supabase/community scripts/verify-community-phase-3.mjs docs
git commit -m "feat(community): add profiles follows and real search"
git push origin main
```

Do not commit if SQL verification, type checking, build, or manual guest/auth checks fail.
