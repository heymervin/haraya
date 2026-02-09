# Heritage Gold -- Visual Direction for everaftr

**Prepared by:** Art Direction
**Date:** February 8, 2026
**Status:** Proposal for founder review

---

## The Diagnosis

The current "Woven Heritage" system uses six Filipino textile traditions, each with its own color palette, mapped to different sections of the platform. On paper it is culturally rich. In practice it creates three problems:

1. **Visual weight.** Six palettes (18+ colors) competing across earth tones produces a murky, heavy aesthetic. The background alternates between `#FDFAF3`, `#F5EDD8`, `#EDE4CC` -- all warm beige variants that stack into a wall of cream. Nothing breathes.

2. **No hierarchy.** When everything is a different color, nothing is special. The Inabel indigo for vendor badges, the T'nalak red for primary accents, the Hablon green for success, the Yakan teal for community, the Langkit violet for AI -- a user cannot intuit what anything means. The colors serve the design system's taxonomy, not the user's experience.

3. **Dullness disguised as warmth.** The current `bg-primary: #FDFAF3` and `bg-warm: #F5EDD8` backgrounds, paired with `text-primary: #2A2520` and `accent-primary: #8B3A3A` (a muted brick red), produce an overall feel that is sepia-toned. It reads as faded, not inviting. Warm is not the same as welcoming.

The founder is right. It feels dull. The cultural concept is sound but the execution is overloaded.

---

## The Proposal: Heritage Gold

**One thread. Not six.**

Strip the design back to its most elemental truth: the single material that connects every Filipino textile tradition, every ancestral ceremony, and every celebration. Gold.

Gold appears in the Inabel weave (`#C4962E`). Gold appears in the Langkit decorative cloth (`#C9A84C`). Gold appears in the Hablon plaid (`#D4A843`). Before all of these textiles, gold was already the defining material of pre-colonial Philippine culture -- the 10th to 14th century "Philippine Gold Era" produced thousands of artifacts: sashes, death masks, chains, rings. The thirteen arrhae coins placed in a couple's hands during a Filipino wedding are gold. The delicate calado embroidery on the barong tagalog catches light like gold thread.

Gold is not one of six decorative colors. Gold is THE cultural throughline. Make it the only accent that matters, and let white space do the rest.

**The tagline evolves:**
- FROM: "Six threads. One platform. Every couple."
- TO: "One golden thread. Every celebration."

---

## 1. The Color System

### 1.1 Primary Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Canvas** | White | `#FFFFFF` | Primary background, cards, modals, content areas |
| **Canvas (soft)** | Snow | `#FAFAFA` | Alternate section backgrounds for rhythm, input fields |
| **Heritage Gold** | Gold | `#B8960C` | Brand accent, star ratings, premium indicators, decorative elements |
| **Gold (light)** | Gold Mist | `#F7F3E8` | Subtle gold-tinted backgrounds, hover states, selected states |
| **Gold (dark)** | Deep Gold | `#96790A` | Gold hover/pressed states, gold text on light backgrounds |
| **Text** | Ink | `#1A1613` | Primary text -- near-black with a warm brown undertone |
| **Text (secondary)** | Stone | `#6B6560` | Secondary text, captions, metadata |
| **Text (tertiary)** | Mist | `#9C9590` | Placeholder text, disabled states, subtle labels |
| **Border** | Silk | `#E8E5E0` | Card borders, dividers, input outlines |
| **Border (subtle)** | Whisper | `#F0EEEB` | Very subtle dividers, inner section separators |

### 1.2 The CTA Color: Deep Teal

The primary action color cannot be gold (gold reads as decorative, not actionable). It cannot be red or pink (competitor territory and gendered). It cannot be the current brick red `#8B3A3A` (dull, aggressive).

**The answer is deep teal: `#1A7A6D`.**

Why teal:
- It is the complementary contrast to gold on the color wheel, creating natural visual tension.
- It reads as trustworthy (finance, health care, and legal platforms favor teal for this reason).
- It is gender-neutral, warm enough to feel approachable, cool enough to feel professional.
- It has precedent in Filipino textiles -- the Yakan teal `#2D7D7B` was already in the system, just buried among five other palette families.
- It passes WCAG AA contrast on white backgrounds at this specific value.

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **CTA** | Teal | `#1A7A6D` | Primary buttons, interactive links, progress indicators |
| **CTA hover** | Teal Deep | `#14635A` | Button hover state |
| **CTA pressed** | Teal Dark | `#0E4C44` | Button active/pressed state |
| **CTA light** | Teal Mist | `#EFF8F6` | Teal-tinted backgrounds, selected pill states, badges |

### 1.3 Semantic / State Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Success** | Fern | `#2D8659` | Success messages, confirmation, completed states |
| **Success (light)** | Fern Mist | `#EDF7F1` | Success background tints |
| **Warning** | Amber | `#C47F17` | Warning messages, approaching limits |
| **Warning (light)** | Amber Mist | `#FDF6E8` | Warning background tints |
| **Error** | Ember | `#C4392E` | Error messages, destructive actions, validation |
| **Error (light)** | Ember Mist | `#FDF0EF` | Error background tints |
| **Info** | Slate | `#3D6B8F` | Informational messages, help text, tips |
| **Info (light)** | Slate Mist | `#EFF4F8` | Info background tints |

### 1.4 Dark Surface (Footer, Dark Sections)

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Dark** | Obsidian | `#141210` | Footer background, dark hero variants |
| **Dark (elevated)** | Charcoal | `#1E1B18` | Cards on dark backgrounds |
| **Text on dark** | Linen | `#F5F2ED` | Body text on dark backgrounds |
| **Gold on dark** | Bright Gold | `#D4AC16` | Gold accent on dark backgrounds (higher luminance) |

### 1.5 Contrast Ratios (WCAG AA Compliance)

| Combination | Ratio | Pass |
|-------------|-------|------|
| Ink `#1A1613` on White `#FFFFFF` | 16.8:1 | AAA |
| Ink `#1A1613` on Snow `#FAFAFA` | 16.2:1 | AAA |
| Stone `#6B6560` on White `#FFFFFF` | 5.1:1 | AA |
| Teal `#1A7A6D` on White `#FFFFFF` | 4.8:1 | AA |
| Deep Gold `#96790A` on White `#FFFFFF` | 4.7:1 | AA (text only at 18px+) |
| Heritage Gold `#B8960C` on Obsidian `#141210` | 6.2:1 | AA |
| Linen `#F5F2ED` on Obsidian `#141210` | 15.4:1 | AAA |

---

## 2. The Gold Thread -- Cultural Narrative

### 2.1 Why Gold is Deeper Than "Six Textiles"

The current brand story asks users to understand six textile traditions from six Philippine regions, each with its own color vocabulary and symbolism. That is an education project, not a brand. Most users will never read the About page or care that Hablon comes from Iloilo.

Gold tells one story that every Filipino already knows:

**The Philippine Gold Era (10th-14th century).** Long before Spanish colonization, the Philippine archipelago was part of a vast maritime gold trade network across Southeast Asia. Filipino goldsmiths created sashes, death masks, necklaces, and chains of extraordinary sophistication. The 1981 discovery at Surigao alone yielded the "Golden Tara" and thousands of artifacts. This is not obscure history -- it is a source of deep national pride. The Bangko Sentral ng Pilipinas museum houses an entire pre-colonial gold and pottery collection. Philippine gold heritage is a well-documented, emotionally resonant cultural touchstone.

**Gold across all six textiles.** The original design system already acknowledged this: Inabel gold `#C4962E`, Langkit gold `#C9A84C`, Hablon yellow-gold `#D4A843`. Gold is the color that appears in the most textile traditions. It was always the common thread; the system just never elevated it.

**The Arrhae.** Thirteen gold coins placed in a couple's hands during the wedding ceremony -- symbolizing prosperity, commitment, and shared fortune. This is the most universally recognized Filipino wedding symbol. It connects directly to the product's purpose. The arrhae is literally gold in a couple's hands.

**The Barong Tagalog.** The national formal garment features hand-embroidered calado and bordado patterns, often with gold or ecru thread on translucent pina or jusi fabric. The interplay of gold thread on white translucent fabric IS the Heritage Gold aesthetic -- thread on canvas.

**The Inabel Trade.** Before colonial contact, Ilocano weavers traded their inabel textiles for gold with Asian maritime traders. The relationship between Philippine weaving and gold is not metaphorical; it is historical fact. Gold was literally the currency of the weaving tradition.

### 2.2 Brand Story (Suggested Copy)

> Before six traditions, there was one material.
>
> For centuries before colonization, Filipino goldsmiths crafted sashes, chains, and ceremonial ornaments that traveled across Southeast Asian trade routes. Ilocano weavers traded their inabel cloth for gold. The T'boli dreamed their patterns into existence under golden light. And in every Filipino wedding ceremony, thirteen gold coins -- the arrhae -- are placed in a couple's hands as a promise of shared fortune.
>
> everaftr is built on that single golden thread: the idea that planning a celebration should feel precious, intentional, and unmistakably Filipino. Our design draws from the same principle as a barong tagalog -- gold thread on a clean, luminous canvas. Simple enough to be modern. Rooted enough to be ours.

### 2.3 How Gold Functions in the UI

Gold is NOT a primary action color. Gold is a **heritage marker** -- it appears where the brand's cultural identity needs to be felt.

| Element | Gold Treatment |
|---------|---------------|
| **Logo accent** | The wordmark "everaftr" in Heritage Gold on dark backgrounds |
| **Star ratings** | Filled stars in Heritage Gold (already using `#C4962E` -- migrate to `#B8960C`) |
| **Woven border** | Single gold thread line replacing the 6-color stripe |
| **Section dividers** | Thin gold rule between major content areas |
| **Premium indicators** | "Verified Vendor" badge accent, featured listing borders |
| **Decorative moments** | Hero section abstract thread illustration, empty state illustrations |
| **Hover highlights** | Card hover state uses Gold Mist `#F7F3E8` background |
| **Pull quotes** | Left border in Heritage Gold |
| **Page headings** | Serif headings can use Deep Gold `#96790A` for emphasis on select pages |

Gold should feel earned, not sprayed. If everything is gold, nothing is.

---

## 3. Typography

### 3.1 Assessment of Current Pairing

**Cormorant Garamond** (serif, headings): Beautiful typeface with high stroke contrast. It reads as literary and elegant. However, it has two issues at this scale: (a) at small sizes on mobile, the thin strokes nearly disappear, creating readability problems on budget Android screens over 4G; (b) it leans editorial/magazine rather than modern-premium.

**Jost** (sans-serif, body): Geometric sans with Futura DNA. Clean and modern, but somewhat cold and generic. It does not have enough personality to carry "Filipino-modern" on its own. At light weights (200, 300) it becomes very thin on low-resolution screens.

### 3.2 Recommendation: Keep Cormorant Garamond, Replace Jost with Plus Jakarta Sans

**Keep: Cormorant Garamond** for headings. It is distinctive, it has character, and it pairs well with gold accents. The thin/thick stroke contrast echoes the gold thread / white canvas concept. Constraint: never use it below 20px, and avoid weights below 400 for mobile.

**Replace Jost with: Plus Jakarta Sans** for body text and UI elements.

Why Plus Jakarta Sans:
- It is a geometric sans-serif like Jost, so the visual shift is subtle, not jarring.
- It has slightly more humanist warmth -- the terminals are softer, the letter spacing is more generous.
- It renders crisply at small sizes, even on low-DPI Android screens. Its x-height is larger than Jost's.
- It has extensive weight range (200-800) with clean intermediary weights.
- The name itself references Jakarta -- Southeast Asian origin, which subtly reinforces the regional identity without being explicit.
- It is available on Google Fonts and is widely supported.

**Alternative consideration:** If the founder wants to stay even closer to the current aesthetic, **Inter** is the safe choice -- it is the most readable sans-serif on screens at any size. But it is also the most common. Plus Jakarta Sans offers nearly the same readability with more personality.

### 3.3 Type Scale

A modular scale based on 1.250 (major third) for hierarchy:

| Element | Font | Weight | Size (mobile) | Size (desktop) | Line Height | Letter Spacing |
|---------|------|--------|----------------|-----------------|-------------|----------------|
| Display | Cormorant Garamond | 300 | 32px | clamp(36px, 5vw, 56px) | 1.1 | -0.01em |
| H1 | Cormorant Garamond | 400 | 28px | clamp(30px, 4vw, 42px) | 1.15 | -0.005em |
| H2 | Cormorant Garamond | 400 | 24px | clamp(26px, 3.5vw, 34px) | 1.2 | 0 |
| H3 | Plus Jakarta Sans | 600 | 18px | 20px | 1.3 | 0.01em |
| H4 | Plus Jakarta Sans | 600 | 16px | 17px | 1.4 | 0.015em |
| Body | Plus Jakarta Sans | 400 | 15px | 16px | 1.7 | 0.01em |
| Body small | Plus Jakarta Sans | 400 | 13px | 14px | 1.6 | 0.015em |
| Caption | Plus Jakarta Sans | 500 | 11px | 12px | 1.5 | 0.04em |
| Button | Plus Jakarta Sans | 500 | 14px | 14px | 1 | 0.06em |
| Nav link | Plus Jakarta Sans | 400 | 14px | 14px | 1 | 0.05em |
| Wordmark | Plus Jakarta Sans | 200 | 20px | 24px | 1 | 0.15em |

---

## 4. Homepage Redesign

### 4.1 Hero Section: "White Canvas, Gold Thread"

The current hero is a beige-on-beige box with a pattern overlay (`pattern-pina bg-pina-ivory`). It is dense and warm but not impactful.

**New approach:**

```
+----------------------------------------------------------+
|  [Navbar -- white bg, clean, generous padding]            |
+----------------------------------------------------------+
|  [Gold Thread Line -- 1px, full width]                    |
+----------------------------------------------------------+
|                                                           |
|            (generous white space -- 120px+)               |
|                                                           |
|     The best way to plan                                  |
|     a Filipino celebration                                |
|                                                           |
|     (Cormorant Garamond, 300 weight, Display size)        |
|     (Ink color, centered)                                 |
|                                                           |
|     -- gold thread ornament, centered, ~80px wide --      |
|                                                           |
|     plan together, celebrate forevr                        |
|     (Plus Jakarta Sans, 400, small, Stone color)          |
|                                                           |
|     [  Find Vendors  ]    [ Start Planning ]              |
|     (Teal, filled)        (Outlined, Ink border)          |
|                                                           |
|            (generous white space -- 80px+)                 |
|                                                           |
+----------------------------------------------------------+
```

Key changes:
- **Pure white background.** No cream, no ivory, no pattern. Let the typography and gold ornament carry the weight.
- **One heading.** No subtitle paragraph in the hero. The tagline is enough. The explanation text moves below the fold.
- **Gold thread ornament.** A small horizontal decorative element between the heading and tagline -- a stylized line inspired by the calado pattern on a barong tagalog. This can be a simple SVG: two thin parallel lines with a small woven diamond in the center.
- **Breathing room.** The hero should be at least 70vh on mobile, 80vh on desktop. Let the words sit in silence.
- **Buttons are smaller, tighter, more refined.** Current buttons feel like blocky rectangles. New buttons: pill-radius (rounded-full or rounded-lg), more horizontal padding, tighter vertical padding.

### 4.2 Vendor Introduction: The Curated Scroll

The current homepage dumps 6 vendor cards in a 3-column grid under "Featured Vendors." This is a marketplace layout, not a premium experience.

**New approach: The Curated Carousel**

Instead of a grid, introduce vendors as a horizontally scrollable row with generous peek (showing partial next card). This is the dominant pattern on Airbnb, The Knot, and every premium marketplace for a reason: it implies abundance without overwhelming.

```
+----------------------------------------------------------+
|                                                           |
|  Trusted vendors for your celebration                     |
|  (H2, Cormorant Garamond, left-aligned)                  |
|                                                           |
|  View all vendors ->                                      |
|  (Small link, Teal, right-aligned same line as H2)       |
|                                                           |
|  +-------------+  +-------------+  +------               |
|  | [Photo]     |  | [Photo]     |  | [Phot              |
|  |             |  |             |  |                     |
|  | Vendor Name |  | Vendor Name |  | Vendo              |
|  | Location    |  | Location    |  | Locat              |
|  | **** (4.8)  |  | **** (4.9)  |  | ****               |
|  +-------------+  +-------------+  +------               |
|                                                           |
|  <- swipe indicators / dots ->                            |
|                                                           |
+----------------------------------------------------------+
```

Key details:
- Cards show on white with very subtle border (`#E8E5E0`), no background color difference.
- On hover, the card gets a `Gold Mist` background tint and a 1px gold top-border -- the "gold thread" highlight.
- Show category as small text above vendor name, not as a colored badge overlay on the image.
- Three visible on desktop, one and a half on mobile (the half-card is the invitation to scroll).
- Verified vendors get a small gold checkmark, not a green badge.

### 4.3 Progressive Disclosure

The current homepage has 8 sections stacked vertically: Hero, How It Works, Featured Vendors, Categories, Why everaftr, Explore More, Matchmaker CTA, Stats. That is too many sections fighting for attention.

**New homepage structure (5 sections):**

1. **Hero** -- The statement. White canvas, heading, gold ornament, two CTAs.
2. **Featured Vendors** -- Curated horizontal scroll. Social proof through real vendors.
3. **How It Works** -- Three steps. Simpler cards, icons in Teal, white cards on Snow background.
4. **The Promise** -- A single full-width statement block. "For every couple. Every love story. Every celebration." On a very subtle Gold Mist background with a small gold thread border top and bottom. One CTA: "Take the Quiz" or "Learn More."
5. **Categories** -- Only visible on scroll. 2x3 grid on desktop, single column on mobile with horizontal scroll.

What got cut:
- "Why everaftr" feature grid (four cards saying Filipino-First, Every Couple Welcome, etc.) -- this is About page content. Put it there.
- "Explore More" with the Celebrations and Community CTA cards -- these are nav items. The user can find them in navigation.
- Stats section ("13 Pages & Features, 80+ Vendors") -- these numbers are not impressive enough to display as social proof yet. Add them back when there are real numbers.

### 4.4 Section Transitions

The current design alternates between `bg-pina-ivory` and `bg-bg-primary` with pattern overlays. Sections feel like colored blocks.

**New approach: The Thread Continues**

Between each major section, insert a thin gold line ornament (the "thread") centered on the page. This creates visual continuity without colored section backgrounds.

```css
.section-thread {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
}

.section-thread::before,
.section-thread::after {
  content: '';
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #B8960C, transparent);
}
```

Sections alternate between `#FFFFFF` and `#FAFAFA` only -- a barely perceptible shift that creates rhythm without color.

### 4.5 The Woven Border Evolution

**Current:** A 4px multi-color gradient stripe cycling through red, indigo, green, gold, and back to red. Placed between navbar and content.

**New:** A single 1px gold line. Full width. Between navbar and content, and between content and footer. On loading states, this line animates with a subtle shimmer effect (gold traveling left-to-right, like thread being drawn through a loom).

For special moments (hero sections, CTA banners), the line becomes 2px and gains a very subtle glow:

```css
.gold-thread {
  height: 1px;
  background: #B8960C;
}

.gold-thread-glow {
  height: 2px;
  background: #B8960C;
  box-shadow: 0 0 8px rgba(184, 150, 12, 0.3);
}

.gold-thread-shimmer {
  height: 1px;
  background: linear-gradient(90deg, transparent, #B8960C, transparent);
  background-size: 200% 100%;
  animation: thread-draw 2s ease-in-out infinite;
}

@keyframes thread-draw {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## 5. Component Evolution

### 5.1 Cards

**Current:** `bg-bg-primary border border-border rounded-lg` with colored badge overlays, hover shadow.

**New:**

```
Base state:
- Background: #FFFFFF
- Border: 1px solid #E8E5E0
- Border-radius: 12px (softer)
- Shadow: none
- Padding: increased by 20%

Hover state:
- Background: #FFFFFF
- Border: 1px solid #E8E5E0
- Border-top: 2px solid #B8960C (gold thread appears)
- Shadow: 0 4px 24px rgba(26, 22, 19, 0.06)
- Transform: translateY(-2px)

Selected/Active state:
- Background: #F7F3E8 (Gold Mist)
- Border: 1px solid #B8960C
```

Vendor cards specifically:
- Image aspect ratio: 4:3 (currently variable)
- Category label: small text above vendor name in Stone color, NOT a colored overlay badge
- Verified badge: small gold circle with checkmark, inline with vendor name
- "All Celebrations Welcome": text badge in Teal Mist background with Teal text (not a violet block)
- Price: displayed in Ink, not bold -- let the number speak
- Tags: text-only with subtle separators (pipes or dots), no pill backgrounds

### 5.2 Buttons

**Current:** `rounded bg-accent-primary px-8 py-3 text-sm tracking-wide` -- blocky rectangles in brick red.

**New:**

```
Primary (CTA):
- Background: #1A7A6D (Teal)
- Text: #FFFFFF
- Border-radius: 8px (or pill: 999px -- test both)
- Padding: 10px 28px
- Font: Plus Jakarta Sans, 500 weight, 14px, 0.04em tracking
- Hover: #14635A
- Active: #0E4C44
- Shadow: none at rest, subtle on hover
- Transition: background 150ms ease, transform 100ms ease
- Hover transform: translateY(-1px)

Secondary (Outline):
- Background: transparent
- Text: #1A1613 (Ink)
- Border: 1px solid #E8E5E0
- Border-radius: 8px
- Padding: 10px 28px
- Hover: border-color #1A1613, background #FAFAFA

Tertiary (Ghost):
- Background: transparent
- Text: #1A7A6D (Teal)
- Border: none
- Padding: 10px 16px
- Hover: background #EFF8F6 (Teal Mist)

Gold (Premium/Special):
- Background: transparent
- Text: #96790A (Deep Gold)
- Border: 1px solid #B8960C
- Border-radius: 8px
- Hover: background #F7F3E8 (Gold Mist)
- Use sparingly: vendor dashboard upgrades, premium features
```

### 5.3 Navigation

**Current:** Sticky, `bg-primary/95` with backdrop blur, 16 height (`h-16`), brick-red logo.

**New:**

```
Desktop:
- Background: #FFFFFF with 98% opacity, backdrop-blur-md
- Height: 64px (same h-16 but visually more spacious)
- Max-width: 1200px centered
- Logo: "everaftr" in Plus Jakarta Sans, weight 200, 24px, letter-spacing 0.15em
- Logo color: #1A1613 (Ink) on light backgrounds, #B8960C (Heritage Gold) on dark
- Nav links: Plus Jakarta Sans, weight 400, 14px, #6B6560 (Stone)
- Active link: #1A1613 (Ink) with a 2px gold underline offset 4px below
- Hover link: #1A1613 (Ink)
- Border-bottom: 1px solid #F0EEEB (barely visible, not the current cream)
- The gold thread line sits below this border

Mobile:
- Same white background
- Hamburger icon: 20px, Ink color
- Drawer: full-width, white background (NOT bg-warm)
- Drawer links: 16px, generous 56px tap targets
- Section labels: 11px, uppercase, Gold color, 0.08em tracking
```

### 5.4 Section Differentiation Without Color Palettes

The current system gives each section a textile-derived color palette. Heritage Gold replaces this with **structural differentiation** -- same palette, different compositional approaches:

| Section | Background | Layout Character | Accent Treatment |
|---------|-----------|-----------------|-----------------|
| **Homepage** | White | Centered, spacious, editorial | Gold ornaments, Teal CTAs |
| **Vendor Directory** | Snow | Dense but organized grid, filters sidebar | Teal interactive elements, gold stars |
| **Vendor Profile** | White | Single-column focus, large images | Gold verified badge, Teal inquiry CTA |
| **Planning Tools** | Snow | Structured, checkbox/list UI, tabs | Teal progress indicators, gold milestone markers |
| **Guest List** | White | Table/list layout, status indicators | Teal action buttons, gold count highlights |
| **Celebrations** | White | Story layout, large editorial images | Gold pull-quote borders, serif-forward |
| **Community** | Snow | Thread/card feed layout | Teal engagement actions, gold author badges |
| **Kasa (AI)** | White | Chat/conversational UI | Teal send button, gold Kasa avatar accent |
| **Matchmaker** | White, Gold Mist on results | Step-by-step flow, centered | Gold progress line, Teal selection states |
| **About** | White | Long-form editorial, full-bleed images | Gold section dividers, serif-heavy |

The differentiation comes from layout density and content type, not from background colors. Every page looks like it belongs to the same brand.

### 5.5 Badges and Status Indicators

| Badge | Current | New |
|-------|---------|-----|
| Verified Vendor | Green pill with icon on image overlay | Small gold circle (16px) with white checkmark, inline next to vendor name |
| All Celebrations Welcome | Violet pill on image overlay | Teal text with Teal Mist background pill, in card metadata area |
| Category label | Blue/indigo pill on image overlay | Stone-colored text label above vendor name, no background |
| Ceremony type filter | Various colors | Teal Mist pills when selected, white with border when unselected |
| Price range | Plain text | Ink text, Plus Jakarta Sans, medium weight |

### 5.6 Form Elements

```
Input (text, select, textarea):
- Background: #FAFAFA (Snow)
- Border: 1px solid #E8E5E0 (Silk)
- Border-radius: 8px
- Padding: 12px 16px
- Font: Plus Jakarta Sans, 400, 15px
- Focus: border-color #1A7A6D (Teal), shadow 0 0 0 3px #EFF8F6 (Teal Mist)
- Error: border-color #C4392E (Ember), shadow 0 0 0 3px #FDF0EF (Ember Mist)
- Placeholder: #9C9590 (Mist)

Checkbox / Radio:
- Unchecked: 1px solid #E8E5E0
- Checked: background #1A7A6D, border #1A7A6D, white checkmark
- Focus ring: Teal Mist

Toggle:
- Off: #E8E5E0 track, #FFFFFF knob
- On: #1A7A6D track, #FFFFFF knob
```

---

## 6. Full @theme CSS Token Block

This is the complete replacement for the current `@theme` block in `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/index.css`:

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

@import "tailwindcss";

/* ================================================================
   EVERAFTR DESIGN TOKENS -- Heritage Gold
   ================================================================
   Design philosophy: Gold thread on white canvas.
   One accent. Maximum breathing room. Filipino soul.
   ================================================================ */

@theme {
  /* --- Canvas --- */
  --color-white: #FFFFFF;
  --color-snow: #FAFAFA;

  /* --- Heritage Gold --- */
  --color-gold: #B8960C;
  --color-gold-mist: #F7F3E8;
  --color-gold-deep: #96790A;
  --color-gold-bright: #D4AC16;

  /* --- Teal (CTA / Interactive) --- */
  --color-teal: #1A7A6D;
  --color-teal-deep: #14635A;
  --color-teal-dark: #0E4C44;
  --color-teal-mist: #EFF8F6;

  /* --- Text --- */
  --color-ink: #1A1613;
  --color-stone: #6B6560;
  --color-mist: #9C9590;

  /* --- Borders --- */
  --color-silk: #E8E5E0;
  --color-whisper: #F0EEEB;

  /* --- Semantic States --- */
  --color-success: #2D8659;
  --color-success-mist: #EDF7F1;
  --color-warning: #C47F17;
  --color-warning-mist: #FDF6E8;
  --color-error: #C4392E;
  --color-error-mist: #FDF0EF;
  --color-info: #3D6B8F;
  --color-info-mist: #EFF4F8;

  /* --- Dark Surfaces --- */
  --color-obsidian: #141210;
  --color-charcoal: #1E1B18;
  --color-linen: #F5F2ED;

  /* --- Semantic Aliases (Backward-compatible naming) --- */
  --color-bg-primary: #FFFFFF;
  --color-bg-soft: #FAFAFA;
  --color-bg-warm: #F7F3E8;
  --color-bg-deep: #141210;
  --color-text-primary: #1A1613;
  --color-text-secondary: #6B6560;
  --color-text-tertiary: #9C9590;
  --color-text-on-dark: #F5F2ED;
  --color-border: #E8E5E0;
  --color-border-subtle: #F0EEEB;
  --color-accent-primary: #1A7A6D;
  --color-accent-primary-hover: #14635A;
  --color-accent-gold: #B8960C;
  --color-accent-success: #2D8659;
  --color-accent-warning: #C47F17;
  --color-accent-error: #C4392E;
  --color-accent-info: #3D6B8F;

  /* --- Font Families --- */
  --font-family-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-serif: 'Cormorant Garamond', Georgia, serif;

  /* --- Utility font tokens --- */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-jakarta: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-cormorant: 'Cormorant Garamond', Georgia, serif;

  /* --- Spacing Scale (8px base) --- */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 96px;
  --spacing-5xl: 128px;

  /* --- Border Radius --- */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 3px rgba(26, 22, 19, 0.04);
  --shadow-md: 0 4px 16px rgba(26, 22, 19, 0.06);
  --shadow-lg: 0 8px 32px rgba(26, 22, 19, 0.08);
  --shadow-gold: 0 0 8px rgba(184, 150, 12, 0.2);
}

/* ================================================================
   BASE STYLES
   ================================================================ */

body {
  font-family: var(--font-family-sans);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-ink);
  background-color: var(--color-white);
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ================================================================
   GOLD THREAD -- Signature Element (replaces woven-border)
   ================================================================ */

.gold-thread {
  height: 1px;
  background: var(--color-gold);
}

.gold-thread-glow {
  height: 2px;
  background: var(--color-gold);
  box-shadow: 0 0 8px rgba(184, 150, 12, 0.3);
}

@keyframes thread-draw {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.gold-thread-shimmer {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-gold) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: thread-draw 2.5s ease-in-out infinite;
}

/* Section divider ornament */
.section-thread {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 24px;
}

.section-thread::before,
.section-thread::after {
  content: '';
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.section-thread-diamond {
  width: 6px;
  height: 6px;
  background: var(--color-gold);
  transform: rotate(45deg);
}

/* ================================================================
   ANIMATIONS
   ================================================================ */

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-slow {
  animation: fadeIn 0.6s ease-out;
}

/* ================================================================
   CARD HOVER -- Gold Thread Reveal
   ================================================================ */

.card-gold-thread {
  position: relative;
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card-gold-thread::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transition: transform 300ms ease;
}

.card-gold-thread:hover::before {
  transform: scaleX(1);
}

.card-gold-thread:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 24px rgba(26, 22, 19, 0.06);
}

/* ================================================================
   SCROLLBAR (subtle, gold-accented)
   ================================================================ */

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-snow);
}

::-webkit-scrollbar-thumb {
  background: var(--color-silk);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-stone);
}

/* ================================================================
   FOCUS STYLES (accessible)
   ================================================================ */

*:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
}

/* ================================================================
   SELECTION (gold-tinted)
   ================================================================ */

::selection {
  background: var(--color-gold-mist);
  color: var(--color-ink);
}
```

### 6.1 Migration Mapping

For reference, here is how the old token names map to the new ones. This will guide the find-and-replace across all component files:

| Old Token (Tailwind class) | New Token (Tailwind class) | Notes |
|---------------------------|---------------------------|-------|
| `bg-pina-ivory` | `bg-snow` or `bg-white` | Remove warm beige backgrounds |
| `bg-pina-cream` | `bg-gold-mist` | Use for icon circle backgrounds |
| `bg-pina-sheen` | `bg-silk` | Rare, use for pressed/muted states |
| `bg-bg-primary` | `bg-white` | Primary background is now pure white |
| `bg-bg-warm` | `bg-gold-mist` | Warm is now gold-tinted white |
| `bg-bg-deep` | `bg-obsidian` | Dark backgrounds |
| `text-text-primary` | `text-ink` | Primary text |
| `text-text-secondary` | `text-stone` | Secondary text |
| `text-text-on-dark` | `text-linen` | Text on dark surfaces |
| `text-accent-primary` | `text-teal` | Interactive/link text |
| `bg-accent-primary` | `bg-teal` | Primary CTA buttons |
| `bg-accent-primary-hover` | `bg-teal-deep` | Button hover |
| `border-border` | `border-silk` | Card and input borders |
| `text-inabel-gold` / `fill-inabel-gold` | `text-gold` / `fill-gold` | Star ratings, gold accents |
| `bg-inabel-indigo` | `bg-teal` | Category badges |
| `bg-hablon-green` | `bg-success` | Verified badge |
| `bg-langkit-violet` | `bg-teal-mist text-teal` | All Celebrations Welcome badge |
| `text-yakan-teal` | `text-teal` | Community links |
| `bg-tnalak-red/*` | (removed) | No red backgrounds |
| `bg-tnalak-earth/*` | (removed) | No earth backgrounds |
| `accent-success` | `success` | State colors |
| `accent-warning` | `warning` | State colors |
| `accent-error` | `error` | State colors |
| `accent-info` | `info` | State colors |
| `pattern-pina` | (removed) | No background patterns |
| `pattern-inabel` | (removed) | No background patterns |
| `pattern-hablon` | (removed) | No background patterns |
| `woven-border` | `gold-thread` | Signature element |
| `woven-border-thin` | `gold-thread` | Same 1px line |
| `woven-border-loading` | `gold-thread-shimmer` | Loading state |

---

## 7. Updated Brand Taglines

The "Six threads" language no longer applies. Suggested replacements:

| Context | Old | New |
|---------|-----|-----|
| Primary tagline | "plan together, celebrate forevr" | **Keep as-is** -- it is perfect |
| Platform tagline | "Six threads. One platform. Every couple." | "One golden thread. Every celebration." |
| Footer tagline | "Six threads. One platform. Every couple." | "where forevr begins" |
| About page | Long textile explanation | Gold heritage narrative (Section 2.2) |
| Marketing | "for every couple. every love story. every celebration." | **Keep as-is** -- it is inclusive and strong |

---

## 8. What This Preserves

This proposal is a refinement, not a teardown. Here is what stays:

- **Filipino identity.** Gold IS Filipino heritage, arguably more deeply than any single textile tradition. The cultural connection is stronger and more universally understood.
- **Cormorant Garamond.** The serif typeface stays. It is beautiful and distinctive.
- **Inclusivity.** "All Celebrations Welcome," gender-neutral language, ceremony type support -- none of this changes.
- **Information architecture.** All pages, routes, and features remain the same. This is a visual layer change.
- **Component structure.** Cards, buttons, navigation, footer -- all keep their structural logic. Only their colors, borders, and spacing change.
- **The concept of a signature border element.** It evolves from multicolor stripe to gold thread. The `WovenBorder` component becomes `GoldThread` with the same variant system (`"full"`, `"shimmer"`, `"glow"`).
- **Dark footer.** The footer stays dark (`#141210` instead of `#2A2520`) for contrast and grounding.

---

## 9. What This Kills

- All 6 textile color palettes (Pina, T'nalak, Inabel, Hablon, Yakan, Langkit) as separate token groups
- The multi-color woven border stripe
- All three background patterns (`pattern-pina`, `pattern-inabel`, `pattern-hablon`)
- Brick red (`#8B3A3A`) as primary accent
- Cream/ivory/beige as background colors
- The "Weave Map" concept of section-to-textile mapping
- The "Six threads" tagline
- Color-coded section differentiation

---

## 10. Implementation Priority

If approved, the migration happens in this order:

**Phase 1 -- Tokens (30 minutes)**
Replace the `@theme` block in `src/index.css` with the new token system. Update the Google Fonts import. Add the gold thread CSS classes. Remove the woven border and pattern CSS.

**Phase 2 -- Global Components (2-3 hours)**
1. Rename `WovenBorder.tsx` to `GoldThread.tsx`, update its CSS classes
2. Update `Navbar.tsx` -- new colors, new spacing
3. Update `Footer.tsx` -- new dark background, gold logo, updated taglines
4. Update `App.tsx` -- swap `WovenBorder` for `GoldThread`

**Phase 3 -- Homepage (2-3 hours)**
Redesign `Home.tsx` following the new 5-section structure. Implement curated vendor scroll. Add gold thread section dividers.

**Phase 4 -- Cards and Buttons (2-3 hours)**
Update `VendorCard.tsx` with new styling. Update all button instances across pages. Update form elements.

**Phase 5 -- Remaining Pages (3-4 hours)**
Migrate all page components: `Vendors.tsx`, `VendorProfile.tsx`, `Plan.tsx`, `Matchmaker.tsx`, `About.tsx`, `Celebrations.tsx`, `Community.tsx`, `Kasa.tsx`, and all others.

**Phase 6 -- Typography Swap (1 hour)**
Replace all `font-jost` / `font-sans` references. Update the Google Fonts import to Plus Jakarta Sans. Test all pages for rendering at mobile sizes.

**Total estimated effort: 1-2 days.**

---

## 11. Open Questions for the Founder

1. **The gold hex.** I have proposed `#B8960C` -- a warm, muted gold that avoids yellow and avoids orange. It has roots in the existing `#C4962E` (Inabel gold) but is slightly darker and more refined. Does this feel right, or should we explore 2-3 alternatives side by side?

2. **Typography.** Are you attached to Jost specifically, or are you open to Plus Jakarta Sans? I can prepare a side-by-side comparison.

3. **Button shape.** Rounded rectangle (`border-radius: 8px`) or pill (`border-radius: 999px`)? Both work with this system. Pill feels more modern but can read as "startup." Rounded rectangle feels more premium but can read as "corporate."

4. **Logo treatment.** Currently the wordmark is in the accent color (was brick red). In the new system, should it be Ink (dark) on light backgrounds and Gold on dark backgrounds? Or Gold everywhere?

5. **The About page.** The current About page showcases all six textile traditions with detailed descriptions. Should we keep a section honoring these traditions (as historical context) while making it clear the visual system has evolved? Or clean break?

---

*This document lives at `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/HERITAGE-GOLD-VISUAL-DIRECTION.md`.*

*The design philosophy is simple: Gold thread on white canvas. Everything else is noise.*
