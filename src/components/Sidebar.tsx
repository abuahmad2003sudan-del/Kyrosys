import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Database, 
  TrendingUp, 
  Zap, 
  GraduationCap, 
  Users, 
  Wallet, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Crown
} from 'lucide-react';
import { cn, hapticFeedback } from '../lib/utils';
import { useLanguage } from '../hooks/useLanguage';
import { useMajesticMode } from '../contexts/MajesticModeContext';
import { soundscapes } from '../lib/soundscapes';

export type Section = 'dashboard' | 'vault' | 'market' | 'forge' | 'academy' | 'governance' | 'treasury' | 'settings' | 'about' | 'contact' | 'pricing' | 'privacy' | 'terms' | 'blog' | 'orderConf';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const { t } = useLanguage();
  const { isMajesticMode, toggleMajesticMode } = useMajesticMode();

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(prev => !prev);
    document.addEventListener('toggleSidebar', handleToggle);
    
    // Premium Mirror Logic
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting(t('greeting_morning'));
    else if (hour >= 12 && hour < 18) setGreeting(t('greeting_afternoon'));
    else setGreeting(t('greeting_evening'));

    return () => document.removeEventListener('toggleSidebar', handleToggle);
  }, [t]);

  const MENU_ITEMS = [
    { id: 'dashboard' as Section, label: t('dashboard'), icon: LayoutDashboard, description: 'Key Performance' },
    { id: 'vault' as Section, label: t('vault'), icon: Database, description: 'Premium Assets' },
    { id: 'market' as Section, label: t('market'), icon: TrendingUp, description: 'ROI Analytics' },
    { id: 'forge' as Section, label: t('forge'), icon: Zap, description: 'Infinite Scaling' },
    { id: 'academy' as Section, label: t('academy'), icon: GraduationCap, description: 'Enterprise Training' },
    { id: 'governance' as Section, label: t('governance'), icon: Users, description: 'Client Registry' },
    { id: 'treasury' as Section, label: t('treasury'), icon: Wallet, description: 'Revenue Flow' },
    { id: 'settings' as Section, label: t('settings'), icon: Settings, description: 'Configurations' },
  ];

  const handleNavClick = (id: Section) => {
    hapticFeedback(20);
    soundscapes.playCosmic(); // Uniform cosmic feedback
    onSectionChange(id);
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const handleMajesticToggle = () => {
    hapticFeedback('quantum');
    soundscapes.playCosmic();
    toggleMajesticMode();
  };

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-cosmic/80 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '280px',
          x: window.innerWidth < 1024 ? (isMobileOpen ? 0 : -300) : 0, 
        }}
        className={cn(
          "h-screen liquid-glass border-r border-pearl/10 z-[100] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "fixed lg:sticky top-0 left-0"
        )}
      >
        <div className="p-6 flex flex-col gap-6 border-b border-pearl/5 relative">
          
          {/* Elite Pulse Indicator */}
          <div className="absolute top-4 left-4 group cursor-help">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <div className="absolute top-1/2 -translate-y-1/2 left-4 w-max px-2 py-1 bg-obsidian/80 backdrop-blur-md rounded border border-gold/20 text-[8px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {t('pulse')}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
                >
                  <Hexagon className="w-8 h-8 text-gold fill-gold/10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xl font-serif font-black gold-glow tracking-tighter leading-none">KYROSYS</span>
                    <span className="text-[8px] font-mono text-gold/60 uppercase tracking-[0.3em]">Empire 2126</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {isCollapsed && <Hexagon className="w-8 h-8 text-gold fill-gold/10 mx-auto hidden lg:block" />}
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-3 py-2 bg-gradient-to-r from-gold/10 to-transparent rounded-lg border-l-2 border-gold mb-2">
                  <span className="text-[10px] font-serif italic text-gold/80 block">{greeting}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavClick(item.id);
                if (window.innerWidth < 1024) setIsCollapsed(true);
              }}
              className={cn(
                "w-full group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                activeSection === item.id 
                  ? "bg-gold/10 text-gold border border-gold/20" 
                  : "text-pearl/40 hover:text-pearl hover:bg-white/5 border border-transparent"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110 shrink-0", activeSection === item.id && "gold-glow")} />
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col items-start overflow-hidden whitespace-nowrap"
                  >
                    <span className="text-sm font-black tracking-wide uppercase">{item.label}</span>
                    <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">{item.description}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeSection === item.id && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gold rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-pearl/5 flex flex-col gap-2">
          {!isCollapsed && (
            <button
              onClick={handleMajesticToggle}
              className={cn(
                "w-full flex items-center justify-center gap-2 p-3 rounded-xl transition-all overflow-hidden relative",
                isMajesticMode 
                  ? "bg-gold text-cosmic font-black shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                  : "bg-white/5 hover:bg-gold/10 text-pearl/60 hover:text-gold border border-white/5 hover:border-gold/30"
              )}
            >
              <Crown className={cn("w-5 h-5", isMajesticMode && "animate-pulse")} />
              <span className="text-xs uppercase tracking-widest">{t('majestic')}</span>
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-pearl/40 hover:text-pearl transition-all hidden lg:flex"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

