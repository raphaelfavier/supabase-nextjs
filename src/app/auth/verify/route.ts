import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hashed_token = searchParams.get("hashed_token");
  const isRecovery = searchParams.get("type") === "recovery";
  const code = searchParams.get("code");

  if (!hashed_token && !code) {
    return NextResponse.redirect(
      new URL("/error?type=missing_token", request.url)
    );
  }

  const supabase = await getSupabaseCookiesUtilClient();

  let verifyType: "magiclink" | "recovery" = "magiclink";
  if (isRecovery) verifyType = "recovery";

  if (hashed_token) {
    const { error } = await supabase.auth.verifyOtp({
      type: verifyType,
      token_hash: hashed_token,
    });
    if (error) {
      return NextResponse.redirect(
        new URL("/error?type=invalid_magiclink", request.url)
      );
    }
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL("/error?type=invalid_magiclink", request.url)
      );
    } else if (isRecovery) {
      return NextResponse.redirect(
        new URL("/profile/change-password", request.url)
      );
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}
