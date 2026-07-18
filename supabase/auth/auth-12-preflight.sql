-- Lifetopia Authentication
-- Auth 12 — Password recovery preflight
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
    'Auth 11 login anti-abuse table exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_auth_attempts'

  union all

  select
    2,
    'password-reset request table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_password_reset_requests'

  union all

  select
    3,
    'password-reset creation function does not exist yet',
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
      'create_lifetopia_password_reset_request'

  union all

  select
    4,
    'password-reset preview function does not exist yet',
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
      'preview_lifetopia_password_reset'

  union all

  select
    5,
    'password-reset completion function does not exist yet',
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
      'complete_lifetopia_password_reset'

  union all

  select
    6,
    'auth user and public profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

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
