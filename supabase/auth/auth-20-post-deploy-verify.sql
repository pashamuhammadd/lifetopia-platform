-- Lifetopia Authentication
-- Auth 20 — Post-deployment production verification
--
-- SAFE: SELECT statements only. Run immediately after production smoke tests.
-- Production remains accepted only when all 12 rows return passed = true.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
    and profile.role = 'founder'
), checks as (
  select 1 as check_order, 'identity row counts still agree'::text as check_name,
    'true'::text as expected,
    (
      (select count(*) from auth.users) =
        (select count(*) from public.profiles)
      and (select count(*) from public.profiles) =
        (select count(*) from public.profile_private)
    )::text as actual

  union all

  select 2, 'Founder registry remains exact', '1',
    (select count(*)::text
      from public.lifetopia_founder_registry registry
      join founder on founder.id = registry.user_id)

  union all

  select 3, 'Founder badge remains exact', '1',
    (select count(*)::text
      from public.profile_badges badge
      join founder on founder.id = badge.user_id
      where badge.badge_code = 'founder')

  union all

  select 4, 'Founder verified TOTP remains enabled', 'true',
    (select (count(*) >= 1)::text
      from auth.mfa_factors factor
      join founder on founder.id = factor.user_id
      where factor.factor_type::text = 'totp'
        and factor.status::text = 'verified')

  union all

  select 5, 'Founder linked wallet remains exact', '1',
    (select count(*)::text
      from public.account_wallets wallet
      join founder on founder.id = wallet.user_id
      where wallet.chain = 'solana')

  union all

  select 6, 'Founder retains successful wallet-login history', 'true',
    (select (count(*) >= 1)::text
      from public.wallet_login_events event
      join founder on founder.id = event.user_id
      where event.event_type = 'session_issued'
        and event.success)

  union all

  select 7, 'no duplicate linked wallet address appeared', '0',
    (select count(*)::text
      from (
        select chain, address
        from public.account_wallets
        group by chain, address
        having count(*) > 1
      ) duplicates)

  union all

  select 8, 'wallet counters remain consistent with issued sessions', '0',
    (select count(*)::text
      from public.account_wallets wallet
      left join (
        select wallet_id, count(*)::bigint as issued_count
        from public.wallet_login_events
        where event_type = 'session_issued'
          and success
        group by wallet_id
      ) events on events.wallet_id = wallet.id
      where wallet.wallet_login_count <> coalesce(events.issued_count, 0))

  union all

  select 9, 'wallet-login terminal events retain proof events', '0',
    (select count(*)::text
      from public.wallet_login_events terminal
      where terminal.event_type in ('session_issued', 'session_failed')
        and not exists (
          select 1
          from public.wallet_login_events proof
          where proof.challenge_id = terminal.challenge_id
            and proof.event_type = 'proof_verified'
            and proof.success
            and proof.created_at <= terminal.created_at
        ))

  union all

  select 10, 'client privilege boundaries remain closed', 'true',
    (
      not has_column_privilege(
        'authenticated', 'public.profiles', 'role', 'UPDATE'
      )
      and not has_table_privilege(
        'authenticated', 'public.account_wallets', 'INSERT'
      )
      and not has_function_privilege(
        'authenticated',
        'public.finalize_solana_wallet_login(uuid,text,uuid)',
        'EXECUTE'
      )
    )::text

  union all

  select 11, 'critical immutability triggers remain enabled', '4',
    (select count(*)::text
      from pg_trigger trigger_record
      where trigger_record.tgname in (
        'protect_lifetopia_founder_profile_before_write',
        'protect_lifetopia_founder_badge_before_write',
        'protect_wallet_security_event_before_change',
        'protect_wallet_login_event_before_change'
      )
        and not trigger_record.tgisinternal
        and trigger_record.tgenabled <> 'D')

  union all

  select 12, 'public profile privacy remains intact', '0',
    (select count(*)::text
      from information_schema.columns
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
