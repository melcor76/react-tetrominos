import React, { FunctionComponent, useReducer } from 'react';
import { connect } from 'react-redux';
import './game.css';
import Board from '../Board';
import reducer from '../../redux/reducers';
import { stopPlaying, startPlaying } from '../../redux/actions';

const Game = () => {
  const [state, dispatch] = useReducer(reducer, {playing:false});

  const handlePlayingChange = () => {
    if (state.playing) {
      dispatch(stopPlaying());
    } else {
      dispatch(startPlaying());
    }
  }

  return (
    <div className="game">
      <Board width={300} height={600} playing={state.playing} />
      <PlayButton playing={state.playing} onChangePlaying={handlePlayingChange} />
    </div>
  )
}

const PlayButton:FunctionComponent<{playing: boolean, onChangePlaying: any}> = ({playing, onChangePlaying}) => (
  <button onClick={onChangePlaying}>{playing ? 'Stop' : 'Play'}</button>
);

//export default Game;
export default connect()(Game);