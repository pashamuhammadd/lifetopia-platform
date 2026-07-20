# CommunityHub tester registration

Public route:

`https://community.lifetopiaworld.io/become-a-tester`

## Installation order

1. Extract this package into the `lifetopia-platform` root.
2. Run `supabase/community/community-11-play-testers.sql` in Supabase SQL Editor.
3. Run `supabase/community/community-11-play-testers-verify.sql`; all six checks must be `true`.
4. Run the CommunityHub type check and production build.
5. Deploy and submit a real test registration.

## Export

Run `supabase/community/community-11-play-testers-export.sql`, export the result
from Supabase as CSV, and convert it with the existing command:

```powershell
.\scripts\convert-supabase-testers-csv.ps1 `
  -InputCsv "$HOME\Downloads\communityhub-tester-export.csv"
```

Upload the resulting `communityhub-closed-testers.csv` to the existing
`CommunityHub Closed Testers` list in Play Console. The export intentionally
includes previously exported and invited testers because uploading a CSV
replaces the current contents of the Play Console email list.

## Privacy and operations

- The table has forced RLS and no public read policy.
- Only the narrowly scoped registration function is executable publicly.
- Consent and its timestamp are stored with every registration.
- Registrations are deduplicated using normalized lowercase email addresses.
- Change a record to `withdrawn` or `rejected` to exclude it from future exports.
- Before inviting someone, confirm that the email belongs to the Google Account
  they use in Google Play.
