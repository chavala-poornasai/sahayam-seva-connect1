"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHealth } from "@/context/health-context";
import { 
  FileText, 
  Download, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Loader2, 
  Eye,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ReportPage() {
  const { predictions, imageAnalyses, interactions } = useHealth();
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Report Generated",
      description: "HealthSphere_Patient_Report.pdf has been saved to your downloads.",
    });
    setGenerating(false);
  };

  const hasData = (predictions && predictions.length > 0) || (imageAnalyses && imageAnalyses.length > 0) || (interactions && interactions.length > 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Patient Health Report</h1>
        <p className="text-muted-foreground">Generate a comprehensive summary of your clinical analysis results.</p>
      </div>

      {!hasData ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No Records Found</h3>
            <p className="text-muted-foreground">Complete at least one assessment to generate a health report.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <Card className="border-none shadow-sm overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="bg-muted/10 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>HealthSphere AI Summary</CardTitle>
                    <CardDescription>Patient Report #HS-2024-001</CardDescription>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date Generated</p>
                  <p className="text-sm font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Clinical Assessment
                  </h3>
                  <div className="space-y-3">
                    {predictions.map(p => (
                      <div key={p.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                        <span className="text-sm font-medium">{p.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          p.riskLevel === 'Low' ? 'text-green-600' : 'text-amber-600'
                        }`}>{p.riskLevel} Risk</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Imaging Results
                  </h3>
                  <div className="space-y-3">
                    {imageAnalyses.map(a => (
                      <div key={a.id} className="p-3 rounded-lg bg-muted/30">
                        <p className="text-sm font-medium">{a.type}</p>
                        <p className="text-[10px] text-muted-foreground">{a.detection}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Final Recommendations</h3>
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <ul className="space-y-2">
                    {predictions.map(p => (
                      <li key={p.id} className="text-sm flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span className="text-muted-foreground font-medium text-primary inline">[{p.name}]: </span>
                        <span>{p.recommendations}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="px-8 h-12">
                  <Eye className="w-4 h-4 mr-2" /> Preview Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 border-b bg-muted/10">
                  <DialogTitle>Full Patient Report Preview</DialogTitle>
                  <DialogDescription>
                    Official clinical documentation generated by HealthSphere AI
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 p-8 bg-zinc-50/50">
                  <div className="bg-white shadow-2xl mx-auto max-w-[210mm] min-h-[297mm] p-[20mm] border font-sans text-zinc-900">
                    <div className="flex justify-between items-start border-b-2 border-primary pb-8 mb-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                          <ShieldCheck className="w-8 h-8" />
                          HEALTHSPHERE AI
                        </div>
                        <p className="text-xs text-zinc-500 font-medium">Multi-Modal Clinical Decision Support</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-bold">Report: #HS-2024-001</p>
                        <p className="text-xs text-zinc-500">Date: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <section className="space-y-4">
                        <h3 className="text-xs font-bold bg-primary/5 py-2 px-3 border-l-4 border-primary flex items-center gap-2">
                          <Activity className="w-4 h-4" /> I. CLINICAL RISK ASSESSMENTS
                        </h3>
                        {predictions.map(p => (
                          <div key={p.id} className="pl-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-sm">{p.name}</h4>
                              <span className="text-xs font-bold">{p.riskLevel} Risk</span>
                            </div>
                            <p className="text-xs text-zinc-600">Findings: {p.findings}</p>
                            <Separator />
                          </div>
                        ))}
                      </section>
                      <section className="space-y-4 text-center mt-12 pt-8 border-t">
                        <p className="text-[10px] text-zinc-400 max-w-lg mx-auto">
                          DISCLAIMER: This report is generated by an artificial intelligence system and is for informational purposes only. Consult a licensed medical professional for formal diagnosis.
                        </p>
                      </section>
                    </div>
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-white flex justify-end gap-2">
                  <Button onClick={handleDownload} disabled={generating} size="sm">
                    {generating ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Compiling...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="w-3 h-3" /> Save PDF
                      </div>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleDownload} disabled={generating} className="px-8 h-12">
              {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
              Download PDF Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}