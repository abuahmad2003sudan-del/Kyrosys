import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Sidebar, { Section } from './components/Sidebar';
import Hero from './components/Hero';
import TemplateGrid from './components/TemplateGrid';
import Footer from './components/Footer';
import LiveTicker from './components/LiveTicker';
import AIForge from './components/AIForge';
import PreviewModal from './components/PreviewModal';
import PremiumDashboard from './components/PremiumDashboard';
import MarketIntelligence from './components/MarketIntelligence';
import CosmicBackground from './components/CosmicBackground';
import StarfieldBackground from './components/StarfieldBackground';
import SarcasticGateway from './components/SarcasticGateway';
import OmniscienceDial from './components/OmniscienceDial';
import GoldDust from './components/GoldDust';
import { AuthModal } from './components/AuthModal';
import { CartSlideout } from './components/CartSlideout';
import { useAuth } from './context/AuthContext';
import { AboutPage, ContactPage, PricingPage, LegalPage, OrderConfirmationPage } from './pages/ImperialPages';
import { TreasuryPage } from './pages/TreasuryPage';
import { Template } from './types';
import { cn, hapticFeedback } from './lib/utils';
import { soundscapes } from './lib/soundscapes';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dustTrigger, setDustTrigger] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (hasEntered) setDustTrigger(prev => prev + 1);

    const hourlySync = setInterval(() => {
      console.log("[CRON] Imperial Market Sync Initiated...");
    }, 60 * 60 * 1000);

    const handleSectionChange = (e: any) => {
      if (e.detail) {
        if (e.detail === 'orderConf' && !user) {
          setShowAuthModal(true);
          return;
        }
        setActiveSection(e.detail as Section);
      }
    };
    
    document.addEventListener('changeSection', handleSectionChange);
    return () => {
      clearInterval(hourlySync);
      document.removeEventListener('changeSection', handleSectionChange);
    };
  }, [hasEntered, user]);

  return (
    <div className="flex bg-cosmic text-pearl selection:bg-gold selection:text-cosmic overflow-hidden min-h-[100dvh]" dir="rtl">
      <AnimatePresence mode="wait">
        {!hasEntered && <SarcasticGateway key="gateway" onComplete={() => setHasEntered(true)} />}
      </AnimatePresence>
      
      {hasEntered && (
        <>
          <Sidebar activeSection={activeSection} onSectionChange={(sec) => {
            if (!user && (sec === 'dashboard' || sec === 'orderConf')) {
              setShowAuthModal(true);
            } else {
              setActiveSection(sec);
            }
          }} />

          <div className="flex-1 flex flex-col h-[100dvh] overflow-y-auto overflow-x-hidden relative scroll-smooth">
            <LiveTicker />
            <Navbar onSearch={setSearchQuery} />
            
            <main className="flex-1 relative pb-24 lg:pb-0">
              <AnimatePresence mode="wait">
                {activeSection === 'dashboard' && (
                  <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
                    <Hero />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
                      <PremiumDashboard />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'vault' && (
                  <motion.div key="vault" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.8 }} className="pt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       <div className="mb-12 text-center">
                         <h2 className="text-4xl sm:text-6xl font-serif font-black text-pearl gold-glow tracking-tighter">{t('vault')}</h2>
                       </div>
                       <TemplateGrid searchQuery={searchQuery} onPreview={setPreviewTemplate} />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'forge' && (
                  <motion.div key="forge" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="max-w-5xl mx-auto px-6 py-24">
                    <AIForge onPreview={setPreviewTemplate} />
                  </motion.div>
                )}

                {activeSection === 'market' && (
                  <motion.div key="market" initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(10px)' }}>
                    <MarketIntelligence />
                  </motion.div>
                )}

                {activeSection === 'about' && (
                  <motion.div key="about"><AboutPage /></motion.div>
                )}
                {activeSection === 'contact' && (
                  <motion.div key="contact"><ContactPage /></motion.div>
                )}
                {activeSection === 'pricing' && (
                  <motion.div key="pricing"><PricingPage /></motion.div>
                )}
                {activeSection === 'privacy' && (
                  <motion.div key="privacy"><LegalPage title="سياسة الخصوصية" content="نحن نحمي بياناتك باستخدام بروتوكولات التشفير الرائدة. لا نشارك معلوماتك الشخصية مع أي طرف ثالث دون موافقتك. نضمن لك بيئة رقمية آمنة وموثوقة." /></motion.div>
                )}
                {activeSection === 'terms' && (
                  <motion.div key="terms"><LegalPage title="شروط الخدمة" content="باستخدامك المنصة الذكية، فإنك توافق على الالتزام بجميع القوانين الرقمية المعمول بها. جميع الأصول والتصاميم محفوظة النشر للمنصة." /></motion.div>
                )}
                {activeSection === 'orderConf' && (
                  <motion.div key="orderConf"><OrderConfirmationPage /></motion.div>
                )}
                {activeSection === 'treasury' && (
                  <motion.div key="treasury"><TreasuryPage /></motion.div>
                )}

                {/* Placeholder for other sections */}
                {['academy', 'governance', 'settings', 'blog'].includes(activeSection) && (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-[60vh] flex-col gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-gold/10 border border-gold/20 flex items-center justify-center animate-pulse">
                       <div className="w-4 h-4 bg-gold rounded-full" />
                    </div>
                    <h2 className="text-3xl font-serif font-black text-gold italic uppercase tracking-widest text-center">أرشيف {activeSection} مغلق حالياً...</h2>
                    <p className="text-pearl/40 font-mono text-sm tracking-tighter text-center">نحن نطور هذه المساحة لتلائم طموحاتك.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
            
            <Footer />
          </div>

          <PreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
          <CartSlideout />
          <GoldDust trigger={dustTrigger} />
          <OmniscienceDial />
          <CosmicBackground />
          <StarfieldBackground />
        </>
      )}

      {/* Global Background Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -z-10 rounded-full" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] -z-10 rounded-full" />
    </div>
  );
}

