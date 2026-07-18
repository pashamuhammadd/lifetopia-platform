-- Lifetopia Authentication
-- Auth 18 — Secure Solana wallet login
--
-- Security properties:
--   * only wallets verified by Auth 17 can request login;
--   * short-lived, single-use, server-created signing challenges;
--   * service-role-only signature finalization and session audit;
--   * account access state is rechecked immediately before session exchange;
--   * MFA-enabled accounts still enter at AAL1 and must complete AAL2;
--   * no authenticated or anonymous client can call database finalizers.
--
-- Run only after auth-18-preflight.sql returns passed = true for every row.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

alter table public.account_wallets
add column last_login_at timestamptz,
add column wallet_login_count bigint not null
  default 0,
add constraint account_wallets_login_count_nonnegative
  check (wallet_login_count >= 0);

create table public.wallet_login_challenges (
  id uuid primary key,
  chain text not null
    default 'solana'
    check (chain = 'solana'),
  address text not null
    check (
      address ~ '^[1-9A-HJ-NP-Za-km-z]{32,44}$'
    ),
  nonce text not null unique
    check (char_length(nonce) between 24 and 128),
  message text not null,
  request_fingerprint text not null
    check (
      request_fingerprint ~ '^[0-9a-f]{64}$'
    ),
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null
    default now(),
  check (expires_at > created_at),
  check (
    consumed_at is null
    or consumed_at >= created_at
  )
);

comment on table public.wallet_login_challenges
is
  'Private short-lived and single-use wallet-login challenges created by the website server.';

create index wallet_login_challenges_address_created_idx
on public.wallet_login_challenges (
  address,
  created_at desc
);

create index wallet_login_challenges_fingerprint_created_idx
on public.wallet_login_challenges (
  request_fingerprint,
  created_at desc
);

create index wallet_login_challenges_expiry_idx
on public.wallet_login_challenges (expires_at)
where consumed_at is null;

create table public.wallet_login_events (
  id uuid primary key
    default gen_random_uuid(),
  user_id uuid not null,
  wallet_id uuid not null,
  challenge_id uuid not null,
  chain text not null
    check (chain = 'solana'),
  address text not null,
  event_type text not null
    check (
      event_type in (
        'proof_verified',
        'session_issued',
        'session_failed'
      )
    ),
  success boolean not null,
  error_code text,
  request_id uuid not null,
  created_at timestamptz not null
    default now(),
  check (
    (
      success
      and event_type <> 'session_failed'
      and error_code is null
    )
    or (
      not success
      and event_type = 'session_failed'
      and error_code is not null
      and char_length(error_code) between 1 and 100
    )
  )
);

comment on table public.wallet_login_events
is
  'Append-only proof and Supabase session-exchange audit for wallet login.';

create index wallet_login_events_user_created_idx
on public.wallet_login_events (
  user_id,
  created_at desc
);

create index wallet_login_events_request_idx
on public.wallet_login_events (request_id);

create unique index wallet_login_events_one_session_result_idx
on public.wallet_login_events (challenge_id)
where event_type in (
  'session_issued',
  'session_failed'
);

alter table public.wallet_login_challenges
enable row level security;

alter table public.wallet_login_events
enable row level security;

create policy wallet_login_events_select_own
on public.wallet_login_events
for select
to authenticated
using (user_id = auth.uid());

revoke all
on table public.wallet_login_challenges
from public, anon, authenticated;

revoke all
on table public.wallet_login_events
from public, anon, authenticated;

grant select
on table public.wallet_login_events
to authenticated;

grant all
on table public.wallet_login_challenges
to service_role;

grant all
on table public.wallet_login_events
to service_role;

create trigger protect_wallet_login_event_before_change
before update or delete
on public.wallet_login_events
for each row
execute function public.protect_wallet_security_event();

create or replace function
  public.finalize_solana_wallet_login(
    p_challenge_id uuid,
    p_address text,
    p_request_id uuid
  )
returns table (
  authenticated_user_id uuid,
  authenticated_wallet_id uuid
)
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_user_id uuid;
  v_wallet_id uuid;
  v_challenge_address text;
  v_expires_at timestamptz;
  v_consumed_at timestamptz;
  v_account_status text;
  v_email_verified_at timestamptz;
  v_legal_required boolean;
  v_username_required boolean;
begin
  if p_challenge_id is null
    or p_request_id is null
    or p_address is null
  then
    raise exception
      'Wallet login finalization requires complete inputs.';
  end if;

  select
    challenge.address,
    challenge.expires_at,
    challenge.consumed_at
  into
    v_challenge_address,
    v_expires_at,
    v_consumed_at
  from public.wallet_login_challenges challenge
  where challenge.id = p_challenge_id
    and challenge.chain = 'solana'
  for update;

  if not found then
    raise exception
      'Wallet login challenge is unavailable.';
  end if;

  if v_consumed_at is not null then
    raise exception
      'Wallet login challenge has already been used.';
  end if;

  if v_expires_at <= now() then
    raise exception
      'Wallet login challenge has expired.';
  end if;

  if v_challenge_address <> p_address then
    raise exception
      'Wallet login address does not match its challenge.';
  end if;

  select
    wallet.id,
    wallet.user_id
  into
    v_wallet_id,
    v_user_id
  from public.account_wallets wallet
  where wallet.chain = 'solana'
    and wallet.address = p_address
  for update;

  if not found then
    raise exception
      'Verified wallet identity is unavailable.';
  end if;

  select
    private_profile.account_status,
    private_profile.email_verified_at,
    private_profile.legal_reconsent_required,
    private_profile.requires_username_update
  into
    v_account_status,
    v_email_verified_at,
    v_legal_required,
    v_username_required
  from public.profile_private private_profile
  where private_profile.user_id = v_user_id
  for update;

  if not found then
    raise exception
      'Wallet owner profile is unavailable.';
  end if;

  if v_account_status <> 'active' then
    raise exception
      'Wallet login is unavailable for this account.';
  end if;

  if v_email_verified_at is null then
    raise exception
      'Wallet login requires a verified account.';
  end if;

  if v_legal_required or v_username_required then
    raise exception
      'Account access requirements must be completed before wallet login.';
  end if;

  update public.wallet_login_challenges
  set consumed_at = now()
  where id = p_challenge_id;

  update public.account_wallets
  set last_verified_at = now()
  where id = v_wallet_id;

  insert into public.wallet_login_events (
    user_id,
    wallet_id,
    challenge_id,
    chain,
    address,
    event_type,
    success,
    error_code,
    request_id
  )
  values (
    v_user_id,
    v_wallet_id,
    p_challenge_id,
    'solana',
    p_address,
    'proof_verified',
    true,
    null,
    p_request_id
  );

  return query
  select
    v_user_id,
    v_wallet_id;
end;
$function$;

create or replace function
  public.record_solana_wallet_login_result(
    p_user_id uuid,
    p_wallet_id uuid,
    p_challenge_id uuid,
    p_request_id uuid,
    p_success boolean,
    p_error_code text
  )
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_address text;
  v_error_code text;
begin
  if p_user_id is null
    or p_wallet_id is null
    or p_challenge_id is null
    or p_request_id is null
    or p_success is null
  then
    raise exception
      'Wallet login result requires complete inputs.';
  end if;

  select wallet.address
  into v_address
  from public.account_wallets wallet
  where wallet.id = p_wallet_id
    and wallet.user_id = p_user_id
    and wallet.chain = 'solana'
  for update;

  if not found then
    raise exception
      'Verified wallet identity is unavailable.';
  end if;

  if not exists (
    select 1
    from public.wallet_login_challenges challenge
    where challenge.id = p_challenge_id
      and challenge.address = v_address
      and challenge.consumed_at is not null
  ) then
    raise exception
      'Consumed wallet login proof is required.';
  end if;

  if exists (
    select 1
    from public.wallet_login_events event
    where event.challenge_id = p_challenge_id
      and event.event_type in (
        'session_issued',
        'session_failed'
      )
  ) then
    raise exception
      'Wallet login session result has already been recorded.';
  end if;

  if p_success then
    update public.account_wallets
    set
      last_login_at = now(),
      wallet_login_count =
        wallet_login_count + 1
    where id = p_wallet_id;

    v_error_code := null;
  else
    v_error_code :=
      left(
        coalesce(
          nullif(
            btrim(p_error_code),
            ''
          ),
          'session_exchange_failed'
        ),
        100
      );
  end if;

  insert into public.wallet_login_events (
    user_id,
    wallet_id,
    challenge_id,
    chain,
    address,
    event_type,
    success,
    error_code,
    request_id
  )
  values (
    p_user_id,
    p_wallet_id,
    p_challenge_id,
    'solana',
    v_address,
    case
      when p_success then
        'session_issued'
      else
        'session_failed'
    end,
    p_success,
    v_error_code,
    p_request_id
  );
end;
$function$;

create or replace function
  public.cleanup_wallet_login_challenges()
returns integer
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_deleted integer;
begin
  delete from public.wallet_login_challenges
  where expires_at < now() - interval '1 day'
    or consumed_at < now() - interval '1 day';

  get diagnostics v_deleted = row_count;

  return v_deleted;
end;
$function$;

comment on function
  public.finalize_solana_wallet_login(
    uuid,
    text,
    uuid
  )
is
  'Service-role-only proof finalization after server-side Ed25519 verification.';

comment on function
  public.record_solana_wallet_login_result(
    uuid,
    uuid,
    uuid,
    uuid,
    boolean,
    text
  )
is
  'Service-role-only Supabase session-exchange audit and wallet login counter update.';

revoke all
on function public.finalize_solana_wallet_login(
  uuid,
  text,
  uuid
)
from public, anon, authenticated;

revoke all
on function public.record_solana_wallet_login_result(
  uuid,
  uuid,
  uuid,
  uuid,
  boolean,
  text
)
from public, anon, authenticated;

revoke all
on function public.cleanup_wallet_login_challenges()
from public, anon, authenticated;

grant execute
on function public.finalize_solana_wallet_login(
  uuid,
  text,
  uuid
)
to service_role;

grant execute
on function public.record_solana_wallet_login_result(
  uuid,
  uuid,
  uuid,
  uuid,
  boolean,
  text
)
to service_role;

grant execute
on function public.cleanup_wallet_login_challenges()
to service_role;

commit;
