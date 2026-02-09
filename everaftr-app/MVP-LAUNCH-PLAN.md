# everaftr -- MVP Launch Plan

> **The Philippines' first inclusive, AI-powered wedding planning platform**
> Plan authored: February 8, 2026
> Target launch: April 2026 (8-week sprint starting Feb 17)

---

## Executive Summary

The Philippine wedding industry represents a massive, underserved market. With 371,825 registered marriages in 2024 and average wedding budgets ranging from PHP 50,000 to PHP 1,000,000+, couples are spending billions annually -- yet there is no dominant digital platform serving them. The existing landscape is fragmented: Kasal.com (est. 2001) operates primarily as an expo organizer with an outdated web presence, Bride and Breakfast is a content/media blog, and Filipino couples default to Facebook groups, Instagram searches, and word-of-mouth recommendations from relatives.

everaftr has a clear window to become the definitive platform by combining three things no competitor offers: (1) genuinely inclusive design for every couple, (2) culturally rooted Filipino identity, and (3) modern AI-powered planning tools. The civil partnership bills gaining traction in the Philippine Senate add urgency and cultural relevance to the inclusive positioning.

This plan defines the minimum viable product, a week-by-week 8-week build sprint, a vendor acquisition playbook, a go-to-market strategy optimized for Filipino social media behavior, and the success metrics that justify investment in Phase 2.

---

## Table of Contents

1. [MVP Scope Definition](#1-mvp-scope-definition)
2. [Feature Prioritization (MoSCoW)](#2-feature-prioritization-moscow)
3. [Launch Strategy](#3-launch-strategy)
4. [Technical Architecture for MVP](#4-technical-architecture-for-mvp)
5. [Vendor Acquisition Strategy](#5-vendor-acquisition-strategy)
6. [Timeline and Milestones](#6-timeline-and-milestones)
7. [Success Metrics for MVP](#7-success-metrics-for-mvp)
8. [Risks and Mitigations](#8-risks-and-mitigations)
9. [Go-to-Market Positioning](#9-go-to-market-positioning)
10. [Budget Considerations](#10-budget-considerations)

---

## 1. MVP Scope Definition

### The Core Question: What is the minimum product that delivers enough value to make couples come back AND tell their friends?

The MVP is not a full planning suite. It is a **vendor discovery engine + lightweight planning checklist** wrapped in a brand experience so distinctly Filipino and inclusive that it becomes shareable on its own.

### IN the MVP (Launch Day)

| Feature | Description | Rationale |
|---------|-------------|-----------|
| **Homepage** | Hero with brand messaging, value proposition, CTA to browse vendors or start planning | First impression. Must communicate "this is different" in 5 seconds. |
| **Vendor Directory** | Browse by category, filter by location/price range, vendor profile pages with photos and contact info | Core utility. This is why couples visit. Without vendors, there is no platform. |
| **Planning Checklist** | Pre-built customizable checklist with progress tracking (12-month, 6-month, 3-month timelines) | Sticky feature. Gives couples a reason to return weekly. |
| **Budget Tracker** | Simple budget planner with category breakdown and running total | Second most requested tool by couples. Pairs naturally with vendor browsing. |
| **User Authentication** | Email + Google OAuth sign-up/sign-in via Supabase Auth | Required for saving checklists, budgets, and vendor favorites. |
| **Vendor Favorites** | Save vendors to a personal shortlist | Bridges browsing and planning. Low effort, high engagement. |
| **Inquiry Form** | Send a message to a vendor directly from their profile | Delivers immediate value to both couples and vendors. Core marketplace interaction. |
| **About Page** | Brand story, Woven Heritage design philosophy, team | Builds trust. Important for PR and vendor recruitment. |
| **Mobile-Responsive Web** | Fully responsive design, mobile-first | 95%+ of Filipino internet users access via mobile. |

### The "Wow" Feature: The Matchmaker Quiz

This is the feature that makes people share. A short, visually engaging quiz (5-7 questions) that asks about celebration style, budget range, location, and vibe -- then generates a curated shortlist of vendors with a shareable results card. Think "BuzzFeed quiz meets wedding planning."

Why this works:
- **Shareable**: "I just found my dream vendor team!" with a branded results card for Instagram/Facebook stories
- **Data collection**: Every quiz completion gives us couple preferences for future AI recommendations
- **Vendor value**: Vendors see qualified leads matched to their style
- **Low technical complexity**: Rule-based matching (no AI needed for v1), visually rich output
- **Filipino social behavior**: 94.6% Facebook penetration, average 3.5 hours daily on social media -- shareable content travels fast

### DEFERRED from MVP (Explicitly Out of Scope)

| Feature | Why Deferred | When |
|---------|-------------|------|
| **Guest List Manager** | Complex feature (RSVP, meals, seating). Checklist + budget are enough to start. | Phase 2 (Month 3-4) |
| **Wedding Party Manager** | Nice to have but not essential for early engagement. | Phase 2 |
| **Requirements Tracker** | Church paperwork tracker is valuable but niche. Can be a checklist sub-section for now. | Phase 2 |
| **Day-of Timeline Builder** | Used only close to the wedding day. Most early users are 6-12 months out. | Phase 2 |
| **Wedding Website Generator** | High development cost, low urgency. Couples use free tools for this already. | Phase 3 |
| **Community Forums** | Requires critical mass to be valuable. Empty forums are worse than no forums. | Phase 3 |
| **Real Celebrations Stories** | Content-dependent. Need to collect stories first. Seed with 3-5 stories at launch. | Phase 2 (content pipeline) |
| **AI Assistant (Ate AI)** | Requires tuning, guardrails, and vendor data quality. Ship quiz first, AI later. | Phase 4 |
| **Vendor Dashboard** | Full self-service vendor management. Start with manual onboarding. | Phase 2-3 |
| **Monetization / Payments** | Phase 1 is free for everyone. Revenue comes after proving value. | Phase 5 |

### MVP Feature Map (Visual)

```
LAUNCH DAY (Week 8)
====================

COUPLE-FACING                           VENDOR-FACING
-----------                             -------------
[Homepage]                              [Vendor Profile Page]
    |                                       |
    +-->[Vendor Directory]                  +-->[Inquiry Inbox (email)]
    |       |                               |
    |       +-->[Search + Filters]          +-->[Claim Your Listing]
    |       +-->[Vendor Cards]
    |       +-->[Vendor Profiles]
    |       +-->[Save to Favorites]
    |       +-->[Send Inquiry]
    |
    +-->[Matchmaker Quiz]
    |       +-->[Results + Share Card]
    |
    +-->[Planning Checklist]
    |       +-->[Custom Tasks]
    |       +-->[Progress Tracking]
    |
    +-->[Budget Tracker]
    |       +-->[Category Breakdown]
    |       +-->[Running Total]
    |
    +-->[Auth: Sign Up / Sign In]
    +-->[About Page]

SEEDED CONTENT (3-5 stories, editorially curated)
--------------------------------------------------
[Real Celebrations] -- Minimal section, 3-5 featured stories
```

---

## 2. Feature Prioritization (MoSCoW)

### MUST HAVE -- Required for Launch

These features are non-negotiable. Without them, the product does not deliver enough value to retain a single user.

| # | Feature | Impact (1-10) | Effort (1-10) | Priority Score |
|---|---------|---------------|---------------|----------------|
| 1 | Vendor Directory (browse, search, filter) | 10 | 7 | **Highest** |
| 2 | Vendor Profile Pages (photos, info, contact) | 9 | 5 | **Highest** |
| 3 | User Authentication (Supabase Auth) | 8 | 4 | **Highest** |
| 4 | Planning Checklist (customizable, progress) | 8 | 5 | **Highest** |
| 5 | Budget Tracker (categories, totals) | 7 | 4 | **Highest** |
| 6 | Vendor Inquiry Form | 8 | 3 | **Highest** |
| 7 | Homepage (brand + CTA) | 7 | 4 | **Highest** |
| 8 | Mobile-Responsive Design | 9 | 6 | **Highest** |
| 9 | Inclusive Language (all UI, forms, copy) | 10 | 3 | **Highest** |
| 10 | Woven Heritage Design System | 8 | 5 | **Highest** |

### SHOULD HAVE -- High Value, Not Blocking Launch

These significantly improve the experience but launching without them is acceptable for a soft launch.

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 11 | Matchmaker Quiz + Share Card | 9 | 5 | Ship within first 2 weeks post-soft-launch if not ready at launch |
| 12 | Vendor Favorites / Shortlist | 7 | 3 | Simple CRUD on Supabase, high engagement |
| 13 | "All Celebrations Welcome" Badge | 8 | 2 | Differentiator. Requires vendor opt-in during onboarding |
| 14 | Email Notifications (inquiry alerts) | 7 | 4 | Vendors need to know when couples reach out |
| 15 | SEO Optimization (meta tags, OG images) | 7 | 3 | Critical for organic discovery, especially vendor names |

### COULD HAVE -- Nice to Have, Adds Polish

| # | Feature | Impact | Effort | Notes |
|---|---------|--------|--------|-------|
| 16 | Real Celebrations (3-5 seeded stories) | 6 | 4 | Content-dependent. Ship if stories are ready. |
| 17 | Dark Mode | 4 | 3 | Brand guide already defines dark mode tokens |
| 18 | Vendor Rating Display (static, editorial) | 5 | 2 | No user reviews yet. Can show editorial picks. |
| 19 | PWA Install Prompt | 5 | 2 | Low effort, gives "app-like" feel on mobile |
| 20 | Filipino Tradition Guides | 5 | 3 | Already partially built in current codebase |

### WON'T HAVE (Yet) -- Explicitly Deferred

| Feature | Target Phase | Reason for Deferral |
|---------|-------------|---------------------|
| AI Assistant (Ate AI) | Phase 4 | Needs data, tuning, and cost management |
| Community Forums | Phase 3 | Empty forums are anti-growth |
| Guest List / RSVP Manager | Phase 2 | Complex feature, not needed for initial retention |
| Wedding Website Builder | Phase 3 | Many free alternatives exist |
| Vendor Self-Service Dashboard | Phase 2 | Manual onboarding is fine for first 100 vendors |
| Payment / Booking System | Phase 5 | Premature before proving marketplace dynamics |
| Native Mobile Apps | Phase 4+ | Responsive web + PWA is sufficient |
| Vendor Analytics | Phase 3 | Need traffic volume first |
| Multi-language (Tagalog/Bisaya) | Phase 3 | English-first for MVP, add Filipino language later |

---

## 3. Launch Strategy

### 3.1 Two-Phase Launch: Soft Launch then Public Launch

**SOFT LAUNCH (Week 7-8): "Founding Couples" Program**

- Target: 50 couples, 30 vendors
- Duration: 2 weeks
- Purpose: Bug-finding, feedback collection, testimonial generation
- Access: Invite-only via application form
- Incentive: "Founding Couple" badge on profile (permanent), priority access to future features, direct line to product team via Viber group

**PUBLIC LAUNCH (Week 9-10): "Every Couple" Campaign**

- Full public access
- PR push to Philippine media
- Social media campaign launch
- Vendor directory goes fully live

### 3.2 Target First 100 Couples -- Who They Are

**Primary Target: Metro Manila Engaged Couples, Age 25-32**

Why:
- CALABARZON and NCR account for 27.8% of all Philippine weddings
- Highest smartphone penetration and digital sophistication
- Most likely to plan online vs. relying solely on family networks
- Civil weddings are the #1 ceremony type (41.8%) -- these couples are less tied to church-based vendor networks

**Specific Segments for First 100:**

| Segment | Size Target | Where to Find Them | Hook |
|---------|-------------|-------------------|------|
| Recently engaged (0-3 months) | 40 couples | Instagram hashtags (#engagedph, #proposalph), Facebook groups ("Weddings PH", "Budget Wedding Philippines") | "Start planning with tools built for you" |
| LGBTQ+ couples | 15 couples | Pride PH organizations, LGBTQ+ Facebook groups, partner with Love Is All We Need PH | "Finally, a platform that sees you" |
| Budget-conscious planners | 25 couples | TikTok (100k wedding budget is trending topic), MoneyMax/personal finance communities | "Track every peso. Find vendors in your budget." |
| Destination wedding planners (OFW/diaspora) | 10 couples | Filipino communities abroad (US, UAE, SG), overseas-focused Facebook groups | "Plan your Philippine wedding from anywhere" |
| Wedding planner professionals | 10 planners | Direct outreach, industry events, wedding coordinator Facebook groups | "Recommend vendors your clients will love" |

### 3.3 Social Media Strategy (Philippines-Optimized)

The Philippines has 94.6% Facebook penetration, 82.2% TikTok usage, and 71.2% Instagram usage. Average social media time is 3 hours 34 minutes daily. 70% of Filipinos have purchased something based on an influencer recommendation. This is our primary acquisition channel.

**Facebook Strategy (Awareness + Community)**

- Create "everaftr" Facebook Page with consistent Woven Heritage branding
- Join and participate in top wedding planning Facebook groups (Weddings PH, Budget Wedding Philippines, Wedding Suppliers PH) -- provide value first, not spam
- Launch "Founding Couples" application via Facebook form
- Share vendor spotlights, planning tips, and inclusive content
- Run targeted ads to recently engaged users in NCR + CALABARZON (PHP 5,000/week budget)
- Create a closed Facebook Group: "everaftr Couples" as a bridge community before building in-app community

**Instagram Strategy (Brand + Aspiration)**

- Visual-first content showcasing the Woven Heritage design system
- Behind-the-scenes of building everaftr (founder story resonates in PH market)
- Vendor portfolio highlights (drives vendor recruitment AND couple engagement)
- Reels: Quick tips, vendor reveals, "meet the couple" stories
- Stories: Polls, Q&A about wedding planning, quiz teasers
- Hashtags: #everaftr #whereforevbegins #filipinowedding #inclusiveweddings #weddingph
- Partner with 3-5 micro-influencers (10k-50k followers) in the wedding/lifestyle space

**TikTok Strategy (Discovery + Virality)**

- TikTok is the #1 platform by time spent per user (40 hours/month) in the Philippines
- Content pillars:
  - "Wedding Planning in the Philippines" educational series
  - Budget breakdowns ("How much does a Manila wedding really cost?")
  - Vendor reveals and transformations
  - "Things no one tells you about planning a Filipino wedding"
  - Behind-the-scenes building the platform (tech startup founder content)
  - Matchmaker Quiz results (designed to be screenshot/video friendly)
- Post 3-5x per week, prioritize trending audio
- Use Filipino + English code-switching (Taglish) for authenticity

**Content Calendar (Pre-Launch -- 3 Weeks Before Public Launch)**

| Week | Theme | Platforms | Content |
|------|-------|-----------|---------|
| Week -3 | Teaser | IG, TikTok | "Something is coming for Filipino couples" -- brand reveal teasers, Woven Heritage design sneak peeks |
| Week -2 | Problem | FB, TikTok | "Wedding planning in PH is broken" -- pain point content about scattered vendor info, gendered platforms |
| Week -1 | Solution | All | "Meet everaftr" -- full brand reveal, Founding Couples program announcement, feature walkthrough |
| Launch Week | Celebration | All | Public launch, vendor directory live, quiz launch, PR coverage, influencer posts |

### 3.4 PR Angle for Philippine Media

**Primary Story: "The Philippines Gets Its First Inclusive Wedding Platform, Rooted in Filipino Heritage"**

This story has multiple hooks for different media outlets:

| Media Outlet Type | Angle | Target Publications |
|-------------------|-------|---------------------|
| Tech/Startup | "Filipino startup uses AI to reimagine wedding planning" | Tech in Asia, e27, Manila Bulletin Tech, Rappler Tech |
| Lifestyle/Wedding | "New platform celebrates every Filipino love story" | Bride and Breakfast (pitch as partner, not competitor), Preview, Esquire PH |
| Culture/Heritage | "Six textile traditions inspire the Philippines' newest tech platform" | CNN Philippines, ABS-CBN Lifestyle, Philippine Star Lifestyle |
| LGBTQ+ / Social | "As civil union bills advance, everaftr welcomes all couples" | Rappler, Vice Asia, Outrage Magazine PH |
| Business | "Gap in PHP 100B+ wedding market gets tech solution" | Business World, Inquirer Business, Entrepreneur PH |

**PR Tactics:**
- Press release with high-quality screenshots and brand assets
- Founder interviews (personal story of why inclusivity matters)
- Exclusive first-look for Bride and Breakfast or Rappler
- Embargoed access to 2-3 journalists before public launch

---

## 4. Technical Architecture for MVP

### 4.1 Architecture Principle: Simplest Thing That Works

The MVP should be deployable and maintainable by a small team (1-3 developers). No microservices. No complex CI/CD. Ship fast, learn fast, refactor later.

```
ARCHITECTURE OVERVIEW
=====================

[User Browser / Mobile]
        |
        v
[Vercel] -- Static hosting + Edge functions
   |
   +-->[React SPA (Vite build)]
   |       - Pages: Home, Directory, Vendor Profile, Planner, Auth
   |       - Tailwind CSS + Woven Heritage tokens
   |       - React Router (client-side routing)
   |
   +-->[Vercel Serverless Functions]
           - Vendor inquiry emails (Resend)
           - Quiz result generation
           - Image optimization
        |
        v
[Supabase]
   |
   +-->[PostgreSQL Database]
   |       - Vendors, Categories, Couples, Checklists, Budgets, Favorites, Inquiries
   |
   +-->[Supabase Auth]
   |       - Email/password + Google OAuth
   |       - Magic link as alternative
   |
   +-->[Supabase Storage]
   |       - Vendor photos (portfolio images)
   |       - Couple avatars (optional)
   |
   +-->[Row Level Security (RLS)]
           - Couples see only their own data
           - Vendors see only their own profile + inquiries
           - Directory data is public read
```

### 4.2 Supabase Database Schema

```sql
-- =============================================
-- everaftr MVP Database Schema
-- =============================================

-- ENUMS
CREATE TYPE ceremony_type AS ENUM (
  'church_catholic',
  'church_inc',
  'church_other',
  'muslim',
  'civil',
  'civil_union',
  'other'
);

CREATE TYPE vendor_status AS ENUM ('pending', 'active', 'suspended');
CREATE TYPE inquiry_status AS ENUM ('new', 'read', 'replied', 'archived');

-- =============================================
-- VENDOR CATEGORIES
-- =============================================
CREATE TABLE vendor_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,              -- "Venues", "Photo & Video", etc.
  slug TEXT UNIQUE NOT NULL,       -- "venues", "photo-video"
  description TEXT,
  icon TEXT,                       -- Lucide icon name
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- VENDORS
-- =============================================
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES vendor_categories(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  location_city TEXT,
  location_province TEXT,
  location_region TEXT,              -- "NCR", "CALABARZON", etc.
  price_range_min INT,               -- in PHP
  price_range_max INT,
  price_label TEXT,                  -- "Starting at PHP 50,000"
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  instagram_handle TEXT,
  facebook_url TEXT,
  cover_image_url TEXT,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  all_celebrations_welcome BOOLEAN DEFAULT FALSE,  -- LGBTQ+ friendly badge
  is_featured BOOLEAN DEFAULT FALSE,
  status vendor_status DEFAULT 'active',
  owner_user_id UUID REFERENCES auth.users(id),    -- NULL until vendor claims listing
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX idx_vendors_search ON vendors
  USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(location_city, '')));

CREATE INDEX idx_vendors_category ON vendors(category_id);
CREATE INDEX idx_vendors_region ON vendors(location_region);
CREATE INDEX idx_vendors_status ON vendors(status);

-- =============================================
-- VENDOR PHOTOS (Portfolio)
-- =============================================
CREATE TABLE vendor_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- VENDOR SERVICES (Tags/Offerings)
-- =============================================
CREATE TABLE vendor_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,        -- "Same-day Edit", "Drone Coverage", etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COUPLES (User Profiles)
-- =============================================
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  partner1_name TEXT,
  partner2_name TEXT,
  partner1_pronoun TEXT,             -- Optional, free text
  partner2_pronoun TEXT,             -- Optional, free text
  celebration_date DATE,
  ceremony_type ceremony_type,
  location_city TEXT,
  location_province TEXT,
  estimated_guest_count INT,
  estimated_budget INT,              -- in PHP
  planning_status TEXT DEFAULT 'just_started',  -- just_started, actively_planning, almost_there
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CHECKLIST ITEMS
-- =============================================
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,                     -- "venue", "attire", "documentation", etc.
  due_date DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  display_order INT DEFAULT 0,
  is_custom BOOLEAN DEFAULT FALSE,   -- User-added vs. template
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checklist_couple ON checklist_items(couple_id);

-- =============================================
-- BUDGET ITEMS
-- =============================================
CREATE TABLE budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  category TEXT NOT NULL,            -- "Venue", "Catering", "Photo & Video", etc.
  item_name TEXT NOT NULL,
  estimated_cost INT DEFAULT 0,
  actual_cost INT DEFAULT 0,
  is_paid BOOLEAN DEFAULT FALSE,
  vendor_id UUID REFERENCES vendors(id),  -- Optional link to a vendor
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_budget_couple ON budget_items(couple_id);

-- =============================================
-- FAVORITES (Couple's vendor shortlist)
-- =============================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  notes TEXT,                        -- Personal notes about this vendor
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(couple_id, vendor_id)
);

-- =============================================
-- INQUIRIES (Couple -> Vendor messages)
-- =============================================
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id),
  vendor_id UUID REFERENCES vendors(id),
  couple_name TEXT NOT NULL,
  couple_email TEXT NOT NULL,
  celebration_date DATE,
  estimated_guest_count INT,
  estimated_budget_range TEXT,       -- "Under PHP 100k", "PHP 100k-300k", etc.
  message TEXT NOT NULL,
  status inquiry_status DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_vendor ON inquiries(vendor_id);
CREATE INDEX idx_inquiries_couple ON inquiries(couple_id);

-- =============================================
-- QUIZ RESPONSES (Matchmaker Quiz)
-- =============================================
CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id),  -- NULL for anonymous
  celebration_style TEXT,            -- "intimate", "grand", "destination", etc.
  budget_range TEXT,
  location_preference TEXT,
  vibe_keywords TEXT[],              -- ["rustic", "modern", "garden"]
  priority_categories TEXT[],        -- ["venue", "photo-video", "catering"]
  matched_vendor_ids UUID[],         -- Result vendor IDs
  share_token TEXT UNIQUE,           -- For shareable result link
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- REAL CELEBRATIONS (Seeded stories)
-- =============================================
CREATE TABLE celebrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  partner1_name TEXT,
  partner2_name TEXT,
  ceremony_type ceremony_type,
  location TEXT,
  celebration_date DATE,
  story_content TEXT,                -- Markdown or rich text
  cover_image_url TEXT,
  vendor_credits JSONB,              -- [{vendor_id, role}]
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Vendors: Public read, owner write
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vendors are viewable by everyone"
  ON vendors FOR SELECT USING (status = 'active');
CREATE POLICY "Vendors can be updated by owner"
  ON vendors FOR UPDATE USING (auth.uid() = owner_user_id);

-- Couples: Owner only
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Couples can view own profile"
  ON couples FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Couples can update own profile"
  ON couples FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Couples can insert own profile"
  ON couples FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Checklist: Owner only
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Checklist items viewable by couple owner"
  ON checklist_items FOR SELECT
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));
CREATE POLICY "Checklist items editable by couple owner"
  ON checklist_items FOR ALL
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));

-- Budget: Owner only
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Budget items viewable by couple owner"
  ON budget_items FOR SELECT
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));
CREATE POLICY "Budget items editable by couple owner"
  ON budget_items FOR ALL
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));

-- Favorites: Owner only
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Favorites viewable by couple owner"
  ON favorites FOR SELECT
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));
CREATE POLICY "Favorites editable by couple owner"
  ON favorites FOR ALL
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));

-- Inquiries: Couple sees own, vendor sees received
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Couples can view own inquiries"
  ON inquiries FOR SELECT
  USING (couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid()));
CREATE POLICY "Vendors can view received inquiries"
  ON inquiries FOR SELECT
  USING (vendor_id IN (SELECT id FROM vendors WHERE owner_user_id = auth.uid()));
CREATE POLICY "Authenticated users can create inquiries"
  ON inquiries FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Vendor Categories: Public read
ALTER TABLE vendor_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON vendor_categories FOR SELECT USING (true);

-- Vendor Photos: Public read
ALTER TABLE vendor_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vendor photos are public" ON vendor_photos FOR SELECT USING (true);

-- Celebrations: Public read (published only)
ALTER TABLE celebrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published celebrations are public"
  ON celebrations FOR SELECT USING (is_published = true);

-- Quiz: Public insert, owner read
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create quiz response"
  ON quiz_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Quiz responses viewable by owner or via share token"
  ON quiz_responses FOR SELECT USING (
    couple_id IN (SELECT id FROM couples WHERE user_id = auth.uid())
    OR share_token IS NOT NULL
  );
```

### 4.3 Key Technical Decisions

**Question: Full vendor backend or start with curated/static data?**

Answer: **Hybrid approach.** Start with admin-seeded vendor data (manually entered by the everaftr team) stored in Supabase. Vendors do NOT get a self-service dashboard in MVP. Instead:

1. Team manually creates vendor listings from public information (Instagram, Facebook, websites)
2. Vendors are emailed: "You have been listed on everaftr. Claim your listing to update details."
3. "Claiming" links the vendor's Supabase Auth account to their vendor record
4. Claimed vendors can update their info via a simple edit form (not a full dashboard)
5. Full vendor dashboard ships in Phase 2

This is faster to build and lets us control quality while building initial supply.

**Question: Mobile-first or responsive web?**

Answer: **Responsive web, designed mobile-first.** No native apps for MVP. The reasons:

- 95%+ of Filipino users are on mobile, so design starts at 375px width
- React + Tailwind handles responsive beautifully
- PWA install prompt gives app-like experience without App Store friction
- App Store approval adds weeks of delay
- One codebase, one deployment

**Question: Authentication flow?**

Answer: **Google OAuth (primary) + Email/Password (secondary) + Magic Link (alternative).**

- Google OAuth: Fastest sign-up, most Filipinos have Gmail
- Email/Password: For those who prefer it
- Magic Link: Lower friction alternative, no password to remember
- No phone/SMS auth for MVP (Supabase phone auth has additional costs)

**Question: AI -- OpenAI or Anthropic?**

Answer: **Deferred. No AI in MVP.** The Matchmaker Quiz uses rule-based matching (budget range, location, category, style tags). This is simpler, cheaper, and faster. AI (Ate AI) comes in Phase 4 once we have enough vendor data and couple preference data to make recommendations meaningful. When we do build it, Anthropic Claude is recommended for safety/alignment advantages relevant to inclusive content.

### 4.4 Tech Stack Summary for MVP

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | React 19 + TypeScript + Vite 6 | Free |
| Styling | Tailwind CSS with Woven Heritage custom config | Free |
| Routing | React Router v6 | Free |
| Icons | Lucide React | Free |
| Hosting | Vercel (free hobby tier to start, upgrade to Pro at $20/mo when needed) | $0-20/mo |
| Database | Supabase (free tier: 500MB, 50K auth users) | $0/mo |
| Auth | Supabase Auth (Google OAuth + email) | Free |
| Storage | Supabase Storage (1GB free) | $0/mo |
| Email | Resend (free tier: 100 emails/day) | $0/mo |
| Analytics | Plausible or PostHog (free self-hosted or cheap cloud) | $0-9/mo |
| Domain | everaftr.ph or everaftr.com | ~$12-40/yr |
| DNS/CDN | Cloudflare (free) | Free |

**Total infrastructure cost for MVP: $0-30/month + domain registration**

### 4.5 Critical Supabase Note

The Supabase free tier pauses projects after 7 days of inactivity. For a production launch, upgrade to the Pro tier ($25/month) before the public launch date. The soft launch can use the free tier since there will be constant activity.

---

## 5. Vendor Acquisition Strategy

### 5.1 The Chicken-and-Egg Problem

Couples come for vendors. Vendors come for couples. We must solve the supply side first.

**Target: 100 vendors listed at public launch, 30 of whom are "claimed" (actively engaged).**

### 5.2 Vendor Category Priority

Focus on the categories couples search for first (based on typical planning timeline):

| Priority | Category | Target Count | Rationale |
|----------|----------|-------------|-----------|
| **P0** | Venues | 20 | First vendor type couples research. Drives all other decisions. |
| **P0** | Photo & Video | 20 | Second most searched. Highly visual -- great for platform content. |
| **P1** | Catering | 15 | Third in planning sequence. Major budget line item. |
| **P1** | Wedding Planning & Coordination | 10 | These professionals become our evangelists -- they recommend the platform to their clients. |
| **P2** | Hair & Makeup | 10 | Popular search category, high Instagram presence. |
| **P2** | Wedding Attire | 10 | Important but couples often shop in person. |
| **P3** | Flowers & Styling | 10 | Visual category, good for platform aesthetics. |
| **P3** | Entertainment / Music | 5 | Smaller category, lower priority. |

### 5.3 How to Get the First 100 Vendors

**Phase A: Seed 70 listings from public data (Weeks 1-4)**

The team creates vendor listings using publicly available information:
- Instagram business profiles (most PH wedding vendors are Instagram-first)
- Facebook business pages
- Kasal.com directory (public data)
- Bride and Breakfast featured vendors
- Google Maps business listings

Each listing includes: name, category, location, price range (estimated), description (from their own marketing), cover photo (from their public social media with attribution), and contact info (public).

This is legal and common practice for marketplace platforms (see: Yelp, early Airbnb, early Zillow). Listings are clearly marked as "Unclaimed" and vendors are invited to claim and enrich their profiles.

**Phase B: Direct outreach to 50 high-value vendors (Weeks 3-6)**

Personal outreach via email and Instagram DM. Target vendors who are:
- Active on Instagram with good portfolios
- Known to be LGBTQ+ friendly (for "All Celebrations Welcome" badge)
- Mid-range pricing (matches our primary couple demographic)
- Based in NCR and CALABARZON (our launch regions)

**Outreach Script (Instagram DM):**

> Hi [Vendor Name]! We're building everaftr -- the Philippines' first inclusive wedding planning platform, rooted in Filipino heritage. We've created a listing for you and would love for you to claim it (free, no strings). You'd be among our founding vendors with priority placement. Can I send you a link? [everaftr.ph link]

**Phase C: Vendor Partners as Evangelists (Weeks 4-8)**

Recruit 5-10 wedding planners/coordinators as "founding vendor partners." These professionals:
- Recommend everaftr to their clients (couples)
- Refer other vendors to the platform
- Provide feedback on vendor features
- Get "Featured Planner" status in return

### 5.4 Vendor Value Proposition (MVP)

Why should a vendor join a free, unproven platform?

| Value | Details |
|-------|---------|
| **Free forever listing** | "Your listing is free. Always." (Monetization comes from premium features later, not basic listings.) |
| **Qualified leads** | Couples who inquire through everaftr are actively planning and have shared their budget/date/preferences. Higher quality than random Instagram DMs. |
| **Portfolio showcase** | Professional profile page with photos, services, and reviews (future). |
| **"All Celebrations Welcome" badge** | A differentiation point for inclusive vendors -- signals values to a growing market segment. |
| **Early adopter advantage** | Founding vendors get priority search placement, featured status, and direct product input. |
| **No exclusivity** | Being on everaftr does not prevent being on any other platform. Zero risk. |

### 5.5 Vendor Onboarding Flow (MVP -- Simplified)

```
1. Vendor receives invitation email/DM
       |
       v
2. Clicks "Claim Your Listing" link
       |
       v
3. Creates account (Google OAuth or email)
       |
       v
4. Verifies they own the business (email match or manual verification)
       |
       v
5. Fills in/updates profile form:
   - Business name, description
   - Services offered (checkboxes + free text)
   - Price range
   - Location(s)
   - Portfolio photos (upload up to 10)
   - Contact preferences
   - "All Celebrations Welcome" opt-in
       |
       v
6. Listing goes live (or pending review if flagged)
```

No complex dashboard. No analytics. No booking system. Just a profile they can keep updated.

---

## 6. Timeline and Milestones

### 8-Week Sprint: February 17 -- April 11, 2026

**Pre-Sprint (Feb 10-14): Setup Week**

| Task | Owner | Deliverable |
|------|-------|-------------|
| Finalize MVP scope (this document) | PM | Approved launch plan |
| Set up Supabase project + schema | Backend | Database running with seed data |
| Configure Vercel deployment | Frontend | Auto-deploy from main branch |
| Set up domain (everaftr.ph) | PM/Backend | DNS configured |
| Fix known codebase issues (bride/groom refs, types.ts, constants.ts) | Frontend | Clean, inclusive codebase |
| Configure Tailwind with Woven Heritage tokens | Frontend | tailwind.config.ts with all brand colors |

---

### WEEK 1 (Feb 17-21): Foundation

**Theme: Database, Auth, and Design System**

| Task | Owner | Status |
|------|-------|--------|
| Implement Supabase schema (all tables, RLS policies) | Backend | |
| Seed vendor_categories table (8 categories) | Backend | |
| Implement Supabase Auth (Google OAuth + email) | Backend | |
| Build auth UI: Sign Up, Sign In, Profile setup | Frontend | |
| Implement Woven Heritage design tokens in Tailwind config | Frontend | |
| Build shared layout: Navbar, Footer, Woven Border | Frontend | |
| Begin vendor data research (list 30 vendors in spreadsheet) | PM/Content | |

**Milestone: User can sign up, sign in, and see authenticated layout.**

---

### WEEK 2 (Feb 24-28): Vendor Directory (Core)

**Theme: The Directory is the Product**

| Task | Owner | Status |
|------|-------|--------|
| Build Vendor Directory page (grid/list view, category tabs) | Frontend | |
| Implement search (Supabase full-text search) | Frontend + Backend | |
| Build filter panel (location, price range, category, badges) | Frontend | |
| Build Vendor Card component (photo, name, category, location, badges) | Frontend | |
| Seed 30 vendor records into Supabase | PM/Content | |
| Upload vendor photos to Supabase Storage | PM/Content | |
| Implement "All Celebrations Welcome" badge display | Frontend | |

**Milestone: User can browse, search, and filter vendors.**

---

### WEEK 3 (Mar 3-7): Vendor Profiles + Inquiry

**Theme: Individual Vendor Pages and First Marketplace Interaction**

| Task | Owner | Status |
|------|-------|--------|
| Build Vendor Profile page (hero image, description, portfolio gallery, services, contact) | Frontend | |
| Build Inquiry Form component (date, guest count, budget, message) | Frontend | |
| Implement inquiry submission (write to Supabase + email vendor via Resend) | Backend | |
| Build Favorites functionality (add/remove, favorites list page) | Frontend + Backend | |
| Seed 20 more vendors (total: 50) | PM/Content | |
| Begin direct vendor outreach campaign (50 target vendors) | PM | |

**Milestone: User can view a vendor profile, save to favorites, and send an inquiry.**

---

### WEEK 4 (Mar 10-14): Planning Tools

**Theme: Give Couples a Reason to Come Back**

| Task | Owner | Status |
|------|-------|--------|
| Build Planner Hub page (overview with checklist + budget) | Frontend | |
| Build Checklist component (template items, custom items, check/uncheck, progress bar) | Frontend | |
| Create checklist templates (12-month, 6-month, 3-month) with Filipino-specific items | PM/Content | |
| Implement checklist CRUD with Supabase | Frontend + Backend | |
| Build Budget Tracker component (categories, items, estimated vs actual, total) | Frontend | |
| Implement budget CRUD with Supabase | Frontend + Backend | |
| Create budget category templates with typical PH wedding cost ranges | PM/Content | |

**Milestone: User can use checklist and budget tracker with data persisted to Supabase.**

---

### WEEK 5 (Mar 17-21): Matchmaker Quiz + Homepage Polish

**Theme: The Viral Feature + First Impression**

| Task | Owner | Status |
|------|-------|--------|
| Design and build Matchmaker Quiz (5-7 step wizard) | Frontend | |
| Implement quiz logic (rule-based vendor matching) | Frontend + Backend | |
| Build shareable results card (OG image generation or screenshot-ready design) | Frontend | |
| Implement share functionality (copy link, social share buttons) | Frontend | |
| Polish Homepage (hero, features section, social proof, CTA) | Frontend | |
| Build About page | Frontend | |
| Seed 20 more vendors (total: 70) | PM/Content | |
| Continue vendor outreach (track claim rate) | PM | |

**Milestone: Matchmaker Quiz is playable and generates shareable results.**

---

### WEEK 6 (Mar 24-28): Polish, SEO, and Onboarding

**Theme: Production-Ready Quality**

| Task | Owner | Status |
|------|-------|--------|
| Build couple onboarding flow (post-signup: names, date, ceremony type, budget) | Frontend | |
| Implement checklist auto-population based on onboarding data | Frontend + Backend | |
| SEO implementation (meta tags, OG images, structured data for vendors) | Frontend | |
| Performance optimization (image lazy loading, code splitting) | Frontend | |
| Build vendor claim flow (simple profile edit form) | Frontend + Backend | |
| Implement email notifications for inquiries (Resend) | Backend | |
| Seed remaining vendors (target: 100 total) | PM/Content | |
| Prepare Founding Couples application form | PM | |

**Milestone: Production-quality application with SEO, performance optimization, and vendor claim flow.**

---

### WEEK 7 (Mar 31 - Apr 4): Testing + Soft Launch

**Theme: Founding Couples Go Live**

| Task | Owner | Status |
|------|-------|--------|
| End-to-end testing (all user flows) | QA/All | |
| Cross-browser testing (Chrome, Safari mobile, Facebook in-app browser) | QA | |
| Accessibility audit (screen reader, keyboard nav, contrast) | QA | |
| Inclusive language audit (every string in the UI) | QA | |
| Upgrade Supabase to Pro tier ($25/mo) | Backend | |
| Deploy to production domain | Backend | |
| Invite 50 founding couples + 30 founding vendors | PM | |
| Create feedback collection system (Typeform or Google Forms) | PM | |
| Monitor errors and performance | All | |

**Milestone: Soft launch live with 50 couples and 30 active vendors.**

---

### WEEK 8 (Apr 7-11): Iterate + Public Launch Prep

**Theme: Fix What Broke, Prepare for the World**

| Task | Owner | Status |
|------|-------|--------|
| Address soft launch feedback (bug fixes, UX improvements) | All | |
| Collect founding couple testimonials | PM | |
| Prepare press kit (screenshots, brand assets, press release) | PM | |
| Finalize social media content for launch week | PM/Content | |
| Coordinate influencer posts | PM | |
| Final performance and security review | Backend | |
| PUBLIC LAUNCH (April 11 or April 14 -- choose a Monday for media pickup) | All | |

**Milestone: Public launch with 100+ vendors, founding couple testimonials, and media coverage.**

---

### Parallelization Map

```
WEEK:     1       2       3       4       5       6       7       8
          |       |       |       |       |       |       |       |
FRONTEND: [Auth UI][Directory][Profiles][Planner][Quiz+HP][Polish][Test  ][Fix   ]
          [Layout ][Search  ][Inquiry ][Check  ][Share  ][Onbrd][       ][      ]
          [Design ][Filters ][Favs    ][Budget ][About  ][SEO  ][       ][      ]
          |       |       |       |       |       |       |       |
BACKEND:  [Schema ][FTS    ][Inquiry ][CRUD   ][Quiz   ][Email][Test   ][Fix   ]
          [Auth   ][Seed   ][Favs   ][CRUD   ][Match  ][Claim][Deploy ][      ]
          [RLS    ][       ][       ][       ][       ][Perf ][Supa$25][      ]
          |       |       |       |       |       |       |       |
CONTENT:  [Research][Seed30 ][Seed20 ][Templates][Seed20][Seed30][Launch][PR    ]
          [       ][       ][Outreach][Copy   ][HP Copy][SEOcpy][Social][Media ]
          |       |       |       |       |       |       |       |
PM:       [Plan   ][Review ][Outreach][Review ][Review ][Forms ][Invite][LAUNCH]
          [Setup  ][       ][Vendors ][       ][PR prep][Press ][Fdbck ][      ]
```

---

## 7. Success Metrics for MVP

### 7.1 North Star Metric

**"Vendor inquiries sent per week"**

This single metric captures both sides of the marketplace: couples are finding value (browsing, deciding to reach out) and vendors are receiving value (qualified leads). If inquiries are growing, the platform is working.

### 7.2 KPIs -- What Proves Product-Market Fit

We need to hit these numbers within 90 days of public launch to justify Phase 2 investment:

| Metric | Target (90 Days) | Why It Matters |
|--------|-------------------|----------------|
| **Registered couples** | 500 | Core user base. Proves acquisition channels work. |
| **Weekly active couples** | 150 (30% WAU/MAU) | Proves retention, not just sign-up curiosity. |
| **Vendor listings (total)** | 200 | Supply side health. Enough for couples to find relevant options. |
| **Claimed vendor profiles** | 50 | Vendors actively engaged, not just passively listed. |
| **Vendor inquiries sent** | 300 total / 50+ per week by month 3 | Core marketplace interaction. The money metric. |
| **Checklist items completed** | 2,000+ total | Proves planning tools drive repeat usage. |
| **Matchmaker Quiz completions** | 1,000 | Proves top-of-funnel engagement. |
| **Quiz result shares** | 200 (20% share rate) | Proves viral loop. |
| **NPS score** | 40+ | Measures likelihood to recommend. 40+ is "good" for a new product. |
| **Organic traffic** | 1,000 monthly visits by month 3 | SEO is working, long-term sustainable growth. |

### 7.3 Leading Indicators (Weekly Tracking)

| Indicator | What It Tells Us |
|-----------|-----------------|
| Sign-ups per week | Acquisition momentum |
| Bounce rate on vendor directory | Content relevance and UX quality |
| Vendor profile view rate (views per listing) | Directory engagement |
| Inquiry conversion rate (profile view to inquiry) | Value delivery to couples |
| Checklist return rate (% of couples who come back to update) | Stickiness of planning tools |
| Favorite adds per couple | Engagement depth |
| Time on site (mobile vs. desktop) | Experience quality |
| Vendor claim rate (outreach to claim conversion) | Vendor acquisition efficiency |

### 7.4 Anti-Metrics (What We Do NOT Optimize for in MVP)

| Metric | Why We Ignore It (For Now) |
|--------|---------------------------|
| Revenue | Phase 1 is free. Premature optimization for revenue kills growth. |
| Vendor count above 200 | Quality over quantity. 200 great vendors beats 1,000 stale listings. |
| Feature count | We ship fewer features better, not more features worse. |
| Download count | No native app. Do not waste time on this. |

---

## 8. Risks and Mitigations

### Risk 1: Vendor Supply Problem (Severity: CRITICAL)

**Risk:** Couples visit the directory but find too few vendors in their area/category/budget. They leave and do not return.

**Probability:** High (most marketplace startups fail here)

**Mitigation:**
- Seed 100 listings before public launch using public data (no vendor participation needed)
- Focus geographically: NCR + CALABARZON only at launch. Do not spread thin.
- Focus categorically: Venues + Photo/Video + Catering first. These three categories drive 60%+ of vendor searches.
- Quality over quantity: 20 excellent vendor profiles with real photos are better than 100 bare-bones listings
- Monitor "zero result" searches and fill gaps urgently

### Risk 2: Chicken-and-Egg Marketplace Problem (Severity: HIGH)

**Risk:** Vendors do not join because there are no couples. Couples do not join because there are no vendors.

**Probability:** High

**Mitigation:**
- Bring supply (vendors) first with free listings seeded from public data
- Matchmaker Quiz and Planning Tools provide value even without vendor engagement
- Couples get value from checklists/budgets regardless of vendor count
- Do not wait for vendors to claim listings before inviting couples
- The "Founding Couples" program creates urgency and exclusivity

### Risk 3: Inclusive Positioning Alienates Conservative Market (Severity: MEDIUM)

**Risk:** The Philippines is culturally conservative. Some couples or vendors may be turned off by explicit LGBTQ+ inclusivity.

**Probability:** Medium

**Mitigation:**
- Inclusivity is default, not forced. "Partner 1/Partner 2" is neutral -- it works for ALL couples.
- The "All Celebrations Welcome" badge is opt-in for vendors. No vendor is required to display it.
- Marketing leads with "every couple" and "your celebration, your way" -- aspirational, not confrontational.
- Never position against traditional weddings. Position as "all celebrations, including traditional."
- The civil union legislation provides cultural momentum (Senator Padilla's bill)
- LGBTQ+ community is an underserved, highly engaged segment that will champion the platform organically.

### Risk 4: Supabase Free Tier Limitations (Severity: MEDIUM)

**Risk:** Free tier pauses after 7 days of inactivity. Project hits storage or auth limits.

**Probability:** Medium (during soft launch), Low (during active public launch)

**Mitigation:**
- Upgrade to Supabase Pro ($25/mo) before soft launch (Week 7)
- Budget for this from day one
- Monitor storage usage -- compress vendor images aggressively (WebP, max 500KB per image)
- 50K MAU auth limit is more than sufficient for year one

### Risk 5: Low Engagement / Retention (Severity: HIGH)

**Risk:** Couples sign up, browse vendors, but never come back. Planning tools are not sticky enough.

**Probability:** Medium

**Mitigation:**
- Onboarding flow immediately populates a personalized checklist based on wedding date
- Weekly email digest: "You have 3 tasks due this week" with checklist progress
- Matchmaker Quiz results link back to the directory (re-engagement loop)
- Push notification via PWA for checklist reminders (Phase 2)
- Content marketing (Instagram, TikTok) keeps brand top of mind
- Monthly "Real Celebrations" email with inspiring stories

### Bonus Risk: Competitor Response

**Risk:** Kasal.com, Bride and Breakfast, or an international player (The Knot, which just launched AI features in Feb 2026) enters the Philippine digital planning space aggressively.

**Probability:** Low-Medium (Kasal.com has been static for years; international players have historically ignored PH)

**Mitigation:**
- Speed is our advantage. Ship fast, build community, lock in vendors with relationships.
- Inclusive positioning and Filipino cultural identity are not easily copied by international players.
- Community and brand loyalty are our moats, not technology.
- If Bride and Breakfast builds planning tools, approach them as a partner (we are a planning platform; they are a content platform).

---

## 9. Go-to-Market Positioning

### 9.1 Positioning Statement

**For Filipino couples** who are planning a celebration, **everaftr** is the **wedding planning platform** that **respects every love story and makes planning feel less overwhelming**, **unlike** fragmented Facebook groups, gendered international platforms, or outdated directories. **everaftr** combines a curated vendor directory, smart planning tools, and a culturally rich Filipino identity -- **built for every couple, every celebration, every budget.**

### 9.2 Key Messages for Filipino Couples

**Primary Message: "Your celebration. Your way."**

This is the headline that goes everywhere. It is inclusive without being confrontational. It speaks to personalization (the #1 wedding trend globally) and autonomy.

**Supporting Messages by Audience Segment:**

| Segment | Message | Channel |
|---------|---------|---------|
| All couples | "Finally, wedding planning tools built for the Philippines." | Homepage, all ads |
| Budget-conscious | "Track every peso. Find vendors that fit your budget." | TikTok, Facebook |
| LGBTQ+ couples | "A platform that sees you. Plan your celebration with vendors who welcome all." | Instagram, PR |
| Engaged couples (0-3mo) | "Just engaged? Start here. Your checklist is ready." | Facebook retargeting |
| OFW / Diaspora | "Planning your Philippine wedding from abroad? We make it easy." | Facebook groups for OFW communities |
| Wedding planners | "Recommend vendors your clients will love. All in one place." | Direct outreach, Instagram |

**Brand Messaging Pillars:**

1. **Inclusive by Design** -- "For every couple" is not a tagline. It is how everything is built. Partner 1 and Partner 2. Never bride and groom.
2. **Filipino at Heart** -- Six textile traditions. Filipino vendor community. We know about ninongs, Pre-Cana schedules, and lechon debates.
3. **Modern and Smart** -- Clean design. Fast search. Tools that save you time. (AI comes later, but the foundation is modern from day one.)
4. **Community-Driven** -- Real stories from real couples. Vendors you can trust. A safe space to plan.

### 9.3 Differentiation from Existing Options

| How Couples Plan Today | Problem | everaftr Advantage |
|------------------------|---------|--------------------|
| **Facebook Groups** (Weddings PH, Budget Wedding PH) | Unstructured, hard to search, contradictory advice, no tools | Structured vendor directory + planning tools + searchable |
| **Instagram** | Great for inspiration, impossible to compare vendors, no planning features | Vendor profiles with pricing, filters, comparison, plus integrated planning |
| **Word of Mouth** (family, friends, church networks) | Limited options, biased toward known vendors, no transparency | Broader vendor pool, verified reviews (future), transparent pricing |
| **Kasal.com** | Outdated design, primarily an expo organizer, bride-focused language, no planning tools | Modern UX, inclusive language, planning tools, curated directory |
| **Bride and Breakfast** | Content/blog only, no planning tools, no directory search/filter, bride-focused | Full planning platform, searchable directory, inclusive design |
| **The Knot / WeddingWire** | US-centric, no Filipino vendors, gendered language, irrelevant pricing | Filipino vendors, PHP pricing, Filipino cultural context, inclusive |
| **Spreadsheets / Notes app** | Manual, tedious, no vendor integration, easy to lose | Integrated: browse vendors then add to your budget in one click |

### 9.4 Brand Voice Examples

**Do Say:**
- "Let's plan your celebration."
- "Find vendors who welcome every couple."
- "Your checklist. Your pace."
- "Track your budget down to the last centavo."
- "Six threads. One platform. Every couple."

**Do Not Say:**
- "Find your dream wedding vendors!" (Too generic, too bride-focused in tone)
- "Book the best wedding suppliers NOW!" (Urgency/pressure is off-brand)
- "For brides-to-be" (Excludes partners, grooms, non-binary individuals)
- "Your big day" (Cliche)
- "Say I do to savings!" (Pun cringe)

---

## 10. Budget Considerations

### 10.1 Infrastructure Costs (Monthly)

| Item | MVP Cost | Post-Launch (Month 3+) | Notes |
|------|----------|----------------------|-------|
| Supabase Pro | $25/mo | $25/mo | Upgrade from free before soft launch |
| Vercel (Hobby to Pro) | $0-20/mo | $20/mo | Free for soft launch, Pro when team grows |
| Domain (everaftr.ph) | ~$15/yr | $15/yr | Philippine domain. Also register .com if available. |
| Resend (email) | $0/mo | $0-20/mo | Free tier: 100 emails/day (sufficient for MVP) |
| Plausible Analytics | $0-9/mo | $9/mo | Self-hosted free, cloud $9/mo |
| Cloudflare DNS | $0/mo | $0/mo | Free tier |
| **Total Infrastructure** | **~$30-55/mo** | **~$75-90/mo** | |

### 10.2 One-Time Costs

| Item | Estimated Cost | Notes |
|------|---------------|-------|
| Domain registration (.ph + .com) | $50-80 | One-time |
| Stock photography (if needed) | $0-200 | Use Unsplash/Pexels first. Budget for PH-specific imagery. |
| Legal (Terms of Service, Privacy Policy) | $0-500 | Template-based initially, legal review later |
| Brand assets (additional design if needed) | $0-300 | Design system is already defined |
| **Total One-Time** | **$50-1,080** | |

### 10.3 Marketing Budget (First 3 Months)

| Channel | Monthly Budget | Expected Reach | Notes |
|---------|---------------|----------------|-------|
| Facebook Ads | PHP 20,000 (~$360) | 50K-100K impressions/mo | Targeted at recently engaged, NCR/CALABARZON |
| Instagram Boost | PHP 10,000 (~$180) | 20K-40K impressions/mo | Boost vendor spotlights and quiz content |
| TikTok (organic) | $0 | Variable | Focus on organic content first |
| Micro-influencers (3-5 people) | PHP 15,000-30,000 total (~$270-540) | Variable | One-time per influencer. Trade for features. |
| PR (press release distribution) | $0-100 | Major PH publications | Organic outreach first |
| Wedding expos / events | PHP 5,000-10,000 | Direct vendor/couple contact | Attend, do not exhibit (too expensive) |
| **Total Monthly Marketing** | **~PHP 35,000-45,000 ($630-810)** | | |

### 10.4 People / Time Cost

This is the biggest cost. Assuming a bootstrapped team:

| Role | Hours/Week | Cost Model | Notes |
|------|-----------|-----------|-------|
| Full-stack Developer | 40 | Founder time / co-founder | Core build work |
| Product/PM + Content | 25 | Founder time | Vendor outreach, content, strategy |
| Designer (part-time) | 10 | Freelance or founder | Design system exists; need execution |
| Content creator (social) | 10 | Freelance or intern | TikTok/Reels/social content |

**If hiring externally (Philippines market rates):**

| Role | Monthly Rate (PH) | Duration |
|------|-------------------|----------|
| Senior React Developer | PHP 80,000-120,000 ($1,440-2,160) | 2 months (build sprint) |
| Junior Frontend Dev (assist) | PHP 35,000-50,000 ($630-900) | 2 months |
| Content/Social Media Manager | PHP 25,000-40,000 ($450-720) | Ongoing |
| Virtual Assistant (vendor outreach) | PHP 15,000-20,000 ($270-360) | 2 months |

### 10.5 Total Budget Summary

| Scenario | 3-Month Cost | Notes |
|----------|-------------|-------|
| **Bootstrapped (founders only)** | $500-2,000 | Infrastructure + marketing only. Founder labor is "free." |
| **Lean Team (1 dev + 1 VA)** | $5,000-8,000 | Hire part-time dev and virtual assistant for outreach |
| **Small Team (2 devs + content)** | $10,000-18,000 | Dedicated build team for 8-week sprint |

**Recommendation: Start bootstrapped or with the "lean team" model. A budget of PHP 250,000-450,000 ($4,500-8,000) covers the full 8-week MVP sprint including infrastructure, marketing, and one part-time hire.**

---

## Appendix A: Checklist Template (Filipino Wedding)

The following is the default checklist template for a 12-month planning timeline. These items should be seeded into the checklist_items table when a couple completes onboarding.

**12+ Months Before:**
- Set a budget range
- Discuss celebration vision with your partner
- Research and book venue
- Hire a wedding planner/coordinator (if desired)
- Start guest list draft

**9-12 Months Before:**
- Book photographer and videographer
- Book caterer (if not included with venue)
- Choose wedding party and attendants
- Select ceremony officiant
- Begin Pre-Cana seminar (Catholic) or required counseling
- Research and book entertainment/music

**6-9 Months Before:**
- Shop for wedding attire
- Book hair and makeup artist
- Order invitations
- Plan honeymoon
- Arrange transportation
- Secure wedding insurance (if desired)

**3-6 Months Before:**
- Send invitations (or digital save-the-dates)
- Finalize menu with caterer
- Book florist / venue stylist
- Purchase wedding rings
- Plan rehearsal dinner
- Gather required documents:
  - PSA Birth Certificate
  - Certificate of No Marriage (CENOMAR)
  - Marriage License application
  - Pre-Cana / canonical interview completion
  - Community Tax Certificate (cedula)
  - Barangay clearance (for some municipalities)
  - Parental consent/advice (if applicable based on age)

**1-3 Months Before:**
- Confirm all vendor bookings
- Final dress/attire fitting
- Write vows (if personal vows)
- Create day-of timeline
- Submit marriage license application (at least 10 days before)
- Arrange ninong/ninang confirmations
- Finalize seating arrangement
- Prepare wedding favors

**1-2 Weeks Before:**
- Final headcount to caterer
- Confirm transportation
- Rehearsal
- Prepare emergency kit
- Settle remaining vendor balances
- Brief wedding party on roles and timeline

**Day Of:**
- Relax. You planned well.
- Trust your team.
- Celebrate your love.

---

## Appendix B: Budget Category Template (Filipino Wedding)

Default budget categories with typical Philippine cost ranges:

| Category | Budget % | Typical Range (PHP) |
|----------|---------|-------------------|
| Venue & Reception | 30-40% | 50,000 - 500,000 |
| Catering / Food & Beverage | 25-35% | 40,000 - 300,000 |
| Photo & Video | 10-15% | 30,000 - 150,000 |
| Wedding Attire (both partners) | 5-10% | 10,000 - 100,000 |
| Flowers & Styling | 5-8% | 10,000 - 80,000 |
| Hair & Makeup | 3-5% | 5,000 - 30,000 |
| Entertainment / Music | 3-5% | 10,000 - 50,000 |
| Invitations & Stationery | 2-3% | 5,000 - 30,000 |
| Transportation | 1-3% | 5,000 - 20,000 |
| Wedding Rings | 2-5% | 10,000 - 50,000 |
| Church/Ceremony Fees | 2-5% | 5,000 - 30,000 |
| Coordination / Planner | 5-10% | 15,000 - 80,000 |
| Favors & Giveaways | 1-3% | 5,000 - 30,000 |
| Miscellaneous / Contingency | 5-10% | 10,000 - 50,000 |

---

## Appendix C: Vendor Categories for MVP

| Category | Slug | Icon (Lucide) | Priority |
|----------|------|---------------|----------|
| Venues | venues | MapPin | P0 |
| Photo & Video | photo-video | Camera | P0 |
| Catering | catering | UtensilsCrossed | P1 |
| Planning & Coordination | planning | ClipboardList | P1 |
| Hair & Makeup | hair-makeup | Sparkles | P2 |
| Wedding Attire | attire | Shirt | P2 |
| Flowers & Styling | flowers-styling | Flower2 | P3 |
| Entertainment & Music | entertainment | Music | P3 |

---

## Appendix D: Key Decisions Log

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| MVP includes vendor directory + planning checklist + budget tracker | Yes | These three features cover the core user journey: discover, plan, track | 2026-02-08 |
| No AI in MVP | Deferred to Phase 4 | Rule-based quiz is sufficient. AI needs data and tuning. | 2026-02-08 |
| No native mobile apps | Responsive web + PWA | Faster to ship, one codebase, PH users are mobile-web savvy | 2026-02-08 |
| No community forums in MVP | Deferred to Phase 3 | Empty forums kill engagement. Need critical mass first. | 2026-02-08 |
| Vendor listings seeded from public data | Yes | Solves supply-side cold start without vendor participation | 2026-02-08 |
| Supabase Pro from soft launch | Yes ($25/mo) | Free tier pauses inactive projects. Cannot risk downtime. | 2026-02-08 |
| Google OAuth as primary auth | Yes | Fastest sign-up flow. Most Filipinos have Gmail. | 2026-02-08 |
| NCR + CALABARZON launch focus | Yes | 27.8% of all PH weddings. Highest digital adoption. | 2026-02-08 |
| Matchmaker Quiz as "wow" feature | Yes | Shareable, low-effort, high-virality. Captures couple preferences. | 2026-02-08 |
| Free for all users in Phase 1 | Yes | Growth over revenue. Monetize after proving value. | 2026-02-08 |

---

## Next Steps (Immediate Actions)

1. **Today**: Share this plan with the team. Identify who owns each workstream (Frontend, Backend, PM/Content).
2. **This week**: Register domain (everaftr.ph). Set up Supabase project. Fix existing codebase issues (bride/groom references).
3. **Feb 17**: Sprint begins. Week 1 deliverables are auth + layout + design system implementation.
4. **Ongoing**: Begin vendor research spreadsheet immediately. The directory is only as good as its listings.

---

*Six threads. One platform. Every couple.*

**everaftr** -- where forevr begins
