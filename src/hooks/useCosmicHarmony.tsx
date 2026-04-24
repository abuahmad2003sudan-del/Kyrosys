import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type HarmonyState = 'ethereal' | 'kinetic';
type CosmicPhase = 'solar' | 'lunar' | 'eclipse';

interface CosmicHarmonyContextType {
  harmonyState: HarmonyState;
  timePhase: CosmicPhase;
  transitionSpec: any;
}

const CosmicHarmonyContext = createContext<CosmicHarmonyContextType | undefined>(undefined);

export function CosmicHarmonyProvider({ children }: { children: ReactNode }) {
  const [harmonyState, setHarmonyState] = useState<HarmonyState>('ethereal');
  const [timePhase, setTimePhase] = useState<CosmicPhase>('solar');

  useEffect(() => {
    let interactionCount = 0;
    let lastInteractionTime = Date.now();
    let resetTimer: NodeJS.Timeout;

    const handleInteraction = () => {
      const now = Date.now();
      if (now - lastInteractionTime < 400) {
        interactionCount++;
        if (interactionCount > 4 && harmonyState !== 'kinetic') {
          setHarmonyState('kinetic'); // User is moving fast/decisively
        }
      } else {
        interactionCount = 1;
      }
      lastInteractionTime = now;

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (harmonyState === 'kinetic') {
          setHarmonyState('ethereal'); // Rebalance to calm
        }
      }, 3000);
    };

    const calculateCosmicPhase = () => {
      const hour = new Date().getHours();
      // Lunar phase for night, Solar for day, Eclipse for twilight/dawn transitions
      if (hour >= 19 || hour < 5) setTimePhase('lunar');
      else if (hour === 5 || hour === 18) setTimePhase('eclipse');
      else setTimePhase('solar');
    };

    calculateCosmicPhase();
    const phaseInterval = setInterval(calculateCosmicPhase, 60000); // Check every minute

    window.addEventListener('click', handleInteraction);
    window.addEventListener('wheel', handleInteraction); // Scroll velocities
    window.addEventListener('mousemove', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      clearTimeout(resetTimer);
      clearInterval(phaseInterval);
    };
  }, [harmonyState]);

  // Visual Rebalance Engine: Easing adjustments
  const transitionSpec = harmonyState === 'ethereal' 
    ? { type: 'tween', ease: [0.25, 0.1, 0.25, 1], duration: 1.2 } 
    : { type: 'spring', stiffness: 220, damping: 25, mass: 0.5 };

  return (
    <CosmicHarmonyContext.Provider value={{ harmonyState, timePhase, transitionSpec }}>
      <div 
        className={`transition-all duration-1000 origin-center ${
          harmonyState === 'ethereal' ? 'saturate-100' : 'saturate-[1.1] contrast-[1.05]'
        }`}
      >
        {children}
      </div>
    </CosmicHarmonyContext.Provider>
  );
}

export const useCosmicHarmony = () => {
  const context = useContext(CosmicHarmonyContext);
  if (!context) throw new Error('useCosmicHarmony must be used within CosmicHarmonyProvider');
  return context;
};
