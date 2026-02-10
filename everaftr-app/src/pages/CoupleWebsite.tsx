import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  Gift,
  Shirt,
  Upload,
  Loader2,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import RsvpDashboard from '../components/CelebrationWebsite/RsvpDashboard';
import PhotoDashboard from '../components/CelebrationWebsite/PhotoDashboard';
import ShareSection from '../components/CelebrationWebsite/ShareSection';

// ─── Types ────────────────────────────────────────────────────

type ColorTheme = 'classic-ivory' | 'modern-blush' | 'garden-green' | 'midnight';
type CeremonyType = 'Catholic' | 'Civil' | 'Civil Union' | 'Muslim' | 'Other';
type TabMode = 'edit' | 'preview' | 'rsvps' | 'photos' | 'share';

const DRESS_CODE_OPTIONS = [
  'Barong Tagalog & Filipiniana',
  'Formal',
  'Semi-Formal',
  'Smart Casual',
  'Casual',
  'No dress code',
] as const;

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

interface GiftInfo {
  enabled: boolean;
  introText: string;
  gcashNumber: string;
  gcashQrUrl: string;
  mayaNumber: string;
  mayaQrUrl: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
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
  dressCode: string;
  guestPhotosEnabled: boolean;
  guestPhotosAutoApprove: boolean;
  giftInfo: GiftInfo;
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
const WEBSITE_ID_KEY = 'haraya-website-id';
const WEBSITE_SLUG_KEY = 'haraya-website-slug';

const uid = () => Math.random().toString(36).slice(2, 9);

function generateSlug(p1: string, p2: string): string {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const base = `${clean(p1)}-and-${clean(p2)}`;
  return base || 'our-celebration';
}

const defaultGiftInfo: GiftInfo = {
  enabled: false,
  introText: 'Your presence is the greatest gift. For those who wish to give, monetary gifts are lovingly appreciated.',
  gcashNumber: '',
  gcashQrUrl: '',
  mayaNumber: '',
  mayaQrUrl: '',
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
};

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
  dressCode: '',
  guestPhotosEnabled: true,
  guestPhotosAutoApprove: true,
  giftInfo: { ...defaultGiftInfo },
};

function loadData(): WebsiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultData,
        ...parsed,
        giftInfo: { ...defaultGiftInfo, ...(parsed.giftInfo || {}) },
      };
    }
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

  const updateGift = <K extends keyof GiftInfo>(key: K, val: GiftInfo[K]) =>
    update('giftInfo', { ...data.giftInfo, [key]: val });

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

  const ToggleSwitch = ({ checked, onChange: onToggle, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <label className="flex cursor-pointer items-center gap-3">
      <div
        className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-accent-primary' : 'bg-border'}`}
        onClick={onToggle}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${checked ? 'left-5' : 'left-0.5'}`}
        />
      </div>
      <span className="font-sans text-sm text-text-primary">{label}</span>
    </label>
  );

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

      {/* Section: Dress Code */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Shirt className="h-5 w-5 text-accent-primary" />
          Dress Code
        </h2>
        <div className="relative">
          <select
            className={`${inputCls} appearance-none pr-10`}
            value={data.dressCode}
            onChange={(e) => update('dressCode', e.target.value)}
          >
            <option value="">No dress code specified</option>
            {DRESS_CODE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
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

      {/* Section: Gift Information */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Gift className="h-5 w-5 text-accent-primary" />
          Gift Information
        </h2>
        <ToggleSwitch
          checked={data.giftInfo.enabled}
          onChange={() => updateGift('enabled', !data.giftInfo.enabled)}
          label="Enable gift section on your website"
        />
        {data.giftInfo.enabled && (
          <div className="space-y-4 rounded-lg border border-border p-5">
            <div>
              <label className={labelCls}>Intro Text</label>
              <textarea
                className={`${inputCls} min-h-[80px] resize-y`}
                value={data.giftInfo.introText}
                onChange={(e) => updateGift('introText', e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>GCash Number</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="09XX XXX XXXX"
                  value={data.giftInfo.gcashNumber}
                  onChange={(e) => updateGift('gcashNumber', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>GCash QR URL (optional)</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="https://..."
                  value={data.giftInfo.gcashQrUrl}
                  onChange={(e) => updateGift('gcashQrUrl', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Maya Number</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="09XX XXX XXXX"
                  value={data.giftInfo.mayaNumber}
                  onChange={(e) => updateGift('mayaNumber', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Maya QR URL (optional)</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="https://..."
                  value={data.giftInfo.mayaQrUrl}
                  onChange={(e) => updateGift('mayaQrUrl', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Bank Name</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="e.g. BDO, BPI"
                  value={data.giftInfo.bankName}
                  onChange={(e) => updateGift('bankName', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Account Name</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Full name on account"
                  value={data.giftInfo.bankAccountName}
                  onChange={(e) => updateGift('bankAccountName', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Account Number</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Account number"
                  value={data.giftInfo.bankAccountNumber}
                  onChange={(e) => updateGift('bankAccountNumber', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section: RSVP */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <CheckCircle2 className="h-5 w-5 text-accent-primary" />
          RSVP
        </h2>
        <ToggleSwitch
          checked={data.rsvpEnabled}
          onChange={() => update('rsvpEnabled', !data.rsvpEnabled)}
          label="Enable RSVP form on your website"
        />
      </section>

      {/* Section: Guest Photos */}
      <section className={sectionCls}>
        <h2 className="flex items-center gap-2 font-serif text-2xl font-light text-text-primary">
          <Camera className="h-5 w-5 text-accent-primary" />
          Guest Photos
        </h2>
        <ToggleSwitch
          checked={data.guestPhotosEnabled}
          onChange={() => update('guestPhotosEnabled', !data.guestPhotosEnabled)}
          label="Let guests upload photos at your celebration"
        />
        {data.guestPhotosEnabled && (
          <ToggleSwitch
            checked={data.guestPhotosAutoApprove}
            onChange={() => update('guestPhotosAutoApprove', !data.guestPhotosAutoApprove)}
            label="Auto-approve uploaded photos"
          />
        )}
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

  const isDark = data.colorTheme === 'midnight';
  const previewInputStyle: React.CSSProperties = isDark
    ? { backgroundColor: '#1A2340', borderColor: '#2A3555', color: '#E8DCC8' }
    : {};

  return (
    <div className={`${theme.bg} min-h-screen`}>
      {/* Hero Section */}
      <section
        className={`relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center ${theme.hero}`}
      >
        {data.coverPhotoUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <img src={data.coverPhotoUrl} alt="" className="h-full w-full object-cover" />
            <div className={`absolute inset-0 ${isDark ? 'bg-[#0F1628]/75' : 'bg-white/60'}`} />
          </div>
        )}
        <div className="relative z-10">
          <p className={`mb-4 font-sans text-xs font-medium uppercase tracking-[0.25em] ${theme.textSecondary}`}>
            {data.ceremonyType ? `${data.ceremonyType} Celebration` : 'We\'re Getting Married'}
          </p>
          <h1 className={`font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.05] ${theme.text}`}>
            {displayNames}
          </h1>
          {formattedDate && (
            <p className={`mt-6 font-sans text-lg font-light tracking-wide ${theme.textSecondary}`}>
              {formattedDate}
            </p>
          )}
          {data.venueName && (
            <p className={`mt-2 flex items-center justify-center gap-1.5 font-sans text-sm font-light ${theme.textSecondary}`}>
              <MapPin className="h-3.5 w-3.5" />
              {data.venueName}{data.venueLocation ? `, ${data.venueLocation}` : ''}
            </p>
          )}
          {data.dressCode && (
            <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-sans text-xs font-medium ${theme.border} ${theme.textSecondary}`}>
              <Shirt className="h-3 w-3" />
              Dress Code: {data.dressCode}
            </p>
          )}
          {data.celebrationDate && (
            <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.minutes, label: 'Min' },
                { val: countdown.seconds, label: 'Sec' },
              ].map((u) => (
                <div key={u.label} className="text-center">
                  <div className={`font-serif text-3xl font-light sm:text-4xl ${theme.text}`}>{u.val}</div>
                  <div className={`font-sans text-[10px] font-medium uppercase tracking-widest ${theme.textSecondary}`}>{u.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Story */}
      {data.ourStory && (
        <section className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
          <h2 className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}>Our Story</h2>
          <div className={`mx-auto mb-6 h-px w-12 ${theme.accent}`} />
          <p className={`font-sans text-base font-light leading-relaxed whitespace-pre-line ${theme.text}`}>{data.ourStory}</p>
        </section>
      )}

      {/* Event Schedule */}
      {data.schedule.length > 0 && (
        <section className={`${theme.bgAlt} px-6 py-16 sm:py-20`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}>Schedule of Events</h2>
            <div className={`mx-auto mb-10 h-px w-12 ${theme.accent}`} />
            <div className="space-y-0">
              {data.schedule.map((item, idx) => (
                <div key={item.id} className="relative flex items-start gap-6 pb-8 text-left">
                  {idx < data.schedule.length - 1 && (
                    <div className={`absolute left-[15px] top-8 h-full w-px ${theme.border} border-l`} />
                  )}
                  <div className={`relative z-10 mt-1 h-[10px] w-[10px] flex-shrink-0 rounded-full ${theme.accent}`} />
                  <div className="flex-1">
                    <p className={`font-sans text-sm font-medium ${theme.accentText}`}>{formatTime(item.time)}</p>
                    <p className={`font-serif text-xl font-normal ${theme.text}`}>{item.event}</p>
                    {item.location && (
                      <p className={`mt-0.5 flex items-center gap-1 font-sans text-sm font-light ${theme.textSecondary}`}>
                        <MapPin className="h-3 w-3" />{item.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Entourage */}
      {data.entourage.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2 className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}>Wedding Party</h2>
            <div className={`mx-auto mb-10 h-px w-12 ${theme.accent}`} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.entourage.map((m) => (
              <div key={m.id} className={`rounded-lg border ${theme.border} ${theme.card} p-5 text-center`}>
                <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${theme.accent} text-white font-sans text-sm font-medium`}>
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <p className={`font-serif text-lg font-normal ${theme.text}`}>{m.name}</p>
                <p className={`font-sans text-xs font-medium uppercase tracking-wider ${theme.textSecondary}`}>{m.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery.length > 0 && (
        <section className={`${theme.bgAlt} px-6 py-16 sm:py-20`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}>Gallery</h2>
            <div className={`mx-auto mb-10 h-px w-12 ${theme.accent}`} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.gallery.map((url, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg">
                  <img src={url} alt="" className="h-full w-full object-cover transition hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gift Information */}
      {data.giftInfo.enabled && (
        <section className="mx-auto max-w-lg px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2 className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}>Gift Information</h2>
            <div className={`mx-auto mb-6 h-px w-12 ${theme.accent}`} />
            <p className={`mb-8 font-sans text-sm font-light leading-relaxed ${theme.text}`}>{data.giftInfo.introText}</p>
          </div>
          <div className="space-y-4">
            {data.giftInfo.gcashNumber && (
              <div className={`rounded-lg border ${theme.border} ${theme.card} p-5`}>
                <p className={`mb-1 font-sans text-xs font-medium uppercase tracking-wider ${theme.textSecondary}`}>GCash</p>
                <p className={`font-sans text-base font-medium ${theme.text}`}>{data.giftInfo.gcashNumber}</p>
                {data.giftInfo.gcashQrUrl && (
                  <img src={data.giftInfo.gcashQrUrl} alt="GCash QR" className="mt-3 mx-auto h-40 w-40 rounded" />
                )}
              </div>
            )}
            {data.giftInfo.mayaNumber && (
              <div className={`rounded-lg border ${theme.border} ${theme.card} p-5`}>
                <p className={`mb-1 font-sans text-xs font-medium uppercase tracking-wider ${theme.textSecondary}`}>Maya</p>
                <p className={`font-sans text-base font-medium ${theme.text}`}>{data.giftInfo.mayaNumber}</p>
                {data.giftInfo.mayaQrUrl && (
                  <img src={data.giftInfo.mayaQrUrl} alt="Maya QR" className="mt-3 mx-auto h-40 w-40 rounded" />
                )}
              </div>
            )}
            {data.giftInfo.bankName && (
              <div className={`rounded-lg border ${theme.border} ${theme.card} p-5`}>
                <p className={`mb-1 font-sans text-xs font-medium uppercase tracking-wider ${theme.textSecondary}`}>Bank Transfer</p>
                <p className={`font-sans text-sm ${theme.text}`}>{data.giftInfo.bankName}</p>
                {data.giftInfo.bankAccountName && (
                  <p className={`font-sans text-base font-medium ${theme.text}`}>{data.giftInfo.bankAccountName}</p>
                )}
                {data.giftInfo.bankAccountNumber && (
                  <p className={`font-mono text-sm ${theme.textSecondary}`}>{data.giftInfo.bankAccountNumber}</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* RSVP */}
      {data.rsvpEnabled && (
        <section className="mx-auto max-w-lg px-6 py-16 sm:py-20">
          <div className="text-center">
            <h2 className={`mb-2 font-sans text-xs font-medium uppercase tracking-[0.2em] ${theme.textSecondary}`}>RSVP</h2>
            <div className={`mx-auto mb-8 h-px w-12 ${theme.accent}`} />
          </div>
          {rsvpSubmitted ? (
            <div className={`rounded-lg border ${theme.border} ${theme.card} p-8 text-center`}>
              <CheckCircle2 className={`mx-auto mb-4 h-10 w-10 ${theme.accentText}`} />
              <p className={`font-serif text-xl ${theme.text}`}>Thank you for your response!</p>
              <p className={`mt-2 font-sans text-sm font-light ${theme.textSecondary}`}>We look forward to celebrating with you.</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <input type="text" required placeholder="Your full name" className={`w-full rounded border px-4 py-3 font-sans text-sm focus:outline-none transition ${theme.border}`} style={previewInputStyle} value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} />
              </div>
              <div>
                <p className={`mb-2 font-sans text-sm ${theme.text}`}>Will you be attending?</p>
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((opt) => (
                    <button key={opt} type="button" onClick={() => setRsvp({ ...rsvp, attending: opt })} className={`flex-1 rounded border px-4 py-3 font-sans text-sm capitalize transition ${theme.border} ${rsvp.attending === opt ? `${theme.accent} text-white` : ''}`} style={rsvp.attending !== opt ? previewInputStyle : {}}>
                      {opt === 'yes' ? 'Joyfully Accept' : 'Respectfully Decline'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <input type="text" placeholder="Dietary restrictions (optional)" className={`w-full rounded border px-4 py-3 font-sans text-sm focus:outline-none transition ${theme.border}`} style={previewInputStyle} value={rsvp.dietary} onChange={(e) => setRsvp({ ...rsvp, dietary: e.target.value })} />
              </div>
              <div>
                <textarea placeholder="Leave a message for the couple (optional)" className={`w-full rounded border px-4 py-3 font-sans text-sm focus:outline-none transition min-h-[80px] resize-y ${theme.border}`} style={previewInputStyle} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} />
              </div>
              <button type="submit" className={`w-full rounded px-6 py-3 font-sans text-sm font-medium tracking-wide text-white transition ${theme.accent} hover:opacity-90`}>
                Send RSVP
              </button>
            </form>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className={`${theme.bgAlt} px-6 py-10 text-center`}>
        {data.hashtag && (
          <p className={`mb-3 font-sans text-lg font-light ${theme.accentText}`}>#{data.hashtag}</p>
        )}
        <p className={`font-sans text-xs font-light ${theme.textSecondary}`}>
          Made with{' '}
          <span className="font-sans text-xs font-extralight tracking-[0.1em]">haraya</span>
        </p>
      </footer>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function CoupleWebsite() {
  const [activeTab, setActiveTab] = useState<TabMode>('edit');
  const [data, setData] = useState<WebsiteData>(loadData);
  const [websiteId, setWebsiteId] = useState<string | null>(() => localStorage.getItem(WEBSITE_ID_KEY));
  const [websiteSlug, setWebsiteSlug] = useState<string | null>(() => localStorage.getItem(WEBSITE_SLUG_KEY));
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handlePublish = useCallback(async () => {
    if (!data.partner1Name || !data.partner2Name) {
      setPublishStatus('error');
      setTimeout(() => setPublishStatus('idle'), 3000);
      return;
    }

    setPublishing(true);
    setPublishStatus('idle');

    try {
      const slug = websiteSlug || generateSlug(data.partner1Name, data.partner2Name);
      // Generate a temporary couple_id for MVP (no auth)
      const mvpCoupleId = '00000000-0000-0000-0000-000000000001';

      const websitePayload = {
        couple_id: mvpCoupleId,
        slug,
        partner1_name: data.partner1Name,
        partner2_name: data.partner2Name,
        celebration_date: data.celebrationDate || null,
        ceremony_type: data.ceremonyType || null,
        venue_name: data.venueName || null,
        venue_location: data.venueLocation || null,
        our_story: data.ourStory || null,
        cover_photo_url: data.coverPhotoUrl || null,
        color_theme: data.colorTheme,
        hashtag: data.hashtag || null,
        dress_code: data.dressCode || null,
        rsvp_enabled: data.rsvpEnabled,
        guest_photos_enabled: data.guestPhotosEnabled,
        guest_photos_auto_approve: data.guestPhotosAutoApprove,
        gift_section_enabled: data.giftInfo.enabled,
        gift_intro_text: data.giftInfo.introText || null,
        gcash_number: data.giftInfo.gcashNumber || null,
        gcash_qr_url: data.giftInfo.gcashQrUrl || null,
        maya_number: data.giftInfo.mayaNumber || null,
        maya_qr_url: data.giftInfo.mayaQrUrl || null,
        bank_name: data.giftInfo.bankName || null,
        bank_account_name: data.giftInfo.bankAccountName || null,
        bank_account_number: data.giftInfo.bankAccountNumber || null,
        is_published: true,
      };

      let savedId = websiteId;

      if (websiteId) {
        // Update existing
        const { error } = await supabase
          .from('celebration_websites')
          .update(websitePayload)
          .eq('id', websiteId);
        if (error) throw error;
      } else {
        // Insert new
        const { data: inserted, error } = await supabase
          .from('celebration_websites')
          .insert(websitePayload)
          .select('id')
          .single();
        if (error) throw error;
        savedId = inserted.id;
        setWebsiteId(savedId);
        localStorage.setItem(WEBSITE_ID_KEY, savedId);
      }

      // Save slug
      setWebsiteSlug(slug);
      localStorage.setItem(WEBSITE_SLUG_KEY, slug);

      // Sync schedule events
      if (savedId) {
        // Delete existing and re-insert
        await supabase.from('website_schedule_events').delete().eq('website_id', savedId);
        if (data.schedule.length > 0) {
          const scheduleRows = data.schedule.map((e, i) => ({
            website_id: savedId,
            event_time: e.time || null,
            event_name: e.event || 'Event',
            event_location: e.location || null,
            sort_order: i,
          }));
          await supabase.from('website_schedule_events').insert(scheduleRows);
        }

        // Sync entourage
        await supabase.from('website_entourage').delete().eq('website_id', savedId);
        if (data.entourage.length > 0) {
          const entourageRows = data.entourage.map((m, i) => ({
            website_id: savedId,
            member_name: m.name || 'Member',
            role: m.role || 'Guest',
            sort_order: i,
          }));
          await supabase.from('website_entourage').insert(entourageRows);
        }

        // Sync gallery
        await supabase.from('website_gallery').delete().eq('website_id', savedId);
        if (data.gallery.length > 0) {
          const galleryRows = data.gallery.map((url, i) => ({
            website_id: savedId,
            photo_url: url,
            sort_order: i,
          }));
          await supabase.from('website_gallery').insert(galleryRows);
        }
      }

      setPublishStatus('success');
      setTimeout(() => setPublishStatus('idle'), 4000);
    } catch {
      setPublishStatus('error');
      setTimeout(() => setPublishStatus('idle'), 4000);
    } finally {
      setPublishing(false);
    }
  }, [data, websiteId, websiteSlug]);

  const handleToggleAutoApprove = useCallback(() => {
    setData((prev) => ({ ...prev, guestPhotosAutoApprove: !prev.guestPhotosAutoApprove }));
  }, []);

  const tabs: { key: TabMode; label: string; icon: React.ReactNode; hideOnMobile?: boolean }[] = [
    { key: 'edit', label: 'Edit', icon: <Pencil className="h-4 w-4" /> },
    { key: 'preview', label: 'Preview', icon: <Eye className="h-4 w-4" /> },
    { key: 'rsvps', label: 'RSVPs', icon: <Users className="h-4 w-4" /> },
    { key: 'photos', label: 'Photos', icon: <Camera className="h-4 w-4" /> },
    { key: 'share', label: 'Share', icon: <Share2 className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            to="/plan"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-primary pt-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Planning Space
          </Link>
          {/* Top row: title + publish */}
          <div className="flex items-center justify-between py-3">
            <div>
              <h1 className="font-serif text-lg font-normal text-text-primary sm:text-xl">
                Your Celebration Website
              </h1>
              {websiteSlug && (
                <p className="flex items-center gap-1 font-sans text-xs text-accent-primary">
                  <Globe className="h-3 w-3" />
                  {window.location.origin}/c/{websiteSlug}
                </p>
              )}
            </div>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className={`flex items-center gap-1.5 rounded px-4 py-2 font-sans text-xs font-medium tracking-wide transition sm:text-sm ${
                publishStatus === 'success'
                  ? 'bg-accent-success text-white'
                  : publishStatus === 'error'
                    ? 'bg-accent-error text-white'
                    : 'bg-accent-primary text-text-on-dark hover:bg-accent-primary-hover'
              }`}
            >
              {publishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : publishStatus === 'success' ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Published!
                </>
              ) : publishStatus === 'error' ? (
                <>
                  <X className="h-4 w-4" />
                  {!data.partner1Name || !data.partner2Name ? 'Add partner names first' : 'Error — try again'}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {websiteId ? 'Update' : 'Publish'}
                </>
              )}
            </button>
          </div>

          {/* Tab bar */}
          <div className="-mb-px flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 font-sans text-xs font-medium transition sm:px-4 sm:text-sm ${
                  activeTab === tab.key
                    ? 'border-accent-primary text-accent-primary'
                    : 'border-transparent text-text-secondary hover:border-border hover:text-text-primary'
                }`}
              >
                {tab.icon}
                <span className={tab.hideOnMobile ? 'hidden sm:inline' : ''}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'edit' && <EditMode data={data} onChange={setData} />}
      {activeTab === 'preview' && <PreviewMode data={data} />}
      {activeTab === 'rsvps' && <RsvpDashboard websiteId={websiteId} />}
      {activeTab === 'photos' && (
        <PhotoDashboard
          websiteId={websiteId}
          autoApprove={data.guestPhotosAutoApprove}
          onToggleAutoApprove={handleToggleAutoApprove}
        />
      )}
      {activeTab === 'share' && (
        <ShareSection
          slug={websiteSlug}
          hashtag={data.hashtag}
          partner1Name={data.partner1Name}
          partner2Name={data.partner2Name}
        />
      )}
    </div>
  );
}
