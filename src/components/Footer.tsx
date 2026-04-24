import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Phone, MapPin, Hexagon, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';

const QUOTES = [
  "الثروة ليست مجرد أرقام، إنها جاذبية تشوه نسيج الواقع.",
  "الكود هو القانون الحقيقي، والجمال هو عملته المطلقة.",
  "لا نبيع قوالب، نحن نبيع تذاكر للسيادة الرقمية.",
  "في الاحترافية، كل بكسل هو بيان قوة.",
  "العشوائية وهم. الفخامة هي هندسة الاحتمالات."
];

export default function Footer() {
  const [activeQuote, setActiveQuote] = useState<string | null>(null);

  const handleSealClick = () => {
    hapticFeedback('quantum');
    soundscapes.playChime();
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setActiveQuote(randomQuote);
    setTimeout(() => setActiveQuote(null), 5000);
  };

  return (
    <footer className="bg-cosmic text-pearl/40 py-24 border-t border-pearl/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Hexagon className="w-10 h-10 text-gold fill-gold/5" />
              <span className="text-2xl font-serif font-black text-pearl tracking-tighter gold-glow">KYROSYS</span>
            </div>
            <p className="text-sm leading-relaxed font-light">
              الكيان الحصري الرقمي الأول لإدارة وتداوُل الأصول الفاخرة. نراكم في المستقبل، حيث الكود هو القانون والجمال هو العملة.
            </p>
            <div className="flex items-center gap-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-pearl/20 hover:text-gold transition-all transform hover:scale-125">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold font-serif font-bold mb-8 text-lg uppercase tracking-widest">المناطق الحصرية</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li><a href="#" className="hover:text-pearl transition-colors">قبو الأصول الاوميغا</a></li>
              <li><a href="#" className="hover:text-pearl transition-colors">شبكة التوزيع الكمي</a></li>
              <li><a href="#" className="hover:text-pearl transition-colors">مشاريع الذكاء الاصطناعي</a></li>
              <li><a href="#" className="hover:text-pearl transition-colors">أرشيف الاحترافية</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-serif font-bold mb-8 text-lg uppercase tracking-widest">بروتوكولات</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li><a href="#" className="hover:text-pearl transition-colors">ميثاق السيادة</a></li>
              <li><a href="#" className="hover:text-pearl transition-colors">أمان الوصي الميكانيكي</a></li>
              <li><a href="#" className="hover:text-pearl transition-colors">سياسة الخصوصية المشفرة</a></li>
              <li><a href="#" className="hover:text-pearl transition-colors">شهادة النخبة</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-serif font-bold mb-8 text-lg uppercase tracking-widest">تواصل عبر الأثير</h4>
            <ul className="flex flex-col gap-6 text-sm">
              <li className="flex items-center gap-4"><MapPin className="w-4 h-4 text-gold/60" /> <span>القطاع المركزي، منصة 2126</span></li>
              <li className="flex items-center gap-4"><Mail className="w-4 h-4 text-gold/60" /> <span>core@kyrosys.empire</span></li>
              <li className="flex items-center gap-4 font-mono text-emerald-400 bg-emerald-400/5 px-3 py-1 rounded-md border border-emerald-400/10 w-fit">
                <span>SYSTEM_STATUS: OPTIMAL</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center justify-center gap-8 relative">
          
          <div className="relative h-24 flex flex-col items-center justify-center">
             <AnimatePresence mode="wait">
               {activeQuote ? (
                 <motion.p
                   key={activeQuote}
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="absolute text-xl md:text-2xl font-serif font-black text-gold italic text-center w-full max-w-2xl gold-glow"
                 >
                   "{activeQuote}"
                 </motion.p>
               ) : (
                 <motion.button 
                   key="seal"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onClick={handleSealClick}
                   className="group relative flex items-center justify-center"
                 >
                   <Hexagon className="w-12 h-12 text-gold/20 group-hover:text-gold transition-colors animate-[spin_10s_linear_infinite]" />
                   <Fingerprint className="absolute w-6 h-6 text-gold/40 group-hover:text-gold transition-colors" />
                   <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 </motion.button>
               )}
             </AnimatePresence>
          </div>

          <p className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">
            © 2126 KYROSYS SOVEREIGN ENTITY. ALL RIGHTS RESERVED IN ALL DIMENSIONS.
          </p>
        </div>
      </div>
    </footer>
  );
}
