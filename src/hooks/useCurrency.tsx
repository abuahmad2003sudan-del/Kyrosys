import { createContext, useContext, useState, ReactNode } from 'react';
import { hapticFeedback } from '../lib/utils';

type CurrencyType = 'USD' | 'AETHER';

interface CurrencyContextType {
  currency: CurrencyType;
  toggleCurrency: () => void;
  formatCurrency: (value: number, abbreviate?: boolean) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const CONVERSION_RATE = 0.842; // Premium Core Equivalent: 1 USD = 0.842 AETHER

  const toggleCurrency = () => {
    hapticFeedback('medium');
    setCurrency(prev => prev === 'USD' ? 'AETHER' : 'USD');
  };

  const formatCurrency = (val: number, abbreviate = false) => {
    const converted = currency === 'AETHER' ? val * CONVERSION_RATE : val;
    const prefix = currency === 'USD' ? '$' : '₳';
    const suffix = currency === 'AETHER' ? ' AET' : '';

    if (abbreviate) {
      if (converted >= 1e12) return `${prefix}${(converted / 1e12).toFixed(2)}T${suffix}`;
      if (converted >= 1e9) return `${prefix}${(converted / 1e9).toFixed(2)}B${suffix}`;
      if (converted >= 1e6) return `${prefix}${(converted / 1e6).toFixed(2)}M${suffix}`;
      if (converted >= 1e3) return `${prefix}${(converted / 1e3).toFixed(2)}K${suffix}`;
    }

    return `${prefix}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
