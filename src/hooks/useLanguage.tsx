import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en' | 'fr' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ar: {
    dashboard: 'الرئيسية',
    vault: 'متجر القوالب',
    market: 'التحليلات الذكية',
    forge: 'التوليد الذكي',
    academy: 'مركز التعلم',
    governance: 'الإدارة',
    treasury: 'المالية',
    settings: 'الإعدادات',
    majestic: 'عرض متميز',
    pulse: 'أداء النظام: 99.9%',
    greeting_morning: 'صباح الخير، استعد ليوم عمل منتج',
    greeting_afternoon: 'طاب يومك، مشاريعك تحت السيطرة',
    greeting_evening: 'مساء الخير، لنراجع إنجازات اليوم',
    search: 'ابحث عن قالبك المثالي...',
    wallet: 'حساب الأعمال',
    stats: 'مؤشرات الأداء',
    hero_badge: 'منصة القوالب الأسرع نمواً',
    hero_title_1: 'أفضل الحلول التقنية لـ ',
    hero_title_2: 'نمو أعمالك الرقمية',
    hero_desc: 'Template Empire هي وجهتك الأولى للحصول على قوالب ويب عالمية المستوى، جاهزة للاستخدام الفوري. وفر أسابيع من التطوير وانطلق بمشروعك الآن بأحدث تقنيات 2126.',
    hero_button_vault: 'تصفح القوالب الجاهزة',
    hero_button_forge: 'أنشئ مشروعك بالذكاء الاصطناعي',
    dash_title: 'مؤشرات أداء الأعمال',
    dash_subtitle: 'نظرة عامة على كفاءة النظام والأصول',
    dash_rebalance: 'تحديث وتحليل البيانات',
    dash_liquidity: 'مؤشر السيولة العالمية',
    dash_vault: 'تخصيص الأصول',
    dash_yield: 'العائد الجاري',
    dash_velocity: 'سرعة المعالجة',
    dash_matrix: 'مصفوفة تحليل النمو',
    dash_intel: 'ذكاء السوق',
  },
  en: {
    dashboard: 'Home',
    vault: 'Template Store',
    market: 'Smart Analytics',
    forge: 'AI Forge',
    academy: 'Learning Center',
    governance: 'Governance',
    treasury: 'Finance',
    settings: 'Settings',
    majestic: 'Premium View',
    pulse: 'System Stability: 99.9%',
    greeting_morning: 'Good morning, ready for a productive day?',
    greeting_afternoon: 'Good afternoon, your projects are on track',
    greeting_evening: 'Good evening, let\'s review today\'s wins',
    search: 'Find your perfect template...',
    wallet: 'Business Account',
    stats: 'KPI Overview',
    hero_badge: 'The Fastest Growing Template Hub',
    hero_title_1: 'Elite Tech Solutions for ',
    hero_title_2: 'Your Digital Growth',
    hero_desc: 'Template Empire is your premier destination for world-class web assets, built for immediate impact. Skip weeks of coding and launch your project with the cutting-edge tech of 2126.',
    hero_button_vault: 'Browse Ready Templates',
    hero_button_forge: 'Forge with AI Intelligence',
    dash_title: 'Business Performance',
    dash_subtitle: 'System Efficiency & Asset Overview',
    dash_rebalance: 'Refresh & Analyze Data',
    dash_liquidity: 'Global Liquidity Index',
    dash_vault: 'Asset Allocation',
    dash_yield: 'Current Yield',
    dash_velocity: 'Engine Velocity',
    dash_matrix: 'Growth Pulse Matrix',
    dash_intel: 'Market Intelligence',
  },
  fr: {
    dashboard: 'Accueil',
    vault: 'Boutique de Modèles',
    market: 'Analyses Intelligentes',
    forge: 'Forge IA',
    academy: 'Centre d\'Apprentissage',
    governance: 'Gouvernance',
    treasury: 'Finance',
    settings: 'Paramètres',
    majestic: 'Vue Premium',
    pulse: 'Stabilité Système: 99.9%',
    greeting_morning: 'Bonjour, prêt pour une journée productive?',
    greeting_afternoon: 'Bon après-midi, vos projets avancent bien',
    greeting_evening: 'Bonsoir, revoyons les succès du jour',
    search: 'Trouvez votre modèle idéal...',
    wallet: 'Compte Business',
    stats: 'Aperçu des KPI',
    hero_badge: 'Le Centre de Modèles à Croissance Rapide',
    hero_title_1: 'Solutions Tech d\'Élite pour ',
    hero_title_2: 'Votre Croissance Numérique',
    hero_desc: 'Template Empire est votre destination privilégiée pour des actifs web de classe mondiale. Évitez des semaines de code et lancez votre projet avec la technologie de pointe de 2126.',
    hero_button_vault: 'Parcourir les Modèles',
    hero_button_forge: 'Forger avec l\'IA',
  },
  zh: {
    dashboard: '首页',
    vault: '模板商店',
    market: '智能分析',
    forge: 'AI 锻造',
    academy: '学习中心',
    governance: '治理',
    treasury: '财务',
    settings: '设置',
    majestic: '高级视图',
    pulse: '系统稳定性: 99.9%',
    greeting_morning: '早上好，准备好开启高效的一天了吗？',
    greeting_afternoon: '下午好，您的项目进展顺利',
    greeting_evening: '晚上好，让我们回顾一下今天的成果',
    search: '寻找您的完美模板...',
    wallet: '商业账户',
    stats: '关键指标概览',
    hero_badge: '增长最快的模板中心',
    hero_title_1: '卓越的技术解决方案 ',
    hero_title_2: '助力您的数字化增长',
    hero_desc: 'Template Empire 是您获取世界级 Web 资产的首选目的地。跳过数周的代码编写，利用 2126 年的尖端技术立即启动您的项目。',
    hero_button_vault: '浏览现成模板',
    hero_button_forge: '利用 AI 锻造',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string) => {
    return TRANSLATIONS[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
