# Kisan Mitra — Farmer Marketplace & Agentic Platform

## Executive Summary

Kisan Mitra is a bilingual (English + regional languages) agricultural commerce and intelligence platform designed for Indian farmers. The platform combines direct seed sales with AI-powered crop management agents that provide personalized, actionable guidance throughout the growing season.

---

## I. Platform Architecture

### 1.1 System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KISAN MITRA PLATFORM                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │   Web App    │    │ Android App  │    │  Voice IVR   │                   │
│  │  (React/TS)  │    │   (Kotlin)   │    │   Gateway    │                   │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                   │                            │
│         └───────────────────┼───────────────────┘                            │
│                             │                                                │
│                    ┌────────▼────────┐                                       │
│                    │   API Gateway   │                                       │
│                    │   (GraphQL)     │                                       │
│                    └────────┬────────┘                                       │
│                             │                                                │
│         ┌───────────────────┼───────────────────┐                            │
│         │                   │                   │                            │
│  ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐                      │
│  │  Commerce   │    │   Agentic   │    │   Content   │                      │
│  │   Service   │    │   Engine    │    │   Service   │                      │
│  └─────────────┘    └─────────────┘    └─────────────┘                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Data Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA INFRASTRUCTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   PostgreSQL    │  │   TimescaleDB   │  │    Redis        │              │
│  │   (Commerce)    │  │   (Telemetry)   │  │   (Sessions)    │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   S3 / Minio    │  │   Pinecone      │  │   ClickHouse    │              │
│  │   (Media)       │  │   (Embeddings)  │  │   (Analytics)   │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## II. Agentic System Design

### 2.1 Agent Orchestration Architecture

The agentic layer operates as a multi-agent system with specialized capabilities:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AGENTIC ORCHESTRATION LAYER                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                    ┌────────────────────────┐                                │
│                    │   Orchestrator Agent   │                                │
│                    │   (Intent Router)      │                                │
│                    └───────────┬────────────┘                                │
│                                │                                             │
│         ┌──────────────────────┼──────────────────────┐                      │
│         │                      │                      │                      │
│  ┌──────▼──────┐       ┌──────▼──────┐       ┌──────▼──────┐                │
│  │ Crop Doctor │       │  Calendar   │       │   Alert     │                │
│  │    Agent    │       │    Agent    │       │   Agent     │                │
│  └──────┬──────┘       └──────┬──────┘       └──────┬──────┘                │
│         │                     │                     │                        │
│         └─────────────────────┼─────────────────────┘                        │
│                               │                                              │
│                    ┌──────────▼──────────┐                                   │
│                    │   Knowledge Base    │                                   │
│                    │   (RAG Pipeline)    │                                   │
│                    └─────────────────────┘                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Crop Doctor Agent

**Purpose:** Real-time disease identification from photographs with treatment protocols.

**Input Pipeline:**
1. Farmer captures photograph of affected plant
2. Image preprocessed (compression, normalization)
3. Vision model (fine-tuned on Indian crop diseases) classifies condition
4. Retrieval-augmented generation fetches treatment protocols
5. Response synthesized in farmer's regional language
6. Voice output generated via TTS

**Knowledge Sources:**
- ICAR disease databases
- State agricultural university publications
- Proprietary field trial data
- Curated treatment protocols per disease-crop-region combination

**Output Schema:**
```
{
  "disease_identified": "Early Blight (Alternaria solani)",
  "confidence": 0.87,
  "severity": "moderate",
  "treatment_protocol": {
    "immediate_actions": [...],
    "preventive_measures": [...],
    "product_recommendations": [...]
  },
  "voice_output_url": "s3://.../{language}/treatment.mp3"
}
```

### 2.3 Predictive Alert Agent

**Purpose:** Triangulate weather, soil, and crop stage data to issue preemptive disease warnings.

**Data Sources:**
- IMD weather API (Indian Meteorological Department)
- Soil health card data (linked via Aadhaar/mobile)
- Farmer's registered crop calendar
- Historical disease outbreak patterns

**Alert Categories:**
| Category | Trigger Conditions | Lead Time |
|----------|-------------------|-----------|
| Critical | High probability, high impact | 24-48 hours |
| Warning | Moderate probability | 3-5 days |
| Advisory | Preventive recommendation | 7-10 days |

**Notification Channels:**
- Push notification (app)
- SMS (fallback)
- WhatsApp Business API
- Voice call (for critical alerts)

### 2.4 Growing Calendar Agent

**Purpose:** Generate personalized cultivation schedules based on geography, soil type, seed variety, and planting date.

**Personalization Factors:**
- GPS-derived location (microclimate zone)
- Soil test results (if available)
- Historical yield data (if returning user)
- Selected seed variety characteristics
- Local water availability patterns

**Calendar Events:**
- Sowing windows
- Irrigation schedules
- Fertilizer application timings
- Pest/disease surveillance checkpoints
- Expected harvest windows

### 2.5 Voice Query Interface

**Supported Languages:**
- Hindi (हिन्दी)
- Telugu (తెలుగు)
- Tamil (தமிழ்)
- Kannada (ಕನ್ನಡ)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)

**Technical Implementation:**
1. Whisper-based ASR fine-tuned on agricultural vocabulary
2. Intent classification with fallback to LLM
3. Response generation in target language
4. Neural TTS with regional accent support

---

## III. Commerce Module

### 3.1 Product Catalog Structure

```
SEED CATALOG
├── Tomato (टमाटर)
│   ├── Hybrid Varieties
│   └── Open-Pollinated
├── Chilli (मिर्च)
│   ├── Hot Varieties
│   └── Sweet Varieties
├── Okra (भिंडी)
├── Brinjal (बैंगन)
├── Cucumber (खीरा)
├── Bottle Gourd (लौकी)
├── Cotton (कपास)
└── Maize (मक्का)
```

### 3.2 Product Detail Architecture

Each product includes:
- High-resolution seed packet photography
- Field demonstration videos (region-specific)
- Agronomic data sheet
- Comparative yield data
- Disease resistance ratings
- Regional suitability map
- Farmer testimonial videos

---

## IV. Content Strategy

### 4.1 Disease Library Structure

Each crop contains:
1. **Growth Stage Timeline** — Visual lifecycle with disease susceptibility windows
2. **Disease Cards** — Symptoms, causes, prevention, treatment
3. **Environmental Triggers** — Soil, moisture, temperature correlations
4. **Visual Diagnosis Guide** — Photo comparison for self-identification

### 4.2 Video Content Strategy

| Content Type | Purpose | Format |
|-------------|---------|--------|
| Field Demonstrations | Show crop quality outcomes | 2-3 min, regional language |
| Disease Identification | Train visual recognition | Side-by-side healthy/affected |
| Treatment Tutorials | Step-by-step application | Close-up, slow-motion |
| Farmer Testimonials | Social proof | Interview format |

---

## V. Design System

### 5.1 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Terracotta | #C45D3E | Primary accent, CTAs |
| Harvest Gold | #D4A84B | Secondary accent |
| Earth Brown | #5D4E37 | Headings, emphasis |
| Olive | #6B7B3C | Success states, growth |
| Cream | #F5F0E6 | Background |
| Parchment | #E8E0D0 | Cards, panels |
| Charcoal | #2D2D2D | Body text |

### 5.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Playfair Display | 600 | 24-48px |
| Body | Inter | 400 | 14-16px |
| Data/Metrics | JetBrains Mono | 500 | 12-14px |
| Regional Script | Noto Sans [Language] | 400-600 | 14-18px |

### 5.3 Interaction Patterns

- **Haptic Feedback:** Subtle vibration on button press (Android)
- **Sound Design:** Earthy, organic tones for confirmations
- **Transitions:** 200-300ms easing, no aggressive animations
- **Loading States:** Skeleton screens, not spinners

---

## VI. Technical Specifications

### 6.1 API Response Times (Target)

| Endpoint | P50 | P99 |
|----------|-----|-----|
| Product Catalog | 120ms | 400ms |
| Disease Identification | 800ms | 2000ms |
| Calendar Generation | 200ms | 600ms |
| Voice Synthesis | 400ms | 1200ms |

### 6.2 Offline Capabilities

- Product catalog cached locally
- Disease library available offline
- Photo queue for delayed upload
- Calendar sync on reconnect

---

## VII. Regional Considerations

### 7.1 Language Support Matrix

| Feature | Hindi | Telugu | Tamil | Kannada | Marathi | Gujarati |
|---------|-------|--------|-------|---------|---------|----------|
| UI Translation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Voice Input | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Voice Output | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Video Content | ✓ | ✓ | ✓ | ✓ | Phase 2 | Phase 2 |

### 7.2 Payment Integration

- UPI (primary)
- Net Banking
- Cash on Delivery
- Dealer Credit (B2B)

---

*Document Version: 1.0*
*Last Updated: December 2024*
