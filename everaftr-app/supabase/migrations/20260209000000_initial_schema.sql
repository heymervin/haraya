-- ============================================================================
-- everaftr Initial Database Schema
-- Migration: 001_initial_schema
-- Description: Complete database schema for the everaftr wedding planning platform
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. CUSTOM TYPES (ENUMS)
-- ============================================================================

-- User role enum
CREATE TYPE user_role AS ENUM ('couple', 'vendor', 'admin');

-- Ceremony type enum (inclusive of all Filipino ceremony types)
CREATE TYPE ceremony_type AS ENUM (
  'Catholic',
  'Church (INC)',
  'Church (Other)',
  'Muslim',
  'Civil',
  'Civil Union',
  'Other'
);

-- Vendor category enum (expanded from original 8 to 20 categories)
CREATE TYPE vendor_category AS ENUM (
  'Venues',
  'Photo & Video',
  'Catering',
  'Coordination',
  'Flowers & Styling',
  'Lights & Sound',
  'Hair & Makeup',
  'Attire & Design',
  'Jewellery',
  'Entertainment',
  'Food & Drinks',
  'Photo Booth & Souvenirs',
  'Rentals & Effects',
  'Artisans',
  'Stationery',
  'Registry',
  'Transport',
  'Honeymoon',
  'Finance',
  'Media'
);

-- Inquiry status enum
CREATE TYPE inquiry_status AS ENUM ('pending', 'read', 'replied', 'closed');

-- RSVP status enum
CREATE TYPE rsvp_status AS ENUM ('pending', 'attending', 'declined', 'maybe');

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- --------------------------------------------------------------------------
-- 2.1 profiles - extends Supabase auth.users
-- --------------------------------------------------------------------------
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'couple',
  partner1_name TEXT,
  partner2_name TEXT,
  celebration_date DATE,
  ceremony_type ceremony_type,
  budget_min INTEGER,
  budget_max INTEGER,
  guest_count INTEGER,
  location TEXT,
  custom_labels JSONB DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth. Stores couple/vendor specific data.';
COMMENT ON COLUMN profiles.custom_labels IS 'JSON: { "partner1Label": "You", "partner2Label": "Your Partner" }';

-- --------------------------------------------------------------------------
-- 2.2 vendor_categories - reference table for vendor categories
-- --------------------------------------------------------------------------
CREATE TABLE vendor_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name vendor_category NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE vendor_categories IS 'Reference table for vendor categories with display metadata.';

-- --------------------------------------------------------------------------
-- 2.3 vendors - vendor business listings
-- --------------------------------------------------------------------------
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category vendor_category NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  price_range_min INTEGER,
  price_range_max INTEGER,
  currency TEXT NOT NULL DEFAULT 'PHP',
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  all_celebrations_welcome BOOLEAN DEFAULT FALSE,
  availability TEXT[] DEFAULT '{}',
  contact_info JSONB DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE vendors IS 'Vendor business listings. Publicly readable, owner-editable.';
COMMENT ON COLUMN vendors.contact_info IS 'JSON: { "email", "phone", "website", "instagram", "facebook", "tiktok" }';
COMMENT ON COLUMN vendors.availability IS 'Array of available months, e.g. ["January", "February"]';
COMMENT ON COLUMN vendors.gallery IS 'Array of image URLs for vendor photo gallery';

-- --------------------------------------------------------------------------
-- 2.4 reviews - vendor reviews by couples
-- --------------------------------------------------------------------------
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE reviews IS 'Vendor reviews submitted by couples. Rating must be 1-5.';

-- --------------------------------------------------------------------------
-- 2.5 inquiries - vendor inquiry messages from couples
-- --------------------------------------------------------------------------
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  couple_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  celebration_date DATE,
  guest_count INTEGER,
  budget_min INTEGER,
  budget_max INTEGER,
  message TEXT NOT NULL,
  status inquiry_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE inquiries IS 'Inquiry messages from couples to vendors.';

-- --------------------------------------------------------------------------
-- 2.6 favorites - saved vendor bookmarks
-- --------------------------------------------------------------------------
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(couple_id, vendor_id)
);

COMMENT ON TABLE favorites IS 'Vendor bookmarks/favorites saved by couples. One per couple-vendor pair.';

-- --------------------------------------------------------------------------
-- 2.7 checklist_items - wedding planning checklist
-- --------------------------------------------------------------------------
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  timeframe TEXT,
  ceremony_types TEXT[] DEFAULT '{}',
  notes TEXT,
  due_date DATE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE checklist_items IS 'Wedding planning checklist items. Each couple has their own set.';
COMMENT ON COLUMN checklist_items.timeframe IS 'e.g. "12+ months", "9-12 months", "6-9 months"';
COMMENT ON COLUMN checklist_items.ceremony_types IS 'Applicable ceremony types for filtering';

-- --------------------------------------------------------------------------
-- 2.8 budget_items - wedding budget tracker
-- --------------------------------------------------------------------------
CREATE TABLE budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  description TEXT,
  suggested_percentage NUMERIC(5,2),
  estimated_cost NUMERIC(12,2) DEFAULT 0,
  actual_cost NUMERIC(12,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT FALSE,
  vendor_name TEXT,
  notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE budget_items IS 'Budget line items for wedding planning. Tracks estimated vs actual costs.';

-- --------------------------------------------------------------------------
-- 2.9 celebrations - Real Celebrations / wedding stories
-- --------------------------------------------------------------------------
CREATE TABLE celebrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  story TEXT,
  photos TEXT[] DEFAULT '{}',
  vendor_mentions UUID[] DEFAULT '{}',
  ceremony_type ceremony_type,
  location TEXT,
  celebration_date DATE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE celebrations IS 'Real Celebrations - couple-submitted wedding stories with photos.';
COMMENT ON COLUMN celebrations.vendor_mentions IS 'Array of vendor UUIDs mentioned in the story';

-- --------------------------------------------------------------------------
-- 2.10 guest_list - wedding guest management
-- --------------------------------------------------------------------------
CREATE TABLE guest_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  guest_group TEXT,
  rsvp_status rsvp_status NOT NULL DEFAULT 'pending',
  dietary_notes TEXT,
  plus_one BOOLEAN DEFAULT FALSE,
  table_number INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE guest_list IS 'Wedding guest list with RSVP tracking, dietary info, and seating.';

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Vendors indexes for search and filtering
CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_vendors_location ON vendors(location);
CREATE INDEX idx_vendors_rating ON vendors(rating DESC);
CREATE INDEX idx_vendors_is_verified ON vendors(is_verified) WHERE is_verified = TRUE;
CREATE INDEX idx_vendors_all_celebrations ON vendors(all_celebrations_welcome) WHERE all_celebrations_welcome = TRUE;
CREATE INDEX idx_vendors_featured ON vendors(featured) WHERE featured = TRUE;
CREATE INDEX idx_vendors_slug ON vendors(slug);
CREATE INDEX idx_vendors_owner ON vendors(owner_id);
CREATE INDEX idx_vendors_price ON vendors(price_range_min, price_range_max);

-- Reviews indexes
CREATE INDEX idx_reviews_vendor ON reviews(vendor_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);

-- Inquiries indexes
CREATE INDEX idx_inquiries_vendor ON inquiries(vendor_id);
CREATE INDEX idx_inquiries_couple ON inquiries(couple_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- Favorites indexes
CREATE INDEX idx_favorites_couple ON favorites(couple_id);
CREATE INDEX idx_favorites_vendor ON favorites(vendor_id);

-- Checklist indexes
CREATE INDEX idx_checklist_couple ON checklist_items(couple_id);
CREATE INDEX idx_checklist_timeframe ON checklist_items(couple_id, timeframe);

-- Budget indexes
CREATE INDEX idx_budget_couple ON budget_items(couple_id);

-- Celebrations indexes
CREATE INDEX idx_celebrations_couple ON celebrations(couple_id);
CREATE INDEX idx_celebrations_published ON celebrations(is_published) WHERE is_published = TRUE;

-- Guest list indexes
CREATE INDEX idx_guest_list_couple ON guest_list(couple_id);
CREATE INDEX idx_guest_list_rsvp ON guest_list(couple_id, rsvp_status);

-- ============================================================================
-- 4. FUNCTIONS & TRIGGERS
-- ============================================================================

-- --------------------------------------------------------------------------
-- 4.1 Auto-update updated_at timestamp
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_vendors_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_celebrations_updated_at
  BEFORE UPDATE ON celebrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------------------------
-- 4.2 Auto-create profile on auth.users insert
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, role)
  VALUES (NEW.id, 'couple');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- --------------------------------------------------------------------------
-- 4.3 Update vendor rating & review_count on review changes
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_vendor_id UUID;
BEGIN
  -- Determine which vendor to update
  IF TG_OP = 'DELETE' THEN
    target_vendor_id := OLD.vendor_id;
  ELSE
    target_vendor_id := NEW.vendor_id;
  END IF;

  -- Recalculate rating and review count
  UPDATE vendors
  SET
    rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews
      WHERE vendor_id = target_vendor_id
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE vendor_id = target_vendor_id
    ),
    updated_at = now()
  WHERE id = target_vendor_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_review_insert
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

CREATE TRIGGER trg_review_update
  AFTER UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

CREATE TRIGGER trg_review_delete
  AFTER DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_list ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- 5.1 profiles RLS
-- --------------------------------------------------------------------------

-- Anyone can read profiles (needed for vendor display names, etc.)
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (for edge cases where trigger doesn't fire)
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- --------------------------------------------------------------------------
-- 5.2 vendors RLS
-- --------------------------------------------------------------------------

-- Anyone can read vendors (public directory)
CREATE POLICY "vendors_select_public"
  ON vendors FOR SELECT
  USING (true);

-- Vendor owner can insert their own listing
CREATE POLICY "vendors_insert_owner"
  ON vendors FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Vendor owner can update their own listing
CREATE POLICY "vendors_update_owner"
  ON vendors FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Vendor owner can delete their own listing
CREATE POLICY "vendors_delete_owner"
  ON vendors FOR DELETE
  USING (auth.uid() = owner_id);

-- --------------------------------------------------------------------------
-- 5.3 vendor_categories RLS
-- --------------------------------------------------------------------------

-- Anyone can read categories (public reference data)
CREATE POLICY "vendor_categories_select_public"
  ON vendor_categories FOR SELECT
  USING (true);

-- --------------------------------------------------------------------------
-- 5.4 reviews RLS
-- --------------------------------------------------------------------------

-- Anyone can read reviews
CREATE POLICY "reviews_select_public"
  ON reviews FOR SELECT
  USING (true);

-- Authenticated users can create reviews
CREATE POLICY "reviews_insert_authenticated"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Reviewer can update their own review
CREATE POLICY "reviews_update_own"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id)
  WITH CHECK (auth.uid() = reviewer_id);

-- Reviewer can delete their own review
CREATE POLICY "reviews_delete_own"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- --------------------------------------------------------------------------
-- 5.5 inquiries RLS
-- --------------------------------------------------------------------------

-- Authenticated users can create inquiries
CREATE POLICY "inquiries_insert_authenticated"
  ON inquiries FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Couples can read their own sent inquiries
CREATE POLICY "inquiries_select_couple"
  ON inquiries FOR SELECT
  USING (auth.uid() = couple_id);

-- Vendor owners can read inquiries sent to their vendors
CREATE POLICY "inquiries_select_vendor_owner"
  ON inquiries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vendors
      WHERE vendors.id = inquiries.vendor_id
      AND vendors.owner_id = auth.uid()
    )
  );

-- Vendor owners can update inquiry status
CREATE POLICY "inquiries_update_vendor_owner"
  ON inquiries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM vendors
      WHERE vendors.id = inquiries.vendor_id
      AND vendors.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM vendors
      WHERE vendors.id = inquiries.vendor_id
      AND vendors.owner_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- 5.6 favorites RLS
-- --------------------------------------------------------------------------

-- Users can read their own favorites
CREATE POLICY "favorites_select_own"
  ON favorites FOR SELECT
  USING (auth.uid() = couple_id);

-- Users can insert their own favorites
CREATE POLICY "favorites_insert_own"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Users can delete their own favorites
CREATE POLICY "favorites_delete_own"
  ON favorites FOR DELETE
  USING (auth.uid() = couple_id);

-- --------------------------------------------------------------------------
-- 5.7 checklist_items RLS
-- --------------------------------------------------------------------------

-- Users can read their own checklist items
CREATE POLICY "checklist_select_own"
  ON checklist_items FOR SELECT
  USING (auth.uid() = couple_id);

-- Users can insert their own checklist items
CREATE POLICY "checklist_insert_own"
  ON checklist_items FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Users can update their own checklist items
CREATE POLICY "checklist_update_own"
  ON checklist_items FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

-- Users can delete their own checklist items
CREATE POLICY "checklist_delete_own"
  ON checklist_items FOR DELETE
  USING (auth.uid() = couple_id);

-- --------------------------------------------------------------------------
-- 5.8 budget_items RLS
-- --------------------------------------------------------------------------

-- Users can read their own budget items
CREATE POLICY "budget_select_own"
  ON budget_items FOR SELECT
  USING (auth.uid() = couple_id);

-- Users can insert their own budget items
CREATE POLICY "budget_insert_own"
  ON budget_items FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Users can update their own budget items
CREATE POLICY "budget_update_own"
  ON budget_items FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

-- Users can delete their own budget items
CREATE POLICY "budget_delete_own"
  ON budget_items FOR DELETE
  USING (auth.uid() = couple_id);

-- --------------------------------------------------------------------------
-- 5.9 celebrations RLS
-- --------------------------------------------------------------------------

-- Anyone can read published celebrations
CREATE POLICY "celebrations_select_published"
  ON celebrations FOR SELECT
  USING (is_published = true);

-- Owners can read all their own celebrations (including drafts)
CREATE POLICY "celebrations_select_own"
  ON celebrations FOR SELECT
  USING (auth.uid() = couple_id);

-- Owners can insert their own celebrations
CREATE POLICY "celebrations_insert_own"
  ON celebrations FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Owners can update their own celebrations
CREATE POLICY "celebrations_update_own"
  ON celebrations FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

-- Owners can delete their own celebrations
CREATE POLICY "celebrations_delete_own"
  ON celebrations FOR DELETE
  USING (auth.uid() = couple_id);

-- --------------------------------------------------------------------------
-- 5.10 guest_list RLS
-- --------------------------------------------------------------------------

-- Users can read their own guest list
CREATE POLICY "guest_list_select_own"
  ON guest_list FOR SELECT
  USING (auth.uid() = couple_id);

-- Users can insert into their own guest list
CREATE POLICY "guest_list_insert_own"
  ON guest_list FOR INSERT
  WITH CHECK (auth.uid() = couple_id);

-- Users can update their own guest list entries
CREATE POLICY "guest_list_update_own"
  ON guest_list FOR UPDATE
  USING (auth.uid() = couple_id)
  WITH CHECK (auth.uid() = couple_id);

-- Users can delete from their own guest list
CREATE POLICY "guest_list_delete_own"
  ON guest_list FOR DELETE
  USING (auth.uid() = couple_id);

-- ============================================================================
-- 6. SEED DATA - Vendor Categories
-- ============================================================================

INSERT INTO vendor_categories (name, slug, description, icon, sort_order) VALUES
  ('Venues', 'venues', 'Wedding venues, reception halls, gardens, and event spaces', 'MapPin', 1),
  ('Photo & Video', 'photo-video', 'Photographers, videographers, and drone coverage', 'Camera', 2),
  ('Catering', 'catering', 'Food and beverage services, lechon, and celebration meals', 'UtensilsCrossed', 3),
  ('Coordination', 'coordination', 'Wedding coordinators, planners, and day-of management', 'ClipboardList', 4),
  ('Flowers & Styling', 'flowers-styling', 'Florists, event stylists, and decoration services', 'Flower2', 5),
  ('Lights & Sound', 'lights-sound', 'Lighting design, sound systems, and AV equipment', 'Lightbulb', 6),
  ('Hair & Makeup', 'hair-makeup', 'Hair stylists, makeup artists, and bridal beauty services', 'Sparkles', 7),
  ('Attire & Design', 'attire-design', 'Wedding attire, Barong Tagalog, Filipiniana, suits, and gowns', 'Shirt', 8),
  ('Jewellery', 'jewellery', 'Wedding rings, arrhae, and celebration jewellery', 'Gem', 9),
  ('Entertainment', 'entertainment', 'Bands, DJs, performers, and celebration entertainment', 'Music', 10),
  ('Food & Drinks', 'food-drinks', 'Specialty food, cocktails, desserts, and beverage services', 'Wine', 11),
  ('Photo Booth & Souvenirs', 'photo-booth-souvenirs', 'Photo booths, souvenirs, and celebration keepsakes', 'Gift', 12),
  ('Rentals & Effects', 'rentals-effects', 'Equipment rentals, special effects, and event supplies', 'Layers', 13),
  ('Artisans', 'artisans', 'Calligraphers, custom craftwork, and artisan services', 'Palette', 14),
  ('Stationery', 'stationery', 'Invitations, programs, and celebration stationery', 'FileText', 15),
  ('Registry', 'registry', 'Gift registries and celebration wish lists', 'Package', 16),
  ('Transport', 'transport', 'Bridal cars, guest transport, and celebration logistics', 'Car', 17),
  ('Honeymoon', 'honeymoon', 'Honeymoon destinations, travel planning, and getaways', 'Plane', 18),
  ('Finance', 'finance', 'Wedding financing, insurance, and financial planning', 'Wallet', 19),
  ('Media', 'media', 'Wedding blogs, features, and media coverage', 'Newspaper', 20);

COMMIT;
