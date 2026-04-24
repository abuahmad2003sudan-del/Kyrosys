import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Eclipse, Fingerprint, Sparkles, Command } from 'lucide-react';
import { useCosmicHarmony } from '../hooks/useCosmicHarmony';
import { hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';

export default function OmniscienceDial() {
  const { harmonyState, timePhase, transitionSpec } = useCosmicHarmony();
  const [isOpen, setIsOpen] = useState(false);

  const PhaseIcon = timePhase === 'lunar' ? Moon : timePhase === 'eclipse' ? Eclipse : Sun;
  
  // Implicit Predictive Intelligence (Quantum Paths)
  const ghostAction = timePhase === 'lunar' 
    ? { title: 'توليد أصول الغسق (صامت)', section: 'forge' }
    : timePhase === 'eclipse' 
    ? { title: 'مزامنة الطور الانتقالي (حرجة)', section: 'market' }
    : { title: 'بدء الحصاد الشمسي (سريع)', section: 'vault' };

  const toggleDial = () => {
    hapticFeedback(isOpen ? 'light' : 'medium');
    if (!isOpen) soundscapes.playReverb();
    setIsOpen(!isOpen);
  };

  const executeGhostPath = () => {
    hapticFeedback('quantum');
    soundscapes.playQuantum();
    document.dispatchEvent(new CustomEvent('changeSection', { detail: ghostAction.section }));
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-center gap-4">
      <AnimatePresence>
        {/* Ghost Path Prompt (Appears implicitly when ethereal and lunar/eclipse) */}
        {!isOpen && harmonyState === 'ethereal' && (timePhase === 'lunar' || timePhase === 'eclipse') && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            transition={transitionSpec}
            onClick={executeGhostPath}
            className="absolute bottom-16 left-0 whitespace-nowrap px-4 py-2 rounded-2xl bg-obsidian/40 backdrop-blur-[20px] shadow-2xl border border-pearl/5 text-[10px] font-mono text-pearl/40 uppercase tracking-widest cursor-pointer hover:text-gold hover:border-gold/20 hover:bg-gold/5 transition-all pointer-events-auto"
          >
            مسار شبحي مفعل: {ghostAction.title}
            <Sparkles className="w-3 h-3 inline-block ml-2 text-gold/60" />
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={transitionSpec}
            className="absolute bottom-16 left-0 bg-cosmic/80 backdrop-blur-[30px] border border-gold/10 p-4 rounded-[2rem] w-64 shadow-2xl shadow-gold/5 flex flex-col gap-2 pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-2 px-2">
              <PhaseIcon className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest">إدراك حصري</span>
            </div>
            
            <button 
              onClick={executeGhostPath}
              className="w-full text-right px-4 py-3 rounded-2xl bg-white/5 hover:bg-gold/10 hover:text-gold transition-all text-xs font-bold text-pearl border border-transparent hover:border-gold/20 flex items-center justify-between group"
            >
              <span>{ghostAction.title}</span>
              <Command className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={() => {
                hapticFeedback('success');
                setIsOpen(false);
              }}
              className="w-full text-right px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-pearl/60 border border-transparent"
            >
              فتح التناغم البصري
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleDial}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: harmonyState === 'kinetic' ? '0 0 30px rgba(242,201,76,0.3)' : '0 0 0px rgba(242,201,76,0)'
        }}
        className={`w-14 h-14 rounded-full liquid-glass border border-gold/20 flex items-center justify-center text-pearl transition-all duration-700 pointer-events-auto ${isOpen ? 'bg-gold/10 border-gold/40' : ''}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="open" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Fingerprint className="w-6 h-6 text-gold" />
            </motion.div>
          ) : (
            <motion.div key="closed" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <PhaseIcon className="w-6 h-6 text-gold/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
