"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";
export async function markNotificationsRead(notificationId?: string) {
  if (notificationId && !/^[0-9a-f-]{36}$/i.test(notificationId)) return { ok: false };
  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_community_notification_read", {
    p_notification_id: notificationId ?? null,
  });
  if (error) return { ok: false };
  revalidatePath("/notifications");
  revalidatePath("/", "layout");
  return { ok: true };
}
