import type { VendorCategory } from '../types';

export const vendorCategories: VendorCategory[] = [
  {
    id: 'Venues',
    name: 'Venues',
    description: 'Garden venues, ballrooms, beach resorts, and celebration spaces',
    icon: 'MapPin',
    color: '#3D4F7C', // Inabel Indigo
  },
  {
    id: 'Photo & Video',
    name: 'Photo & Video',
    description: 'Photographers, videographers, and same-day edit specialists',
    icon: 'Camera',
    color: '#C4962E', // Inabel Gold
  },
  {
    id: 'Catering',
    name: 'Catering',
    description: 'Full catering services, grazing tables, desserts, and food stations',
    icon: 'UtensilsCrossed',
    color: '#C73E3A', // Inabel Red
  },
  {
    id: 'Coordination',
    name: 'Coordination',
    description: 'Wedding planners and day-of coordinators',
    icon: 'ClipboardList',
    color: '#4A7C59', // Hablon Green
  },
  {
    id: 'Flowers & Styling',
    name: 'Flowers & Styling',
    description: 'Floral arrangements, event styling, and decor',
    icon: 'Flower2',
    color: '#B84C65', // Yakan Fuchsia
  },
  {
    id: 'Lights & Sound',
    name: 'Lights & Sound',
    description: 'Audio systems, lighting design, LED walls, and technical production',
    icon: 'Lightbulb',
    color: '#D4A843', // Hablon Yellow
  },
  {
    id: 'Hair & Makeup',
    name: 'Hair & Makeup',
    description: 'Makeup artists, hair stylists, and bridal beauty services',
    icon: 'Sparkles',
    color: '#2D7D7B', // Yakan Teal
  },
  {
    id: 'Attire & Design',
    name: 'Attire & Design',
    description: 'Gowns, barong, suits, designers, and celebration attire',
    icon: 'Shirt',
    color: '#5C4A7C', // Langkit Violet
  },
  {
    id: 'Jewellery',
    name: 'Jewellery',
    description: 'Wedding rings, engagement rings, and fine jewelry',
    icon: 'Gem',
    color: '#C4962E', // Inabel Gold
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    description: 'Musicians, bands, DJs, and event hosts',
    icon: 'Music',
    color: '#B84C65', // Yakan Fuchsia
  },
  {
    id: 'Food & Drinks',
    name: 'Food & Drinks',
    description: 'Mobile bars, coffee carts, and beverage services',
    icon: 'Coffee',
    color: '#C73E3A', // Inabel Red
  },
  {
    id: 'Photo Booth & Souvenirs',
    name: 'Photo Booth & Souvenirs',
    description: 'Photo booths, instant prints, and wedding souvenirs',
    icon: 'Camera',
    color: '#D4A843', // Hablon Yellow
  },
  {
    id: 'Rentals & Effects',
    name: 'Rentals & Effects',
    description: 'Equipment rentals, special effects, and production services',
    icon: 'Box',
    color: '#4A7C59', // Hablon Green
  },
  {
    id: 'Artisans',
    name: 'Artisans',
    description: 'Handcrafted items, paper flowers, life-size letters, and custom creations',
    icon: 'Palette',
    color: '#2D7D7B', // Yakan Teal
  },
  {
    id: 'Stationery',
    name: 'Stationery',
    description: 'Wedding invitations, save-the-dates, and printed materials',
    icon: 'FileText',
    color: '#5C4A7C', // Langkit Violet
  },
  {
    id: 'Registry',
    name: 'Registry',
    description: 'Gift registry services and wedding gift solutions',
    icon: 'Gift',
    color: '#B84C65', // Yakan Fuchsia
  },
  {
    id: 'Transport',
    name: 'Transport',
    description: 'Bridal cars, luxury vehicles, and guest transportation',
    icon: 'Car',
    color: '#3D4F7C', // Inabel Indigo
  },
  {
    id: 'Honeymoon',
    name: 'Honeymoon',
    description: 'Honeymoon destinations, travel packages, and romantic getaways',
    icon: 'Plane',
    color: '#C4962E', // Inabel Gold
  },
  {
    id: 'Finance',
    name: 'Finance',
    description: 'Wedding financing, payment plans, and budget solutions',
    icon: 'CreditCard',
    color: '#4A7C59', // Hablon Green
  },
  {
    id: 'Media',
    name: 'Media',
    description: 'Wedding media partners, publications, and coverage services',
    icon: 'Newspaper',
    color: '#D4A843', // Hablon Yellow
  },
];

export const getCategoryByType = (type: string): VendorCategory | undefined => {
  return vendorCategories.find(cat => cat.id === type);
};
