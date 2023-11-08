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
  walkingToPlayerInterval: NodeJS.Timeout | null;
  movesToPlayer: Array<Function>;

  constructor(initialX: number, initialY: number) {
    this.posX = initialX;
    this.posY = initialY;
    this.direction = Direction.Up;
    this.walkingToPlayerInterval = null;
    this.movesToPlayer = [];
  }

  private noBarriers(row: number, col: number) {
    const field = state.map.mapArray[row][col];
    return !field.includes('barrier');
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
    const queue = [{ x: this.posX, y: this.posY, steps: 0, moves: [] as Array<Function> }];
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
  };
}
