-- Lifetopia Authentication
-- Auth 17 — Secure Solana wallet linking
--
-- Security properties:
--   * one Solana wallet per account;
--   * one Lifetopia account per Solana address;
--   * server-created, short-lived, single-use signing challenges;
--   * no authenticated-client mutation path to linked identities;
--   * service-role-only finalization and unlink functions;
--   * immutable security audit events.
--
-- Run only after auth-17-preflight.sql returns passed = true for every row.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

create table public.account_wallets (
  id uuid primary key
    default gen_random_uuid(),
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
  chain text not null
    default 'solana'
    check (chain = 'solana'),
  address text not null
    check (
      address ~ '^[1-9A-HJ-NP-Za-km-z]{32,44}$'
    ),
  linked_at timestamptz not null
    default now(),
  last_verified_at timestamptz not null
    default now(),
  constraint account_wallets_one_chain_per_user
    unique (user_id, chain),
  constraint account_wallets_one_account_per_address
    unique (chain, address)
);

comment on table public.account_wallets
is
  'Verified wallet identities linked to Lifetopia accounts. Authenticated clients may read only their own row.';

create index account_wallets_user_id_idx
on public.account_wallets (user_id);

create table public.wallet_link_challenges (
  id uuid primary key,
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,
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

comment on table public.wallet_link_challenges
is
  'Private short-lived and single-use Solana signing challenges created by the website server.';

create index wallet_link_challenges_user_created_idx
on public.wallet_link_challenges (
  user_id,
  created_at desc
);

create index wallet_link_challenges_expiry_idx
on public.wallet_link_challenges (expires_at)
where consumed_at is null;

create table public.wallet_security_events (
  id uuid primary key
    default gen_random_uuid(),
  user_id uuid not null,
  wallet_id uuid,
  chain text not null
    check (chain = 'solana'),
  address text not null,
  event_type text not null
    check (
      event_type in (
        'linked',
        'unlinked'
      )
    ),
  request_id uuid not null,
  created_at timestamptz not null
    default now()
);

comment on table public.wallet_security_events
is
  'Append-only audit trail for successful wallet identity changes.';

create index wallet_security_events_user_created_idx
on public.wallet_security_events (
  user_id,
  created_at desc
);

alter table public.account_wallets
enable row level security;

alter table public.wallet_link_challenges
enable row level security;

alter table public.wallet_security_events
enable row level security;

create policy account_wallets_select_own
on public.account_wallets
for select
to authenticated
using (user_id = auth.uid());

create policy wallet_security_events_select_own
on public.wallet_security_events
for select
to authenticated
using (user_id = auth.uid());

revoke all
on table public.account_wallets
from public, anon, authenticated;

revoke all
on table public.wallet_link_challenges
from public, anon, authenticated;

revoke all
on table public.wallet_security_events
from public, anon, authenticated;

grant select
on table public.account_wallets
to authenticated;

grant select
on table public.wallet_security_events
to authenticated;

grant all
on table public.account_wallets
to service_role;

grant all
on table public.wallet_link_challenges
to service_role;

grant all
on table public.wallet_security_events
to service_role;

create or replace function
  public.protect_wallet_security_event()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  raise exception
    'Wallet security events are immutable.';
end;
$function$;

create trigger protect_wallet_security_event_before_change
before update or delete
on public.wallet_security_events
for each row
execute function public.protect_wallet_security_event();

create or replace function
  public.finalize_solana_wallet_link(
    p_user_id uuid,
    p_challenge_id uuid,
    p_address text,
    p_request_id uuid
  )
returns table (
  wallet_id uuid,
  wallet_address text,
  wallet_linked_at timestamptz
)
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_challenge_address text;
  v_challenge_expires_at timestamptz;
  v_challenge_consumed_at timestamptz;
  v_wallet_id uuid;
  v_linked_at timestamptz;
  v_account_status text;
  v_email_verified_at timestamptz;
  v_legal_required boolean;
  v_username_required boolean;
begin
  if p_user_id is null
    or p_challenge_id is null
    or p_request_id is null
    or p_address is null
  then
    raise exception
      'Wallet link finalization requires complete inputs.';
  end if;

  select
    challenge.address,
    challenge.expires_at,
    challenge.consumed_at
  into
    v_challenge_address,
    v_challenge_expires_at,
    v_challenge_consumed_at
  from public.wallet_link_challenges challenge
  where challenge.id = p_challenge_id
    and challenge.user_id = p_user_id
    and challenge.chain = 'solana'
  for update;

  if not found then
    raise exception
      'Wallet link challenge is unavailable.';
  end if;

  if v_challenge_consumed_at is not null then
    raise exception
      'Wallet link challenge has already been used.';
  end if;

  if v_challenge_expires_at <= now() then
    raise exception
      'Wallet link challenge has expired.';
  end if;

  if v_challenge_address <> p_address then
    raise exception
      'Wallet address does not match its challenge.';
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
  where private_profile.user_id = p_user_id
  for update;

  if not found then
    raise exception
      'Wallet owner profile is unavailable.';
  end if;

  if v_account_status <> 'active' then
    raise exception
      'Only an active account can link a wallet.';
  end if;

  if v_email_verified_at is null then
    raise exception
      'Email verification is required before linking a wallet.';
  end if;

  if v_legal_required then
    raise exception
      'Current legal consent is required before linking a wallet.';
  end if;

  if v_username_required then
    raise exception
      'A permanent username is required before linking a wallet.';
  end if;

  if exists (
    select 1
    from public.account_wallets wallet
    where wallet.user_id = p_user_id
      and wallet.chain = 'solana'
  ) then
    raise exception
      'This account already has a linked Solana wallet.';
  end if;

  if exists (
    select 1
    from public.account_wallets wallet
    where wallet.chain = 'solana'
      and wallet.address = p_address
  ) then
    raise exception
      'This Solana wallet is already linked to another account.';
  end if;

  insert into public.account_wallets (
    user_id,
    chain,
    address,
    linked_at,
    last_verified_at
  )
  values (
    p_user_id,
    'solana',
    p_address,
    now(),
    now()
  )
  returning
    id,
    linked_at
  into
    v_wallet_id,
    v_linked_at;

  update public.wallet_link_challenges
  set consumed_at = now()
  where id = p_challenge_id;

  insert into public.wallet_security_events (
    user_id,
    wallet_id,
    chain,
    address,
    event_type,
    request_id
  )
  values (
    p_user_id,
    v_wallet_id,
    'solana',
    p_address,
    'linked',
    p_request_id
  );

  return query
  select
    v_wallet_id,
    p_address,
    v_linked_at;
end;
$function$;

comment on function
  public.finalize_solana_wallet_link(
    uuid,
    uuid,
    text,
    uuid
  )
is
  'Service-role-only atomic finalization after server-side Ed25519 signature verification.';

create or replace function
  public.unlink_solana_wallet(
    p_user_id uuid,
    p_wallet_id uuid,
    p_request_id uuid
  )
returns table (
  unlinked_wallet_id uuid,
  unlinked_address text
)
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_address text;
begin
  if p_user_id is null
    or p_wallet_id is null
    or p_request_id is null
  then
    raise exception
      'Wallet unlink requires complete inputs.';
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
      'Linked wallet is unavailable.';
  end if;

  delete from public.account_wallets
  where id = p_wallet_id
    and user_id = p_user_id;

  insert into public.wallet_security_events (
    user_id,
    wallet_id,
    chain,
    address,
    event_type,
    request_id
  )
  values (
    p_user_id,
    p_wallet_id,
    'solana',
    v_address,
    'unlinked',
    p_request_id
  );

  return query
  select
    p_wallet_id,
    v_address;
end;
$function$;

comment on function
  public.unlink_solana_wallet(
    uuid,
    uuid,
    uuid
  )
is
  'Service-role-only removal of a wallet owned by the authenticated Lifetopia account.';

create or replace function
  public.cleanup_wallet_link_challenges()
returns integer
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_deleted integer;
begin
  delete from public.wallet_link_challenges
  where expires_at < now() - interval '1 day'
    or consumed_at < now() - interval '1 day';

  get diagnostics v_deleted = row_count;

  return v_deleted;
end;
$function$;

revoke all
on function public.finalize_solana_wallet_link(
  uuid,
  uuid,
  text,
  uuid
)
from public, anon, authenticated;

revoke all
on function public.unlink_solana_wallet(
  uuid,
  uuid,
  uuid
)
from public, anon, authenticated;

revoke all
on function public.cleanup_wallet_link_challenges()
from public, anon, authenticated;

revoke all
on function public.protect_wallet_security_event()
from public, anon, authenticated;

grant execute
on function public.finalize_solana_wallet_link(
  uuid,
  uuid,
  text,
  uuid
)
to service_role;

grant execute
on function public.unlink_solana_wallet(
  uuid,
  uuid,
  uuid
)
to service_role;

grant execute
on function public.cleanup_wallet_link_challenges()
to service_role;

commit;
