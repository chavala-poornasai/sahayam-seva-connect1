"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useHealth } from "@/context/health-context";
import { Upload, ImageIcon, Search, CheckCircle2, AlertCircle, FileText, Activity, Loader2 } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeMedicalImage, MedicalImageAnalysisOutput } from "@/ai/flows/medical-image-analysis-flow";

type AnalysisType = "xray" | "prescription";

export default function ImageAnalysisPage() {
  const { toast } = useToast();
  const { addImageAnalysis } = useHealth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<AnalysisType>("xray");
  const [result, setResult] = useState<MedicalImageAnalysisOutput | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setAnalyzing(true);
    try {
      const analysisResult = await analyzeMedicalImage({
        imageUri: selectedImage,
        type: analysisType
      });

      setResult(analysisResult);
      addImageAnalysis({
        type: analysisType === 'xray' ? "Chest X-ray" : "Doctor's Prescription",
        detection: analysisResult.detection,
        findings: analysisResult.findings,
        recommendations: analysisResult.recommendations,
        imageUrl: selectedImage
      });

      toast({
        title: "Analysis Complete",
        description: `Your ${analysisType === 'xray' ? 'X-ray' : 'prescription'} has been successfully processed.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to process the clinical document. Please ensure the image is clear.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Clinical Document Analysis</h1>
        <p className="text-muted-foreground">Neural-based diagnostic assistance for medical imagery and prescriptions.</p>
      </div>

      <Tabs 
        defaultValue="xray" 
        onValueChange={(v) => {
          setAnalysisType(v as AnalysisType);
          setSelectedImage(null);
          setResult(null);
        }} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="xray" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Chest X-Ray
          </TabsTrigger>
          <TabsTrigger value="prescription" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Prescription
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {analysisType === 'xray' ? <Activity className="w-5 h-5 text-blue-600" /> : <FileText className="w-5 h-5 text-teal-600" />}
                {analysisType === 'xray' ? 'Radiology Scan' : 'Clinical Prescription'}
              </CardTitle>
              <CardDescription>
                {analysisType === 'xray' 
                  ? 'Neural network analysis for pneumonia and pulmonary health.' 
                  : 'AI handwriting recognition and medication verification.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-xl m-6 bg-muted/20 min-h-[400px]">
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              
              {selectedImage ? (
                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
                  <Image 
                    src={selectedImage} 
                    alt="Medical document" 
                    width={500}
                    height={400}
                    className="object-contain rounded-lg shadow-lg border-4 border-white"
                  />
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-6 right-6"
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Provide your {analysisType === 'xray' ? 'X-ray' : 'Prescription'}</h4>
                  <p className="text-xs text-muted-foreground mb-6 max-w-[250px] mx-auto">
                    Secure clinical processing. Upload your diagnostic files for AI analysis.
                  </p>
                  <Button onClick={handleTriggerUpload} className="font-bold">Browse Your Files</Button>
                </div>
              )}
            </CardContent>
            <div className="p-6 border-t bg-muted/10">
              <Button 
                className="w-full h-12 font-bold" 
                disabled={!selectedImage || analyzing}
                onClick={handleAnalyze}
              >
                {analyzing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> 
                    {analysisType === 'xray' ? 'Radiology Analysis...' : 'Extracting Prescription Data...'}
                  </div>
                ) : `Analyze ${analysisType === 'xray' ? 'X-Ray Scan' : 'Prescription Document'}`}
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  AI Clinical Logic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisType === 'xray' ? (
                  <>
                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <h4 className="font-bold text-sm text-blue-900">Vision Model (Gemini Pro Vision)</h4>
                      <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                        Detects pulmonary markers including pneumonia, effusions, and cardiomegaly with clinical-grade accuracy.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                      <h4 className="font-bold text-sm text-teal-900">Multimodal Medication Logic</h4>
                      <p className="text-xs text-teal-700 mt-1 leading-relaxed">
                        High-fidelity handwriting recognition specialized for medical terminology and pharmacopeia.
                      </p>
                    </div>
                  </>
                )}
                <div className="p-4 rounded-xl bg-muted/30 border">
                  <h4 className="font-bold text-sm">HIPAA Compliant Processing</h4>
                  <p className="text-xs text-muted-foreground mt-1">Your data is processed in a secure environment and not used for training.</p>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="border-none shadow-md bg-white border-l-4 border-l-primary animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                    Neural Analysis Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Clinical Status</span>
                    <p className="text-lg font-bold text-slate-900">{result.detection}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold flex items-center gap-2">
                      <Search className="w-4 h-4 text-primary" /> Observations
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed bg-muted/30 p-4 rounded-xl border border-muted">
                      {result.findings}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Recommendations
                    </h5>
                    <p className="text-sm italic text-green-800 bg-green-50 p-4 rounded-xl border border-green-100">
                      {result.recommendations}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!result && !analyzing && selectedImage && (
              <div className="flex items-center gap-4 p-6 border rounded-2xl bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="w-8 h-8 shrink-0 text-amber-600" />
                <p className="text-sm font-bold">
                  File loaded. Please click the "Analyze" button below the preview to start the clinical AI assessment.
                </p>
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
