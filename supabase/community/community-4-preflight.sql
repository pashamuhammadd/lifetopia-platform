with checks as (
  select 1 check_order, 'profiles exists' check_name, 'true' expected, (to_regclass('public.profiles') is not null)::text actual
  union all select 2, 'community posts exist', 'true', (to_regclass('public.community_posts') is not null)::text
  union all select 3, 'community comments exist', 'true', (to_regclass('public.community_comments') is not null)::text
  union all select 4, 'community likes exist', 'true', (to_regclass('public.community_likes') is not null)::text
  union all select 5, 'likes have timestamps for daily progress', 'true', exists(select 1 from information_schema.columns where table_schema='public' and table_name='community_likes' and column_name='created_at')::text
  union all select 6, 'comments have timestamps for daily progress', 'true', exists(select 1 from information_schema.columns where table_schema='public' and table_name='community_comments' and column_name='created_at')::text
  union all select 7, 'posts have timestamps for daily progress', 'true', exists(select 1 from information_schema.columns where table_schema='public' and table_name='community_posts' and column_name='created_at')::text
  union all select 8, 'Harmony is not already installed', 'true', (to_regclass('public.harmony_accounts') is null)::text
)
select check_order, check_name, expected, actual, expected = actual passed from checks order by check_order;
