begin;

create table if not exists public.account_deletion_receipts (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'self_service' check (source in ('self_service', 'support')),
  deleted_at timestamptz not null default now(),
  deletion_summary jsonb not null default '{}'::jsonb
);

alter table public.account_deletion_receipts enable row level security;
alter table public.account_deletion_receipts force row level security;
revoke all on public.account_deletion_receipts from public, anon, authenticated;

-- Moderation events stay immutable during normal operation. During the narrow
-- self-deletion transaction, only actor/target references matching the account
-- being deleted may be replaced with NULL; all audit content stays unchanged.
create or replace function public.protect_community_moderation_event()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  v_deleting_user uuid;
begin
  begin
    v_deleting_user := nullif(current_setting('lifetopia.account_deletion_user', true), '')::uuid;
  exception when invalid_text_representation then
    v_deleting_user := null;
  end;

  if tg_op = 'UPDATE' and v_deleting_user is not null then
    if (to_jsonb(new) - 'actor_id' - 'target_user_id') <> (to_jsonb(old) - 'actor_id' - 'target_user_id') then
      raise exception 'Moderation events are immutable.';
    end if;
    if new.actor_id is distinct from (case when old.actor_id = v_deleting_user then null else old.actor_id end) then
      raise exception 'Moderation events are immutable.';
    end if;
    if new.target_user_id is distinct from (case when old.target_user_id = v_deleting_user then null else old.target_user_id end) then
      raise exception 'Moderation events are immutable.';
    end if;
    return new;
  end if;

  raise exception 'Moderation events are immutable.';
end;
$$;

create or replace function public.delete_my_lifetopia_account(p_confirmation text)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $$
declare
  v_user uuid := auth.uid();
  v_role text;
  v_receipt uuid := gen_random_uuid();
  v_guilds integer := 0;
  v_wallet_login_events integer := 0;
  v_wallet_security_events integer := 0;
  v_moderation_events integer := 0;
begin
  if v_user is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if p_confirmation is distinct from 'DELETE' then
    raise exception 'deletion_confirmation_required' using errcode = '22023';
  end if;

  select lower(trim(profile.role)) into v_role
  from public.profiles profile
  where profile.id = v_user
  for update;

  if not found then
    raise exception 'profile_not_found' using errcode = 'P0002';
  end if;
  if v_role in ('founder', 'admin', 'moderator')
    or exists (select 1 from public.lifetopia_founder_registry registry where registry.user_id = v_user)
  then
    raise exception 'protected_staff_account' using errcode = '42501';
  end if;

  -- These references should only be created by staff. Refuse deletion instead
  -- of silently damaging authoritative history if legacy data says otherwise.
  if exists (select 1 from public.community_announcements where published_by = v_user)
    or exists (select 1 from public.community_account_restrictions where created_by = v_user)
  then
    raise exception 'staff_history_requires_support' using errcode = '42501';
  end if;

  perform set_config('lifetopia.account_deletion_user', v_user::text, true);

  update public.community_moderation_events
  set actor_id = case when actor_id = v_user then null else actor_id end,
      target_user_id = case when target_user_id = v_user then null else target_user_id end
  where actor_id = v_user or target_user_id = v_user;
  get diagnostics v_moderation_events = row_count;

  delete from public.community_guilds where owner_id = v_user;
  get diagnostics v_guilds = row_count;

  -- Legacy security audit tables intentionally have no FK to profiles.
  delete from public.wallet_login_events where user_id = v_user;
  get diagnostics v_wallet_login_events = row_count;
  delete from public.wallet_security_events where user_id = v_user;
  get diagnostics v_wallet_security_events = row_count;

  insert into public.account_deletion_receipts(id, source, deletion_summary)
  values (
    v_receipt,
    'self_service',
    jsonb_build_object(
      'owned_guilds_deleted', v_guilds,
      'wallet_login_events_deleted', v_wallet_login_events,
      'wallet_security_events_deleted', v_wallet_security_events,
      'moderation_events_anonymized', v_moderation_events
    )
  );

  -- auth.users -> profiles is ON DELETE CASCADE. The profile cascade then
  -- removes posts, comments, follows, messages, wallets, quests, and private data.
  delete from auth.users where id = v_user;
  if not found then
    raise exception 'auth_user_not_found' using errcode = 'P0002';
  end if;

  return v_receipt;
end;
$$;

revoke all on function public.delete_my_lifetopia_account(text) from public, anon;
grant execute on function public.delete_my_lifetopia_account(text) to authenticated;
revoke all on function public.protect_community_moderation_event() from public, anon, authenticated;

commit;
