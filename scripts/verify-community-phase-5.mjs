import{existsSync,readFileSync}from"node:fs";import{resolve}from"node:path";
const checks=[
 ["Auth wallet identity reused","supabase/community/community-5-wallet-solana.sql","public.account_wallets"],
 ["Auth audit proof required","supabase/community/community-5-wallet-solana.sql","wallet_audit_proof_required"],
 ["one-time ledger source","supabase/community/community-5-wallet-solana.sql","solana-wallet-verification"],
 ["500 Harmony reward","supabase/community/community-5-wallet-solana.sql","points=points+500"],
 ["minimum Level 5","supabase/community/community-5-wallet-solana.sql","level_floor=greatest(level_floor,5)"],
 ["Community wallet page","apps/community/app/wallet/page.tsx","getMyCommunityWallet"],
 ["main account management link","apps/community/components/wallet/WalletHub.tsx","/account/wallet"],
 ["mobile claim button","apps/community/components/wallet/WalletBonusButton.tsx","w-full"],
 ["wallet navigation","apps/community/data/navigation.ts","Wallet & Solana"],
];let failed=0;for(const[name,file,token]of checks){const path=resolve(process.cwd(),file);const passed=existsSync(path)&&readFileSync(path,"utf8").includes(token);console.log(`${passed?"✓":"✗"} ${name}`);if(!passed)failed++;}if(failed)process.exit(1);console.log(`Community Phase 5: ${checks.length}/${checks.length} structural checks passed.`);
