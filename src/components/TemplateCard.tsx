import { Star, Eye, ExternalLink, ShoppingBag, ShoppingCart } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Template } from '../types';
import { useCurrency } from '../hooks/useCurrency';
import { hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';
import { useCart } from '../context/CartContext';
import { PAYMENT_LINKS } from '../config/paymentLinks';
import React from 'react';

interface TemplateCardProps {
  template: Template;
  onPreview: () => void;
  key?: string | number;
}

const TemplateCard = React.memo(({ template, onPreview }: TemplateCardProps) => {
  const { formatCurrency } = useCurrency();
  const { addToCart } = useCart();
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-12px", "12px"]);
  const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-12px", "12px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAcquire = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    hapticFeedback('vault-unlock');
    const btn = e.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span class="animate-pulse">جاري التحويل...</span>';
    btn.disabled = true;
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
       if (data.invoice_url) {
         window.location.href = data.invoice_url;
       } else {
         alert(data.error || 'خطأ في الدفع');
         btn.innerHTML = originalContent;
         btn.disabled = false;
       }
    } catch (err) {
      alert('خطأ في الاتصال بخادم الدفع');
      btn.innerHTML = originalContent;
      btn.disabled = false;
    }
  };

  return (
    <div className="card-3d-wrapper">
      <motion.div 
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          hapticFeedback('quantum');
          soundscapes.playChime();
          onPreview();
        }}
        className="lovable-glass group rounded-[2rem] overflow-hidden flex flex-col h-full cursor-pointer relative transition-all duration-500 hover:border-gold/60 hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:bg-gold/5 bg-black/40"
      >
        {/* Platinum Accent Border Overlay */}
        <div className="absolute inset-0 border border-platinum/10 rounded-[2rem] pointer-events-none group-hover:border-platinum/30 transition-colors" />

        {/* Big Thumbnail Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img 
            style={{ x: imageX, y: imageY }}
            src={template.thumbnail} 
            alt={template.title} 
            className="w-[110%] h-[110%] object-cover -ml-[5%] -mt-[5%] group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Badge & Meta */}
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[80%]">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-pearl/80 border border-white/10 uppercase tracking-tighter">
              {template.category}
            </span>
            {template.isNiche && (
             <span className="bg-gold/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gold border border-gold/40 uppercase tracking-tighter shadow-lg">
               متخصص
             </span>
            )}
            {template.aiFeatures && template.aiFeatures.length > 0 && (
             <span className="bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-300 border border-blue-500/40 uppercase tracking-tighter shadow-lg">
               مدعوم بـ AI
             </span>
            )}
          </div>

          {/* Hover Action */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-cosmic/40 backdrop-blur-sm">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                hapticFeedback('quantum');
                onPreview();
              }}
              className="bg-pearl text-cosmic px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4" />
              معاينة حية
            </button>
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  hapticFeedback('medium');
                  addToCart(template);
                }}
                className="bg-white/10 backdrop-blur-md text-pearl px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                title="أضف إلى السلة"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                أضف إلى السلة
              </button>

              <button 
                onClick={handleAcquire}
                className="bg-gold/90 backdrop-blur-md text-cosmic px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border border-gold hover:bg-gold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                اشتري الآن
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-gold">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold font-mono">{template.rating}</span>
            </div>
            <div className="flex items-center gap-2 text-pearl/40">
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-widest">{template.reviews} verified</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-pearl mb-3 group-hover:text-gold transition-colors leading-tight">
            {template.title}
          </h3>
          
          <p className="text-pearl/50 text-sm leading-relaxed mb-4 line-clamp-2 font-sans font-light">
            {template.description}
          </p>

          {template.valueProposition && (
            <div className="mb-6 p-4 rounded-xl bg-gold/5 border border-gold/10">
              <span className="block text-xs font-bold text-gold mb-1">لماذا هذا القالب؟</span>
              <p className="text-xs text-pearl/70 font-medium leading-relaxed">{template.valueProposition}</p>
            </div>
          )}

          <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="text-xl font-serif font-black text-gold flex items-center gap-2">
                {template.originalPrice && (
                  <span className="text-sm text-pearl/30 line-through font-medium">{formatCurrency(template.originalPrice)}</span>
                )}
                {formatCurrency(template.price)}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    hapticFeedback('medium');
                    addToCart(template);
                  }}
                  className="bg-white/5 hover:bg-white/10 text-pearl p-2.5 rounded-xl border border-white/10 transition-all focus:ring-2 ring-gold/50"
                  title="أضف إلى السلة"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleAcquire}
                  className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  اشتري الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default TemplateCard;
