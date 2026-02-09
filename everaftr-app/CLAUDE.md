# CLAUDE.md -- everaftr Development Context

> This file contains everything a new Claude session needs to continue building the everaftr project.
> Read this file in its entirety before making any changes to the codebase.

---

## 1. Project Overview

**everaftr** is the Philippines' first inclusive wedding planning platform.

- **Tagline:** "plan together, celebrate forevr"
- **Positioning:** "The best way to plan a Filipino wedding"
- **Target audience:** Filipino couples ages 25-35, mobile-first, primarily Android on 4G
- **Inclusive by design:** Default labels are "You" and "Your Partner" -- never assume gender
- **Brand name:** Always lowercase "everaftr", one word, no spaces, no capital letters
- **Domain (planned):** everaftr.ph
- **Contact email (planned):** hello@everaftr.ph
- **Social handles (planned):** @everaftr.ph on Instagram, Facebook, TikTok

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2+ |
| Language | TypeScript | ~5.9 |
| Build tool | Vite | 7.2+ |
| Styling | Tailwind CSS | 4.1+ |
| Tailwind integration | @tailwindcss/vite plugin | 4.1+ |
| Icons | lucide-react | 0.563+ |
| Routing | react-router-dom | 7.13+ |
| Persistence (MVP) | localStorage | -- |
| Database (planned) | Supabase | -- |

### Critical Configuration Notes

- **Tailwind CSS 4** uses the `@tailwindcss/vite` plugin directly (NOT the postcss plugin). This is configured in `vite.config.ts`.
- **Design tokens** are defined in `src/index.css` using the Tailwind CSS 4 `@theme` directive (NOT `tailwind.config.js`).
- **Path alias:** `@` maps to `./src` -- configured in both `vite.config.ts` and `tsconfig.app.json`.
- **Dev server** runs on port 3000 (`npm run dev`).
- **TypeScript** is strict mode with `noUnusedLocals` and `noUnusedParameters` enabled.
- There is NO `tailwind.config.js` file. All customization is in `src/index.css` via `@theme`.

### Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

---

## 3. Design System -- "Woven Heritage"

The visual identity is inspired by six Filipino textile weaving traditions. Each tradition maps to a section of the platform with its own color palette.

### Textile-to-Section Mapping

| Textile | Origin | App Section | Primary Colors |
|---------|--------|-------------|---------------|
| **Pina** | Aklan | Homepage / Base | `#F5EDD8` (ivory), `#EDE4CC` (cream), `#D4C9A8` (sheen) |
| **T'nalak** | South Cotabato | Real Celebrations / Brand | `#2A2520` (black), `#8B3A3A` (red), `#5C3D2E` (earth) |
| **Inabel** | Ilocos | Vendor Directory | `#C73E3A` (red), `#3D4F7C` (indigo), `#C4962E` (gold), `#F0E8D4` (cream) |
| **Hablon** | Iloilo | Planner | `#4A7C59` (green), `#D4A843` (yellow), `#4A6FA5` (blue) |
| **Yakan** | Zamboanga | Community | `#B84C65` (fuchsia), `#2D7D7B` (teal), `#D4764E` (orange) |
| **Langkit** | Lanao | AI Assistant | `#A63D5C` (magenta), `#C9A84C` (gold), `#5C4A7C` (violet) |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FDFAF3` | Main background |
| `bg-warm` | `#F5EDD8` | Warm background sections |
| `bg-deep` | `#2A2520` | Dark background (footer) |
| `text-primary` | `#2A2520` | Main text |
| `text-secondary` | `#5A4F45` | Secondary text |
| `text-on-dark` | `#F5EDD8` | Text on dark backgrounds |
| `border` | `#D9CEBC` | Borders |
| `accent-primary` | `#8B3A3A` | Primary accent (T'nalak red) |
| `accent-success` | `#4A7C59` | Success (Hablon green) |
| `accent-warning` | `#D4A843` | Warning (Hablon yellow) |
| `accent-error` | `#C73E3A` | Error (Inabel red) |
| `accent-info` | `#3D4F7C` | Info (Inabel indigo) |

### Typography

- **Sans-serif (body):** Jost -- weights 200-700
- **Serif (headings):** Cormorant Garamond -- weights 300-600, italic variants
- CSS classes: `font-jost` and `font-cormorant` (defined in index.css)
- Tailwind token classes: `font-sans` resolves to Jost, `font-serif` resolves to Cormorant Garamond

### Signature Element: Woven Border

A multi-colored horizontal stripe representing the six textile traditions. Three CSS variants defined in `index.css`:

- `.woven-border` -- 6px height, full stripe
- `.woven-border-thin` -- 3px height, thin stripe
- `.woven-border-loading` -- 3px height with shimmer animation

The stripe cycles through: T'nalak red, Inabel indigo, Hablon green, Inabel gold, Yakan fuchsia, Langkit violet.

There is also a React component `<WovenBorder />` in `src/components/WovenBorder.tsx` with a `variant` prop accepting `"full"`, `"thin"`, or `"loading"`.

### Background Patterns

Three CSS classes for subtle textile-inspired background patterns:

- `.pattern-pina` -- Fine diagonal crosshatch (Pina ivory tones)
- `.pattern-inabel` -- Diagonal crosshatch (Inabel indigo tones)
- `.pattern-hablon` -- Grid pattern (Hablon green tones)

---

## 4. File Structure

```
everaftr-app/
  src/
    App.tsx                              # Root: BrowserRouter, Navbar, WovenBorder, Routes, Footer
    main.tsx                             # Entry point: StrictMode, createRoot
    index.css                            # All design tokens (@theme), base styles, woven borders, patterns
    types/
      index.ts                           # All TypeScript interfaces and types
    components/
      Navbar.tsx                         # Sticky top nav with mobile drawer (hamburger menu)
      Footer.tsx                         # Dark footer with brand, links, tagline
      WovenBorder.tsx                    # Signature woven stripe component (full/thin/loading)
      VendorCard.tsx                     # Vendor listing card with image, badges, price, rating, tags
      StarRating.tsx                     # Star rating display (sm/md/lg sizes)
      PlanningTools/
        Checklist.tsx                    # Wedding checklist with ceremony-type filters, localStorage
        BudgetTracker.tsx                # Budget tracker with categories, localStorage
    data/
      categories.ts                      # Vendor category definitions (8 categories)
      checklist.ts                       # Default checklist items (42 items, 7 timeframes)
      mockVendors.ts                     # 12 mock vendors with Unsplash images + 7 reviews (ACTIVE)
      vendors.ts                         # 20 vendors with placeholder images (ALTERNATE data set)
    pages/
      Home.tsx                           # Landing page: hero, how-it-works, categories, features, CTA, stats
      Vendors.tsx                        # Vendor directory with search, filters, grid (uses mockVendors.ts)
      VendorProfile.tsx                  # Individual vendor page with reviews, inquiry form (uses mockVendors.ts)
      Plan.tsx                           # Planning tools hub: Checklist + Budget tabs
      Matchmaker.tsx                     # 5-question quiz with results card and share features
      About.tsx                          # About page: story, Woven Heritage showcase, values, contact
  package.json
  vite.config.ts                         # Vite config: React plugin, Tailwind plugin, @ alias, port 3000
  tsconfig.json                          # References tsconfig.app.json and tsconfig.node.json
  tsconfig.app.json                      # App TypeScript config: strict, @ path alias
  tsconfig.node.json                     # Node TypeScript config (for vite.config.ts)
  eslint.config.js                       # ESLint config
  index.html                             # HTML entry point
```

### Routes

| Route | Page | Status |
|-------|------|--------|
| `/` | `Home.tsx` | Complete |
| `/vendors` | `Vendors.tsx` | Complete |
| `/vendors/:id` | `VendorProfile.tsx` | Complete |
| `/plan` | `Plan.tsx` | Complete |
| `/matchmaker` | `Matchmaker.tsx` | Complete |
| `/about` | `About.tsx` | Complete |

### Data Files: Two Sets

There are two vendor data files:

1. **`mockVendors.ts`** -- Currently active. Contains 12 vendors with Unsplash images, helper functions (`getVendorById`, `getVendorsByCategory`, `getVendorsByLocation`, `getVendorsByPriceRange`), and mock reviews (`getReviewsByVendorId`). Used by `Vendors.tsx` and `VendorProfile.tsx`.

2. **`vendors.ts`** -- Alternate data set with 20 vendors using placeholder images. Contains `getVendorById`, `getVendorsByCategory`, `getFeaturedVendors`. Used only by the legacy `VendorProfilePage.tsx`.

When migrating to Supabase, replace the active `mockVendors.ts` imports.

---

## 5. TypeScript Types

All types are defined in `src/types/index.ts`:

### Core Types

```typescript
interface Vendor {
  id: string;
  name: string;
  category: VendorCategoryType;
  location: string;
  description: string;
  priceRange: { min: number; max: number; currency: 'PHP' };
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
  isVerified: boolean;
  allCelebrationsWelcome: boolean;
  availability: string[];
  contactInfo?: { email?: string; phone?: string; instagram?: string; facebook?: string };
}

type VendorCategoryType =
  | 'Venues' | 'Photo & Video' | 'Catering' | 'Coordination'
  | 'Flowers & Styling' | 'Lights & Sound' | 'Hair & Makeup' | 'Attire';

interface CoupleProfile {
  id: string;
  partner1Name: string;
  partner2Name: string;
  celebrationDate?: string;
  ceremonyType?: 'Catholic' | 'Church (INC)' | 'Church (Other)' | 'Muslim' | 'Civil' | 'Civil Union' | 'Other';
  budgetRange?: { min: number; max: number };
  guestCount?: number;
  location?: string;
  customLabels?: { partner1Label?: string; partner2Label?: string };
}
```

Also defined: `VendorCategory`, `ChecklistItem`, `BudgetItem`, `QuizQuestion`, `QuizOption`, `QuizResult`, `FavoriteVendor`, `VendorInquiry`.

---

## 6. Architecture Decisions

### App Structure
- `App.tsx` wraps everything in `<BrowserRouter>` with a consistent layout: `Navbar` -> `WovenBorder` -> `<Routes>` -> `Footer`.
- The `Navbar` is sticky at the top with a mobile hamburger menu.
- The `Footer` sits at the bottom with dark background (`bg-deep`).

### Styling Approach
- All design tokens are in `src/index.css` using Tailwind CSS 4's `@theme` directive.
- Colors are referenced as Tailwind classes: `bg-pina-ivory`, `text-accent-primary`, `border-hablon-green`, etc.
- Some components use CSS variable syntax directly: `bg-[var(--color-accent-primary)]` -- this is the older style; newer code uses the direct Tailwind token names.
- Background patterns (`.pattern-pina`, `.pattern-inabel`, `.pattern-hablon`) are applied to page root divs to give each section its textile identity.

### Data Flow
- No state management library. Each page/component manages its own state with `useState`.
- Persistence is via `localStorage` with keys:
  - `everaftr-checklist` -- Checklist items state
  - `everaftr-budget` -- Budget tracker state
  - `matchmaker-results` -- Matchmaker quiz answers
- Mock data lives in `src/data/` and is imported directly.

### Checklist Architecture
- The active Checklist component (`src/components/PlanningTools/Checklist.tsx`) has its own inline data (44 items) with `ceremonyTypes` filtering (Catholic, Civil, Muslim, Other).
- The data file `src/data/checklist.ts` has a separate 42-item checklist using the `ChecklistItem` type from `types/index.ts` (used by the legacy `PlanningToolsPage.tsx`).
- When refactoring, unify these into a single data source.

### Vendor Categories (8 total)
1. Venues
2. Photo & Video
3. Catering
4. Coordination
5. Flowers & Styling
6. Lights & Sound
7. Hair & Makeup
8. Attire

---

## 7. Brand Rules (NON-NEGOTIABLE)

These rules must be followed in ALL code, copy, and UI decisions:

1. **Always "everaftr"** -- lowercase, one word, no spaces. Never "EverAftr", "Ever Aftr", "Everaftr", or "everAftr".

2. **Never assume gender:**
   - Use "celebration" instead of "wedding" where possible.
   - Use "Your Partner" instead of "bride" or "groom".
   - Default partner labels: "You" and "Your Partner" (customizable).
   - The `CoupleProfile` type uses `partner1Name` and `partner2Name`.

3. **"All Celebrations Welcome" badge** -- Vendors can opt in to signal inclusivity. Displayed with `langkit-violet` background. This is a boolean (`allCelebrationsWelcome`) on the `Vendor` type.

4. **Ceremony types must be inclusive:**
   - Catholic, Church (INC), Church (Other), Muslim, Civil, Civil Union, Other
   - The Checklist filters use: Catholic, Civil, Muslim, Other
   - Never default to Catholic; always let the user choose.

5. **Filipino-specific terminology to include:**
   - CENOMAR (Certificate of No Marriage from PSA)
   - Pre-Cana seminar (Catholic pre-marriage requirement)
   - Ninong/Ninang (principal sponsors)
   - Arrhae (wedding coins for Catholic ceremonies)
   - Lechon (roast pig, a staple at Filipino celebrations)
   - Mahr (dowry in Muslim weddings)
   - Nikah (Muslim wedding ceremony)
   - Barong Tagalog (traditional Filipino formal wear)
   - Filipiniana (traditional Filipino attire)

6. **Currency is always PHP (Philippine Peso)** -- formatted with `₱` symbol using `toLocaleString('en-PH')`.

7. **Taglines (use as appropriate):**
   - "plan together, celebrate forevr"
   - "Six threads. One platform. Every couple."
   - "where forevr begins"
   - "for every couple. every love story. every celebration."

8. **Social media handles:** @everaftr.ph (Instagram, Facebook, TikTok)

---

## 8. What's Built (MVP Status)

### COMPLETE

| Feature | Page/Component | Notes |
|---------|---------------|-------|
| Landing page | `Home.tsx` | Hero, how-it-works, categories, features, matchmaker CTA, stats |
| Vendor directory | `Vendors.tsx` | Search, category/location/price/ACW filters, responsive grid |
| Vendor profiles | `VendorProfile.tsx` | Full profile, reviews, inquiry form, sticky mobile CTA |
| Planning checklist | `Checklist.tsx` | 44 items, timeframe + ceremony-type filters, localStorage |
| Budget tracker | `BudgetTracker.tsx` | Categories with suggested %, estimated vs. actual, custom categories, localStorage |
| Planning hub | `Plan.tsx` | Tab navigation between Checklist and Budget |
| Matchmaker quiz | `Matchmaker.tsx` | 5 questions, results card, personalized tips, share (copy link, Facebook) |
| About page | `About.tsx` | Story, Woven Heritage showcase, values, vendor CTA, contact |
| Navigation | `Navbar.tsx` | Sticky, responsive, mobile hamburger drawer |
| Footer | `Footer.tsx` | Dark theme, brand, links, tagline |
| Design system | `index.css` | Full token system, woven borders, background patterns |
| Type definitions | `types/index.ts` | All interfaces for Vendor, CoupleProfile, Checklist, Budget, Quiz, Inquiry |

### PARTIALLY COMPLETE / NEEDS WORK

| Feature | Current State | What's Needed |
|---------|--------------|---------------|
| Vendor inquiry form | Console.log + alert | Backend integration (Supabase) |
| Matchmaker recommendations | Hardcoded mock vendors | Connect to real vendor data |
| Vendor images | Unsplash URLs | Real vendor photos or proper CDN |
| Reviews | 7 mock reviews in mockVendors.ts | Real review system with user accounts |
| Favorites | Type defined but not implemented | UI + localStorage/Supabase |

### NOT STARTED

| Feature | Priority | Notes |
|---------|----------|-------|
| Database integration | HIGH | Supabase planned -- replace all mock data |
| Vendor claim/signup flow | HIGH | Let vendors claim and manage their profiles |
| User authentication | HIGH | Couple + Vendor accounts |
| Real Celebrations | MEDIUM | User-submitted wedding stories (T'nalak section) |
| Community section | MEDIUM | Forum/discussion (Yakan section) |
| AI Assistant | LOW | Was "Ate AI", needs gender-neutral name ("Kasa" or "Tulay" suggested) (Langkit section) |
| Guest list manager | MEDIUM | Track RSVPs, seating, dietary restrictions |
| Vendor messaging | MEDIUM | In-app messaging between couples and vendors |
| Search/SEO optimization | MEDIUM | Meta tags, structured data, sitemap |
| PWA/offline support | LOW | Service worker for mobile-first users |
| Analytics | LOW | Track vendor inquiries, quiz completions |

---

## 9. What's Next (Roadmap)

### Phase 1: Backend Foundation
- Set up Supabase project (database, auth, storage)
- Create tables: vendors, couples, reviews, inquiries, favorites
- Replace all `mockVendors.ts` and `vendors.ts` imports with Supabase queries
- Implement user authentication (couples and vendors)

### Phase 2: Core Features
- Vendor claim/signup flow (vendor onboarding)
- Real inquiry submission (from `VendorProfile.tsx` form to Supabase)
- Favorites system (save vendors, view saved list)
- Real review submission

### Phase 3: Growth Features
- Real Celebrations (wedding stories with photos)
- Community section
- AI Assistant (renamed from "Ate AI" to something gender-neutral like "Kasa" or "Tulay")
- Guest list manager
- Enhanced matchmaker with real vendor data

### Phase 4: Launch
- Domain setup (everaftr.ph)
- SEO and meta tags
- PWA configuration
- Analytics integration
- Vendor data population (via wedding fair scraping strategy)

---

## 10. Business Context

### Market
- **Total addressable market:** 370,000-415,000 weddings per year in the Philippines
- **Market size:** PHP 74 billion to PHP 207 billion
- **No dominant digital platform** exists for Filipino wedding planning

### Competitive Landscape
- **Facebook groups** -- The main "competitor"; unstructured, scam-prone
- **Bride & Breakfast** -- Content/editorial site, not a planning tool
- **Kasal.com** -- Dated, poor UX, not mobile-first
- **Wedtag** -- Basic directory with limited features

### Business Model
- **Two-sided marketplace:** Free for couples, eventually paid for vendors
- **Cold-start strategy:** Populate vendor data by scraping wedding fair exhibitor lists
- **Key metric:** Vendor inquiries per week
- **Revenue (future):** Vendor premium listings, featured placement, lead generation fees

### Target User Profile
- Filipino couples ages 25-35
- Mobile-first (primarily Android on 4G connections)
- Currently relying on Facebook groups and word-of-mouth
- Want transparency in pricing and vendor legitimacy
- Planning weddings that cost PHP 100K-1M+

---

## 11. Key Reference Documents

These files exist in the parent directories and contain detailed strategy and design information:

| Document | Path | Contents |
|----------|------|----------|
| Executive Strategy Brief | `/Users/mervindecastro/Documents/Projects/everaftr/EXECUTIVE-STRATEGY-BRIEF.md` | Full business strategy, market analysis, competitive positioning |
| MVP Launch Plan | `/Users/mervindecastro/Documents/Projects/everaftr/MVP-LAUNCH-PLAN.md` | 8-week sprint plan for MVP development |
| Brand Guide V2 | `/Users/mervindecastro/Documents/Projects/everaftr/starter-kit/BRAND-GUIDE-V2-WOVEN-HERITAGE.md` | Complete Woven Heritage design system specification |
| Project Vision | `/Users/mervindecastro/Documents/Projects/everaftr/starter-kit/PROJECT.md` | Project vision and goals |
| Starter Kit Status | `/Users/mervindecastro/Documents/Projects/everaftr/starter-kit/STATUS.md` | Implementation progress tracking |

Documents in the app directory itself:

| Document | Path | Contents |
|----------|------|----------|
| Brand Guide (copy) | `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/BRAND-GUIDE-V2-WOVEN-HERITAGE.md` | Copy of brand guide in app dir |
| Strategy Brief (copy) | `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/EXECUTIVE-STRATEGY-BRIEF.md` | Copy of strategy brief in app dir |
| MVP Plan (copy) | `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/MVP-LAUNCH-PLAN.md` | Copy of MVP plan in app dir |
| Project (copy) | `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/PROJECT.md` | Copy of project vision in app dir |
| Vendor Pages README | `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/VENDOR-PAGES-README.md` | Documentation for vendor page implementation |

---

## 12. Code Conventions

### Naming
- Components: PascalCase (`VendorCard.tsx`, `StarRating.tsx`)
- Pages: PascalCase (`Home.tsx`, `Vendors.tsx`)
- Data files: camelCase (`mockVendors.ts`, `categories.ts`)
- CSS classes: Tailwind utility classes; custom classes use kebab-case (`woven-border`, `pattern-pina`)

### Component Patterns
- Functional components with `export default function ComponentName()` or `const ComponentName = () => {}`
- Props interfaces defined inline or in the same file
- Shared types in `src/types/index.ts`
- Lucide icons imported individually: `import { Heart, MapPin } from 'lucide-react'`

### Styling Patterns
- Tailwind utility classes are the primary styling method
- Design tokens referenced as: `bg-pina-ivory`, `text-accent-primary`, `border-hablon-green`
- Some older code uses CSS variable syntax: `bg-[var(--color-accent-primary)]` -- prefer the direct token names
- Responsive design uses Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Clamp for responsive typography: `text-[clamp(2.25rem,5vw,4rem)]`

### localStorage Keys
- `everaftr-checklist` -- Array of checklist items with completion state
- `everaftr-budget` -- Budget data object with totalBudget and categories
- `matchmaker-results` -- Quiz answers object

---

## 13. Common Pitfalls

1. **Do NOT create a `tailwind.config.js`.** Tailwind CSS 4 uses the `@theme` directive in `index.css`. All customization goes there.

2. **Do NOT use PostCSS for Tailwind.** The `@tailwindcss/vite` plugin handles everything.

3. **Do NOT use gendered language** in UI text. Always use inclusive alternatives.

4. **Do NOT capitalize "everaftr"** in any context.

5. **Two vendor data files exist** (`mockVendors.ts` and `vendors.ts`). The active pages use `mockVendors.ts`. Do not accidentally import from the wrong one.

6. **Two checklist data sources exist.** The active `Checklist.tsx` component has inline data with `ceremonyTypes` filtering. The `src/data/checklist.ts` file has a different data set used by the legacy `PlanningToolsPage.tsx`. Unify before adding features.

8. **The inquiry form** in `VendorProfile.tsx` currently only logs to console and shows an alert. It is NOT connected to any backend.

---

## 14. Quick Start for New Sessions

```
1. Read this entire CLAUDE.md file
2. Run `npm run dev` to start the dev server on port 3000
3. Key files to reference:
   - src/App.tsx (routing)
   - src/index.css (design tokens)
   - src/types/index.ts (all types)
   - src/data/mockVendors.ts (active vendor data)
4. Before writing any UI text, review Section 7 (Brand Rules)
5. Before styling, review Section 3 (Design System)
6. Before adding features, review Section 8 (MVP Status) and Section 9 (Roadmap)
```

---

*Last updated: 2026-02-08*
