import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Tetromino, spawn } from '../Block';

type BoardProps = {
  width: number,
  height: number,
  playing: boolean
}

export default class Board extends Component<BoardProps> {

  private board: number[][];
  private ctx: CanvasRenderingContext2D;
  private interval: any;
  private z = 30;
  private currentPiece: Tetromino;

  componentDidMount() {    
    const canvas = ReactDOM.findDOMNode(this.refs.canvas) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.initBoard();
  }

  componentDidUpdate() {
    if (this.props.playing) {
      this.startGameLoop();
    } else {
      clearInterval(this.interval);
    }
  }

  startGameLoop() {
    let block = spawn();
    console.log(block);
    this.currentPiece = block;
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    console.log('tick');
    this.drawPiece(this.currentPiece, "#282c34");
    this.currentPiece.y++;
    this.drawPiece(this.currentPiece, "red");
  }

  animate() {
    if (!this.props.playing) {
      return;
    }

    requestAnimationFrame(this.animate);
  }

  initBoard() {
    this.board = [];
    for (let row = 0; row < 10; row++) {
      this.board[row] = [];
      for(let col = 0; col < 20; col++) {
        this.board[row][col] = 0;
        this.ctx.strokeRect(this.z * row, this.z * col, this.z, this.z);
      }
    }
  }

  drawPiece(piece: Tetromino, color: string) {
    //fs = ctx.fillStyle;
    this.ctx.fillStyle = color;
    if (!piece || ! piece.shape){
      return;
    }
    for (var ix = 0; ix < piece.shape.length; ix++) {
      for (var iy = 0; iy < piece.shape.length; iy++) {
        if (piece.shape[ix][iy]) {
          if (piece.x && piece.y) {
          this.drawSquare(piece.x + ix, piece.y + iy);
          }
        }
      }
    }
    //ctx.fillStyle = fs;
  };

  // Draws a block at the specified game coordinate
  drawSquare(x: number, y: number) {    
    this.ctx.fillRect(this.z * x, this.z * y, this.z, this.z);
    this.ctx.strokeRect(this.z * x, this.z * y, this.z, this.z);
  }

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} className="Board" />
  }
}
