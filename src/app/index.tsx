import React from 'react';
import './app.css';
import Board from '../components/Board';

function App() {
  return (
    <div className="App">      
        <Board width={300} height={600} /> 
    </div>
  );
}

export default App;
