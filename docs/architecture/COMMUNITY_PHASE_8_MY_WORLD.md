# Community Phase 8 — My World

My World is the authenticated account dashboard. It only exposes real data already owned by CommunityHub and Auth: profile identity, off-chain Harmony progression, linked Solana wallet status, posts/follows, daily quest claims, guild memberships, and recent community/Harmony activity.

## Truth boundary

- Harmony Level is CommunityHub progression. It is not Unity character level or game XP.
- Unity level, game XP, inventory, currency, achievements, rare items, character statistics, and gameplay time are intentionally absent until a signed game-sync contract and real data source exist.
- The dashboard never creates placeholder player statistics.
- Wallet information is fetched only for the authenticated account through a private RPC.

## Install

Run in order:

1. `community-8-preflight.sql` — expect 10 passed.
2. `community-8-my-world.sql` — expect success/no rows.
3. `community-8-verify.sql` — expect 12 passed.

Then run:

```powershell
node scripts/verify-community-phase-8.mjs
pnpm --filter community check-types
pnpm --filter community build
```

## Manual acceptance

- Guest opening `/my-world` is sent to login and returns after authentication.
- Identity matches the authenticated profile and links to the real public profile.
- Harmony matches `/quest` and explicitly says it is not Unity progress.
- Wallet state matches `/wallet`; full address is not printed in the dashboard UI.
- Posts/follow counts match the public profile.
- Daily claim count changes after claiming a quest.
- Active and pending guild memberships match `/guild`.
- Recent activity contains only real posts and private Harmony ledger events.
- Mobile layout has no horizontal overflow and retains bottom navigation spacing.
