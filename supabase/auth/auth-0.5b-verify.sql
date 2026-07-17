-- Lifetopia Authentication
-- Auth 0.5B v2 — Verify signup repair
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.
--
-- Compatibility fix:
-- PostgreSQL stores pg_trigger.tgenabled as the internal "char" type.
-- Cast it to text before concatenation and aggregation.

with snapshot as (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
),
unchanged_original_profiles as (
  select count(*) as difference_count
  from auth_migration_backup.profile_rows backup_profile
  left join public.profiles current_profile
    on current_profile.id =
      backup_profile.profile_id
  where backup_profile.snapshot_id = (
    select snapshot_id
    from snapshot
  )
  and (
    current_profile.id is null
    or to_jsonb(current_profile) <>
      backup_profile.row_data
  )
),
orphan_users as (
  select u.id
  from auth.users u
  left join public.profiles p
    on p.id = u.id
  where p.id is null
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
),
restored_profile as (
  select p.*
  from public.profiles p
  where p.id =
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
),
existing_sent_profile as (
  select p.*
  from public.profiles p
  where p.id =
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
),
pending_conflict as (
  select *
  from auth_migration_backup.pending_username_conflicts
  where profile_id =
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
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
    'all original profiles remain unchanged'
      as check_name,
    '0' as expected,
    difference_count::text as actual,
    difference_count = 0 as passed
  from unchanged_original_profiles

  union all

  select
    2,
    'auth user and profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    3,
    'no orphan auth users remain',
    '0',
    count(*)::text,
    count(*) = 0
  from orphan_users

  union all

  select
    4,
    'exactly one auth.users trigger remains',
    '1',
    count(*)::text,
    count(*) = 1
  from auth_user_triggers

  union all

  select
    5,
    'canonical signup trigger is active',
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
    6,
    'legacy signup functions are removed',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname in (
      'handle_new_user',
      'handle_new_player_profile'
    )

  union all

  select
    7,
    'canonical trigger function exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname =
      'handle_new_lifetopia_profile'

  union all

  select
    8,
    'anon cannot execute canonical trigger function',
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
    9,
    'authenticated cannot execute canonical trigger function',
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

  union all

  select
    10,
    'orphan profile restored with temporary username',
    'user_b4c4 / Lifetopian / male / avatar-02 / ID / Indonesia / 2007-01-12 / player / player',
    coalesce(
      max(
        username::text || ' / ' ||
        display_name || ' / ' ||
        gender || ' / ' ||
        avatar_id || ' / ' ||
        country_code || ' / ' ||
        country_name || ' / ' ||
        date_of_birth::text || ' / ' ||
        account_type || ' / ' ||
        role
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(username::text) =
        'user_b4c4'
      and max(display_name) =
        'Lifetopian'
      and max(gender) = 'male'
      and max(avatar_id) =
        'avatar-02'
      and max(country_code) = 'ID'
      and max(country_name) =
        'Indonesia'
      and max(date_of_birth) =
        '2007-01-12'::date
      and max(account_type) =
        'player'
      and max(role) = 'player'
  from restored_profile

  union all

  select
    11,
    'existing Sent profile was not disrupted',
    'Sent',
    coalesce(
      max(username::text),
      '<missing>'
    ),
    count(*) = 1
      and max(username::text) = 'Sent'
  from existing_sent_profile

  union all

  select
    12,
    'pending username conflict is recorded',
    'Sent / user_b4c4 / bb6a4f2b-debe-44d7-98be-17c4f94acf5f / pending',
    coalesce(
      max(
        desired_username || ' / ' ||
        temporary_username || ' / ' ||
        conflicting_profile_id::text || ' / ' ||
        status
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(desired_username) = 'Sent'
      and max(temporary_username) =
        'user_b4c4'
      and max(
        conflicting_profile_id::text
      ) =
        'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'
      and max(status) = 'pending'
  from pending_conflict

  union all

  select
    13,
    'backup conflict table is private from anon',
    'false',
    has_table_privilege(
      'anon',
      'auth_migration_backup.pending_username_conflicts',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'auth_migration_backup.pending_username_conflicts',
      'SELECT'
    )

  union all

  select
    14,
    'backup conflict table is private from authenticated',
    'false',
    has_table_privilege(
      'authenticated',
      'auth_migration_backup.pending_username_conflicts',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'auth_migration_backup.pending_username_conflicts',
      'SELECT'
    )
) checks
order by check_order;
