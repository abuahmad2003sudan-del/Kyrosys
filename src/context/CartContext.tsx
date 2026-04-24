import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Template } from '../types';

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

  const addToCart = (template: Template) => {
    setItems((prev) => {
      // Prevent duplicates
      if (prev.find((item) => item.id === template.id)) return prev;
      return [...prev, template];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, total }}>
      {children}
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
