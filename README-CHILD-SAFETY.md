# CommunityHub child-safety page

This package adds the public route:

`https://community.lifetopiaworld.io/child-safety`

## Install

Extract this ZIP into the root of `lifetopia-platform`, then run:

```powershell
pnpm --filter community check-types
pnpm --filter community build
```

Deploy the CommunityHub project and confirm the route opens without signing in.

## Google Play Console

Use this value for **Safety standards URL**:

`https://community.lifetopiaworld.io/child-safety`

The page currently uses `mochnuribrahimpasha@gmail.com` as the designated child-safety contact. Replace the `safetyEmail` constant in `apps/community/app/child-safety/page.tsx` when a dedicated `safety@lifetopiaworld.io` inbox is available.

Only confirm the Play Console in-app reporting statement when the deployed CommunityHub report controls allow users to report accounts and user-generated content.
