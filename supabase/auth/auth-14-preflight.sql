-- Lifetopia Authentication
-- Auth 14 — TOTP MFA preflight
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
    'Auth 13 session functions exist'
      as check_name,
    '2' as expected,
    count(*)::text as actual,
    count(*) = 2 as passed
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid =
      function_record.pronamespace
  where function_schema.nspname =
      'public'
    and function_record.proname in (
      'get_my_lifetopia_sessions',
      'revoke_my_lifetopia_session'
    )

  union all

  select
    2,
    'Supabase Auth MFA factors table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'auth'
    and table_name =
      'mfa_factors'

  union all

  select
    3,
    'required MFA factor columns exist',
    '6',
    count(*)::text,
    count(*) = 6
  from information_schema.columns
  where table_schema = 'auth'
    and table_name =
      'mfa_factors'
    and column_name in (
      'id',
      'user_id',
      'friendly_name',
      'factor_type',
      'status',
      'created_at'
    )

  union all

  select
    4,
    'MFA audit table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_mfa_events'

  union all

  select
    5,
    'MFA audit function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid =
      function_record.pronamespace
  where function_schema.nspname =
      'public'
    and function_record.proname =
      'record_lifetopia_mfa_event'

  union all

  select
    6,
    'login audit constraint does not yet contain mfa_required',
    'false',
    coalesce(
      bool_or(
        pg_get_constraintdef(
          constraint_record.oid
        ) ilike
          '%mfa_required%'
      ),
      false
    )::text,
    not coalesce(
      bool_or(
        pg_get_constraintdef(
          constraint_record.oid
        ) ilike
          '%mfa_required%'
      ),
      false
    )
  from pg_constraint
    constraint_record
  join pg_class table_record
    on table_record.oid =
      constraint_record.conrelid
  join pg_namespace table_schema
    on table_schema.oid =
      table_record.relnamespace
  where table_schema.nspname =
      'public'
    and table_record.relname =
      'account_auth_attempts'
    and constraint_record.contype =
      'c'

  union all

  select
    7,
    'auth user and profile counts match',
    (
      select count(*)
      from auth.users
    )::text,
    (
      select count(*)
      from public.profiles
    )::text,
    (
      select count(*)
      from auth.users
    ) = (
      select count(*)
      from public.profiles
    )

  union all

  select
    8,
    'authenticated clients cannot read MFA factors directly',
    'false',
    has_table_privilege(
      'authenticated',
      'auth.mfa_factors',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'auth.mfa_factors',
      'SELECT'
    )

  union all

  select
    9,
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
