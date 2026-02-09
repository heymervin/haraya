# everaftr Design Proposal: "Clean Modern Filipino"

**Prepared by:** Senior Brand Designer
**Date:** February 8, 2026
**Status:** PROPOSAL -- for founder review

---

## Executive Summary

The current "Woven Heritage" design system is culturally rich but visually heavy. The six-textile color system creates a dense, warm-toned experience that reads as "museum exhibit" rather than "the tool I want to plan my celebration with." The founder's feedback is correct: it feels dull, not welcoming, and needs more white.

This proposal strips the visual system down to its essentials. White becomes the primary canvas -- not a neutral filler but an active design choice that creates breathing room, signals modernity, and lets Filipino cultural elements land with impact instead of competing for attention.

**The philosophy:** Apple's restraint meets Filipino craftsmanship. Every visual element earns its place.

---

## 1. The Diagnosis: What Is Wrong Right Now

### 1.1 Color Density Problem

The current homepage cycles through these backgrounds:

| Section | Current Background | Problem |
|---------|-------------------|---------|
| Hero | `#F5EDD8` (pina-ivory) + pattern-pina | Yellowed, heavy, not fresh |
| How It Works | `#FDFAF3` (bg-primary) | Closest to white, but still warm-tinted |
| Featured Vendors | `#F5EDD8` + pattern-inabel | Same yellow again |
| Categories | `#FDFAF3` | Slight relief |
| Why everaftr | `#F5EDD8` + pattern-pina | Yellow again |
| Explore More | `#FDFAF3` | Slight relief |
| Matchmaker CTA | Gradient `#EDE4CC` to `#D4C9A8` | Darkest section -- feels muddy |
| Stats | `#FDFAF3` | |

The page alternates between two nearly identical warm tones. There is no true white anywhere. The result: visual monotony where nothing pops and everything feels like parchment paper.

### 1.2 Accent Color Problem

Heritage Red (`#8B3A3A`) is the only accent color across the entire homepage. It appears in:
- The wordmark
- The tagline
- Every icon circle
- Both CTA buttons
- "View all" links
- Stats numbers
- Star ratings

One color doing everything means nothing stands out. The red also sits at medium saturation -- it is neither bold enough to command attention nor subtle enough to recede.

### 1.3 Rhythm Problem

Every section uses the same structure:
1. Centered serif heading
2. Grid of bordered cards with rounded corners
3. `py-16 px-6 md:py-24 md:px-10` padding

Seven sections in a row with identical visual weight. No section says "this is the most important thing." No section breathes more or less than any other. The page reads like a list, not a story.

### 1.4 The Woven Border Problem

The multicolor stripe is 4px tall and uses a smooth gradient that bleeds the colors together. At 4px on a mobile screen, it reads as a thin muddy line, not as six distinct cultural threads. It appears below the navbar and above the footer, but its small size and gradient rendering mean most users will not consciously register it. The concept is beautiful but the execution does not carry the weight the brand guide assigns to it.

---

## 2. New Color Palette: "Dagat" (Ocean)

### 2.1 The Concept

Replace the earthy, warm palette with one anchored in deep teal-green -- a color I am calling **Dagat** (Tagalog for "ocean/sea"). This is not arbitrary:

- The Philippines is an archipelago of 7,641 islands. Water is the most Filipino landscape there is.
- Teal-green appears in Yakan textiles (`#2D7D7B`) and Hablon weaving (`#4A7C59`) -- it is already in the heritage system.
- It avoids pink (competitor territory), avoids the current dull red, and avoids generic "luxury gold."
- Teal-green reads as gender-neutral, inclusive, and fresh -- exactly the brand positioning.
- Green ("berde/lungti") carries cultural meanings of growth, harmony, and renewal in Filipino tradition.

### 2.2 The Palette: 4 Colors + 2 Functional

```
PRIMARY CANVAS
  Snow White        #FFFFFF    -- The dominant surface. 70%+ of any page.
  Cloud             #F8F9FA    -- Alternate section background. Cool-neutral, not warm.

PRIMARY ACCENT
  Dagat             #1A7A6D    -- Deep teal-green. Wordmark, primary CTAs, key links.
  Dagat Dark        #125E54    -- Hover/pressed state.
  Dagat Light       #E8F5F2    -- Tinted backgrounds for subtle emphasis.

TEXT
  Ink               #1C1917    -- Primary text. True near-black, not brown-black.
  Stone             #6B7280    -- Secondary text. Cool gray, not warm brown.
  Mist              #9CA3AF    -- Tertiary/disabled text.

FUNCTIONAL (kept from heritage, slightly adjusted)
  Success           #16A34A    -- Cleaner green for completion states.
  Warning           #D97706    -- Amber for attention states.
  Error             #DC2626    -- Clear red for errors. Not the brand accent.
  Info              #2563EB    -- Standard blue for informational states.

HERITAGE ACCENT (used sparingly)
  Gold              #B8860B    -- For premium/featured badges, star ratings.
                                  Derived from Inabel gold, refined to be warmer.
```

### 2.3 Why This Works

| Criteria | Current Palette | Proposed Palette |
|----------|----------------|-----------------|
| Feels clean | No -- yellowed backgrounds | Yes -- true white canvas |
| Feels Filipino | Yes, but heavily | Yes -- ocean/island reference, textile-derived teal |
| Feels inclusive | Neutral | Yes -- teal is the most gender-neutral accent possible |
| Feels premium | Moderate | High -- white space + restrained color = luxury signal |
| Mobile readability | Moderate -- low contrast ratios | High -- dark text on white |
| Contrast ratio (accent on white) | 4.2:1 (`#8B3A3A` on `#FDFAF3`) | 5.1:1 (`#1A7A6D` on `#FFFFFF`) -- passes WCAG AA |
| Competitor differentiation | No pink (good) but generic earth | No pink, no earth, no gold-heavy -- unique in PH market |

### 2.4 Color Application Rules

1. **White is the default.** If you are not sure what color a background should be, it is white.
2. **Dagat appears in exactly three roles:** wordmark, primary CTA buttons, and active/selected states.
3. **Cloud (`#F8F9FA`) alternates with white** to create section rhythm without adding visual weight.
4. **Dagat Light (`#E8F5F2`)** is used for hover states on cards, selected filter chips, and notification backgrounds -- never as a full section background.
5. **Gold (`#B8860B`)** appears only in star ratings, "Featured" badges, and the premium tier indicator. Nowhere else.
6. **The heritage textile colors are retired from the primary UI** but preserved in one place: the Woven Thread element (see Section 5).

---

## 3. Typography Direction

### 3.1 Recommendation: Keep Cormorant Garamond + Jost, But Adjust Usage

The pairing is actually strong. Cormorant Garamond is one of the best free serif display faces available -- it has personality without being overused. Jost is clean and geometric without being sterile. The problem is not the fonts; it is how they are being used.

**Current issues:**
- Cormorant at `font-weight: 300` (Light) for H1 -- too thin at large sizes on mobile, especially on lower-DPI Android screens.
- Jost at `font-weight: 300` (Light) for body -- too light for body text. Reads as wispy, not refined.
- Every heading is Cormorant. The page feels like an invitation card, not a tool.

### 3.2 Revised Type Scale

```
DISPLAY / HERO (Cormorant Garamond)
  H1 Hero        font-weight: 400    size: clamp(2rem, 5vw, 3.5rem)    line-height: 1.1
  H2 Section     font-weight: 400    size: clamp(1.5rem, 3.5vw, 2.25rem)  line-height: 1.2
  Tagline        font-weight: 400i   size: clamp(1rem, 2vw, 1.25rem)   line-height: 1.4

UI / FUNCTIONAL (Jost)
  H3 Card Title  font-weight: 500    size: 1.125rem (18px)              line-height: 1.3
  Body           font-weight: 400    size: 1rem (16px)                  line-height: 1.6
  Body Small     font-weight: 400    size: 0.875rem (14px)              line-height: 1.5
  Label          font-weight: 500    size: 0.75rem (12px)               line-height: 1    tracking: 0.1em  uppercase
  Caption        font-weight: 400    size: 0.75rem (12px)               line-height: 1.4
  Button         font-weight: 500    size: 0.875rem (14px)              line-height: 1    tracking: 0.02em

BRAND WORDMARK (Jost)
  Wordmark       font-weight: 300    size: 22px                         tracking: 0.12em
```

**Key changes:**
- Bump Cormorant from weight 300 to 400. Still elegant, but actually readable on budget Android phones.
- Bump Jost body from weight 300 to 400. Comfortable reading weight.
- Bump Jost buttons from weight 400 to 500. Gives CTAs more presence.
- Reduce the wordmark weight from 200 to 300. At 200, the strokes are too thin at small sizes on mobile.
- Reduce hero H1 max size from 4rem to 3.5rem. The current size is overwhelming in the already-dense layout.

### 3.3 Font Loading Optimization (for 4G Android users)

The current Google Fonts import loads 7 weights of Jost (200-700) and 7 variants of Cormorant (300-600, plus italics). That is a large payload for 4G connections.

**Proposed reduced import:**

```css
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
```

This drops from ~14 font files to ~7, cutting initial font payload roughly in half. We remove weights we do not actually use (200, 700, Cormorant 300, Cormorant 600).

---

## 4. Homepage Layout: Section-by-Section Redesign

### 4.1 Design Principles for the New Layout

1. **Asymmetric rhythm.** Not every section gets the same padding. The hero breathes the most. Dense sections get more compact treatment.
2. **One focal point per scroll.** Each viewport should have exactly one thing competing for attention.
3. **White space as structure.** Sections are separated by generous white space, not by background color changes.
4. **Progressive disclosure.** The homepage tells a story: inspire, orient, prove, convert.

### 4.2 New Section Order and Design

**SECTION 1: HERO** (keep, redesign)

```
Background:    #FFFFFF
Padding:       py-20 md:py-32 (increased from py-16 md:py-24)
Content width: max-w-3xl centered
```

Changes:
- Remove the `pattern-pina` background texture. Let it be pure white.
- Increase vertical padding dramatically. The hero should own the first viewport.
- Change tagline color from Heritage Red to Dagat (`#1A7A6D`).
- Primary CTA ("Find Vendors") uses Dagat background.
- Secondary CTA ("Start Planning") uses Dagat outline.
- Add a single, large editorial photo below the text -- a real Filipino couple, not a generic stock image. Full-bleed within the content area, with rounded corners. This adds warmth that the white space needs.

Layout:
```
[                    generous white space                    ]
[                                                            ]
[        The best way to plan a Filipino celebration         ]
[              plan together, celebrate forevr                ]
[                                                            ]
[     Built for every couple, rooted in Filipino tradition.  ]
[                                                            ]
[          [ Find Vendors ]    [ Start Planning ]            ]
[                                                            ]
[   ┌──────────────────────────────────────────────────┐     ]
[   │                                                  │     ]
[   │           (hero editorial photograph)            │     ]
[   │          real couple, candid, warm light          │     ]
[   │                                                  │     ]
[   └──────────────────────────────────────────────────┘     ]
[                    generous white space                    ]
```

**SECTION 2: SOCIAL PROOF / TRUST BAR** (new section, replaces Stats at bottom)

```
Background:    #F8F9FA (Cloud)
Padding:       py-8 md:py-10
Content:       Horizontal row of 3-4 proof points
```

This is a slim, understated band immediately after the hero. Not flashy stats -- quiet confidence.

```
[  370K+ celebrations/year in PH  |  8 vendor categories  |  Every ceremony type  ]
```

Text: Jost 400, 14px, Stone color. No borders, no cards. Just text with subtle pipe dividers. On mobile, stack vertically with small spacing.

**SECTION 3: HOW IT WORKS** (keep, simplify)

```
Background:    #FFFFFF
Padding:       py-16 md:py-24
```

Changes:
- Remove card borders. Instead, use a simple layout: large step number (Cormorant, Dagat color, 48px), title (Jost 500), description.
- Reduce from bordered cards to open layout. The white background IS the card.
- Use a 3-column grid on desktop, single column on mobile.

```
[                                                            ]
[           Plan your celebration in three steps              ]
[                                                            ]
[    1                  2                  3                  ]
[    Discover           Plan               Celebrate          ]
[    Vendors            Together           Your Way           ]
[                                                            ]
[    Find trusted       Track budget,      Church, civil,    ]
[    vendors with       manage your        Muslim, or        ]
[    real reviews.      checklist in       commitment --     ]
[                       one place.         we're here.       ]
[                                                            ]
```

**SECTION 4: FEATURED VENDORS** (keep, redesign cards)

```
Background:    #FFFFFF
Padding:       py-16 md:py-24
```

Changes:
- Remove `pattern-inabel` background. White background.
- Vendor cards redesigned: drop the colored icon circles. Card has photo, name, location, price, rating. White card background, subtle `#E5E7EB` border, rounded-xl corners.
- On hover: slight lift + light shadow + Dagat-tinted border.
- Show 3 cards on desktop, 1 scrollable row on mobile (horizontal scroll, not stacked grid -- saves vertical space, feels app-like).
- "View all" link in Dagat color.

**SECTION 5: VENDOR CATEGORIES** (keep, visual redesign)

```
Background:    #F8F9FA (Cloud)
Padding:       py-16 md:py-24
```

Changes:
- Categories become a clean 2x3 grid (desktop) or 2-column grid (mobile).
- Each category: icon (Dagat color, no background circle), name (Jost 500), and a short line of text.
- Remove heavy borders. Use hover states with Dagat Light (`#E8F5F2`) background.
- The Cloud background provides natural section separation without adding visual weight.

**SECTION 6: WHY EVERAFTR** (keep, major redesign)

```
Background:    #FFFFFF
Padding:       py-16 md:py-24
```

This is the brand's chance to tell its story. Currently four nearly identical feature cards that all look the same. Redesign as:

- Left-aligned layout (not centered). Feels more confident.
- Section heading: "Built different. Built Filipino." (keep this -- it is strong copy).
- Four features displayed as a simple list, not cards:

```
[                                                            ]
[    Built different.                                        ]
[    Built Filipino.                                         ]
[                                                            ]
[    ---- (Dagat accent line, 40px wide, 2px)                ]
[                                                            ]
[    Filipino-First                                          ]
[    We understand ninongs, Pre-Cana, CENOMAR, and           ]
[    lechon debates. Planning that speaks your language.     ]
[                                                            ]
[    Every Couple Welcome                                    ]
[    Church, civil, Muslim, nikah, or commitment             ]
[    celebration -- this platform is for you.                ]
[                                                            ]
[    Trusted Vendors                                         ]
[    Real reviews. Verified vendors. Transparent pricing.    ]
[                                                            ]
[    Your Way, Always                                        ]
[    Customize everything. Your labels, your roles,          ]
[    your timeline.                                          ]
[                                                            ]
```

Feature titles in Jost 500, Dagat color. Descriptions in Jost 400, Ink color. No icons, no cards, no borders. Let the words breathe.

**SECTION 7: MATCHMAKER CTA** (keep, redesign as the one "moment")

```
Background:    #1A7A6D (Dagat) -- FULL BLEED
Padding:       py-16 md:py-24
Text color:    #FFFFFF
```

This is the one section that breaks the white canvas. It commands attention because everything else is white.

```
[████████████████████████████████████████████████████████████]
[██                                                      ██]
[██         Not sure where to start?                     ██]
[██                                                      ██]
[██    Take our 2-minute matchmaker quiz and get          ██]
[██    personalized vendor recommendations.               ██]
[██                                                      ██]
[██              [ Start the Quiz ]  (white btn)         ██]
[██                                                      ██]
[████████████████████████████████████████████████████████████]
```

Button: white background, Dagat text, rounded. On hover: slight opacity. This is the single highest-contrast moment on the page. It should convert.

**SECTION 8: EXPLORE MORE (Community + Celebrations)** (keep, simplify)

```
Background:    #FFFFFF
Padding:       py-16 md:py-20
```

Two cards side by side. White background, subtle border. Each has a small heading, one line of description, and an arrow link in Dagat color. Remove the gradient backgrounds (`from-tnalak-red/5`, `from-yakan-teal/5`). Keep it clean.

**SECTIONS REMOVED:**
- **Stats section at the bottom** -- moved to Trust Bar (Section 2) and simplified. The current stats ("13 Pages & Features", "80+ Vendors") feel like a developer's progress report, not social proof. When there are real numbers (vendor count, couple signups, reviews), bring this back as a proper social proof section.

### 4.3 Overall Rhythm

```
Section               Background    Visual Weight    Padding
──────────────────────────────────────────────────────────────
Hero                  WHITE         High (image)     py-20/32
Trust Bar             CLOUD         Low              py-8/10
How It Works          WHITE         Medium           py-16/24
Featured Vendors      WHITE         High (images)    py-16/24
Categories            CLOUD         Medium           py-16/24
Why everaftr          WHITE         Low (text only)  py-16/24
Matchmaker CTA        DAGAT         High (contrast)  py-16/24
Explore More          WHITE         Medium           py-16/20
```

The rhythm: HIGH - low - MEDIUM - HIGH - MEDIUM - low - HIGH - MEDIUM. This creates breathing room between dense sections and ensures the eye has places to rest.

---

## 5. The Woven Heritage Question: Thread, Not Tapestry

### 5.1 Recommendation: Keep It, But Make It Singular and Premium

The woven border concept is the most distinctive brand element everaftr has. Dropping it entirely would make the brand generic. But it needs to be reimagined to work within a white, minimal system.

### 5.2 Rename: "The Thread"

Stop calling it a "woven border." It is "The Thread" -- a single, thin, multicolor line that represents the weaving together of six Filipino textile traditions and, metaphorically, the weaving together of two lives.

### 5.3 New Visual Treatment

**Old:** 4px gradient that blends colors together, appearing muddy at small sizes.

**New:** 2px solid-segment stripe with distinct color blocks and micro-gaps between them.

```css
.the-thread {
  height: 2px;
  display: flex;
}

.the-thread span {
  flex: 1;
  /* Each segment is a solid color block */
}
```

Or as a pure CSS gradient with hard stops:

```css
.the-thread {
  height: 2px;
  background: linear-gradient(
    90deg,
    #1A7A6D 0%, #1A7A6D 16.66%,      /* Dagat (primary brand -- replaces T'nalak red) */
    #3D6B8E 16.66%, #3D6B8E 33.32%,   /* Indigo-teal (Inabel, cooled) */
    #2E8B57 33.32%, #2E8B57 49.98%,   /* Sea green (Hablon, cooled) */
    #B8860B 49.98%, #B8860B 66.64%,   /* Dark goldenrod (Inabel gold, refined) */
    #7B6D8E 66.64%, #7B6D8E 83.3%,   /* Muted violet (Langkit, desaturated) */
    #C17950 83.3%, #C17950 100%       /* Terracotta (Yakan, warmed) */
  );
}
```

The colors are adjusted to be more harmonious on a white background. The original textile colors were chosen for warm/dark backgrounds -- on white, they need to shift slightly cooler and less saturated to avoid looking garish.

### 5.4 Where The Thread Appears

- **Below the navbar** (as it does now) -- 2px, full width
- **Above the footer** -- 2px, full width
- **On vendor cards** -- not as a border, but as a thin accent at the top of the card image area (1px)
- **Loading state** -- animated shimmer version, 2px
- **Nowhere else.** Remove it from section dividers, card accents, and anywhere it currently appears as decoration. Less is more.

### 5.5 The About Page: Where Heritage Lives

Move the deep cultural storytelling to the About page. Create a dedicated "Our Thread" section there where each of the six textile traditions gets a proper showcase with:
- The tradition name and origin
- A sentence about its meaning
- Its color swatch
- How it maps to a section of the platform

This makes the cultural layer opt-in -- users who want to learn about it can find it. Users who just want to plan their celebration are not slowed down.

---

## 6. What "Welcoming" Means Visually

### 6.1 Warm But Clean

The mistake of the current design is equating "warm" with "warm color temperature." The pina-ivory backgrounds are warm in hue (yellow-toned) but cold in feeling (dense, heavy, museum-like).

True visual warmth comes from:
- **Generous spacing.** A page that breathes feels inviting. A dense page feels intimidating.
- **Real photography.** Stock-free images of real Filipino couples create human warmth no color palette can match.
- **Readable typography.** Text that is easy to read at any size feels welcoming. Ultra-thin fonts feel exclusive.
- **Rounded corners.** The current 8px radius is fine. Consider 12px for larger cards.
- **Subtle animation.** Gentle fade-ins as sections scroll into view. Nothing bouncing or sliding aggressively.

### 6.2 Inclusive But Not Generic

The danger of stripping cultural elements is becoming "another white website." Everaftr avoids this through:

1. **Language, not decoration.** "Ninongs," "Pre-Cana," "CENOMAR," "lechon" -- these words ARE the Filipino identity. They do more cultural work than any color swatch.
2. **The Thread.** A single, recognizable brand element that carries the weaving metaphor.
3. **Photography.** Every image shows Filipino faces, Filipino venues, Filipino celebrations. This is the most powerful form of cultural identity.
4. **Ceremony type diversity.** The checklist, matchmaker, and vendor profiles explicitly support Catholic, INC, Muslim, civil, civil union, and other ceremonies. This IS Filipino -- the Philippines is one of the most ceremony-diverse countries in Asia.

### 6.3 Filipino But Not Cliche

Things to avoid:
- Sampaguita flower graphics
- Sun-and-stars motifs (that is a flag, not a wedding brand)
- Jeepney illustrations
- Tinikling dancers
- Nipa hut silhouettes
- Bamboo textures

Things that feel authentically Filipino without cliche:
- Teal-green as the Philippine ocean
- The Thread as Filipino weaving tradition, abstracted
- Filipino-specific terminology used naturally in the UI
- Real vendor photography from Filipino celebrations
- The About page's deep-dive into textile heritage (for those who want it)

---

## 7. Concrete CSS Token Changes

### 7.1 Proposed New `@theme` Block for `src/index.css`

```css
@theme {
  /* ================================================================
     EVERAFTR DESIGN TOKENS -- "Clean Modern Filipino" v3
     ================================================================ */

  /* --- Canvas --- */
  --color-white: #FFFFFF;
  --color-cloud: #F8F9FA;

  /* --- Primary Accent: Dagat (Ocean Teal-Green) --- */
  --color-dagat: #1A7A6D;
  --color-dagat-dark: #125E54;
  --color-dagat-light: #E8F5F2;
  --color-dagat-lighter: #F0FAF8;

  /* --- Text --- */
  --color-ink: #1C1917;
  --color-stone: #6B7280;
  --color-mist: #9CA3AF;

  /* --- Borders --- */
  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;

  /* --- Functional --- */
  --color-success: #16A34A;
  --color-success-light: #F0FDF4;
  --color-warning: #D97706;
  --color-warning-light: #FFFBEB;
  --color-error: #DC2626;
  --color-error-light: #FEF2F2;
  --color-info: #2563EB;
  --color-info-light: #EFF6FF;

  /* --- Heritage Accent (sparingly) --- */
  --color-gold: #B8860B;
  --color-gold-light: #FEF9E7;

  /* --- Thread Colors (for The Thread element only) --- */
  --color-thread-1: #1A7A6D;   /* Dagat -- brand identity */
  --color-thread-2: #3D6B8E;   /* Cooled indigo -- Inabel */
  --color-thread-3: #2E8B57;   /* Sea green -- Hablon */
  --color-thread-4: #B8860B;   /* Dark goldenrod -- Inabel gold */
  --color-thread-5: #7B6D8E;   /* Muted violet -- Langkit */
  --color-thread-6: #C17950;   /* Terracotta -- Yakan */

  /* --- Deep (footer, dark sections) --- */
  --color-deep: #111827;
  --color-deep-surface: #1F2937;
  --color-text-on-deep: #F9FAFB;
  --color-text-on-deep-muted: #9CA3AF;

  /* --- Semantic Aliases --- */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8F9FA;
  --color-bg-accent: #E8F5F2;
  --color-text-primary: #1C1917;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-accent-primary: #1A7A6D;
  --color-accent-primary-hover: #125E54;

  /* --- Font Families --- */
  --font-family-sans: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-serif: 'Cormorant Garamond', Georgia, serif;
  --font-jost: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-cormorant: 'Cormorant Garamond', Georgia, serif;
}
```

### 7.2 Proposed New Base Styles

```css
body {
  font-family: var(--font-family-sans);
  font-weight: 400;                      /* Up from 300 */
  font-size: 16px;
  line-height: 1.6;                      /* Slightly tighter than 1.7 */
  color: var(--color-ink);               /* True near-black, not warm brown */
  background-color: var(--color-white);  /* True white, not warm cream */
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 7.3 Proposed New "The Thread" CSS

```css
/* The Thread -- everaftr's signature element */
.the-thread {
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-thread-1) 0%, var(--color-thread-1) 16.66%,
    var(--color-thread-2) 16.66%, var(--color-thread-2) 33.32%,
    var(--color-thread-3) 33.32%, var(--color-thread-3) 49.98%,
    var(--color-thread-4) 49.98%, var(--color-thread-4) 66.64%,
    var(--color-thread-5) 66.64%, var(--color-thread-5) 83.3%,
    var(--color-thread-6) 83.3%, var(--color-thread-6) 100%
  );
}

.the-thread-loading {
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-thread-1), var(--color-thread-2),
    var(--color-thread-3), var(--color-thread-4),
    var(--color-thread-5), var(--color-thread-6),
    var(--color-thread-1)
  );
  background-size: 200% 100%;
  animation: thread-shimmer 2.5s ease-in-out infinite;
}

@keyframes thread-shimmer {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}
```

### 7.4 Proposed New Button Styles

```css
/* Primary CTA */
.btn-primary {
  padding: 12px 28px;
  background: var(--color-dagat);
  color: white;
  border: none;
  border-radius: 8px;                    /* Up from 4px -- softer, more welcoming */
  font-family: var(--font-family-sans);
  font-size: 14px;
  font-weight: 500;                      /* Up from 400 */
  letter-spacing: 0.02em;               /* Down from 0.08em -- less formal */
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-primary:hover {
  background: var(--color-dagat-dark);
}

/* Secondary CTA */
.btn-secondary {
  padding: 12px 28px;
  background: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  font-family: var(--font-family-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.btn-secondary:hover {
  border-color: var(--color-dagat);
  background: var(--color-dagat-lighter);
}
```

### 7.5 Proposed New Card Styles

```css
/* Vendor cards, feature cards, etc. */
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;                   /* Up from 8px */
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);    /* Cooler shadow, not warm brown */
  border-color: var(--color-dagat-light);
}
```

---

## 8. Spacing Values Reference

### 8.1 Revised Spacing Scale

```
4px     xs      icon gaps, badge internal padding
8px     sm      between tightly related elements
12px    md      card internal gaps, compact lists
16px    base    between list items, card padding (mobile)
20px    lg      card padding (desktop), between card groups
24px    xl      between distinct content blocks
32px    2xl     major section internal spacing
48px    3xl     --
64px    4xl     section vertical padding (mobile)
96px    5xl     section vertical padding (desktop)
128px   6xl     hero section padding (desktop)
```

### 8.2 Max Widths

```
Content area:    max-w-6xl  (1152px)  -- slightly narrower than current 1200px for more side breathing room
Text blocks:     max-w-2xl  (672px)   -- comfortable reading line length
Hero text:       max-w-3xl  (768px)   -- slightly wider for headlines
```

### 8.3 Component-Specific Spacing

```
Navbar height:        64px (h-16)
Section padding:      py-16 md:py-24 (standard), py-20 md:py-32 (hero)
Card padding:         p-5 md:p-6
Card gap:             gap-5 md:gap-6
Card border-radius:   12px (rounded-xl)
Button border-radius: 8px (rounded-lg)
Input border-radius:  8px (rounded-lg)
Badge border-radius:  6px (rounded-md)
```

---

## 9. Migration Path: What Changes Where

### 9.1 Files That Need Changes

| File | Change Type | Priority |
|------|-------------|----------|
| `src/index.css` | Replace entire `@theme` block, remove old woven-border classes, remove textile patterns, add new tokens and The Thread | HIGH |
| `src/pages/Home.tsx` | Full layout restructure per Section 4 | HIGH |
| `src/components/Navbar.tsx` | Update colors to new tokens, simplify background | HIGH |
| `src/components/Footer.tsx` | Update to `--color-deep` palette, replace WovenBorder with TheThread | HIGH |
| `src/components/WovenBorder.tsx` | Rename to `TheThread.tsx`, simplify to single variant | MEDIUM |
| `src/components/VendorCard.tsx` | Update card styling, border colors, badge colors | MEDIUM |
| `src/App.tsx` | Replace `WovenBorder` with `TheThread` | MEDIUM |
| `src/components/StarRating.tsx` | Update star color to `--color-gold` | LOW |
| All other pages | Swap `bg-pina-ivory` to `bg-white`, `bg-bg-primary` to `bg-white`, `text-accent-primary` to `text-dagat`, etc. | MEDIUM |

### 9.2 Token Migration Map

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `pina-ivory` (#F5EDD8) | `white` (#FFFFFF) | Primary background |
| `pina-cream` (#EDE4CC) | `cloud` (#F8F9FA) | Alternate background |
| `pina-sheen` (#D4C9A8) | `border` (#E5E7EB) | Disabled/muted |
| `bg-primary` (#FDFAF3) | `white` (#FFFFFF) | |
| `bg-warm` (#F5EDD8) | `cloud` (#F8F9FA) | |
| `bg-deep` (#2A2520) | `deep` (#111827) | Footer |
| `text-primary` (#2A2520) | `ink` (#1C1917) | |
| `text-secondary` (#5A4F45) | `stone` (#6B7280) | |
| `text-on-dark` (#F5EDD8) | `text-on-deep` (#F9FAFB) | |
| `border` (#D9CEBC) | `border` (#E5E7EB) | Cooler tone |
| `accent-primary` (#8B3A3A) | `dagat` (#1A7A6D) | |
| `accent-primary-hover` (#7A3333) | `dagat-dark` (#125E54) | |
| `accent-success` (#4A7C59) | `success` (#16A34A) | |
| `accent-warning` (#D4A843) | `warning` (#D97706) | |
| `accent-error` (#C73E3A) | `error` (#DC2626) | |
| `accent-info` (#3D4F7C) | `info` (#2563EB) | |
| `tnalak-black` | `deep` | |
| `tnalak-red` | `dagat` | Primary accent role |
| `inabel-indigo` | `info` or `thread-2` | |
| `inabel-gold` | `gold` | |
| `hablon-green` | `success` or `thread-3` | |
| `yakan-teal` | `dagat` | Similar color space |
| `langkit-violet` | `thread-5` | For ACW badge only |

### 9.3 What Gets Removed

- All `.pattern-*` CSS classes (pina, inabel, hablon, yakan, langkit, tnalak)
- `.woven-border`, `.woven-border-thin`, `.woven-border-loading` (replaced by `.the-thread` variants)
- Section-specific border classes (`.border-directory`, `.border-planner`, etc.)
- All 18 textile color tokens (pina-*, tnalak-*, inabel-*, hablon-*, yakan-*, langkit-*)

### 9.4 What Gets Added

- `.the-thread` and `.the-thread-loading`
- Dagat color scale (4 values)
- Cloud, Ink, Stone, Mist utility tokens
- Thread color tokens (6 values, for The Thread element only)
- Deep color scale for footer/dark sections

---

## 10. Risk Assessment

### 10.1 Risks of This Proposal

| Risk | Severity | Mitigation |
|------|----------|------------|
| "Looks like every other white website" | Medium | The Thread, Filipino language, real photography, and Dagat teal create differentiation. But this must be intentional -- without the photography and language, the design IS generic. |
| Loses cultural depth | Medium | The heritage story moves to the About page, not deleted. The Thread preserves the weaving metaphor. But some cultural enthusiasts may feel the change. |
| Dagat teal too similar to competitors | Low | Checked: Kasal.com uses blue, Bride & Breakfast uses light rose/gold, Facebook is blue. Teal-green is an open lane in PH wedding platforms. |
| Jost 400 body weight too heavy | Low | Test on target devices. 400 is standard body weight for most sans-serifs. If it feels heavy, 350 (not available in Jost) means using Inter or another font. |
| Mobile image-heavy hero slows page load | Medium | Implement lazy loading, use `srcset` for responsive images, WebP format. The hero image is the one place we intentionally add weight. |

### 10.2 What This Proposal Does NOT Address

- Dark mode (can be built later using the deep color scale)
- Vendor dashboard visual direction (focus on couple-facing pages first)
- Email template design
- Social media template design
- Actual photography direction (this needs a separate brief for a photo shoot or UGC strategy)

---

## 11. Before/After Summary

### Homepage Feel

| Attribute | Before (Woven Heritage) | After (Clean Modern Filipino) |
|-----------|------------------------|------------------------------|
| Dominant color | Yellowed ivory (#F5EDD8) | White (#FFFFFF) |
| Accent | Muted dark red (#8B3A3A) | Vibrant teal-green (#1A7A6D) |
| Background rhythm | Ivory/cream alternating | White/cloud alternating with one Dagat section |
| Section count | 8 sections, similar weight | 8 sections, varied weight with clear hierarchy |
| Cultural expression | Textile patterns + multicolor border | The Thread + language + photography |
| Typography weight | Ultra-light (200-300) | Regular (400-500), more readable |
| Borders | Warm tan (#D9CEBC) | Cool gray (#E5E7EB) |
| Overall mood | Museum, heritage exhibit | Planning tool, welcoming and confident |
| Card treatment | Rounded, warm-bordered | Rounded-xl, clean, subtle shadow on hover |
| Signature element | 4px multicolor gradient | 2px multicolor segmented "Thread" |

---

## 12. Recommended Next Steps

1. **Founder reviews this proposal.** Key decision points:
   - Is Dagat (#1A7A6D) the right accent? Alternatives explored below.
   - Is the Thread sufficient cultural expression, or do we need more?
   - Is the About page the right home for the textile heritage story?

2. **If approved: implement in this order:**
   a. Update `src/index.css` with new `@theme` tokens
   b. Create `TheThread.tsx` component
   c. Redesign `Home.tsx` layout
   d. Update `Navbar.tsx` and `Footer.tsx`
   e. Update `VendorCard.tsx` and other components
   f. Update remaining pages

3. **Photography brief:** Commission or source 4-6 hero-quality photographs of real Filipino couples (diverse: straight, LGBTQ+, different ceremony types, different regions). This is the single highest-impact investment for making the redesign feel warm and Filipino.

### 12.1 Alternate Accent Colors (if Dagat is rejected)

| Option | Hex | Name | Pros | Cons |
|--------|-----|------|------|------|
| **Dagat** (recommended) | `#1A7A6D` | Ocean teal-green | Filipino (islands), inclusive, unique in market, excellent contrast | Could read as "medical" or "fintech" if not paired with warm photography |
| **Kulay Lupa** | `#B45A3C` | Warm terracotta | Earthy, warm, 2025-2026 wedding trend, Filipino clay pots | Could skew too rustic, less gender-neutral than teal |
| **Dahon** | `#2D6A4F` | Deep forest green | Filipino forests, growth, calming, premium | Darker, could feel heavy. Less unique -- many brands use forest green. |
| **Dagat Malalim** | `#1B4D5A` | Deep ocean teal | More blue, more dramatic, very premium | Lower contrast ratio, harder to read as links |

---

*This is a living document. Update after founder review.*

**everaftr** -- where forevr begins
