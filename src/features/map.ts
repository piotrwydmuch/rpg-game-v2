import { randomInt } from '@utils/utils.ts';

// map starts from (0, 0) coords, counting from Top Left corner
export class Map {
  size: number;
  boulders: number;
  trees: number;
  pointFields: number;
  mapArray: Array<Array<String>>;

  constructor(
    size: number,
    boulders: number,
    trees: number,
    pointFields: number,
  ) {
    this.size = size;
    this.boulders = boulders;
    this.trees = trees;
    this.pointFields = pointFields;
    this.mapArray = this.generateRandomMap();
  }

  private generateRandomMap(): string[][] {
    const mapArray = [];

    /* All fields (grid) generation */
    for (let i = 0; i < this.size; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push('');
      }
      mapArray.push(row);
    }

    /* boulders generation */
    for (let i = 0; i < this.boulders; i++) {
      let row, col;
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);

      if (row === 0 && col === 0) {
        i--;
        continue;
      } else {
        mapArray[row][col] = `barrier boulder asset-${randomInt(4) + 1}`;
      }
    }

    /* trees generation */
    for (let i = 0; i < this.trees; i++) {
      let row, col;
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);

      if (row === 0 && col === 0) {
        i--;
        continue;
      } else {
        mapArray[row][col] = `barrier tree asset-${randomInt(4) + 1}`;
      }
    }

    /* Points generation */
    for (let i = 0; i < this.pointFields; i++) {
      let row, col;
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);

      if (
        (row === 0 && col === 0) ||
        mapArray[row][col].includes('barrier') ||
        mapArray[row][col].includes('player') ||
        mapArray[row][col].includes('points')
      ) {
        i--;
        continue;
      } else {
        mapArray[row][col] = 'points';
      }
    }

    return mapArray;
  }
}
