import { useState, useEffect, useCallback } from 'react';
import {
  Eye,
  Pencil,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  Heart,
  Users,
  Camera,
  Hash,
  Share2,
  ChevronDown,
  ImagePlus,
  X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

type ColorTheme = 'classic-ivory' | 'modern-blush' | 'garden-green' | 'midnight';
type CeremonyType = 'Catholic' | 'Civil' | 'Civil Union' | 'Muslim' | 'Other';

interface ScheduleEvent {
  id: string;
  time: string;
  event: string;
  location: string;
}

interface EntourageMember {
  id: string;
  name: string;
  role: string;
}

interface RsvpEntry {
  name: string;
  attending: 'yes' | 'no' | '';
  dietary: string;
  message: string;
}

interface WebsiteData {
  partner1Name: string;
  partner2Name: string;
  celebrationDate: string;
  ceremonyType: CeremonyType | '';
  venueName: string;
  venueLocation: string;
  ourStory: string;
  coverPhotoUrl: string;
  colorTheme: ColorTheme;
  schedule: ScheduleEvent[];
  gallery: string[];
  hashtag: string;
  entourage: EntourageMember[];
  rsvpEnabled: boolean;
}

// ─── Theme definitions ────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────

const STORAGE_KEY = 'haraya-celebration-website';

const uid = () => Math.random().toString(36).slice(2, 9);

const defaultData: WebsiteData = {
  partner1Name: '',
  partner2Name: '',
  celebrationDate: '',
  ceremonyType: '',
  venueName: '',
  venueLocation: '',
  ourStory: '',
  coverPhotoUrl: '',
  colorTheme: 'classic-ivory',
  schedule: [],
  gallery: [],
  hashtag: '',
  entourage: [],
  rsvpEnabled: true,
};

function loadData(): WebsiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return { ...defaultData };
}

// ─── Countdown hook ───────────────────────────────────────────

function useCountdown(targetDate: string) {
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

// ─── Edit Mode ────────────────────────────────────────────────

function EditMode({
  data,
  onChange,
}: {
  data: WebsiteData;
  onChange: (d: WebsiteData) => void;
}) {
  const update = <K extends keyof WebsiteData>(key: K, val: WebsiteData[K]) =>
    onChange({ ...data, [key]: val });

  // Schedule helpers
  const addScheduleEvent = () =>
    update('schedule', [...data.schedule, { id: uid(), time: '', event: '', location: '' }]);

  const removeScheduleEvent = (id: string) =>
    update('schedule', data.schedule.filter((e) => e.id !== id));

  const updateScheduleEvent = (id: string, field: keyof ScheduleEvent, val: string) =>
    update(
      'schedule',
      data.schedule.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    );

  // Gallery helpers
  const [galleryUrl, setGalleryUrl] = useState('');
  const addGalleryPhoto = () => {
    if (galleryUrl.trim()) {
      update('gallery', [...data.gallery, galleryUrl.trim()]);
      setGalleryUrl('');
    }
  };
  const removeGalleryPhoto = (idx: number) =>
    update('gallery', data.gallery.filter((_, i) => i !== idx));

  // Entourage helpers
  const addEntourageMember = () =>
    update('entourage', [...data.entourage, { id: uid(), name: '', role: '' }]);

  const removeEntourageMember = (id: string) =>
    update('entourage', data.entourage.filter((m) => m.id !== id));

  const updateEntourageMember = (id: string, field: 'name' | 'role', val: string) =>
    update(
      'entourage',
      data.entourage.map((m) => (m.id === id ? { ...m, [field]: val } : m)),
    );

  const inputCls =
    'w-full rounded border border-border bg-bg-primary px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent-primary focus:outline-none transition';
  const labelCls = 'block font-sans text-xs font-medium uppercase tracking-wider text-text-secondary mb-2';
  const sectionCls = 'space-y-4';

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-10">
      {/* Section: Couple Details */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Heart className="h-5 w-5 text-accent-primary" />
          Couple Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Partner 1 Name</label>
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Marco"
              value={data.partner1Name}
              onChange={(e) => update('partner1Name', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Partner 2 Name</label>
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Pia"
              value={data.partner2Name}
              onChange={(e) => update('partner2Name', e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Celebration Date</label>
            <input
              type="date"
              className={inputCls}
              value={data.celebrationDate}
              onChange={(e) => update('celebrationDate', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Ceremony Type</label>
            <div className="relative">
              <select
                className={`${inputCls} appearance-none pr-10`}
                value={data.ceremonyType}
                onChange={(e) => update('ceremonyType', e.target.value as CeremonyType | '')}
              >
                <option value="">Select type</option>
                <option value="Catholic">Catholic</option>
                <option value="Civil">Civil</option>
                <option value="Civil Union">Civil Union</option>
                <option value="Muslim">Muslim</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Venue */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <MapPin className="h-5 w-5 text-accent-primary" />
          Venue
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Venue Name</label>
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Villa Hermosa"
              value={data.venueName}
              onChange={(e) => update('venueName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. Tagaytay, Cavite"
              value={data.venueLocation}
              onChange={(e) => update('venueLocation', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Section: Our Story */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Heart className="h-5 w-5 text-accent-primary" />
          Our Story
        </h2>
        <div>
          <label className={labelCls}>How did you meet? Tell your story.</label>
          <textarea
            className={`${inputCls} min-h-[140px] resize-y`}
            placeholder="We met at..."
            value={data.ourStory}
            onChange={(e) => update('ourStory', e.target.value)}
          />
        </div>
      </section>

      {/* Section: Appearance */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Camera className="h-5 w-5 text-accent-primary" />
          Appearance
        </h2>
        <div>
          <label className={labelCls}>Cover Photo URL</label>
          <input
            type="text"
            className={inputCls}
            placeholder="https://..."
            value={data.coverPhotoUrl}
            onChange={(e) => update('coverPhotoUrl', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Color Theme</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(Object.keys(THEME_CONFIG) as ColorTheme[]).map((key) => {
              const t = THEME_CONFIG[key];
              const selected = data.colorTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => update('colorTheme', key)}
                  className={`rounded-lg border-2 p-4 text-center transition ${
                    selected
                      ? 'border-accent-primary shadow-md'
                      : 'border-border hover:border-accent-primary/40'
                  }`}
                >
                  <div
                    className={`mx-auto mb-2 h-8 w-8 rounded-full ${t.accent}`}
                  />
                  <span className="font-sans text-xs font-medium text-text-primary">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className={labelCls}>Couple Hashtag</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              className={`${inputCls} pl-9`}
              placeholder="MarcoAndPia2026"
              value={data.hashtag}
              onChange={(e) => update('hashtag', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Section: Event Schedule */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Clock className="h-5 w-5 text-accent-primary" />
          Event Schedule
        </h2>
        {data.schedule.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-lg border border-border bg-bg-primary p-4">
            <div className="flex-1 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <input
                  type="time"
                  className={inputCls}
                  value={item.time}
                  onChange={(e) => updateScheduleEvent(item.id, 'time', e.target.value)}
                />
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Event name"
                  value={item.event}
                  onChange={(e) => updateScheduleEvent(item.id, 'event', e.target.value)}
                />
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Location"
                  value={item.location}
                  onChange={(e) => updateScheduleEvent(item.id, 'location', e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeScheduleEvent(item.id)}
              className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-text-secondary transition hover:bg-accent-error/10 hover:text-accent-error"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addScheduleEvent}
          className="flex items-center gap-2 rounded border border-dashed border-border px-4 py-3 font-sans text-sm text-text-secondary transition hover:border-accent-primary hover:text-accent-primary"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </section>

      {/* Section: Wedding Party / Entourage */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Users className="h-5 w-5 text-accent-primary" />
          Wedding Party / Entourage
        </h2>
        {data.entourage.map((member) => (
          <div key={member.id} className="flex gap-3 rounded-lg border border-border bg-bg-primary p-4">
            <div className="flex-1 grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                className={inputCls}
                placeholder="Name"
                value={member.name}
                onChange={(e) => updateEntourageMember(member.id, 'name', e.target.value)}
              />
              <input
                type="text"
                className={inputCls}
                placeholder="Role (e.g. Ninang, Best Man)"
                value={member.role}
                onChange={(e) => updateEntourageMember(member.id, 'role', e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeEntourageMember(member.id)}
              className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-text-secondary transition hover:bg-accent-error/10 hover:text-accent-error"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEntourageMember}
          className="flex items-center gap-2 rounded border border-dashed border-border px-4 py-3 font-sans text-sm text-text-secondary transition hover:border-accent-primary hover:text-accent-primary"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </section>

      {/* Section: Photo Gallery */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <ImagePlus className="h-5 w-5 text-accent-primary" />
          Photo Gallery
        </h2>
        {data.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {data.gallery.map((url, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryPhoto(i)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-bg-deep/70 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <input
            type="text"
            className={`${inputCls} flex-1`}
            placeholder="Paste image URL"
            value={galleryUrl}
            onChange={(e) => setGalleryUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGalleryPhoto()}
          />
          <button
            type="button"
            onClick={addGalleryPhoto}
            className="flex-shrink-0 rounded bg-accent-primary px-5 py-3 font-sans text-sm text-text-on-dark transition hover:bg-accent-primary-hover"
          >
            Add
          </button>
        </div>
      </section>

      {/* Section: RSVP */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <CheckCircle2 className="h-5 w-5 text-accent-primary" />
          RSVP
        </h2>
        <label className="flex cursor-pointer items-center gap-3">
          <div
            className={`relative h-6 w-11 rounded-full transition ${
              data.rsvpEnabled ? 'bg-accent-primary' : 'bg-border'
            }`}
            onClick={() => update('rsvpEnabled', !data.rsvpEnabled)}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                data.rsvpEnabled ? 'left-5' : 'left-0.5'
              }`}
            />
          </div>
          <span className="font-sans text-sm text-text-primary">
            Enable RSVP form on your website
          </span>
        </label>
      </section>
    </div>
  );
}

// ─── Preview Mode ─────────────────────────────────────────────

function PreviewMode({ data }: { data: WebsiteData }) {
  const theme = THEME_CONFIG[data.colorTheme];
  const countdown = useCountdown(data.celebrationDate);

  const [rsvp, setRsvp] = useState<RsvpEntry>({
    name: '',
    attending: '',
    dietary: '',
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  const displayNames =
    data.partner1Name && data.partner2Name
      ? `${data.partner1Name} & ${data.partner2Name}`
      : data.partner1Name || data.partner2Name || 'Your Names Here';

  const formattedDate = data.celebrationDate
    ? new Date(data.celebrationDate).toLocaleDateString('en-PH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const formatTime = (t: string) => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  // Inline styles for theme-dependent inputs in midnight mode
  const isDark = data.colorTheme === 'midnight';
  const previewInputStyle: React.CSSProperties = isDark
    ? { backgroundColor: '#1A2340', borderColor: '#2A3555', color: '#E8DCC8' }
    : {};

  return (
    <div className={`${theme.bg} min-h-screen`}>
      {/* ── Hero Section ─────────────────────────── */}
      <section
        className={`relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center ${theme.hero}`}
      >
        {data.coverPhotoUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={data.coverPhotoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-[#0F1628]/75'
                  : 'bg-white/60'
              }`}
            />
          </div>
        )}
        <div className="relative z-10">
          <p
            className={`mb-4 font-sans text-xs font-medium uppercase tracking-[0.25em] ${theme.textSecondary}`}
          >
            {data.ceremonyType
              ? `${data.ceremonyType} Celebration`
              : 'We\'re Getting Married'}
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
          {data.venueName && (
            <p
              className={`mt-2 flex items-center justify-center gap-1.5 font-sans text-sm font-light ${theme.textSecondary}`}
            >
              <MapPin className="h-3.5 w-3.5" />
              {data.venueName}
              {data.venueLocation ? `, ${data.venueLocation}` : ''}
            </p>
          )}

          {/* Countdown */}
          {data.celebrationDate && (
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
      {data.ourStory && (
        <section className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
          <h2
            className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
          >
            Our Story
          </h2>
          <div
            className={`mx-auto mb-6 h-px w-12 ${theme.accent}`}
          />
          <p
            className={`font-sans text-base font-light leading-relaxed whitespace-pre-line ${theme.text}`}
          >
            {data.ourStory}
          </p>
        </section>
      )}

      {/* ── Event Schedule ────────────────────────── */}
      {data.schedule.length > 0 && (
        <section className={`${theme.bgAlt} px-6 py-16 sm:py-20`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              Schedule of Events
            </h2>
            <div
              className={`mx-auto mb-10 h-px w-12 ${theme.accent}`}
            />
            <div className="space-y-0">
              {data.schedule.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative flex items-start gap-6 pb-8 text-left"
                >
                  {/* Timeline line */}
                  {idx < data.schedule.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-8 h-full w-px ${theme.border} border-l`}
                    />
                  )}
                  {/* Dot */}
                  <div
                    className={`relative z-10 mt-1 h-[10px] w-[10px] flex-shrink-0 rounded-full ${theme.accent}`}
                  />
                  <div className="flex-1">
                    <p
                      className={`font-sans text-sm font-medium ${theme.accentText}`}
                    >
                      {formatTime(item.time)}
                    </p>
                    <p
                      className={`font-serif text-xl font-normal ${theme.text}`}
                    >
                      {item.event}
                    </p>
                    {item.location && (
                      <p
                        className={`mt-0.5 flex items-center gap-1 font-sans text-sm font-light ${theme.textSecondary}`}
                      >
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Entourage ─────────────────────────────── */}
      {data.entourage.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              Wedding Party
            </h2>
            <div
              className={`mx-auto mb-10 h-px w-12 ${theme.accent}`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.entourage.map((m) => (
              <div
                key={m.id}
                className={`rounded-lg border ${theme.border} ${theme.card} p-5 text-center`}
              >
                <div
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${theme.accent} text-white font-sans text-sm font-medium`}
                >
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <p className={`font-serif text-lg font-normal ${theme.text}`}>
                  {m.name}
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
      {data.gallery.length > 0 && (
        <section className={`${theme.bgAlt} px-6 py-16 sm:py-20`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              Gallery
            </h2>
            <div
              className={`mx-auto mb-10 h-px w-12 ${theme.accent}`}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.gallery.map((url, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover transition hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP ──────────────────────────────────── */}
      {data.rsvpEnabled && (
        <section className="mx-auto max-w-lg px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2
              className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}
            >
              RSVP
            </h2>
            <div
              className={`mx-auto mb-8 h-px w-12 ${theme.accent}`}
            />
          </div>

          {rsvpSubmitted ? (
            <div className={`rounded-lg border ${theme.border} ${theme.card} p-8 text-center`}>
              <CheckCircle2 className={`mx-auto mb-4 h-10 w-10 ${theme.accentText}`} />
              <p className={`font-serif text-xl ${theme.text}`}>
                Thank you for your response!
              </p>
              <p className={`mt-2 font-sans text-sm font-light ${theme.textSecondary}`}>
                We look forward to celebrating with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className={`w-full rounded border px-4 py-3 font-sans text-sm focus:outline-none transition ${theme.border}`}
                  style={previewInputStyle}
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                />
              </div>
              <div>
                <p className={`mb-2 font-sans text-sm ${theme.text}`}>
                  Will you be attending?
                </p>
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setRsvp({ ...rsvp, attending: opt })}
                      className={`flex-1 rounded border px-4 py-3 font-sans text-sm capitalize transition ${theme.border} ${
                        rsvp.attending === opt
                          ? `${theme.accent} text-white`
                          : ''
                      }`}
                      style={rsvp.attending !== opt ? previewInputStyle : {}}
                    >
                      {opt === 'yes' ? 'Joyfully Accept' : 'Respectfully Decline'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Dietary restrictions (optional)"
                  className={`w-full rounded border px-4 py-3 font-sans text-sm focus:outline-none transition ${theme.border}`}
                  style={previewInputStyle}
                  value={rsvp.dietary}
                  onChange={(e) => setRsvp({ ...rsvp, dietary: e.target.value })}
                />
              </div>
              <div>
                <textarea
                  placeholder="Leave a message for the couple (optional)"
                  className={`w-full rounded border px-4 py-3 font-sans text-sm focus:outline-none transition min-h-[80px] resize-y ${theme.border}`}
                  style={previewInputStyle}
                  value={rsvp.message}
                  onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className={`w-full rounded px-6 py-3 font-sans text-sm font-medium tracking-wide text-white transition ${theme.accent} hover:opacity-90`}
              >
                Send RSVP
              </button>
            </form>
          )}
        </section>
      )}

      {/* ── Footer ────────────────────────────────── */}
      <footer className={`${theme.bgAlt} px-6 py-10 text-center`}>
        {data.hashtag && (
          <p className={`mb-3 font-sans text-lg font-light ${theme.accentText}`}>
            #{data.hashtag}
          </p>
        )}
        <p className={`font-sans text-xs font-light ${theme.textSecondary}`}>
          Made with{' '}
          <span className="font-sans text-xs font-extralight tracking-[0.1em]">
            haraya
          </span>
        </p>
      </footer>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function CoupleWebsite() {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [data, setData] = useState<WebsiteData>(loadData);
  const [copied, setCopied] = useState(false);

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/our-wedding`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ── Toolbar ──────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Left: Title */}
          <div>
            <h1 className="font-serif text-lg font-normal text-text-primary sm:text-xl">
              Your Celebration Website
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded border border-border px-3 py-2 font-sans text-xs font-medium text-text-secondary transition hover:border-text-primary hover:text-text-primary sm:px-4 sm:text-sm"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-accent-success" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share Link</span>
                </>
              )}
            </button>
            <button
              onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
              className="flex items-center gap-1.5 rounded bg-accent-primary px-4 py-2 font-sans text-xs font-medium tracking-wide text-text-on-dark transition hover:bg-accent-primary-hover sm:text-sm"
            >
              {mode === 'edit' ? (
                <>
                  <Eye className="h-4 w-4" />
                  Preview
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" />
                  Edit
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────── */}
      {mode === 'edit' ? (
        <EditMode data={data} onChange={setData} />
      ) : (
        <PreviewMode data={data} />
      )}
    </div>
  );
}
