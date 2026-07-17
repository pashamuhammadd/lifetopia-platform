-- Lifetopia Authentication
-- Auth 0.5D — Identity normalization preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

with lowercase_conflicts as (
  select
    lower(username::text) as normalized_username,
    count(*) as account_count
  from public.profiles
  group by lower(username::text)
  having count(*) > 1
),
invalid_temporary_username as (
  select id
  from public.profiles
  where lower(username::text) =
    'user_bb6a'
),
pending_conflict as (
  select *
  from auth_migration_backup.pending_username_conflicts
  where profile_id =
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
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
    'Auth 0.5C privacy snapshot exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5c_pre_privacy_2026_07_18'

  union all

  select
    2,
    'Auth 0.5D identity snapshot does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5d_pre_identity_2026_07_18'

  union all

  select
    3,
    'auth user and profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    4,
    'profile_private row count matches profiles',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    5,
    'no lowercase username collisions exist in current profiles',
    '0',
    count(*)::text,
    count(*) = 0
  from lowercase_conflicts

  union all

  select
    6,
    'older conflict account currently uses temporary username',
    'user_b4c4',
    coalesce(
      max(username::text),
      '<missing>'
    ),
    count(*) = 1
      and max(username::text) =
        'user_b4c4'
  from public.profiles
  where id =
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid

  union all

  select
    7,
    'newer conflict account currently owns Sent',
    'Sent',
    coalesce(
      max(username::text),
      '<missing>'
    ),
    count(*) = 1
      and max(username::text) = 'Sent'
  from public.profiles
  where id =
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid

  union all

  select
    8,
    'new temporary username is available',
    '0',
    count(*)::text,
    count(*) = 0
  from invalid_temporary_username

  union all

  select
    9,
    'pending Sent conflict is recorded from Auth 0.5B',
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
    10,
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
    11,
    'username remains citext',
    'citext',
    coalesce(
      max(udt_name),
      '<missing>'
    ),
    count(*) = 1
      and max(udt_name) = 'citext'
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'username'

  union all

  select
    12,
    'username unique constraint remains active',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_constraint constraint_record
  join pg_class table_record
    on table_record.oid =
      constraint_record.conrelid
  join pg_namespace table_namespace
    on table_namespace.oid =
      table_record.relnamespace
  where table_namespace.nspname = 'public'
    and table_record.relname = 'profiles'
    and constraint_record.contype = 'u'
    and pg_get_constraintdef(
      constraint_record.oid,
      true
    ) ilike '%username%'

  union all

  select
    13,
    'authenticated users cannot update username directly',
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
) checks
order by check_order;
