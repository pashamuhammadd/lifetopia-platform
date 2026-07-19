with checks as (
  select 1 check_order, 'deletion receipts table exists' check_name,
    to_regclass('public.account_deletion_receipts') is not null passed
  union all select 2, 'self-delete function exists',
    to_regprocedure('public.delete_my_lifetopia_account(text)') is not null
  union all select 3, 'anonymous cannot execute deletion',
    not has_function_privilege('anon', 'public.delete_my_lifetopia_account(text)', 'execute')
  union all select 4, 'authenticated users can request their own deletion',
    has_function_privilege('authenticated', 'public.delete_my_lifetopia_account(text)', 'execute')
  union all select 5, 'receipts are not readable by authenticated users',
    not has_table_privilege('authenticated', 'public.account_deletion_receipts', 'select')
  union all select 6, 'profiles still cascade from auth users', exists (
    select 1 from pg_constraint c
    where c.conrelid = 'public.profiles'::regclass
      and c.confrelid = 'auth.users'::regclass
      and c.contype = 'f' and c.confdeltype = 'c'
  )
  union all select 7, 'Founder registry still restricts profile deletion', exists (
    select 1 from pg_constraint c
    where c.conrelid = 'public.lifetopia_founder_registry'::regclass
      and c.confrelid = 'public.profiles'::regclass
      and c.contype = 'f' and c.confdeltype = 'r'
  )
  union all select 8, 'moderation audit trigger remains installed', exists (
    select 1 from pg_trigger t
    where t.tgrelid = 'public.community_moderation_events'::regclass
      and t.tgname = 'protect_community_moderation_event_before_change'
      and not t.tgisinternal
  )
)
select check_order, check_name, passed
from checks
order by check_order;
