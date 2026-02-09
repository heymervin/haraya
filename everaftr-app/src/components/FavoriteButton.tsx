import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  vendorId: string;
  size?: 'sm' | 'md' | 'lg';
}

interface FavoriteItem {
  vendorId: string;
  dateAdded: string;
  notes?: string;
}

const STORAGE_KEY = 'haraya-favorites';

const sizeClasses = {
  sm: 'h-8 w-8 min-h-[44px] min-w-[44px]',
  md: 'h-10 w-10 min-h-[44px] min-w-[44px]',
  lg: 'h-12 w-12 min-h-[44px] min-w-[44px]',
};

const iconSizes = {
  sm: 18,
  md: 20,
  lg: 24,
};

export default function FavoriteButton({ vendorId, size = 'md' }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorited(favorites.some((fav) => fav.vendorId === vendorId));
  }, [vendorId]);

  const getFavorites = (): FavoriteItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveFavorites = (favorites: FavoriteItem[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const handleToggle = (): void => {
    const favorites = getFavorites();

    if (isFavorited) {
      const updated = favorites.filter((fav) => fav.vendorId !== vendorId);
      saveFavorites(updated);
      setIsFavorited(false);
    } else {
      const newFavorite: FavoriteItem = {
        vendorId,
        dateAdded: new Date().toISOString(),
      };
      saveFavorites([...favorites, newFavorite]);
      setIsFavorited(true);
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-full
        bg-white/90 backdrop-blur-sm
        hover:bg-white
        transition-all duration-200
        shadow-sm hover:shadow-md
        ${isAnimating ? 'scale-125' : 'scale-100'}
      `}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      <Heart
        size={iconSizes[size]}
        className={`
          transition-colors duration-200
          ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}
        `}
      />
    </button>
  );
}
