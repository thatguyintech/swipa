"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Tab = "memes" | "rewards";

interface NavContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("memes");

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}
