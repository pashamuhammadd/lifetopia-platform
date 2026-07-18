-- Lifetopia Authentication
-- Auth 11 — Login anti-abuse preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

select
  check_order,
  check_name,
  expected,
  actual,
  passed
from (
  select
    1 as check_order,
    'Auth 10 account access functions exist'
      as check_name,
    '2' as expected,
    count(*)::text as actual,
    count(*) = 2 as passed
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname in (
      'complete_lifetopia_legal_reconsent',
      'complete_lifetopia_required_username_selection'
    )

  union all

  select
    2,
    'login-attempt audit table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_auth_attempts'

  union all

  select
    3,
    'login reservation function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'reserve_lifetopia_login_attempt'

  union all

  select
    4,
    'login completion function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'complete_lifetopia_login_attempt'

  union all

  select
    5,
    'auth user and profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    6,
    'public and private profile counts match',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    7,
    'authenticated users cannot read Auth users',
    'false',
    has_table_privilege(
      'authenticated',
      'auth.users',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'auth.users',
      'SELECT'
    )

  union all

  select
    8,
    'exact date of birth remains private',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name in (
      'profiles',
      'public_profiles'
    )
    and column_name =
      'date_of_birth'
) checks
order by check_order;
