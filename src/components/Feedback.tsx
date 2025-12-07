interface FeedbackProps {
  feedback: {
    correct: number[];
    incorrect: number[];
    missed: number[];
  };
  levelHint: string;
  total: number;
}

export function Feedback({ feedback, levelHint, total }: FeedbackProps) {
  const isPerfect = feedback.correct.length === total && 
                    feedback.incorrect.length === 0 && 
                    feedback.missed.length === 0;

  const accuracy = Math.round((feedback.correct.length / total) * 100);

  return (
    <div className="mt-6 space-y-4">
      {/* Results Summary */}
      <div className="bg-white/10 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-green-400">✓ {feedback.correct.length}</div>
            <div className="text-xs text-white/60">Correct</div>
          </div>
          <div>
            <div className="text-red-400">✗ {feedback.incorrect.length}</div>
            <div className="text-xs text-white/60">Wrong</div>
          </div>
          <div>
            <div className="text-yellow-400">○ {feedback.missed.length}</div>
            <div className="text-xs text-white/60">Missed</div>
          </div>
        </div>
      </div>

      {/* Accuracy */}
      <div className="text-center">
        {isPerfect ? (
          <div className="text-green-400">
            🎉 Perfect! 100% Accuracy
          </div>
        ) : (
          <div className="text-white/80">
            Accuracy: {accuracy}%
          </div>
        )}
      </div>

      {/* Hint (shown only if not perfect) */}
      {!isPerfect && (
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
          <div className="text-blue-300 text-sm mb-1">💡 Hint:</div>
          <div className="text-white/80 text-sm">{levelHint}</div>
        </div>
      )}
    </div>
  );
}
