"use client";

import React from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

interface CardProps {
  data: {
    name: string;
    symbol: string;
    description: string;
    image: string;
  };
  isActive: boolean;
  onSwipe: (direction: "left" | "right") => void;
}

export function Card({ data, isActive, onSwipe }: CardProps) {
  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    config: { friction: 50, tension: 500 },
  }));

  const bind = useDrag(
    ({
      active,
      movement: [mx, my],
      direction: [xDir],
      velocity: [vx],
      last,
    }) => {
      const trigger = vx > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!active && last) {
        if (Math.abs(mx) > 100 || trigger) {
          // Threshold for swipe action
          const flyAwayDistance = (window.innerWidth + 200) * dir;
          api.start({
            x: flyAwayDistance,
            y: my,
            rotate: mx / 5,
            config: { friction: 50, tension: 400, duration: 300 },
          });
          onSwipe(dir === 1 ? "right" : "left");
        } else {
          // Reset card position if not swiped far enough
          api.start({ x: 0, y: 0, rotate: 0 });
        }
      } else {
        // Update card position and rotation while dragging
        api.start({
          x: active ? mx : 0,
          y: active ? my : 0,
          rotate: active ? mx / 20 : 0,
          immediate: (name) => active && name === "x",
        });
      }
    },
    { enabled: isActive },
  );

  const pumpOpacity = x.to((x) => (x > 0 ? Math.min(1, x / 100) : 0));
  const dumpOpacity = x.to((x) => (x < 0 ? Math.min(1, Math.abs(x) / 100) : 0));

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        touchAction: "none",
      }}
      className={`absolute w-full bg-white rounded-xl shadow-lg overflow-hidden ${isActive ? "z-10" : "hidden"}`}
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-[416px] object-cover"
      />
      <animated.div
        style={{ opacity: pumpOpacity }}
        className="absolute top-5 right-5 text-green-500 text-4xl font-bold rotate-[-30deg] bg-white/80 p-2 rounded-lg"
      >
        PUMP
      </animated.div>
      <animated.div
        style={{ opacity: dumpOpacity }}
        className="absolute top-5 left-5 text-red-500 text-4xl font-bold rotate-[30deg] bg-white/80 p-2 rounded-lg"
      >
        DUMP
      </animated.div>
      <div className="flex flex-col items-start gap-2 self-stretch p-4 rounded-b-[20px] bg-[#E7FFD8]">
        <h2 className="text-[24px] font-['Libre_Franklin'] font-extrabold text-[#320052]">
          {data.name}
        </h2>
        <p className="text-[16px] font-['Libre_Franklin'] font-semibold text-[#320052]">
          {data.symbol}
        </p>
        <p className="text-[#320052] font-['Libre_Franklin'] text-[12px] font-semibold leading-normal">
          {data.description}
        </p>
      </div>
    </animated.div>
  );
}
