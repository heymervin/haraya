import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import VendorCard from '../components/VendorCard';
import { mockVendors } from '../data/mockVendors';

interface FavoriteItem {
  vendorId: string;
  dateAdded: string;
  notes?: string;
}

type SortOption = 'dateAdded' | 'rating' | 'price';

const STORAGE_KEY = 'haraya-favorites';

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('dateAdded');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = (): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch {
      setFavorites([]);
    }
  };

  const removeFavorite = (vendorId: string): void => {
    const updated = favorites.filter((fav) => fav.vendorId !== vendorId);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const favoriteVendors = favorites
    .map((fav) => ({
      vendor: mockVendors.find((v) => v.id === fav.vendorId),
      dateAdded: fav.dateAdded,
    }))
    .filter((item) => item.vendor)
    .map((item) => ({
      ...item.vendor!,
      dateAdded: item.dateAdded,
    }));

  const sortedVendors = [...favoriteVendors].sort((a, b) => {
    switch (sortBy) {
      case 'dateAdded':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price':
        return (a.priceRange?.min || 0) - (b.priceRange?.min || 0);
      default:
        return 0;
    }
  });

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-cloud-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-midnight mb-8">
            Your Favorites
          </h1>
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
            <div className="mb-6 p-6 bg-dream-lavender/10 rounded-full">
              <Heart size={64} className="text-dream-lavender" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-midnight mb-2">
              No favorites yet
            </h2>
            <p className="font-sans text-dusk-gray mb-6">
              Start saving vendors you love to plan your perfect celebration
            </p>
            <a
              href="/vendors"
              className="px-6 py-3 bg-dream-lavender text-white font-sans font-medium rounded-lg hover:bg-dream-lavender/90 transition-colors"
            >
              Browse Vendors
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-midnight mb-2">
              Your Favorites
            </h1>
            <p className="font-sans text-dusk-gray">
              {favorites.length} saved {favorites.length === 1 ? 'vendor' : 'vendors'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-sans text-sm text-midnight">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-whisper rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-dream-lavender"
            >
              <option value="dateAdded">Date Added</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVendors.map((vendor) => (
            <div key={vendor.id} className="relative">
              <VendorCard vendor={vendor} />
              <button
                onClick={() => removeFavorite(vendor.id)}
                className="absolute top-4 right-4 h-10 w-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm hover:shadow-md"
                aria-label="Remove from favorites"
                type="button"
              >
                <Heart size={20} className="fill-red-500 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
