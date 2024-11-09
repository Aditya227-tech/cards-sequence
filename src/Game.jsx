import React, { useState, useEffect } from 'react';
import AudioControl from './components/AudioControl';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import ScoreBoard from './components/ScoreBoard';

export function Game() {
  // Updated cards with proper playing card IDs
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

  // Initialize game
  useEffect(() => {
    setOriginalSequence([...cards]);
  }, []);

  // Timer effect
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
    // Add dragging class to card
    e.target.classList.add('scale-105', 'rotate-2');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Add visual feedback for drag over
    e.target.closest('.card-container')?.classList.add('border-dashed', 'border-2', 'border-blue-400');
  };

  const handleDragLeave = (e) => {
    // Remove visual feedback
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

    // Remove all drag-related visual feedback
    document.querySelectorAll('.card-container').forEach(card => {
      card.classList.remove('border-dashed', 'border-2', 'border-blue-400', 'scale-105', 'rotate-2');
    });
  };

  const handleGoBack = () => {
    // Reset the game state
    setGameState('showing');
    setCards([...originalSequence]); // Reset cards to original sequence
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

    // Play shuffle sound if audio is enabled
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

    // Bonus points for speed and efficiency
    const timeBonus = timeElapsed < 30 ? 3 : timeElapsed < 60 ? 1 : 0;
    const moveBonus = moves < 5 ? 3 : moves < 10 ? 1 : 0;

    newScore += timeBonus + moveBonus;

    setScore(newScore);
    setGameState('finished');

    // Play success/failure sound if audio is enabled
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
          moves={moves}
          time={timeElapsed}
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