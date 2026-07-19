# CommunityHub 10.3 — account deletion

The public Play Console deletion URL is:

`https://community.lifetopiaworld.io/account-deletion`

The same route is linked inside authenticated CommunityHub navigation. A user must type `DELETE`; the database transaction blocks Founder/admin/moderator accounts, anonymizes moderation references, removes explicitly unlinked wallet audit rows and owned guilds, then deletes the Supabase Auth user. Existing cascades remove profile-linked content and private data.

Never test this with the Founder account. Create a disposable ordinary account, add representative content, run the SQL verifier first, delete through the UI, and confirm the user can no longer sign in.
