// Sample farming calendar data

import type { CalendarEvent, CropType } from '@/types';

// Generate dates relative to current date
const today = new Date();
const addDays = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const sampleEvents: CalendarEvent[] = [
  // Today's tasks
  {
    id: 'evt-001',
    title: 'Morning irrigation - Tomato Block A',
    type: 'irrigation',
    date: addDays(0),
    crop: 'tomato',
    completed: false,
    notes: 'Check drip lines for blockages',
  },
  {
    id: 'evt-002',
    title: 'Apply DAP fertilizer - Chilli',
    type: 'fertilizer',
    date: addDays(0),
    crop: 'chilli',
    completed: false,
    notes: '50kg/acre, incorporate into soil',
  },

  // Tomorrow
  {
    id: 'evt-003',
    title: 'Spray neem oil - Okra',
    type: 'pest-control',
    date: addDays(1),
    crop: 'okra',
    completed: false,
    notes: '5ml/L water, early morning application',
  },

  // This week
  {
    id: 'evt-004',
    title: 'Second harvest - Tomato',
    type: 'harvest',
    date: addDays(3),
    crop: 'tomato',
    completed: false,
    notes: 'Sort by grade, pack in crates',
  },
  {
    id: 'evt-005',
    title: 'Sow cucumber seeds - Nursery',
    type: 'sowing',
    date: addDays(4),
    crop: 'cucumber',
    completed: false,
    notes: 'Pusa Uday variety, pro-tray sowing',
  },
  {
    id: 'evt-006',
    title: 'Fungicide spray - Brinjal',
    type: 'pest-control',
    date: addDays(5),
    crop: 'brinjal',
    completed: false,
    notes: 'Mancozeb 2.5g/L for Phomopsis blight',
  },

  // Next week
  {
    id: 'evt-007',
    title: 'Apply potash - Bottle gourd',
    type: 'fertilizer',
    date: addDays(8),
    crop: 'bottle-gourd',
    completed: false,
    notes: 'MOP 25kg/acre at flowering stage',
  },
  {
    id: 'evt-008',
    title: 'Transplant cucumber seedlings',
    type: 'sowing',
    date: addDays(10),
    crop: 'cucumber',
    completed: false,
    notes: '21-day old seedlings, 60x45cm spacing',
  },
  {
    id: 'evt-009',
    title: 'Harvest chilli - First picking',
    type: 'harvest',
    date: addDays(12),
    crop: 'chilli',
    completed: false,
    notes: 'Green chilli for fresh market',
  },

  // Past completed tasks
  {
    id: 'evt-010',
    title: 'Transplanted tomato seedlings',
    type: 'sowing',
    date: addDays(-7),
    crop: 'tomato',
    completed: true,
    notes: '500 plants transplanted',
  },
  {
    id: 'evt-011',
    title: 'Weeding completed - All blocks',
    type: 'pest-control',
    date: addDays(-5),
    crop: 'tomato',
    completed: true,
  },
  {
    id: 'evt-012',
    title: 'Irrigation system maintenance',
    type: 'irrigation',
    date: addDays(-3),
    crop: 'tomato',
    completed: true,
    notes: 'Replaced 12 drippers, cleaned filters',
  },
];

export function getEventsByDate(date: string): CalendarEvent[] {
  return sampleEvents.filter((e) => e.date === date);
}

export function getUpcomingEvents(days: number = 7): CalendarEvent[] {
  // Compute fresh date each time to avoid stale date issues
  // (e.g., if app stays open past midnight)
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = new Date(todayStart);
  endDate.setDate(endDate.getDate() + days);

  return sampleEvents
    .filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= todayStart && eventDate <= endDate && !e.completed;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getCompletedEvents(): CalendarEvent[] {
  return sampleEvents.filter((e) => e.completed);
}

export const eventTypeConfig: Record<
  CalendarEvent['type'],
  { label: string; labelHi: string; color: string; icon: string }
> = {
  sowing: {
    label: 'Sowing',
    labelHi: 'बुवाई',
    color: 'bg-success',
    icon: '🌱',
  },
  irrigation: {
    label: 'Irrigation',
    labelHi: 'सिंचाई',
    color: 'bg-blue-500',
    icon: '💧',
  },
  fertilizer: {
    label: 'Fertilizer',
    labelHi: 'खाद',
    color: 'bg-secondary',
    icon: '🧪',
  },
  'pest-control': {
    label: 'Pest Control',
    labelHi: 'कीट नियंत्रण',
    color: 'bg-primary',
    icon: '🛡️',
  },
  harvest: {
    label: 'Harvest',
    labelHi: 'कटाई',
    color: 'bg-earth-brown',
    icon: '🌾',
  },
};
