import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Loaded" : "✗ Missing",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Loaded" : "✗ Missing",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✓ Loaded" : "✗ Missing",
    nodeEnv: process.env.NODE_ENV,
    envFileLoaded: process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined,
  });
}
