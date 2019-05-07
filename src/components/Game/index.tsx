import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import './game.css';
import Board from '../Board';

const Game = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlayingChange = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  } 

  return (
    <div className="game">
      <Board width={300} height={600} playing={playing} />
      <PlayButton playing={playing} onChangePlaying={handlePlayingChange} />
    </div>
  )
}

const PlayButton:FunctionComponent<{playing: boolean, onChangePlaying: any}> = ({playing, onChangePlaying}) => (
  <button onClick={onChangePlaying}>{playing ? 'Stop' : 'Play'}</button>
);

const mapStateToProps = (state: any) => {
  return { playing: state.playing };
};

//export default Game;
export default connect(mapStateToProps)(Game);