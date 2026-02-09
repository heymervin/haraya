import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  UtensilsCrossed,
  Search,
  Download,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RsvpEntry {
  id: string;
  guest_name: string;
  response: 'attending' | 'declined';
  guest_count: number;
  dietary_restrictions: string[];
  message: string | null;
  guest_phone: string | null;
  submitted_at: string;
}

interface RsvpSummary {
  total_responses: number;
  attending_count: number;
  declined_count: number;
  total_guests_attending: number;
  guests_with_dietary: number;
}

export default function RsvpDashboard({ websiteId }: { websiteId: string | null }) {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [summary, setSummary] = useState<RsvpSummary>({
    total_responses: 0,
    attending_count: 0,
    declined_count: 0,
    total_guests_attending: 0,
    guests_with_dietary: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'attending' | 'declined'>('all');
  const [loading, setLoading] = useState(false);

  const fetchRsvps = useCallback(async () => {
    if (!websiteId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_rsvps')
        .select('*')
        .eq('website_id', websiteId)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setRsvps(data as RsvpEntry[]);
        // Calculate summary
        const attending = data.filter((r) => r.response === 'attending');
        const declined = data.filter((r) => r.response === 'declined');
        setSummary({
          total_responses: data.length,
          attending_count: attending.length,
          declined_count: declined.length,
          total_guests_attending: attending.reduce((sum, r) => sum + (r.guest_count || 1), 0),
          guests_with_dietary: data.filter(
            (r) => r.dietary_restrictions && r.dietary_restrictions.length > 0,
          ).length,
        });
      }
    } catch {
      // Supabase not configured or no data yet — show empty state
    } finally {
      setLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    fetchRsvps();
  }, [fetchRsvps]);

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = r.guest_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || r.response === filterType;
    return matchesSearch && matchesFilter;
  });

  const exportCsv = () => {
    const headers = ['Name', 'Response', 'Guest Count', 'Dietary Restrictions', 'Message', 'Phone', 'Date'];
    const rows = rsvps.map((r) => [
      r.guest_name,
      r.response,
      String(r.guest_count),
      (r.dietary_restrictions || []).join('; '),
      r.message || '',
      r.guest_phone || '',
      new Date(r.submitted_at).toLocaleDateString('en-PH'),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cardCls = 'rounded-lg border border-border bg-bg-primary p-5 text-center';

  if (!websiteId) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Users className="mx-auto mb-4 h-12 w-12 text-text-secondary/40" />
        <h2 className="font-serif text-2xl font-light text-text-primary">RSVP Dashboard</h2>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          Publish your website first to start receiving RSVPs.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className={cardCls}>
          <Users className="mx-auto mb-2 h-6 w-6 text-accent-primary" />
          <div className="font-serif text-2xl font-light text-text-primary">
            {summary.total_responses}
          </div>
          <div className="font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
            Total RSVPs
          </div>
        </div>
        <div className={cardCls}>
          <UserCheck className="mx-auto mb-2 h-6 w-6 text-accent-success" />
          <div className="font-serif text-2xl font-light text-text-primary">
            {summary.attending_count}
            <span className="ml-1 font-sans text-sm text-text-secondary">
              ({summary.total_guests_attending} guests)
            </span>
          </div>
          <div className="font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
            Attending
          </div>
        </div>
        <div className={cardCls}>
          <UserX className="mx-auto mb-2 h-6 w-6 text-accent-error" />
          <div className="font-serif text-2xl font-light text-text-primary">
            {summary.declined_count}
          </div>
          <div className="font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
            Declined
          </div>
        </div>
        <div className={cardCls}>
          <UtensilsCrossed className="mx-auto mb-2 h-6 w-6 text-accent-warning" />
          <div className="font-serif text-2xl font-light text-text-primary">
            {summary.guests_with_dietary}
          </div>
          <div className="font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
            Dietary Needs
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full rounded border border-border bg-bg-primary py-2.5 pl-9 pr-4 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent-primary focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none rounded border border-border bg-bg-primary py-2.5 pl-4 pr-9 font-sans text-sm text-text-primary focus:border-accent-primary focus:outline-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'attending' | 'declined')}
            >
              <option value="all">All</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchRsvps}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={rsvps.length === 0}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Guest List Table */}
      {filteredRsvps.length === 0 ? (
        <div className="rounded-lg border border-border bg-bg-primary p-10 text-center">
          <Users className="mx-auto mb-3 h-10 w-10 text-text-secondary/30" />
          <p className="font-sans text-sm text-text-secondary">
            {rsvps.length === 0
              ? 'No RSVPs yet. Share your website to start receiving responses!'
              : 'No guests match your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-bg-primary">
                <th className="px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Name
                </th>
                <th className="px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Response
                </th>
                <th className="px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Guests
                </th>
                <th className="hidden px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider text-text-secondary sm:table-cell">
                  Dietary
                </th>
                <th className="hidden px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider text-text-secondary md:table-cell">
                  Message
                </th>
                <th className="px-4 py-3 font-sans text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRsvps.map((rsvp) => (
                <tr key={rsvp.id} className="transition hover:bg-border/20">
                  <td className="px-4 py-3 font-sans text-sm font-medium text-text-primary">
                    {rsvp.guest_name}
                    {rsvp.guest_phone && (
                      <span className="block font-sans text-xs text-text-secondary">
                        {rsvp.guest_phone}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-xs font-medium ${
                        rsvp.response === 'attending'
                          ? 'bg-accent-success/10 text-accent-success'
                          : 'bg-accent-error/10 text-accent-error'
                      }`}
                    >
                      {rsvp.response === 'attending' ? (
                        <UserCheck className="h-3 w-3" />
                      ) : (
                        <UserX className="h-3 w-3" />
                      )}
                      {rsvp.response === 'attending' ? 'Attending' : 'Declined'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-text-primary">
                    {rsvp.guest_count}
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {rsvp.dietary_restrictions && rsvp.dietary_restrictions.length > 0 ? (
                      <span className="font-sans text-xs text-text-secondary">
                        {rsvp.dietary_restrictions.join(', ')}
                      </span>
                    ) : (
                      <span className="font-sans text-xs text-text-secondary/40">—</span>
                    )}
                  </td>
                  <td className="hidden max-w-[200px] truncate px-4 py-3 font-sans text-xs text-text-secondary md:table-cell">
                    {rsvp.message || '—'}
                  </td>
                  <td className="px-4 py-3 font-sans text-xs text-text-secondary">
                    {new Date(rsvp.submitted_at).toLocaleDateString('en-PH', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
