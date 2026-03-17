
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { 
  CalendarDays, 
  ShieldCheck, 
  Info, 
  Save, 
  Loader2, 
  CheckCircle2, 
  X, 
  Clock,
  CalendarCheck,
  Sparkles,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isSameDay, startOfToday, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function AvailabilityPage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSkills, setIsSavingSkills] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  
  const [dates, setDates] = useState<Date[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setMounted(true);
    if (user?.availableDates) {
      setDates(user.availableDates.map(d => parseISO(d)));
    }
    // Load skills from user profile
    if (user?.user_metadata?.skills && Array.isArray(user.user_metadata.skills)) {
      setSkills(user.user_metadata.skills);
    }
  }, [user]); 

  const sortedDates = useMemo(() => {
    return [...dates].sort((a, b) => a.getTime() - b.getTime());
  }, [dates]);

  const nextAvailableDate = useMemo(() => {
    const today = startOfToday();
    const future = sortedDates.filter(d => d.getTime() >= today.getTime());
    return future.length > 0 ? format(future[0], "MMMM dd, yyyy") : "None set";
  }, [sortedDates]);

  if (!mounted || !user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const dateStrings = dates.map(d => d.toISOString());
    updateProfile({ availableDates: dateStrings });
    
    toast({
      title: "Availability Synchronized",
      description: "Your operational schedule has been locked into the national mobilization grid.",
    });
    setIsSaving(false);
  };

  const handleRemoveDate = (dateToRemove: Date) => {
    setDates(prev => prev.filter(d => !isSameDay(d, dateToRemove)));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveSkills = async () => {
    setIsSavingSkills(true);
    try {
      const response = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          skills: skills,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update skills");
      }

      toast({
        title: "Skills Updated",
        description: "Your expertise profile has been synchronized with the national skills registry.",
      });
      setShowSkillModal(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not save your skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingSkills(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-6xl mx-auto space-y-8 pb-20"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-[#534AB7] font-black uppercase tracking-widest text-[10px] mb-1">
          <CalendarCheck className="w-4 h-4" /> Mission Readiness Protocol
        </div>
        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">Availability Grid</h1>
        <p className="text-base text-slate-500 font-medium">Mark your available days in emerald green to be automatically matched with high-priority civic missions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-7 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardHeader className="p-8 border-b bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#534AB7] rounded-xl text-white shadow-lg">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold uppercase tracking-tight">Scheduling Terminal</CardTitle>
                <CardDescription className="text-xs font-bold text-slate-400">Click dates to toggle your availability state.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 flex justify-center">
            <Calendar
              mode="multiple"
              selected={dates}
              onSelect={(selectedDates) => setDates(selectedDates || [])}
              disabled={{ before: startOfToday() }}
              className="rounded-2xl border-none p-0 scale-110"
              classNames={{
                day_selected: "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-500 focus:text-white rounded-xl ring-2 ring-emerald-400 ring-offset-2 shadow-lg transition-all",
                day_today: "bg-slate-100 text-[#534AB7] font-black rounded-xl",
                day: "h-12 w-12 text-sm font-bold transition-all hover:bg-slate-100 rounded-xl",
              }}
            />
          </CardContent>
          <CardFooter className="p-8 border-t bg-slate-50/50">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="w-full h-14 bg-[#0f172a] hover:bg-slate-800 text-white font-bold rounded-xl text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Save className="w-5 h-5 mr-3" />}
              Synchronize Available Days
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none shadow-2xl bg-[#0f172a] text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Active Ready State</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Days Marked</span>
                  <p className="text-4xl font-bold text-emerald-400 animate-in fade-in zoom-in duration-300" key={dates.length}>
                    {dates.length}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next Entry</span>
                  <p className="text-xs font-bold text-white truncate leading-relaxed" key={nextAvailableDate}>
                    {nextAvailableDate}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
                  Verified NGOs use these emerald-locked dates to assign tasks across the national grid.
                </p>
              </div>
            </div>
            <ShieldCheck className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 -rotate-12" />
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-3xl flex flex-col h-[400px] overflow-hidden">
            <CardHeader className="p-6 pb-4 border-b">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center justify-between">
                <span>Your Fixed Availability</span>
                <Badge variant="outline" className="bg-slate-100 font-bold text-[10px] px-3 py-1 rounded-lg text-[#534AB7] border-none">
                  {dates.length} DAYS
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {sortedDates.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-40"
                  >
                    <Clock className="w-10 h-10 text-slate-300" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No dates marked yet</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {sortedDates.map((date) => (
                      <motion.div
                        key={date.toISOString()}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg" />
                          <span className="text-sm font-bold text-slate-700">
                            {format(date, "MMMM dd, yyyy")}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleRemoveDate(date)}
                          className="p-2 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 bg-white border border-slate-100 shadow-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-[#534AB7]/5 border border-[#534AB7]/10 text-[#534AB7] space-y-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Protocol Notice</h4>
            </div>
            <p className="text-[10px] font-medium leading-relaxed uppercase tracking-wider italic opacity-70">
              Registry synchronization ensures your profile is active in the high-priority national matching engine.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Update Section */}
      <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#D85A30] rounded-xl text-white shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold uppercase tracking-tight">Skills Profile</CardTitle>
                <CardDescription className="text-xs font-bold text-slate-400">Update your expertise to match better with relevant missions.</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-slate-100 font-bold text-[10px] px-3 py-1 rounded-lg text-[#D85A30] border-none">
              {skills.length} SKILLS
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Current Skills Display */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-700">Your Current Skills</h4>
              {skills.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 text-center">
                  <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">No skills added yet</p>
                  <p className="text-[10px] text-slate-400 mt-1">Click update skills to add your expertise</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D85A30]/10 to-[#D85A30]/5 border border-[#D85A30]/20 rounded-full group hover:border-[#D85A30]/50 transition-all"
                    >
                      <span className="text-sm font-bold text-[#D85A30]">{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="p-1 rounded-full hover:bg-red-100 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-8 border-t bg-slate-50/50">
          <Button 
            onClick={() => setShowSkillModal(true)}
            className="w-full h-14 bg-[#D85A30] hover:bg-[#c74a1f] text-white font-bold rounded-xl text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95"
          >
            <Sparkles className="w-5 h-5 mr-3" />
            Update Skills
          </Button>
        </CardFooter>
      </Card>

      {/* Skill Update Modal */}
      <AnimatePresence>
        {showSkillModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSkillModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 border-b bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#D85A30] rounded-lg text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Add Skills</h3>
                    <p className="text-xs text-slate-500 font-medium">Type a skill and click Add</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                {/* Input Field */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Add a Skill</label>
                  <div className="flex gap-3">
                    <Input
                      placeholder="e.g., First Aid, Teaching, Logistics..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      className="h-12 rounded-xl border-slate-200 focus:ring-[#D85A30]/20"
                    />
                    <Button
                      onClick={handleAddSkill}
                      className="h-12 px-6 bg-[#D85A30] hover:bg-[#c74a1f] text-white font-bold rounded-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Skills List in Modal */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Your Skills ({skills.length})</label>
                  <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 min-h-24">
                    {skills.length === 0 ? (
                      <div className="w-full flex items-center justify-center text-slate-400 text-xs font-bold">
                        No skills yet. Add one above!
                      </div>
                    ) : (
                      skills.map((skill) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#D85A30] text-white rounded-full text-xs font-bold group"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 p-0.5 hover:bg-white/20 rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Helper Text */}
                <div className="p-4 rounded-2xl bg-[#D85A30]/5 border border-[#D85A30]/10 text-[#D85A30] space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest">💡 Skill Matching Tips</p>
                  <p className="text-[10px] font-medium leading-relaxed">Add skills like First Aid, Teaching, Manual Labor, Event Management, etc. to be matched with relevant missions.</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t bg-slate-50/50 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSkillModal(false)}
                  className="flex-1 h-12 rounded-xl font-bold transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveSkills}
                  disabled={isSavingSkills}
                  className="flex-1 h-12 bg-[#D85A30] hover:bg-[#c74a1f] text-white font-bold rounded-xl transition-all"
                >
                  {isSavingSkills ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Skills
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
