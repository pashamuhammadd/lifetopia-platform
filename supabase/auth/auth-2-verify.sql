-- Lifetopia Authentication
-- Auth 2 — Verify authentication data model
--
-- SAFE: SELECT statements only.
-- Every row must return passed = true.

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
email_state_mismatches as (
  select private_profile.user_id
  from public.profile_private
    private_profile
  join auth.users auth_user
    on auth_user.id =
      private_profile.user_id
  where private_profile.email_verified_at
    is distinct from
      auth_user.email_confirmed_at
),
legal_state_mismatches as (
  select private_profile.user_id
  from public.profile_private
    private_profile
  where private_profile.legal_reconsent_required
    is distinct from
      exists (
        select 1
        from public.legal_document_versions
          legal_document
        where legal_document.is_active
          and not exists (
            select 1
            from public.account_legal_consents
              legal_consent
            where legal_consent.user_id =
              private_profile.user_id
              and legal_consent.document_id =
                legal_document.id
              and legal_consent.withdrawn_at
                is null
          )
      )
),
guardian_state_mismatches as (
  select user_id
  from public.profile_private
  where guardian_consent_required
    is distinct from
      (
        date_of_birth >
          (
            current_date
            - interval '18 years'
          )::date
      )
    or (
      guardian_consent_required
      and guardian_consent_status =
        'not_required'
    )
    or (
      not guardian_consent_required
      and guardian_consent_status <>
        'not_required'
    )
),
expected_username_history as (
  select count(*) as expected_count
  from auth_migration_backup.profile_rows
    backup_profile
  join auth_migration_backup.snapshot_runs
    snapshot_run
    on snapshot_run.snapshot_id =
      backup_profile.snapshot_id
  join public.profiles current_profile
    on current_profile.id =
      backup_profile.profile_id
  where snapshot_run.label =
    'auth_0_5d_pre_identity_2026_07_18'
    and (
      backup_profile.row_data
        ->> 'username'
    ) <>
      current_profile.username::text
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
    'Auth 2 safety snapshot exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_2_pre_data_model_2026_07_18'

  union all

  select
    2,
    'auth user and profile counts still match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)

  union all

  select
    3,
    'public and private profile counts still match',
    (select count(*) from public.profiles)::text,
    (select count(*) from public.profile_private)::text,
    (select count(*) from public.profiles) =
      (select count(*) from public.profile_private)

  union all

  select
    4,
    'all account roles use final role vocabulary',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profiles
  where role not in (
    'founder',
    'admin',
    'moderator',
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  )

  union all

  select
    5,
    'legacy player role is fully removed',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profiles
  where role = 'player'

  union all

  select
    6,
    'final role constraint exists',
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
      'profiles_role_check'

  union all

  select
    7,
    'account status column exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profile_private'
    and column_name = 'account_status'

  union all

  select
    8,
    'all current accounts remain active',
    (select count(*) from public.profile_private)::text,
    count(*)::text,
    count(*) =
      (select count(*) from public.profile_private)
  from public.profile_private
  where account_status = 'active'

  union all

  select
    9,
    'email verification state matches auth.users',
    '0',
    count(*)::text,
    count(*) = 0
  from email_state_mismatches

  union all

  select
    10,
    'legal re-consent state matches active legal versions',
    '0',
    count(*)::text,
    count(*) = 0
  from legal_state_mismatches

  union all

  select
    11,
    'guardian requirement state matches exact age data',
    '0',
    count(*)::text,
    count(*) = 0
  from guardian_state_mismatches

  union all

  select
    12,
    'one forced username selection remains preserved',
    '1',
    count(*)::text,
    count(*) = 1
  from public.profile_private
  where requires_username_update

  union all

  select
    13,
    'no account has consumed the free username change',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profile_private
  where free_username_change_used

  union all

  select
    14,
    'username history table exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_username_changes'

  union all

  select
    15,
    'username migration history count is complete',
    (
      select expected_count::text
      from expected_username_history
    ),
    (
      select count(*)::text
      from public.account_username_changes
      where change_type = 'migration'
    ),
    (
      select expected_count
      from expected_username_history
    ) =
      (
        select count(*)
        from public.account_username_changes
        where change_type = 'migration'
      )

  union all

  select
    16,
    'guardian consent foundation exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'guardian_consents'

  union all

  select
    17,
    'account status audit foundation exists',
    '1',
    count(*)::text,
    count(*) = 1
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'account_status_events'

  union all

  select
    18,
    'authenticated cannot insert username history',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_username_changes',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_username_changes',
      'INSERT'
    )

  union all

  select
    19,
    'authenticated cannot insert guardian consent',
    'false',
    has_table_privilege(
      'authenticated',
      'public.guardian_consents',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.guardian_consents',
      'INSERT'
    )

  union all

  select
    20,
    'authenticated cannot read account status audit events',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_status_events',
      'SELECT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_status_events',
      'SELECT'
    )

  union all

  select
    21,
    'account-state function is available to authenticated users',
    'true',
    has_function_privilege(
      'authenticated',
      'public.get_my_account_state()',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'authenticated',
      'public.get_my_account_state()',
      'EXECUTE'
    )

  union all

  select
    22,
    'account-state function is unavailable to anonymous users',
    'false',
    has_function_privilege(
      'anon',
      'public.get_my_account_state()',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.get_my_account_state()',
      'EXECUTE'
    )

  union all

  select
    23,
    'email verification sync trigger is active',
    'on_auth_user_email_verification_changed / sync_lifetopia_email_verification / O',
    coalesce(
      max(
        trigger_name || ' / ' ||
        function_name || ' / ' ||
        enabled_state
      ) filter (
        where trigger_name =
          'on_auth_user_email_verification_changed'
      ),
      '<missing>'
    ),
    count(*) filter (
      where trigger_name =
        'on_auth_user_email_verification_changed'
        and function_name =
          'sync_lifetopia_email_verification'
        and enabled_state = 'O'
    ) = 1
  from auth_user_triggers

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
      ) filter (
        where trigger_name =
          'on_auth_user_created_create_lifetopia_profile'
      ),
      '<missing>'
    ),
    count(*) filter (
      where trigger_name =
        'on_auth_user_created_create_lifetopia_profile'
        and function_name =
          'handle_new_lifetopia_profile'
        and enabled_state = 'O'
    ) = 1
  from auth_user_triggers

  union all

  select
    25,
    'signup function assigns lifetopian role',
    'true',
    (
      pg_get_functiondef(
        function_record.oid
      ) ilike '%''lifetopian''%'
    )::text,
    pg_get_functiondef(
      function_record.oid
    ) ilike '%''lifetopian''%'
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname =
      'handle_new_lifetopia_profile'

  union all

  select
    26,
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
