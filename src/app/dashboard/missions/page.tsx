"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  MapPin, 
  Target, 
  Zap, 
  ArrowRight,
  Heart,
  BookOpen,
  Leaf,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const missions = [
  {
    id: 1,
    title: "Flood Relief - Hyderabad Cluster",
    category: "Emergency",
    urgency: "High",
    distance: "2.4 km",
    points: 500,
    match: 98,
    desc: "Food distribution and shelter management in flood-affected zones.",
    icon: Zap,
    color: "text-red-600 bg-red-50",
    tags: ["On-field", "Critical"]
  },
  {
    id: 2,
    title: "Literacy Drive - Secunderabad",
    category: "Education",
    urgency: "Medium",
    distance: "4.1 km",
    points: 200,
    match: 92,
    desc: "Teaching basic literacy to underprivileged children at community centers.",
    icon: BookOpen,
    color: "text-blue-600 bg-blue-50",
    tags: ["Teaching", "Weekly"]
  },
  {
    id: 3,
    title: "Urban Tree Plantation",
    category: "Environment",
    urgency: "Low",
    distance: "1.2 km",
    points: 150,
    match: 85,
    desc: "Expanding city green cover. Planting 500 saplings this weekend.",
    icon: Leaf,
    color: "text-green-600 bg-green-50",
    tags: ["Outdoors", "Weekend"]
  },
  {
    id: 4,
    title: "Blood Donation Camp Organizer",
    category: "Health",
    urgency: "High",
    distance: "3.5 km",
    points: 300,
    match: 90,
    desc: "Managing donor registrations and logistics for mega blood drive.",
    icon: Heart,
    color: "text-rose-600 bg-rose-50",
    tags: ["Healthcare", "Urgent"]
  }
];

export default function MissionsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleJoinMission = (missionTitle: string) => {
    toast({
      title: "Mission Enlisted",
      description: `Synchronized ${missionTitle} with your national calendar.`,
    });
  };

  if (!mounted) return null;

  const filteredMissions = missions.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeTab === "all" || m.category.toLowerCase() === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Mission Discovery</h1>
        <p className="text-xs text-slate-500 font-medium">Find verified volunteer tasks matching your profile.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search grid..." 
            className="pl-10 h-10 rounded-xl bg-white border-none shadow-sm text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-slate-200/50 p-1 rounded-xl h-10">
            <TabsTrigger value="all" className="rounded-lg px-4 text-[10px] font-bold">All</TabsTrigger>
            <TabsTrigger value="emergency" className="rounded-lg px-4 text-[10px] font-bold">Emergency</TabsTrigger>
            <TabsTrigger value="education" className="rounded-lg px-4 text-[10px] font-bold">Education</TabsTrigger>
            <TabsTrigger value="health" className="rounded-lg px-4 text-[10px] font-bold">Health</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((m) => (
          <Card key={m.id} className="border-none shadow-md rounded-2xl overflow-hidden group flex flex-col bg-white">
            <CardHeader className="p-5 pb-3">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl group-hover:scale-105 transition-transform", m.color)}>
                  <m.icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <Badge className={cn(
                    "text-[8px] uppercase tracking-widest border-none font-bold",
                    m.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                  )}>
                    {m.urgency}
                  </Badge>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 flex items-center justify-end">
                    <MapPin className="w-3 h-3 text-red-500 mr-1" /> {m.distance}
                  </p>
                </div>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {m.title}
              </CardTitle>
              <CardDescription className="text-[11px] text-slate-500 leading-snug line-clamp-2 mt-1">
                {m.desc}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-5 pt-2 flex-1">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {m.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Reward</p>
                  <p className="text-sm font-black text-primary">+{m.points} Pts</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">AI Match</p>
                  <p className="text-sm font-black text-emerald-600">{m.match}%</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-5 pt-0">
              <Button 
                onClick={() => handleJoinMission(m.title)}
                className="w-full h-10 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-all"
              >
                JOIN MISSION <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
