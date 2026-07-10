import { NextResponse } from "next/server";
import { createAdminClient } from "@repo/lib/supabase/admin";
import { createClient as createSupabaseServerClient } from "@repo/lib/supabase/server";

type LoginRequestBody = {
  identifier?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginRequestBody;

  try {
    body = (await request.json()) as LoginRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { identifier, password } = body;

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Username/email and password are required." },
      { status: 400 },
    );
  }

  const trimmedIdentifier = String(identifier).trim();
  const isEmail = trimmedIdentifier.includes("@");

  let email = trimmedIdentifier;

  if (!isEmail) {
    const admin = createAdminClient();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id")
      .eq("username", trimmedIdentifier)
      .maybeSingle();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 },
      );
    }

    const { data: userData, error: userError } =
      await admin.auth.admin.getUserById(profile.id);

    if (userError || !userData.user?.email) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 },
      );
    }

    email = userData.user.email;
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: "Invalid login credentials." },
      { status: 401 },
    );
  }

  return NextResponse.json({ success: true });
}