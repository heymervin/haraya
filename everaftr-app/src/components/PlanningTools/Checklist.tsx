import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

type CeremonyType = 'all' | 'catholic' | 'civil' | 'muslim' | 'other';
type Timeframe = '12+' | '9-12' | '6-9' | '3-6' | '1-3' | 'final';

interface ChecklistItem {
  id: string;
  title: string;
  timeframe: string;
  category: string;
  ceremonyTypes: CeremonyType[];
  completed: boolean;
  notes?: string;
  notesExpanded?: boolean;
}

const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  // 12+ Months Before
  {
    id: '1',
    title: 'Set your celebration date and budget',
    timeframe: '12+',
    category: 'Planning Basics',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '2',
    title: 'Choose ceremony type and start venue research',
    timeframe: '12+',
    category: 'Planning Basics',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '3',
    title: 'Apply for CENOMAR at PSA (valid 6 months)',
    timeframe: '6-9',
    category: 'Legal Requirements',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '4',
    title: 'Book church and confirm canonical requirements',
    timeframe: '12+',
    category: 'Ceremony',
    ceremonyTypes: ['catholic'],
    completed: false,
  },
  {
    id: '5',
    title: 'Register for Pre-Cana seminar',
    timeframe: '12+',
    category: 'Ceremony',
    ceremonyTypes: ['catholic'],
    completed: false,
  },
  {
    id: '6',
    title: 'Book imam and mosque',
    timeframe: '12+',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '45',
    title: 'Coordinate with wali (guardian) for the nikah',
    timeframe: '12+',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '7',
    title: 'Draft ninong/ninang (principal sponsors) list',
    timeframe: '12+',
    category: 'Entourage',
    ceremonyTypes: ['catholic', 'civil', 'other'],
    completed: false,
  },
  {
    id: '8',
    title: 'Book reception venue',
    timeframe: '12+',
    category: 'Venue',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '9',
    title: 'Hire your coordinator',
    timeframe: '12+',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '10',
    title: 'Book photographer and videographer',
    timeframe: '12+',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '11',
    title: 'Book caterer',
    timeframe: '12+',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  // 9-12 Months Before
  {
    id: '12',
    title: 'Attend Pre-Cana seminar',
    timeframe: '9-12',
    category: 'Ceremony',
    ceremonyTypes: ['catholic'],
    completed: false,
  },
  {
    id: '13',
    title: 'Agree on mahr (obligatory gift from groom to bride)',
    timeframe: '9-12',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '46',
    title: 'Discuss and finalize mahr details with both families',
    timeframe: '9-12',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '47',
    title: 'Arrange henna ceremony (Pag-Paalam)',
    timeframe: '9-12',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '14',
    title: 'Book florist and stylist',
    timeframe: '9-12',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '15',
    title: 'Book hair and makeup artist',
    timeframe: '9-12',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '16',
    title: 'Book lights and sound provider',
    timeframe: '9-12',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '17',
    title: 'Start shopping for celebration attire',
    timeframe: '9-12',
    category: 'Attire',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '18',
    title: 'Create guest list draft',
    timeframe: '9-12',
    category: 'Guest Management',
    ceremonyTypes: ['all'],
    completed: false,
  },
  // 6-9 Months Before
  {
    id: '19',
    title: 'Finalize guest list',
    timeframe: '6-9',
    category: 'Guest Management',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '20',
    title: 'Order invitations',
    timeframe: '6-9',
    category: 'Stationery',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '21',
    title: 'Book transportation for celebration day',
    timeframe: '6-9',
    category: 'Logistics',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '22',
    title: 'Order rings',
    timeframe: '6-9',
    category: 'Attire',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '23',
    title: 'Order arrhae (wedding coins)',
    timeframe: '6-9',
    category: 'Ceremony',
    ceremonyTypes: ['catholic'],
    completed: false,
  },
  {
    id: '24',
    title: 'Book lechon supplier',
    timeframe: '6-9',
    category: 'Catering',
    ceremonyTypes: ['catholic', 'civil', 'other'],
    completed: false,
  },
  {
    id: '25',
    title: 'Arrange cultural entertainment (e.g., Pangalay, Singkil, or kulintang ensemble)',
    timeframe: '6-9',
    category: 'Entertainment',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '48',
    title: 'Prepare Islamic marriage contract (Sadak)',
    timeframe: '6-9',
    category: 'Legal Requirements',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '49',
    title: 'Confirm halal catering and menu',
    timeframe: '6-9',
    category: 'Catering',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  // 3-6 Months Before
  {
    id: '26',
    title: 'Apply for marriage license at Local Civil Registrar (valid 120 days)',
    timeframe: '1-3',
    category: 'Legal Requirements',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '27',
    title: 'Confirm veil, cord, and candle sponsors',
    timeframe: '3-6',
    category: 'Ceremony',
    ceremonyTypes: ['catholic'],
    completed: false,
  },
  {
    id: '28',
    title: 'Send out invitations',
    timeframe: '3-6',
    category: 'Guest Management',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '29',
    title: 'Set up Viber group for entourage',
    timeframe: '3-6',
    category: 'Entourage',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '30',
    title: 'Schedule fittings for celebration attire',
    timeframe: '3-6',
    category: 'Attire',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '31',
    title: 'Plan Kalilang program',
    timeframe: '3-6',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '50',
    title: 'Plan the Saf-Saf (bridal procession)',
    timeframe: '3-6',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '51',
    title: 'Coordinate separate seating arrangements if needed',
    timeframe: '3-6',
    category: 'Logistics',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  {
    id: '32',
    title: 'Finalize menu with caterer',
    timeframe: '3-6',
    category: 'Catering',
    ceremonyTypes: ['all'],
    completed: false,
  },
  // 1-3 Months Before
  {
    id: '33',
    title: 'Finalize ceremony details with ceremony venue',
    timeframe: '1-3',
    category: 'Ceremony',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '34',
    title: 'Confirm all vendor bookings',
    timeframe: '1-3',
    category: 'Vendors',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '35',
    title: 'Have final dress/attire fitting',
    timeframe: '1-3',
    category: 'Attire',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '36',
    title: 'Prepare your vows',
    timeframe: '1-3',
    category: 'Ceremony',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '37',
    title: 'Track RSVPs',
    timeframe: '1-3',
    category: 'Guest Management',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '38',
    title: 'Create seating chart',
    timeframe: '1-3',
    category: 'Reception',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '52',
    title: 'Prepare mahr items for ceremonial presentation',
    timeframe: '1-3',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
  // Final Month
  {
    id: '39',
    title: 'Confirm final headcount with caterer',
    timeframe: 'final',
    category: 'Catering',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '40',
    title: 'Prepare payments for vendors',
    timeframe: 'final',
    category: 'Budget',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '41',
    title: 'Pick up marriage license after 10-day posting period',
    timeframe: '1-3',
    category: 'Legal Requirements',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '42',
    title: 'Attend final rehearsal',
    timeframe: 'final',
    category: 'Ceremony',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '43',
    title: 'Pack emergency kit for celebration day',
    timeframe: 'final',
    category: 'Preparation',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '44',
    title: 'Confirm day-of timeline with coordinator',
    timeframe: 'final',
    category: 'Logistics',
    ceremonyTypes: ['all'],
    completed: false,
  },
  {
    id: '53',
    title: 'Prepare for Ijab-Qabul (marriage proposal and acceptance)',
    timeframe: 'final',
    category: 'Ceremony',
    ceremonyTypes: ['muslim'],
    completed: false,
  },
];

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  '12+': '12+ Months Before',
  '9-12': '9-12 Months Before',
  '6-9': '6-9 Months Before',
  '3-6': '3-6 Months Before',
  '1-3': '1-3 Months Before',
  'final': 'Final Month',
};

const TIMEFRAME_ORDER: Timeframe[] = ['12+', '9-12', '6-9', '3-6', '1-3', 'final'];

const Checklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [ceremonyFilter, setCeremonyFilter] = useState<CeremonyType>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState<Set<Timeframe>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('haraya-checklist');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems(INITIAL_CHECKLIST_ITEMS);
      }
    } else {
      setItems(INITIAL_CHECKLIST_ITEMS);
    }

    // Check if ceremony type has been set
    const savedCeremonyType = localStorage.getItem('haraya-ceremony-type');
    if (savedCeremonyType) {
      setCeremonyFilter(savedCeremonyType as CeremonyType);
    } else {
      // Show onboarding if no ceremony type is saved
      setShowOnboarding(true);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('haraya-checklist', JSON.stringify(items));
    }
  }, [items]);

  // Save ceremony filter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('haraya-ceremony-type', ceremonyFilter);
  }, [ceremonyFilter]);

  const selectCeremonyType = (type: CeremonyType) => {
    setCeremonyFilter(type);
    setShowOnboarding(false);
  };

  const toggleComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleNotesExpanded = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, notesExpanded: !item.notesExpanded }
          : item
      )
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const toggleSection = (timeframe: Timeframe) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(timeframe)) {
        newSet.delete(timeframe);
      } else {
        newSet.add(timeframe);
      }
      return newSet;
    });
  };

  // Filter items by ceremony type and completion status
  const filteredItems = items.filter((item) => {
    const ceremonyMatch =
      ceremonyFilter === 'all' ||
      item.ceremonyTypes.includes(ceremonyFilter) ||
      item.ceremonyTypes.includes('all');
    const completedMatch = showCompleted || !item.completed;
    return ceremonyMatch && completedMatch;
  });

  // Group filtered items by timeframe
  const groupedItems = TIMEFRAME_ORDER.reduce((acc, timeframe) => {
    acc[timeframe] = filteredItems.filter(item => item.timeframe === timeframe);
    return acc;
  }, {} as Record<Timeframe, ChecklistItem[]>);

  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="max-w-4xl">
      {/* Ceremony Type Onboarding */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-primary border border-border rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-serif font-light text-text-primary mb-3 text-center">
              What type of celebration are you planning?
            </h2>
            <p className="text-text-secondary text-center mb-6">
              We'll show you only the tasks that matter for your celebration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'catholic' as CeremonyType, label: 'Catholic Church Ceremony' },
                { value: 'civil' as CeremonyType, label: 'Civil Ceremony' },
                { value: 'muslim' as CeremonyType, label: 'Muslim Nikah' },
                { value: 'other' as CeremonyType, label: 'Other / Not Sure Yet' },
                { value: 'all' as CeremonyType, label: 'Show me everything' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectCeremonyType(option.value)}
                  className="p-4 border-2 border-border rounded-lg hover:border-twilight-blue hover:bg-twilight-blue/5 transition-all text-text-primary font-medium text-center"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-bg-primary border border-border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-text-primary">
            Your Progress
          </h3>
          <span className="text-sm text-text-secondary">
            {completedCount} of {totalCount} tasks completed
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercentage}%`,
              background: 'linear-gradient(90deg, #5B7C99, #F4C688)',
            }}
          ></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-bg-primary border border-border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ceremony Type Filter - Dropdown */}
          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
              Ceremony Type
            </label>
            <select
              value={ceremonyFilter}
              onChange={(e) => setCeremonyFilter(e.target.value as CeremonyType)}
              className="w-full px-4 py-2.5 text-sm border border-border rounded bg-bg-primary text-text-primary focus:border-twilight-blue focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A4F45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem',
                paddingRight: '2.5rem',
              }}
            >
              <option value="all">All Celebrations</option>
              <option value="catholic">Catholic</option>
              <option value="civil">Civil</option>
              <option value="muslim">Muslim</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Show Completed Toggle */}
          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
              Display Options
            </label>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`w-full px-4 py-2.5 text-sm rounded border transition-colors text-left ${
                showCompleted
                  ? 'border-twilight-blue bg-twilight-blue/10 text-twilight-blue'
                  : 'border-border text-text-secondary hover:border-text-primary'
              }`}
            >
              <Check className={`inline-block w-4 h-4 mr-2 ${showCompleted ? 'opacity-100' : 'opacity-0'}`} />
              Show Completed Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Items - Grouped by Timeframe */}
      <div className="space-y-4">
        {TIMEFRAME_ORDER.map((timeframe) => {
          const sectionItems = groupedItems[timeframe];
          if (sectionItems.length === 0) return null;

          const sectionCompleted = sectionItems.filter(item => item.completed).length;
          const sectionTotal = sectionItems.length;
          const isCollapsed = collapsedSections.has(timeframe);

          return (
            <div key={timeframe} className="bg-bg-primary border border-border rounded-lg overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(timeframe)}
                className="w-full px-6 py-4 flex items-center justify-between bg-whisper/30 hover:bg-whisper/50 transition-colors sticky top-16 z-10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    className={`w-5 h-5 text-text-secondary transition-transform ${
                      isCollapsed ? '' : 'rotate-90'
                    }`}
                  />
                  <h3 className="text-base font-medium text-text-primary">
                    {TIMEFRAME_LABELS[timeframe]}
                  </h3>
                  <span className="text-sm text-text-secondary">
                    {sectionCompleted}/{sectionTotal} done
                  </span>
                </div>
                <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-twilight-blue rounded-full transition-all"
                    style={{ width: `${(sectionCompleted / sectionTotal) * 100}%` }}
                  ></div>
                </div>
              </button>

              {/* Section Items */}
              {!isCollapsed && (
                <div className="p-4 space-y-3">
                  {sectionItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-border rounded-lg p-4 transition-shadow hover:shadow-md bg-bg-primary"
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox with increased touch target */}
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className="flex-shrink-0 w-12 h-12 flex items-center justify-center -ml-3"
                        >
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              item.completed
                                ? 'bg-twilight-blue border-twilight-blue'
                                : 'border-border hover:border-twilight-blue'
                            }`}
                          >
                            {item.completed && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </button>

                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h4
                            className={`text-base font-normal mb-2 transition-all ${
                              item.completed
                                ? 'line-through text-text-secondary'
                                : 'text-text-primary'
                            }`}
                          >
                            {item.title}
                          </h4>

                          {/* Category Badge */}
                          <div className="mb-3">
                            <span className="inline-block px-2 py-1 text-xs rounded bg-whisper text-text-secondary">
                              {item.category}
                            </span>
                          </div>

                          {/* Notes Section */}
                          <button
                            onClick={() => toggleNotesExpanded(item.id)}
                            className="w-full flex items-center justify-between py-2.5 text-sm text-twilight-blue hover:underline mb-2"
                          >
                            <span className="flex items-center gap-1">
                              {item.notesExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                              {item.notes ? 'View notes' : 'Add notes'}
                            </span>
                          </button>

                          {item.notesExpanded && (
                            <textarea
                              value={item.notes || ''}
                              onChange={(e) => updateNotes(item.id, e.target.value)}
                              placeholder="Add notes here..."
                              className="w-full px-3 py-2 border border-border rounded text-sm text-text-primary bg-bg-primary focus:border-twilight-blue focus:outline-none resize-none"
                              rows={3}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="bg-bg-primary border border-border rounded-lg p-8 text-center">
            <p className="text-text-secondary">
              No tasks match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checklist;
