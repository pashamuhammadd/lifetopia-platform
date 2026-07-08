import { BottomNavigation } from "./BottomNavigation";
import { RightSidebar } from "./RightSidebar";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="min-h-screen px-4 py-4 text-[#2f1b12] md:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1440px] grid-cols-1 gap-4 md:grid-cols-[260px_minmax(0,1fr)_320px]">
        <Sidebar />

        <section className="min-w-0">
          <TopNavbar />
          {children}
        </section>

        <RightSidebar />
      </div>

      <BottomNavigation />
    </main>
  );
}