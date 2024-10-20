"use client";

import { useSwipes } from '../contexts/SwipesContext';
import { useNav } from '../contexts/NavContext';

export function Nav() {
  const { activeTab, setActiveTab } = useNav();
  const { swipesRemaining } = useSwipes();

  return (
    <nav className="flex flex-col items-center p-4 bg-black shadow-md">
      <div className="flex justify-between items-center w-full">
        <div className="flex border rounded-md">
          <button
            className={`px-4 py-2 ${activeTab === 'memes' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('memes')}
          >
            😂
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'rewards' ? 'bg-gray-200' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            🏅
          </button>
        </div>
        
        <div className="text-lg font-semibold text-white">
          Swipes left: {swipesRemaining}
        </div>
      </div>
    </nav>
  );
}
