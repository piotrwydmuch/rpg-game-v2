import { state } from './store.ts';

export class Player {
  posX: number;
  posY: number;
  score: number;

  constructor(initialX: number, initialY: number) {
    this.posX = initialX;
    this.posY = initialY;
    this.score = 0;
  }

  moveUp() {
    const nextPos = Math.max(0, this.posY - 1);
    if (state.map.mapArray[nextPos][this.posX] !== 'barrier') {
      this.posY = nextPos;
    }
  }

  moveDown() {
    const nextPos = Math.min(state.map.size - 1, this.posY + 1);
    if (state.map.mapArray[nextPos][this.posX] !== 'barrier') {
      this.posY = nextPos;
    }
  }

  moveLeft() {
    const nextPos = Math.max(0, this.posX - 1);
    if (state.map.mapArray[this.posY][nextPos] !== 'barrier') {
      this.posX = nextPos;
    }
  }

  moveRight() {
    const nextPos = Math.min(state.map.size - 1, this.posX + 1);
    if (state.map.mapArray[this.posY][nextPos] !== 'barrier') {
      this.posX = nextPos;
    }
  }

  hasScored(points: number) {
    this.score += points;
  }
}
