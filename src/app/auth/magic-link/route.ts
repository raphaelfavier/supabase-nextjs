import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, type } = body as { email?: string; type?: string };

  if (!email || !type) {
    return NextResponse.json(
      { error: "Missing email or type" },
      { status: 400 }
    );
  }

  let error;
  let supabase;

  switch (type) {
    case "recovery":
      supabase = await getSupabaseCookiesUtilClient();
      ({ error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?type=recovery`,
      }));
      break;

    case "magiclink":
      supabase = await getSupabaseCookiesUtilClient();
      ({ error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?type=magiclink`,
        },
      }));
      break;

    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
