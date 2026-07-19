import type { Metadata } from "next";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { DeleteAccountForm } from "@/components/settings/DeleteAccountForm";
import { getCurrentProfile } from "@/data/profile/current-profile";

export const metadata: Metadata = {
  title: "Delete CommunityHub account",
  description: "Permanently delete a CommunityHub account and associated personal data.",
};

export default async function AccountDeletionPage() {
  const profile = await getCurrentProfile();

  return (
    <AppLayout showRightSidebar={false}>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <section className="rounded-[28px] border border-[#ead9b8] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c12626]">Privacy control</p>
          <h1 className="mt-3 text-3xl font-black text-[#2f2418] sm:text-4xl">Delete your CommunityHub account</h1>
          <p className="mt-4 font-bold leading-7 text-[#7a5635]">
            This permanently removes your login, profile, private settings, linked wallet record,
            posts, comments, follows, messages, notifications, quest progress, and Harmony history.
            Moderation records may remain without your account identity when required for community safety.
          </p>
          <div className="mt-5 rounded-2xl border border-[#f1aaaa] bg-[#fff7f7] p-4 text-sm font-bold leading-6 text-[#8f1e1e]">
            This cannot be undone. Founder and staff accounts use a separate protected support process.
          </div>
          {profile ? (
            <DeleteAccountForm />
          ) : (
            <div className="mt-6 rounded-2xl border border-[#d9c29c] bg-[#fffaf1] p-5">
              <p className="font-bold text-[#6f4d30]">Sign in to securely verify and delete your own account.</p>
              <Link href="/?auth=login&next=/account-deletion" className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#4f8124] px-6 font-black text-white">
                Sign in to continue
              </Link>
            </div>
          )}
        </section>
      </main>
    </AppLayout>
  );
}
