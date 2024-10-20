"use client";

import React from "react";
import { useUserMemes } from "../contexts/UserMemesContext";

const PortfolioPage: React.FC = () => {
  const { userMemes } = useUserMemes();

  return (
    <div className="flex flex-col py-10 bg-black min-h-screen">
      <div className="flex flex-col items-left justify-left text-white mx-8">
        <h1 className="text-3xl font-bold mb-4 text-white font-['Libre_Franklin'] text-base font-medium leading-normal self-stretch">
          your points
        </h1>
        <div className="flex flex-col items-center justify-center mt-4 w-full">
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="text-[#C8FF00] font-['Libre_Franklin'] text-[48px] font-bold leading-normal">
              300
            </p>
            <button className="flex h-[51px] px-4 justify-center items-center gap-2 w-full rounded-full bg-[#9200F0]">
              <span className="text-[#C8FF00] font-['Libre_Franklin'] text-base font-extrabold leading-normal">
                CASH OUT🤑
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-16"></div> {/* This adds a 64px vertical gap */}
      <div className="flex flex-col items-left justify-left text-white mx-8">
        <div className="flex flex-col items-start gap-1 self-stretch mb-4">
          <h1 className="text-white font-['Libre_Franklin'] text-base font-medium leading-normal">
            your memes
          </h1>
          <h2 className="text-[#C6C6C6] font-['Libre_Franklin'] text-xs font-light leading-normal self-stretch">
            redeem 1 point for 1 swipe
          </h2>
        </div>
        <div className="flex flex-col items-start gap-2 self-stretch">
          {userMemes.map((meme) => (
            <div
              key={meme.id}
              className="flex flex-row items-center justify-between p-3.5 self-stretch rounded-lg bg-[#232323]"
            >
              <div className="flex items-center justify-between self-stretch w-full">
                <div className="flex flex-row items-center">
                  <p className="mr-2">{meme.name}</p>
                  <p className="text-[#C6C6C6] font-['Libre_Franklin'] text-[18px] font-medium leading-normal mr-4">
                    {meme.points} points
                  </p>
                </div>
                <button className="flex justify-center items-center gap-2.5 p-2 rounded-full">
                  <span className="text-[#C8FF00] font-['Libre_Franklin'] text-base font-extrabold leading-normal">
                    REDEEM
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
