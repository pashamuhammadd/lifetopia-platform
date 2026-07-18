-- Lifetopia Authentication
-- Auth 12 — Verify password recovery
--
-- SAFE: SELECT statements only.
-- Run before the first password reset request.
-- Every row must return passed = true.

select
  check_order,
  check_name,
  expected,
  actual,
  passed
from (
  select
    1 as check_order,
    'password-reset request table exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_password_reset_requests'

  union all

  select
    2,
    'password-reset RLS is enabled',
    'true',
    table_record.relrowsecurity::text,
    table_record.relrowsecurity
  from pg_class table_record
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  where table_namespace.nspname =
      'public'
    and table_record.relname =
      'account_password_reset_requests'

  union all

  select
    3,
    'anonymous cannot read password-reset requests',
    'false',
    has_table_privilege(
      'anon',
      'public.account_password_reset_requests',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.account_password_reset_requests',
      'SELECT'
    )

  union all

  select
    4,
    'authenticated cannot read password-reset requests',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_password_reset_requests',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_password_reset_requests',
      'SELECT'
    )

  union all

  select
    5,
    'authenticated cannot insert password-reset requests',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_password_reset_requests',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_password_reset_requests',
      'INSERT'
    )

  union all

  select
    6,
    'one pending request per user is enforced',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_indexes
  where schemaname = 'public'
    and tablename =
      'account_password_reset_requests'
    and indexname =
      'account_password_reset_one_pending_per_user'

  union all

  select
    7,
    'password-reset creation function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    8,
    'password-reset delivery function exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname =
      'public'
    and function_record.proname =
      'complete_lifetopia_password_reset_delivery'

  union all

  select
    9,
    'password-reset preview function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    10,
    'password-reset completion function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    11,
    'anonymous cannot create password-reset request directly',
    'false',
    has_function_privilege(
      'anon',
      'public.create_lifetopia_password_reset_request(text,text,timestamptz,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.create_lifetopia_password_reset_request(text,text,timestamptz,text)',
      'EXECUTE'
    )

  union all

  select
    12,
    'authenticated cannot preview password-reset tokens directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.preview_lifetopia_password_reset(text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.preview_lifetopia_password_reset(text)',
      'EXECUTE'
    )

  union all

  select
    13,
    'service role can create password-reset requests',
    'true',
    has_function_privilege(
      'service_role',
      'public.create_lifetopia_password_reset_request(text,text,timestamptz,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.create_lifetopia_password_reset_request(text,text,timestamptz,text)',
      'EXECUTE'
    )

  union all

  select
    14,
    'service role can complete password resets',
    'true',
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_password_reset(text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_password_reset(text)',
      'EXECUTE'
    )

  union all

  select
    15,
    'password-reset table starts empty',
    '0',
    count(*)::text,
    count(*) = 0
  from
    public.account_password_reset_requests

  union all

  select
    16,
    'auth user and profile counts remain equal',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    17,
    'exact dates of birth remain private',
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
