-- Lifetopia Authentication
-- Auth 21 — Align wallet login with password login for suspended/banned accounts
--
-- Context:
--   Password login (app/api/auth/login/route.ts) allows suspended/banned
--   accounts to sign in and returns `restricted: true` so the client can
--   show a restricted-access state. Solana wallet login previously blocked
--   any account_status other than 'active' inside finalize_solana_wallet_login,
--   which meant a suspended/banned user with a linked wallet could not sign in
--   at all through that path, unlike password login.
--
-- Change:
--   finalize_solana_wallet_login now only hard-blocks 'deleted' accounts.
--   'suspended' and 'banned' accounts are allowed to complete the wallet
--   proof and reach session issuance; the website route then calls the same
--   get_my_account_state / get_my_required_account_actions functions that
--   password login already uses, so both login paths share one source of
--   truth for restricted-access enforcement.
--
-- This is a CREATE OR REPLACE of an existing SECURITY DEFINER function only.
-- No table structure, grants, or RLS policies change.
--
-- Run only after auth-21-preflight.sql returns passed = true for every row.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

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

  -- Only 'deleted' accounts are hard-blocked here, matching password
  -- login's pre-session gate. 'suspended' and 'banned' accounts proceed;
  -- the website route re-checks account state via get_my_account_state /
  -- get_my_required_account_actions immediately after session exchange,
  -- the same functions password login already relies on.
  if v_account_status = 'deleted' then
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

comment on function
  public.finalize_solana_wallet_login(
    uuid,
    text,
    uuid
  )
is
  'Service-role-only proof finalization after server-side Ed25519 verification. Blocks only deleted accounts; suspended/banned accounts proceed to session issuance and are gated the same way as password login (get_my_account_state / get_my_required_account_actions).';

commit;
