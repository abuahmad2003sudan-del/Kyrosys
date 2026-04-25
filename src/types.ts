export type Category = 
  | 'web' | 'mobile' | 'design' | 'marketing' | 'video' | '3d' | 'dashboard'
  | 'ai-startup' | 'saas' | 'landing' | 'ecommerce' | 'portfolio' | 'luxury-gold' 
  | 'agency' | 'medical' | 'realestate';
export type AssetClass = 'A-CLASS' | 'S-CLASS' | 'OMEGA' | 'VOID' | 'QUANTUM';

export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  author: string;
  thumbnail: string;
  category: Category;
  tags: string[];
  isPremium: boolean;
  assetClass?: AssetClass;
  fidelityScore?: number;
  generationCycle?: number;
  demoUrl?: string;
  downloadUrl?: string;
  valueProposition?: string;
  aiFeatures?: string[];
  isNiche?: boolean;
  originalPrice?: number;
}

export interface MarketPulse {
  globalLiquidity: number;
  elitePulse: number;
  activeAlgorithms: number;
  netPosition: number;
}
