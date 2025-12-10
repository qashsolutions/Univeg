# Kisan Mitra — Design Principles & Interaction Standards

## I. Core Aesthetic Philosophy

### The Guiding Metaphor

Kisan Mitra's design draws from the materiality of Indian agriculture: terracotta pots, hand-pressed seed packets, weathered almanacs, and the warm earth tones of cultivated fields. The interface should feel like a trusted reference—a premium agricultural handbook digitized—not a generic technology product.

### What We Are

| Attribute | Expression |
|-----------|------------|
| **Restrained** | Purposeful use of color; accent colors reserved for meaning |
| **Sophisticated** | Typographic hierarchy with serif headings; scholarly presentation |
| **Warm** | Earth tones over cold; terracotta, gold, olive, brown |
| **Tactile** | Physical-feeling interactions; weight and feedback |
| **Educational** | Content-rich; reference-quality information |
| **Trustworthy** | Data-forward; transparent confidence levels |

### What We Are Not

| Avoid | Reason |
|-------|--------|
| Neon colors | Feels cheap, temporary, unserious |
| Glows and shadows | Distracting, reduces readability |
| Emojis | Undermines professional credibility |
| Gradients | Dates quickly, distracts from content |
| Rounded "friendly" shapes | Infantilizing for professional farmers |
| Aggressive animations | Wastes time, feels gimmicky |
| Generic stock imagery | Breaks authenticity |

---

## II. Typography System

### Font Stack

```css
/* Headings — Scholarly, authoritative */
--font-heading: 'Playfair Display', 'Georgia', 'Times New Roman', serif;

/* Body — Clear, highly legible */
--font-body: 'Inter', -apple-system, 'Segoe UI', 'Roboto', sans-serif;

/* Data — Technical precision */
--font-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;

/* Regional Scripts — Native rendering */
--font-hindi: 'Noto Sans Devanagari', sans-serif;
--font-telugu: 'Noto Sans Telugu', sans-serif;
--font-tamil: 'Noto Sans Tamil', sans-serif;
--font-kannada: 'Noto Sans Kannada', sans-serif;
--font-marathi: 'Noto Sans Devanagari', sans-serif;
--font-gujarati: 'Noto Sans Gujarati', sans-serif;
```

### Type Scale

| Level | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| Display | Playfair | 28px | 600 | 1.2 | Hero titles |
| H1 | Playfair | 22px | 600 | 1.25 | Screen titles |
| H2 | Playfair | 18px | 600 | 1.3 | Section headers |
| H3 | Playfair | 16px | 600 | 1.35 | Card titles |
| H4 | Inter | 14px | 600 | 1.4 | Subsection headers |
| Body | Inter | 14px | 400 | 1.5 | Paragraph text |
| Body Small | Inter | 12px | 400 | 1.5 | Secondary text |
| Caption | Inter | 11px | 500 | 1.4 | Labels, timestamps |
| Overline | Inter | 10px | 500 | 1.3 | Category labels |
| Data | JetBrains Mono | 14px | 500 | 1.4 | Numbers, codes |
| Data Small | JetBrains Mono | 11px | 500 | 1.3 | Metrics, coordinates |

### Letter Spacing

| Context | Value | Example |
|---------|-------|---------|
| Overline labels | 1px | "ORDER DETAILS" |
| Uppercase badges | 0.5px | "CRITICAL" |
| Body text | 0 | Normal reading |
| Headings | -0.25px | Tighter for display |

---

## III. Color System

### Primary Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Terracotta** | `#C45D3E` | 196, 93, 62 | Primary CTA, critical alerts, tomato/chilli accent |
| **Harvest Gold** | `#D4A84B` | 212, 168, 75 | Secondary accent, warnings, voice interface |
| **Earth Brown** | `#5D4E37` | 93, 78, 55 | Headings, icons, navigation |
| **Olive** | `#6B7B3C` | 107, 123, 60 | Success, health, growth, Crop Doctor |
| **Cream** | `#F5F0E6` | 245, 240, 230 | Page background |
| **Parchment** | `#E8E0D0` | 232, 224, 208 | Card background, dividers |
| **Charcoal** | `#2D2D2D` | 45, 45, 45 | Body text |

### Semantic Colors

| Purpose | Color | Opacity Variants |
|---------|-------|------------------|
| Error/Critical | Terracotta | 100%, 12% (background) |
| Warning | Harvest Gold | 100%, 12% (background) |
| Success | Olive | 100%, 12% (background) |
| Info | Earth Brown | 100%, 8% (background) |
| Disabled | Earth Brown | 40% |
| Placeholder | Earth Brown | 50% |

### Color Application Rules

1. **Accent colors carry meaning.** Never use Terracotta decoratively—it signals urgency.
2. **Maximum two accent colors per screen.** One primary action, one status indicator.
3. **Backgrounds are neutral.** Cream and Parchment only for surfaces.
4. **Text is always high contrast.** Charcoal on Cream (12.5:1 ratio).
5. **Icons match their label color.** Never accent-colored icons with neutral labels.

---

## IV. Sound Design System

### Philosophy

Sound in Kisan Mitra is **physical and organic**—inspired by natural materials and traditional farming sounds. Audio feedback should feel like tactile confirmation: the satisfying click of a seed packet opening, the soft thud of soil being packed, the gentle chime of a temple bell.

### Sound Categories

#### Confirmation Sounds (Success)
| Action | Sound Character | Duration |
|--------|-----------------|----------|
| Task completed | Soft wooden knock | 120ms |
| Payment success | Warm bell tone, single | 400ms |
| Photo captured | Subtle shutter click | 80ms |
| Voice recognized | Soft ascending tone | 200ms |

#### Alert Sounds (Attention)
| Priority | Sound Character | Duration |
|----------|-----------------|----------|
| Critical | Double knock, firm | 300ms |
| Warning | Single mid-tone bell | 250ms |
| Advisory | Soft notification | 150ms |

#### Navigation Sounds
| Action | Sound Character | Duration |
|--------|-----------------|----------|
| Tab switch | Very soft tap | 40ms |
| Button press | Subtle click | 30ms |
| Pull to refresh | Soft whoosh | 200ms |
| Page transition | Silent | — |

#### System Sounds
| Event | Sound Character | Duration |
|-------|-----------------|----------|
| Error | Low thud, single | 150ms |
| Offline mode | Descending tone | 200ms |
| Upload complete | Bright chime | 250ms |

### Haptic Feedback (Android)

| Action | Haptic Type | Intensity |
|--------|-------------|-----------|
| Button press | Light impact | 40% |
| Successful action | Medium impact | 60% |
| Error | Double tap | 50% |
| Long press confirm | Heavy impact | 80% |
| Slider drag | Tick (per step) | 20% |

### Audio Implementation Notes

```
SAMPLE SPECIFICATIONS
├── Format: AAC or OGG (platform-dependent)
├── Sample rate: 44.1kHz
├── Bit depth: 16-bit
├── Channels: Mono
└── Peak level: -6dB (headroom for device variance)

PLAYBACK RULES
├── Never interrupt voice output
├── Respect device silent mode
├── Volume tied to system media volume
└── Preload common sounds on app launch
```

---

## V. Interaction Patterns

### Touch Interactions

| Gesture | Action | Feedback |
|---------|--------|----------|
| Tap | Primary action | Ripple (subtle), haptic tick |
| Long press | Secondary action / context menu | Haptic heavy, slight scale |
| Swipe horizontal | Navigate tabs, dismiss | Snap to position |
| Swipe vertical | Scroll | Native momentum |
| Pull down | Refresh | Icon animation, haptic on release |
| Pinch | Zoom (images only) | Native gesture |

### Button States

```
DEFAULT
├── Background: Solid color
├── Border: None
└── Label: White or contrast color

PRESSED
├── Background: 10% darker
├── Scale: 98%
└── Haptic: Light impact

DISABLED
├── Background: 40% opacity
├── Label: 40% opacity
└── Interaction: None

LOADING
├── Label: Hidden
├── Spinner: Replaced with pulsing dot
└── Interaction: Blocked
```

### Transitions

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Page push | 300ms | ease-out | Forward navigation |
| Page pop | 250ms | ease-in | Back navigation |
| Modal present | 300ms | ease-out | Bottom sheets |
| Modal dismiss | 200ms | ease-in | Swipe or button close |
| Tab switch | 150ms | linear | Horizontal tab change |
| Accordion expand | 200ms | ease-in-out | Content reveal |
| Fade | 150ms | linear | Opacity changes |

### Loading Patterns

| Context | Pattern | Notes |
|---------|---------|-------|
| Initial page load | Skeleton screen | Match content layout exactly |
| Image loading | Blur-up | Low-res placeholder → sharp |
| List pagination | Spinner at bottom | Only below existing content |
| Background sync | Silent | No visible indicator |
| Upload | Progress bar | Show percentage, cancel option |
| AI processing | Pulsing indicator | "Analyzing..." text |

---

## VI. Component Specifications

### Cards

```
STANDARD CARD
├── Background: White (#FFFFFF)
├── Border: 1px solid Parchment (#E8E0D0)
├── Border radius: 8px
├── Padding: 16px
├── Shadow: None (flat design)
└── Margin between cards: 16px

ACCENT CARD (alerts, CTAs)
├── Background: Accent color at 8% opacity
├── Border: 1px solid accent color
├── Left accent bar: 4px solid accent (optional)
└── Everything else: Same as standard
```

### Buttons

```
PRIMARY BUTTON
├── Background: Terracotta (#C45D3E)
├── Text: White
├── Height: 48px
├── Border radius: 8px
├── Font: Inter 14px 600
└── Min width: 120px

SECONDARY BUTTON
├── Background: Transparent
├── Border: 1.5px solid Earth Brown
├── Text: Earth Brown
└── Everything else: Same as primary

TERTIARY BUTTON (text only)
├── Background: None
├── Text: Terracotta
├── Underline: None
└── Height: Auto (inline)
```

### Form Inputs

```
TEXT INPUT
├── Background: White
├── Border: 1px solid Parchment
├── Border (focused): 2px solid Earth Brown
├── Height: 48px
├── Border radius: 8px
├── Padding: 0 16px
├── Font: Inter 14px 400
└── Placeholder: Earth Brown at 50%

DROPDOWN
├── Same as text input
├── Chevron: Earth Brown, right-aligned
└── Options: Native picker on mobile

CHECKBOX / RADIO
├── Size: 24x24px
├── Border: 1.5px solid Earth Brown
├── Selected fill: Olive (checkbox) / Terracotta (radio)
└── Checkmark: White
```

### Tabs

```
TAB BAR
├── Background: Parchment
├── Height: 48px
├── Border radius: 8px (container), 6px (tabs)
└── Padding: 4px

ACTIVE TAB
├── Background: White
├── Text: Earth Brown
├── Font: Inter 12px 600
└── Shadow: None

INACTIVE TAB
├── Background: Transparent
├── Text: Earth Brown at 60%
└── Font: Inter 12px 400
```

### Badges

```
STATUS BADGE
├── Background: Semantic color
├── Text: White
├── Height: 24px
├── Padding: 0 12px
├── Border radius: 4px
├── Font: Inter 10px 600
└── Letter spacing: 0.5px

DISTANCE BADGE
├── Background: Distance color (see hierarchy)
├── Text: White
├── Font: JetBrains Mono 10px 500
└── Format: "12 km away"
```

---

## VII. Iconography

### Style Guidelines

| Attribute | Specification |
|-----------|---------------|
| Style | Outlined, 1.5px stroke |
| Size | 24x24px (standard), 16x16px (compact) |
| Color | Inherit from context |
| Corner radius | 2px for rectangles |
| Grid | 24x24 with 2px padding |

### Icon Usage

| Context | Icon Color | Size |
|---------|------------|------|
| Navigation (active) | Terracotta | 24px |
| Navigation (inactive) | Earth Brown 40% | 24px |
| Card actions | Earth Brown | 24px |
| Inline with text | Same as text | 16px |
| Status indicators | Semantic color | 20px |

### Required Icons

```
NAVIGATION
├── home
├── shop / store
├── book / learn
├── calendar
├── user / profile
└── bell / notifications

ACTIONS
├── camera
├── microphone
├── search
├── filter
├── sort
├── share
├── download
└── edit

STATUS
├── check-circle (success)
├── alert-triangle (warning)
├── alert-circle (error)
├── info-circle (info)
└── clock (pending)

CONTENT
├── play (video)
├── location-pin
├── thermometer
├── droplet (humidity)
├── sun / cloud (weather)
└── leaf (crop)

COMMERCE
├── cart
├── credit-card / upi
├── truck (delivery)
└── receipt
```

---

## VIII. Photography & Imagery

### Photo Guidelines

| Subject | Style | Purpose |
|---------|-------|---------|
| Seed packets | Studio lit, white/cream background | Product display |
| Field crops | Natural light, real farm settings | Authenticity |
| Disease symptoms | Clinical close-up, healthy comparison | Education |
| Farmers | Environmental portrait, respectful | Trust |

### Image Treatment

```
PRODUCT IMAGES
├── Background: Transparent or soft cream
├── Shadow: None (flat)
├── Aspect ratio: 1:1 (thumbnails), 4:3 (detail)
└── Resolution: 2x for retina

FIELD PHOTOS
├── Color: Natural, no filters
├── Crop: Subject fills 60%+ of frame
└── Aspect ratio: 16:9 (video), 4:3 (stills)

DISEASE REFERENCE
├── Layout: Side-by-side healthy/affected
├── Annotation: Arrows pointing to symptoms
├── Background: Neutral (blur if distracting)
└── Aspect ratio: 1:1
```

### Placeholder Images

- Use skeleton loading (matching aspect ratio)
- Fallback: Solid Parchment with crop icon centered
- Never use generic stock photos as placeholders

---

## IX. Motion Principles

### Timing

| Speed | Duration | Usage |
|-------|----------|-------|
| Instant | 0-100ms | Micro-interactions, state changes |
| Fast | 100-200ms | Button feedback, hover states |
| Normal | 200-300ms | Page transitions, modals |
| Slow | 300-500ms | Complex animations, celebrations |

### Easing

| Curve | Usage |
|-------|-------|
| ease-out | Entering elements (starting fast, ending slow) |
| ease-in | Exiting elements (starting slow, ending fast) |
| ease-in-out | Moving elements (symmetric) |
| linear | Opacity, color transitions |

### What NOT to Animate

- Text content changes (instant swap)
- Number changes (instant unless explicitly counting)
- Scroll position (native only)
- Background colors on large surfaces
- Multiple simultaneous animations

---

## X. Responsive Behavior

### Breakpoints

| Name | Width | Target |
|------|-------|--------|
| Mobile | 0-599px | Phones |
| Tablet | 600-1023px | Tablets, small laptops |
| Desktop | 1024px+ | Desktop browsers |

### Layout Adaptations

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Product grid | 2 columns | 3 columns | 4 columns |
| Navigation | Bottom bar | Side rail | Top bar + sidebar |
| Cards | Full width | 2-up | 3-up |
| Calendar | List view | Week view | Month view |
| Tabs | Scrollable | Visible | Visible |

---

*Document Version: 1.0*
*Last Updated: December 2024*
