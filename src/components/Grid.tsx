import { Cell } from './Cell';

type GamePhase = 'intro' | 'flashing' | 'selecting' | 'feedback' | 'complete';

interface GridProps {
  phase: GamePhase;
  flashingCells: Set<number>;
  selectedCells: Set<number>;
  isFlashing: boolean;
  onCellClick: (index: number) => void;
  feedback: {
    correct: number[];
    incorrect: number[];
    missed: number[];
  } | null;
}

export function Grid({
  phase,
  flashingCells,
  selectedCells,
  isFlashing,
  onCellClick,
  feedback
}: GridProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        {Array.from({ length: 25 }, (_, index) => {
          const shouldFlash = flashingCells.has(index) && isFlashing;
          const isSelected = selectedCells.has(index);
          
          // Determine cell state for feedback
          let cellState: 'default' | 'correct' | 'incorrect' | 'missed' = 'default';
          if (feedback) {
            if (feedback.correct.includes(index)) cellState = 'correct';
            else if (feedback.incorrect.includes(index)) cellState = 'incorrect';
            else if (feedback.missed.includes(index)) cellState = 'missed';
          }

          return (
            <Cell
              key={index}
              index={index}
              shouldFlash={shouldFlash}
              isSelected={isSelected}
              cellState={cellState}
              onClick={() => onCellClick(index)}
              isClickable={phase === 'selecting'}
            />
          );
        })}
      </div>
    </div>
  );
}
