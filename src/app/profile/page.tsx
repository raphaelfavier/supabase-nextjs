"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileType } from "@/types/profileTypes";
import ActionButton from "@/templates/actionButton/actionButton";

export default function Profile() {
  const [user, setUser] = useState<(ProfileType & { email?: string }) | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/profile/api", {
          method: "GET",
          credentials: "include",
        });
        const status = res.status;
        const data = await res.json();
        if (status === 401) {
          router.replace("/auth/login");
          return;
        }
        if (status === 404) {
          setError("Profile not found.");
          setUser(null);
          return;
        }
        if (!res.ok) {
          setError(data.error || "Failed to fetch profile");
          setUser(null);
          return;
        }

        setUser(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Form state
  const [form, setForm] = useState({
    username: user?.username ?? "",
    full_name: user?.full_name ?? "",
    avatar_url: user?.avatar_url ?? "",
    website: user?.website ?? "",
  });

  // Sync form state with user data after fetch
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username ?? "",
        full_name: user.full_name ?? "",
        avatar_url: user.avatar_url ?? "",
        website: user.website ?? "",
      });
    }
  }, [user]);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  if (loading)
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 border rounded-lg shadow animate-pulse">
        <div className="h-7 w-32 bg-gray-200 rounded mb-6" />
        <div className="space-y-6">
          <div className="h-5 w-56 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="h-10 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    );
  if (error) return <div className="text-red-600">{error}</div>;
  if (!user) return <div>No profile found.</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const res = await fetch("/profile/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to update profile");
      } else {
        setFormSuccess("Profile updated successfully!");
        setUser((prev) => ({ ...prev!, ...form }));
      }
    } catch (err: any) {
      setFormError(err.message || "Unknown error");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            autoComplete="username"
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="full_name"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="avatar_url"
          >
            Avatar URL
          </label>
          <input
            type="url"
            id="avatar_url"
            name="avatar_url"
            value={form.avatar_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            autoComplete="url"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="website">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            autoComplete="url"
          />
        </div>
        {formError && <div className="text-red-600 text-sm">{formError}</div>}
        {formSuccess && (
          <div className="text-green-600 text-sm">{formSuccess}</div>
        )}

        <ActionButton type="submit" disabled={formLoading} className="ml-auto">
          {formLoading ? "Saving..." : "Save Changes"}
        </ActionButton>
      </form>
    </div>
  );
}
