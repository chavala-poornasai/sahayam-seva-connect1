import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials:", {
    url: !!supabaseUrl,
    key: !!supabaseKey,
  });
}

// Create admin client for server-side operations
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, role } = await req.json();

    // Debug logging
    console.log("Register attempt:", {
      email,
      supabaseUrlConfigured: !!supabaseUrl,
      supabaseKeyConfigured: !!supabaseKey,
    });

    // Validation
    if (!fullName?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be 8+ characters" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Create user in Supabase Auth with retry
    let authData: any, authError: any;
    let retries = 3;
    
    while (retries > 0) {
      try {
        const result = await supabaseAdmin.auth.admin.createUser({
          email: email.toLowerCase(),
          password: password,
          email_confirm: true,
        });
        authData = result.data;
        authError = result.error;
        break;
      } catch (error: any) {
        retries--;
        console.error(`Auth creation attempt failed (${4 - retries}/3):`, error.message);
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        } else {
          authError = error;
        }
      }
    }

    if (authError) {
      console.error("Auth creation error:", JSON.stringify(authError, null, 2));
      if (authError.message?.includes("already registered")) {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
      }
      return NextResponse.json({ error: authError.message || "Registration failed" }, { status: 400 });
    }

    if (!authData.user?.id) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 400 });
    }

    // Save user profile to users table
    const now = new Date().toISOString();
    const { error: insertError } = await supabaseAdmin.from("users").insert({
      id: authData.user.id,
      fullname: fullName,
      email: email.toLowerCase(),
      role: role || "citizen",
      isverified: false,
      createdat: now,
      preferences: { notifications: true, theme: "light" },
    });

    if (insertError) {
      // Cleanup: delete user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      console.error("Profile insert error:", JSON.stringify(insertError, null, 2));
      return NextResponse.json(
        { error: "Failed to create user profile", details: insertError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Digital identity provisioned",
        user: {
          id: authData.user.id,
          email: email.toLowerCase(),
          fullName: fullName,
          role: role || "citizen",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
