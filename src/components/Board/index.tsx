import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Piece from '../Piece';
import { stopPlaying } from '../../redux/actions';

type BoardProps = {
  width: number,
  height: number,
  playing: boolean,
  dispatch: any
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

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyHandler);
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
    if (this.isValidMove(0, 1, this.currentPiece.shape)) {
      this.drawPiece(0, 1);
    } else {
      this.freeze();
      // TODO clear lines
      if (this.currentPiece.y < 0) { // Game Over
        this.props.dispatch(stopPlaying());
        return;
      }
      this.currentPiece = new Piece({ ctx: this.ctx });
    }
  }

  // checks if the resulting position of current shape will be feasible
  isValidMove(offsetX: number, offsetY: number, shape: number[][]) {
    const cols = 10;
    const rows = 20;
    offsetX = this.currentPiece.x + offsetX;
    offsetY = this.currentPiece.y + offsetY;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape.length; x++) {
        if (shape[y][x]) {          
          // Stop at the walls
          if (x + offsetX < 0 || x + offsetX >= cols) {
            return false;
          }
          // Stop at bottom
          if (y + offsetY >= rows) {
            return false;
          }
          // Occupied by tetromino
          if (this.isOccupied(x + offsetX, y + offsetY)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  isOccupied(x: number, y: number): boolean {
    return this.board[y] && this.board[y][x] ? true : false;
  }

  drawPiece(x: number, y: number, rotate: boolean = false) {
    this.currentPiece.clear();
    if (rotate) {
      this.currentPiece.rotate();
    } else {
      this.currentPiece.x += x;
      this.currentPiece.y += y;
    }
    this.currentPiece.draw();
  }

  animate() {
    if (!this.props.playing) {
      return;
    }

    requestAnimationFrame(this.animate);
  }

  initBoard() {
    const rows = 20;
    const cols = 10;
    this.board = [];
    this.ctx.clearRect(0, 0, this.z * cols, this.z * rows);
    for (let row = 0; row < rows; row++) {
      this.board[row] = [];
      for(let col = 0; col < cols; col++) {
        this.board[row][col] = 0;
        this.ctx.strokeRect(this.z * col, this.z * row, this.z, this.z);
      }
    }
  }

  // stop shape at its position and fix it to board
  freeze() {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape.length; x++) {
        if (this.currentPiece.shape[y][x] && (y + this.currentPiece.y > -1)) {
          this.board[y + this.currentPiece.y][x + this.currentPiece.x] = this.currentPiece.shape[y][x];
        }
      }
    }
  }

  keyHandler = (event: KeyboardEvent) => {	    
    //console.log("Key code: " + event.key);
    if (event.key === "ArrowDown") {
      if (this.isValidMove(0, 1, this.currentPiece.shape)) {
        this.drawPiece(0, 1);
      }
    /*} else if (event.key === "Enter") {
      while(this.isValidMove(0, 1, this.currentPiece.shape)) {
        this.currentPiece.y++;
        //console.log(this.currentPiece.y);
      }      
      this.tick(); */
    } else if (event.key === "ArrowLeft") {
      if (this.isValidMove(-1, 0, this.currentPiece.shape)) {
        this.drawPiece(-1, 0);     
      } 
    } else if (event.key === "ArrowRight") {
      if (this.isValidMove(1, 0, this.currentPiece.shape)) {
        this.drawPiece(1, 0);
      }
    } else if (event.key === "ArrowUp") {
      // rotate
      const nextShapeIndex = this.currentPiece.getNextShapeIndex();
      var nextShape = this.currentPiece.getShape(nextShapeIndex);    
      if (this.isValidMove(0, 0, nextShape)) {        
        this.drawPiece(0, 0, true);
      }
    }
  }

  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} className="Board" />
  }
}
