"use client";

import { useSwipes } from "../contexts/SwipesContext";
import { useNav } from "../contexts/NavContext";
import { useLogout, useUser } from "@account-kit/react";
import { useUserBalance } from "../contexts/UserContext";

export function Nav() {
  const { activeTab, setActiveTab } = useNav();
  const { swipesRemaining } = useSwipes();
  const user = useUser();
  const balance = useUserBalance();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

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
      {user && (
        <div className="flex flex-row items-center justify-center gap-4">
          <p className="top-4 left-4 text-white">Address: {user.address}</p>
          <p className="top-4 left-4 text-white">Balance: {balance}</p>
          <button
            className="top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
