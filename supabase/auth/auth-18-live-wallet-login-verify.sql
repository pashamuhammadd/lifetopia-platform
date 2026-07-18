-- Lifetopia Authentication
-- Auth 18 — Founder live wallet-login verification
--
-- Run only after:
--   1. pashamuhammad signs out;
--   2. logs in through /wallet-login using the linked wallet;
--   3. completes the required TOTP challenge;
--   4. reaches the authenticated dashboard.
--
-- Every row must return passed = true before Auth 18 is closed.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
),
founder_wallet as (
  select wallet.*
  from public.account_wallets wallet
  join founder
    on founder.id = wallet.user_id
  where wallet.chain = 'solana'
),
latest_success as (
  select event.*
  from public.wallet_login_events event
  join founder
    on founder.id = event.user_id
  where event.event_type = 'session_issued'
    and event.success
  order by event.created_at desc
  limit 1
),
checks as (
  select
    1 as check_order,
    'Founder wallet has completed at least one wallet login'::text as check_name,
    'true'::text as expected,
    (
      exists (
        select 1
        from founder_wallet
        where wallet_login_count >= 1
      )
    )::text as actual

  union all

  select
    2,
    'Founder wallet has a valid last login timestamp',
    'true',
    (
      exists (
        select 1
        from founder_wallet
        where last_login_at is not null
          and last_login_at >= linked_at
          and last_login_at <= now()
      )
    )::text

  union all

  select
    3,
    'latest successful login has a verified proof event',
    'true',
    (
      exists (
        select 1
        from latest_success success_event
        join public.wallet_login_events proof_event
          on proof_event.challenge_id = success_event.challenge_id
         and proof_event.request_id = success_event.request_id
         and proof_event.wallet_id = success_event.wallet_id
        where proof_event.event_type = 'proof_verified'
          and proof_event.success
      )
    )::text

  union all

  select
    4,
    'latest successful login challenge was consumed once',
    'true',
    (
      exists (
        select 1
        from latest_success success_event
        join public.wallet_login_challenges challenge
          on challenge.id = success_event.challenge_id
         and challenge.address = success_event.address
        where challenge.consumed_at is not null
      )
    )::text

  union all

  select
    5,
    'latest successful session belongs to the linked Founder wallet',
    'true',
    (
      exists (
        select 1
        from latest_success success_event
        join founder_wallet wallet
          on wallet.id = success_event.wallet_id
         and wallet.address = success_event.address
      )
    )::text

  union all

  select
    6,
    'Founder account remains active and verified',
    'true',
    (
      exists (
        select 1
        from founder
        join public.profile_private private_profile
          on private_profile.user_id = founder.id
        where private_profile.account_status = 'active'
          and private_profile.email_verified_at is not null
          and not private_profile.legal_reconsent_required
          and not private_profile.requires_username_update
      )
    )::text

  union all

  select
    7,
    'Founder keeps verified TOTP MFA',
    'true',
    (
      exists (
        select 1
        from founder
        join auth.mfa_factors factor
          on factor.user_id = founder.id
        where factor.factor_type::text = 'totp'
          and factor.status::text = 'verified'
      )
    )::text

  union all

  select
    8,
    'Founder role badge and registry remain protected',
    'true',
    (
      exists (
        select 1
        from founder
        join public.profiles profile
          on profile.id = founder.id
        join public.profile_badges badge
          on badge.user_id = founder.id
         and badge.badge_code = 'founder'
        join public.lifetopia_founder_registry registry
          on registry.user_id = founder.id
        where profile.role = 'founder'
      )
    )::text

  union all

  select
    9,
    'Founder linked address remains globally unique',
    '1',
    coalesce(
      (
        select count(*)::text
        from public.account_wallets wallet
        where wallet.chain = 'solana'
          and wallet.address = (
            select address
            from founder_wallet
            limit 1
          )
      ),
      '0'
    )

  union all

  select
    10,
    'wallet proof verification timestamp remains current',
    'true',
    (
      exists (
        select 1
        from founder_wallet
        where last_verified_at >= linked_at
          and last_verified_at <= now()
      )
    )::text

  union all

  select
    11,
    'auth user and profile counts remain equal',
    (select count(*)::text from auth.users),
    (select count(*)::text from public.profiles)
)
select
  check_order,
  check_name,
  expected,
  actual,
  actual = expected as passed
from checks
order by check_order;
