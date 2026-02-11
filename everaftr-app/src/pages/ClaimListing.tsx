import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { fetchVendorBySlug } from '../lib/vendors';
import { supabase } from '../lib/supabase';
import type { Vendor } from '../types';

const ROLE_OPTIONS = ['Owner', 'Manager', 'Marketing Representative', 'Other'];

export default function ClaimListing() {
  const { slug } = useParams<{ slug: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loadingVendor, setLoadingVendor] = useState(true);

  useEffect(() => {
    if (!slug) { setLoadingVendor(false); return; }
    let cancelled = false;
    fetchVendorBySlug(slug).then((v) => {
      if (!cancelled) { setVendor(v); setLoadingVendor(false); }
    });
    return () => { cancelled = true; };
  }, [slug]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'duplicate'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset on slug change
  useEffect(() => {
    setStatus('idle');
    setErrorMessage('');
  }, [slug]);

  if (loadingVendor) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-dream-lavender" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-text-primary mb-4">Listing not found</h1>
          <Link to="/vendors" className="text-dream-lavender hover:text-[#8169C4] transition-colors">
            Return to vendor directory
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Check for existing pending claim by same email + vendor
      const { data: existing } = await supabase
        .from('vendor_claims')
        .select('id')
        .eq('vendor_slug', vendor.id)
        .eq('claimant_email', form.email)
        .eq('status', 'pending')
        .limit(1);

      if (existing && existing.length > 0) {
        setStatus('duplicate');
        return;
      }

      // Look up vendor UUID from Supabase
      const { data: vendorRow, error: lookupError } = await supabase
        .from('vendors')
        .select('id')
        .eq('slug', vendor.id)
        .single();

      if (lookupError || !vendorRow) {
        throw new Error('Could not find vendor in database');
      }

      // Insert claim
      const { error: insertError } = await supabase
        .from('vendor_claims')
        .insert({
          vendor_id: vendorRow.id,
          vendor_slug: vendor.id,
          claimant_name: form.name,
          claimant_email: form.email,
          claimant_phone: form.phone || null,
          claimant_role: form.role || null,
          message: form.message || null,
        });

      if (insertError) throw insertError;

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-bg-primary border border-border rounded-md font-sans text-sm text-text-primary placeholder:text-dusk-gray focus:outline-none focus:border-dream-lavender focus:ring-1 focus:ring-dream-lavender/30 transition-colors';

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Back link */}
        <Link
          to={`/vendors/${vendor.id}`}
          className="inline-flex items-center gap-2 text-dream-lavender hover:text-[#8169C4] transition-colors font-sans text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {vendor.name}
        </Link>

        {/* Vendor info header */}
        <div className="bg-whisper border border-border rounded-lg p-6 mb-8">
          <p className="text-xs uppercase tracking-wider text-dusk-gray mb-2">Claiming listing for</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-text-primary mb-2">{vendor.name}</h1>
          <div className="flex items-center gap-3 flex-wrap text-sm text-text-secondary">
            <span className="px-2.5 py-0.5 bg-dream-lavender/15 text-dream-lavender rounded text-xs font-medium">
              {vendor.category}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {vendor.location}
            </span>
          </div>
        </div>

        {/* Success state */}
        {status === 'success' && (
          <div className="bg-twilight-blue/10 border border-twilight-blue/30 rounded-lg p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-twilight-blue mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-text-primary mb-3">Claim Submitted</h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto mb-6">
              Thank you! We'll review your claim and get back to you within 48 hours.
              Check your email at <strong>{form.email}</strong> for updates.
            </p>
            <Link
              to={`/vendors/${vendor.id}`}
              className="inline-flex px-6 py-2.5 bg-dream-lavender text-white font-sans text-sm rounded hover:bg-[#8169C4] transition-colors"
            >
              Return to Listing
            </Link>
          </div>
        )}

        {/* Duplicate state */}
        {status === 'duplicate' && (
          <div className="bg-golden-hour/10 border border-golden-hour/30 rounded-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 text-golden-hour mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-text-primary mb-3">Claim Already Pending</h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto mb-6">
              A claim for this listing is already pending review for <strong>{form.email}</strong>.
              We'll reach out when our review is complete.
            </p>
            <Link
              to={`/vendors/${vendor.id}`}
              className="inline-flex px-6 py-2.5 bg-dream-lavender text-white font-sans text-sm rounded hover:bg-[#8169C4] transition-colors"
            >
              Return to Listing
            </Link>
          </div>
        )}

        {/* Form */}
        {status !== 'success' && status !== 'duplicate' && (
          <>
            <h2 className="font-serif text-2xl text-text-primary mb-2">Claim This Listing</h2>
            <p className="text-text-secondary text-sm mb-6">
              If this is your business, fill out the form below and our team will verify your ownership.
            </p>

            {status === 'error' && (
              <div className="bg-accent-error/10 border border-accent-error/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent-error shrink-0 mt-0.5" />
                <p className="text-sm text-text-primary">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Your Name <span className="text-accent-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Email <span className="text-accent-error">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@business.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="09XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Your Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select your role</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us how you're connected to this business..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-6 py-3 bg-dream-lavender text-white font-sans text-sm tracking-wide rounded hover:bg-[#8169C4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Claim Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
