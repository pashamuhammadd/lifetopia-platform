import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PACKAGE_NAMES = [
  "io.lifetopiaworld.community",
  "io.lifetopiaworld.community.debug",
] as const;
const DEBUG_FINGERPRINT =
  "66:0E:14:31:BF:5C:A9:91:02:5B:1F:9F:0E:31:50:79:E3:D1:14:0C:E3:9F:94:F6:D5:61:A3:33:1D:26:E6:CD";
const FINGERPRINT_PATTERN = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/;

function configuredFingerprints() {
  const configured = [
    process.env.ANDROID_APP_SHA256_CERT_FINGERPRINT,
    ...(process.env.ANDROID_APP_SHA256_CERT_FINGERPRINTS?.split(",") ?? []),
  ];

  return [...new Set([DEBUG_FINGERPRINT, ...configured]
    .map((value) => value?.trim().toUpperCase())
    .filter((value): value is string => Boolean(value && FINGERPRINT_PATTERN.test(value))))];
}

export function GET() {
  const fingerprints = configuredFingerprints();

  return NextResponse.json(
    PACKAGE_NAMES.map((packageName) => ({
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: packageName,
        sha256_cert_fingerprints: fingerprints,
      },
    })),
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } },
  );
}
