
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  UserCheck, 
  Lock, 
  AlertCircle,
  Activity,
  History
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const auditLogs = [
  { id: "LOG-4821", actor: "Admin Gateway", action: "National Crisis Triggered", target: "Odisha Cluster", status: "VERIFIED", date: "2024-05-20 14:32:10" },
  { id: "LOG-4822", actor: "NGO Service", action: "Mission Provisioned", target: "Literacy Drive #44", status: "PENDING AUDIT", date: "2024-05-20 12:15:45" },
  { id: "LOG-4823", actor: "Financial Engine", action: "Bulk Disbursement", target: "420 Volunteers", status: "SETTLED", date: "2024-05-20 11:05:00" },
  { id: "LOG-4824", actor: "Identity Service", action: "Aadhaar Handshake", target: "New NGO: SevaTrust", status: "VERIFIED", date: "2024-05-19 23:50:12" },
  { id: "LOG-4825", actor: "Security Core", action: "Behavioral Anomaly Block", target: "User: ****291", status: "BLOCKED", date: "2024-05-19 18:42:33" },
];

export default function AuditRegistryPage() {
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExportFull = () => {
    toast({
      title: "Encrypted Ledger Exporting",
      description: "Generating a national-scale audit report with cryptographic verification hashes.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Advanced Search Active",
      description: "Operational logs filtered by sector and ministry priority.",
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
          <div className="flex items-center gap-2 text-[#534AB7] font-black uppercase tracking-[0.2em] text-[10px]">
            <Lock className="w-3 h-3" /> Ministry Level Security
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0f172a] dark:text-white">National Audit Registry</h1>
          <p className="text-slate-500 font-medium">Immutable operational ledger for all Sahayam Sewa activities.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleExportFull}
            className="h-14 px-8 rounded-2xl border-none shadow-sm bg-white dark:bg-slate-900 font-bold dark:text-white"
          >
            <Download className="w-5 h-5 mr-2" /> EXPORT FULL LEDGER
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 border-none shadow-3xl rounded-[3rem] bg-[#0f172a] text-white p-10 space-y-10">
          <div className="space-y-4">
            <h3 className="text-xl font-black">System Integrity</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Uptime</span>
                <span className="text-xs font-black text-[#1D9E75]">99.999%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verified Nodes</span>
                <span className="text-xs font-black">14,204</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Security</span>
                <span className="text-xs font-black uppercase text-[#D85A30]">Active Threats: 0</span>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-[#1D9E75]" />
              <p className="text-[11px] font-bold text-slate-400 italic">"Registry secured by end-to-end cryptographic hashing protocols."</p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm rounded-[3rem] bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="p-10 border-b dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              <CardTitle className="text-2xl font-black dark:text-white flex items-center gap-4">
                <History className="w-7 h-7 text-[#534AB7]" />
                Event Logs
              </CardTitle>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-2.5 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search Logs..." className="pl-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border-none dark:text-white" />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleFilter}
                  className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800"
                >
                  <Filter className="w-4 h-4 text-slate-400" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="px-10 font-black uppercase text-[10px] tracking-widest text-slate-400">Log ID</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Actor</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Operational Action</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                  <TableHead className="px-10 text-right font-black uppercase text-[10px] tracking-widest text-slate-400">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id} className="border-slate-50 dark:border-slate-800 group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <TableCell className="px-10 font-bold text-slate-400 group-hover:text-[#534AB7] transition-colors">{log.id}</TableCell>
                    <TableCell className="font-black text-slate-900 dark:text-slate-100">{log.actor}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{log.action}</span>
                        <span className="text-[10px] text-slate-400 font-medium">Target: {log.target}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "font-black text-[9px] uppercase tracking-widest border-none px-3 py-1",
                        log.status === 'VERIFIED' ? "bg-green-100 text-green-600" : 
                        log.status === 'BLOCKED' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                      )}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-10 text-right font-mono text-[10px] font-bold text-slate-400">{log.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
