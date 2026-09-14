import React from 'react';
import { Play, Trophy, Sparkles, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { FruitVisual } from './FruitVisual';

interface StartScreenProps {
  highScore: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  highScore,
  isMuted,
  onToggleMute,
  onStart,
}) => {
  return (
    <div className="relative z-30 flex flex-col items-center justify-center min-h-[85vh] p-4 text-center select-none">
      {/* Main Glass Card */}
      <div className="relative max-w-xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300">
        {/* Floating fruit decorations on card header */}
        <div className="absolute -top-10 left-6 transform -rotate-12 animate-float">
          <FruitVisual type="apple" size={48} />
        </div>
        <div className="absolute -top-10 right-6 transform rotate-12 animate-float" style={{ animationDelay: '1s' }}>
          <FruitVisual type="orange" size={48} />
        </div>

        {/* Title & Subtitle */}
        <div className="mt-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            Arcade Kebun Ceria
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-amber-600 tracking-tight drop-shadow-sm">
            FRUIT CATCHER
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
            Gerakkan keranjang, tangkap buah segar, dan raih kemenangan!
          </p>
        </div>

        {/* High Score Banner if exists */}
        {highScore > 0 && (
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border border-amber-300 px-4 py-1.5 rounded-2xl mb-4 text-amber-900 font-extrabold text-sm shadow-xs">
            <Trophy size={18} className="text-yellow-600 fill-yellow-500" />
            <span>Skor Tertinggi Anda: <strong className="text-amber-700 font-black">{highScore}</strong></span>
          </div>
        )}

        {/* Quick Rules & Guide Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-left">
          {/* Rule 1: Controls */}
          <div className="bg-amber-50/80 rounded-2xl p-3 border border-amber-200">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">⌨️</span>
              <h4 className="font-display font-bold text-xs text-amber-900 uppercase">Kontrol</h4>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Tekan panah <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-300 font-mono text-[10px] font-bold text-slate-700 shadow-xs">◀</kbd> dan <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-300 font-mono text-[10px] font-bold text-slate-700 shadow-xs">▶</kbd> pada keyboard untuk menggeser keranjang.
            </p>
          </div>

          {/* Rule 2: Fruits to catch */}
          <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🍎</span>
              <h4 className="font-display font-bold text-xs text-emerald-900 uppercase">Tangkap Buah</h4>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Tangkap buah segar untuk dapat poin. Capai <strong className="text-emerald-700 font-bold">50 Poin</strong> untuk Menang!
            </p>
          </div>

          {/* Rule 3: Avoid rotten / bombs */}
          <div className="bg-rose-50/80 rounded-2xl p-3 border border-rose-200">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert size={18} className="text-rose-600" />
              <h4 className="font-display font-bold text-xs text-rose-900 uppercase">Hindari Musuh</h4>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Jauhi <strong className="text-rose-700 font-bold">Buah Busuk</strong> & <strong className="text-rose-700 font-bold">Bom</strong>! Kena 3 kali = Kalah.
            </p>
          </div>
        </div>

        {/* Start Game Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-start-game"
            type="button"
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold text-lg sm:text-xl rounded-2xl shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-emerald-300"
          >
            <Play size={22} className="fill-white" />
            <span>Mulai Main Sekarang</span>
          </button>

          {/* Sound toggle */}
          <button
            id="btn-sound-start"
            type="button"
            onClick={onToggleMute}
            className="p-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 border border-amber-300 transition-all shadow-sm cursor-pointer"
            title={isMuted ? 'Suara Dinonaktifkan' : 'Suara Aktif'}
          >
            {isMuted ? <VolumeX size={20} className="text-slate-400" /> : <Volume2 size={20} />}
          </button>
        </div>

        {/* Tip at bottom */}
        <p className="text-[11px] text-slate-400 font-medium mt-4">
          Tip: Kecepatan buah jatuh akan semakin menantang saat skormu mendekati 50!
        </p>
      </div>
    </div>
  );
};
