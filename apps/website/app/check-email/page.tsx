import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/AuthCard";
import { CheckEmailPanel } from "@/components/auth/CheckEmailPanel";

export const metadata: Metadata = {
  title: "Check Your Email",
  description:
    "Verify the email connected to your Lifetopia World account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckEmailPage() {
  return (
    <AuthCard
      badge="Email Verification"
      title="One more step."
      description="Verify your email before social, reward, and wallet benefits become available."
    >
      <CheckEmailPanel />
    </AuthCard>
  );
}
