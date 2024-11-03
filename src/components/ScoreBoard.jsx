import React from 'react';

export default function ScoreBoard({ score, gameState }) {
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
