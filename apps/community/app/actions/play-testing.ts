"use server";

import { createClient } from "@repo/lib/supabase/server";

export type PlayTesterRegistrationState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerPlayTester(
  _previousState: PlayTesterRegistrationState,
  formData: FormData,
): Promise<PlayTesterRegistrationState> {
  // Quietly accept bot-filled honeypots without writing anything.
  if (String(formData.get("website") ?? "").trim()) {
    return {
      status: "success",
      message: "Your request has been received.",
    };
  }

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1_200) {
    return {
      status: "error",
      message: "Please wait a moment, then submit the form again.",
    };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const consent = formData.get("consent") === "yes";

  if (email.length > 320 || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Enter a valid email address.",
    };
  }

  if (!consent) {
    return {
      status: "error",
      message: "Consent is required to join the closed test.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("register_community_play_tester", {
    p_email: email,
    p_consent: consent,
  });

  if (error) {
    console.error("Play tester registration failed", { code: error.code });
    return {
      status: "error",
      message: "Registration is temporarily unavailable. Please try again later.",
    };
  }

  return {
    status: "success",
    message:
      "Registration received. We will email you after your address is added to the Google Play closed test.",
  };
}
