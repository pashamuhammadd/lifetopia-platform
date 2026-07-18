-- Lifetopia Authentication
-- Auth 11 — Verify login anti-abuse
--
-- SAFE: SELECT statements only.
-- Run before the first login test.
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
    'login-attempt audit table exists'
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
    'login-attempt audit RLS is enabled',
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
      'account_auth_attempts'

  union all

  select
    3,
    'anonymous cannot read login audit',
    'false',
    has_table_privilege(
      'anon',
      'public.account_auth_attempts',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.account_auth_attempts',
      'SELECT'
    )

  union all

  select
    4,
    'authenticated cannot read login audit',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_auth_attempts',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_auth_attempts',
      'SELECT'
    )

  union all

  select
    5,
    'authenticated cannot insert login audit',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_auth_attempts',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_auth_attempts',
      'INSERT'
    )

  union all

  select
    6,
    'authenticated cannot update login audit',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_auth_attempts',
      'UPDATE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_auth_attempts',
      'UPDATE'
    )

  union all

  select
    7,
    'four login audit indexes exist',
    '4',
    count(*)::text,
    count(*) = 4
  from pg_indexes
  where schemaname = 'public'
    and tablename =
      'account_auth_attempts'
    and indexname in (
      'account_auth_attempts_pair_time_idx',
      'account_auth_attempts_identifier_time_idx',
      'account_auth_attempts_ip_time_idx',
      'account_auth_attempts_outcome_time_idx'
    )

  union all

  select
    8,
    'login reservation function exists',
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
      'reserve_lifetopia_login_attempt'

  union all

  select
    9,
    'login completion function exists',
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
      'complete_lifetopia_login_attempt'

  union all

  select
    10,
    'anonymous cannot reserve login attempt',
    'false',
    has_function_privilege(
      'anon',
      'public.reserve_lifetopia_login_attempt(text,text,text,boolean,boolean)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.reserve_lifetopia_login_attempt(text,text,text,boolean,boolean)',
      'EXECUTE'
    )

  union all

  select
    11,
    'authenticated cannot reserve login attempt directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.reserve_lifetopia_login_attempt(text,text,text,boolean,boolean)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.reserve_lifetopia_login_attempt(text,text,text,boolean,boolean)',
      'EXECUTE'
    )

  union all

  select
    12,
    'service role can reserve login attempt',
    'true',
    has_function_privilege(
      'service_role',
      'public.reserve_lifetopia_login_attempt(text,text,text,boolean,boolean)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.reserve_lifetopia_login_attempt(text,text,text,boolean,boolean)',
      'EXECUTE'
    )

  union all

  select
    13,
    'anonymous cannot complete login attempt',
    'false',
    has_function_privilege(
      'anon',
      'public.complete_lifetopia_login_attempt(uuid,text,uuid)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.complete_lifetopia_login_attempt(uuid,text,uuid)',
      'EXECUTE'
    )

  union all

  select
    14,
    'authenticated cannot complete login attempt directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_login_attempt(uuid,text,uuid)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.complete_lifetopia_login_attempt(uuid,text,uuid)',
      'EXECUTE'
    )

  union all

  select
    15,
    'service role can complete login attempt',
    'true',
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_login_attempt(uuid,text,uuid)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.complete_lifetopia_login_attempt(uuid,text,uuid)',
      'EXECUTE'
    )

  union all

  select
    16,
    'login audit starts empty',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_auth_attempts

  union all

  select
    17,
    'auth user and profile counts remain equal',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    18,
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
