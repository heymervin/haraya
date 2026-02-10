-- ============================================================================
-- Kasa AI Timeline Tasks Seed Data
-- Migration: 20260210100000_seed_timeline_tasks
-- Description: Comprehensive Filipino wedding planning task templates
--              Covers all ceremony types with Filipino-specific requirements
-- ============================================================================

BEGIN;

-- ============================================================================
-- GOVERNMENT DOCUMENTS & LEGAL REQUIREMENTS (12+ months to 3 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  task_name_tagalog,
  description,
  description_tagalog,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  is_government_doc,
  processing_time_weeks,
  typical_lead_time_days,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- CENOMAR (Certificate of No Marriage Record)
(
  'Get CENOMAR from PSA',
  'Kumuha ng CENOMAR sa PSA',
  'Certificate of No Marriage Record is required for marriage license application. Can be requested online via PSA Serbilis or in-person at PSA offices.',
  'Kailangan para sa marriage license. Pwedeng i-request online o personal sa PSA.',
  'Documents',
  4, -- Start 4 months before
  4, -- Takes 3-4 weeks processing
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union'],
  TRUE,
  'critical',
  TRUE,
  4, -- 3-4 weeks processing
  120,
  ARRAY[
    'Order online via PSA Serbilis (psaserbilis.com.ph) - mas convenient!',
    'Need valid ID + birth certificate details',
    'Magkaiba ang CENOMAR (proof of no marriage) and Marriage Contract (proof of marriage)',
    'Valid for 6 months from issue date',
    'Request 2 copies - one for marriage license, one for church'
  ],
  ARRAY[
    'Waiting too long - processing takes 3-4 weeks',
    'Not checking validity period',
    'Mixing up CENOMAR with marriage contract'
  ],
  10
),

-- Birth Certificate (Updated Copy)
(
  'Get PSA Birth Certificates',
  'Kumuha ng PSA Birth Certificate',
  'Updated birth certificate from PSA is required for marriage license. Both partners need to secure their own copies.',
  'Kailangan ng updated copy from PSA para sa marriage license.',
  'Documents',
  4,
  3,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union'],
  TRUE,
  'critical',
  TRUE,
  3,
  120,
  ARRAY[
    'Order via PSA Serbilis online - mas mabilis',
    'Make sure address and details are updated',
    'Get at least 2 certified true copies each',
    'Check for any errors in spelling or dates'
  ],
  ARRAY[
    'Using old NSO copy instead of updated PSA copy',
    'Not securing enough copies'
  ],
  20
),

-- Baptismal Certificate (Catholic requirement)
(
  'Get Baptismal Certificates',
  'Kumuha ng Baptismal Certificate',
  'Required by Catholic churches. Must be newly issued (within 6 months) from the church where you were baptized. Include annotation of Confirmation if applicable.',
  'Kailangan ng simbahan. Dapat bago - within 6 months lang.',
  'Documents',
  5,
  3,
  ARRAY['Catholic'],
  TRUE,
  'high',
  FALSE,
  NULL,
  150,
  ARRAY[
    'Contact your baptismal church early - some churches are slow',
    'Dapat may annotation of Confirmation (if confirmed)',
    'Valid for 6 months lang',
    'Bring valid ID and exact birth details',
    'Some churches charge PHP 50-200'
  ],
  ARRAY[
    'Requesting too late',
    'Forgetting confirmation annotation',
    'Not knowing which church you were baptized in'
  ],
  30
),

-- Confirmation Certificate (Catholic)
(
  'Get Confirmation Certificates',
  'Kumuha ng Confirmation Certificate',
  'Required by Catholic churches if baptismal certificate does not have confirmation annotation. Must be newly issued.',
  'Kailangan kung walang annotation sa baptismal cert.',
  'Documents',
  5,
  2,
  ARRAY['Catholic'],
  TRUE,
  'high',
  FALSE,
  NULL,
  150,
  ARRAY[
    'Some churches include this in baptismal cert annotation',
    'Remember which church you were confirmed in',
    'Bring ID and exact details'
  ],
  ARRAY[
    'Assuming it''s in baptismal cert when it''s not',
    'Not knowing confirmation church'
  ],
  40
),

-- Marriage License Application
(
  'Apply for Marriage License',
  'Mag-apply ng Marriage License',
  'File application at your chosen Local Civil Registrar. Bring all required documents: CENOMAR, birth certificates, baptismal certs, IDs. 10-day waiting period applies.',
  'File sa City/Municipal Hall. May 10-day waiting period.',
  'Documents',
  3,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union'],
  TRUE,
  'critical',
  TRUE,
  2, -- 10-day waiting period + processing
  90,
  ARRAY[
    'File sa city/municipal hall where either of you resides',
    'Both partners must be present for application',
    'May 10-day waiting period after filing',
    'License valid for 120 days after 10-day waiting period',
    'Fee is around PHP 200-500 depending on city',
    'Bring all original documents + photocopies'
  ],
  ARRAY[
    'Filing too late or too early',
    'Missing documents',
    'Not both being present',
    'Letting license expire (120-day validity)'
  ],
  50
),

-- Pre-Cana Seminar (Catholic requirement)
(
  'Attend Pre-Cana Seminar',
  'Dumalo sa Pre-Cana Seminar',
  'Required marriage preparation seminar by Catholic churches. Usually 1-2 days. Must be booked 6+ months in advance as slots fill up quickly.',
  'Required ng Catholic church. 1-2 days. Kailangang mag-book ng maaga.',
  'Documents',
  6,
  1,
  ARRAY['Catholic'],
  TRUE,
  'critical',
  FALSE,
  NULL,
  180,
  ARRAY[
    'Book EARLY - slots fill up 6+ months ahead!',
    'Usually held on weekends',
    'Fee ranges PHP 2,000-5,000 per couple',
    'Pwede sa ibang parish, not just your wedding church',
    'You''ll receive a certificate after - kailangan to for church wedding',
    'Some churches offer online Pre-Cana now'
  ],
  ARRAY[
    'Booking too late - walang slots na',
    'Assuming it''s quick - need months of advance booking',
    'Forgetting to get certificate after'
  ],
  60
),

-- Pre-Marriage Counseling (INC requirement)
(
  'Complete INC Pre-Marriage Counseling',
  'Tapusin ang INC Pre-Marriage Counseling',
  'Required marriage counseling sessions for Iglesia ni Cristo weddings. Must be completed with your local minister.',
  'Required counseling para sa INC wedding.',
  'Documents',
  6,
  8,
  ARRAY['Church (INC)'],
  TRUE,
  'critical',
  FALSE,
  NULL,
  180,
  ARRAY[
    'Coordinate with your local INC minister',
    'Multiple sessions required over several weeks',
    'Both partners must complete all sessions'
  ],
  ARRAY[
    'Starting too late',
    'Missing sessions'
  ],
  70
),

-- Marriage Contract for Muslim Weddings
(
  'Prepare Nikah Documents',
  'Ihanda ang Nikah Documents',
  'Prepare marriage contract and negotiate mahr (dowry) according to Islamic tradition. Coordinate with your imam or qadi.',
  'Ihanda ang marriage contract at mahr ayon sa Islamic tradition.',
  'Documents',
  3,
  2,
  ARRAY['Muslim'],
  TRUE,
  'critical',
  FALSE,
  NULL,
  90,
  ARRAY[
    'Discuss mahr amount with families',
    'Coordinate with imam or qadi for nikah ceremony',
    'Prepare wali (guardian) if needed',
    'Ensure witnesses are arranged'
  ],
  ARRAY[
    'Not discussing mahr early',
    'Not coordinating with religious authority'
  ],
  80
);

-- ============================================================================
-- VENUE BOOKING (12 months to 6 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  task_name_tagalog,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  advance_booking_months,
  estimated_cost_min,
  estimated_cost_max,
  vendor_categories,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Church/Ceremony Venue
(
  'Book Ceremony Venue',
  'Mag-book ng Simbahan o Ceremony Venue',
  'Book your church or ceremony venue. Catholic churches require 6-12 months advance booking for peak months (December, January, April, May).',
  'Venue',
  10,
  4,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'critical',
  10, -- Need 10 months advance booking
  10000,
  100000,
  ARRAY['Venues'],
  ARRAY[
    'Catholic churches: book 6-12 months ahead for peak seasons',
    'Popular churches in BGC, Makati book out 12+ months ahead',
    'Ask about church fees, choir fees, utilities',
    'Check if church allows external suppliers',
    'Peak months: December, January, April, May',
    'Morning ceremonies cheaper than afternoon'
  ],
  ARRAY[
    'Booking too late for peak season',
    'Not asking about supplier restrictions',
    'Forgetting to ask about parish requirements'
  ],
  100
),

-- Reception Venue
(
  'Book Reception Venue',
  'Mag-book ng Reception Venue',
  'Book your reception venue. Popular venues and peak dates book 12+ months in advance. Secure with signed contract and deposit.',
  'Venue',
  10,
  4,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'critical',
  10,
  100000,
  1000000,
  ARRAY['Venues'],
  ARRAY[
    'Peak season venues book 12-18 months ahead',
    'Get detailed contract with inclusions',
    'Ask about corkage policies',
    'Check if venue has backup generator',
    'Ask about supplier restrictions',
    'Clarify overtime charges',
    'Popular beach venues book early for summer'
  ],
  ARRAY[
    'Booking without reading contract',
    'Not clarifying hidden costs',
    'Assuming all suppliers allowed'
  ],
  110
);

-- ============================================================================
-- PRIMARY VENDORS (10-8 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  estimated_cost_min,
  estimated_cost_max,
  vendor_categories,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Photographer & Videographer
(
  'Book Photographer & Videographer',
  'Book your photo and video team. Top photographers book 12+ months ahead. Review portfolios and packages carefully.',
  'Vendors',
  10,
  3,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'critical',
  30000,
  200000,
  ARRAY['Photo & Video'],
  ARRAY[
    'Check portfolios from actual Filipino weddings',
    'Ask for full gallery samples, not just highlights',
    'Clarify deliverables: photos, videos, same-day edit, prenup shoot',
    'Ask about rights to raw files',
    'Turnaround time for final output usually 3-6 months',
    'Top Manila photographers book 12-18 months ahead'
  ],
  ARRAY[
    'Booking based on price alone',
    'Not reviewing full portfolios',
    'Not clarifying delivery timelines'
  ],
  120
),

-- Coordinator
(
  'Hire Wedding Coordinator',
  'Book a wedding coordinator or "day-of coordinator" to manage timeline and suppliers. Essential for stress-free wedding day.',
  'Vendors',
  9,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'high',
  20000,
  100000,
  ARRAY['Coordination'],
  ARRAY[
    'Full coordination vs. day-of coordination - iba ang scope',
    'Good coordinators book early',
    'Check references from past clients',
    'Ask if coordinator visits venue beforehand',
    'Coordinator handles supplier coordination on wedding day',
    'Worth it for peace of mind'
  ],
  ARRAY[
    'Hiring too late',
    'Not clarifying scope of services',
    'Skipping coordinator to save money'
  ],
  130
),

-- Caterer
(
  'Book Caterer',
  'Book your caterer or confirm venue catering package. Schedule food tasting. Consider dietary restrictions and Filipino favorites.',
  'Vendors',
  9,
  3,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'critical',
  50000,
  500000,
  ARRAY['Catering'],
  ARRAY[
    'Schedule food tasting before finalizing',
    'Ask about serving style: buffet, plated, stations',
    'Lechon is a must-have for many Filipino weddings',
    'Confirm halal options if needed',
    'Get detailed menu with portion sizes',
    'Ask about cake, drinks, waitstaff inclusions',
    'Check corkage if bringing external alcohol'
  ],
  ARRAY[
    'Not doing food tasting',
    'Forgetting to ask about dietary restrictions',
    'Not clarifying final headcount deadline'
  ],
  140
);

-- ============================================================================
-- STYLING & DESIGN (8-6 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  estimated_cost_min,
  estimated_cost_max,
  vendor_categories,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Florist & Event Stylist
(
  'Book Florist & Event Stylist',
  'Book florist for bouquet, centerpieces, and ceremony flowers. Event stylist for overall design, draping, and setup.',
  'Vendors',
  8,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  30000,
  300000,
  ARRAY['Flowers & Styling'],
  ARRAY[
    'Bring inspiration photos for styling mood',
    'Ask for sample setups or past event photos',
    'Clarify what''s included: ceremony + reception?',
    'Check setup and breakdown times',
    'Some stylists include rentals (chairs, linens, etc.)',
    'Peak season pricing higher for flowers'
  ],
  ARRAY[
    'Booking without seeing portfolio',
    'Not clarifying venue restrictions',
    'Forgetting about church flower arrangements'
  ],
  150
),

-- Hair & Makeup
(
  'Book Hair & Makeup Artist',
  'Book hair and makeup artist for couple and entourage. Schedule trial session 1-2 months before wedding.',
  'Vendors',
  8,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  15000,
  100000,
  ARRAY['Hair & Makeup'],
  ARRAY[
    'Book trial session 1-2 months before wedding',
    'Bring inspiration photos',
    'Ask how many people they can handle',
    'Clarify if they do touch-ups during reception',
    'Ask about airbrush makeup for photos',
    'Check if they arrive at your location'
  ],
  ARRAY[
    'Not doing trial session',
    'Booking without checking portfolio',
    'Not clarifying entourage count'
  ],
  160
),

-- Lights & Sound
(
  'Book Lights & Sound',
  'Book lighting and sound system for ceremony and reception. Essential for program flow and ambiance.',
  'Vendors',
  7,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  20000,
  150000,
  ARRAY['Lights & Sound'],
  ARRAY[
    'Check if venue has in-house sound system',
    'Ask about microphones for ceremony and speeches',
    'Lighting sets the mood - uplighting, spotlights, etc.',
    'Ask about backup equipment',
    'Confirm power requirements with venue'
  ],
  ARRAY[
    'Forgetting about ceremony sound system',
    'Not checking venue power capacity',
    'Skipping lighting for ambiance'
  ],
  170
),

-- Entertainment (Band/DJ)
(
  'Book Entertainment (Band/DJ)',
  'Book band or DJ for reception. Live band is traditional for Filipino weddings but DJs are becoming popular.',
  'Vendors',
  7,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  20000,
  100000,
  ARRAY['Entertainment'],
  ARRAY[
    'Popular bands book 12+ months ahead',
    'Ask for sample set list or repertoire',
    'Clarify breaks and set length',
    'Some couples do both: band for part of night + DJ',
    'Ask about equipment and setup time',
    'Discuss must-play and do-not-play songs'
  ],
  ARRAY[
    'Not hearing them perform live first',
    'Booking without discussing song preferences',
    'Not clarifying overtime rates'
  ],
  180
);

-- ============================================================================
-- ATTIRE (8-4 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  estimated_cost_min,
  estimated_cost_max,
  vendor_categories,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Wedding Attire - Partner 1
(
  'Shop for Wedding Attire (Partner 1)',
  'Shop for wedding outfit - wedding gown, Barong Tagalog, suit, or traditional attire. Schedule fittings over 2-3 months.',
  'Attire',
  7,
  12,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  15000,
  150000,
  ARRAY['Attire & Design'],
  ARRAY[
    'Custom Barong takes 2-3 months with fittings',
    'Off-the-rack gowns can be altered',
    'Bring your shoes to fittings',
    'Consider comfort - you''ll wear this 8+ hours',
    'Filipiniana options: Maria Clara, terno, balintawak',
    'Muslim brides: ask about custom kebaya or baju kurung'
  ],
  ARRAY[
    'Ordering too late for custom outfits',
    'Not considering venue/weather',
    'Forgetting about undergarments'
  ],
  190
),

-- Wedding Attire - Partner 2
(
  'Shop for Wedding Attire (Partner 2)',
  'Shop for wedding outfit - wedding gown, Barong Tagalog, suit, or traditional attire. Schedule fittings over 2-3 months.',
  'Attire',
  7,
  12,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  15000,
  150000,
  ARRAY['Attire & Design'],
  ARRAY[
    'Custom Barong takes 2-3 months with fittings',
    'Off-the-rack gowns can be altered',
    'Bring your shoes to fittings',
    'Consider comfort - you''ll wear this 8+ hours',
    'Filipiniana options: Maria Clara, terno, balintawak',
    'Muslim grooms: ask about jubah or thobe'
  ],
  ARRAY[
    'Ordering too late for custom outfits',
    'Not considering venue/weather',
    'Forgetting about accessories'
  ],
  200
),

-- Entourage Attire
(
  'Coordinate Entourage Attire',
  'Coordinate outfits for principal sponsors, bridesmaids, groomsmen, flower girls, ring bearers. Share color palette and style guidelines.',
  'Attire',
  5,
  8,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'medium',
  30000,
  200000,
  ARRAY['Attire & Design'],
  ARRAY[
    'Decide if you''re providing outfits or giving guidelines',
    'Consider entourage budget when choosing style',
    'Share color swatches or mood board',
    'Barong for male entourage is common',
    'Give at least 3 months for rentals/tailoring'
  ],
  ARRAY[
    'Announcing attire too late',
    'Choosing expensive outfits without considering budget',
    'Not providing clear guidelines'
  ],
  210
);

-- ============================================================================
-- ADDITIONAL VENDORS (6-3 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  estimated_cost_min,
  estimated_cost_max,
  vendor_categories,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Wedding Cake
(
  'Order Wedding Cake',
  'Order wedding cake from baker or cake shop. Schedule cake tasting. Traditional Filipino cake is multi-tiered with intricate designs.',
  'Vendors',
  4,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'medium',
  5000,
  50000,
  ARRAY['Catering', 'Food & Drinks'],
  ARRAY[
    'Schedule cake tasting',
    'Popular flavors: red velvet, chocolate, mocha',
    'Ask about delivery and setup fee',
    'Coordinate with venue for table/display',
    'Consider dummy tiers to save cost',
    'Some caterers include cake in package'
  ],
  ARRAY[
    'Not doing cake tasting',
    'Ordering size too small for guest count',
    'Forgetting about delivery logistics'
  ],
  220
),

-- Photo Booth & Souvenirs
(
  'Book Photo Booth & Order Souvenirs',
  'Book photo booth for guest entertainment. Order wedding souvenirs/giveaways. Consider personalized items or local delicacies.',
  'Vendors',
  4,
  3,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'low',
  10000,
  100000,
  ARRAY['Photo Booth & Souvenirs'],
  ARRAY[
    'Photo booth packages: hours, prints, props, digital copies',
    'Popular souvenirs: succulents, candles, local delicacies',
    'Order souvenirs 2-3 months ahead',
    'Consider personalized items with names/date',
    'Budget PHP 50-300 per guest for souvenirs'
  ],
  ARRAY[
    'Ordering souvenirs too late',
    'Over-spending on souvenirs',
    'Not testing sample first'
  ],
  230
),

-- Transportation
(
  'Book Transportation',
  'Arrange transportation for couple and entourage. Consider bridal car and shuttle service for guests if needed.',
  'Vendors',
  4,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'medium',
  10000,
  50000,
  ARRAY['Transport'],
  ARRAY[
    'Vintage cars popular for bridal car',
    'Consider shuttle for guests if venue is far',
    'Coordinate timing with church and reception',
    'Ask about waiting time charges',
    'Some coordinators can arrange this'
  ],
  ARRAY[
    'Not considering travel time between venues',
    'Forgetting about entourage transportation',
    'Not arranging parking at venues'
  ],
  240
);

-- ============================================================================
-- STATIONERY & PAPER GOODS (4-2 months before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  estimated_cost_min,
  estimated_cost_max,
  vendor_categories,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Invitations
(
  'Design & Order Invitations',
  'Design and order wedding invitations. Plan for 2-3 weeks printing time. Order 10-20% extra for keepsakes and last-minute guests.',
  'Stationery',
  4,
  3,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  5000,
  50000,
  ARRAY['Stationery'],
  ARRAY[
    'Order 10-20% more than guest count',
    'Include ceremony and reception details',
    'Traditional Filipino invitations mention principal sponsors',
    'Digital invitations becoming popular',
    'Printing takes 2-3 weeks',
    'Send invitations 6-8 weeks before wedding'
  ],
  ARRAY[
    'Not proofreading before printing',
    'Ordering exact guest count (no buffer)',
    'Sending invitations too late'
  ],
  250
),

-- Programs & Menus
(
  'Design Programs & Menus',
  'Design and print ceremony programs and reception menus. Consider bilingual format (English & Filipino).',
  'Stationery',
  2,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'low',
  3000,
  15000,
  ARRAY['Stationery'],
  ARRAY[
    'Ceremony program lists order of events',
    'Include principal sponsors names',
    'Consider bilingual (English/Tagalog)',
    'Menu cards optional but nice touch',
    'Can DIY to save costs'
  ],
  ARRAY[
    'Not proofreading names',
    'Forgetting to list all sponsors',
    'Printing too few copies'
  ],
  260
),

-- Signage
(
  'Create Wedding Signage',
  'Create welcome sign, seating chart, directional signs, and table numbers. Can be DIY or from stationery supplier.',
  'Stationery',
  2,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'low',
  2000,
  20000,
  ARRAY['Stationery'],
  ARRAY[
    'Welcome sign sets the tone',
    'Seating chart if assigned seating',
    'Table numbers essential for caterer',
    'Consider Instagram-worthy photo backdrop sign',
    'Many couples DIY this'
  ],
  ARRAY[
    'Forgetting about easels/stands for signs',
    'Making text too small to read',
    'Not weatherproofing for outdoor venues'
  ],
  270
);

-- ============================================================================
-- TRADITIONS & CULTURAL ELEMENTS (Catholic/Filipino-specific)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  task_name_tagalog,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_catholic_only,
  is_required,
  priority,
  estimated_cost_min,
  estimated_cost_max,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Principal Sponsors
(
  'Invite Principal Sponsors (Ninong/Ninang)',
  'Mag-imbita ng Ninong at Ninang',
  'Invite principal sponsors (ninong and ninang) to serve as witnesses and mentors. Traditionally 3-8 pairs for Catholic weddings.',
  'Traditions',
  6,
  4,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)'],
  FALSE,
  TRUE,
  'high',
  NULL,
  NULL,
  ARRAY[
    'Catholic tradition: usually 3-8 pairs of principal sponsors',
    'Choose married couples as role models',
    'Ask personally, not via text',
    'They sign marriage certificate as witnesses',
    'Traditionally, they give generous gifts',
    'Modern weddings sometimes skip this tradition'
  ],
  ARRAY[
    'Inviting too many (gets expensive for seating and meals)',
    'Not asking early enough',
    'Not clarifying expectations'
  ],
  280
),

-- Arrhae (Wedding Coins)
(
  'Purchase Arrhae (13 Wedding Coins)',
  'Bilhin ang Arrhae',
  'Purchase or prepare arrhae - 13 coins symbolizing prosperity. Traditional Catholic wedding element.',
  'Traditions',
  3,
  1,
  ARRAY['Catholic'],
  TRUE,
  FALSE,
  'low',
  500,
  5000,
  ARRAY[
    '13 coins represent Jesus and 12 apostles',
    'Symbol of prosperity and sharing',
    'Can be simple or ornate with container',
    'Coin sponsor carries it during ceremony',
    'Can be family heirloom or newly purchased'
  ],
  ARRAY[
    'Forgetting this Catholic tradition',
    'Not assigning a coin sponsor'
  ],
  290
),

-- Cord and Veil Sponsors
(
  'Invite Cord & Veil Sponsors',
  'Mag-imbita ng Cord at Veil Sponsors',
  'Invite cord and veil sponsors for Catholic ceremony. Typically 1 pair each to symbolize unity and protection.',
  'Traditions',
  4,
  2,
  ARRAY['Catholic'],
  TRUE,
  TRUE,
  'medium',
  NULL,
  NULL,
  ARRAY[
    'Cord symbolizes unity - figure-8 placement',
    'Veil symbolizes protection as one',
    'Usually 1 pair for cord, 1 pair for veil',
    'Choose married couples with strong marriages',
    'They place cord/veil during ceremony'
  ],
  ARRAY[
    'Forgetting to ask them',
    'Not providing the actual cord and veil items',
    'Not briefing them on ceremony flow'
  ],
  300
),

-- Candle Sponsors
(
  'Invite Candle Sponsors',
  'Mag-imbita ng Candle Sponsors',
  'Invite candle sponsors for Catholic ceremony to light unity candles.',
  'Traditions',
  4,
  2,
  ARRAY['Catholic'],
  TRUE,
  TRUE,
  'low',
  NULL,
  NULL,
  ARRAY[
    '2 sponsors light side candles',
    'Couple lights center candle together',
    'Symbolizes two families becoming one',
    'Purchase decorative unity candle set'
  ],
  ARRAY[
    'Forgetting to buy unity candles',
    'Not briefing sponsors on timing'
  ],
  310
);

-- ============================================================================
-- LOGISTICS & FINAL PREPARATIONS (2 months to 2 weeks before)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  tips,
  common_mistakes,
  sort_order
) VALUES

-- Guest List Finalization
(
  'Finalize Guest List',
  'Finalize your guest list and collect RSVPs. Typical Filipino weddings have 100-300 guests. Confirm final headcount with caterer.',
  'Logistics',
  2,
  4,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  ARRAY[
    'Average Filipino wedding: 100-300 guests',
    'Set RSVP deadline 2-3 weeks before wedding',
    'Follow up with non-responders',
    'Caterer needs final count 1-2 weeks before',
    'Budget PHP 1,500-5,000 per guest for full package',
    'Consider plus-ones policy'
  ],
  ARRAY[
    'Underestimating Filipino guest count',
    'Not following up on RSVPs',
    'Giving caterer count too late'
  ],
  320
),

-- Seating Arrangement
(
  'Create Seating Chart',
  'Create seating arrangement for reception. Consider family dynamics, age groups, and relationships.',
  'Logistics',
  1,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'medium',
  ARRAY[
    'Seat principal sponsors at VIP tables',
    'Group families together',
    'Consider friend groups',
    'Put mingling guests near each other',
    'Head table for couple + entourage or just couple',
    'Round tables seat 8-10, long tables 10-12'
  ],
  ARRAY[
    'Not considering family dynamics',
    'Seating incompatible people together',
    'Forgetting to number tables'
  ],
  330
),

-- Reception Timeline
(
  'Create Reception Timeline',
  'Work with coordinator to create detailed reception timeline including entrance, program, meals, games, and dancing.',
  'Logistics',
  1,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  ARRAY[
    'Typical flow: grand entrance, dinner, program, games, cake cutting, first dance',
    'Filipino receptions: 4-6 hours typical',
    'Plan for speeches from parents and sponsors',
    'Money dance is traditional (dollar dance)',
    'Coordinate with emcee, coordinator, band',
    'Build in buffer time - Filipino time is real!'
  ],
  ARRAY[
    'Packing program too tight',
    'Not accounting for delays',
    'Forgetting to brief speakers on time limits'
  ],
  340
),

-- Vendor Final Confirmations
(
  'Confirm All Vendor Details',
  'Reach out to all vendors 2 weeks before to confirm timing, deliverables, and contact persons for wedding day.',
  'Logistics',
  1,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'critical',
  ARRAY[
    'Confirm arrival times with each vendor',
    'Share day-of contact person (usually coordinator)',
    'Double-check deliverables',
    'Confirm venue access times',
    'Share final timeline with everyone',
    'Create vendor contact list'
  ],
  ARRAY[
    'Not confirming early enough',
    'Missing vendors in confirmation',
    'Not sharing timeline with vendors'
  ],
  350
),

-- Final Fittings
(
  'Complete Final Attire Fittings',
  'Complete final fittings for wedding attire 2-3 weeks before. Ensure everything fits perfectly and all alterations are done.',
  'Attire',
  1,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  ARRAY[
    'Do final fitting 2-3 weeks before',
    'Try on complete outfit with shoes and undergarments',
    'Check for comfort - sit, walk, dance in it',
    'Steam or press 1-2 days before wedding',
    'Have backup outfit plan'
  ],
  ARRAY[
    'Final fitting too close to wedding',
    'Not trying complete ensemble',
    'Forgetting accessories'
  ],
  360
),

-- Hair & Makeup Trial
(
  'Hair & Makeup Trial Session',
  'Complete trial session with hair and makeup artist. Take photos in different lighting to see how it looks.',
  'Attire',
  1,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'medium',
  ARRAY[
    'Do trial 1-2 months before wedding',
    'Bring inspiration photos',
    'Take photos in different lighting',
    'Consider longevity - makeup should last 8+ hours',
    'Test how it looks with your outfit'
  ],
  ARRAY[
    'Skipping trial session',
    'Not taking photos to remember the look',
    'Doing trial too close to wedding'
  ],
  370
),

-- Marriage License Pickup
(
  'Pick Up Marriage License',
  'Pick up marriage license from Local Civil Registrar after 10-day waiting period. Bring both IDs. License is valid for 120 days.',
  'Documents',
  1,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union'],
  TRUE,
  'critical',
  ARRAY[
    'Available 10 days after filing',
    'Both partners must be present',
    'Bring valid IDs',
    'Valid for 120 days only',
    'Officiant needs this for ceremony',
    'Bring to church for final coordination'
  ],
  ARRAY[
    'Forgetting to pick it up',
    'Only one partner going',
    'Letting it expire (120-day validity)'
  ],
  380
),

-- Church Final Coordination
(
  'Final Church Coordination',
  'Meet with church coordinator or priest for final wedding day coordination. Bring marriage license and review ceremony flow.',
  'Logistics',
  1,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim'],
  TRUE,
  'critical',
  ARRAY[
    'Schedule 1-2 weeks before wedding',
    'Bring marriage license',
    'Confirm ceremony start time',
    'Review processional order',
    'Ask about parking and photo restrictions',
    'Confirm music choices and choir'
  ],
  ARRAY[
    'Not scheduling this meeting',
    'Forgetting marriage license',
    'Not clarifying ceremony details'
  ],
  390
),

-- Payment Schedule Tracking
(
  'Track Vendor Payment Schedules',
  'Prepare final payments for all vendors. Most require final payment 1-2 weeks before or on wedding day.',
  'Logistics',
  1,
  2,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'critical',
  ARRAY[
    'Create payment tracker spreadsheet',
    'Most vendors: 50% deposit, 50% before wedding',
    'Prepare sealed envelopes per vendor',
    'Assign someone to handle day-of payments',
    'Keep receipts for all transactions'
  ],
  ARRAY[
    'Not tracking payment schedules',
    'Forgetting vendor''s payment on wedding day',
    'Not preparing envelopes in advance'
  ],
  400
),

-- Emergency Kit Preparation
(
  'Prepare Wedding Day Emergency Kit',
  'Prepare emergency kit with essentials: safety pins, stain remover, pain relievers, tissues, mints, makeup for touchups, phone chargers, etc.',
  'Logistics',
  1,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'low',
  ARRAY[
    'Include: safety pins, bobby pins, clear nail polish, stain remover',
    'Pain relievers, antacid, allergy meds',
    'Tissues, blotting paper, makeup for touchups',
    'Breath mints, gum',
    'Phone chargers and powerbank',
    'Sewing kit, scissors, tape',
    'Assign coordinator or bridesmaid to carry this'
  ],
  ARRAY[
    'Not preparing emergency kit',
    'Forgetting medication',
    'No one assigned to carry it'
  ],
  410
);

-- ============================================================================
-- WEEK-OF TASKS (final week)
-- ============================================================================

INSERT INTO kasa_task_templates (
  task_name,
  description,
  category,
  default_months_before,
  duration_weeks,
  ceremony_types,
  is_required,
  priority,
  tips,
  common_mistakes,
  sort_order
) VALUES

(
  'Break in Wedding Shoes',
  'Wear your wedding shoes around the house for a few hours each day to break them in. Comfort is key - you''ll be standing for hours.',
  'Attire',
  0, -- Week of wedding
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'medium',
  ARRAY[
    'Wear shoes around house for 30 min - 1 hour daily',
    'Use heel cushions if needed',
    'Consider bringing backup flats for reception',
    'Band-aids for potential blisters'
  ],
  ARRAY[
    'Wearing brand new shoes on wedding day',
    'Not having backup comfortable shoes'
  ],
  420
),

(
  'Get Manicure & Pedicure',
  'Schedule mani-pedi 1-2 days before wedding. Keep it simple and elegant - photos will be taken of hands during ring exchange.',
  'Attire',
  0,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  FALSE,
  'low',
  ARRAY[
    'Schedule 1-2 days before, not day-of',
    'Choose neutral elegant colors',
    'Hands will be photographed during ring exchange',
    'Consider hand moisturizer for days leading up'
  ],
  ARRAY[
    'Trying new nail art on wedding day',
    'Getting it done too early (chips)',
    'Choosing colors that clash with theme'
  ],
  430
),

(
  'Prepare Wedding Day Bags',
  'Pack bags for wedding day: outfit, accessories, toiletries, emergency kit, payments for vendors, marriage license, contact lists.',
  'Logistics',
  0,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  ARRAY[
    'Pack night before or 2 days before',
    'Include: marriage license, rings, payments, vendor contacts',
    'Wedding outfit and all accessories',
    'Phone chargers, makeup for touchups',
    'Snacks and water',
    'Assign someone to carry important documents'
  ],
  ARRAY[
    'Packing morning-of (stressful)',
    'Forgetting important documents',
    'Not having bag checklist'
  ],
  440
),

(
  'Get Enough Rest',
  'Prioritize sleep in the days leading to your wedding. Aim for 7-8 hours. Avoid staying up late for last-minute tasks.',
  'Logistics',
  0,
  1,
  ARRAY['Catholic', 'Church (INC)', 'Church (Other)', 'Muslim', 'Civil', 'Civil Union', 'Other'],
  TRUE,
  'high',
  ARRAY[
    'Sleep early for 3 nights before wedding',
    'Delegate last-minute tasks',
    'Avoid alcohol night before',
    'Drink plenty of water',
    'Avoid salty foods to prevent bloating',
    'Trust that everything will work out!'
  ],
  ARRAY[
    'Staying up late for DIY projects',
    'Stressing over small details',
    'Not delegating tasks'
  ],
  450
);

COMMIT;
