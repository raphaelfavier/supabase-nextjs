"use server";

import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  const supabase = await getSupabaseCookiesUtilClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Check your email for a confirmation link",
  };
}
