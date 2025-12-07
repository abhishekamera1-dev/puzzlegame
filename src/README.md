# Pattern Recognition Puzzle Game

A challenging game-like puzzle that tests your ability to decode patterns from visual signals. Watch a 5x5 grid flash according to hidden rules, then try to identify which squares were flashing!

## 🎮 How to Play

1. **Watch** - Observe the 5x5 grid as certain squares flash on and off for 10 seconds
2. **Remember** - Try to identify the pattern behind which squares are flashing
3. **Select** - Click on the squares you believe were flashing
4. **Submit** - Check your answer and receive feedback
5. **Progress** - Move to the next level with a new, more complex pattern

## 🧩 Levels

The game includes 5 levels, each with a unique pattern:

1. **Even Indices** - Squares at even positions flash
2. **Diagonals** - Squares forming an X pattern flash
3. **Prime Numbers** - Squares at prime-numbered positions flash
4. **Center Cluster** - The center square and its 4 neighbors flash
5. **Modulo Pattern** - Squares where (row + col) % 3 === 0 flash

## 🚀 Running Locally

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. Extract the zip file to your desired location

2. Navigate to the project directory:
```bash
cd pattern-recognition-game
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:5173
```

## 🏗️ Project Structure

```
/
├── App.tsx                 # Main game logic and state management
├── components/
│   ├── Grid.tsx           # 5x5 grid component
│   ├── Cell.tsx           # Individual cell with animations
│   ├── LevelInfo.tsx      # Level information display
│   ├── GameControls.tsx   # Game control buttons
│   └── Feedback.tsx       # Results and feedback display
├── utils/
│   ├── levels.ts          # Level definitions and rules
│   └── validation.ts      # Answer validation logic
└── README.md
```

## 🛠️ Technologies Used

- **React** - UI library with functional components and hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## ✨ Features

- **5 Unique Levels** - Each with a different pattern to decode
- **Visual Feedback** - Clear indication of correct, incorrect, and missed selections
- **Score Tracking** - Earn points based on accuracy
- **Responsive Design** - Works on desktop and mobile devices
- **Smooth Animations** - CSS-based transitions for flashing effects
- **Hint System** - Get hints when you don't achieve perfect accuracy
- **Clean UI** - Beautiful gradient design with glass morphism effects

## 🎯 Game Rules

- Watch the flashing sequence for 10 seconds
- Select as many or as few cells as you think were flashing
- Green cells = correctly selected
- Red cells = incorrectly selected (you picked them but they weren't flashing)
- Yellow/translucent cells = missed (they were flashing but you didn't pick them)
- Score is calculated based on accuracy minus penalties for incorrect picks

## 📝 Code Quality

- Modular component architecture
- TypeScript for type safety
- Well-commented logic for complex patterns
- Reusable utility functions
- Clean separation of concerns

## 🔮 Future Enhancements

Potential features that could be added:
- Additional levels with more complex patterns
- Difficulty settings (faster flashing, larger grids)
- Dark/light theme toggle
- Sound effects for flashing and feedback
- Leaderboard and score persistence
- Timer for completion speed

## 📄 License

This project was created as part of a coding assignment.

---

Enjoy the challenge and see if you can decode all the patterns! 🧠✨
