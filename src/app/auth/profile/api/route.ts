import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await getSupabaseCookiesUtilClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.json(user);
}
