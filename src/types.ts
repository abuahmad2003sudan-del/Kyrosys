export type Category = 'Business' | 'Portfolio' | 'Blog' | 'E-commerce' | 'Landing Page' | 'Admin Dashboard' | 'Personal' | 'Entertainment' | 'Education' | 'Health' | 'Tech' | 'SaaS' | 'Luxury' | 'Creative' | 'all' | 'ai-startup' | 'ecommerce' | 'portfolio' | 'dashboard' | 'luxury-gold' | 'agency' | 'medical' | 'realestate' | 'saas';
export type AssetClass = 'A-CLASS' | 'S-CLASS' | 'OMEGA' | 'VOID' | 'QUANTUM';

export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  author: string;
  thumbnail: string; image?: string;
  category: Category;
  tags?: string[];
  isPremium?: boolean;
  assetClass?: AssetClass;
  fidelityScore?: number;
  generationCycle?: number;
  demoUrl?: string;
  downloadUrl?: string;
  valueProposition?: string;
  aiFeatures?: boolean | string[];
  isNiche?: boolean;
  originalPrice?: number;
}

export interface MarketPulse {
  globalLiquidity: number;
  elitePulse: number;
  activeAlgorithms: number;
  netPosition: number;
}
