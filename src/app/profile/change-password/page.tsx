"use client";

import { useState } from "react";
import FormField from "@/templates/formField/FormField";
import ActionButton from "@/templates/actionButton/actionButton";
import { changePassword } from "@/app/actions/auth-actions";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, loading: userLoading } = useUser();

  const email = user?.email || "";

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
    const { error } = await changePassword({ password: value });
    if (error) {
      setError(error);
    } else {
      setSuccess("Password updated!");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="sm:w-[400px] w-full mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={() => {}}
          autoComplete="username"
          disabled={loading || userLoading}
          readOnly
        />

        <FormField
          label="New Password"
          name="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          autoComplete="new-password"
          disabled={loading}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && (
          <>
            <div className="text-green-600 mb-2">{success}</div>
            <Link
              href="/"
              className="block text-indigo-500 underline hover:text-indigo-700 mb-2 text-center"
            >
              Go to home
            </Link>
          </>
        )}
        <ActionButton
          type="submit"
          disabled={loading || !password}
          className="w-full"
        >
          {loading ? "Updating..." : "Reset Password"}
        </ActionButton>
      </form>
    </div>
  );
}
