import { state } from './store.ts';

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export class Opponent {
  posX: number;
  posY: number;
  direction: Direction;

  constructor(initialX: number, initialY: number) {
    this.posX = initialX;
    this.posY = initialY;
    this.direction = Direction.Up;
  }

  moveUp() {
    const nextPos = Math.max(0, this.posY - 1);
    this.direction = Direction.Up;
    if (!state.map.mapArray[nextPos][this.posX].includes('barrier')) {
      this.posY = nextPos;
    }
  }

  moveDown() {
    const nextPos = Math.min(state.map.size - 1, this.posY + 1);
    this.direction = Direction.Down;
    if (!state.map.mapArray[nextPos][this.posX].includes('barrier')) {
      this.posY = nextPos;
    }
  }

  moveLeft() {
    const nextPos = Math.max(0, this.posX - 1);
    this.direction = Direction.Left;
    if (!state.map.mapArray[this.posY][nextPos].includes('barrier')) {
      this.posX = nextPos;
    }
  }

  moveRight() {
    const nextPos = Math.min(state.map.size - 1, this.posX + 1);
    this.direction = Direction.Right;
    if (!state.map.mapArray[this.posY][nextPos].includes('barrier')) {
      this.posX = nextPos;
    }
  }
}
