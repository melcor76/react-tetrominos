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

export interface Tetromino {
  shape?: number[][];
  type?: number;
  x: number;
  y: number;
}

export default class Block extends Component {
   
}

export function spawn(): Tetromino {
  let tetromino: Tetromino = { x: 3, y: -1 };
  let id = 0;
  let shape = SHAPES[id];
  tetromino.shape = [];
  for (let y = 0; y < 4; y++) {
    tetromino.shape[y] = [];
    for (let x = 0; x < 4; x++) {
      let i = 4 * y + x;
      if (shape[i]) {
        tetromino.shape[y][x] = id + 1;
      } else {
        tetromino.shape[y][x] = 0;
      }
    }
  }
  
  return tetromino;
} 
