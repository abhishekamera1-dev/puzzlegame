type GamePhase = 'intro' | 'flashing' | 'selecting' | 'feedback' | 'complete';

interface GameControlsProps {
  phase: GamePhase;
  onStart: () => void;
  onSubmit: () => void;
  onNext: () => void;
  onRetry: () => void;
  onReset: () => void;
  hasSelection: boolean;
  isLastLevel: boolean;
}

export function GameControls({
  phase,
  onStart,
  onSubmit,
  onNext,
  onRetry,
  onReset,
  hasSelection,
  isLastLevel
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {phase === 'intro' && (
        <button
          onClick={onStart}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
        >
          Start Level
        </button>
      )}

      {phase === 'selecting' && (
        <button
          onClick={onSubmit}
          disabled={!hasSelection}
          className={`w-full py-3 px-6 rounded-lg transition-all transform
            ${hasSelection 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105' 
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
        >
          Submit Answer
        </button>
      )}

      {phase === 'feedback' && (
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105"
          >
            Retry Level
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
          >
            {isLastLevel ? 'Finish' : 'Next Level'}
          </button>
        </div>
      )}

      {phase !== 'intro' && phase !== 'complete' && (
        <button
          onClick={onReset}
          className="w-full py-2 px-4 bg-white/10 text-white/60 rounded-lg hover:bg-white/20 hover:text-white/80 transition-all text-sm"
        >
          Reset Game
        </button>
      )}
    </div>
  );
}
