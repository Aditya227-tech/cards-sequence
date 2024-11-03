import React from 'react';

export default function AudioControl({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {isPlaying ? 'Mute Audio' : 'Play Audio'}
    </button>
  );
}
