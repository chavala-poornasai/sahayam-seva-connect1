
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Filter, 
  Target, 
  Star, 
  ShieldCheck, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Activity,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const volunteerFleet = [
  { id: 1, name: "Dr. Arvind Swami", role: "Medical Supervisor", missions: 48, rating: 4.9, status: "Active", points: 8500, avatar: "AS", skills: ["Healthcare", "Emergency"] },
  { id: 2, name: "Pooja Reddy", role: "Logistics Lead", missions: 32, rating: 4.7, status: "On-field", points: 5200, avatar: "PR", skills: ["Supply Chain", "Disaster"] },
  { id: 3, name: "Michael Chen", role: "Technical Support", missions: 15, rating: 4.8, status: "Available", points: 2800, avatar: "MC", skills: ["IT Support", "Communication"] },
  { id: 4, name: "Sarah Khan", role: "Community Educator", missions: 22, rating: 4.6, status: "Active", points: 3400, avatar: "SK", skills: ["Teaching", "Social"] },
];

export default function VolunteerFleetPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyzePerformance = () => {
    toast({
      title: "Fleet Analysis Initiated",
      description: "Compiling real-time engagement data across all national clusters.",
    });
  };

  const handleFilters = () => {
    toast({
      title: "Filter Registry",
      description: "Advanced criteria mapping enabled. You can now filter by Seva Rating and Cluster ID.",
    });
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-[#0f172a] dark:text-white">Volunteer Fleet Command</h1>
          <p className="text-slate-500 font-medium">Manage and monitor your specialized workforce across national clusters.</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-4 rounded-3xl bg-[#534AB7]/10 border-none flex items-center gap-4">
            <div className="w-10 h-10 bg-[#534AB7] rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#534AB7] uppercase tracking-widest">Fleet Capacity</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">4.2k <span className="text-xs text-slate-400">Verified</span></p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* STATS OVERVIEW */}
        <div className="xl:col-span-1 space-y-8">
          <Card className="border-none shadow-sm rounded-[3rem] bg-white dark:bg-slate-900 p-8 space-y-8">
            <h3 className="text-lg font-black dark:text-white flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#534AB7]" />
              Fleet Intelligence
            </h3>
            <div className="space-y-6">
              <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Engagement Rate</span>
                  <span className="text-[#1D9E75]">+12%</span>
                </div>
                <p className="text-3xl font-black dark:text-white">94.8%</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Average Impact</span>
                  <span className="text-[#534AB7]">Gold</span>
                </div>
                <p className="text-3xl font-black dark:text-white">4.2k Pts</p>
              </div>
            </div>
            <Button 
              onClick={handleAnalyzePerformance}
              className="w-full h-16 bg-[#0f172a] dark:bg-[#534AB7] text-white font-black rounded-[1.5rem] shadow-xl"
            >
              ANALYZE PERFORMANCE
            </Button>
          </Card>

          <Card className="border-none shadow-3xl rounded-[3rem] bg-gradient-to-br from-[#D85A30] to-[#b44120] text-white p-8 overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <Award className="w-10 h-10 text-white/50 mb-4" />
              <h3 className="text-xl font-black">Fleet Reward Hub</h3>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Unlock specialized institutional grants for your top-performing clusters.
              </p>
              <Button variant="link" className="p-0 h-auto text-white font-black text-xs uppercase tracking-widest mt-4">
                View Rewards <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Users className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 -rotate-12" />
          </Card>
        </div>

        {/* VOLUNTEER LIST */}
        <div className="xl:col-span-3 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-4 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search fleet by name, skill, or ID..." 
                className="pl-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-sm text-base font-medium dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={handleFilters}
              className="h-14 px-8 rounded-2xl border-none shadow-sm bg-white dark:bg-slate-900 font-bold dark:text-white"
            >
              <Filter className="w-4 h-4 mr-2" /> ADVANCED FILTERS
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {volunteerFleet.map((v) => (
              <Card key={v.id} className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center p-8 gap-10">
                  <div className="flex items-center gap-6 flex-1">
                    <Avatar className="h-20 w-20 rounded-[1.75rem] border-4 border-slate-50 dark:border-slate-800 shadow-xl">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-[#534AB7] text-white font-black text-xl">{v.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-[#534AB7] transition-colors">{v.name}</h4>
                        <Badge className={cn(
                          "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1",
                          v.status === 'On-field' && "bg-green-100 text-green-600",
                          v.status === 'Active' && "bg-blue-100 text-blue-600"
                        )}>
                          {v.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{v.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-center flex-1">
                    {v.skills.map(s => (
                      <span key={s} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-10 text-center flex-1">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Missions</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{v.missions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seva Rating</p>
                      <p className="text-lg font-black text-amber-500 flex items-center justify-center gap-1">
                        {v.rating} <Star className="w-4 h-4 fill-amber-500" />
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Impact</p>
                      <p className="text-lg font-black text-[#534AB7]">{v.points.toLocaleString()} Pts</p>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800">
                    <MoreVertical className="w-5 h-5 text-slate-400" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
