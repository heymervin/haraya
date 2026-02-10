# KASA AI Product Specification
## The AI Wedding Planning Assistant for everaftr
### Philippines' First Inclusive Wedding Planning Platform

**Version:** 1.0
**Date:** February 10, 2026
**Status:** Product Design Specification

---

## Document Structure

This specification is split across five files for manageability. Each part is a self-contained section that can be referenced independently.

| Part | File | Contents |
|------|------|----------|
| **Part 1** | `kasa-ai-product-spec.md` (this file) | Wedding Planner Interview -- domain knowledge from a senior Filipino wedding coordinator |
| **Part 2** | `kasa-ai-product-spec-part2.md` | Kasa AI Feature Spec -- onboarding flow, timeline algorithm, task dependencies, budget logic, ceremony templates, vendor matching, reminders, Q&A knowledge base, inclusive design |
| **Part 3** | `kasa-ai-product-spec-part3.md` | Conversation Design -- 3 full sample conversations (Catholic/12mo, Civil/3mo, Civil Union/6mo) |
| **Part 4** | `kasa-ai-product-spec-part4.md` | Technical Architecture -- hybrid approach, system diagram, Supabase data model, Checklist/Budget integration, Claude API design, component architecture, state management, analytics |
| **Part 5** | `kasa-ai-product-spec-part5.md` | Filipino Wedding Timeline Data -- 12-month Catholic checklist (68 items), 12-month Civil checklist, 6-month compressed, 3-month rush (week-by-week), document requirements, Filipino-specific items, peak season data, budget reference by location |

---

## Quick Reference: What Developers Need

**To build the Onboarding Flow:** Read Part 2, Section 2.2

**To build the Timeline Generator:** Read Part 2, Sections 2.3-2.4 (algorithm + task templates) and Part 5, Sections 5.1-5.4 (timeline data)

**To set up the Database:** Read Part 4, Section 4.3 (Supabase schema)

**To integrate with existing Checklist:** Read Part 4, Section 4.4

**To integrate with existing Budget Tracker:** Read Part 4, Section 4.5

**To implement the Claude API chat:** Read Part 4, Section 4.6

**To understand the domain (Filipino weddings):** Read Part 1 (entire section) and Part 5, Sections 5.5-5.8

**To see how conversations should feel:** Read Part 3 (all three conversations)

**To understand inclusive design rules:** Read Part 2, Section 2.9

---

## Build Priority (MVP Roadmap)

### Sprint 1 (Weeks 1-2): Onboarding + Timeline Generation
- Build `KasaOnboarding.tsx` guided flow (Part 2, Section 2.2)
- Build `timelineGenerator.ts` rule-based engine (Part 2, Section 2.3)
- Build `kasaTaskTemplates.ts` data file (Part 2, Section 2.4 + Part 5)
- Store profile and timeline in localStorage (Part 4, Section 4.8)
- Display timeline as enhanced Checklist (Part 4, Section 4.4)

### Sprint 2 (Weeks 3-4): Budget Integration + Polish
- Connect timeline to Budget Tracker (Part 4, Section 4.5)
- Build document tracker component (Part 5, Section 5.5)
- Add ceremony-specific filtering
- Weekly check-in display (Part 2, Section 2.7)
- Milestone celebrations (Part 2, Section 2.7)

### Sprint 3 (Weeks 5-6): AI Chat Layer
- Set up Supabase Edge Function for Claude API (Part 4, Section 4.6)
- Build chat interface components (Part 4, Section 4.7)
- Implement system prompt with couple context (Part 4, Section 4.6)
- FAQ matching for common questions (Part 2, Section 2.8)
- Vendor directory integration from chat (Part 2, Section 2.6)

### Sprint 4 (Weeks 7-8): Data Migration + Reminders
- Migrate localStorage to Supabase (Part 4, Section 4.3)
- Build reminder system (Part 2, Section 2.7)
- Analytics event tracking (Part 4, Section 4.10)
- Testing with real Filipino wedding scenarios

---

## Key Design Decisions

1. **Name: "Kasa"** -- Filipino for "home." Evokes the home the couple is building together. Gender-neutral. Easy to say and remember.

2. **Hybrid approach (guided flow + AI chat)** -- Structured onboarding captures reliable data; AI chat handles natural conversation and edge cases. MVP ships guided flow first, AI chat follows.

3. **Rule-based timeline for MVP** -- No AI needed for timeline generation. Deterministic algorithm produces reliable, testable results. AI enhances later.

4. **Langkit color palette** -- Kasa uses the Langkit textile section colors (magenta, gold, violet) per the Woven Heritage design system.

5. **Inclusive by default** -- Same planning quality for all ceremony types. "All Celebrations Welcome" badge for vendors. No gendered assumptions.

6. **Filipino-first knowledge base** -- All data, costs, timelines, and traditions are specific to the Philippines. This is not a localized version of a Western wedding planner; it is built from the ground up for Filipino couples.

---

# PART 1: WEDDING PLANNER INTERVIEW

## Persona: Ate Marga -- Senior Wedding Coordinator, 12 Years Experience

Marga Santos, 38, has coordinated over 400 weddings across Metro Manila, Tagaytay, Batangas, and Cebu. She handles everything from intimate 50-person civil ceremonies to 500-guest Catholic cathedral weddings. She works with budgets ranging from PHP 100K to PHP 5M+.

---

### Q1: What are the standard timelines for 12-month, 6-month, and 3-month Filipino weddings?

**Ate Marga:**

"Twelve months is ideal. That is what I always tell my couples -- kung kaya, one year. Here is the reality: popular venues like Hillcreek in Tagaytay, The Peninsula, or Alfonso's get booked 1-2 years in advance, especially for peak season (December to February and dry season months March to May). Same with top photographers and videographers.

**12-month timeline (Ideal):**

- Months 12-10: Set budget, research and book venue, book photographer/videographer, choose ceremony type and start church/civil requirements
- Months 9-7: Book caterer, stylist, host/emcee, band or DJ. Start Pre-Cana seminar for Catholic weddings. Order CENOMAR from PSA. Begin entourage coordination.
- Months 6-4: Bridal gown fitting, barong tagalog fitting/ordering, send save-the-dates, finalize menu tasting, book hotel accommodations for guests, order invitations
- Months 3-1: Send formal invitations, final fittings, confirm all vendors, apply for marriage license (needs 10-day posting), prepare day-of timeline, rehearsal dinner

**6-month timeline (Compressed but doable):**

- You are overlapping a lot of tasks. Months 6-5 you are booking venue AND caterer AND photographer all at once. You must be decisive. No luxury of choosing among five venues -- pick two, visit both in one weekend, decide.
- Church requirements become critical immediately for Catholic weddings because Pre-Cana seminars have schedules you cannot control. Some parishes only hold them monthly.
- Biggest risk: your preferred vendors may not be available. Always have a backup list.

**3-month timeline (Rush -- I call this 'bilis-bilis mode'):**

- Week-by-week planning. Everything happens simultaneously.
- Civil ceremony is most practical at this timeline because Catholic church requirements are very hard to complete in 3 months unless the parish is very accommodating.
- You need a coordinator. This is non-negotiable for rush weddings. Couples cannot DIY a 3-month wedding without losing their minds.
- Budget flexibility helps because you may need to pay rush fees or take whatever vendor is available."

---

### Q2: What are the must-do tasks by ceremony type?

**Ate Marga:**

"Each ceremony type has a completely different checklist. This is where couples get surprised.

**Catholic Wedding (Church Wedding):**

This is the most complex. Requirements include:
- Church booking: Ideally 6-12 months before. Popular churches like San Agustin, Manila Cathedral, Santuario de San Antonio -- these book out a year ahead.
- Pre-Cana / Pre-Marriage Seminar: Both partners must attend. Usually a half-day seminar. Some parishes schedule these monthly, others quarterly. You need to check the specific parish schedule. Certificate is awarded same day.
- Canonical Interview: Done at the parish. The priest interviews both of you separately. This is standard procedure.
- Documents needed: Baptismal certificates with 'FOR MARRIAGE PURPOSES' annotation (valid 6 months), Confirmation certificates, CENOMAR from PSA, Marriage License, Birth Certificates, Recent community tax certificate (cedula)
- If one partner is not Catholic, you need a 'Permit for Mixed Marriage' from the diocese. This adds processing time.
- Rehearsal at the church is usually scheduled 1-2 weeks before the wedding.

**Civil Wedding:**

Much simpler, faster. Good for couples on a tight timeline.
- City hall scheduling: Can be done 1-3 months ahead. Some city halls have specific days for civil ceremonies.
- Marriage license application: Requires 10-day posting period at the Local Civil Registrar. Non-negotiable. After posting, license is issued and valid for 120 days.
- Pre-Marriage Counseling: Required even for civil weddings. Usually conducted by the city/municipal social welfare office.
- Documents: CENOMAR, PSA Birth Certificates, valid IDs, cedula, 1x1 and 2x2 photos
- Judge or mayor performs the ceremony.

**Muslim Wedding (Nikah):**

Under PD 1083 (Code of Muslim Personal Laws):
- Imam/Ustadz booking: Identify a recognized imam registered with the Office of Muslim Affairs or PSA
- Mahr (dowry) discussion and agreement between families
- At least two competent Muslim witnesses required
- If both parties are Muslim, marriage license may not be required under Sharia law, but registration with PSA is still recommended
- Walima (wedding feast) arrangements
- Mosque booking if ceremony is at a mosque
- Family meetings for marriage negotiation are culturally important

**Civil Union / Same-Sex Ceremony:**

Important note: As of 2026, the Philippines does not legally recognize same-sex marriage or civil unions. Bills have been filed (including Senator Padilla's civil partnership bill) but none have passed.

However, couples can:
- Hold a commitment ceremony or Holy Union through inclusive churches like Open Table MCC (performing these since 1991)
- Obtain legal instruments like Special Power of Attorney for healthcare decisions (available in Quezon City and San Juan City)
- Plan a celebration that is meaningful to them, even without legal recognition
- Some couples obtain legal marriage certificates from jurisdictions that allow it (like Utah through online platforms)

For everaftr, this is a key differentiator: we support ALL couples in planning their celebration, regardless of legal status. Kasa should help these couples plan their ceremony with the same care and detail."

---

### Q3: What documents are needed and when?

**Ate Marga:**

"Documents are the number one source of panic. Here is the complete list with processing times:

| Document | Processing Time | Valid For | Needed For |
|----------|----------------|-----------|------------|
| CENOMAR (PSA) | Walk-in: same day to 2 days. Online: 3-10 working days (Metro Manila), up to 15 days (province/abroad) | 6 months | All ceremony types |
| PSA Birth Certificate | Walk-in: same day. Online: 3-10 working days | No expiry for marriage purposes | All ceremony types |
| Baptismal Certificate (for marriage) | Request from parish of baptism, 1-3 weeks | 6 months | Catholic only |
| Confirmation Certificate | Request from parish, 1-3 weeks | 6 months | Catholic only |
| Marriage License | 10-day posting + processing = ~2-3 weeks total | 120 days (4 months) | Catholic, Civil |
| Pre-Cana Seminar Certificate | Same day after attending | Varies by parish | Catholic only |
| Pre-Marriage Counseling Certificate | Same day after attending | Varies | Civil ceremony |
| Canonical Interview Clearance | Same day, scheduled by parish | Varies by parish | Catholic only |
| Cedula / Community Tax Certificate | Same day at city hall | 1 year | All types |
| Permit for Mixed Marriage | 2-4 weeks from diocese | Varies | Catholic (if one is non-Catholic) |
| Death Certificate of Former Spouse | 1-2 weeks from PSA | No expiry | If widowed |
| Annulment/Declaration of Nullity | Already should be final | No expiry | If previously married |

**My advice:** Start documents at least 3 months before the wedding. The CENOMAR alone can take 3-4 weeks if there are complications, especially if the name on your birth certificate does not match your current documents. Name discrepancies are very common in the Philippines and cause major delays."

---

### Q4: What are the biggest mistakes couples make with timing?

**Ate Marga:**

"After 400+ weddings, these are the mistakes I see again and again:

1. **Not checking document validity periods.** The marriage license is valid for only 120 days. If you get it too early, it expires before your wedding date. If you get it too late, the 10-day posting delays everything. I have seen couples almost not get married because their marriage license expired the week before the wedding.

2. **Underestimating ber-month demand.** December weddings in the Philippines are the most popular. If you want a December wedding, you should be booking by January of the same year. Same with February (Valentine's season) and the dry months (March-May).

3. **Assuming the church is always available.** Some parishes do not allow weddings during Lent (Holy Week). Some have specific wedding schedules -- maybe only Saturdays at 2pm and 4pm. You need to check this FIRST before setting your reception time.

4. **Leaving the entourage coordination too late.** Filipino weddings have large entourages -- principal sponsors (ninang/ninong), secondary sponsors (cord, veil, arrhae), flower girls, ring bearers, bible bearers, coin bearers. Coordinating 20-30 people for fittings, rehearsal, and the day itself is a project in its own right.

5. **Not accounting for travel time.** If the church is in Makati and the reception is in Tagaytay, that is 1.5-2.5 hours depending on traffic. Guests will be late. The couple will be late. I always tell couples: ceremony and reception should be within 30 minutes of each other, or better yet, same venue.

6. **Forgetting the lechon.** This sounds funny but top lechon suppliers like Lydia's, Elar's, or CJ's get fully booked 2-3 months before December. If lechon is part of your reception menu, book it early.

7. **Not reading vendor contracts carefully.** Some photographers charge extra for overtime. Some caterers charge per guaranteed head, not actual attendance. Some venues have corkage fees. Read every contract line by line.

8. **Skipping the day-of timeline.** Without a minute-by-minute timeline for the wedding day itself, everything falls apart. Hair and makeup alone can take 3-4 hours for the bride, and you need to work backward from the ceremony time."

---

### Q5: What questions do couples always ask?

**Ate Marga:**

"These come up in almost every initial consultation:

- 'Magkano ba talaga ang kasal?' (How much does a wedding really cost?) -- The honest answer is PHP 300K-1M for a 'nice' wedding of 100-150 guests in Metro Manila. Province weddings can be done for less.
- 'Can we do a church wedding and reception in 6 months?' -- Yes, but you need to start Pre-Cana immediately and be flexible on the church.
- 'How many guests should we invite?' -- In Filipino culture, 150 is considered intimate. 200-300 is standard. Some families go 400+. The guest count drives your entire budget.
- 'Who pays for what?' -- Traditionally, the groom's family pays for the wedding, but modern couples often split costs or pay for it themselves.
- 'Do we need a wedding coordinator?' -- I always say yes, at minimum a day-of coordinator. But I am biased.
- 'What is the tipping etiquette?' -- Not mandatory in PH but appreciated. PHP 500-1,000 per vendor staff member is common. Some couples prepare envelopes.
- 'When should we send invitations?' -- 2-3 months before for local guests. 4-6 months for out-of-town or overseas guests.
- 'Can we have an outdoor wedding during rainy season?' -- Yes, but ALWAYS have a rain plan (Plan B venue or tent).
- 'What is the typical vendor payment schedule?' -- Usually 30-50% deposit upon booking, then remaining balance 2-4 weeks before the wedding. Some caterers need final headcount and payment 7-14 days before."

---

### Q6: How do budgets affect timelines?

**Ate Marga:**

"Budget and timeline are directly connected.

**Under PHP 200K (Tight Budget):**
- Need MORE time, not less. You need time to find deals, compare prices, negotiate.
- Book during off-peak months (June-August rainy season) for lower rates -- venues offer 10-30% discounts.
- DIY elements (invitations, centerpieces, favors) need time to execute.
- Consider all-in-one venue packages that bundle catering + styling + coordination. These are usually cheaper than booking individually.
- Province venues are significantly cheaper than Metro Manila.

**PHP 200K-500K (Mid-range):**
- Most common budget range. Plenty of options.
- 6-month minimum planning recommended.
- Can afford a coordinator, decent photographer, good catering.
- Still need to be strategic about which vendors to splurge on (photography is usually worth investing in -- those memories last forever).

**PHP 500K-1M (Comfortable):**
- More vendor choices, but popular premium vendors still book out early.
- Can afford destination wedding within the Philippines.
- 8-12 months gives you best vendor selection.

**PHP 1M+ (Premium):**
- Destination weddings, premium suppliers, custom everything.
- Even with this budget, top-tier vendors like Pat Dy (photography) or Gideon Hermosa (styling) book 1-2 years ahead.
- Timeline is driven by vendor availability, not budget."

---

### Q7: Province vs. Metro Manila weddings -- what is different?

**Ate Marga:**

"So many differences:

**Metro Manila:**
- More vendor options but higher prices across the board
- Traffic is a major factor in day-of logistics. A 10km distance can mean 1-2 hours of travel.
- Church options are abundant but popular ones book fast
- Guests expect a certain 'standard' -- good food, aircon venue, professional setup
- Wedding planner rates: PHP 30K-100K+

**Province:**
- Significantly lower costs. A venue that costs PHP 150K in Manila might be PHP 50-80K in Batangas or Laguna.
- Fewer vendor options, but many Manila-based vendors will travel (for a fee, usually PHP 5K-15K transport surcharge)
- Churches are more flexible with schedules and requirements
- Community involvement is higher -- neighbors help with food preparation, decorations
- Lechon from local suppliers is cheaper and often fresher
- Weather/outdoor venues are more viable outside Metro Manila
- Accommodation for out-of-town guests needs to be arranged. Not every province has plenty of hotels.
- Destination weddings (Tagaytay, Batangas beach, Baguio) fall in this category and are increasingly popular

**Key insight for Kasa:** The AI needs to adjust its vendor recommendations and budget expectations based on location. A PHP 150K budget in Batangas can get you a lovely wedding. That same budget in Makati might only cover catering."

---

*Continue to Part 2: `kasa-ai-product-spec-part2.md`*
