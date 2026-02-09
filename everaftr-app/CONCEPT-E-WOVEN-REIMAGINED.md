# Concept E: Woven Heritage Reimagined

## Philosophy: "The Single Thread"

Instead of celebrating 6 different textiles with 6 different palettes, we extract the **essence** of Filipino weaving: the patient, deliberate act of taking individual threads and creating something stronger together.

**Core Metaphor:** Your wedding planning journey is like weaving — each decision, each vendor, each detail is a thread. As you plan, you're weaving your celebration together, strand by strand.

### The Problem We Solved

The original Woven Heritage concept failed because:
- Too many colors created visual chaos
- Heavy cream backgrounds felt dated
- The 6-color border was distracting
- Cultural authenticity overshadowed usability

### The Reimagined Solution

We keep the weaving concept but refine it into:
1. **ONE cohesive palette** distilled from all 6 textiles
2. **White canvas** as the primary surface (like raw cotton before weaving)
3. **Subtle thread animations** instead of heavy borders
4. **Progressive weaving** that builds as couples plan
5. **Texture over color** — fabric-like subtlety

---

## Color Palette: "Unified Threads"

Extracted from all 6 Filipino textiles (Piña, T'nalak, Inabel, Hablon, Yakan, Langkit), we've distilled a **single harmonious palette** that represents their collective spirit:

### Primary Colors

**Canvas White** `#FFFFFF`
- Pure white background — the blank canvas before weaving begins
- Used for: main backgrounds, cards, clean surfaces

**Midnight Weave** `#1A1A2E`
- Deep indigo-black inspired by T'nalak's deep blacks and Yakan's dark threads
- Used for: primary text, headers, borders

### Accent Colors (The Thread Palette)

**Terracotta Thread** `#C75B3F`
- Warm rust-orange from Inabel's earthen dyes and Yakan's red patterns
- Primary CTA color — bold but not pink
- Used for: primary buttons, key actions, hover states

**Golden Warp** `#D4A574`
- Soft gold from Piña's natural shimmer and Hablon's golden threads
- Secondary accent — adds warmth without being heavy
- Used for: badges, highlights, success states

**Indigo Weft** `#4A5D7C`
- Muted slate-blue from T'nalak's sacred blues and Langkit's indigo
- Tertiary accent — provides depth and sophistication
- Used for: secondary buttons, links, info states

### Neutral Threads

**Weaver's Gray** `#F8F9FA`
- Barely-there off-white for subtle backgrounds
- Used for: section backgrounds, hover states, disabled elements

**Loom Shadow** `#E5E7EB`
- Light gray for borders and dividers
- Used for: card borders, dividers, subtle structure

**Thread Gray** `#6B7280`
- Medium gray for secondary text
- Used for: body copy, captions, metadata

---

## Typography: Clean and Filipino

### Headings: **DM Serif Display**
- Elegant serif with Filipino publication heritage
- Used for: H1, H2, featured quotes
- Weights: Regular (400)
- Pairs the traditional with modern

### Body: **Inter**
- Clean, highly legible sans-serif
- Used for: Body text, UI elements, forms
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold)
- Ensures accessibility and mobile readability

### Accent: **DM Sans**
- Geometric sans for labels and CTAs
- Used for: Buttons, badges, navigation
- Weights: 500 (Medium), 700 (Bold)
- Provides structure and clarity

---

## The Reimagined Woven Element

### 1. **The Single Thread Border**
Instead of a 6-color stripe, we use a **single animated thread** that traces the edges of key elements:

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                    │  ← Thin terracotta line (2px)
│   Content Here     │     Animated on hover/load
│                    │     Dashed or stitched appearance
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

**Usage:**
- Homepage hero: Thin thread line traces the CTA button
- Cards: Thread appears on hover, weaving around the card edge
- Loading states: Thread "weaves" across the screen

### 2. **The Weave Pattern (Subtle Texture)**
A barely-visible woven texture overlay on specific sections:

- **Opacity:** 2-4% (ghost-like presence)
- **Pattern:** Diagonal crosshatch mimicking textile weave
- **Application:** Hero backgrounds, footer, CTA sections
- **Effect:** Adds depth without adding visual weight

### 3. **The Loom Grid**
The layout grid itself references weaving:

- Cards and content blocks align to a visible grid (inspired by loom structure)
- Grid gaps use consistent "thread spacing"
- Responsive breakpoints maintain the woven rhythm

### 4. **Progressive Weaving Animation**
As couples complete planning tasks, their progress is visualized as a weaving pattern:

```
Planning Progress (0-100%):
[■ ■ ■ ■ ■ ░ ░ ░ ░ ░]  ← Threads weaving together
Warp threads (vertical) cross with weft threads (horizontal)
```

### 5. **Thread-Thin Dividers**
Instead of solid lines, section dividers use a "stitched" appearance:

```
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  (dashed, 1px, terracotta)
```

### 6. **Hover States: "The Weave Reveals"**
On hover, elements reveal a subtle weave pattern that appears to "tighten":

- Cards: Weave pattern fades in at 5% opacity
- Buttons: Thread border animates around the perimeter
- Images: Crosshatch overlay appears subtly

---

## UX Applications: Where Weaving Appears

### Homepage
- **Hero CTA button:** Animated thread border traces the edge on hover
- **Category cards:** Weave pattern appears on hover (3% opacity)
- **Footer:** Subtle woven texture background (2% opacity)

### Planning Dashboard
- **Progress tracker:** Visualized as threads weaving together
- **Task completion:** Each completed task adds a thread to the pattern
- **Milestone celebrations:** Full weave pattern reveals on completion

### Vendor Listings
- **Card hover:** Thread border animates around the card
- **Featured vendors:** Golden thread badge
- **Category filters:** Thread-thin dividers between options

### Forms & Interactions
- **Input focus:** Terracotta thread underline animates in
- **Loading states:** Thread weaves across the screen left-to-right
- **Success messages:** Golden thread checkmark

### Navigation
- **Active state:** Thread underline (2px, terracotta)
- **Hover state:** Thread appears beneath nav item
- **Mobile menu:** Stitched divider between items

---

## Key UI Patterns

### Buttons

**Primary (Terracotta):**
```
[  Plan Your Wedding  ]
 ↑                   ↑
 Terracotta bg       Thread border on hover
 White text          Slight weave texture
```

**Secondary (Outlined):**
```
[  Browse Vendors  ]
 ↑                ↑
 White bg         Terracotta border (2px)
 Terracotta text  Weave pattern on hover
```

### Cards

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─┐
│  [Image]        │  ← Default: Clean white card
│  Card Title     │  ← Hover: Thread border appears
│  Description    │          Weave texture fades in
└─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

### Badges

```
[  Featured  ]  ← Golden warp background
[  New  ]       ← Terracotta background
[  Verified  ]  ← Indigo weft background

All with thread-thin borders
```

### Section Dividers

```
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
Thread-thin, dashed, terracotta
Appears between major sections
```

---

## Tailwind CSS 4 Theme Configuration

```css
@theme {
  /* Color Tokens */
  --color-canvas: #FFFFFF;
  --color-midnight: #1A1A2E;
  --color-terracotta: #C75B3F;
  --color-golden: #D4A574;
  --color-indigo: #4A5D7C;
  --color-weaver-gray: #F8F9FA;
  --color-loom-shadow: #E5E7EB;
  --color-thread-gray: #6B7280;

  /* Semantic Color Mappings */
  --color-primary: var(--color-terracotta);
  --color-secondary: var(--color-golden);
  --color-accent: var(--color-indigo);
  --color-text-primary: var(--color-midnight);
  --color-text-secondary: var(--color-thread-gray);
  --color-bg-primary: var(--color-canvas);
  --color-bg-secondary: var(--color-weaver-gray);
  --color-border: var(--color-loom-shadow);

  /* Typography */
  --font-serif: "DM Serif Display", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-accent: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;

  /* Font Sizes (Mobile-first) */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */
  --font-size-5xl: 3rem;        /* 48px */

  /* Spacing (Consistent "Thread Spacing") */
  --spacing-thread: 0.125rem;   /* 2px - thread thickness */
  --spacing-xs: 0.5rem;         /* 8px */
  --spacing-sm: 0.75rem;        /* 12px */
  --spacing-md: 1rem;           /* 16px */
  --spacing-lg: 1.5rem;         /* 24px */
  --spacing-xl: 2rem;           /* 32px */
  --spacing-2xl: 3rem;          /* 48px */
  --spacing-3xl: 4rem;          /* 64px */

  /* Border Radius */
  --radius-sm: 0.375rem;        /* 6px */
  --radius-md: 0.5rem;          /* 8px */
  --radius-lg: 0.75rem;         /* 12px */
  --radius-xl: 1rem;            /* 16px */

  /* Shadows (Subtle, woven-inspired) */
  --shadow-thread: 0 1px 2px rgba(26, 26, 46, 0.04);
  --shadow-weave: 0 2px 8px rgba(26, 26, 46, 0.08);
  --shadow-loom: 0 4px 16px rgba(26, 26, 46, 0.12);

  /* Animation Durations */
  --duration-thread: 150ms;     /* Quick thread animations */
  --duration-weave: 300ms;      /* Weave pattern reveals */
  --duration-loom: 500ms;       /* Full loom transitions */

  /* Z-index Layers */
  --z-base: 1;
  --z-thread: 10;
  --z-weave: 20;
  --z-nav: 50;
  --z-modal: 100;

  /* Weave Pattern (CSS Custom Property for Background) */
  --pattern-weave: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(26, 26, 46, 0.02) 2px,
    rgba(26, 26, 46, 0.02) 4px
  ),
  repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 2px,
    rgba(26, 26, 46, 0.02) 2px,
    rgba(26, 26, 46, 0.02) 4px
  );
}

/* Utility Classes for Woven Elements */
.thread-border {
  border: 2px dashed var(--color-terracotta);
  border-radius: var(--radius-md);
}

.thread-border-animated {
  position: relative;
  overflow: hidden;
}

.thread-border-animated::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: var(--color-terracotta);
  animation: thread-weave var(--duration-loom) ease-in-out forwards;
}

@keyframes thread-weave {
  to { left: 100%; }
}

.weave-texture {
  background-image: var(--pattern-weave);
  background-size: 8px 8px;
}

.weave-texture-hover {
  position: relative;
}

.weave-texture-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--pattern-weave);
  background-size: 8px 8px;
  opacity: 0;
  transition: opacity var(--duration-weave) ease;
  pointer-events: none;
}

.weave-texture-hover:hover::after {
  opacity: 1;
}

.stitched-divider {
  height: 1px;
  background-image: repeating-linear-gradient(
    to right,
    var(--color-terracotta) 0,
    var(--color-terracotta) 8px,
    transparent 8px,
    transparent 16px
  );
  margin: var(--spacing-xl) 0;
}
```

---

## Component Showcase

### Hero Section
- Large DM Serif Display headline
- White canvas background
- Terracotta CTA button with animated thread border
- Subtle weave texture overlay (2% opacity)

### Vendor Cards
- Clean white cards with shadow-thread
- Image + title + category badge
- Hover: Thread border animates in, weave texture appears
- Golden badge for featured vendors

### Category Grid
- Loom-inspired grid layout
- Consistent spacing (thread spacing)
- Thread-thin dividers between categories
- Indigo hover states

### Footer
- Weave texture background (2% opacity)
- Stitched dividers between sections
- Thread gray text
- Terracotta links on hover

---

## Why This Works

1. **Cultural Authenticity:** The weaving metaphor is present but refined — it's felt, not seen
2. **Visual Clarity:** White canvas + 3 accent colors = clean, modern, premium
3. **Functional Beauty:** Thread animations and weave patterns serve UX purposes (hover feedback, loading states)
4. **Progressive Enhancement:** The weaving "builds" as couples plan, making the metaphor interactive
5. **Filipino Without Cliche:** Honors textile heritage without relying on heavy colors or busy patterns
6. **Mobile-First:** Subtle animations and clean layouts work beautifully on small screens

---

## Tagline Integration

**"plan together, celebrate forevr"** appears with a thread underline that weaves letter by letter on page load.

---

## Final Note

This concept proves that **weaving CAN work** — it just needed restraint, refinement, and a focus on the metaphor over the literal representation. The single thread is more powerful than six color palettes. The subtle texture is more sophisticated than busy borders. The progressive weaving is more engaging than static patterns.

**Weaving isn't just decoration — it's the user experience itself.**
