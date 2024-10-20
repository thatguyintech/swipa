"use client";

import { useState } from "react";
import { X, Heart } from "lucide-react";
import { Card } from "../components/Card";
import { useSwipes } from "../contexts/SwipesContext";
import { useMemecoins } from "../contexts/MemecoinContext";
import {
  useAuthModal,
  useLogout,
  useSendUserOperation,
  useSignerStatus,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { constructAAUserOperation, doTrade } from "../alchemy/utils";

export default function SwipingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { swipesRemaining, decrementSwipes } = useSwipes();
  const { memecoins } = useMemecoins();

  // Alchemy Account Kit
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const { client, address } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({
    client,
    // optional parameter that will wait for the transaction to be mined before returning
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      // [optional] Do something with the hash and request
      console.log("Success!", hash, request);
    },
    onError: (error) => {
      // [optional] Do something with the error
      console.log("Error!", error);
    },
  });

  const handleSwipe = async (swipeDirection: "left" | "right") => {
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

      // await doTrade();

      console.log(address);
      const result = await sendUserOperationAsync({
        uo: await constructAAUserOperation(),
      });
      console.log(result);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black items-center justify-center relative">
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
