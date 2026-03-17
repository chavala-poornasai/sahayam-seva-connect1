import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email?.trim() || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Verify credentials using auth
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password,
    });

    if (signInError || !signInData.user) {
      console.error("Auth error:", signInError);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Get user profile from users table
    const { data: userProfile, error: profileError } = await supabaseAdmin
      .from("users")
      .select("id, fullname, email, role, isverified")
      .eq("id", signInData.user.id)
      .single();

    if (profileError || !userProfile) {
      console.error("Profile error:", profileError);
      return NextResponse.json({ error: "User profile not found" }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: userProfile.id,
          email: userProfile.email,
          fullName: userProfile.fullname,
          role: userProfile.role,
          isVerified: userProfile.isverified,
        },
        token: signInData.session?.access_token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
