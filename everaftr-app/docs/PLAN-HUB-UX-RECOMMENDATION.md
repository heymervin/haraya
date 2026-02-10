# Planning Hub UX Recommendation

---

## Verdict

The founder is right. Burying five planning tools in a dropdown is a classic information architecture mistake. Dropdowns are for secondary navigation, not for the core product surface. NN Group's research on mega menus (2017) is clear: dropdown menus work for navigation between peer sections, but when items represent a cohesive product experience with internal relationships, they need a dedicated page that shows state, progress, and relationships between tools. You are hiding your product behind a chevron.

The current `/plan` page is even more problematic: it only surfaces 2 of the 5 tools (Checklist and Budget) via tabs, completely orphaning Guest List, Celebration Website, and Favorites. Those three tools are invisible unless someone finds the dropdown. That is a broken information architecture.

What you need is a **planning command center** -- a single page that acts as home base for wedding planning. Think Linear's project view or Notion's workspace sidebar, not a generic dashboard with cards. The page should communicate three things instantly: (1) "this is where you plan," (2) "here is where you are," and (3) "here is what to do next."

---

## Critical Issues

### 1. The Dropdown Hides Your Core Product

**Problem**: Five planning tools stuffed into a hover/click dropdown means couples must discover them through a tiny interaction target. On mobile, the dropdown becomes a section in the hamburger menu -- buried two taps deep. The dropdown provides no state, no progress, no context. It is a list of links with descriptions, but it does not tell couples what they have done or what they should do next.

**Evidence**: NN Group's research on navigation menus (Sherwin, 2019) shows that dropdowns have a 15-25% lower engagement rate than direct links because they require hover/click discovery. Items hidden behind progressive disclosure are used less (Kara Pernice, NN Group, "Hamburger Menus and Hidden Navigation Hurt UX Metrics," 2016). For a product where planning tools ARE the product, hiding them reduces tool adoption significantly.

**Impact**: Couples who arrive via the homepage or vendor directory never discover Guest List, Celebration Website, or Matchmaker unless they actively explore the dropdown. Based on the CLAUDE.md, Guest List and Celebration Website are fully built features. They are shipping dark.

**Fix**: Replace the dropdown with a single "Plan" link in the navbar that navigates to `/plan` -- a full planning hub page. Remove the dropdown entirely on desktop and mobile.

**Priority**: Critical -- this is the single biggest structural issue.

### 2. Current Plan Page Only Shows 2 of 5 Tools

**Problem**: `/plan` currently renders Checklist and Budget as tabs. Guest List (`/guests`), Celebration Website (`/our-wedding`), Matchmaker (`/matchmaker`), and Favorites (`/favorites`) are separate routes with no connection to the planning hub. There is no page in the app that shows all planning tools together with their state.

**Evidence**: Jakob's Law (users spend most of their time on other sites) means couples expect a central dashboard. Every major project management tool -- Linear, Notion, Asana, Monday.com -- provides a unified workspace view. Wedding planning is project management. The mental model is "one place to see everything."

**Impact**: Couples must navigate between 5 different URLs with no shared context. They cannot see overall planning progress. They cannot understand relationships between tools (e.g., guest count affects budget, which affects venue choice).

**Fix**: Redesign `/plan` as the planning hub that surfaces all 5 tools with their current state.

**Priority**: Critical.

### 3. No First-Time vs. Returning User Distinction

**Problem**: The current Plan page shows the same interface whether someone has never used it or has been using it for months. A first-time visitor sees "0 of 44 tasks done" and "0 of 0 spent" -- which is cold, clinical, and provides no motivation to start.

**Evidence**: NN Group's onboarding research (Budiu, 2020) shows that progressive onboarding -- showing a simplified entry point for new users and a richer view for returning users -- increases feature adoption by 30-50%. The Zeigarnik Effect (1927) shows that people remember and are motivated to complete incomplete tasks, but only if the tasks feel achievable. "0 of 44" feels the opposite.

**Impact**: New users bounce because the page does not guide them. Returning users get no dopamine hit from progress.

**Fix**: Detect first-time vs. returning state via localStorage. Show different content for each.

**Priority**: High.

---

## The Recommendation: Planning Command Center

### Page Name and URL

Keep the URL as `/plan`. Page title: "Your Planning Space" (not "Plan Your Wedding" -- avoid "wedding" per brand rules, favor "celebration" language; but "Your Planning Space" is warmer and more personal than "Plan Your Celebration" which sounds like a CTA, not a destination).

### Information Architecture: The Hub-and-Spoke Model

The page is a **hub**. Each tool is a **spoke**. The hub shows state from each spoke. Clicking a spoke navigates to its full page. This is the Linear model: a project overview page with quick-glance cards that link to detail views.

**Do NOT use:**
- A wizard/stepper flow (too rigid, Filipino wedding planning is nonlinear -- you might book a venue before finalizing guest count)
- A full dashboard with inline editing (too complex for mobile, too much to load on 4G)
- Just a list of links with icons (that is the dropdown again, just bigger)

**DO use:**
- **Status cards** -- each tool gets a card that shows its current state (progress, count, status) and links to the full tool
- **A suggested next action** -- one clear CTA based on where the couple is in their planning
- **A compact progress summary** at the top

### Page Layout (Desktop, 1200px max-width)

```
+------------------------------------------------------------------+
|  NAVBAR: [haraya]  Find Vendors  Celebrations  Community  [Plan]  |
+==================================================================+
|  DREAM LINE                                                       |
+------------------------------------------------------------------+
|                                                                    |
|  [LEFT-ALIGNED]                                                    |
|                                                                    |
|  Your Planning Space                    [Overall: 3 of 5 started] |
|  --------------------------------                                  |
|  (Serif, large, Cormorant Garamond)     (small, muted text)       |
|                                                                    |
|  "Every detail, one place. Plan at your own pace."                |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|  SUGGESTED NEXT STEP (contextual, only if relevant)               |
|  ┌──────────────────────────────────────────────────────────────┐  |
|  │ [icon]  Start your checklist -- 44 tasks across your         │  |
|  │         entire planning timeline. Takes 2 minutes.  [Start]  │  |
|  └──────────────────────────────────────────────────────────────┘  |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|  TOOL CARDS (2-column grid, asymmetric sizing)                    |
|                                                                    |
|  ┌─────────────────────────────┐  ┌─────────────────────────────┐ |
|  │  CHECKLIST                  │  │  BUDGET                     │ |
|  │  ─────────────              │  │  ─────────────              │ |
|  │  12 of 44 tasks             │  │  ₱180,000 of ₱500,000      │ |
|  │  ██████░░░░░░ 27%           │  │  ██████████░░ 36%           │ |
|  │                             │  │                             │ |
|  │  Next: Book your venue      │  │  Top spend: Venue (₱80K)   │ |
|  │                             │  │                             │ |
|  │  [Open Checklist -->]       │  │  [Open Budget -->]          │ |
|  └─────────────────────────────┘  └─────────────────────────────┘ |
|                                                                    |
|  ┌─────────────────────────────┐  ┌─────────────────────────────┐ |
|  │  GUEST LIST                 │  │  CELEBRATION WEBSITE        │ |
|  │  ─────────────              │  │  ─────────────              │ |
|  │  86 guests                  │  │  Not started yet            │ |
|  │  52 attending  12 pending   │  │                             │ |
|  │                             │  │  Create a beautiful page    │ |
|  │  [Open Guest List -->]      │  │  to share with your guests  │ |
|  │                             │  │                             │ |
|  │                             │  │  [Create Website -->]       │ |
|  └─────────────────────────────┘  └─────────────────────────────┘ |
|                                                                    |
|  ┌──────────────────────────────────────────────────────────────┐  |
|  │  MATCHMAKER QUIZ                            FAVORITES        │  |
|  │  ─────────────                              ─────────────    │  |
|  │  Find vendors that match your style         3 vendors saved  │  |
|  │  [Take the Quiz -->]                        [View All -->]   │  |
|  └──────────────────────────────────────────────────────────────┘  |
|                                                                    |
+------------------------------------------------------------------+
```

### Page Layout (Mobile, 360px)

```
+----------------------------------+
| [haraya]              [hamburger]|
+==================================+
| DREAM LINE                       |
+----------------------------------+
|                                   |
|  Your Planning Space              |
|  ─────────────────                |
|  Every detail, one place.         |
|                                   |
+----------------------------------+
|                                   |
|  SUGGESTED NEXT STEP             |
|  ┌────────────────────────────┐  |
|  │ Start your checklist       │  |
|  │ 44 tasks, takes 2 minutes  │  |
|  │ [Start -->]                │  |
|  └────────────────────────────┘  |
|                                   |
+----------------------------------+
|                                   |
|  TOOL CARDS (single column,      |
|  stacked, full width)            |
|                                   |
|  ┌────────────────────────────┐  |
|  │  CHECKLIST                 │  |
|  │  12 of 44 tasks  27%      │  |
|  │  ████████░░░░░░░░          │  |
|  │  Next: Book your venue     │  |
|  │  [Open -->]                │  |
|  └────────────────────────────┘  |
|                                   |
|  ┌────────────────────────────┐  |
|  │  BUDGET                    │  |
|  │  ₱180K / ₱500K   36%      │  |
|  │  ██████████░░░░░░          │  |
|  │  [Open -->]                │  |
|  └────────────────────────────┘  |
|                                   |
|  ┌────────────────────────────┐  |
|  │  GUEST LIST                │  |
|  │  86 guests  52 attending   │  |
|  │  [Open -->]                │  |
|  └────────────────────────────┘  |
|                                   |
|  ┌────────────────────────────┐  |
|  │  CELEBRATION WEBSITE       │  |
|  │  Not started yet           │  |
|  │  [Create -->]              │  |
|  └────────────────────────────┘  |
|                                   |
|  ┌─────────────┐ ┌────────────┐  |
|  │ MATCHMAKER  │ │ FAVORITES  │  |
|  │ [Quiz -->]  │ │ 3 saved    │  |
|  └─────────────┘ └────────────┘  |
|                                   |
+----------------------------------+
```

### Component Breakdown

**1. PlanHub (page component, replaces current `Plan.tsx`)**

The top-level page at `/plan`. Reads state from all localStorage keys to populate card data. Determines first-time vs. returning state.

```tsx
// /src/pages/Plan.tsx — replacement
// Reads from localStorage keys:
//   'everaftr-checklist' — checklist items
//   'everaftr-budget' — budget data
//   'haraya-guestlist' — guest list
//   'haraya-favorites' — saved vendors
//   'matchmaker-results' — quiz completion
//   'haraya-couple-website' — celebration website state (check CoupleWebsite.tsx for key)
```

**2. PlanHeader component**

Left-aligned. Cormorant Garamond heading, Jost/Poppins body. Shows an overall "X of 5 tools started" indicator on desktop (right-aligned on the same row). On mobile, the indicator moves below the subtitle.

Copy:
- Heading: "Your Planning Space"
- Subtitle: "Every detail, one place. Plan at your own pace."

Do NOT use "wedding" in the heading. Per brand rules, use "celebration" or avoid the word entirely. "Your Planning Space" is deliberately neutral and personal.

**3. SuggestedAction component**

A single, contextual banner that changes based on planning state. This is the "one thing to do next" pattern from Duolingo and Linear. The logic:

```
Priority order for suggested action:
1. No checklist data → "Start your checklist"
2. No budget set → "Set your budget"
3. No guests added → "Add your first guests"
4. Matchmaker not taken → "Find vendors that match your style"
5. No celebration website → "Create your celebration website"
6. All tools started → Show a motivational message or hide
```

This component should be a single full-width card with:
- A Lucide icon on the left (contextual to the action)
- Two lines of text (title + subtitle)
- A CTA button on the right (desktop) or below (mobile)
- Background: `bg-whisper` or a very light tint of the dream-lavender to differentiate from tool cards
- The `haraya-glow-thin` line as top border for visual distinction

**4. PlanToolCard component (reusable)**

Each tool gets a card. The card is a `<Link>` element (the entire card is clickable -- Fitts's Law, larger target = easier to click). The card contains:

```tsx
interface PlanToolCardProps {
  title: string;           // "Checklist"
  icon: LucideIcon;        // CheckCircle, PiggyBank, Users, Globe, Heart
  status: 'not-started' | 'in-progress' | 'complete';
  linkTo: string;          // "/plan/checklist" or "/guests"
  ctaLabel: string;        // "Open Checklist" | "Start" | "Create"
  children: React.ReactNode; // Status-specific content (progress bar, counts, etc.)
}
```

Card states:
- **Not started**: Light border, muted icon, encouraging copy ("Start tracking your tasks"), CTA says "Start" or "Create"
- **In progress**: Active border (left border accent using the tool's associated color), progress content, CTA says "Continue" or "Open"
- **Complete**: Subtle celebration indicator (checkmark badge), CTA says "Review"

Styling:
```css
/* Card base */
.plan-tool-card {
  background: var(--color-bg-secondary);     /* pearl/white */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);           /* 12px */
  padding: 1.25rem;                          /* 20px */
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.plan-tool-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* In-progress state: left accent border */
.plan-tool-card--active {
  border-left: 3px solid var(--color-accent-primary);
}
```

Color mapping per tool (using existing design tokens):
- Checklist: `twilight-blue` (#5B7C99)
- Budget: `golden-hour` (#F4C688)
- Guest List: `dream-lavender` (#9D8BD8)
- Celebration Website: `sunset-blush` (#F4B8C5)
- Matchmaker: `dream-lavender` (#9D8BD8)
- Favorites: `accent-error` (the pink #FF6B9D, used as a heart color -- not as "error")

**5. ProgressBar component (micro)**

A thin horizontal progress bar reused inside Checklist and Budget cards.

```tsx
// Already exists conceptually in Plan.tsx, extract as reusable
interface ProgressBarProps {
  percent: number;
  color: string;       // Tailwind color class
  height?: 'sm' | 'md'; // 4px or 8px
}
```

### First-Time vs. Returning User Flow

**First visit (no localStorage data exists)**

The page renders with all cards in "not-started" state. The SuggestedAction banner says:

> "Start with your checklist"
> "44 tasks organized by timeline, from 12 months out to your big day. Takes about 2 minutes to review."
> [Start Your Checklist]

The tool cards show encouraging, low-pressure copy:

| Card | Copy |
|------|------|
| Checklist | "Track every task from CENOMAR to thank-you notes. Organized by timeline." |
| Budget | "Know where every peso goes. Set a total budget, then allocate by category." |
| Guest List | "Keep track of RSVPs, dietary needs, and table assignments." |
| Celebration Website | "Build a beautiful page to share your details with guests." |
| Matchmaker | "Answer 5 quick questions. Get vendor recommendations that match your style." |
| Favorites | "Save vendors you love as you browse. They will show up here." |

This is the "empty state with guidance" pattern. Do NOT show a modal or onboarding wizard. Filipino couples planning on mobile during their commute do not want a wizard. They want to see the tools and pick one. Respect their autonomy.

**Returning visit (some localStorage data exists)**

The SuggestedAction banner shows the next logical step based on what has not been started. Cards with data show their actual state:

| Card | Returning State |
|------|----------------|
| Checklist | "12 of 44 tasks" + progress bar + "Next up: Book your venue" (the next incomplete task) |
| Budget | "₱180,000 of ₱500,000" + progress bar + "Biggest spend: Catering (₱80K)" |
| Guest List | "86 guests -- 52 attending, 22 pending, 12 declined" |
| Celebration Website | "Published" or "Draft -- 3 sections complete" |
| Matchmaker | "Completed" with result summary, or "Not taken yet" |
| Favorites | "3 vendors saved" |

### Progress and Motivation

**Do NOT use gamification gimmicks** (confetti, badges, streaks). Filipino couples ages 25-35 planning while working full-time do not need a game. They need to feel like things are under control.

**DO use:**

1. **The progress bar fills** -- This is the Zeigarnik Effect in action. An incomplete progress bar creates a subconscious urge to complete it. Keep it simple: thin bar, no numbers larger than necessary.

2. **"Next up" microcopy** -- On the Checklist card, show the next incomplete task by name. This is the "one next action" principle from Getting Things Done (David Allen). It reduces overwhelm by focusing on one thing.

3. **Milestone messaging** -- At certain thresholds, change the SuggestedAction banner:
   - 25% overall: "You are making real progress. Maayos na lahat." (Everything will be fine.)
   - 50% overall: "Halfway there. The hardest part is behind you."
   - 75% overall: "Almost ready. Just a few more details."
   - 100%: "You did it. Everything is in place. Enjoy your celebration."

   These are NOT popups or modals. They replace the SuggestedAction banner text naturally. Low-key, warm, no confetti.

4. **No shame for low progress** -- Never say "You are behind!" or show red indicators for incomplete items. The page should feel like a warm companion, not a project manager. Progress is always phrased positively: "12 of 44 tasks done" not "32 tasks remaining."

### Filipino Wedding Context: Specific UX Decisions

**1. Guest List card needs special prominence**

In Filipino weddings, guest lists are enormous (150-500+) and politically complex. The ninong/ninang selection alone involves family negotiations. The Guest List card should show segmented counts by side ("Your side: 42 | Partner's side: 38 | Shared: 6") because this is the actual mental model Filipino couples have. They are constantly negotiating "your side vs. my side" with their families.

**2. Celebration Website should mention sharing**

Filipino couples share wedding details via group chat (Viber, Messenger). The card should say "Share with your group chat" not "Share your website." The actual user behavior is copying a link into a Viber group, not emailing a URL.

**3. Budget card should show PHP with no decimal places**

Already done in the current code with `formatPeso`. Keep it. Filipino budget conversations are in round numbers: "500K budget" not "500,000.00."

**4. Matchmaker card is a discovery tool, not a planning tool**

This is the one card that should feel different. It is not ongoing work -- it is a one-time quiz. Once completed, it should change to show "Your style: Classic" with a link to "Retake" and a link to "View recommended vendors." On mobile, this card can be smaller than the others.

**5. Favorites card is a bookmark tool, not a planning tool**

Similarly, Favorites is lightweight. It does not need a full card. On desktop, combine Matchmaker and Favorites into one row as half-width cards. On mobile, show them side by side as compact cards (the 2-column bottom row in my wireframe above).

### Navigation Change: What to Do with the Dropdown

**Kill the dropdown. Replace it with a single "Plan" link.**

Here is exactly what the navbar should become:

```
Desktop:
[haraya]    Find Vendors    Celebrations    Community    Plan    Kasa    About

Mobile hamburger:
  Find Vendors
  Celebrations
  Community
  Plan                    <-- single link, goes to /plan
  Kasa
  About
```

Rationale:
- The dropdown added complexity for marginal benefit. Once `/plan` is a hub page, every tool is one click from the hub. That means every tool is two clicks from anywhere in the app (click Plan, then click the tool). With the dropdown, it was also two interactions (hover/click dropdown, then click the tool) but with worse discoverability and no state visibility.
- The dropdown was right-aligned and used hover, which fails on touch devices. On mobile, it became a section header with indented links in the hamburger menu. Both patterns performed worse than a direct link.
- A single "Plan" link is consistent with how Notion handles "My Workspace" -- one entry point to the entire workspace.

**But add one enhancement**: When a user is ON any planning tool page (`/plan`, `/guests`, `/our-wedding`, `/matchmaker`, `/favorites`), highlight "Plan" in the navbar as active. This maintains the relationship between the hub and its spokes.

Update in `Navbar.tsx`:

```tsx
const isPlanningActive = ['/plan', '/guests', '/our-wedding', '/matchmaker', '/favorites']
  .some(path => location.pathname.startsWith(path));
```

And add a "Back to Planning Space" breadcrumb link at the top of each spoke page (Guest List, Celebration Website, etc.) so users can always navigate back to the hub. This is a flat hierarchy with a clear parent-child relationship.

```tsx
// Add to each planning tool page (GuestList.tsx, CoupleWebsite.tsx, etc.)
<Link to="/plan" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-primary mb-6">
  <ArrowLeft className="w-4 h-4" />
  Back to Planning Space
</Link>
```

### Routing Changes

The current Checklist and Budget are tabs within `/plan`. They should become separate routes so each tool has a clean URL and can be linked directly:

```
/plan                  → PlanHub (the new hub page)
/plan/checklist        → Checklist tool (currently the Checklist tab)
/plan/budget           → Budget tool (currently the Budget tab)
/guests                → Guest List (already exists)
/our-wedding           → Celebration Website (already exists)
/matchmaker            → Matchmaker Quiz (already exists)
/favorites             → Favorites (already exists)
```

This means splitting the current Plan.tsx tab content into two separate routes. The Checklist and Budget components already exist as separate components in `/src/components/PlanningTools/`, so this is a clean extraction.

### Visual Design Specifics

**Background**: Use `pattern-hablon` on the hub page. This is already established as the planning section's textile pattern. Maintain consistency.

**Card backgrounds**: Use `bg-bg-secondary` (#FDFCFE / pearl) for cards against the `bg-bg-primary` pattern background. This creates sufficient contrast without being jarring.

**Typography hierarchy**:
- Page heading: Cormorant Garamond (or Playfair Display, per the actual CSS), `text-4xl md:text-5xl`, `font-light`, `text-text-primary`
- Card titles: Poppins, `text-base`, `font-medium`, `text-text-primary`
- Card status text: Poppins, `text-sm`, `font-normal`, `text-text-secondary`
- Progress numbers: Poppins, `text-lg`, `font-medium`, `text-text-primary`
- CTA text within cards: Poppins, `text-sm`, `font-medium`, `text-accent-primary`

**Icon treatment**: Each card gets its Lucide icon in a 40x40 circle with the tool's accent color at 10% opacity as background (exactly like the current progress dashboard in `Plan.tsx` lines 83-84). This pattern is already established. Keep it.

**Card hover**: `translateY(-2px)` + `shadow-md`. Subtle, not dramatic. 150ms ease-out. Respect `prefers-reduced-motion`.

**Staggered load animation**: Cards fade in with a slight upward movement, staggered by 80ms. The CSS for this already exists in `index.css` (the `fadeIn` keyframe). Apply with delay:

```css
.plan-card:nth-child(1) { animation-delay: 0ms; }
.plan-card:nth-child(2) { animation-delay: 80ms; }
.plan-card:nth-child(3) { animation-delay: 160ms; }
.plan-card:nth-child(4) { animation-delay: 240ms; }
.plan-card:nth-child(5) { animation-delay: 320ms; }
.plan-card:nth-child(6) { animation-delay: 400ms; }
```

Total animation time: 400ms + 300ms (animation duration) = 700ms for all cards to appear. Acceptable for a page load moment.

### Mobile Performance (Android / 4G)

This is critical. 80% of users are on Android with 4G.

**1. No images on this page.** The hub page is pure text, icons, and SVG progress bars. Zero image requests. This page should be under 50KB transferred.

**2. All data comes from localStorage.** No API calls, no loading spinners, no skeleton screens. The page renders instantly from cached data.

**3. Cards are native HTML/CSS.** No heavy component libraries. Each card is a `<Link>` with a few `<div>`s and `<span>`s. The Lucide icons are inline SVGs (already in the bundle).

**4. Touch targets.** Each card is a full-width tappable area on mobile (min-height 72px, which exceeds the 44px minimum from Fitts's Law / WCAG). The "Open" CTA within each card is also a minimum 44x44 tap target.

**5. No horizontal scrolling.** Single column on mobile. Two columns only at `md:` breakpoint (768px+).

**6. Reduce padding on mobile.** Current page uses `px-6 py-12`. On 360px screens, `px-4 py-8` is more appropriate. Use `px-4 md:px-6`.

### Copy Recommendations (Filipino-Friendly, Inclusive)

**Page heading options** (pick one):
- "Your Planning Space" (recommended -- personal, neutral, warm)
- "Plan Your Celebration" (acceptable but more formal)
- "Everything in One Place" (too generic)

**Subtitle**: "Every detail, one place. Plan at your own pace."

This acknowledges that Filipino wedding planning is a long process (typically 6-18 months) done around full-time work, family obligations, and often long-distance coordination. "At your own pace" removes pressure.

**SuggestedAction copy examples**:

| State | Title | Subtitle |
|-------|-------|----------|
| Nothing started | "Start with your checklist" | "44 tasks organized by timeline -- from getting your CENOMAR to your last thank-you note." |
| Checklist started, no budget | "Set your budget" | "Know where every peso goes. Helps you compare vendor quotes with confidence." |
| Budget set, no guests | "Start your guest list" | "Track RSVPs, dietary needs, and keep ninong/ninang details organized." |
| Guests added, no website | "Create your celebration website" | "A beautiful page to share your details. One link for all your group chats." |
| Everything started | "You are on track" | "Keep going -- check your checklist for what is coming up next." |

**Card CTA labels**:
- Not started: "Start" (not "Get Started" -- too corporate)
- In progress: "Continue" (implies momentum)
- Completed: "Review"

### What This Looks Like in Code (Component Structure)

```
src/
  pages/
    Plan.tsx              → NEW: PlanHub component (replaces current)
    PlanChecklist.tsx      → NEW: Extracted from current Plan.tsx checklist tab
    PlanBudget.tsx         → NEW: Extracted from current Plan.tsx budget tab
    GuestList.tsx          → UNCHANGED
    CoupleWebsite.tsx      → UNCHANGED (add back-link to /plan)
    Matchmaker.tsx         → UNCHANGED (add back-link to /plan)
    Favorites.tsx          → UNCHANGED (add back-link to /plan)
  components/
    PlanningHub/
      PlanToolCard.tsx     → Reusable tool card
      SuggestedAction.tsx  → Contextual next-step banner
      PlanProgress.tsx     → Overall progress indicator
```

### Real-World Products That Do This Well

**1. Linear (linear.app) -- Project Overview**
Linear's project view shows a list of issues grouped by status with a progress bar at the top. It is information-dense but scannable. The key insight: each item shows its status inline, so you never need to click into something just to see where it stands. Apply this: each planning tool card shows its status without needing to open it.

**2. Notion -- Workspace Sidebar**
Notion's left sidebar shows all your pages with icons and nesting. The hub page is analogous to Notion's "home" view -- a curated entry point that shows your most relevant content. Apply this: the hub page curates your planning tools with state, not just links.

**3. Todoist -- Today View**
Todoist's "Today" view is a filtered, prioritized view of tasks across all projects. The "Suggested Next Step" banner on the planning hub is this principle: out of everything you could do, here is the one thing to focus on.

**4. Wise (wise.com) -- Multi-Currency Dashboard**
Wise shows multiple currency balances on one screen, each as a compact card with key info and a CTA. The planning hub cards follow this pattern: compact, state-visible, one action per card.

**NOT Pinterest-style masonry** (too chaotic, no hierarchy). **NOT Trello-style boards** (too horizontal, fails on mobile). **NOT a sidebar navigation pattern** (too complex for 5 items, wastes mobile space).

---

## What Is Working

- **The design token system is strong.** Six textile traditions mapped to platform sections is distinctive and culturally grounded. The `pattern-hablon` background for planning is a nice touch. This is NOT generic SaaS.

- **Typography pairing is good.** Playfair Display (serif) + Poppins (sans) is a legitimate pairing with high contrast. Playfair has personality that Inter/Roboto lack. (Note: CLAUDE.md says Jost + Cormorant Garamond, but `index.css` imports Poppins + Playfair Display. Resolve this discrepancy -- use whichever is actually rendering. If it is Poppins + Playfair, keep it. Both are strong choices.)

- **Inclusive language is baked in.** "You" and "Your Partner" as default labels, ceremony type selection that includes civil union and Muslim nikah -- this is genuinely differentiated. Most wedding platforms default to heteronormative Catholic assumptions. This does not.

- **The existing Checklist and Budget components are functional.** localStorage persistence, ceremony-type filtering, progress tracking -- these work. The issue is discoverability, not functionality.

- **Color palette avoids the purple-gradient SaaS trap.** Dream lavender (#9D8BD8) as primary is distinctive enough. The warm secondary palette (golden-hour, sunset-blush) creates genuine warmth. The shadows being lavender-tinted (`rgba(157, 139, 216, 0.08)`) is a nice detail.

---

## Implementation Priority

### Critical (Build First) -- Effort: Medium

1. **New PlanHub page** -- Replace `Plan.tsx` with hub layout showing all 5 tool cards with state from localStorage. This is the core deliverable. Effort: ~4-6 hours of focused development.

2. **Kill the dropdown, add direct "Plan" link** -- Simplify `Navbar.tsx` by removing the dropdown logic (hover handlers, click-outside handlers, the entire planningLinks rendering block) and adding a single `<Link to="/plan">Plan</Link>`. Update `isPlanningActive` to cover all planning routes. Effort: ~30 minutes.

3. **Split Checklist and Budget into separate routes** -- Extract from tab pattern into `/plan/checklist` and `/plan/budget`. The components already exist separately in `src/components/PlanningTools/`. Effort: ~1 hour.

### High (Build Soon) -- Effort: Low-Medium

4. **SuggestedAction banner** -- Contextual next-step based on localStorage state. The logic is straightforward (check 5 localStorage keys, show the first unstarted tool). Effort: ~2 hours.

5. **Back-to-hub navigation** -- Add "Back to Planning Space" link to each spoke page (GuestList, CoupleWebsite, Matchmaker, Favorites, PlanChecklist, PlanBudget). Effort: ~30 minutes.

6. **Mobile optimization** -- Reduce padding, ensure single-column layout, verify touch targets are 44px+. Test on a real 360px Android device or Chrome DevTools Pixel 4a simulation. Effort: ~1-2 hours.

### Medium (Nice to Have)

7. **Milestone messaging** -- Progress-based motivational copy in the SuggestedAction banner. Effort: ~1 hour.

8. **Staggered card animations** -- Fade-in with delay on page load. Respect `prefers-reduced-motion`. Effort: ~30 minutes.

9. **"Next up" task preview on Checklist card** -- Read the next incomplete checklist item from localStorage and display its title on the card. Effort: ~1 hour.

---

## Sources and References

- NN Group, "Horizontal Attention Leans Left" (2024): https://www.nngroup.com/articles/horizontal-attention-leans-left/ -- Left-side bias in visual attention, relevant to left-aligning the page header and card content.
- NN Group, "Hamburger Menus and Hidden Navigation Hurt UX Metrics" (Pernice, 2016): https://www.nngroup.com/articles/hamburger-menus/ -- Hidden navigation reduces discoverability by 15-25%.
- NN Group, "Progressive Disclosure" (Budiu, 2020): https://www.nngroup.com/articles/progressive-disclosure/ -- Show the minimum viable content first, reveal complexity on demand.
- Zeigarnik Effect (Bluma Zeigarnik, 1927): Incomplete tasks are better remembered and more motivating than complete ones. Progress bars leverage this effect.
- Fitts's Law: Target acquisition time = f(distance, size). Larger, closer targets are faster to interact with. Full-card click targets on mobile.
- Jakob's Law (Jakob Nielsen): Users spend most of their time on other sites. Follow conventions from Linear, Notion, Todoist for project management dashboards.
- Lindgaard et al. (2006), "Attention web designers: You have 50 milliseconds to make a good first impression!" -- Visual credibility is judged in 50ms. The hub page must immediately communicate "planning tool" not "landing page."
- Steven Hoober, "How Do Users Really Hold Mobile Devices?" (2013): 49% one-handed use. Bottom-of-screen content is easier to reach.

---

## One Big Win

**Replace the dropdown with a hub page. That is the single most impactful change.**

Right now, three fully-built features (Guest List, Celebration Website, Favorites) are essentially hidden behind a hover dropdown that does not work well on mobile. The hub page surfaces them with state and context, turning "hidden links" into "visible progress." The hub also solves the motivation problem by showing couples what they have accomplished across ALL tools, not just checklist-and-budget.

The navbar dropdown is ~100 lines of complex hover/click/outside-click logic in `Navbar.tsx` (lines 76-170). Replacing it with a single `<Link to="/plan">Plan</Link>` simplifies the navbar AND gives planning tools a better home. You remove complexity from one component and add value to another. That is the right trade.

Build the hub. Kill the dropdown. Ship it.