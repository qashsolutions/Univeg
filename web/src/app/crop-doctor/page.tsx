'use client';

import { useState, useRef, useCallback } from 'react';
import { Header } from '@/components/layouts';
import { Button, Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { useCamera } from '@/lib/hooks/useCamera';
import { cn } from '@/lib/utils';
import type { DiagnosisResult } from '@/lib/api/gemini';

type Step = 'capture' | 'preview' | 'analyzing' | 'result';

export default function CropDoctorPage() {
  const [step, setStep] = useState<Step>('capture');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    videoRef,
    canvasRef,
    isStreaming,
    error: cameraError,
    startCamera,
    stopCamera,
    captureImage,
    switchCamera,
    facingMode,
  } = useCamera();

  const handleCapture = useCallback(() => {
    const image = captureImage();
    if (image) {
      setCapturedImage(image);
      stopCamera();
      setStep('preview');
    }
  }, [captureImage, stopCamera]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCapturedImage(result);
      setStep('preview');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!capturedImage) return;

    setStep('analyzing');
    setError(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: capturedImage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result: DiagnosisResult = await response.json();
      setDiagnosis(result);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setStep('preview');
    }
  }, [capturedImage]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setDiagnosis(null);
    setError(null);
    setStep('capture');
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy':
        return 'success';
      case 'low':
        return 'success';
      case 'medium':
        return 'secondary';
      case 'high':
        return 'primary';
      case 'critical':
        return 'primary';
      default:
        return 'muted';
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      <Header title="Crop Doctor" showBack />

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="max-w-lg mx-auto">
        {/* Capture Step */}
        {step === 'capture' && (
          <div className="flex flex-col min-h-[calc(100vh-56px)]">
            {/* Camera View */}
            <div className="relative aspect-[3/4] bg-charcoal">
              {isStreaming ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Camera overlay guide */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-2 border-white/50 rounded-lg" />
                  </div>
                  {/* Camera controls */}
                  <button
                    onClick={switchCamera}
                    className="absolute top-4 right-4 w-10 h-10 bg-charcoal/50 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/70 p-6">
                  <svg className="w-16 h-16 mb-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-center text-sm mb-2">
                    Take a clear photo of the affected plant part
                  </p>
                  <p className="text-center text-xs text-white/50">
                    Ensure good lighting and focus on symptoms
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex-1 bg-white p-4 flex flex-col justify-end gap-3">
              {cameraError && (
                <p className="text-sm text-primary text-center mb-2">{cameraError}</p>
              )}

              {isStreaming ? (
                <Button onClick={handleCapture} size="lg" className="w-full">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                  Capture Photo
                </Button>
              ) : (
                <>
                  <Button onClick={startCamera} size="lg" className="w-full">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                    Open Camera
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload from Gallery
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === 'preview' && capturedImage && (
          <div className="flex flex-col min-h-[calc(100vh-56px)]">
            <div className="aspect-[3/4] bg-charcoal">
              <img
                src={capturedImage}
                alt="Captured plant"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-white p-4 flex flex-col justify-end gap-3">
              {error && (
                <Card variant="accent" accentColor="primary" className="mb-2">
                  <p className="text-sm text-primary">{error}</p>
                </Card>
              )}
              <Button onClick={handleAnalyze} size="lg" className="w-full">
                Analyze Plant Health
              </Button>
              <Button variant="secondary" onClick={handleRetake} size="lg" className="w-full">
                Retake Photo
              </Button>
            </div>
          </div>
        )}

        {/* Analyzing Step */}
        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] p-6">
            <div className="w-16 h-16 mb-6 relative">
              <div className="absolute inset-0 border-4 border-parchment rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="font-heading text-lg text-earth-brown mb-2">
              Analyzing Plant
            </h2>
            <p className="text-sm text-charcoal/60 text-center">
              Our AI is examining the image for disease symptoms...
            </p>
          </div>
        )}

        {/* Result Step */}
        {step === 'result' && diagnosis && (
          <div className="p-4 space-y-4 pb-8">
            {/* Captured Image Thumbnail */}
            {capturedImage && (
              <div className="flex items-center gap-3">
                <img
                  src={capturedImage}
                  alt="Analyzed plant"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <Badge color={getSeverityColor(diagnosis.severity)}>
                    {diagnosis.diseaseDetected ? diagnosis.severity.toUpperCase() : 'HEALTHY'}
                  </Badge>
                  <p className="text-xs text-charcoal/50 mt-1">
                    Confidence: {Math.round(diagnosis.confidence * 100)}%
                  </p>
                </div>
              </div>
            )}

            {/* Diagnosis Header */}
            <Card>
              <h2 className="font-heading text-lg text-earth-brown mb-1">
                {diagnosis.diseaseDetected
                  ? diagnosis.diseaseName
                  : 'Plant Appears Healthy'}
              </h2>
              {diagnosis.diseaseNameHi && (
                <p className="text-sm text-charcoal/70 mb-2">
                  {diagnosis.diseaseNameHi}
                </p>
              )}
              {diagnosis.diseaseDetected && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-charcoal/60">
                    Spread Risk: <span className="font-medium">{diagnosis.spreadRisk}</span>
                  </span>
                  <span className="text-xs text-charcoal/60">
                    Est. Yield Loss: <span className="font-medium">{diagnosis.estimatedYieldLoss}</span>
                  </span>
                </div>
              )}
            </Card>

            {/* Symptoms */}
            {diagnosis.symptoms.length > 0 && (
              <Card>
                <h3 className="font-heading font-semibold text-sm text-earth-brown mb-2">
                  Observed Symptoms
                </h3>
                <ul className="space-y-1.5">
                  {diagnosis.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Treatment Tabs */}
            {diagnosis.diseaseDetected && (
              <Tabs defaultValue="immediate">
                <TabsList>
                  <TabsTrigger value="immediate">Immediate</TabsTrigger>
                  <TabsTrigger value="chemical">Chemical</TabsTrigger>
                  <TabsTrigger value="organic">Organic</TabsTrigger>
                </TabsList>
                <TabsContent value="immediate">
                  <Card>
                    <ul className="space-y-2">
                      {diagnosis.treatment.immediate.map((action, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                          <span className="font-mono text-xs text-primary font-semibold mt-0.5">
                            {i + 1}.
                          </span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>
                <TabsContent value="chemical">
                  <Card>
                    {diagnosis.treatment.chemical.length > 0 ? (
                      <div className="space-y-3">
                        {diagnosis.treatment.chemical.map((chem, i) => (
                          <div key={i} className="pb-3 border-b border-parchment last:border-0 last:pb-0">
                            <p className="font-semibold text-sm text-earth-brown">
                              {chem.name}
                            </p>
                            <p className="text-xs text-charcoal/60 mt-0.5">
                              Dosage: <span className="font-mono">{chem.dosage}</span>
                            </p>
                            <p className="text-xs text-charcoal/60">
                              Frequency: {chem.frequency}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-charcoal/60">
                        No chemical treatment recommended
                      </p>
                    )}
                  </Card>
                </TabsContent>
                <TabsContent value="organic">
                  <Card>
                    {diagnosis.treatment.organic.length > 0 ? (
                      <div className="space-y-3">
                        {diagnosis.treatment.organic.map((org, i) => (
                          <div key={i} className="pb-3 border-b border-parchment last:border-0 last:pb-0">
                            <p className="font-semibold text-sm text-earth-brown">
                              {org.name}
                            </p>
                            <p className="text-xs text-charcoal/70 mt-0.5">
                              {org.application}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-charcoal/60">
                        No organic treatment available
                      </p>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {/* Prevention */}
            {diagnosis.prevention.length > 0 && (
              <Card>
                <h3 className="font-heading font-semibold text-sm text-earth-brown mb-2">
                  Prevention Measures
                </h3>
                <ul className="space-y-1.5">
                  {diagnosis.prevention.map((measure, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                      {measure}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* New Scan Button */}
            <Button onClick={handleRetake} size="lg" className="w-full">
              Scan Another Plant
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
