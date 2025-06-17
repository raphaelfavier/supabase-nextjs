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
    // user must be logged in to access any page under /profile
    if (requestedPath.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } else {
    if (
      // logged user does not have access to login and signup pages
      requestedPath.startsWith("/auth/login") ||
      requestedPath.startsWith("/auth/signup")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
