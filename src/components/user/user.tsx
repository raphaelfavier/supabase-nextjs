"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";

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
      } catch (error) {
        console.error("Error getting user ID:", error);
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
    } catch (error: any) {
      setLogoutError(error.message || "An error occurred during logout.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userId) {
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <button className="px-4 py-2 border border-indigo-600 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 hover:border-indigo-700 transition-colors">
          Profile
        </button>
        <button
          className="px-4 py-2 border border-indigo-600 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 hover:border-indigo-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
        {logoutError && (
          <div className="text-red-600 text-sm mt-2">{logoutError}</div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="px-4 py-2 border border-indigo-600 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 hover:border-indigo-700 transition-colors"
    >
      Login
    </Link>
  );
}
