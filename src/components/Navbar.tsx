import { Search, Shield, User, Menu, Hexagon, ShieldCheck, Globe, ChevronDown, Repeat, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, ChangeEvent } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCurrency } from '../hooks/useCurrency';
import { cn, hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSearch }: { onSearch: (query: string) => void }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { currency, toggleCurrency } = useCurrency();
  const { items, setIsCartOpen } = useCart();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  const handleLangChange = (lang: 'ar' | 'en' | 'fr' | 'zh') => {
    hapticFeedback(10);
    soundscapes.playCosmic();
    setLanguage(lang);
    setShowLangMenu(false);
  };

  const connectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  return (
    <nav className="sticky top-0 z-50 bg-cosmic/80 backdrop-blur-md border-b border-pearl/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <Hexagon className="w-8 h-8 md:w-10 md:h-10 text-gold fill-gold/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-pearl rounded-full animate-ping" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif font-black gold-glow tracking-tighter">
                  KYROSYS
                </span>
                <span className="text-[6px] md:text-[8px] font-mono uppercase tracking-[0.3em] text-gold/60">
                  Empire 2126
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-8">
              {[
                { name: t('vault'), section: 'vault' },
                { name: t('forge'), section: 'forge' },
                { name: t('stats'), section: 'dashboard' },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    hapticFeedback('light');
                    soundscapes.playCosmic();
                    document.dispatchEvent(new CustomEvent('changeSection', { detail: item.section }));
                  }} 
                  className="text-pearl/60 hover:text-gold font-medium text-sm transition-all tracking-wide uppercase hover:scale-110"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Search - Hidden on small screens */}
            <div className="hidden lg:flex items-center bg-white/5 rounded-full px-5 py-2.5 gap-3 border border-white/5 focus-within:border-gold transition-all">
              <Search className="w-4 h-4 text-gold/60" />
              <input 
                type="text" 
                placeholder={t('search')} 
                className="bg-transparent border-none outline-none text-xs w-48 text-right text-pearl placeholder:text-pearl/30"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {/* Currency Toggler */}
              <button 
                onClick={toggleCurrency}
                className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-xl bg-gold/5 border border-gold/20 hover:bg-gold/10 transition-all text-[10px] md:text-xs font-mono text-gold uppercase tracking-tighter"
              >
                <Repeat className="w-3 h-3 md:w-4 md:h-4" />
                <span>{currency}</span>
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all text-[10px] md:text-xs font-mono text-pearl uppercase tracking-tighter"
                >
                  <Globe className="w-3 h-3 md:w-4 md:h-4 text-gold/60" />
                  <span className="hidden sm:inline">{language}</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", showLangMenu && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-2 right-0 w-32 liquid-glass-heavy border border-gold/10 rounded-2xl overflow-hidden py-2"
                    >
                      {(['ar', 'en', 'fr', 'zh'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLangChange(lang)}
                          className={cn(
                            "w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-widest hover:bg-gold/10 transition-colors",
                            language === lang ? "text-gold" : "text-pearl/60"
                          )}
                        >
                          {lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : '中文'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => {
                  hapticFeedback('light');
                  setIsCartOpen(true);
                }}
                className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-pearl" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-gold rounded-full text-[10px] font-black text-cosmic flex items-center justify-center translate-x-1 -translate-y-1">
                    {items.length}
                  </span>
                )}
              </button>
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className={`hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full font-black text-sm transition-all shadow-lg active:scale-95 border ${
                  isConnected 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-gold text-cosmic border-gold hover:bg-pearl shadow-gold/10'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isConnecting ? (
                    <motion.div 
                      key="connecting"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-cosmic border-t-transparent rounded-full"
                    />
                  ) : isConnected ? (
                    <motion.div key="connected" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                       <span className="font-mono">0x2126...F42</span>
                      <ShieldCheck className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                       <span>{t('wallet')}</span>
                       <User className="w-4 h-4 fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <button 
                onClick={() => {
                  hapticFeedback(10);
                  document.dispatchEvent(new CustomEvent('toggleSidebar'));
                }}
                className="md:hidden p-2 text-pearl"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

