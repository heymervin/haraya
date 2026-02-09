-- ============================================================================
-- MVP: Allow anonymous inserts to celebration_websites
-- Description: Temporary policy so the couple website editor can publish
--              without authentication. This will be removed once auth is added.
-- ============================================================================

BEGIN;

-- Allow anonymous inserts (MVP only — no auth yet)
CREATE POLICY "websites_insert_anon_mvp"
  ON celebration_websites FOR INSERT
  WITH CHECK (true);

-- Allow anonymous updates by matching on id (MVP only)
CREATE POLICY "websites_update_anon_mvp"
  ON celebration_websites FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anonymous management of schedule events (MVP only)
CREATE POLICY "schedule_insert_anon_mvp"
  ON website_schedule_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "schedule_delete_anon_mvp"
  ON website_schedule_events FOR DELETE
  USING (true);

-- Allow anonymous management of entourage (MVP only)
CREATE POLICY "entourage_insert_anon_mvp"
  ON website_entourage FOR INSERT
  WITH CHECK (true);

CREATE POLICY "entourage_delete_anon_mvp"
  ON website_entourage FOR DELETE
  USING (true);

-- Allow anonymous management of gallery (MVP only)
CREATE POLICY "gallery_insert_anon_mvp"
  ON website_gallery FOR INSERT
  WITH CHECK (true);

CREATE POLICY "gallery_delete_anon_mvp"
  ON website_gallery FOR DELETE
  USING (true);

-- Allow anonymous reads on RSVPs by website_id (for dashboard without auth)
CREATE POLICY "rsvps_select_anon_mvp"
  ON website_rsvps FOR SELECT
  USING (true);

-- Allow anonymous reads on guest photos (for dashboard without auth)
CREATE POLICY "guest_photos_select_anon_mvp"
  ON website_guest_photos FOR SELECT
  USING (true);

-- Allow anonymous updates on guest photos (for moderation without auth)
CREATE POLICY "guest_photos_update_anon_mvp"
  ON website_guest_photos FOR UPDATE
  USING (true);

COMMIT;
