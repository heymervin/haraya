-- Reset is_verified to false for all vendors
-- No vendor has actually claimed/verified their listing yet
UPDATE vendors SET is_verified = false;
