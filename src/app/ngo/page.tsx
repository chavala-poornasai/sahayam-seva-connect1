"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, LogOut, Loader2, Plus, Trash2, Star, Users, 
  Zap, Target, TrendingUp, Award, AlertCircle, CheckCircle 
} from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
  urgency: "emergency" | "high" | "medium" | "low";
  volunteersNeeded: number;
  volunteersAssigned: number;
  impactPoints: number;
  status: "active" | "completed" | "paused";
  createdAt: string;
}

interface Volunteer {
  id: string;
  name: string;
  score: number;
  missionsCompleted: number;
  missionsAssigned: number;
  isActive: boolean;
  lastActive: string;
}

export default function NGODashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  
  const [missions, setMissions] = useState<Mission[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [missionUrgency, setMissionUrgency] = useState<"emergency" | "high" | "medium" | "low">("high");
  const [volunteersNeeded, setVolunteersNeeded] = useState("5");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  // Mock data initialization
  useEffect(() => {
    setVolunteers([
      { id: "1", name: "Rajesh Kumar", score: 850, missionsCompleted: 5, missionsAssigned: 3, isActive: true, lastActive: "2 hours ago" },
      { id: "2", name: "Priya Singh", score: 720, missionsCompleted: 4, missionsAssigned: 2, isActive: true, lastActive: "1 day ago" },
      { id: "3", name: "Amit Patel", score: 450, missionsCompleted: 2, missionsAssigned: 1, isActive: false, lastActive: "30 days ago" },
      { id: "4", name: "Deepika Sharma", score: 920, missionsCompleted: 8, missionsAssigned: 4, isActive: true, lastActive: "5 hours ago" },
      { id: "5", name: "Vikram Das", score: 380, missionsCompleted: 1, missionsAssigned: 0, isActive: false, lastActive: "45 days ago" },
    ]);

    setMissions([
      { 
        id: "m1", 
        title: "Flood Relief - Riverside Villages", 
        description: "Emergency relief distribution in flood-affected areas",
        urgency: "emergency", 
        volunteersNeeded: 20, 
        volunteersAssigned: 12, 
        impactPoints: 500, 
        status: "active",
        createdAt: "2024-03-10"
      },
      { 
        id: "m2", 
        title: "School Construction Project", 
        description: "Building a primary school in rural area",
        urgency: "high", 
        volunteersNeeded: 15, 
        volunteersAssigned: 8, 
        impactPoints: 300, 
        status: "active",
        createdAt: "2024-02-28"
      },
      { 
        id: "m3", 
        title: "Healthcare Awareness Camp", 
        description: "Health checkups and awareness program for underprivileged",
        urgency: "medium", 
        volunteersNeeded: 10, 
        volunteersAssigned: 10, 
        impactPoints: 150, 
        status: "active",
        createdAt: "2024-02-15"
      },
    ]);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePostMission = async () => {
    if (!missionTitle.trim() || !missionDescription.trim()) {
      alert("Please fill all fields");
      return;
    }

    setIsSaving(true);
    try {
      const newMission: Mission = {
        id: Date.now().toString(),
        title: missionTitle,
        description: missionDescription,
        urgency: missionUrgency,
        volunteersNeeded: parseInt(volunteersNeeded),
        volunteersAssigned: 0,
        impactPoints: 0,
        status: "active",
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setMissions([newMission, ...missions]);
      setMissionTitle("");
      setMissionDescription("");
      setMissionUrgency("high");
      setVolunteersNeeded("5");
      setShowMissionForm(false);
      alert("Mission posted successfully!");
    } catch (error) {
      console.error("Error posting mission:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveVolunteer = (volunteerId: string) => {
    setVolunteers(volunteers.filter(v => v.id !== volunteerId));
    alert("Inactive volunteer removed from system");
  };

  const handleDeleteMission = (missionId: string) => {
    setMissions(missions.filter(m => m.id !== missionId));
    alert("Mission removed");
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

  const activeVolunteers = volunteers.filter(v => v.isActive);
  const inactiveVolunteers = volunteers.filter(v => !v.isActive);
  const totalImpactPoints = missions.reduce((sum, m) => sum + m.impactPoints, 0);
  const totalVolunteersEngaged = Math.max(...volunteers.map(v => v.missionsAssigned), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Building2 className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">NGO Management Portal</h1>
              <p className="text-slate-400">Welcome, {user?.user_metadata?.fullName || "Organization"}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="gap-2 bg-red-500/10 hover:bg-red-500/20 border-red-500/50 text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Missions</p>
                  <p className="text-3xl font-bold text-white mt-1">{missions.length}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Volunteers</p>
                  <p className="text-3xl font-bold text-white mt-1">{activeVolunteers.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Impact Points</p>
                  <p className="text-3xl font-bold text-white mt-1">{totalImpactPoints}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg Vol. Score</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {activeVolunteers.length > 0 
                      ? Math.round(activeVolunteers.reduce((sum, v) => sum + v.score, 0) / activeVolunteers.length) 
                      : 0}
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Mission Section - Center Featured */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-orange-500/50 border-2 shadow-lg shadow-orange-500/20">
              <CardHeader className="bg-gradient-to-r from-orange-600/20 to-orange-500/10 border-b border-orange-500/30">
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="h-5 w-5 text-orange-500" />
                  Post New Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!showMissionForm ? (
                  <Button 
                    onClick={() => setShowMissionForm(true)}
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white text-lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Mission
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Mission Title</label>
                      <Input 
                        placeholder="e.g., Flood Relief - Riverside"
                        value={missionTitle}
                        onChange={(e) => setMissionTitle(e.target.value)}
                        className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300">Description</label>
                      <Textarea 
                        placeholder="Describe the mission objective and impact..."
                        value={missionDescription}
                        onChange={(e) => setMissionDescription(e.target.value)}
                        className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 h-24"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300">Urgency Level</label>
                        <select 
                          value={missionUrgency}
                          onChange={(e) => setMissionUrgency(e.target.value as any)}
                          className="w-full mt-1 bg-slate-700 border border-slate-600 rounded-md text-white px-3 py-2"
                        >
                          <option value="emergency">🔴 Emergency</option>
                          <option value="high">🟠 High</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="low">🟢 Low</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300">Volunteers Needed</label>
                        <Input 
                          type="number" 
                          min="1" 
                          value={volunteersNeeded}
                          onChange={(e) => setVolunteersNeeded(e.target.value)}
                          className="mt-1 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={handlePostMission}
                        disabled={isSaving}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        {isSaving ? "Posting..." : "Post Mission"}
                      </Button>
                      <Button 
                        onClick={() => setShowMissionForm(false)}
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Missions List */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                Active Missions
              </h2>
              <div className="space-y-4">
                {missions.filter(m => m.status === "active").map(mission => (
                  <Card key={mission.id} className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">{mission.title}</h3>
                          <p className="text-slate-400 text-sm mt-1">{mission.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            mission.urgency === 'emergency' ? 'bg-red-500/20 text-red-400' :
                            mission.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            mission.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {mission.urgency.toUpperCase()}
                          </span>
                          <Button 
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:bg-red-500/20"
                            onClick={() => handleDeleteMission(mission.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
                        <div>
                          <p className="text-slate-400 text-xs">Volunteers</p>
                          <p className="text-white font-bold">{mission.volunteersAssigned}/{mission.volunteersNeeded}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Impact Points</p>
                          <p className="text-white font-bold">{mission.impactPoints}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Posted</p>
                          <p className="text-white font-bold text-sm">{mission.createdAt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Volunteer Management Sidebar */}
          <div className="lg:col-span-1">
            {/* Active Volunteers */}
            <Card className="bg-slate-800 border-slate-700 mb-6">
              <CardHeader className="bg-gradient-to-r from-green-600/20 to-green-500/10 border-b border-green-500/30">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Active Volunteers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {activeVolunteers.map(volunteer => (
                    <div key={volunteer.id} className="p-3 bg-slate-700/50 rounded-lg border border-green-500/20">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold text-sm">{volunteer.name}</p>
                          <p className="text-slate-400 text-xs">Score: {volunteer.score}</p>
                        </div>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <p>Completed: {volunteer.missionsCompleted}</p>
                        <p>Active: {volunteer.missionsAssigned}</p>
                        <p className="text-green-400">{volunteer.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inactive Volunteers */}
            {inactiveVolunteers.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="bg-gradient-to-r from-red-600/20 to-red-500/10 border-b border-red-500/30">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Inactive Volunteers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {inactiveVolunteers.map(volunteer => (
                      <div key={volunteer.id} className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white font-semibold text-sm">{volunteer.name}</p>
                            <p className="text-slate-400 text-xs">Score: {volunteer.score}</p>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">
                          <p>Last Active: {volunteer.lastActive}</p>
                        </div>
                        <Button 
                          size="sm"
                          variant="destructive"
                          className="w-full text-xs"
                          onClick={() => handleRemoveVolunteer(volunteer.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove Volunteer
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
