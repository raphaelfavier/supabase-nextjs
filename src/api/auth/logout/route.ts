import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";

export async function POST(request: NextRequest) {
  const supabase = await getSupabaseCookiesUtilClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url));
}
