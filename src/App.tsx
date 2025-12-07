import { useState, useEffect, useCallback } from 'react';
import { Grid } from './components/Grid';
import { LevelInfo } from './components/LevelInfo';
import { GameControls } from './components/GameControls';
import { Feedback } from './components/Feedback';
import { levels } from './utils/levels';
import { validateAnswer } from './utils/validation';

type GamePhase = 'intro' | 'flashing' | 'selecting' | 'feedback' | 'complete';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [selectedCells, setSelectedCells] = useState<Set<number>>(new Set());
  const [flashingCells, setFlashingCells] = useState<Set<number>>(new Set());
  const [isFlashing, setIsFlashing] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [feedback, setFeedback] = useState<{
    correct: number[];
    incorrect: number[];
    missed: number[];
  } | null>(null);

  // Calculate which cells should flash for current level
  const getFlashingCells = useCallback(() => {
    return new Set(levels[currentLevel].getFlashingCells());
  }, [currentLevel]);

  // Start flashing sequence
  const startFlashing = useCallback(() => {
    setPhase('flashing');
    setSelectedCells(new Set());
    setFeedback(null);
    setTimeLeft(10);
    
    const flashCells = getFlashingCells();
    let flashInterval: number;
    let countdownInterval: number;

    // Flash on/off every 500ms
    flashInterval = window.setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 500);

    // Countdown timer
    countdownInterval = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(flashInterval);
          clearInterval(countdownInterval);
          setIsFlashing(false);
          setPhase('selecting');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setFlashingCells(flashCells);

    return () => {
      clearInterval(flashInterval);
      clearInterval(countdownInterval);
    };
  }, [getFlashingCells]);

  // Handle cell selection during selecting phase
  const toggleCell = (index: number) => {
    if (phase !== 'selecting') return;
    
    setSelectedCells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Submit answer
  const submitAnswer = () => {
    const result = validateAnswer(
      Array.from(selectedCells),
      Array.from(flashingCells)
    );
    
    setFeedback(result);
    setPhase('feedback');

    // Calculate score based on accuracy
    const accuracy = result.correct.length / flashingCells.size;
    const penalty = result.incorrect.length;
    const levelScore = Math.max(0, Math.round((accuracy * 100) - (penalty * 10)));
    setScore(prev => prev + levelScore);
  };

  // Move to next level
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setPhase('intro');
      setSelectedCells(new Set());
      setFeedback(null);
    } else {
      setPhase('complete');
    }
  };

  // Retry current level
  const retryLevel = () => {
    setPhase('intro');
    setSelectedCells(new Set());
    setFeedback(null);
  };

  // Reset game
  const resetGame = () => {
    setCurrentLevel(0);
    setPhase('intro');
    setSelectedCells(new Set());
    setFlashingCells(new Set());
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Pattern Recognition Puzzle</h1>
          <div className="flex justify-center gap-8 text-white/80">
            <div>
              Level: <span className="text-white">{currentLevel + 1}</span>/{levels.length}
            </div>
            <div>
              Score: <span className="text-white">{score}</span>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <LevelInfo 
            level={levels[currentLevel]}
            phase={phase}
            timeLeft={timeLeft}
          />

          <Grid
            phase={phase}
            flashingCells={flashingCells}
            selectedCells={selectedCells}
            isFlashing={isFlashing}
            onCellClick={toggleCell}
            feedback={feedback}
          />

          <GameControls
            phase={phase}
            onStart={startFlashing}
            onSubmit={submitAnswer}
            onNext={nextLevel}
            onRetry={retryLevel}
            onReset={resetGame}
            hasSelection={selectedCells.size > 0}
            isLastLevel={currentLevel === levels.length - 1}
          />

          {feedback && (
            <Feedback
              feedback={feedback}
              levelHint={levels[currentLevel].hint}
              total={flashingCells.size}
            />
          )}
        </div>

        {/* Game Complete */}
        {phase === 'complete' && (
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
            <h2 className="text-white mb-4">🎉 Congratulations!</h2>
            <p className="text-white/80 mb-4">
              You completed all levels with a total score of <span className="text-white">{score}</span>!
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
