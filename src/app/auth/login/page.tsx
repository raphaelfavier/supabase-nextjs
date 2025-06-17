"use client";
import React, { useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth-actions";
import ActionButton from "@/templates/actionButton/actionButton";
import FormField from "@/templates/formField/FormField";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    if (useMagicLink) {
      // Call magic-link API
      try {
        const res = await fetch("/auth/magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, type: "magiclink" }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          setError(data.error || "Failed to send magic link.");
        } else {
          setSuccess("Magic link sent! Check your email.");
        }
      } catch (err) {
        setError("Failed to send magic link.");
      }
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const { error } = await login({ email, password });
    if (error) {
      setError(error);
    } else {
      router.replace("/");
    }
    setLoading(false);
  };


  return (
    <div className="flex flex-col items-center sm:w-[400px] w-full mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
        />
        <div className="flex items-center gap-2 mb-2">
          <input
            id="use-magic-link"
            type="checkbox"
            checked={useMagicLink}
            onChange={() => setUseMagicLink((v) => !v)}
            className="accent-indigo-500"
          />
          <label htmlFor="use-magic-link" className="text-sm cursor-pointer">
            Use magic link
          </label>
        </div>
        <FormField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          autoComplete="current-password"
          disabled={useMagicLink}
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}
        <ActionButton type="submit" disabled={loading} className="w-full">
          {loading
            ? useMagicLink
              ? "Sending..."
              : "Logging in..."
            : useMagicLink
            ? "Send magic link"
            : "Login"}
        </ActionButton>
      </form>
      <div className="text-center mt-4">
        <Link
          href="/auth/reset-password"
          className="text-indigo-500 underline hover:text-indigo-700"
        >
          Forgot your password?
        </Link>
      </div>
      <div className="text-center mt-4">
        <span>Don&apos;t have an account? </span>
        <Link
          href="/auth/signup"
          className="text-indigo-500 underline hover:text-indigo-700"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
