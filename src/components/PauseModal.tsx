import React from 'react';
import { Play, RotateCcw, Home } from 'lucide-react';

interface PauseModalProps {
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestart,
  onHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 text-center">
        <div className="w-14 h-14 mx-auto mb-3 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shadow-inner">
          <Play size={28} className="fill-amber-700 ml-1" />
        </div>

        <h3 className="font-display text-2xl font-black text-amber-900">
          Permainan Dijeda
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Tekan Spasi atau tombol di bawah untuk melanjutkan petualangan
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            id="btn-resume-modal"
            type="button"
            onClick={onResume}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={18} className="fill-white" />
            <span>Lanjutkan</span>
          </button>

          <button
            id="btn-restart-pause-modal"
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 px-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
          >
            <RotateCcw size={16} />
            <span>Ulangi Permainan</span>
          </button>

          <button
            id="btn-home-pause-modal"
            type="button"
            onClick={onHome}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
          >
            <Home size={16} />
            <span>Menu Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
