import { state } from './store.ts';

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export class Player {
  posX: number;
  posY: number;
  direction: Direction;
  score: number;

  constructor(initialX: number, initialY: number) {
    this.posX = initialX;
    this.posY = initialY;
    this.direction = Direction.Down;
    this.score = 0;
  }

  private noBarriers(row: number, col: number) {
    return !state.map.mapArray[row][col].includes('barrier');
  }

  moveUp() {
    const nextPos = this.posY - 1;
    this.direction = Direction.Up;
    if (nextPos >= 0 && this.noBarriers(nextPos, this.posX)) {
      this.posY = nextPos;
    }
  }

  moveDown() {
    const nextPos = this.posY + 1;
    this.direction = Direction.Down;
    if (nextPos <= state.map.size - 1 && this.noBarriers(nextPos, this.posX)) {
      this.posY = nextPos;
    }
  }

  moveLeft() {
    const nextPos = this.posX - 1;
    this.direction = Direction.Left;
    if (nextPos >= 0 && this.noBarriers(this.posY, nextPos)) {
      this.posX = nextPos;
    }
  }

  moveRight() {
    const nextPos = this.posX + 1;
    this.direction = Direction.Right;
    if (nextPos <= state.map.size - 1 && this.noBarriers(this.posY, nextPos)) {
      this.posX = nextPos;
    }
  }

  hasScored(points: number) {
    this.score += points;
  }
}
