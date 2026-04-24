import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Globe2, 
  Activity,
  Box,
  Cpu
} from 'lucide-react';
import { cn, hapticFeedback } from '../lib/utils';
import PulseChart from './PulseChart';

const MARKET_METRICS = [
  { label: 'Asset Alpha', val: '+2.41%', trend: 'up' },
  { label: 'Empire Omega', val: '-0.12%', trend: 'down' },
  { label: 'Quantum Flux', val: '0.842', trend: 'neutral' },
  { label: 'Void Entropy', val: 'Minimal', trend: 'up' },
];

export default function MarketIntelligence() {
  return (
    <div className="p-8 lg:p-16 space-y-16 max-w-[1600px] mx-auto animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-7xl font-serif font-black text-pearl tracking-tighter leading-none">
          Market <span className="italic text-gold italic-glow">Intelligence</span>
        </h2>
        <p className="text-pearl/40 font-mono text-sm uppercase tracking-widest max-w-2xl">
          Real-time forensic analysis of the digital asset landscape. Predicting shifts in the Premium Liquidity Index using Neural-Net extrapolation.
        </p>
      </div>

      {/* Live Ticker Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MARKET_METRICS.map((m, i) => (
          <div key={i} className="liquid-glass p-6 rounded-3xl flex items-center justify-between group hover:border-gold/30 transition-all cursor-crosshair">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-pearl/40 uppercase tracking-widest">{m.label}</span>
              <span className={cn(
                "text-xl font-black",
                m.trend === 'up' ? "text-emerald-400" : m.trend === 'down' ? "text-rose-400" : "text-pearl"
              )}>{m.val}</span>
            </div>
            {m.trend === 'up' ? <ArrowUpRight className="w-5 h-5 text-emerald-400 opacity-40" /> : <ArrowDownRight className="w-5 h-5 text-rose-400 opacity-40" />}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Liquidity Matrix */}
        <div className="xl:col-span-2 space-y-8">
           <div className="liquid-glass-heavy p-12 rounded-[3.5rem] relative overflow-hidden h-[600px] flex flex-col">
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <h3 className="text-3xl font-serif font-black text-pearl mb-2">Global Liquidity Matrix</h3>
                    <div className="flex items-center gap-4">
                       <span className="text-gold font-mono text-xs font-bold tracking-widest uppercase">Protocol Alpha-7</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                    </div>
                 </div>
                 <div className="flex gap-2">
                    {['1H', '24H', '7D', 'ALL'].map(t => (
                      <button 
                        key={t} 
                        onClick={() => hapticFeedback('light')}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all",
                          t === '24H' ? "bg-gold text-cosmic" : "bg-white/5 text-pearl/40 hover:text-pearl"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="flex-1 w-full bg-white/5 rounded-[2rem] border border-white/5 relative flex items-center justify-center group">
                 <PulseChart />
                 <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
                    <Globe2 className="w-64 h-64 text-gold" />
                 </div>
              </div>

              <div className="mt-8 flex items-center justify-between px-4">
                 <div className="flex gap-12">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono text-pearl/30 uppercase tracking-widest">Net Inflow</span>
                       <span className="text-xl font-serif font-bold text-emerald-400">+$842.1M</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono text-pearl/30 uppercase tracking-widest">Volatility</span>
                       <span className="text-xl font-serif font-bold text-gold">LOW (0.02)</span>
                    </div>
                 </div>
                 <button 
                   onClick={() => hapticFeedback('success')}
                   className="text-xs font-black text-gold/60 hover:text-gold uppercase tracking-widest transition-all"
                 >
                   Download Report
                 </button>
              </div>
           </div>
        </div>

        {/* Tactical Intel */}
        <div className="space-y-8">
           <div className="liquid-glass p-12 rounded-[3.5rem] border border-pearl/5 h-full">
              <div className="flex items-center gap-3 mb-10 text-gold">
                 <Activity className="w-6 h-6" />
                 <h3 className="text-2xl font-serif font-black italic">Tactical Operations</h3>
              </div>

              <div className="space-y-8">
                 {[
                   { label: 'Vault Allocation', val: '84%', desc: 'Current Premium Storage', icon: Box },
                   { label: 'Yield Harvesting', val: '4.2%', desc: 'Automated Compounding', icon: TrendingUp },
                   { label: 'Engine Velocity', val: '99%', desc: 'Network Performance', icon: Cpu },
                 ].map((op, i) => (
                   <div key={i} className="space-y-4">
                      <div className="flex justify-between items-end">
                         <div className="flex items-center gap-3">
                            <op.icon className="w-4 h-4 text-gold/60" />
                            <span className="text-xs font-black text-pearl/80 uppercase">{op.label}</span>
                         </div>
                         <span className="text-xl font-serif font-bold text-gold">{op.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: op.val }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-gradient-to-r from-gold/50 to-gold"
                         />
                      </div>
                      <p className="text-[9px] font-mono text-pearl/30 uppercase tracking-widest">{op.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="mt-16 p-6 rounded-3xl bg-gold/5 border border-gold/10">
                 <p className="text-xs font-mono text-gold/60 uppercase leading-relaxed text-center italic">
                   "The Empire's pulse is the rhythmic expansion of our digital premiumty."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
