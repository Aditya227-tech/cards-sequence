import React, { useState } from 'react';

export default function Card({ id, index, onDragStart, onDragOver, onDrop }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate card image URL
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
