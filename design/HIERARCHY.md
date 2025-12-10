# Kisan Mitra — Information Hierarchy & Content Architecture

## I. Navigation Hierarchy

```
ROOT
├── HOME (Dashboard)
│   ├── Weather Context
│   ├── Active Alerts
│   ├── Quick Actions
│   │   ├── Crop Doctor
│   │   ├── Voice Query
│   │   ├── My Calendar
│   │   └── Shop Seeds
│   └── My Active Crops
│
├── SHOP
│   ├── Product Catalog
│   │   ├── Category Filters
│   │   ├── Search
│   │   └── Sort (Price, Rating, Relevance)
│   ├── Product Detail
│   │   ├── [Tab] Specifications
│   │   ├── [Tab] Agronomy Guide
│   │   ├── [Tab] Field Videos
│   │   └── [Tab] Reviews
│   ├── Cart
│   └── Checkout
│       ├── Address Selection
│       ├── Payment Methods
│       └── Order Confirmation
│
├── LEARN (Disease Library)
│   ├── Crop Selector
│   ├── Growth Stage Timeline
│   ├── Disease Cards
│   │   ├── [Tab] Symptoms
│   │   ├── [Tab] Causes
│   │   ├── [Tab] Treatment
│   │   └── [Tab] Prevention
│   ├── Video Tutorials
│   └── Agronomic Reference
│
├── CALENDAR
│   ├── Monthly View
│   ├── Task List
│   ├── Crop Progress
│   └── Task Detail
│       ├── Instructions
│       ├── Inputs Required
│       └── Mark Complete
│
├── ALERTS
│   ├── Active Alerts
│   │   ├── Critical
│   │   ├── Warning
│   │   └── Advisory
│   ├── Alert Detail
│   │   ├── Risk Factors
│   │   ├── Recommended Actions
│   │   └── Related Products
│   └── Notification Settings
│
├── VIDEOS
│   ├── Geo-Sorted Feed
│   ├── Filter by Crop
│   ├── Filter by Language
│   └── Video Player
│       ├── Video Content
│       ├── Location Context
│       ├── Farmer Info
│       └── Related Product CTA
│
└── PROFILE
    ├── Farm Details
    ├── Location Settings
    ├── Language Preferences
    ├── Order History
    └── Support
```

---

## II. Content Depth Hierarchy

### Level 1: Glanceable
Visible immediately without interaction. Maximum 3 seconds to comprehend.

| Context | Content Type | Example |
|---------|-------------|---------|
| Dashboard | Weather summary | "28°C, Humidity 72%" |
| Dashboard | Alert count | "2 Alerts Require Attention" |
| Product Card | Price | "Rs 450 /10g" |
| Calendar | Today's tasks | "3 tasks due" |
| Video Card | Distance | "12 km away" |

### Level 2: Scannable
Visible on card or in list view. 10-15 seconds to scan.

| Context | Content Type | Example |
|---------|-------------|---------|
| Alert Banner | Summary + action | "Late blight risk elevated. Preventive spray recommended." |
| Product Card | Name + key benefit | "Tomato Hybrid 512 — High yield, disease resistant" |
| Disease Card | Name + risk level | "Early Blight — HIGH RISK" |
| Task Card | Time + activity | "06:00 AM — Morning Irrigation" |

### Level 3: Readable
Full detail view. 1-3 minutes to read completely.

| Context | Content Type | Sections |
|---------|-------------|----------|
| Product Detail | Complete specifications | Characteristics, Resistance, Suitability, Agronomy |
| Disease Detail | Full reference | Symptoms, Causes, Treatment Protocol, Prevention |
| Alert Detail | Risk analysis | Contributing Factors, Immediate Actions, Long-term Prevention |
| Video Detail | Context | Location, Farmer, Related Products, Transcript |

### Level 4: Educational
Deep reference content. 5-15 minutes to study.

| Context | Content Type | Purpose |
|---------|-------------|---------|
| Disease Library | Complete disease lifecycle | Self-diagnosis training |
| Agronomy Guide | Cultivation best practices | Skill building |
| Video Series | Multi-part demonstrations | Visual learning |
| Treatment Protocols | Step-by-step instructions | Actionable guidance |

---

## III. Tabbed Panel Architecture

### Pattern: Information Tabs

Tabs are used when content naturally segments into 3-5 distinct categories that a user may want to access non-linearly.

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                            │
│  │  Tab 1   │  │  Tab 2   │  │  Tab 3   │  │  Tab 4   │                            │
│  │ (Active) │  │          │  │          │  │          │                            │
│  └────┬─────┘  └──────────┘  └──────────┘  └──────────┘                            │
│       │                                                                             │
│  ┌────▼────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                              │   │
│  │                         TAB CONTENT AREA                                     │   │
│  │                                                                              │   │
│  │   - Full width of container                                                  │   │
│  │   - Scrollable if content exceeds viewport                                   │   │
│  │   - Maintains scroll position per tab                                        │   │
│  │                                                                              │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Tab Implementations

#### Product Detail Tabs
| Tab | Content | Purpose |
|-----|---------|---------|
| **Details** | Seed characteristics, resistance, suitability | Quick reference |
| **Agronomy** | Sowing, spacing, irrigation, fertilization | Growing guide |
| **Videos** | Field demonstrations by region | Visual proof |
| **Reviews** | Farmer feedback, ratings | Social proof |

#### Disease Card Tabs
| Tab | Content | Purpose |
|-----|---------|---------|
| **Symptoms** | Visual comparison, progression stages | Identification |
| **Causes** | Environmental triggers, vectors | Understanding |
| **Treatment** | Immediate actions, products, dosage | Action |
| **Prevention** | Cultural practices, resistant varieties | Long-term |

#### Crop Doctor Result Tabs
| Tab | Content | Purpose |
|-----|---------|---------|
| **Treatment** | Step-by-step protocol | Immediate action |
| **Prevention** | Avoid recurrence | Future protection |
| **Products** | Recommended inputs with purchase | Commerce |

#### Payment Method Tabs (Paytm example)
| Tab | Content | Purpose |
|-----|---------|---------|
| **Wallet** | Balance, direct debit | Quick pay |
| **UPI** | Bank account selection | Bank transfer |
| **Bank** | Net banking options | Traditional |

---

## IV. Data Display Standards

### Numerical Data

All numerical data uses `JetBrains Mono` for clarity and alignment.

```
TEMPERATURE        28°C              (no decimal for weather)
HUMIDITY           72%               (whole number)
DISTANCE           12.4 km           (one decimal)
PRICE              Rs 450            (no decimal for INR)
COORDINATES        19.8432° N        (four decimals for GPS)
PERCENTAGE         38%               (whole number for progress)
CONFIDENCE         87%               (whole number)
YIELD              35-40 t/ha        (range format)
DURATION           3:42              (MM:SS format)
DATE               Dec 10, 2024      (abbreviated month)
TIME               06:00 AM          (12-hour with AM/PM)
```

### Status Indicators

| Status | Color | Label Format |
|--------|-------|--------------|
| Critical | Terracotta `#C45D3E` | "CRITICAL" uppercase |
| Warning | Gold `#D4A84B` | "WARNING" uppercase |
| Advisory | Gold `#D4A84B` | "ADVISORY" uppercase |
| Success | Olive `#6B7B3C` | "Good" / "Healthy" sentence case |
| Neutral | Brown `#5D4E37` | Sentence case |

### Progress Representation

```
CROP PROGRESS
├── Bar: 6px height, rounded ends
├── Track: Parchment #E8E0D0
├── Fill: Crop-specific accent color
└── Label: "Day 45 of 120" + "38%"

CONFIDENCE METER
├── Bar: 6px height, rounded ends
├── Track: Parchment #E8E0D0
├── Fill: Olive #6B7B3C (>70%), Gold (40-70%), Terracotta (<40%)
└── Label: "87%" right-aligned
```

---

## V. Content Density by Screen

### High Density Screens
Complex information requiring careful layout.

| Screen | Elements | Strategy |
|--------|----------|----------|
| Disease Library | Timeline + cards + filters | Vertical scroll, collapsible sections |
| Crop Doctor Result | Image + diagnosis + tabs | Fixed image, scrollable content below |
| Product Detail | Hero + specs + tabs | Sticky tabs, scrollable content |
| Calendar | Month grid + task list | Split view on tablet/web |

### Medium Density Screens
Balanced information and whitespace.

| Screen | Elements | Strategy |
|--------|----------|----------|
| Dashboard | Weather + alerts + actions + crops | Card grid, priority ordering |
| Product Catalog | Search + filters + product grid | 2-column grid, infinite scroll |
| Video Feed | Location + filters + video cards | Single column, lazy load |

### Low Density Screens
Focused, single-purpose interfaces.

| Screen | Elements | Strategy |
|--------|----------|----------|
| Voice Interface | Language + mic + conversation | Maximum whitespace, focus on mic |
| Payment Sheet | Amount + method + button | Clear hierarchy, minimal distraction |
| Order Confirmation | Success + details | Celebration moment, clear next steps |

---

## VI. Reading Order & Visual Hierarchy

### Z-Pattern (Glanceable Content)
Used for cards and compact displays.

```
┌─────────────────────────────────────┐
│  1 ──────────────────────────► 2    │
│                                     │
│  3 ◄────────────────────────── 4    │
└─────────────────────────────────────┘

1: Primary identifier (title, name)
2: Status/badge (alert level, distance)
3: Supporting detail (description, location)
4: Action (button, price)
```

### F-Pattern (Readable Content)
Used for detail screens and lists.

```
┌─────────────────────────────────────┐
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │  ← Heading (full scan)
│  ━━━━━━━━━━━━━━━━━━━━━━━━           │  ← Subheading (partial scan)
│                                     │
│  ━━━━━━━━                           │  ← Content start
│  ━━━━━━━━━━━━━━                     │
│  ━━━━━━━━━━                         │
│                                     │
│  ━━━━━━━━                           │  ← New section
│  ━━━━━━━━━━━━━━━━                   │
└─────────────────────────────────────┘
```

---

## VII. Empty States & Edge Cases

### No Data States

| Context | Message | Action |
|---------|---------|--------|
| No crops registered | "Add your first crop to get started" | "Add Crop" button |
| No videos nearby | "No videos from your region yet" | Show other regions |
| No alerts | "All clear. No alerts at this time." | None needed |
| Search no results | "No seeds match your search" | Clear filters link |
| Cart empty | "Your cart is empty" | "Browse Seeds" button |

### Loading States

- Use skeleton screens matching content layout
- Never use spinners for primary content
- Show cached data while refreshing
- Progress indicator only for uploads/long operations

### Error States

| Error Type | Display | Recovery |
|------------|---------|----------|
| Network offline | Banner at top, cached content below | Auto-retry on reconnect |
| Payment failed | Modal with reason | Retry button, alternative method |
| Upload failed | Toast notification | Retry in queue |
| Location unavailable | Prompt for manual entry | Text input fallback |

---

## VIII. Accessibility Hierarchy

### Touch Targets
- Minimum: 44x44 points
- Recommended: 48x48 points
- Spacing between targets: 8px minimum

### Text Sizes
| Element | Minimum | Recommended |
|---------|---------|-------------|
| Body text | 14px | 16px |
| Secondary text | 12px | 14px |
| Labels | 10px | 11px |
| Headings | 16px | 18-24px |

### Color Contrast
- Text on background: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- Interactive elements: 3:1 against adjacent colors

---

*Document Version: 1.0*
*Last Updated: December 2024*
