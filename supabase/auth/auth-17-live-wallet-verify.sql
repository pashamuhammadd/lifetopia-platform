-- Lifetopia Authentication
-- Auth 17 — Founder live wallet-link verification
--
-- Run only after pashamuhammad successfully links a wallet through
-- https://lifetopiaworld.io/account/wallet.
-- Every row must return passed = true before Auth 17 is closed.

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
checks as (
  select
    1 as check_order,
    'pashamuhammad has exactly one linked Solana wallet'::text as check_name,
    '1'::text as expected,
    (select count(*)::text from founder_wallet) as actual

  union all

  select
    2,
    'linked address has the required Solana base58 shape',
    'true',
    coalesce(
      (
        select (
          address ~ '^[1-9A-HJ-NP-Za-km-z]{32,44}$'
        )::text
        from founder_wallet
        limit 1
      ),
      'false'
    )

  union all

  select
    3,
    'linked address is globally unique',
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
    4,
    'successful link audit event exists',
    '1',
    (
      select count(*)::text
      from public.wallet_security_events event
      join founder_wallet wallet
        on wallet.id = event.wallet_id
       and wallet.address = event.address
      where event.event_type = 'linked'
    )

  union all

  select
    5,
    'a consumed signing challenge exists for the linked address',
    'true',
    (
      exists (
        select 1
        from public.wallet_link_challenges challenge
        join founder_wallet wallet
          on wallet.user_id = challenge.user_id
         and wallet.address = challenge.address
        where challenge.consumed_at is not null
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
    'Founder keeps verified TOTP protection',
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
    'Founder role and badge remain protected',
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
    'wallet timestamp is internally consistent',
    'true',
    coalesce(
      (
        select (
          last_verified_at >= linked_at
          and linked_at <= now()
        )::text
        from founder_wallet
        limit 1
      ),
      'false'
    )

  union all

  select
    10,
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
