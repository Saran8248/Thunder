"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  name: string;
  price: number;
  img: string;
  qty: number;
  brand?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Derived state
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.name === item.name);
      if (existing !== -1) {
        const newCart = [...prev];
        newCart[existing].qty += 1;
        return newCart;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].qty += delta;
      if (newCart[index].qty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal, cartCount }}>
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
