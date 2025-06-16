"use client";
import { signup } from "@/app/actions/auth-actions";
import ActionButton from "@/templates/actionButton/actionButton";
import FormField from "@/templates/formField/FormField";
import React, { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      const { error } = await signup({ email, password });
      if (error) {
        setError(error);
      } else {
        alert("Signed up, please check your email");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center sm:w-[400px] w-full mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <ActionButton type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </ActionButton>
      </form>
    </div>
  );
}
