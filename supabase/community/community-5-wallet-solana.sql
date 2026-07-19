begin;

create or replace function public.claim_wallet_verification_harmony()
returns table(awarded integer,balance bigint,harmony_level integer,already_claimed boolean)
language plpgsql security definer set search_path=pg_catalog,public as $$
declare
 v_user uuid:=auth.uid();v_wallet_id uuid;v_last_verified timestamptz;v_balance bigint;v_floor integer;
begin
 if v_user is null then raise exception 'authentication_required' using errcode='42501';end if;
 select id,last_verified_at into v_wallet_id,v_last_verified from public.account_wallets where user_id=v_user and chain='solana' for share;
 if not found or v_last_verified is null then raise exception 'verified_wallet_required' using errcode='22023';end if;
 if not exists(select 1 from public.wallet_security_events where user_id=v_user and wallet_id=v_wallet_id and chain='solana' and event_type='linked') then raise exception 'wallet_audit_proof_required' using errcode='22023';end if;
 perform public.ensure_harmony_account(v_user);
 select points,level_floor into v_balance,v_floor from public.harmony_accounts where user_id=v_user for update;
 if exists(select 1 from public.harmony_ledger where user_id=v_user and source_type='wallet_verification') then
   return query select 0,v_balance,greatest(v_floor,floor(v_balance/500.0)::int+1),true;return;
 end if;
 update public.harmony_accounts set points=points+500,level_floor=greatest(level_floor,5),updated_at=now() where user_id=v_user returning points,level_floor into v_balance,v_floor;
 insert into public.harmony_ledger(user_id,amount,balance_after,source_type,source_key,description,metadata)
 values(v_user,500,v_balance,'wallet_verification','solana-wallet-verification','Verified Solana wallet bonus',jsonb_build_object('wallet_id',v_wallet_id));
 return query select 500,v_balance,greatest(v_floor,floor(v_balance/500.0)::int+1),false;
end;$$;

comment on function public.claim_wallet_verification_harmony() is 'Authenticated, once-per-account +500 Harmony award for an Auth 17 verified Solana wallet; applies minimum Harmony Level 5.';
revoke all on function public.claim_wallet_verification_harmony() from public,anon;
grant execute on function public.claim_wallet_verification_harmony() to authenticated;
commit;
