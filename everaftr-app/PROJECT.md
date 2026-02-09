# haraya — Project Overview

> **The Philippines' first inclusive wedding planning platform**

Last Updated: February 9, 2026

---

## Vision

Create a modern wedding planning platform that:
- **Serves every couple** — not just brides, but all partners regardless of gender or ceremony type
- **Is rooted in Filipino culture** — understands ninongs, Pre-Cana, CENOMAR, lechon debates, and Viber group chats
- **Combines technology & warmth** — smart planning tools wrapped in a dreamy, aspirational design
- **Builds community** — connects couples, vendors, and celebrates real love stories

---

## Brand Identity

**Name:** `haraya` (always lowercase, one word)
**Meaning:** Filipino/Tagalog — imagination, creative vision, dream
**Tagline:** "where dreams take shape"
**Personality:** Dreamy, warm, inclusive, modern, Filipino
**Email:** hello@haraya.ph
**Social:** @haraya.ph (Instagram, Facebook, TikTok)

The brand identity is documented in `HARAYA-BRAND-STRATEGY.md` which supersedes all previous brand documents including the Woven Heritage Brand Guide.

---

## Core Value Proposition

**For couples:**
- Inclusive planning tools that don't assume gender roles
- Curated vendor directory with verified, LGBTQ+-friendly options
- Wedding checklist, budget tracker, and guest list manager
- Matchmaker quiz for personalized vendor recommendations
- AI assistant (Kasa) for planning questions
- Community for advice, tips, and support
- Real celebration stories from diverse couples

**For vendors:**
- Reach couples actively planning weddings
- Showcase work through verified profiles
- Opt-in "All Celebrations Welcome" badge for inclusivity signaling
- Access to engaged, qualified leads
- Free listings (premium tiers planned for future)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2+ |
| Language | TypeScript | ~5.9 |
| Build Tool | Vite | 7.2+ |
| Styling | Tailwind CSS | 4.1+ |
| Icons | lucide-react | 0.563+ |
| Routing | react-router-dom | 7.13+ |
| Database | Supabase (PostgreSQL) | In Progress |
| Auth | Supabase Auth | Planned |
| Hosting | Vercel | Active |
| Fonts | Jost (sans) + Cormorant Garamond (serif) | — |

**Live URL:** https://haraya.vercel.app
**Repository:** https://github.com/heymervin/haraya

---

## Current Status (Phase 1 MVP)

### Complete
| Feature | Status |
|---------|--------|
| Landing page (hero, how-it-works, categories, features, stats) | Done |
| Vendor directory (search, filters, grid, 300+ vendors) | Done |
| Vendor profiles (details, reviews, inquiry form) | Done |
| Planning checklist (44 items, ceremony-type filters, localStorage) | Done |
| Budget tracker (categories, suggested %, estimated vs actual) | Done |
| Matchmaker quiz (5 questions, results, share) | Done |
| About page (story, values, vendor CTA, contact) | Done |
| Navigation (sticky navbar, mobile drawer, Plan dropdown) | Done |
| Footer (brand, links, tagline) | Done |
| Favorites page (UI scaffold) | Done |
| Guest list page (UI scaffold) | Done |
| Celebration website page (UI scaffold) | Done |
| Vendor dashboard page (UI scaffold) | Done |
| Celebrations page (UI scaffold) | Done |
| Community page (UI scaffold) | Done |
| Kasa AI page (UI scaffold) | Done |
| Design system (haraya tokens, DreamLine, patterns) | Done |
| Vercel deployment | Done |
| GitHub repo | Done |

### In Progress
| Feature | Status |
|---------|--------|
| Supabase database schema | Building |
| Supabase client integration | Building |
| TypeScript types generation | Building |

### Not Started
| Feature | Priority |
|---------|----------|
| User authentication (Supabase Auth) | HIGH |
| Vendor data migration (mock → Supabase) | HIGH |
| Real inquiry submission (form → database) | HIGH |
| Favorites system (save/unsave vendors) | HIGH |
| Real review submission | MEDIUM |
| Guest list RSVP management | MEDIUM |
| Couple celebration website builder | MEDIUM |
| Vendor claim/signup flow | MEDIUM |
| Real Celebrations stories | MEDIUM |
| Community forums | MEDIUM |
| Kasa AI assistant | LOW |
| PWA/offline support | LOW |
| SEO optimization (meta tags, sitemap) | MEDIUM |
| Analytics (vendor inquiries, quiz completions) | LOW |

---

## Development Phases

### Phase 1: MVP Foundation (Current)
- Brand identity and design system ✅
- Homepage with hero and features ✅
- Vendor directory with search/filters ✅
- Planning tools (checklist + budget) ✅
- Matchmaker quiz ✅
- All page scaffolds built ✅
- Supabase database setup 🔄
- Supabase client integration 🔄

### Phase 2: Backend & Auth
- Supabase Auth (couple + vendor accounts)
- Migrate vendor data from mock to database
- Live inquiry submission
- Favorites system
- Real review system
- Guest list with RSVP tracking

### Phase 3: Community & Content
- Real Celebrations (wedding stories)
- Community forums
- Vendor claim/signup flow
- Vendor dashboard with analytics

### Phase 4: AI & Advanced
- Kasa AI assistant (vendor recommendations, planning Q&A)
- Couple celebration website builder
- Smart vendor matching
- Budget forecasting

### Phase 5: Monetization
- Vendor subscription tiers
- Featured vendor placements
- Premium couple features
- Lead generation for vendors

---

## Target Market

**Primary:** Filipino couples aged 25-35 planning weddings
- Mobile-first (primarily Android on 4G)
- Currently rely on Facebook groups and word-of-mouth
- Want pricing transparency and vendor legitimacy
- Budget range: ₱100K - ₱1M+

**Secondary:** International couples planning destination weddings in the Philippines

**Market size:** 370,000-415,000 weddings/year in the Philippines (₱74B - ₱207B market)

---

## Competitive Landscape

| Competitor | Weakness |
|-----------|----------|
| Facebook Groups | Unstructured, scam-prone, no planning tools |
| Kasal.com | Dated UI, not mobile-first, poor UX |
| Bride & Breakfast | Editorial site, not a planning tool |
| Wedtag | Basic directory with limited features |
| The Knot / WeddingWire | US-focused, gendered language, no Filipino context |

**haraya's moat:** Filipino cultural intelligence + inclusive architecture + modern UX

---

## Inclusive Design (Non-Negotiable)

- **Labels:** "You" and "Your Partner" (customizable, never assume gender)
- **Ceremony types:** Catholic, Church (INC), Church (Other), Muslim, Civil, Civil Union, Other
- **Language:** Never "bride/groom" — always inclusive alternatives
- **Vendor badge:** "All Celebrations Welcome" for LGBTQ+-friendly vendors
- **Currency:** Always PHP (₱) formatted with `toLocaleString('en-PH')`
- **Data model:** `partner1Name` / `partner2Name` — never gendered fields

---

## Key Documents

| Document | Description |
|----------|-------------|
| `HARAYA-BRAND-STRATEGY.md` | **Active brand guide** — single source of truth for all brand decisions |
| `CLAUDE.md` | Development context for AI coding sessions |
| `docs/UI-DATA-REQUIREMENTS.md` | UI data requirements analysis |
| `supabase/migrations/` | Database migration files |

### Archived (Superseded by HARAYA-BRAND-STRATEGY.md)
| Document | Status |
|----------|--------|
| `BRAND-GUIDE-V2-WOVEN-HERITAGE.md` | Archived — Woven Heritage design system retired |
| `EXECUTIVE-STRATEGY-BRIEF.md` | Archived — market analysis still valid as reference |
| `MVP-LAUNCH-PLAN.md` | Archived — technical architecture sections still valid |

---

**haraya** — where dreams take shape
