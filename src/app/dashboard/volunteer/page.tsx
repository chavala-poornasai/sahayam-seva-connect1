"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";
import { 
  Wallet,
  MapPin,
  MessageSquare,
  Trophy,
  TrendingUp,
  AlertCircle,
  Flame,
  Zap,
  Download,
  Phone,
  Target,
  Heart,
  Loader2,
  LogOut
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { useRouter } from "next/navigation";

const impactData = [
  { name: 'Week 1', value: 2400 },
  { name: 'Week 2', value: 1398 },
  { name: 'Week 3', value: 9800 },
  { name: 'Week 4', value: 3908 },
];

const assetData = [
  { name: 'Healthcare', value: 35, color: '#1D9E75' },
  { name: 'Education', value: 25, color: '#534AB7' },
  { name: 'Environment', value: 25, color: '#D85A30' },
  { name: 'Infrastructure', value: 15, color: '#6366f1' },
];

const missions = [
  {
    title: "NATIONAL FLOOD RESPONSE",
    distance: "2.4 km",
    category: "EMERGENCY",
    match: 98,
    status: "CRITICAL",
    color: "bg-red-500"
  },
  {
    title: "DIGITAL LITERACY DRIVE",
    distance: "4.1 km",
    category: "EDUCATION",
    match: 92,
    status: "HIGH",
    color: "bg-yellow-500"
  },
  {
    title: "URBAN REFORESTATION",
    distance: "1.2 km",
    category: "ENVIRONMENT",
    match: 85,
    status: "NORMAL",
    color: "bg-green-500"
  }
];

const liveUpdates = [
  { icon: "🏥", title: "Crisis: Odisha - Responders mobilized", time: "2m ago" },
  { icon: "✓", title: "Verified: ₹2,400 disbursed to volunteers", time: "15m ago" },
  { icon: "📊", title: "Update: Aadhaar V2 Integration online", time: "1h ago" },
  { icon: "🎯", title: "Impact: 1M verified missions completed", time: "2h ago" }
];

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!mounted || !user) return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
    </div>
  );

  const handleLogout = async () => {
    // Will be connected to auth context
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">SAHAYAM SEWA</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
              248 ACTIVE MISSIONS
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6 p-8">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="space-y-2">
            <SidebarNav href="#" label="National Hub" icon="🏢" active />
            <SidebarNav href="#" label="Missions" icon="🎯" />
            <SidebarNav href="#" label="Digital Wallet" icon="💳" />
            <SidebarNav href="#" label="Reward Store" icon="🎁" />
            <SidebarNav href="#" label="Civic AI" icon="🤖" />
            <SidebarNav href="#" label="Leaderboard" icon="🏆" />
            <SidebarNav href="#" label="Availability" icon="📅" />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-4 space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="bg-purple-600 text-white uppercase text-xs font-bold">🥇 Platinum Volunteer</Badge>
                  <div className="flex items-center gap-1 text-red-500 font-bold text-xs uppercase">
                    <Flame className="w-4 h-4" /> 5 Day Streak
                  </div>
                </div>
                
                <h1 className="text-4xl font-black text-white">
                  RISE FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">INDIA.</span>
                </h1>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  National Intelligence is matching your <span className="font-bold text-white">Civic</span> profile with high-priority tasks in your district.
                </p>

                <div className="flex gap-3">
                  <Button className="bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100">
                    ANALYZE MISSIONS
                  </Button>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <AlertCircle className="w-4 h-4 mr-2" /> EMERGENCY OPS
                  </Button>
                </div>
              </div>

              {/* Score Card */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">National Seva Score</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">1,200</span>
                      <span className="text-xs text-slate-500">POINTS</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Standing</p>
                    <p className="text-2xl font-black text-white">#04 <span className="text-xs text-slate-500">Nationally</span></p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
                    <span>Gold Tier Progress</span>
                    <span className="text-purple-400">300 Pts to Ambassador</span>
                  </div>
                  <Progress value={80} className="h-1.5 bg-slate-700" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-700 text-center">
                  <div>
                    <p className="text-xl font-bold text-white">12</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase">Missions</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">45</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase">Hours</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">4.2k</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase">Impacts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={Wallet} label="Wallet" value="₹2,500" color="text-emerald-400" />
            <StatCard icon={MapPin} label="Radar" value="14 Tasks" color="text-blue-400" />
            <StatCard icon={MessageSquare} label="Civic AI" value="ACTIVE" color="text-indigo-400" />
            <StatCard icon={Trophy} label="Top 1%" value="Ranking" color="text-amber-400" />
          </div>

          {/* Intelligence Grid */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Intelligence Grid</h2>
              <Button variant="ghost" size="sm" className="text-slate-400 text-xs font-bold uppercase">View All →</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {missions.map((mission, idx) => (
                <MissionCard key={idx} {...mission} />
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-wider">Impact Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={impactData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-wider">Asset Utilization</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={assetData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {assetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Live Feed and Emotional Legacy */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-wider">🔴 Live System Feed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {liveUpdates.map((update, idx) => (
                  <div key={idx} className="flex gap-3 pb-3 border-b border-slate-800 last:border-b-0">
                    <span className="text-lg">{update.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-300">{update.title}</p>
                      <p className="text-[11px] text-slate-500">{update.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black text-white">💜 EMOTIONAL LEGACY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-black text-white">Your efforts reached <span className="text-purple-300">1,200+ citizens</span> this month.</p>
                </div>
                <Button className="w-full bg-white text-purple-900 font-bold rounded-lg hover:bg-slate-100">
                  <Download className="w-4 h-4 mr-2" /> EXPORT IMPACT DOSSIER
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({ href, label, icon, active }: any) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      active 
        ? 'bg-purple-600 text-white font-bold' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}>
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition">
      <CardContent className="pt-4 text-center space-y-2">
        <Icon className={`w-6 h-6 mx-auto ${color}`} />
        <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
        <p className={`text-lg font-black ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function MissionCard({ title, distance, category, match, status, color }: any) {
  return (
    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition overflow-hidden">
      <CardContent className="pt-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-[11px] font-black ${color.replace('bg-', 'text-')} uppercase mb-1`}>{status}</p>
            <p className="text-xs font-bold text-white">{title}</p>
          </div>
          <span className="text-xs font-bold text-slate-400">{distance}</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 uppercase font-bold">{category}</span>
            <span className="font-bold text-slate-300">{match}% Match</span>
          </div>
          <Progress value={match} className="h-1.5 bg-slate-800" />
        </div>

        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg h-8 uppercase">
          ENLIST NOW
        </Button>
      </CardContent>
    </Card>
  );
}
