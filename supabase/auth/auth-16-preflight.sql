-- Lifetopia Authentication
-- Auth 16 — Founder provisioning preflight
--
-- SAFE: SELECT statements only.
-- Continue only when every row returns passed = true.

with founder_candidate as (
  select
    profile.id,
    profile.role,
    private_profile.account_status,
    private_profile.email_verified_at,
    private_profile.legal_reconsent_required,
    private_profile.requires_username_update
  from public.profiles profile
  join public.profile_private private_profile
    on private_profile.user_id = profile.id
  where profile.username = 'pashamuhammad'
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
    'Auth 15 identity catalogs and profile badges exist' as check_name,
    '3' as expected,
    count(*)::text as actual,
    count(*) = 3 as passed
  from information_schema.tables
  where table_schema = 'public'
    and table_name in (
      'lifetopia_role_catalog',
      'badge_catalog',
      'profile_badges'
    )

  union all

  select
    2,
    'Auth 15 controlled identity functions exist',
    '3',
    count(*)::text,
    count(*) = 3
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid = function_record.pronamespace
  where function_schema.nspname = 'public'
    and function_record.proname in (
      'assign_lifetopia_primary_role',
      'grant_lifetopia_badge',
      'revoke_lifetopia_badge'
    )

  union all

  select
    3,
    'no Founder primary role exists yet',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profiles
  where role = 'founder'

  union all

  select
    4,
    'no Founder badge exists yet',
    '0',
    count(*)::text,
    count(*) = 0
  from public.profile_badges
  where badge_code = 'founder'

  union all

  select
    5,
    'Founder registry does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from information_schema.tables
  where table_schema = 'public'
    and table_name = 'lifetopia_founder_registry'

  union all

  select
    6,
    'Founder provisioning function does not exist yet',
    '0',
    count(*)::text,
    count(*) = 0
  from pg_proc function_record
  join pg_namespace function_schema
    on function_schema.oid = function_record.pronamespace
  where function_schema.nspname = 'public'
    and function_record.proname = 'provision_lifetopia_founder'

  union all

  select
    7,
    'exact Founder candidate exists once',
    '1',
    count(*)::text,
    count(*) = 1
  from founder_candidate

  union all

  select
    8,
    'Founder candidate uses Lifetopian baseline',
    'lifetopian',
    coalesce(
      (select role from founder_candidate limit 1),
      'missing'
    ),
    coalesce(
      (select role = 'lifetopian' from founder_candidate limit 1),
      false
    )

  union all

  select
    9,
    'Founder candidate account setup is complete',
    'true',
    coalesce(
      (
        select (
          account_status = 'active'
          and email_verified_at is not null
          and not legal_reconsent_required
          and not requires_username_update
        )::text
        from founder_candidate
        limit 1
      ),
      'false'
    ),
    coalesce(
      (
        select
          account_status = 'active'
          and email_verified_at is not null
          and not legal_reconsent_required
          and not requires_username_update
        from founder_candidate
        limit 1
      ),
      false
    )

  union all

  select
    10,
    'Founder candidate has verified TOTP MFA',
    'at least 1',
    (
      select count(*)::text
      from auth.mfa_factors factor
      where factor.user_id = (
        select id from founder_candidate limit 1
      )
        and factor.factor_type::text = 'totp'
        and factor.status::text = 'verified'
    ),
    (
      select count(*)
      from auth.mfa_factors factor
      where factor.user_id = (
        select id from founder_candidate limit 1
      )
        and factor.factor_type::text = 'totp'
        and factor.status::text = 'verified'
    ) >= 1

  union all

  select
    11,
    'authenticated clients cannot update primary role directly',
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
    12,
    'auth user and profile counts match',
    (select count(*) from auth.users)::text,
    (select count(*) from public.profiles)::text,
    (select count(*) from auth.users) =
      (select count(*) from public.profiles)
) checks
order by check_order;
