"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { User } from "@supabase/supabase-js";

export type UserRole = "citizen" | "ngo" | "admin";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  loading: boolean;
  language: string;
  setLanguage: (lang: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("English");

  // Check user session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: role || "citizen" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const data = await response.json();
      
      // Store auth token
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      
      // Create user object from response and set state
      if (data.user) {
        const userObj: User = {
          id: data.user.id,
          aud: "authenticated",
          role: "authenticated",
          email: data.user.email,
          email_confirmed_at: new Date().toISOString(),
          phone: "",
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {
            fullName: data.user.fullName,
            role: data.user.role,
          },
          identities: [],
          is_anonymous: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as unknown as User;
        
        setUser(userObj);
      }
      
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, password, role: role || "citizen" }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Signup error:", error);
        throw new Error(error.error || "Registration failed");
      }

      const data = await response.json();
      
      // Create user object from response and set state (auto-login after signup)
      if (data.user) {
        const userObj: User = {
          id: data.user.id,
          aud: "authenticated",
          role: "authenticated",
          email: data.user.email,
          email_confirmed_at: new Date().toISOString(),
          phone: "",
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {
            fullName: data.user.fullName,
            role: data.user.role,
          },
          identities: [],
          is_anonymous: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as unknown as User;
        
        setUser(userObj);
      }
      
      return data;
    } catch (err: any) {
      console.error("Signup exception:", err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, loading: isLoading, language, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}