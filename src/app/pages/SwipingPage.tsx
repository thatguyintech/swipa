"use client";

import { useState } from "react";
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

      await doTrade();
    }
  };

  return (
    <div className="flex flex-col bg-black min-h-screen pt-5">
      <div className="max-w-[300px] mx-auto">
        <div className="relative h-[400px]">
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
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            className="rounded-[100px] p-4 bg-[#C8FF00] shadow-lg flex justify-center items-center"
            style={{ width: '147px', display: 'flex', alignItems: 'center', gap: '16px' }}
            onClick={() => handleSwipe("left")}
          >
            <span className="text-[#A400EA] font-['Libre_Franklin'] text-base font-extrabold leading-normal">
              DUNK💩
            </span>
          </button>
          <button
            className="rounded-[100px] p-4 bg-[#A400EA] shadow-lg flex justify-center items-center"
            style={{ width: '147px' }}
            onClick={() => handleSwipe("right")}
          >
            <span className="text-[#C8FF00] font-['Libre_Franklin'] text-base font-extrabold leading-normal">
              PUMP🚀
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
