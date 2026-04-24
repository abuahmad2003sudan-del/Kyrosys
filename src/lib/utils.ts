import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type HapticIntensity = 'light' | 'medium' | 'heavy' | 'transaction' | 'quantum' | 'error' | 'success' | 'yield-harvest' | 'vault-unlock';

export function hapticFeedback(pattern: number | number[] | HapticIntensity = 'light') {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    if (typeof pattern === 'string') {
      switch (pattern) {
        case 'light': navigator.vibrate(10); break;
        case 'medium': navigator.vibrate(20); break;
        case 'heavy': navigator.vibrate([30, 50, 30]); break;
        case 'transaction': navigator.vibrate([15, 30, 20, 40, 50, 20, 100]); break; // Financial drumroll
        case 'quantum': navigator.vibrate([5, 10, 5, 20, 5, 30, 5]); break; // Predictive path activation
        case 'success': navigator.vibrate([10, 20, 50]); break; // Ascending
        case 'error': navigator.vibrate([50, 20, 50]); break; // Double strong
        case 'yield-harvest': navigator.vibrate([10, 30, 20, 50, 40, 100, 50, 150]); break; // Escalating power
        case 'vault-unlock': navigator.vibrate([50, 100, 20, 10, 20, 200]); break; // Distinct unlocking
        default: navigator.vibrate(10); break;
      }
    } else {
      navigator.vibrate(pattern);
    }
  }
}
