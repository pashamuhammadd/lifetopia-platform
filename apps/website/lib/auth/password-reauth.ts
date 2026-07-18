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

    return response.ok;
  } catch {
    return false;
  }
}
