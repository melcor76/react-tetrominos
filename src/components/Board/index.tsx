import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Piece from '../Piece';

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
  private currentPiece: Piece;

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
    let piece =  new Piece({ ctx: this.ctx });    
    this.currentPiece = piece;
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    this.currentPiece.clear();
    this.currentPiece.y++;
    this.currentPiece.draw();
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

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} className="Board" />
  }
}
