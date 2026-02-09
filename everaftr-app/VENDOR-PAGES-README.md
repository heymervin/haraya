# Vendor Directory & Profile Pages - Implementation Summary

## Files Created

### Pages
- `/src/pages/Vendors.tsx` - Main vendor directory with search and filtering
- `/src/pages/VendorProfile.tsx` - Individual vendor profile page

### Components
- `/src/components/VendorCard.tsx` - Reusable vendor card component
- `/src/components/StarRating.tsx` - Reusable star rating component

### Data
- `/src/data/mockVendors.ts` - Mock vendor data with 12 vendors and reviews

### Routing
- Updated `/src/App.tsx` to include routes for vendor pages

## Design Implementation

### Color Palette (Inabel Textile)
Following the Woven Heritage design system, the vendor directory uses:
- **Indigo (#3D4F7C)**: Filter chips, category badges, info states
- **Red (#C73E3A)**: Error states, alerts
- **Gold (#C4962E)**: Star ratings, premium highlights
- **Cream (#F0E8D4)**: Warm backgrounds

### Universal Colors
- Background: #FDFAF3
- Text Primary: #2A2520
- Text Secondary: #5A4F45
- Border: #D9CEBC
- Heritage Red (#8B3A3A): Primary CTAs

### Typography
- **Jost**: Body text, UI elements, navigation (font-light 300, font-medium 500)
- **Cormorant Garamond**: Page titles, section headings (font-light 300)

### Badge Colors
- **Verified**: Green (#4A7C59) - Hablon palette
- **All Celebrations Welcome**: Violet (#5C4A7C) - Langkit palette

## Features Implemented

### Vendor Directory Page (`/vendors`)

**Header Section:**
- Page title: "Find Your Vendors" (Cormorant Garamond Light)
- Subtitle with inclusive language
- Woven border thin separator

**Search & Filter Bar:**
- Text search (searches name, description, tags)
- Category dropdown (All, Venues, Photo & Video, etc.)
- Location dropdown (Metro Manila, Cebu, Tagaytay, etc.)
- Price range filter (Budget: under ₱30K, Mid-range: ₱30K-100K, Premium: ₱100K+)
- "All Celebrations Welcome" toggle checkbox
- Mobile: Collapsible filter panel with "Filters" button
- Clear filters button when active

**Vendor Grid:**
- Responsive: 3 columns desktop, 2 tablet, 1 mobile
- Each card shows:
  - Vendor image with hover scale effect
  - Category badge (top left)
  - Verified + ACW badges (top right)
  - Vendor name with hover color change
  - Location with map pin icon
  - Price range formatted as ₱XX,XXX - ₱XX,XXX
  - Star rating with review count
  - Top 3 tags + "more" indicator
- Card hover: translateY(-2px) + shadow
- Links to individual vendor profile

**Results:**
- "Showing X vendors" count
- Empty state with clear filters CTA

### Vendor Profile Page (`/vendors/:id`)

**Header:**
- Back button to directory
- Hero image (large, rounded corners)
- Vendor name (Cormorant Garamond 3xl-5xl)
- Category badge + location
- Verified + ACW badges
- Starting price prominently displayed
- Star rating with review count

**Content Sections:**
- **About**: Full vendor description
- **Services**: All tags displayed as styled chips
- **Pricing**: Price range in large card with contact note
- **Availability**: Monthly availability shown as green chips with calendar icon
- **Reviews**: Full review cards with reviewer name, date, rating, and comment

**Sidebar (Desktop) / Mobile Sticky Bar:**
- Contact information (email, phone, Instagram, Facebook) with icons
- "Inquire Now" button
- Collapsible inquiry form with fields:
  - Your name (required)
  - Email (required)
  - Celebration date (required)
  - Message (required, textarea)
  - Submit button

**Mobile Optimization:**
- Sticky CTA bar at bottom
- Inquiry form slides in when activated
- Responsive layout switches to single column

## Mock Data

12 diverse vendors created:
1. Villa Escudero Resort (Venue) - ₱150K-400K
2. Jason Magbanua Photography (Photo/Video) - ₱80K-200K
3. Chef Laudico Catering - ₱35K-120K
4. Teddy Manuel (Hair & Makeup) - ₱15K-40K
5. La Belle Fete Events (Coordination) - ₱45K-150K
6. Tagaytay Highlands (Venue) - ₱200K-500K
7. Nice Print Photography (Photo/Video, Cebu) - ₱45K-120K
8. Gourmet Gypsy Art Cafe (Catering) - ₱25K-80K
9. Blush & Bloom Co. (Flowers) - ₱30K-150K
10. Hizon's Catering - ₱30K-200K
11. The Palladium (Venue) - ₱180K-450K
12. Drew Arellano Photography - ₱60K-180K

7 mock reviews with Filipino names and realistic comments.

## Technical Details

### Routing Structure
```
/ → Vendors directory
/vendors → Vendors directory
/vendors/:id → Individual vendor profile
```

### State Management
- React useState for all filters
- useMemo for optimized filtering
- No external state library needed for MVP

### Filtering Logic
All filters work together (AND logic):
- Search query matches name, description, or tags
- Category filter (exact match or "All")
- Location filter (includes match or "All")
- Price range filter (budget bands)
- ACW toggle (boolean filter)

### Price Formatting
- Uses toLocaleString('en-PH') for comma separation
- Shows range as ₱XX,XXX - ₱XX,XXX
- Profile page shows "Starting at ₱XX,XXX"

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Minimum font size 11px (badges) to 16px (body)
- Color contrast follows WCAG AA standards

## Design Patterns

### Card Design
- 8px border-radius
- Border-first (no default shadow)
- Shadow only on hover: `0 8px 30px rgba(42,37,32,0.08)`
- Smooth transitions: 300ms ease

### Badge Sizing
- Text: 11px minimum (increased from 9px for readability)
- Padding: px-2.5 py-1
- Font-weight: medium
- Letter-spacing: tracking-wide
- Text-transform: uppercase

### Responsive Breakpoints
- Mobile: < 768px (1 column)
- Tablet: 768px-1024px (2 columns)
- Desktop: > 1024px (3 columns)

## Inclusive Language

Following the brand guide's mandatory requirements:
- No "bride/groom" language anywhere
- "Your celebration" not "your wedding" where appropriate
- "All Celebrations Welcome" badge for inclusive vendors
- Neutral, warm, personal language throughout
- "Celebration date" not "wedding date" in forms

## Pattern Background

Applied `.pattern-inabel` to the vendor directory page:
- Subtle crossing diagonal lines
- Indigo color at 0.06 opacity
- Creates texture without distraction
- Matches Inabel textile theme for directory section

## Next Steps

### For Integration:
1. Replace mock data with Supabase queries
2. Connect inquiry form to Resend email service
3. Add authentication for favorites feature
4. Implement image optimization
5. Add SEO meta tags per vendor

### For Enhancement:
1. Add vendor image gallery/lightbox
2. Implement favorites/shortlist feature
3. Add map view for vendor locations
4. Create comparison feature
5. Add share functionality
6. Implement real review system

## Development Server

The pages are now live at:
- http://localhost:3001/ (redirects to /vendors)
- http://localhost:3001/vendors (directory)
- http://localhost:3001/vendors/v1 (example profile)

## File Paths (Absolute)

- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/pages/Vendors.tsx`
- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/pages/VendorProfile.tsx`
- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/components/VendorCard.tsx`
- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/components/StarRating.tsx`
- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/data/mockVendors.ts`
- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/App.tsx`
- `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/index.css`
