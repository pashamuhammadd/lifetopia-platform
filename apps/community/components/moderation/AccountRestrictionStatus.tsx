import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
type Restriction = {
  status: "muted" | "suspended" | "banned";
  reason: string;
  expires_at: string | null;
};
export function AccountRestrictionStatus({ restriction }: { restriction: Restriction | null }) {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Community Account Status"
        description="Private moderation status and reasons for your Lifetopia Community account."
      />
      {restriction ? (
        <Card className="border-[#f1aaaa] bg-[#fff7f7] p-5 sm:p-6">
          <ShieldAlert className="text-[#c12626]" size={32} />
          <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#c12626]">
            {restriction.status}
          </p>
          <h2 className="mt-1 text-2xl font-black text-[#2f2418]">
            Community interaction restricted
          </h2>
          <p className="mt-4 font-bold leading-7 text-[#7a5635]">{restriction.reason}</p>
          <p className="mt-3 text-sm font-black text-[#9b6635]">
            {restriction.expires_at
              ? `Ends ${new Date(restriction.expires_at).toLocaleString("en")}.`
              : "This restriction has no automatic expiry."}
          </p>
        </Card>
      ) : (
        <Card className="p-6">
          <ShieldCheck className="text-[#4f8124]" size={32} />
          <h2 className="mt-3 text-2xl font-black text-[#2f2418]">Account in good standing</h2>
          <p className="mt-2 font-bold text-[#7a5635]">
            No active CommunityHub restriction applies to this identity.
          </p>
        </Card>
      )}
    </div>
  );
}
