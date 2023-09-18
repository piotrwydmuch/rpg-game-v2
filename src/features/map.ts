// map starts from (0, 0) coords, counting from Top Left corner

export class Map {
  size: number;
  mapWidth: number;
  mapHeight: number;
  numberOfNeutralMapObjects: number;

  constructor(size: number, objectsAmount: number) {
    this.size = size;
    this.mapWidth = size;
    this.mapHeight = size;
    this.numberOfNeutralMapObjects = objectsAmount;
  }
}
