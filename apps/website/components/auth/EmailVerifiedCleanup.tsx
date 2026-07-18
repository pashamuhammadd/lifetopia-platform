"use client";

import { useEffect } from "react";

import {
  PENDING_EMAIL_VERIFICATION_KEY,
} from "@/lib/auth/pending-verification";

export function EmailVerifiedCleanup() {
  useEffect(() => {
    window.sessionStorage.removeItem(
      PENDING_EMAIL_VERIFICATION_KEY,
    );
  }, []);

  return null;
}
