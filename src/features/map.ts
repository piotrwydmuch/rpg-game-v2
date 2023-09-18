// map starts from (0, 0) coords, counting from Top Left corner

export class Map {
  size: number;
  barriers: number;
  mapArray: Array<Array<String>>;

  constructor(size: number, barriers: number) {
    this.size = size;
    this.barriers = barriers;
    this.mapArray = this.generateMapArray();
  }

  private generateMapArray(): string[][] {
    const mapArray = [];
    for (let i = 0; i < this.size; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push('');
      }
      mapArray.push(row);
    }

    for (let i = 0; i < this.barriers; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * this.size);
        col = Math.floor(Math.random() * this.size);
      } while (mapArray[row][col] === 'barrier');

      mapArray[row][col] = 'barrier';
    }

    return mapArray;
  }
}
