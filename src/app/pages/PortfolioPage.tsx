"use client";

import React from "react";
import { useUserMemes } from "../contexts/UserMemesContext";

const PortfolioPage: React.FC = () => {
  const { userMemes } = useUserMemes();

  return (
    <div className="flex flex-col py-10">
      <div className="flex flex-col bg-black items-left justify-left text-white">
        <h1 className="text-3xl font-bold mb-4">your points</h1>
        <div className="flex flex-col items-center justify-center">
          <p>300</p>
          <button>cash out</button>
        </div>
      </div>
      <div className="flex flex-col bg-black items-left justify-left text-white">
        <h1 className="text-3xl font-bold mb-4">your memes</h1>
        <h2 className="text-2xl mb-4">redeem 1 point for 1 swipe</h2>
        {userMemes.map((meme) => (
          <div
            key={meme.id}
            className="flex flex-row items-center justify-between"
          >
            <p>{meme.name}</p>
            <p>{meme.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
