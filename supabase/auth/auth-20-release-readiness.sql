-- Lifetopia Authentication
-- Auth 20 — Production release readiness
--
-- SAFE: SELECT statements only. No production data is changed.
-- Release is blocked unless all 20 rows return passed = true.

with founder as (
  select profile.id
  from public.profiles profile
  where profile.username = 'pashamuhammad'
    and profile.role = 'founder'
), checks as (
  select
    1 as check_order,
    'auth user and public profile counts match'::text as check_name,
    (select count(*)::text from auth.users) as expected,
    (select count(*)::text from public.profiles) as actual

  union all

  select 2, 'public and private profile counts match',
    (select count(*)::text from public.profiles),
    (select count(*)::text from public.profile_private)

  union all

  select 3, 'Founder identity is exact', '1',
    (select count(*)::text
      from public.lifetopia_founder_registry registry
      join founder on founder.id = registry.user_id)

  union all

  select 4, 'Founder badge is exact', '1',
    (select count(*)::text
      from public.profile_badges badge
      join founder on founder.id = badge.user_id
      where badge.badge_code = 'founder')

  union all

  select 5, 'Founder account remains active and verified', 'true',
    coalesce((
      select (
        private_profile.account_status = 'active'
        and private_profile.email_verified_at is not null
        and not private_profile.legal_reconsent_required
        and not private_profile.requires_username_update
      )::text
      from public.profile_private private_profile
      join founder on founder.id = private_profile.user_id
    ), 'false')

  union all

  select 6, 'Founder keeps verified TOTP protection', 'true',
    (select (count(*) >= 1)::text
      from auth.mfa_factors factor
      join founder on founder.id = factor.user_id
      where factor.factor_type::text = 'totp'
        and factor.status::text = 'verified')

  union all

  select 7, 'Founder has exactly one linked Solana wallet', '1',
    (select count(*)::text
      from public.account_wallets wallet
      join founder on founder.id = wallet.user_id
      where wallet.chain = 'solana')

  union all

  select 8, 'Founder completed a successful wallet login', 'true',
    (select (count(*) >= 1)::text
      from public.wallet_login_events event
      join founder on founder.id = event.user_id
      where event.event_type = 'session_issued'
        and event.success)

  union all

  select 9, 'Auth 15-18 service functions remain installed', '10',
    (select count(*)::text
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
      where regprocedure_value is not null)

  union all

  select 10, 'RLS protects Auth 15-18 identity and wallet tables', '7',
    (select count(*)::text
      from pg_class relation
      join pg_namespace namespace
        on namespace.oid = relation.relnamespace
      where namespace.nspname = 'public'
        and relation.relname in (
          'profile_badges',
          'lifetopia_founder_registry',
          'account_wallets',
          'wallet_link_challenges',
          'wallet_security_events',
          'wallet_login_challenges',
          'wallet_login_events'
        )
        and relation.relrowsecurity)

  union all

  select 11, 'authenticated clients cannot self-promote or self-badge', 'true',
    (
      not has_column_privilege(
        'authenticated', 'public.profiles', 'role', 'UPDATE'
      )
      and not has_table_privilege(
        'authenticated', 'public.profile_badges', 'INSERT'
      )
    )::text

  union all

  select 12, 'authenticated clients cannot mutate linked wallet identity', 'true',
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

  union all

  select 13, 'anonymous and authenticated clients cannot finalize wallet login', 'true',
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

  union all

  select 14, 'Founder and wallet audit immutability triggers are active', '4',
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

  select 15, 'Founder singleton indexes remain installed', '2',
    (select count(*)::text
      from pg_indexes
      where schemaname = 'public'
        and indexname in (
          'profiles_single_founder_idx',
          'profile_badges_single_founder_idx'
        ))

  union all

  select 16, 'wallet login has one terminal result per challenge', '1',
    (select count(*)::text
      from pg_indexes
      where schemaname = 'public'
        and tablename = 'wallet_login_events'
        and indexname = 'wallet_login_events_one_session_result_idx')

  union all

  select 17, 'no orphan public profile exists', '0',
    (select count(*)::text
      from public.profiles profile
      left join auth.users auth_user on auth_user.id = profile.id
      where auth_user.id is null)

  union all

  select 18, 'no orphan linked wallet exists', '0',
    (select count(*)::text
      from public.account_wallets wallet
      left join public.profiles profile on profile.id = wallet.user_id
      where profile.id is null)

  union all

  select 19, 'linked wallet addresses remain unique per chain', '0',
    (select count(*)::text
      from (
        select chain, address
        from public.account_wallets
        group by chain, address
        having count(*) > 1
      ) duplicate_wallets)

  union all

  select 20, 'exact dates of birth remain outside public profiles', '0',
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
