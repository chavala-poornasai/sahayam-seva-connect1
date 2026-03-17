import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    console.log("=== TEST ENDPOINT ===");
    console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("SERVICE_ROLE_KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { email, password } = await req.json();

    // Test 1: Create auth user
    console.log("\n1. Testing user creation...");
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: false,
    });

    console.log("Auth Response:", {
      userId: authData?.user?.id,
      error: authError,
    });

    if (authError) {
      return NextResponse.json({
        stage: "auth_creation_failed",
        error: authError.message,
        details: authError,
      });
    }

    if (!authData.user?.id) {
      return NextResponse.json({
        stage: "no_user_id",
        error: "Failed to get user ID from auth response",
      });
    }

    const userId = authData.user.id;

    // Test 2: Insert into users table
    console.log("\n2. Testing insert into users table...");
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from("users")
      .insert({
        id: userId,
        fullName: "Test User",
        email: email,
        role: "citizen",
        isVerified: false,
      })
      .select();

    console.log("Insert Response:", {
      data: insertData,
      error: insertError,
    });

    if (insertError) {
      // Cleanup
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({
        stage: "insert_failed",
        error: insertError.message,
        details: insertError,
        userId: userId,
      });
    }

    // Test 3: Verify data was inserted
    console.log("\n3. Verifying insert...");
    const { data: userData, error: selectError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    console.log("Verification:", { userData, selectError });

    return NextResponse.json({
      success: true,
      stage: "completed",
      userId: userId,
      data: userData,
    });
  } catch (error: any) {
    console.error("TEST ENDPOINT ERROR:", error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    });
  }
}
