import { MAP_SIZE } from "@features/map.ts"

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
    this.posY = Math.max(0, this.posY - 1);
  }

  moveDown() {
    this.posY = Math.min(MAP_SIZE - 1, this.posY + 1);
  }

  moveLeft() {
    this.posX = Math.max(0, this.posX - 1);
  }

  moveRight() {
    this.posX = Math.min(MAP_SIZE - 1, this.posX + 1);
  }

  hasScored(points: number) {
    this.score += points;
  }  
}