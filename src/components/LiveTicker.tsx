import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Radio, Activity, Terminal, ShieldCheck, Zap } from 'lucide-react';

export default function LiveTicker() {
  const [pulse, setPulse] = useState(126.42);
  const [entropy, setEntropy] = useState(0.041);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
      setEntropy(prev => +(prev + (Math.random() - 0.5) * 0.001).toFixed(4));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cosmic border-b border-pearl/10 py-2.5 overflow-hidden whitespace-nowrap relative z-[60]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cosmic to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cosmic to-transparent z-10" />
      
      <div className="flex items-center gap-12 text-[9px] font-mono tracking-[0.2em] uppercase">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12"
        >
          <div className="flex items-center gap-2 text-gold font-black">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>KYROSYS_CORE_NETWORK: ONLINE</span>
          </div>
          
          <div className="flex items-center gap-2 text-pearl/60">
            <Activity className="w-3 h-3" />
            <span>IMPERIAL_PULSE: <span className="text-gold font-bold">{pulse}</span></span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <span className="text-blue-400">🚀 أكثر من 500 قالب تم تحميلها هذا الشهر</span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <Zap className="w-3 h-3" />
            <span>QUANTUM_ENTROPY: <span className="text-indigo-300">{entropy}</span></span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <span className="text-gold">⭐ متوسط تقييم 4.9 من 5 نجوم للعملاء النشطين</span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <ShieldCheck className="w-3 h-3" />
            <span>MULTI_SIG_PROTOCOL: <span className="text-emerald-400 font-bold italic">ENFORCED</span></span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <Terminal className="w-3 h-3 text-gold" />
            <span>VOID_CALIBRATION: STABLE</span>
          </div>

          {/* Repeat content for seamless scroll */}
          <div className="flex items-center gap-2 text-gold font-black">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>KYROSYS_CORE_NETWORK: ONLINE</span>
          </div>
          
          <div className="flex items-center gap-2 text-pearl/60">
            <Activity className="w-3 h-3" />
            <span>IMPERIAL_PULSE: <span className="text-gold font-bold">{pulse}</span></span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <span className="text-blue-400">🚀 أكثر من 500 قالب تم تحميلها هذا الشهر</span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <Zap className="w-3 h-3" />
            <span>QUANTUM_ENTROPY: <span className="text-indigo-300">{entropy}</span></span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <span className="text-gold">⭐ متوسط تقييم 4.9 من 5 نجوم للعملاء النشطين</span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <ShieldCheck className="w-3 h-3" />
            <span>MULTI_SIG_PROTOCOL: <span className="text-emerald-400 font-bold italic">ENFORCED</span></span>
          </div>

          <div className="flex items-center gap-2 text-pearl/60">
            <Terminal className="w-3 h-3 text-gold" />
            <span>VOID_CALIBRATION: STABLE</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
