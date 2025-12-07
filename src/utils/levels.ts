export interface Level {
  name: string;
  description: string;
  hint: string;
  getFlashingCells: () => number[];
}

/**
 * Helper function to check if a number is prime
 */
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Convert 1D index to 2D coordinates (row, col)
 * For a 5x5 grid: row = Math.floor(index / 5), col = index % 5
 */
function indexToCoords(index: number): { row: number; col: number } {
  return {
    row: Math.floor(index / 5),
    col: index % 5
  };
}

export const levels: Level[] = [
  // Level 1: Even indices
  {
    name: 'Level 1: Even Indices',
    description: 'Flash squares where index % 2 === 0',
    hint: 'Look for squares at even positions (0, 2, 4, 6...)',
    getFlashingCells: () => {
      const cells: number[] = [];
      for (let i = 0; i < 25; i++) {
        if (i % 2 === 0) {
          cells.push(i);
        }
      }
      return cells;
    }
  },

  // Level 2: Diagonals
  {
    name: 'Level 2: Diagonals',
    description: 'Flash squares where (row === col) or (row + col === 4)',
    hint: 'The pattern forms an X shape across the grid',
    getFlashingCells: () => {
      const cells: number[] = [];
      for (let i = 0; i < 25; i++) {
        const { row, col } = indexToCoords(i);
        // Main diagonal: row === col (0, 6, 12, 18, 24)
        // Anti-diagonal: row + col === 4 (4, 8, 12, 16, 20)
        if (row === col || row + col === 4) {
          cells.push(i);
        }
      }
      return cells;
    }
  },

  // Level 3: Prime numbers
  {
    name: 'Level 3: Prime Numbers',
    description: 'Flash squares whose index is a prime number',
    hint: 'Prime numbers are only divisible by 1 and themselves (2, 3, 5, 7, 11...)',
    getFlashingCells: () => {
      const cells: number[] = [];
      for (let i = 0; i < 25; i++) {
        if (isPrime(i)) {
          cells.push(i);
        }
      }
      return cells;
    }
  },

  // Level 4: Center cluster
  {
    name: 'Level 4: Center Cluster',
    description: 'Flash center (12) and its 4 direct neighbors',
    hint: 'Focus on the very center of the grid and its adjacent cells',
    getFlashingCells: () => {
      // Center is at index 12 (row=2, col=2)
      // Direct neighbors: top(7), bottom(17), left(11), right(13)
      return [7, 11, 12, 13, 17];
    }
  },

  // Level 5: (row + col) % 3 === 0
  {
    name: 'Level 5: Modulo Pattern',
    description: 'Flash squares where (row + col) % 3 === 0',
    hint: 'The pattern forms diagonal stripes across the grid',
    getFlashingCells: () => {
      const cells: number[] = [];
      for (let i = 0; i < 25; i++) {
        const { row, col } = indexToCoords(i);
        if ((row + col) % 3 === 0) {
          cells.push(i);
        }
      }
      return cells;
    }
  }
];
