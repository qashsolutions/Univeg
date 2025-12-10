// Shared constants for Kisan Mitra

import type { CropType } from '@/types';

/**
 * Emoji mappings for crop types
 */
export const CROP_EMOJI: Record<CropType | string, string> = {
  tomato: '🍅',
  chilli: '🌶️',
  okra: '🥒',
  brinjal: '🍆',
  cucumber: '🥒',
  'bottle-gourd': '🫛',
  cotton: '☁️',
  maize: '🌽',
};

/**
 * Severity configuration for diseases and alerts
 */
export const SEVERITY_CONFIG: Record<
  string,
  { color: 'primary' | 'secondary' | 'success' | 'muted'; label: string }
> = {
  critical: { color: 'primary', label: 'Critical' },
  high: { color: 'primary', label: 'High' },
  medium: { color: 'secondary', label: 'Medium' },
  low: { color: 'success', label: 'Low' },
};
