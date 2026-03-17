
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  Send, 
  Zap, 
  MapPin, 
  Target, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function PostMissionPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate National Grid Sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Mission Provisioned",
      description: "Synchronized with National Civic Grid successfully.",
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-green-200">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#0f172a]">Mission Live on Grid</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">
            Your mission is now being analyzed by the Sahayam AI matching engine. Volunteers will be alerted based on skill relevance.
          </p>
        </div>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="h-14 px-8 rounded-2xl font-bold">
          PROVISION ANOTHER MISSION
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-[#0f172a]">Mission Provisioning Hub</h1>
        <p className="text-slate-500 font-medium">Deploy high-impact volunteer tasks to the national civic network.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-3xl rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className="p-10 border-b bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#D85A30] rounded-2xl text-white shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>Mission Parameters</CardTitle>
                  <CardDescription>Enter essential details for AI skill matching.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mission Identity</Label>
                  <Input 
                    placeholder="e.g. National Literacy Drive - Hyderabad Cluster" 
                    className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold text-lg" 
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</Label>
                    <Select required>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold">
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl">
                        <SelectItem value="emergency">Emergency Response</SelectItem>
                        <SelectItem value="education">Educational Support</SelectItem>
                        <SelectItem value="health">Healthcare Services</SelectItem>
                        <SelectItem value="environment">Environmental Action</SelectItem>
                        <SelectItem value="logistics">Strategic Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Urgency Protocol</Label>
                    <Select required>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold text-red-600">
                        <SelectValue placeholder="Priority Level" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl">
                        <SelectItem value="critical">CRITICAL (Instant Mobilization)</SelectItem>
                        <SelectItem value="high">HIGH (24hr Response)</SelectItem>
                        <SelectItem value="normal">NORMAL (Standard)</SelectItem>
                        <SelectItem value="low">LOW (Planned)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operational Summary</Label>
                  <Textarea 
                    placeholder="Describe the clinical or civic objectives of this mission..." 
                    className="min-h-[150px] rounded-2xl bg-slate-50 border-none p-6 font-medium text-slate-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Geographic Node</Label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-5 h-5 w-5 text-slate-400" />
                      <Input placeholder="PIN Code or City" className="h-16 rounded-2xl bg-slate-50 border-none pl-14 font-bold" required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Impact Reward (Pts)</Label>
                    <div className="relative">
                      <Target className="absolute left-5 top-5 h-5 w-5 text-slate-400" />
                      <Input type="number" placeholder="e.g. 500" className="h-16 rounded-2xl bg-slate-50 border-none pl-14 font-bold" required />
                    </div>
                  </div>
                </div>

                <Button className="w-full h-20 bg-[#0f172a] hover:bg-slate-800 text-white font-black rounded-3xl text-lg shadow-3xl transition-all hover:-translate-y-1 active:scale-95" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Send className="w-6 h-6 mr-3" />}
                  PUBLISH TO NATIONAL GRID
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-3xl rounded-[3rem] bg-[#0f172a] text-white p-10 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#534AB7] rounded-2xl shadow-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black">AI Intelligence Layer</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                Our matching engine will automatically pair your mission with verified volunteers who possess the exact technical and civic skills required for your specific mission parameters.
              </p>
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Network Health</span>
                  <span className="text-[#1D9E75]">Optimal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#534AB7]" />
                  <span className="text-xs font-bold">2.4M Ready Volunteers</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="p-10 rounded-[3rem] bg-white shadow-xl border border-slate-50 space-y-6">
            <div className="flex items-center gap-4 text-[#D85A30]">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-black text-sm uppercase tracking-widest">Compliance Audit</h4>
            </div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed italic">
              "By publishing this mission, you acknowledge that all funding and resource allocations will be subject to National Audit standards. Sahayam Sewa ensures zero-tolerance for resource mismanagement."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
