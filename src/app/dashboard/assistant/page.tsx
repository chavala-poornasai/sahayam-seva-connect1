"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User, Loader2, Zap, Target, Info } from "lucide-react";
import { civicAiAssistantChat, CivicAiAssistantOutput } from "@/ai/flows/civic-ai-assistant-flow";
import { useAuth } from "@/context/auth-context";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  data?: CivicAiAssistantOutput;
}

const assistantTranslations: Record<string, any> = {
  English: {
    title: "Civic AI Hub",
    subtitle: "Intelligent guidance for community leaders and volunteers.",
    welcome: "Namaste! I'm your Multilingual Civic AI Assistant. I can help you find volunteer missions, explain how to boost your Seva Score, or guide you on creating community impact. What's on your mind?",
    placeholder: "Ask about missions, your score, or community needs...",
    loading: "Analyzing community query...",
    guidance: "Civic Guidance",
    impactAreas: "Recommended Impact Areas",
    version: "Sahayam Sewa Civic Intelligence Beta"
  },
  // ... other translations remain identical
};

export default function AssistantPage() {
  const { toast } = useToast();
  const { language } = useAuth();
  const [mounted, setMounted] = useState(false);
  const t = assistantTranslations[language] || assistantTranslations["English"];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setMessages([{ role: 'assistant', content: t.welcome }]);
    }
  }, [language, t.welcome, mounted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setInput("");
    setLoading(true);

    try {
      const response = await civicAiAssistantChat({ 
        query: userQuery,
        language: language
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.explanation,
        data: response
      }]);

    } catch (error) {
      toast({
        title: "Assistant Error",
        description: "Failed to connect to the Civic Intelligence network. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">{t.title}</h1>
        <p className="text-lg text-slate-500 font-medium">{t.subtitle || "National Multilingual AI Protocol"}</p>
      </div>

      <Card className="flex-1 flex flex-col border-none shadow-2xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden">
        <CardHeader className="border-b bg-[#0f172a] text-white p-8">
          <CardTitle className="flex items-center gap-4 text-2xl">
            <div className="bg-[#534AB7] p-3 rounded-2xl shadow-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            Sahayam Sewa Intelligence
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium text-base mt-1">Verified Regional Node: {language}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 relative bg-slate-50/50 dark:bg-slate-950/50">
          <ScrollArea className="h-full px-8 py-10">
            <div className="space-y-10">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-6 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className={`mt-1 h-12 w-12 border-2 ${m.role === 'user' ? 'border-[#534AB7]' : 'border-slate-900 dark:border-white/10'}`}>
                    <AvatarFallback className={m.role === 'user' ? 'bg-[#534AB7]/10' : 'bg-slate-900 text-white dark:bg-slate-800'}>
                      {m.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-6 rounded-[2.5rem] shadow-md ${
                      m.role === 'user' 
                        ? 'bg-[#534AB7] text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
                    }`}>
                      <p className="text-base font-medium leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    </div>
                    
                    {m.data && (
                      <div className="mt-8 space-y-6 w-full animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="p-8 rounded-[2rem] border border-[#534AB7]/10 bg-[#534AB7]/5 space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#534AB7] flex items-center gap-3">
                            <Target className="w-4 h-4" /> {t.guidance}
                          </h5>
                          <p className="text-base font-black text-slate-800 dark:text-slate-100 leading-relaxed">{m.data.guidance}</p>
                        </div>
                        
                        <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{t.impactAreas}</h5>
                          <div className="flex flex-wrap gap-3">
                            {m.data.suggestedMissionTypes.map(type => (
                              <span key={type} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-xs font-black shadow-sm border border-slate-200 dark:border-slate-600">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-400 flex items-start gap-4 border border-dashed border-slate-300 dark:border-slate-600">
                          <Info className="w-5 h-5 mt-0.5 shrink-0 opacity-50" />
                          <p className="text-[10px] leading-relaxed font-black uppercase tracking-widest italic">
                            {m.data.disclaimer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-6">
                  <Avatar className="mt-1 h-12 w-12 border-2 border-slate-900 dark:border-white/10">
                    <AvatarFallback className="bg-slate-900 text-white dark:bg-slate-800"><Bot className="w-6 h-6" /></AvatarFallback>
                  </Avatar>
                  <div className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none flex items-center gap-4 shadow-md">
                    <Loader2 className="w-5 h-5 animate-spin text-[#534AB7]" />
                    <span className="text-base font-bold text-slate-500 italic">{t.loading}</span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <div className="p-8 border-t bg-white dark:bg-slate-900">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-4"
          >
            <Input 
              placeholder={t.placeholder} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-[#534AB7]/20 px-8 text-base font-medium dark:text-white"
            />
            <Button type="submit" disabled={loading || !input.trim()} className="h-16 w-16 rounded-2xl bg-[#0f172a] dark:bg-[#534AB7] hover:bg-slate-800 dark:hover:bg-[#43399b] shadow-2xl transition-all active:scale-95 text-white">
              <Send className="w-6 h-6" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-[0.3em] mt-6">
            {t.version}
          </p>
        </div>
      </Card>
    </div>
  );
}