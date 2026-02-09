# everaftr Brand Strategy: "Tropical Luxe Minimal"

## Visual Identity Redesign Proposal

**Prepared for:** Mervin De Castro, Founder
**Date:** February 8, 2026
**Version:** 1.0

---

## Executive Summary

The current "Woven Heritage" direction, while culturally thoughtful, suffers from a critical problem: it communicates *museum* when it should communicate *celebration*. Earth tones and textile patterns evoke craft markets and cultural exhibitions, not the electric excitement of planning a wedding. The six-textile concept, however meaningful, demands too much cognitive labor from a first-time visitor who has roughly 3 seconds to decide if this platform is for them.

**Tropical Luxe Minimal** replaces heaviness with light. It draws from the Philippines' most universally beloved qualities: the clarity of tropical water, the warmth of golden hour light, and the lush green that blankets the islands. It executes these references with the restraint of a luxury hotel lobby, not the saturation of a travel brochure. White space is not emptiness. It is the visual equivalent of a deep breath before the celebration begins.

---

## 1. Color Palette

### The Logic

The Philippines is an archipelago. Water is everywhere. Sunlight is everything. The most iconic Filipino visual moment is not a textile pattern; it is golden sunlight hitting turquoise water. That is the palette.

No pink. Bride and Breakfast owns pink in the Filipino wedding space. No red. It skews too Chinese New Year or Valentine's kitsch when paired with gold. No maroon or burgundy. Those are the earth tones we are escaping.

### Primary Palette

| Role | Color Name | Hex Code | Usage |
|------|-----------|----------|-------|
| **Background** | Clean White | `#FFFFFF` | Primary background, cards, modals |
| **Warm White** | Pearl | `#FAF8F5` | Alternating sections, subtle warmth |
| **Primary Accent** | Dagat Teal | `#1A7A6D` | CTAs, links, primary interactive elements |
| **Secondary Accent** | Sikat Gold | `#C8952E` | Highlights, badges, premium indicators, hover states |
| **Text Primary** | Deep Charcoal | `#1C1917` | Headlines, body text |
| **Text Secondary** | Warm Gray | `#78716C` | Captions, secondary text, metadata |

### Extended Palette (Supporting)

| Role | Color Name | Hex Code | Usage |
|------|-----------|----------|-------|
| **Teal Light** | Morning Lagoon | `#E6F3F1` | Teal tinted backgrounds, tag backgrounds |
| **Gold Light** | Sunrise Wash | `#FDF6E9` | Gold tinted backgrounds, notification banners |
| **Border** | Mist | `#E7E5E4` | Card borders, dividers, input borders |
| **Border Subtle** | Haze | `#F5F5F4` | Subtle separators, nested card borders |
| **Success** | Palawan Green | `#16A34A` | Success states, confirmations |
| **Error** | Taal Red | `#DC2626` | Error states only (never decorative) |
| **Warning** | Mayon Amber | `#D97706` | Warning states |

### Color Name Rationale

Every color carries a Filipino reference without requiring explanation:

- **Dagat**: The Filipino word for "sea/ocean." The teal is the color of the Sulu Sea at midday.
- **Sikat**: Means "ray of sun" in Filipino. The gold is Filipino golden hour, not jewelry-store gold.
- **Palawan**, **Taal**, **Mayon**: Named after iconic Philippine natural landmarks, embedding cultural identity into even the utility colors that users never consciously notice.

### Color Usage Rules

1. White (#FFFFFF) covers at minimum 65% of any given screen.
2. Pearl (#FAF8F5) is used for alternating sections to create depth without introducing color noise.
3. Dagat Teal is used for exactly one primary action per screen. Never two teal buttons visible simultaneously.
4. Sikat Gold is never used for body text. It is reserved for small accents: icon highlights, badge outlines, the logo mark, hover underlines.
5. Teal and Gold never touch each other directly in large blocks. White or charcoal always separates them.

---

## 2. Typography

### The Problem with Cormorant Garamond + Jost

Cormorant Garamond is beautiful but fragile. Its hairline strokes disappear on low-resolution Android screens, which are the primary devices in the Philippine market. Jost is competent but forgettable. Together, they feel like a European literary magazine, not a modern Filipino product.

### Proposed Pairing: Instrument Serif + DM Sans

| Role | Font | Weight(s) | Why |
|------|------|-----------|-----|
| **Display/Headlines** | Instrument Serif | Regular (400), Italic | High-contrast serif with dramatic, confident letterforms. It reads as luxury without being stuffy. The italic is stunning for pull quotes and hero text. Released 2023, still relatively fresh. |
| **Body/UI** | DM Sans | Regular (400), Medium (500), Bold (700) | Low-contrast geometric sans serif. Extremely legible at small sizes on mobile. Excellent on Android screens. Generous x-height. Modern without being cold. |

### Fallback Stack

```css
--font-display: "Instrument Serif", "Georgia", "Times New Roman", serif;
--font-body: "DM Sans", "system-ui", "-apple-system", "Segoe UI", sans-serif;
```

### Type Scale (Mobile-First)

```
Display:     2.5rem / 3rem    (40px / 48px) -- Hero headlines only
H1:          2rem / 2.5rem    (32px / 40px) -- Page titles
H2:          1.5rem / 2rem    (24px / 32px) -- Section titles
H3:          1.25rem / 1.5rem (20px / 24px) -- Card titles
Body:        1rem / 1.5rem    (16px / 24px) -- Paragraph text
Small:       0.875rem / 1.25rem (14px / 20px) -- Captions, metadata
Micro:       0.75rem / 1rem   (12px / 16px) -- Badges, tags
```

The first value is font-size, the second is line-height. All body text uses 1.5 line-height for readability. Headlines tighten to 1.2.

### Typography Rules

1. Instrument Serif is used ONLY for headlines (H1, H2) and the logo wordmark. Never for body text. Never for buttons.
2. DM Sans handles everything else: body, UI labels, buttons, navigation, forms.
3. Instrument Serif Italic is reserved for a single special use: the tagline or a pull-quote. One italic moment per page maximum.
4. Button text is always DM Sans Medium (500), all uppercase with 0.05em letter-spacing.
5. No font size below 14px anywhere on the platform. Philippine mobile users read on bright screens outdoors.

---

## 3. Homepage Redesign Concept

### Hero Section: "The Moment Before"

**What the visitor sees in the first 3 seconds:**

A full-width hero on a clean white background. On the left (desktop) or top (mobile): a large, warm photograph showing two people's hands interlaced, with tropical greenery soft-focused behind them. The hands are not gendered. No rings visible. No wedding dress. Just intimacy and warmth.

On the right (desktop) or below the image (mobile):

```
[Instrument Serif, Display size, Deep Charcoal]
Your love story,
beautifully planned.

[DM Sans, Body size, Warm Gray]
The Filipino wedding planning platform that connects you
with the best local vendors, traditions, and tools.

[Dagat Teal button, DM Sans Medium, uppercase]
START PLANNING

[Below the button, DM Sans Small, Warm Gray]
Free to start. No account required to browse.
```

**Why this works in 3 seconds:**

1. The image communicates love and warmth without prescribing what a couple looks like.
2. The headline says exactly what the product does in seven words.
3. The subheadline adds three concrete value pillars: vendors, traditions, tools.
4. The CTA removes friction with "Free to start."
5. The overall feeling is: calm, welcoming, breathing room. You have just arrived at a place that will take care of you.

### Section Flow (Top to Bottom)

```
1. HERO
   "Your love story, beautifully planned."
   Primary CTA: Start Planning

2. TRUST BAR
   A single horizontal line of logos or stats:
   "500+ vendors | 12 regions | 4.8 average rating"
   Clean, small, DM Sans. Just enough social proof.

3. HOW IT WORKS
   Three steps, three icons, three short sentences.
   White background, generous padding.

   Step 1: "Tell us about your celebration"
     (Note: "celebration" not "wedding" - inclusive language)
   Step 2: "Discover vendors who match your vision"
   Step 3: "Plan, book, and breathe easy"

   Each step has a small teal icon (line-art style, not filled).
   Below the three steps: a secondary CTA in outline style.

4. FEATURED VENDORS (The Curated Gallery)
   Section title in Instrument Serif: "Handpicked for you"

   NOT a grid of logos. Instead:

   A horizontal scroll of large, beautiful vendor cards.
   Each card is a full-bleed photograph (the vendor's best work)
   with a frosted-glass overlay at the bottom showing:
   - Vendor name (DM Sans Bold)
   - Category tag (e.g., "Photography | Cebu")
   - A small Sikat Gold star if they are "Featured"

   The horizontal scroll feels editorial, like flipping through
   a curated magazine, not scrolling through a marketplace.

   Below the scroll: "Browse all vendors" link in Dagat Teal.

5. CELEBRATION TYPES
   Section title: "Every love story is unique"

   A 2x2 grid (desktop) or vertical stack (mobile) of
   lifestyle photographs representing different celebration types:

   - Beach ceremony (coastal, outdoor)
   - Church wedding (traditional, cathedral)
   - Garden celebration (intimate, lush)
   - Destination elopement (adventurous, dramatic landscape)

   Each image has a soft white gradient overlay at the bottom
   with the celebration type name. No couple faces visible in
   these photos. Focus on venues, details, atmosphere.

   The diversity is communicated through variety of settings,
   not by showing specific types of couples.

6. TESTIMONIALS
   Pearl (#FAF8F5) background section.
   One large quote in Instrument Serif Italic at a time.
   Horizontal dots to indicate more quotes.
   Attribution: First name, region, year.

   "We found our photographer, coordinator, and caterer
    all in one afternoon. everaftr made it feel effortless."
    -- Maria & Jun, Tagaytay, 2025

7. THE PLANNING TOOLS PREVIEW
   Back to white background.
   Section title: "Plan smarter, not harder"

   A mockup of the planning dashboard on a phone screen,
   slightly angled, with a subtle drop shadow.
   Beside it (or below on mobile):

   - Checklist tracking
   - Budget calculator
   - Vendor messaging
   - Timeline builder

   Each feature is one line with a teal checkmark icon.
   CTA: "See all planning tools"

8. FOOTER
   Clean, minimal. Deep Charcoal background.
   Logo in white. Navigation links in columns.
   Social icons. A small line:
   "Made with malasakit in the Philippines."

   ("Malasakit" means genuine care/concern in Filipino.
   It is a word that resonates deeply and signals
   cultural authenticity without being heavy-handed.)
```

### Mobile-First Layout Notes

- Hero image is 60vh on mobile, text stacks below it.
- All horizontal scrolls use snap-scrolling with visible partial cards to signal scrollability.
- Touch targets are minimum 48px x 48px.
- No hamburger menu for primary navigation. Use a bottom tab bar with 4 items: Home, Vendors, Plan, Account.
- Section padding is 3rem (48px) top and bottom on mobile, 5rem on desktop.

---

## 4. The Weaving Brand Question

### Assessment of the Current Six-Textile Concept

The six-textile concept (Inabel, T'nalak, Yakan, Maranao, Hablon, Pinya Cloth) is a rich cultural idea. It is also, bluntly, a branding liability for the following reasons:

1. **Cognitive overload.** Six distinct textile traditions require education. A brand that requires a glossary is a brand that loses users at the homepage.

2. **Visual fragmentation.** Each textile has its own geometric language, color palette, and cultural context. Trying to represent all six creates a visual identity that pulls in six directions simultaneously.

3. **Exclusion risk.** By selecting six specific textile traditions, you implicitly exclude dozens of others. A Bicolano user may ask: "Where is my tradition?" A half-Chinese Filipino may see none of their heritage. The very attempt at inclusion creates new exclusions.

4. **Marketplace confusion.** Users need to understand what the platform does, not the cultural philosophy behind it. The textiles become noise in the value proposition.

### Three Options (Ranked by Recommendation)

#### OPTION A: "The Thread" (Simplified Weaving Concept) -- RECOMMENDED

Keep "threads" as a brand metaphor but reduce it to ONE visual idea, not six.

**The concept:** Every Filipino celebration is made of many threads: family, tradition, place, food, music, faith. everaftr helps you weave them together into something uniquely yours.

**Visual expression:**

A single, elegant line that curves and intersects to form abstract woven patterns. This line appears as:

- A subtle background pattern (very light, almost invisible, in Mist gray on white)
- A decorative element in section dividers (a single flowing line between sections)
- The logo itself could incorporate this -- the "a" in "aftr" could have an integrated thread line

This gives you the cultural depth of the weaving metaphor without the visual complexity of six textile traditions. One thread. One line. Infinitely adaptable.

**Why this is the best option:**

- Retains the cultural insight that Filipino celebrations are woven from many elements.
- Reduces visual complexity by 6x.
- The thread/weaving metaphor is universal enough to include ALL Filipino traditions, not just six specific ones.
- It works at every scale: favicon, social media avatar, hero background, loading animation (a line drawing itself).

#### OPTION B: "The Archipelago" (New Metaphor)

The Philippines is 7,641 islands. A wedding brings people together across islands, across distances, across differences. everaftr is the bridge.

**Visual expression:** Subtle dot/island clusters that connect with thin lines, like a constellation map. Each vendor or planning element is an "island" in the couple's celebration archipelago.

**Strength:** Uniquely Filipino, immediately visual.
**Weakness:** Could feel cold or tech-y. Constellation maps are trendy but overused in tech branding.

#### OPTION C: "The Feast" (New Metaphor)

The Filipino *handaan* (feast) is the ultimate expression of celebration and community. The long table where everyone is welcome. No assigned seats. No VIP section.

**Visual expression:** Long horizontal compositions, generous layouts, abundance communicated through space rather than clutter.

**Strength:** Deeply Filipino, warm, inclusive.
**Weakness:** Food-adjacent branding may confuse the product category. Could skew toward catering/restaurant.

### Final Recommendation: Option A

"The Thread" gives you cultural specificity without cultural gatekeeping. It is flexible, scalable, and can be expressed in everything from a loading animation to a section divider to a logo mark. It honors the original weaving insight while making it accessible to someone who lands on the homepage for three seconds and needs to understand what everaftr does.

---

## 5. Photography and Imagery Strategy

### The Current Problem

Empty image placeholders are the single biggest reason the current site feels lifeless. A wedding platform without photography is like a restaurant with no food on the tables. It communicates "we are not ready for you" or worse, "we have no customers."

### Image Strategy Framework

#### Category 1: Hero and Lifestyle Photography

**What to shoot (or source):**

- Hands: interlaced, exchanging rings, holding bouquets, lighting candles, signing documents
- Details: table settings, flower arrangements, invitation calligraphy, barong embroidery
- Spaces: empty venues bathed in golden light, garden paths, beach setups, church interiors
- Backs of heads: couples looking at sunsets, walking away down a path, silhouettes

**What NOT to show in hero/lifestyle imagery:**

- No faces in the primary hero. Faces immediately signal who the platform is "for" and who it is not "for."
- No specific religious ceremonies in hero imagery. Save those for category-specific pages.
- No stock photography. Filipino users can spot American stock photos instantly. The light, the skin tones, the venues are all wrong.

**Where to get this imagery (bootstrapping):**

1. Partner with 3 to 5 Filipino wedding photographers on the platform. Offer them "Featured Vendor" status for 6 months in exchange for 20 high-resolution photos each with usage rights.
2. Commission a single photoshoot at a venue partner. Cost: 15,000 to 25,000 PHP for a half-day with a good photographer. Use two real couples (one M/F, one same-sex or non-binary if possible) in non-traditional, non-religious settings. Focus on details and emotion, not ceremony.
3. Use Unsplash/Pexels for tropical landscape backgrounds ONLY (never for people). Filipino users do not care if a sunset is from Boracay or Bali, but they will notice if the couple is clearly American.

#### Category 2: Vendor Photography

Each vendor card needs one hero image. For launch:

- Require vendors to upload at least one photo during onboarding.
- Provide a simple photo guide: "Your best single image. Bright, well-lit, showing your work (not your logo)."
- For vendors without photos, use a category-specific placeholder: a teal-tinted abstract image (e.g., a close-up of fabric texture for fashion, a blurred bokeh of lights for venues).

#### Category 3: Planning Tool Screenshots

- Use actual product screenshots inside device mockups.
- iPhone frame for hero; generic phone outline for feature sections.
- Screenshots should show real-looking data (not "John Doe" and "Jane Smith" -- use Filipino names like "Ria & Marco" or "Alex & Sam").

### Art Direction Rules

1. **Color temperature:** All photos should be warm-toned. No blue/cold color grading.
2. **Saturation:** Slightly desaturated. Not Instagram-filtered. Natural but polished.
3. **Lighting:** Golden hour preferred. Soft natural light always. No harsh flash.
4. **Composition:** Lots of negative space in photos to allow text overlays. Off-center subjects.
5. **Diversity:** Over the first year, ensure imagery represents: Visayas venues, Mindanao details, Manila urban settings, province settings, different skin tones, different couple compositions, different scales of celebration (intimate to grand).

---

## 6. Concrete CSS @theme Tokens

This is the full @theme block for Tailwind CSS v4, implementing the Tropical Luxe Minimal system:

```css
@import "tailwindcss";

@theme {
  /* ============================================
     COLORS: Tropical Luxe Minimal
     ============================================ */

  /* --- Background --- */
  --color-white: #FFFFFF;
  --color-pearl: #FAF8F5;
  --color-pearl-warm: #F7F3EE;

  /* --- Primary: Dagat Teal --- */
  --color-dagat-50: #E6F3F1;
  --color-dagat-100: #C0E4DF;
  --color-dagat-200: #96D3CB;
  --color-dagat-300: #6BC1B6;
  --color-dagat-400: #4BB1A5;
  --color-dagat-500: #2BA194;
  --color-dagat-600: #1A7A6D;
  --color-dagat-700: #156259;
  --color-dagat-800: #104B44;
  --color-dagat-900: #0B342F;
  --color-dagat-950: #061E1B;

  /* --- Secondary: Sikat Gold --- */
  --color-sikat-50: #FDF6E9;
  --color-sikat-100: #FAEAC8;
  --color-sikat-200: #F5D48E;
  --color-sikat-300: #EFBB54;
  --color-sikat-400: #DBA233;
  --color-sikat-500: #C8952E;
  --color-sikat-600: #A67824;
  --color-sikat-700: #845E1C;
  --color-sikat-800: #634615;
  --color-sikat-900: #42300F;
  --color-sikat-950: #291E09;

  /* --- Neutral: Stone --- */
  --color-stone-50: #FAFAF9;
  --color-stone-100: #F5F5F4;
  --color-stone-200: #E7E5E4;
  --color-stone-300: #D6D3D1;
  --color-stone-400: #A8A29E;
  --color-stone-500: #78716C;
  --color-stone-600: #57534E;
  --color-stone-700: #44403C;
  --color-stone-800: #292524;
  --color-stone-900: #1C1917;
  --color-stone-950: #0C0A09;

  /* --- Semantic --- */
  --color-success: #16A34A;
  --color-success-light: #DCFCE7;
  --color-error: #DC2626;
  --color-error-light: #FEE2E2;
  --color-warning: #D97706;
  --color-warning-light: #FEF3C7;
  --color-info: #1A7A6D;
  --color-info-light: #E6F3F1;

  /* ============================================
     TYPOGRAPHY
     ============================================ */

  /* --- Font Families --- */
  --font-display: "Instrument Serif", "Georgia", "Times New Roman", serif;
  --font-body: "DM Sans", "system-ui", "-apple-system", "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Cascadia Code", monospace;

  /* --- Font Sizes (Mobile-first) --- */
  --text-micro: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;
  --text-5xl: 3rem;

  /* --- Line Heights --- */
  --leading-tight: 1.2;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 1.75;

  /* --- Letter Spacing --- */
  --tracking-tight: -0.02em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  /* --- Font Weights --- */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ============================================
     SPACING
     ============================================ */

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;
  --spacing-5xl: 8rem;

  /* --- Section Spacing (vertical rhythm) --- */
  --section-padding-mobile: 3rem;
  --section-padding-desktop: 5rem;

  /* ============================================
     BORDERS & RADIUS
     ============================================ */

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  --border-default: 1px solid #E7E5E4;
  --border-subtle: 1px solid #F5F5F4;

  /* ============================================
     SHADOWS
     ============================================ */

  /* Warm-toned shadows (not default blue-gray) */
  --shadow-sm: 0 1px 2px 0 rgba(28, 25, 23, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(28, 25, 23, 0.06), 0 2px 4px -2px rgba(28, 25, 23, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(28, 25, 23, 0.06), 0 4px 6px -4px rgba(28, 25, 23, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(28, 25, 23, 0.07), 0 8px 10px -6px rgba(28, 25, 23, 0.04);
  --shadow-card: 0 1px 3px 0 rgba(28, 25, 23, 0.05), 0 1px 2px -1px rgba(28, 25, 23, 0.05);
  --shadow-card-hover: 0 10px 20px -5px rgba(28, 25, 23, 0.08), 0 4px 6px -4px rgba(28, 25, 23, 0.03);

  /* ============================================
     TRANSITIONS
     ============================================ */

  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ============================================
     LAYOUT
     ============================================ */

  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1180px;
  --container-2xl: 1320px;

  /* Content width cap (for readability) */
  --content-width: 680px;

  /* ============================================
     Z-INDEX
     ============================================ */

  --z-below: -1;
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 20;
  --z-sticky: 30;
  --z-overlay: 40;
  --z-modal: 50;
  --z-toast: 60;
  --z-tooltip: 70;

  /* ============================================
     BREAKPOINTS (reference, used in @media)
     ============================================ */

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Companion Utility Classes

These would be defined alongside the @theme block:

```css
/* ============================================
   BASE LAYER OVERRIDES
   ============================================ */

@layer base {
  html {
    font-family: var(--font-body);
    color: var(--color-stone-900);
    background-color: var(--color-white);
    font-size: 16px;
    line-height: var(--leading-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Display headings: Instrument Serif */
  h1, h2 {
    font-family: var(--font-display);
    font-weight: var(--font-weight-regular);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--color-stone-900);
  }

  /* Sub-headings: DM Sans */
  h3, h4, h5, h6 {
    font-family: var(--font-body);
    font-weight: var(--font-weight-semibold);
    line-height: var(--leading-snug);
    color: var(--color-stone-900);
  }

  /* Links default to teal */
  a {
    color: var(--color-dagat-600);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--color-dagat-700);
  }

  /* Focus ring: teal outline */
  :focus-visible {
    outline: 2px solid var(--color-dagat-500);
    outline-offset: 2px;
  }

  /* Selection highlight */
  ::selection {
    background-color: var(--color-dagat-100);
    color: var(--color-dagat-900);
  }
}

/* ============================================
   COMPONENT PATTERNS
   ============================================ */

@layer components {
  /* Primary Button */
  .btn-primary {
    background-color: var(--color-dagat-600);
    color: var(--color-white);
    font-family: var(--font-body);
    font-weight: var(--font-weight-medium);
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-sm);
  }

  .btn-primary:hover {
    background-color: var(--color-dagat-700);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .btn-primary:active {
    background-color: var(--color-dagat-800);
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  /* Secondary/Outline Button */
  .btn-secondary {
    background-color: transparent;
    color: var(--color-dagat-600);
    border: 1.5px solid var(--color-dagat-600);
    font-family: var(--font-body);
    font-weight: var(--font-weight-medium);
    font-size: var(--text-sm);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
  }

  .btn-secondary:hover {
    background-color: var(--color-dagat-50);
    border-color: var(--color-dagat-700);
    color: var(--color-dagat-700);
  }

  /* Ghost Button (for less prominent actions) */
  .btn-ghost {
    background-color: transparent;
    color: var(--color-stone-600);
    font-family: var(--font-body);
    font-weight: var(--font-weight-medium);
    font-size: var(--text-sm);
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .btn-ghost:hover {
    background-color: var(--color-stone-100);
    color: var(--color-stone-900);
  }

  /* Vendor Card */
  .vendor-card {
    background-color: var(--color-white);
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: all var(--transition-slow);
  }

  .vendor-card:hover {
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-2px);
  }

  /* Section alternating backgrounds */
  .section-white {
    background-color: var(--color-white);
    padding: var(--section-padding-mobile) 0;
  }

  .section-pearl {
    background-color: var(--color-pearl);
    padding: var(--section-padding-mobile) 0;
  }

  @media (min-width: 1024px) {
    .section-white,
    .section-pearl {
      padding: var(--section-padding-desktop) 0;
    }
  }

  /* Sikat Gold accent line (the "thread" brand element) */
  .thread-divider {
    width: 3rem;
    height: 2px;
    background: linear-gradient(90deg, var(--color-sikat-500), var(--color-sikat-300));
    border-radius: var(--radius-full);
    margin: 1.5rem 0;
  }

  /* Tag / Badge */
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    font-family: var(--font-body);
    font-size: var(--text-micro);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    border-radius: var(--radius-full);
    background-color: var(--color-dagat-50);
    color: var(--color-dagat-700);
  }

  .tag-gold {
    background-color: var(--color-sikat-50);
    color: var(--color-sikat-700);
  }

  /* Featured badge with gold accent */
  .badge-featured {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.75rem;
    font-family: var(--font-body);
    font-size: var(--text-micro);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    border-radius: var(--radius-full);
    background-color: var(--color-sikat-50);
    color: var(--color-sikat-700);
    border: 1px solid var(--color-sikat-200);
  }
}
```

---

## 7. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

1. Replace @theme tokens in the CSS file.
2. Add Instrument Serif and DM Sans via Google Fonts.
3. Update base typography styles.
4. Replace color variables throughout templates.
5. Implement the thread divider component.

### Phase 2: Homepage (Week 2-3)

1. Build hero section with new layout.
2. Implement trust bar.
3. Build "How it works" section.
4. Create vendor card component.
5. Build horizontal-scroll featured vendors.

### Phase 3: Photography (Week 3-4)

1. Commission or source hero imagery (partner with vendor photographers).
2. Create category placeholder images (teal-tinted abstracts).
3. Replace all empty placeholders.
4. Implement lazy loading for images.

### Phase 4: Polish (Week 4-5)

1. Mobile navigation (bottom tab bar).
2. Microinteractions (button hover, card hover, page transitions).
3. Loading states with thread animation.
4. Accessibility audit (contrast ratios, focus states, screen reader testing).

---

## 8. Competitive Differentiation Summary

| Aspect | Bride & Breakfast | Kasal.com | everaftr (Proposed) |
|--------|------------------|-----------|---------------------|
| **Color** | Pink/Blush | Red/Traditional | Teal + Gold on White |
| **Feel** | Feminine blog | Directory/Listing | Luxury minimal tool |
| **Typography** | Script/Decorative | Standard sans | Premium serif + clean sans |
| **Imagery** | Heavy, editorial | Thumbnail grids | Curated, warm, inclusive |
| **Audience** | Brides specifically | All but dated | All couples, modern |
| **White space** | Medium | Low | High (defining trait) |
| **Mobile** | Responsive | Responsive | Mobile-first, bottom nav |

---

## 9. Brand Voice Implications

The visual direction implies a tonal shift in copy as well:

**Old voice (Woven Heritage):** "Discover the rich tapestry of Filipino wedding traditions woven across our beautiful islands."

**New voice (Tropical Luxe Minimal):** "Plan your celebration. Find your people. Breathe easy."

The new voice is:
- **Short.** Sentences rarely exceed 10 words in headlines.
- **Direct.** No flowery metaphors unless they earn their place.
- **Warm but not precious.** "Your love story" not "Your magical fairy-tale journey."
- **Inclusive by default.** "Couples" not "brides and grooms." "Celebration" not "wedding" where possible. "Partners" not "husband and wife."
- **Filipino without performing Filipino-ness.** One Filipino word in the footer (malasakit) is worth more than ten textile names in the brand guide.

---

## Summary of Key Decisions

| Decision | Recommendation |
|----------|---------------|
| Primary accent color | Dagat Teal `#1A7A6D` |
| Secondary accent color | Sikat Gold `#C8952E` |
| Display font | Instrument Serif (replace Cormorant Garamond) |
| Body font | DM Sans (replace Jost) |
| Weaving concept | Simplify to "The Thread" -- single line motif |
| Hero approach | Left image / right text, non-gendered hands photo |
| Vendor display | Horizontal editorial scroll, not grid |
| Brand metaphor | Threads weaving a celebration together |
| Footer tagline | "Made with malasakit in the Philippines." |

---

*This document is a living strategy. Revisit quarterly as the platform grows, user feedback accumulates, and the vendor network expands. The palette, typography, and component system are designed to scale from 10 vendors to 10,000 without requiring a rebrand.*
