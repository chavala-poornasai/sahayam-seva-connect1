
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Database, Network, ShieldCheck, Zap, Server } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">System Architecture</h1>
        <p className="text-muted-foreground">Technical overview of the Multi-Modal AI Clinical Decision Support System.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              HealthSphere AI is designed as a comprehensive healthcare platform that integrates multiple AI models for early disease risk prediction. 
              The system processes three primary types of diagnostic inputs: structured clinical data, medical imaging, and natural language symptoms.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ArchitectureCard 
              icon={BrainCircuit}
              title="Predictive Engine"
              description="Scikit-Learn based models using Random Forest and SVM for numerical clinical analysis."
            />
            <ArchitectureCard 
              icon={Network}
              title="Vision Pipeline"
              description="Deep Learning CNN (MobileNetV2) for automated pneumonia detection in Chest X-rays."
            />
            <ArchitectureCard 
              icon={Zap}
              title="LLM Assistant"
              description="Advanced natural language processing for patient symptom guidance and specialist suggestions."
            />
            <ArchitectureCard 
              icon={Database}
              title="Multi-Modal Fusion"
              description="Consolidated data processing for a unified patient health risk overview."
            />
          </div>
        </div>

        <Card className="border-none shadow-md bg-muted/20 relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Backend & Modeling</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Scikit-Learn', 'TensorFlow', 'Keras', 'Genkit', 'FastAPI'].map(t => (
                  <span key={t} className="px-3 py-1 bg-white border rounded-full text-xs font-semibold shadow-sm">{t}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Frontend & Interface</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Lucide'].map(t => (
                  <span key={t} className="px-3 py-1 bg-white border rounded-full text-xs font-semibold shadow-sm">{t}</span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-3">
                <h4 className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Compliance & Safety
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our system prioritizes clinical accuracy and data privacy. All ML models are validated against benchmark datasets including the Cleveland Heart Disease and NIH Chest X-ray collections.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Processing Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkflowStep 
            number="01" 
            title="Data Acquisition" 
            desc="Structured clinical parameters, X-ray imagery, and text-based symptoms are securely collected."
          />
          <WorkflowStep 
            number="02" 
            title="AI Inference" 
            desc="Parallel processing through specialized modules (Random Forest, CNN, and LLMs)."
          />
          <WorkflowStep 
            number="03" 
            title="Decision Support" 
            desc="Consolidation of findings into actionable clinical recommendations and specialist referrals."
          />
        </div>
      </section>
    </div>
  );
}

function ArchitectureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="border-none shadow-sm hover:translate-y-[-4px] transition-transform">
      <CardHeader className="p-5">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function WorkflowStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm space-y-4">
      <span className="text-4xl font-black text-primary/10 block leading-none">{number}</span>
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
