-- ============================================================================
-- Celebration Websites + RSVP + Guest Photographer
-- Migration: 002_celebration_websites
-- Description: Tables for couple celebration websites, RSVP tracking, and
--              guest photo uploads (the "guest as photographer" feature)
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. NEW ENUMS
-- ============================================================================

CREATE TYPE rsvp_response AS ENUM ('attending', 'declined');
CREATE TYPE photo_status AS ENUM ('pending', 'approved', 'hidden', 'deleted');

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- --------------------------------------------------------------------------
-- 2.1 celebration_websites - core table for couple websites
-- --------------------------------------------------------------------------
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

COMMENT ON TABLE celebration_websites IS 'Couple celebration websites with RSVP and guest photographer features.';

-- --------------------------------------------------------------------------
-- 2.2 website_schedule_events - timeline events
-- --------------------------------------------------------------------------
CREATE TABLE website_schedule_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,
  event_time TIME,
  event_name TEXT NOT NULL,
  event_location TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------------
-- 2.3 website_entourage - wedding party members
-- --------------------------------------------------------------------------
CREATE TABLE website_entourage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  role TEXT NOT NULL,
  role_category TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------------
-- 2.4 website_gallery - couple's pre-wedding photos
-- --------------------------------------------------------------------------
CREATE TABLE website_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES celebration_websites(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------------
-- 2.5 website_rsvps - guest RSVP responses (anonymous)
-- --------------------------------------------------------------------------
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

COMMENT ON TABLE website_rsvps IS 'Guest RSVP responses. Anonymous inserts allowed for published websites.';

-- --------------------------------------------------------------------------
-- 2.6 website_guest_photos - photos uploaded by guests
-- --------------------------------------------------------------------------
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

COMMENT ON TABLE website_guest_photos IS 'Guest-uploaded photos. Anonymous uploads allowed for published websites with photos enabled.';

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Celebration websites
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

-- ============================================================================
-- 4. FUNCTIONS
-- ============================================================================

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

-- ============================================================================
-- 5. TRIGGERS
-- ============================================================================

-- Auto-update updated_at for celebration_websites
CREATE TRIGGER trg_websites_updated_at
  BEFORE UPDATE ON celebration_websites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update updated_at for website_rsvps
CREATE TRIGGER trg_rsvps_updated_at
  BEFORE UPDATE ON website_rsvps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 6. VIEWS
-- ============================================================================

-- RSVP summary for couple dashboard
CREATE OR REPLACE VIEW website_rsvp_summary AS
SELECT
  w.id AS website_id,
  w.couple_id,
  COUNT(r.id) AS total_responses,
  COUNT(r.id) FILTER (WHERE r.response = 'attending') AS attending_count,
  COUNT(r.id) FILTER (WHERE r.response = 'declined') AS declined_count,
  COALESCE(SUM(r.guest_count) FILTER (WHERE r.response = 'attending'), 0) AS total_guests_attending,
  COUNT(DISTINCT r.id) FILTER (WHERE r.dietary_restrictions != '{}') AS guests_with_dietary
FROM celebration_websites w
LEFT JOIN website_rsvps r ON r.website_id = w.id
GROUP BY w.id, w.couple_id;

-- Guest photo stats for couple dashboard
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

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE celebration_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_entourage ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_guest_photos ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- 7.1 celebration_websites RLS
-- --------------------------------------------------------------------------

-- Public can view published websites
CREATE POLICY "websites_select_published"
  ON celebration_websites FOR SELECT
  USING (is_published = TRUE);

-- Couple can view their own website (including drafts)
CREATE POLICY "websites_select_own"
  ON celebration_websites FOR SELECT
  USING (auth.uid() = couple_id);

-- Couple can create their website
CREATE POLICY "websites_insert_own"
  ON celebration_websites FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Couple can update their website
CREATE POLICY "websites_update_own"
  ON celebration_websites FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

-- Couple can delete their website
CREATE POLICY "websites_delete_own"
  ON celebration_websites FOR DELETE
  USING (auth.uid() = couple_id);

-- --------------------------------------------------------------------------
-- 7.2 website_schedule_events RLS
-- --------------------------------------------------------------------------

-- Public can read schedule for published websites
CREATE POLICY "schedule_select_published"
  ON website_schedule_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND is_published = TRUE
    )
  );

-- Couple can manage their schedule
CREATE POLICY "schedule_select_own"
  ON website_schedule_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "schedule_insert_own"
  ON website_schedule_events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "schedule_update_own"
  ON website_schedule_events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "schedule_delete_own"
  ON website_schedule_events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- 7.3 website_entourage RLS
-- --------------------------------------------------------------------------

-- Public can read entourage for published websites
CREATE POLICY "entourage_select_published"
  ON website_entourage FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND is_published = TRUE
    )
  );

CREATE POLICY "entourage_select_own"
  ON website_entourage FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "entourage_insert_own"
  ON website_entourage FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "entourage_update_own"
  ON website_entourage FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "entourage_delete_own"
  ON website_entourage FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- 7.4 website_gallery RLS
-- --------------------------------------------------------------------------

-- Public can read gallery for published websites
CREATE POLICY "gallery_select_published"
  ON website_gallery FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND is_published = TRUE
    )
  );

CREATE POLICY "gallery_select_own"
  ON website_gallery FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "gallery_insert_own"
  ON website_gallery FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "gallery_update_own"
  ON website_gallery FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

CREATE POLICY "gallery_delete_own"
  ON website_gallery FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id AND couple_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- 7.5 website_rsvps RLS
-- --------------------------------------------------------------------------

-- Anyone can insert RSVPs for published websites with RSVP enabled
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

-- Couple can delete RSVPs
CREATE POLICY "rsvps_delete_couple"
  ON website_rsvps FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM celebration_websites
      WHERE id = website_id
      AND couple_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- 7.6 website_guest_photos RLS
-- --------------------------------------------------------------------------

-- Anyone can upload photos for published websites with photos enabled
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

-- Public can view approved photos for websites with public albums
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

-- Couple can update photo status (approve/hide)
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

-- ============================================================================
-- 8. STORAGE BUCKETS
-- ============================================================================

-- Create storage bucket for guest photos (public read for approved photos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-guest-photos', 'website-guest-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can upload to guest photos bucket
CREATE POLICY "guest_photos_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'website-guest-photos');

-- Storage policy: anyone can read from guest photos bucket (public)
CREATE POLICY "guest_photos_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'website-guest-photos');

-- Create storage bucket for couple gallery photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-gallery', 'website-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: authenticated users can upload to gallery
CREATE POLICY "gallery_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'website-gallery' AND auth.role() = 'authenticated');

-- Storage policy: anyone can read gallery (public websites)
CREATE POLICY "gallery_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'website-gallery');

COMMIT;
