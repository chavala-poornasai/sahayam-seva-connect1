
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  History,
  Smartphone,
  Download,
  Fingerprint
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const transactionData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 2100 },
  { name: 'Mar', amount: 1800 },
  { name: 'Apr', amount: 3200 },
  { name: 'May', amount: 2500 },
  { name: 'Jun', amount: 4500 },
];

const categoryData = [
  { name: 'Seva Rewards', value: 65, color: '#534AB7' },
  { name: 'Direct Grant', value: 20, color: '#1D9E75' },
  { name: 'Referrals', value: 15, color: '#D85A30' },
];

const recentTransactions = [
  { id: 1, title: "Mission Completion", type: "credit", amount: 500, date: "2h ago", status: "Verified" },
  { id: 2, title: "Cafe Redemption", type: "debit", amount: 150, date: "Yesterday", status: "Success" },
  { id: 3, title: "Government Grant", type: "credit", amount: 1200, date: "3d ago", status: "Settled" },
];

export default function WalletPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransfer = () => {
    toast({ title: "Transfer Gateway", description: "Biometric verification initiated for Aadhaar bank transfer." });
  };

  const handleUPI = () => {
    toast({ title: "UPI Scanner", description: "Scanning for merchant nodes..." });
  };

  const handleManageIdentity = () => {
    toast({ title: "Identity Hub", description: "Synchronizing Aadhaar-linked digital credentials..." });
  };

  if (!mounted) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Wallet Gateway</h1>
          <p className="text-xs text-slate-500 font-medium">Manage verified Seva earnings and institutional grants.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleTransfer} className="h-9 px-4 bg-[#534AB7] text-white font-bold rounded-xl text-xs">
            <ArrowUpRight className="w-3.5 h-3.5 mr-2" /> TRANSFER
          </Button>
          <Button variant="outline" onClick={handleUPI} className="h-9 px-4 rounded-xl font-bold text-xs border-slate-200">
            <Smartphone className="w-3.5 h-3.5 mr-2" /> UPI PAY
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1 border-none shadow-xl bg-gradient-to-br from-[#534AB7] to-[#2e267d] p-5 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between gap-10">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/50">National Seva Card</p>
                <h3 className="text-lg font-black italic tracking-tighter">SAHAYAM PLATINUM</h3>
              </div>
              <Zap className="w-5 h-5 text-white/20" />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[8px] font-black text-white/40 uppercase mb-1">Grid Balance</p>
                <p className="text-4xl font-black tracking-tight">₹{(user?.walletBalance || 2500).toLocaleString()}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-[8px] font-black text-white/40 uppercase">Card Identity</p>
                  <p className="font-mono text-[10px] font-black">**** 4829</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-white/40 uppercase">Status</p>
                  <p className="text-[9px] font-black uppercase text-emerald-400">Verified Node</p>
                </div>
              </div>
            </div>
          </div>
          <ShieldCheck className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 -rotate-12" />
        </Card>

        <Card className="lg:col-span-2 p-5 rounded-3xl shadow-sm border-none bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#534AB7]" />
              Earnings Velocity
            </h3>
            <Badge variant="secondary" className="text-[8px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">LIVE GRID</Badge>
          </div>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#534AB7" strokeWidth={3} fill="#534AB7" fillOpacity={0.05} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 p-5 rounded-3xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <History className="w-4 h-4 text-[#534AB7]" />
              Recent Node Activity
            </h3>
            <Button variant="link" size="sm" onClick={() => toast({ title: "Exporting Ledger", description: "CSV file is being generated." })} className="text-[9px] font-black uppercase tracking-widest text-[#534AB7] hover:no-underline">
              <Download className="w-3 h-3 mr-1" /> EXPORT LEDGER
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    tx.type === 'credit' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{tx.title}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{tx.date} • {tx.status}</p>
                  </div>
                </div>
                <span className={cn("text-xs font-black", tx.type === 'credit' ? "text-emerald-600" : "text-slate-900 dark:text-slate-100")}>
                  {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 rounded-3xl shadow-sm bg-white dark:bg-slate-900 flex flex-col items-center">
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 w-full">Impact Distribution</h3>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={8} dataKey="value">
                  {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4 w-full px-2">
            {categoryData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="font-bold text-slate-500 uppercase tracking-tighter">{s.name}</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="p-6 rounded-3xl bg-[#0f172a] text-white flex flex-col md:flex-row items-center gap-6 overflow-hidden relative shadow-2xl border border-white/5">
        <div className="relative z-10 space-y-2 flex-1">
          <h3 className="text-base font-black uppercase italic tracking-tighter">Secure Identity Protocol</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-lg font-medium">
            Your wallet is integrated with National UPI Gateways and protected by Aadhaar biometric verification.
          </p>
        </div>
        <Button 
          size="sm"
          onClick={handleManageIdentity}
          className="h-10 px-6 rounded-xl bg-[#534AB7] text-white hover:bg-[#43399b] font-black relative z-10 transition-all text-[10px] uppercase tracking-widest shadow-lg"
        >
          <Fingerprint className="w-3.5 h-3.5 mr-2" /> IDENTITY HUB
        </Button>
        <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 -rotate-12" />
      </div>
    </motion.div>
  );
}
