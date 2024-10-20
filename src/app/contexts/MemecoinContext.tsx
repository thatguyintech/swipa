"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Memecoin {
  id: number;
  name: string;
  symbol: string;
  description: string;
  image: string;
}

interface MemecoinContextType {
  memecoins: Memecoin[];
  setMemecoins: (memecoins: Memecoin[]) => void;
}

const MemecoinContext = createContext<MemecoinContextType | undefined>(
  undefined,
);

export function MemecoinProvider({ children }: { children: ReactNode }) {
  // Sample memecoin data
  const sampleMemecoins: Memecoin[] = [
    {
      id: 1,
      name: "Dogecoin",
      symbol: "DOGE",
      description: "Much wow, very crypto!",
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
    },
    {
      id: 2,
      name: "Shiba Inu",
      symbol: "SHIB",
      description: "The Dogecoin killer",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      name: "SafeMoon",
      symbol: "SAFEMOON",
      description: "Safely to the moon",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      name: "ElonSperm",
      symbol: "SPERM",
      description: "The most potent crypto",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 5,
      name: "Garlicoin",
      symbol: "GRLC",
      description: "Hot, buttery cryptocurrency",
      image: "/placeholder.svg?height=400&width=300",
    },
  ];

  const [memecoins, setMemecoins] = useState<Memecoin[]>(sampleMemecoins);

  return (
    <MemecoinContext.Provider value={{ memecoins, setMemecoins }}>
      {children}
    </MemecoinContext.Provider>
  );
}

export function useMemecoins() {
  const context = useContext(MemecoinContext);
  if (context === undefined) {
    throw new Error("useMemecoins must be used within a MemecoinProvider");
  }
  return context;
}
