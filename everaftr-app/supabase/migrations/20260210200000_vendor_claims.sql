-- Vendor claim requests table
-- Allows anyone to submit a claim for an unverified vendor listing

CREATE TABLE vendor_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  vendor_slug TEXT NOT NULL,
  claimant_name TEXT NOT NULL,
  claimant_email TEXT NOT NULL,
  claimant_phone TEXT,
  claimant_role TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vendor_claims ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a claim (public form)
CREATE POLICY "Anyone can submit a claim"
  ON vendor_claims FOR INSERT
  WITH CHECK (true);

-- Anyone can read claims (needed for duplicate check)
CREATE POLICY "Anyone can view claims"
  ON vendor_claims FOR SELECT
  USING (true);
