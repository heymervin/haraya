# everaftr — Project Overview

> **The Philippines' first inclusive, AI-powered wedding and celebration planning platform**

Last Updated: February 7, 2026

---

## Vision

Create a modern wedding planning platform that:
- **Serves every couple** - not just brides, but all partners regardless of gender or ceremony type
- **Celebrates Filipino culture** - rooted in six textile weaving traditions (Piña, Inabel, T'nalak, Hablon, Yakan, Langkit)
- **Combines technology & tradition** - AI-powered tools with culturally-rich design
- **Builds community** - connects couples, vendors, and celebrates real love stories

---

## Core Value Proposition

**For couples:**
- Inclusive planning tools that don't assume gender roles
- Curated vendor directory with verified, LGBTQ+-friendly options
- Real celebration stories from diverse couples
- AI assistant for recommendations and planning help
- Community for advice, tips, and support

**For vendors:**
- Reach couples actively planning celebrations
- Showcase work through verified profiles
- Opt-in "All Celebrations Welcome" badge
- Access to engaged, qualified leads

---

## Product Features (Planned)

### 1. **Homepage** (Piña - Ivory/Cream/Gold)
- Hero with brand messaging: "where forevr begins"
- Feature overview
- Call-to-action: Start Planning

### 2. **Vendor Directory** (Inabel - Indigo/Red/Gold)
- Browse by category: Venues, Photo/Video, Catering, Planning, etc.
- Search and filter by location, price, services
- Vendor profiles with portfolios, reviews, pricing
- Verified badge and "All Celebrations Welcome" badge
- Direct inquiry/booking

### 3. **Planning Tools** (Hablon - Green/Blue/Gold)
- **Checklist**: Customizable tasks with progress tracking
- **Budget Tracker**: Track spending by category
- **Guest List**: RSVP management, meal preferences, Viber integration
- **Wedding Party**: Customizable roles (not gendered)
- **Requirements**: Church paperwork tracker (Pre-Cana, certificates)
- **Timeline**: Day-of schedule builder
- **Our Website**: Simple wedding website generator

### 4. **Real Celebrations** (T'nalak - Heritage Red/Earth)
- Real wedding stories from diverse couples
- Different ceremony types (Church, Civil, Muslim, Civil Union)
- Photos, details, vendor credits
- Inspiration and ideas

### 5. **Community** (Yakan - Fuchsia/Teal/Orange)
- Discussion forums by topic (Budget Tips, Vendor Recommendations, etc.)
- Upvoting, commenting, threads
- Moderation to protect against discrimination
- Safe space for all couples

### 6. **AI Assistant** (Langkit - Magenta/Gold/Violet)
- Working name: "Ate AI"
- Chat interface for planning questions
- Vendor recommendations based on preferences
- Budget advice
- Timeline suggestions
- Integrates with OpenAI/Anthropic APIs

---

## Design System — Woven Heritage

everaftr's visual identity is rooted in **six Filipino textile weaving traditions**. Each section draws color and texture from a different tradition:

| Section | Textile | Origin | Colors | Symbolism |
|---------|---------|--------|--------|-----------|
| Homepage | Piña | Aklan/Kalibo | Ivory, Cream, Gold | Elegance, celebration |
| Directory | Inabel | Ilocos | Indigo, Red, Gold | Protection, trust |
| Real Celebrations | T'nalak | T'boli/South Cotabato | Heritage Red, Earth, Black | Dreams, stories |
| Planner | Hablon | Iloilo/Visayas | Green, Blue, Gold | Structure, growth |
| Community | Yakan | Zamboanga/Basilan | Fuchsia, Teal, Orange | Diversity, boldness |
| AI Assistant | Langkit | Lanao/Maranao | Magenta, Gold, Violet | Wisdom, connection |

**Signature element:** Multi-colored woven border (6px height, 6 stripes) appears at the top of every page.

**Full design system:** `outputs/everaftr/brand/BRAND-GUIDE-V2-WOVEN-HERITAGE.md`

---

## Inclusive Design Philosophy (Non-Negotiable)

everaftr is built for **every couple**. This means:

### Language
- ❌ NEVER: bride/groom, bridal party, Mr. & Mrs., his/her, bridesmaids/groomsmen
- ✅ ALWAYS: Partner 1/Partner 2, wedding party, the couple, their/both partners

### Forms & Data
- Relationship fields use "Partner 1/Partner 2" with customization options
- Gender is optional, free-text (never required, never binary dropdown)
- Wedding party roles are fully customizable (no hardcoded gendered roles)
- Support multiple ceremony types: Church (Catholic/INC/Other), Muslim, Civil, Civil Union, Other
- Pronouns are optional, displayed only if provided

### Imagery & Content
- Real Celebrations must feature diverse couples (straight, LGBTQ+, intercultural, different ceremony types)
- Marketing shows both partners planning, not just one
- Stock imagery avoids exclusively traditional bride-in-white-gown defaults

### Vendor Badges
- "All Celebrations Welcome" badge (Lanao Violet background) - vendors opt-in to indicate LGBTQ+ friendliness

---

## Tech Stack

**Frontend:**
- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS
- Lucide React (icons)

**Backend (Planned):**
- Next.js API routes OR Express
- PostgreSQL / Supabase
- Supabase Auth

**AI (Planned):**
- OpenAI API or Anthropic Claude API
- Vector embeddings for vendor search

**Deployment:**
- Vercel (frontend)
- Supabase (backend/database)

**Fonts:**
- Jost (sans-serif) - for brand wordmark, UI, body text
- Cormorant Garamond (serif) - for headlines, emotional content, taglines

---

## Target Market

**Primary:** Filipino couples (in Philippines and abroad) planning:
- Weddings (Church, Civil, Muslim, Civil Union)
- Engagements
- Other celebrations (anniversaries, vow renewals)

**Secondary:** International couples planning destination weddings in Philippines

**Demographics:**
- Age: 25-35 primary, 22-40 secondary
- Tech-savvy, mobile-first
- LGBTQ+ inclusive, seeking vendors who welcome all couples
- Budget-conscious (₱200K-₱1M average wedding budget)

---

## Competitive Landscape

**Existing platforms (mostly US/international):**
- The Knot, WeddingWire, Zola - Not Philippines-focused, gendered language
- Bridestory (Indonesia) - Some PH coverage but still bride-focused

**everaftr's differentiation:**
- ✅ First inclusive platform (Partner 1/2, not bride/groom)
- ✅ Filipino-first (understands ninongs, Pre-Cana, Viber groups, lechon debates)
- ✅ Culturally-rooted design (textile heritage, not generic pink)
- ✅ AI-powered recommendations
- ✅ Community-driven
- ✅ "All Celebrations Welcome" vendor badging

---

## Business Model (Future)

1. **Vendor Subscriptions** - Monthly/annual listings with enhanced profiles
2. **Featured Placements** - Vendors pay for top search results
3. **Lead Generation** - Vendors pay per qualified inquiry
4. **Premium Planning Tools** - Advanced features for couples (budget analytics, guest management)
5. **Affiliate Commissions** - Partner with vendors for booking commissions

**Phase 1 (MVP):** Free for all, focus on growth and user acquisition

---

## Success Metrics

**User Engagement:**
- Monthly active couples using planning tools
- Vendor inquiries sent
- Community posts and engagement
- Time spent in planner

**Vendor Adoption:**
- Number of verified vendors
- "All Celebrations Welcome" badge adoption
- Vendor renewals

**Business:**
- Couple signups
- Vendor signups
- Conversion to paid plans (future)
- NPS (Net Promoter Score)

---

## Development Phases

### **Phase 1: MVP Foundation** (Current)
- Brand identity and design system ✅
- Homepage with hero and overview
- Basic vendor directory (browse, search, profiles)
- Simple planning checklist
- Static pages (About, Contact)

### **Phase 2: Core Features**
- User authentication (Supabase Auth)
- Full planning suite (Budget, Guest List, Timeline, Requirements)
- Vendor inquiry system
- Real Celebrations section
- Wedding party manager

### **Phase 3: Community & Content**
- Community forums
- User-generated content
- Vendor reviews and ratings
- Blog/resources section

### **Phase 4: AI & Advanced Features**
- AI assistant (Ate AI)
- Smart vendor recommendations
- Budget forecasting
- Timeline auto-generation
- Wedding website builder

### **Phase 5: Monetization**
- Vendor subscription tiers
- Premium couple features
- Analytics dashboard for vendors
- Lead scoring and routing

---

## Key Decisions Made

**Brand Name:** `everaftr` (lowercase, one word, dropped-e signature)
**Tagline:** `where forevr begins`
**Design System:** Woven Heritage (six textile traditions)
**Inclusive Language:** Mandatory, Partner 1/2 always
**Tech Stack:** React + TypeScript + Vite (frontend-first MVP)
**Color Approach:** Section-specific palettes tied to textiles
**Typography:** Jost (modern/functional) + Cormorant Garamond (heritage/emotional)

---

## Open Questions / Decisions Needed

- [ ] Should AI assistant use OpenAI or Anthropic Claude?
- [ ] What authentication flow for couples? (Email/password, OAuth, magic link?)
- [ ] Vendor verification process - manual review or automated?
- [ ] Pricing tiers for vendors - what levels?
- [ ] Should we build native mobile apps or PWA first?
- [ ] Content moderation strategy for community - automated tools or manual review?

---

## Resources

- **Brand Guide:** `outputs/everaftr/brand/BRAND-GUIDE-V2-WOVEN-HERITAGE.md`
- **Interactive Brand Board:** `outputs/everaftr/brand/everaftr-brand-v2-weaving.html`
- **Development Guide:** `CLAUDE.md`
- **Project Status:** `STATUS.md`

---

**everaftr** — Six threads. One platform. Every couple.
