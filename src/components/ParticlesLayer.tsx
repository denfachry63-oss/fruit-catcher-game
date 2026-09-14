import React from 'react';
import { Particle, FloatingText } from '../types';

interface ParticlesLayerProps {
  particles: Particle[];
  floatingTexts: FloatingText[];
}

export const ParticlesLayer: React.FC<ParticlesLayerProps> = ({
  particles,
  floatingTexts,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20">
      {/* Visual splash particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full shadow-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.alpha,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Floating score / damage text */}
      {floatingTexts.map((ft) => (
        <div
          key={ft.id}
          className={`absolute font-display font-black text-lg sm:text-xl tracking-wide drop-shadow-md transition-transform duration-75`}
          style={{
            left: `${ft.x}%`,
            top: `${ft.y}%`,
            color: ft.color,
            opacity: ft.alpha,
            transform: 'translate(-50%, -50%)',
            textShadow: ft.isHarmful
              ? '0 0 8px rgba(239, 68, 68, 0.8), 0 2px 4px rgba(0,0,0,0.5)'
              : '0 0 8px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {ft.text}
        </div>
      ))}
    </div>
  );
};
