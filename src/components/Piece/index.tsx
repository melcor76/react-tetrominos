import { Component } from 'react';
import { I, J, L, O, S, T, Z } from './tetriminos';

export const PIECES = [I, J, L, O, S, T, Z];
export const COLORS = ["cyan", "orange", "blue", "yellow", "red", "green", "purple"];

interface PieceProps {
  ctx: CanvasRenderingContext2D
}

export default class Piece extends Component<PieceProps> {
  x: number;
  y: number;
  type: number;
  shape: number[][];
  color: string;
  rotation: number;
  clearColor = "#282c34"; // TODO
  z = 30; // TODO const

  constructor(props: PieceProps) {
    super(props);
    this.spawn();
  }

  spawn() {
    this.x = 3;
    this.y = -2;
    this.type = this.getTypeId();    
    this.color = COLORS[this.type];
    this.rotation = 0;
    this.shape = PIECES[this.type][this.rotation];
  }

  rotate() {
    this.rotation = this.getNextShapeIndex();
    this.shape = this.getShape(this.rotation);
  }

  draw() {
    this.props.ctx.fillStyle = this.color;
    this.drawShape();
  }

  clear() {
    this.props.ctx.fillStyle = this.clearColor;
    this.drawShape();
  }

  getNextShapeIndex(): number {
    return (this.rotation + 1) % 4;
  }

  getShape(index: number): number[][] {
    return PIECES[this.type][index];
  }

  drawShape() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape.length; x++) {
        if (this.shape[y][x]) {      
          this.drawSquare(this.x + x, this.y + y);
        }
      }
    }
  }

  // Draws a square at the specified game coordinate
  private drawSquare(x: number, y: number) {    
    this.props.ctx.fillRect(this.z * x, this.z * y, this.z, this.z);
    this.props.ctx.strokeRect(this.z * x, this.z * y, this.z, this.z);
  }

  private getTypeId(): number {
    return Math.floor(Math.random() * PIECES.length);
  }

}
