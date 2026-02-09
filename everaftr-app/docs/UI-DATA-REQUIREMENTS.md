# UI Data Requirements Report

> Comprehensive analysis of all frontend pages, components, and data flows for the Supabase database migration.
>
> Generated: 2026-02-09
> Agent: UI/UX Data Reviewer

---

## Table of Contents

1. [Page-by-Page Data Requirements](#1-page-by-page-data-requirements)
2. [Missing Data Fields & Type Gaps](#2-missing-data-fields--type-gaps)
3. [Filtering, Sorting & Index Needs](#3-filtering-sorting--index-needs)
4. [User Flow Analysis (Auth vs Public)](#4-user-flow-analysis-auth-vs-public)
5. [Real-Time Subscription Needs](#5-real-time-subscription-needs)
6. [Recommendations](#6-recommendations)

---

## 1. Page-by-Page Data Requirements

### 1.1 Home Page (`src/pages/Home.tsx`)

**Data consumed:**
- `mockVendors` — Full vendor array, filtered client-side for featured vendors (rating >= 4.5, non-empty image), sorted by rating desc, sliced to 6
- 8 hardcoded vendor categories (subset of the 20 in `categories.ts`)
- 3 hardcoded stats: "300+ Wedding Vendors", "8 Vendor Categories", "100% Free for Couples"
- Hardcoded features and how-it-works content

**Database queries needed:**
| Query | Description | Frequency |
|-------|-------------|-----------|
| `featured_vendors` | Top 6 vendors by rating where rating >= 4.5 and image is not empty | On page load, cacheable |
| `vendor_category_counts` | Count of vendors per category (for category cards) | On page load, cacheable |
| `platform_stats` | Total vendor count, category count, active couple count | On page load, cacheable (could be a materialized view) |

**Supabase tables touched:** `vendors`

**Notes:**
- Stats are currently hardcoded. Should become dynamic aggregates.
- Category list on Home uses only 8 of the 20 defined categories. The query should return all categories that have at least 1 vendor.

---

### 1.2 Vendor Directory (`src/pages/Vendors.tsx`)

**Data consumed:**
- `mockVendors` — Full 317-vendor array loaded client-side
- `categories` — 20 category definitions from `categories.ts`
- 9 hardcoded locations: Metro Manila, Cavite, Laguna, Batangas, Bulacan, Pampanga, Cebu, Tagaytay, Davao
- 3 hardcoded price ranges: Budget (<30K), Mid-range (30K-100K), Premium (100K+)
- URL search params for category deep-linking (`?category=venues`)

**Filters (all client-side currently):**
| Filter | Field | Type |
|--------|-------|------|
| Search | `name`, `description`, `tags[]` | Text search (case-insensitive includes) |
| Category | `category` | Exact match from 20 categories |
| Location | `location` | Exact match from location list |
| Price Range | `priceRange.min`, `priceRange.max` | Range buckets (Budget/Mid/Premium) |
| All Celebrations Welcome | `allCelebrationsWelcome` | Boolean toggle |

**Sorting:** Currently none implemented. Vendors display in array order.

**Pagination:** Client-side, 24 vendors per page.

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `search_vendors` | Full-text search on name, description, tags with filters for category, location, price range, ACW. Server-side pagination (24/page). |
| `vendor_categories_with_counts` | All categories with vendor counts for the filter sidebar |
| `vendor_locations` | Distinct locations from vendor data for location filter |

**Supabase tables touched:** `vendors`, `vendor_categories`

**Critical notes:**
- **Must move filtering to server-side.** Loading 317+ vendors client-side won't scale. With Supabase, use `.select()` with `.ilike()` for search, `.eq()` for filters, `.range()` for pagination.
- Location list should be dynamic (derived from vendor data), not hardcoded.
- Price range buckets need server-side filtering: `.gte('price_range_min', x).lte('price_range_max', y)`.
- Need to add sorting: by rating, by price (low-high / high-low), by review count, by name.

---

### 1.3 Vendor Profile (`src/pages/VendorProfile.tsx`)

**Data consumed:**
- Single vendor via `getVendorById(id)` — all Vendor fields
- Reviews via `getReviewsByVendorId(id)` — array of `{ id, vendorId, reviewerName, rating, comment, date, ceremonyType }`
- Inquiry form state (not persisted): `{ name, email, celebrationDate, message }`

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_vendor` | Single vendor by ID with all fields |
| `get_vendor_reviews` | Reviews for vendor, ordered by date desc |
| `submit_inquiry` | Insert into inquiries table |
| `check_favorite` | Whether current user has favorited this vendor |
| `toggle_favorite` | Add/remove favorite |

**Supabase tables touched:** `vendors`, `reviews`, `inquiries`, `favorites`

**Critical notes:**
- Inquiry form currently console.logs. Must submit to `inquiries` table.
- Review type in mockVendors includes `ceremonyType` which is not in the central `types/index.ts` — needs to be added.
- Need to track inquiry status (pending, responded, booked) for vendor dashboard.
- `availability` field is `string[]` of month names — consider storing as integer array (1-12) for querying.

---

### 1.4 Planning Hub (`src/pages/Plan.tsx`)

**Data consumed:**
- localStorage `haraya-checklist` — Array of `{ id, completed }` items
- localStorage `haraya-budget` — `{ totalBudget, categories: [{ actualCost }] }`

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_checklist_progress` | Count completed / total for current couple |
| `get_budget_summary` | Total budget and sum of actual costs for current couple |

**Supabase tables touched:** `checklist_items`, `budget_categories` (via couple's planning data)

---

### 1.5 Checklist (`src/components/PlanningTools/Checklist.tsx`)

**Data consumed:**
- 53 inline checklist items, each with: `id`, `title`, `timeframe`, `category`, `ceremonyTypes[]`, `completed`, `notes`, `notesExpanded`
- Ceremony type from localStorage `haraya-ceremony-type`
- Checklist state from localStorage `haraya-checklist`

**Timeframes (6):** 12+ Months Before, 9-12 Months Before, 6-9 Months Before, 3-6 Months Before, 1-3 Months Before, Final Month & Week

**Categories:** Venue & Catering, Attire & Beauty, Photo & Video, Design & Decor, Ceremony, Stationery, Entertainment, Logistics, Legal & Documents

**Ceremony types for filtering:** Catholic, Civil, Muslim, Other

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_checklist_template` | Default checklist items (could be a static reference table or seeded per couple) |
| `get_couple_checklist` | Couple's checklist with completion state and notes |
| `update_checklist_item` | Toggle completion, update notes |
| `get_ceremony_type` | Couple's selected ceremony type |

**Supabase tables touched:** `checklist_templates` (reference), `couple_checklist_items` (per-couple state)

**Critical notes:**
- Each couple gets their own copy of the checklist (so they can add custom items).
- Ceremony type filtering happens client-side but the ceremony type preference should be stored in the couple profile.
- The `notesExpanded` field is UI-only state — do NOT persist to database.

---

### 1.6 Budget Tracker (`src/components/PlanningTools/BudgetTracker.tsx`)

**Data consumed:**
- localStorage `haraya-budget` with structure:
  ```
  {
    totalBudget: number,
    categories: [{
      id: string,
      name: string,
      estimatedCost: number,
      actualCost: number,
      suggestedPercentage: number
    }]
  }
  ```
- 10 default categories with suggested percentages: Venue & Catering (40%), Photo & Video (15%), Attire & Beauty (10%), Flowers & Styling (8%), Coordination (5%), Lights & Sound (5%), Stationery (3%), Entertainment (3%), Transport (3%), Miscellaneous (8%)
- Budget presets: ₱100K, ₱300K, ₱500K, ₱750K, ₱1M

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_couple_budget` | Couple's total budget and all category data |
| `update_total_budget` | Set/update total budget amount |
| `update_budget_category` | Update estimated or actual cost for a category |
| `add_custom_category` | Add a new budget category |
| `delete_custom_category` | Remove a custom category |

**Supabase tables touched:** `couple_budgets`, `budget_categories`

---

### 1.7 Matchmaker Quiz (`src/pages/Matchmaker.tsx`)

**Data consumed:**
- 5 hardcoded quiz questions with options:
  1. Celebration style (Intimate/Classic/Grand/Destination)
  2. Guest count (Under 50/50-150/150-300/300+)
  3. Budget range (Under ₱200K/₱200K-500K/₱500K-1M/Over ₱1M)
  4. Preferred location (Metro Manila/Cavite-Laguna-Batangas/Visayas/Mindanao)
  5. Top priority (Venue/Photography/Food/Overall coordination)
- 6 hardcoded mock vendor recommendations (NOT from mockVendors.ts)
- localStorage `matchmaker-results` for persisting answers

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `save_quiz_answers` | Store couple's quiz responses |
| `get_matched_vendors` | Query vendors matching quiz criteria (location, price range, category priority) |

**Supabase tables touched:** `matchmaker_responses`, `vendors`

**Critical notes:**
- The hardcoded mock recommendations MUST be replaced with real vendor queries based on quiz answers.
- Matching logic: map budget answer to price range, location answer to vendor locations, priority answer to vendor category. Return top-rated vendors matching criteria.
- Consider storing quiz responses for analytics (understand couple preferences at scale).

---

### 1.8 Favorites (`src/pages/Favorites.tsx`)

**Data consumed:**
- localStorage `haraya-favorites` — Array of `{ vendorId, dateAdded }`
- Vendor data looked up via `mockVendors.find(v => v.id === vendorId)`

**Sorting options:** Date Added (newest), Highest Rated, Lowest Price

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_favorites` | All favorited vendors for current couple, joined with vendor data |
| `remove_favorite` | Delete a favorite record |
| `add_favorite` | Insert a favorite record (called from VendorProfile/VendorCard) |

**Supabase tables touched:** `favorites` (join with `vendors`)

---

### 1.9 Guest List (`src/pages/GuestList.tsx`)

**Data consumed:**
- localStorage `haraya-guestlist` — Array of Guest objects:
  ```
  {
    id: string,
    name: string,
    email: string,
    phone: string,
    side: 'You' | 'Your Partner' | 'Shared',
    rsvpStatus: 'Attending' | 'Not Attending' | 'Pending',
    dietaryRestrictions: string[],  // Halal, Vegetarian, Vegan, Allergies, None
    tableNumber: string,
    plusOne: boolean,
    notes: string
  }
  ```

**Filters:** RSVP status, Side, Table number
**Sorting:** Name, Side, RSVP Status, Table
**Bulk actions:** Set RSVP status, Assign table number (for selected guests)

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_guests` | All guests for current couple with filters and sorting |
| `add_guest` | Insert new guest |
| `update_guest` | Update guest fields (RSVP, table, dietary, etc.) |
| `delete_guest` | Remove guest |
| `bulk_update_guests` | Update multiple guests at once (RSVP, table assignment) |
| `get_guest_stats` | Aggregate counts: total, attending, not attending, pending |

**Supabase tables touched:** `guests`

**Critical notes:**
- `side` labels "You" and "Your Partner" are based on the couple's custom labels. The DB should store a reference (partner1/partner2/shared) and the UI resolves display labels from the couple profile.
- `dietaryRestrictions` is a string array — use a Postgres array column or a junction table.
- Bulk operations should use Supabase's `.in()` filter for efficient multi-row updates.

---

### 1.10 Couple Website Builder (`src/pages/CoupleWebsite.tsx`)

**Data consumed:**
- localStorage `haraya-celebration-website` with complex structure:
  ```
  {
    partnerOneName: string,
    partnerTwoName: string,
    celebrationDate: string,
    ceremonyType: string,
    venueName: string,
    ourStory: string,
    coverPhotoUrl: string,
    colorTheme: 'sage' | 'lavender' | 'terracotta' | 'ocean',
    scheduleEvents: [{ time, title, description }],
    galleryPhotos: string[],   // URLs
    hashtag: string,
    entourage: [{ name, role }],
    rsvpEnabled: boolean
  }
  ```

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_website_data` | Full website data for current couple |
| `update_website_data` | Save website edits (could be partial updates) |
| `upload_cover_photo` | Supabase Storage upload |
| `upload_gallery_photos` | Supabase Storage batch upload |
| `get_website_rsvps` | RSVPs submitted by guests via the public website |
| `submit_rsvp` | Guest submits RSVP via public website (unauthenticated) |

**Supabase tables touched:** `couple_websites`, `website_schedule_events`, `website_entourage`, `website_gallery`, `website_rsvps`

**Storage buckets needed:** `website-photos` (cover photos, gallery images)

**Critical notes:**
- The website has a **public preview URL** — guests access it without auth. This requires a public-facing slug or unique URL.
- RSVP submissions come from unauthenticated users (wedding guests). Need an unauthenticated insert policy on `website_rsvps`.
- Gallery photos are currently URLs (strings). With Supabase Storage, these become uploaded files with generated URLs.
- `colorTheme` is an enum — store as text, validate in app.
- Schedule events and entourage are 1:many relationships — separate tables with foreign keys.

---

### 1.11 Real Celebrations (`src/pages/Celebrations.tsx`)

**Data consumed:**
- 8 hardcoded celebration stories:
  ```
  {
    id: string,
    coupleName: string,
    date: string,
    ceremonyType: 'Catholic' | 'Civil' | 'Muslim' | 'Sikh-Filipino' | 'Interfaith' | 'Civil Union' | 'Garden',
    location: string,
    coverImage: string,    // Unsplash URL
    summary: string,
    vendorCredits: [{ role, name }],
    tips: string[],
    photoCount: number,
    guestCount: number,
    budget: string         // e.g., "₱350,000"
  }
  ```

**Filters:** Ceremony type (All, Catholic, Civil, Muslim, Other)

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_celebrations` | All published celebration stories, filterable by ceremony type |
| `get_celebration_detail` | Single story with full content, vendor credits, tips, photos |
| `submit_celebration` | Couple submits their celebration story (moderated) |

**Supabase tables touched:** `celebrations`, `celebration_vendor_credits`, `celebration_photos`

**Storage buckets needed:** `celebration-photos`

**Critical notes:**
- `budget` is stored as a display string ("₱350,000") — should be stored as integer for filtering/sorting.
- `vendorCredits` should link to actual vendor IDs where possible (enables vendor profile linking).
- Stories need a moderation status (draft, pending_review, published, rejected).
- Consider a `celebration_tips` table or store as JSONB array.

---

### 1.12 Vendor Dashboard (`src/pages/VendorDashboard.tsx`)

**Data consumed:**
- localStorage `haraya-vendor-dashboard` with local VendorProfile type:
  ```
  {
    businessName: string,
    category: string,
    description: string,
    location: string,
    yearsInBusiness: number,
    priceRange: { min, max },
    services: string[],
    portfolioImages: string[],
    contactEmail: string,
    contactPhone: string,
    instagram: string,
    facebook: string,
    website: string,
    availability: string[],
    allCelebrationsWelcome: boolean,
    tier: 'libre' | 'pundar' | 'pangunahin' | 'natatangi'
  }
  ```
- Mock inquiries: `{ id, coupleName, date, message, status: 'new'|'responded'|'booked' }`
- Onboarding wizard: 4 steps (Business Details, Services, Contact, Availability)

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_vendor_profile` | Vendor's own profile data |
| `update_vendor_profile` | Save profile edits |
| `get_vendor_inquiries` | All inquiries received, with status filter |
| `update_inquiry_status` | Change inquiry status (new → responded → booked) |
| `upload_portfolio_images` | Supabase Storage upload |
| `get_vendor_stats` | Dashboard metrics: total inquiries, response rate, profile views |

**Supabase tables touched:** `vendors`, `inquiries`, `vendor_stats`

**Storage buckets needed:** `vendor-portfolios`

**Critical notes:**
- The local `VendorProfile` type differs significantly from the central `Vendor` type. Key additions: `yearsInBusiness`, `services[]`, `portfolioImages[]`, `website`, `tier`. These fields must be added to the `vendors` table.
- Vendor tier system (libre/pundar/pangunahin/natatangi) is a business-critical field for monetization. Needs its own column or a `vendor_subscriptions` table.
- Inquiry status tracking is essential for the two-sided marketplace. The `inquiries` table needs: `id`, `vendor_id`, `couple_id`, `couple_name`, `couple_email`, `celebration_date`, `message`, `status`, `created_at`, `responded_at`.

---

### 1.13 Community Forum (`src/pages/Community.tsx`)

**Data consumed:**
- 12 hardcoded threads + localStorage `haraya-community`:
  ```
  Thread: {
    id: string,
    title: string,
    author: string,
    category: string,  // 6 categories
    content: string,
    replyCount: number,
    lastActivity: string,
    isPinned: boolean,
    tags: string[],
    likes: number,
    replies: Reply[]
  }
  Reply: {
    id: string,
    author: string,
    content: string,
    timeAgo: string,
    likes: number
  }
  ```

**6 categories:** Vendor Reviews, Budget Tips, Ceremony Planning, DIY & Crafts, Vendor Hunting, General Chat

**Filters:** Category
**Sorting:** Most Recent, Most Replies, Most Likes

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_threads` | Paginated threads with filters (category) and sorting |
| `get_thread_detail` | Single thread with all replies |
| `create_thread` | Insert new thread |
| `create_reply` | Insert reply to thread |
| `toggle_thread_like` | Like/unlike a thread |
| `toggle_reply_like` | Like/unlike a reply |
| `pin_thread` | Admin-only: pin/unpin a thread |

**Supabase tables touched:** `community_threads`, `community_replies`, `community_likes`

**Critical notes:**
- `author` is currently a plain string. Must become a foreign key to user profiles.
- `timeAgo` on replies is a display string — store `created_at` timestamp and compute relative time in the UI.
- `likes` needs a junction table (`community_likes`) to prevent duplicate likes and enable unlike.
- Need `updated_at` / `last_activity_at` on threads for sorting.
- Consider `reply_count` as a denormalized field (updated via trigger) for efficient sorting.

---

### 1.14 Kasa AI Assistant (`src/pages/Kasa.tsx`)

**Data consumed:**
- localStorage `haraya-kasa` — Array of messages: `{ id, text, sender: 'user'|'kasa', timestamp }`
- 8 hardcoded quick prompts
- 14 keyword-matching response patterns (not real AI)

**Database queries needed:**
| Query | Description |
|-------|-------------|
| `get_chat_history` | Previous messages for current couple |
| `save_message` | Store user message and AI response |

**Supabase tables touched:** `kasa_conversations`, `kasa_messages`

**Notes:**
- Current keyword matching will be replaced with actual AI integration.
- Chat history persistence is nice-to-have for MVP; focus on the AI integration first.
- Consider rate limiting for AI calls.

---

### 1.15 About Page (`src/pages/About.tsx`)

**Data consumed:** All hardcoded content (story, values, contact info, social links). No database interaction needed.

**Notes:** Static page. No Supabase requirements unless you want CMS-like editability later.

---

## 2. Missing Data Fields & Type Gaps

### 2.1 Central `Vendor` Type vs Actual Usage

The `Vendor` type in `src/types/index.ts` is missing fields used across the app:

| Missing Field | Used In | Type | Priority |
|---------------|---------|------|----------|
| `yearsInBusiness` | VendorDashboard | `number` | HIGH |
| `services` | VendorDashboard | `string[]` | HIGH |
| `portfolioImages` | VendorDashboard | `string[]` | HIGH |
| `website` | VendorDashboard | `string` | MEDIUM |
| `tier` | VendorDashboard | `'libre' \| 'pundar' \| 'pangunahin' \| 'natatangi'` | HIGH (monetization) |
| `profileViews` | VendorDashboard (stats) | `number` | LOW |
| `responseRate` | VendorDashboard (stats) | `number` | LOW |

### 2.2 Missing Types (Not in `types/index.ts`)

| Type | Used In | Fields |
|------|---------|--------|
| `Guest` | GuestList.tsx | id, name, email, phone, side, rsvpStatus, dietaryRestrictions[], tableNumber, plusOne, notes |
| `WebsiteData` | CoupleWebsite.tsx | partnerOneName, partnerTwoName, celebrationDate, ceremonyType, venueName, ourStory, coverPhotoUrl, colorTheme, scheduleEvents[], galleryPhotos[], hashtag, entourage[], rsvpEnabled |
| `ScheduleEvent` | CoupleWebsite.tsx | time, title, description |
| `EntourageMember` | CoupleWebsite.tsx | name, role |
| `WebsiteRsvp` | CoupleWebsite.tsx | name, attending, guestCount, message, dietaryRestrictions |
| `CelebrationStory` | Celebrations.tsx | id, coupleName, date, ceremonyType, location, coverImage, summary, vendorCredits[], tips[], photoCount, guestCount, budget |
| `VendorCredit` | Celebrations.tsx | role, name, vendorId? |
| `Thread` | Community.tsx | id, title, author, category, content, replyCount, lastActivity, isPinned, tags[], likes, replies[] |
| `Reply` | Community.tsx | id, author, content, timeAgo, likes |
| `KasaMessage` | Kasa.tsx | id, text, sender, timestamp |
| `VendorInquiryStatus` | VendorDashboard.tsx | 'new' \| 'responded' \| 'booked' |

### 2.3 `Review` Type Gap

Reviews in `mockVendors.ts` include `ceremonyType` but the central types don't define a Review type at all. The mock review structure:
```typescript
{
  id: string;
  vendorId: string;
  reviewerName: string;
  rating: number;        // 1-5
  comment: string;
  date: string;
  ceremonyType: string;
}
```

This needs to become a full type with `coupleId` (foreign key), `verified` boolean, and proper timestamps.

### 2.4 `CoupleProfile` Type Gaps

Current `CoupleProfile` is missing fields used across the app:

| Missing Field | Used In | Type |
|---------------|---------|------|
| `ceremonyType` expanded | Checklist filtering | Currently has limited enum, needs to match full list |
| `customLabels.partner1Label` | GuestList side labels | Already in type but not used |
| `weddingVenue` | CoupleWebsite | `string` |
| `websiteSlug` | CoupleWebsite public URL | `string` |
| `profilePhotoUrl` | Community, Reviews | `string` |

---

## 3. Filtering, Sorting & Index Needs

### 3.1 Database Indexes Required

| Table | Column(s) | Index Type | Reason |
|-------|-----------|------------|--------|
| `vendors` | `category` | B-tree | Category filter on Vendors page |
| `vendors` | `location` | B-tree | Location filter on Vendors page |
| `vendors` | `rating` | B-tree DESC | Sorting by rating, featured vendors query |
| `vendors` | `price_range_min`, `price_range_max` | B-tree | Price range filter |
| `vendors` | `all_celebrations_welcome` | B-tree | ACW filter toggle |
| `vendors` | `is_verified` | B-tree | Verified vendor filter |
| `vendors` | `name`, `description` | GIN (tsvector) | Full-text search |
| `reviews` | `vendor_id` | B-tree | Reviews per vendor |
| `reviews` | `vendor_id`, `rating` | B-tree | Average rating calculation |
| `favorites` | `couple_id` | B-tree | User's favorites list |
| `favorites` | `couple_id`, `vendor_id` | UNIQUE | Prevent duplicate favorites |
| `inquiries` | `vendor_id` | B-tree | Vendor's inquiry list |
| `inquiries` | `couple_id` | B-tree | Couple's sent inquiries |
| `inquiries` | `vendor_id`, `status` | B-tree | Filtered inquiry list on dashboard |
| `guests` | `couple_id` | B-tree | Couple's guest list |
| `guests` | `couple_id`, `rsvp_status` | B-tree | RSVP status filter |
| `community_threads` | `category` | B-tree | Category filter |
| `community_threads` | `created_at` | B-tree DESC | Sort by recent |
| `community_threads` | `reply_count` | B-tree DESC | Sort by most replies |
| `community_threads` | `likes` | B-tree DESC | Sort by most likes |
| `community_replies` | `thread_id` | B-tree | Replies per thread |
| `couple_checklist_items` | `couple_id` | B-tree | Couple's checklist |
| `budget_categories` | `couple_id` | B-tree | Couple's budget |
| `couple_websites` | `slug` | UNIQUE | Public URL lookup |
| `celebrations` | `ceremony_type` | B-tree | Ceremony type filter |
| `celebrations` | `status` | B-tree | Published stories only |

### 3.2 Full-Text Search

The vendor search on `Vendors.tsx` currently does:
```typescript
const matchesSearch = vendor.name.toLowerCase().includes(search) ||
  vendor.description.toLowerCase().includes(search) ||
  vendor.tags.some(tag => tag.toLowerCase().includes(search));
```

**Supabase implementation:**
- Create a `search_vector` column using `tsvector` on `name`, `description`, and `tags`
- Create a GIN index on the `search_vector`
- Use Supabase's `.textSearch()` method
- Alternatively, use `.or()` with `.ilike()` for simpler implementation (less performant at scale)

### 3.3 Sorting Requirements by Page

| Page | Sort Options | Default |
|------|-------------|---------|
| Vendors | Rating (high-low), Price (low-high), Price (high-low), Name (A-Z), Review count | Rating desc |
| Favorites | Date added (newest), Rating (highest), Price (lowest) | Date added |
| Guest List | Name (A-Z), Side, RSVP Status, Table Number | Name |
| Community | Most Recent, Most Replies, Most Likes | Most Recent |
| Celebrations | Date (newest) | Date desc |

---

## 4. User Flow Analysis (Auth vs Public)

### 4.1 Authentication Requirements

| Page/Feature | Auth Required? | User Type | Notes |
|--------------|---------------|-----------|-------|
| Home | No | Public | Fully public |
| Vendor Directory | No | Public | Search and browse without login |
| Vendor Profile | No (view) / Yes (inquiry, favorite, review) | Public / Couple | View is public; actions require auth |
| Plan (Checklist + Budget) | Yes | Couple | Personal planning data |
| Matchmaker Quiz | No (take quiz) / Yes (save results) | Public / Couple | Quiz works without login; saving requires auth |
| Favorites | Yes | Couple | Personal favorites list |
| Guest List | Yes | Couple | Personal guest data |
| Couple Website | Yes (edit) / No (public view) | Couple / Public | Edit requires auth; public website is viewable by anyone |
| Celebrations | No (view) / Yes (submit) | Public / Couple | View stories publicly; submit requires auth |
| Vendor Dashboard | Yes | Vendor | Vendor-only area |
| Community | No (view) / Yes (post, reply, like) | Public / Any Auth | Read without login; participate requires auth |
| Kasa | Yes | Couple | Chat history tied to account |
| About | No | Public | Static content |

### 4.2 Two User Types

**Couple accounts:**
- Can favorite vendors, submit inquiries, write reviews
- Can use planning tools (checklist, budget, guest list)
- Can build a couple website
- Can submit celebration stories
- Can participate in community

**Vendor accounts:**
- Can claim/manage their vendor profile
- Can respond to inquiries
- Can view dashboard analytics
- Can participate in community
- Cannot favorite vendors or use couple planning tools

### 4.3 Row Level Security (RLS) Policies Needed

| Table | Policy | Description |
|-------|--------|-------------|
| `vendors` | Public read | Anyone can view vendor listings |
| `vendors` | Vendor self-edit | Vendors can only edit their own profile |
| `reviews` | Public read | Anyone can view reviews |
| `reviews` | Couple insert | Only authenticated couples can write reviews |
| `reviews` | Author edit/delete | Only the review author can modify their review |
| `inquiries` | Couple insert | Couples can submit inquiries |
| `inquiries` | Couple read own | Couples see their sent inquiries |
| `inquiries` | Vendor read own | Vendors see inquiries sent to them |
| `inquiries` | Vendor update status | Vendors can update inquiry status |
| `favorites` | Couple CRUD own | Couples manage their own favorites |
| `guests` | Couple CRUD own | Couples manage their own guest list |
| `couple_checklist_items` | Couple CRUD own | Couples manage their own checklist |
| `budget_categories` | Couple CRUD own | Couples manage their own budget |
| `couple_websites` | Couple CRUD own | Couples manage their own website |
| `couple_websites` | Public read (published) | Anyone can view published websites via slug |
| `website_rsvps` | Public insert | Unauthenticated guests can submit RSVPs |
| `website_rsvps` | Couple read own | Couples see RSVPs for their website |
| `community_threads` | Public read | Anyone can view threads |
| `community_threads` | Auth insert | Any authenticated user can create threads |
| `community_threads` | Author edit/delete | Only thread author can modify |
| `community_replies` | Public read | Anyone can view replies |
| `community_replies` | Auth insert | Any authenticated user can reply |
| `community_likes` | Auth CRUD own | Authenticated users manage their own likes |
| `celebrations` | Public read (published) | Anyone can view published stories |
| `celebrations` | Couple insert | Couples can submit stories |
| `celebrations` | Admin moderate | Admins can approve/reject stories |

---

## 5. Real-Time Subscription Needs

### 5.1 High Priority (Should be real-time)

| Feature | Table | Event | Reason |
|---------|-------|-------|--------|
| Vendor inquiry notifications | `inquiries` | INSERT | Vendors need instant notification when a couple sends an inquiry |
| Inquiry status updates | `inquiries` | UPDATE (status) | Couples should see when vendor responds |
| Community thread replies | `community_replies` | INSERT | Users viewing a thread should see new replies in real-time |
| Community likes | `community_likes` | INSERT/DELETE | Like counts should update live |
| Website RSVP submissions | `website_rsvps` | INSERT | Couples should see new RSVPs immediately |

### 5.2 Medium Priority (Nice-to-have real-time)

| Feature | Table | Event | Reason |
|---------|-------|-------|--------|
| New vendor reviews | `reviews` | INSERT | Vendor dashboard metric updates |
| Guest list RSVP changes | `guests` | UPDATE | If guests can self-RSVP via website |
| Kasa chat messages | `kasa_messages` | INSERT | If AI responses are processed asynchronously |

### 5.3 Low Priority (Polling or manual refresh is fine)

| Feature | Table | Reason |
|---------|-------|--------|
| Vendor profile views | `vendor_stats` | Analytics, not time-critical |
| Celebration story approval | `celebrations` | Admin workflow, not urgent |
| Checklist/budget sync | `couple_checklist_items`, `budget_categories` | Single-user editing, no collaboration needed |

### 5.4 Supabase Realtime Implementation

```typescript
// Example: Listen for new inquiries (Vendor Dashboard)
const channel = supabase
  .channel('vendor-inquiries')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'inquiries',
    filter: `vendor_id=eq.${vendorId}`
  }, (payload) => {
    // Add new inquiry to state
  })
  .subscribe();

// Example: Listen for new community replies
const channel = supabase
  .channel('thread-replies')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'community_replies',
    filter: `thread_id=eq.${threadId}`
  }, (payload) => {
    // Append new reply
  })
  .subscribe();
```

---

## 6. Recommendations

### 6.1 Critical (Must Fix Before Launch)

1. **Unify type definitions.** Many pages define local types that duplicate or extend the central types. All types should live in `src/types/index.ts` and be the single source of truth. This prevents drift between the frontend and database schema.

2. **Move vendor search/filtering to server-side.** Loading 317+ vendors client-side and filtering in JavaScript will not scale. With Supabase, use server-side queries with `.select()`, `.eq()`, `.ilike()`, `.gte()`, `.lte()`, `.range()`, and `.textSearch()`.

3. **Replace all hardcoded mock data with database queries.** Priorities:
   - `mockVendors.ts` → `vendors` table (highest impact, used by 4+ pages)
   - Mock reviews → `reviews` table
   - Matchmaker mock recommendations → real vendor query
   - Celebration stories → `celebrations` table
   - Community threads → `community_threads` table

4. **Implement proper auth flow.** Almost every interactive feature (favorites, inquiries, planning tools, guest list, website builder, community posting) requires knowing the current user. Auth is the foundation for all of these.

5. **Connect inquiry form to database.** The VendorProfile inquiry form is the core conversion action (couple → vendor lead). This is the most business-critical database operation.

### 6.2 High Priority (Should Fix Soon)

6. **Add sorting to Vendor Directory.** Users currently cannot sort vendors by rating, price, or review count. This is a significant usability gap. Add sorting server-side.

7. **Store vendor `tier` for monetization.** The vendor tier system (libre/pundar/pangunahin/natatangi) is the planned revenue model. Needs its own column or subscription table.

8. **Link community authors to user profiles.** Thread and reply authors are currently plain strings. Must be foreign keys to enable profile linking, reputation, and moderation.

9. **Add `updated_at` timestamps everywhere.** Many entities (vendors, threads, inquiries) need `updated_at` for sorting by "most recent activity" and cache invalidation.

10. **Normalize ceremony types.** Multiple pages use slightly different ceremony type lists. Define a single enum table or shared constant.

### 6.3 Medium Priority (Nice to Have)

11. **Add vendor search analytics.** Track what users search for, which categories are most browsed, which filters are most used. This data informs vendor recruitment strategy.

12. **Implement optimistic UI updates.** For actions like favoriting, liking, and toggling checklist items — update the UI immediately and sync to Supabase in the background.

13. **Add image upload pipeline.** Multiple features need image uploads (vendor portfolio, couple website, celebration stories). Implement a shared Supabase Storage upload utility with image optimization.

14. **Implement `website_slug` generation.** Couple websites need unique public URLs. Generate slug from partner names with collision handling (e.g., `partner1-and-partner2`, `partner1-and-partner2-2`).

15. **Denormalize frequently accessed counts.** Fields like `reply_count`, `like_count`, `review_count`, and `average_rating` should be denormalized on the parent record and updated via database triggers for performant queries.

### 6.4 localStorage Key Migration Map

| Current localStorage Key | Target Supabase Table(s) |
|--------------------------|--------------------------|
| `haraya-checklist` | `couple_checklist_items` |
| `haraya-ceremony-type` | `couple_profiles.ceremony_type` |
| `haraya-budget` | `couple_budgets`, `budget_categories` |
| `haraya-favorites` | `favorites` |
| `haraya-guestlist` | `guests` |
| `haraya-celebration-website` | `couple_websites`, `website_schedule_events`, `website_entourage`, `website_gallery` |
| `haraya-vendor-dashboard` | `vendors` (vendor's own profile) |
| `haraya-community` | `community_threads`, `community_replies` |
| `haraya-kasa` | `kasa_conversations`, `kasa_messages` |
| `matchmaker-results` | `matchmaker_responses` |

### 6.5 Supabase Storage Buckets Needed

| Bucket | Purpose | Access |
|--------|---------|--------|
| `vendor-images` | Vendor profile photos, portfolio images | Public read, vendor write (own) |
| `website-photos` | Couple website cover photos, gallery | Public read, couple write (own) |
| `celebration-photos` | Real celebration story photos | Public read, couple write (own) |
| `user-avatars` | Profile photos for community | Public read, user write (own) |

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total pages analyzed | 15 |
| Total components analyzed | 3 (Checklist, BudgetTracker, VendorCard) |
| Supabase tables needed | ~25 |
| Storage buckets needed | 4 |
| Real-time subscriptions | 5 high priority, 3 medium |
| Missing type definitions | 10+ |
| localStorage keys to migrate | 10 |
| RLS policies needed | 20+ |
| Database indexes needed | 22+ |

---

*This report should be used as the primary reference for designing the Supabase database schema and planning the migration from localStorage to server-side persistence.*
