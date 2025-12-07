interface CellProps {
  index: number;
  shouldFlash: boolean;
  isSelected: boolean;
  cellState: 'default' | 'correct' | 'incorrect' | 'missed';
  onClick: () => void;
  isClickable: boolean;
}

export function Cell({
  index,
  shouldFlash,
  isSelected,
  cellState,
  onClick,
  isClickable
}: CellProps) {
  // Determine background color based on state
  const getBackgroundClass = () => {
    if (cellState === 'correct') return 'bg-green-500';
    if (cellState === 'incorrect') return 'bg-red-500';
    if (cellState === 'missed') return 'bg-yellow-500/50';
    if (shouldFlash) return 'bg-blue-400';
    if (isSelected) return 'bg-indigo-500';
    return 'bg-white/20';
  };

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`
        aspect-square rounded-lg transition-all duration-300
        ${getBackgroundClass()}
        ${isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
        ${isClickable && !isSelected ? 'hover:bg-white/30' : ''}
        ${shouldFlash ? 'shadow-lg shadow-blue-400/50 scale-105' : ''}
        border-2 ${isSelected ? 'border-white' : 'border-white/10'}
        flex items-center justify-center
      `}
      aria-label={`Cell ${index + 1}`}
    >
      {/* Show index during selection for easier debugging (optional) */}
      {isSelected && (
        <span className="text-white text-xs opacity-50">{index}</span>
      )}
    </button>
  );
}
