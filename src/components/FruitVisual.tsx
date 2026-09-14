import React from 'react';
import { ItemType } from '../types';

interface FruitVisualProps {
  type: ItemType;
  size?: number;
  rotation?: number;
}

export const FruitVisual: React.FC<FruitVisualProps> = ({
  type,
  size = 56,
  rotation = 0,
}) => {
  const half = size / 2;

  return (
    <div
      className="relative flex items-center justify-center transition-transform"
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {type === 'apple' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Stem and Leaf */}
          <path d="M32 16 C32 10, 36 6, 38 4" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          <path d="M33 11 C38 8, 44 9, 44 9 C44 9, 43 14, 38 15 Z" fill="#22c55e" />
          {/* Apple Body */}
          <path
            d="M32 18 C20 12, 10 22, 10 36 C10 49, 22 60, 32 58 C42 60, 54 49, 54 36 C54 22, 44 12, 32 18 Z"
            fill="#ef4444"
          />
          {/* Shading/Highlights */}
          <ellipse cx="23" cy="28" rx="5" ry="8" fill="white" opacity="0.35" transform="rotate(-20, 23, 28)" />
          <circle cx="21" cy="22" r="2.5" fill="white" opacity="0.5" />
        </svg>
      )}

      {type === 'orange' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Stem & Leaf */}
          <path d="M32 12 C32 8, 34 5, 36 4" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33 9 C39 6, 45 8, 45 8 C45 8, 44 13, 38 13 Z" fill="#22c55e" />
          {/* Orange Body */}
          <circle cx="32" cy="36" r="24" fill="#f97316" />
          <circle cx="32" cy="36" r="21" fill="#fb923c" opacity="0.8" />
          {/* Texture dots */}
          <circle cx="26" cy="32" r="1.5" fill="#ea580c" opacity="0.6" />
          <circle cx="38" cy="40" r="1.5" fill="#ea580c" opacity="0.6" />
          <circle cx="30" cy="44" r="1.5" fill="#ea580c" opacity="0.6" />
          {/* Gloss */}
          <ellipse cx="23" cy="26" rx="4" ry="7" fill="white" opacity="0.4" transform="rotate(-30, 23, 26)" />
        </svg>
      )}

      {type === 'banana' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Banana Curve */}
          <path
            d="M12 18 C28 14, 52 24, 52 50 C48 52, 44 50, 42 46 C38 28, 22 24, 12 22 Z"
            fill="#eab308"
          />
          {/* Inner Highlight */}
          <path
            d="M14 20 C26 17, 46 26, 46 47"
            fill="none"
            stroke="#fef08a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Stem Tip */}
          <rect x="9" y="16" width="4" height="4" rx="1" fill="#713f12" />
          <circle cx="51" cy="49" r="2.5" fill="#854d0e" />
        </svg>
      )}

      {type === 'strawberry' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Green Calyx / Leaves */}
          <path d="M32 8 C32 15, 22 17, 18 16 C25 20, 28 22, 28 22 C23 26, 32 23, 32 23 C32 23, 41 26, 36 22 C36 22, 39 20, 46 16 C42 17, 32 15, 32 8 Z" fill="#16a34a" />
          {/* Strawberry Heart-like Body */}
          <path
            d="M32 22 C18 20, 14 34, 18 46 C22 56, 30 60, 32 60 C34 60, 42 56, 46 46 C50 34, 46 20, 32 22 Z"
            fill="#e11d48"
          />
          {/* Seeds */}
          <circle cx="26" cy="30" r="1.2" fill="#fef08a" />
          <circle cx="34" cy="32" r="1.2" fill="#fef08a" />
          <circle cx="24" cy="40" r="1.2" fill="#fef08a" />
          <circle cx="38" cy="39" r="1.2" fill="#fef08a" />
          <circle cx="31" cy="45" r="1.2" fill="#fef08a" />
          <circle cx="31" cy="53" r="1" fill="#fef08a" />
          {/* Gloss */}
          <ellipse cx="23" cy="27" rx="3" ry="5" fill="white" opacity="0.4" transform="rotate(-20, 23, 27)" />
        </svg>
      )}

      {type === 'grape' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Vine & Leaf */}
          <path d="M32 12 C32 6, 36 4, 38 3" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 10 C39 7, 44 9, 44 9 C44 9, 42 14, 37 13 Z" fill="#22c55e" />
          {/* Grapes cluster */}
          <circle cx="26" cy="22" r="7" fill="#7e22ce" />
          <circle cx="38" cy="22" r="7" fill="#9333ea" />
          <circle cx="21" cy="33" r="7" fill="#9333ea" />
          <circle cx="32" cy="32" r="7.5" fill="#a855f7" />
          <circle cx="43" cy="33" r="7" fill="#7e22ce" />
          <circle cx="26" cy="43" r="6.5" fill="#a855f7" />
          <circle cx="38" cy="43" r="6.5" fill="#9333ea" />
          <circle cx="32" cy="52" r="5.5" fill="#7e22ce" />
          {/* Grape glints */}
          <circle cx="30" cy="30" r="2" fill="white" opacity="0.4" />
          <circle cx="36" cy="20" r="1.8" fill="white" opacity="0.4" />
        </svg>
      )}

      {type === 'watermelon' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Rind outer green */}
          <path d="M10 26 C12 50, 52 50, 54 26 Z" fill="#15803d" />
          {/* Inner white rind */}
          <path d="M13 26 C15 47, 49 47, 51 26 Z" fill="#bbf7d0" />
          {/* Red flesh */}
          <path d="M16 26 C18 44, 46 44, 48 26 Z" fill="#ef4444" />
          {/* Seeds */}
          <ellipse cx="24" cy="33" rx="1.5" ry="2.2" fill="#1e293b" />
          <ellipse cx="32" cy="36" rx="1.5" ry="2.2" fill="#1e293b" />
          <ellipse cx="40" cy="33" rx="1.5" ry="2.2" fill="#1e293b" />
          <ellipse cx="28" cy="40" rx="1.2" ry="1.8" fill="#1e293b" />
          <ellipse cx="36" cy="40" rx="1.2" ry="1.8" fill="#1e293b" />
        </svg>
      )}

      {type === 'golden_apple' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-lg">
          {/* Glow filter aura */}
          <defs>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="36" r="28" fill="url(#goldGlow)" />
          {/* Golden Stem & Leaf */}
          <path d="M32 16 C32 10, 36 6, 38 4" fill="none" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
          <path d="M33 11 C38 8, 44 9, 44 9 C44 9, 43 14, 38 15 Z" fill="#facc15" />
          {/* Golden Apple Body */}
          <path
            d="M32 18 C20 12, 10 22, 10 36 C10 49, 22 60, 32 58 C42 60, 54 49, 54 36 C54 22, 44 12, 32 18 Z"
            fill="#f59e0b"
          />
          {/* Gold highlights */}
          <ellipse cx="23" cy="28" rx="6" ry="10" fill="#fef08a" opacity="0.75" transform="rotate(-20, 23, 28)" />
          <circle cx="21" cy="22" r="3" fill="white" opacity="0.9" />
          {/* Sparkles */}
          <polygon points="45,20 47,24 51,25 47,26 45,30 43,26 39,25 43,24" fill="#ffffff" />
        </svg>
      )}

      {type === 'rotten_fruit' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-md">
          {/* Wilted Stem */}
          <path d="M32 18 C30 11, 25 9, 22 10" fill="none" stroke="#422006" strokeWidth="2.5" strokeLinecap="round" />
          {/* Rotten Apple Body (Dark muddy greenish/brown) */}
          <path
            d="M32 18 C20 12, 8 23, 11 37 C14 50, 24 58, 33 57 C41 58, 52 48, 51 34 C50 20, 42 12, 32 18 Z"
            fill="#4d7c0f"
          />
          {/* Dark rotten mold patches */}
          <circle cx="22" cy="32" r="7" fill="#365314" opacity="0.85" />
          <circle cx="38" cy="42" r="6" fill="#1f2937" opacity="0.7" />
          <circle cx="32" cy="46" r="3" fill="#14532d" opacity="0.8" />
          {/* Stink fumes / swirls */}
          <path d="M16 14 C14 10, 18 8, 16 4" fill="none" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M46 14 C44 10, 48 8, 46 4" fill="none" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          {/* Dizzy cross eyes */}
          <path d="M22 28 L28 34 M28 28 L22 34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          <path d="M36 28 L42 34 M42 28 L36 34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          {/* Wobbly wavy mouth */}
          <path d="M26 42 Q32 38 38 42" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {type === 'bomb' && (
        <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-lg">
          {/* Burning Fuse */}
          <path d="M38 18 C43 14, 45 10, 46 5" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          {/* Spark Flame at Fuse End */}
          <polygon points="46,5 49,2 51,6 54,4 52,9 50,7 48,11" fill="#ef4444" />
          <circle cx="49" cy="6" r="2.5" fill="#facc15" />
          {/* Bomb Neck */}
          <rect x="33" y="17" width="10" height="5" rx="1.5" fill="#475569" transform="rotate(15, 38, 20)" />
          {/* Bomb Sphere */}
          <circle cx="31" cy="38" r="21" fill="#0f172a" />
          <circle cx="31" cy="38" r="19" fill="#1e293b" />
          {/* Gloss */}
          <ellipse cx="23" cy="30" rx="4" ry="7" fill="white" opacity="0.4" transform="rotate(-30, 23, 30)" />
          {/* Skull / Warning Icon on Bomb */}
          <circle cx="31" cy="39" r="4" fill="#ef4444" opacity="0.8" />
          <rect x="29.5" y="42" width="3" height="3" fill="#ef4444" opacity="0.8" />
        </svg>
      )}
    </div>
  );
};
