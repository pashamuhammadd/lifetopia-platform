import {
  WalletCards,
} from "lucide-react";
import Link from "next/link";

type WalletLoginEntryLinkProps = {
  next?: string;
};

export function WalletLoginEntryLink({
  next = "/dashboard",
}: WalletLoginEntryLinkProps) {
  return (
    <Link
      href={`/wallet-login?next=${encodeURIComponent(
        next,
      )}`}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#d8c79d] bg-white px-5 text-sm font-black text-[#4f8124] transition hover:border-[#a9cd82] hover:bg-[#f4fbea]"
    >
      <WalletCards
        aria-hidden="true"
        className="size-4"
      />
      Continue with Solana wallet
    </Link>
  );
}
