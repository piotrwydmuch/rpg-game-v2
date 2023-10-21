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

  moveUp() {
    const nextPos = this.posY - 1;
    this.direction = Direction.Up;
    if (
      nextPos >= 0 &&
      !state.map.mapArray[nextPos][this.posX].includes('barrier')
    ) {
      this.posY = nextPos;
    }
  }

  moveDown() {
    const nextPos = this.posY + 1;
    this.direction = Direction.Down;
    if (
      nextPos <= state.map.size - 1 &&
      !state.map.mapArray[nextPos][this.posX].includes('barrier')
    ) {
      this.posY = nextPos;
    }
  }

  moveLeft() {
    const nextPos = this.posX - 1;
    this.direction = Direction.Left;
    if (
      nextPos >= 0 &&
      !state.map.mapArray[this.posY][nextPos].includes('barrier')
    ) {
      this.posX = nextPos;
    }
  }

  moveRight() {
    const nextPos = this.posX + 1;
    this.direction = Direction.Right;
    if (
      nextPos <= state.map.size - 1 &&
      !state.map.mapArray[this.posY][nextPos].includes('barrier')
    ) {
      this.posX = nextPos;
    }
  }

  hasScored(points: number) {
    this.score += points;
  }
}
