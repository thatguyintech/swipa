"use client";

import { useState, useEffect } from 'react';

interface CardProps {
  data: {
    name: string;
    symbol: string;
    description: string;
    image: string;
  };
  isActive: boolean;
  direction: 'left' | 'right' | null;
}

export function Card({ data, isActive, direction }: CardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isActive && direction) {
      const newX = direction === 'left' ? -window.innerWidth : window.innerWidth;
      setPosition({ x: newX, y: 0 });
    } else if (isActive) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition({ x: 0, y: -1000 }); // Move inactive cards off-screen
    }
  }, [isActive, direction]);

  const cardClasses = `
    absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden
    transform transition-transform duration-300 ease-in-out will-change-transform
    ${isActive ? 'block' : 'hidden'}
  `;

  const cardStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  return (
    <div className={cardClasses} style={cardStyle}>
      <img src={data.image} alt={data.name} className="w-full h-3/5 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
        <p className="text-lg font-semibold text-gray-600 mb-2">{data.symbol}</p>
        <p className="text-gray-700">{data.description}</p>
      </div>
    </div>
  );
}
