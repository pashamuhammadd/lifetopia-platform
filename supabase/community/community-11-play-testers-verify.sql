with checks as (
  select 1 as check_order,
         'tester table exists' as check_name,
         (to_regclass('public.community_play_testers') is not null) as passed
  union all
  select 2,
         'registration function exists',
         (to_regprocedure('public.register_community_play_tester(text,boolean)') is not null)
  union all
  select 3,
         'row level security is enabled and forced',
         coalesce((
           select relrowsecurity and relforcerowsecurity
           from pg_class
           where oid = 'public.community_play_testers'::regclass
         ), false)
  union all
  select 4,
         'anonymous users cannot read tester emails',
         not has_table_privilege('anon', 'public.community_play_testers', 'select')
  union all
  select 5,
         'authenticated users cannot read tester emails',
         not has_table_privilege('authenticated', 'public.community_play_testers', 'select')
  union all
  select 6,
         'anonymous registration RPC is available',
         has_function_privilege(
           'anon',
           'public.register_community_play_tester(text,boolean)',
           'execute'
         )
)
select check_order, check_name, passed
from checks
order by check_order;
