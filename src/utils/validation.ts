/**
 * Validates user's answer against the correct solution
 * Returns arrays of correct, incorrect, and missed cells
 */
export function validateAnswer(
  selected: number[],
  correct: number[]
): {
  correct: number[];
  incorrect: number[];
  missed: number[];
} {
  const correctSet = new Set(correct);
  const selectedSet = new Set(selected);

  const correctSelections: number[] = [];
  const incorrectSelections: number[] = [];
  const missedCells: number[] = [];

  // Check selected cells
  selected.forEach(cellIndex => {
    if (correctSet.has(cellIndex)) {
      correctSelections.push(cellIndex);
    } else {
      incorrectSelections.push(cellIndex);
    }
  });

  // Check for missed cells (correct cells that weren't selected)
  correct.forEach(cellIndex => {
    if (!selectedSet.has(cellIndex)) {
      missedCells.push(cellIndex);
    }
  });

  return {
    correct: correctSelections,
    incorrect: incorrectSelections,
    missed: missedCells
  };
}
