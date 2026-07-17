-- Lifetopia Authentication
-- Auth 0.5D â€” Verify identity normalization
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

with identity_snapshot as (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5d_pre_identity_2026_07_18'
),
expected_usernames as (
  select
    backup_profile.profile_id,
    case
      when backup_profile.profile_id =
        'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid
        then 'sent'
      when backup_profile.profile_id =
        'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
        then 'user_bb6a'
      else lower(
        backup_profile.row_data ->> 'username'
      )
    end as expected_username
  from auth_migration_backup.profile_rows backup_profile
  where backup_profile.snapshot_id = (
    select snapshot_id
    from identity_snapshot
  )
),
non_username_differences as (
  select count(*) as difference_count
  from auth_migration_backup.profile_rows backup_profile
  left join public.profiles current_profile
    on current_profile.id =
      backup_profile.profile_id
  where backup_profile.snapshot_id = (
    select snapshot_id
    from identity_snapshot
  )
  and (
    current_profile.id is null
    or (
  to_jsonb(current_profile)
    - 'username'
    - 'display_name'
    - 'updated_at'
) <>
  (
    backup_profile.row_data
      - 'username'
      - 'display_name'
      - 'updated_at'
  )
  )
),
username_differences as (
  select count(*) as difference_count
  from expected_usernames expected
  left join public.profiles current_profile
    on current_profile.id =
      expected.profile_id
  where current_profile.id is null
    or current_profile.username::text <>
      expected.expected_username
),
lowercase_conflicts as (
  select lower(username::text)
  from public.profiles
  group by lower(username::text)
  having count(*) > 1
),
invalid_usernames as (
  select id
  from public.profiles
  where
    username::text <>
      lower(username::text)
    or char_length(username::text)
      not between 4 and 16
    or username::text !~
      '^[a-z0-9_]+$'
    or username::text ~
      '___'
),
invalid_display_names as (
  select id
  from public.profiles
  where
    display_name <>
      btrim(display_name)
    or char_length(display_name)
      not between 2 and 32
    or display_name !~
      '^[[:alnum:] ]+$'
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
    'Auth 0.5D safety snapshot exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from identity_snapshot

  union all

  select
    2,
    'profile count matches identity snapshot',
    (
      select profile_count::text
      from auth_migration_backup.snapshot_runs
      where label =
        'auth_0_5d_pre_identity_2026_07_18'
    ),
    (select count(*) from public.profiles)::text,
    (
      select profile_count
      from auth_migration_backup.snapshot_runs
      where label =
        'auth_0_5d_pre_identity_2026_07_18'
    ) =
      (select count(*) from public.profiles)

  union all

  select
    3,
    'non-identity public profile data is unchanged',
    '0',
    difference_count::text,
    difference_count = 0
  from non_username_differences

  union all

  select
    4,
    'all usernames match the reviewed migration plan',
    '0',
    difference_count::text,
    difference_count = 0
  from username_differences

  union all

  select
    5,
    'all usernames are lowercase and valid',
    '0',
    count(*)::text,
    count(*) = 0
  from invalid_usernames

  union all

  select
    6,
    'no lowercase username conflicts remain',
    '0',
    count(*)::text,
    count(*) = 0
  from lowercase_conflicts

  union all

  select
    7,
    'all Display Names satisfy 2â€“32 character policy',
    '0',
    count(*)::text,
    count(*) = 0
  from invalid_display_names

  union all

  select
    8,
    'username column remains citext',
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
    9,
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
    10,
    'new username identity constraint exists',
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
    and constraint_record.conname =
      'profiles_username_identity_check'

  union all

  select
    11,
    'new Display Name identity constraint exists',
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
    and constraint_record.conname =
      'profiles_display_name_identity_check'

  union all

  select
    12,
    'older account owns sent',
    'sent',
    coalesce(
      max(username::text),
      '<missing>'
    ),
    count(*) = 1
      and max(username::text) = 'sent'
  from public.profiles
  where id =
    'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'::uuid

  union all

  select
    13,
    'newer account uses temporary username',
    'user_bb6a',
    coalesce(
      max(username::text),
      '<missing>'
    ),
    count(*) = 1
      and max(username::text) =
        'user_bb6a'
  from public.profiles
  where id =
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid

  union all

  select
    14,
    'only newer conflict account requires username update',
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f',
    coalesce(
      string_agg(
        user_id::text,
        ','
        order by user_id::text
      ) filter (
        where requires_username_update
      ),
      '<none>'
    ),
    count(*) filter (
      where requires_username_update
    ) = 1
      and bool_or(
        user_id =
          'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'::uuid
        and requires_username_update
      )
  from public.profile_private

  union all

  select
    15,
    'pending username selection is recorded privately',
    'bb6a4f2b-debe-44d7-98be-17c4f94acf5f / sent / user_bb6a / b4c4cc80-69ce-4bb9-9b30-f7627e7049de / pending',
    coalesce(
      max(
        profile_id::text || ' / ' ||
        desired_username || ' / ' ||
        temporary_username || ' / ' ||
        conflicting_profile_id::text || ' / ' ||
        status
      ),
      '<missing>'
    ),
    count(*) = 1
      and max(profile_id::text) =
        'bb6a4f2b-debe-44d7-98be-17c4f94acf5f'
      and max(desired_username) = 'sent'
      and max(temporary_username) =
        'user_bb6a'
      and max(
        conflicting_profile_id::text
      ) =
        'b4c4cc80-69ce-4bb9-9b30-f7627e7049de'
      and max(status) = 'pending'
  from auth_migration_backup.pending_username_conflicts

  union all

  select
    16,
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
    17,
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
    18,
    'signup function normalizes username to lowercase',
    'true',
    (
      pg_get_functiondef(
        function_record.oid
      ) ilike '%v_username text :=%lower(%'
    )::text,
    pg_get_functiondef(
      function_record.oid
    ) ilike '%v_username text :=%lower(%'
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname =
      'handle_new_lifetopia_profile'

  union all

  select
    19,
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
    and column_name = 'date_of_birth'
) checks
order by check_order;

