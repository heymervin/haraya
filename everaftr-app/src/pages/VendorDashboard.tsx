import { useState, useEffect } from 'react';
import {
  Eye,
  MessageSquare,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Globe,
  Music,
  Tag,
  DollarSign,
  Shield,
  Sparkles,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

interface VendorProfile {
  businessName: string;
  category: string;
  location: string;
  description: string;
  priceMin: number;
  priceMax: number;
  tags: string[];
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  website: string;
  availability: string[];
  allCelebrationsWelcome: boolean;
  tier: 'libre' | 'pundar' | 'pangunahin' | 'natatangi';
}

interface Inquiry {
  id: string;
  coupleName: string;
  celebrationDate: string;
  guestCount: number;
  budget: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: string;
}

const CATEGORIES = [
  'Venues', 'Photo & Video', 'Catering', 'Coordination',
  'Flowers & Styling', 'Lights & Sound', 'Hair & Makeup', 'Attire',
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const TIERS = [
  { id: 'libre' as const, name: 'Libre', price: 'Free', color: 'bg-accent-success text-white', desc: 'Basic listing' },
  { id: 'pundar' as const, name: 'Pundar', price: '₱1,499/mo', color: 'bg-inabel-indigo text-white', desc: 'Priority placement' },
  { id: 'pangunahin' as const, name: 'Pangunahin', price: '₱3,999/mo', color: 'bg-inabel-gold text-white', desc: 'Featured vendor' },
  { id: 'natatangi' as const, name: 'Natatangi', price: '₱9,999/mo', color: 'bg-langkit-violet text-white', desc: 'Premium partner' },
];

const MOCK_INQUIRIES: Inquiry[] = [
  { id: 'inq1', coupleName: 'Ria & Marco', celebrationDate: '2026-12-14', guestCount: 200, budget: '₱300,000 - ₱500,000', message: 'Hi! We love your work. We\'re planning a garden ceremony in December. Do you have availability for that date?', status: 'new', createdAt: '2 hours ago' },
  { id: 'inq2', coupleName: 'Jessa & Kim', celebrationDate: '2026-10-25', guestCount: 150, budget: '₱150,000 - ₱250,000', message: 'We\'re interested in your services for our civil ceremony. Can you send us a detailed quotation?', status: 'new', createdAt: '1 day ago' },
  { id: 'inq3', coupleName: 'Aisha & Omar', celebrationDate: '2027-02-14', guestCount: 300, budget: '₱500,000 - ₱1,000,000', message: 'Assalamu alaikum! We are planning a nikah celebration. Do you cater to Muslim weddings?', status: 'read', createdAt: '3 days ago' },
  { id: 'inq4', coupleName: 'Bea & Trish', celebrationDate: '2026-11-08', guestCount: 80, budget: '₱100,000 - ₱150,000', message: 'Hello! We\'re planning an intimate commitment celebration. Would love to discuss options.', status: 'read', createdAt: '5 days ago' },
  { id: 'inq5', coupleName: 'Paolo & Camille', celebrationDate: '2026-09-20', guestCount: 250, budget: '₱400,000 - ₱600,000', message: 'We saw your profile and we\'re very impressed! Is September still available?', status: 'responded', createdAt: '1 week ago' },
  { id: 'inq6', coupleName: 'Jaime & Liza', celebrationDate: '2027-01-18', guestCount: 180, budget: '₱200,000 - ₱350,000', message: 'We\'re having a church wedding followed by a garden reception. Can you accommodate both setups?', status: 'responded', createdAt: '2 weeks ago' },
];

const STORAGE_KEY = 'haraya-vendor-dashboard';

export default function VendorDashboard() {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'inquiries'>('overview');
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Onboarding form state
  const [form, setForm] = useState<VendorProfile>({
    businessName: '', category: 'Venues', location: '', description: '',
    priceMin: 0, priceMax: 0, tags: [], email: '', phone: '',
    instagram: '', facebook: '', tiktok: '', website: '',
    availability: [], allCelebrationsWelcome: true, tier: 'libre',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProfile(data.profile);
        if (data.inquiries) setInquiries(data.inquiries);
      } catch { /* ignore */ }
    }
  }, []);

  const saveToStorage = (prof: VendorProfile, inqs: Inquiry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile: prof, inquiries: inqs }));
  };

  const completeOnboarding = () => {
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    const newProfile = { ...form, tags };
    setProfile(newProfile);
    saveToStorage(newProfile, inquiries);
  };

  const updateProfile = (updates: Partial<VendorProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    setProfile(updated);
    saveToStorage(updated, inquiries);
  };

  const updateInquiryStatus = (id: string, status: 'read' | 'responded') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    setInquiries(updated);
    if (profile) saveToStorage(profile, updated);
  };

  const toggleMonth = (month: string) => {
    setForm(prev => ({
      ...prev,
      availability: prev.availability.includes(month)
        ? prev.availability.filter(m => m !== month)
        : [...prev.availability, month],
    }));
  };

  const formatPeso = (n: number) => `₱${n.toLocaleString('en-PH')}`;

  const tierInfo = TIERS.find(t => t.id === (profile?.tier || 'libre')) || TIERS[0];

  // Onboarding
  if (!profile) {
    return (
      <div className="min-h-screen bg-bg-primary pattern-inabel">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl font-light text-text-primary mb-3">Claim Your Listing</h1>
            <p className="font-sans text-text-secondary">Join the Philippines' most inclusive wedding vendor platform</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm font-medium transition-colors ${
                  step === onboardingStep ? 'bg-inabel-indigo text-white' :
                  step < onboardingStep ? 'bg-accent-success text-white' : 'bg-pina-cream text-text-secondary'
                }`}>
                  {step < onboardingStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && <div className={`w-8 h-0.5 mx-1 ${step < onboardingStep ? 'bg-accent-success' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-bg-primary border border-border rounded-lg p-6 md:p-8">
            {onboardingStep === 1 && (
              <div className="space-y-5">
                <h2 className="font-sans text-xl font-medium text-text-primary mb-6">Business Details</h2>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Business Name</label>
                  <input type="text" value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="Your business name" />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Location</label>
                  <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="e.g., Makati, Metro Manila" />
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-5">
                <h2 className="font-sans text-xl font-medium text-text-primary mb-6">Describe Your Services</h2>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo resize-none" placeholder="Tell couples about your services..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Min Price (₱)</label>
                    <input type="number" inputMode="decimal" value={form.priceMin || ''} onChange={e => setForm({ ...form, priceMin: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="50,000" />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Max Price (₱)</label>
                    <input type="number" inputMode="decimal" value={form.priceMax || ''} onChange={e => setForm({ ...form, priceMax: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="200,000" />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Tags (comma-separated)</label>
                  <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="Garden, Outdoor, Intimate, Luxury" />
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-5">
                <h2 className="font-sans text-xl font-medium text-text-primary mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Mail className="w-4 h-4" /> Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Phone className="w-4 h-4" /> Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Instagram className="w-4 h-4" /> Instagram</label>
                    <input type="text" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="@yourbrand" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Facebook className="w-4 h-4" /> Facebook</label>
                    <input type="text" value={form.facebook} onChange={e => setForm({ ...form, facebook: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Music className="w-4 h-4" /> TikTok</label>
                    <input type="text" value={form.tiktok} onChange={e => setForm({ ...form, tiktok: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" placeholder="@yourbrand" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Globe className="w-4 h-4" /> Website</label>
                    <input type="url" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 4 && (
              <div className="space-y-6">
                <h2 className="font-sans text-xl font-medium text-text-primary mb-6">Availability & Preferences</h2>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-3">Available Months</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {MONTHS.map(month => (
                      <button key={month} onClick={() => toggleMonth(month)}
                        className={`px-3 py-2.5 rounded-lg font-sans text-sm transition-colors ${
                          form.availability.includes(month) ? 'bg-inabel-indigo text-white' : 'bg-pina-cream text-text-primary hover:bg-pina-sheen'
                        }`}>
                        {month.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-3 p-4 bg-pina-cream rounded-lg cursor-pointer">
                  <input type="checkbox" checked={form.allCelebrationsWelcome}
                    onChange={e => setForm({ ...form, allCelebrationsWelcome: e.target.checked })}
                    className="w-5 h-5 accent-langkit-violet" />
                  <div>
                    <span className="font-sans text-sm font-medium text-text-primary">All Celebrations Welcome</span>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">Signal that you welcome all ceremony types and couples</p>
                  </div>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {onboardingStep > 1 ? (
                <button onClick={() => setOnboardingStep(s => s - 1)}
                  className="flex items-center gap-1 px-5 py-2.5 font-sans text-sm text-text-secondary hover:text-text-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}
              {onboardingStep < 4 ? (
                <button onClick={() => setOnboardingStep(s => s + 1)}
                  className="flex items-center gap-1 px-6 py-2.5 bg-inabel-indigo text-white font-sans text-sm rounded-lg hover:opacity-90 transition-opacity">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={completeOnboarding}
                  className="flex items-center gap-2 px-6 py-2.5 bg-accent-primary text-text-on-dark font-sans text-sm rounded-lg hover:bg-accent-primary-hover transition-colors">
                  <Check className="w-4 h-4" /> Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-bg-primary pattern-inabel">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-text-primary">{profile.businessName}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-sans text-sm text-text-secondary">{profile.category}</span>
              <span className={`px-3 py-1 rounded-full font-sans text-xs font-medium ${tierInfo.color}`}>{tierInfo.name}</span>
            </div>
          </div>
          <button onClick={() => setShowUpgrade(!showUpgrade)}
            className="flex items-center gap-2 px-5 py-2.5 bg-inabel-gold text-white font-sans text-sm rounded-lg hover:opacity-90 transition-opacity">
            <Sparkles className="w-4 h-4" /> Upgrade Plan
          </button>
        </div>

        {/* Upgrade Modal */}
        {showUpgrade && (
          <div className="mb-8 bg-bg-primary border border-border rounded-lg p-6">
            <h3 className="font-sans text-lg font-medium text-text-primary mb-4">Choose Your Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIERS.map(tier => (
                <button key={tier.id} onClick={() => { updateProfile({ tier: tier.id }); setShowUpgrade(false); }}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    profile.tier === tier.id ? 'border-inabel-indigo bg-inabel-cream' : 'border-border hover:border-inabel-indigo'
                  }`}>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium mb-2 ${tier.color}`}>{tier.name}</span>
                  <p className="font-sans text-lg font-medium text-text-primary">{tier.price}</p>
                  <p className="font-sans text-xs text-text-secondary mt-1">{tier.desc}</p>
                  {profile.tier === tier.id && <p className="font-sans text-xs text-inabel-indigo font-medium mt-2">Current plan</p>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-pina-cream rounded-lg p-1 mb-8 w-fit">
          {(['overview', 'profile', 'inquiries'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-md font-sans text-sm font-medium transition-colors capitalize ${
                activeTab === tab ? 'bg-bg-primary text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Eye, label: 'Profile Views', value: '247', change: '+12%', color: 'text-inabel-indigo' },
                { icon: MessageSquare, label: 'Inquiries', value: '8', change: '+3 new', color: 'text-accent-primary' },
                { icon: Star, label: 'Average Rating', value: '4.7', change: '/ 5.0', color: 'text-inabel-gold' },
                { icon: Clock, label: 'Response Rate', value: '92%', change: 'within 24hrs', color: 'text-accent-success' },
              ].map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-bg-primary border border-border rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="font-sans text-xs text-text-secondary uppercase tracking-wide">{stat.label}</span>
                    </div>
                    <p className="font-serif text-3xl font-normal text-text-primary">{stat.value}</p>
                    <p className="font-sans text-xs text-text-secondary mt-1">{stat.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Activity Chart Placeholder */}
            <div className="bg-bg-primary border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-inabel-indigo" />
                <h3 className="font-sans text-base font-medium text-text-primary">Views Over Time</h3>
              </div>
              <div className="h-40 flex items-end gap-2 px-4">
                {[35, 42, 28, 55, 48, 62, 71, 58, 65, 80, 72, 90].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-inabel-indigo/20 rounded-t" style={{ height: `${val}%` }}>
                      <div className="w-full bg-inabel-indigo rounded-t transition-all" style={{ height: `${Math.min(val + 10, 100)}%` }} />
                    </div>
                    <span className="font-sans text-[10px] text-text-secondary">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Inquiries Preview */}
            <div className="bg-bg-primary border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent-primary" />
                  <h3 className="font-sans text-base font-medium text-text-primary">Recent Inquiries</h3>
                </div>
                <button onClick={() => setActiveTab('inquiries')} className="font-sans text-sm text-inabel-indigo hover:underline">View all</button>
              </div>
              {inquiries.slice(0, 3).map(inq => (
                <div key={inq.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-sans text-sm font-medium text-text-primary">{inq.coupleName}</p>
                    <p className="font-sans text-xs text-text-secondary">{inq.celebrationDate} &middot; {inq.guestCount} guests</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-sans text-xs font-medium ${
                    inq.status === 'new' ? 'bg-inabel-indigo/10 text-inabel-indigo' :
                    inq.status === 'read' ? 'bg-inabel-gold/10 text-inabel-gold' : 'bg-accent-success/10 text-accent-success'
                  }`}>{inq.status === 'new' ? 'New' : inq.status === 'read' ? 'Read' : 'Responded'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h3 className="font-sans text-lg font-medium text-text-primary">Edit Profile</h3>
              <div>
                <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Building2 className="w-4 h-4" /> Business Name</label>
                <input type="text" value={profile.businessName} onChange={e => updateProfile({ businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
              </div>
              <div>
                <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><Tag className="w-4 h-4" /> Category</label>
                <select value={profile.category} onChange={e => updateProfile({ category: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><MapPin className="w-4 h-4" /> Location</label>
                <input type="text" value={profile.location} onChange={e => updateProfile({ location: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Description</label>
                <textarea value={profile.description} onChange={e => updateProfile({ description: e.target.value })} rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 font-sans text-sm font-medium text-text-secondary mb-1.5"><DollarSign className="w-4 h-4" /> Min Price</label>
                  <input type="number" inputMode="decimal" value={profile.priceMin || ''} onChange={e => updateProfile({ priceMin: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
                </div>
                <div>
                  <label className="block font-sans text-sm font-medium text-text-secondary mb-1.5">Max Price</label>
                  <input type="number" inputMode="decimal" value={profile.priceMax || ''} onChange={e => updateProfile({ priceMax: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-border rounded-lg font-sans text-base text-text-primary bg-bg-primary focus:outline-none focus:border-inabel-indigo" />
                </div>
              </div>
              <label className="flex items-center gap-3 p-4 bg-pina-cream rounded-lg cursor-pointer">
                <input type="checkbox" checked={profile.allCelebrationsWelcome}
                  onChange={e => updateProfile({ allCelebrationsWelcome: e.target.checked })}
                  className="w-5 h-5 accent-langkit-violet" />
                <div>
                  <span className="font-sans text-sm font-medium text-text-primary flex items-center gap-1.5"><Shield className="w-4 h-4 text-langkit-violet" /> All Celebrations Welcome</span>
                </div>
              </label>
            </div>

            {/* Profile Preview */}
            <div>
              <h3 className="font-sans text-lg font-medium text-text-primary mb-4">Preview</h3>
              <div className="bg-bg-primary border border-border rounded-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-inabel-indigo to-inabel-gold" />
                <div className="p-6">
                  <h4 className="font-sans text-xl font-medium text-text-primary">{profile.businessName || 'Your Business'}</h4>
                  <p className="font-sans text-sm text-text-secondary mt-1">{profile.category} &middot; {profile.location || 'Location'}</p>
                  <p className="font-sans text-sm text-text-primary mt-3">{profile.description || 'Add a description...'}</p>
                  <p className="font-sans text-base font-medium text-text-primary mt-3">
                    {formatPeso(profile.priceMin)} - {formatPeso(profile.priceMax)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {profile.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-pina-cream text-text-secondary text-xs rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {profile.allCelebrationsWelcome && (
                      <span className="px-2.5 py-1 bg-langkit-violet text-white text-xs font-medium rounded">All Celebrations Welcome</span>
                    )}
                    <span className={`px-2.5 py-1 text-xs font-medium rounded ${tierInfo.color}`}>{tierInfo.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-sans text-lg font-medium text-text-primary">
                Inquiries <span className="text-text-secondary font-normal">({inquiries.filter(i => i.status === 'new').length} new)</span>
              </h3>
            </div>
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-bg-primary border border-border rounded-lg p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-sans text-base font-medium text-text-primary">{inq.coupleName}</h4>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">{inq.createdAt}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-sans text-xs font-medium w-fit ${
                    inq.status === 'new' ? 'bg-inabel-indigo/10 text-inabel-indigo' :
                    inq.status === 'read' ? 'bg-inabel-gold/10 text-inabel-gold' : 'bg-accent-success/10 text-accent-success'
                  }`}>{inq.status === 'new' ? 'New' : inq.status === 'read' ? 'Read' : 'Responded'}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3">
                  <span>Date: {inq.celebrationDate}</span>
                  <span>Guests: {inq.guestCount}</span>
                  <span>Budget: {inq.budget}</span>
                </div>
                <p className="font-sans text-sm text-text-primary leading-relaxed mb-4">{inq.message}</p>
                <div className="flex gap-2">
                  {inq.status === 'new' && (
                    <button onClick={() => updateInquiryStatus(inq.id, 'read')}
                      className="px-4 py-2 bg-pina-cream text-text-primary font-sans text-sm rounded-lg hover:bg-pina-sheen transition-colors">
                      Mark as Read
                    </button>
                  )}
                  {inq.status !== 'responded' && (
                    <button onClick={() => updateInquiryStatus(inq.id, 'responded')}
                      className="px-4 py-2 bg-accent-primary text-text-on-dark font-sans text-sm rounded-lg hover:bg-accent-primary-hover transition-colors">
                      Mark as Responded
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
