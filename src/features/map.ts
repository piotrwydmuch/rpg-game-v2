// map starts from (0, 0) coords, counting from Top Left corner

export class Map {
  size: number;
  barriers: number;
  pointFields: number;
  mapArray: Array<Array<String>>;

  constructor(size: number, barriers: number, pointFields: number) {
    this.size = size;
    this.barriers = barriers;
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

    /* Barriers generation */
    for (let i = 0; i < this.barriers; i++) {
      let row, col;
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);

      if (row === 0 && col === 0) {
        i--;
        continue;
      } else {
        mapArray[row][col] = 'barrier';
      }
    }

    /* Points generation */
    for (let i = 0; i < this.pointFields; i++) {
      let row, col;
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);

      if ((row === 0 && col === 0) || mapArray[row][col].includes('barrier')) {
        i--;
        continue;
      } else {
        mapArray[row][col] = 'points';
      }
    }

    return mapArray;
  }
}
