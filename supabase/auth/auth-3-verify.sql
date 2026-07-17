-- Lifetopia Authentication
-- Auth 3 — Verify legacy account migration
--
-- SAFE: SELECT statements only.
-- Every row must return passed = true.

with migration_snapshot as (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_3_pre_legacy_migration_2026_07_18'
),
public_profile_differences as (
  select count(*) as difference_count
  from auth_migration_backup.profile_rows
    backup_profile
  left join public.profiles current_profile
    on current_profile.id =
      backup_profile.profile_id
  where backup_profile.snapshot_id = (
    select snapshot_id
    from migration_snapshot
  )
  and (
    current_profile.id is null
    or to_jsonb(current_profile) <>
      backup_profile.row_data
  )
),
private_profile_differences as (
  select count(*) as difference_count
  from auth_migration_backup.profile_private_rows
    backup_private
  left join public.profile_private
    current_private
    on current_private.user_id =
      backup_private.user_id
  where backup_private.snapshot_id = (
    select snapshot_id
    from migration_snapshot
  )
  and (
    current_private.user_id is null
    or (
      to_jsonb(current_private)
        - 'legacy_migration_version'
        - 'legacy_migrated_at'
        - 'updated_at'
    ) <>
      (
        backup_private.row_data
          - 'updated_at'
      )
  )
),
migration_state_mismatches as (
  select migration_record.user_id
  from public.account_legacy_migrations
    migration_record
  join public.profile_private private_profile
    on private_profile.user_id =
      migration_record.user_id
  join public.profiles profile
    on profile.id =
      migration_record.user_id
  where migration_record.migration_version =
    'legacy_auth_v1_2026_07_18'
    and (
      migration_record.final_role
        is distinct from profile.role
      or migration_record.email_verification_required
        is distinct from
          (
            private_profile.email_verified_at
              is null
          )
      or migration_record.legal_reconsent_required
        is distinct from
          private_profile.legal_reconsent_required
      or migration_record.guardian_consent_required
        is distinct from
          private_profile.guardian_consent_required
      or migration_record.guardian_consent_status
        is distinct from
          private_profile.guardian_consent_status
      or migration_record.username_selection_required
        is distinct from
          private_profile.requires_username_update
      or migration_record.free_username_change_preserved
        is distinct from
          (
            not
              private_profile.free_username_change_used
          )
    )
),
auth_email_mismatches as (
  select private_profile.user_id
  from public.profile_private private_profile
  join auth.users auth_user
    on auth_user.id =
      private_profile.user_id
  where private_profile.email_verified_at
    is distinct from
      auth_user.email_confirmed_at
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
    'Auth 3 safety snapshot exists'
      as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from migration_snapshot

  union all

  select
    2,
    'every account has one legacy migration record',
    (select count(*) from public.profiles)::text,
    count(*)::text,
    count(*) =
      (select count(*) from public.profiles)
  from public.account_legacy_migrations
  where migration_version =
    'legacy_auth_v1_2026_07_18'

  union all

  select
    3,
    'public profile data is completely unchanged',
    '0',
    difference_count::text,
    difference_count = 0
  from public_profile_differences

  union all

  select
    4,
    'private account data is unchanged except migration metadata',
    '0',
    difference_count::text,
    difference_count = 0
  from private_profile_differences

  union all

  select
    5,
    'migration ledger matches live account state',
    '0',
    count(*)::text,
    count(*) = 0
  from migration_state_mismatches

  union all

  select
    6,
    'email verification state still matches auth.users',
    '0',
    count(*)::text,
    count(*) = 0
  from auth_email_mismatches

  union all

  select
    7,
    'unverified legacy users are marked for verification',
    (
      select count(*)::text
      from auth.users
      where email_confirmed_at is null
    ),
    (
      select count(*)::text
      from public.account_legacy_migrations
      where migration_version =
        'legacy_auth_v1_2026_07_18'
        and email_verification_required
    ),
    (
      select count(*)
      from auth.users
      where email_confirmed_at is null
    ) =
      (
        select count(*)
        from public.account_legacy_migrations
        where migration_version =
          'legacy_auth_v1_2026_07_18'
          and email_verification_required
      )

  union all

  select
    8,
    'existing users still require legal re-consent',
    (select count(*) from public.profiles)::text,
    count(*)::text,
    count(*) =
      (select count(*) from public.profiles)
  from public.account_legacy_migrations
  where migration_version =
    'legacy_auth_v1_2026_07_18'
    and legal_reconsent_required

  union all

  select
    9,
    'existing users were not silently consented',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_legal_consents

  union all

  select
    10,
    'one reviewed account still requires username selection',
    '1',
    count(*)::text,
    count(*) = 1
  from public.account_legacy_migrations
  where migration_version =
    'legacy_auth_v1_2026_07_18'
    and username_selection_required

  union all

  select
    11,
    'all legacy accounts preserve free username change',
    (select count(*) from public.profiles)::text,
    count(*)::text,
    count(*) =
      (select count(*) from public.profiles)
  from public.account_legacy_migrations
  where migration_version =
    'legacy_auth_v1_2026_07_18'
    and free_username_change_preserved

  union all

  select
    12,
    'all accounts have legacy migration metadata',
    (select count(*) from public.profile_private)::text,
    count(*)::text,
    count(*) =
      (select count(*) from public.profile_private)
  from public.profile_private
  where legacy_migration_version =
    'legacy_auth_v1_2026_07_18'
    and legacy_migrated_at is not null

  union all

  select
    13,
    'authenticated can read own migration ledger through RLS',
    'true',
    has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'SELECT'
    )::text,
    has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'SELECT'
    )

  union all

  select
    14,
    'anonymous users cannot read migration ledger',
    'false',
    has_table_privilege(
      'anon',
      'public.account_legacy_migrations',
      'SELECT'
    )::text,
    not has_table_privilege(
      'anon',
      'public.account_legacy_migrations',
      'SELECT'
    )

  union all

  select
    15,
    'authenticated cannot insert migration records',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'INSERT'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'INSERT'
    )

  union all

  select
    16,
    'authenticated cannot update migration records',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'UPDATE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'UPDATE'
    )

  union all

  select
    17,
    'authenticated cannot delete migration records',
    'false',
    has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'DELETE'
    )::text,
    not has_table_privilege(
      'authenticated',
      'public.account_legacy_migrations',
      'DELETE'
    )

  union all

  select
    18,
    'one owner migration policy exists',
    '1',
    count(*)::text,
    count(*) = 1
      and max(policyname) =
        'Users can view their own legacy migration'
  from pg_policies
  where schemaname = 'public'
    and tablename =
      'account_legacy_migrations'

  union all

  select
    19,
    'required-actions function exists',
    '1',
    count(*)::text,
    count(*) = 1
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname =
      'get_my_required_account_actions'

  union all

  select
    20,
    'required-actions function is available to authenticated users',
    'true',
    has_function_privilege(
      'authenticated',
      'public.get_my_required_account_actions()',
      'EXECUTE'
    )::text,
    has_function_privilege(
      'authenticated',
      'public.get_my_required_account_actions()',
      'EXECUTE'
    )

  union all

  select
    21,
    'required-actions function is unavailable to anonymous users',
    'false',
    has_function_privilege(
      'anon',
      'public.get_my_required_account_actions()',
      'EXECUTE'
    )::text,
    not has_function_privilege(
      'anon',
      'public.get_my_required_account_actions()',
      'EXECUTE'
    )

  union all

  select
    22,
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
