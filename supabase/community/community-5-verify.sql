with checks as (
 select 1 check_order,'Wallet bonus RPC exists' check_name,'true' expected,(to_regprocedure('public.claim_wallet_verification_harmony()') is not null)::text actual
 union all select 2,'Authenticated can claim verified bonus','true',has_function_privilege('authenticated','public.claim_wallet_verification_harmony()','EXECUTE')::text
 union all select 3,'Anon cannot claim wallet bonus','false',has_function_privilege('anon','public.claim_wallet_verification_harmony()','EXECUTE')::text
 union all select 4,'No duplicate wallet bonuses','0',count(*)::text from(select user_id from public.harmony_ledger where source_type='wallet_verification' group by user_id having count(*)>1)x
 union all select 5,'Every wallet bonus is exactly 500','0',count(*)::text from public.harmony_ledger where source_type='wallet_verification' and amount<>500
 union all select 6,'Every bonus uses the stable source key','0',count(*)::text from public.harmony_ledger where source_type='wallet_verification' and source_key<>'solana-wallet-verification'
 union all select 7,'Claimed accounts keep minimum Level 5','0',count(*)::text from public.harmony_ledger l join public.harmony_accounts a on a.user_id=l.user_id where l.source_type='wallet_verification' and a.level_floor<5
 union all select 8,'No negative Harmony balances','0',count(*)::text from public.harmony_accounts where points<0
 union all select 9,'Wallet uniqueness remains valid','0',count(*)::text from(select user_id,chain from public.account_wallets group by 1,2 having count(*)>1)x
 union all select 10,'Wallet addresses remain globally unique','0',count(*)::text from(select chain,address from public.account_wallets group by 1,2 having count(*)>1)x
 union all select 11,'Wallet bonus ledger remains private','true',(not exists(select 1 from information_schema.role_table_grants where table_schema='public' and table_name='harmony_ledger' and grantee='anon'))::text
 union all select 12,'Auth users and profiles remain aligned',(select count(*)::text from auth.users),(select count(*)::text from public.profiles)
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
