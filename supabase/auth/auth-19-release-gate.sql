-- Lifetopia Authentication
-- Auth 19 — Final database QA release gate
--
-- SAFE: SELECT statements only.
-- Run this last. Release is blocked unless all 15 rows return passed = true.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
    and profile.role = 'founder'
), checks as (
  select 1 as check_order, 'identity row counts agree'::text as check_name,
    'true'::text as expected,
    (
      (select count(*) from auth.users) =
        (select count(*) from public.profiles)
      and (select count(*) from public.profiles) =
        (select count(*) from public.profile_private)
    )::text as actual

  union all select 2, 'Founder registry is exact', '1',
    (select count(*)::text from public.lifetopia_founder_registry registry
      where registry.user_id = (select id from founder limit 1))

  union all select 3, 'Founder badge is exact', '1',
    (select count(*)::text from public.profile_badges badge
      where badge.user_id = (select id from founder limit 1)
        and badge.badge_code = 'founder')

  union all select 4, 'Founder TOTP remains verified', 'true',
    (select (count(*) >= 1)::text from auth.mfa_factors factor
      where factor.user_id = (select id from founder limit 1)
        and factor.factor_type::text = 'totp'
        and factor.status::text = 'verified')

  union all select 5, 'Founder Solana wallet remains linked', '1',
    (select count(*)::text from public.account_wallets wallet
      where wallet.user_id = (select id from founder limit 1)
        and wallet.chain = 'solana')

  union all select 6, 'Founder wallet login reached a session', 'true',
    (select (count(*) >= 1)::text from public.wallet_login_events event
      where event.user_id = (select id from founder limit 1)
        and event.event_type = 'session_issued'
        and event.success)

  union all select 7, 'no orphan profiles exist', '0',
    (select count(*)::text from public.profiles profile
      left join auth.users auth_user on auth_user.id = profile.id
      where auth_user.id is null)

  union all select 8, 'no orphan wallet identities exist', '0',
    (select count(*)::text from public.account_wallets wallet
      left join public.profiles profile on profile.id = wallet.user_id
      where profile.id is null)

  union all select 9, 'linked addresses remain globally unique per chain', '0',
    (select count(*)::text from (
      select chain, address from public.account_wallets
      group by chain, address having count(*) > 1
    ) duplicates)

  union all select 10, 'wallet counters match issued sessions', '0',
    (select count(*)::text from public.account_wallets wallet
      left join (
        select wallet_id, count(*)::bigint as issued_count
        from public.wallet_login_events
        where event_type = 'session_issued' and success
        group by wallet_id
      ) events on events.wallet_id = wallet.id
      where wallet.wallet_login_count <> coalesce(events.issued_count, 0))

  union all select 11, 'client role and badge writes remain blocked', 'true',
    (
      not has_column_privilege(
        'authenticated', 'public.profiles', 'role', 'UPDATE'
      )
      and not has_table_privilege(
        'authenticated', 'public.profile_badges', 'INSERT'
      )
    )::text

  union all select 12, 'client wallet writes remain blocked', 'true',
    (
      not has_table_privilege(
        'authenticated', 'public.account_wallets', 'INSERT'
      )
      and not has_table_privilege(
        'authenticated', 'public.account_wallets', 'UPDATE'
      )
      and not has_table_privilege(
        'authenticated', 'public.account_wallets', 'DELETE'
      )
    )::text

  union all select 13, 'client wallet-login finalizers remain blocked', 'true',
    (
      not has_function_privilege(
        'anon',
        'public.finalize_solana_wallet_login(uuid,text,uuid)',
        'EXECUTE'
      )
      and not has_function_privilege(
        'authenticated',
        'public.finalize_solana_wallet_login(uuid,text,uuid)',
        'EXECUTE'
      )
    )::text

  union all select 14, 'Founder and wallet audit triggers remain active', '4',
    (select count(*)::text from pg_trigger trigger_record
      where trigger_record.tgname in (
        'protect_lifetopia_founder_profile_before_write',
        'protect_lifetopia_founder_badge_before_write',
        'protect_wallet_security_event_before_change',
        'protect_wallet_login_event_before_change'
      )
      and not trigger_record.tgisinternal
      and trigger_record.tgenabled <> 'D')

  union all select 15, 'public profiles expose no exact date of birth', '0',
    (select count(*)::text from information_schema.columns
      where table_schema = 'public'
        and table_name = 'profiles'
        and column_name in ('date_of_birth', 'birth_date', 'dob'))
)
select
  check_order,
  check_name,
  expected,
  actual,
  actual = expected as passed
from checks
order by check_order;
