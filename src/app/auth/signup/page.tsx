"use client";
import { signup } from "@/app/actions/auth-actions";
import ActionButton from "@/templates/actionButton/actionButton";
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
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const { error } = await signup(formData);
      if (error) {
        setError(error);
      } else {
        alert("Signed up, please check your email");
      }
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
          autoComplete="email"
        />

        <label htmlFor="password" style={{ display: "block", marginBottom: 8 }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
          autoComplete="new-password"
        />

        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <ActionButton type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </ActionButton>
      </form>
    </div>
  );
}
