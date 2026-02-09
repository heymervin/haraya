# Concept G: Kapwa — Celestial Navigation

## Philosophy

**Kapwa** (shared self, togetherness) meets **Tala** (stars) — the ancient Filipino practice of wayfinding through constellations. Just as our ancestors navigated 7,641 islands by reading the stars, couples navigate their wedding journey together, guided by their shared constellation.

This concept transforms wedding planning into a **celestial journey**. Each couple creates their own constellation — their "kapwa" in the stars. The design language uses:
- **Star mapping aesthetics** — dot-to-dot connections, orbital paths, celestial coordinates
- **Deep midnight blues** with bright stellar whites
- **Navigation metaphors** — waypoints, milestones, journey paths
- **Constellation illustrations** as signature visual elements

Why this works for weddings:
- **Timeless & romantic** — stars have guided lovers forever
- **Journey-oriented** — perfect for multi-phase planning
- **Uniquely Filipino** — our seafaring heritage, pre-colonial astronomy
- **Inclusive & universal** — everyone shares the same sky
- **Premium & modern** — NASA-grade sophistication meets wedding magic

---

## Color Palette

### Primary Colors
```css
--midnight: #0A1128        /* Deep night sky — primary backgrounds */
--stellar: #E8F4F8         /* Bright star white — main background */
--celestial: #2B4570       /* Deep space blue — interactive elements */
--navigation: #4A7BA7      /* Wayfinder blue — links, accents */
```

### Accent Colors
```css
--stardust: #FFD93D        /* Golden starlight — premium accents, CTAs */
--nebula: #7B8FA3          /* Cosmic gray — secondary text, borders */
--aurora: #A8DADC          /* Soft sky blue — hover states, highlights */
--orbit: #F0F7FA           /* Pale stellar — subtle backgrounds */
```

### Semantic Colors
```css
--success: #4ECDC4         /* Turquoise constellation */
--warning: #FFB84D         /* Amber star */
--error: #E63946           /* Red giant */
--info: #5AA9E6            /* Blue supergiant */
```

---

## Typography

### Primary Font: **Space Grotesk**
- Modern, geometric sans-serif with astronomical vibe
- Used for: Headlines, navigation, buttons
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)

### Secondary Font: **Inter**
- Clean, highly legible UI font
- Used for: Body text, forms, cards
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold)

### Accent Font: **Cormorant Garamond**
- Elegant serif for romantic moments
- Used for: Tagline, special headings, testimonials
- Weights: 400 (Regular), 600 (Semi-Bold)

---

## Signature Visual Element: The Constellation

**The everaftr Constellation** — a custom 5-star formation representing:
1. **Couple** (two stars at the center)
2. **Family** (supporting stars)
3. **Community** (the kapwa)
4. **Future** (the guiding star)
5. **Journey** (connecting paths)

Visual treatments:
- **Dot-to-dot line connections** with animated drawing
- **Pulsing star nodes** with glow effects
- **Orbital paths** as decorative borders
- **Star field backgrounds** with subtle parallax
- **Constellation badges** for milestones (booked venue, sent invites, etc.)

---

## Key UI Patterns

### 1. Navbar — The Navigation Bar (literally)
- Translucent white background with backdrop blur
- Star icon logo with subtle glow
- Navigation items with orbital hover underlines
- "Start Your Journey" CTA in stardust gold

### 2. Hero — The Launch Pad
- Pure white background with subtle star field (opacity 0.03)
- Large headline with Space Grotesk Bold
- Tagline in Cormorant italic
- Animated constellation forming on load
- Journey metaphor: "Begin your celestial journey"
- CTA: "Chart Your Course" with arrow →

### 3. Vendor Cards — Star Profiles
- Clean white cards with subtle shadow
- Corner constellation accent (3 connected dots)
- Vendor category as "constellation type"
- Star rating with actual star icons
- Hover: card lifts, constellation glows

### 4. Category Cards — Waypoints
- Large circular icons with orbital ring borders
- Icon in center, category name below
- Hover: icon rotates slightly, ring animates
- Each category has a constellation icon

### 5. Buttons — Action Orbitals
- **Primary**: Stardust gold bg, midnight text, subtle glow
- **Secondary**: Celestial blue bg, white text
- **Ghost**: Transparent with navigation blue border
- All buttons have slight rounded corners (8px) and orbital hover animation

### 6. Footer — The Star Map
- Midnight blue background
- Column layout with constellation dividers
- Social icons as star nodes
- "Navigate" / "Discover" / "Connect" sections
- Bottom strip: "Your kapwa in the stars"

---

## Component Styles

### Cards
```css
background: white
border-radius: 12px
box-shadow: 0 2px 8px rgba(10, 17, 40, 0.06)
border: 1px solid rgba(123, 143, 163, 0.1)
hover: translateY(-2px), shadow lifts
```

### Badges
```css
constellation-badge:
  - Small 3-star formation icon
  - Text label next to it
  - Soft aurora background
  - 20px height, pill-shaped
```

### Form Inputs
```css
background: white
border: 1.5px solid nebula
border-radius: 8px
focus: border becomes navigation blue, subtle glow
placeholder: nebula color
```

### Progress Indicators
```css
Orbital path style:
  - Connected dots (milestones)
  - Filled stars for completed
  - Outlined stars for upcoming
  - Line connects them
```

---

## Tailwind CSS 4 Theme Tokens

```css
@theme {
  /* Colors */
  --color-midnight: #0A1128;
  --color-stellar: #E8F4F8;
  --color-celestial: #2B4570;
  --color-navigation: #4A7BA7;
  --color-stardust: #FFD93D;
  --color-nebula: #7B8FA3;
  --color-aurora: #A8DADC;
  --color-orbit: #F0F7FA;

  /* Semantic */
  --color-success: #4ECDC4;
  --color-warning: #FFB84D;
  --color-error: #E63946;
  --color-info: #5AA9E6;

  /* Typography */
  --font-primary: "Space Grotesk", system-ui, -apple-system, sans-serif;
  --font-secondary: "Inter", system-ui, -apple-system, sans-serif;
  --font-accent: "Cormorant Garamond", Georgia, serif;

  /* Spacing (8px base) */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */

  /* Border Radius */
  --radius-sm: 0.5rem;     /* 8px */
  --radius-md: 0.75rem;    /* 12px */
  --radius-lg: 1rem;       /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(10, 17, 40, 0.05);
  --shadow-md: 0 2px 8px rgba(10, 17, 40, 0.06);
  --shadow-lg: 0 4px 16px rgba(10, 17, 40, 0.08);
  --shadow-xl: 0 8px 32px rgba(10, 17, 40, 0.12);

  /* Star Glow Effect */
  --glow-star: 0 0 12px rgba(255, 217, 61, 0.4);
  --glow-orbit: 0 0 16px rgba(74, 123, 167, 0.3);
}
```

---

## Application Examples

### Homepage Hero
```
[White background with subtle star field]

         ✦
      ✦     ✦
    ✦    ✦    ✦

    plan together,
    celebrate forevr

[Space Grotesk, 64px, midnight]
Your celestial journey to
the perfect celebration

[Inter, 20px, celestial]
Navigate wedding planning with confidence.
Connect with trusted vendors. Create your kapwa constellation.

[Button: "Chart Your Course →" in stardust gold]
```

### Vendor Card
```
┌─────────────────────────────┐
│  ✦--✦                       │ <- constellation accent
│    /                        │
│  ✦                          │
│                             │
│  [Vendor Photo]             │
│                             │
│  Celestial Gardens          │
│  Venue · Quezon City        │
│  ★★★★★ 4.8 (127)           │
│                             │
│  [View Constellation →]     │
└─────────────────────────────┘
```

### Category Icon
```
    ╭─────────╮
    │    ▲    │  <- geometric icon
    │   ▲ ▲   │
    │  ▲───▲  │
    ╰─────────╯
      Venues
```

### Progress Tracker
```
✦━━━━✦━━━━○━━━━○━━━━○

Booked    Invites   Menu    Confirmed
Venue     Sent      Final
```

---

## Why This Concept Wins

1. **Completely Original** — No other concept uses celestial navigation or Philippine astronomy
2. **Deep Cultural Roots** — Pre-colonial Filipino wayfinding is powerful heritage
3. **Perfect Wedding Metaphor** — Journey, togetherness, guided by stars (romantic!)
4. **Modern Premium Aesthetic** — Space-tech meets luxury wedding
5. **White-First** — Stellar white is the primary background
6. **NO PINK** — Midnight blues, stardust gold, celestial palette
7. **Scalable System** — Constellations work for icons, badges, illustrations, animations
8. **Inclusive** — Everyone navigates by the same stars, regardless of ceremony type
9. **Memorable Brand** — "Your kapwa in the stars" is ownable and poetic

---

## Technical Implementation Notes

### Key Animations
- **Hero constellation**: SVG path drawing on load (stroke-dasharray)
- **Star glow**: CSS box-shadow pulse animation
- **Card hover**: Transform translateY + shadow transition
- **Button orbital**: Rotating border gradient effect
- **Progress tracker**: Dot fill animation on milestone completion

### Accessibility
- High contrast: midnight on stellar, stardust on midnight
- All interactive elements meet WCAG AA (4.5:1 minimum)
- Constellation illustrations are decorative (aria-hidden)
- Star ratings have aria-label fallbacks

### Performance
- Star field background: CSS-only with single gradient + radial pattern
- Constellation SVGs: lightweight, under 2KB each
- No animation on `prefers-reduced-motion`
- Lazy load vendor images with blurhash placeholders

---

**This is the wildcard. The one nobody expected. Filipino celestial navigation meets modern wedding planning. Kapwa in the stars.**
