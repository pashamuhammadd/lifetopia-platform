-- Lifetopia Authentication
-- Auth 0.5A — Inspect snapshot
--
-- Read-only helper. Use only when reviewing or preparing a rollback.

-- Snapshot summary
select
  snapshot_id,
  label,
  created_at,
  created_by,
  profile_count,
  auth_user_count,
  schema_object_count,
  profiles_checksum,
  auth_users_checksum,
  notes
from auth_migration_backup.snapshot_runs
order by created_at desc;

-- Profile rows captured in the selected snapshot
select
  profile_id,
  row_data
from auth_migration_backup.profile_rows
where snapshot_id = (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
)
order by
  lower(row_data ->> 'username');

-- Auth users without matching profiles at snapshot time
select
  auth_user_rows.user_id,
  auth_user_rows.row_data
from auth_migration_backup.auth_user_rows auth_user_rows
left join auth_migration_backup.profile_rows profile_rows
  on profile_rows.snapshot_id =
    auth_user_rows.snapshot_id
  and profile_rows.profile_id =
    auth_user_rows.user_id
where auth_user_rows.snapshot_id = (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
)
and profile_rows.profile_id is null
order by
  auth_user_rows.row_data ->> 'created_at';

-- Captured trigger and function definitions
select
  object_type,
  object_key,
  definition
from auth_migration_backup.schema_objects
where snapshot_id = (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
)
and object_type in (
  'trigger',
  'function'
)
order by object_type, object_key;

-- Captured policies and grants
select
  object_type,
  object_key,
  definition
from auth_migration_backup.schema_objects
where snapshot_id = (
  select snapshot_id
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_0_5_pre_migration_2026_07_18'
)
and object_type in (
  'policy',
  'table_grant',
  'column_grant'
)
order by object_type, object_key;
