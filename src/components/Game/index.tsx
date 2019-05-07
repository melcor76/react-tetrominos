import React, { useState, FunctionComponent } from 'react';
import './game.css';
import Board from '../Board';

const Game = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlayingChange = () => {
    if (playing) {
      setPlaying(false);
      console.log('game over!');
    } else {
      setPlaying(true);
      console.log('game on!');
    }
  } 

  return (
    <div className="game">
      <Board width={300} height={600} />
      <PlayButton playing={playing} onChangePlaying={handlePlayingChange} />
    </div>
  )
}

const PlayButton:FunctionComponent<{playing: boolean, onChangePlaying: any}> = ({playing, onChangePlaying}) => (
  <button onClick={onChangePlaying}>{playing ? 'Stop' : 'Play'}</button>
);

export default Game;