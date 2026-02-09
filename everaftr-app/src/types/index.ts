// haraya TypeScript Type Definitions
// Inclusive by design - no gendered defaults

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategoryType;
  location: string;
  description: string;
  priceRange: {
    min: number;
    max: number;
    currency: 'PHP';
  };
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
  isVerified: boolean;
  allCelebrationsWelcome: boolean;
  availability: string[]; // Available months
  contactInfo?: {
    email?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  };
}

export type VendorCategoryType =
  | 'Venues'
  | 'Photo & Video'
  | 'Catering'
  | 'Coordination'
  | 'Flowers & Styling'
  | 'Lights & Sound'
  | 'Hair & Makeup'
  | 'Attire & Design'
  | 'Jewellery'
  | 'Entertainment'
  | 'Food & Drinks'
  | 'Photo Booth & Souvenirs'
  | 'Rentals & Effects'
  | 'Artisans'
  | 'Stationery'
  | 'Registry'
  | 'Transport'
  | 'Honeymoon'
  | 'Finance'
  | 'Media';

export interface VendorCategory {
  id: VendorCategoryType;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  timeframe: '12+ months' | '9-12 months' | '6-9 months' | '3-6 months' | '1-3 months' | '1 month' | '1 week';
  isCompleted: boolean;
  notes?: string;
  dueDate?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  estimatedCost: number;
  actualCost?: number;
  isPaid: boolean;
  vendor?: string;
  notes?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single-choice' | 'multiple-choice' | 'range';
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  image?: string;
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  vendors: Vendor[];
  shareCard: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
}

export interface CoupleProfile {
  id: string;
  partner1Name: string;
  partner2Name: string;
  celebrationDate?: string;
  ceremonyType?: 'Catholic' | 'Church (INC)' | 'Church (Other)' | 'Muslim' | 'Civil' | 'Civil Union' | 'Other';
  budgetRange?: {
    min: number;
    max: number;
  };
  guestCount?: number;
  location?: string;
  customLabels?: {
    partner1Label?: string;
    partner2Label?: string;
  };
}

export interface FavoriteVendor {
  vendorId: string;
  dateAdded: string;
  notes?: string;
}

export interface VendorInquiry {
  id: string;
  vendorId: string;
  coupleId: string;
  celebrationDate: string;
  guestCount: number;
  budgetRange: {
    min: number;
    max: number;
  };
  message: string;
  createdAt: string;
  status: 'sent' | 'read' | 'responded';
}
