import { randomInt } from '@utils/utils.ts';

// map starts from (0, 0) coords, counting from Top Left corner
export class Map {
  size: number;
  boulders: number;
  trees: number;
  pointFields: number;
  map: Array<Array<string>>;
  mapFieldsArray: Array<string[]>;

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
    this.map = this.generateRandomMap();
    this.mapFieldsArray = [];
  }

  private generateMapFields() {
    for (let i = 0; i < this.size; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push('');
      }
      this.mapFieldsArray.push(row);
    }
  }

  private generateBouldersForMap() {
    for (let i = 0; i < this.boulders; i++) {
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);

      if (row === 0 && col === 0) {
        i--;
        continue;
      } else {
        this.mapFieldsArray[row][col] = `barrier boulder asset-${randomInt(4) + 1}`;
      }
    }
  }

  private generateTreesForMap() {
    for (let i = 0; i < this.trees; i++) {
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);

      if (row === 0 && col === 0) {
        i--;
        continue;
      } else {
        this.mapFieldsArray[row][col] = `barrier tree asset-${randomInt(4) + 1}`;
      }
    }
  }

  private generateLootForMap() {
    for (let i = 0; i < this.pointFields; i++) {
      const row = Math.floor(Math.random() * this.size);
      const col = Math.floor(Math.random() * this.size);

      if (
        (row === 0 && col === 0) ||
        this.mapFieldsArray[row][col].includes('barrier') ||
        this.mapFieldsArray[row][col].includes('player') ||
        this.mapFieldsArray[row][col].includes('points')
      ) {
        i--;
        continue;
      } else {
        this.mapFieldsArray[row][col] = 'points';
      }
    }
  }

  private generateRandomMap(): string[][] {
    this.mapFieldsArray = []
    this.generateMapFields()
    this.generateBouldersForMap()
    this.generateTreesForMap()
    this.generateLootForMap()

    return this.mapFieldsArray;
  }
}
