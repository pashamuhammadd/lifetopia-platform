export async function verifyCurrentPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const anonKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !anonKey ||
    !email ||
    !password
  ) {
    return false;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization:
            `Bearer ${anonKey}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    // This password-grant call mints a brand-new Supabase session
    // purely so we can check the password. Revoke it immediately
    // below so it does not linger as an orphaned, untracked session
    // outside of the app's own session management.
    const tokenPayload =
      await response
        .json()
        .catch(() => null) as
        | { access_token?: unknown }
        | null;

    const accessToken =
      typeof tokenPayload?.access_token ===
        "string"
        ? tokenPayload.access_token
        : null;

    if (accessToken) {
      await fetch(
        `${supabaseUrl}/auth/v1/logout?scope=local`,
        {
          method: "POST",
          headers: {
            apikey: anonKey,
            Authorization:
              `Bearer ${accessToken}`,
          },
          cache: "no-store",
        },
      ).catch(() => {
        // Best-effort cleanup only; the reauth
        // result above is already determined.
      });
    }

    return true;
  } catch {
    return false;
  }
}
