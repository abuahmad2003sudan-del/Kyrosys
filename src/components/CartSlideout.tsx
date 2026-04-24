import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../hooks/useCurrency';
import { hapticFeedback } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { PAYMENT_LINKS } from '../config/paymentLinks';

export function CartSlideout() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, total, clearCart } = useCart();
  const { formatCurrency } = useCurrency();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    hapticFeedback('heavy');
    if (!user) {
      document.dispatchEvent(new CustomEvent('changeSection', { detail: 'orderConf' })); // Will trigger auth
      return;
    }
    
    window.open(PAYMENT_LINKS.checkout_cart || PAYMENT_LINKS.template_basic, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cosmic border-l border-white/10 z-[100] flex flex-col shadow-2xl"
            dir="rtl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <h2 className="text-2xl font-black text-pearl flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-gold" /> سلة المشتريات
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-pearl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-pearl/50">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">سلتك فارغة</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-3"
                  >
                    <img src={item.thumbnail} alt={item.title} className="w-24 h-20 object-cover rounded-xl" />
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-pearl text-sm line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gold font-black">{formatCurrency(item.price)}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-pearl/70 font-medium text-lg">الإجمالي</span>
                  <span className="text-3xl font-black text-gold gold-glow">{formatCurrency(total)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gold text-cosmic py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {loading ? (
                    <span className="animate-pulse">جاري التحويل לבوابة الدفع...</span>
                  ) : (
                    <>المتابعة للدفع الحقيقي <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
