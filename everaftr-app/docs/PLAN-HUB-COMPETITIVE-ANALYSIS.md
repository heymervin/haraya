# Competitive Research & UX Pattern Analysis for haraya

## A Reference Document for the Planning Hub and Website Builder

---

## TABLE OF CONTENTS

1. Wedding Website Builders (Joy, Zola, The Knot, Minted, Simpler Builders)
2. Planning Hub / Dashboard Patterns (Joy, Zola, Notion, Linear, Todoist, Trello)
3. Specific UX Patterns to Adopt
4. Open Source Wedding Templates on GitHub
5. Filipino Wedding Planning Tools
6. Free RSVP Tools with Good UX
7. Photo Sharing Patterns (No-App-Download)
8. Gap Analysis: haraya's Current State vs. Best in Class
9. Prioritized Recommendations for haraya

---

## 1. WEDDING WEBSITE BUILDERS

### 1A. Joy (withjoy.com)

**What they do well:**
- 601 free templates -- the largest template library in the wedding space
- Three layout modes: Split View, Classic Navigation, and Simple Scroll -- couples pick their structural layout first, then pick a "theme" (visual art/decoration) separately
- Live preview with desktop/mobile toggle directly in the editor
- Auto-save with explicit "Publish Changes" button -- changes do not go live until you publish, which prevents accidental half-edits being seen by guests
- Smart RSVP system: tracks multiple events (ceremony, reception, rehearsal dinner), groups families so they RSVP as a unit, custom questions per event, per-guest event visibility
- "Moments" photo sharing: guests upload photos into a shared album via mobile
- Zero-fee cash registry with Venmo/PayPal/CashApp integration
- GCash-equivalent: They focus on US payment methods but the pattern of integrating mobile wallets is directly applicable

**What they do poorly:**
- Editor is form-based (not drag-and-drop) -- you fill in fields, pick a theme, and see the result. This limits creative freedom but drastically reduces complexity
- No true "block editor" -- you cannot rearrange sections. The section order is fixed (Hero > Story > Schedule > Entourage > Gallery > RSVP > Footer)
- Template customization is limited to colors, fonts, and art/decoration overlays -- you cannot change layout structure within a template

**Key UI elements for haraya:**
- Left panel with design controls, right panel with live preview (two-column editor layout)
- Theme/art picker is a scrollable grid of visual cards with hover previews
- Font picker shows font name rendered in that font
- Toggle between desktop/mobile preview at the top of the preview panel
- "Design" tab as an icon in the admin dashboard sidebar

**How it applies to haraya:**
- haraya's current `CoupleWebsite.tsx` already uses a form-based editor similar to Joy's approach. This is the right call for the MVP audience (couples who are not designers)
- The split-screen editor (form left, preview right) should be added for desktop users
- Joy's approach of separating "layout" from "theme/art" is worth adopting: haraya currently has 4 color themes but no layout options
- The multi-event RSVP with per-guest visibility is the gold standard that haraya should target

Sources:
- [Joy Wedding Websites](https://withjoy.com/wedding-website/)
- [Joy Help: How to Design Your Website](https://withjoy.com/help/en/articles/11832050-how-to-design-your-website-layouts-colors-themes-and-fonts)
- [Joy: A New Way to Design](https://updates.withjoy.com/a-new-way-to-design-your-website-142770)
- [Joy Named Best Wedding Website 2025](https://www.businesswire.com/news/home/20250716401625/en/Joy-Named-Best-Wedding-Website-Experience-of-2025-by-BRIDES)

---

### 1B. Zola (zola.com)

**What they do well:**
- Deep ecosystem integration: website, registry, guest list, seating chart, budget tool, and invitations all talk to each other. When a guest RSVPs, it updates the seating chart, guest count, and event tracking simultaneously
- Drag-and-drop website editor with 148 templates
- "Add from anywhere" registry: paste a URL from any store and Zola scrapes the product info
- Group gifting for expensive items (multiple guests contribute)
- Contact Collector: asks guests for mailing addresses when they RSVP, eliminating the need for a separate address collection step
- Seating chart with drag-and-drop table assignment

**What they do poorly:**
- 148 templates is far fewer than Joy's 601
- Processing fees on cash gifts (unlike Joy's zero-fee approach)
- Reported technical glitches and reliability issues (noted on TikTok reviews in 2025)
- The sheer breadth of features can be overwhelming for couples who just want a simple website

**Key UI elements for haraya:**
- Unified dashboard sidebar: Website, Guest List, Registry, Seating Chart, Budget, Checklist all accessible from one navigation
- "Complete Your Wedding" progress indicator at the top of the dashboard
- Contact Collector embedded in the RSVP flow
- Registry integration cards showing product images, prices, and "group gift" progress bars

**How it applies to haraya:**
- haraya should learn from Zola's integration philosophy: the `/plan` page (checklist + budget), `/guests` page, and `/our-wedding` page currently operate as isolated features. They should share data
- The Contact Collector pattern (address collection during RSVP) is extremely useful for Filipino weddings where couples often need physical addresses for paper invitations even if they RSVP online
- Zola's approach of having too many features is a cautionary tale: haraya should keep the surface simple while offering depth progressively

Sources:
- [Zola Wedding Website Builder](https://www.zola.com/wedding-planning/website)
- [Zola Wedding Budget Calculator](https://www.zola.com/wedding-budget)
- [Zola Wedding Checklist](https://www.zola.com/wedding-planning/checklist)
- [Zola Expert Advice: Best Wedding Websites](https://www.zola.com/expert-advice/best-wedding-websites)

---

### 1C. The Knot (theknot.com)

**What they do well:**
- 380 templates (more than Zola, fewer than Joy)
- Massive vendor directory integrated with the planning tools (the largest in the US market)
- RSVP supports both private mode (only guests on your list can RSVP) and public mode (anyone with the link)
- Real-time RSVP notifications
- Wedding checklist with month-by-month timeline automatically generated from your wedding date
- Guest list syncs with website and RSVP automatically

**What they do poorly:**
- The platform feels dated compared to Joy and Zola -- heavier UI, more ads, slower load times
- Vendor-heavy monetization means the couple experience sometimes takes a backseat to vendor promotion
- Less modern editing experience -- not as intuitive as Joy's form-based or Zola's drag-and-drop

**Key UI elements for haraya:**
- Date-based automatic checklist generation (enter your date, get a custom timeline)
- RSVP privacy toggle (public vs. invite-only)
- Real-time notification badge on RSVP count

**How it applies to haraya:**
- The date-based checklist auto-generation is valuable: haraya's `Checklist.tsx` has 44 items with timeframes but does not auto-calculate based on the couple's actual wedding date. Adding this would make it immediately more useful
- The public/private RSVP toggle is already partially implemented in haraya (rsvpEnabled boolean) but could be expanded to include invite-only mode
- The vendor directory integration with planning tools is what haraya should aim for long-term

Sources:
- [The Knot Wedding Websites](https://www.theknot.com/gs/wedding-websites)
- [The Knot RSVP Feature](https://helpcenter.theknot.com/hc/en-us/articles/38093261749652-How-do-I-use-the-RSVP-feature-on-my-wedding-website)
- [The Knot Guest List](https://www.theknot.com/gs/guest-list)

---

### 1D. Minted (minted.com)

**What they do well:**
- 900+ templates -- the largest visual library, because templates match their physical stationery designs
- Design consistency across print and digital: choose an invitation design and the website template matches
- Deliberately limited customization keeps the end result always looking polished
- Quick setup (under 10 minutes)
- Free with optional $15 custom URL upgrade

**What they do poorly:**
- Very limited customization -- you cannot change section order, layout, or add custom sections
- No drag-and-drop editor at all -- strictly fill-in-the-blank
- Registry is link-based only (no native registry)
- RSVP is basic compared to Joy and Zola

**Key UI elements for haraya:**
- Stationery-to-website design matching (a concept haraya could adapt for Filipino-specific themes)
- The "less customization = more polish" philosophy
- Template cards showing the invitation design alongside the website preview

**How it applies to haraya:**
- Minted validates haraya's form-based approach. For a Filipino audience that is mobile-first and may not be tech-savvy, a constrained but beautiful editor is better than a flexible but complex one
- The idea of matching a physical invitation design to a digital website is powerful for the Filipino market where physical invitations are still culturally important
- Consider offering "design packs" where the celebration website theme includes matching digital invitation templates

Sources:
- [Minted Wedding Websites](https://www.minted.com/wedding-websites)
- [How to Make a Wedding Website on Minted](https://www.minted.com/wedding-ideas/how-to-make-a-wedding-website)
- [Minted Wedding Website Review - Love & Lavender](https://loveandlavender.com/minted-wedding-website-review/)

---

### 1E. Simpler Builders (Carrd, Linktree, Canva)

**Carrd (carrd.co):**
- Stack-based editor: every site is a vertical stack of elements (text, images, buttons, forms, dividers)
- Block-based rather than drag-and-drop -- simpler but less flexible
- Ideal for one-page sites
- Mobile-responsive by default
- Key pattern: the "starting point" screen where you pick a template category, then a specific template, then customize

**Linktree (linktr.ee):**
- Real-time live preview on the right while editing on the left
- Extremely short time-to-value: add links, customize appearance, publish -- done
- Button-style link cards are the core UI primitive
- Key pattern: the "appearance" customization panel with background colors, button styles, and font pickers in a compact sidebar

**Canva (canva.com/website-builder):**
- Drag-and-drop with full creative freedom
- AI-powered tools: Magic Edit, Magic Write, Magic Media for image generation
- 2025 update added multi-page websites
- Real-time collaboration
- Key pattern: the "design" paradigm -- treat the website like a Canva design project, not a form to fill out

**How these apply to haraya:**
- Carrd's stack-based approach is essentially what haraya's celebration website already is: a vertical stack of sections (Hero > Story > Schedule > Entourage > Gallery > Gift > RSVP > Footer). Lean into this
- Linktree's real-time preview sidebar is the most impactful improvement haraya could make to the website editor. Currently, couples must switch between "Edit" and "Preview" tabs. A side-by-side layout would dramatically improve the editing experience on desktop
- Canva's AI features (auto-generating copy, enhancing photos) could be a differentiator for haraya if integrated with Kasa (the AI assistant)
- Do NOT try to build a drag-and-drop editor. The form-based approach is the right choice for haraya's audience

Sources:
- [Carrd](https://carrd.co)
- [Linktree Customization Features](https://linktr.ee/blog/linktree-customization-features)
- [Canva Website Builder](https://www.canva.com/website-builder/)
- [Canva Website Builder Review 2026](https://cybernews.com/best-website-builders/canva-website-builder-review/)

---

## 2. PLANNING HUB / DASHBOARD PATTERNS

### 2A. Joy's Planning Dashboard

**Structure:**
- Left sidebar navigation with icons: Website, Guest List, Registry, Planning
- Main content area shows the active tool
- Top bar shows wedding date countdown and couple names
- Planning section includes a checklist that auto-generates based on wedding date and chosen traditions

**Key pattern: The "What to do next" approach.** Joy's dashboard makes it easy to see exactly what to do next. Rather than showing everything at once, it highlights the most relevant next action.

**Applicable to haraya:** The current `/plan` page shows checklist and budget as two tabs. It should evolve into a true planning hub that shows: (1) what to do next, (2) overall progress, (3) quick access to all tools.

---

### 2B. Zola's Planning Dashboard

**Structure:**
- Horizontal top navigation: Home, Website, Guest List, Registry, Invitations, Budget, Checklist
- Home/dashboard shows a "getting started" checklist at the top
- Progress percentage for overall planning completion
- Budget tracker with per-category breakdowns and payment reminders
- Checklist with month-by-month timeline auto-generated from wedding date

**Key pattern: The interconnected dashboard.** Every tool feeds data back to the dashboard. When you add guests, the budget estimates update. When you RSVP, the guest count updates. When you book a vendor, the checklist marks off.

**Applicable to haraya:** haraya's tools are currently siloed. The Plan page does not know about the celebration website. The guest list does not feed into the budget. Creating a unified dashboard that connects these is the highest-impact architectural change.

---

### 2C. Notion Home Page Pattern

**Structure:**
- Gallery view: cards in a grid layout, each card represents a page/database entry
- Cards can show cover images, property values, or content previews
- Templates gallery: a grid of template cards with category filters and search
- Quick-action buttons for creating new pages/databases

**Key patterns:**
- Card-based navigation: each tool/feature is a card you click to enter
- Gallery views with visual cards for browsing content
- Inline databases that can be viewed as table, board, gallery, or calendar
- Progressive disclosure: start with a clean page, add blocks as needed

**Applicable to haraya:** The planning hub should use card-based navigation. Each planning tool (Checklist, Budget, Guest List, Website, Vendors) should be a card showing its current status (e.g., "23 of 44 tasks done") that you click to enter the full tool.

Sources:
- [Notion Gallery View Help](https://www.notion.com/help/galleries)
- [Best Notion Dashboard Templates](https://pathpages.com/blog/notion-dashboard-templates)

---

### 2D. Linear Project View + Command Palette

**Structure:**
- Keyboard-first design: nearly every action has a keyboard shortcut
- Cmd+K opens a global command palette with contextual actions
- Clean, minimal interface with strong information hierarchy
- Views: list, board, timeline -- all showing the same data differently

**Key patterns:**
- Command palette (Cmd+K): search for any action, navigate to any page, create items
- Contextual actions: the command palette shows different options depending on what view you are in
- Keyboard shortcuts displayed inline next to menu items
- Minimal chrome: the UI gets out of the way to let you focus on work

**Applicable to haraya:** A command palette would be overkill for MVP but is a strong long-term differentiator. More immediately, the pattern of showing keyboard shortcuts next to actions and the "multiple ways to do the same thing" philosophy (button, keyboard shortcut, command palette) is worth adopting. For example, pressing "N" could create a new checklist item, "B" could jump to budget.

**Implementation path:** The `cmdk` React library (used by Linear, Vercel, Raycast) is unstyled and composable. shadcn/ui has a Command component built on cmdk that would integrate well with haraya's Tailwind setup.

Sources:
- [Linear Conceptual Model](https://linear.app/docs/conceptual-model)
- [Command Palette UX Pattern](https://medium.com/design-bootcamp/command-palette-ux-patterns-1-d6b6e68f30c1)
- [cmdk React Library](https://react-cmdk.com/)
- [shadcn/ui Command](https://www.shadcn.io/ui/command)

---

### 2E. Todoist Today View

**Structure:**
- Opens directly to "Today" -- the most immediately actionable view
- Large orange "+" button for adding tasks (maximum visibility for the highest-value action)
- Tasks ordered by priority from top to bottom
- Labels for categorization, projects for grouping
- Bottom toolbar: Inbox, Search, Browse

**Key patterns:**
- "Today" as the default view -- always show what matters right now
- The primary action (add task) has the most visual prominence
- Subtle haptic feedback on mobile interactions
- Quick-add with natural language parsing ("Book venue tomorrow #venues")

**Applicable to haraya:** The planning hub should default to a "Today/Next" view that shows: (1) the most urgent checklist items based on wedding date, (2) recent RSVP activity, (3) budget alerts. The primary action button should be prominent -- "Add Task" or "Quick Add" with a keyboard shortcut.

Sources:
- [Todoist Design Critique (IxD@Pratt)](https://ixd.prattsi.org/2024/01/design-critique-todoist-ios-app/)
- [Todoist Home View Help](https://todoist.com/help/articles/360000281429)

---

### 2F. Trello Board View

**Structure:**
- Kanban columns: "To Do", "In Progress", "Done" (or custom stages)
- Cards represent individual tasks with title, assignees, due dates, labels
- Drag-and-drop between columns
- Card detail view as a modal overlay

**Key patterns:**
- Visual workflow: see the status of everything at a glance
- Cards as the atomic unit of work
- Drag-and-drop for status changes
- WIP (work in progress) limits to prevent overload

**Applicable to haraya:** A kanban view for vendor booking status could be valuable: "Researching" > "Contacted" > "Meeting Scheduled" > "Booked" > "Paid". This would give couples a visual way to track their vendor pipeline. However, this is a Phase 3 feature -- the card-based dashboard is more immediately valuable.

Sources:
- [Kanban Boards (IxDF)](https://www.interaction-design.org/literature/topics/kanban-boards)
- [Trello Kanban Data Visualization](https://www.atlassian.com/blog/trello/kanban-data-nave)

---

## 3. SPECIFIC UX PATTERNS TO ADOPT

### 3A. Card-Based Tool Selection (inspired by Notion template gallery)

**Pattern:** A grid of cards where each card represents a tool/feature. Each card shows:
- Icon (top-left)
- Tool name (bold)
- Current status/progress (e.g., "23/44 tasks done", "₱150K of ₱500K spent")
- Visual progress indicator (small bar or ring)
- Click to navigate into the tool

**Implementation for haraya's planning hub:**

```
+------------------+  +------------------+  +------------------+
|  [CheckCircle]   |  |  [PiggyBank]     |  |  [Globe]         |
|  Checklist       |  |  Budget          |  |  Website         |
|  23/44 done      |  |  ₱150K / ₱500K   |  |  Published       |
|  ████████░░ 52%  |  |  ████████░░ 30%  |  |  Last edited 2h  |
+------------------+  +------------------+  +------------------+
+------------------+  +------------------+  +------------------+
|  [Users]         |  |  [Store]         |  |  [Sparkles]      |
|  Guest List      |  |  Vendors         |  |  Ask Kasa        |
|  0 guests added  |  |  3 favorited     |  |  AI Assistant    |
|  Start adding    |  |  Browse vendors  |  |  Get suggestions |
+------------------+  +------------------+  +------------------+
```

**Visual details:**
- Cards should use `bg-bg-primary` with `border border-border` and `rounded-lg`
- Hover state: `hover:-translate-y-0.5 hover:shadow-lg` (already used on Home page)
- Progress bars: 2px height, rounded, using semantic colors (twilight-blue for checklist, golden-hour for budget, accent-primary for website)
- Cards with no data yet show a "Get started" CTA instead of progress

---

### 3B. Progress Rings (inspired by Apple Activity rings)

**Pattern:** Circular progress indicators that show completion at a glance. Unlike progress bars, rings are more visually compact and can be nested to show multiple metrics simultaneously.

**Implementation for haraya:**
- A single summary ring at the top of the planning hub showing overall wedding planning progress
- The ring aggregates: checklist completion %, vendors booked vs. needed, budget status, website completeness
- Outer ring: checklist tasks (twilight-blue)
- Middle ring: budget health (golden-hour)
- Inner ring: website completeness (accent-primary)

**Technical approach:** Build with SVG circles and `stroke-dasharray` / `stroke-dashoffset`. The pattern is well-documented for web: [Building Activity Rings with SVG](https://www.chilitime.design/2018/09/ActivityRings/)

**When to build:** Phase 2 -- after the card-based hub is working and there is real data to visualize.

Sources:
- [Apple Activity Rings HIG](https://developer.apple.com/design/human-interface-guidelines/activity-rings)
- [Building Activity Rings with SVG](https://www.chilitime.design/2018/09/ActivityRings/)
- [MKRingProgressView (GitHub)](https://github.com/maxkonovalov/MKRingProgressView)

---

### 3C. Quick Action Buttons (inspired by Linear's Cmd+K)

**Pattern:** A floating action button or keyboard shortcut that opens a search/command overlay. Actions are contextual to the current page.

**Implementation for haraya (progressive):**

Phase 1 (MVP): A "Quick Actions" floating button on the planning hub that opens a dropdown with:
- Add checklist item
- Log expense
- Add guest
- Edit website
- Ask Kasa

Phase 2: Full command palette (Cmd+K / Ctrl+K) using `cmdk` library:
- Search vendors by name
- Navigate to any page
- Quick RSVP status check ("How many guests confirmed?")
- Toggle views

**Technical approach:** Use `cmdk` (npm package) with shadcn/ui's Command component. It is unstyled by default and works with Tailwind.

---

### 3D. Onboarding Checklist (inspired by Stripe's Getting Started)

**Pattern:** A vertical checklist with steps that expand when clicked, showing a progress bar at the top. Each step has a clear action and a "mark complete" button. The Zeigarnik effect (urge to complete unfinished tasks) and endowed progress effect (starting at e.g. 1/5 done) drive engagement.

**Implementation for haraya:**

When a couple first signs up or visits `/plan`, show an onboarding checklist:

```
Getting Started with haraya                    2/6 complete
═══════════████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

[x] Set your celebration date                 ← auto-completed from website
[x] Add your partner's name                   ← auto-completed from website  
[ ] Choose your ceremony type                 → Click to set
[ ] Set your budget                           → Click to open budget tracker
[ ] Add your first guest                      → Click to open guest list
[ ] Publish your celebration website          → Click to open website editor
```

**Key implementation details:**
- Show progress as "X of Y complete" with a progress bar
- Pre-complete steps that already have data (from localStorage or Supabase)
- Each incomplete step is clickable and navigates to the relevant tool
- Once all steps are complete, replace the checklist with a "You're all set!" message and show the card-based hub
- Use the endowed progress effect: start at 1/6 by auto-completing the "Create your account" step

Sources:
- [Stripe Onboarding Patterns](https://docs.stripe.com/stripe-apps/patterns/onboarding-experience)
- [SaaS Onboarding Best Practices 2025 (insaim.design)](https://www.insaim.design/blog/saas-onboarding-best-practices-for-2025-examples)
- [Onboarding UX Patterns (Userpilot)](https://userpilot.medium.com/onboarding-ux-patterns-and-best-practices-in-saas-c46bcc7d562f)

---

### 3E. Dashboard Widgets (inspired by Shopify admin)

**Pattern:** A grid of widgets showing real-time data from different parts of the system. Widgets are compact, scannable, and link to deeper views.

**Implementation for haraya's planning hub:**

```
Row 1: [Countdown Widget]           [RSVP Summary Widget]
        87 days to go                42 confirmed / 15 pending / 3 declined
        March 15, 2027               60 total invited

Row 2: [Budget Widget]              [Checklist Widget]
        ₱320K of ₱500K spent        Next: Book photographer (due in 2 weeks)
        64% of budget used           23 of 44 tasks complete

Row 3: [Website Widget]             [Quick Actions Widget]
        Published: marco-and-pia     [Add Guest] [Log Expense] [Edit Site]
        12 page views this week
```

**Layout:**
- Use Shopify's recommended two-column equal-width layout for dashboard pages
- Each widget: `rounded-lg border border-border bg-bg-primary p-5`
- Widgets link to their respective tool pages
- On mobile: stack to single column

Sources:
- [Shopify App Design Guidelines](https://shopify.dev/docs/apps/design)
- [Shopify Polaris Design System](https://polaris-react.shopify.com/design)
- [Admin Dashboard UI/UX Best Practices 2025](https://medium.com/@CarlosSmith24/admin-dashboard-ui-ux-best-practices-for-2025-8bdc6090c57d)

---

## 4. OPEN SOURCE WEDDING TEMPLATES ON GITHUB

### Notable Projects

**rampatra/wedding-website** (High stars)
- Static site hosted on GitHub Pages
- RSVP data stored in Google Sheets via Google Apps Script
- Single-page design with scroll-based sections
- URL: https://github.com/rampatra/wedding-website

**MattiasHenders/wedding-template** (React, MIT license)
- Built with React
- Features: RSVP management, gift registry display, interactive maps, mobile-friendly
- Clean component structure that could serve as reference
- URL: https://github.com/MattiasHenders/wedding-template

**czue/django-wedding-website** (Python/Django)
- Unique invitation URLs per party with pre-populated guest names
- Online RSVP with meal selection and validation
- Guest grouping (families RSVP together)
- URL: https://github.com/czue/django-wedding-website

**michax/next.js-wedding-template-v1** (Next.js + MongoDB)
- Full-stack with Next.js and MongoDB
- Planning and organizing features beyond just a website
- URL: https://github.com/michax/next.js-wedding-template-v1

**fderuiter/wedding_website** (Next.js + Prisma + Tailwind)
- Next.js, Vercel Hobby plan, Tailwind CSS, Prisma, TypeScript
- Data scraper for vendor information
- URL: https://github.com/fderuiter/wedding_website

### Key Takeaways for haraya:
- The Google Sheets RSVP pattern (rampatra) is clever for zero-cost hosting but haraya already uses Supabase which is superior
- The unique-URL-per-party pattern (czue/django) is the best RSVP UX -- guests get a personalized link that pre-fills their names. haraya should implement this
- Most open-source templates are single-page scroll sites, validating haraya's current approach
- None of these templates offer a visual editor -- they all require code changes. This is haraya's opportunity: provide the template quality of open source with the editing ease of Joy/Zola

Sources:
- [GitHub: wedding-website topic](https://github.com/topics/wedding-website)
- [GitHub: wedding-rsvp topic](https://github.com/topics/wedding-rsvp)

---

## 5. FILIPINO WEDDING PLANNING TOOLS

### Kasal.com
- Established 2001, the first Filipino wedding website
- Primarily a vendor directory and editorial content site
- Features: vendor search by region (Manila, Tagaytay, Cebu, Boracay), wedding fair listings, wedding packages
- Pioneer organizer of "Kasalang Filipino" national wedding fair
- **UX assessment:** Dated design, not mobile-optimized, feels like a 2010s directory site. Navigation is cluttered. No planning tools, no RSVP, no website builder
- **What haraya can learn:** Kasal.com validates the need for a Filipino-specific platform. Their regional vendor organization (by province/city) is useful. Their all-inclusive package listings are a feature haraya could eventually offer
- URL: https://kasal.com/

### Kasalculator
- Budget planning tool specifically for Filipino weddings
- Uses real Philippine market data for cost estimates
- Full budget breakdown report available for PHP 100
- **What haraya can learn:** The concept of using real Philippine market data for budget suggestions is exactly what haraya's BudgetTracker should do. The current suggested percentages ("Venue & Catering: 35-40%") could be enhanced with actual peso ranges based on Metro Manila, provincial, and destination wedding averages
- URL: https://www.kasalculator.com/

### Bride and Breakfast PH
- The Philippines' leading wedding blog/media company
- Not a planning tool -- purely editorial content and vendor directory
- Real wedding features, vendor recommendations, trend articles
- **What haraya can learn:** Bride and Breakfast has the brand trust that haraya needs to build. Their "Real Weddings" content format could inform haraya's Celebrations page. They are a potential partnership target, not a competitor
- URL: https://brideandbreakfast.ph/

### Weddings At Work
- Online wedding resource for Filipino couples anywhere in the world
- Targets the Filipino diaspora (OFW couples planning from abroad)
- URL: https://weddingsatwork.com/

### Key Insight for haraya:
The Filipino market has NO digital-first planning platform. Kasal.com is a directory. Kasalculator is a budget calculator. Bride and Breakfast is a blog. None of them offer: website builder + RSVP + guest list + budget + checklist + vendor directory in one place. This is haraya's core opportunity, and the CLAUDE.md correctly identifies this gap.

Sources:
- [Kasal.com](https://kasal.com/)
- [Kasalculator](https://www.kasalculator.com/)
- [Bride and Breakfast PH](https://brideandbreakfast.ph/)
- [Digital Wedding Planning in the Philippines](https://dlweddingsforless.com/digital-wedding-planning/)
- [Tech, Trends & Traditions: Manila Wedding Planners 2025](https://krishaelseventsandconcepts.com/blog/tech-trends-traditions-manila-wedding-planners-2025/)

---

## 6. FREE RSVP TOOLS WITH GOOD UX

### Ranked by Guest Experience Quality:

**1. Joy (Best overall)**
- Smart RSVP: multi-event, family grouping, custom questions per event, per-guest visibility
- Mobile-first design
- No app download required for guests
- Completely free

**2. Zola (Best integration)**
- RSVP feeds directly into guest list, seating chart, and event tracking
- Contact Collector built into RSVP flow
- Address collection for paper invitations
- Free

**3. RSVPify (Best for complex events)**
- Professional-grade form logic
- Ticketed events support
- Free for up to 100 guests, paid plans from $24/month
- Best for large or multi-venue celebrations
- URL: https://rsvpify.com/

**4. JotForm (Most flexible)**
- General form builder adapted for wedding RSVP
- Ready-made wedding RSVP templates
- Conditional logic for complex forms
- Free tier with limitations
- URL: https://www.jotform.com/

**5. The Knot (Most familiar)**
- Simple, straightforward RSVP
- Private or public mode
- Real-time notifications
- Free

### RSVP UX Best Practices (synthesized from all platforms):

1. **Guest name pre-fill:** The guest should never have to type their full name if they were invited. Use unique URLs or lookup-by-name
2. **Family grouping:** Allow one person to RSVP for their entire party (spouse + children)
3. **Multi-event support:** Let guests accept some events and decline others (ceremony yes, rehearsal dinner no)
4. **Dietary/special needs:** Always ask about dietary restrictions, accessibility needs
5. **Confirmation feedback:** Show a clear "Thank you" screen after submission with what they responded
6. **Mobile-first form:** Large tap targets, minimal scrolling, no tiny dropdowns
7. **Real-time couple notification:** Send an email/push notification to the couple when someone RSVPs

### How haraya's current RSVP compares:

haraya's `CoupleWebsite.tsx` RSVP form currently has:
- Name input
- Attending yes/no buttons ("Joyfully Accept" / "Respectfully Decline")
- Dietary restrictions (optional)
- Message to couple (optional)

**Missing from best-in-class:**
- No guest name pre-fill or unique URLs
- No family grouping
- No multi-event support (cannot RSVP separately to ceremony vs. reception)
- No real-time notifications
- No plus-one management
- No meal choice selection (beyond dietary restrictions)

Sources:
- [Zola: Best Online RSVP Tools Comparison](https://www.zola.com/expert-advice/best-online-wedding-rsvp-tools)
- [Joy: Top-Rated Wedding Websites with RSVP](https://withjoy.com/blog/11-top-rated-wedding-websites-with-rsvp-features-real-couples-picks/)
- [Jotform: Top Online Wedding RSVP Tools 2026](https://www.jotform.com/blog/online-wedding-rsvp/)

---

## 7. PHOTO SHARING PATTERNS (NO-APP-DOWNLOAD)

### The Gold Standard Pattern:

All leading wedding photo sharing tools in 2025 converge on the same flow:

1. **Couple creates an album** (takes 2 minutes)
2. **Couple gets a QR code** and optionally a shareable link
3. **QR code is displayed** at the venue (on table cards, signage, or printed invitations)
4. **Guest scans QR code** on their phone camera
5. **Browser opens** -- no app download, no sign-up, no account creation
6. **Guest uploads photos/videos** directly from their camera roll or takes new ones
7. **Photos appear** in a shared gallery that the couple can view in real-time
8. **Optional: live slideshow** displays uploaded photos on a screen at the venue

### Top Platforms:

**GuestCam** (guestcam.co)
- No app download, QR code or private link
- Face recognition: guests upload a selfie to find all photos they appear in
- Live slideshow
- 14 months of access
- Customizable Canva QR templates
- Co-host collaboration

**POV** (pov.camera)
- "Disposable camera on your phone" -- retro-styled capture experience
- Uses App Clips (iOS) and Instant Apps (Android) -- loads instantly from QR, no store download
- Retro film filter aesthetic
- Free tier available

**Kululu** (kululu.com)
- No app download, no registration
- Live Photo Wall slideshow that updates in real-time
- Digital album link or QR code
- Free

**Wedding Photo Swap** (weddingphotoswap.com)
- Unlimited guests, unlimited uploads
- No app download
- QR code or private link

### How haraya's photo feature compares:

haraya already has:
- `guestPhotosEnabled` toggle on the celebration website
- `guestPhotosAutoApprove` toggle
- `PhotoUpload.tsx` page at `/c/:slug/photos`
- `PhotoAlbum.tsx` page at `/c/:slug/album`
- `PhotoDashboard.tsx` for couple to review photos

**Missing from best-in-class:**
- No QR code generation for physical display at venue
- No live slideshow/Photo Wall feature
- No face recognition (advanced, Phase 3+)
- No download-all feature for couple to get all photos after the event

**Priority addition:** QR code generation. This is the single most impactful photo feature. Use a library like `qrcode.react` to generate a QR code that links to `/c/:slug/photos`. Display it in the Share section of the website editor so couples can print it.

Sources:
- [GuestCam](https://guestcam.co/)
- [POV Camera](https://pov.camera/)
- [Kululu](https://www.kululu.com/)
- [Wedding Photo Swap](https://www.weddingphotoswap.com/)
- [Best Wedding Photo Sharing Apps (Honcho)](https://thehoncho.app/blog/the-8-best-wedding-photo-sharing-apps/)

---

## 8. GAP ANALYSIS: haraya's CURRENT STATE vs. BEST IN CLASS

### Current Architecture Review

Based on the codebase at `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/`:

**What haraya already has that competitors do well:**

| Feature | haraya Status | Competitor Benchmark |
|---------|--------------|---------------------|
| Celebration website builder | Form-based editor with 4 themes, preview mode | Joy has 601 templates, live side-by-side preview |
| Color themes | 4 (Classic Ivory, Modern Blush, Garden Green, Midnight) | Joy has themes + layouts + art overlays |
| RSVP form | Basic (name, yes/no, dietary, message) | Joy has multi-event, family grouping, custom questions |
| Photo upload | Basic upload + album pages exist | GuestCam has QR codes, face recognition, live slideshow |
| Checklist | 44 items, ceremony-type filters, localStorage | Zola auto-generates timeline from wedding date |
| Budget tracker | Categories with suggested %, localStorage | Zola has payment reminders, vendor booking integration |
| Guest list | Page exists (`GuestList.tsx`) | Joy has smart grouping, event visibility, address collection |
| Vendor directory | 12 mock vendors with filters | The Knot has hundreds of thousands of real vendors |
| Filipino-specific features | Ceremony types, CENOMAR, Barong Tagalog, GCash/Maya/bank transfer | No competitor offers this |
| Inclusive design | Gender-neutral labels, "All Celebrations Welcome" badge | Joy and Zola are beginning to add inclusivity options |

**Critical gaps (ordered by impact):**

1. **No unified dashboard/hub** -- Tools are separate pages with no shared data view
2. **No split-screen editor** -- Edit and Preview are separate tabs, not side-by-side
3. **No onboarding flow** -- New users land on a blank form with no guidance
4. **No data integration between tools** -- Checklist, budget, guest list, and website do not share data
5. **No multi-event RSVP** -- Cannot handle ceremony + reception + after-party separately
6. **No guest name pre-fill** -- Guests must type their name to RSVP
7. **No QR code for photo sharing** -- Missing the physical-to-digital bridge
8. **No date-based auto-scheduling** -- Checklist timeframes are static, not calculated from wedding date
9. **Limited templates** -- 4 color themes, 1 layout, no art/decoration overlays
10. **No real-time notifications** -- Couple does not get notified of new RSVPs

### haraya's Competitive Advantage (What No One Else Offers):

1. Filipino ceremony types (Catholic, Civil, Muslim, Civil Union, Other with specific requirements)
2. Filipino payment methods (GCash, Maya, bank transfer)
3. Filipino wedding terminology (Ninong/Ninang, entourage system, CENOMAR, Pre-Cana)
4. Filipino dress code options (Barong Tagalog & Filipiniana)
5. PHP currency with local formatting
6. "Woven Heritage" design system rooted in Filipino textile traditions
7. Inclusive by default (gender-neutral, all celebration types)

---

## 9. PRIORITIZED RECOMMENDATIONS FOR haraya

### Tier 1: High Impact, Low-to-Medium Effort (Do Now)

**R1. Transform `/plan` into a Planning Hub Dashboard**
- Replace the current checklist/budget tab view with a card-based dashboard
- Show 6 cards: Checklist, Budget, Guest List, Website, Vendors, Kasa
- Each card shows current status and progress
- Add an onboarding checklist for new users (Stripe pattern)
- Reference: The current `Plan.tsx` at `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/pages/Plan.tsx`

**R2. Add Split-Screen Editor for Desktop**
- On screens >= 1024px, show Edit form on the left and live Preview on the right
- On mobile, keep the current tab-based approach
- Reference: Joy's editor and Linktree's live preview sidebar
- File to modify: `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/pages/CoupleWebsite.tsx`

**R3. Add QR Code Generation to Share Section**
- Use `qrcode.react` to generate a QR code linking to `/c/:slug/photos`
- Also generate a QR for the celebration website URL (`/c/:slug`)
- Show both in the Share tab with "Download as PNG" and "Print" buttons
- File to modify: `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/components/CelebrationWebsite/ShareSection.tsx`

**R4. Date-Based Checklist Auto-Scheduling**
- When a wedding date is set (in website editor or a new onboarding flow), calculate which checklist items are overdue, due soon, or upcoming
- Show "Due in X weeks" or "Overdue" badges on checklist items
- Sort by urgency by default
- File to modify: `/Users/mervindecastro/Documents/Projects/everaftr/everaftr-app/src/components/PlanningTools/Checklist.tsx`

### Tier 2: High Impact, Medium Effort (Do Next)

**R5. Multi-Event RSVP**
- Allow couples to define multiple events (Ceremony, Reception, Rehearsal Dinner, After-Party)
- Each event has its own guest list (who can see it, who can RSVP)
- RSVP form shows per-event accept/decline
- This requires schema changes in Supabase

**R6. Guest Family Grouping**
- Allow couples to group guests into families/parties
- One person RSVPs for the whole group
- Show group RSVP status in the guest list

**R7. Add More Templates/Themes**
- Expand from 4 color themes to at least 12
- Consider Filipino-specific themes: Sampaguita (white/green), Fiesta (vibrant multi-color), Capiz (pearlescent), Terno (formal/elegant)
- Add layout options: Scroll (current), Split-screen hero, Photo-first, Minimal text

**R8. Unified Data Layer**
- Create a shared data context or store that connects checklist, budget, guest list, and website data
- When a guest RSVPs, update the guest count on the dashboard
- When a budget item is logged, update the relevant checklist item

### Tier 3: Medium Impact, Higher Effort (Plan For)

**R9. Command Palette (Cmd+K)**
- Install `cmdk` library
- Build a command palette with: navigation, quick actions, search
- Contextual: shows different options on the planning hub vs. the website editor

**R10. Progress Rings**
- Build Apple Activity-style rings showing overall planning progress
- Outer ring: checklist (twilight-blue)
- Middle ring: budget health (golden-hour)
- Inner ring: website completeness (accent-primary)

**R11. Unique RSVP URLs per Guest/Party**
- Generate unique invitation URLs: `/c/:slug/rsvp/:invite-code`
- Pre-fill guest name and show only their invited events
- This is the gold-standard RSVP experience (see czue/django-wedding-website)

**R12. Live Photo Slideshow**
- Build a `/c/:slug/slideshow` page that displays newly uploaded photos in a slideshow format
- Auto-refreshes every 10 seconds
- Designed to be displayed on a TV/projector at the venue

---

## APPENDIX: COMPONENT-LEVEL IMPLEMENTATION NOTES

### For R1 (Planning Hub Dashboard):

The new `/plan` page structure should be:

```
PlanningHub
  ├── OnboardingChecklist (shown if user is new, hidden when complete)
  ├── ProgressSummary (countdown + overall progress ring/bar)
  ├── ToolCards (grid of 6 cards)
  │   ├── ChecklistCard → navigates to /plan/checklist
  │   ├── BudgetCard → navigates to /plan/budget
  │   ├── GuestListCard → navigates to /guests
  │   ├── WebsiteCard → navigates to /our-wedding
  │   ├── VendorsCard → navigates to /vendors
  │   └── KasaCard → navigates to /kasa
  └── RecentActivity (last 5 RSVPs, budget changes, checklist completions)
```

This means adding new sub-routes under `/plan`:
- `/plan` -- Hub dashboard (new)
- `/plan/checklist` -- Full checklist (currently inline)
- `/plan/budget` -- Full budget tracker (currently inline)

### For R2 (Split-Screen Editor):

In `CoupleWebsite.tsx`, wrap the edit/preview content in a conditional layout:

```
Desktop (>= 1024px):
┌─────────────────────────────────────────────┐
│ Toolbar (title, tabs, publish button)       │
├──────────────────┬──────────────────────────┤
│ EditMode         │ PreviewMode              │
│ (scrollable)     │ (iframe-like, scrollable)│
│                  │                          │
└──────────────────┴──────────────────────────┘

Mobile:
┌─────────────────────────────────────────────┐
│ Toolbar (title, tabs, publish button)       │
├─────────────────────────────────────────────┤
│ EditMode OR PreviewMode (tab-based)         │
│                                             │
└─────────────────────────────────────────────┘
```

### For R3 (QR Code):

Install: `npm install qrcode.react`

In `ShareSection.tsx`, add:
- QR code for website URL: `https://[domain]/c/:slug`
- QR code for photo upload: `https://[domain]/c/:slug/photos`
- Download button using `canvas.toDataURL()`

---

This document serves as the comprehensive reference for building haraya's planning hub and improving the website builder. The recommendations are ordered by impact and effort, with specific file paths and implementation patterns for each.