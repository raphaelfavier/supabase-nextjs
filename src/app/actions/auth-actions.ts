"use server";

import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";

import { authSchema, passwordSchema } from "@/schemas/authSchemas";
import type { AuthType, PasswordType } from "@/types/authTypes";

export async function signup(formData: AuthType) {
  const parsed = authSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  }
  const { email: validEmail, password: validPassword } = parsed.data;

  const supabase = await getSupabaseCookiesUtilClient();

  const { error } = await supabase.auth.signUp({
    email: validEmail,
    password: validPassword,
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

export async function login(formData: AuthType) {
  const parsed = authSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  }
  const { email: validEmail, password: validPassword } = parsed.data;

  const supabase = await getSupabaseCookiesUtilClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validEmail,
    password: validPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function changePassword(formData: PasswordType) {
  const parsed = passwordSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  }
  const { password: validPassword } = parsed.data;

  const supabase = await getSupabaseCookiesUtilClient();

  const { error } = await supabase.auth.updateUser({
    password: validPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}
