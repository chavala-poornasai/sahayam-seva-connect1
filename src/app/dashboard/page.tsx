
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp,
  MessageSquare,
  Zap,
  MapPin,
  Trophy,
  Flame,
  AlertCircle,
  Target,
  Loader2,
  Wallet,
  Activity,
  Building2,
  Download
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Cell,
  Pie
} from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const activityData = [
  { name: 'Mon', missions: 1 },
  { name: 'Tue', missions: 0 },
  { name: 'Wed', missions: 2 },
  { name: 'Thu', missions: 1 },
  { name: 'Fri', missions: 3 },
  { name: 'Sat', missions: 4 },
  { name: 'Sun', missions: 2 },
];

const skillData = [
  { name: 'Education', value: 40, color: '#534AB7' },
  { name: 'Health', value: 25, color: '#1D9E75' },
  { name: 'Environment', value: 20, color: '#D85A30' },
  { name: 'Logistics', value: 15, color: '#6366f1' },
];

const recommendedMissions = [
  {
    id: 1,
    title: "National Flood Response",
    distance: "2.4 km",
    urgency: "CRITICAL",
    match: 98,
    category: "Emergency"
  },
  {
    id: 2,
    title: "Digital Literacy Drive",
    distance: "4.1 km",
    urgency: "HIGH",
    match: 92,
    category: "Education"
  },
  {
    id: 3,
    title: "Urban Reforestation",
    distance: "1.2 km",
    urgency: "NORMAL",
    match: 85,
    category: "Environment"
  }
];

export default function GlobalDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  const role = user?.role || 'citizen';

  if (role === 'admin') return <AdminCommandCenter />;
  if (role === 'ngo') return <NgoImpactTerminal />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-16">
      <section className="relative rounded-3xl overflow-hidden bg-[#0f172a] p-10 shadow-2xl border border-white/5">
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge className="bg-[#534AB7] text-white px-4 py-1 rounded-full text-xs uppercase tracking-widest font-black">
                🥇 PLATINUM VOLUNTEER
              </Badge>
              <div className="flex items-center gap-2 text-[#D85A30] font-black text-xs uppercase tracking-widest">
                <Flame className="w-5 h-5 animate-pulse" /> {user?.streak || 5} DAY STREAK
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase tracking-tight">
              Rise for <span className="text-gradient-primary">India.</span>
            </h1>
            
            <p className="text-base text-slate-400 max-w-lg leading-relaxed">
              National Intelligence is matching your <span className="text-white font-bold">{user?.skills?.join(', ') || 'Civic'}</span> profile with high-priority tasks in your district.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="bg-white text-[#0f172a] hover:bg-slate-100 font-bold rounded-xl px-8 h-12 text-sm uppercase tracking-wider shadow-xl">
                <Link href="/dashboard/missions">ANALYZE MISSIONS</Link>
              </Button>
              <Button 
                onClick={() => {
                  setIsEmergencyActive(!isEmergencyActive);
                  toast({
                    title: isEmergencyActive ? "Crisis Mode Standby" : "EMERGENCY PROTOCOL ACTIVE",
                    variant: isEmergencyActive ? "default" : "destructive"
                  });
                }}
                variant="outline" 
                className={cn(
                  "h-12 px-8 rounded-xl font-bold text-sm uppercase tracking-wider border-[#D85A30]/40 text-[#D85A30] hover:bg-[#D85A30]/10",
                  isEmergencyActive && "bg-[#D85A30] text-white border-none shadow-lg shadow-red-500/20"
                )}
              >
                <AlertCircle className="w-5 h-5 mr-2" /> 
                {isEmergencyActive ? "CRISIS ACTIVE" : "EMERGENCY OPS"}
              </Button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-black text-[#534AB7] uppercase tracking-widest mb-1">National Seva Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">{(user?.sevaScore || 1200).toLocaleString()}</span>
                  <span className="text-sm text-slate-500 font-bold uppercase">Points</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Standing</p>
                <p className="text-2xl font-bold text-white">#04 <span className="text-xs text-slate-500">Nationally</span></p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                <span>Gold Tier Progress</span>
                <span className="text-[#534AB7]">300 Pts to Ambassador</span>
              </div>
              <Progress value={85} className="h-2 bg-white/5" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-center">
              <div>
                <p className="text-xl font-bold text-white">{user?.missionsCompleted || 12}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Missions</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{user?.hoursContributed || 45}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Hours</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">4.2k</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Impacts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <QuickActionButton icon={Wallet} label="Wallet" color="text-[#1D9E75] bg-[#1D9E75]/10" link="/dashboard/wallet" value={`₹${(user?.walletBalance || 2500).toLocaleString()}`} />
        <QuickActionButton icon={MapPin} label="Radar" color="text-[#534AB7] bg-[#534AB7]/10" link="/dashboard/missions" value="14 Tasks" />
        <QuickActionButton icon={MessageSquare} label="Civic AI" color="text-indigo-400 bg-indigo-400/10" link="/dashboard/assistant" value="ACTIVE" />
        <QuickActionButton icon={Trophy} label="Rank" color="text-amber-500 bg-amber-500/10" link="/dashboard/leaderboard" value="Top 1%" />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#0f172a] uppercase">Intelligence Grid</h2>
              <Button asChild variant="ghost" className="text-primary font-bold text-sm uppercase tracking-widest h-10 hover:bg-primary/5">
                <Link href="/dashboard/missions">VIEW ALL <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedMissions.map((m) => (
                <MissionIntelligenceCard key={m.id} mission={m} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl shadow-sm border-none bg-white">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Impact Velocity</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} />
                    <YAxis hide />
                    <RechartsTooltip contentStyle={{ fontSize: '12px', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="missions" stroke="#534AB7" strokeWidth={3} fill="#534AB7" fillOpacity={0.05} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-6 rounded-2xl shadow-sm border-none bg-white flex flex-col items-center">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 w-full">Asset Utilization</h3>
              <div className="h-[160px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={skillData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={8} dataKey="value">
                      {skillData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {skillData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{s.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-6 rounded-2xl bg-[#0f172a] text-white shadow-2xl border-none">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#1D9E75] rounded-full animate-pulse" />
              Live System Feed
            </h3>
            <div className="space-y-4">
              {[
                "Crisis: Odisha - Responders mobilized.",
                "Verified: ₹2,400 disbursed to volunteers.",
                "Update: Aadhaar V2 integration online.",
                "Impact: 1M verified missions completed."
              ].map((a, i) => (
                <div key={i} className="flex gap-3 text-xs border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <Activity className="w-4 h-4 text-[#534AB7] shrink-0 mt-0.5" />
                  <p className="text-slate-400 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-[#534AB7] to-[#43399b] text-white overflow-hidden relative border-none">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold tracking-tight uppercase italic">Emotional Legacy</h3>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Your efforts reached <span className="text-white font-bold">1,200+ citizens</span> this month.
              </p>
              <Button 
                onClick={() => toast({ title: "Dossier Generating", description: "Your impact PDF is being compiled." })}
                className="w-full h-11 bg-white text-[#0f172a] hover:bg-slate-50 font-bold rounded-xl text-xs uppercase tracking-widest shadow-xl"
              >
                <Download className="w-4 h-4 mr-2" /> EXPORT IMPACT DOSSIER
              </Button>
            </div>
            <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 -rotate-12" />
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function QuickActionButton({ icon: Icon, label, color, link, value }: any) {
  return (
    <Link href={link} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-50">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-lg", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <p className="text-lg font-bold text-slate-900 tracking-tight mt-1">{value}</p>
      </div>
    </Link>
  );
}

function MissionIntelligenceCard({ mission }: any) {
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();

  const handleJoin = () => {
    if (!user) return;
    updateProfile({
      missionsCompleted: (user.missionsCompleted || 0) + 1,
      sevaScore: (user.sevaScore || 0) + 100
    });
    toast({ 
      title: "Mission Enlisted", 
      description: `Successfully joined: ${mission.title}. +100 Seva Points pending.` 
    });
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-slate-50 bg-white group hover:shadow-xl transition-all">
      <div className="flex justify-between items-start">
        <Badge className="bg-[#534AB7]/10 text-[#534AB7] border-none text-[9px] font-black py-1 px-3 uppercase tracking-widest">
          {mission.category}
        </Badge>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mission.distance}</span>
      </div>
      <h4 className="text-base font-bold text-slate-900 leading-tight h-10 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">{mission.title}</h4>
      <div className="flex items-center justify-between text-xs">
        <Badge className={cn("text-[9px] border-none font-black uppercase tracking-widest px-2", mission.urgency === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white')}>
          {mission.urgency}
        </Badge>
        <span className="font-bold text-[#1D9E75]">{mission.match}% Match</span>
      </div>
      <Button 
        size="sm"
        onClick={handleJoin}
        className="w-full h-11 bg-slate-900 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest shadow-lg hover:bg-slate-800"
      >
        ENLIST NOW
      </Button>
    </Card>
  );
}

function AdminCommandCenter() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 max-w-xl mx-auto">
      <div className="p-8 bg-[#0f172a] rounded-3xl shadow-2xl">
        <ShieldCheck className="w-16 h-16 text-[#534AB7]" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">National Command</h1>
      <p className="text-base text-slate-500 leading-relaxed">Centralized oversight for policy coordination and resource auditing across the unified national grid.</p>
      <div className="flex gap-4">
        <Button asChild className="h-12 px-10 rounded-xl bg-primary font-bold shadow-2xl text-xs uppercase tracking-widest"><Link href="/dashboard/admin">ANALYTICS</Link></Button>
        <Button asChild variant="outline" className="h-12 px-10 rounded-xl font-bold text-xs uppercase tracking-widest border-slate-200"><Link href="/dashboard/audit">AUDIT LOGS</Link></Button>
      </div>
    </div>
  );
}

function NgoImpactTerminal() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 max-w-xl mx-auto">
      <div className="p-8 bg-[#D85A30] rounded-3xl shadow-2xl">
        <Building2 className="w-16 h-16 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">NGO Impact Terminal</h1>
      <p className="text-base text-slate-500 leading-relaxed">Mobilize volunteers and manage high-priority missions nationally with real-time operational oversight.</p>
      <div className="flex gap-4">
        <Button asChild className="h-12 px-10 rounded-xl bg-[#D85A30] font-bold shadow-2xl text-xs uppercase tracking-widest hover:bg-[#b44120]"><Link href="/dashboard/post">DEPLOY MISSION</Link></Button>
        <Button asChild variant="outline" className="h-12 px-10 rounded-xl font-bold border-[#D85A30] text-[#D85A30] text-xs uppercase tracking-widest hover:bg-[#D85A30]/5"><Link href="/dashboard/volunteers">FLEET COMMAND</Link></Button>
      </div>
    </div>
  );
}
