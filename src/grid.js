import { isoPoint } from './pathGen';

let grid;

export default class Grid {
  static getGrid() {
    if (!grid) {
      grid = new Grid(10, 10);
    }
    return grid;
  }

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.points = [];
    this.cells = [];

    this.init_();
  }

  init_() {
    const heights = {
      '1_2': 1,
      '1_3': 1,
      '1_4': 1,
      '2_1': 1,
      '2_2': 1,
      '2_3': 2,
      '2_4': 1,
      '3_2': 1,
      '3_3': 1,
      '3_4': 1,
    };

    // 2d array containing screen coordinates of points
    const points = this.points;
    for (let x = 0; x < this.cols + 1; x++) {
      points[x] = [];
      for (let y = 0; y < this.rows + 1; y++) {
        points[x][y] = isoPoint(x, y, heights[`${x}_${y}`] || 0);
      }
    }

    // all passable sets of map points
    const cells = this.cells;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        cells.push({x, y});
      }
    }
  }

  getCorners(x, y) {
    return [
      this.points[x][y],
      this.points[x + 1][y],
      this.points[x + 1][y + 1],
      this.points[x][y + 1]
    ];
  }

  // dropPoint(x, y) {
  //   return this.changePoint_(x, y, -1);
  // }
  //
  // raisePoint(x, y) {
  //   return this.changePoint_(x, y, 1);
  // }
  //
  // changePoint_(x, y, delta) {
  // }
}
