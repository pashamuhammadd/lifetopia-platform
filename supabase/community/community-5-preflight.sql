with checks as (
 select 1 check_order,'Auth wallet table exists' check_name,'true' expected,(to_regclass('public.account_wallets') is not null)::text actual
 union all select 2,'Wallet security events exist','true',(to_regclass('public.wallet_security_events') is not null)::text
 union all select 3,'Harmony accounts exist','true',(to_regclass('public.harmony_accounts') is not null)::text
 union all select 4,'Harmony ledger exists','true',(to_regclass('public.harmony_ledger') is not null)::text
 union all select 5,'Harmony account supports level floor','true',exists(select 1 from information_schema.columns where table_schema='public' and table_name='harmony_accounts' and column_name='level_floor')::text
 union all select 6,'Ledger allows wallet verification source','true',(exists(select 1 from pg_constraint where conrelid='public.harmony_ledger'::regclass and contype='c' and pg_get_constraintdef(oid) like '%source_type%' and pg_get_constraintdef(oid) like '%wallet_verification%'))::text
 union all select 7,'One Solana wallet per account remains enforced','1',count(*)::text from pg_constraint where conrelid='public.account_wallets'::regclass and conname='account_wallets_one_chain_per_user'
 union all select 8,'Wallet bonus claim is not installed','true',(to_regprocedure('public.claim_wallet_verification_harmony()') is null)::text
)
select check_order,check_name,expected,actual,expected=actual passed from checks order by check_order;
