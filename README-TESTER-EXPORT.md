# CommunityHub closed tester CSV

## Play Console form

Use this list name:

`CommunityHub Closed Testers`

## Generate the CSV

1. Open Supabase Dashboard > SQL Editor.
2. Run `supabase/communityhub-play-testers.sql`.
3. Export the result as CSV, for example to:
   `C:\Users\mochn\Downloads\supabase-community-users.csv`
4. From the `lifetopia-platform` root, run:

```powershell
.\scripts\convert-supabase-testers-csv.ps1 `
  -InputCsv "$HOME\Downloads\supabase-community-users.csv"
```

The generated Play Console file is:

`C:\Users\mochn\Downloads\communityhub-closed-testers.csv`

Upload that file using **Upload file CSV** in Play Console. It contains one
email address per line, no header, no comma, and no UTF-8 BOM.

Uploading a CSV replaces addresses already typed into the current Play Console
email list. Review the generated file before uploading it.

Only include people who have agreed to participate and whose address is linked
to the Google account they use in Google Play.
