import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  const supabase = await getSupabaseCookiesUtilClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url));
}
