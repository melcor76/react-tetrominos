import React from 'react';
import './app.css';
import Board from '../components/Board';
import PlayButton from '../components/PlayButton';

function App() {
  return (
    <div className="App">      
        <Board width={300} height={600} />
        <PlayButton />
    </div>
  );
}

export default App;
