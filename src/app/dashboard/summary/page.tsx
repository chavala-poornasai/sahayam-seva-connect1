
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHealth, DiseasePrediction } from "@/context/health-context";
import { 
  Heart, 
  Activity, 
  ImageIcon, 
  MessageSquare, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Stethoscope,
  Clock
} from "lucide-react";
import { personalizedHealthSummary } from "@/ai/flows/personalized-health-summary-flow";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SummaryPage() {
  const { predictions, imageAnalyses, interactions } = useHealth();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<DiseasePrediction | null>(null);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const input = {
        diseasePredictions: predictions.map(p => ({
          name: p.name,
          riskLevel: p.riskLevel,
          findings: p.findings,
          recommendations: p.recommendations
        })),
        imageAnalysisResults: imageAnalyses.map(a => ({
          type: a.type,
          detection: a.detection,
          findings: a.findings,
          recommendations: a.recommendations
        })),
        aiAssistantSummary: interactions.length > 0 ? interactions[interactions.length - 1].explanation : ""
      };

      const result = await personalizedHealthSummary(input);
      setAiSummary(result.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasData = predictions.length > 0 || imageAnalyses.length > 0 || interactions.length > 0;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Personalized Health Summary</h1>
          <p className="text-muted-foreground">Consolidated overview of all diagnostic assessments and AI guidance.</p>
        </div>
        <Button 
          onClick={generateSummary} 
          disabled={!hasData || loading} 
          className="bg-primary hover:bg-primary/90"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Generate AI Insight
        </Button>
      </div>

      {!hasData ? (
        <Card className="border-dashed border-2 py-12">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-bold">No data available yet</h3>
              <p className="text-muted-foreground mt-2">Start by completing a disease risk prediction, medical image analysis, or chatting with the AI assistant.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard/predict">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {aiSummary && (
              <Card className="border-none shadow-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" />
                    AI Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" /> 
                Risk Assessments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predictions.map((p) => (
                  <Dialog key={p.id}>
                    <DialogTrigger asChild>
                      <Card 
                        className="border-none shadow-sm hover:bg-muted/30 transition-colors cursor-pointer group"
                        onClick={() => setSelectedPrediction(p)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{p.name}</CardTitle>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              p.riskLevel === 'Low' ? 'bg-green-100 text-green-700' : 
                              p.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {p.riskLevel} Risk
                            </span>
                          </div>
                          <CardDescription>{new Date(p.timestamp).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-xs text-muted-foreground line-clamp-2">{p.findings}</p>
                          <div className="flex items-center text-xs font-semibold text-primary group-hover:underline">
                            Read full analysis <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                          <Stethoscope className="w-6 h-6 text-primary" />
                          {p.name} Analysis Details
                        </DialogTitle>
                        <DialogDescription>
                          Clinical parameters assessed on {new Date(p.timestamp).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className={`p-4 rounded-xl border-l-4 ${
                          p.riskLevel === 'Low' ? 'bg-green-50 border-green-500 text-green-800' : 
                          p.riskLevel === 'Moderate' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-red-50 border-red-500 text-red-800'
                        }`}>
                          <h4 className="font-bold uppercase text-[10px] tracking-widest mb-1">Calculated Risk Level</h4>
                          <p className="text-lg font-bold">{p.riskLevel} Concern</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Clinical Findings
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                            {p.findings}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-bold flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            Recommendations
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed bg-primary/5 p-4 rounded-lg border border-primary/10">
                            {p.recommendations}
                          </p>
                        </div>

                        <div className="pt-4 flex items-center gap-2 text-[10px] text-muted-foreground italic">
                          <Clock className="w-3 h-3" />
                          Last assessment update: {new Date(p.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>

            {imageAnalyses.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-500" /> 
                  Imaging Insights
                </h3>
                <div className="space-y-4">
                  {imageAnalyses.map((a) => (
                    <Card key={a.id} className="border-none shadow-sm flex flex-col md:flex-row overflow-hidden">
                      <div className="bg-muted w-full md:w-32 flex items-center justify-center p-4">
                        <ImageIcon className="w-8 h-8 text-muted-foreground opacity-50" />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">{a.type} Analysis</h4>
                          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {a.detection}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{a.findings}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm h-fit sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Recent AI Guidance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {interactions.slice(-2).map((i) => (
                  <div key={i.id} className="space-y-3 border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm font-semibold italic">"{i.query}"</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground line-clamp-3">{i.explanation}</p>
                      <div className="flex flex-wrap gap-1">
                        {i.specialists.map(s => (
                          <span key={s} className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {interactions.length === 0 && <p className="text-sm text-muted-foreground">No chat history available.</p>}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/assistant">View All Interactions</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-amber-50 border border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-amber-800">
                  <AlertCircle className="w-4 h-4" /> Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  The information provided by HealthSphere AI is based on machine learning models and automated algorithms. This is for educational and early screening purposes ONLY and does not constitute a formal medical diagnosis. Always consult with a qualified healthcare professional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
