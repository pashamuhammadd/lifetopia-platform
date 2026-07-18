-- Lifetopia Authentication
-- Auth 14 — Verify TOTP MFA foundation
--
-- SAFE: SELECT statements only.
-- Run before the first MFA enrollment.
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
    'login audit constraint contains mfa_required'
      as check_name,
    'true' as expected,
    coalesce(
      bool_or(
        pg_get_constraintdef(
          constraint_record.oid
        ) ilike
          '%mfa_required%'
      ),
      false
    )::text as actual,
    coalesce(
      bool_or(
        pg_get_constraintdef(
          constraint_record.oid
        ) ilike
          '%mfa_required%'
      ),
      false
    ) as passed
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
    2,
    'login completion function accepts mfa_required',
    'true',
    (
      position(
        'mfa_required' in
        pg_get_functiondef(
          function_record.oid
        )
      ) > 0
    )::text,
    position(
      'mfa_required' in
      pg_get_functiondef(
        function_record.oid
      )
    ) > 0
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid =
      function_record.pronamespace
  where function_schema.nspname =
      'public'
    and function_record.proname =
      'complete_lifetopia_login_attempt'

  union all

  select
    3,
    'MFA audit table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_mfa_events'

  union all

  select
    4,
    'MFA audit RLS is enabled',
    'true',
    table_record.relrowsecurity::text,
    table_record.relrowsecurity
  from pg_class table_record
  join pg_namespace table_schema
    on table_schema.oid =
      table_record.relnamespace
  where table_schema.nspname =
      'public'
    and table_record.relname =
      'account_mfa_events'

  union all

  select
    5,
    'anonymous cannot read MFA audit',
    'false',
    has_table_privilege(
      'anon',
      'public.account_mfa_events',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.account_mfa_events',
      'SELECT'
    )

  union all

  select
    6,
    'authenticated clients cannot read MFA audit',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_mfa_events',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_mfa_events',
      'SELECT'
    )

  union all

  select
    7,
    'two MFA audit indexes exist',
    '2',
    count(*)::text,
    count(*) = 2
  from pg_indexes
  where schemaname = 'public'
    and tablename =
      'account_mfa_events'
    and indexname in (
      'account_mfa_events_user_time_idx',
      'account_mfa_events_type_time_idx'
    )

  union all

  select
    8,
    'MFA audit function exists',
    '1',
    count(*)::text,
    count(*) = 1
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
    9,
    'anonymous cannot record MFA events',
    'false',
    has_function_privilege(
      'anon',
      'public.record_lifetopia_mfa_event(uuid,uuid,text,boolean,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.record_lifetopia_mfa_event(uuid,uuid,text,boolean,text)',
      'EXECUTE'
    )

  union all

  select
    10,
    'authenticated clients cannot record MFA events directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.record_lifetopia_mfa_event(uuid,uuid,text,boolean,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.record_lifetopia_mfa_event(uuid,uuid,text,boolean,text)',
      'EXECUTE'
    )

  union all

  select
    11,
    'service role can record MFA events',
    'true',
    has_function_privilege(
      'service_role',
      'public.record_lifetopia_mfa_event(uuid,uuid,text,boolean,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.record_lifetopia_mfa_event(uuid,uuid,text,boolean,text)',
      'EXECUTE'
    )

  union all

  select
    12,
    'MFA audit starts empty',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_mfa_events

  union all

  select
    13,
    'authenticated clients still cannot read Auth MFA factors directly',
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
    14,
    'auth user and profile counts remain equal',
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
    15,
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
