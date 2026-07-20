-- Run only in Supabase SQL Editor as an authorized project administrator.
-- Export the result as CSV, then run scripts/convert-supabase-testers-csv.ps1.
-- Keep all active statuses here because uploading a Play Console CSV replaces
-- the existing addresses in that email list.

select email
from public.community_play_testers
where consent = true
  and status in ('pending', 'exported', 'invited', 'joined')
order by created_at, email;
