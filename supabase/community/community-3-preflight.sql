-- Community Phase 3 preflight. Read-only; safe to run repeatedly.
with checks as (
  select 1 as check_order, 'profiles table exists' as check_name,
    'true' as expected, (to_regclass('public.profiles') is not null)::text as actual
  union all
  select 2, 'community_posts table exists', 'true',
    (to_regclass('public.community_posts') is not null)::text
  union all
  select 3, 'profile identity uses profiles.id', 'true', exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'id'
  )::text
  union all
  select 4, 'username is available for public discovery', 'true', exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'username'
  )::text
  union all
  select 5, 'community_follows is not already installed', 'true',
    (to_regclass('public.community_follows') is null)::text
)
select check_order, check_name, expected, actual, expected = actual as passed
from checks
order by check_order;
