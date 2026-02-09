import type { ChecklistItem } from '../types';

export const defaultChecklist: ChecklistItem[] = [
  // 12+ MONTHS
  {
    id: 'c001',
    title: 'Set your celebration date',
    category: 'Planning',
    timeframe: '12+ months',
    isCompleted: false,
  },
  {
    id: 'c002',
    title: 'Determine your budget and discuss contributions',
    category: 'Budget',
    timeframe: '12+ months',
    isCompleted: false,
  },
  {
    id: 'c003',
    title: 'Choose ceremony type (Catholic/Civil/Muslim/Other)',
    category: 'Ceremony',
    timeframe: '12+ months',
    isCompleted: false,
  },
  {
    id: 'c004',
    title: 'Book your ceremony venue',
    category: 'Venue',
    timeframe: '12+ months',
    isCompleted: false,
  },
  {
    id: 'c005',
    title: 'Book your reception venue',
    category: 'Venue',
    timeframe: '12+ months',
    isCompleted: false,
  },
  {
    id: 'c006',
    title: 'Create preliminary guest list',
    category: 'Guests',
    timeframe: '12+ months',
    isCompleted: false,
  },
  {
    id: 'c007',
    title: 'Start your ninong/ninang (principal sponsors) list',
    category: 'Entourage',
    timeframe: '12+ months',
    isCompleted: false,
  },

  // 9-12 MONTHS
  {
    id: 'c008',
    title: 'Book photographer and videographer',
    category: 'Vendors',
    timeframe: '9-12 months',
    isCompleted: false,
  },
  {
    id: 'c009',
    title: 'Book wedding coordinator',
    category: 'Vendors',
    timeframe: '9-12 months',
    isCompleted: false,
  },
  {
    id: 'c010',
    title: 'Book caterer and finalize menu',
    category: 'Vendors',
    timeframe: '9-12 months',
    isCompleted: false,
  },
  {
    id: 'c011',
    title: 'Choose and invite wedding party (maid of honor, best man, etc.)',
    category: 'Entourage',
    timeframe: '9-12 months',
    isCompleted: false,
  },
  {
    id: 'c012',
    title: 'Book flowers and styling services',
    category: 'Vendors',
    timeframe: '9-12 months',
    isCompleted: false,
  },
  {
    id: 'c013',
    title: 'Apply for CENOMAR from PSA',
    category: 'Documents',
    timeframe: '9-12 months',
    isCompleted: false,
    notes: 'Certificate of No Marriage (CENOMAR) - required for marriage license',
  },

  // 6-9 MONTHS
  {
    id: 'c014',
    title: 'Attend Pre-Cana seminar (if Catholic wedding)',
    category: 'Ceremony',
    timeframe: '6-9 months',
    isCompleted: false,
    notes: 'Required by Catholic churches - book early as schedules fill up',
  },
  {
    id: 'c015',
    title: 'Book hair and makeup artist',
    category: 'Vendors',
    timeframe: '6-9 months',
    isCompleted: false,
  },
  {
    id: 'c016',
    title: 'Book lights and sound provider',
    category: 'Vendors',
    timeframe: '6-9 months',
    isCompleted: false,
  },
  {
    id: 'c017',
    title: 'Order celebration attire (gowns, barong, suits)',
    category: 'Attire',
    timeframe: '6-9 months',
    isCompleted: false,
    notes: 'Allow time for fittings and alterations',
  },
  {
    id: 'c018',
    title: 'Finalize ninong/ninang confirmations',
    category: 'Entourage',
    timeframe: '6-9 months',
    isCompleted: false,
  },
  {
    id: 'c019',
    title: 'Research and order invitations',
    category: 'Stationery',
    timeframe: '6-9 months',
    isCompleted: false,
  },

  // 3-6 MONTHS
  {
    id: 'c020',
    title: 'Send save-the-dates (if applicable)',
    category: 'Stationery',
    timeframe: '3-6 months',
    isCompleted: false,
  },
  {
    id: 'c021',
    title: 'Finalize guest list',
    category: 'Guests',
    timeframe: '3-6 months',
    isCompleted: false,
  },
  {
    id: 'c022',
    title: 'Send formal invitations',
    category: 'Stationery',
    timeframe: '3-6 months',
    isCompleted: false,
    notes: 'Send 2-3 months before the celebration',
  },
  {
    id: 'c023',
    title: 'Order wedding rings',
    category: 'Ceremony',
    timeframe: '3-6 months',
    isCompleted: false,
  },
  {
    id: 'c024',
    title: 'Order arrhae (wedding coins)',
    category: 'Ceremony',
    timeframe: '3-6 months',
    isCompleted: false,
    notes: 'For Catholic and some Christian ceremonies',
  },
  {
    id: 'c025',
    title: 'Book transportation for celebration day',
    category: 'Logistics',
    timeframe: '3-6 months',
    isCompleted: false,
  },
  {
    id: 'c026',
    title: 'Schedule first attire fitting',
    category: 'Attire',
    timeframe: '3-6 months',
    isCompleted: false,
  },

  // 1-3 MONTHS
  {
    id: 'c027',
    title: 'Apply for marriage license at city hall',
    category: 'Documents',
    timeframe: '1-3 months',
    isCompleted: false,
    notes: 'Valid for 120 days from issuance. Bring CENOMAR, birth certificates, and valid IDs.',
  },
  {
    id: 'c028',
    title: 'Confirm all vendor bookings and payments',
    category: 'Vendors',
    timeframe: '1-3 months',
    isCompleted: false,
  },
  {
    id: 'c029',
    title: 'Finalize ceremony and reception timeline',
    category: 'Planning',
    timeframe: '1-3 months',
    isCompleted: false,
  },
  {
    id: 'c030',
    title: 'Attend ceremony rehearsal',
    category: 'Ceremony',
    timeframe: '1-3 months',
    isCompleted: false,
  },
  {
    id: 'c031',
    title: 'Final attire fittings',
    category: 'Attire',
    timeframe: '1-3 months',
    isCompleted: false,
  },
  {
    id: 'c032',
    title: 'Create seating chart',
    category: 'Reception',
    timeframe: '1-3 months',
    isCompleted: false,
  },

  // 1 MONTH
  {
    id: 'c033',
    title: 'Confirm final guest count with caterer',
    category: 'Catering',
    timeframe: '1 month',
    isCompleted: false,
  },
  {
    id: 'c034',
    title: 'Submit final payments to all vendors',
    category: 'Budget',
    timeframe: '1 month',
    isCompleted: false,
  },
  {
    id: 'c035',
    title: 'Confirm ceremony details with officiant',
    category: 'Ceremony',
    timeframe: '1 month',
    isCompleted: false,
  },
  {
    id: 'c036',
    title: 'Prepare celebration day emergency kit',
    category: 'Logistics',
    timeframe: '1 month',
    isCompleted: false,
    notes: 'Safety pins, tissue, stain remover, phone chargers, band-aids, pain relievers',
  },
  {
    id: 'c037',
    title: 'Get marriage license from city hall',
    category: 'Documents',
    timeframe: '1 month',
    isCompleted: false,
    notes: 'After 10-day waiting period',
  },

  // 1 WEEK
  {
    id: 'c038',
    title: 'Confirm timeline with coordinator and all vendors',
    category: 'Planning',
    timeframe: '1 week',
    isCompleted: false,
  },
  {
    id: 'c039',
    title: 'Pack for honeymoon (if applicable)',
    category: 'Honeymoon',
    timeframe: '1 week',
    isCompleted: false,
  },
  {
    id: 'c040',
    title: 'Confirm transportation pickup times',
    category: 'Logistics',
    timeframe: '1 week',
    isCompleted: false,
  },
  {
    id: 'c041',
    title: 'Prepare supplier payments and tips',
    category: 'Budget',
    timeframe: '1 week',
    isCompleted: false,
  },
  {
    id: 'c042',
    title: 'Breathe. You\'re ready!',
    category: 'Self-Care',
    timeframe: '1 week',
    isCompleted: false,
    notes: 'Take time to rest and enjoy the journey. The planning is done - now celebrate!',
  },
];

export const getChecklistByTimeframe = (timeframe: string): ChecklistItem[] => {
  return defaultChecklist.filter(item => item.timeframe === timeframe);
};

export const getChecklistByCategory = (category: string): ChecklistItem[] => {
  return defaultChecklist.filter(item => item.category === category);
};
