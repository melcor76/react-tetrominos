import React from 'react';
import './app.css';
import Board from '../components/Board';
import PlayButton from '../components/PlayButton';

const App = () => (
  <div className="App">      
      <Board width={300} height={600} />
      <PlayButton />
  </div>
);

export default App;
