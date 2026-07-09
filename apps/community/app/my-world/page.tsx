import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppLayout } from "@/components/layout/AppLayout";
import { MyWorld } from "@/components/my-world/MyWorld";
import { getCurrentProfile } from "@/data/profile/current-profile";

const mainAppUrl =
  process.env.NEXT_PUBLIC_MAIN_APP_URL ?? "https://lifetopiaworld.io";

async function getCurrentUrl(pathname: string) {
  const headersList = await headers();

  const host = headersList.get("host") ?? "community.lifetopiaworld.io";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}${pathname}`;
}

export default async function MyWorldPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    const nextUrl = await getCurrentUrl("/my-world");
    redirect(`${mainAppUrl}/login?next=${encodeURIComponent(nextUrl)}`);
  }

  return (
    <AppLayout showRightSidebar={false} showTopNavbar={false}>
      <MyWorld />
    </AppLayout>
  );
}