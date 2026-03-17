
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Smartphone,
  Info,
  Save,
  Loader2,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    city: "",
    district: "",
    state: "",
    skills: ""
  });

  useEffect(() => {
    setMounted(true);
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
        alternatePhone: user.alternatePhone || "",
        city: user.city || "",
        district: user.district || "",
        state: user.state || "",
        skills: user.skills?.join(", ") || ""
      });
    }
  }, [user]);

  if (!mounted || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const skillsArray = formData.skills
      .split(",")
      .map(s => s.trim())
      .filter(s => s !== "");

    updateProfile({
      ...formData,
      skills: skillsArray
    });
    
    toast({
      title: "Identity Synchronized",
      description: "Your national profile and skill inventory have been updated.",
    });
    setIsSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-5xl mx-auto space-y-8 pb-20"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">National Identity Profile</h1>
        <p className="text-base text-slate-500 font-medium">Verify and update your institutional credentials for the Sahayam network.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 border-none shadow-sm bg-white rounded-3xl overflow-hidden h-fit">
          <div className="bg-[#0f172a] p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#534AB7] to-[#43399b] flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-6 border-2 border-white/10">
              {formData.fullName.charAt(0).toUpperCase() || "U"}
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight truncate w-full px-4">
              {formData.fullName || user.username}
            </h3>
            <Badge className="mt-4 bg-[#534AB7] text-white border-none font-bold text-[10px] uppercase tracking-widest px-4 py-1">
              {user.role} Identity
            </Badge>
          </div>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Email</span>
                <span className="text-sm font-bold text-slate-700 truncate">{user.email}</span>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Seva Score</span>
                <span className="font-bold text-[#534AB7] text-xl">{user.sevaScore.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl p-4">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-[#534AB7]" />
                Primary Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-xs font-bold uppercase text-slate-400">Full Legal Name</Label>
                <Input 
                  id="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange}
                  placeholder="Ex: Rajesh Kumar" 
                  className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-base shadow-sm" 
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl p-4">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#1D9E75]" />
                Communication Grid
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-xs font-bold uppercase text-slate-400">Primary Number</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="+91 00000 00000" 
                    className="h-12 rounded-xl bg-slate-50 border-none pl-11 font-bold text-base" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="alternatePhone" className="text-xs font-bold uppercase text-slate-400">Alternate Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  <Input 
                    id="alternatePhone" 
                    value={formData.alternatePhone} 
                    onChange={handleChange}
                    placeholder="+91 00000 00000" 
                    className="h-12 rounded-xl bg-slate-50 border-none pl-11 font-bold text-base" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl p-4">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-500" />
                Professional Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="space-y-3">
                <Label htmlFor="skills" className="text-xs font-bold uppercase text-slate-400">Civic Competencies</Label>
                <Input 
                  id="skills" 
                  value={formData.skills} 
                  onChange={handleChange}
                  placeholder="Ex: Logistics, First Aid (Comma separated)" 
                  className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-base" 
                />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                  Separate multiple skills with commas for AI optimization.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl p-4">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#D85A30]" />
                Residential Blocks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="city" className="text-xs font-bold uppercase text-slate-400">Address Block I (City)</Label>
                <div className="relative">
                  <Globe className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  <Input 
                    id="city" 
                    value={formData.city} 
                    onChange={handleChange}
                    placeholder="Enter City" 
                    className="h-12 rounded-xl bg-slate-50 border-none pl-11 font-bold text-base" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="district" className="text-xs font-bold uppercase text-slate-400">District</Label>
                  <Input 
                    id="district" 
                    value={formData.district} 
                    onChange={handleChange}
                    placeholder="Enter District" 
                    className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-base" 
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="state" className="text-xs font-bold uppercase text-slate-400">State</Label>
                  <Input 
                    id="state" 
                    value={formData.state} 
                    onChange={handleChange}
                    placeholder="Enter State" 
                    className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-base" 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button type="submit" disabled={isSaving} className="w-full h-14 bg-[#0f172a] text-white font-bold rounded-xl text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Save className="w-5 h-5 mr-3" />}
                Synchronize Identity
              </Button>
            </CardFooter>
          </Card>

          <div className="flex items-center gap-4 p-6 rounded-2xl bg-[#534AB7]/5 border border-[#534AB7]/10 text-[#534AB7]">
            <Info className="w-6 h-6 shrink-0" />
            <p className="text-xs font-bold leading-relaxed uppercase tracking-widest italic">
              Verification Notice: Credential updates are pushed to the National Registry. Profile integrity is maintained via institutional biometric sync.
            </p>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
