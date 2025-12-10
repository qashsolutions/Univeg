# Kisan Mitra — Project Context

## Overview

Kisan Mitra is an agricultural commerce and intelligence platform for Indian farmers. It combines seed sales with AI-powered crop management agents. The platform serves farmers across India with support for 6 regional languages.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa / Workbox
- **State**: Zustand (lightweight)
- **i18n**: react-i18next
- **Target**: Web + Android (PWA installable)

## Design System

### Colors (use these exact values)

```
Primary:
- Terracotta: #C45D3E (CTAs, critical alerts)
- Harvest Gold: #D4A84B (warnings, secondary accent)
- Olive: #6B7B3C (success, growth)
- Earth Brown: #5D4E37 (headings, icons)

Neutral:
- Cream: #F5F0E6 (page background)
- Parchment: #E8E0D0 (cards, dividers)
- Charcoal: #2D2D2D (body text)
```

### Typography

```
Headings: Playfair Display (serif), 600 weight
Body: Inter (sans-serif), 400 weight
Data/Metrics: JetBrains Mono (monospace), 500 weight
```

### Design Principles

1. **Restrained**: No glows, shadows, emojis, neon, or gradients
2. **Warm**: Earth tones only, never cold blues/grays
3. **Typographic hierarchy**: Serif headings, sans-serif body, mono for data
4. **Educational**: Content-rich, reference-quality information
5. **Offline-first**: Works without connectivity

## Key Features

### Agentic Capabilities
1. **Crop Doctor**: Photo-based disease identification
2. **Predictive Alerts**: Weather + soil + crop triangulation
3. **Growing Calendar**: Personalized farming schedules
4. **Voice Query**: Natural language in regional languages

### Commerce
- Seed catalog (8 crop types)
- UPI payments (Google Pay, Paytm, PhonePe)
- Cash on Delivery option

### Video System
- Geo-sorted by distance from farmer
- Videos tagged with lat/long metadata
- Regional language content

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Main app routes (with bottom nav)
│   │   ├── page.tsx       # Dashboard
│   │   ├── shop/          # Product catalog
│   │   ├── learn/         # Disease library
│   │   ├── calendar/      # Growing calendar
│   │   └── profile/       # User profile
│   ├── checkout/          # Checkout flow (no bottom nav)
│   ├── crop-doctor/       # AI diagnosis flow
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Base components (Button, Card, etc.)
│   ├── features/          # Feature-specific components
│   └── layouts/           # Layout components
├── lib/
│   ├── api/               # API client functions
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── stores/            # Zustand stores
├── styles/
│   └── globals.css        # Global styles + Tailwind
├── types/                 # TypeScript types
├── i18n/                  # Translation files
│   ├── hi/                # Hindi
│   ├── te/                # Telugu
│   ├── ta/                # Tamil
│   ├── kn/                # Kannada
│   ├── mr/                # Marathi
│   └── gu/                # Gujarati
└── public/
    ├── icons/             # PWA icons
    ├── sounds/            # UI sounds (optional)
    └── manifest.json      # PWA manifest
```

## File Naming Conventions

- Components: PascalCase (`ProductCard.tsx`)
- Utilities: camelCase (`formatCurrency.ts`)
- Pages: lowercase with hyphens (Next.js convention)
- Types: PascalCase with `.types.ts` suffix
- Hooks: camelCase with `use` prefix (`useGeolocation.ts`)

## API Patterns

### Backend (not in this repo)
- REST API with JSON responses
- Firebase for auth, push notifications
- PostgreSQL + PostGIS for geo queries
- S3-compatible storage for media

### Frontend API Calls
```typescript
// Use lib/api/client.ts for all API calls
// Handle offline gracefully with cached data
// Show skeleton loaders, never spinners
```

## Regional Languages

| Code | Language | Script |
|------|----------|--------|
| hi | Hindi | Devanagari |
| te | Telugu | Telugu |
| ta | Tamil | Tamil |
| kn | Kannada | Kannada |
| mr | Marathi | Devanagari |
| gu | Gujarati | Gujarati |

## Important Notes

1. **No iOS**: Android-only target, PWA installable
2. **Offline-first**: Cache critical data in IndexedDB
3. **Low bandwidth**: Optimize images, lazy load videos
4. **Accessibility**: 44px touch targets, 4.5:1 contrast
5. **No secrets in git**: Use .env.local for API keys

## Design Documentation

Reference these files in `/design/` for detailed specs:
- `DESIGN_PRINCIPLES.md` - Colors, typography, components
- `HIERARCHY.md` - Information architecture, tabs
- `AGRONOMIC_REFERENCE.md` - Crop/disease content
- `mockups/*.svg` - 15 screen mockups
