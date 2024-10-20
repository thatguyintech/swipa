"use client";

import { useSwipes } from "../contexts/SwipesContext";
import { useNav } from "../contexts/NavContext";

export function Nav() {
  const { activeTab, setActiveTab } = useNav();
  const { swipesRemaining } = useSwipes();

  return (
    <nav className="flex flex-col items-center p-4 bg-black shadow-md">
      <div className="flex justify-between items-center w-full">
        <div className="flex border rounded-md bg-gray-500">
          <button
            className={`px-4 py-2 text-green-500 ${activeTab === "memes" ? "bg-purple-500" : ""}`}
            onClick={() => setActiveTab("memes")}
          >
            Memes
          </button>
          <button
            className={`px-4 py-2 text-green-500 ${activeTab === "rewards" ? "bg-purple-500" : ""}`}
            onClick={() => setActiveTab("rewards")}
          >
            Rewards
          </button>
        </div>

        <div className="text-lg font-semibold text-white">
          {swipesRemaining}
        </div>
      </div>
    </nav>
  );
}
