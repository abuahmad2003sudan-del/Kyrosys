import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Mail, Phone, Zap, ArrowRight, Lock, CheckCircle2, BookOpen, PenTool, Lightbulb } from 'lucide-react';
import { confetti } from '../lib/confetti';
import { PAYMENT_LINKS } from '../config/paymentLinks';

export const AcademyPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto px-6 py-24 pb-48 text-center" dir="rtl">
    <div className="absolute inset-0 bg-gold/5 blur-[100px] -z-10 rounded-full" />
    <div className="flex justify-center mb-6">
      <div className="p-4 rounded-3xl bg-gold/10 border border-gold/30 gold-glow">
        <BookOpen className="w-12 h-12 text-gold" />
      </div>
    </div>
    <h1 className="text-5xl font-black text-pearl mb-6 gold-glow leading-tight">مركز التعلم الإمبراطوري</h1>
    <p className="text-xl text-pearl/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed">الوجهة التعليمية الأولى لتعريفك باستراتيجيات 2026 الرقمية.</p>
    
    <div className="grid md:grid-cols-2 gap-8 text-right">
      <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all">
        <div className="p-4 rounded-xl bg-gold/10 w-fit mb-6">
          <PenTool className="w-6 h-6 text-gold" />
        </div>
        <h3 className="text-2xl font-bold text-pearl mb-4">كيف تختار القالب المناسب لوكالتك؟</h3>
        <p className="text-pearl/60 leading-relaxed mb-6 font-light">لا يقتصر اختيار القالب على الشكل بل الجوهر. وكالات التسويق الناجحة في 2026 تحتاج لقوالب "متخصصة" بمرونة عالية...</p>
        <button className="text-gold flex items-center gap-2 hover:gap-3 transition-all text-sm font-bold uppercase tracking-wider">
           اقرأ المزيد <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all">
        <div className="p-4 rounded-xl bg-blue-500/10 w-fit mb-6">
          <Lightbulb className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-pearl mb-4">استخدام الذكاء الاصطناعي في التخصيص</h3>
        <p className="text-pearl/60 leading-relaxed mb-6 font-light">قوالبنا المزودة بـ AI تستطيع استخراج المحتوى وتحسينه بصورة فورية بناءً على أوامر لغوية بسيطة لتقليل زمن الإنتاج بنسبة 90%...</p>
        <button className="text-blue-400 flex items-center gap-2 hover:gap-3 transition-all text-sm font-bold uppercase tracking-wider">
           اقرأ المزيد <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  </motion.div>
);

export const AboutPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 py-24 pb-48 text-center" dir="rtl">
    <div className="absolute inset-0 bg-gold/5 blur-[100px] -z-10 rounded-full" />
    <h1 className="text-5xl font-black text-pearl mb-6 gold-glow">عن المنصة الذكية</h1>
    <p className="text-xl text-pearl/60 mb-12 leading-relaxed">
      نحن نمثل القوة الصاعدة في عالم الأصول الرقمية. بفضل بنيتنا التحتية المتقدمة، 
      نوفر للنخبة أكثر من 500 قالب احترافي، مقسمة إلى 11 فئة استراتيجية، مع دعم شامل لـ 4 لغات رئيسية. 
      تصميماتنا مبنية على "اللؤلؤة السوداء" والزجاج السائل لتعكس أعلى معايير الجودة.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div className="p-8 pb-12 glass-panel rounded-3xl border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-all">
        <h3 className="text-4xl font-black text-gold mb-2">500+</h3>
        <p className="text-sm font-bold text-pearl/50 uppercase tracking-widest">أصول فاخرة</p>
      </div>
      <div className="p-8 pb-12 glass-panel rounded-3xl border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-all">
        <h3 className="text-4xl font-black text-gold mb-2">11</h3>
        <p className="text-sm font-bold text-pearl/50 uppercase tracking-widest">فئات متقدمة</p>
      </div>
      <div className="p-8 pb-12 glass-panel rounded-3xl border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-all">
        <h3 className="text-4xl font-black text-gold mb-2">100%</h3>
        <p className="text-sm font-bold text-pearl/50 uppercase tracking-widest">ضمان الجودة</p>
      </div>
    </div>
  </motion.div>
);

export const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto px-6 py-24 pb-48" dir="rtl">
    <h1 className="text-4xl font-black text-pearl text-center mb-12">التواصل الاستراتيجي</h1>
    <div className="glass-panel border-white/10 rounded-3xl p-8 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-pearl/50 uppercase tracking-widest">الاسم الكامل</label>
            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-pearl focus:border-gold/50 outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-pearl/50 uppercase tracking-widest">البريد الإلكتروني</label>
            <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-pearl focus:border-gold/50 outline-none transition-colors" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-pearl/50 uppercase tracking-widest">الموضوع</label>
          <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-pearl focus:border-gold/50 outline-none transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-pearl/50 uppercase tracking-widest">الرسالة</label>
          <textarea rows={5} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-pearl focus:border-gold/50 outline-none transition-colors"></textarea>
        </div>
        <button className="w-full py-4 bg-gold text-cosmic font-black rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" /> إرسال البرقية المستعجلة
        </button>
      </form>
    </div>
  </motion.div>
);

export const PricingPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-6 py-24 pb-48 text-center" dir="rtl">
    <h1 className="text-5xl font-black text-pearl mb-6">النفوذ الرقمي</h1>
    <p className="text-xl text-pearl/50 mb-16 max-w-2xl mx-auto">اختر خطة النفوذ المناسبة لطموحاتك، واحصل على وصول حصري لمكاتب النخبة.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
      {[ 
        { name: 'البداية السريعة', price: 'مجاناً', features: ['وصول لـ 5 قوالب', 'دعم أساسي', 'تحديثات محدودة'] },
        { name: 'الاحترافي', price: '$19/شهر', features: ['وصول لامحدود', 'دعم أولوية', 'تحديثات شهرية', 'مولد قوالب حصري'], popular: true },
        { name: 'وصول مدى الحياة', price: '$199', features: ['جميع الميزات', 'نظام الوكالات', 'حزمة الذهب النخبوية', 'أسرار المنصة'] }
      ].map((plan, i) => (
        <div key={i} className={`p-8 rounded-3xl flex flex-col relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] ${plan.popular ? 'bg-gold border-gold text-cosmic shadow-2xl scale-105 z-10' : 'bg-white/5 border border-white/10 text-pearl'}`}>
          {plan.popular && <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-cosmic text-gold px-4 py-1 text-xs font-black rounded-full border border-gold">الأكثر طلباً</div>}
          <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
          <div className="text-5xl font-black mb-8">{plan.price}</div>
          <ul className="space-y-4 mb-8 flex-1">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-center gap-3 font-bold text-sm">
                <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-cosmic/50' : 'text-gold'}`} />
                {feature}
              </li>
            ))}
          </ul>
          <button onClick={() => {
              if(plan.price === 'مجاناً') {
                  document.dispatchEvent(new CustomEvent('changeSection', { detail: 'dashboard' }));
                  return;
              }
              const link = plan.name.includes('الاحترافي') ? PAYMENT_LINKS.subscription_monthly : 
                           plan.name.includes('الفضائي') ? PAYMENT_LINKS.subscription_yearly : PAYMENT_LINKS.template_basic;
              window.open(link, '_blank');
          }} className={`w-full py-4 rounded-xl font-black transition-colors ${plan.popular ? 'bg-cosmic text-gold hover:bg-white' : 'bg-white/10 text-pearl hover:bg-gold hover:text-cosmic'}`}>
            تفعيل الخطة
          </button>
        </div>
      ))}
    </div>
  </motion.div>
);

export const LegalPage = ({ title, content }: { title: string, content: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 py-24 pb-48" dir="rtl">
    <h1 className="text-4xl font-black text-pearl mb-8">{title}</h1>
    <div className="glass-panel border-white/10 rounded-3xl p-8 text-pearl/70 leading-relaxed space-y-6">
      {content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
    </div>
  </motion.div>
);

export const OrderConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = React.useState('pending');
  const [templateId, setTemplateId] = React.useState<string | null>(null);
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get('orderId');
    if (oid) {
       setOrderId(oid);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderId && orderStatus !== 'paid') {
       interval = setInterval(() => {
         fetch(`/api/orders/${orderId}/status`)
          .then(res => res.json())
          .then(data => {
             if (data.status) setOrderStatus(data.status);
             if (data.templateId) {
                setTemplateId(data.templateId);
                // In a real app we'd fetch the exact url for the template id
                // But for now, we just mock the DL file or use the template id
                setDownloadUrl(`/templates/templatemo_${data.templateId.split(',')[0]}.zip`); 
             }
          })
          .catch(e => console.error(e));
       }, 3000);
    }
    return () => clearInterval(interval);
  }, [orderId, orderStatus]);

  useEffect(() => {
    if (orderStatus === 'paid') {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF7D6', '#AA861E'],
        scalar: 0.7,
        zIndex: 2000
      });
    }
  }, [orderStatus]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center px-4" dir="rtl">
      {orderStatus === 'paid' ? (
        <>
          <div className="w-24 h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-black text-pearl mb-4">تم تأكيد الأصول بنجاح</h1>
          <p className="text-xl text-pearl/60 mb-8">عملية الدفع مكتملة. الأصل الرقمي الذي اشتريته متاح الآن للتحميل وسيبقى في سجلاتك.</p>
        </>
      ) : (
        <>
          <div className="w-24 h-24 bg-yellow-500/20 border border-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(234,179,8,0.3)] animate-pulse">
            <Lock className="w-12 h-12 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-black text-pearl mb-4">في انتظار الدفع...</h1>
          <p className="text-xl text-pearl/60 mb-8">نحن نتحقق من الدفع الآن. لن يظهر رابط التحميل حتى يتم التأكيد من البوابة الحقيقية.</p>
        </>
      )}
      
      <div className="w-full glass-panel border border-white/10 rounded-3xl p-6 text-right mb-8">
        <h3 className="font-bold text-lg mb-4 text-gold">تفاصيل العملية</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-pearl/50">رقم الفاتورة:</span>
            <span className="font-mono text-pearl">{orderId || 'جارٍ جلب...'}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-pearl/50">تاريخ الإصدار:</span>
            <span className="text-pearl">{new Date().toLocaleString('ar-SA')}</span>
          </div>
          <div className="flex justify-between pt-2 items-center">
            <span className="text-pearl/50">الملف جاهز:</span>
            {orderStatus === 'paid' ? (
              <a 
                href={downloadUrl || '#'}
                download
                className="bg-gold text-cosmic font-black px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer"
              >
                تحميل الملف (ZIP) <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-pearl/30 flex items-center gap-2"><Lock className="w-4 h-4"/> مؤمن</span>
            )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => {
           window.history.pushState({}, '', '/');
           document.dispatchEvent(new CustomEvent('changeSection', { detail: 'dashboard' }))
        }}
        className="bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-gold/10 px-8 py-3 rounded-full text-sm font-bold text-pearl transition-all"
      >
        العودة للوحة القيادة
      </button>
    </motion.div>
  );
};
