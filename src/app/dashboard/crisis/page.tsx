
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertCircle, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Users, 
  Radio,
  Target,
  ChevronRight,
  TrendingUp,
  Activity,
  Flame,
  Droplets,
  Wind,
  Globe
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const activeCrisis = [
  { id: 1, title: "Severe Flood Warning", location: "Coastal Odisha Cluster", urgency: "CRITICAL", volunteers: "1,240 / 2,000", progress: 62, icon: Droplets, color: "text-blue-600 bg-blue-50" },
  { id: 2, title: "Regional Heatwave Alert", location: "Central Rajasthan District", urgency: "HIGH", volunteers: "850 / 1,000", progress: 85, icon: Flame, color: "text-orange-600 bg-orange-50" },
  { id: 3, title: "Strategic Resource Shortage", location: "Northeast Logistics Hub", urgency: "NORMAL", volunteers: "45 / 100", progress: 45, icon: Zap, color: "text-[#534AB7] bg-[#534AB7]/5" },
];

export default function CrisisCenterPage() {
  const [mounted, setMounted] = useState(false);
  const [alertMode, setAlertMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMobilize = () => {
    toast({
      title: "Mobilization Commenced",
      description: "Direct alerts dispatched to 400 high-reputation volunteers in the Odisha cluster.",
    });
  };

  const handleViewCommand = (title: string) => {
    toast({
      title: "Command Interface Restricted",
      description: `Opening real-time diagnostic feed for ${title}. Biometric tunnel active.`,
    });
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-12 pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
            <Radio className="w-4 h-4 animate-pulse" /> Emergency Broadcast Active
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0f172a] dark:text-white">Crisis Intelligence Center</h1>
          <p className="text-slate-500 font-medium">Real-time command and mobilization for national-level emergencies.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => {
              setAlertMode(!alertMode);
              toast({
                title: alertMode ? "Crisis Mode Standby" : "NATIONAL CRISIS ACTIVE",
                variant: alertMode ? "default" : "destructive",
                description: alertMode ? "System reverting to standard operational awareness." : "National protocols enabled. Resource tracking at 100%.",
              });
            }}
            className={cn(
              "h-14 px-10 rounded-2xl font-black tracking-widest shadow-2xl transition-all hover:-translate-y-1",
              alertMode ? "bg-red-600 hover:bg-red-700 text-white shadow-red-500/40" : "bg-[#0f172a] text-white"
            )}
          >
            <AlertCircle className="w-6 h-6 mr-2" /> {alertMode ? "CANCEL CRISIS MODE" : "ACTIVATE CRISIS MODE"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* GEOSPATIAL RADAR (MOCK) */}
        <Card className="xl:col-span-2 border-none shadow-3xl rounded-[3.5rem] bg-[#0f172a] overflow-hidden relative min-h-[500px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 grayscale mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-transparent to-[#534AB7]/20" />
          
          <div className="relative z-10 p-12 space-y-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Badge className="bg-red-600/20 text-red-500 border-none font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest">
                  Live Geospatial Mapping
                </Badge>
                <h3 className="text-4xl font-black text-white">National Impact Radar</h3>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active</p>
                  <p className="text-xl font-black text-white">03</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Nodes</p>
                  <p className="text-xl font-black text-white">12.4k</p>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-sm font-bold text-white uppercase tracking-widest">Critical Alert: Odisha</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Flash flooding detected. AI engine suggesting immediate 400-volunteer cluster mobilization.</p>
              </div>
              <Button 
                onClick={handleMobilize}
                className="h-14 px-8 bg-white text-[#0f172a] hover:bg-slate-100 font-black rounded-2xl shadow-2xl"
              >
                MOBILIZE CLUSTER
              </Button>
            </div>
          </div>
        </Card>

        {/* RECENT CRISIS LIST */}
        <div className="space-y-8">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex justify-between">
            Active Responses <span>{activeCrisis.length} Identified</span>
          </h3>
          <div className="space-y-6">
            {activeCrisis.map((c) => (
              <Card key={c.id} className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl transition-all duration-500 group">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110", c.color)}>
                      <c.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={cn(
                      "border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm",
                      c.urgency === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-600'
                    )}>
                      {c.urgency}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black text-[#0f172a] dark:text-white group-hover:text-[#534AB7] transition-colors leading-tight mb-2">
                    {c.title}
                  </CardTitle>
                  <CardDescription className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" /> {c.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Mobilization Progress</span>
                      <span className="text-slate-900 dark:text-white">{c.volunteers}</span>
                    </div>
                    <Progress value={c.progress} className="h-3 bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleViewCommand(c.title)}
                    className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest text-[#534AB7] hover:bg-[#534AB7]/5"
                  >
                    VIEW COMMAND CENTER <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
