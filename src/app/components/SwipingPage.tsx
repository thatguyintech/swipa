"use client"

import { useState } from "react";
import { X, Heart } from "lucide-react";
import { Card } from "./Card";

// Sample memecoin data
const memecoins = [
  { id: 1, name: "Dogecoin", symbol: "DOGE", description: "Much wow, very crypto!", image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg" },
  { id: 2, name: "Shiba Inu", symbol: "SHIB", description: "The Dogecoin killer", image: "/placeholder.svg?height=400&width=300" },
  { id: 3, name: "SafeMoon", symbol: "SAFEMOON", description: "Safely to the moon", image: "/placeholder.svg?height=400&width=300" },
  { id: 4, name: "ElonSperm", symbol: "SPERM", description: "The most potent crypto", image: "/placeholder.svg?height=400&width=300" },
  { id: 5, name: "Garlicoin", symbol: "GRLC", description: "Hot, buttery cryptocurrency", image: "/placeholder.svg?height=400&width=300" },
]

export default function SwipingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    if (currentIndex < memecoins.length - 1) {
      setDirection(swipeDirection);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setDirection(null);
      }, 300); // Adjust timing as needed
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black items-center justify-center">
      <div className="relative w-[300px] h-[400px]">
        {memecoins.map((memecoin, index) => (
          <Card
            key={memecoin.id}
            data={memecoin}
            isActive={index === currentIndex}
            direction={index === currentIndex ? direction : null}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center items-center mt-8 gap-16">
        <button 
          className="rounded-full p-4 bg-white shadow-lg"
          onClick={() => handleSwipe('left')}
        >
          <X className="text-red-500" size={32} />
        </button>
        <button 
          className="rounded-full p-4 bg-white shadow-lg"
          onClick={() => handleSwipe('right')}
        >
          <Heart className="text-green-500" size={32} />
        </button>
      </div>
    </div>
  )
}
