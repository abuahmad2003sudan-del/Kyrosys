import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Template } from '../types';
import { confetti } from '../lib/confetti';
import { motion, AnimatePresence } from 'motion/react';

interface CartContextType {
  items: Template[];
  addToCart: (template: Template) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Template[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addToCart = useCallback((template: Template) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === template.id)) return prev;
      return [...prev, template];
    });
    
    // Imperial Toast + Confetti
    setToastMessage("تمت الإضافة إلى السلة الإمبراطورية ✨");
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFDF00', '#FFF8DC', '#FFFFFF']
    });
    
    setTimeout(() => setToastMessage(null), 3000);
    // Don't auto open cart, let the user decide, or open it? Instructions didn't say to auto-open, actually better not to interrupt.
  }, []);

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, total }}>
      {children}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-[100] bg-black/80 backdrop-blur-md border border-gold/40 text-gold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] font-medium"
            dir="rtl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
