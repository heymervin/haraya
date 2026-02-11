import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';
import type { Vendor } from '../types';
import StarRating from './StarRating';

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  const formatPrice = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      return num.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };
    return `₱${formatNumber(min)} - ₱${formatNumber(max)}`;
  };

  return (
    <Link to={`/vendors/${vendor.id}`}>
      <div className="group bg-pearl border border-border rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        {/* Image/Logo */}
        <div className="relative h-48 overflow-hidden bg-whisper flex items-center justify-center">
          {vendor.image ? (
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dream-lavender/20 to-twilight-blue/20 flex items-center justify-center">
              <span className="text-6xl font-serif font-light text-dream-lavender">
                {vendor.name.charAt(0)}
              </span>
            </div>
          )}
          {/* Category Badge - Top Left */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 bg-twilight-blue/90 backdrop-blur-sm text-white text-xs font-medium rounded">
              {vendor.category}
            </span>
          </div>
          {/* Badges - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {vendor.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-success text-white text-[11px] font-medium tracking-wide uppercase rounded-sm">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Vendor Name */}
          <h3 className="font-sans font-medium text-lg text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
            {vendor.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{vendor.location}</span>
          </div>

          {/* Price Range */}
          <div className="mb-3">
            <p className="text-text-primary font-medium text-base">
              {formatPrice(vendor.priceRange.min, vendor.priceRange.max)}
            </p>
          </div>

          {/* Rating */}
          {vendor.reviewCount > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={vendor.rating} size="sm" />
              <span className="text-text-secondary text-sm">
                ({vendor.reviewCount} {vendor.reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {/* Tags */}
          {vendor.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {vendor.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-whisper text-text-secondary text-xs rounded-sm border border-border"
                >
                  {tag}
                </span>
              ))}
              {vendor.tags.length > 3 && (
                <span className="px-2 py-0.5 text-text-secondary text-xs">
                  +{vendor.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
