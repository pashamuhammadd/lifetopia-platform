-- CommunityHub closed-testing candidate export
-- Run this in Supabase Dashboard > SQL Editor.
--
-- IMPORTANT:
-- 1. Only use an address after its owner has agreed to join the Google Play test.
-- 2. The email must be associated with the tester's Google Play account.
-- 3. Export the result as CSV and keep the original header. The included
--    PowerShell script will remove that header safely for Google Play.

select distinct lower(trim(email)) as email
from auth.users
where email is not null
  and trim(email) <> ''
  and email_confirmed_at is not null
  and deleted_at is null
  and coalesce(is_anonymous, false) = false
order by email;
