import React from 'react';

export const GardenBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-amber-50" />

      {/* Sun with Rays */}
      <div className="absolute top-4 right-8 w-28 h-28 opacity-90">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
          {/* Sun Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="50"
              x2="50"
              y2="10"
              stroke="#fde047"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${deg} 50 50)`}
              opacity="0.75"
            />
          ))}
          {/* Sun Body */}
          <circle cx="50" cy="50" r="24" fill="#facc15" />
          <circle cx="50" cy="50" r="20" fill="#fef08a" />
          {/* Friendly Sun Face */}
          <circle cx="43" cy="46" r="2.5" fill="#ca8a04" />
          <circle cx="57" cy="46" r="2.5" fill="#ca8a04" />
          <path d="M 44 54 Q 50 60 56 54" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="38" cy="51" rx="2" ry="1.5" fill="#f87171" opacity="0.6" />
          <ellipse cx="62" cy="51" rx="2" ry="1.5" fill="#f87171" opacity="0.6" />
        </svg>
      </div>

      {/* Fluffy Clouds */}
      <div className="absolute top-8 left-12 opacity-80 animate-float" style={{ animationDuration: '6s' }}>
        <svg viewBox="0 0 120 60" className="w-24 h-12">
          <ellipse cx="40" cy="35" rx="25" ry="15" fill="#ffffff" />
          <ellipse cx="70" cy="30" rx="30" ry="18" fill="#ffffff" />
          <ellipse cx="90" cy="38" rx="20" ry="12" fill="#ffffff" />
          <ellipse cx="55" cy="42" rx="35" ry="10" fill="#ffffff" />
        </svg>
      </div>

      <div className="absolute top-16 right-44 opacity-60 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
        <svg viewBox="0 0 100 50" className="w-20 h-10">
          <ellipse cx="35" cy="28" rx="20" ry="14" fill="#ffffff" />
          <ellipse cx="60" cy="25" rx="25" ry="15" fill="#ffffff" />
          <ellipse cx="80" cy="32" rx="16" ry="10" fill="#ffffff" />
        </svg>
      </div>

      {/* Distant Soft Hills */}
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="absolute bottom-16 w-full h-44 opacity-85"
      >
        {/* Back hills */}
        <path
          d="M 0 240 Q 250 140 500 200 T 1000 170 Q 1120 180 1200 210 L 1200 300 L 0 300 Z"
          fill="#86efac"
          opacity="0.5"
        />
        {/* Front rolling hill */}
        <path
          d="M 0 210 Q 300 120 650 190 T 1200 180 L 1200 300 L 0 300 Z"
          fill="#4ade80"
          opacity="0.75"
        />
      </svg>

      {/* Background Fruit Trees */}
      <div className="absolute bottom-20 left-4 w-28 h-40 opacity-80">
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Trunk */}
          <rect x="42" y="80" width="16" height="50" rx="4" fill="#78350f" />
          {/* Tree crown */}
          <circle cx="50" cy="55" r="40" fill="#16a34a" />
          <circle cx="35" cy="45" r="28" fill="#22c55e" />
          <circle cx="65" cy="45" r="28" fill="#22c55e" />
          <circle cx="50" cy="30" r="26" fill="#4ade80" />
          {/* Tiny apples on tree */}
          <circle cx="35" cy="40" r="4" fill="#ef4444" />
          <circle cx="60" cy="35" r="4" fill="#ef4444" />
          <circle cx="50" cy="60" r="4" fill="#ef4444" />
          <circle cx="70" cy="55" r="3.5" fill="#ef4444" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-6 w-32 h-44 opacity-75">
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Trunk */}
          <rect x="42" y="80" width="16" height="55" rx="4" fill="#78350f" />
          {/* Tree crown */}
          <circle cx="50" cy="50" r="42" fill="#15803d" />
          <circle cx="32" cy="40" r="30" fill="#16a34a" />
          <circle cx="68" cy="40" r="30" fill="#16a34a" />
          <circle cx="50" cy="25" r="25" fill="#22c55e" />
          {/* Tiny oranges on tree */}
          <circle cx="36" cy="42" r="4" fill="#f97316" />
          <circle cx="65" cy="38" r="4" fill="#f97316" />
          <circle cx="50" cy="58" r="4" fill="#f97316" />
        </svg>
      </div>

      {/* Wooden Fence Posts */}
      <div className="absolute bottom-12 inset-x-0 h-10 flex justify-around opacity-45">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="relative w-3 h-10 bg-amber-700/80 rounded-t-sm shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-2 bg-amber-800/80 rounded-t-full" />
          </div>
        ))}
        {/* Horizontal rails */}
        <div className="absolute top-2 inset-x-0 h-1.5 bg-amber-800/60" />
        <div className="absolute top-6 inset-x-0 h-1.5 bg-amber-800/60" />
      </div>

      {/* Foreground Meadow Grass & Wildflowers */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-emerald-600 via-emerald-500 to-green-500 border-t-2 border-emerald-400/60 shadow-inner">
        {/* Decorative grass blades and flowers */}
        <div className="absolute -top-3 inset-x-0 flex justify-between px-4 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-4 bg-emerald-400 rounded-t-full origin-bottom animate-sway"
              style={{
                animationDelay: `${(i % 5) * 0.4}s`,
                height: `${12 + (i % 4) * 3}px`,
              }}
            />
          ))}
        </div>

        {/* Small Daisies along ground */}
        <div className="absolute bottom-2 inset-x-8 flex justify-between opacity-80">
          <span className="text-sm">🌼</span>
          <span className="text-xs">🌸</span>
          <span className="text-sm">🌼</span>
          <span className="text-xs">🌷</span>
          <span className="text-sm">🌼</span>
          <span className="text-xs">🌸</span>
          <span className="text-sm">🌼</span>
        </div>
      </div>
    </div>
  );
};
