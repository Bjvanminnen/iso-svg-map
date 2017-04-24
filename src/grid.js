import { isoPoint } from './pathGen';

const ROWS = 10;
const COLS = 10;

let grid;

export const getGrid = () => {
  if (!grid) {
    grid = createGrid();
  }
  return grid;
}

// TODO make a class?
function createGrid() {
  const heights = {
    '1_2': 1,
    '1_3': 1,
    '1_4': 1,
    '2_1': 1,
    '2_2': 1,
    '2_3': 1,
    '2_4': 1,
    '3_2': 1,
    '3_3': 1,
  };

  // 2d array containing screen coordinates of points
  const points = [];
  for (let x = 0; x < COLS + 1; x++) {
    points[x] = [];
    for (let y = 0; y < ROWS + 1; y++) {
      points[x][y] = isoPoint(x, y, heights[`${x}_${y}`] || 0);
    }
  }

  // all passable sets of map points
  const cells = [];
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      cells.push({x, y});
    }
  }

  return {
    points,
    cells
  };

}
