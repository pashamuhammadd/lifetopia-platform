-- Lifetopia Authentication
-- Auth 16 — Founder candidate readiness
--
-- SAFE: SELECT statements only.
--
-- The intended Founder account must first:
--   1. exist as username pashamuhammad;
--   2. verify its email;
--   3. complete Account Access;
--   4. enable at least one verified TOTP authenticator.
--
-- Every row must return passed = true before continuing.

with founder_candidate as (
  select
    profile.id,
    profile.username,
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
    'exact username pashamuhammad exists once' as check_name,
    '1' as expected,
    count(*)::text as actual,
    count(*) = 1 as passed
  from founder_candidate

  union all

  select
    2,
    'Founder candidate uses Lifetopian baseline role',
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
    3,
    'Founder candidate account is active',
    'active',
    coalesce(
      (select account_status from founder_candidate limit 1),
      'missing'
    ),
    coalesce(
      (select account_status = 'active' from founder_candidate limit 1),
      false
    )

  union all

  select
    4,
    'Founder candidate email is verified',
    'true',
    coalesce(
      (
        select (email_verified_at is not null)::text
        from founder_candidate
        limit 1
      ),
      'false'
    ),
    coalesce(
      (
        select email_verified_at is not null
        from founder_candidate
        limit 1
      ),
      false
    )

  union all

  select
    5,
    'Founder candidate accepted current legal documents',
    'false',
    coalesce(
      (
        select legal_reconsent_required::text
        from founder_candidate
        limit 1
      ),
      'true'
    ),
    coalesce(
      (
        select not legal_reconsent_required
        from founder_candidate
        limit 1
      ),
      false
    )

  union all

  select
    6,
    'Founder candidate has permanent username',
    'false',
    coalesce(
      (
        select requires_username_update::text
        from founder_candidate
        limit 1
      ),
      'true'
    ),
    coalesce(
      (
        select not requires_username_update
        from founder_candidate
        limit 1
      ),
      false
    )

  union all

  select
    7,
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
) checks
order by check_order;
