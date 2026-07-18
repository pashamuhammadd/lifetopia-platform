export type SessionDeviceType =
  | "desktop"
  | "mobile"
  | "tablet"
  | "unknown";

export type LifetopiaSessionView = {
  sessionId: string;
  isCurrent: boolean;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string | null;
  ipHint: string | null;
  assuranceLevel: string;
  deviceType: SessionDeviceType;
  browser: string;
  operatingSystem: string;
  deviceLabel: string;
};

type SessionRpcRow = {
  session_id: string;
  is_current: boolean;
  created_at: string;
  last_active_at: string;
  expires_at: string | null;
  user_agent: string | null;
  ip_hint: string | null;
  assurance_level: string | null;
};

function getBrowser(
  userAgent: string,
): string {
  if (/Edg\//i.test(userAgent)) {
    return "Microsoft Edge";
  }

  if (/OPR\//i.test(userAgent)) {
    return "Opera";
  }

  if (/SamsungBrowser\//i.test(userAgent)) {
    return "Samsung Internet";
  }

  if (
    /Chrome\//i.test(userAgent) ||
    /CriOS\//i.test(userAgent)
  ) {
    return "Google Chrome";
  }

  if (
    /Firefox\//i.test(userAgent) ||
    /FxiOS\//i.test(userAgent)
  ) {
    return "Mozilla Firefox";
  }

  if (
    /Safari\//i.test(userAgent) &&
    /Version\//i.test(userAgent)
  ) {
    return "Safari";
  }

  return "Unknown browser";
}

function getOperatingSystem(
  userAgent: string,
): string {
  if (/Windows NT/i.test(userAgent)) {
    return "Windows";
  }

  const androidMatch =
    userAgent.match(
      /Android\s([0-9.]+)/i,
    );

  if (androidMatch?.[1]) {
    return `Android ${androidMatch[1]}`;
  }

  const iosMatch =
    userAgent.match(
      /(?:iPhone OS|CPU OS)\s([0-9_]+)/i,
    );

  if (iosMatch?.[1]) {
    return `iOS ${iosMatch[1].replaceAll(
      "_",
      ".",
    )}`;
  }

  const macMatch =
    userAgent.match(
      /Mac OS X\s([0-9_]+)/i,
    );

  if (macMatch?.[1]) {
    return `macOS ${macMatch[1].replaceAll(
      "_",
      ".",
    )}`;
  }

  if (/Linux/i.test(userAgent)) {
    return "Linux";
  }

  return "Unknown operating system";
}

function getDeviceType(
  userAgent: string,
): SessionDeviceType {
  if (
    /iPad|Tablet/i.test(userAgent) ||
    (
      /Android/i.test(userAgent) &&
      !/Mobile/i.test(userAgent)
    )
  ) {
    return "tablet";
  }

  if (
    /Mobile|iPhone|Android/i.test(
      userAgent,
    )
  ) {
    return "mobile";
  }

  if (userAgent.trim()) {
    return "desktop";
  }

  return "unknown";
}

export function mapSessionRow(
  row: SessionRpcRow,
): LifetopiaSessionView {
  const userAgent =
    row.user_agent ?? "";

  const browser =
    getBrowser(userAgent);

  const operatingSystem =
    getOperatingSystem(userAgent);

  const deviceType =
    getDeviceType(userAgent);

  return {
    sessionId: row.session_id,
    isCurrent: row.is_current,
    createdAt: row.created_at,
    lastActiveAt:
      row.last_active_at,
    expiresAt: row.expires_at,
    ipHint: row.ip_hint,
    assuranceLevel:
      row.assurance_level ?? "aal1",
    deviceType,
    browser,
    operatingSystem,
    deviceLabel:
      browser === "Unknown browser" &&
      operatingSystem ===
        "Unknown operating system"
        ? "Unknown device"
        : `${browser} on ${operatingSystem}`,
  };
}

export function mapSessionRows(
  rows: unknown,
): LifetopiaSessionView[] {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows
    .filter(
      (
        row,
      ): row is SessionRpcRow =>
        typeof row === "object" &&
        row !== null &&
        "session_id" in row &&
        typeof row.session_id ===
          "string" &&
        "created_at" in row &&
        typeof row.created_at ===
          "string" &&
        "last_active_at" in row &&
        typeof row.last_active_at ===
          "string",
    )
    .map(mapSessionRow);
}
