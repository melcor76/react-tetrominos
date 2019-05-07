import React, { useState } from 'react';
import './game.css';
import Board from '../Board';

const Game = () => {

  const PlayButton = () => {
    const [playing, setPlaying] = useState(false);
  
    const handleClick = () => {
      setPlaying(!playing);
    };
  
    return  <button onClick={handleClick}>{playing ? 'Stop' : 'Play'}</button>
  }

    return (
      <div className="game">
        <Board width={300} height={600} />
        <PlayButton />
      </div>
    )
}

export default Game;