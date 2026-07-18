import nodemailer from "nodemailer";

const OFFICIAL_CONTACT_EMAIL =
  "contact@lifetopiaworld.io";

type SendPasswordResetEmailInput = {
  email: string;
  displayName: string;
  token: string;
  requestUrl: string;
};

function escapeHtml(
  value: string,
): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getWebsiteOrigin(
  requestUrl: string,
): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    try {
      const normalized =
        configuredUrl.startsWith("http")
          ? configuredUrl
          : `https://${configuredUrl}`;

      return new URL(normalized).origin;
    } catch {
      // Fall back to the current request origin.
    }
  }

  return new URL(requestUrl).origin;
}

function getTransport() {
  const host =
    process.env.SMTP_HOST;
  const port =
    Number(process.env.SMTP_PORT ?? 465);
  const user =
    process.env.SMTP_USER;
  const pass =
    process.env.SMTP_PASS;

  if (
    !host ||
    !Number.isFinite(port) ||
    !user ||
    !pass
  ) {
    throw new Error(
      "Password reset SMTP is not configured.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure:
      process.env.SMTP_SECURE === "true",
    auth: {
      user,
      pass,
    },
  });
}

export async function sendPasswordResetEmail({
  email,
  displayName,
  token,
  requestUrl,
}: SendPasswordResetEmailInput) {
  const resetUrl = new URL(
    "/reset-password",
    getWebsiteOrigin(requestUrl),
  );

  resetUrl.searchParams.set(
    "token",
    token,
  );

  const safeDisplayName =
    escapeHtml(displayName);

  const safeResetUrl =
    escapeHtml(resetUrl.toString());

  const transport =
    getTransport();

  await transport.sendMail({
    from:
      `Lifetopia World <${OFFICIAL_CONTACT_EMAIL}>`,
    replyTo: OFFICIAL_CONTACT_EMAIL,
    to: email,
    subject:
      "Reset your Lifetopia World password",
    text: [
      `Hello ${displayName},`,
      "",
      "A password reset was requested for your Lifetopia World account.",
      "",
      `Reset your password: ${resetUrl.toString()}`,
      "",
      "This link expires in 30 minutes and can only be used once.",
      "",
      "If you did not request this reset, ignore this email. Your password will remain unchanged.",
      "",
      `Support: ${OFFICIAL_CONTACT_EMAIL}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#2f1b12;max-width:620px;margin:0 auto">
        <h2 style="margin-bottom:8px">Reset your Lifetopia password</h2>
        <p>Hello <strong>${safeDisplayName}</strong>,</p>
        <p>
          A password reset was requested for your Lifetopia World account.
        </p>
        <p style="margin:28px 0">
          <a
            href="${safeResetUrl}"
            style="display:inline-block;background:#4f8124;color:white;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700"
          >
            Reset password
          </a>
        </p>
        <p>
          This link expires in <strong>30 minutes</strong> and can only be used once.
        </p>
        <p>
          If you did not request this reset, ignore this email. Your password will remain unchanged.
        </p>
        <hr style="border:none;border-top:1px solid #e8d8b8;margin:24px 0" />
        <p style="font-size:13px;color:#76583a">
          Lifetopia World ·
          <a href="mailto:${OFFICIAL_CONTACT_EMAIL}">
            ${OFFICIAL_CONTACT_EMAIL}
          </a>
        </p>
      </div>
    `,
  });
}
