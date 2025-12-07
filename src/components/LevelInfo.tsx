import { Level } from '../utils/levels';

type GamePhase = 'intro' | 'flashing' | 'selecting' | 'feedback' | 'complete';

interface LevelInfoProps {
  level: Level;
  phase: GamePhase;
  timeLeft: number;
}

export function LevelInfo({ level, phase, timeLeft }: LevelInfoProps) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-white mb-2">{level.name}</h2>
      
      {phase === 'intro' && (
        <p className="text-white/70">
          Watch the pattern carefully. You&apos;ll have 10 seconds to observe which squares flash.
        </p>
      )}
      
      {phase === 'flashing' && (
        <div className="space-y-2">
          <p className="text-white/70">Watch closely...</p>
          <div className="text-2xl text-white">
            {timeLeft}s
          </div>
        </div>
      )}
      
      {phase === 'selecting' && (
        <p className="text-white/70">
          Select the squares that were flashing, then submit your answer.
        </p>
      )}
      
      {phase === 'feedback' && (
        <p className="text-white/70">
          Review your results below.
        </p>
      )}
    </div>
  );
}
