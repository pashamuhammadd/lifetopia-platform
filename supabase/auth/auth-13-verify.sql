-- Lifetopia Authentication
-- Auth 13 — Verify session management
--
-- SAFE: SELECT statements only.
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
    'two session-management functions exist'
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
    'both session functions use SECURITY DEFINER',
    '2',
    count(*)::text,
    count(*) = 2
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
    and function_record.prosecdef

  union all

  select
    3,
    'both session functions pin search_path',
    '2',
    count(*)::text,
    count(*) = 2
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
    and function_record.proconfig
      @> array[
        'search_path=pg_catalog'
      ]

  union all

  select
    4,
    'anonymous cannot list account sessions',
    'false',
    has_function_privilege(
      'anon',
      'public.get_my_lifetopia_sessions()',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.get_my_lifetopia_sessions()',
      'EXECUTE'
    )

  union all

  select
    5,
    'authenticated users can list their sessions',
    'true',
    has_function_privilege(
      'authenticated',
      'public.get_my_lifetopia_sessions()',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'authenticated',
      'public.get_my_lifetopia_sessions()',
      'EXECUTE'
    )

  union all

  select
    6,
    'anonymous cannot revoke account sessions',
    'false',
    has_function_privilege(
      'anon',
      'public.revoke_my_lifetopia_session(uuid)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.revoke_my_lifetopia_session(uuid)',
      'EXECUTE'
    )

  union all

  select
    7,
    'authenticated users can call guarded session revocation',
    'true',
    has_function_privilege(
      'authenticated',
      'public.revoke_my_lifetopia_session(uuid)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'authenticated',
      'public.revoke_my_lifetopia_session(uuid)',
      'EXECUTE'
    )

  union all

  select
    8,
    'authenticated clients still cannot read Auth sessions directly',
    'false',
    has_table_privilege(
      'authenticated',
      'auth.sessions',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'auth.sessions',
      'SELECT'
    )

  union all

  select
    9,
    'authenticated clients still cannot delete Auth sessions directly',
    'false',
    has_table_privilege(
      'authenticated',
      'auth.sessions',
      'DELETE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'auth.sessions',
      'DELETE'
    )

  union all

  select
    10,
    'refresh-token cascade remains active',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_constraint constraint_record
  join pg_class child_table
    on child_table.oid =
      constraint_record.conrelid
  join pg_namespace child_schema
    on child_schema.oid =
      child_table.relnamespace
  join pg_class parent_table
    on parent_table.oid =
      constraint_record.confrelid
  join pg_namespace parent_schema
    on parent_schema.oid =
      parent_table.relnamespace
  where constraint_record.contype = 'f'
    and child_schema.nspname = 'auth'
    and child_table.relname =
      'refresh_tokens'
    and parent_schema.nspname = 'auth'
    and parent_table.relname =
      'sessions'
    and constraint_record.confdeltype =
      'c'

  union all

  select
    11,
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
    12,
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
