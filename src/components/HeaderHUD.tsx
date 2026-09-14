import React from 'react';
import { Volume2, VolumeX, RotateCcw, Pause, Play, Heart, Flame } from 'lucide-react';
import { GameStats } from '../types';

interface HeaderHUDProps {
  stats: GameStats;
  isPaused: boolean;
  isMuted: boolean;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onRestart: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  stats,
  isPaused,
  isMuted,
  onTogglePause,
  onToggleMute,
  onRestart,
}) => {
  const maxStrikes = 3;
  const remainingLives = Math.max(0, maxStrikes - stats.strikes);
  const progressPercent = Math.min(100, Math.round((stats.score / stats.targetScore) * 100));

  // Determine speed label
  const getSpeedLabel = (level: number) => {
    if (level === 1) return 'Santai';
    if (level === 2) return 'Sedang';
    if (level === 3) return 'Cepat';
    return 'Super Cepat!';
  };

  return (
    <header className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-3 pb-2 select-none">
      {/* HUD Container */}
      <div className="bg-white/90 backdrop-blur-md border-2 border-amber-300 rounded-2xl shadow-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 transition-all">
        {/* Left: Lives & Strikes */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Nyawa Pemain:
              </span>
              <span className="text-xs font-black text-rose-600">
                {remainingLives} / {maxStrikes}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {Array.from({ length: maxStrikes }).map((_, i) => {
                const isAlive = i < remainingLives;
                return (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${
                      isAlive ? 'scale-100' : 'scale-90 opacity-40'
                    }`}
                  >
                    <Heart
                      size={22}
                      fill={isAlive ? '#f43f5e' : 'none'}
                      color={isAlive ? '#e11d48' : '#94a3b8'}
                      strokeWidth={2.2}
                      className={isAlive ? 'drop-shadow-sm' : ''}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Combo indicator if any */}
          {stats.combo > 1 && (
            <div className="hidden sm:flex items-center gap-1 bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-black border border-amber-300 animate-bounce">
              <Flame size={14} className="text-orange-500 fill-orange-500" />
              <span>{stats.combo}x Combo!</span>
            </div>
          )}
        </div>

        {/* Center: BIG CLEAR SCORE & PROGRESS */}
        <div className="flex flex-col items-center flex-1 min-w-[200px] max-w-[280px]">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Skor:</span>
            <span className="font-display text-3xl sm:text-4xl font-black text-amber-600 tracking-tight drop-shadow-sm">
              {stats.score}
            </span>
            <span className="text-sm font-extrabold text-slate-400">
              / {stats.targetScore}
            </span>
          </div>

          {/* Progress Bar towards 50 */}
          <div className="w-full mt-1">
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300/80 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mt-0.5 px-0.5">
              <span>Kecepatan: {getSpeedLabel(stats.level)}</span>
              <span>{progressPercent}% ke Menang</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons (Pause, Sound, Restart) */}
        <div className="flex items-center gap-2">
          {/* Pause Button */}
          <button
            id="btn-pause-toggle"
            type="button"
            onClick={onTogglePause}
            title={isPaused ? 'Lanjutkan (Space)' : 'Jeda (Space)'}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-900 border border-amber-200 transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            {isPaused ? <Play size={18} className="fill-amber-800" /> : <Pause size={18} />}
          </button>

          {/* Audio Mute/Unmute */}
          <button
            id="btn-sound-toggle"
            type="button"
            onClick={onToggleMute}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-900 border border-amber-200 transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            {isMuted ? <VolumeX size={18} className="text-slate-400" /> : <Volume2 size={18} />}
          </button>

          {/* Restart Button */}
          <button
            id="btn-restart-hud"
            type="button"
            onClick={onRestart}
            title="Mulai Ulang Permainan"
            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 border border-rose-200 transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
