"use client";

import { useState } from 'react';

export function Nav() {
  const [activeTab, setActiveTab] = useState('memes');
  const [swipesLeft, setSwipesLeft] = useState(10);

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
          Swipes left: {swipesLeft}
        </div>
      </div>
    </nav>
  );
}


