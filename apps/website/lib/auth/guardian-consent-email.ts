import nodemailer from "nodemailer";

const OFFICIAL_CONTACT_EMAIL =
  "contact@lifetopiaworld.io";

type SendGuardianConsentEmailInput = {
  guardianEmail: string;
  childDisplayName: string;
  childUsername: string;
  token: string;
  expiresAt: string;
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
      // Use request origin below.
    }
  }

  return new URL(requestUrl).origin;
}

function getTransport() {
  const host =
    process.env.SMTP_HOST;
  const port =
    Number(process.env.SMTP_PORT ?? 587);
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
      "Guardian consent SMTP is not configured.",
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

export async function sendGuardianConsentEmail({
  guardianEmail,
  childDisplayName,
  childUsername,
  token,
  expiresAt,
  requestUrl,
}: SendGuardianConsentEmailInput) {
  const confirmationUrl = new URL(
    "/guardian-consent/confirm",
    getWebsiteOrigin(requestUrl),
  );

  confirmationUrl.searchParams.set(
    "token",
    token,
  );

  const expiresDate =
    new Date(expiresAt);

  const safeChildDisplayName =
    escapeHtml(childDisplayName);

  const safeChildUsername =
    escapeHtml(childUsername);

  const safeConfirmationUrl =
    escapeHtml(confirmationUrl.toString());

  const transport = getTransport();

  await transport.sendMail({
    from:
      `Lifetopia World <${OFFICIAL_CONTACT_EMAIL}>`,
    replyTo: OFFICIAL_CONTACT_EMAIL,
    to: guardianEmail,
    subject:
      "Guardian approval for a Lifetopia World account",
    text: [
      `A Lifetopia World account for ${childDisplayName} (@${childUsername}) requires parent or guardian approval.`,
      "",
      `Review the request: ${confirmationUrl.toString()}`,
      "",
      `This link expires on ${expiresDate.toUTCString()}.`,
      "",
      "If you do not recognize this request, no action is required.",
      "",
      `Contact: ${OFFICIAL_CONTACT_EMAIL}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#2f1b12;max-width:620px;margin:0 auto">
        <h2 style="margin-bottom:8px">Guardian approval requested</h2>
        <p>
          A Lifetopia World account for
          <strong>${safeChildDisplayName}</strong>
          (<strong>@${safeChildUsername}</strong>)
          requires parent or guardian approval.
        </p>
        <p>
          Review the request and the current legal documents before approving.
        </p>
        <p style="margin:28px 0">
          <a
            href="${safeConfirmationUrl}"
            style="display:inline-block;background:#4f8124;color:white;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700"
          >
            Review guardian request
          </a>
        </p>
        <p>
          This link expires on
          <strong>${expiresDate.toUTCString()}</strong>.
        </p>
        <p>
          If you do not recognize this request, no action is required.
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
