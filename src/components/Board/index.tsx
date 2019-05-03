import React from 'react';
import './styles.css';

class Board extends React.Component {
  render() {
    return <canvas ref="canvas" width="300" height="600" className="Board" />
  }
}

export default Board;