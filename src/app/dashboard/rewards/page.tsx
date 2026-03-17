
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { 
  Gift, 
  Trophy, 
  Star, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  Heart, 
  Coffee, 
  Ticket,
  Lock,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const rewards = [
  {
    id: 1,
    title: "Eco-Friendly Kit",
    category: "Physical",
    points: 1200,
    desc: "A set of bamboo cutlery, a reusable bottle, and organic cotton bags.",
    icon: Heart,
    color: "text-green-600 bg-green-50",
    available: true
  },
  {
    id: 2,
    title: "Premium Skillshare Sub",
    category: "Digital",
    points: 800,
    desc: "3 months of unlimited access to thousands of creative classes.",
    icon: Zap,
    color: "text-blue-600 bg-blue-50",
    available: true
  },
  {
    id: 3,
    title: "Community Hero Badge",
    category: "Status",
    points: 500,
    desc: "A unique digital badge for your profile and social media.",
    icon: Trophy,
    color: "text-amber-600 bg-amber-50",
    available: true
  },
  {
    id: 4,
    title: "Local Cafe Voucher",
    category: "Voucher",
    points: 300,
    desc: "Enjoy a free coffee and pastry at any partner cafe in the city.",
    icon: Coffee,
    color: "text-orange-600 bg-orange-50",
    available: true
  },
  {
    id: 5,
    title: "Exclusive Webinar Access",
    category: "Digital",
    points: 2000,
    desc: "Join a private session with national civic leaders and policymakers.",
    icon: Ticket,
    color: "text-purple-600 bg-purple-50",
    available: false,
    lockMessage: "Unlocked at Platinum Rank"
  }
];

export default function RewardsPage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const userPoints = user?.walletBalance || 0;

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (!user) return;
    if (userPoints < reward.points) {
      toast({
        title: "Insufficient Balance",
        description: "Complete more missions to earn Seva Points.",
        variant: "destructive"
      });
      return;
    }

    updateProfile({
      walletBalance: userPoints - reward.points
    });

    toast({
      title: "Redemption Successful",
      description: `Your points have been debited for: ${reward.title}. Digital rewards will be sent to your inbox.`,
    });
  };

  if (!mounted) return null;

  const filteredRewards = rewards.filter(r => 
    activeTab === "all" || r.category.toLowerCase() === activeTab
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Reward Store</h1>
          <p className="text-base text-slate-500 font-medium">Redeem your hard-earned Seva points for exclusive perks and impact kits.</p>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Star className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your Balance</p>
            <p className="text-3xl font-bold tracking-tight">{userPoints.toLocaleString()} <span className="text-sm font-bold text-blue-400">Pts</span></p>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4 w-full">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Milestone Progress</h3>
                <p className="text-sm text-slate-500">Keep impacting to reach Platinum Rewards!</p>
              </div>
              <Badge className="bg-blue-100 text-blue-600 border-none font-bold px-4 py-1 rounded-full text-[10px] uppercase">
                82% to next tier
              </Badge>
            </div>
            <Progress value={82} className="h-3 bg-slate-100" />
          </div>
          <div className="hidden md:flex gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Redeemed</p>
              <p className="text-xl font-bold text-slate-900">04</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center min-w-[120px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available</p>
              <p className="text-xl font-bold text-blue-600">12</p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-slate-100 p-1 rounded-xl h-12">
            <TabsTrigger value="all" className="rounded-lg px-6 font-bold text-sm">All Rewards</TabsTrigger>
            <TabsTrigger value="digital" className="rounded-lg px-6 font-bold text-sm">Digital</TabsTrigger>
            <TabsTrigger value="physical" className="rounded-lg px-6 font-bold text-sm">Physical</TabsTrigger>
            <TabsTrigger value="voucher" className="rounded-lg px-6 font-bold text-sm">Vouchers</TabsTrigger>
          </TabsList>
          <div className="hidden lg:flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-blue-500" /> Curated for your profile
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <Card 
              key={reward.id} 
              className={cn(
                "border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group flex flex-col bg-white",
                !reward.available && "opacity-75"
              )}
            >
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-4 rounded-xl transition-transform group-hover:scale-110", reward.color)}>
                    <reward.icon className="w-6 h-6" />
                  </div>
                  {!reward.available ? (
                    <Badge variant="outline" className="border-slate-200 bg-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-blue-100 bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {reward.category}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {reward.title}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
                  {reward.desc}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 pt-2 flex-1">
                {!reward.available && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-slate-400" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{reward.lockMessage}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Required</p>
                    <p className={cn(
                      "text-xl font-bold",
                      userPoints >= reward.points ? "text-blue-600" : "text-slate-400"
                    )}>
                      {reward.points} Pts
                    </p>
                  </div>
                  {userPoints >= reward.points && reward.available && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => handleRedeem(reward)}
                  className={cn(
                    "w-full h-12 font-bold rounded-xl text-sm shadow-xl active:scale-95 transition-all",
                    userPoints >= reward.points && reward.available
                      ? "bg-slate-900 hover:bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  )}
                  disabled={userPoints < reward.points || !reward.available}
                >
                  {userPoints >= reward.points ? "Redeem Now" : "Earn More Points"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Tabs>

      <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">Support Local Communities</h3>
            <p className="text-blue-100 font-medium leading-relaxed">
              Every point you spend helps us fund more community missions. Redemptions power the entire SevaConnect ecosystem.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Verified NGO Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Sustainable Impact</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end opacity-20">
            <ShoppingBag className="w-48 h-48 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
