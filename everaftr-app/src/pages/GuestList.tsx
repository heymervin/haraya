import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  UserX,
  Plus,
  Search,
  Trash2,
  Pencil,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Hash,
  UtensilsCrossed,
  UserPlus,
} from 'lucide-react';

// ─── Types ───

type GuestSide = 'You' | 'Your Partner' | 'Shared';
type RSVPStatus = 'Attending' | 'Not Attending' | 'Pending';
type DietaryOption = 'Halal' | 'Vegetarian' | 'Vegan' | 'Allergies' | 'None';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  side: GuestSide;
  rsvpStatus: RSVPStatus;
  dietaryRestrictions: DietaryOption[];
  tableNumber: number | null;
  plusOne: boolean;
  notes: string;
}

type SortField = 'name' | 'side' | 'rsvpStatus' | 'tableNumber';
type SortDirection = 'asc' | 'desc';

// ─── Constants ───

const STORAGE_KEY = 'haraya-guestlist';
const SIDE_OPTIONS: GuestSide[] = ['You', 'Your Partner', 'Shared'];
const RSVP_OPTIONS: RSVPStatus[] = ['Attending', 'Not Attending', 'Pending'];
const DIETARY_OPTIONS: DietaryOption[] = ['Halal', 'Vegetarian', 'Vegan', 'Allergies', 'None'];

const EMPTY_GUEST: Omit<Guest, 'id'> = {
  name: '',
  email: '',
  phone: '',
  side: 'Shared',
  rsvpStatus: 'Pending',
  dietaryRestrictions: [],
  tableNumber: null,
  plusOne: false,
  notes: '',
};

// ─── Helpers ───

function getRsvpBadgeClasses(status: RSVPStatus): string {
  switch (status) {
    case 'Attending':
      return 'bg-accent-success/15 text-accent-success';
    case 'Not Attending':
      return 'bg-accent-error/15 text-accent-error';
    case 'Pending':
      return 'bg-accent-warning/15 text-accent-warning';
  }
}

function getSideBadgeClasses(side: GuestSide): string {
  switch (side) {
    case 'You':
      return 'bg-morning-mist/15 text-morning-mist';
    case 'Your Partner':
      return 'bg-twilight-blue/15 text-twilight-blue';
    case 'Shared':
      return 'bg-golden-hour/15 text-golden-hour';
  }
}

// ─── Component ───

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Guest, 'id'>>(EMPTY_GUEST);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRsvp, setFilterRsvp] = useState<RSVPStatus | 'All'>('All');
  const [filterSide, setFilterSide] = useState<GuestSide | 'All'>('All');
  const [filterTable, setFilterTable] = useState<string>('');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  // ─── Persistence ───

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setGuests(JSON.parse(stored));
      } catch {
        // Corrupt data — start fresh
      }
    }
  }, []);

  useEffect(() => {
    if (guests.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [guests]);

  // ─── Stats ───

  const stats = useMemo(() => {
    const plusOneCount = guests.filter((g) => g.plusOne).length;
    return {
      total: guests.length + plusOneCount,
      attending: guests.filter((g) => g.rsvpStatus === 'Attending').length +
        guests.filter((g) => g.rsvpStatus === 'Attending' && g.plusOne).length,
      pending: guests.filter((g) => g.rsvpStatus === 'Pending').length +
        guests.filter((g) => g.rsvpStatus === 'Pending' && g.plusOne).length,
      declined: guests.filter((g) => g.rsvpStatus === 'Not Attending').length +
        guests.filter((g) => g.rsvpStatus === 'Not Attending' && g.plusOne).length,
    };
  }, [guests]);

  // ─── Filtering & Sorting ───

  const filteredAndSortedGuests = useMemo(() => {
    let result = [...guests];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.email.toLowerCase().includes(q) ||
          g.phone.includes(q)
      );
    }

    // RSVP filter
    if (filterRsvp !== 'All') {
      result = result.filter((g) => g.rsvpStatus === filterRsvp);
    }

    // Side filter
    if (filterSide !== 'All') {
      result = result.filter((g) => g.side === filterSide);
    }

    // Table filter
    if (filterTable) {
      const tableNum = parseInt(filterTable, 10);
      if (!isNaN(tableNum)) {
        result = result.filter((g) => g.tableNumber === tableNum);
      }
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'side':
          cmp = a.side.localeCompare(b.side);
          break;
        case 'rsvpStatus': {
          const order: Record<RSVPStatus, number> = { Attending: 0, Pending: 1, 'Not Attending': 2 };
          cmp = order[a.rsvpStatus] - order[b.rsvpStatus];
          break;
        }
        case 'tableNumber':
          cmp = (a.tableNumber ?? 999) - (b.tableNumber ?? 999);
          break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [guests, searchQuery, filterRsvp, filterSide, filterTable, sortField, sortDirection]);

  // ─── Unique table numbers for filter ───

  const tableNumbers = useMemo(() => {
    const nums = new Set<number>();
    guests.forEach((g) => {
      if (g.tableNumber !== null) nums.add(g.tableNumber);
    });
    return Array.from(nums).sort((a, b) => a - b);
  }, [guests]);

  // ─── Handlers ───

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_GUEST });
    setShowForm(true);
  };

  const openEditForm = (guest: Guest) => {
    setEditingId(guest.id);
    setFormData({
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
      side: guest.side,
      rsvpStatus: guest.rsvpStatus,
      dietaryRestrictions: [...guest.dietaryRestrictions],
      tableNumber: guest.tableNumber,
      plusOne: guest.plusOne,
      notes: guest.notes,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ ...EMPTY_GUEST });
  };

  const saveGuest = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      setGuests((prev) =>
        prev.map((g) => (g.id === editingId ? { ...formData, id: editingId } : g))
      );
    } else {
      const newGuest: Guest = {
        ...formData,
        id: `guest-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      setGuests((prev) => [...prev, newGuest]);
    }
    closeForm();
  };

  const deleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleDietary = (option: DietaryOption) => {
    setFormData((prev) => {
      if (option === 'None') {
        return { ...prev, dietaryRestrictions: prev.dietaryRestrictions.includes('None') ? [] : ['None'] };
      }
      const without = prev.dietaryRestrictions.filter((d) => d !== 'None');
      if (without.includes(option)) {
        return { ...prev, dietaryRestrictions: without.filter((d) => d !== option) };
      }
      return { ...prev, dietaryRestrictions: [...without, option] };
    });
  };

  // ─── Selection ───

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAndSortedGuests.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedGuests.map((g) => g.id)));
    }
  };

  const bulkSetRsvp = useCallback(
    (status: RSVPStatus) => {
      setGuests((prev) =>
        prev.map((g) => (selectedIds.has(g.id) ? { ...g, rsvpStatus: status } : g))
      );
      setSelectedIds(new Set());
      setShowBulkActions(false);
    },
    [selectedIds]
  );

  const bulkAssignTable = useCallback(
    (tableNumber: number) => {
      setGuests((prev) =>
        prev.map((g) => (selectedIds.has(g.id) ? { ...g, tableNumber } : g))
      );
      setSelectedIds(new Set());
      setShowBulkActions(false);
    },
    [selectedIds]
  );

  // ─── Sort indicator helper ───

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  // ─── Render ───

  return (
    <div className="min-h-screen bg-bg-primary pattern-hablon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-text-primary mb-3">
            Guest List
          </h1>
          <p className="text-lg text-text-secondary font-light">
            Manage your guests, track RSVPs, and assign seating
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-bg-primary border border-border rounded-lg p-4 md:p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-morning-mist/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-morning-mist" />
              </div>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Total
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-text-primary mt-1">
              {stats.total}
            </div>
          </div>

          <div className="bg-bg-primary border border-border rounded-lg p-4 md:p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-accent-success/10 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-accent-success" />
              </div>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Attending
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-accent-success mt-1">
              {stats.attending}
            </div>
          </div>

          <div className="bg-bg-primary border border-border rounded-lg p-4 md:p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-accent-warning/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent-warning" />
              </div>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Pending
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-accent-warning mt-1">
              {stats.pending}
            </div>
          </div>

          <div className="bg-bg-primary border border-border rounded-lg p-4 md:p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-accent-error/10 flex items-center justify-center">
                <UserX className="w-4 h-4 text-accent-error" />
              </div>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Declined
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-accent-error mt-1">
              {stats.declined}
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filters, Add */}
        <div className="bg-bg-primary border border-border rounded-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Row 1: Search + Add */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guests..."
                  className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none"
                />
              </div>
              <button
                onClick={openAddForm}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-dream-lavender text-white rounded-lg hover:bg-dream-lavender/90 transition-colors font-medium text-sm min-h-[48px]"
              >
                <Plus className="w-4 h-4" />
                Add Guest
              </button>
            </div>

            {/* Row 2: Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={filterRsvp}
                onChange={(e) => setFilterRsvp(e.target.value as RSVPStatus | 'All')}
                className="px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A4F45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1rem',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="All">All RSVP Status</option>
                {RSVP_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={filterSide}
                onChange={(e) => setFilterSide(e.target.value as GuestSide | 'All')}
                className="px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A4F45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1rem',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="All">All Sides</option>
                {SIDE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={filterTable}
                onChange={(e) => setFilterTable(e.target.value)}
                className="px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A4F45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1rem',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="">All Tables</option>
                {tableNumbers.map((n) => (
                  <option key={n} value={n}>
                    Table {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <div className="bg-dream-lavender/10 border border-dream-lavender/30 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-sm font-medium text-dream-lavender">
              {selectedIds.size} guest{selectedIds.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="px-4 py-2 text-sm border border-dream-lavender text-dream-lavender rounded-lg hover:bg-dream-lavender/10 transition-colors min-h-[40px]"
              >
                Bulk Actions
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-4 py-2 text-sm border border-border text-text-secondary rounded-lg hover:border-text-primary transition-colors min-h-[40px]"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Bulk Actions Dropdown */}
        {showBulkActions && selectedIds.size > 0 && (
          <div className="bg-bg-primary border border-border rounded-lg p-4 md:p-6 mb-6 space-y-4">
            <h3 className="text-sm font-medium text-text-primary">Bulk Actions</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">
                  Set RSVP Status
                </p>
                <div className="flex flex-wrap gap-2">
                  {RSVP_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => bulkSetRsvp(status)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors min-h-[40px] ${getRsvpBadgeClasses(status)} border-current/20 hover:opacity-80`}
                    >
                      Mark as {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">
                  Assign Table Number
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    placeholder="Table #"
                    className="w-24 px-3 py-2 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none min-h-[40px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = parseInt((e.target as HTMLInputElement).value, 10);
                        if (!isNaN(val) && val > 0) bulkAssignTable(val);
                      }
                    }}
                    id="bulk-table-input"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('bulk-table-input') as HTMLInputElement;
                      const val = parseInt(input.value, 10);
                      if (!isNaN(val) && val > 0) bulkAssignTable(val);
                    }}
                    className="px-4 py-2 text-sm bg-twilight-blue text-white rounded-lg hover:bg-twilight-blue/90 transition-colors min-h-[40px]"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add / Edit Form */}
        {showForm && (
          <div className="bg-bg-primary border border-dream-lavender/30 rounded-lg p-4 md:p-6 mb-6 fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif font-light text-text-primary">
                {editingId ? 'Edit Guest' : 'Add New Guest'}
              </h3>
              <button
                onClick={closeForm}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-border/50 transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Guest name"
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none min-h-[48px]"
                  autoFocus
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none min-h-[48px]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none min-h-[48px]"
                />
              </div>

              {/* Side */}
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Side
                </label>
                <select
                  value={formData.side}
                  onChange={(e) => setFormData((p) => ({ ...p, side: e.target.value as GuestSide }))}
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-hablon-green focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A4F45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1rem',
                    paddingRight: '2.5rem',
                  }}
                >
                  {SIDE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* RSVP Status */}
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  RSVP Status
                </label>
                <select
                  value={formData.rsvpStatus}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, rsvpStatus: e.target.value as RSVPStatus }))
                  }
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-hablon-green focus:outline-none appearance-none cursor-pointer min-h-[48px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A4F45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1rem',
                    paddingRight: '2.5rem',
                  }}
                >
                  {RSVP_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table Number */}
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Table Number
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.tableNumber ?? ''}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      tableNumber: e.target.value ? parseInt(e.target.value, 10) : null,
                    }))
                  }
                  placeholder="Unassigned"
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none min-h-[48px]"
                />
              </div>

              {/* Plus One */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, plusOne: !p.plusOne }))}
                  className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-colors min-h-[48px] w-full ${
                    formData.plusOne
                      ? 'border-dream-lavender bg-dream-lavender/10 text-dream-lavender'
                      : 'border-border text-text-secondary hover:border-dream-lavender'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      formData.plusOne
                        ? 'bg-dream-lavender border-dream-lavender'
                        : 'border-border'
                    }`}
                  >
                    {formData.plusOne && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm font-medium">Plus One</span>
                </button>
              </div>

              {/* Dietary Restrictions */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Dietary Restrictions
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleDietary(option)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors min-h-[40px] ${
                        formData.dietaryRestrictions.includes(option)
                          ? 'border-dream-lavender bg-dream-lavender/10 text-dream-lavender'
                          : 'border-border text-text-secondary hover:border-dream-lavender'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Any additional notes..."
                  rows={2}
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-primary text-text-primary focus:border-dream-lavender focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button
                onClick={closeForm}
                className="px-5 py-3 text-sm border border-border rounded-lg text-text-secondary hover:border-text-primary transition-colors min-h-[48px]"
              >
                Cancel
              </button>
              <button
                onClick={saveGuest}
                disabled={!formData.name.trim()}
                className="px-5 py-3 text-sm bg-dream-lavender text-white rounded-lg hover:bg-dream-lavender/90 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
              >
                {editingId ? 'Save Changes' : 'Add Guest'}
              </button>
            </div>
          </div>
        )}

        {/* Guest List Content */}
        {guests.length === 0 ? (
          /* Empty State */
          <div className="bg-bg-primary border border-border rounded-lg p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-dream-lavender/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-dream-lavender" />
            </div>
            <h3 className="font-serif text-2xl font-light text-text-primary mb-2">
              Your guest list is empty
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Start adding guests to keep track of RSVPs, dietary needs, and seating arrangements for your celebration.
            </p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-2 px-6 py-3 bg-dream-lavender text-white rounded-lg hover:bg-dream-lavender/90 transition-colors font-medium min-h-[48px]"
            >
              <Plus className="w-4 h-4" />
              Add Your First Guest
            </button>
          </div>
        ) : filteredAndSortedGuests.length === 0 ? (
          /* No results */
          <div className="bg-bg-primary border border-border rounded-lg p-8 text-center">
            <p className="text-text-secondary">
              No guests match your current filters.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-bg-primary border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pina-cream">
                    <tr>
                      <th className="px-4 py-3 text-left w-10">
                        <button
                          onClick={toggleSelectAll}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                            selectedIds.size === filteredAndSortedGuests.length &&
                            filteredAndSortedGuests.length > 0
                              ? 'bg-dream-lavender border-dream-lavender'
                              : 'border-border hover:border-dream-lavender'
                          }`}
                        >
                          {selectedIds.size === filteredAndSortedGuests.length &&
                            filteredAndSortedGuests.length > 0 && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                        >
                          Name <SortIcon field="name" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('side')}
                          className="flex items-center gap-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                        >
                          Side <SortIcon field="side" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('rsvpStatus')}
                          className="flex items-center gap-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                        >
                          RSVP <SortIcon field="rsvpStatus" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Dietary
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button
                          onClick={() => handleSort('tableNumber')}
                          className="flex items-center gap-1 text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-text-primary"
                        >
                          Table <SortIcon field="tableNumber" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        +1
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAndSortedGuests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-bg-warm/50 transition-colors">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleSelect(guest.id)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                              selectedIds.has(guest.id)
                                ? 'bg-dream-lavender border-dream-lavender'
                                : 'border-border hover:border-dream-lavender'
                            }`}
                          >
                            {selectedIds.has(guest.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <span className="text-sm font-medium text-text-primary">
                              {guest.name}
                            </span>
                            {guest.email && (
                              <p className="text-xs text-text-secondary mt-0.5">{guest.email}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getSideBadgeClasses(guest.side)}`}
                          >
                            {guest.side}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getRsvpBadgeClasses(guest.rsvpStatus)}`}
                          >
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {guest.dietaryRestrictions.length > 0 &&
                          !guest.dietaryRestrictions.includes('None') ? (
                            <div className="flex flex-wrap gap-1">
                              {guest.dietaryRestrictions.map((d) => (
                                <span
                                  key={d}
                                  className="inline-block px-2 py-0.5 text-xs rounded bg-pina-cream text-text-secondary"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-text-secondary">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {guest.tableNumber ? (
                            <span className="inline-flex items-center gap-1 text-sm text-text-primary">
                              <Hash className="w-3 h-3 text-text-secondary" />
                              {guest.tableNumber}
                            </span>
                          ) : (
                            <span className="text-xs text-text-secondary">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {guest.plusOne && (
                            <UserPlus className="w-4 h-4 text-dream-lavender" />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditForm(guest)}
                              className="w-9 h-9 flex items-center justify-center rounded hover:bg-twilight-blue/10 transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4 text-twilight-blue" />
                            </button>
                            <button
                              onClick={() => deleteGuest(guest.id)}
                              className="w-9 h-9 flex items-center justify-center rounded hover:bg-accent-error/10 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-accent-error" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {filteredAndSortedGuests.map((guest) => (
                <div
                  key={guest.id}
                  className={`bg-bg-primary border rounded-lg p-4 transition-shadow hover:shadow-md ${
                    selectedIds.has(guest.id) ? 'border-dream-lavender/50 bg-dream-lavender/5' : 'border-border'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleSelect(guest.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${
                          selectedIds.has(guest.id)
                            ? 'bg-dream-lavender border-dream-lavender'
                            : 'border-border'
                        }`}
                      >
                        {selectedIds.has(guest.id) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </button>
                      <div className="min-w-0">
                        <h4 className="text-base font-medium text-text-primary truncate">
                          {guest.name}
                        </h4>
                        {guest.email && (
                          <p className="text-xs text-text-secondary truncate">{guest.email}</p>
                        )}
                        {guest.phone && (
                          <p className="text-xs text-text-secondary">{guest.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      <button
                        onClick={() => openEditForm(guest)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-twilight-blue/10 transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-twilight-blue" />
                      </button>
                      <button
                        onClick={() => deleteGuest(guest.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent-error/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-accent-error" />
                      </button>
                    </div>
                  </div>

                  {/* Card Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getSideBadgeClasses(guest.side)}`}
                    >
                      {guest.side}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getRsvpBadgeClasses(guest.rsvpStatus)}`}
                    >
                      {guest.rsvpStatus}
                    </span>
                    {guest.plusOne && (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-dream-lavender/15 text-dream-lavender flex items-center gap-1">
                        <UserPlus className="w-3 h-3" /> +1
                      </span>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                    {guest.tableNumber && (
                      <span className="flex items-center gap-1">
                        <Hash className="w-3 h-3" /> Table {guest.tableNumber}
                      </span>
                    )}
                    {guest.dietaryRestrictions.length > 0 &&
                      !guest.dietaryRestrictions.includes('None') && (
                        <span className="flex items-center gap-1">
                          <UtensilsCrossed className="w-3 h-3" />
                          {guest.dietaryRestrictions.join(', ')}
                        </span>
                      )}
                    {guest.notes && (
                      <span className="text-text-secondary italic truncate max-w-[200px]">
                        {guest.notes}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Count footer */}
            <div className="mt-4 text-sm text-text-secondary text-center">
              Showing {filteredAndSortedGuests.length} of {guests.length} guest{guests.length !== 1 ? 's' : ''}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
