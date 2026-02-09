# everaftr

The Philippines' first inclusive, AI-powered wedding and celebration planning platform. Built with React, TypeScript, and Vite.

## Project Goal

Build a modern, culturally-rooted wedding planning platform that serves **every couple** (not just brides) with vendor directory, planning tools, community features, and AI assistance — all reflecting Filipino textile heritage through design.

## Brand Identity (MANDATORY)

**Read this first when working on UI/design:**
`outputs/everaftr/brand/BRAND-GUIDE-V2-WOVEN-HERITAGE.md`

**Critical Brand Rules:**
- Brand name: `everaftr` (lowercase, one word, NEVER "EverAftr" or "Ever Aftr")
- Tagline: `where forevr begins` (dropped-e signature)
- **INCLUSIVE LANGUAGE ONLY:**
  - NEVER: bride/groom, bridal party, Mr. & Mrs., his/her
  - ALWAYS: Partner 1/Partner 2, wedding party, the couple, their/both partners
- Every page needs **woven border** at top (6px height, 6-color gradient)
- **Section-to-Textile color mapping:**
  - Homepage → Piña (Ivory #F5EDD8, Cream #EDE4CC)
  - Directory → Inabel (Indigo #3D4F7C, Red #C73E3A, Gold #C4962E)
  - Planner → Hablon (Green #4A7C59, Blue #4A6FA5, Gold #D4A843)
  - Real Celebrations → T'nalak (Heritage Red #8B3A3A, Earth #5C3D2E)
  - Community → Yakan (Fuchsia #B84C65, Teal #2D7D7B, Orange #D4764E)
  - AI Assistant → Langkit (Magenta #A63D5C, Gold #C9A84C, Violet #5C4A7C)

## Tech Stack

- Frontend: React 19, TypeScript 5.8, Vite 6
- Styling: Tailwind CSS (planned — currently inline + custom classes)
- Icons: Lucide React
- Backend: Supabase (planned)
- Deployment: Vercel (planned)
- Fonts: Jost (sans-serif), Cormorant Garamond (serif)
- Path alias: `@/` maps to project root

## Key Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure (Actual)

```
everaftr/
├── CLAUDE.md              ← THIS FILE (auto-loaded by all teammates)
├── PROJECT.md             ← Vision, features, strategy
├── STATUS.md              ← Current progress & next tasks
├── App.tsx                ← Main app shell (routing, splash, footer)
├── index.tsx              ← Entry point
├── index.html             ← HTML shell
├── types.ts               ← TypeScript interfaces (⚠️ has bride/groom — fix)
├── constants.ts           ← Mock data: vendors, traditions, checklist, budget
├── vite.config.ts         ← Vite config (alias @/ → root)
├── tsconfig.json          ← TypeScript config
├── package.json           ← React 19, lucide-react, html2canvas
├── pages/
│   ├── Home.tsx           ← Homepage (Piña palette)
│   ├── Vendors.tsx        ← Vendor directory (Inabel palette)
│   ├── Planner.tsx        ← Planning tools hub (Hablon palette)
│   └── Guides.tsx         ← Filipino tradition guides
├── components/
│   ├── Navbar.tsx         ← Top navigation
│   ├── Matchmaker.tsx     ← AI vendor matching quiz
│   └── PlanningTools/
│       ├── BudgetPlanner.tsx
│       ├── Checklist.tsx
│       ├── SaveTheDate.tsx   ← (⚠️ has bride/groom — fix)
│       └── SponsorManager.tsx
├── .claude/
│   ├── settings.local.json
│   └── rules/
│       ├── components.md  ← Component patterns (auto-loaded for components/)
│       └── forms.md       ← Inclusive form rules (auto-loaded for form files)
└── outputs/everaftr/
    ├── brand/
    │   ├── BRAND-GUIDE-V2-WOVEN-HERITAGE.md  ← FULL design system
    │   └── everaftr-brand-v2-weaving.html     ← Interactive brand board
    └── context/
        └── PROJECT-CONTEXT.md                 ← Full context + competitive analysis
```

## Known Codebase Issues (Fix These First)

1. **`types.ts`** — `SaveTheDateData` uses `groomName`/`brideName` → change to `partner1Name`/`partner2Name`
2. **`constants.ts`** — `DEFAULT_SAVE_THE_DATE` has bride/groom fields. `VENDOR_CATEGORIES` has "Bridal Gowns" → rename "Wedding Attire". Tradition descriptions reference bride/groom → rewrite inclusively.
3. **`components/PlanningTools/SaveTheDate.tsx`** — UI likely has bride/groom labels → update to Partner 1/Partner 2
4. **`App.tsx`** footer — Says "Where forever begins" → "where forevr begins". Copyright 2025 → 2026.
5. **No Tailwind config** — Custom classes (ever-midnight, maranao-emerald) not mapped to v2 Woven Heritage tokens.

## Critical Caveats

**IMPORTANT:**
- Use semantic color tokens from brand guide (e.g., `--accent-primary: #8B3A3A`)
- Typography hierarchy:
  - Cormorant Garamond → Headlines, emotional content, taglines, story titles
  - Jost → Brand wordmark, body text, UI labels, buttons, functional elements
- Forms MUST follow `.claude/rules/forms.md`:
  - Use "Partner 1/Partner 2" labels (customizable)
  - Make gender fields optional, free-text (NEVER required, NEVER binary dropdown)
  - Allow customizable wedding party role names
  - Support ceremony types: Church (Catholic/INC/Other), Muslim, Civil, Civil Union, Other
- Components MUST follow `.claude/rules/components.md`
- Cards: 8px border-radius, borders not shadows (shadows only on hover)
- Test with diverse examples: different genders, ceremony types, couple names

## Agent Teams Guide

### Enable

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### Recommended Team Structure

```
Team Lead (delegate mode — coordinates only, no direct coding)
├── Frontend  — pages/, components/, App.tsx, styles, types.ts, constants.ts
├── Backend   — supabase/, lib/db/, lib/api/, migrations
├── AI        — components/AI/, lib/ai/, AI assistant features
└── QA        — tests/, code reviews for brand + inclusive language compliance
```

### File Ownership (CRITICAL — Prevents Write Conflicts)

Two teammates writing the same file = last write wins = lost work.

| Teammate | Owns (can write) | Reads only |
|----------|-----------------|------------|
| **Frontend** | `pages/`, `components/` (except AI/), `App.tsx`, `index.tsx`, `types.ts`, `constants.ts`, CSS/style files | Everything else |
| **Backend** | `supabase/`, `lib/db/`, `lib/api/`, migration files | `types.ts` (read for interfaces) |
| **AI** | `components/AI/`, `lib/ai/`, AI-related utils | `constants.ts`, `types.ts` |
| **QA** | `tests/`, `__tests__/`, test config | Everything (read-only reviewer) |

**Shared files — coordinate via lead before editing:**
`types.ts`, `constants.ts`, `package.json`

### Spawn Prompt

```
Create an agent team with 4 teammates to build everaftr MVP.
Read BRAND-GUIDE-V2-WOVEN-HERITAGE.md and PROJECT-CONTEXT.md first.

Teammates:
- "frontend": Owns pages/ and components/. Implements Woven Heritage design.
  Updates types.ts and constants.ts with inclusive language. Fix bride/groom refs.
- "backend": Owns Supabase setup — schema, RLS policies, auth, storage buckets.
- "ai-assistant": Owns components/AI/ and lib/ai/. Builds "Ate AI" chat using
  Langkit colors (Magenta #A63D5C, Gold #C9A84C, Violet #5C4A7C).
- "qa": Reviews all code for brand compliance, inclusive language, a11y, TS safety.
  Writes tests. READ-ONLY on source files.

Use delegate mode. Require plan approval. Wait for teammates to finish.
```

### Tips

- **Delegate mode** (Shift+Tab) — prevents lead from coding directly
- **Require plan approval** — teammates plan first, lead reviews, then implement
- **Start read-only** — first run should audit codebase, not build
- **5-6 tasks per teammate** — sweet spot for task sizing
- **Monitor** — Shift+Up/Down to check teammates, Ctrl+T for task list
- **Display mode** — set `"teammateMode": "tmux"` in settings.json for split panes (requires tmux or iTerm2)

## Lessons Learned

_Document debugging insights here over time:_
_"Summarize the rabbit holes. Add to project memory."_

---

**Six threads. One platform. Every couple.**
