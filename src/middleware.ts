import { NextRequest } from "next/server";
import { getSupabaseReqResClient } from "@/utils/supabase/reqResClient";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await getSupabaseReqResClient({
    request: request,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const requestedPath = request.nextUrl.pathname;

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
