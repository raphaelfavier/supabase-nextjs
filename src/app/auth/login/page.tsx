"use client";
import React, { useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth-actions";
import ActionButton from "@/templates/actionButton/actionButton";
import FormField from "@/templates/formField/FormField";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Placeholder: Add authentication logic here

    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      const { error } = await login({ email, password });
      if (error) {
        setError(error);
      } else {
        alert("Logged in");
      }
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
        <FormField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          autoComplete="current-password"
        />

        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <ActionButton type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </ActionButton>
      </form>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <span>Don&apos;t have an account? </span>
        <Link
          href="/auth/signup"
          style={{ color: "#6366f1", textDecoration: "underline" }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
