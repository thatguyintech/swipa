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
      name: "Degen",
      symbol: "DEGEN",
      description:
        "DEGEN is a reward token for Farcaster users, born from meme culture. ",
      image: "https://assets.deform.cc/degen-logo.png",
    },
    {
      id: 3,
      name: "ScaredHamster",
      symbol: "HAM",
      description: "AHHHHHHHH",
      image: "https://assets.deform.cc/scared-hamster.jpeg",
    },
    {
      id: 4,
      name: "Dogecoin",
      symbol: "DOGE",
      description: "Much wow, very crypto!",
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
    },
    {
      id: 5,
      name: "Degen",
      symbol: "DEGEN",
      description:
        "DEGEN is a reward token for Farcaster users, born from meme culture. ",
      image: "https://assets.deform.cc/degen-logo.png",
    },
    {
      id: 6,
      name: "ScaredHamster",
      symbol: "HAM",
      description: "AHHHHHHHH",
      image: "https://assets.deform.cc/scared-hamster.jpeg",
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
