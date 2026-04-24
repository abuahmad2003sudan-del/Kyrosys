import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, ALL_TEMPLATES, ASSET_CLASSES } from '../constants';
import TemplateCard from './TemplateCard';
import { Layers, Loader2, Search, Zap, Crown, Package } from 'lucide-react';
import { hapticFeedback } from '../lib/utils';
import Fuse from 'fuse.js';
import { Template } from '../types';

export default function TemplateGrid({ 
  searchQuery = '', 
  onPreview 
}: { 
  searchQuery?: string,
  onPreview: (template: Template) => void 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAssetClass, setSelectedAssetClass] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fuse = useMemo(() => new Fuse(ALL_TEMPLATES, {
    keys: ['title', 'description', 'author', 'tags'],
    threshold: 0.3
  }), []);

  const filteredTemplates = useMemo(() => {
    let results = ALL_TEMPLATES;

    if (searchQuery) {
      results = fuse.search(searchQuery).map(r => r.item);
    }

    return results.filter(t => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesAssetClass = selectedAssetClass === 'all' || t.assetClass === selectedAssetClass;
      return matchesCategory && matchesAssetClass;
    });
  }, [selectedCategory, selectedAssetClass, searchQuery, fuse]);

  const visibleTemplates = filteredTemplates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTemplates.length;

  const loadMore = () => {
    hapticFeedback('medium');
    setIsLoadingMore(true);
    // Simulate network delay for that "liquid" feel
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
      hapticFeedback('light');
    }, 800);
  };

  return (
    <section className="py-32 bg-cosmic relative overflow-hidden" id="vault">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gold">
              <Layers className="w-6 h-6" />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em]">Curated Assets</span>
            </div>
            <h2 className="text-6xl font-serif font-black text-pearl tracking-tighter leading-none">
              The Elite <span className="italic text-gold">Vault</span>
            </h2>
            <p className="text-pearl/40 font-light max-w-lg leading-relaxed">A meticulously selected archive of premium digital assets, verified through our Premium Protocols for immediate deployment.</p>
          </div>
          
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    hapticFeedback('light');
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-8 py-3 rounded-xl text-xs font-black transition-all shrink-0 active:scale-95 border tracking-widest uppercase ${
                    selectedCategory === cat.id 
                      ? 'bg-gold text-cosmic border-gold shadow-lg shadow-gold/20' 
                      : 'bg-white/5 text-pearl/40 hover:text-pearl border-white/5 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar">
              <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest mr-4 shrink-0">Class:</span>
              <button
                onClick={() => setSelectedAssetClass('all')}
                className={`px-6 py-2 rounded-lg text-[10px] font-mono transition-all shrink-0 active:scale-95 border tracking-tighter uppercase ${
                  selectedAssetClass === 'all' 
                    ? 'bg-pearl text-black border-pearl shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                    : 'bg-black/40 text-pearl/20 hover:text-gold border-white/5 hover:border-gold/20'
                }`}
              >
                All Tiers
              </button>
              {ASSET_CLASSES.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => {
                    hapticFeedback('quantum');
                    setSelectedAssetClass(cls.id);
                  }}
                  className={`px-6 py-2 rounded-lg text-[10px] font-mono transition-all shrink-0 active:scale-95 border tracking-tighter uppercase ${
                    selectedAssetClass === cls.id 
                      ? 'bg-pearl text-black border-pearl shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'bg-black/40 text-pearl/20 hover:text-gold border-white/5 hover:border-gold/20'
                  }`}
                >
                  {cls.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Commercial Bundles Row */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
           <motion.div 
             whileHover={{ y: -10 }}
             className="p-8 rounded-[2.5rem] bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 relative overflow-hidden group"
           >
              <Package className="w-10 h-10 text-gold mb-6" />
              <h4 className="text-2xl font-serif font-black text-pearl mb-2">حزمة الذهب الاحترافية</h4>
              <p className="text-pearl/40 text-sm mb-6">احصل على 50 قالب فاخر من فئة OMEGA بخصم حصري.</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-gold">$499</span>
                <button className="bg-gold text-cosmic px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest">امتلك الآن</button>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -10 }}
             className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 relative overflow-hidden group"
           >
              <Zap className="w-10 h-10 text-pearl/60 mb-6" />
              <h4 className="text-2xl font-serif font-black text-pearl mb-2">حزمة البداية السريعة</h4>
              <p className="text-pearl/40 text-sm mb-6">100 قالب من الفئة المتنوعة لبناء إمبراطوريتك فوراً.</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-pearl">$299</span>
                <button className="bg-white/10 text-pearl px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest">تفعيل الحزمة</button>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -10 }}
             className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 to-transparent border border-indigo-500/30 relative overflow-hidden group"
           >
              <Crown className="w-10 h-10 text-indigo-400 mb-6" />
              <h4 className="text-2xl font-serif font-black text-pearl mb-2">وصول مدى الحياة</h4>
              <p className="text-pearl/40 text-sm mb-6">الدخول الكامل لجميع الأصول الحالية والمستقبلية للأبد.</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-indigo-400">$1,299</span>
                <button 
                  onClick={async () => {
                    hapticFeedback('quantum');
                    try {
                      const r = await fetch('/api/payments/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ templateId: 'LIFETIME_ELITE', amount: 1299 })
                      });
                      const d = await r.json();
                      if (d.id) alert(`[IMPERIAL ACCESS] Elite Invitation Sent: ${d.order_id}`);
                    } catch (e) {}
                  }}
                  className="bg-indigo-500 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  انضم للنخبة
                </button>
              </div>
           </motion.div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {visibleTemplates.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                onPreview={() => onPreview(template)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-32 text-center">
            <button 
              onClick={loadMore}
              disabled={isLoadingMore}
              className="bg-white/5 border border-white/10 text-pearl/60 hover:text-gold hover:border-gold/30 px-12 py-5 rounded-2xl font-black text-sm transition-all active:scale-95 group uppercase tracking-[0.2em] relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                    جاري استدعاء المزيد...
                  </>
                ) : (
                  'استكشاف المزيد من الأصول النادرة'
                )}
              </span>
              <motion.div 
                className="absolute inset-0 bg-gold/5"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </button>
            <p className="mt-6 text-xs font-mono text-pearl/20 uppercase tracking-widest">
              يتم عرض {visibleTemplates.length} من {filteredTemplates.length} أصل حصري
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
