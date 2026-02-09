# [ARCHIVED] everaftr — Brand Guide v2: Woven Heritage

> **THIS DOCUMENT IS ARCHIVED.** The Woven Heritage design system has been retired.
> The active brand guide is `HARAYA-BRAND-STRATEGY.md`.
> This file is preserved for historical reference only. Do not use for new development.

**Version:** 2.0 — Woven Heritage (ARCHIVED)
**Last Updated:** February 7, 2026
**Superseded:** February 9, 2026 by HARAYA-BRAND-STRATEGY.md

---

## 1. Brand Overview

### What is everaftr?
The Philippines' first **inclusive, AI-powered wedding and celebration planning platform**. It combines a vendor directory, planning tools, community, and AI assistant — built for **every couple**, not just brides.

### Brand Name
- **Primary:** `everaftr` (one word, all lowercase, always)
- **Never:** "EverAftr", "Ever Aftr", "Everaftr", "EVERAFTR"
- The name is two halves: `ever` + `aftr` (4+4 letter symmetry)

### Tagline
- **Primary:** `where forevr begins`
- **Secondary:** `plan together, celebrate forevr`
- **Tertiary:** `your celebration, your way`
- **Marketing:** `for every couple. every love story. every celebration.`

### The Dropped-E Signature
The missing "e" in `everaftr` is a deliberate brand signature. It extends to:
- `forevr` (tagline)
- `togethr` (campaigns)
- `remembr` (post-wedding features)
- `discovr` (vendor search)

Use sparingly and intentionally — max one dropped-e word per page/screen beyond the brand name.

---

## 2. Design Philosophy: Woven Heritage

### The Concept
everaftr's visual identity is rooted in **six Filipino textile weaving traditions**. Each section of the platform draws its color personality from a different tradition — creating a culturally rich experience that feels modern, not museum-like.

**The rule:** The base UI stays **clean, spacious, and modern**. The textile influence is **felt, not shouted** — appearing as colors, subtle background textures, accent borders, and the signature woven border element.

### The Weave Map (Section → Tradition)

| App Section | Textile Tradition | Region | Symbolism | Primary Colors |
|-------------|-------------------|--------|-----------|----------------|
| **Homepage** | Piña | Aklan / Kalibo | Elegance, celebration, the "Queen of Fabrics" | Ivory, Cream, Gold Sheen |
| **Directory** | Inabel | Ilocos | Protection, trust, geometric precision | Indigo, Red, Gold |
| **Real Celebrations** | T'nalak | South Cotabato / T'boli | Dreams, stories, heritage | Heritage Red, Earth, Black |
| **Planner** | Hablon | Iloilo / Visayas | Everyday life, structure, practicality | Green, Blue, Gold |
| **Community** | Yakan | Zamboanga / Basilan | Boldness, diversity, vibrant voices | Fuchsia, Teal, Orange |
| **AI Assistant** | Langkit | Lanao / Maranao | Binding, connecting, wisdom | Magenta, Gold, Violet |

---

## 3. Color System

### 3.1 CSS Variables (Copy-Paste Ready)

```css
:root {
  /* ═══ PIÑA — Homepage / Base ═══ */
  --pina-ivory: #F5EDD8;
  --pina-cream: #EDE4CC;
  --pina-sheen: #D4C9A8;

  /* ═══ T'NALAK — Real Celebrations / Primary Brand ═══ */
  --tnalak-black: #2A2520;
  --tnalak-red: #8B3A3A;
  --tnalak-earth: #5C3D2E;

  /* ═══ INABEL — Directory ═══ */
  --inabel-red: #C73E3A;
  --inabel-indigo: #3D4F7C;
  --inabel-gold: #C4962E;
  --inabel-cream: #F0E8D4;

  /* ═══ HABLON — Planner ═══ */
  --hablon-green: #4A7C59;
  --hablon-yellow: #D4A843;
  --hablon-blue: #4A6FA5;

  /* ═══ YAKAN — Community ═══ */
  --yakan-fuchsia: #B84C65;
  --yakan-teal: #2D7D7B;
  --yakan-orange: #D4764E;

  /* ═══ LANGKIT — AI Assistant ═══ */
  --langkit-magenta: #A63D5C;
  --langkit-gold: #C9A84C;
  --langkit-violet: #5C4A7C;

  /* ═══ SEMANTIC TOKENS ═══ */
  --bg-primary: #FDFAF3;
  --bg-warm: #F5EDD8;
  --bg-deep: #2A2520;
  --text-primary: #2A2520;
  --text-secondary: #6B5E52;
  --text-on-dark: #F5EDD8;
  --border: #D9CEBC;
  --accent-primary: #8B3A3A;
  --accent-success: #4A7C59;
  --accent-warning: #D4A843;
  --accent-error: #C73E3A;
  --accent-info: #3D4F7C;
}
```

### 3.2 Color Details

#### Base / Background Colors (From Piña)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **App Background** | `#FDFAF3` | 253, 250, 243 | Main page background, default |
| **Piña Ivory** | `#F5EDD8` | 245, 237, 216 | Card backgrounds, warm sections, homepage |
| **Piña Cream** | `#EDE4CC` | 237, 228, 204 | Secondary surfaces, hover states |
| **Piña Sheen** | `#D4C9A8` | 212, 201, 168 | Disabled states, subtle accents |
| **Border** | `#D9CEBC` | 217, 206, 188 | All borders, dividers, outlines |

#### Text Colors (From T'nalak)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Loom Black** | `#2A2520` | 42, 37, 32 | Primary text, headers |
| **Text Soft** | `#6B5E52` | 107, 94, 82 | Secondary text, captions, meta |
| **Text on Dark** | `#F5EDD8` | 245, 237, 216 | Text on dark backgrounds |

#### Primary Brand Color (From T'nalak)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Heritage Red** | `#8B3A3A` | 139, 58, 58 | Brand wordmark, primary CTAs, links |
| **Earth** | `#5C3D2E` | 92, 61, 46 | Hover/active state for Heritage Red |

#### Directory Section (From Inabel)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Binakol Red** | `#C73E3A` | 199, 62, 58 | Error states, alerts, urgent badges |
| **Indigo** | `#3D4F7C` | 61, 79, 124 | Directory accent, filter chips, trust indicators |
| **Turmeric Gold** | `#C4962E` | 196, 150, 46 | Ratings, stars, premium badges, highlights |

#### Planner Section (From Hablon)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Dahon Green** | `#4A7C59` | 74, 124, 89 | Success states, progress bars, completed items |
| **Hablon Gold** | `#D4A843` | 212, 168, 67 | Warning states, pending items |
| **Dagat Blue** | `#4A6FA5` | 74, 111, 165 | Info states, links within planner |

#### Community Section (From Yakan)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Tennun Fuchsia** | `#B84C65` | 184, 76, 101 | Community accents, reactions, highlight tags |
| **Basilan Teal** | `#2D7D7B` | 45, 125, 123 | Community secondary, thread categories |
| **Sunset** | `#D4764E` | 212, 118, 78 | Community tertiary, notifications |

#### AI Assistant (From Langkit)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Okir Magenta** | `#A63D5C` | 166, 61, 92 | AI accent, suggestion highlights |
| **Sarimanok Gold** | `#C9A84C` | 201, 168, 76 | AI recommendations, premium features |
| **Lanao Violet** | `#5C4A7C` | 92, 74, 124 | AI secondary, insight cards |

### 3.3 Color Usage Rules

1. **Never use colors from the wrong section.** The directory should use Inabel colors, not Yakan. The planner uses Hablon, not Langkit.
2. **Base colors (Piña + T'nalak text) are universal.** Background, text, and borders are the same everywhere.
3. **Heritage Red (`#8B3A3A`) is the global brand accent.** It appears in the wordmark, primary CTAs, and shared elements (navigation, footer) regardless of section.
4. **Section colors are for accents only.** They appear in badges, icons, progress bars, borders, and highlights — never as large background fills (except in the woven border).
5. **Dark mode:** Invert backgrounds to `--tnalak-black` (#2A2520), text to `--pina-ivory` (#F5EDD8). Accent colors stay the same but may need 10-15% brightness increase.

---

## 4. The Woven Border — Signature Element

The multi-colored woven border is everaftr's most recognizable visual element. It appears at the top of every page and in key brand touchpoints.

### 4.1 CSS Implementation

```css
/* Full width — page top, email headers */
.woven-border {
  height: 6px;
  background: repeating-linear-gradient(90deg,
    #8B3A3A 0px, #8B3A3A 16px,     /* T'nalak Red — Heritage */
    #3D4F7C 16px, #3D4F7C 32px,     /* Inabel Indigo — Trust */
    #4A7C59 32px, #4A7C59 48px,     /* Hablon Green — Growth */
    #C4962E 48px, #C4962E 64px,     /* Inabel Gold — Joy */
    #B84C65 64px, #B84C65 80px,     /* Yakan Fuchsia — Diversity */
    #5C4A7C 80px, #5C4A7C 96px      /* Langkit Violet — Wisdom */
  );
}

/* Thin — section dividers, card accents */
.woven-border-thin {
  height: 3px;
  background: repeating-linear-gradient(90deg,
    #8B3A3A 0px, #8B3A3A 12px,
    #3D4F7C 12px, #3D4F7C 24px,
    #4A7C59 24px, #4A7C59 36px,
    #C4962E 36px, #C4962E 48px,
    #B84C65 48px, #B84C65 60px,
    #5C4A7C 60px, #5C4A7C 72px
  );
}

/* Vertical — sidebar accent */
.woven-side {
  width: 4px;
  background: repeating-linear-gradient(180deg,
    #8B3A3A 0px, #8B3A3A 10px,
    #3D4F7C 10px, #3D4F7C 20px,
    #4A7C59 20px, #4A7C59 30px,
    #C4962E 30px, #C4962E 40px,
    #B84C65 40px, #B84C65 50px,
    #5C4A7C 50px, #5C4A7C 60px
  );
}
```

### 4.2 Section-Specific Top Borders

Each section gets its own gradient border using its tradition's colors:

```css
/* Directory — Inabel */
.border-directory {
  height: 3px;
  background: linear-gradient(90deg, #3D4F7C, #C73E3A, #C4962E, #3D4F7C);
}

/* Planner — Hablon */
.border-planner {
  height: 3px;
  background: linear-gradient(90deg, #4A7C59, #4A6FA5, #D4A843, #4A7C59);
}

/* Real Celebrations — T'nalak */
.border-celebrations {
  height: 3px;
  background: linear-gradient(90deg, #8B3A3A, #5C3D2E, #8B3A3A);
}

/* Community — Yakan */
.border-community {
  height: 3px;
  background: linear-gradient(90deg, #B84C65, #2D7D7B, #D4764E, #B84C65);
}

/* AI Assistant — Langkit */
.border-ai {
  height: 3px;
  background: linear-gradient(90deg, #A63D5C, #C9A84C, #5C4A7C, #A63D5C);
}
```

### 4.3 Where to Use

| Placement | Type | Height/Width |
|-----------|------|--------------|
| Page top (below nav) | Full woven border | 6px height |
| Section dividers | Thin woven border | 3px height |
| Card left borders | Vertical woven side | 4px width |
| Email header | Full woven border | 6px height |
| Loading skeleton | Animated woven border | 3px, shimmer animation |
| App splash screen | Full woven border | 6px, centered |
| Footer top | Full woven border | 6px height |
| 404/empty states | Thin woven border | 3px, as decorative accent |

### 4.4 Color Key (for the woven border)
Each stripe represents a value:
- **Heritage Red** (#8B3A3A) — T'nalak — Heritage & Stories
- **Indigo** (#3D4F7C) — Inabel — Trust & Protection
- **Dahon Green** (#4A7C59) — Hablon — Growth & Everyday Life
- **Turmeric Gold** (#C4962E) — Inabel — Joy & Celebration
- **Tennun Fuchsia** (#B84C65) — Yakan — Diversity & Boldness
- **Lanao Violet** (#5C4A7C) — Langkit — Wisdom & Connection

---

## 5. Textile Background Patterns (CSS-Only)

Subtle textile-inspired textures for section backgrounds. These should be barely visible (opacity 0.03–0.06) — they create atmosphere without distracting from content.

### 5.1 Pattern Definitions

```css
/* Inabel Binakol — crossing diagonals (Directory) */
.pattern-inabel {
  background-image:
    repeating-linear-gradient(45deg,
      transparent, transparent 8px,
      rgba(61,79,124,0.06) 8px, rgba(61,79,124,0.06) 9px),
    repeating-linear-gradient(-45deg,
      transparent, transparent 8px,
      rgba(61,79,124,0.06) 8px, rgba(61,79,124,0.06) 9px);
}

/* T'nalak Dreamweave — angular crossing (Real Celebrations) */
.pattern-tnalak {
  background-image:
    repeating-linear-gradient(60deg,
      transparent, transparent 12px,
      rgba(139,58,58,0.05) 12px, rgba(139,58,58,0.05) 13px),
    repeating-linear-gradient(-60deg,
      transparent, transparent 12px,
      rgba(139,58,58,0.05) 12px, rgba(139,58,58,0.05) 13px);
}

/* Hablon Plaid — grid lines (Planner) */
.pattern-hablon {
  background-image:
    repeating-linear-gradient(0deg,
      transparent, transparent 20px,
      rgba(74,124,89,0.04) 20px, rgba(74,124,89,0.04) 21px),
    repeating-linear-gradient(90deg,
      transparent, transparent 20px,
      rgba(74,124,89,0.04) 20px, rgba(74,124,89,0.04) 21px);
}

/* Yakan Diamond — bold diagonal cross (Community) */
.pattern-yakan {
  background-image:
    repeating-linear-gradient(45deg,
      transparent, transparent 14px,
      rgba(184,76,101,0.05) 14px, rgba(184,76,101,0.05) 15px),
    repeating-linear-gradient(135deg,
      transparent, transparent 14px,
      rgba(45,125,123,0.05) 14px, rgba(45,125,123,0.05) 15px);
}

/* Langkit Okir — flowing radials (AI Assistant) */
.pattern-langkit {
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(166,61,92,0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 50%);
}

/* Piña Weave — fine crosshatch (Homepage) */
.pattern-pina {
  background-image:
    repeating-linear-gradient(45deg,
      transparent, transparent 6px,
      rgba(212,201,168,0.08) 6px, rgba(212,201,168,0.08) 7px),
    repeating-linear-gradient(-45deg,
      transparent, transparent 6px,
      rgba(212,201,168,0.08) 6px, rgba(212,201,168,0.08) 7px);
}
```

### 5.2 Usage Rules
- Apply patterns to **section-level containers only** (full-page or full-section backgrounds)
- **Never** apply to cards, buttons, or small components
- Patterns are additive — apply them on top of the section's background color
- Keep opacity between 0.03–0.08 (the values above are already calibrated)

---

## 6. Typography

### 6.1 Font Stack

```css
/* Primary — Jost (Google Fonts) */
font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;

/* Accent — Cormorant Garamond (Google Fonts) */
font-family: 'Cormorant Garamond', Georgia, serif;
```

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet">
```

### 6.2 Type Scale

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Brand wordmark | Jost | 200 (ExtraLight) | 20-36px | 1 | 0.15-0.2em | Heritage Red |
| Page title (H1) | Cormorant Garamond | 300 (Light) | 36-64px | 1.1-1.2 | 0 | Loom Black |
| Section title (H2) | Cormorant Garamond | 400 (Regular) | 28-42px | 1.2 | 0 | Loom Black |
| Card title (H3) | Jost | 500 (Medium) | 18-22px | 1.3 | 0 | Loom Black |
| Subsection (H4) | Jost | 500 (Medium) | 16-18px | 1.4 | 0 | Loom Black |
| Body text | Jost | 300 (Light) | 15-16px | 1.7 | 0 | Loom Black |
| Secondary text | Jost | 300 (Light) | 13-14px | 1.6 | 0 | Text Soft |
| Section label | Jost | 500 (Medium) | 10-11px | 1 | 0.2-0.3em | Text Soft |
| Button text | Jost | 400 (Regular) | 13px | 1 | 0.08em | varies |
| Input text | Jost | 300 (Light) | 14px | 1.5 | 0 | Loom Black |
| Caption / meta | Jost | 300 (Light) | 11-12px | 1.4 | 0.05em | Text Soft |
| Pull quote / editorial | Cormorant Garamond | 300 italic | 22-32px | 1.4-1.5 | 0 | Loom Black |
| Tagline | Cormorant Garamond | 300 italic | 18-22px | 1.3 | 0.05em | Heritage Red |

### 6.3 When to Use Each Font

**Cormorant Garamond** (the heritage voice):
- Page titles / H1 headings
- Section headings
- Pull quotes and editorial moments
- Taglines and brand messaging
- Real Celebration story titles
- Empty state messages
- Onboarding screens

**Jost** (the modern voice):
- Brand wordmark
- Body text
- Navigation and UI labels
- Buttons and form elements
- Card titles
- Data displays (budgets, stats, counts)
- Section labels (uppercase, tracked)
- Everything functional

### 6.4 System Fallbacks (for PDF/print/email)
- Jost → **Lato** (available as system font)
- Cormorant Garamond → **Lora** (available as system font)

---

## 7. Logo System

### 7.1 Primary Wordmark
```
everaftr
```
- Font: Jost ExtraLight (200)
- Letter-spacing: 0.15em
- Color: Heritage Red (#8B3A3A) on light backgrounds
- Color: Piña Ivory (#F5EDD8) on dark backgrounds
- The 4+4 letter symmetry (ever|aftr) creates natural visual balance

### 7.2 Stacked Mark (Square Formats)
```
ever
aftr
```
- For: social media avatars, app icon, favicon, profile badges
- Same font/weight as primary
- Two lines, centered

### 7.3 Brand Mark — e·a Monogram
- A single glyph that reads as "e" upright and "a" inverted
- For: favicon, app icon, watermark, loading spinner
- Represents two partners in one symbol

### 7.4 Logo Clear Space
- Minimum clear space around wordmark: 1x height of the letter "e"
- Never place the logo on busy backgrounds without sufficient contrast
- Never stretch, skew, or recolor the logo outside approved colors

### 7.5 Logo Don'ts
- Never use all caps: ~~EVERAFTR~~
- Never add the missing "e" back: ~~everafter~~
- Never separate with a space: ~~ever aftr~~
- Never use different fonts for the logo
- Never place on backgrounds with insufficient contrast

---

## 8. Inclusive Design Requirements

### 8.1 Language Rules (MANDATORY)

| Instead of | Use |
|------------|-----|
| Bride / Groom | Partner 1 / Partner 2 (or custom names) |
| Bride's checklist | Your checklist |
| Bridal party | Wedding party / Your crew |
| Maid of Honor / Best Man | (Customizable role names) |
| Mr. & Mrs. | (Couple's chosen title) |
| Bride and groom | The couple |
| Bridesmaids / Groomsmen | Attendants / Wedding party |
| Wedding | Celebration (where appropriate) |
| His and hers | Theirs / Both partners |

### 8.2 Forms & Data
- All relationship fields: `Partner 1` / `Partner 2` with option to customize labels
- Gender field: optional, free-text (never required, never binary dropdown)
- Wedding party roles: fully customizable text input (no hardcoded gendered roles)
- Ceremony type: Church (Catholic), Church (INC), Church (Other), Muslim, Civil, Civil Union, Other
- Pronoun fields: optional, displayed if provided

### 8.3 Onboarding Flow
- "Who's planning?" → Both of us / Just me / With a planner
- Never assume one partner is more "in charge"
- Show diverse couple illustrations/photos from the start

### 8.4 Vendor Badges
- **"All Celebrations Welcome"** badge — vendors opt-in to indicate LGBTQ+ friendliness
- Displayed prominently on vendor cards and profiles
- Badge color: Lanao Violet (#5C4A7C) background, white text

### 8.5 Imagery & Content
- Real Celebrations section must feature diverse couples (straight, LGBTQ+, intercultural, different ceremony types)
- Marketing materials show both partners planning, not just one
- Stock imagery avoids exclusively traditional bride-in-white-gown defaults
- Community content moderation protects against discrimination

---

## 9. Component Patterns

### 9.1 Buttons

```css
/* Primary CTA — Heritage Red */
.btn-primary {
  padding: 12px 32px;
  background: #8B3A3A;
  color: #F5EDD8;
  border: none;
  border-radius: 4px;
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background 0.3s ease;
}
.btn-primary:hover { background: #5C3D2E; }

/* Secondary — Outlined */
.btn-outline {
  padding: 12px 32px;
  background: transparent;
  color: #2A2520;
  border: 1px solid #D9CEBC;
  border-radius: 4px;
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: border-color 0.3s ease;
}
.btn-outline:hover { border-color: #2A2520; }
```

### 9.2 Cards
- Background: `#FDFAF3` (app bg) or `#F5EDD8` (warm)
- Border: `1px solid #D9CEBC`
- Border-radius: `8px`
- Hover: `translateY(-2px)` + `box-shadow: 0 8px 30px rgba(42,37,32,0.08)`
- No drop shadows by default (only on hover)

### 9.3 Filter Chips / Tags
- Border: `1px solid #D9CEBC`
- Border-radius: `3px`
- Font: 11px, 0.05em letter-spacing
- Active state: section's accent color for border + light tinted background

### 9.4 Form Inputs
- Border: `1px solid #D9CEBC`
- Border-radius: `4px`
- Focus: border changes to section accent color
- Background: `#FDFAF3`
- Placeholder: `#D4C9A8`

### 9.5 Vendor Badges

```css
.badge-verified {
  background: #4A7C59; /* Hablon Green */
  color: white;
  padding: 3px 8px;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
}

.badge-all-welcome {
  background: #5C4A7C; /* Lanao Violet */
  color: white;
  padding: 3px 8px;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
}

.badge-featured {
  background: #C9A84C; /* Sarimanok Gold */
  color: white;
  padding: 3px 8px;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
}
```

### 9.6 Progress Bars (Planner)
```css
.progress-bar {
  height: 6px;
  background: #D9CEBC;
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, #4A7C59, #4A6FA5);
}
```

### 9.7 Star Ratings
- Color: Turmeric Gold (#C4962E)
- Size: 14px for cards, 18px for detail pages
- Empty stars: Border (#D9CEBC)

---

## 10. Spacing & Layout

### 10.1 Spacing Scale
```
4px  — micro (icon gaps, badge padding)
8px  — small (between related elements)
12px — compact (card internal gaps)
16px — default (between cards, list items)
24px — medium (between groups)
32px — large (section padding on cards)
40px — section (page horizontal padding)
60px — major (between sections)
100px — section vertical padding
```

### 10.2 Max Widths
- Content area: `1200px`
- Text content: `640px` (descriptions, paragraphs)
- Hero text: `800px`

### 10.3 Border Radius
- Cards: `8px`
- Buttons: `4px`
- Inputs: `4px`
- Badges/chips: `2-3px`
- Avatars: `50%` (circle)
- Full rounded: `100px` (pills, only for special use)

### 10.4 Shadows
- **Default:** none (cards are bordered, not shadowed)
- **Hover:** `0 8px 30px rgba(42,37,32,0.08)`
- **Elevated (modals, dropdowns):** `0 16px 60px rgba(42,37,32,0.12)`
- **Never use** black shadows or high-opacity shadows

---

## 11. Animation & Motion

### 11.1 Principles
- **Calm, not flashy.** Animations should feel like a gentle reveal, not a fireworks show.
- **Purposeful.** Every animation serves UX (scroll reveal, loading feedback, state change).
- **Consistent timing.** Default duration: `0.3s` for micro-interactions, `0.7s` for reveals.

### 11.2 Standard Transitions
```css
/* Default hover/state transition */
transition: all 0.3s ease;

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Card hover lift */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(42,37,32,0.08);
}
```

### 11.3 Woven Border Animation (Loading)
```css
@keyframes weave-shimmer {
  0% { background-position: 0 0; }
  100% { background-position: 96px 0; }
}

.woven-border-loading {
  height: 3px;
  background: repeating-linear-gradient(90deg,
    #8B3A3A 0px, #8B3A3A 16px,
    #3D4F7C 16px, #3D4F7C 32px,
    #4A7C59 32px, #4A7C59 48px,
    #C4962E 48px, #C4962E 64px,
    #B84C65 64px, #B84C65 80px,
    #5C4A7C 80px, #5C4A7C 96px
  );
  background-size: 96px 3px;
  animation: weave-shimmer 2s linear infinite;
}
```

---

## 12. AI Assistant Visual Language

The AI assistant uses Langkit (Maranao) colors and has a distinct visual identity:

### 12.1 AI Chat Bubble
- Background: `rgba(166,61,92,0.06)` (Langkit Magenta tint)
- Border-left: `3px solid #A63D5C`
- Border-radius: `0 12px 12px 0`

### 12.2 AI Suggestion Cards
- Border: `1px solid rgba(201,168,76,0.3)` (Sarimanok Gold)
- Background: `rgba(201,168,76,0.04)`
- Icon accent: `#C9A84C`

### 12.3 AI Avatar/Indicator
- Gradient: `linear-gradient(135deg, #A63D5C, #5C4A7C)`
- Shape: circle
- Pulse animation on active/thinking state

---

## 13. Voice & Tone

### 13.1 Brand Voice
- **Warm, not corporate.** "Let's plan your celebration" not "Find wedding suppliers"
- **Inclusive by default.** "Your crew" not "bridal party." "Partners" not "bride and groom"
- **Calm, not urgent.** "Take your time — we're here whenever" not "Book now! Limited slots!"
- **Filipino, not foreign.** We know about ninongs, lechon debates, Pre-Cana scheduling, and Viber group chats
- **Confident, not boastful.** Let the product speak

### 13.2 Naming Conventions
| Feature | Name in UI |
|---------|-----------|
| Vendor directory | Find Vendors |
| Planning tools | Plan |
| Community forum | Community |
| Real weddings section | Real Celebrations |
| AI assistant | (TBD — working name: "Ate AI") |
| Wedding website builder | Our Website |
| Guest list | Guest List |
| Entourage manager | Wedding Party |
| Budget tracker | Budget |
| Church requirements | Requirements |
| Day-of timeline | Timeline |

---

## 14. Brand Don'ts

- **Never** use "bride" as the default user label
- **Never** use pink as a brand color (too gendered, too competitor-adjacent)
- **Never** use drop shadows as the default card treatment (borders only, shadows on hover)
- **Never** mix section color palettes (Inabel colors on the Planner, etc.)
- **Never** use the textile patterns at high opacity (keep 0.03-0.08)
- **Never** use generic stock wedding photos (all imagery should feel authentic, Filipino, diverse)
- **Never** use the woven border in only one or two colors (always use all six)
- **Never** use gendered form defaults
- **Never** stretch or skew the logo
- **Never** use more than one dropped-e word per screen (besides the brand name)

---

## 15. File & Asset Checklist

```
brand/
├── BRAND-GUIDE-V2-WOVEN-HERITAGE.md   ← THIS FILE
├── everaftr-brand-v2-weaving.html      ← Interactive brand board
├── colors/
│   ├── palette.css                     ← All CSS variables
│   ├── palette.json                    ← For design tools
│   └── palette.svg                     ← Visual reference
├── logos/
│   ├── wordmark-red.svg
│   ├── wordmark-ivory.svg
│   ├── stacked-red.svg
│   ├── stacked-ivory.svg
│   ├── monogram-red.svg
│   └── monogram-ivory.svg
├── patterns/
│   ├── patterns.css                    ← All textile patterns
│   └── woven-border.css               ← Border implementations
└── fonts/
    └── (use Google Fonts CDN)
```

---

*Six threads. One platform. Every couple.*

**everaftr** — where forevr begins

---

> **Note to AI developers:** When generating any UI, page, component, or marketing asset for everaftr, always reference this document first. Match section colors to their assigned textile tradition, use the woven border as the signature element, and follow the inclusive language rules without exception.
