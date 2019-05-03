import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class Board extends React.Component {

  private board: number[][];
  private ctx: CanvasRenderingContext2D;

  componentDidMount() {    
    const canvas = ReactDOM.findDOMNode(this.refs.canvas) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.initBoard();
  }

  initBoard() {
    const z = 30;
    this.board = [];
    for (let row = 0; row < 10; row++) {
      this.board[row] = [];
      for(let col = 0; col < 20; col++) {
        this.board[row][col] = 0;
        this.ctx.strokeRect(z * row, z * col, z, z);
      }
    }
  }

  render() {
    return <canvas ref="canvas" width="300" height="600" className="Board" />
  }
}

export default Board;