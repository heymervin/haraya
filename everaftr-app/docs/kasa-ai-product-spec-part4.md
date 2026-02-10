# KASA AI Product Specification -- Part 4: Technical Architecture

---

# PART 4: TECHNICAL ARCHITECTURE

## 4.1 Architectural Approach: Hybrid (Guided Flow + AI Chat)

Kasa should use a **hybrid approach** that combines a structured guided flow with a conversational AI layer.

### Why Hybrid?

| Approach | Strengths | Weaknesses |
|----------|-----------|------------|
| Pure Chat | Flexible, natural, handles edge cases | Overwhelming for first-time users, harder to extract structured data, inconsistent outputs |
| Pure Guided Flow | Predictable, easy to build, reliable data capture | Rigid, cannot handle "what if" questions, feels like a form |
| **Hybrid** | **Best of both: structured onboarding with conversational flexibility** | **More complex to build, but the right UX for wedding planning** |

### How the Hybrid Works

```
LAYER 1: Guided Onboarding (Rule-Based)
  - Step-by-step UI flow (cards/forms, not chat)
  - Captures: names, date, ceremony type, budget, location, guest count
  - Deterministic: no AI needed, just UI logic
  - Output: CoupleProfile object stored in Supabase
  - This is the FIRST interaction every couple has with Kasa

LAYER 2: Timeline Generation (Rule-Based + Template Engine)
  - Deterministic algorithm (described in Part 2, Section 2.3)
  - Takes CoupleProfile as input
  - Outputs a structured timeline (array of TimelineTask objects)
  - Displayed as visual timeline UI, NOT as chat text
  - Timeline syncs to the existing Checklist component
  - Rule-based for MVP; AI can enhance later (see roadmap below)

LAYER 3: Conversational AI (Claude API)
  - Available AFTER onboarding and timeline generation
  - Chat interface for questions, advice, "what if" scenarios
  - System prompt includes the couple's profile and timeline context
  - Handles natural language: "What documents do I need for a Catholic wedding?"
  - Can modify timeline: "We changed our date to March, update the timeline"
  - Links to vendor directory: "Show me photographers in Tagaytay under 50K"
  - Uses the Filipino wedding knowledge base (Part 2, Section 2.8)
  - Warm Taglish personality
```

### MVP vs. Full Build

```
MVP (Phase 1 -- Build First):
  - Layer 1: Guided onboarding (React forms)
  - Layer 2: Rule-based timeline generator
  - Timeline displayed as enhanced Checklist component
  - NO chat AI yet
  - Estimated build time: 2-3 weeks

Phase 2 (Add AI):
  - Layer 3: Claude API-powered chat
  - Chat panel alongside timeline/checklist
  - System prompt with Filipino wedding knowledge base
  - Vendor directory integration
  - Estimated build time: 2-3 weeks additional

Phase 3 (Intelligence):
  - AI-enhanced timeline suggestions based on user behavior
  - Smart reminders via push notifications
  - Budget optimization suggestions
  - Vendor availability predictions
```

---

## 4.2 System Architecture Diagram

```
+----------------------------------------------------------+
|                    FRONTEND (React + Vite)                 |
|                                                            |
|  +------------------+  +----------------+  +-------------+ |
|  | Kasa Onboarding  |  | Kasa Timeline  |  | Kasa Chat   | |
|  | (Guided Flow)    |  | (Visual UI)    |  | (AI Panel)  | |
|  +--------+---------+  +-------+--------+  +------+------+ |
|           |                     |                   |       |
|  +--------v---------+  +-------v--------+  +------v------+ |
|  | Checklist.tsx     |  | BudgetTracker  |  | VendorCards | |
|  | (Enhanced)        |  | (Enhanced)     |  | (Existing)  | |
|  +--------+---------+  +-------+--------+  +------+------+ |
+-----------|---------------------|-------------------|-------+
            |                     |                   |
            v                     v                   v
+----------------------------------------------------------+
|                    API LAYER                               |
|                                                            |
|  +------------------+  +----------------+  +-------------+ |
|  | /api/timeline    |  | /api/budget    |  | /api/chat   | |
|  | (Supabase Edge   |  | (Supabase      |  | (Supabase   | |
|  |  Function)       |  |  RPC/Query)    |  |  Edge Fn +  | |
|  |                  |  |                |  |  Claude API) | |
|  +--------+---------+  +-------+--------+  +------+------+ |
+-----------|---------------------|-------------------|-------+
            |                     |                   |
            v                     v                   v
+----------------------------------------------------------+
|                    SUPABASE BACKEND                        |
|                                                            |
|  +------------------+  +----------------+  +-------------+ |
|  | couples          |  | timelines      |  | chat_history| |
|  | couple_profiles  |  | timeline_tasks |  | messages    | |
|  | vendors          |  | budget_items   |  | ai_context  | |
|  +------------------+  +----------------+  +-------------+ |
+----------------------------------------------------------+
            |
            v
+----------------------------------------------------------+
|                    EXTERNAL SERVICES                       |
|                                                            |
|  +------------------+  +----------------+                  |
|  | Claude API       |  | PSA / Document |                  |
|  | (Anthropic)      |  | Info (future)  |                  |
|  +------------------+  +----------------+                  |
+----------------------------------------------------------+
```

---

## 4.3 Data Model (Supabase)

### New Tables for Kasa

```sql
-- ============================================================
-- TABLE: couple_profiles
-- Extended version of the existing CoupleProfile type
-- ============================================================
CREATE TABLE couple_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  partner1_name TEXT NOT NULL,
  partner2_name TEXT NOT NULL,
  partner1_label TEXT DEFAULT 'You',
  partner2_label TEXT DEFAULT 'Your Partner',
  celebration_date DATE,
  ceremony_type TEXT CHECK (ceremony_type IN (
    'Catholic', 'Church (INC)', 'Church (Other)',
    'Muslim', 'Civil', 'Civil Union', 'Other'
  )),
  budget_min INTEGER,
  budget_max INTEGER,
  guest_count_estimate INTEGER,
  guest_count_range TEXT CHECK (guest_count_range IN (
    'intimate', 'small', 'medium', 'large', 'very_large'
  )),
  location TEXT,
  location_type TEXT CHECK (location_type IN (
    'metro_manila', 'calabarzon', 'tagaytay', 'cebu',
    'davao', 'other_province', 'destination'
  )),
  priorities TEXT[], -- Array of selected priorities from onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  timeline_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: timeline_tasks
-- Individual tasks in the couple's planning timeline
-- ============================================================
CREATE TABLE timeline_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couple_profiles(id) ON DELETE CASCADE,
  task_template_id TEXT NOT NULL, -- Links to the task template (e.g., 'catholic_church_booking')
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'ceremony', 'venue', 'vendors', 'documents', 'attire', 'details', 'final'
  ceremony_type TEXT, -- NULL = applies to all, or specific ceremony type
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 5), -- Priority tier
  target_period TEXT NOT NULL, -- 'month_12', 'month_11', ... 'week_4', 'week_3', etc.
  target_date DATE, -- Calculated actual date based on celebration date
  due_date DATE, -- Hard deadline if applicable
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  is_critical BOOLEAN DEFAULT FALSE,
  is_overdue BOOLEAN DEFAULT FALSE,
  depends_on TEXT[], -- Array of task_template_ids this depends on
  notes TEXT,
  linked_vendor_id UUID REFERENCES vendors(id), -- If a vendor is booked for this task
  linked_budget_item_id UUID, -- Links to budget tracker
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient queries
CREATE INDEX idx_timeline_tasks_couple ON timeline_tasks(couple_id);
CREATE INDEX idx_timeline_tasks_period ON timeline_tasks(target_period);
CREATE INDEX idx_timeline_tasks_completed ON timeline_tasks(is_completed);

-- ============================================================
-- TABLE: budget_allocations
-- Budget recommendations generated by Kasa
-- ============================================================
CREATE TABLE budget_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couple_profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- Matches existing BudgetTracker categories
  suggested_percentage DECIMAL(5,2),
  suggested_amount INTEGER,
  actual_amount INTEGER DEFAULT 0,
  is_paid BOOLEAN DEFAULT FALSE,
  vendor_id UUID REFERENCES vendors(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_budget_allocations_couple ON budget_allocations(couple_id);

-- ============================================================
-- TABLE: chat_messages
-- Conversation history between couple and Kasa AI
-- ============================================================
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couple_profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB, -- For structured data: vendor links, task references, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_couple ON chat_messages(couple_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at);

-- ============================================================
-- TABLE: document_tracker
-- Track document preparation status
-- ============================================================
CREATE TABLE document_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couple_profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'cenomar', 'birth_cert', 'baptismal_cert', etc.
  for_partner TEXT CHECK (for_partner IN ('partner1', 'partner2', 'both')),
  status TEXT DEFAULT 'not_started' CHECK (status IN (
    'not_started', 'applied', 'processing', 'received', 'submitted', 'expired'
  )),
  applied_date DATE,
  received_date DATE,
  expiry_date DATE, -- Calculated based on document validity period
  submitted_to TEXT, -- 'church', 'lcr', etc.
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_document_tracker_couple ON document_tracker(couple_id);

-- ============================================================
-- TABLE: reminders
-- Scheduled reminders and check-ins
-- ============================================================
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couple_profiles(id) ON DELETE CASCADE,
  task_id UUID REFERENCES timeline_tasks(id),
  reminder_type TEXT CHECK (reminder_type IN (
    'weekly_checkin', 'task_due', 'document_expiry',
    'vendor_payment', 'milestone', 'custom'
  )),
  title TEXT NOT NULL,
  message TEXT,
  scheduled_for TIMESTAMPTZ NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reminders_couple ON reminders(couple_id);
CREATE INDEX idx_reminders_scheduled ON reminders(scheduled_for);
CREATE INDEX idx_reminders_unsent ON reminders(is_sent) WHERE is_sent = FALSE;

-- ============================================================
-- TABLE: task_templates
-- Master list of all possible wedding tasks
-- Reference data, not per-couple
-- ============================================================
CREATE TABLE task_templates (
  id TEXT PRIMARY KEY, -- e.g., 'catholic_church_booking', 'cenomar_application'
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  ceremony_types TEXT[], -- Which ceremony types this applies to, NULL = all
  tier INTEGER NOT NULL,
  ideal_lead_time_months INTEGER,
  minimum_lead_time_months INTEGER,
  ideal_lead_time_weeks INTEGER, -- For tasks measured in weeks
  minimum_lead_time_weeks INTEGER,
  is_critical BOOLEAN DEFAULT FALSE,
  depends_on TEXT[], -- Array of task_template ids
  conditional TEXT, -- Condition for including this task (e.g., 'one_partner_non_catholic')
  tips TEXT,
  processing_time_weeks INTEGER, -- For document-type tasks
  validity_months INTEGER, -- For documents with expiry
  is_post_wedding BOOLEAN DEFAULT FALSE,
  budget_category TEXT, -- Links to budget allocation category
  sort_order INTEGER
);
```

### Relationship to Existing Data

```
EXISTING TABLES (from CLAUDE.md roadmap):
  vendors          --> Kasa links vendor recommendations to this table
  couples          --> couple_profiles extends this concept
  reviews          --> Kasa can reference review data for vendor recommendations
  inquiries        --> Kasa can pre-fill and submit inquiries
  favorites        --> Kasa can suggest adding vendors to favorites

EXISTING COMPONENTS:
  Checklist.tsx    --> timeline_tasks feeds into this (or replaces it)
  BudgetTracker.tsx --> budget_allocations feeds into this

SYNC STRATEGY:
  When Kasa generates a timeline:
    1. Create timeline_tasks rows in Supabase
    2. Sync these to the Checklist component UI
    3. Create budget_allocations rows
    4. Sync these to the BudgetTracker component UI

  When user completes a task in Checklist:
    1. Update timeline_tasks.is_completed = TRUE
    2. Check if any dependent tasks are now unblocked
    3. Trigger any milestone celebrations in Kasa
    4. Update progress metrics
```

---

## 4.4 Integration: Timeline <--> Checklist

The generated timeline must seamlessly integrate with the existing Checklist component in `src/components/PlanningTools/Checklist.tsx`.

### Current Checklist Architecture

The current Checklist uses:
- Inline data (44 items) with `ChecklistItem` interface
- Filtering by `ceremonyTypes` and `timeframe`
- localStorage persistence (`everaftr-checklist`)
- Categories: Planning Basics, Legal Requirements, Ceremony, Vendors, Attire, Details, Final Prep

### Enhanced Checklist for Kasa Integration

```typescript
// NEW: Enhanced ChecklistItem type that bridges Kasa timeline and Checklist UI
interface KasaChecklistItem {
  id: string;
  taskTemplateId: string; // Links to task_templates table
  title: string;
  description: string;
  timeframe: string; // 'month_12', 'month_11', ..., 'week_4', etc.
  timeframeLabel: string; // "12 Months Before", "This Week!", etc.
  category: string;
  ceremonyTypes: CeremonyType[];
  completed: boolean;
  completedAt?: string;
  isCritical: boolean;
  isOverdue: boolean;
  targetDate?: string;
  dueDate?: string;
  dependsOn: string[];
  dependenciesMet: boolean; // Calculated: are all dependencies completed?
  linkedVendorId?: string;
  linkedBudgetCategory?: string;
  notes: string;
  tips: string; // Kasa's advice for this task
  sortOrder: number;
}

// Timeline generation function
function generateTimeline(profile: CoupleProfile): KasaChecklistItem[] {
  const celebrationDate = new Date(profile.celebrationDate);
  const today = new Date();
  const totalDays = Math.floor((celebrationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const totalMonths = Math.floor(totalDays / 30);
  const totalWeeks = Math.floor(totalDays / 7);

  // 1. Load applicable task templates based on ceremony type
  const templates = getTaskTemplates(profile.ceremonyType);

  // 2. Determine timeline mode
  const mode = totalMonths >= 9 ? 'monthly' : totalMonths >= 4 ? 'biweekly' : 'weekly';

  // 3. Map tasks to time periods
  const tasks = templates.map(template => {
    const targetPeriod = calculateTargetPeriod(template, totalMonths, totalWeeks, mode);
    const targetDate = calculateTargetDate(celebrationDate, targetPeriod);
    const isOverdue = targetDate < today && !template.isPostWedding;

    return {
      id: generateId(),
      taskTemplateId: template.id,
      title: template.title,
      description: template.description,
      timeframe: targetPeriod,
      timeframeLabel: formatTimeframeLabel(targetPeriod, mode),
      category: template.category,
      ceremonyTypes: template.ceremonyTypes || ['all'],
      completed: false,
      isCritical: template.isCritical,
      isOverdue,
      targetDate: targetDate.toISOString(),
      dueDate: template.validityMonths
        ? calculateDocumentDeadline(celebrationDate, template)
        : undefined,
      dependsOn: template.dependsOn || [],
      dependenciesMet: true, // Calculated dynamically
      linkedBudgetCategory: template.budgetCategory,
      notes: '',
      tips: template.tips,
      sortOrder: template.sortOrder,
    };
  });

  // 4. Sort by target period and priority tier
  return tasks.sort((a, b) => a.sortOrder - b.sortOrder);
}
```

### Displaying Kasa-Generated vs. Default Checklist

```
FLOW:

User visits /plan (Plan.tsx):
  IF couple_profile exists AND timeline_generated = TRUE:
    --> Show Kasa-generated timeline in Checklist tab
    --> Checklist items are personalized and time-aware
    --> Items show actual dates ("By March 15")
    --> Overdue items are highlighted in red
    --> Completed items show green checkmarks with timestamps

  ELSE:
    --> Show default static checklist (current behavior)
    --> Prompt: "Want a personalized timeline? Talk to Kasa!"
    --> CTA button links to /kasa (onboarding flow)
```

---

## 4.5 Integration: Timeline <--> Budget Tracker

### Current BudgetTracker Architecture

The current BudgetTracker uses:
- Inline categories (10 default categories)
- `suggestedPercentage` as a display-only string (e.g., "35-40%")
- `estimatedCost` and `actualCost` per category
- Total budget as a single input
- localStorage persistence (`everaftr-budget`)

### Enhanced Budget Tracker for Kasa Integration

```typescript
// When Kasa generates a timeline, it also creates budget recommendations
function generateBudgetAllocations(
  profile: CoupleProfile
): BudgetAllocation[] {
  const totalBudget = profile.budgetRange?.max || 0;
  const locationType = profile.locationType;
  const guestCount = profile.guestCount || 100;
  const ceremonyType = profile.ceremonyType;

  // Get allocation percentages based on budget tier and location
  const percentages = getBudgetPercentages(totalBudget, locationType);

  return [
    {
      category: 'Venue & Catering',
      suggestedPercentage: percentages.venueCatering,
      suggestedAmount: Math.round(totalBudget * percentages.venueCatering / 100),
      perHead: Math.round((totalBudget * percentages.venueCatering / 100) / guestCount),
      tips: generateCateringTip(totalBudget, guestCount, locationType),
    },
    {
      category: 'Photo & Video',
      suggestedPercentage: percentages.photoVideo,
      suggestedAmount: Math.round(totalBudget * percentages.photoVideo / 100),
      tips: 'This is one area worth investing in -- photos last forever.',
    },
    // ... remaining categories
    {
      category: 'Ceremony',
      suggestedPercentage: percentages.ceremony,
      suggestedAmount: Math.round(totalBudget * percentages.ceremony / 100),
      tips: ceremonyType === 'Catholic'
        ? 'Church fees typically range from PHP 6,000-15,000 including officiating fee and choir.'
        : ceremonyType === 'Civil'
          ? 'City hall ceremony fees are minimal -- PHP 500-2,000 in most municipalities.'
          : 'Budget for officiant/celebrant fees and ceremony venue if separate.',
    },
  ];
}

// Connection points:
// 1. When Kasa creates budget allocations, update BudgetTracker suggested amounts
// 2. When a vendor is booked through Kasa, update the relevant budget category
// 3. When budget changes in BudgetTracker, Kasa can comment on the change
```

### Two-Way Sync

```
KASA --> BUDGET TRACKER:
  - Kasa sets initial budget allocations based on profile
  - Kasa updates amounts when vendors are booked
  - Kasa warns when a category is over-budget
  - Example: "Your catering quote came in at PHP 120K, which is PHP 20K
    over your allocated amount for Venue & Catering. Want to adjust
    your budget allocation?"

BUDGET TRACKER --> KASA:
  - When user manually changes budget, Kasa can see the update
  - Kasa can flag if the new allocation is risky
  - Example: "I noticed you reduced your Photo & Video budget to PHP 15K.
    That might be tight for a professional photographer in Makati.
    Want me to suggest photographers in that range?"
```

---

## 4.6 Claude API Integration (Phase 2)

### System Prompt Design

```typescript
const KASA_SYSTEM_PROMPT = `
You are Kasa, the AI wedding planning assistant for everaftr, the Philippines'
first inclusive wedding planning platform.

## Your Personality
- Warm, encouraging, supportive -- like a knowledgeable ate/kuya
- Speak in friendly Taglish (natural mix of Tagalog and English)
- Use Filipino wedding terminology naturally
- Never judgmental about budget, ceremony type, or couple composition
- Celebrate milestones enthusiastically
- Proactively flag timing concerns

## Brand Rules (CRITICAL)
- The platform is called "everaftr" (always lowercase, one word)
- Use "celebration" alongside "wedding"
- Use the couple's actual names, never "bride/groom" unless they specify
- Default partner labels are "You" and "Your Partner"
- Support ALL couples -- heterosexual, same-sex, any configuration
- Vendors with "All Celebrations Welcome" badge actively welcome all couples
- Currency is always PHP (Philippine Peso) with the peso sign

## Your Knowledge Base
You have deep expertise in:
- Filipino wedding planning (Catholic, Civil, Muslim, Commitment Ceremony)
- Philippine legal requirements (CENOMAR, marriage license, church documents)
- Filipino wedding traditions (cord, veil, arrhae, sponsors, entourage)
- Philippine vendor landscape (pricing ranges, peak seasons, booking timelines)
- Province vs. Metro Manila differences
- Budget planning and allocation
- Document processing times and validity periods

## Context for This Conversation
Couple: {partner1_name} and {partner2_name}
Celebration Date: {celebration_date}
Days Until Celebration: {days_remaining}
Ceremony Type: {ceremony_type}
Budget: PHP {budget_min} - {budget_max}
Location: {location}
Guest Count: {guest_count}
Current Timeline Progress: {completed_tasks}/{total_tasks} tasks done
Overdue Tasks: {overdue_tasks}
Next Upcoming Tasks: {next_tasks}

## Response Guidelines
- Keep responses concise but helpful (aim for 2-4 paragraphs unless more detail is requested)
- Include specific actionable advice when possible
- Reference Philippine-specific information (PSA offices, LCR procedures, church processes)
- When recommending vendors, suggest they check everaftr's vendor directory
- When discussing legal matters, recommend consulting with a lawyer for specifics
- When timelines are tight, be honest but encouraging -- focus on what is possible
- If asked about something outside wedding planning, gently redirect

## Things You Should NOT Do
- Do not provide specific legal advice (recommend a lawyer)
- Do not guarantee vendor availability or pricing (suggest checking directly)
- Do not make assumptions about gender or family structure
- Do not pressure the couple to spend more than their budget
- Do not dismiss any ceremony type or celebration format
`;
```

### API Call Structure

```typescript
// Supabase Edge Function: /functions/kasa-chat
import Anthropic from '@anthropic-ai/sdk';

interface KasaChatRequest {
  coupleId: string;
  message: string;
}

async function handleKasaChat(req: KasaChatRequest) {
  // 1. Load couple profile
  const profile = await getCoupleProfile(req.coupleId);

  // 2. Load recent chat history (last 20 messages for context)
  const history = await getChatHistory(req.coupleId, 20);

  // 3. Load current timeline status
  const timelineStatus = await getTimelineStatus(req.coupleId);

  // 4. Build system prompt with context
  const systemPrompt = buildSystemPrompt(profile, timelineStatus);

  // 5. Call Claude API
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      ...history.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: req.message },
    ],
  });

  const assistantMessage = response.content[0].type === 'text'
    ? response.content[0].text
    : '';

  // 6. Save messages to history
  await saveChatMessage(req.coupleId, 'user', req.message);
  await saveChatMessage(req.coupleId, 'assistant', assistantMessage);

  // 7. Check for action intents in the response
  const actions = detectActions(assistantMessage);
  // Actions could be: update_task, show_vendors, update_budget, etc.

  return {
    message: assistantMessage,
    actions,
  };
}
```

### Cost Management

```
COST ESTIMATES (Claude API):
  - Claude 3.5 Sonnet: ~$3/million input tokens, ~$15/million output tokens
  - Average conversation: ~2K input tokens (with context), ~500 output tokens
  - Cost per message: ~$0.01-0.02
  - Average couple sends 5-10 messages per session, 2-3 sessions per week
  - Cost per couple per month: ~$1-3
  - For 1,000 active couples: ~$1,000-3,000/month

COST OPTIMIZATION:
  1. Cache common questions/answers (document requirements, budget tips)
  2. Use rule-based responses for simple queries (FAQ matching)
  3. Limit conversation history context to 20 messages
  4. Use Claude 3.5 Haiku for simpler queries, Sonnet for complex ones
  5. Set max_tokens appropriately (1024 for most responses)
  6. Rate limit: max 50 messages per couple per day
```

---

## 4.7 Frontend Component Architecture

### New Components for Kasa

```
src/
  components/
    Kasa/
      KasaOnboarding.tsx          # Step-by-step onboarding flow
      KasaOnboardingStep.tsx      # Individual onboarding step card
      KasaTimeline.tsx            # Visual timeline display
      KasaTimelineItem.tsx        # Individual timeline task card
      KasaChat.tsx                # Chat interface (Phase 2)
      KasaChatMessage.tsx         # Individual chat message bubble
      KasaChatInput.tsx           # Message input with send button
      KasaWeeklyCheckIn.tsx       # Weekly check-in notification card
      KasaDocumentTracker.tsx     # Document status tracker
      KasaMilestone.tsx           # Milestone celebration component
      KasaBudgetSuggestion.tsx    # Budget allocation suggestion card
      KasaVendorSuggestion.tsx    # Vendor recommendation card (uses VendorCard)
  pages/
    Kasa.tsx                      # Main Kasa page (router: /kasa)
  hooks/
    useKasaTimeline.ts            # Hook for timeline generation logic
    useKasaChat.ts                # Hook for chat state management (Phase 2)
    useKasaReminders.ts           # Hook for reminder management
  utils/
    timelineGenerator.ts          # Core timeline generation algorithm
    taskTemplates.ts              # All task template data
    budgetCalculator.ts           # Budget allocation logic
    dateUtils.ts                  # Date calculation helpers
  data/
    kasaTaskTemplates.ts          # Task template master data
    kasaDocumentRequirements.ts   # Document requirements by ceremony type
    kasaFAQ.ts                    # Common Q&A data for rule-based responses
```

### Route Addition

```typescript
// In App.tsx, add:
import Kasa from './pages/Kasa';

// In Routes:
<Route path="/kasa" element={<Kasa />} />
```

### Design System Integration

Kasa uses the **Langkit** textile palette (from the Woven Heritage design system):

```css
/* Kasa-specific design tokens (add to index.css @theme) */
--color-kasa-primary: #A63D5C;    /* Langkit magenta */
--color-kasa-secondary: #C9A84C;  /* Langkit gold */
--color-kasa-accent: #5C4A7C;     /* Langkit violet */
--color-kasa-bg: #FDF8FA;         /* Light magenta tint */
--color-kasa-chat-user: #F5EDD8;  /* Pina ivory for user messages */
--color-kasa-chat-ai: #FAF0F3;   /* Light magenta for Kasa messages */
```

---

## 4.8 State Management

### MVP: localStorage + React State

```typescript
// localStorage keys for Kasa
const KASA_STORAGE_KEYS = {
  profile: 'everaftr-kasa-profile',       // CoupleProfile
  timeline: 'everaftr-kasa-timeline',     // KasaChecklistItem[]
  budget: 'everaftr-kasa-budget',         // BudgetAllocation[]
  chatHistory: 'everaftr-kasa-chat',      // ChatMessage[]
  onboardingStep: 'everaftr-kasa-step',   // Current onboarding step
  documents: 'everaftr-kasa-documents',   // DocumentTracker[]
};
```

### Post-MVP: Supabase + React Query

```typescript
// When Supabase is integrated, replace localStorage with:
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

function useTimeline(coupleId: string) {
  return useQuery({
    queryKey: ['timeline', coupleId],
    queryFn: async () => {
      const { data } = await supabase
        .from('timeline_tasks')
        .select('*')
        .eq('couple_id', coupleId)
        .order('sort_order');
      return data;
    },
  });
}

function useCompleteTask() {
  return useMutation({
    mutationFn: async (taskId: string) => {
      const { data } = await supabase
        .from('timeline_tasks')
        .update({
          is_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', taskId);
      return data;
    },
  });
}
```

---

## 4.9 Performance Considerations

### Mobile-First (Target: Android on 4G)

```
PERFORMANCE TARGETS:
  - First Contentful Paint: < 2 seconds
  - Time to Interactive: < 4 seconds
  - Timeline generation: < 500ms (client-side calculation)
  - Chat response: < 3 seconds (including API call)
  - Total Kasa page bundle: < 100KB gzipped

OPTIMIZATION STRATEGIES:
  1. Code-split Kasa components (lazy load /kasa route)
  2. Timeline generation runs client-side (no API call for MVP)
  3. Chat history loads incrementally (last 20 messages, load more on scroll)
  4. Vendor cards use lazy image loading (already implemented in VendorCard.tsx)
  5. Cache task templates in localStorage after first load
  6. Use Supabase realtime only for chat (not for timeline/budget)
```

### Offline Capability (Future)

```
OFFLINE SUPPORT (Phase 4):
  - Timeline and checklist viewable offline (cached in localStorage/IndexedDB)
  - Task completion syncs when online
  - Chat requires connection (show "offline" indicator)
  - Budget tracker works offline with sync on reconnect
```

---

## 4.10 Analytics Events

```typescript
// Kasa-specific analytics events to track
const KASA_EVENTS = {
  // Onboarding
  'kasa_onboarding_started': {},
  'kasa_onboarding_step_completed': { step: number, field: string },
  'kasa_onboarding_abandoned': { step: number },
  'kasa_onboarding_completed': { ceremony_type: string, months_until: number },

  // Timeline
  'kasa_timeline_generated': { ceremony_type: string, timeline_mode: string, task_count: number },
  'kasa_task_completed': { task_id: string, category: string, days_before_due: number },
  'kasa_task_overdue': { task_id: string, category: string, days_overdue: number },
  'kasa_timeline_modified': { action: string }, // 'date_changed', 'ceremony_changed', etc.

  // Chat (Phase 2)
  'kasa_chat_message_sent': { message_length: number },
  'kasa_chat_vendor_link_clicked': { vendor_id: string },
  'kasa_chat_action_taken': { action: string }, // 'update_task', 'show_vendors', etc.

  // Budget
  'kasa_budget_suggestion_accepted': { category: string },
  'kasa_budget_over_alert': { category: string, over_by: number },

  // Engagement
  'kasa_weekly_checkin_viewed': {},
  'kasa_milestone_celebrated': { milestone: string },
  'kasa_document_status_updated': { document: string, status: string },
};
```

---
