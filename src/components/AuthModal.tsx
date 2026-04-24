import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, LogIn } from 'lucide-react';
import { hapticFeedback } from '../lib/utils';
import { soundscapes } from '../lib/soundscapes';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const { login, loginWithGoogle, register, resetPassword } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess('');
    soundscapes.playChime();

    try {
      if (mode === 'login') {
        await login(email, password, remember);
        onClose();
      } else if (mode === 'register') {
        await register(email, password);
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-cosmic/80">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden glass-panel relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-pearl/50 hover:text-pearl rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-serif font-black text-pearl text-center mb-2">
            {mode === 'login' ? 'تسجيل الدخول' : mode === 'register' ? 'حساب جديد' : 'استعادة المرور'}
          </h2>
          <p className="text-center text-pearl/50 text-sm mb-8">
            {mode === 'login' ? 'مرحباً بعودتك إلى المنصة الذكية.' : mode === 'register' ? 'انضم إلى النخبة اليوم.' : 'أدخل بريدك لاستعادة الوصول.'}
          </p>

          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl text-center">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pearl/30" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="الاسم" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-12 text-pearl outline-none focus:border-gold/50 transition-colors"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pearl/30" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-12 text-pearl outline-none focus:border-gold/50 transition-colors"
                required
              />
            </div>

            {mode !== 'forgot' && (
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pearl/30" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-12 text-pearl outline-none focus:border-gold/50 transition-colors"
                  required
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between !mt-2">
                <label className="flex items-center gap-2 text-sm text-pearl/60 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-white/20 bg-black/40 text-gold focus:ring-gold/50" />
                  <span>تذكرني</span>
                </label>
                <button type="button" onClick={() => setMode('forgot')} className="text-xs text-gold/80 hover:text-gold transition-colors">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-pearl text-cosmic font-black rounded-xl hover:bg-gold transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <div className="w-5 h-5 border-2 border-cosmic/50 border-t-cosmic rounded-full animate-spin" /> : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{mode === 'login' ? 'تأكيد الدخول' : mode === 'register' ? 'إنشاء حساب' : 'إرسال الرابط'}</span>
                </>
              )}
            </button>
          </form>

          {mode !== 'forgot' && (
            <div className="mt-6 text-center">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative bg-cosmic/80 px-4 text-xs text-pearl/40">أو</div>
              </div>
              <button 
                type="button"
                onClick={handleGoogle}
                className="w-full py-3 bg-white/5 border border-white/10 font-bold text-pearl rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                الدخول بواسطة Google
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            {mode === 'login' ? (
              <p className="text-sm text-pearl/50">
                ليس لديك حساب؟ <button onClick={() => setMode('register')} className="text-white hover:text-gold transition-colors font-bold">سجل الآن</button>
              </p>
            ) : (
              <p className="text-sm text-pearl/50">
                لديك حساب بالفعل؟ <button onClick={() => setMode('login')} className="text-white hover:text-gold transition-colors font-bold">تسجيل الدخول</button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
