import { motion } from 'motion/react';
import { useCosmicHarmony } from '../hooks/useCosmicHarmony';
import { cn } from '../lib/utils';

export default function CosmicBackground() {
  const { harmonyState, timePhase } = useCosmicHarmony();
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden opacity-30 mix-blend-screen transition-opacity duration-1000">
      <motion.svg 
        viewBox="0 0 200 200" 
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "w-full h-full fill-none stroke-[0.1] transition-colors duration-1000",
          timePhase === 'lunar' ? "stroke-indigo-500/20" : 
          timePhase === 'eclipse' ? "stroke-rose-500/20" : 
          "stroke-gold/20"
        )}
        animate={{
          rotate: harmonyState === 'ethereal' ? 360 : -360,
          scale: harmonyState === 'ethereal' ? 1 : 1.05
        }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        {/* Metatron's Cube / Sacred Geometry Foundation */}
        <g className="origin-center" transform="translate(100 100)">
          {/* Central Flower */}
          <circle cx="0" cy="0" r="20" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <g key={i} transform={`rotate(${deg})`}>
              <circle cx="0" cy="40" r="20" />
              <line x1="0" y1="0" x2="0" y2="40" />
              {/* Sacred Connections */}
              <line x1="0" y1="40" x2="34.64" y2="20" className="opacity-50" />
            </g>
          ))}
          {/* Outer Containment Ring */}
          <circle cx="0" cy="0" r="60" strokeDasharray="1 2" />
          <circle cx="0" cy="0" r="80" strokeDasharray="2 4" className="opacity-30" />
          
          {/* Fibonacci Spiral Hint */}
          <path d="M0,0 m 0,-10 a 10,10 0 0,1 10,10 a 20,20 0 0,1 -20,20 a 40,40 0 0,1 -40,-40 a 80,80 0 0,1 80,-80" className="stroke-gold/10 drop-shadow-2xl" />
        </g>
      </motion.svg>
    </div>
  );
}
