import{createClient}from"@repo/lib/supabase/server";
type RestrictionRow={status:"muted"|"suspended"|"banned";reason:string;expires_at:string|null;created_at:string;updated_at:string};
export async function getMyCommunityRestriction(){const supabase=await createClient();const{data}=await supabase.from("community_account_restrictions").select("status,reason,expires_at,created_at,updated_at").maybeSingle();return(data??null)as RestrictionRow|null;}
