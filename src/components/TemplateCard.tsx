import { Star, Eye, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Template } from '../types';
import { useCurrency } from '../hooks/useCurrency';
import { hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';
import React from 'react';

interface TemplateCardProps {
  template: Template;
  onPreview: () => void;
  key?: string | number;
}

const TemplateCard = React.memo(({ template, onPreview }: TemplateCardProps) => {
  const { formatCurrency } = useCurrency();
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
        className="lovable-glass group rounded-[2rem] overflow-hidden flex flex-col h-full cursor-pointer relative transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] bg-black/40 hover:bg-black/20"
      >
        {/* Platinum Accent Border Overlay */}
        <div className="absolute inset-0 border border-platinum/10 rounded-[2rem] pointer-events-none group-hover:border-platinum/30 transition-colors" />

        {/* Big Thumbnail Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={template.thumbnail} 
            alt={template.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Badge & Meta */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-pearl/80 border border-white/10 uppercase tracking-tighter">
              {template.category}
            </span>
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
              Live Preview
            </button>
            <div className="flex gap-2">
              <button 
                onClick={async (e) => {
                  e.stopPropagation();
                  hapticFeedback('heavy');
                  try {
                    const resp = await fetch('/api/payments/create', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ templateId: template.id, amount: template.price })
                    });
                    const data = await resp.json();
                    
                    if (data.invoice_url && data.invoice_url !== "#") {
                      window.open(data.invoice_url, '_blank');
                    } else if (data.id) {
                      // Demo Flow -> Auto Confirm
                      document.dispatchEvent(new CustomEvent('changeSection', { detail: 'orderConf' }));
                    }
                  } catch (err) {}
                }}
                className="bg-gold text-cosmic px-8 py-2 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
              >
                شراء الآن
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
          
          <p className="text-pearl/50 text-sm leading-relaxed mb-8 line-clamp-2 font-sans font-light">
            {template.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/40 to-platinum/20 flex items-center justify-center p-px">
                <img 
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${template.author}`} 
                  alt={template.author} 
                  className="w-full h-full rounded-full bg-cosmic p-1 opacity-80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-[11px] font-medium text-pearl/70 truncate max-w-[100px]">{template.author}</span>
            </div>
            
            <div className="text-xl font-serif font-black text-gold">
              {formatCurrency(template.price)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default TemplateCard;
