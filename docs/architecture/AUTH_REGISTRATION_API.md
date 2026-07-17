# Auth 5 — Secure Registration API

## Endpoint

```text
POST /api/auth/register
```

The endpoint is server-only and uses the shared Auth 4 validator before any
Supabase user is created.

## Required request

```json
{
  "username": "player_01",
  "displayName": "Player 01",
  "email": "player@example.com",
  "password": "StrongPass1!",
  "confirmPassword": "StrongPass1!",
  "avatarId": "avatar-01",
  "dateOfBirth": "2000-01-01",
  "countryCode": "ID",
  "countryName": "Indonesia",
  "gender": "male",
  "termsAccepted": true,
  "privacyAccepted": true,
  "termsVersion": "2026.07.18",
  "privacyVersion": "2026.07.18",
  "next": "/"
}
```

## Processing order

1. Validate origin, JSON content type, and body size.
2. Normalize and validate every registration field.
3. Load active Terms and Privacy versions from Supabase.
4. Reject stale legal-document versions.
5. Check the normalized username.
6. Create an unconfirmed Auth user through the server admin client.
7. Let the canonical Auth trigger create public and private profile rows.
8. Atomically record both legal consents through
   `complete_lifetopia_registration`.
9. Clear `legal_reconsent_required` for the new account.
10. Remove the newly created Auth user if registration finalization fails.

## Security boundary

- The secret/service-role key is read only by server code.
- Passwords are never logged or returned.
- Raw Supabase errors are not returned.
- Email or username conflicts use one generic account-conflict response.
- No session is created after registration.
- Email remains unconfirmed.
- Auth 7 will implement confirmation-email delivery and resend behavior.
- Auth 11 will add persistent rate limiting and suspicious-request CAPTCHA.

## Current activation state

Auth 5 adds the endpoint but does not modify the current Register UI.
Auth 6 will migrate the form to this endpoint.

Do not disable public Supabase signup until the Register UI has been migrated
and production-tested.
