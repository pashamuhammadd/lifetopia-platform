import { createClient } from "@repo/lib/supabase/client";

export async function checkUsernameAvailability(username: string) {
  const supabase = createClient();

  const normalizedUsername = username.trim();

  if (!/^[a-zA-Z0-9_]{4,10}$/.test(normalizedUsername)) {
    return {
      status: "invalid" as const,
      message: "Use 4-10 characters. Only letters, numbers, and underscore.",
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", normalizedUsername)
    .maybeSingle();

  if (error) {
    return {
      status: "error" as const,
      message: "Unable to check username right now.",
    };
  }

  if (data) {
    return {
      status: "taken" as const,
      message: "Username is already taken.",
    };
  }

  return {
    status: "available" as const,
    message: "Username is available.",
  };
}