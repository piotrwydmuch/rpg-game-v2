import { Player } from './player.ts';

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export class Opponent extends Player {
  posX: number;
  posY: number;
  direction: Direction;

  constructor(initialX: number, initialY: number) {
    super(initialX, initialY);
    this.posX = initialX;
    this.posY = initialY;
    this.direction = Direction.Up;
  }
}
