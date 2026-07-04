import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { identifier, password } = await request.json();

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

    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("username", trimmedIdentifier)
      .maybeSingle();

    if (!profile) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 },
      );
    }

    const { data: userData } = await admin.auth.admin.getUserById(profile.id);

    if (!userData.user?.email) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 },
      );
    }

    email = userData.user.email;
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

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