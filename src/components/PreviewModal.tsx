import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Shield, Zap, Star, ShoppingCart, Cpu, Globe, Maximize2, Monitor, Minimize2 } from 'lucide-react';
import { Template } from '../types';
import { ALL_TEMPLATES } from '../constants';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCurrency } from '../hooks/useCurrency';
import { hapticFeedback, cn } from '../lib/utils';
import GoldDust from './GoldDust';
import { soundscapes } from '../lib/soundscapes';
import React from 'react';

interface PreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

export default function PreviewModal({ template, onClose }: PreviewModalProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showFullIframe, setShowFullIframe] = useState(false);
  const [goldDustTrigger, setGoldDustTrigger] = useState(0);
  const [dustOrigin, setDustOrigin] = useState({ x: 0.5, y: 0.5 });
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();

  const handleAcquire = async (e: React.MouseEvent) => {
    if (!template) return;
    hapticFeedback('vault-unlock');
    soundscapes.playReverb();
    setIsPurchasing(true);
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    try {
      const resp = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          templateId: template.id, 
          price_amount: template.price,
          price_currency: 'usd',
          order_id: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase()
        })
      });
      const data = await resp.json();
      
      if (!resp.ok) {
        alert(`${data.error}\n${data.details}`);
        setIsPurchasing(false);
        return;
      }
      
      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
         alert('حدث خطأ في توجيه الدفع.');
         setIsPurchasing(false);
      }
    } catch(err) {
      alert("حدث خطأ في الاتصال بالخادم.");
      setIsPurchasing(false);
    }
  };

  const toggleIframe = () => {
    hapticFeedback('light');
    soundscapes.playReverb();
    setShowFullIframe(!showFullIframe);
  };

  if (!template) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-8 overflow-hidden">
        <GoldDust trigger={goldDustTrigger} origin={dustOrigin} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            hapticFeedback('light');
            onClose();
          }}
          className="absolute inset-0 bg-cosmic/95 backdrop-blur-[40px]"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100, filter: 'blur(10px)' }}
          animate={{ 
            opacity: 1, 
            scale: showFullIframe ? 1 : 1, 
            y: 0, 
            filter: 'blur(0px)',
            width: showFullIframe ? '100%' : 'auto',
            height: showFullIframe ? '100%' : 'auto'
          }}
          exit={{ opacity: 0, scale: 0.8, y: 100, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative w-full max-w-7xl h-full max-h-[90vh] bg-gradient-to-br from-[#12110F] via-cosmic to-[#0A0907] border border-gold/30 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(242,201,76,0.2)]",
            showFullIframe && "max-w-full max-h-full border-none rounded-none"
          )}
        >
          {/* Silken Gold Header */}
          <div className="h-16 border-b border-gold/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-gold animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest leading-none">Empire Unified Preview</span>
                <span className="text-sm font-serif font-black text-pearl tracking-tight">{template.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-pearl/40 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gold/40" />
                  <span>Real Display Mode</span>
                </div>
                <div className="w-px h-4 bg-pearl/10" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-emerald-400">Secure Protocol v2.1</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleIframe}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-gold/20 text-pearl hover:text-gold transition-all border border-white/5 group"
                  title="Toggle Fullscreen Invasion"
                >
                  {showFullIframe ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                </button>
                <button 
                  onClick={() => {
                    hapticFeedback('light');
                    onClose();
                  }}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-pearl hover:text-rose-500 transition-all border border-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-[calc(100%-4rem)]">
            {/* Main Interactive In-App Browser (The Invasion) */}
            <div className={cn(
              "flex-1 relative bg-black/60 group transition-all duration-700",
              showFullIframe ? "w-full overflow-hidden" : "w-full lg:w-[65%]"
            )}>
              {(!template.demoUrl || template.demoUrl === '#') ? (
                <img 
                  src={template.image || template.thumbnail} 
                  alt={template.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <iframe 
                  src={template.demoUrl} 
                  className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity"
                  title={`Elite Preview: ${template.title}`}
                  loading="lazy"
                />
              )}
              
              {/* Elite Color Transformation Overlay */}
              <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_100%)]" />
              <div className="absolute inset-0 pointer-events-none mix-blend-color opacity-20 bg-gold/5" />
              
              {!showFullIframe && (
                <div className="absolute inset-0 pointer-events-none border-r border-gold/10 bg-gradient-to-r from-cosmic/20 to-transparent" />
              )}
            </div>

            {/* Sidebar Intel (Hides on full invasion) */}
            {!showFullIframe && (
              <div className="w-full lg:w-[35%] p-8 overflow-y-auto no-scrollbar border-l border-gold/10 flex flex-col liquid-glass">
                <div className="mb-12">
                   <div className="flex items-center gap-2 text-gold mb-6">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-xl font-black">{template.rating}</span>
                    <span className="text-xs text-pearl/40 ml-2">({template.reviews} Elite Verifications)</span>
                  </div>
                  <h3 className="text-3xl font-serif font-black text-pearl mb-6 tracking-tighter italic">Asset Intelligence</h3>
                  <p className="text-pearl/60 text-sm leading-relaxed mb-8 font-light">
                    {template.description}
                  </p>

                   <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                       <Cpu className="w-5 h-5 text-gold/60" />
                       <span className="text-[10px] font-mono text-pearl/40 uppercase tracking-widest leading-none">Processing Unit</span>
                       <span className="text-xs font-bold text-pearl">Quantum Core 3.0</span>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                       <Globe className="w-5 h-5 text-gold/60" />
                       <span className="text-[10px] font-mono text-pearl/40 uppercase tracking-widest leading-none">Relay Network</span>
                       <span className="text-xs font-bold text-pearl">Global Edge 2126</span>
                    </div>
                  </div>

                  {/* Recommendation Engine: Similar Assets */}
                  <div className="mt-8">
                    <h4 className="text-xs font-mono text-gold/60 uppercase tracking-[0.3em] mb-4">Similar Assets in Nexus</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {ALL_TEMPLATES
                        .filter(t => t.category === template.category && t.id !== template.id)
                        .slice(0, 4)
                        .map(sim => (
                          <div 
                            key={sim.id} 
                            className="group cursor-pointer"
                            onClick={() => {
                               hapticFeedback('light');
                               // Logic to switch template preview would go here
                            }}
                          >
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all">
                              <img src={sim.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" loading="lazy" />
                              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black to-transparent">
                                <p className="text-[8px] font-bold text-pearl truncate uppercase">{sim.title}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-12 border-t border-pearl/5">
                   <div className="flex flex-col gap-6">
                      <div className="flex items-end justify-between">
                         <div>
                            <span className="text-[10px] font-mono text-pearl/40 uppercase tracking-widest mb-1 block">Value Offering</span>
                            <span className="text-4xl font-serif font-black text-gold gold-glow">{formatCurrency(template.price)}</span>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1 block">Status</span>
                            <span className="text-xs font-bold text-pearl/60">Ready for Transfer</span>
                         </div>
                      </div>

                      <button 
                        onClick={handleAcquire}
                        disabled={isPurchasing}
                        className="w-full relative group overflow-hidden py-5 rounded-[2rem] bg-gold text-cosmic font-black text-lg shadow-[0_20px_50px_rgba(242,201,76,0.3)] transition-all active:scale-95 disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pearl/20 via-transparent to-pearl/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {isPurchasing ? (
                          <div className="flex items-center justify-center gap-3">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-cosmic border-t-transparent rounded-full" />
                            <span>تأمين الأصول...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <ShoppingCart className="w-5 h-5" />
                            <span>اشتري الآن</span>
                          </div>
                        )}
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

