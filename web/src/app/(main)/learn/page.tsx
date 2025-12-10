'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layouts';
import { Card, Badge, Input, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { diseases, getDiseasesByCrop, searchDiseases } from '@/lib/data/diseases';
import { cropTypes } from '@/lib/data/products';
import { cn } from '@/lib/utils';
import type { CropType, Disease } from '@/types';

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<CropType | 'all'>('all');

  const filteredDiseases = useMemo(() => {
    let result = [...diseases];

    if (selectedCrop !== 'all') {
      result = getDiseasesByCrop(selectedCrop);
    }

    if (searchQuery.trim()) {
      result = searchDiseases(searchQuery).filter(
        (d) => selectedCrop === 'all' || d.crop === selectedCrop
      );
    }

    return result;
  }, [searchQuery, selectedCrop]);

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

  const severityConfig: Record<string, { color: 'primary' | 'secondary' | 'success' | 'muted'; label: string }> = {
    critical: { color: 'primary', label: 'Critical' },
    high: { color: 'primary', label: 'High' },
    medium: { color: 'secondary', label: 'Medium' },
    low: { color: 'success', label: 'Low' },
  };

  return (
    <main className="min-h-screen bg-cream pb-20">
      <Header title="Disease Library" showBack />

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Search */}
        <Input
          placeholder="Search diseases, symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white"
        />

        {/* Crop Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          <button
            onClick={() => setSelectedCrop('all')}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors',
              selectedCrop === 'all'
                ? 'bg-earth-brown text-white'
                : 'bg-white border border-parchment text-earth-brown hover:border-earth-brown/30'
            )}
          >
            All Crops
          </button>
          {cropTypes.slice(0, 6).map((crop) => (
            <button
              key={crop.type}
              onClick={() => setSelectedCrop(crop.type)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5',
                selectedCrop === crop.type
                  ? 'bg-earth-brown text-white'
                  : 'bg-white border border-parchment text-earth-brown hover:border-earth-brown/30'
              )}
            >
              <span>{cropEmoji[crop.type]}</span>
              {crop.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-xs text-charcoal/60">
          {filteredDiseases.length} disease{filteredDiseases.length !== 1 && 's'} found
        </p>

        {/* Disease List */}
        <div className="space-y-3">
          {filteredDiseases.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} />
          ))}
          {filteredDiseases.length === 0 && (
            <Card className="py-12 text-center">
              <p className="text-charcoal/60 text-sm">No diseases found</p>
              <p className="text-charcoal/40 text-xs mt-1">
                Try adjusting your search
              </p>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}

function DiseaseCard({ disease }: { disease: Disease }) {
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

  const severityConfig: Record<string, { color: 'primary' | 'secondary' | 'success' | 'muted'; label: string }> = {
    critical: { color: 'primary', label: 'Critical' },
    high: { color: 'primary', label: 'High' },
    medium: { color: 'secondary', label: 'Medium' },
    low: { color: 'success', label: 'Low' },
  };

  return (
    <Link href={`/learn/${disease.id}`}>
      <Card className="hover:border-earth-brown/30 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-parchment flex items-center justify-center text-2xl flex-shrink-0">
            {cropEmoji[disease.crop]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-heading font-semibold text-sm text-earth-brown leading-tight">
                {disease.name}
              </h3>
              <Badge color={severityConfig[disease.severity].color}>
                {severityConfig[disease.severity].label}
              </Badge>
            </div>
            {disease.nameHi && (
              <p className="text-xs text-charcoal/60 mb-2">{disease.nameHi}</p>
            )}
            <p className="text-xs text-charcoal/70 line-clamp-2">
              {disease.symptoms.slice(0, 2).join('. ')}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {disease.affectedStages.slice(0, 3).map((stage) => (
                <span
                  key={stage}
                  className="text-[9px] px-2 py-0.5 bg-parchment rounded-full text-earth-brown/70 capitalize"
                >
                  {stage}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
