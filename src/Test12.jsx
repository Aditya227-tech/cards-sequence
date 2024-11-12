import React, { useState, useEffect } from 'react';

// AudioControl Component
function AudioControl({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {isPlaying ? 'Mute Audio' : 'Play Audio'}
    </button>
  );
}

// ScoreBoard Component
function ScoreBoard({ score, gameState }) {
  if (gameState !== 'finished') return null;

  const getScoreMessage = (score) => {
    if (score >= 6) return "Perfect! You have an excellent memory!";
    if (score >= 4) return "Great job! Almost perfect!";
    if (score >= 2) return "Good try! Keep practicing!";
    return "Don't worry! Try again to improve your score!";
  };

  const getScoreColor = (score) => {
    if (score >= 6) return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (score >= 4) return "bg-gradient-to-r from-blue-500 to-blue-600";
    if (score >= 2) return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    return "bg-gradient-to-r from-red-500 to-red-600";
  };

  return (
    <div className={`
      mb-8 
      p-6 
      rounded-xl 
      shadow-lg 
      ${getScoreColor(score)}
      transform 
      transition-all 
      duration-500 
      animate-slideIn
    `}>
      <div className="text-white text-center">
        <h2 className="text-3xl font-bold mb-2">Final Score: {score}</h2>
        <p className="text-lg opacity-90">{getScoreMessage(score)}</p>

        <div className="mt-4 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold">{Math.max(0, score)}</div>
            <div className="text-sm opacity-75">Points</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Card Component
function Card({ id, index, onDragStart, onDragOver, onDrop }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageUrl = `https://deckofcardsapi.com/static/img/${id}.png`;
  const backImageUrl = 'https://deckofcardsapi.com/static/img/back.png';

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, index)}
      className={`
        bg-white rounded-lg shadow-md p-4 m-2 w-48 h-64 
        flex items-center justify-center 
        cursor-move hover:shadow-lg 
        transition-all duration-300 
        ${isLoading ? 'animate-pulse' : ''}
        ${hasError ? 'border-2 border-red-300' : ''}
      `}
    >
      <img 
        src={hasError ? backImageUrl : imageUrl}
        alt={`Card ${id}`}
        className={`
          w-full h-full object-contain rounded
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={(e) => {
          setIsLoading(false);
          setHasError(true);
          e.target.src = backImageUrl;
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

// GameBoard Component
function GameBoard({ cards, onDragStart, onDragOver, onDrop }) {
  return (
    <div 
      className="
        min-h-[400px] 
        p-8 
        bg-orange-500 
        rounded-xl 
        shadow-2xl 
        flex flex-wrap 
        justify-center 
        items-center 
        gap-4
        relative
        before:content-['']
        before:absolute
        before:inset-0
        before:bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.3)_70%)]
        before:rounded-xl
      "
    >
      <div className="relative z-10 flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className="transform transition-transform duration-300 hover:-translate-y-2"
          >
            <Card 
              id={card.id} 
              index={index}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// GameControls Component
function GameControls({ gameState, onShuffle, onSubmit, onGoBack }) {
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
              from-orange-500 
              to-orange-600 
              text-white 
              font-bold 
              text-lg
              rounded-lg 
              shadow-lg
              hover:from-orange-600 
              hover:to-orange-700
              transform 
              hover:scale-105
              transition-all 
              duration-300
              focus:outline-none 
              focus:ring-2 
              focus:ring-orange-500 
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
        {gameState === 'finished' && (
          <button
            onClick={onGoBack}
            className="
              px-8 
              py-4 
              bg-gradient-to-r 
              from-blue-500 
              to-blue-600 
              text-white 
              font-bold 
              text-lg
              rounded-lg 
              shadow-lg
              hover:from-blue-600 
              hover:to-blue-700
              transform 
              hover:scale-105
              transition-all 
              duration-300
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-opacity-50
            "
          >
            Play Again
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

// Main Game Component
export function Test12() {
  const [cards, setCards] = useState([
    { id: 'AS', value: 'Ace of Spades' },
    { id: 'KH', value: 'King of Hearts' },
    { id: 'QD', value: 'Queen of Diamonds' },
    { id: 'JC', value: 'Jack of Clubs' }
  ]);
  const [originalSequence, setOriginalSequence] = useState([]);
  const [gameState, setGameState] = useState('showing');
  const [score, setScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setOriginalSequence([...cards]);
  }, []);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && gameStartTime) {
      timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, gameStartTime]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.target.classList.add('scale-105', 'rotate-2');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.closest('.card-container')?.classList.add('border-dashed', 'border-2', 'border-blue-400');
  };

  const handleDragLeave = (e) => {
    e.target.closest('.card-container')?.classList.remove('border-dashed', 'border-2', 'border-blue-400');
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex) return;

    const newCards = [...cards];
    const [draggedCard] = newCards.splice(dragIndex, 1);
    newCards.splice(dropIndex, 0, draggedCard);
    setCards(newCards);
    setMoves(moves + 1);

    document.querySelectorAll('.card-container').forEach(card => {
      card.classList.remove('border-dashed', 'border-2', 'border-blue-400', 'scale-105', 'rotate-2');
    });
  };

  const handleGoBack = () => {
    setGameState('showing');
    setCards([...originalSequence]);
    setScore(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameStartTime(null);
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setGameState('playing');
    setGameStartTime(Date.now());
    setMoves(0);
    setTimeElapsed(0);

    if (audioPlaying) {
      const shuffleSound = new Audio('/sounds/shuffle.mp3');
      shuffleSound.play().catch(() => {});
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    let correctCards = 0;

    cards.forEach((card, index) => {
      if (card.id === originalSequence[index].id) {
        newScore += 2;
        correctCards++;
      } else {
        newScore -= 1;
      }
    });

    const timeBonus = timeElapsed < 30 ? 3 : timeElapsed < 60 ? 1 : 0;
    const moveBonus = moves < 5 ? 3 : moves < 10 ? 1 : 0;

    newScore += timeBonus + moveBonus;
    setScore(newScore);
    setGameState('finished');

    if (audioPlaying) {
      const sound = correctCards === cards.length ? '/sounds/success.mp3' : '/sounds/fail.mp3';
      const audio = new Audio(sound);
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-black">Card Sequence Memory Game</h1>
            {gameState === 'playing' && (
              <div className="flex gap-4 text-gray-300">
                <span>Time: {timeElapsed}s</span>
                <span>Moves: {moves}</span>
              </div>
            )}
          </div>
          <AudioControl 
            isPlaying={audioPlaying} 
            onToggle={() => setAudioPlaying(!audioPlaying)} 
          />
        </div>

        <ScoreBoard 
          score={score} 
          gameState={gameState} 
        />

        <GameBoard
          cards={cards}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          gameState={gameState}
        />

        <GameControls
          gameState={gameState}
          onShuffle={shuffleCards}
          onSubmit={calculateScore}
          onGoBack={handleGoBack}
          moves={moves}
        />

        {gameState === 'showing' && (
          <div className="mt-6 text-center text-gray-300">
            <p className="text-lg">Memorize the sequence of cards, then click Start Game to begin!</p>
          </div>
        )}
      </div>
    </div>
  );
}