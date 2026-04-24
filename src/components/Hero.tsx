import { motion } from 'motion/react';
import { ArrowLeft, Landmark, Share2, ShieldAlert } from 'lucide-react';
import PulseChart from './PulseChart';
import { hapticFeedback } from '../lib/utils';
import { useLanguage } from '../hooks/useLanguage';
import { soundscapes } from '../lib/soundscapes';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-cosmic pt-32 pb-24" id="hero">
      {/* Liquid Mesh Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-12 gold-glow">
              <ShieldAlert className="w-3 h-3 text-gold" />
              {t('hero_badge')}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-black text-pearl leading-[0.9] mb-10 tracking-tighter">
              {t('hero_title_1')}
              <span className="block italic text-gold opacity-90 pb-4">{t('hero_title_2')}</span>
            </h1>
            
            <p className="text-lg text-pearl/50 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              {t('hero_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => {
                  hapticFeedback('quantum');
                  soundscapes.playCosmic();
                  document.dispatchEvent(new CustomEvent('changeSection', { detail: 'vault' }));
                }}
                className="w-full sm:w-auto bg-gold text-cosmic px-10 py-5 rounded-2xl font-black text-xl hover:bg-pearl transition-all shadow-2xl shadow-gold/20 flex items-center justify-center gap-4 active:scale-95 group no-underline"
              >
                {t('hero_button_vault')}
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform rtl:rotate-180" />
              </button>
              <button 
                onClick={() => {
                  hapticFeedback('medium');
                  soundscapes.playCosmic();
                  document.dispatchEvent(new CustomEvent('changeSection', { detail: 'forge' }));
                }}
                className="w-full sm:w-auto bg-white/5 text-pearl px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-4 active:scale-95 no-underline"
              >
                {t('hero_button_forge')}
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-24 space-y-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'سيولة الاحترافية', value: '1.42T', sub: 'Units', icon: Landmark },
                { label: 'معدل الأتمتة', value: '98.6%', sub: 'Active', icon: Landmark },
                { label: 'دورة التوليد', value: '0.04s', sub: 'Instant', icon: Landmark },
                { label: 'أمان القبو', value: 'MULTI', sub: 'Sig', icon: Landmark },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-6 liquid-glass rounded-3xl border border-white/5 hover:border-gold/30 transition-all">
                  <div className="text-[10px] font-mono text-gold/60 uppercase tracking-widest">{item.label}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-serif font-bold text-pearl">{item.value}</span>
                    <span className="text-[10px] text-pearl/40 font-mono">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="max-w-2xl mx-auto">
              <PulseChart />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
