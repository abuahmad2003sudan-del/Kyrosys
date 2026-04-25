import { useEffect } from 'react';
import { confetti } from '../lib/confetti';

interface GoldDustProps {
  trigger: number; // Increment this to trigger the effect
  origin?: { x: number; y: number }; // 0 to 1 normalized
}

export default function GoldDust({ trigger, origin = { x: 0.5, y: 0.5 } }: GoldDustProps) {
  useEffect(() => {
    if (trigger > 0) {
      // Elite Golden colors
      const colors = ['#D4AF37', '#F0E6D2', '#AA861E'];

      // Fire a luxurious, soft cloud of "dust"
      confetti({
        particleCount: 150,
        spread: 120,
        origin,
        colors: colors,
        disableForReducedMotion: true,
        gravity: 0.2,
        ticks: 400,
        scalar: 0.4, // Smaller particles for "dust" feel
        shapes: ['circle'],
        zIndex: 2000,
      });
    }
  }, [trigger, origin]);

  return null;
}
