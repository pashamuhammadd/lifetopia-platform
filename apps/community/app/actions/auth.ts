"use server";

import { redirect } from "next/navigation";
import { createClient } from "@repo/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}