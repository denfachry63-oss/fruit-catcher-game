import React from 'react';
import { RotateCcw, Frown, Trophy, Home } from 'lucide-react';
import { GameStats } from '../types';

interface GameOverModalProps {
  stats: GameStats;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  stats,
  onRestart,
  onHome,
}) => {
  const isNewHighScore = stats.score > 0 && stats.score >= stats.highScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-300 text-center">
        {/* Sad Icon Header */}
        <div className="w-16 h-16 mx-auto mb-3 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shadow-inner">
          <Frown size={36} />
        </div>

        <h2 className="font-display text-3xl font-black text-rose-600 tracking-tight">
          Game Over!
        </h2>
        <p className="text-sm font-semibold text-slate-600 mt-1">
          Keranjang menangkap 3 rintangan (buah busuk/bom). Jangan menyerah!
        </p>

        {/* Score Card */}
        <div className="my-5 bg-rose-50/70 border border-rose-200 rounded-2xl p-4 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Skor Akhir
          </span>
          <span className="font-display text-5xl font-black text-rose-600 my-1">
            {stats.score}
          </span>
          <span className="text-xs font-bold text-slate-500">
            Target Menang: 50 poin
          </span>

          {isNewHighScore && (
            <div className="mt-3 flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold border border-amber-300 animate-pulse">
              <Trophy size={14} className="text-yellow-600 fill-yellow-500" />
              <span>Rekor Baru Tercapai!</span>
            </div>
          )}
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-600">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="block text-slate-400 font-bold">Buah Tertangkap</span>
            <span className="font-extrabold text-slate-700 text-base">{stats.fruitsCaught}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="block text-slate-400 font-bold">Combo Tertinggi</span>
            <span className="font-extrabold text-slate-700 text-base">{stats.maxCombo}x</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="btn-restart-gameover"
            type="button"
            onClick={onRestart}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold text-base rounded-2xl shadow-md hover:shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>Coba Lagi</span>
          </button>
          <button
            id="btn-home-gameover"
            type="button"
            onClick={onHome}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
          >
            <Home size={18} />
            <span>Menu Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
