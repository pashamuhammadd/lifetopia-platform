# CommunityHub Phase 6 — Moderation & Admin

## Scope

- Existing post/comment report flow is retained.
- Founder, Admin, and Moderator may access `/admin/reports`.
- Decisions run through one database RPC; clients cannot directly write sanctions or audit events.
- Content removal is reversible soft-hide. Restrictive RLS hides moderated content from guest/feed queries automatically.
- Mute (24h), suspend (7d), ban, lift restriction, hide, restore, review, and dismiss are available.
- Restricted identities cannot insert or update posts/comments, enforced by database triggers.
- Account owners can read the exact status, reason, and expiry at `/account-status`.
- Founder can never be sanctioned. Moderator cannot sanction Admin/Moderator; Admin cannot sanction another Admin. Founder retains highest authority.
- Audit events cannot be updated or deleted.

This is the Community Moderation panel only. It does not mix Content Admin or Game Operations into the same workspace, and moderators never receive password or private authentication data.

## Install

```powershell
$zip = Get-ChildItem "$HOME\Downloads\lifetopia-community-6-moderation-admin*.zip" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1
Expand-Archive -LiteralPath $zip.FullName -DestinationPath "." -Force
```

Run in Supabase SQL Editor:

1. `community-6-preflight.sql` — 8 checks must pass.
2. `community-6-moderation-admin.sql` — run once and require success.
3. `community-6-verify.sql` — 14 checks must pass.

## Validate

```powershell
node scripts/verify-community-phase-6.mjs
pnpm --filter community check-types
pnpm --filter community build
```

Manual tests:

1. A Lifetopian reports another account's post and comment.
2. Founder opens `/admin/reports`; reporter identity remains private outside this workspace.
3. Add a required reason, hide the content, then confirm a guest cannot load it.
4. Restore it and confirm it is visible again.
5. Mute a non-staff test account; posting/commenting must fail and `/account-status` must show reason and expiry.
6. Lift the restriction and confirm writes work again.
7. Confirm attempts against Founder fail.
8. Test the two-column mobile moderation controls and desktop wrapping layout.

Do not test ban on a real Founder/Admin account. Use a disposable Lifetopian test identity.

## Push

```powershell
pnpm docs:generate
git status --short
git add apps/community supabase/community scripts/verify-community-phase-6.mjs docs
git commit -m "feat(community): add secure moderation and sanctions"
git push origin main
```
