import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function StarRating({ rating, size = 'md', showNumber = false }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.round(rating);

    return (
      <Star
        key={index}
        className={`${sizeClasses[size]} ${
          isFilled
            ? 'fill-golden-hour text-golden-hour'
            : 'fill-none text-border stroke-2'
        }`}
      />
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-medium text-text-primary ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
