"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import ActionButton from "@/templates/actionButton/actionButton";

export default function User() {
  // Replace with real authentication logic
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserId() {
      try {
        setLoading(true);
        const supabase = getSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);
        } else {
          setUserId(null);
        }
      } catch {
        setUserId(null);
      } finally {
        setLoading(false);
      }
    }

    getUserId();
  }, []);

  const handleLogout = async () => {
    setLogoutError(null);
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Logout failed");
      }
      // Revalidate client: reload the page to update user state and cookies
      window.location.reload();
    } catch (err: unknown) {
      // Safely check if err is an Error
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Unexpected error";
      setLogoutError(message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userId) {
    return (
      <div className="flex gap-2">
        <Link href="/profile">
          <ActionButton>Profile</ActionButton>
        </Link>
        <ActionButton variant="gray" onClick={handleLogout}>
          Logout
        </ActionButton>
        {logoutError && (
          <div className="text-red-600 text-sm mt-2">{logoutError}</div>
        )}
      </div>
    );
  }

  return (
    <Link href="/auth/login">
      <ActionButton>Login</ActionButton>
    </Link>
  );
}
