import { state } from './store';
import { Character } from './character';

export class Opponent extends Character {
  walkingToPlayerInterval: NodeJS.Timeout | null;
  movesToPlayer: Array<() => void>;

  constructor(initialX: number, initialY: number) {
    super(initialX, initialY);
    this.walkingToPlayerInterval = null;
    this.movesToPlayer = [];
  }


  enableWalkingToPlayer() {
    /* Random walking when theres no path to player (WIP) */
    // const allMoves = [
    //   this.moveDown.bind(this),
    //   this.moveUp.bind(this),
    //   this.moveLeft.bind(this),
    //   this.moveRight.bind(this),
    // ];

    const walking = () => {
      if (this.movesToPlayer.length > 1) {
        const nextMove = this.movesToPlayer.shift();
        nextMove && nextMove();
      }

      /* Random walking when theres no path to player (WIP) */
      // if (this.movesToPlayer === null) {
      //   const randomMove = Math.floor(Math.random() * allMoves.length);
      //   allMoves[randomMove]();
      // }

      this.walkingToPlayerInterval = setTimeout(walking, 1000);
    };

    walking();
  }

  findShortestPath(targetX: number, targetY: number): void {
    /*
      Binary First Search Algorithm (BFS, przeszukiwanie wszerz) 
      - https://pl.wikipedia.org/wiki/Przeszukiwanie_wszerz
      - https://www.youtube.com/watch?v=TxDVtNCZlSk
    */
    const visited = new Set();
    const queue = [
      { x: this.posX, y: this.posY, steps: 0, moves: [] as Array<() => void> },
    ];
    visited.add(`${this.posX},${this.posY}`);

    while (queue.length > 0) {
      const current = queue.shift();

      if (current === undefined) {
        continue;
      }

      const { x, y, steps, moves } = current;

      if (x === targetX && y === targetY) {
        this.movesToPlayer = moves;
      }

      const possibleMoves = [
        { dx: 0, dy: -1, moveFn: this.moveUp.bind(this) },
        { dx: 0, dy: 1, moveFn: this.moveDown.bind(this) },
        { dx: -1, dy: 0, moveFn: this.moveLeft.bind(this) },
        { dx: 1, dy: 0, moveFn: this.moveRight.bind(this) },
        { dx: -1, dy: -1, moveFn: this.moveUpLeft.bind(this) },
        { dx: -1, dy: 1, moveFn: this.moveDownLeft.bind(this) },
        { dx: 1, dy: -1, moveFn: this.moveUpRight.bind(this) },
        { dx: 1, dy: 1, moveFn: this.moveDownRight.bind(this) },
      ];

      for (const move of possibleMoves) {
        const newX = x + move.dx;
        const newY = y + move.dy;

        if (
          newX >= 0 &&
          newX < state.map.size &&
          newY >= 0 &&
          newY < state.map.size &&
          !visited.has(`${newX},${newY}`) &&
          this.noBarriers(newY, newX)
        ) {
          const newMoves = [...moves, move.moveFn];
          queue.push({ x: newX, y: newY, steps: steps + 1, moves: newMoves });
          visited.add(`${newX},${newY}`);
        }
      }
    }

    /* Random walking when theres no path to player (WIP) */
    // this.movesToPlayer = null;
  }
}
