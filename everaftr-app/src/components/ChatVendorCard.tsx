import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';
import StarRating from './StarRating';

export interface ChatVendor {
  id: string;
  name: string;
  category: string;
  location: string;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  reviewCount: number | null;
  image: string | null;
  isVerified: boolean;
  allCelebrationsWelcome: boolean;
  tags: string[];
}

function formatPrice(min: number | null, max: number | null): string {
  if (!min && !max) return 'Price on request';
  const fmt = (n: number) => `₱${n.toLocaleString('en-PH')}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

function AvatarFallback({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-dream-lavender to-twilight-blue flex items-center justify-center shrink-0">
      <span className="text-white font-serif text-sm font-semibold">{letter}</span>
    </div>
  );
}

export default function ChatVendorCard({ vendor }: { vendor: ChatVendor }) {
  return (
    <Link
      to={`/vendors/${vendor.id}`}
      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-bg-secondary hover:border-dream-lavender/40 hover:shadow-sm transition-all group"
    >
      {/* Avatar */}
      {vendor.image ? (
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-10 h-10 rounded-lg object-cover shrink-0"
        />
      ) : (
        <AvatarFallback name={vendor.name} />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Name + badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-text-primary truncate group-hover:text-dream-lavender transition-colors">
            {vendor.name}
          </span>
          {vendor.isVerified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-success shrink-0" />
          )}
        </div>

        {/* Category + Location */}
        <div className="flex items-center gap-2 text-xs text-text-secondary mt-0.5">
          <span className="px-1.5 py-0.5 bg-dream-lavender/10 text-dream-lavender rounded font-medium">
            {vendor.category}
          </span>
          <span className="flex items-center gap-0.5 truncate">
            <MapPin className="w-3 h-3 shrink-0" />
            {vendor.location}
          </span>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs font-medium text-text-primary">
            {formatPrice(vendor.priceMin, vendor.priceMax)}
          </span>
          {vendor.rating != null && vendor.rating > 0 && (
            <div className="flex items-center gap-1">
              <StarRating rating={vendor.rating} size="sm" />
              {vendor.reviewCount != null && vendor.reviewCount > 0 && (
                <span className="text-[11px] text-text-secondary">({vendor.reviewCount})</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
