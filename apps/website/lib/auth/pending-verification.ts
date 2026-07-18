export const PENDING_EMAIL_VERIFICATION_KEY =
  "lifetopia:pending-email-verification";

export type PendingEmailVerification = {
  email: string;
  next: string;
  guardianConsentRequired: boolean;
  verificationEmailSent: boolean;
  createdAt: number;
  resendAvailableAt: number;
};
