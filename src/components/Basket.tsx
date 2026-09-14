import React from 'react';

interface BasketProps {
  x: number; // percentage (0 to 100) or pixel
  tilt: number; // degrees (-12 to 12 based on movement direction)
  isCatching: boolean; // triggers squash/stretch pulse
  isHitHarmful: boolean; // shake when hitting rotten fruit or bomb
  basketWidth: number;
}

export const Basket: React.FC<BasketProps> = ({
  x,
  tilt,
  isCatching,
  isHitHarmful,
  basketWidth = 100,
}) => {
  return (
    <div
      className="absolute bottom-6 -translate-x-1/2 select-none pointer-events-none transition-transform duration-75 ease-out"
      style={{
        left: `${x}%`,
        transform: `translateX(-50%) rotate(${tilt}deg) scale(${isCatching ? '1.1, 0.9' : isHitHarmful ? '0.9, 1.1' : '1, 1'})`,
        width: `${basketWidth}px`,
        height: '68px',
      }}
    >
      <svg
        viewBox="0 0 120 80"
        className={`w-full h-full drop-shadow-xl ${isHitHarmful ? 'animate-bounce' : ''}`}
      >
        <defs>
          {/* Basket Weave Pattern */}
          <pattern id="weavePattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 0 6 L 12 6 M 6 0 L 6 12" stroke="#92400e" strokeWidth="2.2" />
            <path d="M 0 0 L 12 12 M 12 0 L 0 12" stroke="#b45309" strokeWidth="0.8" opacity="0.4" />
          </pattern>
          {/* Wood gradient */}
          <linearGradient id="basketWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="60%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          {/* Cloth liner gradient */}
          <linearGradient id="clothGingham" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#fee2e2" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Basket Handle */}
        <path
          d="M 24 38 C 24 6, 96 6, 96 38"
          fill="none"
          stroke="#78350f"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 24 38 C 24 6, 96 6, 96 38"
          fill="none"
          stroke="#d97706"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Red & White Picnic Napkin Fold Inside */}
        <path
          d="M 16 34 Q 35 44 60 38 Q 85 44 104 34 L 98 48 Q 60 52 22 48 Z"
          fill="#fef2f2"
          stroke="#f87171"
          strokeWidth="1.5"
        />

        {/* Main Basket Bowl */}
        <path
          d="M 12 34 L 22 74 Q 60 78 98 74 L 108 34 Q 60 38 12 34 Z"
          fill="url(#basketWood)"
          stroke="#78350f"
          strokeWidth="2.5"
        />

        {/* Woven overlay */}
        <path
          d="M 14 36 L 23 72 Q 60 76 97 72 L 106 36 Q 60 40 14 36 Z"
          fill="url(#weavePattern)"
          opacity="0.45"
        />

        {/* Basket Rim */}
        <ellipse
          cx="60"
          cy="34"
          rx="48"
          ry="7"
          fill="#b45309"
          stroke="#78350f"
          strokeWidth="3"
        />
        <ellipse
          cx="60"
          cy="34"
          rx="45"
          ry="5.5"
          fill="#f59e0b"
          opacity="0.85"
        />

        {/* Highlights and cute friendly badge */}
        <path
          d="M 20 40 Q 60 46 100 40"
          fill="none"
          stroke="#fde68a"
          strokeWidth="1.8"
          opacity="0.6"
        />

        {/* Cute Bow / Ribbon on handle side */}
        <circle cx="24" cy="38" r="4.5" fill="#ef4444" />
        <path d="M 20 38 C 16 32, 20 30, 24 38 C 28 30, 32 32, 28 38" fill="#f87171" />
        <circle cx="96" cy="38" r="4.5" fill="#ef4444" />
        <path d="M 92 38 C 88 32, 92 30, 96 38 C 100 30, 104 32, 100 38" fill="#f87171" />
      </svg>
    </div>
  );
};
