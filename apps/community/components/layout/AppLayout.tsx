import type { ReactNode } from "react";

import { GuestAuthProvider } from "@/components/auth/GuestAuthProvider";
import { getCurrentProfile } from "@/data/profile/current-profile";

import { BottomNavigation } from "./BottomNavigation";
import { RightSidebar } from "./RightSidebar";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

type AppLayoutProps = {
  children: ReactNode;
  showRightSidebar?: boolean;
  showTopNavbar?: boolean;
};

export async function AppLayout({
  children,
  showRightSidebar = true,
  showTopNavbar = true,
}: AppLayoutProps) {
  const profile = await getCurrentProfile();

  return (
    <GuestAuthProvider isAuthenticated={Boolean(profile)}>
      <main className="min-h-screen px-3 py-3 pb-24 text-[#2f1b12] sm:px-4 md:px-5 md:py-4 md:pb-4">
        <div
          className={`mx-auto grid min-h-[calc(100vh-32px)] max-w-[1480px] grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] ${
            showRightSidebar
              ? "2xl:grid-cols-[240px_minmax(0,1fr)_300px]"
              : ""
          }`}
        >
          <Sidebar profile={profile} />

          <section className="min-w-0">
            {showTopNavbar ? <TopNavbar profile={profile} /> : null}
            {children}
          </section>

          {showRightSidebar ? <RightSidebar /> : null}
        </div>

        <BottomNavigation />
      </main>
    </GuestAuthProvider>
  );
}
