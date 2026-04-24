import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, ArrowDownLeft, ArrowUpRight, Shield, Zap } from 'lucide-react';
import { hapticFeedback } from '../lib/utils';
import { useCurrency } from '../hooks/useCurrency';
import GoldDust from '../components/GoldDust';

export const TreasuryPage = () => {
  const { formatCurrency } = useCurrency();
  const [amount, setAmount] = useState('100');
  const [loading, setLoading] = useState(false);
  const [dustTrigger, setDustTrigger] = useState(0);

  const handleDeposit = async () => {
    hapticFeedback('heavy');
    setLoading(true);
    setDustTrigger(prev => prev + 1);

    try {
      const resp = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: `wallet_deposit`, amount: amount })
      });
      const data = await resp.json();
      if (data.invoice_url && data.invoice_url !== "#") {
        window.open(data.invoice_url, '_blank');
      } else if (data.id) {
        document.dispatchEvent(new CustomEvent('changeSection', { detail: 'orderConf' }));
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 pb-48 text-right" dir="rtl">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-pearl mb-4 flex items-center justify-start gap-4">
          <Wallet className="w-12 h-12 text-gold" /> الخزينة والمحفظة
        </h1>
        <p className="text-xl text-pearl/50">قم بإدارة أصولك المالية والاشتراكات ببنية تحتية لامركزية آمنة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 glass-panel border-white/10 rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full" />
          <div>
            <h3 className="text-sm font-bold text-pearl/50 uppercase tracking-widest mb-2">رصيد الأصول المتاح</h3>
            <div className="text-7xl font-sans font-black text-gold gold-glow">{formatCurrency(0)}</div>
          </div>
          <div className="flex gap-4 mt-12">
            <button disabled className="flex-1 bg-white/5 border border-white/10 text-pearl/40 py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
              <ArrowDownLeft className="w-5 h-5" /> سحب الأرباح (قريباً)
            </button>
            <button onClick={() => {}} className="flex-1 bg-white/5 border border-white/10 text-pearl py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Zap className="w-5 h-5 text-gold" /> سجل المعاملات
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel border-gold/30 bg-gold/5 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
          <h3 className="text-2xl font-black text-pearl mb-6 flex items-center gap-2">
            <ArrowUpRight className="text-gold" /> إيداع أصول
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-pearl/50 mb-2">المبلغ (USD)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-pearl font-mono text-2xl focus:border-gold/50 focus:outline-none transition-all"
                min="10"
              />
            </div>
            <button 
              onClick={handleDeposit}
              disabled={loading}
              className="w-full bg-gold text-cosmic py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:scale-100 flex justify-center items-center gap-2"
            >
              {loading ? <span className="animate-pulse">جاري الاتصال بالبوابة...</span> : <><Shield className="w-5 h-5" /> تأكيد الإيداع</>}
            </button>
          </div>
        </motion.div>
      </div>
      <GoldDust trigger={dustTrigger} />
    </div>
  );
};
