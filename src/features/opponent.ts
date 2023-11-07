import { state } from './store';

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
  autoWalkingInterval: NodeJS.Timeout | null;

  constructor(initialX: number, initialY: number) {
    this.posX = initialX;
    this.posY = initialY;
    this.direction = Direction.Up;
    this.autoWalkingInterval = null;
  }

  private noBarriers(row: number, col: number) {
    return !state.map.mapArray[row][col].includes('barrier');
  }

  moveUp() {
    const nextPos = this.posY - 1;
    this.direction = Direction.Up;
    if (nextPos >= 0 && this.noBarriers(nextPos, this.posX)) {
      this.posY = nextPos;
    } else {
      // this.tryToMoveAgain();
    }
  }

  moveDown() {
    const nextPos = this.posY + 1;
    this.direction = Direction.Down;
    if (nextPos <= state.map.size - 1 && this.noBarriers(nextPos, this.posX)) {
      this.posY = nextPos;
    } else {
      // this.tryToMoveAgain();
    }
  }

  moveLeft() {
    const nextPos = this.posX - 1;
    this.direction = Direction.Left;
    if (nextPos >= 0 && this.noBarriers(this.posY, nextPos)) {
      this.posX = nextPos;
    } else {
      // this.tryToMoveAgain();
    }
  }

  moveRight() {
    const nextPos = this.posX + 1;
    this.direction = Direction.Right;
    if (nextPos <= state.map.size - 1 && this.noBarriers(this.posY, nextPos)) {
      this.posX = nextPos;
    } else {
      // this.tryToMoveAgain();
    }
  }

  enableAutoWalking() {
    const moves = [
      this.moveDown.bind(this),
      this.moveUp.bind(this),
      this.moveLeft.bind(this),
      this.moveRight.bind(this),
    ];

    const move = () => {
      const randomMove = Math.floor(Math.random() * moves.length);
      moves[randomMove]();

      this.autoWalkingInterval = setTimeout(move, 1500);
    };

    move();
  }

  tryToMoveAgain() {
    // fix me :(
    if (this.autoWalkingInterval) clearInterval(this.autoWalkingInterval);
    this.enableAutoWalking();
  }
}
