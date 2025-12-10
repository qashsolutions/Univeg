'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layouts';
import { Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { getDiseaseById, getDiseasesByCrop } from '@/lib/data/diseases';
import { cn } from '@/lib/utils';

interface DiseasePageProps {
  params: Promise<{ id: string }>;
}

export default function DiseasePage({ params }: DiseasePageProps) {
  const { id } = use(params);
  const disease = getDiseaseById(id);

  if (!disease) {
    notFound();
  }

  const cropEmoji: Record<string, string> = {
    tomato: '🍅',
    chilli: '🌶️',
    okra: '🥒',
    brinjal: '🍆',
    cucumber: '🥒',
    'bottle-gourd': '🫛',
    cotton: '☁️',
    maize: '🌽',
  };

  const severityConfig: Record<string, { color: 'primary' | 'secondary' | 'success' | 'muted'; label: string; bg: string }> = {
    critical: { color: 'primary', label: 'Critical', bg: 'bg-primary/10' },
    high: { color: 'primary', label: 'High Risk', bg: 'bg-primary/10' },
    medium: { color: 'secondary', label: 'Medium Risk', bg: 'bg-secondary/10' },
    low: { color: 'success', label: 'Low Risk', bg: 'bg-success/10' },
  };

  const stageConfig: Record<string, { label: string; order: number }> = {
    seedling: { label: 'Seedling', order: 1 },
    vegetative: { label: 'Vegetative', order: 2 },
    flowering: { label: 'Flowering', order: 3 },
    fruiting: { label: 'Fruiting', order: 4 },
    harvest: { label: 'Harvest', order: 5 },
  };

  const relatedDiseases = getDiseasesByCrop(disease.crop)
    .filter((d) => d.id !== disease.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-cream pb-8">
      <Header showBack />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl bg-parchment flex items-center justify-center text-3xl flex-shrink-0">
            {cropEmoji[disease.crop]}
          </div>
          <div className="flex-1">
            <Badge color={severityConfig[disease.severity].color} className="mb-1">
              {severityConfig[disease.severity].label}
            </Badge>
            <h1 className="font-heading text-lg font-semibold text-earth-brown leading-tight">
              {disease.name}
            </h1>
            {disease.nameHi && (
              <p className="text-sm text-charcoal/70">{disease.nameHi}</p>
            )}
          </div>
        </div>

        {/* Affected Growth Stages */}
        <Card>
          <h2 className="font-heading font-semibold text-sm text-earth-brown mb-3">
            Affected Growth Stages
          </h2>
          <div className="flex gap-2">
            {['seedling', 'vegetative', 'flowering', 'fruiting', 'harvest'].map((stage) => {
              const isAffected = disease.affectedStages.includes(stage as any);
              return (
                <div
                  key={stage}
                  className={cn(
                    'flex-1 text-center py-2 px-1 rounded-lg text-[10px] font-medium transition-colors',
                    isAffected
                      ? 'bg-primary/15 text-primary'
                      : 'bg-parchment/50 text-charcoal/40'
                  )}
                >
                  {stageConfig[stage].label}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Symptoms */}
        <Card>
          <h2 className="font-heading font-semibold text-sm text-earth-brown mb-3">
            Symptoms
          </h2>
          <ul className="space-y-2">
            {disease.symptoms.map((symptom, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {symptom}
              </li>
            ))}
          </ul>
        </Card>

        {/* Treatment Tabs */}
        <Tabs defaultValue="chemical">
          <TabsList>
            <TabsTrigger value="chemical">Chemical</TabsTrigger>
            <TabsTrigger value="organic">Organic</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
          </TabsList>
          <TabsContent value="chemical">
            <Card>
              <ul className="space-y-3">
                {disease.treatment.chemical.map((treatment, i) => (
                  <li key={i} className="pb-3 border-b border-parchment last:border-0 last:pb-0">
                    <p className="text-sm text-charcoal/80">{treatment}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="organic">
            <Card>
              <ul className="space-y-3">
                {disease.treatment.organic.map((treatment, i) => (
                  <li key={i} className="pb-3 border-b border-parchment last:border-0 last:pb-0">
                    <p className="text-sm text-charcoal/80">{treatment}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="cultural">
            <Card>
              <ul className="space-y-2">
                {disease.treatment.cultural.map((treatment, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                    {treatment}
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Prevention */}
        <Card>
          <h2 className="font-heading font-semibold text-sm text-earth-brown mb-3">
            Prevention Measures
          </h2>
          <ul className="space-y-2">
            {disease.prevention.map((measure, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                <span className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {measure}
              </li>
            ))}
          </ul>
        </Card>

        {/* Related Diseases */}
        {relatedDiseases.length > 0 && (
          <section>
            <h2 className="font-heading text-sm text-earth-brown mb-3">
              Other {disease.crop.charAt(0).toUpperCase() + disease.crop.slice(1)} Diseases
            </h2>
            <div className="space-y-2">
              {relatedDiseases.map((related) => (
                <a key={related.id} href={`/learn/${related.id}`}>
                  <Card padding="sm" className="hover:border-earth-brown/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-sm text-earth-brown">
                          {related.name}
                        </h3>
                        <p className="text-xs text-charcoal/50">{related.nameHi}</p>
                      </div>
                      <Badge
                        color={severityConfig[related.severity].color}
                      >
                        {severityConfig[related.severity].label}
                      </Badge>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
