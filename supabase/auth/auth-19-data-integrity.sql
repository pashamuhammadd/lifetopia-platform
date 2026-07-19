-- Lifetopia Authentication
-- Auth 19 — Cross-phase identity and wallet data integrity
--
-- SAFE: SELECT statements only. Every row must return passed = true.

with checks as (
  select
    1 as check_order,
    'auth users have exactly one public profile'::text as check_name,
    '0'::text as expected,
    (
      select count(*)::text
      from auth.users auth_user
      left join public.profiles profile
        on profile.id = auth_user.id
      where profile.id is null
    ) as actual

  union all

  select
    2,
    'public profiles belong to an auth user',
    '0',
    (
      select count(*)::text
      from public.profiles profile
      left join auth.users auth_user
        on auth_user.id = profile.id
      where auth_user.id is null
    )

  union all

  select
    3,
    'every public profile has one private profile',
    '0',
    (
      select count(*)::text
      from public.profiles profile
      left join public.profile_private private_profile
        on private_profile.user_id = profile.id
      where private_profile.user_id is null
    )

  union all

  select
    4,
    'private profiles belong to a public profile',
    '0',
    (
      select count(*)::text
      from public.profile_private private_profile
      left join public.profiles profile
        on profile.id = private_profile.user_id
      where profile.id is null
    )

  union all

  select
    5,
    'usernames remain case-insensitively unique',
    '0',
    (
      select count(*)::text
      from (
        select lower(username::text)
        from public.profiles
        where username is not null
        group by lower(username::text)
        having count(*) > 1
      ) duplicate_usernames
    )

  union all

  select
    6,
    'Founder registry points to the protected Founder profile',
    '0',
    (
      select count(*)::text
      from public.lifetopia_founder_registry registry
      join public.profiles profile
        on profile.id = registry.user_id
      where profile.username <> 'pashamuhammad'
        or profile.role <> 'founder'
        or registry.username_at_provisioning::text <> 'pashamuhammad'
    )

  union all

  select
    7,
    'Founder has exactly one Founder badge',
    '1',
    (
      select count(*)::text
      from public.profile_badges badge
      join public.profiles profile
        on profile.id = badge.user_id
      where profile.username = 'pashamuhammad'
        and badge.badge_code = 'founder'
    )

  union all

  select
    8,
    'linked wallets belong to an existing profile',
    '0',
    (
      select count(*)::text
      from public.account_wallets wallet
      left join public.profiles profile
        on profile.id = wallet.user_id
      where profile.id is null
    )

  union all

  select
    9,
    'each user has at most one linked wallet per chain',
    '0',
    (
      select count(*)::text
      from (
        select user_id, chain
        from public.account_wallets
        group by user_id, chain
        having count(*) > 1
      ) duplicate_user_chain
    )

  union all

  select
    10,
    'each address belongs to at most one account per chain',
    '0',
    (
      select count(*)::text
      from (
        select chain, address
        from public.account_wallets
        group by chain, address
        having count(*) > 1
      ) duplicate_chain_address
    )

  union all

  select
    11,
    'linked Solana addresses have required base58 shape',
    '0',
    (
      select count(*)::text
      from public.account_wallets
      where chain = 'solana'
        and address !~ '^[1-9A-HJ-NP-Za-km-z]{32,44}$'
    )

  union all

  select
    12,
    'wallet timestamps and counters are internally consistent',
    '0',
    (
      select count(*)::text
      from public.account_wallets
      where wallet_login_count < 0
        or (wallet_login_count = 0 and last_login_at is not null)
        or (wallet_login_count > 0 and last_login_at is null)
        or (last_login_at is not null and last_login_at < linked_at)
    )

  union all

  select
    13,
    'wallet-link challenges have valid lifetime and consumption order',
    '0',
    (
      select count(*)::text
      from public.wallet_link_challenges
      where expires_at <= created_at
        or (consumed_at is not null and consumed_at < created_at)
    )

  union all

  select
    14,
    'wallet-login challenges have valid lifetime and consumption order',
    '0',
    (
      select count(*)::text
      from public.wallet_login_challenges
      where expires_at <= created_at
        or (consumed_at is not null and consumed_at < created_at)
    )

  union all

  select
    15,
    'successful wallet-login events contain no error code',
    '0',
    (
      select count(*)::text
      from public.wallet_login_events
      where success and error_code is not null
    )

  union all

  select
    16,
    'failed wallet-login events contain an error code',
    '0',
    (
      select count(*)::text
      from public.wallet_login_events
      where not success
        and (
          event_type <> 'session_failed'
          or error_code is null
          or btrim(error_code) = ''
        )
    )

  union all

  select
    17,
    'every terminal wallet-login event has a proof event',
    '0',
    (
      select count(*)::text
      from public.wallet_login_events terminal
      where terminal.event_type in ('session_issued', 'session_failed')
        and not exists (
          select 1
          from public.wallet_login_events proof
          where proof.challenge_id = terminal.challenge_id
            and proof.event_type = 'proof_verified'
            and proof.success
            and proof.created_at <= terminal.created_at
        )
    )

  union all

  select
    18,
    'wallet-login events reference their recorded wallet identity',
    '0',
    (
      select count(*)::text
      from public.wallet_login_events event
      left join public.account_wallets wallet
        on wallet.id = event.wallet_id
       and wallet.user_id = event.user_id
       and wallet.chain = event.chain
       and wallet.address = event.address
      where wallet.id is null
    )

  union all

  select
    19,
    'wallet login counters equal successful issued sessions',
    '0',
    (
      select count(*)::text
      from public.account_wallets wallet
      left join (
        select wallet_id, count(*)::bigint as issued_count
        from public.wallet_login_events
        where event_type = 'session_issued'
          and success
        group by wallet_id
      ) events
        on events.wallet_id = wallet.id
      where wallet.wallet_login_count <> coalesce(events.issued_count, 0)
    )

  union all

  select
    20,
    'Founder remains the only Founder role and badge holder',
    'true',
    (
      select (
        (select count(*) from public.profiles where role = 'founder') = 1
        and (
          select count(*)
          from public.profile_badges
          where badge_code = 'founder'
        ) = 1
      )::text
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
