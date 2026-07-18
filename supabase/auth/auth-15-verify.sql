-- Lifetopia Authentication
-- Auth 15 — Verify roles and badges
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
    'eight official roles exist'
      as check_name,
    '8' as expected,
    count(*)::text as actual,
    count(*) = 8 as passed
  from public.lifetopia_role_catalog

  union all

  select
    2,
    'eight official badges exist',
    '8',
    count(*)::text,
    count(*) = 8
  from public.badge_catalog

  union all

  select
    3,
    'all legacy player roles were migrated',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profiles
  where role = 'player'

  union all

  select
    4,
    'all current accounts are Lifetopians before founder provisioning',
    (
      select count(*)
      from public.profiles
    )::text,
    count(*)::text,
    count(*) = (
      select count(*)
      from public.profiles
    )
  from public.profiles
  where role = 'lifetopian'

  union all

  select
    5,
    'official primary role constraint exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_constraint constraint_record
  join pg_class table_record
    on table_record.oid =
      constraint_record.conrelid
  join pg_namespace table_schema
    on table_schema.oid =
      table_record.relnamespace
  where table_schema.nspname =
      'public'
    and table_record.relname =
      'profiles'
    and constraint_record.conname =
      'profiles_primary_role_check'

  union all

  select
    6,
    'legacy signup compatibility trigger exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_trigger trigger_record
  join pg_class table_record
    on table_record.oid =
      trigger_record.tgrelid
  join pg_namespace table_schema
    on table_schema.oid =
      table_record.relnamespace
  where not trigger_record.tgisinternal
    and table_schema.nspname =
      'public'
    and table_record.relname =
      'profiles'
    and trigger_record.tgname =
      'normalize_lifetopia_profile_role_before_write'

  union all

  select
    7,
    'profile badge table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'profile_badges'

  union all

    select
    8,
    'role history contains one Auth 15 baseline per current profile',
    (
      select count(*)
      from public.profiles
    )::text,
    count(*)::text,
    count(*) = (
      select count(*)
      from public.profiles
    )
  from public.account_role_changes
  where change_source =
      'migration'
    and new_role =
      'lifetopian'
    and previous_role in (
      'player',
      'lifetopian'
    )

  union all

  select
    9,
    'three controlled identity functions exist',
    '3',
    count(*)::text,
    count(*) = 3
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid =
      function_record.pronamespace
  where function_schema.nspname =
      'public'
    and function_record.proname in (
      'assign_lifetopia_primary_role',
      'grant_lifetopia_badge',
      'revoke_lifetopia_badge'
    )

  union all

  select
    10,
    'anonymous cannot assign primary roles',
    'false',
    has_function_privilege(
      'anon',
      'public.assign_lifetopia_primary_role(uuid,uuid,text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.assign_lifetopia_primary_role(uuid,uuid,text,text)',
      'EXECUTE'
    )

  union all

  select
    11,
    'authenticated clients cannot assign primary roles directly',
    'false',
    has_function_privilege(
      'authenticated',
      'public.assign_lifetopia_primary_role(uuid,uuid,text,text)',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.assign_lifetopia_primary_role(uuid,uuid,text,text)',
      'EXECUTE'
    )

  union all

  select
    12,
    'service role can assign primary roles',
    'true',
    has_function_privilege(
      'service_role',
      'public.assign_lifetopia_primary_role(uuid,uuid,text,text)',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'service_role',
      'public.assign_lifetopia_primary_role(uuid,uuid,text,text)',
      'EXECUTE'
    )

  union all

  select
    13,
    'anonymous can read official role catalog',
    'true',
    has_table_privilege(
      'anon',
      'public.lifetopia_role_catalog',
      'SELECT'
    )::text,
    has_table_privilege(
      'anon',
      'public.lifetopia_role_catalog',
      'SELECT'
    )

  union all

  select
    14,
    'anonymous can read public profile badges',
    'true',
    has_table_privilege(
      'anon',
      'public.profile_badges',
      'SELECT'
    )::text,
    has_table_privilege(
      'anon',
      'public.profile_badges',
      'SELECT'
    )

  union all

  select
    15,
    'authenticated clients cannot insert profile badges',
    'false',
    has_table_privilege(
      'authenticated',
      'public.profile_badges',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.profile_badges',
      'INSERT'
    )

  union all

  select
    16,
    'authenticated clients still cannot update primary role directly',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'role',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profiles',
      'role',
      'UPDATE'
    )

  union all

  select
    17,
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
