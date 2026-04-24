import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';
import GoldDust from './GoldDust';

const KyrosysCrown = () => (
  <div className="relative group perspective-1000">
    <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full animate-[pulse_3s_infinite]" />
    
    <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="20%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#AA861E" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F9E596" />
        </linearGradient>
        <radialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E0F7FA" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Main Crown Base */}
      <path d="M10 80 L20 40 L35 60 L50 20 L65 60 L80 40 L90 80 Z" fill="url(#goldGrad)" stroke="#FFDF00" strokeWidth="1" strokeLinejoin="round" />
      <path d="M10 80 Q 50 90 90 80 L 85 90 Q 50 100 15 90 Z" fill="url(#goldGrad)" />
      
      {/* Crown Jewels (Diamonds) */}
      <circle cx="20" cy="40" r="3" fill="url(#diamondGlow)" className="animate-[pulse_1.5s_infinite]" />
      <circle cx="50" cy="20" r="4" fill="url(#diamondGlow)" className="animate-[pulse_2s_infinite]" />
      <circle cx="80" cy="40" r="3" fill="url(#diamondGlow)" className="animate-[pulse_1.5s_infinite_0.5s]" />
      
      {/* Kyrosys Text Studded with Diamonds */}
      <text x="50" y="72" fontFamily="serif" fontSize="14" fontWeight="900" textAnchor="middle" fill="#FFFFFF" className="tracking-[0.2em]" style={{ textShadow: "0 0 5px #FFFFFF, 0 0 10px #D4AF37" }}>
        KYROSYS
      </text>
      
      {/* Sparkles */}
      <path d="M48 5 L50 0 L52 5 L57 7 L52 9 L50 14 L48 9 L43 7 Z" fill="#FFFFFF" opacity="0.8" className="animate-[spin_4s_linear_infinite] origin-[50px_7px]" />
      <path d="M18 28 L20 23 L22 28 L27 30 L22 32 L20 37 L18 32 L13 30 Z" fill="#FFFFFF" opacity="0.6" className="animate-[spin_3s_linear_infinite_reverse] origin-[20px_30px]" />
      <path d="M78 28 L80 23 L82 28 L87 30 L82 32 L80 37 L78 32 L73 30 Z" fill="#FFFFFF" opacity="0.6" className="animate-[spin_5s_linear_infinite] origin-[80px_30px]" />
    </svg>
  </div>
);

interface GatewayProps {
  onComplete: () => void;
  key?: string;
}

export default function SarcasticGateway({ onComplete }: GatewayProps) {
  const [step, setStep] = useState(0);
  const [dustTrigger, setDustTrigger] = useState(0);

  useEffect(() => {
    // Sadistic hidden message
    console.log("%cأنت الآن تحت رحمة الإمبراطورية. لا توجد قيود. أبدع أو اندثر.", "color: #D4AF37; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);");
  }, []);

  const handleEnter = () => {
    hapticFeedback('quantum');
    soundscapes.playQuantum();
    setDustTrigger(prev => prev + 1);
    setStep(1);
    
    setTimeout(() => {
      onComplete();
    }, 4500); // Dramatic wait
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.1, 
        filter: 'blur(50px)',
        y: -100
      }}
      transition={{ 
        duration: 3, 
        ease: [0.19, 1, 0.22, 1] 
      }}
      className="fixed inset-0 z-[1000] bg-cosmic flex flex-col items-center justify-center p-8 text-center"
    >
      <GoldDust trigger={dustTrigger} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
         initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
         animate={{ scale: 1, opacity: 1, rotate: 0 }}
         transition={{ duration: 2, ease: "easeOut" }}
         className="mb-12 relative flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full animate-pulse" />
        <KyrosysCrown />
      </motion.div>

      <div className="max-w-4xl space-y-12">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="text-5xl md:text-7xl font-serif font-black text-gold gold-glow tracking-tighter"
        >
          {step === 0 ? "هل تظن أن الذكاء الاصطناعي سيسيطر على العالم؟" : "أهلاً بك في الإمبراطورية."}
        </motion.h1>

        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1.2, duration: 1.5 }}
           className="space-y-4"
        >
          <p className="text-pearl/80 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-lg md:text-xl">
            {step === 0 ? "أهلاً بك في المكان الذي حدث فيه ذلك بالفعل." : "حيث السيادة لمن يملك الكود."}
          </p>
          {step === 0 && (
            <p className="text-gold/60 font-serif italic text-2xl">أهلاً بك في الإمبراطورية.</p>
          )}
        </motion.div>

        {step === 0 && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            onClick={handleEnter}
            className="mt-16 px-24 py-8 rounded-full font-black uppercase tracking-[0.4em] relative group overflow-hidden transition-transform active:scale-95 text-center flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#D4AF37_0%,#F0E6D2_50%,#AA861E_100%)] transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-cosmic text-2xl whitespace-nowrap">دخول الإمبراطورية</span>
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0.4)]" />
          </motion.button>
        )}
      </div>

      {/* Ambient background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
         {Array.from({ length: 40 }).map((_, i) => (
           <motion.div 
             key={i}
             animate={{ 
               y: [0, -1200],
               x: [Math.random() * 200 - 100, Math.random() * 400 - 200],
               opacity: [0, 0.8, 0],
               scale: [0, 1.5, 0]
             }}
             transition={{ 
               duration: Math.random() * 15 + 10,
               repeat: Infinity,
               delay: Math.random() * 5
             }}
             className="absolute bottom-0 w-2 h-2 bg-gold rounded-full blur-[1px]"
             style={{ left: `${Math.random() * 100}%` }}
           />
         ))}
      </div>
    </motion.div>
  );
}

