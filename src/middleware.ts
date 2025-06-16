import { NextRequest, NextResponse } from "next/server";
import { getSupabaseReqResClient } from "@/utils/supabase/reqResClient";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await getSupabaseReqResClient({
    request: request,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const requestedPath = request.nextUrl.pathname;

  if (!user) {
    if (requestedPath.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
