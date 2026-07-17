-- Lifetopia Authentication
-- Auth 3 — Legacy account migration preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

with auth_counts as (
  select
    count(*) as total_users,
    count(*) filter (
      where email_confirmed_at is not null
    ) as verified_users,
    count(*) filter (
      where email_confirmed_at is null
    ) as unverified_users
  from auth.users
),
profile_counts as (
  select
    count(*) as total_profiles,
    count(*) filter (
      where role = 'lifetopian'
    ) as lifetopian_profiles
  from public.profiles
),
private_counts as (
  select
    count(*) as total_private_profiles,
    count(*) filter (
      where email_verified_at is not null
    ) as verified_private_profiles,
    count(*) filter (
      where email_verified_at is null
    ) as unverified_private_profiles,
    count(*) filter (
      where legal_reconsent_required
    ) as legal_reconsent_profiles,
    count(*) filter (
      where guardian_consent_required
    ) as guardian_required_profiles,
    count(*) filter (
      where requires_username_update
    ) as username_update_profiles,
    count(*) filter (
      where free_username_change_used
    ) as free_change_used_profiles
  from public.profile_private
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
    'Auth 3 safety snapshot does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from auth_migration_backup.snapshot_runs
  where label =
    'auth_3_pre_legacy_migration_2026_07_18'

  union all

  select
    3,
    'auth user and profile counts match',
    auth_counts.total_users::text,
    profile_counts.total_profiles::text,
    auth_counts.total_users =
      profile_counts.total_profiles
  from auth_counts
  cross join profile_counts

  union all

  select
    4,
    'public and private profile counts match',
    profile_counts.total_profiles::text,
    private_counts.total_private_profiles::text,
    profile_counts.total_profiles =
      private_counts.total_private_profiles
  from profile_counts
  cross join private_counts

  union all

  select
    5,
    'email verification state matches auth.users',
    auth_counts.verified_users::text,
    private_counts.verified_private_profiles::text,
    auth_counts.verified_users =
      private_counts.verified_private_profiles
    and auth_counts.unverified_users =
      private_counts.unverified_private_profiles
  from auth_counts
  cross join private_counts

  union all

  select
    6,
    'all existing accounts require current legal acceptance',
    profile_counts.total_profiles::text,
    private_counts.legal_reconsent_profiles::text,
    profile_counts.total_profiles =
      private_counts.legal_reconsent_profiles
  from profile_counts
  cross join private_counts

  union all

  select
    7,
    'one reviewed account requires username selection',
    '1',
    private_counts.username_update_profiles::text,
    private_counts.username_update_profiles = 1
  from private_counts

  union all

  select
    8,
    'no legacy account has consumed free username change',
    '0',
    private_counts.free_change_used_profiles::text,
    private_counts.free_change_used_profiles = 0
  from private_counts

  union all

  select
    9,
    'all account statuses are active before migration',
    profile_counts.total_profiles::text,
    (
      select count(*)::text
      from public.profile_private
      where account_status = 'active'
    ),
    profile_counts.total_profiles = (
      select count(*)
      from public.profile_private
      where account_status = 'active'
    )
  from profile_counts

  union all

  select
    10,
    'all public roles use final vocabulary',
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
    11,
    'legacy migration table does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name =
      'account_legacy_migrations'

  union all

  select
    12,
    'required-actions function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_namespace
    on function_namespace.oid =
      function_record.pronamespace
  where function_namespace.nspname = 'public'
    and function_record.proname =
      'get_my_required_account_actions'

  union all

  select
    13,
    'legacy migration metadata columns do not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'profile_private'
    and column_name in (
      'legacy_migration_version',
      'legacy_migrated_at'
    )

  union all

  select
    14,
    'existing users have not been silently consented',
    '0',
    count(*)::text,
    count(*) = 0
  from public.account_legal_consents

  union all

  select
    15,
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
) checks
order by check_order;
