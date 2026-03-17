import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, role } = await req.json();

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be 8+ characters" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Step 1: Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Step 2: Update user profile
    await updateProfile(userCredential.user, { displayName: fullName });

    // Step 3: Save user data to Firestore
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      id: uid,
      uid: uid,
      fullName: fullName,
      email: email,
      role: role || "citizen",
      createdAt: new Date(),
      isVerified: false,
      preferences: {
        notifications: true,
        theme: "light",
      },
    });

    // Step 4: Get ID token
    const idToken = await userCredential.user.getIdToken();

    // Step 5: Return success response
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        uid: uid,
        email: email,
        displayName: fullName,
        role: role || "citizen",
      },
      token: idToken,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle specific Firebase Auth errors
    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    if (error.code === "auth/weak-password") {
      return NextResponse.json(
        { error: "Password is too weak" },
        { status: 400 }
      );
    }

    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Handle Firestore errors
    if (error.message?.includes("Missing or insufficient permissions")) {
      return NextResponse.json(
        { error: "Permission denied. Check Firestore rules." },
        { status: 403 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: error.message || "Registration failed", 
        code: error.code,
      },
      { status: 400 }
    );
  }
}