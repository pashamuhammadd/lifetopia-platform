-- Lifetopia Authentication
-- Auth 0.5C — Verify profile privacy hardening
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

with privacy_snapshot as (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5c_pre_privacy_2026_07_18'
),
public_data_differences as (
  select count(*) as difference_count
  from auth_migration_backup.profile_rows backup_profile
  left join public.profiles current_profile
    on current_profile.id =
      backup_profile.profile_id
  where backup_profile.snapshot_id = (
    select snapshot_id
    from privacy_snapshot
  )
  and (
    current_profile.id is null
    or to_jsonb(current_profile) <>
      (
        backup_profile.row_data
          - 'date_of_birth'
      )
  )
),
private_date_differences as (
  select count(*) as difference_count
  from auth_migration_backup.profile_rows backup_profile
  left join public.profile_private private_profile
    on private_profile.user_id =
      backup_profile.profile_id
  where backup_profile.snapshot_id = (
    select snapshot_id
    from privacy_snapshot
  )
  and (
    private_profile.user_id is null
    or private_profile.date_of_birth <>
      (
        backup_profile.row_data
          ->> 'date_of_birth'
      )::date
  )
),
auth_user_triggers as (
  select
    tg.tgname as trigger_name,
    tg.tgenabled::text as enabled_state,
    function_record.proname as function_name
  from pg_trigger tg
  join pg_class table_record
    on table_record.oid = tg.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  join pg_proc function_record
    on function_record.oid = tg.tgfoid
  where not tg.tgisinternal
    and table_namespace.nspname = 'auth'
    and table_record.relname = 'users'
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
    'Auth 0.5C safety snapshot exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from privacy_snapshot

  union all

  select
    2,
    'public profile row count is preserved',
    (
      select profile_count::text
      from auth_migration_backup.snapshot_runs
      where label =
        'auth_0_5c_pre_privacy_2026_07_18'
    ),
    (select count(*) from public.profiles)::text,
    (
      select profile_count
      from auth_migration_backup.snapshot_runs
      where label =
        'auth_0_5c_pre_privacy_2026_07_18'
    ) =
      (select count(*) from public.profiles)

  union all

  select
    3,
    'private profile row count matches public profiles',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    4,
    'public profile data remains unchanged except date of birth',
    '0',
    difference_count::text,
    difference_count = 0
  from public_data_differences

  union all

  select
    5,
    'private dates of birth match the safety snapshot',
    '0',
    difference_count::text,
    difference_count = 0
  from private_date_differences

  union all

  select
    6,
    'exact date of birth is absent from profiles',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'date_of_birth'

  union all

  select
    7,
    'public profile view does not expose date of birth',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'public_profiles'
    and column_name = 'date_of_birth'

  union all

  select
    8,
    'public profile view exposes calculated age',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'public_profiles'
    and column_name = 'age'
    and data_type = 'integer'

  union all

  select
    9,
    'anon can read public profiles',
    'true',
    has_table_privilege(
      'anon',
      'public.profiles',
      'SELECT'
    )::text,
    has_table_privilege(
      'anon',
      'public.profiles',
      'SELECT'
    )

  union all

  select
    10,
    'anon cannot update public profiles',
    'false',
    has_table_privilege(
      'anon',
      'public.profiles',
      'UPDATE'
    )::text,
    not has_table_privilege(
      'anon',
      'public.profiles',
      'UPDATE'
    )

  union all

  select
    11,
    'anon cannot read private profiles',
    'false',
    has_table_privilege(
      'anon',
      'public.profile_private',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.profile_private',
      'SELECT'
    )

  union all

  select
    12,
    'authenticated can read own private profile through RLS',
    'true',
    has_table_privilege(
      'authenticated',
      'public.profile_private',
      'SELECT'
    )::text,
    has_table_privilege(
      'authenticated',
      'public.profile_private',
      'SELECT'
    )

  union all

  select
    13,
    'authenticated cannot update private profile',
    'false',
    has_table_privilege(
      'authenticated',
      'public.profile_private',
      'UPDATE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.profile_private',
      'UPDATE'
    )

  union all

  select
    14,
    'authenticated can update avatar',
    'true',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'avatar_id',
      'UPDATE'
    )::text,
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'avatar_id',
      'UPDATE'
    )

  union all

  select
    15,
    'authenticated can update country code',
    'true',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'country_code',
      'UPDATE'
    )::text,
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'country_code',
      'UPDATE'
    )

  union all

  select
    16,
    'authenticated can update country name',
    'true',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'country_name',
      'UPDATE'
    )::text,
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'country_name',
      'UPDATE'
    )

  union all

  select
    17,
    'authenticated cannot update username directly',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'username',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profiles',
      'username',
      'UPDATE'
    )

  union all

  select
    18,
    'authenticated cannot update Display Name directly',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'display_name',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profiles',
      'display_name',
      'UPDATE'
    )

  union all

  select
    19,
    'authenticated cannot update gender directly',
    'false',
    has_column_privilege(
      'authenticated',
      'public.profiles',
      'gender',
      'UPDATE'
    )::text,
    not has_column_privilege(
      'authenticated',
      'public.profiles',
      'gender',
      'UPDATE'
    )

  union all

  select
    20,
    'authenticated cannot update role directly',
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
    21,
    'profiles has exactly two focused policies',
    '2',
    count(*)::text,
    count(*) = 2
      and bool_and(
        policyname in (
          'Public profiles are viewable by everyone',
          'Users can update allowed public profile fields'
        )
      )
  from pg_policies
  where schemaname = 'public'
    and tablename = 'profiles'

  union all

  select
    22,
    'profile_private has one owner-read policy',
    '1',
    count(*)::text,
    count(*) = 1
      and max(policyname) =
        'Users can view their own private profile'
  from pg_policies
  where schemaname = 'public'
    and tablename = 'profile_private'

  union all

  select
    23,
    'public profile view is readable by anon',
    'true',
    has_table_privilege(
      'anon',
      'public.public_profiles',
      'SELECT'
    )::text,
    has_table_privilege(
      'anon',
      'public.public_profiles',
      'SELECT'
    )

  union all

  select
    24,
    'canonical signup trigger remains active',
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
    25,
    'anon cannot execute signup trigger function',
    'false',
    has_function_privilege(
      'anon',
      'public.handle_new_lifetopia_profile()',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.handle_new_lifetopia_profile()',
      'EXECUTE'
    )

  union all

  select
    26,
    'authenticated cannot execute signup trigger function',
    'false',
    has_function_privilege(
      'authenticated',
      'public.handle_new_lifetopia_profile()',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'authenticated',
      'public.handle_new_lifetopia_profile()',
      'EXECUTE'
    )
) checks
order by check_order;
