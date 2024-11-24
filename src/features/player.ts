import { Character } from './character.ts';

export class Player extends Character {
  score: number;

  constructor(initialX: number, initialY: number) {
    super(initialX, initialY)
    this.score = 0;
  }

  hasScored(points: number) {
    this.score += points;
  }
}
