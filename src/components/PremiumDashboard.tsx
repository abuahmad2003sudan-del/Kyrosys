import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Zap, 
  Activity, 
  Lock, 
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';
import PulseChart from './PulseChart';
import { cn, hapticFeedback } from '../lib/utils';
import { useCosmicHarmony } from '../hooks/useCosmicHarmony';
import { useCurrency } from '../hooks/useCurrency';
import GoldDust from './GoldDust';
import { soundscapes } from '../lib/soundscapes';
import { useLanguage } from '../hooks/useLanguage';
import React from 'react';

export default function PremiumDashboard() {
  const { t } = useLanguage();
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [goldDustTrigger, setGoldDustTrigger] = useState(0);
  const [dustOrigin, setDustOrigin] = useState({ x: 0.5, y: 0.5 });
  const { harmonyState, transitionSpec } = useCosmicHarmony();
  const { formatCurrency } = useCurrency();

  const handleRebalance = (e: React.MouseEvent) => {
    // Escalate haptic power and play cosmic sound
    hapticFeedback('yield-harvest');
    soundscapes.playCosmic();
    
    // Calculate relative click position for dust origin
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    setIsRebalancing(true);
    setDustOrigin({ x, y });
    setGoldDustTrigger(prev => prev + 1);
    
    console.log("[SYSTEM] Data Rebalance Initiated...");
    setTimeout(() => {
      setIsRebalancing(false);
      soundscapes.playChime();
      console.log("[SYSTEM] Parameters Optimized.");
    }, 4000);
  };
  return (
    <motion.div 
      layout
      transition={transitionSpec}
      className={cn(
        "p-4 sm:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000",
        harmonyState === 'ethereal' ? "space-y-16" : "space-y-8"
      )}
    >
      <GoldDust trigger={goldDustTrigger} origin={dustOrigin} />
      {/* Header Metrics */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 text-gold mb-2">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em]">Secure Protocol v2.126</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-pearl tracking-tighter leading-none">
            {t('dash_title')}
          </h1>
          <p className="text-pearl/40 text-xs font-mono uppercase tracking-widest mt-2">{t('dash_subtitle')}</p>
        </div>
        
        <div className="flex w-full lg:w-auto">
          <button 
            onClick={handleRebalance}
            disabled={isRebalancing}
            className="w-full lg:w-auto px-6 py-3 rounded-full bg-gold text-cosmic font-black text-xs uppercase tracking-widest hover:bg-pearl transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
          >
            {isRebalancing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              t('dash_rebalance')
            )}
          </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: t('dash_liquidity'), value: formatCurrency(1420000000000, true), change: '+12.4%', icon: Globe },
          { label: t('dash_vault'), value: '84.2%', change: '+0.8%', icon: Shield },
          { label: t('dash_yield'), value: formatCurrency(840000000, true), change: '+5.2%', icon: TrendingUp },
          { label: t('dash_velocity'), value: '42k/s', change: 'Stable', icon: Zap },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="liquid-glass p-5 sm:p-6 rounded-3xl sm:rounded-[2.5rem] border border-pearl/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="w-12 h-12 sm:w-16 sm:h-16 text-gold" />
            </div>
            
            <div className="flex flex-col gap-2 sm:gap-4 relative z-10">
              <span className="text-[9px] sm:text-[10px] font-mono text-pearl/40 uppercase tracking-widest">{stat.label}</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-4xl font-serif font-black text-pearl drop-shadow-lg">{stat.value}</span>
                <span className={cn(
                  "text-[10px] sm:text-xs font-bold",
                  stat.change.includes('+') ? "text-emerald-400" : "text-pearl/40"
                )}>
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Intel Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 liquid-glass-heavy p-10 rounded-[3rem] relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-serif font-black text-pearl mb-1">{t('dash_matrix')}</h3>
              <p className="text-xs font-mono text-pearl/40 uppercase tracking-widest">Growth Performance Monitoring</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 rounded-full px-4 py-2 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-pearl/60">Live Analytics</span>
            </div>
          </div>
          
          <div className="h-[300px]">
             <PulseChart />
          </div>
        </div>

        {/* Market Intel / Side Actions */}
        <div className="space-y-6">
          <div className="liquid-glass p-10 rounded-[3rem] border border-pearl/5 h-full">
            <h3 className="text-xl font-serif font-black text-gold mb-8 italic">{t('dash_intel')}</h3>
            
            <div className="space-y-6">
              {[
                { label: 'Data Processing', status: 'Optimal', val: '0.04s' },
                { label: 'Traffic Security', status: 'Active', val: '100%' },
                { label: 'Cloud Sync', status: 'Pending', val: 'SYNC' },
                { label: 'Auth Status', status: 'Verified', val: 'PASS' },
                { label: 'Payment Engine', status: 'Operational', val: 'NOW' },
                { label: 'Escrow Pulse', status: 'Active', val: 'T-24h' },
              ].map((intel, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-pearl/5 last:border-0">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-pearl/80 uppercase">{intel.label}</span>
                    <span className="text-[9px] font-mono text-pearl/40 uppercase tracking-widest">{intel.status}</span>
                  </div>
                  <div className="text-sm font-mono text-gold px-3 py-1 bg-gold/5 rounded-lg border border-gold/10">
                    {intel.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gold/10">
              <button 
                onClick={async () => {
                  hapticFeedback('heavy');
                  soundscapes.playReverb();
                  try {
                    await fetch('/api/cron/pulse', { method: 'POST' });
                    setGoldDustTrigger(prev => prev + 1);
                  } catch (e) {}
                }}
                className="w-full py-4 bg-gold text-cosmic rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                Trigger Elite Pulse
              </button>
            </div>

            <button 
              onClick={() => {
                hapticFeedback('quantum');
                document.dispatchEvent(new CustomEvent('changeSection', { detail: 'market' }));
              }}
              className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-pearl/60 uppercase tracking-widest hover:text-gold hover:border-gold/30 transition-all flex items-center justify-center gap-2 group"
            >
              View Full Matrix
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Operations Bar */}
      <div className="liquid-glass-heavy p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 overflow-hidden w-full">
          <div className="flex items-center gap-3 shrink-0">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-gold/60">التزامن الكوني</span>
          </div>
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0 hide-scrollbar">
            {['Escrow Release: Lunar Zenith Alignment', 'Quantum Rebalance: Metatron Protocol', 'Yield Harvesting: Solar Eclipse Phase'].map((op, i) => (
              <button 
                key={i} 
                onClick={() => {
                  hapticFeedback('light');
                  document.dispatchEvent(new CustomEvent('changeSection', { detail: 'treasury' }));
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 hover:bg-gold/10 hover:text-gold transition-colors rounded-full text-[8px] sm:text-[9px] font-mono text-pearl/40 uppercase tracking-tight whitespace-nowrap shrink-0 border border-transparent hover:border-gold/20"
              >
                {op}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
           <span className="text-[8px] sm:text-[10px] font-mono text-pearl/20 uppercase tracking-widest">Protocol 2.126.A</span>
           <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500/50" />
        </div>
      </div>

      {/* Designed for Professionals Section */}
      <div className="mt-16 pt-16 border-t border-gold/10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-serif font-black text-pearl flex items-center gap-3">
              <Shield className="w-6 h-6 text-gold" />
              مصمم للمحترفين ووكالات التسويق
            </h2>
            <p className="text-pearl/50 mt-2 font-light">مجموعة أصول مخصصة تضمن أداءً لا يقبل المساومة في العيادات والوكالات المرموقة.</p>
          </div>
          <button 
            onClick={() => document.dispatchEvent(new CustomEvent('changeSection', { detail: 'vault' }))}
            className="flex items-center gap-2 text-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            تصفح القائمة الكاملة <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {['medical', 'realestate', 'agency'].map((niche, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all cursor-pointer group">
               <div className="flex justify-between items-start mb-6">
                 <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold/40">
                   مفضل لدى وكالات التسويق
                 </span>
                 <Lock className="w-4 h-4 text-pearl/40 group-hover:text-gold transition-colors" />
               </div>
               <h3 className="text-2xl font-black text-pearl mb-2">قالب {niche === 'medical' ? 'طبي' : niche === 'realestate' ? 'عقاري' : 'وكالة تخطيط'} متقدم</h3>
               <p className="text-pearl/50 text-sm font-light mb-6">حلول جاهزة بتقنية AI لرفع معدلات التحويل وتوفير أيام من وقت التطوير.</p>
               <button onClick={() => document.dispatchEvent(new CustomEvent('changeSection', { detail: 'vault' }))} className="w-full py-3 rounded-full bg-black/40 text-pearl/80 border border-white/10 font-bold text-xs uppercase hover:bg-gold/10 hover:text-gold transition-all">استكشف الأصل</button>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
