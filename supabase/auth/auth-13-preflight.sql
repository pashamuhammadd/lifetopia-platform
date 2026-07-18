-- Lifetopia Authentication
-- Auth 13 — Session management preflight
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
    'Auth 12 password recovery table exists'
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
    'Supabase Auth sessions table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'auth'
    and table_name = 'sessions'

  union all

  select
    3,
    'required Auth session columns exist',
    '10',
    count(*)::text,
    count(*) = 10
  from information_schema.columns
  where table_schema = 'auth'
    and table_name = 'sessions'
    and column_name in (
      'id',
      'user_id',
      'created_at',
      'updated_at',
      'refreshed_at',
      'user_agent',
      'ip',
      'aal',
      'not_after',
      'tag'
    )

  union all

  select
    4,
    'refresh tokens reference Auth sessions',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.columns
  where table_schema = 'auth'
    and table_name =
      'refresh_tokens'
    and column_name =
      'session_id'

  union all

  select
    5,
    'session deletion cascades to refresh tokens',
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
    6,
    'session listing function does not exist yet',
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
      'get_my_lifetopia_sessions'

  union all

  select
    7,
    'specific-session revoke function does not exist yet',
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
      'revoke_my_lifetopia_session'

  union all

  select
    8,
    'authenticated clients cannot read Auth sessions directly',
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
    'authenticated clients cannot delete Auth sessions directly',
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
) checks
order by check_order;
