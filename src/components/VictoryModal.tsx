import React from 'react';
import { RotateCcw, Trophy, Sparkles, Home, Star } from 'lucide-react';
import { GameStats } from '../types';

interface VictoryModalProps {
  stats: GameStats;
  onRestart: () => void;
  onHome: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  onRestart,
  onHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      {/* Confetti floating elements in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎉', '✨', '🍎', '🍊', '⭐', '🍓', '🎊', '🍉'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-bounce"
            style={{
              top: `${15 + (i * 10)}%`,
              left: `${10 + (i * 11)}%`,
              animationDuration: `${1.5 + (i % 3) * 0.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-400 text-center">
        {/* Trophy Header Badge */}
        <div className="relative w-20 h-20 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-yellow-300 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <Trophy size={44} className="fill-white drop-shadow" />
          <Sparkles className="absolute -top-2 -right-2 text-yellow-300 fill-yellow-300 animate-spin" size={24} />
        </div>

        <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
          <Star size={18} className="fill-amber-400" />
          <Star size={22} className="fill-amber-400" />
          <Star size={18} className="fill-amber-400" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-black text-amber-600 tracking-tight">
          SELAMAT! ANDA MENANG!
        </h2>
        <p className="text-sm font-bold text-slate-600 mt-1">
          Luar biasa! Anda berhasil mengumpulkan <strong className="text-amber-600">50 poin</strong> di kebun buah!
        </p>

        {/* Victory Score Card */}
        <div className="my-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 flex flex-col items-center shadow-inner">
          <span className="text-xs font-black text-amber-700 uppercase tracking-widest">
            Total Skor Tercapai
          </span>
          <span className="font-display text-5xl font-black text-amber-600 my-1">
            {stats.score}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full mt-1">
            ✓ Target 50 Terpenuhi
          </span>
        </div>

        {/* Victory Stats */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-600">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="block text-slate-400 font-bold">Total Buah Dipanen</span>
            <span className="font-extrabold text-slate-700 text-base">{stats.fruitsCaught} Buah</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="block text-slate-400 font-bold">Max Combo</span>
            <span className="font-extrabold text-slate-700 text-base">{stats.maxCombo}x</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="btn-play-again"
            type="button"
            onClick={onRestart}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold text-base rounded-2xl shadow-md hover:shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>Main Lagi</span>
          </button>
          <button
            id="btn-home-victory"
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
