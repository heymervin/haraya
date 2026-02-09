# RSVP Website + Guest Photographer Feature Specification

> **Product:** haraya Celebration Website with RSVP + Guest Photographer
> **Version:** 1.1
> **Author:** Product Design Team
> **Date:** February 9, 2026
> **Status:** Draft (Research-Validated)
> **Research Inputs:** Competitive Analysis (RSVP-COMPETITIVE-ANALYSIS.md), Couple Interviews (RSVP-COUPLE-INTERVIEWS.md)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Strategic Context](#2-strategic-context)
3. [Complete Feature List](#3-complete-feature-list)
4. [User Flows](#4-user-flows)
5. [Guest Photographer Feature](#5-guest-photographer-feature)
6. [Database Schema Requirements](#6-database-schema-requirements)
7. [Technical Architecture](#7-technical-architecture)
8. [What Makes This Uniquely Filipino](#8-what-makes-this-uniquely-filipino)
9. [Mobile-First Design Considerations](#9-mobile-first-design-considerations)
10. [Privacy & Moderation Plan](#10-privacy--moderation-plan)
11. [MVP vs Future Phases](#11-mvp-vs-future-phases)
12. [Success Metrics](#12-success-metrics)
13. [Competitive Positioning](#13-competitive-positioning)

---

## 1. Executive Summary

### The Opportunity

Filipino couples planning celebrations have no dedicated, modern, free tool to create a shareable wedding website with RSVP management. They currently rely on:

- **Facebook event pages** — cluttered, no structure, no RSVP tracking
- **Google Forms** — functional but ugly, no personality, no photo sharing
- **International platforms** (The Knot, Zola, WithJoy) — gendered, US-centric, paywalled features, no Filipino cultural context
- **Physical invitations + Viber** — expensive to print, no RSVP tracking, scattered communication

### The Product

haraya's Celebration Website is a **free, mobile-first, inclusive** celebration website builder with:

1. **Beautiful RSVP websites** — couples create a shareable page with their story, schedule, entourage, and RSVP form
2. **Smart RSVP management** — track responses, dietary needs, plus-ones, and guest counts in real-time
3. **Guest Photographer** — guests scan a QR code at the event, upload photos from their phones, and all photos appear in a shared album the couple can curate

### Core Differentiators

| vs Competitors | haraya Advantage |
|---------------|------------------|
| The Knot / Zola / WithJoy | **100% free**, Filipino-first, inclusive language, peso-native |
| Google Forms | Beautiful design, photo sharing, real-time dashboard, QR sharing |
| Facebook Events | Structured RSVP data, no noise, privacy control, downloadable guest list |
| Physical invitations | Instant sharing via Viber/Messenger, real-time tracking, zero print cost |

### Founder's Vision

> "Instead of having a photographer, let's use our guests — they know us and they all have mobile phones."

The Guest Photographer feature transforms every wedding guest into a contributor, creating a crowdsourced photo album that captures the celebration from every angle — the candid moments that even professional photographers miss.

---

## 2. Strategic Context

### Why This Feature Wins

**For haraya's business:**
- **Top-of-funnel acquisition** — couples discover haraya through the free website builder, then explore vendors
- **Viral distribution** — every guest who visits the RSVP page sees the haraya brand; 150 guests = 150 impressions
- **Data moat** — celebration dates, guest counts, locations, and budgets feed the vendor matching engine
- **Vendor upsell** — "Your celebration is coming up! Here are vendors in your area" (contextual, not spammy)
- **Network effects** — guests at one celebration become couples planning their own

**For Filipino couples:**
- **Zero cost** — critical for budget-conscious couples (avg Filipino wedding: PHP 350K-500K)
- **Mobile-native** — works perfectly on Android + 4G, which is how 80%+ of Filipino internet users browse
- **Culturally relevant** — understands ninongs/ninangs, entourage hierarchy, Filipino ceremony types
- **Viber-ready** — shareable via the messaging app Filipinos actually use

### Market Sizing

- **370,000-415,000** weddings per year in the Philippines
- **Average guest count:** 150-300 for Filipino celebrations (larger than Western weddings)
- **Smartphone penetration:** 75%+ among ages 18-45
- **If 5% of couples use haraya for RSVP:** 18,500-20,750 celebration websites/year
- **At avg 200 guests each:** 3.7M-4.15M guest pageviews/year (brand impressions)

---

## 2.5 Research Synthesis — Key Findings

### From Competitive Analysis (RSVP-COMPETITIVE-ANALYSIS.md)

**RSVP Landscape:**
- **Joy (WithJoy)** is the closest competitor — has household RSVP grouping, multi-event support, AND guest photo sharing. However: requires app download for photo uploads, no Filipino language, no GCash/Maya, no ceremony-type awareness.
- **The Knot** is the most complained-about: "guest not found" RSVP errors, ad-supported model puts vendor ads on couple's personal page, dated design. Still gendered ("bride and groom").
- **Zola** has the best design but is registry-focused and deeply US-centric. Registry model is irrelevant for Filipino cash-gift culture.
- **RSVPify** caps free tier at 100 guests; **Say I Do** caps at 80. Filipino celebrations average 150-300 guests. These caps make both unusable for the Filipino market.
- **No platform** combines RSVP website + guest photo sharing + Filipino cultural features.

**Guest Photo Landscape:**
- **GuestCam**, **GUESTPIX**, **Wedibox** lead the QR-code-to-upload category ($49-$177+). All are standalone tools with no RSVP integration.
- **WedShoots** (free, from WeddingWire) is the closest free option but has basic features.
- AI face recognition is emerging (Honcho, Memzo, Samaro) but priced for the US market.
- The "disposable camera" trend (POV Camera, Lense) shows appetite for constrained, playful photo experiences.
- **Zero photo-sharing platforms** have Filipino features.

**Filipino Market Gap (per EventNest.ph):**
- GCash/Maya payment integration for monetary gifts
- QR Ph (national standard) support
- English + Filipino language toggle
- Philippine Data Privacy Act (RA 10173) compliance
- Smart/Globe SMS sender IDs for reminders
- Grab/JoyRide deep links for venue navigation

### From Couple Interviews (RSVP-COUPLE-INTERVIEWS.md)

**Interview 1: Marco & Pia** (Catholic, 200 guests, PHP 800K budget)
- Current RSVP: Google Sheet + Viber messages + mom's texts. "Managing 200 RSVPs through word-of-mouth is chaos."
- Pain: 20 extra guests at PHP 650/head = PHP 13,000 wasted because RSVPs are unreliable
- Key quote: "Our wedding budget is PHP 800K — I'm not sending guests a Google Form."
- Wants: Ninong/Ninang section, entourage list, GCash/Maya, Waze integration, automated reminders
- Guest photos: "Those candid moments are sometimes the best photos from a wedding"
- Would pay: PHP 1,500-2,000 for premium

**Interview 2: Sam & Alex** (LGBTQ+ civil, 80 guests, PHP 400K budget)
- Non-negotiable: inclusive defaults. "I don't want to go through every section and change 'bride' to something else."
- Pain: every international platform assumes heteronormativity and American culture
- Key quote: "The best platforms are invisible. You don't notice the platform — you notice the couple's story."
- Wants: custom event naming, privacy controls, bulk photo upload, customizable design, video support
- Guest photos: fills gap after photographer leaves; covers entire evening
- Would pay: PHP 999-1,499 for premium
- Growth insight: "If haraya becomes the answer to 'anong platform ginamit niyo?' — game over."

### Combined Priority Matrix (Research-Validated)

| Priority | Feature | Validated By |
|----------|---------|-------------|
| **P0** | Mobile-first RSVP form (name, headcount, dietary) | Both couples, competitive gap |
| **P0** | Real-time RSVP dashboard | Both couples ("saves weeks of Viber tag") |
| **P0** | Beautiful design (not Google Form quality) | Both couples, Sam's "canvas not painting" insight |
| **P0** | Inclusive defaults ("You" / "Your Partner") | Sam & Alex non-negotiable; haraya core value |
| **P0** | GCash/Maya/bank transfer gift section | Both couples; competitive analysis confirms zero platforms do this |
| **P0** | Viber-optimized sharing (OG tags) | Both couples; primary distribution channel |
| **P0** | QR-code guest photo upload (no login) | Both couples; competitive gap vs all RSVP platforms |
| **P0** | No guest count cap on free tier | Competitive gap (RSVPify: 100, Say I Do: 80, Filipino avg: 200) |
| **P1** | Ninong/Ninang & entourage section | Marco & Pia; unique to Filipino celebrations |
| **P1** | Plus-one management | Marco ("sensitive in Filipino weddings") |
| **P1** | Post-event photo moderation | Both couples ("Tito Jun problem" is universal) |
| **P1** | CSV export for caterer headcount | Marco (caterer needs final count) |
| **P1** | Custom event naming | Sam & Alex ("The Promise" / "The Celebration" / "The After") |
| **P1** | Filipino dietary options (halal, no pork) | Sam & Alex's multi-faith guest list |
| **P1** | Filipino dress code options | Pia (Barong Tagalog, Filipiniana) |
| **P1** | Full-resolution photo upload | Both couples; Alex as photographer emphasizes quality |
| **P2** | Live photo wall for venue projector | Marco ("THAT would be SO cool") |
| **P2** | Video upload (15-30 sec) | Alex's creative vision |
| **P2** | Love story timeline | Both couples; "Filipinos are hopeless romantics" |
| **P2** | Song request for DJ | Sam & Alex's non-traditional party |
| **P2** | Grab/JoyRide venue link | Competitive analysis (EventNest.ph); Pia's Tagaytay venue |

---

## 3. Complete Feature List

### 3.1 Free Tier (Launch)

#### Website Builder
| Feature | Description | Priority |
|---------|-------------|----------|
| Couple details | Partner names, celebration date, ceremony type | P0 |
| Cover photo | Upload or paste URL for hero image | P0 |
| Color themes | 4 themes: Classic Ivory, Modern Blush, Garden Green, Midnight | P0 |
| Our Story section | Free-text story of how the couple met | P0 |
| Event schedule | Multiple events with time, name, location (ceremony, reception, after-party) | P0 |
| Venue with map | Venue name + location with link to Google Maps / Waze / Grab | P0 |
| Custom event naming | Couples can name events freely (not forced "ceremony"/"reception") | P1 |
| Entourage / Wedding Party | Names + roles (Ninang, Ninong, Best Man, Maid of Honor, etc.) | P0 |
| Photo gallery | Upload up to 20 pre-wedding photos | P0 |
| Couple hashtag | Custom hashtag displayed on the site | P0 |
| Countdown timer | Live countdown to the celebration date | P0 |
| RSVP form | Name, attendance (accept/decline), guest count (1-5+), dietary restrictions, message, phone (optional) | P0 |
| Plus-one management | Couple controls who gets plus-one invitations vs individual-only | P1 |
| Gift information section | Tasteful section for GCash QR, Maya number, bank transfer details ("Your presence is the greatest gift...") | P0 |
| Dress code | Filipino-specific options: Barong Tagalog, Filipiniana, Semi-Formal, Smart Casual, Formal | P1 |
| Shareable URL | Unique slug: `haraya.ph/c/marco-and-pia` | P0 |
| QR code | Auto-generated QR code for the website URL (printable for invitations) | P0 |
| Viber/Messenger sharing | Deep link sharing to Viber and Facebook Messenger | P0 |
| Mobile-optimized preview | Real-time preview of guest-facing site on mobile viewport | P0 |
| "Made with haraya" footer | Brand attribution on every guest-facing site | P0 |

#### RSVP Management Dashboard
| Feature | Description | Priority |
|---------|-------------|----------|
| RSVP summary | Total invited, attending, declined, pending counts + total guest headcount | P0 |
| Guest list view | Searchable, filterable list of all RSVP responses | P0 |
| Dietary summary | Aggregate count of dietary restrictions (Halal/No Pork, Vegetarian, Vegan, Seafood Allergy) | P0 |
| Export to CSV | Download guest list as spreadsheet (for caterer, coordinator) | P1 |
| Real-time updates | New RSVPs appear instantly (Supabase Realtime) | P1 |
| RSVP reminder | Copy a pre-written Viber/SMS message to nudge pending guests | P1 |
| Guest list sync | Reconcile RSVP responses with main Guest List feature | P2 |

#### Guest Photographer
| Feature | Description | Priority |
|---------|-------------|----------|
| QR code for photo upload | Separate QR code that links directly to the upload page | P0 |
| No-login photo upload | Guests upload without creating an account | P0 |
| Camera + gallery access | Upload from camera (take photo) or phone gallery (existing photos) | P0 |
| Photo album view | All uploaded photos in a masonry grid, newest first | P0 |
| Couple curation | Couple can approve/hide/delete photos | P0 |
| Download all | Couple can download all approved photos as a ZIP | P1 |
| Guest name tagging | Optional: guest enters their name when uploading | P1 |
| Photo count display | Show total photos uploaded on the celebration website | P1 |

### 3.2 Future Premium Tier (Post-Launch)

| Feature | Description | Tier |
|---------|-------------|------|
| Custom domain | Use your own domain (e.g., `marcoandpia.com`) | Premium |
| Remove haraya branding | No "Made with haraya" footer | Premium |
| Additional themes | 8+ premium color themes and layouts | Premium |
| Video background | Video hero instead of static image | Premium |
| Unlimited gallery photos | More than 20 pre-wedding photos | Premium |
| RSVP with meal selection | Guests choose their meal (lechon, seafood, etc.) | Premium |
| Table seating assignment | Assign guests to tables, generate seating chart | Premium |
| Guest book / message wall | Digital message wall for well-wishes | Premium |
| Music player | Background music on the website | Premium |
| Password protection | Require password to view website | Premium |
| AI photo enhancement | Auto-enhance guest-uploaded photos | Premium |
| Photo slideshow | Auto-generated slideshow from guest photos | Premium |
| Analytics | View count, unique visitors, time on page | Premium |
| Multiple events | Separate pages for engagement party, bridal shower, etc. | Premium |
| Gift registry integration | Link to gift registries or GCash/Maya for cash gifts | Premium |
| Song request feature | Guests submit song requests for DJ/playlist before event | Premium |
| Love story timeline | Interactive relationship milestone timeline with photos | Premium |
| Live photo wall | Guest photos appear on venue TV/projector in real-time | Premium |
| Invitation design | Matching digital invitation that links to the website | Premium |
| NFC tap support | NFC tags at venue tables that open photo upload page | Premium |
| Livestream integration | Embed livestream for overseas relatives (OFW-friendly) | Premium |

### 3.3 Feature Comparison vs Competitors

Based on competitive analysis (see RSVP-COMPETITIVE-ANALYSIS.md for full details):

| Feature | haraya (Free) | Joy (Free) | The Knot (Free) | Zola (Free+) | Google Forms |
|---------|:---:|:---:|:---:|:---:|:---:|
| RSVP tracking | Yes | Yes (best-in-class) | Yes (buggy*) | Yes | Manual |
| Household RSVP grouping | Planned | Yes | Basic | Yes | No |
| Guest photo upload | **Yes (browser)** | Yes (app req'd) | No | No | No |
| Filipino ceremony types | **Yes** | No | No | No | N/A |
| Viber sharing | **Yes** | No | No | No | Yes |
| QR code generation | **Yes** | Yes | Yes | Yes | No |
| Custom URL | Yes | Yes | Yes | Yes ($14.95/yr) | No |
| Guest count (free tier) | **Unlimited** | Unlimited | Unlimited | Unlimited | Unlimited |
| Mobile-first design | **Yes** | Partial | Partial | Partial | Yes |
| Inclusive language | **Yes (default)** | Partial** | No*** | Partial** | N/A |
| Entourage section | **Yes (Filipino roles)** | No | No | No | No |
| GCash/Maya gifts | **Yes** | No | No | No | No |
| Ninong/Ninang tracker | **Yes** | No | No | No | No |
| Grab/Waze integration | **Yes** | No | No | No | No |
| Peso formatting | **Yes** | No | No | No | N/A |
| Ads on couple's page | **No** | No | Yes (cannot disable) | No | No |
| Live slideshow | Planned | Yes | No | No | No |

*The Knot RSVP is the #1 complained-about feature ("guest not found" errors, wrong page redirects)
**Joy/Zola allow label changes but defaults are still gendered
***The Knot uses "bride/groom" throughout; cannot fully change

---

## 4. User Flows

### 4.1 Couple Creates Celebration Website

```
┌─────────────────────────────────────────────────────────┐
│  COUPLE CREATES WEBSITE                                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Couple signs up / logs in to haraya                  │
│     └─ Supabase Auth (email/password or Google)          │
│                                                          │
│  2. Navigate to "Your Celebration Website"               │
│     └─ /website (new route)                              │
│                                                          │
│  3. Edit Mode: Fill in details                           │
│     ├─ Partner names (auto-filled from profile)          │
│     ├─ Celebration date                                  │
│     ├─ Ceremony type                                     │
│     ├─ Venue name + location                             │
│     ├─ Our Story (free text)                             │
│     ├─ Cover photo (upload or URL)                       │
│     ├─ Color theme (4 options)                           │
│     ├─ Event schedule (add multiple events)              │
│     ├─ Entourage / wedding party (name + role)           │
│     ├─ Photo gallery (upload up to 20)                   │
│     ├─ Couple hashtag                                    │
│     ├─ RSVP toggle (on/off)                              │
│     └─ Guest Photographer toggle (on/off)                │
│                                                          │
│  4. Preview Mode: See guest-facing website               │
│     └─ Toggle between Edit ↔ Preview                     │
│                                                          │
│  5. Publish & Share                                      │
│     ├─ Auto-generated URL: haraya.ph/c/{slug}            │
│     ├─ QR code (downloadable PNG for invitations)        │
│     ├─ Share buttons: Copy Link, Viber, Messenger, SMS   │
│     └─ "RSVP" tab on couple dashboard appears            │
│                                                          │
│  6. Manage RSVPs                                         │
│     ├─ View all responses in dashboard                   │
│     ├─ Filter: attending / declined / pending            │
│     ├─ See dietary restrictions                          │
│     ├─ Export to CSV                                     │
│     └─ Send reminders via Viber (copy message)           │
│                                                          │
│  7. Manage Guest Photos (post-event)                     │
│     ├─ View all uploaded photos                          │
│     ├─ Approve / hide / delete individual photos         │
│     ├─ Download all approved photos                      │
│     └─ Share album link                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Guest Visits RSVP Website

```
┌─────────────────────────────────────────────────────────┐
│  GUEST RSVP FLOW                                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Guest receives link                                  │
│     ├─ Via Viber message from couple                     │
│     ├─ Via QR code on physical invitation                │
│     └─ Via Messenger / SMS                               │
│                                                          │
│  2. Guest opens link: haraya.ph/c/marco-and-pia          │
│     └─ NO login required                                 │
│                                                          │
│  3. Guest sees celebration website                       │
│     ├─ Hero section: couple names, date, countdown       │
│     ├─ Our Story                                         │
│     ├─ Schedule of Events                                │
│     ├─ Wedding Party / Entourage                         │
│     ├─ Photo Gallery                                     │
│     ├─ RSVP Form                                         │
│     └─ Hashtag + Footer                                  │
│                                                          │
│  4. Guest fills RSVP form                                │
│     ├─ Full name (required)                              │
│     ├─ Attendance: "Joyfully Accept" / "Respectfully     │
│     │  Decline" (required)                               │
│     ├─ Number of guests (if accepting, includes          │
│     │  themselves + plus-ones): 1, 2, 3, 4, 5+           │
│     ├─ Dietary restrictions (optional checkboxes:        │
│     │  Halal/No Pork, Vegetarian, Vegan,                 │
│     │  Seafood Allergy, Other Allergies)                  │
│     ├─ Message to the couple (optional)                  │
│     └─ Phone number (optional, for day-of coordination)  │
│                                                          │
│  5. Guest submits RSVP                                   │
│     ├─ Confirmation screen: "Maraming salamat!"          │
│     ├─ Option to add to calendar (ICS file)              │
│     ├─ See venue location on map                         │
│     └─ Share the website with other guests               │
│                                                          │
│  6. Post-RSVP: Guest can edit their response             │
│     └─ Returning guests see their previous response      │
│         (matched by name or browser cookie)              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4.3 Guest Photo Upload Flow (Day-of-Event)

```
┌─────────────────────────────────────────────────────────┐
│  GUEST PHOTOGRAPHER FLOW                                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. At the celebration, guest scans QR code              │
│     ├─ QR displayed on table cards / standees / screen   │
│     ├─ QR links to: haraya.ph/c/marco-and-pia/photos    │
│     └─ Also accessible from the celebration website      │
│         via "Share Your Photos" button                   │
│                                                          │
│  2. Guest lands on photo upload page (mobile-optimized)  │
│     ├─ NO login / NO account required                    │
│     ├─ Simple, clean UI with couple's theme colors       │
│     ├─ Shows couple hashtag: "#MarcoAndPia2026"          │
│     └─ Two big buttons:                                  │
│         ├─ "Take a Photo" (opens camera)                 │
│         └─ "Choose from Gallery" (opens photo picker)    │
│                                                          │
│  3. Guest selects/takes photo(s)                         │
│     ├─ Multi-select supported (up to 10 per upload)      │
│     ├─ Client-side compression to reduce upload size     │
│     │  (target: <2MB per photo)                          │
│     └─ EXIF data stripped (privacy)                      │
│                                                          │
│  4. Guest adds optional details                          │
│     ├─ Name (optional, pre-filled if previously entered) │
│     └─ Caption (optional, short text)                    │
│                                                          │
│  5. Upload begins                                        │
│     ├─ Progress indicator per photo                      │
│     ├─ Optimized for 4G: chunked upload if >1MB          │
│     ├─ Retry on failure (common on spotty venue wifi)    │
│     └─ Success: "Photo uploaded! Salamat!"               │
│                                                          │
│  6. Guest can:                                           │
│     ├─ Upload more photos                                │
│     ├─ View the shared album (all approved photos)       │
│     └─ Share the upload link with other guests           │
│                                                          │
│  7. Behind the scenes:                                   │
│     ├─ Photo stored in Supabase Storage                  │
│     │  (bucket: website-guest-photos)                    │
│     ├─ Record created in guest_photos table              │
│     ├─ Status: "pending" (if moderation on) or           │
│     │  "approved" (if auto-approve enabled)              │
│     └─ Couple gets real-time notification in dashboard   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4.4 Couple Curates Photo Album (Post-Event)

```
┌─────────────────────────────────────────────────────────┐
│  COUPLE PHOTO CURATION FLOW                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Couple opens haraya dashboard → Guest Photos tab     │
│                                                          │
│  2. Dashboard shows:                                     │
│     ├─ Total photos uploaded: 247                        │
│     ├─ Approved: 230 | Pending: 12 | Hidden: 5          │
│     └─ Contributors: 89 guests                          │
│                                                          │
│  3. Photo grid with moderation controls                  │
│     ├─ Approve (checkmark) — make visible in album       │
│     ├─ Hide (eye-slash) — remove from album, keep file   │
│     ├─ Delete (trash) — permanently remove               │
│     └─ Flag (flag) — mark as inappropriate               │
│                                                          │
│  4. Download options                                     │
│     ├─ Download all approved (ZIP)                       │
│     ├─ Download selected (multi-select)                  │
│     └─ Full resolution originals included                │
│                                                          │
│  5. Album settings                                       │
│     ├─ Toggle: Auto-approve new uploads (on/off)         │
│     ├─ Toggle: Allow guests to view album (on/off)       │
│     ├─ Toggle: Accept new uploads (on/off)               │
│     └─ Set album cover photo                             │
│                                                          │
│  6. Share album                                          │
│     ├─ Link: haraya.ph/c/marco-and-pia/album             │
│     ├─ QR code for the album                             │
│     └─ Share via Viber / Messenger                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Guest Photographer Feature — Deep Dive

### 5.1 Problem Statement

Filipino celebrations are inherently communal. A typical celebration has 150-300 guests, most carrying smartphones. Professional photographers capture formal moments, but they miss:

- The lola wiping a tear during vows
- The college friends' group selfie at the photobooth
- The ninong's speech from the crowd's perspective
- The cousins doing TikTok dances at the reception
- The lechon before it was carved

These candid, personal moments are exactly what couples treasure most.

### 5.2 Solution: Guests as Photographers

**Every guest becomes a contributor.** With no app to download and no account to create, guests scan a QR code and upload photos directly from their phone's camera or gallery.

### 5.3 Technical Design

#### Upload Page (Guest-Facing)

**URL:** `haraya.ph/c/{slug}/photos`

**UI Components:**
- Header: couple hashtag + names
- Two buttons: "Take a Photo" / "Choose from Gallery"
- Upload progress indicator
- Success confirmation
- Link to view shared album
- "Upload More" button

**Technical Requirements:**
- `<input type="file" accept="image/*" capture="environment">` for camera
- `<input type="file" accept="image/*" multiple>` for gallery (max 10)
- Client-side image compression using browser Canvas API or a library like `browser-image-compression`
  - Target max dimension: 2048px (long edge)
  - Target max file size: 2MB
  - Quality: 0.8 JPEG
- EXIF stripping (GPS coordinates, device info) for privacy
- Upload via Supabase Storage direct upload (`supabase.storage.from('guest-photos').upload()`)
- Retry logic with exponential backoff (critical for 4G connections)
- Offline queue: if connection drops, queue the upload and retry when reconnected
- Progress tracking via XMLHttpRequest or fetch with ReadableStream

#### Photo Album (Shared View)

**URL:** `haraya.ph/c/{slug}/album`

**UI Components:**
- Masonry grid layout (responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop)
- Lazy loading with Intersection Observer (critical for 4G)
- Thumbnail generation (server-side via Supabase Edge Function or client-side)
- Lightbox view for full-size photos
- Photo count badge
- Contributor names (if provided)
- Sort: newest first (default), oldest first

**Technical Requirements:**
- Supabase Storage signed URLs for thumbnails
- Image CDN with responsive sizing (Supabase Image Transformation or external CDN)
- Pagination: load 20 photos at a time, infinite scroll
- Cache-Control headers for thumbnails (long TTL since photos don't change)

#### Moderation Dashboard (Couple-Facing)

**URL:** `/website/photos` (within couple's haraya dashboard)

**Features:**
- Grid view of all uploaded photos with status badges (approved/pending/hidden)
- Bulk actions: approve all, hide selected, delete selected
- Per-photo actions: approve, hide, delete, set as album cover
- Moderation mode toggle: auto-approve (default) vs manual review
- Real-time photo count (Supabase Realtime subscription)
- Download ZIP of all approved photos (server-side ZIP generation via Edge Function)

### 5.4 Storage Architecture

```
Supabase Storage Bucket: website-guest-photos
├── {website_id}/
│   ├── originals/
│   │   ├── {photo_id}.jpg     (full resolution, compressed client-side)
│   │   └── ...
│   ├── thumbnails/
│   │   ├── {photo_id}_400.jpg  (400px wide, generated server-side)
│   │   └── ...
│   └── album-cover.jpg         (selected by couple)
```

**Storage limits (free tier):**
- Max photos per celebration: 500
- Max file size per photo: 5MB (after client-side compression, typically <2MB)
- Max total storage per celebration: 2GB
- Retention: photos available for 1 year after celebration date

**Premium tier unlocks:**
- Unlimited photos
- 10GB storage
- Permanent retention
- Video uploads (up to 30 seconds)

### 5.5 QR Code Strategy

**Two QR codes per celebration:**

1. **Website QR** — links to `haraya.ph/c/{slug}`
   - For physical invitations
   - Guests scan to view the website and RSVP

2. **Photo Upload QR** — links to `haraya.ph/c/{slug}/photos`
   - For the day of the event
   - Displayed on table cards, standees, welcome screen
   - Larger format, easy to scan in dim reception lighting

**QR Generation:**
- Client-side using a library like `qrcode` or `qr-code-styling`
- Downloadable as PNG (high-res for printing)
- Customizable with couple's theme colors and hashtag
- Include haraya logo in center (optional branding)

**Physical placement suggestions (shown in UI):**
- Table tent cards at each table
- Welcome sign at entrance
- On the reception screen/projector
- On the physical invitation insert card
- Shared in the Viber group chat

---

## 6. Database Schema Requirements

### 6.1 New Tables Needed

Building on the existing schema in `supabase/migrations/20260209000000_initial_schema.sql`, we need the following new tables:

#### `celebration_websites`
The core table for couple celebration websites.

```sql
CREATE TABLE celebration_websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,

  -- Couple details
  partner1_name TEXT,
  partner2_name TEXT,
  celebration_date DATE,
  ceremony_type ceremony_type,

  -- Venue
  venue_name TEXT,
  venue_location TEXT,
  venue_map_url TEXT,

  -- Content
  our_story TEXT,
  cover_photo_url TEXT,
  color_theme TEXT NOT NULL DEFAULT 'classic-ivory',
  hashtag TEXT,

  -- Gift information (digital angpao)
  gift_section_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  gift_intro_text TEXT DEFAULT 'Your presence is the greatest gift. For those who wish to give, monetary gifts are lovingly appreciated.',
  gcash_qr_url TEXT,
  gcash_number TEXT,
  maya_qr_url TEXT,
  maya_number TEXT,
  bank_name TEXT,
  bank_account_name TEXT,
  bank_account_number TEXT,

  -- Dress code
  dress_code TEXT,

  -- Feature toggles
  rsvp_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  guest_photos_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  guest_photos_auto_approve BOOLEAN NOT NULL DEFAULT TRUE,
  guest_album_public BOOLEAN NOT NULL DEFAULT TRUE,
  accepting_uploads BOOLEAN NOT NULL DEFAULT TRUE,

  -- Status
  is_published BOOLEAN NOT NULL DEFAULT FALSE,

  -- Limits
  max_gallery_photos INTEGER NOT NULL DEFAULT 20,
  max_guest_photos INTEGER NOT NULL DEFAULT 500,

  -- Metadata
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT one_website_per_couple UNIQUE(couple_id)
);
```

#### `website_schedule_events`
Schedule/timeline events for the celebration.

```sql
CREATE TABLE website_schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,
  event_time TIME,
  event_name TEXT NOT NULL,
  event_location TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### `website_entourage`
Wedding party / entourage members.

```sql
CREATE TABLE website_entourage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  role TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### `website_gallery`
Pre-wedding photos uploaded by the couple.

```sql
CREATE TABLE website_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### `website_rsvps`
RSVP responses from guests (unauthenticated).

```sql
CREATE TYPE rsvp_response AS ENUM ('attending', 'declined');

CREATE TABLE website_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,

  -- Guest info
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  guest_count INTEGER NOT NULL DEFAULT 1,

  -- Response
  response rsvp_response NOT NULL,
  dietary_restrictions TEXT[] DEFAULT '{}',
  message TEXT,

  -- Tracking
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);
```

#### `website_guest_photos`
Photos uploaded by guests at the event.

```sql
CREATE TYPE photo_status AS ENUM ('pending', 'approved', 'hidden', 'deleted');

CREATE TABLE website_guest_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,

  -- Photo
  original_url TEXT NOT NULL,
  thumbnail_url TEXT,

  -- Uploader info (anonymous)
  uploader_name TEXT,
  caption TEXT,

  -- Moderation
  status photo_status NOT NULL DEFAULT 'approved',
  is_album_cover BOOLEAN NOT NULL DEFAULT FALSE,

  -- Metadata
  file_size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 6.2 New Indexes

```sql
-- Celebration websites
CREATE UNIQUE INDEX idx_websites_slug ON celebration_websites(slug);
CREATE INDEX idx_websites_couple ON celebration_websites(couple_id);
CREATE INDEX idx_websites_published ON celebration_websites(is_published) WHERE is_published = TRUE;

-- Schedule events
CREATE INDEX idx_schedule_website ON website_schedule_events(website_id);

-- Entourage
CREATE INDEX idx_entourage_website ON website_entourage(website_id);

-- Gallery
CREATE INDEX idx_gallery_website ON website_gallery(website_id);

-- RSVPs
CREATE INDEX idx_rsvps_website ON website_rsvps(website_id);
CREATE INDEX idx_rsvps_response ON website_rsvps(website_id, response);

-- Guest photos
CREATE INDEX idx_guest_photos_website ON website_guest_photos(website_id);
CREATE INDEX idx_guest_photos_status ON website_guest_photos(website_id, status);
CREATE INDEX idx_guest_photos_uploaded ON website_guest_photos(website_id, uploaded_at DESC);
```

### 6.3 RLS Policies

```sql
-- celebration_websites
ALTER TABLE celebration_websites ENABLE ROW LEVEL SECURITY;

-- Public can view published websites (by slug)
CREATE POLICY "websites_select_published"
  ON celebration_websites FOR SELECT
  USING (is_published = TRUE);

-- Couple can view/edit their own website
CREATE POLICY "websites_select_own"
  ON celebration_websites FOR SELECT
  USING (auth.uid() = couple_id);

CREATE POLICY "websites_insert_own"
  ON celebration_websites FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "websites_update_own"
  ON celebration_websites FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "websites_delete_own"
  ON celebration_websites FOR DELETE
  USING (auth.uid() = couple_id);


-- website_rsvps — guests can insert without auth
ALTER TABLE website_rsvps ENABLE ROW LEVEL SECURITY;

-- Anyone can insert RSVPs (guests are unauthenticated)
CREATE POLICY "rsvps_insert_public"
  ON website_rsvps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND is_published = TRUE
      AND rsvp_enabled = TRUE
    )
  );

-- Couple can read RSVPs for their website
CREATE POLICY "rsvps_select_couple"
  ON website_rsvps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND couple_id = auth.uid()
    )
  );


-- website_guest_photos — guests can upload without auth
ALTER TABLE website_guest_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can insert photos (guests are unauthenticated)
CREATE POLICY "guest_photos_insert_public"
  ON website_guest_photos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND is_published = TRUE
      AND guest_photos_enabled = TRUE
      AND accepting_uploads = TRUE
    )
  );

-- Public can view approved photos (for the shared album)
CREATE POLICY "guest_photos_select_approved"
  ON website_guest_photos FOR SELECT
  USING (
    status = 'approved'
    AND EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND guest_album_public = TRUE
    )
  );

-- Couple can view all photos for their website
CREATE POLICY "guest_photos_select_couple"
  ON website_guest_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND couple_id = auth.uid()
    )
  );

-- Couple can update photo status (approve/hide/delete)
CREATE POLICY "guest_photos_update_couple"
  ON website_guest_photos FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND couple_id = auth.uid()
    )
  );

-- Couple can delete photos
CREATE POLICY "guest_photos_delete_couple"
  ON website_guest_photos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND couple_id = auth.uid()
    )
  );
```

### 6.4 Supabase Storage Policies

```sql
-- Bucket: website-gallery (couple's pre-wedding photos)
-- Couple can upload to their own website folder
-- Public can read (for the published website)

-- Bucket: website-guest-photos (guest-uploaded photos)
-- Anyone can upload (no auth required — guests are anonymous)
-- Public can read approved photos
-- Couple can manage (delete) their website's photos
```

### 6.5 Database Functions

```sql
-- Auto-generate slug from partner names
CREATE OR REPLACE FUNCTION generate_website_slug(p1 TEXT, p2 TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  base_slug := lower(regexp_replace(p1, '[^a-zA-Z0-9]', '', 'g'))
    || '-and-'
    || lower(regexp_replace(p2, '[^a-zA-Z0-9]', '', 'g'));

  final_slug := base_slug;

  WHILE EXISTS (SELECT 1 FROM celebration_websites WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- RSVP summary view for couple dashboard
CREATE OR REPLACE VIEW website_rsvp_summary AS
SELECT
  w.id AS website_id,
  w.couple_id,
  COUNT(r.id) AS total_responses,
  COUNT(r.id) FILTER (WHERE r.response = 'attending') AS attending_count,
  COUNT(r.id) FILTER (WHERE r.response = 'declined') AS declined_count,
  SUM(r.guest_count) FILTER (WHERE r.response = 'attending') AS total_guests_attending,
  COUNT(DISTINCT r.id) FILTER (WHERE r.dietary_restrictions != '{}') AS guests_with_dietary
FROM celebration_websites w
LEFT JOIN website_rsvps r ON r.website_id = w.id
GROUP BY w.id, w.couple_id;

-- Guest photo stats
CREATE OR REPLACE VIEW website_photo_stats AS
SELECT
  w.id AS website_id,
  w.couple_id,
  COUNT(p.id) AS total_photos,
  COUNT(p.id) FILTER (WHERE p.status = 'approved') AS approved_count,
  COUNT(p.id) FILTER (WHERE p.status = 'pending') AS pending_count,
  COUNT(p.id) FILTER (WHERE p.status = 'hidden') AS hidden_count,
  COUNT(DISTINCT p.uploader_name) FILTER (WHERE p.uploader_name IS NOT NULL) AS contributor_count
FROM celebration_websites w
LEFT JOIN website_guest_photos p ON p.website_id = w.id
GROUP BY w.id, w.couple_id;
```

### 6.6 Integration with Existing Schema

The new tables integrate with the existing schema as follows:

- `celebration_websites.couple_id` → `profiles.id` (existing)
- `celebration_websites.ceremony_type` → uses existing `ceremony_type` enum
- The existing `guest_list` table remains separate — it's for the couple's private guest management. `website_rsvps` captures public RSVP responses. Couples can reconcile the two in the dashboard.
- The existing `rsvp_status` enum (`pending`, `attending`, `declined`, `maybe`) on the `guest_list` table can be updated based on `website_rsvps` data (manual or automatic sync).

---

## 7. Technical Architecture

### 7.1 System Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│  GUEST BROWSER (Android/Chrome, 4G connection)                │
│  ├── Celebration Website (SSR-friendly static page)           │
│  ├── RSVP Form (no auth, direct insert)                       │
│  └── Photo Upload (no auth, Supabase Storage direct upload)   │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS
┌──────────────────────┴───────────────────────────────────────┐
│  SUPABASE                                                     │
│  ├── Auth — couple accounts (email/Google)                    │
│  ├── Database (PostgreSQL)                                    │
│  │   ├── celebration_websites                                 │
│  │   ├── website_rsvps (anon insert)                          │
│  │   ├── website_guest_photos (anon insert)                   │
│  │   └── website_schedule_events / entourage / gallery        │
│  ├── Storage                                                  │
│  │   ├── website-gallery (couple uploads)                     │
│  │   └── website-guest-photos (guest uploads, anon)           │
│  ├── Realtime                                                 │
│  │   ├── New RSVP notifications                               │
│  │   └── New photo upload notifications                       │
│  └── Edge Functions                                           │
│      ├── generate-thumbnail (on photo upload)                 │
│      ├── generate-zip (download all photos)                   │
│      └── increment-view-count (on website visit)              │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Key Technical Decisions

#### Anonymous Uploads (Critical)

Both RSVP and photo uploads must work **without authentication**. This is the core UX requirement — wedding guests should never need to create an account.

**Implementation:**
- Supabase anon key is used for these operations
- RLS policies verify the target website is published and features are enabled
- Rate limiting via Edge Function or Supabase Rate Limiting (prevent abuse)
- IP-based throttling: max 20 RSVPs / 50 photos per IP per hour

#### QR Code Generation (Client-Side)

- Use `qrcode` npm package for generation
- Generate on the couple's dashboard
- Render as Canvas, export as high-res PNG (300 DPI for printing)
- Include theme colors in QR styling
- Two variants: website QR and photo upload QR

#### Image Processing Pipeline

```
Guest takes photo
  → Client-side compression (Canvas API / browser-image-compression)
    → Max 2048px long edge
    → JPEG quality 0.8
    → EXIF stripped
  → Upload to Supabase Storage (website-guest-photos/{website_id}/originals/)
  → Edge Function trigger: generate-thumbnail
    → Resize to 400px wide
    → Store in website-guest-photos/{website_id}/thumbnails/
  → Insert record into website_guest_photos table
  → If auto-approve: status = 'approved'
  → If manual review: status = 'pending'
  → Supabase Realtime notifies couple dashboard
```

#### Slug Generation

- Auto-generated from partner names: `marco-and-pia`
- Collision handling: `marco-and-pia-2`, `marco-and-pia-3`
- Character sanitization: lowercase, alphanumeric + hyphens only
- Reserved slugs: `admin`, `api`, `app`, `help`, `about`, etc.
- Max length: 60 characters

### 7.3 Supabase Realtime Subscriptions

```typescript
// Couple dashboard: listen for new RSVPs
const rsvpChannel = supabase
  .channel('website-rsvps')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'website_rsvps',
    filter: `website_id=eq.${websiteId}`
  }, (payload) => {
    // Update RSVP count and list in real-time
    addNewRsvp(payload.new);
  })
  .subscribe();

// Couple dashboard: listen for new photo uploads
const photoChannel = supabase
  .channel('website-photos')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'website_guest_photos',
    filter: `website_id=eq.${websiteId}`
  }, (payload) => {
    // Update photo count and show new photo
    addNewPhoto(payload.new);
  })
  .subscribe();
```

### 7.4 Offline / Poor Connectivity Handling

Filipino celebration venues often have unreliable wifi and 4G can be spotty with 200+ guests on the same cell tower.

**Strategies:**
1. **Progressive upload:** Start upload immediately after photo selection, before user adds name/caption
2. **Retry with exponential backoff:** 1s → 2s → 4s → 8s → 16s (max 5 retries)
3. **Queue for offline:** If upload fails after retries, save to IndexedDB and retry when connection returns
4. **Small payloads:** Aggressive client-side compression, target <1MB per photo
5. **Service Worker:** Register a SW to handle background upload when connection is available
6. **Visual feedback:** Clear progress indicators, "Waiting for connection..." state

### 7.5 Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| Guest website page load (3G) | <3 seconds | 4G is common but 3G fallback occurs at crowded venues |
| Photo upload page load | <2 seconds | Simple page, must feel instant |
| Time to upload 1 photo (4G) | <5 seconds | Including compression + upload |
| Lighthouse Performance score | >85 | Mobile-first optimization |
| First Contentful Paint | <1.5s | Hero section renders fast |
| Total page weight (guest site) | <500KB | Excluding user-uploaded images |

---

## 8. What Makes This Uniquely Filipino

### 8.1 Cultural Elements

| Element | Implementation | Why It Matters |
|---------|---------------|----------------|
| **Entourage hierarchy** | Dedicated section with Filipino roles: Ninang, Ninong, Best Man, Maid of Honor, Flower Girl, Ring Bearer, Bible Bearer, Cord Sponsors, Veil Sponsors, Candle Sponsors | Filipino entourages are 20-40 people, far larger than Western "bridal party." This is a major feature gap in international platforms. |
| **Ceremony types** | Catholic, Church (INC), Church (Other), Muslim, Civil, Civil Union, Other | Filipino couples celebrate across many traditions. No other platform supports Nikah or INC ceremonies. |
| **Filipino date formatting** | "Sabado, ika-14 ng Pebrero, 2026" option alongside English | Optional Tagalog date format for formal invitations |
| **"Maraming salamat!"** | Filipino thank-you on RSVP confirmation | Warm, culturally authentic confirmation message |
| **Lechon o Seafood?** | Dietary preferences include Filipino-relevant options | Halal for Muslim guests, plus Filipino dietary context |
| **Barong Tagalog mention** | Dress code suggestions include Filipino formal wear | Entourage section can note "Barong Tagalog" or "Filipiniana" dress code |
| **Filipino proverbs** | Optional decorative quotes: "Ang pag-ibig ay parang buhay — walang katapusan" | Cultural flair for the couple's website |

### 8.2 Filipino Communication Patterns

| Pattern | Implementation |
|---------|---------------|
| **Viber-first sharing** | Primary share button opens Viber deep link with pre-written message |
| **Facebook Messenger** | Secondary share button for Messenger |
| **Group chat friendly** | Share message includes couple names, date, and a compelling preview |
| **SMS fallback** | For older relatives without Viber: SMS share with short URL |
| **Physical invitations** | QR code downloads are optimized for printing on traditional Filipino invitations |

### 8.3 Filipino Wedding Guest Behavior

Understanding how Filipino guests behave at celebrations informs our design:

| Behavior | Design Response |
|----------|----------------|
| **Large guest counts (150-300)** | RSVP dashboard handles scale; auto-generated summary stats |
| **Plus-ones are expected** | RSVP form asks "How many guests including yourself?" not just +1 |
| **Cash gifts are common** | Future: GCash/Maya QR code on website for cash gifts |
| **Family groups RSVP together** | RSVP form allows group submission (family name + count) |
| **Late RSVPs** | RSVP reminder feature with copy-paste Viber message |
| **Selfie culture** | Guest photographer feature plays to Filipino love of photos |
| **Instagram/TikTok at events** | Hashtag displayed prominently to encourage social posting |
| **Viber group coordination** | QR code and links designed for easy Viber group sharing |

### 8.4 Digital Angpao — The GCash/Maya Gift Section

**This is a blue ocean feature that no competitor offers.** (See competitive analysis: "No platform does this.")

Filipino wedding gifts are predominantly cash ("ampao" or "angpao"), traditionally placed in envelopes at the reception. With GCash processing 4+ billion transactions and 94 million registered users, the "digital angpao" feature is a massive differentiator.

**MVP Implementation (Free Tier):**
| Feature | Description |
|---------|-------------|
| **Gift information section** | Tasteful, opt-in section on the website with customizable intro text (default: "Your presence is the greatest gift. For those who wish to give, monetary gifts are lovingly appreciated.") |
| **GCash QR code** | Couple uploads their GCash QR image or enters their number; QR displayed on the website |
| **Maya (PayMaya)** | Same as GCash — QR code or account number |
| **Bank transfer details** | Bank name, account name, account number for direct transfers |
| **QR Ph support** | National QR standard (BSP-approved) — single QR code works across all Philippine e-wallets and banks |

**Future Premium:**
| Feature | Description |
|---------|-------------|
| **Multi-currency for OFWs** | Display USD/SGD/AED equivalent alongside PHP for overseas Filipino guests |
| **Gift tracking** | Couple can log received gifts (cash envelopes + digital) for thank-you card tracking |
| **Gift registry links** | Links to SM, Lazada, Shopee for physical gift options |

**Design Principle:** The gift section must be tasteful, never aggressive. Couples should feel comfortable enabling it. Research confirms both Marco & Pia AND Sam & Alex consider this "non-negotiable" for a Filipino wedding platform.

---

## 9. Mobile-First Design Considerations

### 9.1 Target Device Profile

| Spec | Typical Value |
|------|---------------|
| **Device** | Android phone (Samsung, Vivo, OPPO, Xiaomi) |
| **Screen size** | 5.5" - 6.7" (360-412px CSS width) |
| **Connection** | 4G LTE (10-30 Mbps down, but variable at crowded events) |
| **Browser** | Chrome for Android (85%+), Samsung Internet (10%) |
| **RAM** | 3-6 GB |
| **Storage** | Limited — avoid large client-side caches |
| **Camera** | 12-64 MP rear camera |

### 9.2 Mobile UX Principles

1. **Touch targets: minimum 44x44px** — Filipino users use phones one-handed, buttons must be thumb-friendly
2. **Bottom-anchored CTAs** — RSVP and Photo Upload buttons fixed at bottom of viewport on mobile
3. **Minimal scrolling to RSVP** — RSVP form should be reachable within 2-3 swipes from the top
4. **No horizontal scrolling** — everything fits in portrait viewport
5. **Large, clear typography** — minimum 16px body text (prevents iOS zoom on input focus)
6. **Reduce input fields** — only ask for what's essential (name + attendance is the minimum RSVP)
7. **Native camera integration** — `capture="environment"` attribute triggers native camera app
8. **Haptic feedback** — subtle vibration on successful RSVP/upload (via Vibration API)

### 9.3 Performance Optimizations for 4G

| Optimization | Implementation |
|--------------|----------------|
| **Image lazy loading** | `loading="lazy"` on all gallery images |
| **Responsive images** | `srcset` with multiple sizes (400w, 800w, 1200w) |
| **WebP format** | Serve WebP with JPEG fallback |
| **Font subsetting** | Only load Latin + Filipino character subsets of Jost and Cormorant |
| **Critical CSS inlining** | Inline above-the-fold styles to eliminate render blocking |
| **Preconnect to Supabase** | `<link rel="preconnect">` for storage/API domains |
| **Service Worker caching** | Cache the website shell for repeat visits |
| **Thumbnail-first loading** | Show 400px thumbnails, load full resolution on tap |
| **Compressed uploads** | Client-side compression before upload (reduces data usage by 70-80%) |

### 9.4 Mobile-Specific UI Components

#### Sticky RSVP Bar (Guest-Facing)
```
┌───────────────────────────────────┐
│ [RSVP Now]   [Share Photos]       │  ← Fixed bottom bar
└───────────────────────────────────┘
```
A floating action bar appears at the bottom of the screen on mobile, always accessible regardless of scroll position.

#### Swipeable Photo Upload
```
┌───────────────────────────────────┐
│  📸 Share Your Photos             │
│                                   │
│  ┌─────────┐  ┌─────────┐       │
│  │  📷     │  │  🖼️     │       │
│  │  Take   │  │  Choose  │       │
│  │  Photo  │  │  Gallery │       │
│  └─────────┘  └─────────┘       │
│                                   │
│  [Upload 3 Photos]                │  ← Shows count of selected
└───────────────────────────────────┘
```

#### RSVP Form (Mobile-Optimized)
```
┌───────────────────────────────────┐
│  ✉️ RSVP                          │
│                                   │
│  Your Name                        │
│  ┌───────────────────────────┐   │
│  │ Juan Dela Cruz             │   │
│  └───────────────────────────┘   │
│                                   │
│  Will you be celebrating with us? │
│  ┌──────────┐  ┌──────────┐      │
│  │ Joyfully │  │Respectful│      │
│  │  Accept  │  │ Decline  │      │
│  └──────────┘  └──────────┘      │
│                                   │
│  How many guests? (including you) │
│  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌──┐          │
│  │1│ │2│ │3│ │4│ │5+│           │
│  └─┘ └─┘ └─┘ └─┘ └──┘          │
│                                   │
│  Dietary needs (optional)         │
│  ☐ Halal / No Pork               │
│  ☐ Vegetarian  ☐ Vegan           │
│  ☐ Seafood Allergy               │
│  ☐ Other: _______________        │
│                                   │
│  Message (optional)               │
│  ┌───────────────────────────┐   │
│  │                           │   │
│  └───────────────────────────┘   │
│                                   │
│  [Send RSVP]                      │
│                                   │
└───────────────────────────────────┘
```

---

## 10. Privacy & Moderation Plan

### 10.1 Privacy Framework

| Concern | Approach |
|---------|----------|
| **Guest data collection** | Minimal: name + attendance only required. Phone/email optional. |
| **EXIF stripping** | All uploaded photos have GPS coordinates and device info stripped client-side before upload |
| **IP logging** | RSVP submissions log IP for anti-spam only; never exposed to couples |
| **Photo permanence** | Photos auto-delete 1 year after celebration date (free tier) |
| **Data access** | Only the couple can see their RSVPs and manage their photos |
| **No tracking** | Guest-facing pages: no analytics cookies, no third-party trackers |
| **Data Privacy Act compliance** | Comply with Philippine RA 10173 — include consent language for data collection, provide data subject rights notice |
| **Guest consent** | Photo upload page includes: "By uploading, you agree that the couple may share these photos" |
| **No auto-share to social media** | Research-validated (Sam & Alex): no Facebook/Instagram auto-share buttons. Couple controls when their celebration goes public |
| **Download control** | Couple can disable public album view at any time |
| **Account deletion** | When couple deletes account, all website data + photos are permanently removed |

### 10.2 Photo Moderation System

#### Auto-Moderation (Default: OFF for MVP)
- Future: integrate with a content moderation API (e.g., Supabase + third-party) to auto-flag inappropriate content
- For MVP: rely on manual couple review

#### Manual Moderation (Default: ON — Auto-Approve)
- **Auto-approve mode** (recommended): all photos appear immediately in the album. Couple can hide/delete after.
- **Manual review mode**: photos are held in "pending" until the couple approves them.
- Couple toggles this in their dashboard settings.

#### Moderation Actions
| Action | Result |
|--------|--------|
| **Approve** | Photo visible in public album |
| **Hide** | Photo removed from album but kept in storage (couple can re-approve) |
| **Delete** | Photo permanently removed from storage and database |
| **Report** | Photo flagged for haraya admin review (for terms violations) |

### 10.3 Anti-Abuse Measures

| Threat | Mitigation |
|--------|-----------|
| **Spam RSVPs** | Rate limit: max 20 RSVPs per IP per hour. ReCAPTCHA v3 (invisible) on submit. |
| **Spam photo uploads** | Rate limit: max 50 uploads per IP per hour. File type validation (JPEG/PNG/HEIC only). |
| **Oversized uploads** | Client-side: reject files >10MB pre-compression. Server-side: reject files >5MB post-compression. |
| **Inappropriate photos** | Manual review option. Future: AI content moderation. |
| **URL scraping** | Slug is not guessable (couple-specific). No directory listing of all websites. |
| **DDoS on popular websites** | Supabase CDN + Vercel edge caching for static website content. |
| **Storage abuse** | Hard limits: 500 photos / 2GB per website (free tier). |

### 10.4 Data Retention Policy

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| Celebration website | Indefinite (while account active) | Couple can delete anytime |
| RSVP responses | Indefinite (while account active) | Tied to website lifecycle |
| Guest photos (free) | 1 year after celebration date | Warning at 11 months, couple can download ZIP |
| Guest photos (premium) | Indefinite | Paid storage |
| Deleted photos | Immediately purged | No soft-delete in storage, only in database |
| Inactive accounts | 2 years after last login | Warning emails at 18 and 22 months |

---

## 11. MVP vs Future Phases

### 11.1 MVP (Phase 1) — Build First

**Goal:** Launch a working celebration website builder with RSVP and guest photo upload.

**Timeline estimate:** 3-4 weeks of development

| Feature | Details | Complexity |
|---------|---------|-----------|
| Website editor | Partner names, date, ceremony type, venue, Our Story, cover photo URL, color theme (4 themes), hashtag, RSVP toggle | Low — extending existing CoupleWebsite.tsx |
| Schedule section | Add/edit/remove timeline events | Low — already built in scaffold |
| Entourage section | Add/edit/remove members with Filipino roles | Low — already built in scaffold |
| Gallery section | Add photos via URL (upload via Storage in Phase 2) | Low — already built in scaffold |
| Preview mode | Guest-facing website with all sections | Low — already built in scaffold |
| RSVP form (guest-facing) | Name, attendance, guest count, dietary, message | Medium — need unauthenticated insert |
| RSVP dashboard (couple-facing) | List of responses, summary stats, CSV export | Medium |
| Public URL with slug | `haraya.ph/c/{slug}` accessible by guests | Medium — routing + slug generation |
| QR code generation | Downloadable QR code for the website URL | Low — client-side library |
| Photo upload page | Guest-facing upload with camera/gallery, client-side compression | Medium-High |
| Photo album view | Masonry grid of approved photos | Medium |
| Photo moderation | Couple can approve/hide/delete photos | Medium |
| Supabase Storage integration | Buckets for gallery + guest photos | Medium |
| Database migration | New tables: celebration_websites, website_rsvps, website_guest_photos, etc. | Medium |
| Sharing (copy link, Viber) | Share buttons with pre-written messages | Low |

**Not in MVP:**
- File upload for cover photo (use URL for now, like current scaffold)
- Photo upload for gallery (use URL for now)
- Download ZIP of guest photos
- Real-time RSVP notifications
- AI content moderation
- GCash/Maya integration
- Premium features

### 11.2 Phase 2 — Polish & Upload

**Timeline estimate:** 2-3 weeks after MVP

| Feature | Details |
|---------|---------|
| File upload for photos | Replace URL inputs with Supabase Storage upload for cover photo + gallery |
| Thumbnail generation | Edge Function to create thumbnails on photo upload |
| Download ZIP | Edge Function to generate ZIP of all approved guest photos |
| Real-time notifications | Supabase Realtime for new RSVPs and photo uploads |
| RSVP reminders | Copy-paste Viber/SMS message for pending guests |
| Add to calendar | ICS file generation for guests post-RSVP |
| Venue map link | Google Maps / Waze link from venue location |
| Returning guest detection | Cookie-based: show guest their previous RSVP response |

### 11.3 Phase 3 — Growth & Monetization

| Feature | Details |
|---------|---------|
| Premium themes | 8+ additional color themes and layout options |
| Custom domain | Let couples use their own domain |
| Remove branding | Paid option to remove "Made with haraya" |
| Meal selection | Guests choose their meal option when RSVPing |
| Table seating | Assign tables, generate seating chart |
| Guest book / message wall | Digital wall of well-wishes |
| GCash/Maya cash gifts | QR code for monetary gifts |
| Video background | Video hero section |
| AI photo enhancement | Auto-enhance guest photos |
| Photo slideshow | Auto-generated slideshow |
| Analytics dashboard | View counts, visitor stats, engagement metrics |

### 11.4 Phase 4 — Platform Integration

| Feature | Details |
|---------|---------|
| Vendor upsell | "Your celebration is in 3 months! Browse vendors near {venue}" |
| Guest → Couple conversion | Guest who attended can create their own haraya account |
| Celebration story import | One-click: turn guest photos into a Real Celebrations story |
| Guest list sync | Sync RSVP responses with the main Guest List feature |
| Checklist integration | Auto-update "Send invitations" checklist item when website is published |

---

## 12. Success Metrics

### 12.1 North Star Metric

**Celebration websites with at least 10 guest RSVPs** — this indicates a website that was actually shared and used, not just created.

### 12.2 Funnel Metrics

| Stage | Metric | Target (Month 1) | Target (Month 6) |
|-------|--------|-------------------|-------------------|
| **Discovery** | New signups mentioning "website" or "RSVP" | 50 | 500 |
| **Creation** | Websites created | 30 | 300 |
| **Publishing** | Websites published (made live) | 20 | 200 |
| **Sharing** | Websites with at least 1 guest visit | 15 | 180 |
| **RSVP usage** | Websites with 10+ RSVPs | 8 | 120 |
| **Photo adoption** | Websites with guest photos enabled | 10 | 150 |
| **Photo engagement** | Websites with 20+ guest photos | 3 | 50 |
| **Platform value** | Guests who later become couple users | 1 | 15 |

### 12.3 Guest Experience Metrics

| Metric | Target |
|--------|--------|
| RSVP completion rate (started → submitted) | >80% |
| Photo upload success rate (4G connection) | >95% |
| Photo upload time (single photo, 4G) | <5 seconds |
| Guest website page load (4G) | <3 seconds |
| Guest bounce rate (left without RSVP) | <40% |

### 12.4 Engagement Metrics

| Metric | Description |
|--------|-------------|
| Average RSVPs per website | How many guests use the RSVP form |
| Average guest photos per website | Crowdsourcing engagement |
| Viber shares per website | Viral distribution |
| Return visits per guest | Do guests come back to check photos? |
| Couple login frequency post-publish | Are couples checking their dashboard? |

---

## 13. Competitive Positioning

### 13.1 Positioning Statement

**For** Filipino couples planning celebrations
**Who** need a free, beautiful, and easy way to manage RSVPs and capture memories
**haraya** is the only celebration website platform
**That** is built for Filipino culture, completely free, and includes a guest photo-sharing feature
**Unlike** The Knot, Zola, and WithJoy which are US-focused, gendered, and paywall key features
**Our product** understands ninongs, ninangs, and the joy of a 300-person Filipino celebration

### 13.2 Key Competitive Advantages (Research-Validated)

1. **100% Free core** — no guest count caps (RSVPify caps at 100, Say I Do at 80), no paywalled RSVP tracking, no premium-only QR codes. Filipino celebrations average 200+ guests — caps make competitors unusable.

2. **Guest Photographer integrated into RSVP** — unique combination. Joy requires app download for photo sharing. GuestCam/GUESTPIX are standalone tools ($49-$177+) with no RSVP integration. haraya is the first to combine both, browser-based, free.

3. **Filipino-First** — GCash/Maya digital angpao (competitive blue ocean — zero platforms offer this), Ninong/Ninang tracker, Filipino ceremony types, Waze/Grab integration, Viber-optimized sharing, Filipino dietary options (halal/no pork), Filipino dress codes. Per EventNest.ph research: these are the exact requirements the Philippine market needs.

4. **Inclusive by Design** — per Sam & Alex: "I don't want to go through every section and change 'bride' to something else. I want the default to already be inclusive." haraya's defaults are inclusive from day one — not retrofitted.

5. **Mobile-Native** — designed for Android on 4G (98.2% of PH mobile connections are broadband). The Knot's RSVP is "the least intuitive app." Joy's photo sharing requires app download. haraya works entirely in the mobile browser.

6. **Viral by Nature** — per Pia: "Make it Instagram-worthy and your users become your marketers." Per Alex: "If haraya becomes the answer to 'anong platform ginamit niyo?' — game over." Every celebration website is seen by 150-300 guests. Every guest is a potential future couple. The haraya footer + beautiful design = organic acquisition engine.

### 13.3 Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Low adoption: couples prefer physical invitations | Medium | High | Offer QR codes for physical invitations; position as complement, not replacement |
| Photo upload fails at venue (poor connectivity) | High | Medium | Offline queue, aggressive compression, retry logic, "upload later" messaging |
| Abuse/spam on anonymous upload | Low | Medium | Rate limiting, file validation, manual moderation option |
| Competitors copy guest photographer feature | Low (short-term) | Low | First-mover advantage in PH; cultural moat; platform ecosystem |
| Storage costs scale with photo uploads | Medium | Medium | Aggressive compression, retention limits, premium tier for heavy users |
| Couples don't check RSVP dashboard | Medium | Low | Push notifications, email summaries, Viber notifications |

---

## 14. Pricing Strategy (Research-Validated)

### Willingness to Pay

| Source | Free Tier Expectation | Premium WTP |
|--------|----------------------|-------------|
| Marco & Pia (200 guests, PHP 800K budget) | Basic RSVP should be free if already using platform | PHP 1,500-2,000 |
| Sam & Alex (80 guests, PHP 400K budget) | "Basic RSVP form should be free. Non-negotiable in 2026." | PHP 999-1,499 |
| Competitive analysis (GUESTPIX, GuestCam) | N/A (photo-only platforms) | $49-$177 (~PHP 2,700-9,800) |
| Competitive analysis (RSVPify premium) | 100 guests free | $72/year (~PHP 4,000/year) |

### Recommended Pricing Tiers

| Tier | Name | Price | Includes |
|------|------|-------|----------|
| **Free** | Libre | PHP 0 | RSVP website, unlimited guests, 4 themes, RSVP form, RSVP dashboard, QR code, Viber sharing, guest photo upload (100 photos), entourage section, gift info section, "Made with haraya" footer |
| **Premium** | Kasalan | PHP 999 one-time | Everything in Free + remove haraya branding, custom URL slug, 8+ themes, 500 guest photos, full-resolution download, photo moderation dashboard, CSV export, automated RSVP reminders, video upload support |
| **Ultimate** | Pista | PHP 2,499 one-time | Everything in Kasalan + custom domain support, unlimited photos, live photo wall (projector), song request feature, love story timeline, table assignment viewer, analytics, priority support |

### Pricing Rationale

- **Free tier is generous** — unlimited guests (beats all competitors), guest photos included (beats all RSVP platforms), gift section included (unique to haraya). This is the founder's mandate: "Must be FREE for couples."
- **PHP 999** is less than the cost of 2 lechon bellies, or 1/25th the cost of printed invitations for 200 guests. Both couples validated this price point.
- **PHP 2,499** is still 50-70% cheaper than US platform premiums (WithJoy, Zola) when converted. And dramatically cheaper than standalone photo-sharing tools (GuestCam, GUESTPIX at $49-$177).
- **One-time pricing, not subscription** — Filipino couples plan for 3-12 months. A one-time fee aligned with the planning cycle feels more natural than monthly subscriptions. This also simplifies GCash payment (one transaction).

---

## Appendix A: Entourage Role Options

Filipino celebrations have unique entourage structures. The website builder should offer these preset roles (with ability to add custom roles):

### Catholic Ceremony
- Ninang (Female Principal Sponsor)
- Ninong (Male Principal Sponsor)
- Maid of Honor
- Best Man
- Bridesmaid / Groomsman
- Flower Girl
- Ring Bearer
- Bible Bearer
- Coin (Arrhae) Bearer
- Cord Sponsors
- Veil Sponsors
- Candle Sponsors
- Secondary Sponsors

### Civil / Civil Union Ceremony
- Principal Sponsor
- Witness
- Maid/Man of Honor
- Best Person

### Muslim Ceremony (Nikah)
- Wali (Guardian)
- Imam
- Witnesses
- Principal Sponsors

### General Roles
- Parents of Partner 1
- Parents of Partner 2
- Officiant
- Reader
- Singer / Performer

---

## Appendix B: Sample Share Messages

### Viber / Messenger Share (Auto-Generated)

**Pre-celebration (RSVP):**
```
🎉 You're invited!

Marco & Pia are getting married!
📅 February 14, 2026
📍 Villa Hermosa, Tagaytay

Please RSVP here: haraya.ph/c/marco-and-pia

See you there! 💕
```

**Day-of-event (Photo Upload):**
```
📸 Share your photos!

Help Marco & Pia capture their special day!
Scan the QR code or tap this link to upload:

haraya.ph/c/marco-and-pia/photos

#MarcoAndPia2026
```

**Post-event (Album Sharing):**
```
📷 Our celebration album is ready!

Thank you for being part of our special day!
View all the photos here:

haraya.ph/c/marco-and-pia/album

Maraming salamat! 💕
— Marco & Pia
```

---

## Appendix C: Edge Cases & FAQ

### Q: What if two guests have the same name?
A: RSVPs are identified by a combination of name + IP + timestamp. The couple's dashboard shows all entries and can reconcile duplicates manually.

### Q: Can a guest edit their RSVP?
A: In MVP, no — but they can submit another response. The couple sees all responses and can identify the latest one by timestamp. In Phase 2, we'll add cookie-based returning guest detection.

### Q: What happens if the couple changes their celebration date?
A: The countdown timer updates automatically. RSVPs are not affected (they're responses, not calendar events). The couple should re-share their website link via Viber.

### Q: What file types are supported for guest photos?
A: JPEG, PNG, and HEIC (iPhone format). Videos are not supported in free tier. WebP is accepted but converted to JPEG for compatibility.

### Q: What if a guest uploads an inappropriate photo?
A: If auto-approve is on, the couple can hide/delete the photo from their dashboard. If manual review is on, the photo stays in "pending" until the couple approves it. In future phases, AI content moderation will auto-flag inappropriate content.

### Q: How many RSVPs can a website receive?
A: No limit. Filipino celebrations commonly have 200-400 guests.

### Q: Can the couple sync RSVPs with their Guest List?
A: Not in MVP. In Phase 4, we'll add automatic sync between `website_rsvps` and the main `guest_list` table, matching by name.

### Q: What if the venue has no internet?
A: The photo upload page works with any available connection (4G, wifi). If there's no connection at all, photos are queued locally and uploaded when the connection returns (via Service Worker). We also provide a "Upload Your Photos Later" message with the link for guests to use from home.

---

---

## Appendix D: Key Quotes from User Research

> "Our wedding budget is PHP 800K — I'm not sending guests a Google Form."
> — Pia Santos (Interview 1)

> "Wedding planning is like managing stakeholders who all have different opinions and none of them report to you."
> — Marco Reyes (Interview 1)

> "It's like wearing a couture outfit with rubber slippers."
> — Alex Torres (Interview 2), on linking a beautiful Canva invite to a Google Form RSVP

> "I don't want to go through every section and change 'bride' to something else. I want the default to already be inclusive."
> — Alex Torres (Interview 2)

> "The best platforms are invisible. You don't notice the platform — you notice the couple's story. haraya should be the canvas, not the painting."
> — Sam Villanueva (Interview 2)

> "Every Filipino family has a Tito Jun or Tita Baby."
> — Alex Torres (Interview 2), on why photo moderation matters universally

> "'Walang pagkain sa kasal ni Marco' — that story would follow me forever."
> — Marco Reyes (Interview 1), on why accurate RSVP headcounts save real money

> "If haraya becomes the answer to 'anong platform ginamit niyo?' — game over. You win."
> — Alex Torres (Interview 2)

> "Make it Instagram-worthy and your users become your marketers."
> — Pia Santos (Interview 1)

---

*This specification is a living document. It will be updated as we validate assumptions with real users and gather feedback from early adopters.*

*haraya — where dreams take shape*
