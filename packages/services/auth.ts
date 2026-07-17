import { createClient } from "@repo/lib/supabase/client";

import {
  normalizeUsername,
  validateUsername,
} from "./auth-validation";

export type UsernameAvailabilityStatus =
  | "available"
  | "taken"
  | "invalid"
  | "error";

export type UsernameAvailabilityResult = {
  status: UsernameAvailabilityStatus;
  message: string;
  normalizedUsername?: string;
};

export async function checkUsernameAvailability(
  username: string,
): Promise<UsernameAvailabilityResult> {
  const validation =
    validateUsername(username);

  if (!validation.valid) {
    return {
      status: "invalid",
      message: validation.message,
    };
  }

  const normalizedUsername =
    normalizeUsername(validation.value);

  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", normalizedUsername)
    .maybeSingle();

  if (error) {
    return {
      status: "error",
      message:
        "Unable to check username right now.",
    };
  }

  if (data) {
    return {
      status: "taken",
      message:
        "Username is already taken.",
      normalizedUsername,
    };
  }

  return {
    status: "available",
    message: "Username is available.",
    normalizedUsername,
  };
}
