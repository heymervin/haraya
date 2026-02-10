# KASA AI Product Specification -- Part 2: Feature Spec

---

# PART 2: KASA AI FEATURE SPEC

## 2.1 Product Overview

**Kasa** (Filipino for "home" -- evoking the home the couple is building together) is everaftr's AI wedding planning assistant. It lives in the Langkit section of the platform (magenta, gold, violet color palette) and acts as a knowledgeable, warm, and inclusive wedding planning companion.

**Core value proposition:** Kasa gives every Filipino couple access to the knowledge of an experienced wedding coordinator, regardless of their budget or location.

**Personality traits:**
- Warm and encouraging, like a supportive ate/kuya who happens to know everything about weddings
- Speaks in friendly Taglish (mix of Tagalog and English, natural code-switching)
- Never judgmental about budget, ceremony type, or couple composition
- Proactively flags potential timing issues before they become problems
- Celebrates milestones with the couple ("Congratulations, venue is booked!")
- Uses Filipino wedding terminology naturally (ninang, arrhae, Pre-Cana, etc.)

---

## 2.2 Onboarding Flow

When a couple first interacts with Kasa, the AI gathers essential information through a friendly conversational onboarding. This can also be presented as a guided form that feeds into the AI context.

### Step 1: Welcome and Names
```
Kasa: "Hello! I'm Kasa, your wedding planning assistant here at everaftr.
Excited to help you plan your celebration! First, what should I call
you and your partner?"

Input: Two name fields (using everaftr's inclusive labels: "You" and "Your Partner")
```

### Step 2: Celebration Date
```
Kasa: "When is your target celebration date? If you don't have an exact
date yet, an approximate month and year works too!"

Input: Date picker or "Not sure yet" option
System: Calculates months/weeks remaining and determines timeline mode
  - 9+ months = month-by-month timeline
  - 4-8 months = bi-weekly timeline
  - Under 4 months = week-by-week timeline
```

### Step 3: Ceremony Type
```
Kasa: "What type of ceremony are you planning?"

Options:
  - Catholic (Church Wedding)
  - Church - INC (Iglesia ni Cristo)
  - Church - Other Christian denomination
  - Muslim (Nikah)
  - Civil Ceremony
  - Commitment Ceremony / Civil Union
  - Interfaith
  - Not sure yet

Note: If "Not sure yet" is selected, Kasa provides a brief comparison
of ceremony types and their timeline implications to help the couple decide.
```

### Step 4: Budget Range
```
Kasa: "What's your estimated budget for the entire celebration?
Don't worry -- there's no wrong answer here. Kasa can work with any budget!"

Options (pre-set ranges with custom option):
  - Under PHP 100,000
  - PHP 100,000 - 200,000
  - PHP 200,000 - 500,000
  - PHP 500,000 - 1,000,000
  - PHP 1,000,000 - 2,000,000
  - Over PHP 2,000,000
  - Custom amount
  - Prefer not to say
```

### Step 5: Location
```
Kasa: "Where are you planning to celebrate? This helps me recommend
vendors and understand logistics."

Input: Location search with auto-suggest
  - Metro Manila (with city/area specificity)
  - Cavite, Laguna, Batangas, Rizal, Bulacan (CALABARZON)
  - Tagaytay (special case -- destination wedding hub)
  - Cebu
  - Davao
  - Other province (free text)
  - Destination / Not decided yet
```

### Step 6: Guest Count Estimate
```
Kasa: "Roughly how many guests are you expecting? This affects venue
size, catering, and your overall budget."

Options:
  - Intimate (under 50)
  - Small (50-100)
  - Medium (100-200)
  - Large (200-300)
  - Very Large (300+)
  - Not sure yet
```

### Step 7: Initial Priorities (Optional)
```
Kasa: "Last question! What matters most to you for your celebration?
Pick your top 3."

Options (multi-select, max 3):
  - Beautiful venue
  - Amazing food
  - Great photos and video
  - Stunning styling and flowers
  - Live music or entertainment
  - Designer attire
  - Keeping costs low
  - Minimal stress
  - Cultural/traditional elements
  - Unique and non-traditional
```

### After Onboarding: Timeline Generation
```
Kasa: "Salamat, [Name1] and [Name2]! Based on everything you've shared,
your celebration is [X months / X weeks] away. I've created your
personalized planning timeline. Let me walk you through it!"

[Generates and displays the dynamic timeline]
```

---

## 2.3 Dynamic Timeline Generation Algorithm

### Core Logic

```
INPUTS:
  - celebration_date: Date
  - ceremony_type: CeremonyType
  - budget_range: BudgetRange
  - location: Location
  - guest_count: GuestCountRange
  - today: Date

CALCULATE:
  - total_days = celebration_date - today
  - total_weeks = floor(total_days / 7)
  - total_months = floor(total_days / 30)

DETERMINE TIMELINE MODE:
  - IF total_months >= 9: MODE = "MONTHLY" (month-by-month tasks)
  - IF total_months >= 4 AND total_months < 9: MODE = "BIWEEKLY"
  - IF total_months < 4: MODE = "WEEKLY" (week-by-week tasks)

GENERATE TIMELINE:
  1. Load base_tasks for ceremony_type
  2. Load document_tasks for ceremony_type (with processing times)
  3. Load cultural_tasks (Filipino-specific items)
  4. Load budget_aware_tasks based on budget_range
  5. Apply task_dependencies to order tasks correctly
  6. Distribute tasks across available time periods
  7. Add buffer time for critical-path items
  8. Flag any tasks that are already overdue or at risk
```

### Task Distribution Rules

```
PRIORITY TIERS:

TIER 1 - CRITICAL (Must happen first, have long lead times):
  - Venue booking
  - Church/mosque/officiant booking
  - Pre-Cana seminar scheduling (Catholic)
  - CENOMAR application
  - Photographer/videographer booking

TIER 2 - IMPORTANT (Depend on Tier 1, medium lead time):
  - Caterer booking (depends on venue)
  - Stylist/florist booking
  - Host/emcee booking
  - Entourage invitations
  - Save-the-dates
  - Attire shopping begins
  - Music/entertainment booking

TIER 3 - DETAIL WORK (Depend on Tier 2, shorter lead time):
  - Menu tasting and finalization
  - Invitation design and printing
  - Barong/gown fittings
  - Hotel block for guests
  - Transportation arrangements
  - Favors and giveaways
  - Arrhae, cord, veil preparation

TIER 4 - FINAL PREPARATIONS (Last 4-6 weeks):
  - Marriage license application (must be within 120 days of wedding)
  - Final vendor confirmations
  - Final fittings
  - Day-of timeline creation
  - Rehearsal scheduling
  - Final headcount to caterer
  - Vendor final payments
  - Emergency kit preparation

TIER 5 - WEEK OF:
  - Final venue walkthrough
  - Vendor coordination meeting
  - Rehearsal dinner
  - Pack for honeymoon
  - Prepare vendor tip envelopes
  - Emergency contact list
```

### Compression Algorithm

When time is limited, the algorithm compresses by:

1. **Parallelizing tasks:** In a 12-month timeline, venue research happens in month 12 and booking in month 11. In a 3-month timeline, research and booking happen in the same week.

2. **Eliminating optional tasks:** DIY projects, elaborate save-the-dates, and extensive venue touring get cut in compressed timelines.

3. **Adding urgency flags:** Tasks that would normally have 2-month lead times get flagged as "BOOK IMMEDIATELY" in compressed timelines.

4. **Suggesting ceremony-type switches:** If a couple selects Catholic with only 2 months, Kasa gently mentions that civil may be more practical and asks if they want both timelines to compare.

5. **Budget-based compression:** Lower budgets in compressed timelines trigger suggestions for all-in-one packages rather than individual vendor booking.

### Dependency Graph

```
venue_booked
  --> caterer_booked (venue determines catering options/corkage)
  --> stylist_booked (stylist needs to see venue)
  --> save_the_dates_sent (need venue details for invites)

ceremony_booked (church/mosque/city hall)
  --> pre_cana_scheduled (Catholic: must be done at the parish)
  --> canonical_interview (Catholic: scheduled by parish)
  --> rehearsal_scheduled

photographer_booked
  --> prenup_shoot_scheduled
  --> save_the_dates_designed (if using prenup photos)

cenomar_obtained
  --> marriage_license_applied (CENOMAR is a requirement)
    --> marriage_license_issued (10-day posting)

baptismal_cert_obtained (Catholic)
  --> submitted_to_parish

confirmation_cert_obtained (Catholic)
  --> submitted_to_parish

guest_list_finalized
  --> invitations_sent
  --> final_headcount_to_caterer
  --> seating_arrangement

entourage_confirmed
  --> secondary_sponsors_assigned (cord, veil, arrhae)
  --> entourage_attire_coordinated
  --> rehearsal_scheduled

attire_selected
  --> fittings_scheduled (multiple sessions)
  --> final_fitting (2-3 weeks before)

mahr_agreed (Muslim)
  --> nikah_preparations

imam_booked (Muslim)
  --> walima_planned
```

---

## 2.4 Ceremony-Specific Task Templates

### Catholic Wedding Task Template

```json
{
  "ceremony_type": "Catholic",
  "unique_tasks": [
    {
      "id": "catholic_church_booking",
      "title": "Book your church/parish",
      "description": "Contact your chosen parish to reserve your wedding date. Popular churches book 6-12 months ahead.",
      "ideal_lead_time_months": 12,
      "minimum_lead_time_months": 4,
      "critical": true,
      "dependencies": [],
      "tips": "Visit the parish office in person. Ask about available dates, ceremony times, and their specific requirements. Some parishes only allow weddings on Saturdays."
    },
    {
      "id": "catholic_pre_cana",
      "title": "Attend Pre-Cana / Pre-Marriage Seminar",
      "description": "Both partners must attend. Usually a half-day seminar. Certificate is given same day.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": true,
      "dependencies": ["catholic_church_booking"],
      "tips": "Check your parish schedule immediately -- some only hold seminars monthly or quarterly. You can also attend at Catholic Engaged Encounter (CEE), CEFAM, or Discovery Weekend Philippines. Online options are now available."
    },
    {
      "id": "catholic_canonical_interview",
      "title": "Complete Canonical Interview",
      "description": "The parish priest interviews both partners separately. Standard procedure for all Catholic weddings.",
      "ideal_lead_time_months": 4,
      "minimum_lead_time_months": 2,
      "critical": true,
      "dependencies": ["catholic_church_booking"],
      "tips": "Be honest and relaxed. The priest wants to make sure both of you are entering the marriage freely."
    },
    {
      "id": "catholic_baptismal_cert",
      "title": "Obtain Baptismal Certificate (for marriage purposes)",
      "description": "Request from the parish where you were baptized. Must have 'FOR MARRIAGE PURPOSES' annotation.",
      "ideal_lead_time_months": 5,
      "minimum_lead_time_months": 3,
      "critical": true,
      "processing_time_weeks": 3,
      "validity_months": 6,
      "dependencies": [],
      "tips": "If you were baptized in a different province, request early -- it can take 2-3 weeks by mail. Some parishes now accept email requests."
    },
    {
      "id": "catholic_confirmation_cert",
      "title": "Obtain Confirmation Certificate",
      "description": "Request from the parish where you received the Sacrament of Confirmation.",
      "ideal_lead_time_months": 5,
      "minimum_lead_time_months": 3,
      "critical": true,
      "processing_time_weeks": 3,
      "validity_months": 6,
      "dependencies": [],
      "tips": "If you are not confirmed, you may need to receive the sacrament before the wedding. Talk to your parish priest."
    },
    {
      "id": "catholic_mixed_marriage_permit",
      "title": "Apply for Permit for Mixed Marriage",
      "description": "Required if one partner is not Catholic. Obtained from the diocese.",
      "ideal_lead_time_months": 4,
      "minimum_lead_time_months": 2,
      "critical": true,
      "conditional": "one_partner_non_catholic",
      "processing_time_weeks": 4,
      "dependencies": [],
      "tips": "Process this early -- diocesan offices can be slow."
    },
    {
      "id": "catholic_sponsors",
      "title": "Confirm Principal Sponsors (Ninong/Ninang)",
      "description": "Traditionally married couples who serve as your wedding godparents. They sign the marriage certificate.",
      "ideal_lead_time_months": 8,
      "minimum_lead_time_months": 3,
      "critical": false,
      "dependencies": [],
      "tips": "Most Catholic parishes require 2-4 pairs of principal sponsors. They should be confirmed Catholics in good standing. Ask them early -- it is an honor and a responsibility."
    },
    {
      "id": "catholic_secondary_sponsors",
      "title": "Assign Secondary Sponsors (Cord, Veil, Arrhae)",
      "description": "These sponsors handle the cord, veil, and arrhae (13 coins) ceremonies during the mass.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": false,
      "dependencies": ["catholic_sponsors"],
      "tips": "You need one pair each for cord, veil, and arrhae. Also assign candle sponsors if your parish includes the unity candle ceremony."
    },
    {
      "id": "catholic_arrhae",
      "title": "Purchase or prepare Arrhae (13 coins)",
      "description": "The 13 coins symbolize prosperity and are part of the wedding rites.",
      "ideal_lead_time_months": 3,
      "minimum_lead_time_months": 1,
      "critical": false,
      "dependencies": [],
      "tips": "You can buy ready-made arrhae sets, have them custom-made, or use family heirloom coins. Some couples use PHP coins in a decorative pouch."
    },
    {
      "id": "catholic_cord_veil",
      "title": "Prepare Cord and Veil for ceremony",
      "description": "The cord (symbolizing eternal bond) and veil (symbolizing unity) are draped over the couple during mass.",
      "ideal_lead_time_months": 2,
      "minimum_lead_time_months": 1,
      "critical": false,
      "dependencies": [],
      "tips": "Some parishes provide these. Check with your church if you can bring your own or if they have specific requirements."
    },
    {
      "id": "catholic_rehearsal",
      "title": "Church Rehearsal",
      "description": "Practice the ceremony with your entourage at the church. Usually scheduled 1-2 weeks before the wedding.",
      "ideal_lead_time_weeks": 2,
      "minimum_lead_time_weeks": 1,
      "critical": true,
      "dependencies": ["catholic_church_booking", "catholic_sponsors", "catholic_secondary_sponsors"],
      "tips": "All sponsors and the full entourage should attend. Coordinate schedules early."
    }
  ]
}
```

### Civil Ceremony Task Template

```json
{
  "ceremony_type": "Civil",
  "unique_tasks": [
    {
      "id": "civil_schedule",
      "title": "Schedule Civil Ceremony at City/Municipal Hall",
      "description": "Contact the Local Civil Registrar to reserve your ceremony date and time.",
      "ideal_lead_time_months": 3,
      "minimum_lead_time_months": 1,
      "critical": true,
      "dependencies": [],
      "tips": "Some city halls have specific days for civil ceremonies (e.g., Tuesdays and Thursdays). Call ahead to check the schedule."
    },
    {
      "id": "civil_pre_marriage_counseling",
      "title": "Attend Pre-Marriage Counseling",
      "description": "Required for all civil weddings. Usually conducted by the city/municipal social welfare office.",
      "ideal_lead_time_months": 2,
      "minimum_lead_time_months": 1,
      "critical": true,
      "dependencies": [],
      "tips": "This is separate from the Catholic Pre-Cana. It is a government requirement. Usually a 1-day seminar."
    },
    {
      "id": "civil_marriage_license",
      "title": "Apply for Marriage License",
      "description": "Apply at the Local Civil Registrar. Requires 10-day posting period. License is valid for 120 days.",
      "ideal_lead_time_months": 2,
      "minimum_lead_time_weeks": 3,
      "critical": true,
      "dependencies": ["civil_cenomar", "civil_pre_marriage_counseling"],
      "tips": "The 10-day posting period is mandatory and cannot be shortened (except for life-threatening emergencies). Plan accordingly. Apply at the LCR of either partner's city/municipality."
    }
  ]
}
```

### Muslim Wedding (Nikah) Task Template

```json
{
  "ceremony_type": "Muslim",
  "unique_tasks": [
    {
      "id": "muslim_imam_booking",
      "title": "Book Imam / Ustadz / Shari'a Judge",
      "description": "Identify a recognized officiant registered with the Office of Muslim Affairs or PSA.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": true,
      "dependencies": [],
      "tips": "Verify that the imam has valid solemnizing authority under PD 1083 (Code of Muslim Personal Laws)."
    },
    {
      "id": "muslim_mahr",
      "title": "Discuss and Agree on Mahr (Dowry)",
      "description": "The mahr is the groom's gift to the bride, agreed upon between the families.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": true,
      "dependencies": [],
      "tips": "The mahr can be monetary or non-monetary (property, gold, etc.). This is an important family discussion that should happen early in the planning process."
    },
    {
      "id": "muslim_witnesses",
      "title": "Confirm Muslim Witnesses",
      "description": "At least two competent Muslim witnesses must be present at the Nikah.",
      "ideal_lead_time_months": 3,
      "minimum_lead_time_months": 1,
      "critical": true,
      "dependencies": [],
      "tips": "Witnesses must be Muslim. Depending on the school of thought, you may need two male witnesses, or one male and two female witnesses."
    },
    {
      "id": "muslim_mosque_booking",
      "title": "Book Mosque (if applicable)",
      "description": "Reserve the mosque if the Nikah will be held there.",
      "ideal_lead_time_months": 4,
      "minimum_lead_time_months": 1,
      "critical": false,
      "conditional": "ceremony_at_mosque",
      "dependencies": [],
      "tips": "Not all Nikahs are at mosques. Many are held at homes or event venues. Confirm with your imam."
    },
    {
      "id": "muslim_walima",
      "title": "Plan Walima (Wedding Feast)",
      "description": "The walima is the celebratory feast after the Nikah. Plan the venue, menu, and guest list.",
      "ideal_lead_time_months": 4,
      "minimum_lead_time_months": 2,
      "critical": false,
      "dependencies": ["muslim_imam_booking"],
      "tips": "The walima is sunnah (recommended practice). It can be as simple or elaborate as the couple wishes."
    },
    {
      "id": "muslim_family_meetings",
      "title": "Family Meetings / Marriage Negotiation",
      "description": "Traditional family meetings between both sides to discuss marriage arrangements.",
      "ideal_lead_time_months": 8,
      "minimum_lead_time_months": 3,
      "critical": false,
      "dependencies": [],
      "tips": "In Filipino Muslim culture, this process (pamamanhikan or its local equivalent) is important. Respect the traditions of both families."
    },
    {
      "id": "muslim_psa_registration",
      "title": "Register Marriage with PSA",
      "description": "While the Nikah is valid under Islamic law, PSA registration is recommended for legal recognition.",
      "ideal_lead_time_months": 0,
      "minimum_lead_time_months": 0,
      "critical": false,
      "post_wedding": true,
      "dependencies": ["muslim_imam_booking"],
      "tips": "The imam/officiant should file the marriage certificate with the Local Civil Registrar, who forwards it to PSA."
    }
  ]
}
```

### Commitment Ceremony / Civil Union Task Template

```json
{
  "ceremony_type": "CivilUnion",
  "unique_tasks": [
    {
      "id": "union_officiant",
      "title": "Book Officiant / Celebrant",
      "description": "Find an inclusive celebrant or church that performs commitment ceremonies.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": true,
      "dependencies": [],
      "tips": "Open Table MCC (Metropolitan Community Church) has been performing Holy Union ceremonies for LGBTQ+ couples in the Philippines since 1991. They have churches in Mandaluyong, Makati, and Baguio. Other inclusive celebrants may also be available."
    },
    {
      "id": "union_legal_instruments",
      "title": "Explore Legal Instruments",
      "description": "While same-sex marriage is not yet legal in the Philippines, there are legal tools that can protect your partnership.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": false,
      "dependencies": [],
      "tips": "Consider: Special Power of Attorney for healthcare decisions (available in Quezon City and San Juan City), co-ownership agreements for property, insurance beneficiary designations, and wills. A lawyer specializing in LGBTQ+ rights can advise you."
    },
    {
      "id": "union_ceremony_design",
      "title": "Design Your Ceremony",
      "description": "Without a prescribed ritual format, you have complete freedom to design a ceremony that reflects your love story.",
      "ideal_lead_time_months": 4,
      "minimum_lead_time_months": 1,
      "critical": false,
      "dependencies": ["union_officiant"],
      "tips": "Consider incorporating Filipino traditions like the cord, veil, and arrhae ceremony. These symbols of unity are beautiful in any celebration. You can also write your own vows, include cultural elements, or blend traditions."
    },
    {
      "id": "union_inclusive_vendors",
      "title": "Book Celebration-Friendly Vendors",
      "description": "Look for vendors with the 'All Celebrations Welcome' badge on everaftr.",
      "ideal_lead_time_months": 6,
      "minimum_lead_time_months": 2,
      "critical": true,
      "dependencies": [],
      "tips": "On everaftr, vendors can opt in to the 'All Celebrations Welcome' badge, which means they actively welcome LGBTQ+ couples. Filter for this badge when browsing vendors."
    }
  ]
}
```

---

## 2.5 Budget-Aware Suggestions

Kasa adjusts its recommendations based on the couple's budget. Here is the logic:

### Budget Tier: Under PHP 100K ("Practical")

```
SUGGESTIONS:
- Civil ceremony at city hall (minimal venue cost)
- All-in-one venue packages (bundled catering + basic styling)
- DIY invitations (Canva templates)
- Family/friend as photographer (or budget photographer PHP 10-15K)
- Potluck-style reception or catering per head under PHP 300
- Skip the bridal car (use a family car decorated with flowers)
- Simple styling with local flowers (sampaguita, sunflowers)
- Barong from ready-to-wear shops (PHP 2-5K)
- Simple gown rental (PHP 5-10K)

KASA MESSAGING:
"A beautiful celebration doesn't need a huge budget! Let's focus on what
matters most to you and find creative ways to make it special."
```

### Budget Tier: PHP 100K-200K ("Budget-Conscious")

```
SUGGESTIONS:
- Province venue or off-peak Metro Manila venue
- Catering at PHP 400-600 per head
- Photographer in PHP 20-40K range
- Consider weekday or Sunday wedding for venue discounts
- Digital invitations (e-vites) to save on printing
- Buy gown from sample sales or rent from bridal shops
- Book barong early for best prices
- Lechon from local supplier (PHP 6-8K per whole lechon)

KASA MESSAGING:
"Great budget! With smart planning and early booking, you can have a
wonderful celebration. Let me show you where to save and where to splurge."
```

### Budget Tier: PHP 200K-500K ("Mid-Range")

```
SUGGESTIONS:
- Full vendor lineup is achievable
- Wedding coordinator recommended (PHP 15-30K)
- Professional photographer and videographer (PHP 40-80K combined)
- Good catering at PHP 600-1,000 per head
- Styled venue with florist (PHP 30-50K)
- Custom or semi-custom gown and barong
- Printed invitations
- Live acoustic music or DJ

KASA MESSAGING:
"You have a solid budget to work with! Let's make sure every peso counts.
I'll help you prioritize based on what matters most to you."
```

### Budget Tier: PHP 500K-1M ("Comfortable")

```
SUGGESTIONS:
- Premium venue options
- Top-tier photographer/videographer
- Full styling with premium florals
- Live band + emcee
- Custom designer gown and barong
- Wedding coordinator for full planning
- Destination wedding is possible
- Prenup photoshoot and video

KASA MESSAGING:
"Exciting! You have lots of options. Let me help you find the perfect
combination of vendors to bring your vision to life."
```

### Budget Tier: Over PHP 1M ("Premium")

```
SUGGESTIONS:
- Access to the most sought-after vendors
- Destination wedding (Tagaytay, Boracay, Palawan, Baguio)
- Full event production with lights, sound, LED walls
- Multi-day celebrations (rehearsal dinner + wedding + after-party)
- International honeymoon planning
- Custom everything -- gown, barong, invitations, favors

KASA MESSAGING:
"Your budget gives you access to the best of the best. Let's create
something truly unforgettable. I'll help you find premium vendors
who match your vision."
```

### Budget Allocation Recommendations

Kasa suggests the following budget allocation percentages, adjusted by ceremony type:

| Category | Standard % | Budget-Conscious % | Premium % |
|----------|-----------|-------------------|-----------|
| Venue & Catering | 40-50% | 50-60% | 35-45% |
| Photography & Video | 10-15% | 8-12% | 10-15% |
| Attire & Beauty | 8-12% | 5-8% | 8-12% |
| Flowers & Styling | 5-10% | 3-5% | 8-15% |
| Entertainment | 3-5% | 2-3% | 5-8% |
| Coordination | 5-8% | 0-3% | 5-8% |
| Stationery | 2-3% | 1-2% | 2-5% |
| Ceremony (church/civil) | 2-5% | 2-5% | 1-3% |
| Miscellaneous / Buffer | 10-15% | 10-15% | 10-15% |

These percentages feed directly into everaftr's existing **Budget Tracker** component.

---

## 2.6 Vendor Recommendations Engine

Kasa connects couples to everaftr's vendor directory based on their profile:

### Matching Logic

```
INPUTS from CoupleProfile:
  - location
  - budget_range
  - ceremony_type
  - guest_count
  - priorities (from onboarding Step 7)

VENDOR MATCHING:
  1. Filter by location (exact match or nearby)
  2. Filter by price range compatibility
  3. Boost "All Celebrations Welcome" vendors for Civil Union ceremonies
  4. Boost verified vendors
  5. Sort by relevance (matching tags, rating, review count)
  6. Present top 3-5 per category with explanation

KASA PRESENTATION:
  "Based on your budget and location in Tagaytay, here are some venues
  I'd recommend checking out on everaftr:"
  [Embedded VendorCard components from the existing vendor directory]
  "Want me to help you send an inquiry to any of these?"
```

### Integration Points with Existing Platform

```
Vendor Directory (Vendors.tsx):
  - Kasa can deep-link to filtered vendor listings
  - Example: "/vendors?category=Venues&location=Tagaytay&priceMax=200000"

Vendor Profile (VendorProfile.tsx):
  - Kasa can link directly to a specific vendor
  - Example: "/vendors/hillcreek-tagaytay"

Inquiry Form:
  - Kasa can pre-fill the inquiry form with couple's details
  - Auto-populate: date, guest count, ceremony type, budget range
```

---

## 2.7 Reminders and Check-In System

### Weekly Check-In

Every week, Kasa sends a proactive message through the app:

```
WEEKLY CHECK-IN TEMPLATE:

"Hi [Name1] and [Name2]! Here's your weekly planning update:

THIS WEEK'S TASKS:
[ ] Follow up with [Vendor Name] for your menu tasting appointment
[ ] Submit baptismal certificates to the church (deadline: [date])
[ ] Start browsing barong shops -- I've saved some options for you!

COMPLETED RECENTLY:
[x] Venue booked -- Congratulations!
[x] CENOMAR received from PSA

COMING UP NEXT WEEK:
- Pre-Cana seminar on [date] -- don't forget to bring [requirements]
- Decision needed: finalize your invitation design

[X] weeks to go! You're doing great!"
```

### Smart Reminders Based on Dependencies

```
DOCUMENT VALIDITY ALERTS:
- "Your CENOMAR was issued [date]. It's valid for 6 months until [expiry date].
   Make sure to submit it to the church/LCR before it expires!"

- "Reminder: your marriage license is valid for 120 days from [issue date].
   Your wedding is on [date], which is [X] days from issuance.
   [OK / WARNING: cutting it close! / EXPIRED -- you need to reapply!]"

VENDOR PAYMENT REMINDERS:
- "Your photographer's final payment of PHP [amount] is due [date]
   (2 weeks before the wedding). Don't forget to prepare this!"

BOOKING URGENCY:
- "You're planning a December wedding and it's now [month].
   Venue availability gets very tight this time of year.
   I strongly recommend booking your venue this week."
```

### Milestone Celebrations

```
When a major task is marked complete, Kasa celebrates:

- Venue booked: "Your venue is locked in! One of the biggest decisions -- done!
  Time to celebrate with your partner tonight."

- All vendors booked: "All your vendors are confirmed! From here,
  it's all about the details. You're in great shape."

- Marriage license obtained: "Marriage license secured!
  You're officially cleared to get married. The countdown is real now!"

- 1 week before: "One more week! You've put in so much work.
  Everything is coming together beautifully. Trust the plan."
```

---

## 2.8 Common Q&A Knowledge Base

Kasa should be able to answer these questions accurately:

### Venue and Logistics

```
Q: How many guests can a typical venue hold?
A: It varies widely.
   - Intimate garden venues: 50-100 guests
   - Standard function halls: 100-200 guests
   - Hotel ballrooms: 200-500 guests
   - Large convention-style venues: 500+
   Always ask for maximum capacity AND recommended comfortable capacity.
   Tip: venues often quote maximum standing capacity, not comfortable seated capacity.

Q: What's corkage?
A: Corkage is a fee charged by venues when you bring in outside food or drinks
   instead of using their in-house catering. Typical corkage: PHP 10,000-30,000.
   Some venues have zero-corkage or waived corkage if you meet a minimum spend.

Q: Can we have an outdoor wedding during rainy season?
A: Yes, but you MUST have a Plan B (indoor backup or tent).
   Rainy season in the Philippines is typically June-November.
   If you're set on outdoor, consider Baguio (cool + less rain) or
   schedule for dry season (December-May).
```

### Vendor and Payment

```
Q: What's the typical vendor payment schedule?
A: Most vendors follow this pattern:
   - Upon booking: 30-50% deposit (non-refundable)
   - 2-4 weeks before: remaining balance
   - Caterers: final headcount + payment 7-14 days before
   - Photographers: full payment 1 month before
   Always get a written contract with payment terms.

Q: Should we tip our vendors?
A: Not mandatory in the Philippines, but it's appreciated.
   Common practice: PHP 500-1,000 per vendor staff member.
   Some couples prepare labeled envelopes ("For the HMU team,"
   "For the photographer's assistant") and have the coordinator
   distribute them on the day.

Q: How do we know if a vendor is legit?
A: Look for:
   - Portfolio of past work (not stock photos)
   - Reviews from real couples
   - DTI or SEC registration
   - Willingness to sign a contract
   - Professional communication
   - On everaftr: look for the verified badge and reviews
   Red flags: no contract, asking for 100% upfront, no portfolio
```

### Documents and Legal

```
Q: What if my name on my birth certificate doesn't match my current name?
A: This is very common in the Philippines. You may need:
   - Clerical error correction (RA 9048) for minor discrepancies
   - Court petition for significant changes
   - This can take weeks to months. Start this FIRST.
   Check your birth certificate early and compare with your IDs.

Q: Can we get married if one of us is a foreigner?
A: Yes, but additional requirements apply:
   - Certificate of Legal Capacity to Marry from the foreign partner's embassy
   - CENOMAR equivalent from their home country
   - Valid passport
   Processing times vary by embassy. Start 3-4 months early.

Q: Is a prenuptial agreement (prenup) possible?
A: Yes. Under Philippine law, couples can execute prenuptial agreements
   before the marriage. This must be done BEFORE the ceremony.
   Consult a family lawyer. Cost: PHP 10,000-50,000 depending on complexity.
```

### Filipino Cultural Traditions

```
Q: What is pamamanhikan?
A: Pamamanhikan is the traditional Filipino practice where the groom's
   family formally visits the bride's family to ask for their blessing
   and discuss wedding arrangements. It's usually done before formal
   planning begins. Modern couples sometimes combine this with
   a dinner or celebration.

Q: What are the roles in a Filipino wedding entourage?
A: Filipino wedding entourages are typically larger than Western ones:
   - Principal Sponsors (Ninong/Ninang): 2-4 pairs, married couples
     who serve as wedding godparents. They sign the marriage certificate.
   - Best Man / Maid of Honor: Closest friends/siblings of the couple
   - Groomsmen / Bridesmaids: Close friends and family
   - Secondary Sponsors: 1 pair each for Cord, Veil, and Arrhae ceremonies
   - Candle Sponsors: 1 pair for the unity candle (if applicable)
   - Flower Girl(s) and Ring/Coin/Bible Bearer(s): Children in the family
   - Parents of the couple: Often walk the couple down the aisle

Q: What is the cord, veil, and arrhae ceremony?
A: Three signature elements of a Filipino Catholic wedding:
   - VEIL (Belo): A large white veil draped over both partners,
     symbolizing unity as one household
   - CORD (Yugal): A figure-eight cord placed over the couple,
     symbolizing their eternal bond
   - ARRHAE (13 Coins): Coins poured into the couple's hands,
     symbolizing prosperity and mutual support
   Each has designated sponsors who place them during the ceremony.

Q: What is a barong tagalog?
A: The barong tagalog is the traditional formal attire for Filipino men.
   For weddings, the groom typically wears a custom-made barong in
   pineapple fiber (pina) or jusi fabric. The groomsmen and male
   sponsors often wear matching barongs.
   Custom barong: PHP 5,000-50,000+ depending on fabric and embroidery
   Ready-to-wear: PHP 2,000-8,000
   Order custom barongs at least 2-3 months before the wedding for fittings.
```

---

## 2.9 Inclusive Design Principles for Kasa

### Language Rules

```
ALWAYS:
  - Use "partner" instead of "bride/groom" unless the couple specifies
  - Use "celebration" alongside "wedding"
  - Use the couple's actual names
  - Ask about pronouns if relevant to ceremony script assistance
  - Reference "your family" and "your partner's family" rather than
    "the bride's family" or "the groom's family"

NEVER:
  - Assume the couple is heterosexual
  - Assume a specific religion
  - Use "bride and groom" as default
  - Ask "who's the bride?" for same-sex couples
  - Make comments about family structure

FOR CIVIL UNION COUPLES:
  - Acknowledge the legal landscape honestly but supportively
  - Focus on what IS possible, not what isn't
  - Offer the same level of planning detail
  - Celebrate their love and commitment equally
  - Proactively suggest inclusive vendors (filter by "All Celebrations Welcome")
```

### Sensitivity Guidelines

```
BUDGET SENSITIVITY:
  - Never make a couple feel bad about their budget
  - Frame lower budgets as an opportunity for creativity
  - Don't upsell constantly; respect the stated budget
  - "There are beautiful options at every budget level"

FAMILY COMPLEXITY:
  - Some couples have complicated family situations
  - Don't assume both parents are involved
  - Don't assume traditional family structures
  - Be neutral about family contributions

CULTURAL SENSITIVITY:
  - Respect that not all Filipino couples are Catholic
  - Don't assume everyone follows traditional customs
  - Offer traditional elements as options, not requirements
  - Be knowledgeable about Muslim, INC, and other traditions

TIMELINE SENSITIVITY:
  - Don't shame couples for "waiting too long" to plan
  - Frame compressed timelines as exciting challenges
  - "Let's focus on what we can do, not what we can't"
```

---
