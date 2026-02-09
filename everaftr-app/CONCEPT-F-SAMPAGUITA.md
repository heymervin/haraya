# everaftr Design Proposal: "Sampaguita" (Concept F)

**Prepared by:** Senior Brand Designer
**Date:** February 8, 2026
**Status:** WILDCARD CONCEPT -- for founder review

---

## Executive Summary

The sampaguita is the Philippine national flower. Small, white, delicate, powerfully fragrant. It appears at every Filipino milestone: births, graduations, weddings, funerals. It's strung into garlands (kuwintas) and sold on street corners. It's humble but beautiful. It's the flower that says "Filipino" without needing explanation.

This concept uses the sampaguita as the foundation for a brand system that is:
- **White by default** -- the sampaguita IS white, so white is the hero color
- **Botanical but not generic** -- rooted in Philippine flora, not stock floral patterns
- **Delicate but not precious** -- refined without being elitist
- **Connected** -- the garland metaphor (threading moments together) is the core visual system

**The philosophy:** Every celebration is made of small moments strung together. Like a sampaguita garland.

---

## 1. The Concept: Strung Together

### 1.1 The Sampaguita Metaphor

The sampaguita (Jasminum sambac) is not just the national flower. It's the flower of everyday Filipino life:

- **At weddings:** Sampaguita garlands drape the altar, hang from the car, rest around the couple's necks
- **At church:** Offered to the Virgin Mary and saints
- **On the street:** Sold by vendors at intersections, strung fresh each morning
- **In tradition:** Used in aromatherapy, tea, and as a symbol of purity and humility

The flower is tiny -- each bloom is about 1-2cm wide, with 5-9 white petals forming a star shape. But when strung together into a garland, it becomes powerful. The scent fills a room. The visual becomes a statement.

**The brand parallel:** Planning a celebration is like making a garland. You thread together individual moments -- the venue booking, the first dress fitting, the cake tasting, the seating chart -- and they become something complete. The platform is the string that holds it all together.

### 1.2 Visual Translation

The sampaguita gives us three design elements:

1. **The white petal** -- pure, clean, premium canvas
2. **The deep green leaf** -- botanical accent color, grounding
3. **The garland string** -- a connected line of moments, the signature visual motif

This is NOT a floral pattern system. This is a botanical minimalism system. The sampaguita appears as:
- Subtle dot patterns representing strung flowers
- Line elements suggesting the thread of a garland
- Delicate star shapes echoing the flower's geometry
- White space as the dominant design choice (because sampaguita is white)

---

## 2. Color Palette: Botanical Minimal

### 2.1 Primary Canvas

```
Snow White           #FFFFFF    -- The hero. 80%+ of every page.
Cloud                #FAFAF9    -- Alternate section background. Warm-neutral, very subtle.
Petal                #F5F5F4    -- Card surfaces, input backgrounds. Barely there.
```

White is not a neutral -- it's the brand. The sampaguita is white. The canvas is white. This is deliberate.

### 2.2 Primary Accent: Dahon (Leaf)

```
Dahon                #1C6B47    -- Deep botanical green. Primary buttons, links, wordmark accent.
Dahon Dark           #145239    -- Hover/pressed state.
Dahon Light          #E8F5EF    -- Tinted backgrounds for subtle emphasis.
Dahon Lighter        #F0FAF5    -- Faintest tint for hover states.
```

**Why green?**
- Sampaguita leaves are a deep, glossy green -- this is the color that makes the white petals pop
- Green avoids pink (competitor territory), avoids gold (too formal), avoids teal (Concept A already used it)
- Green in Filipino culture ("berde/lungti") symbolizes growth, harmony, renewal -- perfect for new beginnings
- Gender-neutral, fresh, natural

### 2.3 Text

```
Ink                  #1C1917    -- Primary text. True near-black.
Stone                #78716C    -- Secondary text. Warm gray.
Mist                 #A8A29E    -- Tertiary/disabled text.
```

Text is warm-neutral to soften against the stark white, but not so warm that it reads as cream/parchment.

### 2.4 Functional

```
Success              #16A34A    -- Standard green for completion.
Warning              #F59E0B    -- Amber for attention.
Error                #DC2626    -- Clear red for errors.
Info                 #3B82F6    -- Blue for informational states.
```

Standard semantic colors. The success green is brighter than Dahon to differentiate from the brand accent.

### 2.5 Deep (Footer/Dark Sections)

```
Deep                 #0F1A14    -- Very dark green, almost black but with botanical warmth.
Deep Surface         #1C2E23    -- Slightly lighter dark green for surfaces.
Text on Deep         #FAFAF9    -- Off-white text on dark.
Text on Deep Muted   #A8A29E    -- Muted text on dark.
```

The footer uses a deep botanical green instead of true black -- keeps the natural, grounded feeling throughout.

### 2.6 Accent: Sampaguita Gold (Optional Highlight)

```
Gold                 #D4AF37    -- Warm metallic gold for premium accents (badges, verified icons).
Gold Light           #FAF6E8    -- Tinted background for special callouts.
```

Used sparingly. Sampaguita garlands are sometimes sold with gold thread woven in for special occasions. This is the "special occasion" color.

---

## 3. Typography: Delicate and Legible

### 3.1 The Pairings

**Display/Headings: Zodiak**
- Google Fonts: https://fonts.google.com/specimen/Zodiak
- Weights: 300 (Light), 400 (Regular), 500 (Medium)
- Style: Modern serif with delicate curves, elegant but not overly formal
- Usage: h1, h2, h3, hero text
- Fallback: Georgia, serif

**Body: Plus Jakarta Sans**
- Google Fonts: https://fonts.google.com/specimen/Plus+Jakarta+Sans
- Weights: 300, 400, 500, 600
- Style: Geometric sans-serif, clean, friendly, highly legible on mobile
- Usage: body text, UI elements, buttons, labels
- Fallback: -apple-system, BlinkMacSystemFont, sans-serif

### 3.2 Typographic Scale

```
Display (Hero)       clamp(2.5rem, 6vw, 4.5rem)    font-light    Zodiak
H1                   clamp(2rem, 4vw, 3rem)        font-light    Zodiak
H2                   clamp(1.5rem, 3vw, 2.25rem)   font-normal   Zodiak
H3                   clamp(1.25rem, 2.5vw, 1.75rem) font-normal  Zodiak
Body Large           1.125rem (18px)               font-normal   Plus Jakarta Sans
Body                 1rem (16px)                   font-normal   Plus Jakarta Sans
Body Small           0.875rem (14px)               font-normal   Plus Jakarta Sans
Caption              0.75rem (12px)                font-medium   Plus Jakarta Sans
```

### 3.3 Why These Fonts?

- **Zodiak** feels premium and editorial without being stuffy. It has delicate serifs that echo the delicate nature of sampaguita petals.
- **Plus Jakarta Sans** is a workhorse -- clear at small sizes, friendly, modern, and widely used in Filipino tech products (unlike Jost, which is more niche).
- Together they create a "delicate but functional" aesthetic.

---

## 4. Signature Visual Element: The Garland

### 4.1 The Garland as Design System

The sampaguita garland (kwintas) is a string of flowers threaded together. This becomes the signature visual motif across the entire platform.

**How it appears:**

1. **As a dotted line divider**
   - A series of small circles (representing flowers) connected by a thin line (the thread)
   - Used between sections, as decorative accents
   - CSS: `.garland-divider` -- evenly spaced dots with connecting line

2. **As a progress indicator**
   - Hollow circles that fill in as steps complete
   - Used in onboarding, checklist progress, multi-step forms
   - Active state: filled with Dahon green
   - Completed state: filled with Success green

3. **As a loading state**
   - Animated dots that pulse or shimmer
   - CSS: `.garland-loading` -- keyframe animation
   - Replaces generic spinners

4. **As decorative header/footer accents**
   - Subtle garland running along the top of hero sections
   - Faint garland pattern in footer
   - Not overpowering, just enough to be recognizable

5. **As a connection metaphor in UI**
   - Planning timeline uses garland dots to show progression
   - Vendor cards connected by garland lines in matchmaker results
   - Budget tracker uses garland to show allocation flow

### 4.2 The Sampaguita Star Shape (Secondary Element)

The sampaguita flower is a 5-9 pointed star. This shape can appear as:
- Small decorative elements (like the sparkle/asterisk in badges)
- As bullet points in lists
- As a subtle background pattern (very faint, like the current textile patterns)

**NOT used as:**
- Large hero graphics (too literal)
- Repeated all-over patterns (too busy)
- The logo (the wordmark is always lowercase "everaftr")

---

## 5. Component Patterns

### 5.1 Buttons

**Primary Button (Dahon Green)**
```
Background: Dahon (#1C6B47)
Text: White
Border: None
Padding: 12px 32px
Border radius: 8px
Font: Plus Jakarta Sans, 600 weight
Hover: Dahon Dark (#145239)
Active: Dahon Dark + slight scale (0.98)
```

**Secondary Button (Outline)**
```
Background: Transparent
Text: Dahon (#1C6B47)
Border: 1.5px solid Dahon
Padding: 12px 32px
Border radius: 8px
Font: Plus Jakarta Sans, 600 weight
Hover: Background Dahon Lighter (#F0FAF5)
```

**Ghost Button**
```
Background: Transparent
Text: Dahon (#1C6B47)
Border: None
Font: Plus Jakarta Sans, 600 weight
Hover: Background Dahon Lighter (#F0FAF5)
```

### 5.2 Cards (Vendor Cards, Category Cards)

```
Background: White (#FFFFFF)
Border: 1px solid #E7E5E4 (warm neutral border)
Border radius: 12px
Shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)
Hover: Shadow lifts to 0 4px 12px rgba(0,0,0,0.08)
Padding: 20px (desktop), 16px (mobile)
```

Cards use minimal borders and soft shadows. No heavy outlines. Clean and light.

### 5.3 Badges

**Category Badge**
```
Background: Petal (#F5F5F4)
Text: Stone (#78716C)
Border: None
Padding: 4px 12px
Border radius: 16px (pill shape)
Font: Plus Jakarta Sans, 500 weight, 0.75rem
```

**All Celebrations Welcome Badge**
```
Background: Dahon Light (#E8F5EF)
Text: Dahon (#1C6B47)
Icon: Small sampaguita star in Dahon
Border: None
Padding: 6px 12px
Border radius: 16px
Font: Plus Jakarta Sans, 500 weight, 0.75rem
```

**Verified Badge**
```
Background: Gold Light (#FAF6E8)
Text: Gold (#D4AF37)
Icon: Checkmark or small star
Border: None
Padding: 6px 12px
Border radius: 16px
Font: Plus Jakarta Sans, 500 weight, 0.75rem
```

### 5.4 Form Inputs

```
Background: Petal (#F5F5F4)
Border: 1px solid transparent
Border radius: 8px
Padding: 12px 16px
Font: Plus Jakarta Sans, 400 weight, 1rem
Placeholder text: Mist (#A8A29E)
Focus: Border becomes Dahon (#1C6B47), background becomes White
```

Inputs have a soft gray background by default, then "activate" to white on focus.

### 5.5 Star Rating

```
Filled star: Gold (#D4AF37)
Empty star: Mist (#A8A29E)
Size: 16px (small), 20px (medium), 24px (large)
```

---

## 6. Page-Level Application

### 6.1 Navbar

```
Background: White (#FFFFFF) with backdrop blur
Border bottom: 1px solid #E7E5E4
Sticky: Yes
Height: 64px (desktop), 56px (mobile)

Logo: "everaftr" in Zodiak, Dahon green (#1C6B47)
Links: Plus Jakarta Sans, 500 weight, Ink (#1C1917)
Active link: Dahon green underline (2px, below text)
CTA button: Primary button style (Dahon green)

Mobile menu: Slide-in drawer from right
```

The navbar is clean, minimal, with just enough weight to feel premium but not heavy.

### 6.2 Hero Section

```
Background: White (#FFFFFF)
Optional: Faint sampaguita star pattern in background (very subtle, almost invisible)
Decorative element: Thin garland divider running horizontally near the top

Heading: Zodiak, font-light, clamp(2.5rem, 6vw, 4.5rem), Ink (#1C1917)
Subheading: Plus Jakarta Sans, font-normal, 1.25rem, Stone (#78716C)
CTA buttons: Primary (Dahon) + Secondary (Outline)
Spacing: Generous -- min 80px top/bottom padding

Hero image (optional): High-quality photo with white/light tones
  - Example: Overhead shot of white flowers, wedding setup with white linens, couple in white attire
  - Overlay: None, or very subtle vignette to ensure text legibility
```

The hero is spacious and calm. No visual noise.

### 6.3 Vendor Cards (Grid)

```
Container background: Cloud (#FAFAF9) or White (#FFFFFF)
Card background: White (#FFFFFF)
Card border: 1px solid #E7E5E4
Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
Gap: 24px

Card structure:
  - Image (aspect ratio 4:3, border radius 8px on top)
  - Content padding: 20px
  - Vendor name: Zodiak, font-normal, 1.25rem, Ink
  - Category + location: Plus Jakarta Sans, 0.875rem, Stone
  - Badges: All Celebrations Welcome, Verified (if applicable)
  - Price range: Plus Jakarta Sans, 0.875rem, Dahon (#1C6B47)
  - Star rating: Gold stars
  - Tags: Pill-shaped badges in Petal background

Hover state: Card lifts with shadow
```

### 6.4 Categories Section

```
Background: White (#FFFFFF)
Heading: Zodiak, Ink, centered
Subheading: Plus Jakarta Sans, Stone, centered
Divider: Garland dotted line below heading

Category cards:
  - Icon in Dahon green circle (48px)
  - Category name: Plus Jakarta Sans, 600 weight, 1rem, Ink
  - Count: Plus Jakarta Sans, 400 weight, 0.875rem, Stone
  - Background: Petal (#F5F5F4) on hover
  - Border radius: 12px
  - Click: Navigate to filtered vendor page
```

### 6.5 Footer

```
Background: Deep (#0F1A14) -- dark botanical green
Text: Text on Deep (#FAFAF9)
Muted text: Text on Deep Muted (#A8A29E)

Structure:
  - Logo: "everaftr" in Zodiak, white
  - Tagline: "plan together, celebrate forevr" in Plus Jakarta Sans, light weight, muted
  - Links: Plus Jakarta Sans, Text on Deep
  - Decorative: Faint garland pattern running along top edge
  - Social icons: White, 24px, subtle hover (Dahon Light tint)

Border top: Thin garland divider (white dots on dark background)
```

The footer is grounded and calm. The dark green feels natural, not heavy.

---

## 7. Pattern Library

### 7.1 Sampaguita Star Pattern (Background)

A very subtle repeating pattern of small 5-pointed stars (representing sampaguita flowers).

```css
.pattern-sampaguita {
  background-color: #FFFFFF;
  background-image:
    radial-gradient(circle at 50% 50%, #F5F5F4 1px, transparent 1px),
    radial-gradient(circle at 50% 50%, #F5F5F4 0.5px, transparent 0.5px);
  background-size: 40px 40px, 20px 20px;
  background-position: 0 0, 10px 10px;
}
```

Used on hero backgrounds, alternating section backgrounds. Almost invisible -- just enough texture to avoid stark flatness.

### 7.2 Garland Divider (CSS)

A horizontal line with evenly spaced dots, representing a sampaguita garland.

```css
.garland-divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(to right,
    #1C6B47 0%, #1C6B47 20%,
    transparent 20%, transparent 25%,
    #1C6B47 25%, #1C6B47 45%,
    transparent 45%, transparent 50%,
    #1C6B47 50%, #1C6B47 70%,
    transparent 70%, transparent 75%,
    #1C6B47 75%, #1C6B47 95%,
    transparent 95%, transparent 100%
  );
  position: relative;
}

.garland-divider::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 10%;
  width: 8px;
  height: 8px;
  background: #1C6B47;
  border-radius: 50%;
}

/* Repeat ::before pattern at 30%, 50%, 70%, 90% with additional pseudo-elements or JS */
```

Alternative: Use SVG for more control over dot spacing.

### 7.3 Garland Loading Animation

```css
.garland-loading {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.garland-loading span {
  width: 8px;
  height: 8px;
  background: #1C6B47;
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}

.garland-loading span:nth-child(2) { animation-delay: 0.2s; }
.garland-loading span:nth-child(3) { animation-delay: 0.4s; }
.garland-loading span:nth-child(4) { animation-delay: 0.6s; }
.garland-loading span:nth-child(5) { animation-delay: 0.8s; }

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
```

---

## 8. Tailwind CSS 4 @theme Block

```css
@theme {
  /* Canvas */
  --color-white: #FFFFFF;
  --color-cloud: #FAFAF9;
  --color-petal: #F5F5F4;

  /* Primary Accent: Dahon (Leaf) */
  --color-dahon: #1C6B47;
  --color-dahon-dark: #145239;
  --color-dahon-light: #E8F5EF;
  --color-dahon-lighter: #F0FAF5;

  /* Text */
  --color-ink: #1C1917;
  --color-stone: #78716C;
  --color-mist: #A8A29E;

  /* Borders */
  --color-border: #E7E5E4;
  --color-border-strong: #D6D3D1;

  /* Functional */
  --color-success: #16A34A;
  --color-warning: #F59E0B;
  --color-error: #DC2626;
  --color-info: #3B82F6;

  /* Accent: Sampaguita Gold (Optional) */
  --color-gold: #D4AF37;
  --color-gold-light: #FAF6E8;

  /* Deep (footer) */
  --color-deep: #0F1A14;
  --color-deep-surface: #1C2E23;
  --color-text-on-deep: #FAFAF9;
  --color-text-on-deep-muted: #A8A29E;

  /* Fonts */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Zodiak', Georgia, serif;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-soft: 0 2px 8px rgba(0,0,0,0.06);

  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;
}
```

---

## 9. How This Solves the Current Problems

### 9.1 The "Dull and Heavy" Problem

**Current:** Warm cream backgrounds (`#F5EDD8`) everywhere, creating a yellowed, parchment-like feel.

**Sampaguita:** Pure white (`#FFFFFF`) as the dominant surface. 80%+ of the page is white. Sections alternate between white and the faintest warm-neutral (`#FAFAF9`). The page breathes.

### 9.2 The "No Pink" Requirement

**Sampaguita:** Zero pink. The primary accent is deep botanical green (`#1C6B47`). Gold is optional and used sparingly for premium accents. No florals in the pink/rose family.

### 9.3 The "Visual Noise" Problem

**Current:** Six textile colors, warm tones, heavy patterns, one primary accent doing all the work.

**Sampaguita:** Two primary colors (white + green), minimal patterns (very subtle star background), clean typography, clear visual hierarchy. The garland motif is functional (dividers, progress, loading) not decorative chaos.

### 9.4 The "Inclusive but Premium" Balance

**Sampaguita:** The white canvas + botanical green + delicate serif typography creates a premium feel without being elitist. The sampaguita is a flower sold on street corners -- it's accessible and high-end at the same time. The "all celebrations welcome" badge uses the same green system, so inclusivity is visually integrated, not an afterthought.

### 9.5 The "Cultural Identity" Requirement

**Sampaguita:** The national flower is instantly recognizable to Filipinos. The garland metaphor (threading moments together) is culturally specific without being literal. Unlike the textile system (which requires explanation), the sampaguita is self-evident.

---

## 10. What Makes This Concept Different from A/B/C/E

| Concept | Primary Color | White Usage | Cultural Element | Aesthetic |
|---------|--------------|-------------|------------------|-----------|
| **A: Clean Modern Filipino** | Teal (`#1A7A6D`) | High | Multicolor thread | Minimal, Apple-like |
| **B: Tropical Luxe Minimal** | Gold (`#D4A574`) | High | Editorial luxury | High-end magazine |
| **C: Heritage Gold** | Gold (`#C9A961`) | Medium | Gold as signature | Formal, traditional |
| **E: Woven Heritage Reimagined** | Warm cream + six textiles | Low | Textile patterns | Rich, museum-like |
| **F: Sampaguita** | Botanical green (`#1C6B47`) | **Highest** | National flower + garland | **Delicate botanical minimal** |

**What Sampaguita does that the others don't:**
- Uses a **flower** (not a textile, not a color abstraction) as the core identity
- The garland becomes a **functional design system** (progress, loading, dividers), not just decoration
- White is the **hero**, not a neutral
- Green is **gender-neutral and fresh**, avoiding both pink and the warm tones of the heritage system
- The metaphor of **stringing moments together** directly parallels the planning process
- It's **premium without being formal**, **Filipino without being heritage-heavy**

---

## 11. Brand Narrative

### 11.1 The Story

"The sampaguita is the Philippine national flower. It's small, white, delicate, and powerfully fragrant. It's sold on street corners every morning, strung fresh into garlands by hand. It appears at every milestone in Filipino life: births, baptisms, graduations, weddings, funerals.

Each flower is tiny on its own. But when you thread them together, you create something complete. A garland. A kwintas. Something you can wear, something you can offer, something that fills a room with scent.

Planning a celebration is the same. Each task is small: book the venue, find the photographer, send the invitations. But when you thread them all together, you create something complete. A day. A memory. A beginning.

everaftr is the thread. You bring the moments. We help you string them together."

### 11.2 Tagline Extensions

The current tagline is "plan together, celebrate forevr". Additional options that lean into the sampaguita concept:

- "thread your moments together"
- "small moments, strung together"
- "every moment, threaded with care"
- "your celebration, strung together"

(These are optional. The existing tagline works perfectly fine.)

---

## 12. Implementation Notes

### 12.1 Color Migration

Replace current Woven Heritage tokens with Sampaguita tokens:

| Old Token | New Token |
|-----------|-----------|
| `bg-primary` (`#FDFAF3`) | `bg-white` (`#FFFFFF`) |
| `bg-warm` (`#F5EDD8`) | `bg-cloud` (`#FAFAF9`) |
| `accent-primary` (`#8B3A3A`) | `bg-dahon` (`#1C6B47`) |
| `text-primary` (`#2A2520`) | `text-ink` (`#1C1917`) |
| `text-secondary` (`#5A4F45`) | `text-stone` (`#78716C`) |

### 12.2 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Zodiak:wght@300;400;500&display=swap" rel="stylesheet">
```

### 12.3 Component Updates

- **WovenBorder component:** Replace multicolor stripe with garland divider (dots + line in Dahon green)
- **Background patterns:** Replace `.pattern-pina`, `.pattern-inabel`, `.pattern-hablon` with `.pattern-sampaguita`
- **Footer:** Change background from `#2A2520` to `#0F1A14` (dark botanical green)
- **Buttons:** Change primary button from `#8B3A3A` to `#1C6B47`
- **Star ratings:** Change filled star color to Gold (`#D4AF37`)

### 12.4 Page Backgrounds

Every section should be either:
- `bg-white` (`#FFFFFF`)
- `bg-cloud` (`#FAFAF9`)
- `bg-petal` (`#F5F5F4`) for cards/inputs
- `bg-deep` (`#0F1A14`) for footer only

No warm cream backgrounds anywhere.

---

## 13. Risk Assessment

### 13.1 Potential Concerns

**1. "Is this too feminine?"**

No. The sampaguita is the **national flower** used at all Filipino events, not a "bridal" flower. The green accent, geometric garland motif, and clean typography keep it gender-neutral. The flower itself is never shown as a literal illustration -- only abstracted as dots, stars, patterns.

**2. "Is green too expected for a 'natural/organic' brand?"**

The green is **deep botanical**, not bright lime or forest green. It's sophisticated, not crunchy. Paired with white and gold, it reads as premium, not eco-brand.

**3. "Will users understand the garland metaphor?"**

The garland is **functional**, not symbolic. Users don't need to "get" the metaphor to use the progress dots, loading animation, or dividers. The cultural connection is a bonus for Filipino users, not a requirement for usability.

**4. "Is this too minimal?"**

The design is minimal but not cold. The serif headings, warm neutrals, and delicate patterns add warmth. The garland motif adds personality. It's not brutalist -- it's botanical minimal.

### 13.2 A/B Test Recommendations

If choosing between concepts, test:
- **Sampaguita vs. Clean Modern Filipino (Concept A)** -- both use white heavily, but Sampaguita uses green vs. teal and has the garland motif
- **Hero CTA conversion** with white background vs. warm cream background
- **Vendor card clickthrough** with Dahon green accents vs. heritage red accents

---

## 14. Final Recommendation

**Choose Sampaguita if:**
- You want MORE WHITE (this has the most white of any concept)
- You want NO PINK (zero pink, all green and gold)
- You want a Filipino cultural element that doesn't require explanation (everyone knows sampaguita)
- You want a design system that is premium but not formal, delicate but not precious
- You want a functional signature element (the garland) that works as progress, loading, dividers, not just decoration

**Choose a different concept if:**
- You want warmth over crispness (Sampaguita is the crispest, cleanest concept)
- You prefer teal over green (Concept A)
- You prefer gold as the primary accent (Concept B or C)
- You want the textile heritage system to remain central (Concept E)

---

**Prepared by:** Senior Brand Designer
**Contact:** For questions or to request the full HTML mockup and component library
**Next steps:** Review mockup, conduct user testing, select final direction

---

*"Small moments, strung together."*
