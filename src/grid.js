const TILE_HEIGHT_HALF = 32;
const TILE_WIDTH_HALF = TILE_HEIGHT_HALF * 2;
const HEIGHT_DELTA = 20;

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
    this.heights = [];
    this.cells = [];

    this.init_();
  }

  init_() {
    for (let x = 0; x < this.cols + 1; x++) {
      this.heights[x] = [];
      for (let y = 0; y < this.rows + 1; y++) {
        this.heights[x][y] = 0;
        if (x < this.cols && y < this.rows) {
          this.cells.push({x, y});
        }
      }
    }

    this.raisePoint(3, 3);
    this.raisePoint(3, 3);
    this.raisePoint(4, 5);
  }

  pointScreenPos_(x, y) {
    const height = this.heights[x][y];
    return {
      x: (x - y) * TILE_WIDTH_HALF,
      y: (x + y) * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
    };
  }

  isPoint(x, y) {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }

  getCorners(x, y) {
    return [
      this.pointScreenPos_(x, y),
      this.pointScreenPos_(x + 1, y),
      this.pointScreenPos_(x + 1, y + 1),
      this.pointScreenPos_(x, y + 1)
    ];
  }

  getCornerHeights(x, y) {
    return [
      this.heights[x][y],
      this.heights[x + 1][y],
      this.heights[x + 1][y + 1],
      this.heights[x][y + 1],
    ];
  }

  raisePoint(x, y) {
    this.heights[x][y] += 1;
    [
      [x - 1, y],
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
    ].forEach(([otherX, otherY]) => {
      if (!this.isPoint(otherX, otherY)) {
        return;
      }
      if (this.heights[x][y] - this.heights[otherX][otherY] > 1) {
        this.raisePoint(otherX, otherY);
      }
    });
  }
}
