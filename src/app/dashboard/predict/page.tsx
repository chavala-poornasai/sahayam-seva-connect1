
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useHealth, RiskLevel } from "@/context/health-context";
import { Activity, Heart, Droplets, FlaskConical, Microscope } from "lucide-react";

export default function PredictionDashboard() {
  const { toast } = useToast();
  const { addPrediction } = useHealth();
  const [loading, setLoading] = useState(false);

  const handlePredict = async (disease: string) => {
    setLoading(true);
    // Simulate API call to ML model
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults: Record<string, { risk: RiskLevel, findings: string, recommendations: string }> = {
      heart: {
        risk: 'Moderate',
        findings: 'Elevated cholesterol levels and resting blood pressure observed.',
        recommendations: 'Consult a Cardiologist for a detailed stress test and dietary adjustment.'
      },
      diabetes: {
        risk: 'Low',
        findings: 'Glucose levels are within normal range for fasting state.',
        recommendations: 'Maintain current physical activity levels and balanced carbohydrate intake.'
      },
      kidney: {
        risk: 'Low',
        findings: 'Serum creatinine and GFR levels indicate healthy renal function.',
        recommendations: 'Maintain adequate hydration and regular checkups.'
      },
      breast: {
        risk: 'Low',
        findings: 'Diagnostic features show no immediate signs of malignancy.',
        recommendations: 'Continue routine monthly self-exams and annual mammograms.'
      }
    };

    const res = mockResults[disease.toLowerCase()] || mockResults.heart;
    
    addPrediction({
      name: disease,
      riskLevel: res.risk,
      findings: res.findings,
      recommendations: res.recommendations
    });

    toast({
      title: `${disease} Prediction Complete`,
      description: `Result: ${res.risk} Risk. Check your summary for details.`,
    });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Disease Risk Prediction</h1>
        <p className="text-muted-foreground">Input clinical parameters for machine learning-based risk assessment.</p>
      </div>

      <Tabs defaultValue="heart" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto gap-2 p-1">
          <TabsTrigger value="heart" className="flex items-center gap-2 py-3">
            <Heart className="w-4 h-4" /> Heart
          </TabsTrigger>
          <TabsTrigger value="diabetes" className="flex items-center gap-2 py-3">
            <Droplets className="w-4 h-4" /> Diabetes
          </TabsTrigger>
          <TabsTrigger value="kidney" className="flex items-center gap-2 py-3">
            <FlaskConical className="w-4 h-4" /> Kidney
          </TabsTrigger>
          <TabsTrigger value="breast" className="flex items-center gap-2 py-3">
            <Microscope className="w-4 h-4" /> Breast Cancer
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="heart">
            <PredictionForm 
              title="Heart Disease Risk Prediction" 
              description="Random Forest model trained on Cleveland clinic health data."
              onPredict={() => handlePredict('Heart Disease')}
              loading={loading}
              fields={[
                { label: 'Age', type: 'number', placeholder: 'Years' },
                { label: 'Cholesterol', type: 'number', placeholder: 'mg/dl' },
                { label: 'Max Heart Rate', type: 'number', placeholder: 'bpm' },
                { label: 'Resting Blood Pressure', type: 'number', placeholder: 'mm Hg' },
              ]}
            />
          </TabsContent>

          <TabsContent value="diabetes">
            <PredictionForm 
              title="Diabetes Risk Assessment" 
              description="Clinical health parameters based on Pima Indians Diabetes dataset."
              onPredict={() => handlePredict('Diabetes')}
              loading={loading}
              fields={[
                { label: 'Pregnancies', type: 'number', placeholder: 'Count' },
                { label: 'Glucose', type: 'number', placeholder: 'mg/dl' },
                { label: 'Blood Pressure', type: 'number', placeholder: 'mm Hg' },
                { label: 'BMI', type: 'number', placeholder: 'kg/m²' },
              ]}
            />
          </TabsContent>

          <TabsContent value="kidney">
            <PredictionForm 
              title="Chronic Kidney Disease Assessment" 
              description="Analysis of patient laboratory values and urine reports."
              onPredict={() => handlePredict('Kidney Disease')}
              loading={loading}
              fields={[
                { label: 'Specific Gravity', type: 'number', placeholder: 'Density' },
                { label: 'Albumin', type: 'number', placeholder: 'Level' },
                { label: 'Hemoglobin', type: 'number', placeholder: 'g/dL' },
                { label: 'Serum Creatinine', type: 'number', placeholder: 'mg/dL' },
              ]}
            />
          </TabsContent>

          <TabsContent value="breast">
            <PredictionForm 
              title="Breast Cancer Prediction" 
              description="Diagnostic feature analysis using Support Vector Machines."
              onPredict={() => handlePredict('Breast Cancer')}
              loading={loading}
              fields={[
                { label: 'Radius Mean', type: 'number', placeholder: 'Mean' },
                { label: 'Texture Mean', type: 'number', placeholder: 'Mean' },
                { label: 'Perimeter Mean', type: 'number', placeholder: 'Mean' },
                { label: 'Smoothness Mean', type: 'number', placeholder: 'Mean' },
              ]}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface Field {
  label: string;
  type: string;
  placeholder: string;
}

function PredictionForm({ 
  title, 
  description, 
  onPredict, 
  loading,
  fields 
}: { 
  title: string; 
  description: string; 
  onPredict: () => void; 
  loading: boolean;
  fields: Field[];
}) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.label} className="space-y-2">
              <Label htmlFor={field.label}>{field.label}</Label>
              <Input id={field.label} type={field.type} placeholder={field.placeholder} />
            </div>
          ))}
        </div>
        <Button onClick={onPredict} disabled={loading} className="w-full md:w-auto px-8">
          {loading ? (
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin" /> Analyzing...
            </div>
          ) : 'Run Analysis'}
        </Button>
      </CardContent>
    </Card>
  );
}
