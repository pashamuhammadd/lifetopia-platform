-- Lifetopia Authentication
-- Auth 2 — Authentication data model preflight
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
invalid_roles as (
  select id, role
  from public.profiles
  where role not in (
    'player',
    'founder',
    'admin',
    'moderator',
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  )
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
    'Auth 1 legal registry exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'legal_document_versions'

  union all

  select
    2,
    'Auth 1 consent history exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'account_legal_consents'

  union all

  select
    3,
    'two active legal documents exist',
    '2',
    count(*)::text,
    count(*) = 2
  from public.legal_document_versions
  where is_active

  union all

  select
    4,
    'Auth 2 safety snapshot does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_2_pre_data_model_2026_07_18'

  union all

  select
    5,
    'auth user and public profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    6,
    'public and private profile counts match',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    7,
    'requires_username_update foundation exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profile_private'
    and column_name = 'requires_username_update'
    and data_type = 'boolean'

  union all

  select
    8,
    'no unexpected legacy roles exist',
    '0',
    count(*)::text,
    count(*) = 0
  from invalid_roles

  union all

  select
    9,
    'exact date of birth remains private',
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
    'email verification sync trigger does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_trigger tg
  join pg_class table_record
    on table_record.oid = tg.tgrelid
  join pg_namespace table_namespace
    on table_namespace.oid = table_record.relnamespace
  where not tg.tgisinternal
    and table_namespace.nspname = 'auth'
    and table_record.relname = 'users'
    and tg.tgname =
      'on_auth_user_email_verification_changed'

  union all

  select
    12,
    'account username history does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'account_username_changes'

  union all

  select
    13,
    'guardian consent table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'guardian_consents'

  union all

  select
    14,
    'account status event table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'account_status_events'

  union all

  select
    15,
    'authenticated users still cannot update roles directly',
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
) checks
order by check_order;
