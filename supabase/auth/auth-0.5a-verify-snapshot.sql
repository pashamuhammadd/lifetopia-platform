-- Lifetopia Authentication
-- Auth 0.5A — Verify pre-migration safety snapshot
--
-- Run after auth-0.5a-create-snapshot.sql.
-- This script only reads data.

with selected_snapshot as (
  select *
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
),
snapshot_values as (
  select
    selected_snapshot.snapshot_id,
    selected_snapshot.profile_count,
    selected_snapshot.auth_user_count,
    selected_snapshot.schema_object_count,
    selected_snapshot.profiles_checksum,
    selected_snapshot.auth_users_checksum,
    (
      select count(*)
      from auth_migration_backup.profile_rows profile_rows
      where profile_rows.snapshot_id =
        selected_snapshot.snapshot_id
    ) as stored_profile_rows,
    (
      select count(*)
      from auth_migration_backup.auth_user_rows auth_user_rows
      where auth_user_rows.snapshot_id =
        selected_snapshot.snapshot_id
    ) as stored_auth_user_rows,
    (
      select count(*)
      from auth_migration_backup.schema_objects schema_objects
      where schema_objects.snapshot_id =
        selected_snapshot.snapshot_id
    ) as stored_schema_objects,
    (
      select md5(
        coalesce(
          string_agg(
            md5(profile_rows.row_data::text),
            ''
            order by profile_rows.profile_id::text
          ),
          ''
        )
      )
      from auth_migration_backup.profile_rows profile_rows
      where profile_rows.snapshot_id =
        selected_snapshot.snapshot_id
    ) as recalculated_profiles_checksum,
    (
      select md5(
        coalesce(
          string_agg(
            md5(auth_user_rows.row_data::text),
            ''
            order by auth_user_rows.user_id::text
          ),
          ''
        )
      )
      from auth_migration_backup.auth_user_rows auth_user_rows
      where auth_user_rows.snapshot_id =
        selected_snapshot.snapshot_id
    ) as recalculated_auth_users_checksum,
    (
      select count(*)
      from auth_migration_backup.auth_user_rows auth_user_rows
      where auth_user_rows.snapshot_id =
        selected_snapshot.snapshot_id
        and (
          auth_user_rows.row_data
            ? 'encrypted_password'
          or auth_user_rows.row_data
            ? 'confirmation_token'
          or auth_user_rows.row_data
            ? 'recovery_token'
          or auth_user_rows.row_data
            ? 'email_change_token_new'
          or auth_user_rows.row_data
            ? 'email_change_token_current'
          or auth_user_rows.row_data
            ? 'phone_change_token'
          or auth_user_rows.row_data
            ? 'reauthentication_token'
        )
    ) as rows_containing_excluded_secrets
  from selected_snapshot
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
    'snapshot exists' as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from selected_snapshot

  union all

  select
    2,
    'profile row count matches',
    profile_count::text,
    stored_profile_rows::text,
    profile_count = stored_profile_rows
  from snapshot_values

  union all

  select
    3,
    'auth user row count matches',
    auth_user_count::text,
    stored_auth_user_rows::text,
    auth_user_count = stored_auth_user_rows
  from snapshot_values

  union all

  select
    4,
    'schema object count matches',
    schema_object_count::text,
    stored_schema_objects::text,
    schema_object_count =
      stored_schema_objects
  from snapshot_values

  union all

  select
    5,
    'profiles checksum matches',
    profiles_checksum,
    recalculated_profiles_checksum,
    profiles_checksum =
      recalculated_profiles_checksum
  from snapshot_values

  union all

  select
    6,
    'auth users checksum matches',
    auth_users_checksum,
    recalculated_auth_users_checksum,
    auth_users_checksum =
      recalculated_auth_users_checksum
  from snapshot_values

  union all

  select
    7,
    'secret auth fields excluded',
    '0',
    rows_containing_excluded_secrets::text,
    rows_containing_excluded_secrets = 0
  from snapshot_values

  union all

  select
    8,
    'anon has no schema usage',
    'false',
    has_schema_privilege(
      'anon',
      'auth_migration_backup',
      'USAGE'
    )::text,
    not has_schema_privilege(
      'anon',
      'auth_migration_backup',
      'USAGE'
    )

  union all

  select
    9,
    'authenticated has no schema usage',
    'false',
    has_schema_privilege(
      'authenticated',
      'auth_migration_backup',
      'USAGE'
    )::text,
    not has_schema_privilege(
      'authenticated',
      'auth_migration_backup',
      'USAGE'
    )
) checks
order by check_order;
