import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, Loader2 } from 'lucide-react';
import VendorCard from '../components/VendorCard';
import { fetchAllVendors } from '../lib/vendors';
import { vendorCategories } from '../data/categories';
import type { Vendor } from '../types';

const METRO_MANILA_CITIES = [
  'Metro Manila', 'Makati', 'Makati City', 'Pasay', 'Pasay City',
  'Quezon City', 'Taguig', 'Pasig', 'Pasig City', 'San Juan',
  'San Juan City', 'Mandaluyong', 'Manila', 'Sampaloc', 'Binondo',
];

export default function Vendors() {
  const [searchParams] = useSearchParams();
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(24);
  const VENDORS_PER_PAGE = 24;

  useEffect(() => {
    let cancelled = false;
    fetchAllVendors().then((vendors) => {
      if (!cancelled) { setAllVendors(vendors); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      const categoryMap: Record<string, string> = {
        'venues': 'Venues',
        'photo-video': 'Photo & Video',
        'catering': 'Catering',
        'coordination': 'Coordination',
        'flowers-styling': 'Flowers & Styling',
        'lights-sound': 'Lights & Sound',
        'hair-makeup': 'Hair & Makeup',
        'attire': 'Attire & Design',
        'attire-design': 'Attire & Design',
        'jewellery': 'Jewellery',
        'entertainment': 'Entertainment',
        'food-drinks': 'Food & Drinks',
        'photo-booth-souvenirs': 'Photo Booth & Souvenirs',
        'rentals-effects': 'Rentals & Effects',
        'artisans': 'Artisans',
        'stationery': 'Stationery',
        'registry': 'Registry',
        'transport': 'Transport',
        'honeymoon': 'Honeymoon',
        'finance': 'Finance',
        'media': 'Media',
      };
      if (categoryMap[cat]) {
        setSelectedCategory(categoryMap[cat]);
      }
    }
  }, [searchParams]);

  // Get unique categories from vendor data with counts
  const categoriesWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    allVendors.forEach(vendor => {
      counts.set(vendor.category, (counts.get(vendor.category) || 0) + 1);
    });

    const allCategories = ['All', ...vendorCategories.map(cat => cat.name)];
    return allCategories.map(cat => ({
      name: cat,
      count: cat === 'All' ? allVendors.length : (counts.get(cat) || 0)
    }));
  }, [allVendors]);

  const locations: string[] = [
    'All',
    'Metro Manila',
    'Cavite',
    'Cebu',
    'Pampanga',
    'Davao',
    'Iloilo',
    'Batangas',
    'Baguio',
    'Boracay',
  ];

  const priceRanges: string[] = [
    'All',
    'Budget',
    'Mid-range',
    'Premium'
  ];

  // Filter vendors based on all criteria
  const filteredVendors = useMemo(() => {
    return allVendors.filter((vendor: Vendor) => {
      // Search filter
      const matchesSearch = searchQuery.trim() === '' ||
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;

      // Location filter
      const matchesLocation = selectedLocation === 'All' ||
        (selectedLocation === 'Metro Manila'
          ? METRO_MANILA_CITIES.some(city => vendor.location.includes(city))
          : vendor.location.includes(selectedLocation));

      // Price range filter
      let matchesPriceRange = true;
      if (selectedPriceRange === 'Budget') {
        matchesPriceRange = vendor.priceRange.max <= 30000;
      } else if (selectedPriceRange === 'Mid-range') {
        matchesPriceRange = vendor.priceRange.min >= 30000 && vendor.priceRange.max <= 100000;
      } else if (selectedPriceRange === 'Premium') {
        matchesPriceRange = vendor.priceRange.min >= 100000;
      }

      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange;
    });
  }, [allVendors, searchQuery, selectedCategory, selectedLocation, selectedPriceRange]);

  const hasActiveFilters = selectedCategory !== 'All' ||
    selectedLocation !== 'All' ||
    selectedPriceRange !== 'All' ||
    searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectedPriceRange('All');
    setDisplayCount(VENDORS_PER_PAGE);
  };

  // Paginated vendors to display
  const vendorsToDisplay = filteredVendors.slice(0, displayCount);
  const hasMoreVendors = filteredVendors.length > displayCount;

  const loadMore = () => {
    setDisplayCount(prev => prev + VENDORS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-bg-primary pattern-inabel">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="font-cormorant font-light text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-3">
            Find Your Vendors
          </h1>
          <p className="font-jost font-light text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Trusted wedding professionals across the Philippines
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search vendors, services, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-bg-primary border border-border rounded-lg font-jost font-light text-base text-text-primary placeholder:text-border focus:outline-none focus:border-dream-lavender transition-colors"
            />
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-bg-primary border border-border rounded-lg font-jost text-sm text-text-primary hover:border-dream-lavender transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 bg-dream-lavender text-white text-xs rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel - Collapsible on Mobile */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary focus:outline-none focus:border-dream-lavender transition-colors max-h-80"
              >
                {categoriesWithCounts.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary focus:outline-none focus:border-dream-lavender transition-colors"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Price Range
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded font-jost text-sm text-text-primary focus:outline-none focus:border-dream-lavender transition-colors"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range === 'All' ? 'All Prices' : range === 'Budget' ? 'Budget (Under ₱30K)' : range === 'Mid-range' ? 'Mid-range (₱30K-100K)' : 'Premium (₱100K+)'}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-sm text-dream-lavender hover:text-[#8169C4] transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-jost text-text-secondary">
            Showing <span className="font-medium text-text-primary">{filteredVendors.length}</span> {filteredVendors.length === 1 ? 'vendor' : 'vendors'}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-dream-lavender" />
          </div>
        ) : filteredVendors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorsToDisplay.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreVendors && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-dream-lavender text-cloud-white font-jost text-sm tracking-wide rounded hover:bg-[#8169C4] transition-colors"
                >
                  Load More Vendors
                  <ChevronDown className="w-4 h-4" />
                </button>
                <p className="mt-3 text-sm text-text-secondary">
                  Showing {vendorsToDisplay.length} of {filteredVendors.length} vendors
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <p className="font-cormorant text-2xl text-text-primary mb-3">
                No vendors found
              </p>
              <p className="font-jost text-text-secondary mb-6">
                Try adjusting your filters or search query to find more vendors.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-dream-lavender text-cloud-white font-jost text-sm tracking-wide rounded hover:bg-[#8169C4] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
