-- Lifetopia Authentication
-- Auth 19 — QA readiness preflight
--
-- SAFE: SELECT statements only. This file never mutates production data.
-- Continue only when every row returns passed = true.

with checks as (
  select
    1 as check_order,
    'Auth 0-18 core identity tables exist'::text as check_name,
    '10'::text as expected,
    (
      select count(*)::text
      from (
        values
          (to_regclass('public.profiles')),
          (to_regclass('public.profile_private')),
          (to_regclass('public.profile_badges')),
          (to_regclass('public.lifetopia_founder_registry')),
          (to_regclass('public.account_wallets')),
          (to_regclass('public.wallet_link_challenges')),
          (to_regclass('public.wallet_security_events')),
          (to_regclass('public.wallet_login_challenges')),
          (to_regclass('public.wallet_login_events')),
          (to_regclass('auth.mfa_factors'))
      ) relations(regclass_value)
      where regclass_value is not null
    ) as actual

  union all

  select
    2,
    'Auth 15-18 protected service functions exist',
    '10',
    (
      select count(*)::text
      from (
        values
          (to_regprocedure('public.assign_lifetopia_primary_role(uuid,uuid,text,text)')),
          (to_regprocedure('public.grant_lifetopia_badge(uuid,uuid,text,text)')),
          (to_regprocedure('public.revoke_lifetopia_badge(uuid,uuid,text,text)')),
          (to_regprocedure('public.provision_lifetopia_founder(public.citext)')),
          (to_regprocedure('public.finalize_solana_wallet_link(uuid,uuid,text,uuid)')),
          (to_regprocedure('public.unlink_solana_wallet(uuid,uuid,uuid)')),
          (to_regprocedure('public.cleanup_wallet_link_challenges()')),
          (to_regprocedure('public.finalize_solana_wallet_login(uuid,text,uuid)')),
          (to_regprocedure('public.record_solana_wallet_login_result(uuid,uuid,uuid,uuid,boolean,text)')),
          (to_regprocedure('public.cleanup_wallet_login_challenges()'))
      ) functions(regprocedure_value)
      where regprocedure_value is not null
    )

  union all

  select
    3,
    'auth user and public profile counts match',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)

  union all

  select
    4,
    'public and private profile counts match',
    (select count(*)::text from public.profiles),
    (select count(*)::text from public.profile_private)

  union all

  select
    5,
    'Founder identity is provisioned exactly once',
    '1',
    (
      select count(*)::text
      from public.lifetopia_founder_registry registry
      join public.profiles profile
        on profile.id = registry.user_id
      join public.profile_badges badge
        on badge.user_id = registry.user_id
       and badge.badge_code = 'founder'
      where profile.username = 'pashamuhammad'
        and profile.role = 'founder'
    )

  union all

  select
    6,
    'Founder account remains active and verified',
    'true',
    coalesce(
      (
        select (
          private_profile.account_status = 'active'
          and private_profile.email_verified_at is not null
          and not private_profile.legal_reconsent_required
          and not private_profile.requires_username_update
        )::text
        from public.profiles profile
        join public.profile_private private_profile
          on private_profile.user_id = profile.id
        where profile.username = 'pashamuhammad'
        limit 1
      ),
      'false'
    )

  union all

  select
    7,
    'Founder keeps verified TOTP protection',
    'true',
    (
      select (count(*) >= 1)::text
      from auth.mfa_factors factor
      join public.profiles profile
        on profile.id = factor.user_id
      where profile.username = 'pashamuhammad'
        and factor.factor_type::text = 'totp'
        and factor.status::text = 'verified'
    )

  union all

  select
    8,
    'Founder has exactly one verified Solana wallet',
    '1',
    (
      select count(*)::text
      from public.account_wallets wallet
      join public.profiles profile
        on profile.id = wallet.user_id
      where profile.username = 'pashamuhammad'
        and wallet.chain = 'solana'
    )

  union all

  select
    9,
    'Founder completed at least one wallet login',
    'true',
    (
      select (
        count(*) >= 1
        and max(wallet.wallet_login_count) >= 1
      )::text
      from public.account_wallets wallet
      join public.profiles profile
        on profile.id = wallet.user_id
      where profile.username = 'pashamuhammad'
        and wallet.chain = 'solana'
        and wallet.last_login_at is not null
    )

  union all

  select
    10,
    'successful Founder wallet-login audit exists',
    'true',
    (
      select (count(*) >= 1)::text
      from public.wallet_login_events event
      join public.profiles profile
        on profile.id = event.user_id
      where profile.username = 'pashamuhammad'
        and event.event_type = 'session_issued'
        and event.success
    )

  union all

  select
    11,
    'no duplicate linked Solana address exists',
    '0',
    (
      select count(*)::text
      from (
        select address
        from public.account_wallets
        where chain = 'solana'
        group by address
        having count(*) > 1
      ) duplicates
    )

  union all

  select
    12,
    'exact dates of birth remain outside public profiles',
    '0',
    (
      select count(*)::text
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'profiles'
        and column_name in ('date_of_birth', 'birth_date', 'dob')
    )
)
select
  check_order,
  check_name,
  expected,
  actual,
  actual = expected as passed
from checks
order by check_order;
