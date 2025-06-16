import { profileReadSchema, profileWriteSchema } from "@/schemas/profileSchema";
import { getSupabaseCookiesUtilClient } from "@/utils/supabase/cookiesUtilClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await getSupabaseCookiesUtilClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    if (!user || !user.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const parsed = profileReadSchema.safeParse(profile);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ...parsed.data, email: user.user.email },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseCookiesUtilClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    if (!user || !user.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse and validate body
    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    // Validate with zod
    const parsed = profileWriteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .update(parsed.data)
      .eq("id", user.user.id)
      .select();

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    // Even if profile is null, this just means nothing changed. Return 200.
    return NextResponse.json(
      { profile, message: profile ? undefined : "No changes made" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
