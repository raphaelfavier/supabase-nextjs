"use client";

import { useState } from "react";
import ActionButton from "@/templates/actionButton/actionButton";
import FormField from "@/templates/formField/FormField";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRequest = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/auth/magic-link", {
        method: "POST",
        body: JSON.stringify({ email, type: "recovery" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Request failed");
      } else {
        setSuccess(
          "Password reset email sent (if your email exists in our system)."
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow flex flex-col gap-4 items-center">
      <h2 className="text-xl font-semibold">Request Password Reset</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRequest();
        }}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
          disabled={loading}
        />
        <ActionButton
          type="submit"
          disabled={loading || !email}
          className="w-full"
        >
          {loading ? "Requesting..." : "Send Password Reset Email"}
        </ActionButton>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </div>
  );
}
