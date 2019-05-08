import { Component } from 'react';

export const SHAPES = [
  [0, 0, 0, 0, 1, 1, 1, 1], // I = Cyan
  [0, 0, 0, 0, 1, 1, 1, 0, 1], // L = Orange
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1], // J = Blue
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1], // O = Yellow
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1], // Z = Red
  [0, 0, 0, 0, 0, 1, 1, 0, 1, 1], // S = Green
  [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1] // T = Purple
];

interface PieceProps {
  ctx: CanvasRenderingContext2D
}

export default class Piece extends Component<PieceProps> {
  x: number;
  y: number;
  type: number;
  shape: number[][];
  color: string;
  clearColor = "#282c34"; // TODO
  z = 30; // TODO const

  constructor(props: PieceProps) {
    super(props);
    this.spawn();
  }

  spawn() {
    this.x = 3;
    this.y = 0;
    this.type = 0;
    this.color = "red";
    let shape = SHAPES[this.type];   
    this.shape = [];
    for (let y = 0; y < 4; y++) {
      this.shape[y] = [];
      for (let x = 0; x < 4; x++) {
        let i = 4 * y + x;
        if (shape[i]) {
          this.shape[y][x] = this.type + 1;
        } else {
          this.shape[y][x] = 0;
        }
      }
    }
  }

  draw() {
    this.props.ctx.fillStyle = this.color;
    this.drawShape();
  }

  clear() {
    this.props.ctx.fillStyle = this.clearColor;
    this.drawShape();    
  }

  drawShape() {
    for (var ix = 0; ix < this.shape.length; ix++) {
      for (var iy = 0; iy < this.shape.length; iy++) {
        if (this.shape[ix][iy]) {          
          this.drawSquare(this.x + ix, this.y + iy);
        }
      }
    }
  }

  // Draws a square at the specified game coordinate
  drawSquare(x: number, y: number) {    
    this.props.ctx.fillRect(this.z * x, this.z * y, this.z, this.z);
    this.props.ctx.strokeRect(this.z * x, this.z * y, this.z, this.z);
  }

}
