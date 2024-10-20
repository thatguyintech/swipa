"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SwipesContextType {
  swipesRemaining: number;
  decrementSwipes: () => void;
  resetSwipes: () => void;
}

const SwipesContext = createContext<SwipesContextType | undefined>(undefined);

export function SwipesProvider({ children }: { children: ReactNode }) {
  const [swipesRemaining, setSwipesRemaining] = useState(10);

  const decrementSwipes = () => {
    setSwipesRemaining((prev) => Math.max(0, prev - 1));
  };

  const resetSwipes = () => {
    setSwipesRemaining(10);
  };

  return (
    <SwipesContext.Provider value={{ swipesRemaining, decrementSwipes, resetSwipes }}>
      {children}
    </SwipesContext.Provider>
  );
}

export function useSwipes() {
  const context = useContext(SwipesContext);
  if (context === undefined) {
    throw new Error('useSwipes must be used within a SwipesProvider');
  }
  return context;
}
