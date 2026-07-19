# CommunityHub Phase 7 — Notifications & Guild

## Notifications v1

- Only official announcements and direct comment replies are generated.
- Self-replies do not notify the author.
- `(recipient, dedupe_key)` prevents duplicates.
- Users can read only their own notifications and mark one/all as read through RPC.
- Navbar unread badge is based on real unread rows.
- Founder/Admin/Moderator publish official announcements from `/admin/announcements`; one notification is created for every current profile.

## Guild v1

- Guild profiles and active membership are public.
- Login is required to create, join, leave, or review a request.
- One account may own one guild in v1.
- Join policy can be open or owner approval.
- Owners cannot leave until a future ownership-transfer flow exists.
- Guild quests and game synchronization remain later integrations; no fabricated stats are shown.

## Install

```powershell
$zip = Get-ChildItem "$HOME\Downloads\lifetopia-community-7-notifications-guild*.zip" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Expand-Archive -LiteralPath $zip.FullName -DestinationPath "." -Force
```

Run SQL in order:

1. `community-7-preflight.sql` — 7 checks pass.
2. `community-7-notifications-guild.sql` — succeeds once.
3. `community-7-verify.sql` — 14 checks pass.

## Validate

```powershell
node scripts/verify-community-phase-7.mjs
pnpm --filter community check-types
pnpm --filter community build
```

Manual test:

1. Reply from account B to account A's comment; only A receives one notification.
2. Mark all read and confirm navbar badge becomes zero.
3. Founder publishes from `/admin/announcements`; all current profiles receive one official notification.
4. Guest opens `/guild` and a guild detail page.
5. Account A creates an approval guild; account B requests membership; owner approves it.
6. Open-policy guild joins immediately; member may leave; owner cannot leave.
7. Test notification cards, unread badge, guild cards, forms, and controls on mobile.

## Push

```powershell
pnpm docs:generate
git status --short
git add apps/community supabase/community scripts/verify-community-phase-7.mjs docs
git commit -m "feat(community): add notifications and guild membership"
git push origin main
```
