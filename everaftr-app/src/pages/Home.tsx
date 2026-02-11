import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ClipboardList,
  Heart,
  Camera,
  Utensils,
  Users,
  Flower2,
  Lightbulb,
  Building2,
  Sparkles,
  Shield,
  Star,
  Globe,
  MessageCircle,
  BookHeart,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import VendorCard from '../components/VendorCard';
import { fetchFeaturedVendors } from '../lib/vendors';
import type { Vendor } from '../types';

export default function Home() {
  const [featuredVendors, setFeaturedVendors] = useState<Vendor[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchFeaturedVendors(6).then((vendors) => {
      if (!cancelled) { setFeaturedVendors(vendors); setLoadingVendors(false); }
    });
    return () => { cancelled = true; };
  }, []);

  const categories = [
    { icon: Building2, name: 'Venues', description: 'Garden venues, ballrooms, beach resorts, and celebration spaces', slug: 'venues' },
    { icon: Camera, name: 'Photo & Video', description: 'Photographers, videographers, and same-day edit specialists', slug: 'photo-video' },
    { icon: Utensils, name: 'Catering', description: 'Full catering services, grazing tables, and food stations', slug: 'catering' },
    { icon: Users, name: 'Coordination', description: 'Wedding planners and day-of coordinators', slug: 'coordination' },
    { icon: Flower2, name: 'Flowers & Styling', description: 'Floral arrangements, event styling, and decor', slug: 'flowers-styling' },
    { icon: Sparkles, name: 'Hair & Makeup', description: 'Makeup artists, hair stylists, and bridal beauty services', slug: 'hair-makeup' },
    { icon: Lightbulb, name: 'Lights & Sound', description: 'Audio systems, lighting design, and technical production', slug: 'lights-sound' },
    { icon: Heart, name: 'Attire & Design', description: 'Gowns, barong, suits, and celebration attire', slug: 'attire-design' },
  ];

  const features = [
    { icon: Heart, title: 'Filipino-First', description: 'We understand ninongs, Pre-Cana, CENOMAR, and lechon debates. This is wedding planning that actually speaks your language.' },
    { icon: Globe, title: 'Every Couple Welcome', description: 'Church wedding, civil ceremony, Muslim nikah, or intimate celebration — whatever your love story looks like, we\'re here for it.' },
    { icon: Shield, title: 'Trusted Wedding Vendors', description: 'Real reviews from real couples. Verified vendors with transparent pricing. No more scam anxiety from random Facebook pages.' },
    { icon: Star, title: 'Your Wedding, Your Way', description: 'Customize everything — your labels, your roles, your timeline. We adapt to how you plan, not the other way around.' },
  ];

  const stats = [
    { value: '300+', label: 'Wedding Vendors' },
    { value: '8', label: 'Vendor Categories' },
    { value: '100%', label: 'Free for Couples' },
  ];

  return (
    <div className="min-h-screen bg-cloud-white">
      {/* Hero Section */}
      <section className="bg-cloud-white py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.1] text-text-primary">
              The best way to plan a Filipino wedding
            </h1>
            <p className="mt-6 font-serif text-[clamp(1.125rem,2.5vw,1.375rem)] italic leading-[1.3] text-dream-lavender">
              where dreams take shape
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
              Find trusted wedding vendors, track your budget, manage your guest list, and plan your
              dream wedding — your way. Built for every Filipino couple.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/vendors"
                className="w-full rounded bg-dream-lavender px-8 py-3 text-center font-sans text-sm tracking-wide text-cloud-white transition hover:bg-[#8169C4] sm:w-auto"
              >
                Find Vendors
              </Link>
              <Link
                to="/plan"
                className="w-full rounded border border-border-whisper bg-transparent px-8 py-3 text-center font-sans text-sm tracking-wide text-text-primary transition hover:border-text-primary sm:w-auto"
              >
                Start Planning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-pearl py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Plan your wedding in three simple steps
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="group rounded-lg border border-whisper bg-pearl p-8 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                <Search className="h-6 w-6 text-dream-lavender" />
              </div>
              <h3 className="mb-3 font-sans text-xl font-medium text-text-primary">Discover Vendors</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                Browse wedding vendors verified by real couples. Filter by location, budget, and style.
              </p>
            </div>
            <div className="group rounded-lg border border-whisper bg-pearl p-8 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                <ClipboardList className="h-6 w-6 text-dream-lavender" />
              </div>
              <h3 className="mb-3 font-sans text-xl font-medium text-text-primary">Plan Together</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                Track your wedding budget, manage your checklist, and coordinate everything in one place.
              </p>
            </div>
            <div className="group rounded-lg border border-whisper bg-pearl p-8 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                <Heart className="h-6 w-6 text-dream-lavender" />
              </div>
              <h3 className="mb-3 font-sans text-xl font-medium text-text-primary">Celebrate Your Way</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                Whether it's a church wedding, civil ceremony, or commitment celebration — we're here for every love story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="bg-cloud-white py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
              Featured Vendors
            </h2>
            <Link to="/vendors" className="flex items-center gap-1.5 font-sans text-sm text-dream-lavender hover:text-[#8169C4] transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loadingVendors ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-dream-lavender" />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="bg-pearl py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Find the right team for your wedding
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/vendors?category=${category.slug}`}
                  className="group rounded-lg border border-whisper bg-pearl p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded bg-[rgba(157,139,216,0.1)]">
                    <Icon className="h-5 w-5 text-dream-lavender" />
                  </div>
                  <h3 className="mb-2 font-sans text-lg font-medium text-text-primary">{category.name}</h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why haraya */}
      <section className="bg-cloud-white py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Built different. Built Filipino.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="rounded-lg border border-whisper bg-pearl p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                    <Icon className="h-6 w-6 text-dream-lavender" />
                  </div>
                  <h3 className="mb-3 font-sans text-xl font-medium text-text-primary">{feature.title}</h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore More - Community & Celebrations CTAs */}
      <section className="bg-pearl py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/celebrations" className="group rounded-lg border border-whisper bg-gradient-to-br from-dream-lavender/5 to-twilight-blue/5 p-8 transition hover:-translate-y-0.5 hover:shadow-lg">
              <BookHeart className="h-10 w-10 text-dream-lavender mb-4" />
              <h3 className="font-serif text-2xl font-normal text-text-primary mb-2">Real Celebrations</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-text-secondary mb-4">
                Be inspired by real Filipino love stories — from intimate civil ceremonies to grand church weddings.
              </p>
              <span className="flex items-center gap-1.5 font-sans text-sm text-dream-lavender group-hover:text-[#8169C4] transition-colors">
                Read their stories <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link to="/community" className="group rounded-lg border border-whisper bg-gradient-to-br from-twilight-blue/5 to-sunset-blush/5 p-8 transition hover:-translate-y-0.5 hover:shadow-lg">
              <MessageCircle className="h-10 w-10 text-twilight-blue mb-4" />
              <h3 className="font-serif text-2xl font-normal text-text-primary mb-2">Join the Community</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-text-secondary mb-4">
                Get advice from real couples, share vendor reviews, and discuss everything from lechon suppliers to guest list politics.
              </p>
              <span className="flex items-center gap-1.5 font-sans text-sm text-twilight-blue transition-colors">
                Start a discussion <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Matchmaker CTA Banner */}
      <section className="bg-gradient-to-r from-cloud-white to-whisper py-16 px-6 md:py-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-dream-lavender" />
          <h2 className="font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
            Take our 2-minute matchmaker quiz and we'll recommend the perfect wedding vendors for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/matchmaker"
              className="rounded bg-dream-lavender px-8 py-3 font-sans text-sm tracking-wide text-cloud-white transition hover:bg-[#8169C4]"
            >
              Start the Quiz
            </Link>
            <Link
              to="/kasa"
              className="rounded border border-whisper px-8 py-3 font-sans text-sm tracking-wide text-text-primary transition hover:border-text-primary"
            >
              Ask Kasa
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="bg-pearl py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-serif text-[clamp(1.5rem,3.5vw,2rem)] font-normal leading-[1.2] text-text-primary">
            The Philippines' wedding vendor network
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg border border-whisper bg-pearl p-8 text-center">
                <div className="font-serif text-4xl font-normal text-dream-lavender md:text-5xl">{stat.value}</div>
                <div className="mt-2 font-sans text-sm font-light uppercase tracking-wider text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
