
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// This file is now redundant as Auth is on the root page, 
// but we keep it to prevent 404s if direct navigation occurs.
export default function AuthRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
