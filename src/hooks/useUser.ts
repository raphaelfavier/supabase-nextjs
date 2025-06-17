import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setError(error.message);
          setUser(null);
        } else {
          setUser(data.user || null);
        }
      } catch {
        setError("Failed to fetch user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  return { user, loading, error };
}
