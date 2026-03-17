"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, LogOut, Loader2 } from "lucide-react";

export default function NGODashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">NGO Dashboard</h1>
              <p className="text-muted-foreground">Manage your organization's social impact</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to Sahayam NGO Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Hello, {user?.user_metadata?.fullName || user?.email}!
              </p>
              <p className="text-sm text-muted-foreground">
                This is your NGO/Organization dashboard. Here you can manage your social impact projects, 
                recruit volunteers, and track your organization's mission progress.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">0</div>
                    <p className="text-sm text-muted-foreground mt-1">Active Projects</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">0</div>
                    <p className="text-sm text-muted-foreground mt-1">Volunteers Engaged</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold">0</div>
                    <p className="text-sm text-muted-foreground mt-1">Social Impact Units</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notice */}
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Coming Soon:</strong> Project creation, volunteer management, analytics dashboard, 
              and impact tracking features are being built. Check back soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
