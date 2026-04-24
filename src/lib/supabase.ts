/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TableNames = 'templates' | 'asset_classes' | 'vendors' | 'orders' | 'escrows' | 'ai_generation_logs' | 'market_intelligence';

/**
 * Premium Data Schema - Empire 2126
 */
export async function getPremiumMetrics() {
  // In a real empire, we fetch from Supabase
  // if (!supabaseUrl) throw new Error('Supabase configuration missing');
  return {
    liquidity: 1420000000000,
    velocity: 0.842,
    entropy: 0.002
  };
}
