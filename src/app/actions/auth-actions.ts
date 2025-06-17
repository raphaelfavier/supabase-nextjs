"use server";

import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";

import { authSchema, passwordSchema } from "@/schemas/authSchemas";
import type { AuthType, PasswordType } from "@/types/authTypes";

/**
 * Registers a new user with email and password.
 * Returns a message prompting email confirmation on success.
 */
export async function signup(formData: AuthType) {
  // Validate input using Zod schema
  const parsed = authSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  }
  // Extract validated email and password
  const { email: validEmail, password: validPassword } = parsed.data;

  // Get Supabase client with cookie support
  const supabase = await getSupabaseCookiesUtilClient();

  // Attempt to sign up the user
  const { error } = await supabase.auth.signUp({
    email: validEmail,
    password: validPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Success: ask user to check their email
  return {
    success: true,
    message: "Check your email for a confirmation link",
  };
}

/**
 * Logs in a user with email and password.
 * Returns success or error message.
 */
export async function login(formData: AuthType) {
  // Validate input using Zod schema
  const parsed = authSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  }
  // Extract validated email and password
  const { email: validEmail, password: validPassword } = parsed.data;

  // Get Supabase client with cookie support
  const supabase = await getSupabaseCookiesUtilClient();

  // Attempt to sign in with password
  const { error } = await supabase.auth.signInWithPassword({
    email: validEmail,
    password: validPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Success
  return {
    success: true,
  };
}

/**
 * Changes the current user's password.
 * Returns success or error message.
 */
export async function changePassword(formData: PasswordType) {
  // Validate input using Zod schema
  const parsed = passwordSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  }
  // Extract validated password
  const { password: validPassword } = parsed.data;

  // Get Supabase client with cookie support
  const supabase = await getSupabaseCookiesUtilClient();

  // Attempt to update the user's password
  const { error } = await supabase.auth.updateUser({
    password: validPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Success
  return {
    success: true,
  };
}
