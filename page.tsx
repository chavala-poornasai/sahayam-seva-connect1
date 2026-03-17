
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Loader2, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup Form State
  const [signupUser, setSignupUser] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ title: "Validation Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (!validateEmail(loginEmail)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast({ title: "Welcome back!", description: "Successfully logged into HealthSphere AI." });
    } catch (err) {
      toast({ title: "Login Failed", description: "Invalid credentials. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupUser || !signupEmail || !signupPass || !signupConfirm) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (!validateEmail(signupEmail)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (signupPass.length < 8) {
      toast({ title: "Password Too Short", description: "Password must be at least 8 characters long.", variant: "destructive" });
      return;
    }
    if (signupPass !== signupConfirm) {
      toast({ title: "Match Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      await signup(signupUser, signupEmail, signupPass);
      toast({ title: "Account Created", description: "Account created successfully. Please login to continue." });
      setActiveTab("login");
    } catch (err) {
      toast({ title: "Registration Error", description: "Failed to create account. Email might already be in use.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f4f8] relative overflow-hidden p-4 font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/med-bg-auth/1920/1080" 
          alt="Healthcare background" 
          fill 
          className="object-cover opacity-5 grayscale pointer-events-none"
          data-ai-hint="modern hospital"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/20 via-transparent to-[#1e293b]/20" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#1e40af] p-3 rounded-2xl shadow-xl mb-4 border border-white/20">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1e293b]">HealthSphere AI</h1>
          <p className="text-[#64748b] text-sm font-semibold uppercase tracking-widest mt-1">Welcome Back</p>
        </div>

        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-2 bg-muted/30">
              <TabsList className="grid w-full grid-cols-2 h-11 rounded-2xl">
                <TabsTrigger value="login" className="text-sm font-bold rounded-xl data-[state=active]:shadow-md">Login</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm font-bold rounded-xl data-[state=active]:shadow-md">Sign Up</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="login" className="mt-0 focus-visible:ring-0">
              <form onSubmit={handleLogin}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-[#1e293b]">Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#334155] font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="pl-10 h-11 bg-white border-[#e2e8f0] focus:ring-[#1e40af]"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" title="Password Requirements" className="text-[#334155] font-semibold">Password</Label>
                      <Button variant="link" className="px-0 h-auto text-xs text-[#1e40af] font-bold hover:no-underline">Forgot password?</Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        className="pl-10 h-11 bg-white border-[#e2e8f0] focus:ring-[#1e40af]"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="remember" className="rounded border-[#cbd5e1] data-[state=checked]:bg-[#1e40af]" />
                    <label htmlFor="remember" className="text-sm font-medium text-[#475569] leading-none cursor-pointer">
                      Remember this session for 30 days
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-8">
                  <Button className="w-full h-12 text-base font-bold bg-[#1e40af] hover:bg-[#1e3a8a] rounded-xl shadow-lg shadow-blue-500/20" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Sign In to Dashboard"}
                  </Button>
                  <p className="text-center text-xs text-[#64748b]">
                    Secured with industry-standard encryption.
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-0 focus-visible:ring-0">
              <form onSubmit={handleSignup}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-[#1e293b]">Create Account</CardTitle>
                  <CardDescription>Join our community and get started today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[#334155] font-semibold">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
                      <Input 
                        id="username" 
                        placeholder="John Doe" 
                        className="pl-10 h-11 bg-white border-[#e2e8f0] focus:ring-[#1e40af]"
                        value={signupUser}
                        onChange={(e) => setSignupUser(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-[#334155] font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="pl-10 h-11 bg-white border-[#e2e8f0] focus:ring-[#1e40af]"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" title="At least 8 characters" className="text-[#334155] font-semibold">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="h-11 bg-white border-[#e2e8f0] focus:ring-[#1e40af]"
                        value={signupPass}
                        onChange={(e) => setSignupPass(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-[#334155] font-semibold">Confirm</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="h-11 bg-white border-[#e2e8f0] focus:ring-[#1e40af]"
                        value={signupConfirm}
                        onChange={(e) => setSignupConfirm(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-[#1e40af] mt-0.5 shrink-0" />
                    <p className="text-[10px] text-[#1e40af] leading-tight italic font-medium">
                      By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button className="w-full h-12 text-base font-bold bg-[#475569] hover:bg-[#334155] rounded-xl shadow-lg" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Register New Account"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            Secure Environment <ShieldCheck className="w-3 h-3 text-[#1e40af]" /> Protected
          </p>
        </div>
      </div>
    </div>
  );
}
