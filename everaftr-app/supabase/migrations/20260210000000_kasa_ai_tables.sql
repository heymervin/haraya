-- ============================================================================
-- Kasa AI Wedding Planning Assistant - Database Schema
-- Migration: 20260210000000_kasa_ai_tables
-- Description: Tables for AI planning assistant with timeline generation,
--              chat history, and Filipino wedding-specific task management
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. CUSTOM TYPES (ENUMS)
-- ============================================================================

-- Task priority levels
CREATE TYPE task_priority AS ENUM ('critical', 'high', 'medium', 'low');

-- Task status for timeline tracking
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'completed', 'overdue', 'skipped');

-- Message role for chat history
CREATE TYPE message_role AS ENUM ('user', 'assistant', 'system');

-- Timeline status
CREATE TYPE timeline_status AS ENUM ('active', 'paused', 'completed', 'archived');

-- Budget range enum for task categorization
CREATE TYPE budget_range AS ENUM ('below_100k', '100k_250k', '250k_500k', '500k_1m', 'above_1m');

-- ============================================================================
-- 2. MASTER TIMELINE TASKS TEMPLATE TABLE
-- ============================================================================

-- This table stores the master list of Filipino wedding planning tasks
-- that serve as templates for generating personalized timelines
CREATE TABLE kasa_task_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name TEXT NOT NULL,
  task_name_tagalog TEXT, -- Tagalog translation for Taglish responses
  description TEXT NOT NULL,
  description_tagalog TEXT,
  category TEXT NOT NULL, -- e.g. 'Documents', 'Venue', 'Vendors', 'Attire', 'Traditions', 'Logistics'

  -- Timeline positioning
  default_months_before INTEGER NOT NULL, -- How many months before wedding this task should start
  duration_weeks INTEGER DEFAULT 1, -- How long the task typically takes

  -- Ceremony type applicability
  ceremony_types TEXT[] NOT NULL DEFAULT '{}', -- Which ceremony types need this task
  is_catholic_only BOOLEAN DEFAULT FALSE,
  is_muslim_only BOOLEAN DEFAULT FALSE,
  is_civil_only BOOLEAN DEFAULT FALSE,

  -- Task metadata
  priority task_priority NOT NULL DEFAULT 'medium',
  is_required BOOLEAN DEFAULT TRUE, -- Can this task be skipped?
  is_government_doc BOOLEAN DEFAULT FALSE, -- Is this a government document task?
  estimated_cost_min INTEGER, -- Typical cost range in PHP
  estimated_cost_max INTEGER,

  -- Dependencies
  depends_on_tasks UUID[] DEFAULT '{}', -- Array of task template IDs this depends on
  blocks_tasks UUID[] DEFAULT '{}', -- Array of task template IDs this blocks

  -- Budget sensitivity
  required_budget_ranges budget_range[] DEFAULT '{}', -- Which budgets need this task
  optional_for_budget_ranges budget_range[] DEFAULT '{}', -- Optional for these budgets

  -- Filipino-specific metadata
  processing_time_weeks INTEGER, -- For government docs, typical processing time
  advance_booking_months INTEGER, -- For churches/venues that need early booking
  typical_lead_time_days INTEGER, -- General lead time needed

  -- Guidance
  tips TEXT[], -- Array of helpful tips in Taglish
  common_mistakes TEXT[], -- Common pitfalls to avoid
  vendor_categories vendor_category[], -- Which vendor categories are relevant

  -- Metadata
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE kasa_task_templates IS 'Master task templates for Filipino wedding planning timelines';
COMMENT ON COLUMN kasa_task_templates.ceremony_types IS 'Array of ceremony types: Catholic, Civil, Muslim, etc.';
COMMENT ON COLUMN kasa_task_templates.depends_on_tasks IS 'Tasks that must be completed before this one';
COMMENT ON COLUMN kasa_task_templates.processing_time_weeks IS 'Government processing time (e.g., CENOMAR: 3-4 weeks)';
COMMENT ON COLUMN kasa_task_templates.advance_booking_months IS 'How far in advance to book (e.g., Pre-Cana: 6+ months)';

-- ============================================================================
-- 3. GENERATED TIMELINES TABLE
-- ============================================================================

-- Stores personalized wedding timelines generated for each couple
CREATE TABLE kasa_timelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Input parameters used to generate this timeline
  wedding_date DATE NOT NULL,
  ceremony_type ceremony_type NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  guest_count INTEGER,
  location TEXT,

  -- Timeline metadata
  timeline_name TEXT, -- Optional custom name
  status timeline_status NOT NULL DEFAULT 'active',
  generation_date TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Tracking
  total_tasks INTEGER NOT NULL DEFAULT 0,
  completed_tasks INTEGER NOT NULL DEFAULT 0,
  overdue_tasks INTEGER NOT NULL DEFAULT 0,
  progress_percentage NUMERIC(5,2) DEFAULT 0.00,

  -- AI context
  is_compressed_timeline BOOLEAN DEFAULT FALSE, -- Was this a 3-month compressed timeline?
  generation_notes TEXT, -- Notes about how timeline was generated
  ai_model_version TEXT, -- Which AI model/rules generated this

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_checked_at TIMESTAMPTZ, -- Last time couple viewed this timeline

  CONSTRAINT valid_wedding_date CHECK (wedding_date > current_date)
);

COMMENT ON TABLE kasa_timelines IS 'Personalized wedding planning timelines generated by Kasa AI';
COMMENT ON COLUMN kasa_timelines.is_compressed_timeline IS 'TRUE if wedding is within 3 months (compressed timeline)';
COMMENT ON COLUMN kasa_timelines.generation_notes IS 'AI notes about customizations made for this couple';

-- ============================================================================
-- 4. TIMELINE TASKS (INSTANCES)
-- ============================================================================

-- Individual task instances within a generated timeline
CREATE TABLE kasa_timeline_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_id UUID NOT NULL REFERENCES kasa_timelines(id) ON DELETE CASCADE,
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  template_id UUID REFERENCES kasa_task_templates(id) ON DELETE SET NULL,

  -- Task content (copied from template but customizable)
  task_name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,

  -- Scheduling
  due_date DATE NOT NULL,
  start_date DATE, -- When to start working on this
  completed_date DATE,

  -- Status tracking
  status task_status NOT NULL DEFAULT 'not_started',
  priority task_priority NOT NULL DEFAULT 'medium',
  is_ceremony_specific BOOLEAN DEFAULT FALSE, -- Specific to their ceremony type

  -- Integration with other tools
  linked_checklist_item_id UUID REFERENCES checklist_items(id) ON DELETE SET NULL,
  linked_budget_item_id UUID REFERENCES budget_items(id) ON DELETE SET NULL,
  linked_vendor_category vendor_category, -- Suggests browsing this vendor type

  -- Dependencies
  depends_on_task_ids UUID[] DEFAULT '{}', -- Other timeline task IDs this depends on
  blocks_task_ids UUID[] DEFAULT '{}',

  -- Notes and customization
  couple_notes TEXT, -- Couple's own notes on this task
  ai_notes TEXT, -- AI suggestions specific to this task for this couple
  tips TEXT[], -- Taglish tips for this task

  -- Reminders
  reminder_sent_at TIMESTAMPTZ,
  snoozed_until DATE,

  -- Metadata
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE kasa_timeline_tasks IS 'Individual tasks within a couple''s wedding planning timeline';
COMMENT ON COLUMN kasa_timeline_tasks.template_id IS 'Links back to master template; NULL for custom tasks';
COMMENT ON COLUMN kasa_timeline_tasks.linked_checklist_item_id IS 'Synced checklist item in main checklist tool';
COMMENT ON COLUMN kasa_timeline_tasks.linked_budget_item_id IS 'Related budget line item if applicable';

-- ============================================================================
-- 5. CHAT CONVERSATIONS TABLE
-- ============================================================================

-- Stores Kasa AI chat conversations with couples
CREATE TABLE kasa_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  timeline_id UUID REFERENCES kasa_timelines(id) ON DELETE SET NULL,

  -- Conversation metadata
  conversation_name TEXT, -- Auto-generated or custom name
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Context
  conversation_context JSONB DEFAULT '{}', -- Store conversation state/context
  is_active BOOLEAN DEFAULT TRUE,

  -- Metadata
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE kasa_conversations IS 'Chat conversation threads between couples and Kasa AI';
COMMENT ON COLUMN kasa_conversations.conversation_context IS 'JSON: current topic, referenced tasks, user preferences';

-- ============================================================================
-- 6. CHAT MESSAGES TABLE
-- ============================================================================

-- Individual messages within conversations
CREATE TABLE kasa_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES kasa_conversations(id) ON DELETE CASCADE,
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Message content
  role message_role NOT NULL,
  content TEXT NOT NULL,
  content_tagalog TEXT, -- Taglish/Tagalog version if applicable

  -- AI metadata
  ai_model TEXT, -- Which model generated this (if assistant role)
  prompt_tokens INTEGER, -- Token usage tracking
  completion_tokens INTEGER,

  -- Context and references
  referenced_timeline_id UUID REFERENCES kasa_timelines(id) ON DELETE SET NULL,
  referenced_task_ids UUID[] DEFAULT '{}', -- Tasks mentioned in this message
  referenced_vendor_ids UUID[] DEFAULT '{}', -- Vendors mentioned

  -- Message metadata
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMPTZ,
  sentiment NUMERIC(3,2), -- Sentiment score -1.0 to 1.0 for monitoring

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE kasa_messages IS 'Individual chat messages in Kasa AI conversations';
COMMENT ON COLUMN kasa_messages.content_tagalog IS 'Taglish version of the message if AI response';
COMMENT ON COLUMN kasa_messages.sentiment IS 'AI-detected sentiment for support monitoring';

-- ============================================================================
-- 7. TIMELINE PROGRESS SNAPSHOTS (for analytics)
-- ============================================================================

-- Daily snapshots of timeline progress for tracking
CREATE TABLE kasa_timeline_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_id UUID NOT NULL REFERENCES kasa_timelines(id) ON DELETE CASCADE,
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  snapshot_date DATE NOT NULL DEFAULT current_date,

  -- Progress metrics at this snapshot
  total_tasks INTEGER NOT NULL,
  completed_tasks INTEGER NOT NULL,
  in_progress_tasks INTEGER NOT NULL,
  overdue_tasks INTEGER NOT NULL,
  days_until_wedding INTEGER NOT NULL,

  -- Engagement metrics
  tasks_completed_this_week INTEGER DEFAULT 0,
  messages_sent_this_week INTEGER DEFAULT 0,
  last_activity_date DATE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(timeline_id, snapshot_date)
);

COMMENT ON TABLE kasa_timeline_snapshots IS 'Daily progress snapshots for analytics and engagement tracking';

-- ============================================================================
-- 8. INDEXES FOR PERFORMANCE
-- ============================================================================

-- Task templates indexes
CREATE INDEX idx_kasa_task_templates_category ON kasa_task_templates(category);
CREATE INDEX idx_kasa_task_templates_ceremony_types ON kasa_task_templates USING GIN(ceremony_types);
CREATE INDEX idx_kasa_task_templates_months_before ON kasa_task_templates(default_months_before);
CREATE INDEX idx_kasa_task_templates_active ON kasa_task_templates(is_active) WHERE is_active = TRUE;

-- Timelines indexes
CREATE INDEX idx_kasa_timelines_couple ON kasa_timelines(couple_id);
CREATE INDEX idx_kasa_timelines_status ON kasa_timelines(status);
CREATE INDEX idx_kasa_timelines_wedding_date ON kasa_timelines(wedding_date);
CREATE INDEX idx_kasa_timelines_ceremony_type ON kasa_timelines(ceremony_type);

-- Timeline tasks indexes
CREATE INDEX idx_kasa_timeline_tasks_timeline ON kasa_timeline_tasks(timeline_id);
CREATE INDEX idx_kasa_timeline_tasks_couple ON kasa_timeline_tasks(couple_id);
CREATE INDEX idx_kasa_timeline_tasks_status ON kasa_timeline_tasks(status);
CREATE INDEX idx_kasa_timeline_tasks_due_date ON kasa_timeline_tasks(due_date);
CREATE INDEX idx_kasa_timeline_tasks_category ON kasa_timeline_tasks(category);
CREATE INDEX idx_kasa_timeline_tasks_template ON kasa_timeline_tasks(template_id);

-- Conversations indexes
CREATE INDEX idx_kasa_conversations_couple ON kasa_conversations(couple_id);
CREATE INDEX idx_kasa_conversations_timeline ON kasa_conversations(timeline_id);
CREATE INDEX idx_kasa_conversations_active ON kasa_conversations(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_kasa_conversations_last_message ON kasa_conversations(last_message_at DESC);

-- Messages indexes
CREATE INDEX idx_kasa_messages_conversation ON kasa_messages(conversation_id);
CREATE INDEX idx_kasa_messages_couple ON kasa_messages(couple_id);
CREATE INDEX idx_kasa_messages_created ON kasa_messages(created_at DESC);
CREATE INDEX idx_kasa_messages_timeline ON kasa_messages(referenced_timeline_id);

-- Snapshots indexes
CREATE INDEX idx_kasa_snapshots_timeline ON kasa_timeline_snapshots(timeline_id);
CREATE INDEX idx_kasa_snapshots_date ON kasa_timeline_snapshots(snapshot_date DESC);

-- ============================================================================
-- 9. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp for relevant tables
CREATE TRIGGER trg_kasa_task_templates_updated_at
  BEFORE UPDATE ON kasa_task_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_kasa_timelines_updated_at
  BEFORE UPDATE ON kasa_timelines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_kasa_timeline_tasks_updated_at
  BEFORE UPDATE ON kasa_timeline_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_kasa_conversations_updated_at
  BEFORE UPDATE ON kasa_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to update timeline progress when tasks change
CREATE OR REPLACE FUNCTION update_timeline_progress()
RETURNS TRIGGER AS $$
DECLARE
  target_timeline_id UUID;
BEGIN
  -- Determine which timeline to update
  IF TG_OP = 'DELETE' THEN
    target_timeline_id := OLD.timeline_id;
  ELSE
    target_timeline_id := NEW.timeline_id;
  END IF;

  -- Recalculate progress for the timeline
  UPDATE kasa_timelines
  SET
    total_tasks = (
      SELECT COUNT(*)
      FROM kasa_timeline_tasks
      WHERE timeline_id = target_timeline_id
    ),
    completed_tasks = (
      SELECT COUNT(*)
      FROM kasa_timeline_tasks
      WHERE timeline_id = target_timeline_id AND status = 'completed'
    ),
    overdue_tasks = (
      SELECT COUNT(*)
      FROM kasa_timeline_tasks
      WHERE timeline_id = target_timeline_id
        AND status != 'completed'
        AND status != 'skipped'
        AND due_date < current_date
    ),
    progress_percentage = (
      SELECT CASE
        WHEN COUNT(*) = 0 THEN 0
        ELSE ROUND((COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*)::numeric) * 100, 2)
      END
      FROM kasa_timeline_tasks
      WHERE timeline_id = target_timeline_id
    ),
    updated_at = now()
  WHERE id = target_timeline_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update timeline progress on task changes
CREATE TRIGGER trg_timeline_task_progress_insert
  AFTER INSERT ON kasa_timeline_tasks
  FOR EACH ROW EXECUTE FUNCTION update_timeline_progress();

CREATE TRIGGER trg_timeline_task_progress_update
  AFTER UPDATE OF status ON kasa_timeline_tasks
  FOR EACH ROW EXECUTE FUNCTION update_timeline_progress();

CREATE TRIGGER trg_timeline_task_progress_delete
  AFTER DELETE ON kasa_timeline_tasks
  FOR EACH ROW EXECUTE FUNCTION update_timeline_progress();

-- Function to update conversation message count and last_message_at
CREATE OR REPLACE FUNCTION update_conversation_metadata()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE kasa_conversations
  SET
    message_count = message_count + 1,
    last_message_at = NEW.created_at,
    updated_at = now()
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update conversation metadata on new messages
CREATE TRIGGER trg_conversation_message_insert
  AFTER INSERT ON kasa_messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_metadata();

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all Kasa tables
ALTER TABLE kasa_task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE kasa_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE kasa_timeline_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE kasa_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE kasa_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE kasa_timeline_snapshots ENABLE ROW LEVEL SECURITY;

-- Task templates: Anyone authenticated can read (for browsing templates)
CREATE POLICY "task_templates_select_authenticated"
  ON kasa_task_templates FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = TRUE);

-- Timelines: Couples can read/write their own timelines
CREATE POLICY "timelines_select_own"
  ON kasa_timelines FOR SELECT
  USING (auth.uid() = couple_id);

CREATE POLICY "timelines_insert_own"
  ON kasa_timelines FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "timelines_update_own"
  ON kasa_timelines FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "timelines_delete_own"
  ON kasa_timelines FOR DELETE
  USING (auth.uid() = couple_id);

-- Timeline tasks: Couples can read/write their own timeline tasks
CREATE POLICY "timeline_tasks_select_own"
  ON kasa_timeline_tasks FOR SELECT
  USING (auth.uid() = couple_id);

CREATE POLICY "timeline_tasks_insert_own"
  ON kasa_timeline_tasks FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "timeline_tasks_update_own"
  ON kasa_timeline_tasks FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "timeline_tasks_delete_own"
  ON kasa_timeline_tasks FOR DELETE
  USING (auth.uid() = couple_id);

-- Conversations: Couples can read/write their own conversations
CREATE POLICY "conversations_select_own"
  ON kasa_conversations FOR SELECT
  USING (auth.uid() = couple_id);

CREATE POLICY "conversations_insert_own"
  ON kasa_conversations FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

CREATE POLICY "conversations_update_own"
  ON kasa_conversations FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

-- Messages: Couples can read/write their own messages
CREATE POLICY "messages_select_own"
  ON kasa_messages FOR SELECT
  USING (auth.uid() = couple_id);

CREATE POLICY "messages_insert_own"
  ON kasa_messages FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Snapshots: Couples can read their own snapshots
CREATE POLICY "snapshots_select_own"
  ON kasa_timeline_snapshots FOR SELECT
  USING (auth.uid() = couple_id);

COMMIT;
