# Kisan Mitra — Design System

## Overview

Kisan Mitra is an agricultural commerce and intelligence platform for Indian farmers, combining seed sales with AI-powered crop management agents.

---

## Design Assets

### Mockups

| Screen | File | Description |
|--------|------|-------------|
| Mobile Dashboard | `mockups/01-dashboard-mobile.svg` | Main home screen with quick actions and alerts |
| Product Catalog | `mockups/02-product-catalog.svg` | Seed catalog with categories and search |
| Crop Doctor | `mockups/03-crop-doctor-agent.svg` | AI disease diagnosis interface |
| Disease Library | `mockups/04-disease-library.svg` | Interactive disease reference with growth stages |
| Growing Calendar | `mockups/05-growing-calendar.svg` | Personalized farming schedule |
| Predictive Alerts | `mockups/06-predictive-alerts.svg` | Weather + soil + crop triangulation warnings |
| Voice Interface | `mockups/07-voice-interface.svg` | Multilingual voice query assistant |
| Product Detail | `mockups/08-product-detail.svg` | Full product page with videos and purchase |
| Web Dashboard | `mockups/09-web-dashboard.svg` | Desktop/web version of the platform |
| Geo Video Discovery | `mockups/10-geo-video-discovery.svg` | Location-based video feed sorted by distance |
| Video Player Geo | `mockups/11-video-player-geo.svg` | Video player with geographic context and map |
| Checkout Payment | `mockups/12-checkout-payment.svg` | Payment method selection (UPI, COD) |
| Google Pay Flow | `mockups/13-google-pay-flow.svg` | Google Pay UPI payment bottom sheet |
| Paytm Flow | `mockups/14-paytm-flow.svg` | Paytm wallet/UPI payment flow |
| Order Confirmation | `mockups/15-order-confirmation.svg` | Payment success and order details |

---

## Design System

### Color Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Terracotta | `#C45D3E` | `--color-primary` | Primary CTAs, alerts, tomato accent |
| Harvest Gold | `#D4A84B` | `--color-secondary` | Secondary accent, warnings |
| Earth Brown | `#5D4E37` | `--color-text` | Headings, primary text |
| Olive | `#6B7B3C` | `--color-success` | Success states, growth |
| Cream | `#F5F0E6` | `--color-background` | Page background |
| Parchment | `#E8E0D0` | `--color-surface` | Cards, panels |
| Charcoal | `#2D2D2D` | `--color-body` | Body text |

### Typography

```css
/* Headings */
font-family: 'Playfair Display', Georgia, serif;
font-weight: 600;

/* Body */
font-family: 'Inter', -apple-system, sans-serif;
font-weight: 400;

/* Data / Metrics */
font-family: 'JetBrains Mono', monospace;
font-weight: 500;

/* Regional Scripts */
font-family: 'Noto Sans Devanagari', 'Noto Sans Telugu', etc.;
```

### Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

---

## Documentation

| Document | Description |
|----------|-------------|
| `ARCHITECTURE.md` | Complete platform architecture and system design |
| `AGENTIC_ARCHITECTURE.md` | Detailed AI agent specifications and data flows |
| `GEO_VIDEO_ARCHITECTURE.md` | Location-based video matching system and geocoding |
| `HIERARCHY.md` | Information hierarchy, content depth levels, tabbed panels |
| `DESIGN_PRINCIPLES.md` | Premium aesthetics, typography, sound design, interactions |
| `AGRONOMIC_REFERENCE.md` | Educational crop profiles, disease guides, fertilizer schedules |

---

## Agentic Capabilities

### 1. Crop Doctor Agent
- Photo-based disease identification
- 45 disease classes across 8 crops
- Treatment protocols in regional languages
- Voice output support

### 2. Predictive Alert Agent
- Weather + soil + crop stage triangulation
- 24-48 hour critical alerts
- SMS and push notification fallbacks
- Regional outbreak pattern integration

### 3. Growing Calendar Agent
- Personalized cultivation schedules
- GPS-based microclimate adjustments
- Irrigation and fertilizer timing
- Harvest window predictions

### 4. Voice Query Agent
- Supports Hindi, Telugu, Tamil, Kannada, Marathi, Gujarati
- Intent classification with LLM fallback
- Neural TTS with regional accents
- <2.5s end-to-end latency target

---

## Supported Languages

| Language | Script | Voice Input | Voice Output | UI Translation |
|----------|--------|-------------|--------------|----------------|
| Hindi | हिन्दी | Yes | Yes | Yes |
| Telugu | తెలుగు | Yes | Yes | Yes |
| Tamil | தமிழ் | Yes | Yes | Yes |
| Kannada | ಕನ್ನಡ | Yes | Yes | Yes |
| Marathi | मराठी | Yes | Yes | Yes |
| Gujarati | ગુજરાતી | Yes | Yes | Yes |

---

## Interaction Principles

1. **Physical Feedback**: Subtle haptic response on button press
2. **Sound Design**: Earthy, organic tones for confirmations
3. **Transitions**: 200-300ms easing, no aggressive animations
4. **Loading States**: Skeleton screens preferred over spinners
5. **Offline First**: Core features work without connectivity

---

## Product Catalog

| Crop | Varieties | Status |
|------|-----------|--------|
| Tomato | Hybrid 512, Desi Red | Active |
| Chilli | Fire King, Green Star | Active |
| Okra | Premium Green | Active |
| Brinjal | Purple King | Active |
| Cucumber | Crisp Green | Planned |
| Bottle Gourd | White Wonder | Planned |
| Cotton | BT Hybrid | Active |
| Maize | Golden Yield | Active |

---

*Design System Version: 1.0*
*Last Updated: December 2024*
