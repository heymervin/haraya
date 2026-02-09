import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, Instagram, Facebook, CheckCircle2, Calendar, Globe } from 'lucide-react';
import StarRating from '../components/StarRating';
import { getVendorById, getReviewsByVendorId } from '../data/mockVendors';

export default function VendorProfile() {
  const { id } = useParams<{ id: string }>();
  const vendor = id ? getVendorById(id) : undefined;
  const reviews = id ? getReviewsByVendorId(id) : [];

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    celebrationDate: '',
    message: ''
  });

  if (!vendor) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cormorant text-3xl text-text-primary mb-4">Vendor not found</h1>
          <Link to="/vendors" className="text-inabel-indigo hover:text-inabel-red transition-colors">
            Return to vendor directory
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      return num.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };
    return `₱${formatNumber(min)} - ₱${formatNumber(max)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log('Inquiry submitted:', formData);
    alert('Thank you for your inquiry! The vendor will contact you soon.');
    setShowInquiryForm(false);
    setFormData({ name: '', email: '', celebrationDate: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/vendors"
          className="inline-flex items-center gap-2 text-dream-lavender hover:text-[#8169C4] transition-colors font-jost text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2">
            {/* Vendor Logo/Image */}
            <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden mb-6 bg-whisper flex items-center justify-center">
              {vendor.image ? (
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="max-w-full max-h-full object-contain p-12"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-dream-lavender/20 to-twilight-blue/20 flex items-center justify-center">
                  <span className="text-9xl font-serif font-light text-dream-lavender">
                    {vendor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Vendor Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="font-cormorant font-light text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-2">
                    {vendor.name}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <span className="px-3 py-1 bg-dream-lavender text-white text-sm font-medium rounded">
                      {vendor.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {vendor.isVerified && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-twilight-blue text-white text-[11px] font-medium tracking-wide uppercase rounded-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
                {vendor.allCelebrationsWelcome && (
                  <span className="inline-block px-2.5 py-1 bg-dream-lavender text-white text-[11px] font-medium tracking-wide uppercase rounded-sm">
                    All Celebrations Welcome
                  </span>
                )}
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Starting at</p>
                  <p className="font-jost font-semibold text-2xl text-text-primary">
                    ₱{vendor.priceRange.min.toLocaleString('en-PH')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={vendor.rating} size="md" showNumber />
                  <span className="text-text-secondary text-sm">
                    ({vendor.reviewCount} {vendor.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <section className="mb-10">
              <h2 className="font-cormorant font-normal text-2xl sm:text-3xl text-text-primary mb-4">
                About
              </h2>
              <p className="font-jost font-light text-base text-text-primary leading-relaxed">
                {vendor.description}
              </p>
            </section>

            {/* Services Section */}
            <section className="mb-10">
              <h2 className="font-cormorant font-normal text-2xl sm:text-3xl text-text-primary mb-4">
                Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {vendor.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-bg-warm text-text-primary text-sm border border-border rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section className="mb-10">
              <h2 className="font-cormorant font-normal text-2xl sm:text-3xl text-text-primary mb-4">
                Pricing
              </h2>
              <div className="bg-bg-warm border border-border rounded-lg p-6">
                <p className="font-jost font-medium text-xl text-text-primary mb-2">
                  {formatPrice(vendor.priceRange.min, vendor.priceRange.max)}
                </p>
                <p className="font-jost font-light text-sm text-text-secondary">
                  Contact for detailed packages and customized quotes
                </p>
              </div>
            </section>

            {/* Availability Section */}
            <section className="mb-10">
              <h2 className="font-cormorant font-normal text-2xl sm:text-3xl text-text-primary mb-4">
                Availability
              </h2>
              <div className="flex flex-wrap gap-2">
                {vendor.availability.map((month, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-golden-hour/10 text-golden-hour text-sm border border-golden-hour/30 rounded"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {month}
                  </span>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="mb-10">
              <h2 className="font-cormorant font-normal text-2xl sm:text-3xl text-text-primary mb-6">
                Reviews
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-bg-warm border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-jost font-medium text-base text-text-primary">
                            {review.reviewerName}
                          </p>
                          <p className="font-jost text-sm text-text-secondary">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="font-jost font-light text-base text-text-primary leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-jost text-text-secondary">No reviews yet. Be the first to review!</p>
              )}
            </section>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              {/* Contact Card */}
              <div className="bg-bg-primary border border-border rounded-lg p-6 mb-6">
                <h3 className="font-jost font-medium text-lg text-text-primary mb-4">
                  Get in Touch
                </h3>

                {vendor.contactInfo && (
                  <div className="space-y-3 mb-6">
                    {vendor.contactInfo.email && (
                      <a
                        href={`mailto:${vendor.contactInfo.email}`}
                        className="flex items-center gap-2 text-text-secondary hover:text-dream-lavender transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{vendor.contactInfo.email}</span>
                      </a>
                    )}
                    {vendor.contactInfo.phone && (
                      <a
                        href={`tel:${vendor.contactInfo.phone}`}
                        className="flex items-center gap-2 text-text-secondary hover:text-dream-lavender transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{vendor.contactInfo.phone}</span>
                      </a>
                    )}
                    {vendor.contactInfo.website && (
                      <a
                        href={vendor.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-secondary hover:text-dream-lavender transition-colors text-sm"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="truncate">Website</span>
                      </a>
                    )}
                    {vendor.contactInfo.facebook && (
                      <a
                        href={`https://facebook.com/${vendor.contactInfo.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-secondary hover:text-dream-lavender transition-colors text-sm"
                      >
                        <Facebook className="w-4 h-4" />
                        <span>{vendor.contactInfo.facebook}</span>
                      </a>
                    )}
                    {vendor.contactInfo.instagram && (
                      <a
                        href={`https://instagram.com/${vendor.contactInfo.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-secondary hover:text-dream-lavender transition-colors text-sm"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>{vendor.contactInfo.instagram}</span>
                      </a>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="w-full px-6 py-3 bg-dream-lavender text-cloud-white font-jost text-sm tracking-wide rounded hover:bg-[#8169C4] transition-colors"
                >
                  {showInquiryForm ? 'Close Form' : 'Inquire Now'}
                </button>
              </div>

              {/* Inquiry Form */}
              {showInquiryForm && (
                <div className="bg-bg-warm border border-border rounded-lg p-6">
                  <h3 className="font-jost font-medium text-lg text-text-primary mb-4">
                    Send an Inquiry
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary placeholder:text-border focus:outline-none focus:border-dream-lavender transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary placeholder:text-border focus:outline-none focus:border-dream-lavender transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Celebration Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.celebrationDate}
                        onChange={(e) => setFormData({ ...formData, celebrationDate: e.target.value })}
                        className="w-full px-4 py-2 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary focus:outline-none focus:border-dream-lavender transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary placeholder:text-border focus:outline-none focus:border-dream-lavender transition-colors resize-none"
                        placeholder="Tell us about your celebration..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-dream-lavender text-cloud-white font-jost text-sm tracking-wide rounded hover:bg-[#8169C4] transition-colors"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-border p-4 shadow-lg">
        <button
          onClick={() => setShowInquiryForm(!showInquiryForm)}
          className="w-full px-6 py-3.5 bg-dream-lavender text-cloud-white font-jost text-sm tracking-wide rounded hover:bg-[#8169C4] transition-colors"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}
