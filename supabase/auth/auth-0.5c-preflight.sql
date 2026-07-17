-- Lifetopia Authentication
-- Auth 0.5C — Profile privacy hardening preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

with auth_user_triggers as (
  select
    tg.tgname as trigger_name,
    tg.tgenabled::text as enabled_state,
    function_record.proname as function_name
  from pg_trigger tg
  join pg_class table_record
    on table_record.oid = tg.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid = table_record.relnamespace
  join pg_proc function_record
    on function_record.oid = tg.tgfoid
  where not tg.tgisinternal
    and table_namespace.nspname = 'auth'
    and table_record.relname = 'users'
),
orphan_users as (
  select u.id
  from auth.users u
  left join public.profiles p
    on p.id = u.id
  where p.id is null
)
select
  check_order,
  check_name,
  expected,
  actual,
  passed
from (
  select
    1 as check_order,
    'Auth migration backup schema exists' as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.schemata
  where schema_name = 'auth_migration_backup'

  union all

  select
    2,
    'Auth 0.5A snapshot exists',
    '1',
    count(*)::text,
    count(*) = 1
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'

  union all

  select
    3,
    'Auth 0.5C snapshot does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5c_pre_privacy_2026_07_18'

  union all

  select
    4,
    'auth user and profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    5,
    'no orphan auth users remain',
    '0',
    count(*)::text,
    count(*) = 0
  from orphan_users

  union all

  select
    6,
    'exactly one canonical signup trigger is active',
    'on_auth_user_created_create_lifetopia_profile / handle_new_lifetopia_profile / O',
    coalesce(
      max(
        trigger_name || ' / ' ||
        function_name || ' / ' ||
        enabled_state
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(trigger_name) =
        'on_auth_user_created_create_lifetopia_profile'
      and max(function_name) =
        'handle_new_lifetopia_profile'
      and max(enabled_state) = 'O'
  from auth_user_triggers

  union all

  select
    7,
    'profiles contains exact date of birth before migration',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'date_of_birth'
    and data_type = 'date'
    and is_nullable = 'NO'

  union all

  select
    8,
    'every current profile has a date of birth',
    (select count(*) from public.profiles)::text,
    count(date_of_birth)::text,
    count(*) = count(date_of_birth)
  from public.profiles

  union all

  select
    9,
    'private profile table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'profile_private'

  union all

  select
    10,
    'public profile view does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.views
  where table_schema = 'public'
    and table_name = 'public_profiles'

  union all

  select
    11,
    'four audited profile policies are still present',
    '4',
    count(*)::text,
    count(*) = 4
      and bool_and(
        policyname in (
          'Players can update their own profile',
          'Profiles are viewable by everyone',
          'Public profiles are viewable by everyone',
          'Users can update their own profile'
        )
      )
  from pg_policies
  where schemaname = 'public'
    and tablename = 'profiles'

  union all

  select
    12,
    'anon currently has broad profiles access to harden',
    'true',
    (
      has_table_privilege(
        'anon',
        'public.profiles',
        'SELECT'
      )
      and has_table_privilege(
        'anon',
        'public.profiles',
        'UPDATE'
      )
    )::text,
    has_table_privilege(
      'anon',
      'public.profiles',
      'SELECT'
    )
    and has_table_privilege(
      'anon',
      'public.profiles',
      'UPDATE'
    )

  union all

  select
    13,
    'authenticated currently has broad profiles update access',
    'true',
    has_table_privilege(
      'authenticated',
      'public.profiles',
      'UPDATE'
    )::text,
    has_table_privilege(
      'authenticated',
      'public.profiles',
      'UPDATE'
    )
) checks
order by check_order;
