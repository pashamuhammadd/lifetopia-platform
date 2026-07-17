# Auth 4 Verification Checklist

## Compile

```powershell
pnpm exec tsc -p packages/services/tsconfig.json --noEmit
```

## Repository search

The old rules must no longer remain inside the shared username service:

```powershell
Select-String `
  -Path "packages/services/auth.ts" `
  -Pattern "4-10|a-zA-Z0-9"
```

Expected: no result.

## Manual validation matrix

Expected valid usernames:

```text
pasha_01
_lifetopian
player__
abc1
```

Expected invalid usernames:

```text
abc
PLAYER
player___one
admin
support01
claim_reward
```

Expected valid Display Names:

```text
Pasha Muhammad
Player 01
José
```

Expected invalid Display Names:

```text
P
Pasha✨
Pasha_01
```

Password boundaries:

```text
Abcd123!     valid
abcd123!     missing uppercase
ABCD123!     missing lowercase
Abcdefg!     missing number
Abcd1234     missing symbol
```

Age boundaries must be tested relative to the current date:

- 12 years old: rejected;
- 13–17 years old: accepted and guardian consent required;
- 18 years old: accepted without guardian consent.

## Phase boundary

Auth 4 does not change Register UI yet. The current form is migrated to these
validators during Auth 6 after the secure Registration API exists.
