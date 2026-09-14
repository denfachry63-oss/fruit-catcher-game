import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlsOverlayProps {
  onMoveLeftStart: () => void;
  onMoveLeftEnd: () => void;
  onMoveRightStart: () => void;
  onMoveRightEnd: () => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
}) => {
  return (
    <div className="absolute inset-x-0 bottom-1 z-25 flex items-center justify-between px-3 pointer-events-none select-none">
      {/* Left button */}
      <button
        id="btn-move-left"
        type="button"
        onMouseDown={onMoveLeftStart}
        onMouseUp={onMoveLeftEnd}
        onMouseLeave={onMoveLeftEnd}
        onTouchStart={onMoveLeftStart}
        onTouchEnd={onMoveLeftEnd}
        className="pointer-events-auto w-14 h-14 rounded-2xl bg-white/80 active:bg-amber-200 backdrop-blur-md border-2 border-amber-300 text-amber-900 shadow-lg flex items-center justify-center transition-transform active:scale-90 cursor-pointer sm:hidden"
        title="Geser Kiri (Panah Kiri / A)"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Desktop keyboard hint */}
      <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200/80 shadow-xs text-xs font-bold text-slate-600">
        <span>Kontrol:</span>
        <kbd className="px-2 py-0.5 bg-amber-50 rounded border border-amber-300 text-amber-900 font-mono text-xs">◀ Kiri</kbd>
        <span>dan</span>
        <kbd className="px-2 py-0.5 bg-amber-50 rounded border border-amber-300 text-amber-900 font-mono text-xs">▶ Kanan</kbd>
      </div>

      {/* Right button */}
      <button
        id="btn-move-right"
        type="button"
        onMouseDown={onMoveRightStart}
        onMouseUp={onMoveRightEnd}
        onMouseLeave={onMoveRightEnd}
        onTouchStart={onMoveRightStart}
        onTouchEnd={onMoveRightEnd}
        className="pointer-events-auto w-14 h-14 rounded-2xl bg-white/80 active:bg-amber-200 backdrop-blur-md border-2 border-amber-300 text-amber-900 shadow-lg flex items-center justify-center transition-transform active:scale-90 cursor-pointer sm:hidden"
        title="Geser Kanan (Panah Kanan / D)"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};
