with checks as (
  select 1 as check_order, 'community_follows table exists' as check_name, 'true' as expected,
    (to_regclass('public.community_follows') is not null)::text as actual
  union all select 2, 'row level security is enabled', 'true', coalesce((
    select relrowsecurity from pg_class where oid = 'public.community_follows'::regclass
  ), false)::text
  union all select 3, 'self follow constraint exists', '1', count(*)::text
    from pg_constraint where conrelid = 'public.community_follows'::regclass
      and conname = 'community_follows_not_self'
  union all select 4, 'follow RLS policies exist', '3', count(*)::text
    from pg_policies where schemaname = 'public' and tablename = 'community_follows'
  union all select 5, 'follow toggle RPC exists', 'true',
    (to_regprocedure('public.toggle_community_follow(uuid)') is not null)::text
  union all select 6, 'profile follow-state RPC exists', 'true',
    (to_regprocedure('public.get_community_profile_follow_state(uuid)') is not null)::text
  union all select 7, 'profile search RPC exists', 'true',
    (to_regprocedure('public.search_community_profiles(text,integer,integer)') is not null)::text
  union all select 8, 'post search RPC exists', 'true',
    (to_regprocedure('public.search_community_posts(text,integer,integer)') is not null)::text
  union all select 9, 'connections RPC exists', 'true',
    (to_regprocedure('public.get_community_profile_connections(uuid,text,integer,integer)') is not null)::text
  union all select 10, 'no self-follow rows exist', '0', count(*)::text
    from public.community_follows where follower_id = followed_id
  union all select 11, 'all follow identities resolve to profiles', '0', count(*)::text
    from public.community_follows f
    left join public.profiles a on a.id = f.follower_id
    left join public.profiles b on b.id = f.followed_id
    where a.id is null or b.id is null
  union all select 12, 'auth user and profile counts remain equal',
    (select count(*)::text from auth.users), (select count(*)::text from public.profiles)
)
select check_order, check_name, expected, actual, expected = actual as passed
from checks order by check_order;
