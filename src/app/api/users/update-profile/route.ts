import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    const { userId, skills } = await req.json();

    if (!userId || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: "User ID and skills array are required" },
        { status: 400 }
      );
    }

    // Update user metadata with skills
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { skills }
    });

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { error: "Failed to update skills" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Skills updated successfully",
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
