# Performance Analysis Report

This document outlines performance anti-patterns, unnecessary re-renders, and inefficient algorithms found in the Kisan Mitra codebase.

## Critical Issues

### 1. Inline Component Definitions (Causes Full List Re-renders)

**Files affected:**
- `src/app/(main)/learn/page.tsx:117` - `DiseaseCard` component
- `src/app/(main)/calendar/page.tsx:186` - `EventCard` component

**Problem:** Components are defined inside the parent component function, meaning they are recreated on every render. This defeats React's reconciliation and causes all list items to unmount/remount on any state change.

**Fix:** Move components to separate files or outside the parent function:
```tsx
// Before (bad)
export default function LearnPage() {
  function DiseaseCard({ disease }) { ... }  // Recreated every render!
  return <>{diseases.map(d => <DiseaseCard key={d.id} disease={d} />)}</>
}

// After (good)
const DiseaseCard = memo(function DiseaseCard({ disease }) { ... });
export default function LearnPage() {
  return <>{diseases.map(d => <DiseaseCard key={d.id} disease={d} />)}</>
}
```

### 2. Missing Search Input Debounce

**Files affected:**
- `src/app/(main)/shop/page.tsx:65`
- `src/app/(main)/learn/page.tsx:59`

**Problem:** Every keystroke triggers immediate state update, causing:
1. Component re-render
2. useMemo recalculation (filtering/sorting)
3. All child components to re-render

**Fix:** Use the existing `debounce` utility from `src/lib/utils/index.ts`:
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
  return () => clearTimeout(timer);
}, [searchQuery]);

// Use debouncedQuery in useMemo instead of searchQuery
```

### 3. O(n×m) Calendar Event Lookup

**File:** `src/app/(main)/calendar/page.tsx:36-37, 47-48, 59-60`

**Problem:** For each of 42 calendar days, iterates through all events:
```tsx
hasEvents: sampleEvents.some((e) => e.date === date),  // O(events) per day
```

**Fix:** Pre-compute event dates as a Set:
```tsx
const calendarDays = useMemo(() => {
  const eventDates = new Set(sampleEvents.map(e => e.date));  // O(events) once
  // ...
  days.push({
    hasEvents: eventDates.has(date),  // O(1) per day
  });
}, []);
```

## High Priority Issues

### 4. Missing React.memo on List Items

**File:** `src/components/features/ProductCard.tsx:12`

**Problem:** ProductCard is not memoized. When parent re-renders (filter change, sort change), all ProductCards re-render even with unchanged props.

**Fix:**
```tsx
export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  // ...
});
```

### 5. Zustand Store Function Selectors

**File:** `src/lib/stores/useStore.ts:85-95`

**Problem:** `cartTotal()` and `cartCount()` are methods that compute values on every call:
```tsx
cartTotal: () => {
  const { cart } = get();
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
},
```

Components calling `useStore().cartTotal()` will:
1. Subscribe to the entire store (re-render on any state change)
2. Recalculate the total on every call

**Fix:** Use Zustand selectors with shallow comparison:
```tsx
// In store
// Remove cartTotal and cartCount functions

// In components
const cartTotal = useStore(
  (state) => state.cart.reduce((t, i) => t + i.product.price * i.quantity, 0)
);
```

Or use `zustand/shallow`:
```tsx
import { useShallow } from 'zustand/react/shallow';

const { cart, addToCart } = useStore(
  useShallow((state) => ({ cart: state.cart, addToCart: state.addToCart }))
);
```

### 6. Stale Module-Level Date

**File:** `src/lib/data/calendar.ts:6-11`

**Problem:** `today` is computed once at module load:
```tsx
const today = new Date();  // Never updates!
```

If the app runs past midnight, `getUpcomingEvents()` and calendar computations will use stale dates.

**Fix:** Compute `today` inside functions:
```tsx
export function getUpcomingEvents(days: number = 7): CalendarEvent[] {
  const today = new Date();  // Fresh date each call
  const endDate = new Date(today);
  // ...
}
```

## Medium Priority Issues

### 7. Object Recreation Inside Components

**Files affected:**
- `src/components/features/ProductCard.tsx:13-22` - `cropEmoji` object
- `src/app/(main)/learn/page.tsx:32-48, 117-134` - `cropEmoji` & `severityConfig` (duplicated!)
- `src/app/(main)/calendar/page.tsx:194-203` - `cropEmoji` object

**Problem:** Objects are recreated on every render:
```tsx
function ProductCard({ product }) {
  const cropEmoji = { tomato: '🍅', ... };  // New object every render
}
```

**Fix:** Move to module scope or use useMemo:
```tsx
// Option 1: Module scope (preferred for static data)
const CROP_EMOJI: Record<string, string> = {
  tomato: '🍅',
  // ...
};

function ProductCard({ product }) {
  // Use CROP_EMOJI
}

// Option 2: Shared constants file
// src/lib/constants.ts
export const CROP_EMOJI = { ... };
export const SEVERITY_CONFIG = { ... };
```

### 8. useCamera Hook Dependency Issues

**File:** `src/lib/hooks/useCamera.ts:70-74`

**Problem:** Missing dependency in useEffect:
```tsx
useEffect(() => {
  if (isStreaming) {
    startCamera();  // startCamera not in deps
  }
}, [facingMode]);
```

**Fix:**
```tsx
useEffect(() => {
  if (isStreaming) {
    startCamera();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [facingMode]);  // Intentionally omit startCamera to avoid infinite loop
```

Or refactor to use a ref for the streaming state check.

### 9. Redundant Filter Operations

**File:** `src/app/(main)/learn/page.tsx:16-30`

**Problem:** When both crop filter and search are active, filtering happens twice:
```tsx
if (selectedCrop !== 'all') {
  result = getDiseasesByCrop(selectedCrop);  // First filter
}
if (searchQuery.trim()) {
  result = searchDiseases(searchQuery).filter(  // Discards above, filters again
    (d) => selectedCrop === 'all' || d.crop === selectedCrop
  );
}
```

**Fix:** Combine into single filter pass:
```tsx
const filteredDiseases = useMemo(() => {
  return diseases.filter((disease) => {
    const matchesCrop = selectedCrop === 'all' || disease.crop === selectedCrop;
    if (!matchesCrop) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      disease.name.toLowerCase().includes(query) ||
      disease.nameHi?.includes(searchQuery) ||
      disease.symptoms.some((s) => s.toLowerCase().includes(query))
    );
  });
}, [searchQuery, selectedCrop]);
```

## Low Priority Issues

### 10. Unused Imports

**File:** `src/app/(main)/learn/page.tsx:6`
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';  // Unused
```

### 11. Inline Arrow Functions in onClick

Multiple files have inline arrow functions that create new references on each render:
```tsx
onClick={() => setSelectedCrop('all')}
```

While minor, this prevents `React.memo()` optimization on child components. Consider `useCallback` for frequently-rendered lists.

## Recommendations Summary

| Priority | Issue | Estimated Impact |
|----------|-------|------------------|
| Critical | Extract inline components | -50% re-renders on filter/search |
| Critical | Add search debounce | -90% renders while typing |
| High | Use O(1) calendar lookup | Faster calendar with many events |
| High | Memoize ProductCard | -30% re-renders on shop page |
| High | Fix Zustand selectors | Prevent store-wide re-renders |
| Medium | Fix stale date bug | Correct behavior after midnight |
| Medium | Extract constant objects | Minor GC improvement |
| Low | Remove unused imports | Smaller bundle |
