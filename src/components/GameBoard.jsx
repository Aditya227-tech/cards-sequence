import React from 'react';
import Card from './Card';

export default function GameBoard({ cards, onDragStart, onDragOver, onDrop }) {
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
