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
    window.addEventListener("keydown", this.keyHandler);
    this.initBoard();
  }

  componentDidUpdate() {
    if (this.props.playing) {
      this.initBoard();
      this.startGameLoop();
    } else {
      clearInterval(this.interval);
    }
  }

  startGameLoop() {   
    this.currentPiece = new Piece({ ctx: this.ctx });
    this.interval = setInterval(() => {
      this.tick();
    }, 500);
  }

  tick() {    
    if (!this.isValidMove(0, 1)) {
      this.currentPiece = new Piece({ ctx: this.ctx });    
    }

    this.drawPiece(0, 1);
  }

  isValidMove(x: number, y: number): boolean {
    if (this.currentPiece.x + x < -1) {
      return false;
    }
    if (this.currentPiece.x + x > 7) {
      return false;
    }
    if (this.currentPiece.y + y > 17) {
      return false;
    }

    return true;
  }

  drawPiece(x: number, y: number) {    
    this.currentPiece.clear();
    this.currentPiece.x += x;
    this.currentPiece.y += y;
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
    this.ctx.clearRect(0, 0, this.z * 10, this.z * 20);
    for (let row = 0; row < 10; row++) {
      this.board[row] = [];
      for(let col = 0; col < 20; col++) {
        this.board[row][col] = 0;
        this.ctx.strokeRect(this.z * row, this.z * col, this.z, this.z);
      }
    }
  }

  keyHandler = (event: KeyboardEvent) => {	    
    // console.log("Key code: " + event.key);
    if (event.key === "ArrowLeft") {
      if (this.isValidMove(-1, 0)) {
        this.drawPiece(-1, 0);     
      } 
    } else if (event.key === "ArrowRight") {
      if (this.isValidMove(1, 0)) {
        this.drawPiece(1, 0);
      }
    }
  }

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} className="Board" />
  }
}
