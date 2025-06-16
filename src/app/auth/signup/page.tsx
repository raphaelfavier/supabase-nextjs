"use client";
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
    // Placeholder: Add signup logic here
    setTimeout(() => {
      setLoading(false);
      if (!email || !password) {
        setError("Please enter both email and password.");
      } else {
        // Simulate successful signup
        alert("Signed up (simulation)");
      }
    }, 800);
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
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 4,
            background: "#6366f1",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
