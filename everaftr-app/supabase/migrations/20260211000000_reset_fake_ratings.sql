-- Reset fake rating and review_count to 0
-- These were seeded from mock data but no real reviews exist
UPDATE vendors SET rating = 0, review_count = 0;
