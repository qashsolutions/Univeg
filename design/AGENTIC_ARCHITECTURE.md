# Kisan Mitra — Agentic System Architecture

## I. Multi-Agent Orchestration Framework

### 1.1 Agent Hierarchy

```
                                    ┌──────────────────────────┐
                                    │   ORCHESTRATOR AGENT     │
                                    │   (Master Controller)    │
                                    └────────────┬─────────────┘
                                                 │
                    ┌────────────────────────────┼────────────────────────────┐
                    │                            │                            │
         ┌──────────▼──────────┐      ┌─────────▼──────────┐      ┌──────────▼──────────┐
         │   CROP DOCTOR       │      │   CALENDAR         │      │   ALERT            │
         │   AGENT             │      │   AGENT            │      │   AGENT            │
         │                     │      │                    │      │                    │
         │   - Vision Analysis │      │   - Schedule Gen   │      │   - Risk Scoring   │
         │   - Disease ID      │      │   - Task Creation  │      │   - Notification   │
         │   - Treatment Rec   │      │   - Reminders      │      │   - Escalation     │
         └──────────┬──────────┘      └─────────┬──────────┘      └──────────┬──────────┘
                    │                           │                            │
                    └───────────────────────────┼────────────────────────────┘
                                                │
                                    ┌───────────▼───────────┐
                                    │   KNOWLEDGE BASE      │
                                    │   (RAG Pipeline)      │
                                    │                       │
                                    │   - Disease DB        │
                                    │   - Treatment DB      │
                                    │   - Agronomic KB      │
                                    │   - Regional Variants │
                                    └───────────────────────┘
```

---

## II. Crop Doctor Agent

### 2.1 System Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            CROP DOCTOR AGENT PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐      │
│   │  IMAGE  │───▶│  PREPROCESS │───▶│   VISION    │───▶│  CLASSIFICATION     │      │
│   │  INPUT  │    │  Pipeline   │    │   ENCODER   │    │  (Disease + Crop)   │      │
│   └─────────┘    └─────────────┘    └─────────────┘    └──────────┬──────────┘      │
│                                                                   │                  │
│                                                                   ▼                  │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐      │
│   │    TTS      │◀───│  RESPONSE   │◀───│    RAG      │◀───│  TREATMENT      │      │
│   │  (Regional) │    │  SYNTHESIS  │    │  RETRIEVAL  │    │  LOOKUP         │      │
│   └─────────────┘    └─────────────┘    └─────────────┘    └─────────────────┘      │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Model Architecture

**Primary Classification Model:**
- Base: Fine-tuned Vision Transformer (ViT-B/16)
- Training Data: 120,000+ labeled images from Indian fields
- Classes: 45 diseases across 8 crops
- Accuracy: 91.3% top-1, 97.8% top-3

**Fallback Strategy:**
1. Primary model confidence < 70% → Ensemble voting
2. Ensemble disagreement → Flag for human expert review
3. Novel pattern detected → Add to training queue

### 2.3 Disease Knowledge Graph

```
DISEASE: Early Blight (Alternaria solani)
├── CROPS_AFFECTED: [Tomato, Potato, Chilli]
├── SYMPTOMS
│   ├── EARLY: Small brown spots with concentric rings
│   ├── ADVANCED: Leaf yellowing, defoliation
│   └── SEVERE: Fruit lesions, stem cankers
├── ENVIRONMENTAL_TRIGGERS
│   ├── TEMPERATURE: 24-29°C (optimal)
│   ├── HUMIDITY: >80%
│   └── MOISTURE: Prolonged leaf wetness
├── TREATMENT_PROTOCOLS
│   ├── ORGANIC: Neem oil spray, Trichoderma application
│   ├── CHEMICAL: Mancozeb, Chlorothalonil
│   └── CULTURAL: Remove debris, improve airflow
├── PREVENTION
│   ├── Crop rotation (3-year cycle)
│   ├── Resistant varieties
│   └── Drip irrigation (avoid overhead)
└── REGIONAL_VARIANTS
    ├── Maharashtra: Peak in Kharif season
    ├── Karnataka: Year-round in irrigated areas
    └── Andhra Pradesh: Post-monsoon surge
```

---

## III. Predictive Alert Agent

### 3.1 Data Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         PREDICTIVE ALERT DATA PIPELINE                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   EXTERNAL DATA SOURCES                           INTERNAL DATA                      │
│   ┌───────────────────┐                          ┌───────────────────┐              │
│   │ IMD Weather API   │──────┐                   │ Farmer Profile    │              │
│   │ (Hourly updates)  │      │                   │ - Location        │              │
│   └───────────────────┘      │                   │ - Soil type       │              │
│                              │                   │ - Crops planted   │              │
│   ┌───────────────────┐      │                   │ - Planting dates  │              │
│   │ Soil Health Cards │──────┼───────────────────│                   │              │
│   │ (Govt Database)   │      │                   └─────────┬─────────┘              │
│   └───────────────────┘      │                             │                        │
│                              ▼                             ▼                        │
│   ┌───────────────────┐    ┌─────────────────────────────────┐                      │
│   │ Satellite Imagery │───▶│        RISK ENGINE             │                      │
│   │ (NDVI Analysis)   │    │                                 │                      │
│   └───────────────────┘    │  - Disease probability models   │                      │
│                            │  - Growth stage correlation     │                      │
│   ┌───────────────────┐    │  - Historical outbreak data     │                      │
│   │ Historical Disease│───▶│  - Regional adjustments         │                      │
│   │ Outbreak Records  │    │                                 │                      │
│   └───────────────────┘    └──────────────┬──────────────────┘                      │
│                                           │                                          │
│                                           ▼                                          │
│                            ┌─────────────────────────────────┐                      │
│                            │       ALERT DISPATCHER          │                      │
│                            │                                 │                      │
│                            │  - Priority scoring             │                      │
│                            │  - Channel selection            │                      │
│                            │  - Language translation         │                      │
│                            │  - Delivery confirmation        │                      │
│                            └─────────────────────────────────┘                      │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Risk Scoring Algorithm

```python
# Pseudocode for disease risk calculation

def calculate_disease_risk(farmer_profile, weather_data, crop_stage):

    # Base risk from disease-crop-stage matrix
    base_risk = DISEASE_STAGE_MATRIX[crop.type][crop.stage][disease.type]

    # Environmental modifiers
    temp_modifier = get_temp_modifier(weather_data.temp, disease.optimal_temp)
    humidity_modifier = get_humidity_modifier(weather_data.humidity, disease.threshold)
    rain_modifier = get_rain_modifier(weather_data.rain_prob, disease.moisture_sensitivity)

    # Regional historical adjustment
    regional_factor = get_regional_outbreak_frequency(
        farmer_profile.location,
        disease.type,
        current_season
    )

    # Soil condition impact
    soil_factor = get_soil_risk_factor(
        farmer_profile.soil_type,
        farmer_profile.soil_ph,
        disease.soil_preferences
    )

    # Calculate composite risk
    composite_risk = base_risk * (
        0.30 * temp_modifier +
        0.25 * humidity_modifier +
        0.20 * rain_modifier +
        0.15 * regional_factor +
        0.10 * soil_factor
    )

    return min(composite_risk, 1.0)  # Cap at 100%
```

### 3.3 Alert Priority Matrix

| Risk Score | Alert Type | Lead Time | Channels |
|------------|-----------|-----------|----------|
| 0.85 - 1.0 | CRITICAL | 24-48 hrs | Push + SMS + Voice Call |
| 0.65 - 0.84 | WARNING | 3-5 days | Push + SMS |
| 0.45 - 0.64 | ADVISORY | 7-10 days | Push only |
| < 0.45 | WATCH | N/A | In-app dashboard |

---

## IV. Growing Calendar Agent

### 4.1 Personalization Engine

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        CALENDAR PERSONALIZATION ENGINE                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   INPUTS                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │                                                                          │       │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │       │
│   │  │   SEED       │  │   LOCATION   │  │   SOIL       │  │   PLANTING   │ │       │
│   │  │   VARIETY    │  │   (GPS)      │  │   PROFILE    │  │   DATE       │ │       │
│   │  │              │  │              │  │              │  │              │ │       │
│   │  │  - Maturity  │  │  - Climate   │  │  - Type      │  │  - Season    │ │       │
│   │  │  - Water req │  │  - Rainfall  │  │  - pH        │  │  - Timing    │ │       │
│   │  │  - Spacing   │  │  - Altitude  │  │  - Nutrients │  │  - Stagger   │ │       │
│   │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │       │
│   │                                                                          │       │
│   └────────────────────────────────────┬────────────────────────────────────┘       │
│                                        │                                             │
│                                        ▼                                             │
│   PROCESSING                                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │                                                                          │       │
│   │    AGRONOMIC RULE ENGINE                                                │       │
│   │    ├── Growth stage duration calculation                                │       │
│   │    ├── Irrigation schedule optimization                                 │       │
│   │    ├── Fertilizer timing based on soil test                            │       │
│   │    ├── Pest/disease surveillance windows                               │       │
│   │    └── Harvest window prediction                                        │       │
│   │                                                                          │       │
│   └────────────────────────────────────┬────────────────────────────────────┘       │
│                                        │                                             │
│                                        ▼                                             │
│   OUTPUT                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │                                                                          │       │
│   │    PERSONALIZED CALENDAR                                                 │       │
│   │    ├── Daily tasks with time-of-day recommendations                    │       │
│   │    ├── Push notification scheduling                                     │       │
│   │    ├── Weather-adaptive rescheduling                                    │       │
│   │    └── Progress tracking with milestone alerts                          │       │
│   │                                                                          │       │
│   └─────────────────────────────────────────────────────────────────────────┘       │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Task Categories

| Category | Examples | Frequency |
|----------|----------|-----------|
| Irrigation | Morning watering, drip check | Daily/As-needed |
| Nutrition | Fertilizer application, foliar spray | Weekly/Stage-based |
| Protection | Pesticide spray, disease surveillance | Weekly |
| Cultivation | Weeding, mulching, staking | As-needed |
| Harvest | Picking schedule, post-harvest handling | Stage-based |

---

## V. Voice Query Agent

### 5.1 Speech Processing Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          VOICE QUERY PROCESSING PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐      │
│   │  AUDIO  │───▶│    ASR      │───▶│   INTENT    │───▶│   ENTITY            │      │
│   │  INPUT  │    │   Engine    │    │   CLASSIFY  │    │   EXTRACTION        │      │
│   └─────────┘    └─────────────┘    └─────────────┘    └──────────┬──────────┘      │
│                                                                   │                  │
│   Languages:                                                      │                  │
│   - Hindi (हिन्दी)                                                 │                  │
│   - Telugu (తెలుగు)                                                │                  │
│   - Tamil (தமிழ்)                                                  │                  │
│   - Kannada (ಕನ್ನಡ)                                                │                  │
│   - Marathi (मराठी)                                                │                  │
│   - Gujarati (ગુજરાતી)                                             │                  │
│                                                                   │                  │
│                                                                   ▼                  │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐      │
│   │    TTS      │◀───│  RESPONSE   │◀───│   AGENT     │◀───│  QUERY          │      │
│   │  Synthesis  │    │  TEMPLATE   │    │   ROUTER    │    │  BUILDER        │      │
│   └─────────────┘    └─────────────┘    └─────────────┘    └─────────────────┘      │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Intent Categories

| Intent | Example Queries | Routed To |
|--------|----------------|-----------|
| DISEASE_QUERY | "मेरी फसल में बीमारी क्या है?" | Crop Doctor |
| TREATMENT_QUERY | "इसका इलाज कैसे करें?" | Knowledge Base |
| SCHEDULE_QUERY | "सिंचाई कब करनी चाहिए?" | Calendar Agent |
| WEATHER_QUERY | "कल बारिश होगी क्या?" | Weather Service |
| PRODUCT_QUERY | "बीज का दाम क्या है?" | Commerce Module |
| GENERAL_QUERY | Fallback | LLM with RAG |

### 5.3 Response Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| ASR Word Error Rate | < 15% | Automated testing |
| Intent Accuracy | > 92% | Confusion matrix |
| Response Relevance | > 4.2/5 | User feedback |
| TTS Naturalness | > 4.0/5 | MOS scores |
| End-to-End Latency | < 2.5s | P95 measurement |

---

## VI. Data Flow Architecture

### 6.1 Event-Driven Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              EVENT BUS (Kafka/Redis Streams)                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   PRODUCERS                              │                    CONSUMERS              │
│                                          │                                           │
│   ┌─────────────────┐                    │         ┌─────────────────────────┐      │
│   │ Mobile App      │ ───────────────────│────────▶│ Analytics Pipeline      │      │
│   │ - User actions  │                    │         │ - Usage metrics         │      │
│   │ - Photo uploads │                    │         │ - Behavior analysis     │      │
│   └─────────────────┘                    │         └─────────────────────────┘      │
│                                          │                                           │
│   ┌─────────────────┐                    │         ┌─────────────────────────┐      │
│   │ Weather Service │ ───────────────────│────────▶│ Alert Engine            │      │
│   │ - Hourly updates│                    │         │ - Risk recalculation    │      │
│   │ - Alerts        │                    │         │ - Notification trigger  │      │
│   └─────────────────┘                    │         └─────────────────────────┘      │
│                                          │                                           │
│   ┌─────────────────┐                    │         ┌─────────────────────────┐      │
│   │ Crop Doctor     │ ───────────────────│────────▶│ Training Pipeline       │      │
│   │ - Diagnoses     │                    │         │ - Model feedback loop   │      │
│   │ - Corrections   │                    │         │ - Active learning       │      │
│   └─────────────────┘                    │         └─────────────────────────┘      │
│                                          │                                           │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Feedback Loop for Model Improvement

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           CONTINUOUS LEARNING PIPELINE                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐       │
│   │ User    │────▶│ Prediction  │────▶│ User        │────▶│ Label           │       │
│   │ Query   │     │ Generated   │     │ Feedback    │     │ Correction      │       │
│   └─────────┘     └─────────────┘     └─────────────┘     └────────┬────────┘       │
│                                                                    │                 │
│                         ┌──────────────────────────────────────────┘                 │
│                         │                                                            │
│                         ▼                                                            │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │                     TRAINING DATA CURATION                               │       │
│   │                                                                          │       │
│   │   - Expert validation queue                                             │       │
│   │   - Confidence thresholding                                             │       │
│   │   - Duplicate detection                                                 │       │
│   │   - Class balancing                                                     │       │
│   │                                                                          │       │
│   └────────────────────────────────────┬────────────────────────────────────┘       │
│                                        │                                             │
│                                        ▼                                             │
│   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐               │
│   │ Model           │────▶│ A/B Testing     │────▶│ Production      │               │
│   │ Retraining      │     │ Validation      │     │ Deployment      │               │
│   └─────────────────┘     └─────────────────┘     └─────────────────┘               │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## VII. Privacy and Data Governance

### 7.1 Data Classification

| Data Type | Sensitivity | Retention | Encryption |
|-----------|-------------|-----------|------------|
| User Profile | High | Indefinite | At-rest + In-transit |
| Location (GPS) | High | 90 days | At-rest + In-transit |
| Farm Images | Medium | 365 days | At-rest |
| Voice Recordings | High | 30 days | At-rest + In-transit |
| Transaction Data | High | 7 years | At-rest + In-transit |
| Aggregated Analytics | Low | Indefinite | None required |

### 7.2 Consent Framework

- **Explicit Consent:** Required for location, voice recording, photo storage
- **Opt-out Mechanism:** Settings panel for data sharing preferences
- **Data Portability:** Export user data in machine-readable format
- **Right to Deletion:** Complete profile removal within 30 days of request

---

## VIII. Performance Requirements

### 8.1 System SLAs

| Service | Availability | Latency (P95) | Throughput |
|---------|-------------|---------------|------------|
| API Gateway | 99.9% | 100ms | 10K req/s |
| Crop Doctor | 99.5% | 2000ms | 500 req/s |
| Voice Processing | 99.5% | 2500ms | 200 req/s |
| Alert Dispatch | 99.99% | 500ms | 1K/s |
| Commerce | 99.95% | 300ms | 2K req/s |

### 8.2 Offline Resilience

- Disease library: Fully cached (~50MB)
- Product catalog: Cached with daily sync
- Calendar: Local-first with conflict resolution
- Voice: Requires connectivity (no offline mode)

---

*Document Version: 1.0*
*Last Updated: December 2024*
