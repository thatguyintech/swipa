"use client";

import { useState } from "react";
import { X, Heart } from "lucide-react";
import { Card } from "../components/Card";
import { useSwipes } from "../contexts/SwipesContext";
import { useMemecoins } from "../contexts/MemecoinContext";

export default function SwipingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { swipesRemaining, decrementSwipes } = useSwipes();
  const { memecoins } = useMemecoins();

  const handleSwipe = (swipeDirection: "left" | "right") => {
    if (currentIndex < memecoins.length - 1 && swipesRemaining > 0) {
      setDirection(swipeDirection);
      decrementSwipes();
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setDirection(null);
      }, 300);
    }
  };

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
          onClick={() => handleSwipe("left")}
        >
          <X className="text-red-500" size={32} />
        </button>
        <button
          className="rounded-full p-4 bg-white shadow-lg"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="text-green-500" size={32} />
        </button>
      </div>
    </div>
  );
}
