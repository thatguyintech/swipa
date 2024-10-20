"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserMeme {
  id: number;
  name: string;
  symbol: string;
  description: string;
  image: string;
  points: number;
}

interface UserMemesContextType {
  memecoins: UserMeme[];
}

const UserMemesContext = createContext<UserMemesContextType | undefined>(
  undefined,
);

export function UserMemesProvider({ children }: { children: ReactNode }) {
  // Sample memecoin data
  const sampleUserMemes: UserMeme[] = [
    {
      id: 1,
      name: "Dogecoin",
      symbol: "DOGE",
      description: "Much wow, very crypto!",
      image:
        "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
      points: 100,
    },
    {
      id: 2,
      name: "Shiba Inu",
      symbol: "SHIB",
      description: "The Dogecoin killer",
      image: "/placeholder.svg?height=400&width=300",
      points: 120,
    },
    {
      id: 3,
      name: "SafeMoon",
      symbol: "SAFEMOON",
      description: "Safely to the moon",
      image: "/placeholder.svg?height=400&width=300",
      points: 80,
    },
  ];

  const [memecoins, setMemecoins] = useState<UserMeme[]>(sampleUserMemes);

  return (
    <UserMemesContext.Provider value={{ memecoins }}>
      {children}
    </UserMemesContext.Provider>
  );
}

export function useUserMemes() {
  const context = useContext(UserMemesContext);
  if (context === undefined) {
    throw new Error("useUserMemes must be used within a UserMemesProvider");
  }
  return context;
}
