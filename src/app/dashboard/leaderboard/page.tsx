
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Trophy, Medal, Target, Users, Search, MapPin, ArrowUpRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const leaderboardData = {
  district: [
    { rank: 1, name: "Sarah Johnson", points: 4850, missions: 42, impact: "Education", avatar: "SJ" },
    { rank: 2, name: "Michael Ravi", points: 4200, missions: 38, impact: "Environment", avatar: "MR" },
    { rank: 3, name: "David Kumar", points: 3900, missions: 35, impact: "Healthcare", avatar: "DK" },
    { rank: 4, name: "Priya Singh", points: 3750, missions: 31, impact: "Social", avatar: "PS" },
    { rank: 5, name: "Ananya Sharma", points: 3600, missions: 29, impact: "Education", avatar: "AS" },
    { rank: 6, name: "Vikram Reddy", points: 3450, missions: 27, impact: "Disaster Relief", avatar: "VR" },
    { rank: 7, name: "Rahul Verma", points: 3300, missions: 25, impact: "Environment", avatar: "RV" },
  ],
  state: [
    { rank: 1, name: "Amitabh P.", points: 12500, missions: 112, impact: "Multiple", avatar: "AP" },
    { rank: 2, name: "Sunita K.", points: 11800, missions: 98, impact: "Healthcare", avatar: "SK" },
    { rank: 3, name: "Sarah Johnson", points: 4850, missions: 42, impact: "Education", avatar: "SJ" },
  ],
  national: [
    { rank: 1, name: "Seva Foundation", points: 145000, missions: 1200, impact: "National", avatar: "SF" },
    { rank: 482, name: "Sarah Johnson", points: 4850, missions: 42, impact: "Education", avatar: "SJ" },
  ]
};

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("district");

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">District Rankings</h1>
          <p className="text-slate-500 font-medium">Celebrate the heroes of our community. Your rank is based on verified Seva points.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Your Current Rank</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">#12 <span className="text-xs text-slate-400">in District</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
            <Tabs defaultValue="district" className="w-full" onValueChange={setActiveTab}>
              <CardHeader className="p-8 pb-0">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl h-12 w-fit border-none">
                    <TabsTrigger value="district" className="rounded-xl px-6 font-bold">District</TabsTrigger>
                    <TabsTrigger value="state" className="rounded-xl px-6 font-bold">State</TabsTrigger>
                    <TabsTrigger value="national" className="rounded-xl px-6 font-bold">National</TabsTrigger>
                  </TabsList>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-10 h-10 rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="w-[80px] font-bold uppercase tracking-widest text-[10px]">Rank</TableHead>
                      <TableHead className="font-bold uppercase tracking-widest text-[10px]">Volunteer</TableHead>
                      <TableHead className="font-bold uppercase tracking-widest text-[10px]">Primary Impact</TableHead>
                      <TableHead className="text-right font-bold uppercase tracking-widest text-[10px]">Missions</TableHead>
                      <TableHead className="text-right font-bold uppercase tracking-widest text-[10px]">Seva Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData[activeTab as keyof typeof leaderboardData]
                      .filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
                      .map((user) => (
                      <TableRow key={user.name} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800">
                        <TableCell className="font-black text-slate-900 dark:text-white">
                          {user.rank === 1 ? <Medal className="w-5 h-5 text-amber-400" /> : 
                           user.rank === 2 ? <Medal className="w-5 h-5 text-slate-400" /> : 
                           user.rank === 3 ? <Medal className="w-5 h-5 text-amber-700" /> : 
                           `#${user.rank}`}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-sm">
                              <AvatarFallback className="bg-blue-600 text-white text-[10px] font-bold">{user.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-white dark:bg-slate-800 font-bold text-[9px] uppercase tracking-tighter rounded-lg px-2 border-slate-200 dark:border-slate-700">
                            {user.impact}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-500">{user.missions}</TableCell>
                        <TableCell className="text-right">
                          <span className="font-black text-blue-600 dark:text-blue-400">{user.points.toLocaleString()}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white p-8 overflow-hidden relative">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Climbing the Ranks</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                You've completed <span className="text-white font-bold">3 missions</span> this week. Complete <span className="text-blue-400 font-bold">1 more</span> to break into the Top 10!
              </p>
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Next Target</span>
                  <span className="text-xs font-bold text-white">#10 Rahul V.</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '85%' }} />
                </div>
                <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">850 points needed</p>
              </div>
            </div>
            <Target className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5 rotate-12 pointer-events-none" />
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-slate-900 p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 dark:text-white">
              <Users className="w-5 h-5 text-blue-600" />
              Recent Movers
            </h3>
            <div className="space-y-6">
              {[
                { name: "Priya S.", change: "+4 ranks", trend: "up" },
                { name: "Vikram R.", change: "+2 ranks", trend: "up" },
                { name: "Ananya S.", change: "-1 rank", trend: "down" },
              ].map((mover, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mover.name}</span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    mover.trend === 'up' ? 'text-green-600' : 'text-slate-400'
                  )}>
                    {mover.change}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">Perks of Ranking</h3>
            <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
              Top 3 monthly volunteers receive exclusive Seva merchandise and a direct meeting with district policy makers.
            </p>
            <Link 
              href="/dashboard/rewards"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform group"
            >
              Learn More About Rewards 
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
