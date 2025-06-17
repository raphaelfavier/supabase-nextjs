"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import FormField from "@/templates/formField/FormField";
import ActionButton from "@/templates/actionButton/actionButton";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const value = password.trim();
    if (!value) {
      setError("Password cannot be empty.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: value });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password updated!");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="New Password"
          name="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          autoComplete="new-password"
          disabled={loading}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <ActionButton type="submit" disabled={loading || !password} className="w-full">
          {loading ? "Updating..." : "Reset Password"}
        </ActionButton>
      </form>
    </div>
  );
}
