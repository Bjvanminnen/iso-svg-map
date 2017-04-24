// Actions
const CREATE_GRID = 'grid/CREATE_GRID';
export const createGrid = (rows, cols) => ({
  type: CREATE_GRID,
  rows,
  cols
});

const initialState = {
  rows: 0,
  cols: 0,
  heights: [],
  cells: []
};

// Reducer
export default function(state = initialState, action) {
  if (action.type === CREATE_GRID) {
    const { rows, cols } = action;
    let heights = [];
    let cells = [];
    for (let x = 0; x < cols + 1; x++) {
      heights[x] = [];
      for (let y = 0; y < rows + 1; y++) {
        heights[x][y] = 0;
        if (x < cols && y < rows) {
          cells.push({x, y});
        }
      }
    }

    return {
      ...state,
      rows,
      cols,
      heights,
      cells
    };
  }
  return action;
}

// Helpers
const TILE_HEIGHT_HALF = 32;
const TILE_WIDTH_HALF = TILE_HEIGHT_HALF * 2;
const HEIGHT_DELTA = 20;

const pointScreenPos = (state, x, y) => {
  const height = state.heights[x][y];
  return {
    x: (x - y) * TILE_WIDTH_HALF,
    y: (x + y) * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
  };
};

export const getCorners = (state, x, y) => ([
  pointScreenPos(state, x, y),
  pointScreenPos(state, x + 1, y),
  pointScreenPos(state, x + 1, y + 1),
  pointScreenPos(state, x, y + 1)
]);

// TODO
export const getCornerHeights = (state, x, y) => ([
  1,1,1,1
]);
