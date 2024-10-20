"use client";

import { useState } from "react";
import { X, Heart } from "lucide-react";
import { Card } from "../components/Card";
import { useSwipes } from "../contexts/SwipesContext";
import { useMemecoins } from "../contexts/MemecoinContext";
import { useAuthModal, useLogout, useSignerStatus, useUser } from "@account-kit/react";

export default function SwipingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { swipesRemaining, decrementSwipes } = useSwipes();
  const { memecoins } = useMemecoins();
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const handleSwipe = (swipeDirection: "left" | "right") => {
    console.log(user, signerStatus);
    if (signerStatus.isInitializing) return;
    if (!user) {
      openAuthModal();
      return;
    }

    if (currentIndex < memecoins.length - 1 && swipesRemaining > 0) {
      setDirection(swipeDirection);
      decrementSwipes();
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setDirection(null);
      }, 300);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-screen bg-black items-center justify-center relative">
      {user && (
        <button
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

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
