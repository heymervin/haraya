import { supabase } from './supabase';
import type { Vendor, VendorCategoryType } from '../types';

// ── Review type ─────────────────────────────────────────────────────────────

export interface VendorReview {
  id: string;
  vendorId: string;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
}

// ── Row → Frontend mappers ──────────────────────────────────────────────────

interface VendorRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  description: string | null;
  price_range_min: number | null;
  price_range_max: number | null;
  currency: string;
  rating: number | null;
  review_count: number | null;
  image: string | null;
  tags: string[] | null;
  is_verified: boolean | null;
  all_celebrations_welcome: boolean | null;
  availability: string[] | null;
  contact_info: Record<string, string> | null;
}

function mapVendorRow(row: VendorRow): Vendor {
  const ci = (row.contact_info ?? {}) as Record<string, string | undefined>;
  return {
    id: row.slug,
    name: row.name,
    category: row.category as VendorCategoryType,
    location: row.location,
    description: row.description ?? '',
    priceRange: {
      min: row.price_range_min ?? 0,
      max: row.price_range_max ?? 0,
      currency: 'PHP',
    },
    rating: Number(row.rating ?? 0),
    reviewCount: row.review_count ?? 0,
    image: row.image ?? '',
    tags: row.tags ?? [],
    isVerified: row.is_verified ?? false,
    allCelebrationsWelcome: row.all_celebrations_welcome ?? false,
    availability: row.availability ?? [],
    contactInfo: {
      email: ci.email,
      phone: ci.phone,
      instagram: ci.instagram,
      facebook: ci.facebook,
      tiktok: ci.tiktok,
      website: ci.website,
    },
  };
}

interface ReviewRow {
  id: string;
  vendor_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

function mapReviewRow(row: ReviewRow, vendorSlug: string): VendorReview {
  return {
    id: row.id,
    vendorId: vendorSlug,
    reviewerName: row.reviewer_name,
    rating: row.rating,
    date: row.created_at.split('T')[0],
    comment: row.comment ?? '',
  };
}

// ── Query columns (shared select string) ────────────────────────────────────

const VENDOR_COLUMNS =
  'id, slug, name, category, location, description, price_range_min, price_range_max, currency, rating, review_count, image, tags, is_verified, all_celebrations_welcome, availability, contact_info';

// ── Query functions ─────────────────────────────────────────────────────────

export async function fetchAllVendors(): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from('vendors')
    .select(VENDOR_COLUMNS)
    .order('name');

  if (error) {
    console.error('fetchAllVendors error:', error);
    return [];
  }
  return (data as unknown as VendorRow[]).map(mapVendorRow);
}

export async function fetchVendorBySlug(slug: string): Promise<Vendor | null> {
  const { data, error } = await supabase
    .from('vendors')
    .select(VENDOR_COLUMNS)
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return mapVendorRow(data as unknown as VendorRow);
}

export async function fetchFeaturedVendors(limit = 6): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from('vendors')
    .select(VENDOR_COLUMNS)
    .neq('image', '')
    .gte('rating', 4.5)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error('fetchFeaturedVendors error:', error);
    return [];
  }

  const vendors = (data as unknown as VendorRow[]).map(mapVendorRow);

  // Fallback: if not enough vendors with images + high rating, get top-rated
  if (vendors.length < 3) {
    const { data: fallback } = await supabase
      .from('vendors')
      .select(VENDOR_COLUMNS)
      .order('rating', { ascending: false })
      .limit(limit);
    if (fallback) return (fallback as unknown as VendorRow[]).map(mapVendorRow);
  }

  return vendors;
}

export async function fetchVendorsBySlugs(slugs: string[]): Promise<Map<string, Vendor>> {
  if (slugs.length === 0) return new Map();

  const { data, error } = await supabase
    .from('vendors')
    .select(VENDOR_COLUMNS)
    .in('slug', slugs);

  if (error || !data) {
    console.error('fetchVendorsBySlugs error:', error);
    return new Map();
  }

  const map = new Map<string, Vendor>();
  for (const row of data as unknown as VendorRow[]) {
    const vendor = mapVendorRow(row);
    map.set(vendor.id, vendor);
  }
  return map;
}

export async function fetchReviewsByVendorSlug(slug: string): Promise<VendorReview[]> {
  // First get vendor UUID from slug
  const { data: vendorRow, error: vendorError } = await supabase
    .from('vendors')
    .select('id')
    .eq('slug', slug)
    .single();

  if (vendorError || !vendorRow) return [];

  const { data, error } = await supabase
    .from('reviews')
    .select('id, vendor_id, reviewer_name, rating, comment, created_at')
    .eq('vendor_id', vendorRow.id)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return (data as unknown as ReviewRow[]).map((r) => mapReviewRow(r, slug));
}
