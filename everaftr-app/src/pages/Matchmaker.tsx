import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Church,
  Sparkles,
  Flower2,
  PartyPopper,
  Users,
  MapPin,
  Camera,
  Utensils,
  Palette,
  ClipboardCheck,
  Share2,
  Facebook,
  Copy,
  CheckCircle2,
} from 'lucide-react';

// Types
type CelebrationStyle = 'classic' | 'modern' | 'garden' | 'bold';
type GuestCount = 'intimate' | 'medium' | 'large' | 'grand';
type BudgetRange = '100-300k' | '300-500k' | '500k-1m' | '1m+';
type Location =
  | 'metro-manila'
  | 'tagaytay-cavite'
  | 'cebu'
  | 'pampanga'
  | 'iloilo-visayas'
  | 'other';
type Priority = 'photos' | 'food' | 'styling' | 'coordination';

interface QuizAnswers {
  style?: CelebrationStyle;
  guestCount?: GuestCount;
  budget?: BudgetRange;
  location?: Location;
  priority?: Priority;
}

interface VendorRecommendation {
  id: string;
  name: string;
  category: string;
  location: string;
  priceRange: string;
  description: string;
}

export default function Matchmaker() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  // Save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('matchmaker-results', JSON.stringify(answers));
    }
  }, [answers]);

  // Load previous results if available
  useEffect(() => {
    const saved = localStorage.getItem('matchmaker-results');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    localStorage.removeItem('matchmaker-results');
  };

  const copyLink = () => {
    const url = window.location.origin + '/matchmaker';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock vendor data - filter based on answers
  const getRecommendedVendors = (): VendorRecommendation[] => {
    const allVendors: VendorRecommendation[] = [
      {
        id: '1',
        name: 'Villa Hermosa',
        category: 'Venue',
        location: 'Tagaytay',
        priceRange: '₱80,000 - 150,000',
        description: 'Elegant garden estate with stunning Taal Lake views',
      },
      {
        id: '2',
        name: 'The Glass Garden',
        category: 'Venue',
        location: 'Tagaytay',
        priceRange: '₱120,000 - 200,000',
        description: 'Modern glass pavilion surrounded by lush gardens',
      },
      {
        id: '3',
        name: 'Moments by JC',
        category: 'Photography & Video',
        location: 'Metro Manila',
        priceRange: '₱60,000 - 120,000',
        description: 'Cinematic storytelling that captures authentic emotions',
      },
      {
        id: '4',
        name: 'Chef Marga Catering',
        category: 'Catering',
        location: 'Metro Manila',
        priceRange: '₱550 - 750 per head',
        description: 'Farm-to-table Filipino fusion cuisine',
      },
      {
        id: '5',
        name: 'Blooms & Co.',
        category: 'Flowers & Styling',
        location: 'Metro Manila',
        priceRange: '₱45,000 - 100,000',
        description: 'Organic, garden-inspired floral designs',
      },
      {
        id: '6',
        name: 'Ever After Events',
        category: 'Coordination',
        location: 'Nationwide',
        priceRange: '₱35,000 - 80,000',
        description: 'Full-service coordination with stress-free planning',
      },
    ];

    // Simple filtering logic based on location and priority
    return allVendors
      .filter((vendor) => {
        if (
          answers.location === 'tagaytay-cavite' &&
          vendor.location === 'Tagaytay'
        )
          return true;
        if (
          answers.location === 'metro-manila' &&
          vendor.location === 'Metro Manila'
        )
          return true;
        if (vendor.location === 'Nationwide') return true;
        return false;
      })
      .slice(0, 4);
  };

  // Get personalized tip based on answers
  const getPersonalizedTip = (): string => {
    if (answers.location === 'tagaytay-cavite' && answers.style === 'garden') {
      return 'For garden weddings in Tagaytay, book your venue 12+ months ahead — the most popular spots fill up fast!';
    }
    if (answers.budget === '100-300k') {
      return 'Budget-friendly tip: Consider off-peak months (July-September) for better vendor availability and pricing.';
    }
    if (answers.priority === 'photos') {
      return 'Pro tip: Allocate 15-20% of your budget to photography & video — these memories last forever.';
    }
    if (answers.guestCount === 'intimate') {
      return 'Intimate weddings give you more budget flexibility for premium experiences and personalized touches.';
    }
    if (answers.style === 'classic') {
      return 'For classic elegance, focus on timeless details: fresh flowers, candlelight, and quality linens make all the difference.';
    }
    return 'Start wedding planning 9-12 months ahead to secure your dream vendors and get the best availability.';
  };

  // Get style label
  const getStyleLabel = (style?: CelebrationStyle): string => {
    const labels = {
      classic: 'Classic & Elegant',
      modern: 'Modern & Minimal',
      garden: 'Garden & Rustic',
      bold: 'Bold & Festive',
    };
    return style ? labels[style] : '';
  };

  const getGuestCountLabel = (count?: GuestCount): string => {
    const labels = {
      intimate: 'under 50 guests',
      medium: '50-150 guests',
      large: '150-300 guests',
      grand: '300+ guests',
    };
    return count ? labels[count] : '';
  };

  const getLocationLabel = (location?: Location): string => {
    const labels = {
      'metro-manila': 'Metro Manila',
      'tagaytay-cavite': 'Tagaytay',
      cebu: 'Cebu',
      pampanga: 'Pampanga',
      'iloilo-visayas': 'Iloilo/Visayas',
      other: 'another beautiful location',
    };
    return location ? labels[location] : '';
  };

  const getBudgetLabel = (budget?: BudgetRange): string => {
    const labels = {
      '100-300k': '₱100K-300K',
      '300-500k': '₱300K-500K',
      '500k-1m': '₱500K-1M',
      '1m+': '₱1M+',
    };
    return budget ? labels[budget] : '';
  };

  const getPriorityLabel = (priority?: Priority): string => {
    const labels = {
      photos: 'amazing photos & video',
      food: 'incredible food',
      styling: 'beautiful styling',
      coordination: 'stress-free coordination',
    };
    return priority ? labels[priority] : '';
  };

  // Intro Screen
  if (currentStep === 0 && Object.keys(answers).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cloud-white via-pearl to-whisper">
        <div className="flex min-h-screen items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl text-center">
            <Sparkles className="mx-auto mb-8 h-16 w-16 text-dream-lavender" />
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] text-text-primary">
              Find Your Perfect Wedding Team
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-text-primary">
              Answer 5 quick questions and we'll match you with the right
              wedding vendors for your big day.
            </p>
            <p className="mt-4 font-sans text-sm font-light text-text-secondary">
              Takes about 2 minutes
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="mt-10 rounded bg-dream-lavender px-10 py-4 font-sans text-sm tracking-wide text-cloud-white transition hover:bg-[#8169C4]"
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const vendors = getRecommendedVendors();
    const tip = getPersonalizedTip();

    return (
      <div className="min-h-screen bg-bg-primary">
        {/* Results Header */}
        <div className="bg-gradient-to-br from-pina-ivory via-pina-cream to-pina-sheen px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-[1.1] text-text-primary">
              Your Celebration Profile
            </h1>
          </div>
        </div>

        <div className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            {/* Shareable Results Card */}
            <div
              id="results-card"
              className="relative overflow-hidden rounded-lg border-2 border-border bg-gradient-to-br from-pina-ivory to-pina-cream p-8 shadow-lg md:p-12"
            >
              {/* Dream gradient decoration */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-dream-lavender to-twilight-blue" />

              {/* haraya wordmark */}
              <div className="mb-8 text-center">
                <div className="font-sans text-2xl font-extralight tracking-[0.15em] text-accent-primary">
                  haraya
                </div>
              </div>

              {/* Main Results */}
              <div className="space-y-6 text-center">
                <div>
                  <div className="mb-2 font-sans text-sm font-light uppercase tracking-wider text-text-secondary">
                    Your Style
                  </div>
                  <div className="font-serif text-4xl font-normal text-accent-primary md:text-5xl">
                    {getStyleLabel(answers.style)}
                  </div>
                </div>

                <p className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
                  You're planning a{' '}
                  <strong className="font-medium">
                    {getStyleLabel(answers.style).toLowerCase()}
                  </strong>{' '}
                  celebration for{' '}
                  <strong className="font-medium">
                    {getGuestCountLabel(answers.guestCount)}
                  </strong>{' '}
                  in{' '}
                  <strong className="font-medium">
                    {getLocationLabel(answers.location)}
                  </strong>{' '}
                  with a budget of{' '}
                  <strong className="font-medium">
                    {getBudgetLabel(answers.budget)}
                  </strong>
                  . Your priority is{' '}
                  <strong className="font-medium">
                    {getPriorityLabel(answers.priority)}
                  </strong>
                  .
                </p>

                {/* Personalized Tip */}
                <div className="mt-8 rounded-lg border border-accent-primary/20 bg-whisper p-6">
                  <div className="mb-2 flex items-center justify-center gap-2 font-sans text-xs font-medium uppercase tracking-wider text-accent-primary">
                    <Sparkles className="h-4 w-4" />
                    <span>Pro Tip</span>
                  </div>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-primary">
                    {tip}
                  </p>
                </div>
              </div>

              {/* Footer tagline */}
              <div className="mt-8 border-t border-border pt-6 text-center">
                <p className="font-serif text-sm italic text-text-secondary">
                  haraya — where dreams take shape
                </p>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 text-center">
              <h2 className="mb-6 font-serif text-2xl font-normal text-text-primary">
                Share Your Results
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 rounded border border-border bg-bg-primary px-6 py-3 font-sans text-sm text-text-primary transition hover:border-text-primary"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded border border-border bg-bg-primary px-6 py-3 font-sans text-sm text-text-primary transition hover:border-text-primary"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Share to Facebook</span>
                </a>
                <div className="flex items-center gap-2 rounded border border-border bg-bg-primary px-6 py-3 font-sans text-sm text-text-secondary">
                  <Share2 className="h-4 w-4" />
                  <span>Screenshot for Instagram Stories</span>
                </div>
              </div>
            </div>

            {/* Recommended Vendors */}
            <div className="mt-16">
              <h2 className="mb-8 text-center font-serif text-3xl font-normal text-text-primary">
                Your Recommended Vendors
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="rounded-lg border border-border bg-bg-primary p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="mb-2 font-sans text-xs font-light uppercase tracking-wider text-text-secondary">
                      {vendor.category}
                    </div>
                    <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                      {vendor.name}
                    </h3>
                    <div className="mb-3 flex items-center gap-4 font-sans text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {vendor.location}
                      </span>
                      <span className="font-medium text-inabel-gold">
                        {vendor.priceRange}
                      </span>
                    </div>
                    <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                      {vendor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/vendors"
                className="w-full rounded bg-accent-primary px-8 py-3 text-center font-sans text-sm tracking-wide text-text-on-dark transition hover:bg-accent-primary-hover sm:w-auto"
              >
                Browse All Vendors
              </Link>
              <Link
                to="/plan"
                className="w-full rounded border border-border bg-transparent px-8 py-3 text-center font-sans text-sm tracking-wide text-text-primary transition hover:border-text-primary sm:w-auto"
              >
                Start Planning
              </Link>
              <button
                onClick={restart}
                className="font-sans text-sm text-text-secondary underline transition hover:text-text-primary"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question Screens
  const progress = ((currentStep) / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pina-ivory via-pina-cream to-pina-sheen">
      {/* Progress Bar */}
      <div className="bg-bg-primary/50 px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between font-sans text-xs font-light uppercase tracking-wider text-text-secondary">
            <span>Question {currentStep} of 5</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #8B3A3A, #C4962E)' }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          {/* Back Button */}
          {currentStep > 1 && (
            <button
              onClick={goBack}
              className="mb-8 flex items-center gap-2 font-sans text-sm text-text-secondary transition hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          {/* Question 1: Celebration Style */}
          {currentStep === 1 && (
            <div className="fade-in">
              <h2 className="mb-8 text-center font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.2] text-text-primary">
                What's your wedding vibe?
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleAnswer('style', 'classic')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.style === 'classic'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Church className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Classic & Elegant
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Church ceremony, traditional touches, timeless beauty
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('style', 'modern')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.style === 'modern'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Sparkles className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Modern & Minimal
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Clean lines, simple palette, less is more
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('style', 'garden')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.style === 'garden'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Flower2 className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Garden & Rustic
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Outdoor ceremony, natural elements, organic feel
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('style', 'bold')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.style === 'bold'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <PartyPopper className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Bold & Festive
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Big party energy, vibrant colors, all-out celebration
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Question 2: Guest Count */}
          {currentStep === 2 && (
            <div className="fade-in">
              <h2 className="mb-8 text-center font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.2] text-text-primary">
                How many guests are you expecting?
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleAnswer('guestCount', 'intimate')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.guestCount === 'intimate'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Users className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="mb-1 font-sans text-xl font-medium text-text-primary">
                    Intimate
                  </h3>
                  <p className="font-sans text-sm font-light text-text-secondary">
                    Under 50
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('guestCount', 'medium')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.guestCount === 'medium'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Users className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="mb-1 font-sans text-xl font-medium text-text-primary">
                    Medium
                  </h3>
                  <p className="font-sans text-sm font-light text-text-secondary">
                    50-150
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('guestCount', 'large')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.guestCount === 'large'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Users className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="mb-1 font-sans text-xl font-medium text-text-primary">
                    Large
                  </h3>
                  <p className="font-sans text-sm font-light text-text-secondary">
                    150-300
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('guestCount', 'grand')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.guestCount === 'grand'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Users className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="mb-1 font-sans text-xl font-medium text-text-primary">
                    Grand
                  </h3>
                  <p className="font-sans text-sm font-light text-text-secondary">
                    300+
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Question 3: Budget Range */}
          {currentStep === 3 && (
            <div className="fade-in">
              <h2 className="mb-8 text-center font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.2] text-text-primary">
                What's your estimated budget?
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleAnswer('budget', '100-300k')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.budget === '100-300k'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <h3 className="font-sans text-2xl font-medium text-text-primary">
                    ₱100K - 300K
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('budget', '300-500k')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.budget === '300-500k'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <h3 className="font-sans text-2xl font-medium text-text-primary">
                    ₱300K - 500K
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('budget', '500k-1m')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.budget === '500k-1m'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <h3 className="font-sans text-2xl font-medium text-text-primary">
                    ₱500K - 1M
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('budget', '1m+')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.budget === '1m+'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <h3 className="font-sans text-2xl font-medium text-text-primary">
                    ₱1M+
                  </h3>
                </button>
              </div>
            </div>
          )}

          {/* Question 4: Location */}
          {currentStep === 4 && (
            <div className="fade-in">
              <h2 className="mb-8 text-center font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.2] text-text-primary">
                Where are you celebrating?
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleAnswer('location', 'metro-manila')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.location === 'metro-manila'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <MapPin className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="font-sans text-lg font-medium text-text-primary">
                    Metro Manila
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('location', 'tagaytay-cavite')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.location === 'tagaytay-cavite'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <MapPin className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="font-sans text-lg font-medium text-text-primary">
                    Tagaytay / Cavite
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('location', 'cebu')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.location === 'cebu'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <MapPin className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="font-sans text-lg font-medium text-text-primary">
                    Cebu
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('location', 'pampanga')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.location === 'pampanga'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <MapPin className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="font-sans text-lg font-medium text-text-primary">
                    Pampanga / Central Luzon
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('location', 'iloilo-visayas')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.location === 'iloilo-visayas'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <MapPin className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="font-sans text-lg font-medium text-text-primary">
                    Iloilo / Visayas
                  </h3>
                </button>

                <button
                  onClick={() => handleAnswer('location', 'other')}
                  className={`group rounded-lg border-2 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.location === 'other'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <MapPin className="mx-auto mb-3 h-8 w-8 text-accent-primary" />
                  <h3 className="font-sans text-lg font-medium text-text-primary">
                    Other
                  </h3>
                </button>
              </div>
            </div>
          )}

          {/* Question 5: Priority */}
          {currentStep === 5 && (
            <div className="fade-in">
              <h2 className="mb-8 text-center font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.2] text-text-primary">
                What matters most to you?
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleAnswer('priority', 'photos')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.priority === 'photos'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Camera className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Amazing Photos & Video
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Capturing every moment beautifully
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('priority', 'food')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.priority === 'food'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Utensils className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Incredible Food
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Delicious menu your guests will rave about
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('priority', 'styling')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.priority === 'styling'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <Palette className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Beautiful Styling
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Stunning design and aesthetic details
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer('priority', 'coordination')}
                  className={`group rounded-lg border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    answers.priority === 'coordination'
                      ? 'border-accent-primary bg-accent-primary/5'
                      : 'border-border bg-bg-primary hover:border-accent-primary/50'
                  }`}
                >
                  <ClipboardCheck className="mb-4 h-10 w-10 text-accent-primary" />
                  <h3 className="mb-2 font-sans text-xl font-medium text-text-primary">
                    Stress-Free Coordination
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    Expert guidance every step of the way
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
