import React from 'react';

export default function GameControls({ gameState, onShuffle, onSubmit }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="flex justify-center gap-4">
        {gameState === 'showing' && (
          <button
            onClick={onShuffle}
            className="
              px-8 
              py-4 
              bg-gradient-to-r 
              from-green-500 
              to-green-600 
              text-white 
              font-bold 
              text-lg
              rounded-lg 
              shadow-lg
              hover:from-green-600 
              hover:to-green-700
              transform 
              hover:scale-105
              transition-all 
              duration-300
              focus:outline-none 
              focus:ring-2 
              focus:ring-green-500 
              focus:ring-opacity-50
            "
          >
            Start Game
          </button>
        )}
        {gameState === 'playing' && (
          <button
            onClick={onSubmit}
            className="
              px-8 
              py-4 
              bg-gradient-to-r 
              from-purple-500 
              to-purple-600 
              text-white 
              font-bold 
              text-lg
              rounded-lg 
              shadow-lg
              hover:from-purple-600 
              hover:to-purple-700
              transform 
              hover:scale-105
              transition-all 
              duration-300
              focus:outline-none 
              focus:ring-2 
              focus:ring-purple-500 
              focus:ring-opacity-50
            "
          >
            Submit Sequence
          </button>
        )}
      </div>
      {gameState === 'playing' && (
        <p className="text-gray-600 italic mt-2">
          Drag the cards to arrange them in the correct order
        </p>
      )}
    </div>
  );
}