import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Heart,
  Camera,
  CheckCircle2,
  Gift,
  Navigation,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/types/database';

// ─── Types ────────────────────────────────────────────────────

type ColorTheme = 'classic-ivory' | 'modern-blush' | 'garden-green' | 'midnight';

type CelebrationWebsite = Tables<'celebration_websites'>;
type ScheduleEvent = Tables<'website_schedule_events'>;
type EntourageMember = Tables<'website_entourage'>;
type GalleryPhoto = Tables<'website_gallery'>;

interface RsvpForm {
  name: string;
  attendance: 'attending' | 'declined' | '';
  guestCount: number;
  dietary: string[];
  dietaryOther: string;
  message: string;
  phone: string;
}

// ─── Theme Config (matching CoupleWebsite.tsx) ───────────────

const THEME_CONFIG: Record<ColorTheme, {
  label: string;
  bg: string;
  bgAlt: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentText: string;
  border: string;
  hero: string;
  card: string;
}> = {
  'classic-ivory': {
    label: 'Classic Ivory',
    bg: 'bg-[#FDFAF3]',
    bgAlt: 'bg-[#F5EDD8]',
    text: 'text-[#2A2520]',
    textSecondary: 'text-[#5A4F45]',
    accent: 'bg-[#8B3A3A]',
    accentText: 'text-[#8B3A3A]',
    border: 'border-[#D9CEBC]',
    hero: 'bg-gradient-to-b from-[#F5EDD8] via-[#FDFAF3] to-[#FDFAF3]',
    card: 'bg-[#F5EDD8]/50',
  },
  'modern-blush': {
    label: 'Modern Blush',
    bg: 'bg-[#FFF5F5]',
    bgAlt: 'bg-[#FFE8E8]',
    text: 'text-[#3D2B2B]',
    textSecondary: 'text-[#8B6F6F]',
    accent: 'bg-[#C97070]',
    accentText: 'text-[#C97070]',
    border: 'border-[#E8C4C4]',
    hero: 'bg-gradient-to-b from-[#FFE8E8] via-[#FFF5F5] to-[#FFF5F5]',
    card: 'bg-[#FFE8E8]/50',
  },
  'garden-green': {
    label: 'Garden Green',
    bg: 'bg-[#F5F9F5]',
    bgAlt: 'bg-[#E8F0E8]',
    text: 'text-[#2A3A2A]',
    textSecondary: 'text-[#5A6F5A]',
    accent: 'bg-[#4A7C59]',
    accentText: 'text-[#4A7C59]',
    border: 'border-[#C4D9C4]',
    hero: 'bg-gradient-to-b from-[#E8F0E8] via-[#F5F9F5] to-[#F5F9F5]',
    card: 'bg-[#E8F0E8]/50',
  },
  midnight: {
    label: 'Midnight',
    bg: 'bg-[#0F1628]',
    bgAlt: 'bg-[#1A2340]',
    text: 'text-[#E8DCC8]',
    textSecondary: 'text-[#9A8E7A]',
    accent: 'bg-[#C4962E]',
    accentText: 'text-[#C4962E]',
    border: 'border-[#2A3555]',
    hero: 'bg-gradient-to-b from-[#1A2340] via-[#0F1628] to-[#0F1628]',
    card: 'bg-[#1A2340]/50',
  },
};

// ─── Countdown hook ───────────────────────────────────────────

function useCountdown(targetDate: string | null) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return remaining;
}

// ─── Helpers ──────────────────────────────────────────────────

function formatTime(t: string | null) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getTheme(colorTheme: string): typeof THEME_CONFIG['classic-ivory'] {
  return THEME_CONFIG[colorTheme as ColorTheme] ?? THEME_CONFIG['classic-ivory'];
}

const DIETARY_OPTIONS = [
  'Halal / No Pork',
  'Vegetarian',
  'Vegan',
  'Seafood Allergy',
];

// ─── Main Component ──────────────────────────────────────────

export default function CelebrationSite() {
  const { slug } = useParams<{ slug: string }>();
  const [website, setWebsite] = useState<CelebrationWebsite | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [entourage, setEntourage] = useState<EntourageMember[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // RSVP state
  const [rsvpForm, setRsvpForm] = useState<RsvpForm>({
    name: '',
    attendance: '',
    guestCount: 1,
    dietary: [],
    dietaryOther: '',
    message: '',
    phone: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  const rsvpRef = useRef<HTMLElement>(null);

  // Fetch data
  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      setLoading(true);
      setNotFound(false);

      const { data: ws, error } = await supabase
        .from('celebration_websites')
        .select('*')
        .eq('slug', slug!)
        .eq('is_published', true)
        .single();

      if (error || !ws) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setWebsite(ws);

      // Fetch related data in parallel
      const [scheduleRes, entourageRes, galleryRes] = await Promise.all([
        supabase
          .from('website_schedule_events')
          .select('*')
          .eq('website_id', ws.id)
          .order('sort_order', { ascending: true }),
        supabase
          .from('website_entourage')
          .select('*')
          .eq('website_id', ws.id)
          .order('sort_order', { ascending: true }),
        supabase
          .from('website_gallery')
          .select('*')
          .eq('website_id', ws.id)
          .order('sort_order', { ascending: true }),
      ]);

      setSchedule(scheduleRes.data ?? []);
      setEntourage(entourageRes.data ?? []);
      setGallery(galleryRes.data ?? []);
      setLoading(false);
    }

    fetchData();
  }, [slug]);

  const theme = website ? getTheme(website.color_theme) : THEME_CONFIG['classic-ivory'];
  const isDark = website?.color_theme === 'midnight';
  const countdown = useCountdown(website?.celebration_date ?? null);

  const displayNames =
    website?.partner1_name && website?.partner2_name
      ? `${website.partner1_name} & ${website.partner2_name}`
      : website?.partner1_name || website?.partner2_name || '';

  const formattedDate = website?.celebration_date
    ? new Date(website.celebration_date).toLocaleDateString('en-PH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const previewInputStyle: React.CSSProperties = isDark
    ? { backgroundColor: '#1A2340', borderColor: '#2A3555', color: '#E8DCC8' }
    : {};

  // RSVP handlers
  const toggleDietary = (option: string) => {
    setRsvpForm((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter((d) => d !== option)
        : [...prev.dietary, option],
    }));
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !rsvpForm.name.trim() || !rsvpForm.attendance) return;

    setRsvpSubmitting(true);
    setRsvpError('');

    const allDietary = [
      ...rsvpForm.dietary,
      ...(rsvpForm.dietaryOther.trim() ? [`Other: ${rsvpForm.dietaryOther.trim()}`] : []),
    ];

    const { error } = await supabase.from('website_rsvps').insert({
      website_id: website.id,
      guest_name: rsvpForm.name.trim(),
      response: rsvpForm.attendance,
      guest_count: rsvpForm.attendance === 'attending' ? rsvpForm.guestCount : 0,
      dietary_restrictions: allDietary.length > 0 ? allDietary : null,
      message: rsvpForm.message.trim() || null,
      guest_phone: rsvpForm.phone.trim() || null,
    });

    setRsvpSubmitting(false);

    if (error) {
      setRsvpError('Something went wrong. Please try again.');
      return;
    }

    setRsvpSubmitted(true);
  };

  const scrollToRsvp = () => {
    rsvpRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── Loading State ─────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFAF3]">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-[#8B3A3A]" />
          <p className="font-sans text-sm text-[#5A4F45]">Loading celebration...</p>
        </div>
      </div>
    );
  }

  // ─── 404 State ─────────────────────────────────────────

  if (notFound || !website) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFAF3] px-6">
        <div className="max-w-md text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-[#D9CEBC]" />
          <h1 className="mb-2 font-serif text-3xl font-light text-[#2A2520]">
            Celebration Not Found
          </h1>
          <p className="mb-8 font-sans text-base font-light text-[#5A4F45]">
            This celebration page doesn't exist or hasn't been published yet.
          </p>
          <Link
            to="/"
            className="inline-block rounded bg-[#8B3A3A] px-6 py-3 font-sans text-sm tracking-wide text-[#F5EDD8] transition hover:opacity-90"
          >
            Go to haraya
          </Link>
        </div>
      </div>
    );
  }

  // ─── Celebration Website ──────────────────────────────

  const hasGiftSection =
    website.gift_section_enabled &&
    (website.gcash_qr_url || website.gcash_number || website.maya_qr_url || website.maya_number || website.bank_name);

  const venueMapLink = website.venue_map_url || (website.venue_location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${website.venue_name ?? ''} ${website.venue_location}`.trim()
      )}`
    : null);

  return (
    <div className={`${theme.bg} min-h-screen`}>
      {/* ── Hero Section ─────────────────────────── */}
      <section
        className={`relative flex min-h-[75vh] flex-col items-center justify-center px-6 py-20 text-center ${theme.hero}`}
      >
        {website.cover_photo_url && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={website.cover_photo_url}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div
              className={`absolute inset-0 ${
                isDark ? 'bg-[#0F1628]/75' : 'bg-white/60'
              }`}
            />
          </div>
        )}
        <div className="relative z-10">
          <p
            className={`mb-4 font-sans text-xs font-medium uppercase tracking-[0.25em] ${theme.textSecondary}`}
          >
            {website.ceremony_type
              ? `${website.ceremony_type} Celebration`
              : "We're Getting Married"}
          </p>
          <h1
            className={`font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.05] ${theme.text}`}
          >
            {displayNames}
          </h1>
          {formattedDate && (
            <p
              className={`mt-6 font-sans text-lg font-light tracking-wide ${theme.textSecondary}`}
            >
              {formattedDate}
            </p>
          )}
          {website.venue_name && (
            <p
              className={`mt-2 flex items-center justify-center gap-1.5 font-sans text-sm font-light ${theme.textSecondary}`}
            >
              <MapPin className="h-3.5 w-3.5" />
              {website.venue_name}
              {website.venue_location ? `, ${website.venue_location}` : ''}
            </p>
          )}

          {/* Countdown */}
          {website.celebration_date && (
            <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.minutes, label: 'Min' },
                { val: countdown.seconds, label: 'Sec' },
              ].map((u) => (
                <div key={u.label} className="text-center">
                  <div
                    className={`font-serif text-3xl font-light sm:text-4xl ${theme.text}`}
                  >
                    {u.val}
                  </div>
                  <div
                    className={`font-sans text-[10px] font-medium uppercase tracking-widest ${theme.textSecondary}`}
                  >
                    {u.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Our Story ────────────────────────────── */}
      {website.our_story && (
        <section className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
          <h2
            className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
          >
            Our Story
          </h2>
          <div className={`mx-auto mb-6 h-px w-12 ${theme.accent}`} />
          <p
            className={`whitespace-pre-line font-sans text-base font-light leading-relaxed ${theme.text}`}
          >
            {website.our_story}
          </p>
        </section>
      )}

      {/* ── Schedule of Events ────────────────────── */}
      {schedule.length > 0 && (
        <section className={`${theme.bgAlt} px-6 py-16 sm:py-20`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              Schedule of Events
            </h2>
            <div className={`mx-auto mb-10 h-px w-12 ${theme.accent}`} />
            <div className="space-y-0">
              {schedule.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative flex items-start gap-6 pb-8 text-left"
                >
                  {idx < schedule.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-8 h-full w-px ${theme.border} border-l`}
                    />
                  )}
                  <div
                    className={`relative z-10 mt-1 h-[10px] w-[10px] flex-shrink-0 rounded-full ${theme.accent}`}
                  />
                  <div className="flex-1">
                    <p className={`font-sans text-sm font-medium ${theme.accentText}`}>
                      {formatTime(item.event_time)}
                    </p>
                    <p className={`font-serif text-xl font-normal ${theme.text}`}>
                      {item.event_name}
                    </p>
                    {item.event_location && (
                      <p
                        className={`mt-0.5 flex items-center gap-1 font-sans text-sm font-light ${theme.textSecondary}`}
                      >
                        <MapPin className="h-3 w-3" />
                        {item.event_location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {venueMapLink && (
              <a
                href={venueMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition hover:opacity-80 ${theme.border} ${theme.text}`}
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            )}
          </div>
        </section>
      )}

      {/* ── Entourage / Wedding Party ─────────────── */}
      {entourage.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              Wedding Party
            </h2>
            <div className={`mx-auto mb-10 h-px w-12 ${theme.accent}`} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {entourage.map((m) => (
              <div
                key={m.id}
                className={`rounded-lg border ${theme.border} ${theme.card} p-5 text-center`}
              >
                <div
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${theme.accent} font-sans text-sm font-medium text-white`}
                >
                  {m.member_name.charAt(0).toUpperCase()}
                </div>
                <p className={`font-serif text-lg font-normal ${theme.text}`}>
                  {m.member_name}
                </p>
                <p
                  className={`font-sans text-xs font-medium uppercase tracking-wider ${theme.textSecondary}`}
                >
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Gallery ───────────────────────────────── */}
      {gallery.length > 0 && (
        <section className={`${theme.bgAlt} px-6 py-16 sm:py-20`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              Gallery
            </h2>
            <div className={`mx-auto mb-10 h-px w-12 ${theme.accent}`} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={photo.photo_url}
                    alt={photo.caption ?? ''}
                    className="h-full w-full object-cover transition hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gift Information ──────────────────────── */}
      {hasGiftSection && (
        <section className="mx-auto max-w-lg px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              <Gift className="mx-auto mb-2 h-5 w-5" />
              Gifts
            </h2>
            <div className={`mx-auto mb-6 h-px w-12 ${theme.accent}`} />
            <p className={`mb-8 font-sans text-sm font-light leading-relaxed ${theme.text}`}>
              {website.gift_intro_text ||
                'Your presence is the greatest gift. For those who wish to give, monetary gifts are lovingly appreciated.'}
            </p>
          </div>

          <div className="space-y-6">
            {/* GCash */}
            {(website.gcash_qr_url || website.gcash_number) && (
              <div className={`rounded-lg border ${theme.border} ${theme.card} p-6 text-center`}>
                <p className={`mb-3 font-sans text-sm font-semibold uppercase tracking-wider ${theme.text}`}>
                  GCash
                </p>
                {website.gcash_qr_url && (
                  <img
                    src={website.gcash_qr_url}
                    alt="GCash QR Code"
                    className="mx-auto mb-3 h-48 w-48 rounded-lg object-contain"
                    loading="lazy"
                  />
                )}
                {website.gcash_number && (
                  <p className={`font-sans text-base font-medium ${theme.accentText}`}>
                    {website.gcash_number}
                  </p>
                )}
              </div>
            )}

            {/* Maya */}
            {(website.maya_qr_url || website.maya_number) && (
              <div className={`rounded-lg border ${theme.border} ${theme.card} p-6 text-center`}>
                <p className={`mb-3 font-sans text-sm font-semibold uppercase tracking-wider ${theme.text}`}>
                  Maya
                </p>
                {website.maya_qr_url && (
                  <img
                    src={website.maya_qr_url}
                    alt="Maya QR Code"
                    className="mx-auto mb-3 h-48 w-48 rounded-lg object-contain"
                    loading="lazy"
                  />
                )}
                {website.maya_number && (
                  <p className={`font-sans text-base font-medium ${theme.accentText}`}>
                    {website.maya_number}
                  </p>
                )}
              </div>
            )}

            {/* Bank Transfer */}
            {website.bank_name && (
              <div className={`rounded-lg border ${theme.border} ${theme.card} p-6 text-center`}>
                <p className={`mb-3 font-sans text-sm font-semibold uppercase tracking-wider ${theme.text}`}>
                  Bank Transfer
                </p>
                <p className={`font-sans text-sm ${theme.text}`}>{website.bank_name}</p>
                {website.bank_account_name && (
                  <p className={`font-sans text-sm ${theme.textSecondary}`}>
                    {website.bank_account_name}
                  </p>
                )}
                {website.bank_account_number && (
                  <p className={`mt-1 font-sans text-base font-medium ${theme.accentText}`}>
                    {website.bank_account_number}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Dress Code ────────────────────────────── */}
      {website.dress_code && (
        <section className={`${theme.bgAlt} px-6 py-12 text-center`}>
          <p
            className={`mb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
          >
            Dress Code
          </p>
          <p className={`font-serif text-xl font-light ${theme.text}`}>
            {website.dress_code}
          </p>
        </section>
      )}

      {/* ── RSVP ──────────────────────────────────── */}
      {website.rsvp_enabled && (
        <section ref={rsvpRef} className="mx-auto max-w-lg px-6 py-16 sm:py-20" id="rsvp">
          <div className="text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              RSVP
            </h2>
            <div className={`mx-auto mb-8 h-px w-12 ${theme.accent}`} />
          </div>

          {rsvpSubmitted ? (
            <div className={`rounded-lg border ${theme.border} ${theme.card} p-8 text-center`}>
              <CheckCircle2 className={`mx-auto mb-4 h-10 w-10 ${theme.accentText}`} />
              <p className={`font-serif text-2xl ${theme.text}`}>
                Maraming salamat!
              </p>
              <p className={`mt-2 font-sans text-sm font-light ${theme.textSecondary}`}>
                {rsvpForm.attendance === 'attending'
                  ? 'We look forward to celebrating with you!'
                  : 'Thank you for letting us know. We\'ll miss you!'}
              </p>
              {venueMapLink && rsvpForm.attendance === 'attending' && (
                <a
                  href={venueMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition hover:opacity-80 ${theme.border} ${theme.text}`}
                >
                  <Navigation className="h-4 w-4" />
                  View Venue on Map
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className={`mb-1.5 block font-sans text-sm ${theme.text}`}>
                  Your Name <span className={theme.accentText}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className={`w-full rounded border px-4 py-3 font-sans text-base focus:outline-none transition ${theme.border}`}
                  style={previewInputStyle}
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                />
              </div>

              {/* Attendance */}
              <div>
                <p className={`mb-2 font-sans text-sm ${theme.text}`}>
                  Will you be celebrating with us? <span className={theme.accentText}>*</span>
                </p>
                <div className="flex gap-3">
                  {([
                    { value: 'attending' as const, label: 'Joyfully Accept' },
                    { value: 'declined' as const, label: 'Respectfully Decline' },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, attendance: opt.value })}
                      className={`flex-1 rounded border px-4 py-3 font-sans text-sm transition ${theme.border} ${
                        rsvpForm.attendance === opt.value
                          ? `${theme.accent} text-white`
                          : ''
                      }`}
                      style={rsvpForm.attendance !== opt.value ? previewInputStyle : {}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count (only if attending) */}
              {rsvpForm.attendance === 'attending' && (
                <div>
                  <p className={`mb-2 font-sans text-sm ${theme.text}`}>
                    How many guests? (including you)
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRsvpForm({ ...rsvpForm, guestCount: n })}
                        className={`h-11 w-11 rounded border font-sans text-sm font-medium transition ${theme.border} ${
                          rsvpForm.guestCount === n
                            ? `${theme.accent} text-white`
                            : ''
                        }`}
                        style={rsvpForm.guestCount !== n ? previewInputStyle : {}}
                      >
                        {n === 5 ? '5+' : n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Restrictions */}
              {rsvpForm.attendance === 'attending' && (
                <div>
                  <p className={`mb-2 font-sans text-sm ${theme.text}`}>
                    Dietary needs (optional)
                  </p>
                  <div className="space-y-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center gap-3 rounded border px-4 py-2.5 font-sans text-sm transition ${theme.border} ${
                          rsvpForm.dietary.includes(option) ? theme.card : ''
                        }`}
                        style={previewInputStyle}
                      >
                        <input
                          type="checkbox"
                          checked={rsvpForm.dietary.includes(option)}
                          onChange={() => toggleDietary(option)}
                          className="h-4 w-4 accent-[#8B3A3A]"
                        />
                        <span className={theme.text}>{option}</span>
                      </label>
                    ))}
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded border px-4 py-2.5 font-sans text-sm transition ${theme.border} ${
                        rsvpForm.dietary.includes('Other') ? theme.card : ''
                      }`}
                      style={previewInputStyle}
                    >
                      <input
                        type="checkbox"
                        checked={rsvpForm.dietary.includes('Other')}
                        onChange={() => toggleDietary('Other')}
                        className="h-4 w-4 accent-[#8B3A3A]"
                      />
                      <span className={theme.text}>Other</span>
                    </label>
                    {rsvpForm.dietary.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify..."
                        className={`w-full rounded border px-4 py-2.5 font-sans text-sm focus:outline-none transition ${theme.border}`}
                        style={previewInputStyle}
                        value={rsvpForm.dietaryOther}
                        onChange={(e) =>
                          setRsvpForm({ ...rsvpForm, dietaryOther: e.target.value })
                        }
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className={`mb-1.5 block font-sans text-sm ${theme.text}`}>
                  Message to the couple (optional)
                </label>
                <textarea
                  placeholder="Leave a message..."
                  className={`min-h-[80px] w-full resize-y rounded border px-4 py-3 font-sans text-base focus:outline-none transition ${theme.border}`}
                  style={previewInputStyle}
                  value={rsvpForm.message}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`mb-1.5 block font-sans text-sm ${theme.text}`}>
                  Phone number (optional, for day-of coordination)
                </label>
                <input
                  type="tel"
                  placeholder="09XX XXX XXXX"
                  className={`w-full rounded border px-4 py-3 font-sans text-base focus:outline-none transition ${theme.border}`}
                  style={previewInputStyle}
                  value={rsvpForm.phone}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                />
              </div>

              {/* Error */}
              {rsvpError && (
                <p className="font-sans text-sm text-red-500">{rsvpError}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={rsvpSubmitting || !rsvpForm.name.trim() || !rsvpForm.attendance}
                className={`w-full rounded px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition ${theme.accent} hover:opacity-90 disabled:opacity-50`}
              >
                {rsvpSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send RSVP'
                )}
              </button>
            </form>
          )}
        </section>
      )}

      {/* ── Hashtag ───────────────────────────────── */}
      {website.hashtag && (
        <section className={`${theme.bgAlt} px-6 py-10 text-center`}>
          <p className={`font-sans text-lg font-light ${theme.accentText}`}>
            #{website.hashtag}
          </p>
          <p className={`mt-1 font-sans text-xs font-light ${theme.textSecondary}`}>
            Share your photos with our hashtag
          </p>
        </section>
      )}

      {/* ── Footer ────────────────────────────────── */}
      <footer className={`${theme.bgAlt} border-t ${theme.border} px-6 py-8 text-center`}>
        <p className={`font-sans text-xs font-light ${theme.textSecondary}`}>
          Made with{' '}
          <span className="font-sans text-xs font-extralight tracking-[0.1em]">
            haraya
          </span>
        </p>
      </footer>

      {/* ── Sticky Mobile Bottom Bar ──────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t ${theme.border} ${
          isDark ? 'bg-[#0F1628]/95' : 'bg-white/95'
        } px-4 py-3 backdrop-blur-sm md:hidden`}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3">
          {website.rsvp_enabled && !rsvpSubmitted && (
            <button
              onClick={scrollToRsvp}
              className={`flex flex-1 items-center justify-center gap-2 rounded px-4 py-3 font-sans text-sm font-medium tracking-wide text-white transition ${theme.accent} hover:opacity-90`}
            >
              <ChevronUp className="h-4 w-4" />
              RSVP Now
            </button>
          )}
          {website.guest_photos_enabled && (
            <Link
              to={`/c/${slug}/photos`}
              className={`flex flex-1 items-center justify-center gap-2 rounded border px-4 py-3 font-sans text-sm font-medium tracking-wide transition ${theme.border} ${theme.text} hover:opacity-80`}
            >
              <Camera className="h-4 w-4" />
              Share Photos
            </Link>
          )}
        </div>
      </div>

      {/* Bottom spacer for sticky bar on mobile */}
      <div className="h-[68px] md:hidden" />
    </div>
  );
}
